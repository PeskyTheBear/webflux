import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {plainToClass} from "class-transformer";
import {ClassType} from "class-transformer/ClassTransformer";
import {NgZone} from "@angular/core";


export abstract class BaseService {

    private zone = new NgZone({enableLongStackTrace: false});

    protected constructor(protected httpClient: HttpClient, private baseUrl: string, private identifierName: string) {
    }

    protected getSingular<T>(classType: ClassType<T>, url?: string): Observable<T> {
        return this.plainToClass(this.httpClient.get<T>(this.createUrl(url)), classType);
    }

    protected getStream<T>(classType: ClassType<T>, url?: string): Observable<T[]> {
        return this.plainToClassArray(this.createEventSource(this.createUrl(url)), classType);
    }

    protected save<T>(object: T, classType: ClassType<T>, url?: string): Observable<T> {
        if (object[this.identifierName]) {
            return this.plainToClass(this.httpClient.put<T>(this.createUrl(url), object), classType);
        } else {
            return this.plainToClass(this.httpClient.post<T>(this.createUrl(url), object), classType);
        }
    }

    private createUrl(optionalUrl: string): string {
        return optionalUrl ? this.baseUrl + optionalUrl : this.baseUrl;
    }

    private createEventSource<T>(url: string): Observable<T[]> {
        return new Observable<T[]>((observer) => {
            const eventSource = new EventSource(url);
            let result: T[] = [];
            eventSource.onmessage = (message) => {
                this.zone.run(() => {
                    result.push(JSON.parse(message.data));
                    observer.next(result);
                });
            }

            eventSource.onerror = (error) => {
                this.zone.run(() => {
                    if (eventSource.readyState === 0) {
                        console.info('The stream has been closed by the server.', error);
                        result = [];
                    } else {
                        observer.error(error);
                    }
                })
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
