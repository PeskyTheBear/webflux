import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MessageEditComponent} from "./message/edit/message-edit.component";
import {MessageOverviewComponent} from "./message/overview/message-overview.component";
import {environment} from "../environments/environment";

const routes: Routes = [
    {
        path: 'message/edit/:id',
        component: MessageEditComponent
    },
    {
        path: 'message/edit/new',
        component: MessageEditComponent
    },
    {
        path: 'messages',
        component: MessageOverviewComponent
    },
    {
        path: '',
        redirectTo: '/messages',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {enableTracing: !environment.production})],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
