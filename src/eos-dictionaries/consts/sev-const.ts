export interface OptionDiscription {
    value: any;
    title: string;
    selected?: boolean;
}

export const ENCRYPTION_TYPE: Array<OptionDiscription> = [{
    value: 0,
    title: 'Нет',
}, {
    value: 1,
    title: 'SSL'
}, {
    value: 2,
    title: 'StartTLS'
}];

export const CHANNEL_TYPE: Array<OptionDiscription> = [{
    value: 'email',
    title: 'E-mail'
}, {
    value: 'FileSystem',
    title: 'Файловая система'
}];

export const AUTH_METHOD: Array<OptionDiscription> = [
    { value: 0, title: 'Авторизация не требуется', },
    { value: 1, title: 'Авторизация Windows' },
    { value: 2, title: 'Авторизация логин/пароль' }

];

export const TYPE_OF_RULE: Array<OptionDiscription> = [{
    value: 0,
    title: 'Отправка документа'
}, {
    value: 0,
    title: 'Прием документа'
}, {
    value: 0,
    title: 'Отправка доклада'
}, {
    value: 0,
    title: 'Прием доклада'
}];

export const DOCUMENTS_GROUP: Array<OptionDiscription> = [];

/**
 * Document type of SEV rules
 */
export const DOCUMENT_TYPES: Array<OptionDiscription> = [{
    value: 0,
    title: 'Документ'
}, {
    value: 0,
    title: 'Проект'
}];

export const SENDER: Array<OptionDiscription> = [{
    value: 0,
    title: 'Для всех организаций'
}];
