import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { RequestHistory, WorkflowRunActionRequestHistoriesListOptionalParams, WorkflowRunActionRequestHistoriesGetOptionalParams, WorkflowRunActionRequestHistoriesGetResponse } from "../models/index.js";
/** Interface representing a WorkflowRunActionRequestHistories. */
export interface WorkflowRunActionRequestHistories {
    /**
     * List a workflow run request history.
     * @param resourceGroupName The resource group name.
     * @param workflowName The workflow name.
     * @param runName The workflow run name.
     * @param actionName The workflow action name.
     * @param options The options parameters.
     */
    list(resourceGroupName: string, workflowName: string, runName: string, actionName: string, options?: WorkflowRunActionRequestHistoriesListOptionalParams): PagedAsyncIterableIterator<RequestHistory>;
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
}
//# sourceMappingURL=workflowRunActionRequestHistories.d.ts.map