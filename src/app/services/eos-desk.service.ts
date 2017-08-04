import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

import { Router, ActivatedRoute } from '@angular/router';

import { EosDictService } from '../services/eos-dict.service';
import { IDeskItem } from '../core/desk-item.interface';
import { EosDesk } from '../core/eos-desk';

@Injectable()
export class EosDeskService {
    private _desksList: EosDesk[];
    private _selectedDesk: EosDesk;
    private _recentItems: IDeskItem[];

    private _desksList$: BehaviorSubject<EosDesk[]>;
    private _selectedDesk$: BehaviorSubject<EosDesk>;
    private _recentItems$: BehaviorSubject<IDeskItem[]>;

    constructor(private eosDictionaryService: EosDictService, private router: Router) {
        this._desksList = [{
            id: 'system',
            name: 'System desk',
            references: [],
            edited: false,
        }, {
            id: '2',
            name: 'Desk2',
            references: [{
                link: 'rubricator',
                title: 'Рубрикатор',
            }],
            edited: false,
        }, {
            id: '100',
            name: 'Desk100',
            references: [],
            edited: false,
        }];

        eosDictionaryService.dictionariesList$
            .subscribe((dictionariesList) => {
                this._desksList[0].references = dictionariesList.map((dictionary) => {
                    return {
                        link: '/spravochniki/' + dictionary.id,
                        title: dictionary.title,
                    };
                });

                if (this._selectedDesk$ && this._selectedDesk) {
                    if (this._selectedDesk.id == 'system')
                    this._selectedDesk$.next(this._desksList[0])
                };
            });

        this._desksList$ = new BehaviorSubject(this._desksList);
        this._selectedDesk = this._desksList[0];
        this._selectedDesk$ = new BehaviorSubject(this._selectedDesk);
        this._recentItems$ = new BehaviorSubject([{
            link: '/spravochniki/rubricator',
            title: 'Рубрикатор',
        }]);

    }


    get desksList(): Observable<EosDesk[]> {
        return this._desksList$.asObservable();
    }

    get selectedDesk(): Observable<EosDesk> {
        return this._selectedDesk$.asObservable();
    }

    get recentItems(): Observable<IDeskItem[]> {
        return this._recentItems$.asObservable();
    }

    setSelectedDesk(deskId: string) {
        this._selectedDesk = this._desksList.find((d) =>  d.id === deskId);
        this._selectedDesk$.next(this._selectedDesk || this._desksList[0]);
    }

    pinRef(i: number, link: IDeskItem): void {
        this._desksList[i].references.push(link);
        this._desksList$.next(this._desksList);
    }

    unpinRef(link: IDeskItem): void {
        this._selectedDesk.references = this._selectedDesk.references.filter((r) => r !== link);
        this._selectedDesk$.next(this._selectedDesk);
    }

    addRecentItem(link: IDeskItem): void {
        this._recentItems.push(link);
        if (this._recentItems.length > 10) {
            this._recentItems.shift();
        }
        this._recentItems$.next(this._recentItems);
    }

    removeDesk(desk: EosDesk): void {
        if (this._selectedDesk === desk) {
            this._selectedDesk = this._desksList[0]; // system desk
            this._selectedDesk$.next(this._selectedDesk);
        }

        this._desksList = this._desksList.filter((d) => d !== desk);
        this._desksList$.next(this._desksList);
    }

    editDesk(desk: EosDesk): void {
        this._desksList.splice(this._desksList.indexOf(desk), 1, desk);
        this._desksList$.next(this._desksList);
    }

    createDesk(desk: EosDesk): void {
        if (!desk.id) desk.id = (this._desksList.length + 1).toString();
        this._desksList.push(desk);
        this._desksList$.next(this._desksList);
    }
}