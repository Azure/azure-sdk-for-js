import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { VirtualRouters } from "../operationsInterfaces/index.js";
import { NetworkManagementClient } from "../networkManagementClient.js";
import { SimplePollerLike, OperationState } from "@azure/core-lro";
import { VirtualRouter, VirtualRoutersListByResourceGroupOptionalParams, VirtualRoutersListOptionalParams, VirtualRoutersDeleteOptionalParams, VirtualRoutersGetOptionalParams, VirtualRoutersGetResponse, VirtualRoutersCreateOrUpdateOptionalParams, VirtualRoutersCreateOrUpdateResponse } from "../models/index.js";
/** Class containing VirtualRouters operations. */
export declare class VirtualRoutersImpl implements VirtualRouters {
    private readonly client;
    /**
     * Initialize a new instance of the class VirtualRouters class.
     * @param client Reference to the service client
     */
    constructor(client: NetworkManagementClient);
    /**
     * Lists all Virtual Routers in a resource group.
     * @param resourceGroupName The name of the resource group.
     * @param options The options parameters.
     */
    listByResourceGroup(resourceGroupName: string, options?: VirtualRoutersListByResourceGroupOptionalParams): PagedAsyncIterableIterator<VirtualRouter>;
    private listByResourceGroupPagingPage;
    private listByResourceGroupPagingAll;
    /**
     * Gets all the Virtual Routers in a subscription.
     * @param options The options parameters.
     */
    list(options?: VirtualRoutersListOptionalParams): PagedAsyncIterableIterator<VirtualRouter>;
    private listPagingPage;
    private listPagingAll;
    /**
     * Deletes the specified Virtual Router.
     * @param resourceGroupName The name of the resource group.
     * @param virtualRouterName The name of the Virtual Router.
     * @param options The options parameters.
     */
    beginDelete(resourceGroupName: string, virtualRouterName: string, options?: VirtualRoutersDeleteOptionalParams): Promise<SimplePollerLike<OperationState<void>, void>>;
    /**
     * Deletes the specified Virtual Router.
     * @param resourceGroupName The name of the resource group.
     * @param virtualRouterName The name of the Virtual Router.
     * @param options The options parameters.
     */
    beginDeleteAndWait(resourceGroupName: string, virtualRouterName: string, options?: VirtualRoutersDeleteOptionalParams): Promise<void>;
    /**
     * Gets the specified Virtual Router.
     * @param resourceGroupName The name of the resource group.
     * @param virtualRouterName The name of the Virtual Router.
     * @param options The options parameters.
     */
    get(resourceGroupName: string, virtualRouterName: string, options?: VirtualRoutersGetOptionalParams): Promise<VirtualRoutersGetResponse>;
    /**
     * Creates or updates the specified Virtual Router.
     * @param resourceGroupName The name of the resource group.
     * @param virtualRouterName The name of the Virtual Router.
     * @param parameters Parameters supplied to the create or update Virtual Router.
     * @param options The options parameters.
     */
    beginCreateOrUpdate(resourceGroupName: string, virtualRouterName: string, parameters: VirtualRouter, options?: VirtualRoutersCreateOrUpdateOptionalParams): Promise<SimplePollerLike<OperationState<VirtualRoutersCreateOrUpdateResponse>, VirtualRoutersCreateOrUpdateResponse>>;
    /**
     * Creates or updates the specified Virtual Router.
     * @param resourceGroupName The name of the resource group.
     * @param virtualRouterName The name of the Virtual Router.
     * @param parameters Parameters supplied to the create or update Virtual Router.
     * @param options The options parameters.
     */
    beginCreateOrUpdateAndWait(resourceGroupName: string, virtualRouterName: string, parameters: VirtualRouter, options?: VirtualRoutersCreateOrUpdateOptionalParams): Promise<VirtualRoutersCreateOrUpdateResponse>;
    /**
     * Lists all Virtual Routers in a resource group.
     * @param resourceGroupName The name of the resource group.
     * @param options The options parameters.
     */
    private _listByResourceGroup;
    /**
     * Gets all the Virtual Routers in a subscription.
     * @param options The options parameters.
     */
    private _list;
    /**
     * ListByResourceGroupNext
     * @param resourceGroupName The name of the resource group.
     * @param nextLink The nextLink from the previous successful call to the ListByResourceGroup method.
     * @param options The options parameters.
     */
    private _listByResourceGroupNext;
    /**
     * ListNext
     * @param nextLink The nextLink from the previous successful call to the List method.
     * @param options The options parameters.
     */
    private _listNext;
}
//# sourceMappingURL=virtualRouters.d.ts.map