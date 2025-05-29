import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { ConfigurationPolicyGroups } from "../operationsInterfaces/index.js";
import { NetworkManagementClient } from "../networkManagementClient.js";
import { SimplePollerLike, OperationState } from "@azure/core-lro";
import { VpnServerConfigurationPolicyGroup, ConfigurationPolicyGroupsListByVpnServerConfigurationOptionalParams, ConfigurationPolicyGroupsCreateOrUpdateOptionalParams, ConfigurationPolicyGroupsCreateOrUpdateResponse, ConfigurationPolicyGroupsDeleteOptionalParams, ConfigurationPolicyGroupsGetOptionalParams, ConfigurationPolicyGroupsGetResponse } from "../models/index.js";
/** Class containing ConfigurationPolicyGroups operations. */
export declare class ConfigurationPolicyGroupsImpl implements ConfigurationPolicyGroups {
    private readonly client;
    /**
     * Initialize a new instance of the class ConfigurationPolicyGroups class.
     * @param client Reference to the service client
     */
    constructor(client: NetworkManagementClient);
    /**
     * Lists all the configurationPolicyGroups in a resource group for a vpnServerConfiguration.
     * @param resourceGroupName The resource group name of the VpnServerConfiguration.
     * @param vpnServerConfigurationName The name of the VpnServerConfiguration.
     * @param options The options parameters.
     */
    listByVpnServerConfiguration(resourceGroupName: string, vpnServerConfigurationName: string, options?: ConfigurationPolicyGroupsListByVpnServerConfigurationOptionalParams): PagedAsyncIterableIterator<VpnServerConfigurationPolicyGroup>;
    private listByVpnServerConfigurationPagingPage;
    private listByVpnServerConfigurationPagingAll;
    /**
     * Creates a ConfigurationPolicyGroup if it doesn't exist else updates the existing one.
     * @param resourceGroupName The resource group name of the ConfigurationPolicyGroup.
     * @param vpnServerConfigurationName The name of the VpnServerConfiguration.
     * @param configurationPolicyGroupName The name of the ConfigurationPolicyGroup.
     * @param vpnServerConfigurationPolicyGroupParameters Parameters supplied to create or update a
     *                                                    VpnServerConfiguration PolicyGroup.
     * @param options The options parameters.
     */
    beginCreateOrUpdate(resourceGroupName: string, vpnServerConfigurationName: string, configurationPolicyGroupName: string, vpnServerConfigurationPolicyGroupParameters: VpnServerConfigurationPolicyGroup, options?: ConfigurationPolicyGroupsCreateOrUpdateOptionalParams): Promise<SimplePollerLike<OperationState<ConfigurationPolicyGroupsCreateOrUpdateResponse>, ConfigurationPolicyGroupsCreateOrUpdateResponse>>;
    /**
     * Creates a ConfigurationPolicyGroup if it doesn't exist else updates the existing one.
     * @param resourceGroupName The resource group name of the ConfigurationPolicyGroup.
     * @param vpnServerConfigurationName The name of the VpnServerConfiguration.
     * @param configurationPolicyGroupName The name of the ConfigurationPolicyGroup.
     * @param vpnServerConfigurationPolicyGroupParameters Parameters supplied to create or update a
     *                                                    VpnServerConfiguration PolicyGroup.
     * @param options The options parameters.
     */
    beginCreateOrUpdateAndWait(resourceGroupName: string, vpnServerConfigurationName: string, configurationPolicyGroupName: string, vpnServerConfigurationPolicyGroupParameters: VpnServerConfigurationPolicyGroup, options?: ConfigurationPolicyGroupsCreateOrUpdateOptionalParams): Promise<ConfigurationPolicyGroupsCreateOrUpdateResponse>;
    /**
     * Deletes a ConfigurationPolicyGroup.
     * @param resourceGroupName The resource group name of the ConfigurationPolicyGroup.
     * @param vpnServerConfigurationName The name of the VpnServerConfiguration.
     * @param configurationPolicyGroupName The name of the ConfigurationPolicyGroup.
     * @param options The options parameters.
     */
    beginDelete(resourceGroupName: string, vpnServerConfigurationName: string, configurationPolicyGroupName: string, options?: ConfigurationPolicyGroupsDeleteOptionalParams): Promise<SimplePollerLike<OperationState<void>, void>>;
    /**
     * Deletes a ConfigurationPolicyGroup.
     * @param resourceGroupName The resource group name of the ConfigurationPolicyGroup.
     * @param vpnServerConfigurationName The name of the VpnServerConfiguration.
     * @param configurationPolicyGroupName The name of the ConfigurationPolicyGroup.
     * @param options The options parameters.
     */
    beginDeleteAndWait(resourceGroupName: string, vpnServerConfigurationName: string, configurationPolicyGroupName: string, options?: ConfigurationPolicyGroupsDeleteOptionalParams): Promise<void>;
    /**
     * Retrieves the details of a ConfigurationPolicyGroup.
     * @param resourceGroupName The resource group name of the VpnServerConfiguration.
     * @param vpnServerConfigurationName The name of the VpnServerConfiguration.
     * @param configurationPolicyGroupName The name of the ConfigurationPolicyGroup being retrieved.
     * @param options The options parameters.
     */
    get(resourceGroupName: string, vpnServerConfigurationName: string, configurationPolicyGroupName: string, options?: ConfigurationPolicyGroupsGetOptionalParams): Promise<ConfigurationPolicyGroupsGetResponse>;
    /**
     * Lists all the configurationPolicyGroups in a resource group for a vpnServerConfiguration.
     * @param resourceGroupName The resource group name of the VpnServerConfiguration.
     * @param vpnServerConfigurationName The name of the VpnServerConfiguration.
     * @param options The options parameters.
     */
    private _listByVpnServerConfiguration;
    /**
     * ListByVpnServerConfigurationNext
     * @param resourceGroupName The resource group name of the VpnServerConfiguration.
     * @param vpnServerConfigurationName The name of the VpnServerConfiguration.
     * @param nextLink The nextLink from the previous successful call to the ListByVpnServerConfiguration
     *                 method.
     * @param options The options parameters.
     */
    private _listByVpnServerConfigurationNext;
}
//# sourceMappingURL=configurationPolicyGroups.d.ts.map