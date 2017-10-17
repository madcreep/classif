import { Component, OnDestroy, HostListener, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { EosDictService } from '../services/eos-dict.service';
import { EosUserProfileService } from '../..//app/services/eos-user-profile.service';
import { EosDictOrderService } from '../services/eos-dict-order.service';
import { EosDictionaryNode } from '../core/eos-dictionary-node';
import { EosMessageService } from '../../eos-common/services/eos-message.service';
import { EosStorageService } from '../../app/services/eos-storage.service';

import { NodeActionsService } from '../node-actions/node-actions.service';
import { FieldDescriptor } from '../core/field-descriptor';
import { E_FIELD_SET } from '../core/dictionary-descriptor';
import {
    WARN_EDIT_ERROR,
    DANGER_EDIT_ROOT_ERROR,
    DANGER_EDIT_DELETED_ERROR,
    DANGER_DELETE_ELEMENT
} from '../consts/messages.consts';

import {
    DictionaryActionService,
    DICTIONARY_ACTIONS,
    DICTIONARY_STATES
} from '../dictionary/dictionary-action.service';
import { E_ACTION_GROUPS, E_RECORD_ACTIONS } from '../core/record-action';
import { RECENT_URL } from '../../app/consts/common.consts';
import { IListPage } from '../node-list-pagination/node-list-pagination.component';
import { INodeListParams } from '../core/dictionary.interface';
import { NodeListComponent } from '../node-list/node-list.component';

@Component({
    selector: 'eos-dictionary',
    templateUrl: 'dictionary.component.html',
})
export class DictionaryComponent implements OnDestroy {
    @ViewChild(NodeListComponent) nodeListComponent: NodeListComponent;

    dictionaryName: string;

    public params: INodeListParams;
    public _selectedNode: EosDictionaryNode;
    public _selectedNodeText: string;
    public _dictionaryId: string;
    private _nodeId: string;

    treeNodes: EosDictionaryNode[];
    listNodes: EosDictionaryNode[];
    visibleNodes: EosDictionaryNode[];

    private _page: IListPage;

    currentState: number;
    readonly states = DICTIONARY_STATES;

    private _subscriptions: Subscription[];

    anyMarked: boolean;
    anyUnmarked: boolean;
    allMarked: boolean;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _dictSrv: EosDictService,
        private _msgSrv: EosMessageService,
        private _profileSrv: EosUserProfileService,
        private _storageSrv: EosStorageService,
        private _orderSrv: EosDictOrderService,
        /* remove unused */
        private _dictActSrv: DictionaryActionService,
    ) {
        this.params = {
            userSort: false,
            showDeleted: false,
            hasParent: false
        };

        this._subscriptions = [];
        this.treeNodes = [];
        this.listNodes = [];
        this.visibleNodes = [];
        this.currentState = this._dictActSrv.state;

        this._subscriptions.push(this._route.params.subscribe((params) => {
            if (params) {
                this._dictionaryId = params.dictionaryId;
                this._nodeId = params.nodeId;
                this._update();
            }
        }));

        this._subscriptions.push(_dictSrv.dictionary$.subscribe((dictionary) => {
            if (dictionary) {
                this._dictionaryId = dictionary.id;
                if (dictionary.root) {
                    this.dictionaryName = dictionary.root.title;
                }
                this.treeNodes = [dictionary.root];
                this.params.showCheckbox = dictionary.descriptor.canDo(E_ACTION_GROUPS.common, E_RECORD_ACTIONS.markRecords);
            } else {
                this.treeNodes = [];
            }
        }));

        this._subscriptions.push(_dictActSrv.action$.subscribe((action) => {
            this._swichCurrentState(action); // ??????????????????
        }));

        this._subscriptions.push(_profileSrv.settings$
            .map((settings) => settings.find((s) => s.id === 'showDeleted').value)
            .subscribe((s) => {
                this.params.showDeleted = s;
            })
        );

        this._subscriptions.push(this._dictSrv.selectedNode$.subscribe((node) => {
            this._selectedNode = node;
            if (node) {
                this._selectedNodeText = node.getListView().map((fld) => fld.value).join(' ');
                this.params.hasParent = !!node.parent;
                this.listNodes = node.children;
                this._updateVisibleNodes();
            }
        }));
    }

    ngOnDestroy() {
        this._subscriptions.forEach((_s) => _s.unsubscribe());
    }


    private _update() {
        if (this._dictionaryId) {
            this._dictSrv.openDictionary(this._dictionaryId)
                .then(() => this._dictSrv.selectNode(this._nodeId));
        }
    }

    private _updateVisibleNodes() {
        let _list: EosDictionaryNode[];
        const page = this._page;
        if (this.params && this.params.userSort) {
            _list = this._orderSrv.getUserOrder(this.listNodes, this.listNodes[0].parentId);
        } else {
            _list = this.listNodes;
        }

        if (page) {
            this.visibleNodes = _list.slice((page.start - 1) * page.length, page.current * page.length);
        } else {
            this.visibleNodes = _list;
        }
    }

    pageChanged(page: IListPage) {
        this._page = page;
        this._updateVisibleNodes();
    }

    doAction(action: E_RECORD_ACTIONS) {
        switch (action) {
            case E_RECORD_ACTIONS.navigateDown:
                this._openNodeNavigate(false);
                break;

            case E_RECORD_ACTIONS.navigateUp:
                this._openNodeNavigate(true);
                break;

            case E_RECORD_ACTIONS.edit:
                this._editNode();
                break;

            case E_RECORD_ACTIONS.showDeleted:
                this._toggleDeleted();
                break;

            case E_RECORD_ACTIONS.userOrder:
                this._toggleUserSort();
                break;

            case E_RECORD_ACTIONS.moveUp:
                this._moveUp();
                break;

            case E_RECORD_ACTIONS.moveDown:
                this._moveDown();
                break;

            case E_RECORD_ACTIONS.remove:
                this.deleteSelectedItems();
                break;

            case E_RECORD_ACTIONS.removeHard:
                this.physicallyDelete();
                break;
            /*
            // case E_RECORD_ACTIONS.restore: {
            case E_RECORD_ACTIONS.markRecords:
                this.checkAllItems(true);
                break;

            case E_RECORD_ACTIONS.unmarkRecords: {
                this.checkAllItems(false);
                break;
            }
            */
            default:
                console.log('alarmaaaa!!! unhandled', E_RECORD_ACTIONS[action]);
        }
    }
    private _moveUp(): void {
        const _idx = this.visibleNodes.findIndex((node) => node.isSelected);

        if (_idx > 0) {
            const item = this.visibleNodes[_idx - 1];
            this.visibleNodes[_idx - 1] = this.visibleNodes[_idx];
            this.visibleNodes[_idx] = item;
            this.nodeListComponent.writeValues(this.visibleNodes);
        }
    }

    private _moveDown(): void {
        const _idx = this.visibleNodes.findIndex((node) => node.isSelected);
        if (_idx > 0) {
            const item = this.visibleNodes[_idx + 1];
            this.visibleNodes[_idx + 1] = this.visibleNodes[_idx];
            this.visibleNodes[_idx] = item;
            this.nodeListComponent.writeValues(this.visibleNodes);
        }
    }

    private _editNode() {
        const node = this.visibleNodes.find((n) => n.isSelected || n.isActive);
        if (node) {
            if (node.data.PROTECTED) {
                this._msgSrv.addNewMessage(DANGER_EDIT_ROOT_ERROR);
            } else if (node.isDeleted) {
                this._msgSrv.addNewMessage(DANGER_EDIT_DELETED_ERROR);
            } else /*(!node.data.PROTECTED && !node.isDeleted) */ {
                const url = this._router.url;
                this._storageSrv.setItem(RECENT_URL, url);
                const _path = this._dictSrv.getNodePath(node);
                _path.push('edit');
                this._router.navigate(_path);
            }
        } else {
            this._msgSrv.addNewMessage(WARN_EDIT_ERROR);
        }
    }

    private _openNodeNavigate(backward = false): void {
        let _idx = this.visibleNodes.findIndex((node) => node.isSelected);
        /*
        if (_idx < 0) {
            _idx = 0;
        }
        */

        if (backward) {
            if (_idx > -1) {
                _idx--;
            }
        } else {
            _idx++;
        }
        _idx = (_idx + this.visibleNodes.length) % this.visibleNodes.length;

        this._dictSrv.openNode(this.visibleNodes[_idx].id);
    }

    onClick() {
        if (window.innerWidth <= 1500) {
            this._dictActSrv.emitAction(DICTIONARY_ACTIONS.closeTree);
            this._dictActSrv.emitAction(DICTIONARY_ACTIONS.closeInfo);
            this._dictActSrv.closeAll = true;
        }
    }

    goUp() {
        if (this._selectedNode && this._selectedNode.parent) {
            const path = this._dictSrv.getNodePath(this._selectedNode.parent);
            this._router.navigate(path);
        }
    }

    private _toggleDeleted() {
        this.params = Object.assign({}, this.params, { showDeleted: !this.params.showDeleted });
        // todo: update visible list
    }

    private _toggleUserSort(): void {
        this.params = Object.assign({}, this.params, { userSort: !this.params.userSort });
        this._updateVisibleNodes();
    }

    updateMarks() {
        this.anyMarked = this.listNodes.findIndex((node) => node.marked) > -1;
        this.anyUnmarked = this.listNodes.findIndex((node) => !node.marked) > -1;
        this.allMarked = this.anyMarked;
    }

    toggleAllMarks() {
        this.anyMarked = this.allMarked;
        this.anyUnmarked = !this.allMarked;
        this.listNodes.forEach((node) => node.marked = this.allMarked);
    }

    private _updateChildrenMarks(marked: boolean) {
        this.listNodes.forEach((node) => node.marked = marked);
    }
    /* darkside */

    deleteSelectedItems(): void {
        const selectedNodes: string[] = [];
        if (this.listNodes) {
            this.listNodes.forEach((child) => {
                if (child.marked && !child.isDeleted) {
                    selectedNodes.push(child.id);
                    child.marked = false;
                }
            });
        }
        this._dictSrv.deleteSelectedNodes(this._dictionaryId, selectedNodes);
    }

    physicallyDelete() {
        if (this.listNodes) {
            this.listNodes.forEach(node => {
                if (node.marked) {
                    if (1 !== 1) { // here must be API request for check if possible to delete
                        this._msgSrv.addNewMessage(DANGER_DELETE_ELEMENT);
                    } else {
                        const _deleteResult = this._dictSrv.physicallyDelete(node.id);
                        if (_deleteResult) {
                            this._router.navigate([
                                'spravochniki',
                                this._dictionaryId,
                                node.parent.id,
                            ]);
                        } else {
                            this._msgSrv.addNewMessage(DANGER_DELETE_ELEMENT);
                        }
                    }
                }
            });
        }
    }

    private _swichCurrentState(action: DICTIONARY_ACTIONS) {
        this._dictActSrv.closeAll = false;
        switch (action) {
            // TODO: try to find more simple solition
            case DICTIONARY_ACTIONS.closeTree:
                switch (this.currentState) {
                    case DICTIONARY_STATES.full:
                        this.currentState = DICTIONARY_STATES.info;
                        break;
                    case DICTIONARY_STATES.tree:
                        this.currentState = DICTIONARY_STATES.selected;
                        break;
                }
                break;
            case DICTIONARY_ACTIONS.openTree:
                switch (this.currentState) {
                    case DICTIONARY_STATES.info:
                        this.currentState = DICTIONARY_STATES.full;
                        break;
                    case DICTIONARY_STATES.selected:
                        this.currentState = DICTIONARY_STATES.tree;
                        break;
                }
                break;
            case DICTIONARY_ACTIONS.closeInfo:
                switch (this.currentState) {
                    case DICTIONARY_STATES.full:
                        this.currentState = DICTIONARY_STATES.tree;
                        break;
                    case DICTIONARY_STATES.info:
                        this.currentState = DICTIONARY_STATES.selected;
                        break;
                }
                break;
            case DICTIONARY_ACTIONS.openInfo:
                switch (this.currentState) {
                    case DICTIONARY_STATES.tree:
                        this.currentState = DICTIONARY_STATES.full;
                        break;
                    case DICTIONARY_STATES.selected:
                        this.currentState = DICTIONARY_STATES.info;
                        break;
                }
                break;
        }
    }
    /*
    create(hide = true) {
        // this._editActSrv.emitAction(EDIT_CARD_ACTIONS.create);
        this._dictSrv.addNode(this.newNodeData)
            .then((node) => {
                console.log('created node', node);
                let title = '';
                node.getShortQuickView().forEach((_f) => {
                    title += this.newNodeData[_f.key];
                });
                const bCrumbs = this._breadcrumbsSrv.getBreadcrumbs();
                let path = '';
                for (const bc of bCrumbs) {
                    path = path + bc.title + '/';
                }
                this._deskSrv.addRecentItem({
                    link: this._dictSrv.getNodePath(node.id).join('/'),
                    title: title,
                    fullTitle: path + title
                });
                if (hide) {
                    this.creatingModal.hide();
                }
                this.newNodeData = {};
            });
    }

    cancelCreate() {
        this.creatingModal.hide();
    }
    */
}
