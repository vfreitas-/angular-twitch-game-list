import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs/Observable'
import { ReplaySubject } from 'rxjs/ReplaySubject'

import { map, flatMap } from 'rxjs/operators'
import { of } from 'rxjs/observable/of'
import { from } from 'rxjs/observable/from'

import { BaseService } from './base.service'
import { Game } from '../models'


@Injectable()
export class GameService extends BaseService {

    getTopGames (): Observable<Game[]> {
        return this.get('games/top')
            .pipe(
                flatMap(o => o.top),
                map(g => this.formatGame(g))
            )
    }

    getSearchedGame () {
        return this.get('search/channels')
    }

    private formatGame (game) {
        const { viewers, channels } = game

        return {
            viewers,
            channels,
            ...game.game,
        }
    }
}