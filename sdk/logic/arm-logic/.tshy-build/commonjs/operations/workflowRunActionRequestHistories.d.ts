import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { WorkflowRunActionRequestHistories } from "../operationsInterfaces/index.js";
import { LogicManagementClient } from "../logicManagementClient.js";
import { RequestHistory, WorkflowRunActionRequestHistoriesListOptionalParams, WorkflowRunActionRequestHistoriesGetOptionalParams, WorkflowRunActionRequestHistoriesGetResponse } from "../models/index.js";
/** Class containing WorkflowRunActionRequestHistories operations. */
export declare class WorkflowRunActionRequestHistoriesImpl implements WorkflowRunActionRequestHistories {
    private readonly client;
    /**
     * Initialize a new instance of the class WorkflowRunActionRequestHistories class.
     * @param client Reference to the service client
     */
    constructor(client: LogicManagementClient);
    /**
     * List a workflow run request history.
     * @param resourceGroupName The resource group name.
     * @param workflowName The workflow name.
     * @param runName The workflow run name.
     * @param actionName The workflow action name.
     * @param options The options parameters.
     */
    list(resourceGroupName: string, workflowName: string, runName: string, actionName: string, options?: WorkflowRunActionRequestHistoriesListOptionalParams): PagedAsyncIterableIterator<RequestHistory>;
    private listPagingPage;
    private listPagingAll;
    /**
     * List a workflow run request history.
     * @param resourceGroupName The resource group name.
     * @param workflowName The workflow name.
     * @param runName The workflow run name.
     * @param actionName The workflow action name.
     * @param options The options parameters.
     */
    private _list;
    /**
     * Gets a workflow run request history.
     * @param resourceGroupName The resource group name.
     * @param workflowName The workflow name.
     * @param runName The workflow run name.
     * @param actionName The workflow action name.
     * @param requestHistoryName The request history name.
     * @param options The options parameters.
     */
    get(resourceGroupName: string, workflowName: string, runName: string, actionName: string, requestHistoryName: string, options?: WorkflowRunActionRequestHistoriesGetOptionalParams): Promise<WorkflowRunActionRequestHistoriesGetResponse>;
    /**
     * ListNext
     * @param resourceGroupName The resource group name.
     * @param workflowName The workflow name.
     * @param runName The workflow run name.
     * @param actionName The workflow action name.
     * @param nextLink The nextLink from the previous successful call to the List method.
     * @param options The options parameters.
     */
    private _listNext;
}
//# sourceMappingURL=workflowRunActionRequestHistories.d.ts.map