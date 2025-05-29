import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { DataSources } from "../operationsInterfaces/index.js";
import { OperationalInsightsManagementClient } from "../operationalInsightsManagementClient.js";
import { DataSource, DataSourcesListByWorkspaceOptionalParams, DataSourcesCreateOrUpdateOptionalParams, DataSourcesCreateOrUpdateResponse, DataSourcesDeleteOptionalParams, DataSourcesGetOptionalParams, DataSourcesGetResponse } from "../models/index.js";
/** Class containing DataSources operations. */
export declare class DataSourcesImpl implements DataSources {
    private readonly client;
    /**
     * Initialize a new instance of the class DataSources class.
     * @param client Reference to the service client
     */
    constructor(client: OperationalInsightsManagementClient);
    /**
     * Gets the first page of data source instances in a workspace with the link to the next page.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param workspaceName The name of the workspace.
     * @param filter The filter to apply on the operation.
     * @param options The options parameters.
     */
    listByWorkspace(resourceGroupName: string, workspaceName: string, filter: string, options?: DataSourcesListByWorkspaceOptionalParams): PagedAsyncIterableIterator<DataSource>;
    private listByWorkspacePagingPage;
    private listByWorkspacePagingAll;
    /**
     * Create or update a data source.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param workspaceName The name of the workspace.
     * @param dataSourceName The name of the datasource resource.
     * @param parameters The parameters required to create or update a datasource.
     * @param options The options parameters.
     */
    createOrUpdate(resourceGroupName: string, workspaceName: string, dataSourceName: string, parameters: DataSource, options?: DataSourcesCreateOrUpdateOptionalParams): Promise<DataSourcesCreateOrUpdateResponse>;
    /**
     * Deletes a data source instance.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param workspaceName The name of the workspace.
     * @param dataSourceName Name of the datasource.
     * @param options The options parameters.
     */
    delete(resourceGroupName: string, workspaceName: string, dataSourceName: string, options?: DataSourcesDeleteOptionalParams): Promise<void>;
    /**
     * Gets a datasource instance.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param workspaceName The name of the workspace.
     * @param dataSourceName Name of the datasource
     * @param options The options parameters.
     */
    get(resourceGroupName: string, workspaceName: string, dataSourceName: string, options?: DataSourcesGetOptionalParams): Promise<DataSourcesGetResponse>;
    /**
     * Gets the first page of data source instances in a workspace with the link to the next page.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param workspaceName The name of the workspace.
     * @param filter The filter to apply on the operation.
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
//# sourceMappingURL=dataSources.d.ts.map