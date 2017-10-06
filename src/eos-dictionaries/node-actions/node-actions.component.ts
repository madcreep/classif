import { Component, TemplateRef, ViewChild, HostListener, OnDestroy, EventEmitter, Output } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs/Subscription';

import { EosUserProfileService } from '../../app/services/eos-user-profile.service';
import { EosDictService } from '../services/eos-dict.service';
import { EosDeskService } from '../../app/services/eos-desk.service';
import { EosDictionaryNode } from '../core/eos-dictionary-node';
import { EosDictionary } from '../core/eos-dictionary';
import { FieldDescriptor } from '../core/field-descriptor';
import { E_ACTION_GROUPS, E_RECORD_ACTIONS } from '../core/record-action';
import { IFieldView } from '../core/field-descriptor';
import { E_FIELD_SET } from '../core/dictionary-descriptor';
// import { CardActionService, EDIT_CARD_ACTIONS } from '../card/card-action.service';
import { RECORD_ACTIONS, DROPDOWN_RECORD_ACTIONS } from '../consts/record-actions.consts';
import { EditedCard } from '../card/card.component';

@Component({
    selector: 'eos-node-actions',
    templateUrl: 'node-actions.component.html',
})
export class NodeActionsComponent implements OnDestroy {
    @Output('onAction') private onAction = new EventEmitter();
    recordActions = RECORD_ACTIONS;
    dropdownRecordActions = DROPDOWN_RECORD_ACTIONS;

    showDeleted = false;
    modalRef: BsModalRef;
    checkAll = false;
    itemIsChecked = false;
    // newNode: EosDictionaryNode;

    searchResults: EosDictionaryNode[];
    searchString: string;
    searchInAllDict = false;

    dictionary: EosDictionary;
    viewFields: FieldDescriptor[];

    showCheckbox: boolean;
    userSort = false;

    rootSelected = false;
    allChildrenSelected = false;
    someChildrenSelected = false;

    dropdownIsOpen = false;
    date = new Date();

    fields: IFieldView[];
    searchInDeleted = false;

    dictIdFromDescriptor: string;

    innerClick = false;

    lastEditedCard: EditedCard;

    private _userSettingsSubscription: Subscription;
    private _dictionarySubscription: Subscription;

    newNodeData: any = {};
    private editMode = true;

    @ViewChild('creatingModal') public creatingModal: ModalDirective;
    get noSearchData(): boolean {
        /* tslint:disable:no-bitwise */
        return !~this.fields.findIndex((f) => f.value);
        /* tslint:enable:no-bitwise */
    }

    @HostListener('window:click', [])
    private _closeSearchModal(): void {
        if (!this.innerClick) {
            this.dropdownIsOpen = false;
        }
        this.innerClick = false;
    }

    constructor(
        private _profileSrv: EosUserProfileService,
        private _modalSrv: BsModalService,
        private _dictSrv: EosDictService,
        private _deskSrv: EosDeskService,
    ) {
        this._userSettingsSubscription = this._profileSrv.settings$.subscribe((res) => {
            this.showDeleted = res.find((s) => s.id === 'showDeleted').value;
        });

        this._dictionarySubscription = this._dictSrv.dictionary$.subscribe((_d) => {
            this.dictionary = _d;
            if (_d) {
                this.dictIdFromDescriptor = _d.descriptor.id;
                this.viewFields = _d.descriptor.getFieldSet(E_FIELD_SET.list);

                this.showCheckbox = _d.descriptor.canDo(E_ACTION_GROUPS.common, E_RECORD_ACTIONS.markRecords);
                this.fields = _d.descriptor.getFieldSet(E_FIELD_SET.fullSearch).map((fld) => Object.assign({}, fld, { value: null }));
            }
        });

    }

    ngOnDestroy() {
        this._userSettingsSubscription.unsubscribe();
        this._dictionarySubscription.unsubscribe();
    }

