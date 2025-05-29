import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { NetworkInterfaceIPConfigurations } from "../operationsInterfaces/index.js";
import { NetworkManagementClient } from "../networkManagementClient.js";
import { NetworkInterfaceIPConfiguration, NetworkInterfaceIPConfigurationsListOptionalParams, NetworkInterfaceIPConfigurationsGetOptionalParams, NetworkInterfaceIPConfigurationsGetResponse } from "../models/index.js";
/** Class containing NetworkInterfaceIPConfigurations operations. */
export declare class NetworkInterfaceIPConfigurationsImpl implements NetworkInterfaceIPConfigurations {
    private readonly client;
    /**
     * Initialize a new instance of the class NetworkInterfaceIPConfigurations class.
     * @param client Reference to the service client
     */
    constructor(client: NetworkManagementClient);
    /**
     * Get all ip configurations in a network interface.
     * @param resourceGroupName The name of the resource group.
     * @param networkInterfaceName The name of the network interface.
     * @param options The options parameters.
     */
    list(resourceGroupName: string, networkInterfaceName: string, options?: NetworkInterfaceIPConfigurationsListOptionalParams): PagedAsyncIterableIterator<NetworkInterfaceIPConfiguration>;
    private listPagingPage;
    private listPagingAll;
    /**
     * Get all ip configurations in a network interface.
     * @param resourceGroupName The name of the resource group.
     * @param networkInterfaceName The name of the network interface.
     * @param options The options parameters.
     */
    private _list;
    /**
     * Gets the specified network interface ip configuration.
     * @param resourceGroupName The name of the resource group.
     * @param networkInterfaceName The name of the network interface.
     * @param ipConfigurationName The name of the ip configuration name.
     * @param options The options parameters.
     */
    get(resourceGroupName: string, networkInterfaceName: string, ipConfigurationName: string, options?: NetworkInterfaceIPConfigurationsGetOptionalParams): Promise<NetworkInterfaceIPConfigurationsGetResponse>;
    /**
     * ListNext
     * @param resourceGroupName The name of the resource group.
     * @param networkInterfaceName The name of the network interface.
     * @param nextLink The nextLink from the previous successful call to the List method.
     * @param options The options parameters.
     */
    private _listNext;
}
//# sourceMappingURL=networkInterfaceIPConfigurations.d.ts.map