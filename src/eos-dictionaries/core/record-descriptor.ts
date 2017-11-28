import { IDictionaryDescriptor, E_FIELD_SET, IFieldView } from './dictionary.interfaces';
import { FieldDescriptor } from './field-descriptor';
import { AbstractDictionaryDescriptor } from 'eos-dictionaries/core/abstract-dictionary-descriptor';

export class RecordDescriptor {
    protected dictionary: AbstractDictionaryDescriptor;
    parentField?: FieldDescriptor;
    keyField: FieldDescriptor;
    fields: FieldDescriptor[];
    fieldsMap: Map<string, FieldDescriptor>;

    constructor(dictionary: AbstractDictionaryDescriptor, data: IDictionaryDescriptor) {
        const fields = data.fields;
        this.dictionary = dictionary;
        this.fieldsMap = new Map<string, FieldDescriptor>();
        this.fields = [];
        fields.forEach((f) => {
            const _field = new FieldDescriptor(f);
            this.fields.push(_field);
            this.fieldsMap.set(_field.key, _field);
        });

        this._setCustomField('keyField', data);
    }

    protected _setCustomField(fldName: string, data: IDictionaryDescriptor) {
        if (fldName) {
            this[fldName] = this.fieldsMap.get(data[fldName]);
        }

        if (!this[fldName]) {
            throw new Error('No field decribed for "' + fldName + '"');
        }
    }

    addFieldToSet(name: string, fieldSet: FieldDescriptor[]) {
        const fld = this.fieldsMap.get(name);
        /* tslint:disable:no-bitwise */
        if (fld && !~fieldSet.findIndex((f) => f.key === fld.key)) {
            fieldSet.push(fld);
        }
        /* tslint:enable:no-bitwise */
    }

    getListView(data: any): IFieldView[] {
        return this._bindData(this.dictionary.getFieldSet(E_FIELD_SET.list), data.rec);
    }

    getQuickView(data: any): IFieldView[] {
        return this._bindData(this.dictionary.getFieldSet(E_FIELD_SET.quickView, data.rec), data.rec);
    }

    getShortQuickView(data: any): IFieldView[] {
        return this._bindData(this.dictionary.getFieldSet(E_FIELD_SET.shortQuickView, data.rec), data.rec);
    }

    getEditView(data: any): IFieldView[] {
        return this._bindData(this.dictionary.getFieldSet(E_FIELD_SET.edit, data.rec), data.rec);
    }

    getEditFieldDescription(data: any): any {
        return this.dictionary.getFieldDescription(E_FIELD_SET.edit, data);
    }

    getShortQuickFieldDescription(data: any): any {
        return this.dictionary.getFieldDescription(E_FIELD_SET.shortQuickView, data);
    }

    getQuickFieldDescription(data: any): any {
        return this.dictionary.getFieldDescription(E_FIELD_SET.quickView, data);
    }

    private _bindData(fields: FieldDescriptor[], data: any): IFieldView[] {
        return fields.map((fld) => Object.assign({}, fld, { value: data[fld.foreignKey] }));
    }
}

