import { DataSource } from "@angular/cdk/table";
import { Observable, of, BehaviorSubject } from "rxjs";

export class TableDataSource<T> extends DataSource<T> {
    private _data: readonly T[];
    private _dataSub: BehaviorSubject<readonly T[]> = new BehaviorSubject([] as readonly T[]);

    get data(): readonly T[] {
        return this._data;
    }

    constructor(data: readonly T[]) {
        super();
        this._data = data;
    }

    setItems(items: T[]): void {
        this._data = [...items];
        this._dataSub.next(this._data);
    }

    pushItems(items: T[]): void {
        this._data = this._data.concat(items);
        this._dataSub.next(this._data);
    }

    override connect(): Observable<readonly T[]> {
        if (this._dataSub.closed) {
            this._dataSub = new BehaviorSubject([] as readonly T[]);
        }
        return this._dataSub.asObservable();
    }

    override disconnect(): void {
        this._dataSub.complete();
        this._dataSub.unsubscribe();
    }
}
