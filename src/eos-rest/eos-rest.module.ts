/* todo: remove after debug */
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
/* end:todo */

import { NgModule, Optional, ModuleWithProviders, SkipSelf } from '@angular/core';
import { HttpModule } from '@angular/http';

import { DeliveryComponent } from './clman/delivery.component';
import { RubricComponent } from './clman/rubric.component';
import { DeliveryDetailComponent } from './clman/delivery-detail.component';

import { IApiCfg } from './interfaces/interfaces';
import { ApiCfg } from './core/api-cfg';

/* services */
import { PipRX } from './services/pipRX.service';
import { RubricService } from './services/rubric.service';
import { AuthService } from './services/auth.service';
import { AppContext } from './services/appContext.service';
import { DepartmentService } from './services/department.service';


@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
    ],
    declarations: [
        DeliveryComponent,
        RubricComponent,
        DeliveryDetailComponent,
    ],
    exports: [
        DeliveryComponent,
        RubricComponent
    ],
    providers: [
        PipRX,
        AuthService,
        RubricService,
        DepartmentService,
        AppContext
    ]
})
export class EosRestModule {
    static forRoot(config: IApiCfg): ModuleWithProviders {
        return {
            ngModule: EosRestModule,
            providers: [
                { provide: ApiCfg, useValue: config }
            ]
        };
    }
    constructor( @Optional() @SkipSelf() parentModule: EosRestModule) {
        if (parentModule) {
            throw new Error(
                'EosRestModule is already loaded. Import it in the AppModule only');
        }
    }
}
