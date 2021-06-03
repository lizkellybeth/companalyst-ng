import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Constants } from './constants';
import { CompanyJob } from './company-job';

@Injectable({
  providedIn: 'root'
})
export class CompanyJobListService {

  url :string  = Constants.rootUrl + "/companyjoblist";

  constructor(private http: HttpClient) {} 

  fetchCompanyJobList(): Promise<CompanyJob[]> { 
    return this.http.get<CompanyJob[]>(this.url).toPromise();
  }
 
 

}