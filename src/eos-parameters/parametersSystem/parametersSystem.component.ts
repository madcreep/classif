import { Component, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfirmWindowService } from 'eos-common/confirm-window/confirm-window.service';
import { CONFIRM_SAVE_ON_LEAVE } from 'eos-dictionaries/consts/confirm.consts';
import { ParamDescriptorSrv } from './shared/service/param-descriptor.service';

@Component({
    // selector: 'eos-parameters-system',
    templateUrl: 'parametersSystem.component.html'
})
export class ParametersSystemComponent implements OnChanges, OnInit {
    disableSave: boolean;
    isChanged: boolean;
    paramId: string;
    constructor(
        private _route: ActivatedRoute,
        private _confirmSrv: ConfirmWindowService,
        private _paramDescSrv: ParamDescriptorSrv
    ) {
        this._route.params.subscribe(params => (this.paramId = params['id']));
    }
    ngOnChanges(changes: SimpleChanges) {
        // console.log('Changes param system', changes);
    }
    ngOnInit() {
        // console.log(!this.isChanged, this.disableSave);
    }
    canDeactivate(_nextState?: any): boolean | Promise<boolean> {
        return this._askForSaving();
    }
    recordChanged(isChanged: boolean) {
        this.isChanged = isChanged;
    }
    turnOffSave(val: boolean) {
        this.disableSave = val;
    }

    private _askForSaving(): Promise<boolean> {
        if (this.isChanged) {
            return this._confirmSrv
                .confirm(Object.assign({}, CONFIRM_SAVE_ON_LEAVE, { confirmDisabled: this.disableSave }))
                .then(doSave => {
                    if (doSave) { // тут нужно сохранить
                        // console.log('saveFromData');
                        this._paramDescSrv.saveDataFromAsk();
                        this.isChanged = false;
                        return true; // временная заглушка
                        // const _data = this.cardEditRef.getNewData();
                        // return this._save(_data).then(node => !!node);
                    } else {
                        this.isChanged = false;
                        return true;
                    }
                })
                .catch((err) => {
                    // console.log('cancel reason', err);
                    return false;
                });
        } else {
            return Promise.resolve(true);
        }
    }
}
