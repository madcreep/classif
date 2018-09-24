import { IDictionaryDescriptor } from 'eos-dictionaries/interfaces';
import { LINEAR_TEMPLATE } from './_linear-template';
import { NOT_EMPTY_STRING } from '../input-validation';

export const COLLISIONS_SEV_DICT: IDictionaryDescriptor = Object.assign({}, LINEAR_TEMPLATE, {
    id: 'sev-collisions',
    apiInstance: 'SEV_COLLISION',
    actions: [],
    visible: true,
    iconName: 'eos-icon-alert-blue',
    defaultOrder: 'COLLISION_NAME',
    keyField: 'COLLISION_CODE',
    title: 'Коллизии СЭВ',
    searchConfig: [],
    fields: [{
        key: 'COLLISION_CODE',
        type: 'number'
    }, {
        key: 'REASON_NUM',
        type: 'number',
        required: true,
        title: '№',
    }, {
        key: 'COLLISION_NAME',
        type: 'string',
        title: 'Название коллизии',
        pattern: NOT_EMPTY_STRING
    }, {
        key: 'RESOLVE_TYPE',
        type: 'number',
        title: 'Способ разрешения',
        required: true,
    }, {
        key: 'DEFAULT_RESOLVE_TYPE',
        type: 'number'
    }, {
        key: 'ALLOWED_RESOLVE_TYPES',
        type: 'string'
    }],
    treeFields: ['COLLISION_NAME'],
    editFields: [],
    listFields: ['REASON_NUM', 'COLLISION_NAME', 'RESOLVE_TYPE'],
    allVisibleFields: [],
});
