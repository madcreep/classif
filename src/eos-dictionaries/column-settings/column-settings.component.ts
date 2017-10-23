import { Component, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { ModalDirective, BsModalRef } from 'ngx-bootstrap/modal';
import { DragulaService } from 'ng2-dragula';

import { FieldDescriptor } from '../core/field-descriptor';

@Component({
    selector: 'eos-column-settings',
    templateUrl: 'column-settings.component.html',
})
export class ColumnSettingsComponent {
    @Input() currentFields: FieldDescriptor[] = [];
    @Input() dictionaryFields: FieldDescriptor[] = [];
    @Output() onChoose: EventEmitter<FieldDescriptor[]> = new EventEmitter<FieldDescriptor[]>();
    @ViewChild('modal') public modal: ModalDirective;

    selectedDictItem: FieldDescriptor;
    selectedCurrItem: FieldDescriptor;

    constructor(private dragulaService: DragulaService, public bsModalRef: BsModalRef) {
        // value[3] - src
        // value[1] - droped elem
        dragulaService.drop.subscribe((value) => {
            if (value[3].id === 'curr') {
                this.selectedCurrItem = this.currentFields.find((_f) => _f.title === value[1].innerText);
                this.removeToCurrent();
            } else {
                this.selectedDictItem = this.dictionaryFields.find((_f) => _f.title === value[1].innerText);
                this.addToCurrent();
            }
          });
    }

    public hideModal(): void {
        this.bsModalRef.hide();
    }

    cancel() {
        this.hideModal();
    }

    save() {
        this.onChoose.emit(this.currentFields);
        this.hideModal();
    }

    addToCurrent() {
        if (this.selectedDictItem) {
            this.currentFields.push(this.selectedDictItem);
            this.dictionaryFields.splice(this.dictionaryFields.indexOf(this.selectedDictItem), 1);
            this.selectedDictItem = null;
        }
    }

    removeToCurrent() {
        if (this.selectedCurrItem) {
            this.dictionaryFields.push(this.selectedCurrItem);
            this.currentFields.splice(this.currentFields.indexOf(this.selectedCurrItem), 1);
            this.selectedCurrItem = null;
        }
    }

    select(item: FieldDescriptor, isCurrent: boolean) {
        if (isCurrent) {
            this.selectedCurrItem = item;
        } else {
            this.selectedDictItem = item;
        }
    }

}
