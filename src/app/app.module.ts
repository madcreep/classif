import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler, LOCALE_ID } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { SortableModule } from 'ngx-bootstrap/sortable';

import { EosErrorHandler } from './core/error-handler';

import { APP_CONFIG_LOCAL } from './app.config.local';

import { AppRoutingModule } from './app-routing.module';
import { EosCommonModule } from '../eos-common/eos-common.module';
import { EosDictionariesModule } from '../eos-dictionaries/eos-dictionaries.module';
import { EosRestModule } from '../eos-rest/eos-rest.module';

import { EosParametersModule } from '../eos-parameters/eos-parameters.module';

import { AppComponent } from './app.component';
import { BreadcrumbsComponent } from './breadcrumb/breadcrumb.component';
import { DesktopComponent } from './desktop/desktop.component';
import { DesktopListComponent } from './desktop-list/desktop-list.component';
import { DesktopSwitcherComponent } from './desktop-switcher/desktop-switcher.component';
import { EosHeaderComponent } from './header/eos-header.component';
import { LoginComponent } from './login/login.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { NoticeComponent } from './notice/notice.component';
import { PushpinComponent } from './pushpin/pushpin.component';
import { SearchComponent } from './search/search.component';

import { TestPageComponent } from './test-page/test-page.component';

import { TitleComponent } from './title/title.component';
import { UserComponent } from './user/user.component';

import { EosBreadcrumbsService } from './services/eos-breadcrumbs.service';
import { EosDeskService } from './services/eos-desk.service';
import { EosNoticeService } from './services/eos-notice.service';
import { EosStorageService } from './services/eos-storage.service';
import { EosUserProfileService } from './services/eos-user-profile.service';

/* guards */
import { AuthorizedGuard, UnauthorizedGuard } from './guards/eos-auth.guard';
import { CanDeactivateGuard } from './guards/can-deactivate.guard';
/* end guards */


@NgModule({
    declarations: [
        AppComponent,
        BreadcrumbsComponent,
        DesktopComponent,
        DesktopListComponent,
        DesktopSwitcherComponent,
        EosHeaderComponent,
        LoginComponent,
        LoginFormComponent,
        NoticeComponent,
        PushpinComponent,
        SearchComponent,
        TestPageComponent,
        TitleComponent,
        UserComponent,
    ],
    imports: [
        AppRoutingModule,
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        BsDropdownModule.forRoot(),
        SortableModule.forRoot(),
        TooltipModule.forRoot(),
        EosRestModule.forRoot(APP_CONFIG_LOCAL),
        EosCommonModule,
        EosDictionariesModule,
        EosParametersModule,
    ],
    entryComponents: [
        LoginFormComponent,
    ],
    exports: [
        EosRestModule,
    ],
    providers: [
        { provide: LOCALE_ID, useValue: 'ru' },
        { provide: ErrorHandler, useClass: EosErrorHandler },
        AuthorizedGuard,
        UnauthorizedGuard,
        CanDeactivateGuard,
        EosBreadcrumbsService,
        EosDeskService,
        EosErrorHandler,
        EosNoticeService,
        EosStorageService,
        EosUserProfileService,
    ],
    bootstrap: [AppComponent],
})
export class AppModule { }
