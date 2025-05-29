import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { NetworkInterfaceTapConfigurations } from "../operationsInterfaces/index.js";
import { NetworkManagementClient } from "../networkManagementClient.js";
import { SimplePollerLike, OperationState } from "@azure/core-lro";
import { NetworkInterfaceTapConfiguration, NetworkInterfaceTapConfigurationsListOptionalParams, NetworkInterfaceTapConfigurationsDeleteOptionalParams, NetworkInterfaceTapConfigurationsGetOptionalParams, NetworkInterfaceTapConfigurationsGetResponse, NetworkInterfaceTapConfigurationsCreateOrUpdateOptionalParams, NetworkInterfaceTapConfigurationsCreateOrUpdateResponse } from "../models/index.js";
/** Class containing NetworkInterfaceTapConfigurations operations. */
export declare class NetworkInterfaceTapConfigurationsImpl implements NetworkInterfaceTapConfigurations {
    private readonly client;
    /**
     * Initialize a new instance of the class NetworkInterfaceTapConfigurations class.
     * @param client Reference to the service client
     */
    constructor(client: NetworkManagementClient);
    /**
     * Get all Tap configurations in a network interface.
     * @param resourceGroupName The name of the resource group.
     * @param networkInterfaceName The name of the network interface.
     * @param options The options parameters.
     */
    list(resourceGroupName: string, networkInterfaceName: string, options?: NetworkInterfaceTapConfigurationsListOptionalParams): PagedAsyncIterableIterator<NetworkInterfaceTapConfiguration>;
    private listPagingPage;
    private listPagingAll;
    /**
     * Deletes the specified tap configuration from the NetworkInterface.
     * @param resourceGroupName The name of the resource group.
     * @param networkInterfaceName The name of the network interface.
     * @param tapConfigurationName The name of the tap configuration.
     * @param options The options parameters.
     */
    beginDelete(resourceGroupName: string, networkInterfaceName: string, tapConfigurationName: string, options?: NetworkInterfaceTapConfigurationsDeleteOptionalParams): Promise<SimplePollerLike<OperationState<void>, void>>;
    /**
     * Deletes the specified tap configuration from the NetworkInterface.
     * @param resourceGroupName The name of the resource group.
     * @param networkInterfaceName The name of the network interface.
     * @param tapConfigurationName The name of the tap configuration.
     * @param options The options parameters.
     */
    beginDeleteAndWait(resourceGroupName: string, networkInterfaceName: string, tapConfigurationName: string, options?: NetworkInterfaceTapConfigurationsDeleteOptionalParams): Promise<void>;
    /**
     * Get the specified tap configuration on a network interface.
     * @param resourceGroupName The name of the resource group.
     * @param networkInterfaceName The name of the network interface.
     * @param tapConfigurationName The name of the tap configuration.
     * @param options The options parameters.
     */
    get(resourceGroupName: string, networkInterfaceName: string, tapConfigurationName: string, options?: NetworkInterfaceTapConfigurationsGetOptionalParams): Promise<NetworkInterfaceTapConfigurationsGetResponse>;
    /**
     * Creates or updates a Tap configuration in the specified NetworkInterface.
     * @param resourceGroupName The name of the resource group.
     * @param networkInterfaceName The name of the network interface.
     * @param tapConfigurationName The name of the tap configuration.
     * @param tapConfigurationParameters Parameters supplied to the create or update tap configuration
     *                                   operation.
     * @param options The options parameters.
     */
    beginCreateOrUpdate(resourceGroupName: string, networkInterfaceName: string, tapConfigurationName: string, tapConfigurationParameters: NetworkInterfaceTapConfiguration, options?: NetworkInterfaceTapConfigurationsCreateOrUpdateOptionalParams): Promise<SimplePollerLike<OperationState<NetworkInterfaceTapConfigurationsCreateOrUpdateResponse>, NetworkInterfaceTapConfigurationsCreateOrUpdateResponse>>;
    /**
     * Creates or updates a Tap configuration in the specified NetworkInterface.
     * @param resourceGroupName The name of the resource group.
     * @param networkInterfaceName The name of the network interface.
     * @param tapConfigurationName The name of the tap configuration.
     * @param tapConfigurationParameters Parameters supplied to the create or update tap configuration
     *                                   operation.
     * @param options The options parameters.
     */
    beginCreateOrUpdateAndWait(resourceGroupName: string, networkInterfaceName: string, tapConfigurationName: string, tapConfigurationParameters: NetworkInterfaceTapConfiguration, options?: NetworkInterfaceTapConfigurationsCreateOrUpdateOptionalParams): Promise<NetworkInterfaceTapConfigurationsCreateOrUpdateResponse>;
    /**
     * Get all Tap configurations in a network interface.
     * @param resourceGroupName The name of the resource group.
     * @param networkInterfaceName The name of the network interface.
     * @param options The options parameters.
     */
    private _list;
    /**
     * ListNext
     * @param resourceGroupName The name of the resource group.
     * @param networkInterfaceName The name of the network interface.
     * @param nextLink The nextLink from the previous successful call to the List method.
     * @param options The options parameters.
     */
    private _listNext;
}
//# sourceMappingURL=networkInterfaceTapConfigurations.d.ts.map