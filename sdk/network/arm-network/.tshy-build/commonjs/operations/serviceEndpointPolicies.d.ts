import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { ServiceEndpointPolicies } from "../operationsInterfaces/index.js";
import { NetworkManagementClient } from "../networkManagementClient.js";
import { SimplePollerLike, OperationState } from "@azure/core-lro";
import { ServiceEndpointPolicy, ServiceEndpointPoliciesListOptionalParams, ServiceEndpointPoliciesListByResourceGroupOptionalParams, ServiceEndpointPoliciesDeleteOptionalParams, ServiceEndpointPoliciesGetOptionalParams, ServiceEndpointPoliciesGetResponse, ServiceEndpointPoliciesCreateOrUpdateOptionalParams, ServiceEndpointPoliciesCreateOrUpdateResponse, TagsObject, ServiceEndpointPoliciesUpdateTagsOptionalParams, ServiceEndpointPoliciesUpdateTagsResponse } from "../models/index.js";
/** Class containing ServiceEndpointPolicies operations. */
export declare class ServiceEndpointPoliciesImpl implements ServiceEndpointPolicies {
    private readonly client;
    /**
     * Initialize a new instance of the class ServiceEndpointPolicies class.
     * @param client Reference to the service client
     */
    constructor(client: NetworkManagementClient);
    /**
     * Gets all the service endpoint policies in a subscription.
     * @param options The options parameters.
     */
    list(options?: ServiceEndpointPoliciesListOptionalParams): PagedAsyncIterableIterator<ServiceEndpointPolicy>;
    private listPagingPage;
    private listPagingAll;
    /**
     * Gets all service endpoint Policies in a resource group.
     * @param resourceGroupName The name of the resource group.
     * @param options The options parameters.
     */
    listByResourceGroup(resourceGroupName: string, options?: ServiceEndpointPoliciesListByResourceGroupOptionalParams): PagedAsyncIterableIterator<ServiceEndpointPolicy>;
    private listByResourceGroupPagingPage;
    private listByResourceGroupPagingAll;
    /**
     * Deletes the specified service endpoint policy.
     * @param resourceGroupName The name of the resource group.
     * @param serviceEndpointPolicyName The name of the service endpoint policy.
     * @param options The options parameters.
     */
    beginDelete(resourceGroupName: string, serviceEndpointPolicyName: string, options?: ServiceEndpointPoliciesDeleteOptionalParams): Promise<SimplePollerLike<OperationState<void>, void>>;
    /**
     * Deletes the specified service endpoint policy.
     * @param resourceGroupName The name of the resource group.
     * @param serviceEndpointPolicyName The name of the service endpoint policy.
     * @param options The options parameters.
     */
    beginDeleteAndWait(resourceGroupName: string, serviceEndpointPolicyName: string, options?: ServiceEndpointPoliciesDeleteOptionalParams): Promise<void>;
    /**
     * Gets the specified service Endpoint Policies in a specified resource group.
     * @param resourceGroupName The name of the resource group.
     * @param serviceEndpointPolicyName The name of the service endpoint policy.
     * @param options The options parameters.
     */
    get(resourceGroupName: string, serviceEndpointPolicyName: string, options?: ServiceEndpointPoliciesGetOptionalParams): Promise<ServiceEndpointPoliciesGetResponse>;
    /**
     * Creates or updates a service Endpoint Policies.
     * @param resourceGroupName The name of the resource group.
     * @param serviceEndpointPolicyName The name of the service endpoint policy.
     * @param parameters Parameters supplied to the create or update service endpoint policy operation.
     * @param options The options parameters.
     */
    beginCreateOrUpdate(resourceGroupName: string, serviceEndpointPolicyName: string, parameters: ServiceEndpointPolicy, options?: ServiceEndpointPoliciesCreateOrUpdateOptionalParams): Promise<SimplePollerLike<OperationState<ServiceEndpointPoliciesCreateOrUpdateResponse>, ServiceEndpointPoliciesCreateOrUpdateResponse>>;
    /**
     * Creates or updates a service Endpoint Policies.
     * @param resourceGroupName The name of the resource group.
     * @param serviceEndpointPolicyName The name of the service endpoint policy.
     * @param parameters Parameters supplied to the create or update service endpoint policy operation.
     * @param options The options parameters.
     */
    beginCreateOrUpdateAndWait(resourceGroupName: string, serviceEndpointPolicyName: string, parameters: ServiceEndpointPolicy, options?: ServiceEndpointPoliciesCreateOrUpdateOptionalParams): Promise<ServiceEndpointPoliciesCreateOrUpdateResponse>;
    /**
     * Updates tags of a service endpoint policy.
     * @param resourceGroupName The name of the resource group.
     * @param serviceEndpointPolicyName The name of the service endpoint policy.
     * @param parameters Parameters supplied to update service endpoint policy tags.
     * @param options The options parameters.
     */
    updateTags(resourceGroupName: string, serviceEndpointPolicyName: string, parameters: TagsObject, options?: ServiceEndpointPoliciesUpdateTagsOptionalParams): Promise<ServiceEndpointPoliciesUpdateTagsResponse>;
    /**
     * Gets all the service endpoint policies in a subscription.
     * @param options The options parameters.
     */
    private _list;
    /**
     * Gets all service endpoint Policies in a resource group.
     * @param resourceGroupName The name of the resource group.
     * @param options The options parameters.
     */
    private _listByResourceGroup;
    /**
     * ListNext
     * @param nextLink The nextLink from the previous successful call to the List method.
     * @param options The options parameters.
     */
    private _listNext;
    /**
     * ListByResourceGroupNext
     * @param resourceGroupName The name of the resource group.
     * @param nextLink The nextLink from the previous successful call to the ListByResourceGroup method.
     * @param options The options parameters.
     */
    private _listByResourceGroupNext;
}
//# sourceMappingURL=serviceEndpointPolicies.d.ts.map