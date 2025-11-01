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
import { CowDetailsDialog } from '../details-dialog/details-dialog';
import DetailsJson from '../../../../data/cows.json';
import { Overlay } from '@angular/cdk/overlay';
import { ICowDetails } from '../../models/ICowDetails';
import { BREED } from '../../enums/Breed.enum';
import { IDialogData as IDetailsDialogData } from '../details-dialog/IDialogData';

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
    private _overlay: Overlay = inject(Overlay);
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

    showCowDetails(cow: CowData): void {
        const cowDetails = this._getCowDetails(cow);
        const positionStrategy =
            this._overlay.position().global().right('0px');
        const dialogRef = this._dialogService.open<void, IDetailsDialogData>(
            CowDetailsDialog,
            {
                data: {
                    cowDetails
                },
                panelClass: 'cow-details-dialog',
                backdropClass: ['cow-details-dialog-backdrop', 'cdk-overlay-dark-backdrop'],
                positionStrategy,
                autoFocus: 'input',
            }
        );
        dialogRef.closed.pipe(
            take(1),
            takeUntil(this._destroy$)
        ).subscribe({
            next: (result) => {
            }
        });
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

    private _getCowDetails(cow: CowData): ICowDetails {
        let cowDetails: ICowDetails;
        const cowJson =
            DetailsJson.find(
                (details: Partial<ICowDetails>) => details.tagNumber === cow.tagNumber
            );
        if (!!cowJson) {
            cowDetails = Object.assign({}, cowJson, JSON.parse(JSON.stringify(cow)));
        } else {
            const addedData: Partial<ICowDetails> = {
                "dailyWeightGain": "",
                "breed": BREED.BADRI,
                "breedOrigin": ""
            };
            cowDetails = Object.assign({}, addedData, JSON.parse(JSON.stringify(cow)));
        }
        return cowDetails;
    }

    private _addCowToDataSource(cow: CowData): void {
        this.cows.push(cow);
        this.dataSource.pushItems([cow]);
    }
}
