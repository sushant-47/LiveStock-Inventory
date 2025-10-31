import { CdkTableDataSourceInput, CdkTableModule, DataSource } from '@angular/cdk/table';
import { Component } from '@angular/core';
import { CowData } from '../../models/CowData';
import { TargetBinder } from '@angular/compiler';
import { ArrayDataSource } from '@angular/cdk/collections';
import { TableDataSource } from '../../models/TableDataSource';

@Component({
    selector: 'cg-cow-list',
    imports: [
        CdkTableModule,
    ],
    templateUrl: './cow-list.html',
    styleUrl: './cow-list.scss',
})
export class CowList {
    cattles: CowData[] = [];
    dataSource: TableDataSource<CowData> = new TableDataSource(this.cattles);
    
}
