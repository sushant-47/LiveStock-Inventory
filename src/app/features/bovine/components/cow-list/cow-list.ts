import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { LowerCasePipe } from '@angular/common';
import { Dialog, DialogModule, DialogRef } from '@angular/cdk/dialog';
import { CdkTableModule } from '@angular/cdk/table';
import { Subject, take, takeUntil } from 'rxjs';
import { CowData } from '../../models/CowData';
import { TableDataSource } from '../../models/TableDataSource';
import { CowColumns } from '../../enums/CowColumns.enum';
import { GENDER } from '../../enums/Gender.enum';
import { STATUS } from '../../enums/Status.enum';
import { AddCowDialog } from '../add-cow-dialog/add-cow-dialog';
import { CowFormBuilder } from '../../services/form.builder';

@Component({
    selector: 'cg-cow-list',
    imports: [
        LowerCasePipe,
        CdkTableModule,
        DialogModule,
    ],
    providers: [
        Dialog,
        CowFormBuilder,
    ],
    templateUrl: './cow-list.html',
    styleUrl: './cow-list.scss',
})
export class CowListComponent implements OnInit, OnDestroy {
    cows: CowData[] = [];
    dataSource: TableDataSource<CowData> = new TableDataSource([...this.cows]);
    readonly COLUMNS_ARR: CowColumns[] = Object.values(CowColumns);
    readonly COLUMNS: typeof CowColumns = CowColumns;
    readonly GENDER: typeof GENDER = GENDER;
    readonly STATUS: typeof STATUS = STATUS;

    private _dialogService: Dialog = inject(Dialog);
    private _destroy$: Subject<void> = new Subject();

    constructor() { }

    ngOnInit(): void {
        const data = new CowData({
            tagNumber: 'C00001',
            gender: GENDER.MALE,
            status: STATUS.ACTIVE,
            pen: 'yard',
            recordedDate: new Date().toISOString(),
            weight: '300',
        });
        this._addCowToDataSource(data);
    }

    ngOnDestroy(): void {
        this._destroy$.next();
        this._destroy$.complete();
    }

    openAddCowDialog(): void {
        const dialogRef: DialogRef<CowData, AddCowDialog> = this._dialogService.open(
            AddCowDialog,
            {
                panelClass: 'add-cow-dialog',
                backdropClass: ['add-cow-dialog-backdrop', 'cdk-overlay-dark-backdrop'],
                autoFocus: 'input',
                disableClose: true,
            }
        );
        dialogRef.closed.pipe(
            take(1),
            takeUntil(this._destroy$)
        ).subscribe({
            next: (result) => {
                if (!!result) {
                    this._addCowToDataSource(result);
                }
            }
        });
    }

    private _addCowToDataSource(cow: CowData): void {
        this.cows.push(cow);
        this.dataSource.pushItems([cow]);
    }
}
