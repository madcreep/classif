import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

import { EosApiService } from './eos-api.service';
import { EosDictionary } from '../core/eos-dictionary';
import { EosDictionaryNode } from '../core/eos-dictionary-node';

@Injectable()
export class EosDictService {
    private _dictionaries: Map<string, EosDictionary>;
    private _dictionariesList: Array<{ id: string, title: string }>;
    private _dictionary: EosDictionary;
    private _selectedNode: EosDictionaryNode; // selected in tree
    private _openedNode: EosDictionaryNode; // selected in list of _selectedNode children

    private _dictionariesList$: BehaviorSubject<Array<{ id: string, title: string }>>;
    private _dictionary$: BehaviorSubject<EosDictionary>;
    private _selectedNode$: BehaviorSubject<EosDictionaryNode>;
    private _openedNode$: BehaviorSubject<EosDictionaryNode>;

    constructor(private _api: EosApiService) {
        this._dictionaries = new Map<string, EosDictionary>();
        this._dictionariesList$ = new BehaviorSubject<Array<{ id: string, title: string }>>([]);
        this._selectedNode$ = new BehaviorSubject<EosDictionaryNode>(null);
        this._openedNode$ = new BehaviorSubject<EosDictionaryNode>(null);
        this._dictionary$ = new BehaviorSubject<EosDictionary>(null);
    }

    /* Observable dictionary for subscribing on updates in components */
    get dictionariesList$(): Observable<Array<{ id: string, title: string }>> {
        return this._dictionariesList$.asObservable();
    }

    /* Observable dictionary for subscribing on updates in components */
    get dictionary$(): Observable<EosDictionary> {
        return this._dictionary$.asObservable();
    }

    /* Observable currentNode for subscribing on updates in components */
    get selectedNode$(): Observable<EosDictionaryNode> {
        return this._selectedNode$.asObservable();
    }

    /* Observable openNode for subscribing on updates in components */
    get openedNode$(): Observable<EosDictionaryNode> {
        return this._openedNode$.asObservable();
    }

    public getDictionariesList(): Promise<any> {
        return new Promise((res) => {
            if (this._dictionariesList) {
                res(this._dictionariesList);
            } else {
                res(this._api.getDictionaryListMocked()
                    .then((data: any) => {
                        this._dictionariesList = data;
                        this._dictionariesList$.next(data);
                        return data;
                    })
                );
            }
        });
    }

    public openDictionary(dictionaryId: string): Promise<EosDictionary> {
        return new Promise<EosDictionary>((res, rej) => {
            let _dictionary = this._dictionaries.get(dictionaryId);

            if (_dictionary) {
                res(_dictionary);
            } else {
                res(this._api.getDictionaryMocked(dictionaryId)
                    .then((data: any) => {
                        _dictionary = new EosDictionary(data);
                        this._dictionary = _dictionary;
                        return this._api.getDictionaryNodesMocked(dictionaryId);
                    })
                    .then((data)=>{
                        this._dictionary.init(data)
                        this._dictionaries.set(dictionaryId, _dictionary);
                        this._dictionary$.next(_dictionary);
                        return _dictionary;
                    }));
            }
        });
    }

    public getNode(dictionaryId: string, nodeId: number): Promise<EosDictionaryNode> {
        return new Promise<EosDictionaryNode>((res, rej) => {
            this.openDictionary(dictionaryId)
                .then((_dict) => {
                    let _node = _dict.getNode(nodeId);
                    if (_node) {
                        res(_node);
                    } else {
                        this._api.getNodeMocked(dictionaryId, nodeId)
                            .then((data: any) => {
                                _node = new EosDictionaryNode(data);
                                _dict.addNode(_node, _node.parent.id);
                                res(_node);
                            })
                            .catch((err) => rej(err));
                    }
                })
                .catch((err) => rej(err));
        });
    }

    public selectNode(dictionaryId: string, nodeId: number): Promise<EosDictionaryNode> {
        return new Promise((res, rej) => {
            this.getNode(dictionaryId, nodeId)
                .then((node) => {
                    this._selectedNode = node;
                    this._selectedNode$.next(node);
                    this._openedNode = null;
                    this._openedNode$.next(null);
                    res(node);
                })
                .catch((err) => rej(err));
        });
    }

    public openNode(dictionaryId: string, nodeId: number): Promise<EosDictionaryNode> {
        return new Promise((res, rej) => {
            this.getNode(dictionaryId, nodeId)
                .then((node) => {
                    this._openedNode = node;
                    this._openedNode$.next(node);
                    res(node);
                })
                .catch((err) => rej(err));
        });
    }

