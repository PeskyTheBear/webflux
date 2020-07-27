import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Message} from "../../models/message/message";
import {BaseService} from "../base/base.service";

@Injectable({
    providedIn: 'root'
})
export class MessageService extends BaseService {

    constructor(protected httpClient: HttpClient) {
        super(httpClient, "api/messages", "id");
    }

    getMessages(): Observable<Message[]> {
        return this.getStream(Message)
    }

    saveMessage(message: Message): Observable<Message> {
        return this.save(message, Message)
    }
}
