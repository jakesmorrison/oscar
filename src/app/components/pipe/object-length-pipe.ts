import { Pipe, PipeTransform } from '@angular/core'

@Pipe({name: 'objectLength'})
export class ObjectLengthPipe implements PipeTransform {
    transform(d: {}) {
        return Object.keys(d).length;
    }
}