import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DictionariesComponent } from './dictionaries/dictionaries.component';
import { DictionaryComponent } from './dictionary/dictionary.component';
import { HomeComponent } from './home/home.component';
import { EditCardComponent } from './edit-card/edit-card.component';
import { TestPageComponent } from './test-page/test-page.component';
import { DesktopComponent } from './desktop/desktop.component';

const routes: Routes = [{
    path: 'spravochniki',
    data: { title: 'Справочники', showInBreadcrumb: true },
    children: [{
        path: '',
        pathMatch: 'full',
        component: DictionariesComponent,
    }, {
        path: ':dictionaryId',
        data: { title: 'Справочник', showInBreadcrumb: true },
        children: [{
            path: ':nodeId/edit',
            pathMatch: 'full',
            component: EditCardComponent,
            data: { title: 'Редактирвание' },
        }, {
            path: ':nodeId',
            data: { showInBreadcrumb: false },
            component: DictionaryComponent,
        }, {
            path: '',
            component: DictionaryComponent,
            pathMatch: 'full',
        }],
    }],
}, {
    path: 'home',
    data: { title: 'Системный рабочий стол', showInBreadcrumb: true },
    children: [{
        path: '',
        pathMatch: 'full',
        component: DesktopComponent,
    },
    {
        path: ':desktopId',
        component: DesktopComponent,
        data: { title: 'Рабочий стол', showInBreadcrumb: true }
    }
    ]
}, {
    path: 'test',
    component: TestPageComponent,
    data: { title: 'Test page for UI components', showInBreadcrumb: true }
}, {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
}, {
    path: '**',
    redirectTo: '/home',
    pathMatch: 'full',
}];

@NgModule({
    imports: [RouterModule.forRoot(routes, { enableTracing: false })],
    exports: [RouterModule],
})
export class AppRoutingModule {
}