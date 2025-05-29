import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { VirtualHubRouteTableV2S } from "../operationsInterfaces/index.js";
import { NetworkManagementClient } from "../networkManagementClient.js";
import { SimplePollerLike, OperationState } from "@azure/core-lro";
import { VirtualHubRouteTableV2, VirtualHubRouteTableV2SListOptionalParams, VirtualHubRouteTableV2SGetOptionalParams, VirtualHubRouteTableV2SGetResponse, VirtualHubRouteTableV2SCreateOrUpdateOptionalParams, VirtualHubRouteTableV2SCreateOrUpdateResponse, VirtualHubRouteTableV2SDeleteOptionalParams } from "../models/index.js";
/** Class containing VirtualHubRouteTableV2S operations. */
export declare class VirtualHubRouteTableV2SImpl implements VirtualHubRouteTableV2S {
    private readonly client;
    /**
     * Initialize a new instance of the class VirtualHubRouteTableV2S class.
     * @param client Reference to the service client
     */
    constructor(client: NetworkManagementClient);
    /**
     * Retrieves the details of all VirtualHubRouteTableV2s.
     * @param resourceGroupName The resource group name of the VirtualHub.
     * @param virtualHubName The name of the VirtualHub.
     * @param options The options parameters.
     */
    list(resourceGroupName: string, virtualHubName: string, options?: VirtualHubRouteTableV2SListOptionalParams): PagedAsyncIterableIterator<VirtualHubRouteTableV2>;
    private listPagingPage;
    private listPagingAll;
    /**
     * Retrieves the details of a VirtualHubRouteTableV2.
     * @param resourceGroupName The resource group name of the VirtualHubRouteTableV2.
     * @param virtualHubName The name of the VirtualHub.
     * @param routeTableName The name of the VirtualHubRouteTableV2.
     * @param options The options parameters.
     */
    get(resourceGroupName: string, virtualHubName: string, routeTableName: string, options?: VirtualHubRouteTableV2SGetOptionalParams): Promise<VirtualHubRouteTableV2SGetResponse>;
    /**
     * Creates a VirtualHubRouteTableV2 resource if it doesn't exist else updates the existing
     * VirtualHubRouteTableV2.
     * @param resourceGroupName The resource group name of the VirtualHub.
     * @param virtualHubName The name of the VirtualHub.
     * @param routeTableName The name of the VirtualHubRouteTableV2.
     * @param virtualHubRouteTableV2Parameters Parameters supplied to create or update
     *                                         VirtualHubRouteTableV2.
     * @param options The options parameters.
     */
    beginCreateOrUpdate(resourceGroupName: string, virtualHubName: string, routeTableName: string, virtualHubRouteTableV2Parameters: VirtualHubRouteTableV2, options?: VirtualHubRouteTableV2SCreateOrUpdateOptionalParams): Promise<SimplePollerLike<OperationState<VirtualHubRouteTableV2SCreateOrUpdateResponse>, VirtualHubRouteTableV2SCreateOrUpdateResponse>>;
    /**
     * Creates a VirtualHubRouteTableV2 resource if it doesn't exist else updates the existing
     * VirtualHubRouteTableV2.
     * @param resourceGroupName The resource group name of the VirtualHub.
     * @param virtualHubName The name of the VirtualHub.
     * @param routeTableName The name of the VirtualHubRouteTableV2.
     * @param virtualHubRouteTableV2Parameters Parameters supplied to create or update
     *                                         VirtualHubRouteTableV2.
     * @param options The options parameters.
     */
    beginCreateOrUpdateAndWait(resourceGroupName: string, virtualHubName: string, routeTableName: string, virtualHubRouteTableV2Parameters: VirtualHubRouteTableV2, options?: VirtualHubRouteTableV2SCreateOrUpdateOptionalParams): Promise<VirtualHubRouteTableV2SCreateOrUpdateResponse>;
    /**
     * Deletes a VirtualHubRouteTableV2.
     * @param resourceGroupName The resource group name of the VirtualHubRouteTableV2.
     * @param virtualHubName The name of the VirtualHub.
     * @param routeTableName The name of the VirtualHubRouteTableV2.
     * @param options The options parameters.
     */
    beginDelete(resourceGroupName: string, virtualHubName: string, routeTableName: string, options?: VirtualHubRouteTableV2SDeleteOptionalParams): Promise<SimplePollerLike<OperationState<void>, void>>;
    /**
     * Deletes a VirtualHubRouteTableV2.
     * @param resourceGroupName The resource group name of the VirtualHubRouteTableV2.
     * @param virtualHubName The name of the VirtualHub.
     * @param routeTableName The name of the VirtualHubRouteTableV2.
     * @param options The options parameters.
     */
    beginDeleteAndWait(resourceGroupName: string, virtualHubName: string, routeTableName: string, options?: VirtualHubRouteTableV2SDeleteOptionalParams): Promise<void>;
    /**
     * Retrieves the details of all VirtualHubRouteTableV2s.
     * @param resourceGroupName The resource group name of the VirtualHub.
     * @param virtualHubName The name of the VirtualHub.
     * @param options The options parameters.
     */
    private _list;
    /**
     * ListNext
     * @param resourceGroupName The resource group name of the VirtualHub.
     * @param virtualHubName The name of the VirtualHub.
     * @param nextLink The nextLink from the previous successful call to the List method.
     * @param options The options parameters.
     */
    private _listNext;
}
//# sourceMappingURL=virtualHubRouteTableV2S.d.ts.map