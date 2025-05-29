import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { AvailablePrivateEndpointTypes } from "../operationsInterfaces/index.js";
import { NetworkManagementClient } from "../networkManagementClient.js";
import { AvailablePrivateEndpointType, AvailablePrivateEndpointTypesListOptionalParams, AvailablePrivateEndpointTypesListByResourceGroupOptionalParams } from "../models/index.js";
/** Class containing AvailablePrivateEndpointTypes operations. */
export declare class AvailablePrivateEndpointTypesImpl implements AvailablePrivateEndpointTypes {
    private readonly client;
    /**
     * Initialize a new instance of the class AvailablePrivateEndpointTypes class.
     * @param client Reference to the service client
     */
    constructor(client: NetworkManagementClient);
    /**
     * Returns all of the resource types that can be linked to a Private Endpoint in this subscription in
     * this region.
     * @param location The location of the domain name.
     * @param options The options parameters.
     */
    list(location: string, options?: AvailablePrivateEndpointTypesListOptionalParams): PagedAsyncIterableIterator<AvailablePrivateEndpointType>;
    private listPagingPage;
    private listPagingAll;
    /**
     * Returns all of the resource types that can be linked to a Private Endpoint in this subscription in
     * this region.
     * @param location The location of the domain name.
     * @param resourceGroupName The name of the resource group.
     * @param options The options parameters.
     */
    listByResourceGroup(location: string, resourceGroupName: string, options?: AvailablePrivateEndpointTypesListByResourceGroupOptionalParams): PagedAsyncIterableIterator<AvailablePrivateEndpointType>;
    private listByResourceGroupPagingPage;
    private listByResourceGroupPagingAll;
    /**
     * Returns all of the resource types that can be linked to a Private Endpoint in this subscription in
     * this region.
     * @param location The location of the domain name.
     * @param options The options parameters.
     */
    private _list;
    /**
     * Returns all of the resource types that can be linked to a Private Endpoint in this subscription in
     * this region.
     * @param location The location of the domain name.
     * @param resourceGroupName The name of the resource group.
     * @param options The options parameters.
     */
    private _listByResourceGroup;
    /**
     * ListNext
     * @param location The location of the domain name.
     * @param nextLink The nextLink from the previous successful call to the List method.
     * @param options The options parameters.
     */
    private _listNext;
    /**
     * ListByResourceGroupNext
     * @param location The location of the domain name.
     * @param resourceGroupName The name of the resource group.
     * @param nextLink The nextLink from the previous successful call to the ListByResourceGroup method.
     * @param options The options parameters.
     */
    private _listByResourceGroupNext;
}
//# sourceMappingURL=availablePrivateEndpointTypes.d.ts.map