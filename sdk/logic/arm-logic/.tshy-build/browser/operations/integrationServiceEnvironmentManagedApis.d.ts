import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { IntegrationServiceEnvironmentManagedApis } from "../operationsInterfaces/index.js";
import { LogicManagementClient } from "../logicManagementClient.js";
import { PollerLike, PollOperationState } from "@azure/core-lro";
import { IntegrationServiceEnvironmentManagedApi, IntegrationServiceEnvironmentManagedApisListOptionalParams, IntegrationServiceEnvironmentManagedApisGetOptionalParams, IntegrationServiceEnvironmentManagedApisGetResponse, IntegrationServiceEnvironmentManagedApisPutOptionalParams, IntegrationServiceEnvironmentManagedApisPutResponse, IntegrationServiceEnvironmentManagedApisDeleteOptionalParams } from "../models/index.js";
/** Class containing IntegrationServiceEnvironmentManagedApis operations. */
export declare class IntegrationServiceEnvironmentManagedApisImpl implements IntegrationServiceEnvironmentManagedApis {
    private readonly client;
    /**
     * Initialize a new instance of the class IntegrationServiceEnvironmentManagedApis class.
     * @param client Reference to the service client
     */
    constructor(client: LogicManagementClient);
    /**
     * Gets the integration service environment managed Apis.
     * @param resourceGroup The resource group.
     * @param integrationServiceEnvironmentName The integration service environment name.
     * @param options The options parameters.
     */
    list(resourceGroup: string, integrationServiceEnvironmentName: string, options?: IntegrationServiceEnvironmentManagedApisListOptionalParams): PagedAsyncIterableIterator<IntegrationServiceEnvironmentManagedApi>;
    private listPagingPage;
    private listPagingAll;
    /**
     * Gets the integration service environment managed Apis.
     * @param resourceGroup The resource group.
     * @param integrationServiceEnvironmentName The integration service environment name.
     * @param options The options parameters.
     */
    private _list;
    /**
     * Gets the integration service environment managed Api.
     * @param resourceGroup The resource group name.
     * @param integrationServiceEnvironmentName The integration service environment name.
     * @param apiName The api name.
     * @param options The options parameters.
     */
    get(resourceGroup: string, integrationServiceEnvironmentName: string, apiName: string, options?: IntegrationServiceEnvironmentManagedApisGetOptionalParams): Promise<IntegrationServiceEnvironmentManagedApisGetResponse>;
    /**
     * Puts the integration service environment managed Api.
     * @param resourceGroup The resource group name.
     * @param integrationServiceEnvironmentName The integration service environment name.
     * @param apiName The api name.
     * @param integrationServiceEnvironmentManagedApi The integration service environment managed api.
     * @param options The options parameters.
     */
    beginPut(resourceGroup: string, integrationServiceEnvironmentName: string, apiName: string, integrationServiceEnvironmentManagedApi: IntegrationServiceEnvironmentManagedApi, options?: IntegrationServiceEnvironmentManagedApisPutOptionalParams): Promise<PollerLike<PollOperationState<IntegrationServiceEnvironmentManagedApisPutResponse>, IntegrationServiceEnvironmentManagedApisPutResponse>>;
    /**
     * Puts the integration service environment managed Api.
     * @param resourceGroup The resource group name.
     * @param integrationServiceEnvironmentName The integration service environment name.
     * @param apiName The api name.
     * @param integrationServiceEnvironmentManagedApi The integration service environment managed api.
     * @param options The options parameters.
     */
    beginPutAndWait(resourceGroup: string, integrationServiceEnvironmentName: string, apiName: string, integrationServiceEnvironmentManagedApi: IntegrationServiceEnvironmentManagedApi, options?: IntegrationServiceEnvironmentManagedApisPutOptionalParams): Promise<IntegrationServiceEnvironmentManagedApisPutResponse>;
    /**
     * Deletes the integration service environment managed Api.
     * @param resourceGroup The resource group.
     * @param integrationServiceEnvironmentName The integration service environment name.
     * @param apiName The api name.
     * @param options The options parameters.
     */
    beginDelete(resourceGroup: string, integrationServiceEnvironmentName: string, apiName: string, options?: IntegrationServiceEnvironmentManagedApisDeleteOptionalParams): Promise<PollerLike<PollOperationState<void>, void>>;
    /**
     * Deletes the integration service environment managed Api.
     * @param resourceGroup The resource group.
     * @param integrationServiceEnvironmentName The integration service environment name.
     * @param apiName The api name.
     * @param options The options parameters.
     */
    beginDeleteAndWait(resourceGroup: string, integrationServiceEnvironmentName: string, apiName: string, options?: IntegrationServiceEnvironmentManagedApisDeleteOptionalParams): Promise<void>;
    /**
     * ListNext
     * @param resourceGroup The resource group.
     * @param integrationServiceEnvironmentName The integration service environment name.
     * @param nextLink The nextLink from the previous successful call to the List method.
     * @param options The options parameters.
     */
    private _listNext;
}
//# sourceMappingURL=integrationServiceEnvironmentManagedApis.d.ts.map