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

export function getControlKeyValue<T>(formGroup: FormGroup, ctrlPath: string): FormControlKeyValue<T>;
export function getControlKeyValue(formGroup: FormGroup, ctrlPath: string): FormGroupKeyValue;
export function getControlKeyValue<T>(formGroup: FormGroup, ctrlPath: string): ControlKeyValue<T> {
    return {
        key: ctrlPath,
        control: formGroup.get(ctrlPath)
    };
}
