import { _VIEW_REPEATER_STRATEGY, _DisposeViewRepeaterStrategy } from "@angular/cdk/collections";
import { CDK_TABLE, CdkTable, STICKY_POSITIONING_LISTENER, HeaderRowOutlet, DataRowOutlet, NoDataRowOutlet, FooterRowOutlet } from "@angular/cdk/table";
import { Component, ViewEncapsulation, ChangeDetectionStrategy } from "@angular/core";

@Component({
    selector: 'cg-table',
    exportAs: 'cdkTable',
    template: `
      <ng-container headerRowOutlet/>
      <ng-container rowOutlet/>
      <ng-container noDataRowOutlet/>
      <ng-container footerRowOutlet/>
    `,
    host: {
        'class': 'cdk-table',
        'role': 'table',
    },
    // encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        { provide: CDK_TABLE, useExisting: CgTable },
        { provide: _VIEW_REPEATER_STRATEGY, useClass: _DisposeViewRepeaterStrategy },
        // Prevent nested tables from seeing this table's StickyPositioningListener.
        { provide: STICKY_POSITIONING_LISTENER, useValue: null },
    ],
    imports: [HeaderRowOutlet, DataRowOutlet, NoDataRowOutlet, FooterRowOutlet],
})
export class CgTable<T> extends CdkTable<T> {
    /**
        data structures:
        - 2 classes
            1. row data
            2. row data wrapper with rxjs and async pipe for reactivity in cell templates without triggering table change detection.

        rendering functions:
        - ngAfterContentChecked
        - _canRender
        - _render
        - renderRows
        - _outletAssigned
        - _renderUpdatedColumns


        getting list of renderrows based on data & rowDefs:
        - _getAllRenderRows
        - _getRenderRowsForData
        - _getRowDefs

        other functions:
        - add, remove custom row defs: addRowDef, removeRowDef, setNoDataRow
        - add, remove custom column defs: addColumnDef, removeColumnDef
     */
}