import { Component, Input } from "@angular/core";
import { formatToLocaleDate } from "../../../../utils/date/formatToLocaleDate";

@Component({
    selector: 'cg-date-renderer',
    templateUrl: './date-renderer.html'
})
export class DateRenderer {
    @Input({ required: true}) date: string | Date;
    displayDate: string = '-';

    ngOnChanges(): void {
        if (typeof this.date === 'string') {
            this.displayDate = formatToLocaleDate(this.date);
        }
        if (this.date instanceof Date) {
            this.displayDate = formatToLocaleDate(this.date.toISOString());
        }
    }
}
