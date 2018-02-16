import { Injectable, } from '@angular/core'
import {
    ActivatedRouteSnapshot,
    Resolve,
    Router,
    RouterStateSnapshot
} from '@angular/router'

import { Observable } from 'rxjs/Observable'
import { first, flatMap, catchError, map } from 'rxjs/operators'

import { Game, GameService } from '../shared'

@Injectable()
export class GameDetailsResolver implements Resolve<any> {
    constructor(
        private gameService: GameService,
        private router: Router
    ) {}

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<any> {

        const id = parseInt(route.params['id'])

        return this.gameService.currentGames
            .pipe(
                map(games => {
                    const activeGame = games.find(g => g._id === id)

                    if (activeGame) {
                        return activeGame
                    } else {
                        return Error('Game not found!')
                    }
                }),
                first(),
                catchError(err => this.router.navigateByUrl('/'))
            )
    }
}