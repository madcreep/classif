import { IMessage } from '../../eos-common/core/message.interface';

export const DEFAULT_DISMISS_TIMEOUT = 1000;
export const LONG_DISMISS_TIMEOUT = 2000;

export const WARN_EDIT_ERROR: IMessage = {
    type: 'warning',
    title: 'Ошибка редактирования: ',
    msg: 'не выбран элемент для редактирования',
    dismissOnTimeout: LONG_DISMISS_TIMEOUT
};

export const DANGER_EDIT_ROOT_ERROR: IMessage = {
    type: 'danger',
    title: 'Ошибка редактирования элемента: ',
    msg: 'вы пытаетесь отредактировать корень (или другой элемент без id). Корень нельзя редактировать'
};

export const DANGER_EDIT_DELETED_ERROR: IMessage = {
    type: 'danger',
    title: 'Ошибка редактирования элемента: ',
    msg: 'удалённые элементы нельзя редактировать'
};

export const DANGER_DELETE_ELEMENT: IMessage = {
    type: 'danger',
    title: 'Ошибка удаления элемента: ',
    msg: 'на этот объект ссылаются другие объекты системы'
};

export const DANGER_LOGICALY_RESTORE_ELEMENT: IMessage = {
    type: 'danger',
    title: 'Ошибка логического восстановления элемента: ',
    msg: 'нельзя логически восстановить подэлемент логически удаленного элемента'
};

export const WARN_SEARCH_NOTFOUND: IMessage = {
    type: 'warning',
    title: 'Ничего не найдено: ',
    msg: 'попробуйте изменить поисковую фразу',
    dismissOnTimeout: LONG_DISMISS_TIMEOUT
};

export const DANGER_NAVIGATE_TO_DELETED_ERROR: IMessage = {
    type: 'danger',
    title: 'Ошибка редактирования элемента: ',
    /* tslint:disable:max-line-length */
    msg: 'больше нет не удалённых элементов. Включите просмотр логически удалённых элементов, чтобы просмотреть, или востановите удалённых элементы, чтобы отредактировать'
    /* tslint:enable:max-line-length */
};

export const INFO_NOTHING_CHANGES: IMessage = {
    type: 'info',
    title: 'Информация о сохранении изменений: ',
    msg: 'текущие изменения совпадают с изначальным значением. Изменения не будут сохранены'
};

export const SUCCESS_SAVE: IMessage = {
    type: 'success',
    title: 'Изменения сохранены',
    msg: '',
    dismissOnTimeout: DEFAULT_DISMISS_TIMEOUT
}
