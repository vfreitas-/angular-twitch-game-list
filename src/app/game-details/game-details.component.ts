import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'

@Component({
    selector: 'game-details',
    templateUrl: './game-details.component.html',
    styleUrls: ['./game-details.component.scss']
})

export class GameDetailsComponent implements OnInit {
    game = null

    constructor (
        private route: ActivatedRoute,
        private router: Router
    ) {}

    ngOnInit() {
        this.route.data.subscribe(data => {
            if (!data.game || !data.game._id) {
                this.router.navigateByUrl('/')
            }

            this.game = data.game
        })
    }

    onBack () {
        this.router.navigateByUrl('/')
    }
}