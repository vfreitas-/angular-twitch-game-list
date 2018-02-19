import { Injectable } from '@angular/core'
import { HttpParams } from '@angular/common/http'

import { Observable } from 'rxjs/Observable'
import { map } from 'rxjs/operators'

import { BaseService } from './base.service'

@Injectable()
export class StreamsService extends BaseService {

    getGameStreams (gameName, limit = 10): Observable<any> {
        const params = new HttpParams({
            fromObject: { game: gameName.toString(), limit: limit.toString() }
        })

        return this.get('streams', params)
            .pipe(
                map(o => o.streams),
                map(g => this.formatStreams(g))
            )
    }

    private formatStreams (streams) {
        console.log(streams)
        return streams.map(stream => {
            return {
                title: stream.channel.status,
                host: stream.channel.display_name,
                thumb: stream.preview.medium,
                viewers: stream.viewers,
                url: stream.channel.url
            }
        })
    }
}