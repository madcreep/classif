import { Component, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { E_RECORD_ACTIONS } from 'eos-dictionaries/interfaces';
import { EosDictService } from '../services/eos-dict.service';

@Component({
    selector: 'eos-node-info-switcher',
    templateUrl: 'node-info-switcher.component.html',
})
export class NodeInfoSwitcherComponent implements OnDestroy {
    @Output() action: EventEmitter<E_RECORD_ACTIONS> = new EventEmitter<E_RECORD_ACTIONS>();

    fieldsDescriptionShort: any = {};
    nodeDataShort: any = {};
    fieldsDescriptionFull: any = {};
    nodeDataFull: any = {};

    dictionaryId: string;
    bossName = '';

    private _openedNodeSubscription: Subscription;

    constructor(private _dictSrv: EosDictService) {
        this._initInfo();

        this._openedNodeSubscription = this._dictSrv.openedNode$.subscribe((node) => {
            if (node) {
                this.dictionaryId = node.dictionaryId;

                this.fieldsDescriptionShort = node.getShortViewFieldsDescription();
                this.nodeDataShort = node.getShortViewData();
                this.fieldsDescriptionFull = node.getFullViewFieldsDescription();
                this.nodeDataFull = node.getFullViewData();

                if (this.dictionaryId === 'departments' && !node.data.rec['IS_NODE'] && node.children) {
                    const _boss = node.children.find((_chld) => _chld.data.rec['POST_H']);
                    if (_boss) {
                        this.bossName = _boss.data.rec['SURNAME'];
                    } else {
                        this.bossName = '';
                    }
                }
            } else {
                this._initInfo();
            }
        });
    }

    ngOnDestroy() {
        this._openedNodeSubscription.unsubscribe();
    }

    onAction(action: E_RECORD_ACTIONS) {
        this.action.emit(action);
    }

    private _initInfo() {
        this.dictionaryId = null;
        this.fieldsDescriptionFull = {};
        this.fieldsDescriptionShort = {};
        this.nodeDataFull = {};
        this.nodeDataShort = {};
    }
}
