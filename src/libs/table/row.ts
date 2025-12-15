import { ChangeDetectionStrategy, Component, Directive, ViewEncapsulation } from "@angular/core";
import { CdkCellOutlet, CdkFooterRowDef, CdkHeaderRowDef, CdkNoDataRow, CdkRowDef } from "@angular/cdk/table";

/**
 * Header row definition for the CDK table.
 * Captures the header row's template and other header properties such as the columns to display.
 */
@Directive({
    selector: '[cgHeaderRowDef]',
    inputs: [{ name: 'columns', alias: 'cgHeaderRowDefColumns' }],
    providers: [
        { provide: CdkHeaderRowDef, useExisting: CgHeaderRowDef }
    ]
})
export class CgHeaderRowDef extends CdkHeaderRowDef { }

/**
 * Footer row definition for the CDK table.
 * Captures the footer row's template and other footer properties such as the columns to display.
 */
@Directive({
    selector: '[cgFooterRowDef]',
    inputs: [{ name: 'columns', alias: 'cgFooterRowDefColumns' }],
    providers: [
        { provide: CdkFooterRowDef, useExisting: CgFooterRowDef }
    ],
})
export class CgFooterRowDef extends CdkFooterRowDef { }

/**
 * Data row definition for the CDK table.
 * Captures the row's template and other row properties such as the columns to display and
 * a when predicate that describes when this row should be used or use as default row definition if not provided.
 */
@Directive({
    selector: '[cgRowDef]',
    inputs: [
        { name: 'columns', alias: 'cgRowDefColumns' },
        { name: 'when', alias: 'cgRowDefWhen' },
    ],
    providers: [
        { provide: CdkRowDef, useExisting: CgRowDef }
    ],
})
export class CgRowDef<T> extends CdkRowDef<T> { }



@Component({
    selector: 'cg-header-row',
    template: `<ng-container cdkCellOutlet></ng-container>`,
    host: {
        'class': 'cdk-header-row',
        'role': 'row',
    },
    // See note on CdkTable for explanation on why this uses the default change detection strategy.
    changeDetection: ChangeDetectionStrategy.OnPush,
    //   encapsulation: ViewEncapsulation.None,
    imports: [CdkCellOutlet],
})
export class CgHeaderRow { }


/** Footer template container that contains the cell outlet. Adds the right class and role. */
@Component({
    selector: 'cg-footer-row',
    template: `<ng-container cdkCellOutlet></ng-container>`,
    host: {
        'class': 'cdk-footer-row',
        'role': 'row',
    },
    // See note on CdkTable for explanation on why this uses the default change detection strategy.
    changeDetection: ChangeDetectionStrategy.OnPush,
    //   encapsulation: ViewEncapsulation.None,
    imports: [CdkCellOutlet],
})
export class CgFooterRow { }


/** Data row template container that contains the cell outlet. Adds the right class and role. */
@Component({
    selector: 'cg-row',
    template: `<ng-container cdkCellOutlet></ng-container>`,
    host: {
        'class': 'cdk-row',
        'role': 'row',
    },
    // See note on CdkTable for explanation on why this uses the default change detection strategy.
    changeDetection: ChangeDetectionStrategy.OnPush,
    //   encapsulation: ViewEncapsulation.None,
    imports: [CdkCellOutlet],
})
export class CgRow { }

/** Row that can be used to display a message when no data is shown in the table. */
@Directive({
    selector: 'ng-template[cgNoDataRow]',
})
export class CgNoDataRow extends CdkNoDataRow {
}
