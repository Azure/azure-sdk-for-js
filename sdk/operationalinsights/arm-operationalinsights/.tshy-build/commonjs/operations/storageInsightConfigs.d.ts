import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { StorageInsightConfigs } from "../operationsInterfaces/index.js";
import { OperationalInsightsManagementClient } from "../operationalInsightsManagementClient.js";
import { StorageInsight, StorageInsightConfigsListByWorkspaceOptionalParams, StorageInsightConfigsCreateOrUpdateOptionalParams, StorageInsightConfigsCreateOrUpdateResponse, StorageInsightConfigsGetOptionalParams, StorageInsightConfigsGetResponse, StorageInsightConfigsDeleteOptionalParams } from "../models/index.js";
/** Class containing StorageInsightConfigs operations. */
export declare class StorageInsightConfigsImpl implements StorageInsightConfigs {
    private readonly client;
    /**
     * Initialize a new instance of the class StorageInsightConfigs class.
     * @param client Reference to the service client
     */
    constructor(client: OperationalInsightsManagementClient);
    /**
     * Lists the storage insight instances within a workspace
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param workspaceName The name of the workspace.
     * @param options The options parameters.
     */
    listByWorkspace(resourceGroupName: string, workspaceName: string, options?: StorageInsightConfigsListByWorkspaceOptionalParams): PagedAsyncIterableIterator<StorageInsight>;
    private listByWorkspacePagingPage;
    private listByWorkspacePagingAll;
    /**
     * Create or update a storage insight.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param workspaceName The name of the workspace.
     * @param storageInsightName Name of the storageInsightsConfigs resource
     * @param parameters The parameters required to create or update a storage insight.
     * @param options The options parameters.
     */
    createOrUpdate(resourceGroupName: string, workspaceName: string, storageInsightName: string, parameters: StorageInsight, options?: StorageInsightConfigsCreateOrUpdateOptionalParams): Promise<StorageInsightConfigsCreateOrUpdateResponse>;
    /**
     * Gets a storage insight instance.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param workspaceName The name of the workspace.
     * @param storageInsightName Name of the storageInsightsConfigs resource
     * @param options The options parameters.
     */
    get(resourceGroupName: string, workspaceName: string, storageInsightName: string, options?: StorageInsightConfigsGetOptionalParams): Promise<StorageInsightConfigsGetResponse>;
    /**
     * Deletes a storageInsightsConfigs resource
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param workspaceName The name of the workspace.
     * @param storageInsightName Name of the storageInsightsConfigs resource
     * @param options The options parameters.
     */
    delete(resourceGroupName: string, workspaceName: string, storageInsightName: string, options?: StorageInsightConfigsDeleteOptionalParams): Promise<void>;
    /**
     * Lists the storage insight instances within a workspace
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param workspaceName The name of the workspace.
     * @param options The options parameters.
     */
    private _listByWorkspace;
    /**
     * ListByWorkspaceNext
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param workspaceName The name of the workspace.
     * @param nextLink The nextLink from the previous successful call to the ListByWorkspace method.
     * @param options The options parameters.
     */
    private _listByWorkspaceNext;
}
//# sourceMappingURL=storageInsightConfigs.d.ts.map