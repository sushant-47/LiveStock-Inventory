import { map, Observable, startWith, Subscriber } from 'rxjs';
import { CowData } from './CowData';
import { STATUS } from '../enums/Status.enum';

/** Class that provides mechanism to support reactive CowData updates in grid */
export class rCowData extends CowData {
    private _observers: Subscriber<CowData>[] = [];

    private _obs$ = new Observable((observer: Subscriber<CowData>) => {
        this._observers.push(observer);

        return () => {
            const observerIndex = this._observers.findIndex((val) => val === observer);
            this._observers.splice(observerIndex, 1);
        };
    }).pipe(startWith(this));

    status$: Observable<STATUS> = this._obs$.pipe(map((cow) => cow.status));
    pen$: Observable<string> = this._obs$.pipe(map((cow) => cow.pen));

    modifyCow({ status, pen }: Partial<CowData>): void {
        if (!!status) {
            this.setStatus(status);
        }
        if (!!pen) {
            this.setPen(pen);
        }
        for (let observer of this._observers) {
            observer.next(this);
        }
    }

    /** get data source without reactive members */
    getData(): CowData {
        return new CowData(this);
    }
}
