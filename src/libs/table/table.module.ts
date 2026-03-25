import { NgModule } from "@angular/core";
import { CgHeaderRowDef, CgRowDef, CgHeaderRow, CgRow, CgFooterRow, CgFooterRowDef, CgNoDataRow } from "./row";
import { CgTable } from "./table";
import { CgCell, CgCellDef, CgFooterCell, CgFooterCellDef, CgHeaderCell, CgHeaderCellDef } from "./cell";
import { CgColumnDef } from "./column";

@NgModule({
    imports: [
        CgTable, CgColumnDef,
        CgNoDataRow, CgRowDef, CgHeaderRowDef, CgFooterRowDef, CgRow, CgHeaderRow, CgFooterRow,
        CgCellDef, CgHeaderCellDef, CgFooterCellDef, CgCell, CgHeaderCell, CgFooterCell,
    ],
    exports: [
        CgTable, CgColumnDef,
        CgNoDataRow, CgRowDef, CgHeaderRowDef, CgFooterRowDef, CgRow, CgHeaderRow, CgFooterRow,
        CgCellDef, CgHeaderCellDef, CgFooterCellDef, CgCell, CgHeaderCell, CgFooterCell,
    ]
})
export class CgTableModule {}