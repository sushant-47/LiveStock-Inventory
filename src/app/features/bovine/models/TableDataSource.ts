import { CollectionViewer } from "@angular/cdk/collections";
import { DataSource } from "@angular/cdk/table";
import { Observable, of, Subject } from "rxjs";

export class TableDataSource<T> extends DataSource<T> {
    private _data: readonly T[];
    private _dataSub: Subject<readonly T[]> = new Subject();

    constructor(data: readonly T[]) {
        super();
        this._data = data;
    }

    pushItems(...items: T[]): void {
        this._data = this._data.concat(items);
        this._dataSub.next(this._data);
    }

    override connect(): Observable<readonly T[]> {
        if (this._dataSub.closed) {
            this._dataSub = new Subject();
        }
        return this._dataSub.asObservable();
    }

    override disconnect(): void {
        this._dataSub.complete();
        console.log('subject closed: ', this._dataSub.closed);
    }
}