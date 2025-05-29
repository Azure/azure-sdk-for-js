import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { NetworkManagerRoutingConfigurations } from "../operationsInterfaces/index.js";
import { NetworkManagementClient } from "../networkManagementClient.js";
import { SimplePollerLike, OperationState } from "@azure/core-lro";
import { NetworkManagerRoutingConfiguration, NetworkManagerRoutingConfigurationsListOptionalParams, NetworkManagerRoutingConfigurationsGetOptionalParams, NetworkManagerRoutingConfigurationsGetResponse, NetworkManagerRoutingConfigurationsCreateOrUpdateOptionalParams, NetworkManagerRoutingConfigurationsCreateOrUpdateResponse, NetworkManagerRoutingConfigurationsDeleteOptionalParams } from "../models/index.js";
/** Class containing NetworkManagerRoutingConfigurations operations. */
export declare class NetworkManagerRoutingConfigurationsImpl implements NetworkManagerRoutingConfigurations {
    private readonly client;
    /**
     * Initialize a new instance of the class NetworkManagerRoutingConfigurations class.
     * @param client Reference to the service client
     */
    constructor(client: NetworkManagementClient);
    /**
     * Lists all the network manager routing configurations in a network manager, in a paginated format.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param networkManagerName The name of the network manager.
     * @param options The options parameters.
     */
    list(resourceGroupName: string, networkManagerName: string, options?: NetworkManagerRoutingConfigurationsListOptionalParams): PagedAsyncIterableIterator<NetworkManagerRoutingConfiguration>;
    private listPagingPage;
    private listPagingAll;
    /**
     * Lists all the network manager routing configurations in a network manager, in a paginated format.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param networkManagerName The name of the network manager.
     * @param options The options parameters.
     */
    private _list;
    /**
     * Retrieves a network manager routing configuration.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param networkManagerName The name of the network manager.
     * @param configurationName The name of the network manager Routing Configuration.
     * @param options The options parameters.
     */
    get(resourceGroupName: string, networkManagerName: string, configurationName: string, options?: NetworkManagerRoutingConfigurationsGetOptionalParams): Promise<NetworkManagerRoutingConfigurationsGetResponse>;
    /**
     * Creates or updates a network manager routing configuration.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param networkManagerName The name of the network manager.
     * @param configurationName The name of the network manager Routing Configuration.
     * @param routingConfiguration The routing configuration to create or update
     * @param options The options parameters.
     */
    createOrUpdate(resourceGroupName: string, networkManagerName: string, configurationName: string, routingConfiguration: NetworkManagerRoutingConfiguration, options?: NetworkManagerRoutingConfigurationsCreateOrUpdateOptionalParams): Promise<NetworkManagerRoutingConfigurationsCreateOrUpdateResponse>;
    /**
     * Deletes a network manager routing configuration.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param networkManagerName The name of the network manager.
     * @param configurationName The name of the network manager Routing Configuration.
     * @param options The options parameters.
     */
    beginDelete(resourceGroupName: string, networkManagerName: string, configurationName: string, options?: NetworkManagerRoutingConfigurationsDeleteOptionalParams): Promise<SimplePollerLike<OperationState<void>, void>>;
    /**
     * Deletes a network manager routing configuration.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param networkManagerName The name of the network manager.
     * @param configurationName The name of the network manager Routing Configuration.
     * @param options The options parameters.
     */
    beginDeleteAndWait(resourceGroupName: string, networkManagerName: string, configurationName: string, options?: NetworkManagerRoutingConfigurationsDeleteOptionalParams): Promise<void>;
    /**
     * ListNext
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param networkManagerName The name of the network manager.
     * @param nextLink The nextLink from the previous successful call to the List method.
     * @param options The options parameters.
     */
    private _listNext;
}
//# sourceMappingURL=networkManagerRoutingConfigurations.d.ts.map