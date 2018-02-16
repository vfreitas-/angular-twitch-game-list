import { ModuleWithProviders, NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common'

import { GameDetailsComponent } from './game-details.component'
import { GameDetailsResolver } from './game-details-resolver.service'

import { SharedModule } from '../shared/shared.module'

const gameDetailsRouting: ModuleWithProviders = RouterModule.forChild([
    {
        path: 'game/:id',
        component: GameDetailsComponent,
        resolve: {
            game: GameDetailsResolver
        }
    }
])

@NgModule({
    imports: [
        SharedModule,
        gameDetailsRouting,
    ],
    declarations: [
        GameDetailsComponent,
    ],

    providers: [
        GameDetailsResolver
    ]
})
export class GameDetailsModule {}