import { Component, inject, OnInit } from '@angular/core';
import { LowerCasePipe } from '@angular/common';
import { AbstractControl, ReactiveFormsModule, type FormControl, type FormGroup } from '@angular/forms';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { CowFormBuilder } from '../../services/form.builder';
import { FormControlConstants } from '../../constants/FormControlConstants';
import { ControlKeyValue, FormControlKeyValue, getControlKeyValue } from '../../../../utils/form/getControlKeyValue';
import { GENDER } from '../../enums/Gender.enum';
import { STATUS } from '../../enums/Status.enum';
import { IDialogData } from './IDialogData';
import { FormErrorMessages } from '../../constants/FormErrorMessages';

@Component({
    selector: 'cg-add-cow-dialog',
    imports: [
        ReactiveFormsModule,
        LowerCasePipe,
    ],
    templateUrl: './add-cow-dialog.html',
    styleUrl: './add-cow-dialog.scss',
})
export class AddCowDialog implements OnInit {
    formGroup: FormGroup;

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

    private _formService: CowFormBuilder = inject(CowFormBuilder);
    private _dialogRef: DialogRef<any> = inject(DialogRef);
    private _dialogData: IDialogData = inject(DIALOG_DATA);

    get tagNumber(): FormControlKeyValue<string> {
        return getControlKeyValue(this.formGroup, FormControlConstants.TAG_NUMBER);
    }
    get gender(): FormControlKeyValue<string> {
        return getControlKeyValue(this.formGroup, FormControlConstants.GENDER);
    }
    get pen(): FormControlKeyValue<string> {
        return getControlKeyValue(this.formGroup, FormControlConstants.PEN);
    }
    get status(): FormControlKeyValue<string> {
        return getControlKeyValue(this.formGroup, FormControlConstants.STATUS);
    }
    get weight(): FormControlKeyValue<string> {
        return getControlKeyValue(this.formGroup, FormControlConstants.WEIGHT);
    }

    ngOnInit(): void {
        this.formGroup = this._formService.buildForm();
    }

    save(): void {
        this.formGroup.markAllAsDirty();
        this.formGroup.markAllAsTouched();

        if (this.formGroup.invalid) {
            return;
        }
        const isUniqueTagNumber =
            this._formService.isUniqueTagNumber(
                this.tagNumber.control.value,
                this._dialogData.existingTagNumbers
            );
        if (!isUniqueTagNumber) {
            this.tagNumber.control.setErrors({
                duplicate: true,
            });
            return;
        }
        this._dialogRef.close(this.formGroup.value);
    }

    cancel(): void {
        this._dialogRef.close();
    }

    hasError(control: AbstractControl): boolean {
        return control.invalid && (control.dirty || control.touched);
    }

    getError(ctrl: ControlKeyValue): string {
        const [error] = Object.keys(ctrl.control.errors || {});
        if (!error) {
            return '';
        }
        const errorKey = error as Exclude<keyof typeof FormErrorMessages, 'prototype'>;
        return FormErrorMessages[errorKey];
    }
}
