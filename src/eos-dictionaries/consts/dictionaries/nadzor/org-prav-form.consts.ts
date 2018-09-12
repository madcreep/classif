import { IDictionaryDescriptor } from 'eos-dictionaries/interfaces/index';
import {NADZOR_TEMPLATE} from '../nadzor-template';

export const NP_OPF_CL: IDictionaryDescriptor = Object.assign({}, NADZOR_TEMPLATE, {
    id: 'org-prav-form',
    apiInstance: 'NP_OPF_CL',
    title: 'Организационно-правовые формы',
    visible: true,
});
