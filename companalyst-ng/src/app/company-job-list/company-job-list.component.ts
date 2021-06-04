import { CompanyJobListService } from './../company-job-list.service';
import { Component, OnInit, ViewChild, AfterViewInit, ElementRef, OnDestroy } from '@angular/core';
import { CompanyJob } from '../company-job';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { AutofillMonitor } from '@angular/cdk/text-field';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-company-job-list',
  templateUrl: './company-job-list.component.html',
  styleUrls: ['./company-job-list.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class CompanyJobListComponent implements OnInit, AfterViewInit, OnDestroy {

  companyJobs: CompanyJob[] = []
  dataSource = new MatTableDataSource(this.companyJobs);
  displayedColumns: string[] = ['CompanyJobCode', 'CompanyJobTitle', 'JobCategory', 'JobLevel', 'JobFlsaStatus'];
  expandedElement: CompanyJob | null;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  selectedFilter = ""
  searchForm = this.formBuilder.group({
    searchText: [''],
    searchField: ['']
  })
  
  constructor(private service: CompanyJobListService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.fetchCompanyJobList()
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy() {
    
  }

  clickSearch(){
    console.log("hey! " + JSON.stringify(this.searchForm.value['searchText']));
    var text: string = this.searchForm.value['searchText'];
    var field: string = this.searchForm.value['searchField'];
    //console.log("field: " + field + " -- text: " + text)
    var filteredJobs : CompanyJob[] = []
    for (var job of this.companyJobs){
      var checkField: string = job[field]
      if (checkField.includes(text)){
        console.log("field: " + field + " -- text: " + text)
        filteredJobs.push(job)
      }
    }
    this.dataSource = new MatTableDataSource(filteredJobs);
    this.ngAfterViewInit();
  }

  public fetchCompanyJobList() {
    this.service.fetchCompanyJobList()
      .then(res => {
        console.log("fetched result: " + (res ));
        this.companyJobs = res;
        this.dataSource = new MatTableDataSource(this.companyJobs);
        this.ngAfterViewInit();
      })
      .catch(err => {
        console.error(err);
      });
  }
  

}
