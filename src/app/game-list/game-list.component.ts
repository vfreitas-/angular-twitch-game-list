import {
    Component,
    OnInit,
    AfterViewInit,
    OnDestroy
} from '@angular/core'

import {
    Game,
    GameService,
    ResizeService,
    slideAnimation,
    fadeInAnimation
} from '../shared'

@Component({
    selector: 'game-list',
    templateUrl: './game-list.component.html',
    styleUrls: ['./game-list.component.scss'],
    providers: [
        ResizeService
    ],
    animations: [ fadeInAnimation ],
    host: { '[@fadeInAnimation]': '' }
})

export class GameListComponent implements OnInit, AfterViewInit, OnDestroy {
    gameList: Game[] = []
    lastScrollPosition: number = 0
    limit: number = 0
    loading: boolean = false
    searchText: string = ''
    filter: string = 'popularity'
    scrollHandler: EventListener = this.onScroll.bind(this)

    constructor (
        private gameService: GameService,
        private resizeService: ResizeService
    ) {}

    get isListEmpty (): boolean {
        return (!this.gameList.length) &&
            (!this.loading) &&
            (this.searchText !== '')
    }

    // LIFECYCLE HOOKS
    ngOnInit () {
        this.limit = this.resizeService.getLimit(window.innerWidth)
        this.resizeService.width$.subscribe(limit => {
            this.limit = limit
        })

        this.gameService.currentGames.subscribe(games => {
            if (Array.isArray(games)) {
                this.gameList = games
                this.sort()
            }

            this.loading = false
        })

        if (this.gameList.length == 0) {
            this.gameService.getTopGames(0, this.limit).subscribe()
        }
    }

    ngAfterViewInit () {
        this.addScrollEvent()
    }
 
    ngOnDestroy () {
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
                this.gameList.length, this.limit
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
            this.gameService.getTopGames(0, this.limit).subscribe()
        } else {
            this.rmScrollEvent()
            this.gameService.getSearchedGame(searchText).subscribe()
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