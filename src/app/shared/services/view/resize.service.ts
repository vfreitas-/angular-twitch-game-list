import { Injectable, HostListener } from '@angular/core'

import { Observable } from 'rxjs/Observable'
import { fromEvent } from 'rxjs/observable/fromEvent'
import { map } from 'rxjs/operators'


@Injectable()
export class ResizeService {

    private width$: Observable<number>

    constructor() {
        this.width$ = fromEvent(window, 'resize')
            .pipe(
                map(event => {
                    const { innerWidth } = event['target']
                    return this.getLimit(innerWidth)
                })
            )
    }

    get onResize () {
        return this.width$
    }

    getLimit (width) {
        if (width <= 480) {
            return 25
        } else if (width <= 1024) {
            return 50
        }

        return 100
    }
}