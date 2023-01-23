import { trigger, state, style, transition, animate } from '@angular/animations';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { saveAsExcel } from '@eklipse/utilities';
import { STORAGE_KEYS } from 'src/app/app.constants';
import { ELEMENT_DATA } from './data';
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class TableComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  expandedElement: any;

  responsiveMode = true;

  searchKey = '';

  columnWithKey = 'position';

  dataInput = new FormControl('');

  displayedColumns: string[] = [];
  displayedColumnsSliced: string[] = [];
  displayedAlias: string[] = [];
  displayedAliasSliced: string[] = [];
  displayedCssClasses: string[] = [];

  refactor = false;

  dataSource: any = new MatTableDataSource<any>([]);

  constructor(private _cd: ChangeDetectorRef) {}

  public ngOnInit(): void {
    this.renderTable();

    this._instanceDataSource(ELEMENT_DATA);
  }

  public remove(element: any) {
    console.log(element);
    console.log(
      this.dataSource.data.filter((_: any) => element[this.columnWithKey] !== _[this.columnWithKey])
    );
    this._instanceDataSource(
      this.dataSource.data.filter((_: any) => element[this.columnWithKey] !== _[this.columnWithKey])
    );
  }

  public onSetResponsive() {}

  public clearTable() {}

  public onSeeInfo(index: number) {}

  public generateExcel() {
    saveAsExcel(this.dataSource.filteredData);
  }

  public renderTable() {
    this.refactor = true;

    const displayedColumns = JSON.parse(localStorage.getItem(STORAGE_KEYS.columns)!);
    const slicedAt = displayedColumns.lenght;

    this.displayedColumnsSliced = displayedColumns.slice(0, slicedAt);

    displayedColumns.push('actions');
    this.displayedColumnsSliced.push('actions');

    this.displayedColumns = displayedColumns;

    const displayedAlias =
      localStorage.getItem(STORAGE_KEYS.alias) &&
      JSON.parse(localStorage.getItem(STORAGE_KEYS.alias)!).length
        ? JSON.parse(localStorage.getItem(STORAGE_KEYS.alias)!)
        : this.displayedColumns;

    const displayedAliasSliced =
      localStorage.getItem(STORAGE_KEYS.alias) &&
      JSON.parse(localStorage.getItem(STORAGE_KEYS.alias)!).length
        ? JSON.parse(localStorage.getItem(STORAGE_KEYS.alias)!).slice(0, slicedAt)
        : this.displayedColumnsSliced.slice(0, slicedAt);

    this.displayedAliasSliced = displayedAliasSliced;

    console.log(displayedAliasSliced);

    displayedAlias.push('Acciones');
    this.displayedAliasSliced.push('Acciones');

    this.displayedAlias = displayedAlias;

    this.displayedCssClasses =
      localStorage.getItem(STORAGE_KEYS.classes) &&
      JSON.parse(localStorage.getItem(STORAGE_KEYS.classes)!).length
        ? JSON.parse(localStorage.getItem(STORAGE_KEYS.classes)!)
        : ['col-22-5 bolder', 'col-22-5', 'col-22-5', 'col-22-5'];

    console.log(this.displayedCssClasses);

    setTimeout(() => {
      this.refactor = false;
      this._cd.markForCheck();
    }, 100);
  }

  private _instanceDataSource(data: any = []) {
    this.dataSource = new MatTableDataSource<any>(data);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
}
