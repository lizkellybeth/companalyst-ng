import { CompanyJobListService } from './../company-job-list.service';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CompanyJob } from '../company-job';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-company-job-list',
  templateUrl: './company-job-list.component.html',
  styleUrls: ['./company-job-list.component.css']
})
export class CompanyJobListComponent implements OnInit, AfterViewInit {

  companyJobs: CompanyJob[] = []
  dataSource = new MatTableDataSource(this.companyJobs);
  displayedColumns: string[] = ['CompanyJobCode', 'CompanyJobTitle', 'JobCategory', 'CompanyJobDesc', 'JobLevel', 'JobFlsaStatus'];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private service: CompanyJobListService) { }

  ngOnInit(): void {
    this.fetchCompanyJobList()
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
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