    public getChildren(dictionaryId: string, nodeId: number): Promise<EosDictionaryNode[]> {
        return new Promise((res, rej) => {
            this.getNode(dictionaryId, nodeId)
            .then((_node) => {
                rej('not implemented (may be useless)');
            })
            .catch((err) => rej(err));
        });
    }

    public updateNode(dictionaryId: string, nodeId: number, value: EosDictionaryNode): Promise<any> {
        return new Promise((res, rej) => {
            rej('not implemented');
        });
    }

    /*
    openDictionary(dictionaryId: string): Promise<EosDictionary> {

        return Observable.create((observer: Observer<EosDictionary>) => {
            let _dict = this._dictionaries.get(dictionaryId);
            if (!_dict) { }
        });
    }

    openNode(dictionaryId: string, nodeId: number): Observable<EosDictionaryNode> {
        return Observable.create((observer: any) => {
            if (!this._dictionaries.get(dictionaryId)) {

            }
        });
    }
    */
    /* trrash */
    /*
    public loadChildrenNodes(parentId: number): void {
        const parentNode = this._dictionary.getNode(parentId);
        // if it is parent node and children haven't been loaded yet, do it
        if (parentNode.isNode && !parentNode.children) {
            this._loadNodeChildren(parentId);
        }
    }
    */
    /*
    public openDictionary(id: string): void {
        this._changeParameters(id);
    }
    */
    /*
    public selectNode(dictionaryId: string, nodeId: number): void {
        const selectedNode = this._dictionary.getNode(nodeId);
        this._changeParameters(dictionaryId, selectedNode);
    }
    */
    /*
        public openNode(dictionaryId: string, nodeId: number): void {
            const openedNode = this._dictionary.getNode(nodeId);
            this._changeParameters(dictionaryId, openedNode.parent, openedNode);
        }
    */
    // openNode(dictionaryName: string, nodeId: number): void {
    //     this._checkDictionary(dictionaryName);
    //     this._changeParameters(dictionaryName, this._dictionary.getNode(nodeId));
    // }

    // deleteNode(dictionary: string, id: number, hard = false) {
    //
    // }
    /*
    public getNode(dictionaryName: string, nodeId: number): Promise<EosDictionaryNode> {
        const example: EosDictionaryNode = {
            id: nodeId,
            code: 'code',
            title: dictionaryName,
            description: 'description',
            isDeleted: false,
            isNode: false,
            selected: false,
            // hasSubnodes: false,
            data: {
                code: '102',
                shortName: 'lalala',
                fullName: 'lalala lalala lalala',
                note: '',
                indexSEV: 'asd123',
            },
        };
        return Promise.resolve(example);
    }
    */
    /*
    public setNode(node: EosDictionaryNode): void {
    }
    */
    /*
    private _changeParameters(
        dictionaryId: string,
        selectedNode: (EosDictionaryNode | null) = null,
        openedNode: (EosDictionaryNode | null) = null
    ): void {
        this._loadDictionaryIfNeedded(dictionaryId)
            .then(() => {
                this._dictionary = this._dictionaries.get(dictionaryId);
                this._selectedNode = selectedNode;
                this._openedNode = openedNode;
                this._dictionary$.next(this._dictionary);
                this._selectedNode$.next(this._selectedNode);
                this._openedNode$.next(this._openedNode);
            })
            .catch(console.error);

    }
    */
    /* load dictionary list */

    /* load dictionary if it has not been loaded yet */
    /*
    private _loadDictionaryIfNeedded(id: string): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            if (!this._dictionaries.get(id)) {
                this._loadDictionary(id).then(resolve);
            }
            resolve();
        });
    }
    */
    /* load dictionary data with API */
    /*
    private _loadDictionary(id: string): Promise<void> {
        return this._api
            .getDictionaryNodeChildren(id, null, true)
            .then((rootNodes) => {
                const eosNodes: EosDictionaryNode[] = rootNodes.map(
                    ({ parentId, ...rest }) => ({ ...rest, parent: null })
                );
                const dictionary = new EosDictionary(id);
                // TODO: change title
                dictionary.init('Рубрикатор', eosNodes);
                this._dictionaries.set(id, dictionary);
            });
    }
    */
    /* load dictionary node children data with API */
    /*
    private _loadNodeChildren(parentId: number) {
        this._api
            .getDictionaryNodeChildren(this._dictionary.id, parentId, true)
            .then((children) => {
                this._dictionary.setChildren(parentId, children);
                this._dictionary$.next(this._dictionary);
            });
    }
    */
}
