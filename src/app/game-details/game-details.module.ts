import { ModuleWithProviders, NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common'

import { GameDetailsComponent } from './game-details.component'
import { TabsComponent } from './tabs/tabs.component'
import { MediaComponent } from './media/media.component'
import { GameDetailsResolver } from './game-details-resolver.service'

import { SharedModule } from '../shared/shared.module'
import { NumberFormatPipe, VideosService, StreamsService } from '../shared'

const gameDetailsRouting: ModuleWithProviders = RouterModule.forChild([
    {
        path: 'game/:id',
        component: GameDetailsComponent,
        data: { state: 'game-details' },
        resolve: { game: GameDetailsResolver }
    }
])

@NgModule({
    imports: [
        SharedModule,
        gameDetailsRouting,
    ],
    declarations: [
        GameDetailsComponent,
        TabsComponent,
        MediaComponent,
        NumberFormatPipe
    ],

    providers: [
        VideosService,
        StreamsService,
        GameDetailsResolver
    ]
})
export class GameDetailsModule {}