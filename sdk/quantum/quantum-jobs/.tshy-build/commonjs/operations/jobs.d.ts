import type { PagedAsyncIterableIterator } from "@azure/core-paging";
import type { Jobs } from "../operationsInterfaces/index.js";
import type { QuantumJobClient } from "../quantumJobClient.js";
import type { JobDetails, JobsListOptionalParams, JobsGetOptionalParams, JobsGetResponse, JobsCreateOptionalParams, JobsCreateResponse, JobsCancelOptionalParams } from "../models/index.js";
/** Class containing Jobs operations. */
export declare class JobsImpl implements Jobs {
    private readonly client;
    /**
     * Initialize a new instance of the class Jobs class.
     * @param client Reference to the service client
     */
    constructor(client: QuantumJobClient);
    /**
     * List jobs.
     * @param options The options parameters.
     */
    list(options?: JobsListOptionalParams): PagedAsyncIterableIterator<JobDetails>;
    private listPagingPage;
    private listPagingAll;
    /**
     * List jobs.
     * @param options The options parameters.
     */
    private _list;
    /**
     * Get job by id
     * @param jobId Id of the job.
     * @param options The options parameters.
     */
    get(jobId: string, options?: JobsGetOptionalParams): Promise<JobsGetResponse>;
    /**
     * Create a job.
     * @param jobId Id of the job.
     * @param job The complete metadata of the job to submit.
     * @param options The options parameters.
     */
    create(jobId: string, job: JobDetails, options?: JobsCreateOptionalParams): Promise<JobsCreateResponse>;
    /**
     * Cancel a job.
     * @param jobId Id of the job.
     * @param options The options parameters.
     */
    cancel(jobId: string, options?: JobsCancelOptionalParams): Promise<void>;
    /**
     * ListNext
     * @param nextLink The nextLink from the previous successful call to the List method.
     * @param options The options parameters.
     */
    private _listNext;
}
//# sourceMappingURL=jobs.d.ts.map