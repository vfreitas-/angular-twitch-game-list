import { Component, Input, OnInit } from '@angular/core'

@Component({
    selector: 'game-tabs',
    templateUrl: './tabs.component.html',
    styleUrls: ['./tabs.component.scss']
})

export class TabsComponent implements OnInit {
    @Input() gameName: string

    private tabs: Object[] = [
        {
            id: 'streams',
            name: 'Streams'
        },
        {
            id: 'videos',
            name: 'Videos'
        }
    ]

    private activeTab = ''

    constructor () {}

    ngOnInit() {
        this.activeTab = 'streams'
    }

    setTab (tab) {
        this.activeTab = tab
    }
}