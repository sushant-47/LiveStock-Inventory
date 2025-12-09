import { AbstractControl, FormArray, FormControl, FormGroup } from "@angular/forms";

export type ControlKeyValue<T = any> = {
    control: AbstractControl<T>;
    key: string;
};
export type FormControlKeyValue<T> = {
    control: FormControl<T>;
    key: string;
};
export type FormGroupKeyValue = {
    control: FormGroup;
    key: string;
};
export type FormArrayKeyValue = {
    control: FormArray;
    key: string;
};
