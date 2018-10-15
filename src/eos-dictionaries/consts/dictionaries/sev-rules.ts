import {IDictionaryDescriptor} from 'eos-dictionaries/interfaces';
import {LINEAR_TEMPLATE } from './_linear-template';
import {COMMON_FIELD_NAME, COMMON_FIELD_NOTE} from './_common';
import {DOCGROUP_DICT} from './docgroup.consts';
import {
    ADDRESS_REPLACE,
    ADDRESSEES_KIND,
    BUNCHS_RK_KIND, CONSIDERATION_KIND, DATE_EXECUTION_PROJECT_KIND,
    DOCUMENT_TYPES, EXECUTOR_CONSIDERATION_KIND, EXECUTOR_PROJECT_KIND, FORWARDING_DOCS_KIND,
    ITEMS_KIND,
    KOR_RULE_SEND, ORDERS_KIND,
    RESOLUTION_KIND, SIGNATURES_KIND,
    TYPE_OF_RULE, VISAS_KIND, VISAS_KIND_TAKE
} from '../sev-const';
import {SECURITY_DICT} from './security.consts';
import {ORG_TYPE_DICT} from './org-type.consts';
import {CONTACT_DICT} from './contact.consts';

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
            key: 'TYPE_DOC',
            type: 'select',
            title: 'Тип документа',
            options: DOCUMENT_TYPES,
            default: 1,
            required: true,
        }, {
            key: 'RULE_KIND',
            type: 'select',
            title: 'Вид правила',
            options: TYPE_OF_RULE,
            default: 1,
            required: true,
        }, {
            key: 'DUE_DOCGROUP',
            type: 'select',
            title: 'Группа документов',
            dictionaryId: DOCGROUP_DICT.id,
            options: [],
            required: true,
        }, {
            key: 'DUE_DEP',
            type: 'select',
            options: [],
            title: 'Отправитель/Получатель',
            required: true,
        }, {
            key: 'SENDER',
            type: 'select',
            options: [],
            title: 'Отправитель',
            required: true,
        }, {
            key: 'BUNCHS_RK',
            type: 'boolean',
            title: 'Связки РК:',
            required: true,
        }, {
            key: 'BUNCHS_RK_KIND',
            type: 'buttons',
            options: BUNCHS_RK_KIND,
            default: 0,
            required: true,
        }, {
            key: 'BUNCHS_RK_TYPE',
            type: 'select',
            options: [],
        }, {
            key: 'STAMP_ACCESS',
            type: 'boolean',
            title: 'Гриф доступа',
            default: true,
        }, {
            key: 'RUBRICS',
            type: 'boolean',
            title: 'Рубрики',
            default: true,
        }, {
            key: 'ADR_SUBJ_DOC',
            type: 'boolean',
            title: 'Адрес субъекта документа',
            default: true,
        }, {
            key: 'RGN_SUBJ_DOC',
            type: 'boolean',
            title: 'Регион субъекта документа',
        }, {
            key: 'VISAS',
            type: 'boolean',
            title: 'Визы',
            default: true,
        }, {
            key: 'ADDRESSEES',
            type: 'boolean',
            title: 'Адресаты',
            default: true,
        }, {
            key: 'ADDRESSEES_KIND',
            type: 'buttons',
            default: 0,
            options: ADDRESSEES_KIND,
        }, {
            key: 'DETAILS',
            title: 'Доп. реквизиты',
            type: 'boolean',
            default: true,
        }, {
            key: 'AVALIBLE',
            title: 'Только доступные пользователю файлы и поручения',
            type: 'boolean',
            default: true,
        }, {
            key: 'FILES',
            title: 'Файлы',
            type: 'boolean',
            default: true,
        }, {
            key: 'FILES_EXTENSION',
            title: 'С расширением',
            type: 'string',
        }, {
            key: 'FILES_STAMP',
            title: 'Гриф доступа',
            type: 'select',
            dictionaryId: SECURITY_DICT.id,
            options: [],
        }, {
            key: 'FILES_MAX_SIZE',
            title: 'Max размер',
            type: 'number',
        }, {
            key: 'RESOLUTION_FILES',
            title: 'Файлы',
            type: 'boolean',
            default: true,
        }, {
            key: 'RESOLUTION_FILES_EXTENSION',
            title: 'С расширением',
            type: 'string',
        }, {
            key: 'RESOLUTION_FILES_MAX_SIZE',
            title: 'Max размер',
            type: 'number',
        }, {
            key: 'Reception',
            title: 'Уведомление о приеме',
            type: 'boolean',
            default: true,
        }, {
            key: 'Registration',
            title: 'Доклад о регистрации (отказ в регистрации)/доклад о редактировании данных',
            type: 'boolean',
            default: true,
        }, {
            key: 'Forwarding',
            title: 'Доклад о направлении документа',
            type: 'boolean',
            default: true,
        }, {
            key: 'Consideration',
            title: 'Доклад о работе с документом (ввод резолюций)',
            type: 'boolean',
            default: true,
        }, {
            key: 'Report',
            title: 'Доклад об исполнении поручения',
            type: 'boolean',
            default: true,
        }, {
            key: 'Redirection',
            title: 'Доклад об отправке документов',
            type: 'boolean',
            default: true,
        }, {
            key: 'Answer',
            title: 'Доклад об отправке документа-ответа',
            type: 'boolean',
            default: true,
        }, {
            key: 'ITEMS',
            title: 'Пункты',
            type: 'boolean',
            default: true,
        }, {
            key: 'ITEMS_KIND',
            type: 'buttons',
            default: 1,
            options: ITEMS_KIND,
        }, {
            key: 'Resolution',
            title: 'Резолюции',
            type: 'boolean',
            default: true,
        }, {
            key: 'RESOLUTION_KIND',
            type: 'buttons',
            default: 1,
            options: RESOLUTION_KIND,
        }, {
            key: 'Category',
            title: 'Категория поручения',
            type: 'boolean',
            default: true,
        }, {
            key: 'Controller',
            title: 'Контролер поручения',
            type: 'boolean',
            default: true,
        }, {
            key: 'RESOLUTION_NOTE',
            title: 'Примечание',
            type: 'boolean',
            default: true,
        }, {
            key: 'Period',
            title: 'Доклады направлять в течении (сутки)',
            type: 'number',
            default: 30,
        }, {
            key: 'handRegistration',
            title: 'Направлять на ручную регистрацию',
            type: 'boolean',
            default: false
        }, {
            key: 'groupDocs',
            title: 'Для групп документов',
            type: 'select',
            options: [],
        }, {
            key: 'cardFile',
            title: 'Картотека автомата',
            type: 'select',
            options: [],
            required: true,
        }, {
            key: 'cabinetFile',
            title: 'Кабинет автомата',
            type: 'select',
            options: [],
            required: true,
        }, {
            key: 'korRuleSend',
            title: 'Корр. РК сформировать',
            type: 'select',
            options: KOR_RULE_SEND,
            required: true,
            default: 1,
        }, {
            key: 'orgCreate',
            title: 'Организации создавать',
            type: 'select',
            dictionaryId: ORG_TYPE_DICT.id,
            options: [],
            required: true,
        }, {
            key: 'adrReplace',
            type: 'buttons',
            options: ADDRESS_REPLACE,
            default: 1,
        }, {
            key: 'orgCreate',
            title: 'Организации создавать',
            type: 'select',
            dictionaryId: ORG_TYPE_DICT.id,
            options: [],
            required: true,
        }, {
            key: 'takeFilesRK',
            title: 'Принимать файлы РК',
            type: 'boolean',
            default: true,
        }, {
            key: 'orders',
            title: 'Поручения',
            type: 'boolean',
            default: true,
        }, {
            key: 'ordersKind',
            type: 'buttons',
            options: ORDERS_KIND,
            default: 0,
        }, {
            key: 'categoryOrders',
            title: 'Категория поручения',
            type: 'boolean',
            default: true,
        }, {
            key: 'noteOrders',
            title: 'Примечание',
            type: 'boolean',
            default: true,
        }, {
            key: 'takeFilesOrders',
            title: 'Принимать файлы РК',
            type: 'boolean',
            default: true,
        }, {
            key: 'takeFilesRK',
            title: 'Файлы РК',
            type: 'boolean',
        }, {
            key: 'takeOrdersRK',
            title: 'Проучния РК',
            type: 'boolean',
        }, {
            key: 'forwardingDocs',
            title: 'Доклад о направлениях документа',
            type: 'boolean',
            default: true,
        }, {
            key: 'kindForwardingDocs',
            type: 'buttons',
            options: FORWARDING_DOCS_KIND,
            default: 1,
        }, {
            key: 'kindConsideration',
            type: 'buttons',
            options: CONSIDERATION_KIND,
            default: 0,
        }, {
            key: 'textConsideration',
            title: 'Текст резолюции',
            type: 'boolean',
        }, {
            key: 'categoryConsideration',
            title: 'Категория резолюции',
            type: 'boolean',
        }, {
            key: 'noteConsideration',
            title: 'Примечание',
            type: 'boolean',
        }, {
            key: 'controlConsideration',
            title: 'Контрольность резолюции',
            type: 'boolean',
        }, {
            key: 'planConsideration',
            title: 'План. дата',
            type: 'boolean',
        }, {
            key: 'controllerOrder',
            title: 'Контролер поручения',
            type: 'boolean',
        }, {
            key: 'executionCourse',
            title: 'Ход исполнения',
            type: 'boolean',
        }, {
            key: 'controlDate',
            title: 'Дата снятия с контроля',
            type: 'boolean',
        }, {
            key: 'executionStatus',
            title: 'Состояние исполненения',
            type: 'boolean',
        }, {
            key: 'controlBase',
            title: 'Основание для снятия с контроля',
            type: 'boolean',
        }, {
            key: 'executors',
            title: 'Исполнители резолюции',
            type: 'boolean',
        }, {
            key: 'kindExecutorConsideration',
            type: 'buttons',
            options: EXECUTOR_CONSIDERATION_KIND,
            default: 0,
        }, {
            key: 'executorFiles',
            title: 'Файлы исполнителя',
            type: 'boolean',
            default: true,
        }, {
            key: 'editSet',
            title: 'Редактировать набор отправляемых уведомлений и докладов после повторного документа СЭВ',
            type: 'boolean',
            default: true,
        }, {
            key: 'calcDate',
            title: 'Пересчитывать срок отправки докуладов',
            type: 'boolean',
            default: true,
        }, {
            key: 'regNumber',
            title: 'Рег.№ в \'Адресат\'',
            type: 'boolean',
        }, {
            key: 'reportExecution',
            title: 'Отчет об исполнении в \'Поручение\'',
            type: 'boolean',
            default: true,
        }, {
            key: 'BUNCHS_RKPD',
            type: 'boolean',
            title: 'Связки РКПД:',
            required: true,
        }, {
            key: 'executorsProject',
            type: 'boolean',
            title: 'Исполнители',
            required: true,
        }, {
            key: 'kindExecutorProject',
            type: 'buttons',
            options: EXECUTOR_PROJECT_KIND,
            default: 1,
        }, {
            key: 'dateExecutionProject',
            type: 'boolean',
            title: 'Срок исполнения',
            required: true,
        }, {
            key: 'kindDateExecutionProject',
            type: 'buttons',
            options: DATE_EXECUTION_PROJECT_KIND,
            default: 1,
        }, {
            key: 'filesRKPD',
            type: 'boolean',
            title: 'Файлы РКПД',
            required: true,
        }, {
            key: 'visasKind',
            type: 'buttons',
            options: VISAS_KIND,
            default: 0,
        }, {
            key: 'visasInfo',
            type: 'boolean',
            title: 'Информация о визе',
            required: true,
        }, {
            key: 'visasFiles',
            type: 'boolean',
            title: 'Файл визы',
            required: true,
        }, {
            key: 'signatures',
            type: 'boolean',
            title: 'Подписи',
            required: true,
        }, {
            key: 'signaturesKind',
            type: 'buttons',
            options: SIGNATURES_KIND,
            default: 0,
        }, {
            key: 'signaturesInfo',
            type: 'boolean',
            title: 'Информация о подписи',
            required: true,
        }, {
            key: 'signaturesFiles',
            type: 'boolean',
            title: 'Файл подписи',
            required: true,
        }, {
            key: 'registrationProject',
            title: 'Доклад о регистрации (отказ в регистрации)',
            type: 'boolean',
            default: true,
        }, {
            key: 'forwardingVisa',
            title: 'Доклад о направлении документа на визирование',
            type: 'boolean',
            default: true,
        }, {
            key: 'forwardingSign',
            title: 'Доклад о направлении документа на подписание',
            type: 'boolean',
            default: true,
        }, {
            key: 'reportVisa',
            title: 'Доклад о визировании',
            type: 'boolean',
            default: true,
        }, {
            key: 'reportSign',
            title: 'Доклад о подписании',
            type: 'boolean',
            default: true,
        }, {
            key: 'executor',
            title: 'Исполнитель',
            type: 'select',
            dictionaryId: CONTACT_DICT.id,
            options: [],
        }, {
            key: 'executive',
            title: 'ДЛ за "Текущую организацию"',
            type: 'select',
            dictionaryId: CONTACT_DICT.id,
            options: [],
        }, {
            key: 'visasKindTake',
            type: 'buttons',
            options: VISAS_KIND_TAKE,
            default: 0,
        }, {
            key: 'signatureKindTake',
            type: 'buttons',
            options: VISAS_KIND_TAKE,
            default: 0,
        }, {
            key: 'visaDate',
            title: 'Срок визы, если требуемый срок истек',
            type: 'number',
        }, {
            key: 'visaDays',
            title: 'дней',
            type: 'boolean',
            default: true,
        }, {
            key: 'signatureDate',
            title: 'Срок подписи, если требуемый срок истек',
            type: 'number',
        }, {
            key: 'signatureDays',
            title: 'дней',
            type: 'boolean',
            default: true,
        }, {
            key: 'visaForward',
            title: 'Направить на визирование',
            type: 'boolean',
        }, {
            key: 'signatureForward',
            title: 'Направить на подпись',
            type: 'boolean',
        }],
    editFields: ['CLASSIF_NAME', 'NOTE', 'TYPE_DOC', 'RULE_KIND', 'DUE_DOCGROUP', 'DUE_DEP', 'SENDER', 'BUNCHS_RK',
        'BUNCHS_RK_KIND', 'BUNCHS_RK_TYPE', 'STAMP_ACCESS', 'RUBRICS', 'ADR_SUBJ_DOC', 'RGN_SUBJ_DOC', 'VISAS',
        'ADDRESSEES', 'ADDRESSEES_KIND', 'DETAILS', 'AVALIBLE', 'FILES', 'FILES_EXTENSION', 'FILES_STAMP',
        'FILES_MAX_SIZE', 'Reception', 'Registration', 'Forwarding', 'Consideration', 'Report', 'Redirection',
        'Answer', 'ITEMS', 'ITEMS_KIND', 'Resolution', 'RESOLUTION_KIND', 'Category', 'Controller', 'RESOLUTION_NOTE',
        'RESOLUTION_FILES', 'RESOLUTION_FILES_EXTENSION', 'RESOLUTION_FILES_MAX_SIZE', 'Period', 'handRegistration',
        'groupDocs', 'cardFile', 'cabinetFile', 'korRuleSend', 'orgCreate', 'adrReplace', 'orgCreate', 'takeFilesRK',
        'orders', 'ordersKind', 'categoryOrders', 'noteOrders', 'takeFilesOrders', 'takeFilesRK', 'takeOrdersRK', 'forwardingDocs',
        'kindForwardingDocs', 'kindConsideration', 'textConsideration', 'categoryConsideration', 'noteConsideration',
        'controlConsideration', 'planConsideration', 'controllerOrder', 'executionCourse', 'controlDate', 'executionStatus', 'controlBase',
        'executorConsideration', 'kindExecutorConsideration', 'executors', 'executorFiles', 'editSet', 'calcDate', 'regNumber',
        'BUNCHS_RKPD', 'executorsProject', 'kindExecutorProject', 'dateExecutionProject', 'kindDateExecutionProject', 'filesRKPD',
        'visasKind', 'visasInfo', 'visasFiles', 'signatures', 'signaturesKind', 'signaturesInfo', 'signaturesFiles', 'registrationProject',
        'forwardingVisa', 'forwardingSign', 'reportVisa', 'reportSign', 'executor', 'executive', 'visaDate', 'visaDays',
        'signatureDate', 'signatureDays', 'visaForward', 'signatureForward', 'visasKindTake', 'signatureKindTake'],
    listFields: ['CLASSIF_NAME', 'NOTE'],
    allVisibleFields: [],
    quickViewFields: ['CLASSIF_NAME', 'NOTE', 'TYPE_DOC', 'RULE_KIND', 'DUE_DOCGROUP', 'DUE_DEP'],
    searchFields: [],
});
