import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { DeleteJobs } from "../operationsInterfaces/index.js";
import { AzureDigitalTwinsAPI } from "../azureDigitalTwinsAPI.js";
import { SimplePollerLike, OperationState } from "@azure/core-lro";
import { DeleteJob, DeleteJobsListOptionalParams, DeleteJobsAddOptionalParams, DeleteJobsAddResponse, DeleteJobsGetByIdOptionalParams, DeleteJobsGetByIdResponse } from "../models/index.js";
/** Class containing DeleteJobs operations. */
export declare class DeleteJobsImpl implements DeleteJobs {
    private readonly client;
    /**
     * Initialize a new instance of the class DeleteJobs class.
     * @param client Reference to the service client
     */
    constructor(client: AzureDigitalTwinsAPI);
    /**
     * Retrieves all deletion jobs. This may be useful to find a delete job that was previously requested,
     * or to view a history of delete jobs that have run or are currently running on the instance.
     * Status codes:
     * * 200 OK
     * @param options The options parameters.
     */
    list(options?: DeleteJobsListOptionalParams): PagedAsyncIterableIterator<DeleteJob>;
    private listPagingPage;
    private listPagingAll;
    /**
     * Initiates a job which deletes all models, twins, and relationships on the instance. Does not delete
     * any other types of entities.
     * Status codes:
     * * 202 Created
     * * 400 Bad Request
     *   * JobLimitReached - The maximum number of delete jobs allowed has been reached.
     *   * ValidationFailed - Operation-Id already exists.
     * @param options The options parameters.
     */
    beginAdd(options?: DeleteJobsAddOptionalParams): Promise<SimplePollerLike<OperationState<DeleteJobsAddResponse>, DeleteJobsAddResponse>>;
    /**
     * Initiates a job which deletes all models, twins, and relationships on the instance. Does not delete
     * any other types of entities.
     * Status codes:
     * * 202 Created
     * * 400 Bad Request
     *   * JobLimitReached - The maximum number of delete jobs allowed has been reached.
     *   * ValidationFailed - Operation-Id already exists.
     * @param options The options parameters.
     */
    beginAddAndWait(options?: DeleteJobsAddOptionalParams): Promise<DeleteJobsAddResponse>;
    /**
     * Retrieves all deletion jobs. This may be useful to find a delete job that was previously requested,
     * or to view a history of delete jobs that have run or are currently running on the instance.
     * Status codes:
     * * 200 OK
     * @param options The options parameters.
     */
    private _list;
    /**
     * Retrieves a delete job.
     * Status codes:
     * * 200 OK
     * * 404 Not Found
     *   * DeleteJobNotFound - The delete job was not found.
     * @param id The id for the delete job. The id is unique within the service and case sensitive.
     * @param options The options parameters.
     */
    getById(id: string, options?: DeleteJobsGetByIdOptionalParams): Promise<DeleteJobsGetByIdResponse>;
    /**
     * ListNext
     * @param nextLink The nextLink from the previous successful call to the List method.
     * @param options The options parameters.
     */
    private _listNext;
}
//# sourceMappingURL=deleteJobs.d.ts.map