import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { VirtualHubIpConfiguration } from "../operationsInterfaces/index.js";
import { NetworkManagementClient } from "../networkManagementClient.js";
import { SimplePollerLike, OperationState } from "@azure/core-lro";
import { HubIpConfiguration, VirtualHubIpConfigurationListOptionalParams, VirtualHubIpConfigurationGetOptionalParams, VirtualHubIpConfigurationGetResponse, VirtualHubIpConfigurationCreateOrUpdateOptionalParams, VirtualHubIpConfigurationCreateOrUpdateResponse, VirtualHubIpConfigurationDeleteOptionalParams } from "../models/index.js";
/** Class containing VirtualHubIpConfiguration operations. */
export declare class VirtualHubIpConfigurationImpl implements VirtualHubIpConfiguration {
    private readonly client;
    /**
     * Initialize a new instance of the class VirtualHubIpConfiguration class.
     * @param client Reference to the service client
     */
    constructor(client: NetworkManagementClient);
    /**
     * Retrieves the details of all VirtualHubIpConfigurations.
     * @param resourceGroupName The resource group name of the VirtualHub.
     * @param virtualHubName The name of the VirtualHub.
     * @param options The options parameters.
     */
    list(resourceGroupName: string, virtualHubName: string, options?: VirtualHubIpConfigurationListOptionalParams): PagedAsyncIterableIterator<HubIpConfiguration>;
    private listPagingPage;
    private listPagingAll;
    /**
     * Retrieves the details of a Virtual Hub Ip configuration.
     * @param resourceGroupName The resource group name of the VirtualHub.
     * @param virtualHubName The name of the VirtualHub.
     * @param ipConfigName The name of the ipconfig.
     * @param options The options parameters.
     */
    get(resourceGroupName: string, virtualHubName: string, ipConfigName: string, options?: VirtualHubIpConfigurationGetOptionalParams): Promise<VirtualHubIpConfigurationGetResponse>;
    /**
     * Creates a VirtualHubIpConfiguration resource if it doesn't exist else updates the existing
     * VirtualHubIpConfiguration.
     * @param resourceGroupName The resource group name of the VirtualHub.
     * @param virtualHubName The name of the VirtualHub.
     * @param ipConfigName The name of the ipconfig.
     * @param parameters Hub Ip Configuration parameters.
     * @param options The options parameters.
     */
    beginCreateOrUpdate(resourceGroupName: string, virtualHubName: string, ipConfigName: string, parameters: HubIpConfiguration, options?: VirtualHubIpConfigurationCreateOrUpdateOptionalParams): Promise<SimplePollerLike<OperationState<VirtualHubIpConfigurationCreateOrUpdateResponse>, VirtualHubIpConfigurationCreateOrUpdateResponse>>;
    /**
     * Creates a VirtualHubIpConfiguration resource if it doesn't exist else updates the existing
     * VirtualHubIpConfiguration.
     * @param resourceGroupName The resource group name of the VirtualHub.
     * @param virtualHubName The name of the VirtualHub.
     * @param ipConfigName The name of the ipconfig.
     * @param parameters Hub Ip Configuration parameters.
     * @param options The options parameters.
     */
    beginCreateOrUpdateAndWait(resourceGroupName: string, virtualHubName: string, ipConfigName: string, parameters: HubIpConfiguration, options?: VirtualHubIpConfigurationCreateOrUpdateOptionalParams): Promise<VirtualHubIpConfigurationCreateOrUpdateResponse>;
    /**
     * Deletes a VirtualHubIpConfiguration.
     * @param resourceGroupName The resource group name of the VirtualHubBgpConnection.
     * @param virtualHubName The name of the VirtualHub.
     * @param ipConfigName The name of the ipconfig.
     * @param options The options parameters.
     */
    beginDelete(resourceGroupName: string, virtualHubName: string, ipConfigName: string, options?: VirtualHubIpConfigurationDeleteOptionalParams): Promise<SimplePollerLike<OperationState<void>, void>>;
    /**
     * Deletes a VirtualHubIpConfiguration.
     * @param resourceGroupName The resource group name of the VirtualHubBgpConnection.
     * @param virtualHubName The name of the VirtualHub.
     * @param ipConfigName The name of the ipconfig.
     * @param options The options parameters.
     */
    beginDeleteAndWait(resourceGroupName: string, virtualHubName: string, ipConfigName: string, options?: VirtualHubIpConfigurationDeleteOptionalParams): Promise<void>;
    /**
     * Retrieves the details of all VirtualHubIpConfigurations.
     * @param resourceGroupName The resource group name of the VirtualHub.
     * @param virtualHubName The name of the VirtualHub.
     * @param options The options parameters.
     */
    private _list;
    /**
     * ListNext
     * @param resourceGroupName The resource group name of the VirtualHub.
     * @param virtualHubName The name of the VirtualHub.
     * @param nextLink The nextLink from the previous successful call to the List method.
     * @param options The options parameters.
     */
    private _listNext;
}
//# sourceMappingURL=virtualHubIpConfiguration.d.ts.map