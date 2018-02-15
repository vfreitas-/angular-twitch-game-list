import { Component, OnInit } from '@angular/core'

import { GameService } from '../shared'
import { Game } from '../shared'

@Component({
    selector: 'game-list',
    templateUrl: './game-list.component.html',
    styleUrls: ['./game-list.component.scss']
})

export class GameListComponent implements OnInit {
    gameList: Game[] = []

    constructor (
        private gameService: GameService
    ) {}

    ngOnInit() {
        this.gameService.getTopGames().subscribe(
            (game: any) => {
                this.gameList.push(game)
            }
        )
    }
}