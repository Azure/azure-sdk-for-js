import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { LocalNetworkGateways } from "../operationsInterfaces/index.js";
import { NetworkManagementClient } from "../networkManagementClient.js";
import { SimplePollerLike, OperationState } from "@azure/core-lro";
import { LocalNetworkGateway, LocalNetworkGatewaysListOptionalParams, LocalNetworkGatewaysCreateOrUpdateOptionalParams, LocalNetworkGatewaysCreateOrUpdateResponse, LocalNetworkGatewaysGetOptionalParams, LocalNetworkGatewaysGetResponse, LocalNetworkGatewaysDeleteOptionalParams, TagsObject, LocalNetworkGatewaysUpdateTagsOptionalParams, LocalNetworkGatewaysUpdateTagsResponse } from "../models/index.js";
/** Class containing LocalNetworkGateways operations. */
export declare class LocalNetworkGatewaysImpl implements LocalNetworkGateways {
    private readonly client;
    /**
     * Initialize a new instance of the class LocalNetworkGateways class.
     * @param client Reference to the service client
     */
    constructor(client: NetworkManagementClient);
    /**
     * Gets all the local network gateways in a resource group.
     * @param resourceGroupName The name of the resource group.
     * @param options The options parameters.
     */
    list(resourceGroupName: string, options?: LocalNetworkGatewaysListOptionalParams): PagedAsyncIterableIterator<LocalNetworkGateway>;
    private listPagingPage;
    private listPagingAll;
    /**
     * Creates or updates a local network gateway in the specified resource group.
     * @param resourceGroupName The name of the resource group.
     * @param localNetworkGatewayName The name of the local network gateway.
     * @param parameters Parameters supplied to the create or update local network gateway operation.
     * @param options The options parameters.
     */
    beginCreateOrUpdate(resourceGroupName: string, localNetworkGatewayName: string, parameters: LocalNetworkGateway, options?: LocalNetworkGatewaysCreateOrUpdateOptionalParams): Promise<SimplePollerLike<OperationState<LocalNetworkGatewaysCreateOrUpdateResponse>, LocalNetworkGatewaysCreateOrUpdateResponse>>;
    /**
     * Creates or updates a local network gateway in the specified resource group.
     * @param resourceGroupName The name of the resource group.
     * @param localNetworkGatewayName The name of the local network gateway.
     * @param parameters Parameters supplied to the create or update local network gateway operation.
     * @param options The options parameters.
     */
    beginCreateOrUpdateAndWait(resourceGroupName: string, localNetworkGatewayName: string, parameters: LocalNetworkGateway, options?: LocalNetworkGatewaysCreateOrUpdateOptionalParams): Promise<LocalNetworkGatewaysCreateOrUpdateResponse>;
    /**
     * Gets the specified local network gateway in a resource group.
     * @param resourceGroupName The name of the resource group.
     * @param localNetworkGatewayName The name of the local network gateway.
     * @param options The options parameters.
     */
    get(resourceGroupName: string, localNetworkGatewayName: string, options?: LocalNetworkGatewaysGetOptionalParams): Promise<LocalNetworkGatewaysGetResponse>;
    /**
     * Deletes the specified local network gateway.
     * @param resourceGroupName The name of the resource group.
     * @param localNetworkGatewayName The name of the local network gateway.
     * @param options The options parameters.
     */
    beginDelete(resourceGroupName: string, localNetworkGatewayName: string, options?: LocalNetworkGatewaysDeleteOptionalParams): Promise<SimplePollerLike<OperationState<void>, void>>;
    /**
     * Deletes the specified local network gateway.
     * @param resourceGroupName The name of the resource group.
     * @param localNetworkGatewayName The name of the local network gateway.
     * @param options The options parameters.
     */
    beginDeleteAndWait(resourceGroupName: string, localNetworkGatewayName: string, options?: LocalNetworkGatewaysDeleteOptionalParams): Promise<void>;
    /**
     * Updates a local network gateway tags.
     * @param resourceGroupName The name of the resource group.
     * @param localNetworkGatewayName The name of the local network gateway.
     * @param parameters Parameters supplied to update local network gateway tags.
     * @param options The options parameters.
     */
    updateTags(resourceGroupName: string, localNetworkGatewayName: string, parameters: TagsObject, options?: LocalNetworkGatewaysUpdateTagsOptionalParams): Promise<LocalNetworkGatewaysUpdateTagsResponse>;
    /**
     * Gets all the local network gateways in a resource group.
     * @param resourceGroupName The name of the resource group.
     * @param options The options parameters.
     */
    private _list;
    /**
     * ListNext
     * @param resourceGroupName The name of the resource group.
     * @param nextLink The nextLink from the previous successful call to the List method.
     * @param options The options parameters.
     */
    private _listNext;
}
//# sourceMappingURL=localNetworkGateways.d.ts.map