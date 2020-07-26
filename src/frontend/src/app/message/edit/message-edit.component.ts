import {Component, OnInit} from '@angular/core';
import {Message} from "../../models/message/message";
import {MessageService} from "../../services/message/message.service";
import {ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";

@Component({
    selector: 'app-message-edit',
    templateUrl: './message-edit.component.html'
})
export class MessageEditComponent implements OnInit {

    message: Message;

    constructor(
        private messageService: MessageService,
        private location: Location,
        private activatedRoute: ActivatedRoute,
    ) {
    }

    ngOnInit(): void {
        this.message = new Message();
    }

    saveMessage() {
        this.messageService.saveMessage(this.message).subscribe(message => {
        });
    }

}
