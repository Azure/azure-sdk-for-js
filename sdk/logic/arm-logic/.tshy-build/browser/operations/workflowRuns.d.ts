import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { WorkflowRuns } from "../operationsInterfaces/index.js";
import { LogicManagementClient } from "../logicManagementClient.js";
import { WorkflowRun, WorkflowRunsListOptionalParams, WorkflowRunsGetOptionalParams, WorkflowRunsGetResponse, WorkflowRunsCancelOptionalParams } from "../models/index.js";
/** Class containing WorkflowRuns operations. */
export declare class WorkflowRunsImpl implements WorkflowRuns {
    private readonly client;
    /**
     * Initialize a new instance of the class WorkflowRuns class.
     * @param client Reference to the service client
     */
    constructor(client: LogicManagementClient);
    /**
     * Gets a list of workflow runs.
     * @param resourceGroupName The resource group name.
     * @param workflowName The workflow name.
     * @param options The options parameters.
     */
    list(resourceGroupName: string, workflowName: string, options?: WorkflowRunsListOptionalParams): PagedAsyncIterableIterator<WorkflowRun>;
    private listPagingPage;
    private listPagingAll;
    /**
     * Gets a list of workflow runs.
     * @param resourceGroupName The resource group name.
     * @param workflowName The workflow name.
     * @param options The options parameters.
     */
    private _list;
    /**
     * Gets a workflow run.
     * @param resourceGroupName The resource group name.
     * @param workflowName The workflow name.
     * @param runName The workflow run name.
     * @param options The options parameters.
     */
    get(resourceGroupName: string, workflowName: string, runName: string, options?: WorkflowRunsGetOptionalParams): Promise<WorkflowRunsGetResponse>;
    /**
     * Cancels a workflow run.
     * @param resourceGroupName The resource group name.
     * @param workflowName The workflow name.
     * @param runName The workflow run name.
     * @param options The options parameters.
     */
    cancel(resourceGroupName: string, workflowName: string, runName: string, options?: WorkflowRunsCancelOptionalParams): Promise<void>;
    /**
     * ListNext
     * @param resourceGroupName The resource group name.
     * @param workflowName The workflow name.
     * @param nextLink The nextLink from the previous successful call to the List method.
     * @param options The options parameters.
     */
    private _listNext;
}
//# sourceMappingURL=workflowRuns.d.ts.map