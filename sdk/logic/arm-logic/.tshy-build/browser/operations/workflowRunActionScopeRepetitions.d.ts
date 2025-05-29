import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { WorkflowRunActionScopeRepetitions } from "../operationsInterfaces/index.js";
import { LogicManagementClient } from "../logicManagementClient.js";
import { WorkflowRunActionRepetitionDefinition, WorkflowRunActionScopeRepetitionsListOptionalParams, WorkflowRunActionScopeRepetitionsGetOptionalParams, WorkflowRunActionScopeRepetitionsGetResponse } from "../models/index.js";
/** Class containing WorkflowRunActionScopeRepetitions operations. */
export declare class WorkflowRunActionScopeRepetitionsImpl implements WorkflowRunActionScopeRepetitions {
    private readonly client;
    /**
     * Initialize a new instance of the class WorkflowRunActionScopeRepetitions class.
     * @param client Reference to the service client
     */
    constructor(client: LogicManagementClient);
    /**
     * List the workflow run action scoped repetitions.
     * @param resourceGroupName The resource group name.
     * @param workflowName The workflow name.
     * @param runName The workflow run name.
     * @param actionName The workflow action name.
     * @param options The options parameters.
     */
    list(resourceGroupName: string, workflowName: string, runName: string, actionName: string, options?: WorkflowRunActionScopeRepetitionsListOptionalParams): PagedAsyncIterableIterator<WorkflowRunActionRepetitionDefinition>;
    private listPagingPage;
    private listPagingAll;
    /**
     * List the workflow run action scoped repetitions.
     * @param resourceGroupName The resource group name.
     * @param workflowName The workflow name.
     * @param runName The workflow run name.
     * @param actionName The workflow action name.
     * @param options The options parameters.
     */
    private _list;
    /**
     * Get a workflow run action scoped repetition.
     * @param resourceGroupName The resource group name.
     * @param workflowName The workflow name.
     * @param runName The workflow run name.
     * @param actionName The workflow action name.
     * @param repetitionName The workflow repetition.
     * @param options The options parameters.
     */
    get(resourceGroupName: string, workflowName: string, runName: string, actionName: string, repetitionName: string, options?: WorkflowRunActionScopeRepetitionsGetOptionalParams): Promise<WorkflowRunActionScopeRepetitionsGetResponse>;
}
//# sourceMappingURL=workflowRunActionScopeRepetitions.d.ts.map