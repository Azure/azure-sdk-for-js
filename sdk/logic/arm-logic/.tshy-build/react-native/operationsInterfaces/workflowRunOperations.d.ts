import { WorkflowRunOperationsGetOptionalParams, WorkflowRunOperationsGetResponse } from "../models/index.js";
/** Interface representing a WorkflowRunOperations. */
export interface WorkflowRunOperations {
    /**
     * Gets an operation for a run.
     * @param resourceGroupName The resource group name.
     * @param workflowName The workflow name.
     * @param runName The workflow run name.
     * @param operationId The workflow operation id.
     * @param options The options parameters.
     */
    get(resourceGroupName: string, workflowName: string, runName: string, operationId: string, options?: WorkflowRunOperationsGetOptionalParams): Promise<WorkflowRunOperationsGetResponse>;
}
//# sourceMappingURL=workflowRunOperations.d.ts.map