import { Component, Input, OnInit } from '@angular/core'

import { VideosService, StreamsService } from '../../shared'

@Component({
    selector: 'game-media',
    templateUrl: './media.component.html',
    styleUrls: ['./media.component.scss']
})

export class MediaComponent implements OnInit {
    @Input() mediaType: string
    @Input() gameName: string

    private items = []

    constructor (
        private videos: VideosService,
        private streams: StreamsService
    ) {}

    ngOnInit() {
        switch (this.mediaType) {
            case 'videos':
                this.videos.getGameVideos(this.gameName)
                    .subscribe(videos => {
                        this.items = videos
                    })
                break;
            case 'streams':
                this.streams.getGameStreams(this.gameName)
                    .subscribe(streams => {
                        this.items = streams
                    })
                break;
        }
    }
}