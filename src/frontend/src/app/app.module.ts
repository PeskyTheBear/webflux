import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MessageEditComponent} from "./message/edit/message-edit.component";
import {MessageOverviewComponent} from "./message/overview/message-overview.component";
import {MessageService} from "./services/message/message.service";
import {MatCardModule} from "@angular/material/card";
import {MatInputModule} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {MatTableModule} from "@angular/material/table";
import {MatButtonModule} from "@angular/material/button";
import {MatGridListModule} from "@angular/material/grid-list";

@NgModule({
    declarations: [
        AppComponent,
        MessageEditComponent,
        MessageOverviewComponent,
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatCardModule,
        MatInputModule,
        FormsModule,
        MatTableModule,
        MatButtonModule,
        MatGridListModule
    ],
    providers: [
        MessageService
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule {
}
