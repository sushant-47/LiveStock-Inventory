import { inject, Injectable } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { FormControlConstants } from "../constants/FormControlConstants";
import { STATUS } from "../enums/Status.enum";
import { CowData } from "../models/CowData";

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

    isUniqueTagNumber(tagNumber: string, tagNumbers: string[]): boolean {
        const formattedTagNumbers = tagNumbers.map((tag) => tag.toLowerCase());
        if (formattedTagNumbers.includes(tagNumber.toLowerCase())) {
            return false;
        }
        return true;
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
