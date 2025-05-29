import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { NetworkManagers } from "../operationsInterfaces/index.js";
import { NetworkManagementClient } from "../networkManagementClient.js";
import { SimplePollerLike, OperationState } from "@azure/core-lro";
import { NetworkManager, NetworkManagersListBySubscriptionOptionalParams, NetworkManagersListOptionalParams, NetworkManagersGetOptionalParams, NetworkManagersGetResponse, NetworkManagersCreateOrUpdateOptionalParams, NetworkManagersCreateOrUpdateResponse, NetworkManagersDeleteOptionalParams, PatchObject, NetworkManagersPatchOptionalParams, NetworkManagersPatchResponse } from "../models/index.js";
/** Class containing NetworkManagers operations. */
export declare class NetworkManagersImpl implements NetworkManagers {
    private readonly client;
    /**
     * Initialize a new instance of the class NetworkManagers class.
     * @param client Reference to the service client
     */
    constructor(client: NetworkManagementClient);
    /**
     * List all network managers in a subscription.
     * @param options The options parameters.
     */
    listBySubscription(options?: NetworkManagersListBySubscriptionOptionalParams): PagedAsyncIterableIterator<NetworkManager>;
    private listBySubscriptionPagingPage;
    private listBySubscriptionPagingAll;
    /**
     * List network managers in a resource group.
     * @param resourceGroupName The name of the resource group.
     * @param options The options parameters.
     */
    list(resourceGroupName: string, options?: NetworkManagersListOptionalParams): PagedAsyncIterableIterator<NetworkManager>;
    private listPagingPage;
    private listPagingAll;
    /**
     * Gets the specified Network Manager.
     * @param resourceGroupName The name of the resource group.
     * @param networkManagerName The name of the network manager.
     * @param options The options parameters.
     */
    get(resourceGroupName: string, networkManagerName: string, options?: NetworkManagersGetOptionalParams): Promise<NetworkManagersGetResponse>;
    /**
     * Creates or updates a Network Manager.
     * @param resourceGroupName The name of the resource group.
     * @param networkManagerName The name of the network manager.
     * @param parameters Parameters supplied to specify which network manager is.
     * @param options The options parameters.
     */
    createOrUpdate(resourceGroupName: string, networkManagerName: string, parameters: NetworkManager, options?: NetworkManagersCreateOrUpdateOptionalParams): Promise<NetworkManagersCreateOrUpdateResponse>;
    /**
     * Deletes a network manager.
     * @param resourceGroupName The name of the resource group.
     * @param networkManagerName The name of the network manager.
     * @param options The options parameters.
     */
    beginDelete(resourceGroupName: string, networkManagerName: string, options?: NetworkManagersDeleteOptionalParams): Promise<SimplePollerLike<OperationState<void>, void>>;
    /**
     * Deletes a network manager.
     * @param resourceGroupName The name of the resource group.
     * @param networkManagerName The name of the network manager.
     * @param options The options parameters.
     */
    beginDeleteAndWait(resourceGroupName: string, networkManagerName: string, options?: NetworkManagersDeleteOptionalParams): Promise<void>;
    /**
     * Patch NetworkManager.
     * @param resourceGroupName The name of the resource group.
     * @param networkManagerName The name of the network manager.
     * @param parameters Parameters supplied to specify which network manager is.
     * @param options The options parameters.
     */
    patch(resourceGroupName: string, networkManagerName: string, parameters: PatchObject, options?: NetworkManagersPatchOptionalParams): Promise<NetworkManagersPatchResponse>;
    /**
     * List all network managers in a subscription.
     * @param options The options parameters.
     */
    private _listBySubscription;
    /**
     * List network managers in a resource group.
     * @param resourceGroupName The name of the resource group.
     * @param options The options parameters.
     */
    private _list;
    /**
     * ListBySubscriptionNext
     * @param nextLink The nextLink from the previous successful call to the ListBySubscription method.
     * @param options The options parameters.
     */
    private _listBySubscriptionNext;
    /**
     * ListNext
     * @param resourceGroupName The name of the resource group.
     * @param nextLink The nextLink from the previous successful call to the List method.
     * @param options The options parameters.
     */
    private _listNext;
}
//# sourceMappingURL=networkManagers.d.ts.map