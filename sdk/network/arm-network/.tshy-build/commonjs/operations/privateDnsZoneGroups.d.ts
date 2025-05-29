import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { PrivateDnsZoneGroups } from "../operationsInterfaces/index.js";
import { NetworkManagementClient } from "../networkManagementClient.js";
import { SimplePollerLike, OperationState } from "@azure/core-lro";
import { PrivateDnsZoneGroup, PrivateDnsZoneGroupsListOptionalParams, PrivateDnsZoneGroupsDeleteOptionalParams, PrivateDnsZoneGroupsGetOptionalParams, PrivateDnsZoneGroupsGetResponse, PrivateDnsZoneGroupsCreateOrUpdateOptionalParams, PrivateDnsZoneGroupsCreateOrUpdateResponse } from "../models/index.js";
/** Class containing PrivateDnsZoneGroups operations. */
export declare class PrivateDnsZoneGroupsImpl implements PrivateDnsZoneGroups {
    private readonly client;
    /**
     * Initialize a new instance of the class PrivateDnsZoneGroups class.
     * @param client Reference to the service client
     */
    constructor(client: NetworkManagementClient);
    /**
     * Gets all private dns zone groups in a private endpoint.
     * @param privateEndpointName The name of the private endpoint.
     * @param resourceGroupName The name of the resource group.
     * @param options The options parameters.
     */
    list(privateEndpointName: string, resourceGroupName: string, options?: PrivateDnsZoneGroupsListOptionalParams): PagedAsyncIterableIterator<PrivateDnsZoneGroup>;
    private listPagingPage;
    private listPagingAll;
    /**
     * Deletes the specified private dns zone group.
     * @param resourceGroupName The name of the resource group.
     * @param privateEndpointName The name of the private endpoint.
     * @param privateDnsZoneGroupName The name of the private dns zone group.
     * @param options The options parameters.
     */
    beginDelete(resourceGroupName: string, privateEndpointName: string, privateDnsZoneGroupName: string, options?: PrivateDnsZoneGroupsDeleteOptionalParams): Promise<SimplePollerLike<OperationState<void>, void>>;
    /**
     * Deletes the specified private dns zone group.
     * @param resourceGroupName The name of the resource group.
     * @param privateEndpointName The name of the private endpoint.
     * @param privateDnsZoneGroupName The name of the private dns zone group.
     * @param options The options parameters.
     */
    beginDeleteAndWait(resourceGroupName: string, privateEndpointName: string, privateDnsZoneGroupName: string, options?: PrivateDnsZoneGroupsDeleteOptionalParams): Promise<void>;
    /**
     * Gets the private dns zone group resource by specified private dns zone group name.
     * @param resourceGroupName The name of the resource group.
     * @param privateEndpointName The name of the private endpoint.
     * @param privateDnsZoneGroupName The name of the private dns zone group.
     * @param options The options parameters.
     */
    get(resourceGroupName: string, privateEndpointName: string, privateDnsZoneGroupName: string, options?: PrivateDnsZoneGroupsGetOptionalParams): Promise<PrivateDnsZoneGroupsGetResponse>;
    /**
     * Creates or updates a private dns zone group in the specified private endpoint.
     * @param resourceGroupName The name of the resource group.
     * @param privateEndpointName The name of the private endpoint.
     * @param privateDnsZoneGroupName The name of the private dns zone group.
     * @param parameters Parameters supplied to the create or update private dns zone group operation.
     * @param options The options parameters.
     */
    beginCreateOrUpdate(resourceGroupName: string, privateEndpointName: string, privateDnsZoneGroupName: string, parameters: PrivateDnsZoneGroup, options?: PrivateDnsZoneGroupsCreateOrUpdateOptionalParams): Promise<SimplePollerLike<OperationState<PrivateDnsZoneGroupsCreateOrUpdateResponse>, PrivateDnsZoneGroupsCreateOrUpdateResponse>>;
    /**
     * Creates or updates a private dns zone group in the specified private endpoint.
     * @param resourceGroupName The name of the resource group.
     * @param privateEndpointName The name of the private endpoint.
     * @param privateDnsZoneGroupName The name of the private dns zone group.
     * @param parameters Parameters supplied to the create or update private dns zone group operation.
     * @param options The options parameters.
     */
    beginCreateOrUpdateAndWait(resourceGroupName: string, privateEndpointName: string, privateDnsZoneGroupName: string, parameters: PrivateDnsZoneGroup, options?: PrivateDnsZoneGroupsCreateOrUpdateOptionalParams): Promise<PrivateDnsZoneGroupsCreateOrUpdateResponse>;
    /**
     * Gets all private dns zone groups in a private endpoint.
     * @param privateEndpointName The name of the private endpoint.
     * @param resourceGroupName The name of the resource group.
     * @param options The options parameters.
     */
    private _list;
    /**
     * ListNext
     * @param privateEndpointName The name of the private endpoint.
     * @param resourceGroupName The name of the resource group.
     * @param nextLink The nextLink from the previous successful call to the List method.
     * @param options The options parameters.
     */
    private _listNext;
}
//# sourceMappingURL=privateDnsZoneGroups.d.ts.map