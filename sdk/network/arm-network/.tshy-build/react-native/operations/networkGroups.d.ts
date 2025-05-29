import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { NetworkGroups } from "../operationsInterfaces/index.js";
import { NetworkManagementClient } from "../networkManagementClient.js";
import { SimplePollerLike, OperationState } from "@azure/core-lro";
import { NetworkGroup, NetworkGroupsListOptionalParams, NetworkGroupsGetOptionalParams, NetworkGroupsGetResponse, NetworkGroupsCreateOrUpdateOptionalParams, NetworkGroupsCreateOrUpdateResponse, NetworkGroupsDeleteOptionalParams } from "../models/index.js";
/** Class containing NetworkGroups operations. */
export declare class NetworkGroupsImpl implements NetworkGroups {
    private readonly client;
    /**
     * Initialize a new instance of the class NetworkGroups class.
     * @param client Reference to the service client
     */
    constructor(client: NetworkManagementClient);
    /**
     * Lists the specified network group.
     * @param resourceGroupName The name of the resource group.
     * @param networkManagerName The name of the network manager.
     * @param options The options parameters.
     */
    list(resourceGroupName: string, networkManagerName: string, options?: NetworkGroupsListOptionalParams): PagedAsyncIterableIterator<NetworkGroup>;
    private listPagingPage;
    private listPagingAll;
    /**
     * Gets the specified network group.
     * @param resourceGroupName The name of the resource group.
     * @param networkManagerName The name of the network manager.
     * @param networkGroupName The name of the network group.
     * @param options The options parameters.
     */
    get(resourceGroupName: string, networkManagerName: string, networkGroupName: string, options?: NetworkGroupsGetOptionalParams): Promise<NetworkGroupsGetResponse>;
    /**
     * Creates or updates a network group.
     * @param resourceGroupName The name of the resource group.
     * @param networkManagerName The name of the network manager.
     * @param networkGroupName The name of the network group.
     * @param parameters Parameters supplied to the specify which network group need to create
     * @param options The options parameters.
     */
    createOrUpdate(resourceGroupName: string, networkManagerName: string, networkGroupName: string, parameters: NetworkGroup, options?: NetworkGroupsCreateOrUpdateOptionalParams): Promise<NetworkGroupsCreateOrUpdateResponse>;
    /**
     * Deletes a network group.
     * @param resourceGroupName The name of the resource group.
     * @param networkManagerName The name of the network manager.
     * @param networkGroupName The name of the network group.
     * @param options The options parameters.
     */
    beginDelete(resourceGroupName: string, networkManagerName: string, networkGroupName: string, options?: NetworkGroupsDeleteOptionalParams): Promise<SimplePollerLike<OperationState<void>, void>>;
    /**
     * Deletes a network group.
     * @param resourceGroupName The name of the resource group.
     * @param networkManagerName The name of the network manager.
     * @param networkGroupName The name of the network group.
     * @param options The options parameters.
     */
    beginDeleteAndWait(resourceGroupName: string, networkManagerName: string, networkGroupName: string, options?: NetworkGroupsDeleteOptionalParams): Promise<void>;
    /**
     * Lists the specified network group.
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
//# sourceMappingURL=networkGroups.d.ts.map