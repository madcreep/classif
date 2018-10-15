import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
// import { HttpModule } from '@angular/http';

import { AppRoutingModule } from 'app/app-routing.module';

/*  Components  */
import { ParametersSystemComponent } from './parametersSystem/parametersSystem.component';
import { ParamWebComponent } from './parametersSystem/param-web/param-web.component';
import { ParamOtherComponent } from './parametersSystem/param-other/param-other.component';
import { ParamSearchComponent } from './parametersSystem/param-search/param-search.component';
import { ParamHeaderComponent } from './parametersSystem/shared/param-header/header.component';
import { ParamContextRcComponent } from './parametersSystem/param-context-rc/param-context-rc.component';
import { ParamAuthenticationComponent } from './parametersSystem/param-authentication/param-authentication.component';
import { ParamFielsComponent } from './parametersSystem/param-files/param-files.component';
import { ParamPrjRcComponent } from './parametersSystem/param-prj-rc/param-prj-rc.component';
import { ParamRcComponent } from './parametersSystem/param-rc/param-rc.component';
import { NavParamComponent } from './parametersSystem/shared/nav-param/nav-param.component';



/*  Service  */
import { ParamApiSrv } from './parametersSystem/shared/service/parameters-api.service';
import { EosCommonModule } from 'eos-common/eos-common.module';
import { ParamDescriptorSrv } from './parametersSystem/shared/service/param-descriptor.service';


@NgModule({
    declarations: [
        NavParamComponent,
        ParametersSystemComponent,
        ParamWebComponent,
        ParamOtherComponent,
        ParamSearchComponent,
        ParamHeaderComponent,
        ParamContextRcComponent,
        ParamAuthenticationComponent,
        ParamFielsComponent,
        ParamPrjRcComponent,
        ParamRcComponent
    ],
    imports: [
        BrowserModule,
        TooltipModule.forRoot(),
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        EosCommonModule
    ],
    providers: [
        ParamApiSrv,
        ParamDescriptorSrv
    ],
    exports: [NavParamComponent]
})
export class EosParametersModule {}
