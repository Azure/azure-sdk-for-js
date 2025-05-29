import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { WorkflowRunActionRepetitions } from "../operationsInterfaces/index.js";
import { LogicManagementClient } from "../logicManagementClient.js";
import { WorkflowRunActionRepetitionDefinition, WorkflowRunActionRepetitionsListOptionalParams, ExpressionRoot, WorkflowRunActionRepetitionsListExpressionTracesOptionalParams, WorkflowRunActionRepetitionsGetOptionalParams, WorkflowRunActionRepetitionsGetResponse } from "../models/index.js";
/** Class containing WorkflowRunActionRepetitions operations. */
export declare class WorkflowRunActionRepetitionsImpl implements WorkflowRunActionRepetitions {
    private readonly client;
    /**
     * Initialize a new instance of the class WorkflowRunActionRepetitions class.
     * @param client Reference to the service client
     */
    constructor(client: LogicManagementClient);
    /**
     * Get all of a workflow run action repetitions.
     * @param resourceGroupName The resource group name.
     * @param workflowName The workflow name.
     * @param runName The workflow run name.
     * @param actionName The workflow action name.
     * @param options The options parameters.
     */
    list(resourceGroupName: string, workflowName: string, runName: string, actionName: string, options?: WorkflowRunActionRepetitionsListOptionalParams): PagedAsyncIterableIterator<WorkflowRunActionRepetitionDefinition>;
    private listPagingPage;
    private listPagingAll;
    /**
     * Lists a workflow run expression trace.
     * @param resourceGroupName The resource group name.
     * @param workflowName The workflow name.
     * @param runName The workflow run name.
     * @param actionName The workflow action name.
     * @param repetitionName The workflow repetition.
     * @param options The options parameters.
     */
    listExpressionTraces(resourceGroupName: string, workflowName: string, runName: string, actionName: string, repetitionName: string, options?: WorkflowRunActionRepetitionsListExpressionTracesOptionalParams): PagedAsyncIterableIterator<ExpressionRoot>;
    private listExpressionTracesPagingPage;
    private listExpressionTracesPagingAll;
    /**
     * Get all of a workflow run action repetitions.
     * @param resourceGroupName The resource group name.
     * @param workflowName The workflow name.
     * @param runName The workflow run name.
     * @param actionName The workflow action name.
     * @param options The options parameters.
     */
    private _list;
    /**
     * Get a workflow run action repetition.
     * @param resourceGroupName The resource group name.
     * @param workflowName The workflow name.
     * @param runName The workflow run name.
     * @param actionName The workflow action name.
     * @param repetitionName The workflow repetition.
     * @param options The options parameters.
     */
    get(resourceGroupName: string, workflowName: string, runName: string, actionName: string, repetitionName: string, options?: WorkflowRunActionRepetitionsGetOptionalParams): Promise<WorkflowRunActionRepetitionsGetResponse>;
    /**
     * Lists a workflow run expression trace.
     * @param resourceGroupName The resource group name.
     * @param workflowName The workflow name.
     * @param runName The workflow run name.
     * @param actionName The workflow action name.
     * @param repetitionName The workflow repetition.
     * @param options The options parameters.
     */
    private _listExpressionTraces;
}
//# sourceMappingURL=workflowRunActionRepetitions.d.ts.map