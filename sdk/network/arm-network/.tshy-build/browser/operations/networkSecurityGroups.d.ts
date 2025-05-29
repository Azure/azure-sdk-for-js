import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { NetworkSecurityGroups } from "../operationsInterfaces/index.js";
import { NetworkManagementClient } from "../networkManagementClient.js";
import { SimplePollerLike, OperationState } from "@azure/core-lro";
import { NetworkSecurityGroup, NetworkSecurityGroupsListAllOptionalParams, NetworkSecurityGroupsListOptionalParams, NetworkSecurityGroupsDeleteOptionalParams, NetworkSecurityGroupsGetOptionalParams, NetworkSecurityGroupsGetResponse, NetworkSecurityGroupsCreateOrUpdateOptionalParams, NetworkSecurityGroupsCreateOrUpdateResponse, TagsObject, NetworkSecurityGroupsUpdateTagsOptionalParams, NetworkSecurityGroupsUpdateTagsResponse } from "../models/index.js";
/** Class containing NetworkSecurityGroups operations. */
export declare class NetworkSecurityGroupsImpl implements NetworkSecurityGroups {
    private readonly client;
    /**
     * Initialize a new instance of the class NetworkSecurityGroups class.
     * @param client Reference to the service client
     */
    constructor(client: NetworkManagementClient);
    /**
     * Gets all network security groups in a subscription.
     * @param options The options parameters.
     */
    listAll(options?: NetworkSecurityGroupsListAllOptionalParams): PagedAsyncIterableIterator<NetworkSecurityGroup>;
    private listAllPagingPage;
    private listAllPagingAll;
    /**
     * Gets all network security groups in a resource group.
     * @param resourceGroupName The name of the resource group.
     * @param options The options parameters.
     */
    list(resourceGroupName: string, options?: NetworkSecurityGroupsListOptionalParams): PagedAsyncIterableIterator<NetworkSecurityGroup>;
    private listPagingPage;
    private listPagingAll;
    /**
     * Deletes the specified network security group.
     * @param resourceGroupName The name of the resource group.
     * @param networkSecurityGroupName The name of the network security group.
     * @param options The options parameters.
     */
    beginDelete(resourceGroupName: string, networkSecurityGroupName: string, options?: NetworkSecurityGroupsDeleteOptionalParams): Promise<SimplePollerLike<OperationState<void>, void>>;
    /**
     * Deletes the specified network security group.
     * @param resourceGroupName The name of the resource group.
     * @param networkSecurityGroupName The name of the network security group.
     * @param options The options parameters.
     */
    beginDeleteAndWait(resourceGroupName: string, networkSecurityGroupName: string, options?: NetworkSecurityGroupsDeleteOptionalParams): Promise<void>;
    /**
     * Gets the specified network security group.
     * @param resourceGroupName The name of the resource group.
     * @param networkSecurityGroupName The name of the network security group.
     * @param options The options parameters.
     */
    get(resourceGroupName: string, networkSecurityGroupName: string, options?: NetworkSecurityGroupsGetOptionalParams): Promise<NetworkSecurityGroupsGetResponse>;
    /**
     * Creates or updates a network security group in the specified resource group.
     * @param resourceGroupName The name of the resource group.
     * @param networkSecurityGroupName The name of the network security group.
     * @param parameters Parameters supplied to the create or update network security group operation.
     * @param options The options parameters.
     */
    beginCreateOrUpdate(resourceGroupName: string, networkSecurityGroupName: string, parameters: NetworkSecurityGroup, options?: NetworkSecurityGroupsCreateOrUpdateOptionalParams): Promise<SimplePollerLike<OperationState<NetworkSecurityGroupsCreateOrUpdateResponse>, NetworkSecurityGroupsCreateOrUpdateResponse>>;
    /**
     * Creates or updates a network security group in the specified resource group.
     * @param resourceGroupName The name of the resource group.
     * @param networkSecurityGroupName The name of the network security group.
     * @param parameters Parameters supplied to the create or update network security group operation.
     * @param options The options parameters.
     */
    beginCreateOrUpdateAndWait(resourceGroupName: string, networkSecurityGroupName: string, parameters: NetworkSecurityGroup, options?: NetworkSecurityGroupsCreateOrUpdateOptionalParams): Promise<NetworkSecurityGroupsCreateOrUpdateResponse>;
    /**
     * Updates a network security group tags.
     * @param resourceGroupName The name of the resource group.
     * @param networkSecurityGroupName The name of the network security group.
     * @param parameters Parameters supplied to update network security group tags.
     * @param options The options parameters.
     */
    updateTags(resourceGroupName: string, networkSecurityGroupName: string, parameters: TagsObject, options?: NetworkSecurityGroupsUpdateTagsOptionalParams): Promise<NetworkSecurityGroupsUpdateTagsResponse>;
    /**
     * Gets all network security groups in a subscription.
     * @param options The options parameters.
     */
    private _listAll;
    /**
     * Gets all network security groups in a resource group.
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
//# sourceMappingURL=networkSecurityGroups.d.ts.map