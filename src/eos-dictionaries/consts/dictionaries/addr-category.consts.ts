import { IDictionaryDescriptor } from 'eos-dictionaries/interfaces';
import { LINEAR_TEMPLATE } from './_linear-template';
import { COMMON_FIELD_NAME } from './_common';
import { ISelectOption } from '../../../eos-common/interfaces';

export const ADDR_CATEGORY_DICT: IDictionaryDescriptor = Object.assign({}, LINEAR_TEMPLATE, {
    id: 'addr-category',
    apiInstance: 'ADDR_CATEGORY_CL',
    title: 'Категории адресатов',
    visible: true,
    iconName: 'eos-icon-address-category-blue',
    fields: [...LINEAR_TEMPLATE.fields,
        Object.assign({}, COMMON_FIELD_NAME, {
            isUnique: true,
            uniqueInDict: true,
        })],
    listFields: ['CLASSIF_NAME'],
    allVisibleFields: ['NOTE'],
    quickViewFields: ['CLASSIF_NAME', 'NOTE'],
    searchFields: ['CLASSIF_NAME'],
});

export const ADDR_CATEGORY_OPTIONS: ISelectOption[] = [];
