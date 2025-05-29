import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { WorkflowRunActions } from "../operationsInterfaces/index.js";
import { LogicManagementClient } from "../logicManagementClient.js";
import { WorkflowRunAction, WorkflowRunActionsListOptionalParams, ExpressionRoot, WorkflowRunActionsListExpressionTracesOptionalParams, WorkflowRunActionsGetOptionalParams, WorkflowRunActionsGetResponse } from "../models/index.js";
/** Class containing WorkflowRunActions operations. */
export declare class WorkflowRunActionsImpl implements WorkflowRunActions {
    private readonly client;
    /**
     * Initialize a new instance of the class WorkflowRunActions class.
     * @param client Reference to the service client
     */
    constructor(client: LogicManagementClient);
    /**
     * Gets a list of workflow run actions.
     * @param resourceGroupName The resource group name.
     * @param workflowName The workflow name.
     * @param runName The workflow run name.
     * @param options The options parameters.
     */
    list(resourceGroupName: string, workflowName: string, runName: string, options?: WorkflowRunActionsListOptionalParams): PagedAsyncIterableIterator<WorkflowRunAction>;
    private listPagingPage;
    private listPagingAll;
    /**
     * Lists a workflow run expression trace.
     * @param resourceGroupName The resource group name.
     * @param workflowName The workflow name.
     * @param runName The workflow run name.
     * @param actionName The workflow action name.
     * @param options The options parameters.
     */
    listExpressionTraces(resourceGroupName: string, workflowName: string, runName: string, actionName: string, options?: WorkflowRunActionsListExpressionTracesOptionalParams): PagedAsyncIterableIterator<ExpressionRoot>;
    private listExpressionTracesPagingPage;
    private listExpressionTracesPagingAll;
    /**
     * Gets a list of workflow run actions.
     * @param resourceGroupName The resource group name.
     * @param workflowName The workflow name.
     * @param runName The workflow run name.
     * @param options The options parameters.
     */
    private _list;
    /**
     * Gets a workflow run action.
     * @param resourceGroupName The resource group name.
     * @param workflowName The workflow name.
     * @param runName The workflow run name.
     * @param actionName The workflow action name.
     * @param options The options parameters.
     */
    get(resourceGroupName: string, workflowName: string, runName: string, actionName: string, options?: WorkflowRunActionsGetOptionalParams): Promise<WorkflowRunActionsGetResponse>;
    /**
     * Lists a workflow run expression trace.
     * @param resourceGroupName The resource group name.
     * @param workflowName The workflow name.
     * @param runName The workflow run name.
     * @param actionName The workflow action name.
     * @param options The options parameters.
     */
    private _listExpressionTraces;
    /**
     * ListNext
     * @param resourceGroupName The resource group name.
     * @param workflowName The workflow name.
     * @param runName The workflow run name.
     * @param nextLink The nextLink from the previous successful call to the List method.
     * @param options The options parameters.
     */
    private _listNext;
}
//# sourceMappingURL=workflowRunActions.d.ts.map