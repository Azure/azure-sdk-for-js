import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { WorkflowVersion, WorkflowVersionsListOptionalParams, WorkflowVersionsGetOptionalParams, WorkflowVersionsGetResponse } from "../models/index.js";
/** Interface representing a WorkflowVersions. */
export interface WorkflowVersions {
    /**
     * Gets a list of workflow versions.
     * @param resourceGroupName The resource group name.
     * @param workflowName The workflow name.
     * @param options The options parameters.
     */
    list(resourceGroupName: string, workflowName: string, options?: WorkflowVersionsListOptionalParams): PagedAsyncIterableIterator<WorkflowVersion>;
    /**
     * Gets a workflow version.
     * @param resourceGroupName The resource group name.
     * @param workflowName The workflow name.
     * @param versionId The workflow versionId.
     * @param options The options parameters.
     */
    get(resourceGroupName: string, workflowName: string, versionId: string, options?: WorkflowVersionsGetOptionalParams): Promise<WorkflowVersionsGetResponse>;
}
//# sourceMappingURL=workflowVersions.d.ts.map