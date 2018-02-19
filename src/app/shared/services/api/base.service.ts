import { Injectable } from '@angular/core'
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http'
import { Observable } from 'rxjs/Observable'

import { ErrorObservable } from 'rxjs/observable/ErrorObservable'
import { distinctUntilChanged, catchError } from 'rxjs/operators'

import env from '@env'

@Injectable()
export class BaseService {

    protected headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Client-ID': env.CLIENT_ID
    })

    constructor(
        private http: HttpClient
    ) {}

    get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
        return this.http.get(
            `${env.API_URL}${path}`,
            { params, headers: this.headers }
        )
        .pipe(
            distinctUntilChanged(),
            catchError(this.formatErrors)
        )
    }

    private formatErrors(error: any) {
        return new ErrorObservable(error.json())
    }
}