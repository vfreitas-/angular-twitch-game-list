import { Injectable } from '@angular/core'
import { HttpClient, HttpParams } from '@angular/common/http'
import { Observable } from 'rxjs/Observable'
import { ReplaySubject } from 'rxjs/ReplaySubject'
import { Subject } from 'rxjs/Subject'
import { BehaviorSubject } from 'rxjs/BehaviorSubject'

import { map, flatMap } from 'rxjs/operators'

import { BaseService } from './base.service'
import { Game } from '../models'


@Injectable()
export class GameService extends BaseService {

    private currentGamesSubject = new BehaviorSubject([])
    public currentGames = this.currentGamesSubject.asObservable()

    getTopGames (offset = 0, limit = 10): Observable<Game[]> {
        const params = new HttpParams({
            fromObject: { offset: offset.toString(), limit: limit.toString() }
        })

        return this.get('games/top', params)
            .pipe(
                map(o => o.top),
                map(g => this.formatGame(g))
            )
    }

    getSearchedGame (query): Observable<Game[]> {
        const params = new HttpParams({
            fromObject: { query, type: 'suggest' }
        })

        return this.get('search/games', params)
            .pipe(
                map(o => o.games),
                map(g => this.formatGame(g))
            )
    }

    clearCurrentGames () {
        this.currentGamesSubject.next([])
    }

    private formatGame (games) {
        games = games.map(game => {
            if (game.game) {
                const { viewers, channels } = game

                return {
                    viewers,
                    channels,
                    ...game.game,
                }
            } else {
                return game
            }
        })

        
        this.currentGamesSubject.next(
            this.currentGamesSubject.getValue().concat(games)
        )

        return games
    }
}