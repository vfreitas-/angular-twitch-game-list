import { Injectable } from '@angular/core'
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http'
import { Observable } from 'rxjs/Observable'

import { ErrorObservable } from 'rxjs/observable/ErrorObservable'
import { catchError } from 'rxjs/operators/catchError'

@Injectable()
export class BaseService {

    protected headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Client-ID': 'o2bn03b9vnqb0syl011g3z3uhvxm8v'
    })

    constructor(
        private http: HttpClient
    ) {}

    get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
        return this.http.get(
            `https://api.twitch.tv/kraken/${path}`,
            { params, headers: this.headers }
        )
        .pipe(catchError(this.formatErrors))
    }

    private formatErrors(error: any) {
        return new ErrorObservable(error.json())
    }
}