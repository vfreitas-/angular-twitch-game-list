import { Component, Output, EventEmitter } from '@angular/core'

@Component({
    selector: 'game-list-filter',
    templateUrl: './filter.component.html',
    styleUrls: ['./filter.component.scss']
})

export class FilterComponent {
    private filter: string = ''

    @Output() filterUpdated = new EventEmitter<string>()

    filterChange () {
        this.filterUpdated.emit(this.filter)
    }
}