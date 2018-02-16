import { ModuleWithProviders, NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common'

import { GameListComponent } from './game-list.component'
import { GameListItemComponent } from './game-list-item/item.component'
import { FilterComponent } from './filter/filter.component'
import { SearchComponent } from './search/search.component'

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
        FilterComponent,
        SearchComponent
    ],
    imports: [
        SharedModule,
        gameListRouting,
    ]
})
export class GameListModule {}