import { CdkTableModule } from '@angular/cdk/table';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CowData } from '../../models/CowData';
import { TableDataSource } from '../../models/TableDataSource';
import { CowColumns } from '../../enums/CowColumns.enum';
import { GENDER } from '../../enums/Gender.enum';
import { STATUS } from '../../enums/Status.enum';
import { DialogModule } from '@angular/cdk/dialog';

@Component({
    selector: 'cg-cow-list',
    imports: [
        CdkTableModule,
        DialogModule,
    ],
    templateUrl: './cow-list.html',
    styleUrl: './cow-list.scss',
})
export class CowListComponent implements OnInit {
    cows: CowData[] = [];
    dataSource: TableDataSource<CowData> = new TableDataSource([...this.cows]);
    readonly COLUMNS_ARR: CowColumns[] = Object.values(CowColumns);
    readonly COLUMNS: typeof CowColumns = CowColumns;
    readonly GENDER: typeof GENDER = GENDER;
    readonly STATUS: typeof STATUS = STATUS;

    constructor() {

    }

    ngOnInit(): void {
        const data = new CowData({
            tagNumber: 'C00001',
            gender: GENDER.MALE,
            status: STATUS.ACTIVE,
            pen: 'Shed 1',
            recordedDate: new Date().toISOString(),
            weight: '300',
        });
        this._addCowToDataSource(data);
    }

    openAddCowDialog(): void {

    }

    private _addCowToDataSource(cow: CowData): void {
        this.cows.push(cow);
        this.dataSource.pushItems([cow]);
    }
}
