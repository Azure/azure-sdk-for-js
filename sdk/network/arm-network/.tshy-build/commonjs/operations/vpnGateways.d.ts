import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { VpnGateways } from "../operationsInterfaces/index.js";
import { NetworkManagementClient } from "../networkManagementClient.js";
import { SimplePollerLike, OperationState } from "@azure/core-lro";
import { VpnGateway, VpnGatewaysListByResourceGroupOptionalParams, VpnGatewaysListOptionalParams, VpnGatewaysGetOptionalParams, VpnGatewaysGetResponse, VpnGatewaysCreateOrUpdateOptionalParams, VpnGatewaysCreateOrUpdateResponse, TagsObject, VpnGatewaysUpdateTagsOptionalParams, VpnGatewaysUpdateTagsResponse, VpnGatewaysDeleteOptionalParams, VpnGatewaysResetOptionalParams, VpnGatewaysResetResponse, VpnGatewaysStartPacketCaptureOptionalParams, VpnGatewaysStartPacketCaptureResponse, VpnGatewaysStopPacketCaptureOptionalParams, VpnGatewaysStopPacketCaptureResponse } from "../models/index.js";
/** Class containing VpnGateways operations. */
export declare class VpnGatewaysImpl implements VpnGateways {
    private readonly client;
    /**
     * Initialize a new instance of the class VpnGateways class.
     * @param client Reference to the service client
     */
    constructor(client: NetworkManagementClient);
    /**
     * Lists all the VpnGateways in a resource group.
     * @param resourceGroupName The resource group name of the VpnGateway.
     * @param options The options parameters.
     */
    listByResourceGroup(resourceGroupName: string, options?: VpnGatewaysListByResourceGroupOptionalParams): PagedAsyncIterableIterator<VpnGateway>;
    private listByResourceGroupPagingPage;
    private listByResourceGroupPagingAll;
    /**
     * Lists all the VpnGateways in a subscription.
     * @param options The options parameters.
     */
    list(options?: VpnGatewaysListOptionalParams): PagedAsyncIterableIterator<VpnGateway>;
    private listPagingPage;
    private listPagingAll;
    /**
     * Retrieves the details of a virtual wan vpn gateway.
     * @param resourceGroupName The resource group name of the VpnGateway.
     * @param gatewayName The name of the gateway.
     * @param options The options parameters.
     */
    get(resourceGroupName: string, gatewayName: string, options?: VpnGatewaysGetOptionalParams): Promise<VpnGatewaysGetResponse>;
    /**
     * Creates a virtual wan vpn gateway if it doesn't exist else updates the existing gateway.
     * @param resourceGroupName The resource group name of the VpnGateway.
     * @param gatewayName The name of the gateway.
     * @param vpnGatewayParameters Parameters supplied to create or Update a virtual wan vpn gateway.
     * @param options The options parameters.
     */
    beginCreateOrUpdate(resourceGroupName: string, gatewayName: string, vpnGatewayParameters: VpnGateway, options?: VpnGatewaysCreateOrUpdateOptionalParams): Promise<SimplePollerLike<OperationState<VpnGatewaysCreateOrUpdateResponse>, VpnGatewaysCreateOrUpdateResponse>>;
    /**
     * Creates a virtual wan vpn gateway if it doesn't exist else updates the existing gateway.
     * @param resourceGroupName The resource group name of the VpnGateway.
     * @param gatewayName The name of the gateway.
     * @param vpnGatewayParameters Parameters supplied to create or Update a virtual wan vpn gateway.
     * @param options The options parameters.
     */
    beginCreateOrUpdateAndWait(resourceGroupName: string, gatewayName: string, vpnGatewayParameters: VpnGateway, options?: VpnGatewaysCreateOrUpdateOptionalParams): Promise<VpnGatewaysCreateOrUpdateResponse>;
    /**
     * Updates virtual wan vpn gateway tags.
     * @param resourceGroupName The resource group name of the VpnGateway.
     * @param gatewayName The name of the gateway.
     * @param vpnGatewayParameters Parameters supplied to update a virtual wan vpn gateway tags.
     * @param options The options parameters.
     */
    beginUpdateTags(resourceGroupName: string, gatewayName: string, vpnGatewayParameters: TagsObject, options?: VpnGatewaysUpdateTagsOptionalParams): Promise<SimplePollerLike<OperationState<VpnGatewaysUpdateTagsResponse>, VpnGatewaysUpdateTagsResponse>>;
    /**
     * Updates virtual wan vpn gateway tags.
     * @param resourceGroupName The resource group name of the VpnGateway.
     * @param gatewayName The name of the gateway.
     * @param vpnGatewayParameters Parameters supplied to update a virtual wan vpn gateway tags.
     * @param options The options parameters.
     */
    beginUpdateTagsAndWait(resourceGroupName: string, gatewayName: string, vpnGatewayParameters: TagsObject, options?: VpnGatewaysUpdateTagsOptionalParams): Promise<VpnGatewaysUpdateTagsResponse>;
    /**
     * Deletes a virtual wan vpn gateway.
     * @param resourceGroupName The resource group name of the VpnGateway.
     * @param gatewayName The name of the gateway.
     * @param options The options parameters.
     */
    beginDelete(resourceGroupName: string, gatewayName: string, options?: VpnGatewaysDeleteOptionalParams): Promise<SimplePollerLike<OperationState<void>, void>>;
    /**
     * Deletes a virtual wan vpn gateway.
     * @param resourceGroupName The resource group name of the VpnGateway.
     * @param gatewayName The name of the gateway.
     * @param options The options parameters.
     */
    beginDeleteAndWait(resourceGroupName: string, gatewayName: string, options?: VpnGatewaysDeleteOptionalParams): Promise<void>;
    /**
     * Resets the primary of the vpn gateway in the specified resource group.
     * @param resourceGroupName The resource group name of the VpnGateway.
     * @param gatewayName The name of the gateway.
     * @param options The options parameters.
     */
    beginReset(resourceGroupName: string, gatewayName: string, options?: VpnGatewaysResetOptionalParams): Promise<SimplePollerLike<OperationState<VpnGatewaysResetResponse>, VpnGatewaysResetResponse>>;
    /**
     * Resets the primary of the vpn gateway in the specified resource group.
     * @param resourceGroupName The resource group name of the VpnGateway.
     * @param gatewayName The name of the gateway.
     * @param options The options parameters.
     */
    beginResetAndWait(resourceGroupName: string, gatewayName: string, options?: VpnGatewaysResetOptionalParams): Promise<VpnGatewaysResetResponse>;
    /**
     * Starts packet capture on vpn gateway in the specified resource group.
     * @param resourceGroupName The resource group name of the VpnGateway.
     * @param gatewayName The name of the gateway.
     * @param options The options parameters.
     */
    beginStartPacketCapture(resourceGroupName: string, gatewayName: string, options?: VpnGatewaysStartPacketCaptureOptionalParams): Promise<SimplePollerLike<OperationState<VpnGatewaysStartPacketCaptureResponse>, VpnGatewaysStartPacketCaptureResponse>>;
    /**
     * Starts packet capture on vpn gateway in the specified resource group.
     * @param resourceGroupName The resource group name of the VpnGateway.
     * @param gatewayName The name of the gateway.
     * @param options The options parameters.
     */
    beginStartPacketCaptureAndWait(resourceGroupName: string, gatewayName: string, options?: VpnGatewaysStartPacketCaptureOptionalParams): Promise<VpnGatewaysStartPacketCaptureResponse>;
    /**
     * Stops packet capture on vpn gateway in the specified resource group.
     * @param resourceGroupName The resource group name of the VpnGateway.
     * @param gatewayName The name of the gateway.
     * @param options The options parameters.
     */
    beginStopPacketCapture(resourceGroupName: string, gatewayName: string, options?: VpnGatewaysStopPacketCaptureOptionalParams): Promise<SimplePollerLike<OperationState<VpnGatewaysStopPacketCaptureResponse>, VpnGatewaysStopPacketCaptureResponse>>;
    /**
     * Stops packet capture on vpn gateway in the specified resource group.
     * @param resourceGroupName The resource group name of the VpnGateway.
     * @param gatewayName The name of the gateway.
     * @param options The options parameters.
     */
    beginStopPacketCaptureAndWait(resourceGroupName: string, gatewayName: string, options?: VpnGatewaysStopPacketCaptureOptionalParams): Promise<VpnGatewaysStopPacketCaptureResponse>;
    /**
     * Lists all the VpnGateways in a resource group.
     * @param resourceGroupName The resource group name of the VpnGateway.
     * @param options The options parameters.
     */
    private _listByResourceGroup;
    /**
     * Lists all the VpnGateways in a subscription.
     * @param options The options parameters.
     */
    private _list;
    /**
     * ListByResourceGroupNext
     * @param resourceGroupName The resource group name of the VpnGateway.
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
//# sourceMappingURL=vpnGateways.d.ts.map