import { Component } from '@angular/core'

import { slideAnimation } from './shared'

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: [ './app.component.scss' ],
    animations: [ slideAnimation ]
})

export class AppComponent {
    getRouteAnimation(outlet) {
        return outlet.activatedRouteData.state
    }
}