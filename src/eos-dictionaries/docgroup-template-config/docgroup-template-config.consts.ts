export const DG_TPL_GRP_IDX = { key: '{1}', title: 'Индекс группы документов' };
export const DG_TPL_NUMBER = { key: '{2}', title: 'Порядковый номер' };
export const DG_TPL_FOLDER_IDX = { key: '{3}', title: 'Индекс дела по номенклатуре' };
export const DG_TPL_SIGANTORY_IDX = { key: '{4}', title: 'Индекс лица, подписавшего документ' };
export const DG_TPL_DEP_IDX = { key: '{5}', title: 'Индекс подразделения исполнителя' };
export const DG_TPL_PREFIX = { key: '{6}', title: 'Префикс обращений граждан' };
export const DG_TPL_ACCESS_IDX = { key: '{7}', title: 'Индекс грифа доступа' };
export const DG_TPL_YEAR = { key: '{8}', title: 'Год регистрации документа' };
export const DG_TPL_LINK_IDX = { key: '{9}', title: 'Индекс связки' };
export const DG_TPL_LINKED_DOC_REG_NUMBER = { key: '{A}', title: 'Рег. № связанного документа' };
export const DG_TPL_LINKED_DOC_NUMBER = { key: '{B}', title: 'Порядковый номер связанного документа' };
export const DG_TPL_RK_NUMBER = { key: '{C}', title: 'Порядковый номер в пределах связанной РК' };
export const DG_TPL_SEPARATOR1 = { key: '-', title: 'Разделитель' };
export const DG_TPL_SEPARATOR2 = { key: '/', title: 'Разделитель' };
export const DG_TPL_MANUAL_NUMBER = { key: '{@}', title: 'Свободный номер' };
export const DG_TPL_COMB1 = { key: '{@2}', title: 'Сводобный + порядковый номер' };
export const DG_TPL_COMB2 = { key: '{1#}', title: 'Спец. элемент первичного документа' };
export const DG_TPL_COMB3 = { key: '{2#}', title: 'Спец. элемент повторного документа' };
export const DG_TPL_COMB4 = { key: '{3#}', title: 'Специальный элемент ответов' };
export const DG_TPL_NUM_NP = { key: '{N}', title: 'Номер НП' };


export const VALID_TEMPLATE_EXPR = /\{2|A|B|C|2#|3#|@|@2\}/;
export const VALID_PRJ_TEMPLATE_EXPR = /\{2|@|@2\}/;
export const SINGLE_TEMPLATE_ITEM_EXPR = /\{@|@2|2#|3#\}/;


export const DOC_TEMPLATE_ELEMENTS = [
    DG_TPL_GRP_IDX,
    DG_TPL_NUMBER,
    DG_TPL_FOLDER_IDX,
    DG_TPL_SIGANTORY_IDX,
    DG_TPL_DEP_IDX,
    DG_TPL_PREFIX,
    DG_TPL_ACCESS_IDX,
    DG_TPL_YEAR,
    DG_TPL_LINK_IDX,
    DG_TPL_LINKED_DOC_REG_NUMBER,
    DG_TPL_LINKED_DOC_NUMBER,
    DG_TPL_RK_NUMBER,
    DG_TPL_SEPARATOR1,
    DG_TPL_SEPARATOR2,
    DG_TPL_MANUAL_NUMBER,
    DG_TPL_COMB1,
    DG_TPL_COMB2,
    DG_TPL_COMB3,
    DG_TPL_COMB4,
    DG_TPL_NUM_NP,
];

export const PRJ_TEMPLATE_ELEMENTS = [
    DG_TPL_GRP_IDX,
    DG_TPL_NUMBER,
    DG_TPL_DEP_IDX,
    DG_TPL_ACCESS_IDX,
    DG_TPL_SEPARATOR1,
    DG_TPL_SEPARATOR2,
    DG_TPL_MANUAL_NUMBER,
    DG_TPL_COMB1,
];
