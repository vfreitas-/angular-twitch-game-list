import { ModuleWithProviders, NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { RouterModule } from '@angular/router'

import { HttpModule } from '@angular/http'
import { AppComponent } from './app.component'

import { GameListModule } from './game-list/game-list.module'
import { GameDetailsModule } from './game-details/game-details.module'

import {
    SharedModule,

    HeaderComponent,
    FooterComponent,

    GameService
} from './shared'

const rootRouting: ModuleWithProviders = RouterModule.forRoot([])

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent
    ],
    imports: [
        SharedModule,
        // Angular modules
        BrowserModule,
        HttpModule,

        rootRouting,

        // App modules
        GameListModule,
        GameDetailsModule
    ],
    providers: [
        GameService
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule { }
