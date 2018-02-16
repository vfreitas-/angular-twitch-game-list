import {
    Component,
    OnInit,
    AfterViewInit,
    OnDestroy
} from '@angular/core'

import { GameService } from '../shared'
import { Game } from '../shared'
import { ResizeService } from '../shared/services/resize.service'

@Component({
    selector: 'game-list',
    templateUrl: './game-list.component.html',
    styleUrls: ['./game-list.component.scss'],
    providers: [
        ResizeService
    ]
})

export class GameListComponent implements OnInit, AfterViewInit, OnDestroy {
    gameList: Game[] = []
    lastScrollPosition = 0
    limit = null
    loading = false
    searchText: string = ''
    filter: string = 'popularity'
    scrollHandler = this.onScroll.bind(this)

    constructor (
        private gameService: GameService,
        private resizeService: ResizeService
    ) {}

    // LIFECYCLE HOOKS
    ngOnInit () {
        this.gameService.currentGames.subscribe(games => {
            if (Array.isArray(games)) {
                this.gameList = games
                this.sort()
            }

            this.loading = false
        })

        // this.resizeService.width.subscribe(limit => {
        //     this.limit = limit
        // })

        if (this.gameList.length == 0) {
            this.gameService.getTopGames(0, this.resizeService.getLimit()).subscribe()
        }
    }

    ngAfterViewInit () {
        this.addScrollEvent()
    }
 
    ngOnDestroy () {
        console.log('sdads')
        this.rmScrollEvent()
    }

    // SCROLL HANDLING METHODS
    addScrollEvent () {
        window.addEventListener('scroll', this.scrollHandler)
    }

    rmScrollEvent () {
        window.removeEventListener('scroll', this.scrollHandler)
    }

    onScroll () {
        this.lastScrollPosition = window.pageYOffset

        if (!this.loading) {
            this.processScroll()
        }
    }

    processScroll () {
        const windowHeight = window.innerHeight
            , viewportHeight = (document.body.offsetHeight - windowHeight)
            , percentage = (this.lastScrollPosition / viewportHeight)
        
        if (percentage > 0.95) {
            this.loading = true
            this.gameService.getTopGames(
                this.gameList.length, this.resizeService.getLimit()
            ).subscribe()
        }
    }

    // EVENT LISTENERS
    onSearchUpdate (searchText) {
        this.searchText = searchText
        this.gameService.clearCurrentGames()
        this.loading = true

        if (searchText === '') {
            this.addScrollEvent()
            this.gameService.getTopGames(0, this.resizeService.getLimit()).subscribe()
        } else {
            this.rmScrollEvent()
            this.gameService.getSearchedGame(
                encodeURIComponent(searchText)
            ).subscribe()
        }
    }

    onFilterUpdate (filter) {
        this.filter = filter
        this.sort()
    }

    private sort () {
        this.gameList = this.gameList.sort(
            (a, b) => b[this.filter] - a[this.filter]
        )
    }
}