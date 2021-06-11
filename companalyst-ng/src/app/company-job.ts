import { JobDetails } from './job-details';
export interface CompanyJob {

    CompanyJobCode: string
    CompanyJobTitle: string
    JobCategory: string
    CompanyJobDesc: string
    JobLevel: string
    JobFLSAStatus: string

    Details: JobDetails

}
