import { Injectable } from '@angular/core'
import { HttpParams } from '@angular/common/http'

import { Observable } from 'rxjs/Observable'
import { map } from 'rxjs/operators'

import { BaseService } from './base.service'

@Injectable()
export class VideosService extends BaseService {

    getGameVideos (gameName, limit = 10): Observable<any> {
        const params = new HttpParams({
            fromObject: { game: gameName.toString(), limit: limit.toString() }
        })

        return this.get('videos/top', params)
            .pipe(
                map(o => o.videos),
                map(g => this.formatVideos(g))
            )
    }

    private formatVideos (videos) {
        return videos.map(video => {
            return {
                title: video.title,
                host: video.channel.display_name,
                thumb: video.preview,
                viewers: video.views,
                url: video.url
            }
        })
    }
}