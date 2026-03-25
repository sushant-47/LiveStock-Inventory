import { Directive, ElementRef, inject } from "@angular/core";
import { BaseCdkCell, CdkCell, CdkCellDef, CdkColumnDef, CdkFooterCell, CdkFooterCellDef, CdkHeaderCell, CdkHeaderCellDef } from "@angular/cdk/table";

/**
 * Cell definition for a CDK table.
 * Captures the template of a column's data row cell as well as cell-specific properties.
 */
@Directive({
    selector: '[cgCellDef]',
    providers: [
        { provide: CdkCellDef, useExisting: CgCellDef },
    ],
})
export class CgCellDef extends CdkCellDef {}

/**
 * Header cell definition for a CDK table.
 * Captures the template of a column's header cell and as well as cell-specific properties.
 */
@Directive({
    selector: '[cgHeaderCellDef]',
    providers: [
        { provide: CdkHeaderCellDef, useExisting: CgHeaderCellDef },
    ],
})
export class CgHeaderCellDef extends CdkHeaderCellDef {}

/**
 * Footer cell definition for a CDK table.
 * Captures the template of a column's footer cell and as well as cell-specific properties.
 */
@Directive({
    selector: '[cgFooterCellDef]',
    providers: [
        { provide: CdkFooterCellDef, useExisting: CgFooterCellDef },
    ],
})
export class CgFooterCellDef extends CdkFooterCellDef {}



/** Cell template container that adds the right classes and role. */
@Directive({
    selector: 'cg-cell, td[cg-cell]',
    host: {
        'class': 'cdk-cell',
    },
})
export class CgCell extends CdkCell {}


/** Header cell template container that adds the right classes and role. */
@Directive({
    selector: 'cg-header-cell, th[cg-header-cell]',
    host: {
        'class': 'cdk-header-cell',
        'role': 'columnheader',
    },
})
export class CgHeaderCell extends CdkHeaderCell {}


/** Footer cell template container that adds the right classes and role. */
@Directive({
    selector: 'cg-footer-cell, td[cg-footer-cell]',
    host: {
        'class': 'cdk-footer-cell',
    },
})
export class CgFooterCell extends CdkFooterCell {}

  