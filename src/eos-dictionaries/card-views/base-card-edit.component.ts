import { /* Output, */ Input, /* EventEmitter, */ Injector } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { EosDictService } from '../services/eos-dict.service';
import { Subscription } from 'rxjs/Subscription';

export class BaseCardEditComponent {
    @Input() form: FormGroup;
    @Input() inputs: any;
    @Input() data: any;
    @Input() editMode: boolean;
    @Input() dutysList: string[];
    @Input() fullNamesList: string[];
    /*
    @Output() formChanged: EventEmitter<any> = new EventEmitter<any>();
    @Output() formInvalid: EventEmitter<boolean> = new EventEmitter<boolean>();
    */

    // inputs: any;
    // newData: any;
    // form: FormGroup;
    nodeId: string;

    protected dictSrv: EosDictService;
    protected formChanges$: Subscription;


    /* private _dates: any = {}; */
    constructor(injector: Injector) {
        this.dictSrv = injector.get(EosDictService);
    }

    /**
     * make string[] from object keys
     * @param data object which keys is used
     */
    keys(data: Object): string[] {
        if (data) {
            return Object.keys(data);
        } else {
            return [];
        }
    }

    protected getValue(path: string): any {
        const control = this.form.controls[path];
        if (control) {
            return control.value;
        } else {
            return null;
        }
    }

    protected setValue(path: string, value: any) {
        const control = this.form.controls[path];
        if (control) {
            control.setValue(value);
        }
    }

    protected unsubscribe() {
        if (this.formChanges$) {
            this.formChanges$.unsubscribe();
        }
    }
}
