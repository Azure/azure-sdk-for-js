import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { Tables } from "../operationsInterfaces/index.js";
import { OperationalInsightsManagementClient } from "../operationalInsightsManagementClient.js";
import { PollerLike, PollOperationState } from "@azure/core-lro";
import { Table, TablesListByWorkspaceOptionalParams, TablesCreateOrUpdateOptionalParams, TablesCreateOrUpdateResponse, TablesUpdateOptionalParams, TablesUpdateResponse, TablesGetOptionalParams, TablesGetResponse, TablesDeleteOptionalParams, TablesMigrateOptionalParams, TablesCancelSearchOptionalParams } from "../models/index.js";
/** Class containing Tables operations. */
export declare class TablesImpl implements Tables {
    private readonly client;
    /**
     * Initialize a new instance of the class Tables class.
     * @param client Reference to the service client
     */
    constructor(client: OperationalInsightsManagementClient);
    /**
     * Gets all the tables for the specified Log Analytics workspace.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param workspaceName The name of the workspace.
     * @param options The options parameters.
     */
    listByWorkspace(resourceGroupName: string, workspaceName: string, options?: TablesListByWorkspaceOptionalParams): PagedAsyncIterableIterator<Table>;
    private listByWorkspacePagingPage;
    private listByWorkspacePagingAll;
    /**
     * Gets all the tables for the specified Log Analytics workspace.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param workspaceName The name of the workspace.
     * @param options The options parameters.
     */
    private _listByWorkspace;
    /**
     * Update or Create a Log Analytics workspace table.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param workspaceName The name of the workspace.
     * @param tableName The name of the table.
     * @param parameters The parameters required to update table properties.
     * @param options The options parameters.
     */
    beginCreateOrUpdate(resourceGroupName: string, workspaceName: string, tableName: string, parameters: Table, options?: TablesCreateOrUpdateOptionalParams): Promise<PollerLike<PollOperationState<TablesCreateOrUpdateResponse>, TablesCreateOrUpdateResponse>>;
    /**
     * Update or Create a Log Analytics workspace table.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param workspaceName The name of the workspace.
     * @param tableName The name of the table.
     * @param parameters The parameters required to update table properties.
     * @param options The options parameters.
     */
    beginCreateOrUpdateAndWait(resourceGroupName: string, workspaceName: string, tableName: string, parameters: Table, options?: TablesCreateOrUpdateOptionalParams): Promise<TablesCreateOrUpdateResponse>;
    /**
     * Update a Log Analytics workspace table.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param workspaceName The name of the workspace.
     * @param tableName The name of the table.
     * @param parameters The parameters required to update table properties.
     * @param options The options parameters.
     */
    beginUpdate(resourceGroupName: string, workspaceName: string, tableName: string, parameters: Table, options?: TablesUpdateOptionalParams): Promise<PollerLike<PollOperationState<TablesUpdateResponse>, TablesUpdateResponse>>;
    /**
     * Update a Log Analytics workspace table.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param workspaceName The name of the workspace.
     * @param tableName The name of the table.
     * @param parameters The parameters required to update table properties.
     * @param options The options parameters.
     */
    beginUpdateAndWait(resourceGroupName: string, workspaceName: string, tableName: string, parameters: Table, options?: TablesUpdateOptionalParams): Promise<TablesUpdateResponse>;
    /**
     * Gets a Log Analytics workspace table.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param workspaceName The name of the workspace.
     * @param tableName The name of the table.
     * @param options The options parameters.
     */
    get(resourceGroupName: string, workspaceName: string, tableName: string, options?: TablesGetOptionalParams): Promise<TablesGetResponse>;
    /**
     * Delete a Log Analytics workspace table.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param workspaceName The name of the workspace.
     * @param tableName The name of the table.
     * @param options The options parameters.
     */
    beginDelete(resourceGroupName: string, workspaceName: string, tableName: string, options?: TablesDeleteOptionalParams): Promise<PollerLike<PollOperationState<void>, void>>;
    /**
     * Delete a Log Analytics workspace table.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param workspaceName The name of the workspace.
     * @param tableName The name of the table.
     * @param options The options parameters.
     */
    beginDeleteAndWait(resourceGroupName: string, workspaceName: string, tableName: string, options?: TablesDeleteOptionalParams): Promise<void>;
    /**
     * Migrate a Log Analytics table from support of the Data Collector API and Custom Fields features to
     * support of Data Collection Rule-based Custom Logs.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param workspaceName The name of the workspace.
     * @param tableName The name of the table.
     * @param options The options parameters.
     */
    migrate(resourceGroupName: string, workspaceName: string, tableName: string, options?: TablesMigrateOptionalParams): Promise<void>;
    /**
     * Cancel a log analytics workspace search results table query run.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param workspaceName The name of the workspace.
     * @param tableName The name of the table.
     * @param options The options parameters.
     */
    cancelSearch(resourceGroupName: string, workspaceName: string, tableName: string, options?: TablesCancelSearchOptionalParams): Promise<void>;
}
//# sourceMappingURL=tables.d.ts.map