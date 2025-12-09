import type { FormGroup } from "@angular/forms";
import type { FormControlKeyValue, FormGroupKeyValue, FormArrayKeyValue, ControlKeyValue } from "../types/control";

export function getControlKeyValue<T>(formGroup: FormGroup, ctrlPath: string): FormControlKeyValue<T>;
export function getControlKeyValue(formGroup: FormGroup, ctrlPath: string): FormGroupKeyValue;
export function getControlKeyValue(formGroup: FormGroup, ctrlPath: string): FormArrayKeyValue;
export function getControlKeyValue<T>(formGroup: FormGroup, ctrlPath: string): ControlKeyValue<T> {
    return {
        key: ctrlPath,
        control: formGroup.get(ctrlPath)
    };
}
