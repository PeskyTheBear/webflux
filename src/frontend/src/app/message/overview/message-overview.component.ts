import {Component, OnInit} from '@angular/core';
import {Message} from "../../models/message/message";
import {MessageService} from "../../services/message/message.service";
import {Observable} from "rxjs";

@Component({
    selector: 'app-message',
    templateUrl: './message-overview.component.html'
})
export class MessageOverviewComponent implements OnInit {

    messages: Observable<Message[]>;

    displayedColumns: string[] = ['id', 'content'];

    constructor(private messageService: MessageService) {
    }

    ngOnInit(): void {
        this.messages = this.messageService.getMessages();
    }

}
