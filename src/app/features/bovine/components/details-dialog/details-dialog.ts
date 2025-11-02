import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Component, inject } from '@angular/core';
import { IDialogData } from './IDialogData';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { ICowDetails } from '../../models/ICowDetails';
import { GENDER } from '../../enums/Gender.enum';
import { STATUS } from '../../enums/Status.enum';
import { DateRenderer } from '../../renderers/date-renderer/date-renderer';
import { StatusRenderer } from '../../renderers/status-renderer/status-renderer';
import { CommonModule, LowerCasePipe } from '@angular/common';
import { BREED } from '../../enums/Breed.enum';

@Component({
    selector: 'cg-details-dialog',
    imports: [
        CommonModule,
        LowerCasePipe,
        CdkAccordionModule,
        DateRenderer,
        StatusRenderer,
    ],
    templateUrl: './details-dialog.html',
    styleUrl: './details-dialog.scss',
})
export class CowDetailsDialog {
    info: ICowDetails;

    readonly GENDER: typeof GENDER = GENDER;
    readonly BREED: typeof BREED = BREED;

    private _dialogRef = inject(DialogRef);
    private _dialogData: IDialogData = inject(DIALOG_DATA);

    ngOnInit(): void {
        console.log('dialog data', this._dialogData)
        this.info = this._dialogData.cowDetails;
    }

    ngAfterViewInit(): void {
        console.log('CowDetailsDialog: ngAfterViewInit');
    }

    cancel(): void {
        this._dialogRef.close();
    }
}
