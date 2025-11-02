import { Component, Input } from "@angular/core";
import { formatToLocaleDateTime } from "../../../../utils/date/formatToLocaleDateTime";
import { formatToLocaleDate } from "../../../../utils/date/formatToLocaleDate";

@Component({
    selector: 'cg-date-renderer',
    templateUrl: './date-renderer.html'
})
export class DateRenderer {
    @Input({ required: true}) date: string | Date;
    @Input() formatToDateOnly: boolean;
    displayDate: string = '-';

    ngOnChanges(): void {
        if (typeof this.date === 'string') {
            this.displayDate = this._getFormattedDate(this.date);
        }
        if (this.date instanceof Date) {
            this.displayDate = this._getFormattedDate(this.date.toISOString());
        }
    }

    private _getFormattedDate(date: string): string {
        if (this.formatToDateOnly) {
            return formatToLocaleDate(date);
        }
        return formatToLocaleDateTime(date);
    }
}
