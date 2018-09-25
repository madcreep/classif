import {Component, Injector} from '@angular/core';
import { BaseCardEditComponent } from './base-card-edit.component';

@Component({
    selector: 'eos-broadcast-channel-card-edit',
    templateUrl: 'broadcast-channel-card-edit.component.html',
})
export class BroadcastChannelCardEditComponent extends BaseCardEditComponent {

    currTab = 0;

    constructor(injector: Injector) {
        super(injector);
    }

    get isEmail(): boolean {
        return this.getValue('rec.CHANNEL_TYPE') === 0;
    }


    setTab(idx: number) {
        this.currTab = idx;
    }

}
