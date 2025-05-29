import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { WorkflowRunActionRepetitionsRequestHistories } from "../operationsInterfaces/index.js";
import { LogicManagementClient } from "../logicManagementClient.js";
import { RequestHistory, WorkflowRunActionRepetitionsRequestHistoriesListOptionalParams, WorkflowRunActionRepetitionsRequestHistoriesGetOptionalParams, WorkflowRunActionRepetitionsRequestHistoriesGetResponse } from "../models/index.js";
/** Class containing WorkflowRunActionRepetitionsRequestHistories operations. */
export declare class WorkflowRunActionRepetitionsRequestHistoriesImpl implements WorkflowRunActionRepetitionsRequestHistories {
    private readonly client;
    /**
     * Initialize a new instance of the class WorkflowRunActionRepetitionsRequestHistories class.
     * @param client Reference to the service client
     */
    constructor(client: LogicManagementClient);
    /**
     * List a workflow run repetition request history.
     * @param resourceGroupName The resource group name.
     * @param workflowName The workflow name.
     * @param runName The workflow run name.
     * @param actionName The workflow action name.
     * @param repetitionName The workflow repetition.
     * @param options The options parameters.
     */
    list(resourceGroupName: string, workflowName: string, runName: string, actionName: string, repetitionName: string, options?: WorkflowRunActionRepetitionsRequestHistoriesListOptionalParams): PagedAsyncIterableIterator<RequestHistory>;
    private listPagingPage;
    private listPagingAll;
    /**
     * List a workflow run repetition request history.
     * @param resourceGroupName The resource group name.
     * @param workflowName The workflow name.
     * @param runName The workflow run name.
     * @param actionName The workflow action name.
     * @param repetitionName The workflow repetition.
     * @param options The options parameters.
     */
    private _list;
    /**
     * Gets a workflow run repetition request history.
     * @param resourceGroupName The resource group name.
     * @param workflowName The workflow name.
     * @param runName The workflow run name.
     * @param actionName The workflow action name.
     * @param repetitionName The workflow repetition.
     * @param requestHistoryName The request history name.
     * @param options The options parameters.
     */
    get(resourceGroupName: string, workflowName: string, runName: string, actionName: string, repetitionName: string, requestHistoryName: string, options?: WorkflowRunActionRepetitionsRequestHistoriesGetOptionalParams): Promise<WorkflowRunActionRepetitionsRequestHistoriesGetResponse>;
    /**
     * ListNext
     * @param resourceGroupName The resource group name.
     * @param workflowName The workflow name.
     * @param runName The workflow run name.
     * @param actionName The workflow action name.
     * @param repetitionName The workflow repetition.
     * @param nextLink The nextLink from the previous successful call to the List method.
     * @param options The options parameters.
     */
    private _listNext;
}
//# sourceMappingURL=workflowRunActionRepetitionsRequestHistories.d.ts.map