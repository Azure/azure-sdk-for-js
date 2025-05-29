import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { VirtualWans } from "../operationsInterfaces/index.js";
import { NetworkManagementClient } from "../networkManagementClient.js";
import { SimplePollerLike, OperationState } from "@azure/core-lro";
import { VirtualWAN, VirtualWansListByResourceGroupOptionalParams, VirtualWansListOptionalParams, VirtualWansGetOptionalParams, VirtualWansGetResponse, VirtualWansCreateOrUpdateOptionalParams, VirtualWansCreateOrUpdateResponse, TagsObject, VirtualWansUpdateTagsOptionalParams, VirtualWansUpdateTagsResponse, VirtualWansDeleteOptionalParams } from "../models/index.js";
/** Class containing VirtualWans operations. */
export declare class VirtualWansImpl implements VirtualWans {
    private readonly client;
    /**
     * Initialize a new instance of the class VirtualWans class.
     * @param client Reference to the service client
     */
    constructor(client: NetworkManagementClient);
    /**
     * Lists all the VirtualWANs in a resource group.
     * @param resourceGroupName The resource group name of the VirtualWan.
     * @param options The options parameters.
     */
    listByResourceGroup(resourceGroupName: string, options?: VirtualWansListByResourceGroupOptionalParams): PagedAsyncIterableIterator<VirtualWAN>;
    private listByResourceGroupPagingPage;
    private listByResourceGroupPagingAll;
    /**
     * Lists all the VirtualWANs in a subscription.
     * @param options The options parameters.
     */
    list(options?: VirtualWansListOptionalParams): PagedAsyncIterableIterator<VirtualWAN>;
    private listPagingPage;
    private listPagingAll;
    /**
     * Retrieves the details of a VirtualWAN.
     * @param resourceGroupName The resource group name of the VirtualWan.
     * @param virtualWANName The name of the VirtualWAN being retrieved.
     * @param options The options parameters.
     */
    get(resourceGroupName: string, virtualWANName: string, options?: VirtualWansGetOptionalParams): Promise<VirtualWansGetResponse>;
    /**
     * Creates a VirtualWAN resource if it doesn't exist else updates the existing VirtualWAN.
     * @param resourceGroupName The resource group name of the VirtualWan.
     * @param virtualWANName The name of the VirtualWAN being created or updated.
     * @param wANParameters Parameters supplied to create or update VirtualWAN.
     * @param options The options parameters.
     */
    beginCreateOrUpdate(resourceGroupName: string, virtualWANName: string, wANParameters: VirtualWAN, options?: VirtualWansCreateOrUpdateOptionalParams): Promise<SimplePollerLike<OperationState<VirtualWansCreateOrUpdateResponse>, VirtualWansCreateOrUpdateResponse>>;
    /**
     * Creates a VirtualWAN resource if it doesn't exist else updates the existing VirtualWAN.
     * @param resourceGroupName The resource group name of the VirtualWan.
     * @param virtualWANName The name of the VirtualWAN being created or updated.
     * @param wANParameters Parameters supplied to create or update VirtualWAN.
     * @param options The options parameters.
     */
    beginCreateOrUpdateAndWait(resourceGroupName: string, virtualWANName: string, wANParameters: VirtualWAN, options?: VirtualWansCreateOrUpdateOptionalParams): Promise<VirtualWansCreateOrUpdateResponse>;
    /**
     * Updates a VirtualWAN tags.
     * @param resourceGroupName The resource group name of the VirtualWan.
     * @param virtualWANName The name of the VirtualWAN being updated.
     * @param wANParameters Parameters supplied to Update VirtualWAN tags.
     * @param options The options parameters.
     */
    updateTags(resourceGroupName: string, virtualWANName: string, wANParameters: TagsObject, options?: VirtualWansUpdateTagsOptionalParams): Promise<VirtualWansUpdateTagsResponse>;
    /**
     * Deletes a VirtualWAN.
     * @param resourceGroupName The resource group name of the VirtualWan.
     * @param virtualWANName The name of the VirtualWAN being deleted.
     * @param options The options parameters.
     */
    beginDelete(resourceGroupName: string, virtualWANName: string, options?: VirtualWansDeleteOptionalParams): Promise<SimplePollerLike<OperationState<void>, void>>;
    /**
     * Deletes a VirtualWAN.
     * @param resourceGroupName The resource group name of the VirtualWan.
     * @param virtualWANName The name of the VirtualWAN being deleted.
     * @param options The options parameters.
     */
    beginDeleteAndWait(resourceGroupName: string, virtualWANName: string, options?: VirtualWansDeleteOptionalParams): Promise<void>;
    /**
     * Lists all the VirtualWANs in a resource group.
     * @param resourceGroupName The resource group name of the VirtualWan.
     * @param options The options parameters.
     */
    private _listByResourceGroup;
    /**
     * Lists all the VirtualWANs in a subscription.
     * @param options The options parameters.
     */
    private _list;
    /**
     * ListByResourceGroupNext
     * @param resourceGroupName The resource group name of the VirtualWan.
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
//# sourceMappingURL=virtualWans.d.ts.map