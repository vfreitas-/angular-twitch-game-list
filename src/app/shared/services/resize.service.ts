import { EventManager } from '@angular/platform-browser'
import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs/BehaviorSubject'

import { map, switchMap, flatMap} from 'rxjs/operators'

@Injectable()
export class ResizeService {

    private widthSubject = new BehaviorSubject(null)
    public width = window.innerWidth
    // public width = this.widthSubject.asObservable()

    constructor(
        private eventManager: EventManager
    ) {
        this.eventManager.addGlobalEventListener(
            'window', 'resize', this.handleResize.bind(this)
        )

        // this.widthSubject
        //     .pipe(
        //         flatMap(w => w)
        //     )
    }

    handleResize () {
        // this.widthSubject.next(window.innerWidth)
        this.width = window.innerWidth
    }

    getLimit () {
        if (this.width <= 480) {
            return 25
        } else if (this.width <= 1024) {
            return 50
        }

        return 100
    }
}