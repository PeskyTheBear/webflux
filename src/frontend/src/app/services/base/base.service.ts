import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {plainToClass} from "class-transformer";
import {ClassType} from "class-transformer/ClassTransformer";

export abstract class BaseService {

    protected constructor(protected httpClient: HttpClient, private baseUrl: string) {
    }

    protected abstract identifierName(): string

    protected executeGetSingular<T>(classType: ClassType<T>, url?: string): Observable<T> {
        return this.plainToClass(this.httpClient.get<T>(`${this.baseUrl}`), classType);
    }

    protected getStream<T>(classType: ClassType<T>, url?: string): Observable<T> {
        return this.plainToClass(this.createEventSource(`${this.baseUrl}`), classType);
    }

    protected executeSave<T>(object: T, classType: ClassType<T>, url?: string): Observable<T> {
        if (object[this.identifierName()]) {
            return this.plainToClass(this.httpClient.put<T>(`${this.baseUrl}`, object), classType);
        } else {
            return this.plainToClass(this.httpClient.post<T>(`${this.baseUrl}`, object), classType);
        }
    }

    private createEventSource(url: string): Observable<any[]> {
        return new Observable((observer) => {
            let eventSource = new EventSource(url);
            eventSource.onmessage = (message) => {
                const json = JSON.parse(message.data);
                console.debug('Message received ', json);
                observer.next(json);
            }
            eventSource.onerror = (error) => {
                if (eventSource.readyState === 0) {
                    console.debug('The stream has been closed by the server.');
                    eventSource.close();
                    observer.unsubscribe();
                } else {
                    observer.error('EventSource error: ' + error);
                }
            }
        });
    }

    private plainToClass<T>(plain: Observable<any>, classType: ClassType<T>): Observable<T> {
        return plain.pipe(map(plainObject => plainToClass(classType, plainObject)));
    }


    private plainToClassArray<T>(plain: Observable<any[]>, classType: ClassType<T>): Observable<T[]> {
        return plain.pipe(map(plainObject => plainToClass(classType, plainObject)));
    }
}
