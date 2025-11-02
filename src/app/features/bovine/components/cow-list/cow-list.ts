import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { LowerCasePipe } from '@angular/common';
import { Dialog, DialogModule, DialogRef } from '@angular/cdk/dialog';
import { CdkTableModule } from '@angular/cdk/table';
import { merge, Subject, take, takeUntil } from 'rxjs';
import { CowData } from '../../models/CowData';
import { TableDataSource } from '../../models/TableDataSource';
import { CowColumns } from '../../enums/CowColumns.enum';
import { GENDER } from '../../enums/Gender.enum';
import { STATUS } from '../../enums/Status.enum';
import { AddCowDialog } from '../add-cow-dialog/add-cow-dialog';
import { CowFormBuilder } from '../../services/form.builder';
import { CowDetailsDialog } from '../details-dialog/details-dialog';
import { Overlay } from '@angular/cdk/overlay';
import { ICowDetails } from '../../models/ICowDetails';
import { BREED } from '../../enums/Breed.enum';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { DateRenderer } from '../../renderers/date-renderer/date-renderer';
import { StatusRenderer } from '../../renderers/status-renderer/status-renderer';
import { IDialogData as IDetailsDialogData } from '../details-dialog/IDialogData';
import { IDialogData as IFormDialogData } from '../add-cow-dialog/IDialogData';
import DetailsJson from '../../../../data/cows.json';
import EventsJson from '../../../../data/recentEvents.json';
import { IEventLog } from '../../models/IEventLog';

@Component({
    selector: 'cg-cow-list',
    imports: [
        LowerCasePipe,
        ReactiveFormsModule,
        CdkTableModule,
        DialogModule,
        DateRenderer,
        StatusRenderer,
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
    statusCtrl: FormControl<STATUS | -1>;
    penCtrl: FormControl<string>;
    tagNumCtrl: FormControl<string>;

    readonly COLUMNS_ARR: CowColumns[] = Object.values(CowColumns);
    readonly COLUMNS: typeof CowColumns = CowColumns;
    readonly GENDER: typeof GENDER = GENDER;
    readonly STATUS: typeof STATUS = STATUS;
    readonly GENDERS =
        Object.values(GENDER)
            .filter((gender) => typeof gender === 'number')
            .map((gender) => {
                return {
                    value: gender,
                    text: GENDER[gender]
                }
            });
    readonly STATUSES =
        Object.values(STATUS)
            .filter((status) => typeof status === 'number')
            .map((status) => {
                return {
                    value: status,
                    text: STATUS[status]
                }
            });


    private _fb: FormBuilder = inject(FormBuilder);
    private _formService: CowFormBuilder = inject(CowFormBuilder);
    private _dialogService: Dialog = inject(Dialog);
    private _overlay: Overlay = inject(Overlay);
    private _destroy$: Subject<void> = new Subject();

    constructor() {
        this.statusCtrl = this._fb.control(-1);
        this.penCtrl = this._fb.control('');
        this.tagNumCtrl = this._fb.control('');
    }

    ngOnInit(): void {
        // dummy data
        const data = new CowData({
            tagNumber: 'C00008',
            gender: GENDER.MALE,
            status: STATUS.ACTIVE,
            pen: 'Yard',
            recordedDate: new Date().toISOString(),
            weight: '300',
        });
        this._addCowToDataSource(data);

        merge(
            this.statusCtrl.valueChanges,
            this.penCtrl.valueChanges,
            this.tagNumCtrl.valueChanges,
        ).pipe(
            takeUntil(this._destroy$)
        ).subscribe({
            next: () => {
                this._applySearchAndFilters();
            }
        });
    }

    ngOnDestroy(): void {
        this._destroy$.next();
        this._destroy$.complete();
    }

    showCowDetails(cow: CowData): void {
        const cowDetails = this._getCowDetails(cow);
        const positionStrategy =
            this._overlay.position().global().right('0px');
        const dialogRef = this._dialogService.open<void, IDetailsDialogData, CowDetailsDialog>(
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
        const dialogRef = this._dialogService.open<any, IFormDialogData, AddCowDialog>(
            AddCowDialog,
            {
                data: {
                    existingTagNumbers: this.cows.map((cow) => cow.tagNumber)
                },
                panelClass: 'add-cow-dialog',
                backdropClass: ['add-cow-dialog-backdrop', 'cdk-overlay-dark-backdrop'],
                restoreFocus: true,
                disableClose: true,
            }
        );
        dialogRef.closed.pipe(
            take(1),
            takeUntil(this._destroy$)
        ).subscribe({
            next: (result) => {
                if (!!result) {
                    this._addCowToDataSource(
                        this._formService.convertFormDataToTableData(result)
                    );
                    if (this._hasSearchOrFilterActive()) {
                        this._applySearchAndFilters();
                    }
                }
            }
        });
    }

    private _hasSearchOrFilterActive(): boolean {
        return !!this.tagNumCtrl.value
            || !!this.penCtrl.value
            || this.statusCtrl.value !== -1;
    }

    private _applySearchAndFilters(): void {
        const tagNumber: string = this.tagNumCtrl.value;
        const status: STATUS | -1 = this.statusCtrl.value;
        const pen: string = this.penCtrl.value;
        /** search data by Tag Number */
        let currentData: CowData[] = [...this._getSearchResults(tagNumber, { tagNumber: true })];
        /** search data by Pen */
        currentData = [...this._getSearchResults(pen, { pen: true }, currentData)];

        if (status !== -1) {
            currentData = currentData.filter((cow) => {
                return cow.status === status;
            });
        }
        this.dataSource.setItems(currentData);
    }

    private _getSearchResults(
        searchStr: string,
        opts: {
            tagNumber?: boolean,
            pen?: boolean,
        },
        dataToSearch: CowData[] = this.cows,
    ): CowData[] {
        if (!searchStr) {
            return dataToSearch;
        }
        const searchTagCharArr = searchStr.toLowerCase().split('');
        return dataToSearch.filter((cow) => {
            let cellCharArr: string[];
            if (opts.tagNumber) {
                cellCharArr = cow.tagNumber.toLowerCase().split('');
            }
            if (opts.pen) {
                cellCharArr = cow.pen.toLowerCase().split('');
            }
            /** Search by each character of input string */
            return searchTagCharArr.some((searchChar) => {
                return cellCharArr.includes(searchChar);
            });
        });
    }

    private _getCowDetails(cow: CowData): ICowDetails {
        let cowDetails: ICowDetails;
        const cowJson =
            DetailsJson.find(
                (details: Partial<ICowDetails>) => details.tagNumber.toLowerCase() === cow.tagNumber.toLowerCase()
            );
        if (!!cowJson) {
            cowDetails = Object.assign({}, cowJson, JSON.parse(JSON.stringify(cow)));
            cowDetails.recentEvents = this._getCowEventDetails(cow.tagNumber);
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

    private _getCowEventDetails(tagNumber: string): IEventLog[] {
        return EventsJson.filter((eventLog) => eventLog.tagNumber.toLowerCase() === tagNumber.toLowerCase());
    }

    private _addCowToDataSource(cow: CowData): void {
        this.cows.push(cow);
        this.dataSource.pushItems([cow]);
    }
}
