import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { LowerCasePipe } from '@angular/common';
import { CgAccordionModule } from '@lib/accordion';
import { IDialogData } from './IDialogData';
import { ICowDetails } from '../../models/ICowDetails';
import { GENDER } from '../../enums/Gender.enum';
import { DateRenderer } from '../../renderers/date-renderer/date-renderer';
import { StatusRenderer } from '../../renderers/status-renderer/status-renderer';
import { BREED } from '../../enums/Breed.enum';

@Component({
    selector: 'cg-details-dialog',
    imports: [
        LowerCasePipe,
        CgAccordionModule,
        DateRenderer,
        StatusRenderer,
    ],
    templateUrl: './details-dialog.html',
    styleUrl: './details-dialog.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CowDetailsDialog {
    info: ICowDetails;

    readonly GENDER: typeof GENDER = GENDER;
    readonly BREED: typeof BREED = BREED;

    private _dialogRef = inject(DialogRef);
    private _dialogData: IDialogData = inject(DIALOG_DATA);

    ngOnInit(): void {
        console.log('dialog data', this._dialogData);
        this.info = this._dialogData.cowDetails;
    }

    cancel(): void {
        this._dialogRef.close();
    }
}
