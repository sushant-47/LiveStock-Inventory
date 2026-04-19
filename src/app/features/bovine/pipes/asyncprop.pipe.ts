import { AsyncPipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { map, Observable } from 'rxjs';

/**
 * Pipe that takes in an object and a property name, and returns a mapped observable of that property.
 * 
 * @usage Use with async pipe to get prop value from observable `obs$`
 */
@Pipe({
    name: 'asyncProp',
})
export class AsyncPropPipe implements PipeTransform {
    transform<T extends { obs$: Observable<any> }, K extends keyof T>(
        object: T,
        prop: K,
    ): Observable<T[K]> {
        return object.obs$.pipe(map((obj) => obj[prop]));
    }
}
