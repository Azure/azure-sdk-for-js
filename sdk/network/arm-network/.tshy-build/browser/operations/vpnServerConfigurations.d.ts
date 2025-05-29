import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { VpnServerConfigurations } from "../operationsInterfaces/index.js";
import { NetworkManagementClient } from "../networkManagementClient.js";
import { SimplePollerLike, OperationState } from "@azure/core-lro";
import { VpnServerConfiguration, VpnServerConfigurationsListByResourceGroupOptionalParams, VpnServerConfigurationsListOptionalParams, VpnServerConfigurationsGetOptionalParams, VpnServerConfigurationsGetResponse, VpnServerConfigurationsCreateOrUpdateOptionalParams, VpnServerConfigurationsCreateOrUpdateResponse, TagsObject, VpnServerConfigurationsUpdateTagsOptionalParams, VpnServerConfigurationsUpdateTagsResponse, VpnServerConfigurationsDeleteOptionalParams } from "../models/index.js";
/** Class containing VpnServerConfigurations operations. */
export declare class VpnServerConfigurationsImpl implements VpnServerConfigurations {
    private readonly client;
    /**
     * Initialize a new instance of the class VpnServerConfigurations class.
     * @param client Reference to the service client
     */
    constructor(client: NetworkManagementClient);
    /**
     * Lists all the vpnServerConfigurations in a resource group.
     * @param resourceGroupName The resource group name of the VpnServerConfiguration.
     * @param options The options parameters.
     */
    listByResourceGroup(resourceGroupName: string, options?: VpnServerConfigurationsListByResourceGroupOptionalParams): PagedAsyncIterableIterator<VpnServerConfiguration>;
    private listByResourceGroupPagingPage;
    private listByResourceGroupPagingAll;
    /**
     * Lists all the VpnServerConfigurations in a subscription.
     * @param options The options parameters.
     */
    list(options?: VpnServerConfigurationsListOptionalParams): PagedAsyncIterableIterator<VpnServerConfiguration>;
    private listPagingPage;
    private listPagingAll;
    /**
     * Retrieves the details of a VpnServerConfiguration.
     * @param resourceGroupName The resource group name of the VpnServerConfiguration.
     * @param vpnServerConfigurationName The name of the VpnServerConfiguration being retrieved.
     * @param options The options parameters.
     */
    get(resourceGroupName: string, vpnServerConfigurationName: string, options?: VpnServerConfigurationsGetOptionalParams): Promise<VpnServerConfigurationsGetResponse>;
    /**
     * Creates a VpnServerConfiguration resource if it doesn't exist else updates the existing
     * VpnServerConfiguration.
     * @param resourceGroupName The resource group name of the VpnServerConfiguration.
     * @param vpnServerConfigurationName The name of the VpnServerConfiguration being created or updated.
     * @param vpnServerConfigurationParameters Parameters supplied to create or update
     *                                         VpnServerConfiguration.
     * @param options The options parameters.
     */
    beginCreateOrUpdate(resourceGroupName: string, vpnServerConfigurationName: string, vpnServerConfigurationParameters: VpnServerConfiguration, options?: VpnServerConfigurationsCreateOrUpdateOptionalParams): Promise<SimplePollerLike<OperationState<VpnServerConfigurationsCreateOrUpdateResponse>, VpnServerConfigurationsCreateOrUpdateResponse>>;
    /**
     * Creates a VpnServerConfiguration resource if it doesn't exist else updates the existing
     * VpnServerConfiguration.
     * @param resourceGroupName The resource group name of the VpnServerConfiguration.
     * @param vpnServerConfigurationName The name of the VpnServerConfiguration being created or updated.
     * @param vpnServerConfigurationParameters Parameters supplied to create or update
     *                                         VpnServerConfiguration.
     * @param options The options parameters.
     */
    beginCreateOrUpdateAndWait(resourceGroupName: string, vpnServerConfigurationName: string, vpnServerConfigurationParameters: VpnServerConfiguration, options?: VpnServerConfigurationsCreateOrUpdateOptionalParams): Promise<VpnServerConfigurationsCreateOrUpdateResponse>;
    /**
     * Updates VpnServerConfiguration tags.
     * @param resourceGroupName The resource group name of the VpnServerConfiguration.
     * @param vpnServerConfigurationName The name of the VpnServerConfiguration being updated.
     * @param vpnServerConfigurationParameters Parameters supplied to update VpnServerConfiguration tags.
     * @param options The options parameters.
     */
    updateTags(resourceGroupName: string, vpnServerConfigurationName: string, vpnServerConfigurationParameters: TagsObject, options?: VpnServerConfigurationsUpdateTagsOptionalParams): Promise<VpnServerConfigurationsUpdateTagsResponse>;
    /**
     * Deletes a VpnServerConfiguration.
     * @param resourceGroupName The resource group name of the VpnServerConfiguration.
     * @param vpnServerConfigurationName The name of the VpnServerConfiguration being deleted.
     * @param options The options parameters.
     */
    beginDelete(resourceGroupName: string, vpnServerConfigurationName: string, options?: VpnServerConfigurationsDeleteOptionalParams): Promise<SimplePollerLike<OperationState<void>, void>>;
    /**
     * Deletes a VpnServerConfiguration.
     * @param resourceGroupName The resource group name of the VpnServerConfiguration.
     * @param vpnServerConfigurationName The name of the VpnServerConfiguration being deleted.
     * @param options The options parameters.
     */
    beginDeleteAndWait(resourceGroupName: string, vpnServerConfigurationName: string, options?: VpnServerConfigurationsDeleteOptionalParams): Promise<void>;
    /**
     * Lists all the vpnServerConfigurations in a resource group.
     * @param resourceGroupName The resource group name of the VpnServerConfiguration.
     * @param options The options parameters.
     */
    private _listByResourceGroup;
    /**
     * Lists all the VpnServerConfigurations in a subscription.
     * @param options The options parameters.
     */
    private _list;
    /**
     * ListByResourceGroupNext
     * @param resourceGroupName The resource group name of the VpnServerConfiguration.
     * @param nextLink The nextLink from the previous successful call to the ListByResourceGroup method.
     * @param options The options parameters.
     */
    private _listByResourceGroupNext;
    /**
     * ListNext
     * @param nextLink The nextLink from the previous successful call to the List method.
     * @param options The options parameters.
     */
    private _listNext;
}
//# sourceMappingURL=vpnServerConfigurations.d.ts.map