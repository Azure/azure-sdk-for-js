import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { ApplicationSecurityGroups } from "../operationsInterfaces/index.js";
import { NetworkManagementClient } from "../networkManagementClient.js";
import { SimplePollerLike, OperationState } from "@azure/core-lro";
import { ApplicationSecurityGroup, ApplicationSecurityGroupsListAllOptionalParams, ApplicationSecurityGroupsListOptionalParams, ApplicationSecurityGroupsDeleteOptionalParams, ApplicationSecurityGroupsGetOptionalParams, ApplicationSecurityGroupsGetResponse, ApplicationSecurityGroupsCreateOrUpdateOptionalParams, ApplicationSecurityGroupsCreateOrUpdateResponse, TagsObject, ApplicationSecurityGroupsUpdateTagsOptionalParams, ApplicationSecurityGroupsUpdateTagsResponse } from "../models/index.js";
/** Class containing ApplicationSecurityGroups operations. */
export declare class ApplicationSecurityGroupsImpl implements ApplicationSecurityGroups {
    private readonly client;
    /**
     * Initialize a new instance of the class ApplicationSecurityGroups class.
     * @param client Reference to the service client
     */
    constructor(client: NetworkManagementClient);
    /**
     * Gets all application security groups in a subscription.
     * @param options The options parameters.
     */
    listAll(options?: ApplicationSecurityGroupsListAllOptionalParams): PagedAsyncIterableIterator<ApplicationSecurityGroup>;
    private listAllPagingPage;
    private listAllPagingAll;
    /**
     * Gets all the application security groups in a resource group.
     * @param resourceGroupName The name of the resource group.
     * @param options The options parameters.
     */
    list(resourceGroupName: string, options?: ApplicationSecurityGroupsListOptionalParams): PagedAsyncIterableIterator<ApplicationSecurityGroup>;
    private listPagingPage;
    private listPagingAll;
    /**
     * Deletes the specified application security group.
     * @param resourceGroupName The name of the resource group.
     * @param applicationSecurityGroupName The name of the application security group.
     * @param options The options parameters.
     */
    beginDelete(resourceGroupName: string, applicationSecurityGroupName: string, options?: ApplicationSecurityGroupsDeleteOptionalParams): Promise<SimplePollerLike<OperationState<void>, void>>;
    /**
     * Deletes the specified application security group.
     * @param resourceGroupName The name of the resource group.
     * @param applicationSecurityGroupName The name of the application security group.
     * @param options The options parameters.
     */
    beginDeleteAndWait(resourceGroupName: string, applicationSecurityGroupName: string, options?: ApplicationSecurityGroupsDeleteOptionalParams): Promise<void>;
    /**
     * Gets information about the specified application security group.
     * @param resourceGroupName The name of the resource group.
     * @param applicationSecurityGroupName The name of the application security group.
     * @param options The options parameters.
     */
    get(resourceGroupName: string, applicationSecurityGroupName: string, options?: ApplicationSecurityGroupsGetOptionalParams): Promise<ApplicationSecurityGroupsGetResponse>;
    /**
     * Creates or updates an application security group.
     * @param resourceGroupName The name of the resource group.
     * @param applicationSecurityGroupName The name of the application security group.
     * @param parameters Parameters supplied to the create or update ApplicationSecurityGroup operation.
     * @param options The options parameters.
     */
    beginCreateOrUpdate(resourceGroupName: string, applicationSecurityGroupName: string, parameters: ApplicationSecurityGroup, options?: ApplicationSecurityGroupsCreateOrUpdateOptionalParams): Promise<SimplePollerLike<OperationState<ApplicationSecurityGroupsCreateOrUpdateResponse>, ApplicationSecurityGroupsCreateOrUpdateResponse>>;
    /**
     * Creates or updates an application security group.
     * @param resourceGroupName The name of the resource group.
     * @param applicationSecurityGroupName The name of the application security group.
     * @param parameters Parameters supplied to the create or update ApplicationSecurityGroup operation.
     * @param options The options parameters.
     */
    beginCreateOrUpdateAndWait(resourceGroupName: string, applicationSecurityGroupName: string, parameters: ApplicationSecurityGroup, options?: ApplicationSecurityGroupsCreateOrUpdateOptionalParams): Promise<ApplicationSecurityGroupsCreateOrUpdateResponse>;
    /**
     * Updates an application security group's tags.
     * @param resourceGroupName The name of the resource group.
     * @param applicationSecurityGroupName The name of the application security group.
     * @param parameters Parameters supplied to update application security group tags.
     * @param options The options parameters.
     */
    updateTags(resourceGroupName: string, applicationSecurityGroupName: string, parameters: TagsObject, options?: ApplicationSecurityGroupsUpdateTagsOptionalParams): Promise<ApplicationSecurityGroupsUpdateTagsResponse>;
    /**
     * Gets all application security groups in a subscription.
     * @param options The options parameters.
     */
    private _listAll;
    /**
     * Gets all the application security groups in a resource group.
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
//# sourceMappingURL=applicationSecurityGroups.d.ts.map