import { ModuleWithProviders, NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common'

import { GameListComponent } from './game-list.component'
import { GameListItemComponent } from './game-list-item/item.component'
import { GameListFilterComponent } from './game-list-filter/filter.component'

import { SharedModule } from '../shared';

const gameListRouting: ModuleWithProviders = RouterModule.forChild([
    {
        path: '',
        component: GameListComponent
    }
])

@NgModule({
    declarations: [
        GameListComponent,
        GameListItemComponent,
        GameListFilterComponent
    ],
    imports: [
        SharedModule,
        gameListRouting,
    ]
})
export class GameListModule {}