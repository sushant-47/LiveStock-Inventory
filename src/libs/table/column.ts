import { CdkColumnDef } from "@angular/cdk/table";
import { Directive } from "@angular/core";

/**
 * Column definition for the CDK table.
 * Defines a set of cells available for a table column.
 */
@Directive({
    selector: '[cgColumnDef]',
    providers: [
        { provide: 'MAT_SORT_HEADER_COLUMN_DEF', useExisting: CgColumnDef },
        { provide: CdkColumnDef, useExisting: CgColumnDef },
    ],
    inputs: [
        { name: 'name', alias: 'cgColumnDef' },
    ]
})
export class CgColumnDef extends CdkColumnDef {}
