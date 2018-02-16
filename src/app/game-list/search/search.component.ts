import { Component, Output, EventEmitter } from '@angular/core'

import { Subject } from 'rxjs/Subject'
import { debounceTime } from 'rxjs/operators'

@Component({
    selector: 'game-list-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss']
})

export class SearchComponent {
    private text: string = ''
    public keyUp = new Subject<string>()

    @Output() textUpdated = new EventEmitter<string>()


    constructor() {
        const subscription = this.keyUp
            .pipe(debounceTime(300))
            .subscribe(() => this.textInput())

    }
    
    textInput () {
        this.textUpdated.emit(this.text)
    }
}