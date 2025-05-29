import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { RequestHistory, WorkflowRunActionRepetitionsRequestHistoriesListOptionalParams, WorkflowRunActionRepetitionsRequestHistoriesGetOptionalParams, WorkflowRunActionRepetitionsRequestHistoriesGetResponse } from "../models/index.js";
/** Interface representing a WorkflowRunActionRepetitionsRequestHistories. */
export interface WorkflowRunActionRepetitionsRequestHistories {
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
}
//# sourceMappingURL=workflowRunActionRepetitionsRequestHistories.d.ts.map