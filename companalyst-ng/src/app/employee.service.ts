import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constants } from './constants';
import { Employee } from './employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }

  url :string  = Constants.rootUrl + "/employeelist";

  fetchEmployeeList(): Promise<Employee[]> { 
    return this.http.get<Employee[]>(this.url).toPromise();
  }
 
 

}
