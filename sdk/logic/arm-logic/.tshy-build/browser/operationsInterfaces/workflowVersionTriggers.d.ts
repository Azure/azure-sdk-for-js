import { WorkflowVersionTriggersListCallbackUrlOptionalParams, WorkflowVersionTriggersListCallbackUrlResponse } from "../models/index.js";
/** Interface representing a WorkflowVersionTriggers. */
export interface WorkflowVersionTriggers {
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