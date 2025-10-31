import { DialogRef } from '@angular/cdk/dialog';
import { Component } from '@angular/core';

@Component({
  selector: 'cg-add-cow-dialog',
  imports: [],
  templateUrl: './add-cow-dialog.html',
  styleUrl: './add-cow-dialog.scss',
})
export class AddCowDialog {

    constructor(
        private dialogRef: DialogRef
    ) {}

}
