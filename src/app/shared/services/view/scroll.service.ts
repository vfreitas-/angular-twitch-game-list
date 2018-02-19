// import { EventManager } from '@angular/platform-browser'
// import { Injectable } from '@angular/core'
// import { BehaviorSubject } from 'rxjs/BehaviorSubject'

// import { map, switchMap, flatMap} from 'rxjs/operators'

// @Injectable()
// export class ScrollService {

//     private scrollHandlers: Function[] = []
//     // private widthSubject = new BehaviorSubject(null)
//     // public width = window.innerWidth
//     // // public width = this.widthSubject.asObservable()

//     constructor(
//         private eventManager: EventManager
//     ) {
//         this.eventManager.addGlobalEventListener(
//             'window', 'resize', this.handleResize.bind(this)
//         )

//         // this.widthSubject
//         //     .pipe(
//         //         flatMap(w => w)
//         //     )
//     }

//     addListener () {

//     }

//     startListeners () {
//         this.scrollHandlers.forEach(() => {
//             window.addEventListener('scroll', )
//         })
//     }

//     stopListeners () {

//     }
// }