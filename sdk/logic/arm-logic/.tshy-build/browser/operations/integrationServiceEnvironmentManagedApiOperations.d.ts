import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { IntegrationServiceEnvironmentManagedApiOperations } from "../operationsInterfaces/index.js";
import { LogicManagementClient } from "../logicManagementClient.js";
import { ApiOperation, IntegrationServiceEnvironmentManagedApiOperationsListOptionalParams } from "../models/index.js";
/** Class containing IntegrationServiceEnvironmentManagedApiOperations operations. */
export declare class IntegrationServiceEnvironmentManagedApiOperationsImpl implements IntegrationServiceEnvironmentManagedApiOperations {
    private readonly client;
    /**
     * Initialize a new instance of the class IntegrationServiceEnvironmentManagedApiOperations class.
     * @param client Reference to the service client
     */
    constructor(client: LogicManagementClient);
    /**
     * Gets the managed Api operations.
     * @param resourceGroup The resource group.
     * @param integrationServiceEnvironmentName The integration service environment name.
     * @param apiName The api name.
     * @param options The options parameters.
     */
    list(resourceGroup: string, integrationServiceEnvironmentName: string, apiName: string, options?: IntegrationServiceEnvironmentManagedApiOperationsListOptionalParams): PagedAsyncIterableIterator<ApiOperation>;
    private listPagingPage;
    private listPagingAll;
    /**
     * Gets the managed Api operations.
     * @param resourceGroup The resource group.
     * @param integrationServiceEnvironmentName The integration service environment name.
     * @param apiName The api name.
     * @param options The options parameters.
     */
    private _list;
    /**
     * ListNext
     * @param resourceGroup The resource group.
     * @param integrationServiceEnvironmentName The integration service environment name.
     * @param apiName The api name.
     * @param nextLink The nextLink from the previous successful call to the List method.
     * @param options The options parameters.
     */
    private _listNext;
}
//# sourceMappingURL=integrationServiceEnvironmentManagedApiOperations.d.ts.map