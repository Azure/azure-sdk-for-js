import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { WorkflowVersions } from "../operationsInterfaces/index.js";
import { LogicManagementClient } from "../logicManagementClient.js";
import { WorkflowVersion, WorkflowVersionsListOptionalParams, WorkflowVersionsGetOptionalParams, WorkflowVersionsGetResponse } from "../models/index.js";
/** Class containing WorkflowVersions operations. */
export declare class WorkflowVersionsImpl implements WorkflowVersions {
    private readonly client;
    /**
     * Initialize a new instance of the class WorkflowVersions class.
     * @param client Reference to the service client
     */
    constructor(client: LogicManagementClient);
    /**
     * Gets a list of workflow versions.
     * @param resourceGroupName The resource group name.
     * @param workflowName The workflow name.
     * @param options The options parameters.
     */
    list(resourceGroupName: string, workflowName: string, options?: WorkflowVersionsListOptionalParams): PagedAsyncIterableIterator<WorkflowVersion>;
    private listPagingPage;
    private listPagingAll;
    /**
     * Gets a list of workflow versions.
     * @param resourceGroupName The resource group name.
     * @param workflowName The workflow name.
     * @param options The options parameters.
     */
    private _list;
    /**
     * Gets a workflow version.
     * @param resourceGroupName The resource group name.
     * @param workflowName The workflow name.
     * @param versionId The workflow versionId.
     * @param options The options parameters.
     */
    get(resourceGroupName: string, workflowName: string, versionId: string, options?: WorkflowVersionsGetOptionalParams): Promise<WorkflowVersionsGetResponse>;
    /**
     * ListNext
     * @param resourceGroupName The resource group name.
     * @param workflowName The workflow name.
     * @param nextLink The nextLink from the previous successful call to the List method.
     * @param options The options parameters.
     */
    private _listNext;
}
//# sourceMappingURL=workflowVersions.d.ts.map