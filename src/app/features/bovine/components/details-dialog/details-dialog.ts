import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Component, inject } from '@angular/core';
import { IDialogData } from './IDialogData';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { ICowDetails } from '../../models/ICowDetails';
import { GENDER } from '../../enums/Gender.enum';

@Component({
    selector: 'cg-details-dialog',
    imports: [
        CdkAccordionModule,
    ],
    templateUrl: './details-dialog.html',
    styleUrl: './details-dialog.scss',
})
export class CowDetailsDialog {
    info: ICowDetails;
    readonly GENDER: typeof GENDER = GENDER;
    private _dialogRef = inject(DialogRef);
    private _dialogData: IDialogData = inject(DIALOG_DATA);

    ngOnInit(): void {
        console.log('dialog data', this._dialogData)
        this.info = this._dialogData.cowDetails;
    }

    cancel(): void {
        this._dialogRef.close();
    }
}
