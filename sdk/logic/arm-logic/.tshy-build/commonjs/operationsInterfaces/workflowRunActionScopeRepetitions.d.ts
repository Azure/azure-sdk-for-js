import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { WorkflowRunActionRepetitionDefinition, WorkflowRunActionScopeRepetitionsListOptionalParams, WorkflowRunActionScopeRepetitionsGetOptionalParams, WorkflowRunActionScopeRepetitionsGetResponse } from "../models/index.js";
/** Interface representing a WorkflowRunActionScopeRepetitions. */
export interface WorkflowRunActionScopeRepetitions {
    /**
     * List the workflow run action scoped repetitions.
     * @param resourceGroupName The resource group name.
     * @param workflowName The workflow name.
     * @param runName The workflow run name.
     * @param actionName The workflow action name.
     * @param options The options parameters.
     */
    list(resourceGroupName: string, workflowName: string, runName: string, actionName: string, options?: WorkflowRunActionScopeRepetitionsListOptionalParams): PagedAsyncIterableIterator<WorkflowRunActionRepetitionDefinition>;
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