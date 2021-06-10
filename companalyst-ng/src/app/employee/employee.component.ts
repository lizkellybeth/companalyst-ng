import { EmployeeService } from './../employee.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CompanyJob } from '../company-job';
import { CompanyJobListService } from '../company-job-list.service';
import { Employee } from '../employee';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class EmployeeComponent implements OnInit, AfterViewInit, OnDestroy {

  employees: Employee[] = []
  dataSource = new MatTableDataSource(this.employees);
  displayedColumns: string[] = ['EmployeeID', 'FirstName', 'LastName', 'EmploymentStatusCode', 'CompanyJobCode'];
  expandedElement: Employee | null;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  selectedFilter = ""
  searchForm = this.formBuilder.group({
    searchText: [''],
    searchFilter: ['']
  })

  constructor(private service: EmployeeService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.fetchEmployeeList();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy() {

  }

  clickSearch() {
    console.log("hey! " + JSON.stringify(this.searchForm.value['searchText']));

  }

  clickClear() {
    this.dataSource = new MatTableDataSource(this.employees);
    this.ngAfterViewInit();
    this.searchForm.reset();
  }

  public fetchEmployeeList() {
    this.service.fetchEmployeeList()
      .then(res => {
        console.log("fetched result: " + (res));
        this.employees = res;
        this.dataSource = new MatTableDataSource(this.employees);
        this.ngAfterViewInit();
      })
      .catch(err => {
        console.error(err);
      });
  }


}
