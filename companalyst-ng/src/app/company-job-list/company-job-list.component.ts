import { JobDetailsService } from './../job-details.service';
import { CompanyJobListService } from './../company-job-list.service';
import { Component, OnInit, ViewChild, AfterViewInit, ElementRef, OnDestroy } from '@angular/core';
import { CompanyJob } from '../company-job';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { FormBuilder } from '@angular/forms';
import { JobDetails } from '../job-details';

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
  filteredJobs: CompanyJob[] = []
  jobDetails: JobDetails[] = [];
  dataSource = new MatTableDataSource(this.companyJobs);
  displayedColumns: string[] = ['CompanyJobCode', 'CompanyJobTitle', 'JobFamily', 'JobLevel', 'JobFLSAStatusDesc'];
  expandedElement: CompanyJob | null;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  selectedFilter = ""
  searchForm = this.formBuilder.group({
    searchText: [''],
    searchFilter: ['']
  })
  
  constructor(private jobListService: CompanyJobListService, private jobDetailsService: JobDetailsService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.fetchCompanyJobList()
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy() {
    
  }

  clickSearch() {
    console.log("hey! " + JSON.stringify(this.searchForm.value['searchText']));
    var searchText: string = this.searchForm.value['searchText'];
    var searchFilter: string = this.searchForm.value['searchFilter'];
    this.filteredJobs = []
    for (var job of this.companyJobs) {
      if (searchText.length > 0) {
        if (searchFilter && searchFilter.length > 0) {// filter has been selected...
          var checkField: string = String(job[searchFilter]);
          if (checkField.includes(searchText)) {
            this.filteredJobs.push(job)
          }
        }
        else {// no filter, check every field ...
          for (var column of this.displayedColumns) {
            if ((job[column]) && (job[column].includes(searchText))) {
              if (!this.filteredJobs.includes(job)) {
                this.filteredJobs.push(job)
              }
            }
          }
          //CompanyJobDesc is not included in the table columns
          if ((job["CompanyJobDesc"]) && (job["CompanyJobDesc"].includes(searchText))) {
            if (!this.filteredJobs.includes(job)) {
              this.filteredJobs.push(job)
            }
          }
        }
        this.filteredJobs = [...this.filteredJobs]; //alerts the angular change detection mechanism
        this.dataSource = new MatTableDataSource(this.filteredJobs);
        this.ngAfterViewInit();
    
      } else {
        //no search text, do nothing
      }
    }
  }

  clickClear() {
    this.filteredJobs = []
    this.dataSource = new MatTableDataSource(this.companyJobs);
    this.ngAfterViewInit();
    this.searchForm.reset();
  }

  clickDetails(job: CompanyJob){
    console.log("JOBCODE: [" + job.CompanyJobCode + "]");
    this.fetchJobDetails(job);
  }

  public fetchCompanyJobList() {
    this.jobListService.fetchCompanyJobList()
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
  
  public fetchJobDetails(job: CompanyJob) {
    var jdmJobDescHistoryID = job.JDMJobDescHistoryID;
    this.jobDetailsService.fetchJobDetails(jdmJobDescHistoryID)
      .then(res => {
        console.log("fetched result: " + (res ));
        var details: JobDetails = res as JobDetails;
        console.log("DETAILS: [" + details.CompanyJobCode + "]");
        job.Details = details;
        if (this.filteredJobs.length == 0){
          this.dataSource = new MatTableDataSource(this.companyJobs);
        } else {
          this.dataSource = new MatTableDataSource(this.filteredJobs);
        }
        this.ngAfterViewInit();
      })
      .catch(err => {
        console.error(err);
      });
  }
  

}