    doAction(type: E_RECORD_ACTIONS) {
        switch (type) {
            case E_RECORD_ACTIONS.add:
                this.newNodeData = {};
                this.creatingModal.show();
                break;

            case E_RECORD_ACTIONS.userOrder:
                this.switchUserSort();
                break;

            case E_RECORD_ACTIONS.markOne:
                this.itemIsChecked = true;
                this.checkAll = false;
                this.someChildrenSelected = true;
                break;

            case E_RECORD_ACTIONS.unmarkAllChildren:
                this.allChildrenSelected = false;
                this.someChildrenSelected = false;
                this.itemIsChecked = false;
                this.checkAll = false;
                break;

            case E_RECORD_ACTIONS.markAllChildren:
                this.allChildrenSelected = true;
                if (this.rootSelected) {
                    this.checkAll = true;
                    this.itemIsChecked = false;
                } else {
                    this.itemIsChecked = true;
                    this.checkAll = false;
                }
                break;

            case E_RECORD_ACTIONS.markRoot:
                this.rootSelected = true;
                if (this.allChildrenSelected) {
                    this.checkAll = true;
                    this.itemIsChecked = false;
                } else {
                    this.checkAll = false;
                    this.itemIsChecked = true;
                }
                break;

            case E_RECORD_ACTIONS.unmarkRoot:
                this.rootSelected = false;
                if (this.allChildrenSelected || this.someChildrenSelected) {
                    this.itemIsChecked = true;
                    this.checkAll = false;
                } else {
                    this.itemIsChecked = false;
                    this.checkAll = false;
                }
                break;
            case E_RECORD_ACTIONS.showDeleted: // TODO: check if it works
                this._profileSrv.setSetting('showDeleted', !this.showDeleted);
                break;
        }
    }

    isEnabled(group: E_ACTION_GROUPS, type: E_RECORD_ACTIONS) {
        if (this.dictionary) {
            switch (type) {
                case E_RECORD_ACTIONS.moveUp:
                    return this.userSort && this.dictionary.descriptor.canDo(group, type);
                case E_RECORD_ACTIONS.moveDown:
                    return this.userSort && this.dictionary.descriptor.canDo(group, type);
                case E_RECORD_ACTIONS.restoreDeleted:
                    return this.showDeleted && this.dictionary.descriptor.canDo(group, type);
                default:
                    return this.dictionary.descriptor.canDo(group, type);
            }
        }
        return false;
    }

    switchUserSort() {
        this.userSort = !this.userSort;
        this.onAction.emit(E_RECORD_ACTIONS.userOrder);
    }

    openModal(template: TemplateRef<any>) {
        this.modalRef = this._modalSrv.show(template);
        this.dropdownIsOpen = true;
    }

    public change(value: boolean): void {
        this.dropdownIsOpen = value;
    }

    checkAllItems() {
        if (this.checkAll) {
            this.rootSelected = true;
            this.allChildrenSelected = true;
            this.itemIsChecked = false;
            this.onAction.emit(E_RECORD_ACTIONS.markRecords);
        } else {
            this.itemIsChecked = false;
            this.allChildrenSelected = false;
            this.someChildrenSelected = false;
            this.onAction.emit(E_RECORD_ACTIONS.unmarkRecords);
        }
    }

    search(event) {
        if (event.keyCode === 13) {
            this.dropdownIsOpen = false;
            this._dictSrv.search(this.searchString, this.searchInAllDict);
            event.target.blur();
        }
    }

    fullSearch() {
        this.modalRef.hide();
        this._dictSrv.fullSearch(this.fields, this.searchInDeleted);
    }

    create(hide = true) {
        // this._editActSrv.emitAction(EDIT_CARD_ACTIONS.create);
        this._dictSrv.addNode(this.newNodeData)
            .then((node) => {
                console.log('created node', node);
                let title = '';
                node.getShortQuickView().forEach((_f) => {
                    title += this.newNodeData[_f.key];
                });
                this._deskSrv.addRecentItem({
                    link: '/spravochniki/' + this.dictionary.id + '/' + node.id,
                    title: title,
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

    dataSeted(date: Date) {
        console.log('recive date: ', date);
    }
}
