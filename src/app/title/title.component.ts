import { Component } from '@angular/core';

import { EosDeskService } from '../services/eos-desk.service';

@Component({
    selector: 'eos-title',
    templateUrl: 'title.component.html'
})
export class TitleComponent {
    currentDesk: string;
    /* todo: define it or remove. Mocked now*/
    title = 'Администрирование системы';

    constructor(private _deskSrv: EosDeskService) {
        this._deskSrv.selectedDesk.subscribe((link) => {
            if (link) {
                this.currentDesk = '/desk/';
                if (link) {
                    this.currentDesk += link.id;
                }
            } else {
                this.currentDesk = '#';
            }
        });
    }
}
