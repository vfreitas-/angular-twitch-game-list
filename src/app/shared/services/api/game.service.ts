import { Injectable } from '@angular/core'
import { HttpParams } from '@angular/common/http'

import { Observable } from 'rxjs/Observable'
import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import { map } from 'rxjs/operators'

import { BaseService } from './base.service'
import { Game } from '../../'

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
        query = encodeURIComponent(query)

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
        games = games.map(tmpGame => {
            if (tmpGame.game) {
                const { viewers, channels, game } = tmpGame

                return {
                    viewers,
                    channels,
                    ...game,
                }
            } else {
                return tmpGame
            }
        })

        
        this.currentGamesSubject.next(
            this.currentGamesSubject.getValue().concat(games)
        )

        return games
    }
}