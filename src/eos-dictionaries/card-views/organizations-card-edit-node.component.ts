import { Component, Injector } from '@angular/core';

import { BaseCardEditComponent } from './base-card-edit.component';

@Component({
    selector: 'eos-organizations-card-edit-node',
    templateUrl: 'organizations-card-edit-node.component.html',
    styleUrls: ['organizations-card-edit-node.component.scss']
})
export class OrganizationsCardEditNodeComponent extends BaseCardEditComponent {

    constructor(injector: Injector) {
        super(injector);
    }


}
