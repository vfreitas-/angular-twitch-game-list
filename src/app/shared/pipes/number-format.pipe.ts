import { Pipe, PipeTransform } from '@angular/core'

@Pipe({name: 'number'})
export class NumberFormatPipe implements PipeTransform {

    transform(content: number): string {
        if (!content) {
            return ''
        }

        return content.toLocaleString('pt')
    }
}