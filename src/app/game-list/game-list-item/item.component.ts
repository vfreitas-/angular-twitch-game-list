import { Component, Input } from '@angular/core'

import { Game } from '../../shared'

@Component({
    selector: 'game-list-item',
    templateUrl: './item.component.html',
    styleUrls: ['./item.component.scss']
})

export class GameListItemComponent {
    @Input() game: Game
}