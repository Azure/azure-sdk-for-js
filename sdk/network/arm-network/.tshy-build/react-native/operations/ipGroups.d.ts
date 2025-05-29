import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { IpGroups } from "../operationsInterfaces/index.js";
import { NetworkManagementClient } from "../networkManagementClient.js";
import { SimplePollerLike, OperationState } from "@azure/core-lro";
import { IpGroup, IpGroupsListByResourceGroupOptionalParams, IpGroupsListOptionalParams, IpGroupsGetOptionalParams, IpGroupsGetResponse, IpGroupsCreateOrUpdateOptionalParams, IpGroupsCreateOrUpdateResponse, TagsObject, IpGroupsUpdateGroupsOptionalParams, IpGroupsUpdateGroupsResponse, IpGroupsDeleteOptionalParams } from "../models/index.js";
/** Class containing IpGroups operations. */
export declare class IpGroupsImpl implements IpGroups {
    private readonly client;
    /**
     * Initialize a new instance of the class IpGroups class.
     * @param client Reference to the service client
     */
    constructor(client: NetworkManagementClient);
    /**
     * Gets all IpGroups in a resource group.
     * @param resourceGroupName The name of the resource group.
     * @param options The options parameters.
     */
    listByResourceGroup(resourceGroupName: string, options?: IpGroupsListByResourceGroupOptionalParams): PagedAsyncIterableIterator<IpGroup>;
    private listByResourceGroupPagingPage;
    private listByResourceGroupPagingAll;
    /**
     * Gets all IpGroups in a subscription.
     * @param options The options parameters.
     */
    list(options?: IpGroupsListOptionalParams): PagedAsyncIterableIterator<IpGroup>;
    private listPagingPage;
    private listPagingAll;
    /**
     * Gets the specified ipGroups.
     * @param resourceGroupName The name of the resource group.
     * @param ipGroupsName The name of the ipGroups.
     * @param options The options parameters.
     */
    get(resourceGroupName: string, ipGroupsName: string, options?: IpGroupsGetOptionalParams): Promise<IpGroupsGetResponse>;
    /**
     * Creates or updates an ipGroups in a specified resource group.
     * @param resourceGroupName The name of the resource group.
     * @param ipGroupsName The name of the ipGroups.
     * @param parameters Parameters supplied to the create or update IpGroups operation.
     * @param options The options parameters.
     */
    beginCreateOrUpdate(resourceGroupName: string, ipGroupsName: string, parameters: IpGroup, options?: IpGroupsCreateOrUpdateOptionalParams): Promise<SimplePollerLike<OperationState<IpGroupsCreateOrUpdateResponse>, IpGroupsCreateOrUpdateResponse>>;
    /**
     * Creates or updates an ipGroups in a specified resource group.
     * @param resourceGroupName The name of the resource group.
     * @param ipGroupsName The name of the ipGroups.
     * @param parameters Parameters supplied to the create or update IpGroups operation.
     * @param options The options parameters.
     */
    beginCreateOrUpdateAndWait(resourceGroupName: string, ipGroupsName: string, parameters: IpGroup, options?: IpGroupsCreateOrUpdateOptionalParams): Promise<IpGroupsCreateOrUpdateResponse>;
    /**
     * Updates tags of an IpGroups resource.
     * @param resourceGroupName The name of the resource group.
     * @param ipGroupsName The name of the ipGroups.
     * @param parameters Parameters supplied to the update ipGroups operation.
     * @param options The options parameters.
     */
    updateGroups(resourceGroupName: string, ipGroupsName: string, parameters: TagsObject, options?: IpGroupsUpdateGroupsOptionalParams): Promise<IpGroupsUpdateGroupsResponse>;
    /**
     * Deletes the specified ipGroups.
     * @param resourceGroupName The name of the resource group.
     * @param ipGroupsName The name of the ipGroups.
     * @param options The options parameters.
     */
    beginDelete(resourceGroupName: string, ipGroupsName: string, options?: IpGroupsDeleteOptionalParams): Promise<SimplePollerLike<OperationState<void>, void>>;
    /**
     * Deletes the specified ipGroups.
     * @param resourceGroupName The name of the resource group.
     * @param ipGroupsName The name of the ipGroups.
     * @param options The options parameters.
     */
    beginDeleteAndWait(resourceGroupName: string, ipGroupsName: string, options?: IpGroupsDeleteOptionalParams): Promise<void>;
    /**
     * Gets all IpGroups in a resource group.
     * @param resourceGroupName The name of the resource group.
     * @param options The options parameters.
     */
    private _listByResourceGroup;
    /**
     * Gets all IpGroups in a subscription.
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
//# sourceMappingURL=ipGroups.d.ts.map