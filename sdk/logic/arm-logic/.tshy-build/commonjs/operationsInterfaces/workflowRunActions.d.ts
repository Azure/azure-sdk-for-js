import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { WorkflowRunAction, WorkflowRunActionsListOptionalParams, ExpressionRoot, WorkflowRunActionsListExpressionTracesOptionalParams, WorkflowRunActionsGetOptionalParams, WorkflowRunActionsGetResponse } from "../models/index.js";
/** Interface representing a WorkflowRunActions. */
export interface WorkflowRunActions {
    /**
     * Gets a list of workflow run actions.
     * @param resourceGroupName The resource group name.
     * @param workflowName The workflow name.
     * @param runName The workflow run name.
     * @param options The options parameters.
     */
    list(resourceGroupName: string, workflowName: string, runName: string, options?: WorkflowRunActionsListOptionalParams): PagedAsyncIterableIterator<WorkflowRunAction>;
    /**
     * Lists a workflow run expression trace.
     * @param resourceGroupName The resource group name.
     * @param workflowName The workflow name.
     * @param runName The workflow run name.
     * @param actionName The workflow action name.
     * @param options The options parameters.
     */
    listExpressionTraces(resourceGroupName: string, workflowName: string, runName: string, actionName: string, options?: WorkflowRunActionsListExpressionTracesOptionalParams): PagedAsyncIterableIterator<ExpressionRoot>;
    /**
     * Gets a workflow run action.
     * @param resourceGroupName The resource group name.
     * @param workflowName The workflow name.
     * @param runName The workflow run name.
     * @param actionName The workflow action name.
     * @param options The options parameters.
     */
    get(resourceGroupName: string, workflowName: string, runName: string, actionName: string, options?: WorkflowRunActionsGetOptionalParams): Promise<WorkflowRunActionsGetResponse>;
}
//# sourceMappingURL=workflowRunActions.d.ts.map