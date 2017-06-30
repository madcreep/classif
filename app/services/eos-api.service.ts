import { Injectable } from '@angular/core';

import { DICTIONARIES, DICTIONARIE_LIST, NODES } from './eos-api.mock';
import { EosDictionaryNode } from '../core/eos-dictionary-node';

/* tslint:disable:max-line-length */
const mockRubrics: any[] = [
];
/* tslint:enable:max-line-length */

const mockRubricsMap = new Map<number, EosDictionaryNode>(
    mockRubrics.map((rubric) => [rubric.id, rubric] as [number, EosDictionaryNode])
);

@Injectable()
export class EosApiService {
    private _mockedNodesMap: Map<number, any>;

    constructor() {
        this._mockedNodesMap = new Map<number, any>();
        NODES.forEach((_n) => this._mockedNodesMap.set(_n.id, _n));
    }

    getDictionaryListMocked(): Promise<any> {
        return new Promise((res) => {
            res(DICTIONARIE_LIST);
        });
    }

    getDictionaryMocked(dictionaryId: string): Promise<any> {
        return new Promise((resolve, reject) => {
            if (DICTIONARIES[dictionaryId]) {
                resolve(DICTIONARIES[dictionaryId]);
            } else {
                reject('Dictionary "' + dictionaryId + '" not found');
            }
        });
    }

    getDictionaryNodesMocked(dictionaryId: string): Promise<any> {
        return new Promise((res, rej) => {
            if (DICTIONARIES[dictionaryId]) {
                res(NODES);
            } else {
                rej('Dictionary "' + dictionaryId + '" not found');
            }
        });
    }

    getNodeMocked(dictionaryId: string, nodeId: number): Promise<any> {
        return new Promise((res, rej) => {
            if (DICTIONARIES[dictionaryId]) {
                let _node = this._mockedNodesMap.get(nodeId);
                if (_node) {
                    res(_node);
                } else {
                    rej('Node "' + nodeId + '" not found');
                }
            } else {
                rej('Dictionary "' + dictionaryId + '" not found');
            }
        });
    }

    /*
    getDictionaryNode(dictionaryId: string, id: number): Promise<EosDictionaryNode> {
        return new Promise<EosDictionaryNode>((resolve, reject) => {
            if (dictionaryId === 'rubricator') {
                return resolve(mockRubricsMap.get(id));
            } else {
                reject(`Dictionary '${dictionaryId}' doesn't exist`);
            }
        });
    }

    getDictionaryNodeChildren(
        dictionaryId: string,
        parentId: number = null,
        onlyNodes: boolean = false
    ): Promise<any[]> {
        return new Promise<any[]>((resolve, reject) => {
            if (dictionaryId === 'rubricator') {
                const children: any[] = [];
                mockRubrics.forEach((node) => {
                    if (node.parentId === parentId && (!onlyNodes || node.isNode)) {
                        children.push(node);
                    }
                });
                resolve(children);
            } else {
                reject(`Dictionary '${dictionaryId}' doesn't exist`);
            }
        });
    }
    */
}
