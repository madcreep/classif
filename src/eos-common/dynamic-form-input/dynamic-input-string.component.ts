import { Component } from '@angular/core';
import { DynamicInputBase } from './dynamic-input-base';

@Component({
    selector: 'eos-dynamic-input-string',
    templateUrl: 'dynamic-input-string.component.html'
})
export class DynamicInputStringComponent extends DynamicInputBase {

    get textType(): string {
        if (this.input.password) {
            return 'password';
        }
        return 'text';
    }
}
