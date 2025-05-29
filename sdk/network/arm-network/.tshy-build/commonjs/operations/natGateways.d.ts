import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { NatGateways } from "../operationsInterfaces/index.js";
import { NetworkManagementClient } from "../networkManagementClient.js";
import { SimplePollerLike, OperationState } from "@azure/core-lro";
import { NatGateway, NatGatewaysListAllOptionalParams, NatGatewaysListOptionalParams, NatGatewaysDeleteOptionalParams, NatGatewaysGetOptionalParams, NatGatewaysGetResponse, NatGatewaysCreateOrUpdateOptionalParams, NatGatewaysCreateOrUpdateResponse, TagsObject, NatGatewaysUpdateTagsOptionalParams, NatGatewaysUpdateTagsResponse } from "../models/index.js";
/** Class containing NatGateways operations. */
export declare class NatGatewaysImpl implements NatGateways {
    private readonly client;
    /**
     * Initialize a new instance of the class NatGateways class.
     * @param client Reference to the service client
     */
    constructor(client: NetworkManagementClient);
    /**
     * Gets all the Nat Gateways in a subscription.
     * @param options The options parameters.
     */
    listAll(options?: NatGatewaysListAllOptionalParams): PagedAsyncIterableIterator<NatGateway>;
    private listAllPagingPage;
    private listAllPagingAll;
    /**
     * Gets all nat gateways in a resource group.
     * @param resourceGroupName The name of the resource group.
     * @param options The options parameters.
     */
    list(resourceGroupName: string, options?: NatGatewaysListOptionalParams): PagedAsyncIterableIterator<NatGateway>;
    private listPagingPage;
    private listPagingAll;
    /**
     * Deletes the specified nat gateway.
     * @param resourceGroupName The name of the resource group.
     * @param natGatewayName The name of the nat gateway.
     * @param options The options parameters.
     */
    beginDelete(resourceGroupName: string, natGatewayName: string, options?: NatGatewaysDeleteOptionalParams): Promise<SimplePollerLike<OperationState<void>, void>>;
    /**
     * Deletes the specified nat gateway.
     * @param resourceGroupName The name of the resource group.
     * @param natGatewayName The name of the nat gateway.
     * @param options The options parameters.
     */
    beginDeleteAndWait(resourceGroupName: string, natGatewayName: string, options?: NatGatewaysDeleteOptionalParams): Promise<void>;
    /**
     * Gets the specified nat gateway in a specified resource group.
     * @param resourceGroupName The name of the resource group.
     * @param natGatewayName The name of the nat gateway.
     * @param options The options parameters.
     */
    get(resourceGroupName: string, natGatewayName: string, options?: NatGatewaysGetOptionalParams): Promise<NatGatewaysGetResponse>;
    /**
     * Creates or updates a nat gateway.
     * @param resourceGroupName The name of the resource group.
     * @param natGatewayName The name of the nat gateway.
     * @param parameters Parameters supplied to the create or update nat gateway operation.
     * @param options The options parameters.
     */
    beginCreateOrUpdate(resourceGroupName: string, natGatewayName: string, parameters: NatGateway, options?: NatGatewaysCreateOrUpdateOptionalParams): Promise<SimplePollerLike<OperationState<NatGatewaysCreateOrUpdateResponse>, NatGatewaysCreateOrUpdateResponse>>;
    /**
     * Creates or updates a nat gateway.
     * @param resourceGroupName The name of the resource group.
     * @param natGatewayName The name of the nat gateway.
     * @param parameters Parameters supplied to the create or update nat gateway operation.
     * @param options The options parameters.
     */
    beginCreateOrUpdateAndWait(resourceGroupName: string, natGatewayName: string, parameters: NatGateway, options?: NatGatewaysCreateOrUpdateOptionalParams): Promise<NatGatewaysCreateOrUpdateResponse>;
    /**
     * Updates nat gateway tags.
     * @param resourceGroupName The name of the resource group.
     * @param natGatewayName The name of the nat gateway.
     * @param parameters Parameters supplied to update nat gateway tags.
     * @param options The options parameters.
     */
    updateTags(resourceGroupName: string, natGatewayName: string, parameters: TagsObject, options?: NatGatewaysUpdateTagsOptionalParams): Promise<NatGatewaysUpdateTagsResponse>;
    /**
     * Gets all the Nat Gateways in a subscription.
     * @param options The options parameters.
     */
    private _listAll;
    /**
     * Gets all nat gateways in a resource group.
     * @param resourceGroupName The name of the resource group.
     * @param options The options parameters.
     */
    private _list;
    /**
     * ListAllNext
     * @param nextLink The nextLink from the previous successful call to the ListAll method.
     * @param options The options parameters.
     */
    private _listAllNext;
    /**
     * ListNext
     * @param resourceGroupName The name of the resource group.
     * @param nextLink The nextLink from the previous successful call to the List method.
     * @param options The options parameters.
     */
    private _listNext;
}
//# sourceMappingURL=natGateways.d.ts.map