import { WorkflowVersionTriggers } from "../operationsInterfaces/index.js";
import { LogicManagementClient } from "../logicManagementClient.js";
import { WorkflowVersionTriggersListCallbackUrlOptionalParams, WorkflowVersionTriggersListCallbackUrlResponse } from "../models/index.js";
/** Class containing WorkflowVersionTriggers operations. */
export declare class WorkflowVersionTriggersImpl implements WorkflowVersionTriggers {
    private readonly client;
    /**
     * Initialize a new instance of the class WorkflowVersionTriggers class.
     * @param client Reference to the service client
     */
    constructor(client: LogicManagementClient);
    /**
     * Get the callback url for a trigger of a workflow version.
     * @param resourceGroupName The resource group name.
     * @param workflowName The workflow name.
     * @param versionId The workflow versionId.
     * @param triggerName The workflow trigger name.
     * @param options The options parameters.
     */
    listCallbackUrl(resourceGroupName: string, workflowName: string, versionId: string, triggerName: string, options?: WorkflowVersionTriggersListCallbackUrlOptionalParams): Promise<WorkflowVersionTriggersListCallbackUrlResponse>;
}
//# sourceMappingURL=workflowVersionTriggers.d.ts.map