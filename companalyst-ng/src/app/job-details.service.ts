import { JobDetails } from './job-details';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CompanyJob } from './company-job';
import { Constants } from './constants';

@Injectable({
  providedIn: 'root'
})
export class JobDetailsService {

  url :string  = Constants.rootUrl + "/companyjob";

  constructor(private http: HttpClient) {} 

  fetchJobDetails(jobCode: string): Promise<JobDetails> { 
    return this.http.get<JobDetails>(this.url + "?jobcode=" + jobCode).toPromise();
  }
 
 
}
