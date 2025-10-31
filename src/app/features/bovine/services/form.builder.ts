import { inject, Injectable } from "@angular/core";
import { FormBuilder, FormControl, Validators } from "@angular/forms";
import { FormControlConstants } from "../constants/FormControlConstants";
import { STATUS } from "../enums/Status.enum";
import { CowData } from "../models/CowData";
import { GENDER } from "../enums/Gender.enum";

@Injectable()
export class CowFormBuilder {
    private _fb: FormBuilder = inject(FormBuilder);

    buildForm() {
        return this._fb.group({
            [FormControlConstants.TAG_NUMBER]: [
                '', [Validators.required]
            ],
            [FormControlConstants.GENDER]: [
                '', [Validators.required]
            ],
            [FormControlConstants.PEN]: [
                '', [Validators.required]
            ],
            [FormControlConstants.STATUS]: [
                STATUS.ACTIVE, [Validators.required]
            ],
            [FormControlConstants.WEIGHT]: [
                '',
                [Validators.pattern(new RegExp('^\\s*\\d+\\s*$'))]
            ]
        });
    }

    convertFormDataToTableData(formData: any): CowData {
        return new CowData({
            tagNumber: formData[FormControlConstants.TAG_NUMBER],
            gender: formData[FormControlConstants.GENDER],
            status: formData[FormControlConstants.STATUS],
            pen: formData[FormControlConstants.PEN],
            recordedDate: new Date().toISOString(),
            weight: formData[FormControlConstants.WEIGHT] ?? '',
        });
    }
}
