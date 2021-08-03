import { AfterViewInit, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CompanyJob } from '../company-job';
import { JobDetails } from '../job-details';
import { JobDetailsService } from '../job-details.service';

@Component({
  selector: 'app-company-job',
  templateUrl: './company-job.component.html',
  styleUrls: ['./company-job.component.css']
})
export class CompanyJobComponent implements OnInit {

  @Input() jdmJobDescHistoryID: string;
  @Input() jobDetails: JobDetails;

  constructor(private jobDetailsService: JobDetailsService) { }

  ngOnInit(): void {
    this.fetchJobDetails(this.jdmJobDescHistoryID);
  }

  public fetchJobDetails(jdmJobDescHistoryID: string) {
    this.jobDetailsService.fetchJobDetails(jdmJobDescHistoryID)
      .then(res => {
        console.log("fetched result: " + (res ));
        var details: JobDetails = res as JobDetails;
        console.log("DETAILS: [" + details.CompanyJobCode + "]");
        this.jobDetails = details;
      })
      .catch(err => {
        console.error(err);
      });
  }
  


}
