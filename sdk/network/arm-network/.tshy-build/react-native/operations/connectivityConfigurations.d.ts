import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { ConnectivityConfigurations } from "../operationsInterfaces/index.js";
import { NetworkManagementClient } from "../networkManagementClient.js";
import { SimplePollerLike, OperationState } from "@azure/core-lro";
import { ConnectivityConfiguration, ConnectivityConfigurationsListOptionalParams, ConnectivityConfigurationsGetOptionalParams, ConnectivityConfigurationsGetResponse, ConnectivityConfigurationsCreateOrUpdateOptionalParams, ConnectivityConfigurationsCreateOrUpdateResponse, ConnectivityConfigurationsDeleteOptionalParams } from "../models/index.js";
/** Class containing ConnectivityConfigurations operations. */
export declare class ConnectivityConfigurationsImpl implements ConnectivityConfigurations {
    private readonly client;
    /**
     * Initialize a new instance of the class ConnectivityConfigurations class.
     * @param client Reference to the service client
     */
    constructor(client: NetworkManagementClient);
    /**
     * Lists all the network manager connectivity configuration in a specified network manager.
     * @param resourceGroupName The name of the resource group.
     * @param networkManagerName The name of the network manager.
     * @param options The options parameters.
     */
    list(resourceGroupName: string, networkManagerName: string, options?: ConnectivityConfigurationsListOptionalParams): PagedAsyncIterableIterator<ConnectivityConfiguration>;
    private listPagingPage;
    private listPagingAll;
    /**
     * Gets a Network Connectivity Configuration, specified by the resource group, network manager name,
     * and connectivity Configuration name
     * @param resourceGroupName The name of the resource group.
     * @param networkManagerName The name of the network manager.
     * @param configurationName The name of the network manager connectivity configuration.
     * @param options The options parameters.
     */
    get(resourceGroupName: string, networkManagerName: string, configurationName: string, options?: ConnectivityConfigurationsGetOptionalParams): Promise<ConnectivityConfigurationsGetResponse>;
    /**
     * Creates/Updates a new network manager connectivity configuration
     * @param resourceGroupName The name of the resource group.
     * @param networkManagerName The name of the network manager.
     * @param configurationName The name of the network manager connectivity configuration.
     * @param connectivityConfiguration Parameters supplied to create/update a network manager connectivity
     *                                  configuration
     * @param options The options parameters.
     */
    createOrUpdate(resourceGroupName: string, networkManagerName: string, configurationName: string, connectivityConfiguration: ConnectivityConfiguration, options?: ConnectivityConfigurationsCreateOrUpdateOptionalParams): Promise<ConnectivityConfigurationsCreateOrUpdateResponse>;
    /**
     * Deletes a network manager connectivity configuration, specified by the resource group, network
     * manager name, and connectivity configuration name
     * @param resourceGroupName The name of the resource group.
     * @param networkManagerName The name of the network manager.
     * @param configurationName The name of the network manager connectivity configuration.
     * @param options The options parameters.
     */
    beginDelete(resourceGroupName: string, networkManagerName: string, configurationName: string, options?: ConnectivityConfigurationsDeleteOptionalParams): Promise<SimplePollerLike<OperationState<void>, void>>;
    /**
     * Deletes a network manager connectivity configuration, specified by the resource group, network
     * manager name, and connectivity configuration name
     * @param resourceGroupName The name of the resource group.
     * @param networkManagerName The name of the network manager.
     * @param configurationName The name of the network manager connectivity configuration.
     * @param options The options parameters.
     */
    beginDeleteAndWait(resourceGroupName: string, networkManagerName: string, configurationName: string, options?: ConnectivityConfigurationsDeleteOptionalParams): Promise<void>;
    /**
     * Lists all the network manager connectivity configuration in a specified network manager.
     * @param resourceGroupName The name of the resource group.
     * @param networkManagerName The name of the network manager.
     * @param options The options parameters.
     */
    private _list;
    /**
     * ListNext
     * @param resourceGroupName The name of the resource group.
     * @param networkManagerName The name of the network manager.
     * @param nextLink The nextLink from the previous successful call to the List method.
     * @param options The options parameters.
     */
    private _listNext;
}
//# sourceMappingURL=connectivityConfigurations.d.ts.map