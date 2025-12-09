import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { formatToLocaleDate, formatToLocaleDateTime } from "@lib/utils";

@Component({
    selector: 'cg-date-renderer',
    templateUrl: './date-renderer.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
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
