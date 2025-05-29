import { WorkflowRunOperations } from "../operationsInterfaces/index.js";
import { LogicManagementClient } from "../logicManagementClient.js";
import { WorkflowRunOperationsGetOptionalParams, WorkflowRunOperationsGetResponse } from "../models/index.js";
/** Class containing WorkflowRunOperations operations. */
export declare class WorkflowRunOperationsImpl implements WorkflowRunOperations {
    private readonly client;
    /**
     * Initialize a new instance of the class WorkflowRunOperations class.
     * @param client Reference to the service client
     */
    constructor(client: LogicManagementClient);
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