import { JobDetails } from './job-details';
export interface CompanyJob {

    JDMJobDescHistoryID: string
    CompanyJobCode: string
    CompanyJobTitle: string
    JobCategory: string
    CompanyJobDesc: string
    JobLevel: string
    JobFamily: string
    JobFLSAStatusDesc: string
    LastUpdateDate: string
    LastApprovedDate: string

    Details: JobDetails

}
