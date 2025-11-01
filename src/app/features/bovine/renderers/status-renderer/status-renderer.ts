import { Component, Input } from "@angular/core";
import { STATUS } from "../../enums/Status.enum";
import { LowerCasePipe } from "@angular/common";

@Component({
    selector: 'cg-status-renderer',
    templateUrl: './status-renderer.html',
    styleUrls: [
        './status-renderer.scss'
    ],
    imports: [
        LowerCasePipe,
    ]
})
export class StatusRenderer {
    @Input({ required: true }) status: STATUS;
    statusText: string = '';

    ngOnChanges(): void {
        this.statusText = this._getStatusText(this.status);
    }

    private _getStatusText(status: STATUS): string {
        if (typeof status !== 'number') {
            return '-';
        }
        switch(status) {
            case STATUS.DRY_PERIOD:
                return 'Dry Period';
            case STATUS.IN_TREATMENT:
                return 'In Treatment';
            default:
                return STATUS[status];
        }
    }
}
