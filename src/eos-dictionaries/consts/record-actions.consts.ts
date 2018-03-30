import { IAction, E_RECORD_ACTIONS, E_ACTION_GROUPS } from 'eos-dictionaries/interfaces';

export const RECORD_ACTIONS_EDIT = {
    type: E_RECORD_ACTIONS.edit,
    group: E_ACTION_GROUPS.item,
    title: 'Редактировать',
    hint: 'Редактировать',
    iconClass: 'eos-icon eos-icon-edit-blue small',
    disabledIconClass: 'eos-icon eos-icon-edit-grey small',
    hoverIconClass: 'eos-icon eos-icon-edit-dark-blue small',
    activeIconClass: null,
    buttonClass: null
};

export const RECORD_ACTIONS_NAVIGATION_UP = {
    type: E_RECORD_ACTIONS.navigateUp,
    group: E_ACTION_GROUPS.item,
    title: null,
    hint: 'Предыдущая',
    iconClass: 'eos-icon eos-icon-arrow-v-blue-top small',
    disabledIconClass: 'eos-icon eos-icon-arrow-v-grey-top small',
    buttonClass: null
};

export const RECORD_ACTIONS_NAVIGATION_DOWN = {
    type: E_RECORD_ACTIONS.navigateDown,
    group: E_ACTION_GROUPS.item,
    title: null,
    hint: 'Следующая',
    iconClass: 'eos-icon eos-icon-arrow-v-blue-bottom small',
    disabledIconClass: 'eos-icon eos-icon-arrow-v-grey-bottom small',
    buttonClass: null
};

export const RECORD_ACTIONS: IAction[] = [{
    type: E_RECORD_ACTIONS.add,
    group: E_ACTION_GROUPS.common,
    title: 'Создать',
    hint: 'Создать',
    iconClass: 'eos-icon eos-icon-plus-blue small',
    disabledIconClass: 'eos-icon eos-icon-plus-grey small',
    activeIconClass: null,
    hoverIconClass: 'eos-icon eos-icon-plus-dark-blue small',
    buttonClass: null
},
    RECORD_ACTIONS_EDIT,
{
    type: E_RECORD_ACTIONS.remove,
    group: E_ACTION_GROUPS.group,
    title: 'Удалить логически',
    hint: 'Удалить логически',
    iconClass: 'eos-icon eos-icon-bin-blue small',
    disabledIconClass: 'eos-icon eos-icon-bin-grey small',
    activeIconClass: null,
    hoverIconClass: 'eos-icon eos-icon-bin-dark-blue small',
    buttonClass: null
}, {
    type: E_RECORD_ACTIONS.showDeleted,
    group: E_ACTION_GROUPS.group,
    title: 'Отображать логически удалённые',
    hint: 'Отображать логически удалённые',
    iconClass: 'eos-icon eos-icon-show-blue small',
    disabledIconClass: 'eos-icon eos-icon-show-grey small',
    activeIconClass: 'eos-icon eos-icon-show-white small',
    hoverIconClass: '',
    buttonClass: null
}, {
    type: E_RECORD_ACTIONS.userOrder,
    group: E_ACTION_GROUPS.group,
    title: 'Пользовательская сортировка',
    hint: 'Пользовательская сортировка',
    iconClass: 'eos-icon eos-icon-custom-list-blue small',
    disabledIconClass: 'eos-icon eos-icon-custom-list-grey small',
    activeIconClass: 'eos-icon eos-icon-custom-list-white small',
    hoverIconClass: 'eos-icon eos-icon-custom-list-white small',
    buttonClass: null
}, {
    type: E_RECORD_ACTIONS.moveUp,
    group: E_ACTION_GROUPS.item,
    title: 'Вверх',
    hint: 'Вверх',
    iconClass: 'eos-icon eos-icon-arrow-v-blue-top small',
    disabledIconClass: 'eos-icon eos-icon-arrow-v-grey-top small',
    activeIconClass: null,
    hoverIconClass: 'eos-icon eos-icon-arrow-v-dark-blue-top small',
    buttonClass: null
}, {
    type: E_RECORD_ACTIONS.moveDown,
    group: E_ACTION_GROUPS.item,
    title: 'Вниз',
    hint: 'Вниз',
    iconClass: 'eos-icon eos-icon-arrow-v-blue-bottom small',
    disabledIconClass: 'eos-icon eos-icon-arrow-v-grey-bottom small',
    activeIconClass: null,
    hoverIconClass: 'eos-icon eos-icon-arrow-v-dark-blue-bottom small',
    buttonClass: null
}, {
    type: E_RECORD_ACTIONS.showAllSubnodes,
    group: E_ACTION_GROUPS.common,
    title: 'Отобразить все дочерние записи единым списком',
    hint: 'Отобразить все дочерние записи единым списком',
    iconClass: 'eos-icon eos-icon-tree-blue small',
    disabledIconClass: 'eos-icon eos-icon-tree-grey small',
    activeIconClass: 'eos-icon eos-icon-tree-white small',
    hoverIconClass: '',
    buttonClass: null
}, {
    type: E_RECORD_ACTIONS.tableCustomization,
    group: E_ACTION_GROUPS.common,
    title: 'Настройка отображения',
    hint: 'Настройка отображения',
    iconClass: 'eos-icon eos-icon-settings-blue small',
    disabledIconClass: '',
    activeIconClass: null,
    hoverIconClass: '',
    buttonClass: null
}
   /* RECORD_ACTIONS_NAVIGATION_UP,
RECORD_ACTIONS_NAVIGATION_DOWN*/ ];

export const MORE_RECORD_ACTIONS: IAction[] = [{
    type: E_RECORD_ACTIONS.restore,
    group: E_ACTION_GROUPS.group,
    title: 'Восстановить',
    hint: 'Восстановить логически удаленные элементы',
    iconClass: 'eos-icon eos-icon-repair-blue small',
    disabledIconClass: 'eos-icon eos-icon-repair-grey small',
    activeIconClass: '',
    hoverIconClass: 'eos-icon eos-icon-repair-dark-blue small',
    buttonClass: null
}, {
    type: E_RECORD_ACTIONS.removeHard,
    group: E_ACTION_GROUPS.group,
    title: 'Удалить навсегда',
    hint: 'Удалить навсегда',
    iconClass: 'eos-icon eos-icon-bin-forever-blue small',
    disabledIconClass: 'eos-icon eos-icon-bin-forever-grey small',
    activeIconClass: null,
    hoverIconClass: 'eos-icon eos-icon-bin-forever-dark-blue small',
    buttonClass: null
}, {
    type: E_RECORD_ACTIONS.createRepresentative,
    group: E_ACTION_GROUPS.group,
    title: 'Создать представителя организации',
    hint: 'Создать представителя организации',
    iconClass: 'eos-icon eos-icon-avatar-blue small',
    disabledIconClass: 'eos-icon eos-icon-avatar-grey small',
    activeIconClass: null,
    hoverIconClass: 'eos-icon eos-icon-avatar-dark-blue small',
    buttonClass: null
}];

export const COMMON_ADD_MENU = [{
    params: { 'IS_NODE': 0 },
    title: 'Создать вершину'
},
{
    params: { 'IS_NODE': 1 },
    title: 'Создать лист'
}];

export const DEPARTMENT_ADD_MENU = [
    {
        params: { 'IS_NODE': 0 },
        title: 'Создать подразделение'
    },
    {
        params: { 'IS_NODE': 1 },
        title: 'Создать должностное лицо'
    }
];
