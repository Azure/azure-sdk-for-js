import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { SubscriptionNetworkManagerConnections } from "../operationsInterfaces/index.js";
import { NetworkManagementClient } from "../networkManagementClient.js";
import { NetworkManagerConnection, SubscriptionNetworkManagerConnectionsListOptionalParams, SubscriptionNetworkManagerConnectionsCreateOrUpdateOptionalParams, SubscriptionNetworkManagerConnectionsCreateOrUpdateResponse, SubscriptionNetworkManagerConnectionsGetOptionalParams, SubscriptionNetworkManagerConnectionsGetResponse, SubscriptionNetworkManagerConnectionsDeleteOptionalParams } from "../models/index.js";
/** Class containing SubscriptionNetworkManagerConnections operations. */
export declare class SubscriptionNetworkManagerConnectionsImpl implements SubscriptionNetworkManagerConnections {
    private readonly client;
    /**
     * Initialize a new instance of the class SubscriptionNetworkManagerConnections class.
     * @param client Reference to the service client
     */
    constructor(client: NetworkManagementClient);
    /**
     * List all network manager connections created by this subscription.
     * @param options The options parameters.
     */
    list(options?: SubscriptionNetworkManagerConnectionsListOptionalParams): PagedAsyncIterableIterator<NetworkManagerConnection>;
    private listPagingPage;
    private listPagingAll;
    /**
     * Create a network manager connection on this subscription.
     * @param networkManagerConnectionName Name for the network manager connection.
     * @param parameters Network manager connection to be created/updated.
     * @param options The options parameters.
     */
    createOrUpdate(networkManagerConnectionName: string, parameters: NetworkManagerConnection, options?: SubscriptionNetworkManagerConnectionsCreateOrUpdateOptionalParams): Promise<SubscriptionNetworkManagerConnectionsCreateOrUpdateResponse>;
    /**
     * Get a specified connection created by this subscription.
     * @param networkManagerConnectionName Name for the network manager connection.
     * @param options The options parameters.
     */
    get(networkManagerConnectionName: string, options?: SubscriptionNetworkManagerConnectionsGetOptionalParams): Promise<SubscriptionNetworkManagerConnectionsGetResponse>;
    /**
     * Delete specified connection created by this subscription.
     * @param networkManagerConnectionName Name for the network manager connection.
     * @param options The options parameters.
     */
    delete(networkManagerConnectionName: string, options?: SubscriptionNetworkManagerConnectionsDeleteOptionalParams): Promise<void>;
    /**
     * List all network manager connections created by this subscription.
     * @param options The options parameters.
     */
    private _list;
    /**
     * ListNext
     * @param nextLink The nextLink from the previous successful call to the List method.
     * @param options The options parameters.
     */
    private _listNext;
}
//# sourceMappingURL=subscriptionNetworkManagerConnections.d.ts.map