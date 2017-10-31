import { Injectable } from '@angular/core';

import { DICTIONARIES } from '../consts/dictionaries.consts';
import { E_DICT_TYPE } from '../core/dictionary.interfaces';
import { AbstractDictionaryDescriptor } from '../core/abstract-dictionary-descriptor';
import { EosDictionaryNode } from '../core/eos-dictionary-node';

import { BaseDictionaryService } from '../../eos-rest/services/base-dictionary.service';
import { LinearDictionaryService } from '../../eos-rest/services/linear-dictionary.service';
import { TreeDictionaryService } from '../../eos-rest/services/tree-dictionary.service';
import { DepartmentService } from '../../eos-rest/services/department.service';

@Injectable()
export class EosDictApiService {
    private _type: E_DICT_TYPE;
    private _dictionaries: any;
    private _service: BaseDictionaryService;

    constructor(
        private _linearSrv: LinearDictionaryService,
        private _treeSrv: TreeDictionaryService,
        private _deptSrv: DepartmentService,
    ) {
        this._dictionaries = {};
        DICTIONARIES.sort((a, b) => {
            if (a.title > b.title) {
                return 1;
            } else if (a.title < b.title) {
                return -1;
            } else {
                return 0;
            }
        }).forEach((dict) => this._dictionaries[dict.id] = dict);
    }

    init(descriptor: AbstractDictionaryDescriptor) {
        if (descriptor) {
            this._type = descriptor.type;
        } else {
            this._type = null;
        }
        switch (this._type) {
            case E_DICT_TYPE.linear:
                this._service = this._linearSrv;
                this._linearSrv.setInstance(descriptor.apiInstance);
                break;

            case E_DICT_TYPE.tree:
                this._service = this._treeSrv;
                this._treeSrv.setInstance(descriptor.apiInstance);
                break;

            case E_DICT_TYPE.department:
                this._service = this._deptSrv;
                break;

            default:
                this._service = null;
        }
    }

    getDictionaryDescriptorData(dictionaryId: string): Promise<any> {
        return new Promise((resolve, reject) => {
            if (this._dictionaries[dictionaryId]) {
                resolve(this._dictionaries[dictionaryId]);
            } else {
                reject('Dictionary descriptor data for "' + dictionaryId + '" not found');
            }
        });
    }

    getRoot(): Promise<any[]> {
        switch (this._type) {
            case E_DICT_TYPE.linear:
                return this._service.getData();
            case E_DICT_TYPE.tree:
            case E_DICT_TYPE.department:
                return this.getNodeWithChildren('0.');
            default:
                return this._noData();
        }
    }

    getNodes(nodeId?: string, level = 0): Promise<any[]> {
        let _promise: Promise<any[]>;
        const _params = {
            DUE: (nodeId ? nodeId : '0.') + '%',
        };
        if (this._service) {
            _promise = this._service.getData(_params);
        } else {
            _promise = this._noData();
        }
        return _promise;
    }

    getNode(nodeId: string | number): Promise<any> {
        switch (this._type) {
            case E_DICT_TYPE.linear:
            case E_DICT_TYPE.tree:
            case E_DICT_TYPE.department:
                const _params = [nodeId];
                console.log('getNode', _params);
                return this._service.getData(_params);
            default:
                return this._noData();
        }
    }

    getNodeWithChildren(nodeId: string): Promise<any[]> {
        return this.getNode(nodeId)
            .then((rootNode) => {
                if (rootNode && !isNaN(rootNode.ISN_NODE)) {
                    return this.getChildren(rootNode.ISN_NODE)
                        .then((nodes) => {
                            return [rootNode].concat(nodes);
                        });
                } else {
                    return [rootNode];
                }
            });
    }

    update(originalData: any, updates: any): Promise<any> {
        return this._service.update(originalData, updates);
    }

    getChildren(node: EosDictionaryNode): Promise<any[]> {
        console.log('get children');
        switch (this._type) {
            case E_DICT_TYPE.linear:
                return this._service.getData();
            case E_DICT_TYPE.tree:
            case E_DICT_TYPE.department:
                const _id = node.originalParentId;
                const _children = {
                    [node._descriptor.parentField.foreignKey]: _id + ''
                };
                return this._service.getData(_children);
            default:
                return this._noData();
        }
    }

    private _noData(): Promise<any[]> {
        return new Promise((res, rej) => res([]));
    }

    addNode(parentData: any, nodeData: any): Promise<any> {
        switch (this._type) {
            case E_DICT_TYPE.linear:
                return this._service.create(nodeData);
            case E_DICT_TYPE.tree:
            case E_DICT_TYPE.department:
                return this._service.create(parentData, nodeData);
            default:
                return this._noData();
        }
    }

    deleteNode(nodeData: any): Promise<any> {
        return this._service.delete(nodeData);
    }
}
