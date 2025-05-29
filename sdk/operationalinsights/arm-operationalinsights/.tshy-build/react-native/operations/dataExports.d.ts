import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { DataExports } from "../operationsInterfaces/index.js";
import { OperationalInsightsManagementClient } from "../operationalInsightsManagementClient.js";
import { DataExport, DataExportsListByWorkspaceOptionalParams, DataExportsCreateOrUpdateOptionalParams, DataExportsCreateOrUpdateResponse, DataExportsGetOptionalParams, DataExportsGetResponse, DataExportsDeleteOptionalParams } from "../models/index.js";
/** Class containing DataExports operations. */
export declare class DataExportsImpl implements DataExports {
    private readonly client;
    /**
     * Initialize a new instance of the class DataExports class.
     * @param client Reference to the service client
     */
    constructor(client: OperationalInsightsManagementClient);
    /**
     * Lists the data export instances within a workspace.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param workspaceName The name of the workspace.
     * @param options The options parameters.
     */
    listByWorkspace(resourceGroupName: string, workspaceName: string, options?: DataExportsListByWorkspaceOptionalParams): PagedAsyncIterableIterator<DataExport>;
    private listByWorkspacePagingPage;
    private listByWorkspacePagingAll;
    /**
     * Lists the data export instances within a workspace.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param workspaceName The name of the workspace.
     * @param options The options parameters.
     */
    private _listByWorkspace;
    /**
     * Create or update a data export.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param workspaceName The name of the workspace.
     * @param dataExportName The data export rule name.
     * @param parameters The parameters required to create or update a data export.
     * @param options The options parameters.
     */
    createOrUpdate(resourceGroupName: string, workspaceName: string, dataExportName: string, parameters: DataExport, options?: DataExportsCreateOrUpdateOptionalParams): Promise<DataExportsCreateOrUpdateResponse>;
    /**
     * Gets a data export instance.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param workspaceName The name of the workspace.
     * @param dataExportName The data export rule name.
     * @param options The options parameters.
     */
    get(resourceGroupName: string, workspaceName: string, dataExportName: string, options?: DataExportsGetOptionalParams): Promise<DataExportsGetResponse>;
    /**
     * Deletes the specified data export in a given workspace..
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param workspaceName The name of the workspace.
     * @param dataExportName The data export rule name.
     * @param options The options parameters.
     */
    delete(resourceGroupName: string, workspaceName: string, dataExportName: string, options?: DataExportsDeleteOptionalParams): Promise<void>;
}
//# sourceMappingURL=dataExports.d.ts.map