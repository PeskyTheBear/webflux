import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Message} from "../../models/message/message";
import {MessageService} from "../../services/message/message.service";

@Component({
    selector: 'app-message',
    templateUrl: './message-overview.component.html'
})
export class MessageOverviewComponent implements OnInit {

    messages: Message[] = [];

    displayedColumns: string[] = ['id', 'content'];

    constructor(private messageService: MessageService, private changeDetectorRef: ChangeDetectorRef) {
    }

    ngOnInit(): void {
        this.messageService.getMessages().subscribe(messages => {
            this.messages = messages;
            this.changeDetectorRef.detectChanges();
        })

    }

}
