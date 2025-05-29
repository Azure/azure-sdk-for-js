import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { IntegrationServiceEnvironmentSkus } from "../operationsInterfaces/index.js";
import { LogicManagementClient } from "../logicManagementClient.js";
import { IntegrationServiceEnvironmentSkuDefinition, IntegrationServiceEnvironmentSkusListOptionalParams } from "../models/index.js";
/** Class containing IntegrationServiceEnvironmentSkus operations. */
export declare class IntegrationServiceEnvironmentSkusImpl implements IntegrationServiceEnvironmentSkus {
    private readonly client;
    /**
     * Initialize a new instance of the class IntegrationServiceEnvironmentSkus class.
     * @param client Reference to the service client
     */
    constructor(client: LogicManagementClient);
    /**
     * Gets a list of integration service environment Skus.
     * @param resourceGroup The resource group.
     * @param integrationServiceEnvironmentName The integration service environment name.
     * @param options The options parameters.
     */
    list(resourceGroup: string, integrationServiceEnvironmentName: string, options?: IntegrationServiceEnvironmentSkusListOptionalParams): PagedAsyncIterableIterator<IntegrationServiceEnvironmentSkuDefinition>;
    private listPagingPage;
    private listPagingAll;
    /**
     * Gets a list of integration service environment Skus.
     * @param resourceGroup The resource group.
     * @param integrationServiceEnvironmentName The integration service environment name.
     * @param options The options parameters.
     */
    private _list;
    /**
     * ListNext
     * @param resourceGroup The resource group.
     * @param integrationServiceEnvironmentName The integration service environment name.
     * @param nextLink The nextLink from the previous successful call to the List method.
     * @param options The options parameters.
     */
    private _listNext;
}
//# sourceMappingURL=integrationServiceEnvironmentSkus.d.ts.map