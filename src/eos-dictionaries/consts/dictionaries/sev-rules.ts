import { IDictionaryDescriptor } from 'eos-dictionaries/interfaces';
import { LINEAR_TEMPLATE } from './_linear-template';
import {COMMON_FIELD_NAME, COMMON_FIELD_NOTE} from './_common';
import {ISelectOption} from '../../../eos-common/interfaces';

export const  RULES_SEV_DOCTYPES: ISelectOption[] = [{
    value: 1,
    title: 'Документ',
}, {
    value: 2,
    title: 'Проект'
}];

export const RULES_SEV_DICT: IDictionaryDescriptor = Object.assign({}, LINEAR_TEMPLATE, {
    id: 'sev-rules',
    apiInstance: 'SEV_RULE',
    // actions: LINEAR_TEMPLATE.actions.concat(['tableCustomization']), // ??
    visible: true,
    iconName: 'eos-icon-rules-blue',
    title: 'Правила СЭВ',
    keyField: 'ISN_LCLASSIF',
    fields: [...LINEAR_TEMPLATE.fields,
        Object.assign({}, COMMON_FIELD_NAME, {
            title: 'Наименование'
        }),
        Object.assign({}, COMMON_FIELD_NOTE, {
            title: 'Примечание'
        }), {
            key: 'RULE_KIND',
            type: 'number',
            title: 'Вид правила',
        },
        {
            key: 'doctype',
            type: 'select',
            title: 'Тип документа',
            options: RULES_SEV_DOCTYPES,
            required: true,
        }, {
            key: 'DUE_DOCGROUP',
            type: 'select',
            title: 'Группа документов',
        }, {
            key: 'FILTER_CONFIG',
            title: 'FILTER_CONFIG',
            type: 'text',
        }, {
            key: 'SCRIPT_CONFIG',
            title: 'SCRIPT_CONFIG',
            type: 'text'
        }, {
            key: 'DUE_DEP',
            title: 'SCRIPT_CONFIG',
            type: 'string'
        }, {
            key: 'sender',
            type: '',
            title: 'Отправитель',
        }, {
            key: 'receiver',
            type: '',
            title: 'Получатель',
        }, {
            key: 'processing_params',
            type: '',
            title: 'Параметры обработки',
        }],
    editFields: ['CLASSIF_NAME', 'NOTE', 'doctype', 'DUE_DOCGROUP', 'receiver', 'FILTER_CONFIG', 'SCRIPT_CONFIG'],
    listFields: ['CLASSIF_NAME', 'DUE_DOCGROUP'],
    allVisibleFields: ['doctype', 'RULE_KIND', 'DUE_DOCGROUP', 'NOTE', 'sender', 'receiver', 'processing_params'],
    quickViewFields: ['CLASSIF_NAME', 'NOTE', 'doctype', 'RULE_KIND', 'DUE_DOCGROUP', 'sender'],
    searchFields: [],
});
