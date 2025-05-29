import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { WebApplicationFirewallPolicies } from "../operationsInterfaces/index.js";
import { NetworkManagementClient } from "../networkManagementClient.js";
import { SimplePollerLike, OperationState } from "@azure/core-lro";
import { WebApplicationFirewallPolicy, WebApplicationFirewallPoliciesListOptionalParams, WebApplicationFirewallPoliciesListAllOptionalParams, WebApplicationFirewallPoliciesGetOptionalParams, WebApplicationFirewallPoliciesGetResponse, WebApplicationFirewallPoliciesCreateOrUpdateOptionalParams, WebApplicationFirewallPoliciesCreateOrUpdateResponse, WebApplicationFirewallPoliciesDeleteOptionalParams } from "../models/index.js";
/** Class containing WebApplicationFirewallPolicies operations. */
export declare class WebApplicationFirewallPoliciesImpl implements WebApplicationFirewallPolicies {
    private readonly client;
    /**
     * Initialize a new instance of the class WebApplicationFirewallPolicies class.
     * @param client Reference to the service client
     */
    constructor(client: NetworkManagementClient);
    /**
     * Lists all of the protection policies within a resource group.
     * @param resourceGroupName The name of the resource group.
     * @param options The options parameters.
     */
    list(resourceGroupName: string, options?: WebApplicationFirewallPoliciesListOptionalParams): PagedAsyncIterableIterator<WebApplicationFirewallPolicy>;
    private listPagingPage;
    private listPagingAll;
    /**
     * Gets all the WAF policies in a subscription.
     * @param options The options parameters.
     */
    listAll(options?: WebApplicationFirewallPoliciesListAllOptionalParams): PagedAsyncIterableIterator<WebApplicationFirewallPolicy>;
    private listAllPagingPage;
    private listAllPagingAll;
    /**
     * Lists all of the protection policies within a resource group.
     * @param resourceGroupName The name of the resource group.
     * @param options The options parameters.
     */
    private _list;
    /**
     * Gets all the WAF policies in a subscription.
     * @param options The options parameters.
     */
    private _listAll;
    /**
     * Retrieve protection policy with specified name within a resource group.
     * @param resourceGroupName The name of the resource group.
     * @param policyName The name of the policy.
     * @param options The options parameters.
     */
    get(resourceGroupName: string, policyName: string, options?: WebApplicationFirewallPoliciesGetOptionalParams): Promise<WebApplicationFirewallPoliciesGetResponse>;
    /**
     * Creates or update policy with specified rule set name within a resource group.
     * @param resourceGroupName The name of the resource group.
     * @param policyName The name of the policy.
     * @param parameters Policy to be created.
     * @param options The options parameters.
     */
    createOrUpdate(resourceGroupName: string, policyName: string, parameters: WebApplicationFirewallPolicy, options?: WebApplicationFirewallPoliciesCreateOrUpdateOptionalParams): Promise<WebApplicationFirewallPoliciesCreateOrUpdateResponse>;
    /**
     * Deletes Policy.
     * @param resourceGroupName The name of the resource group.
     * @param policyName The name of the policy.
     * @param options The options parameters.
     */
    beginDelete(resourceGroupName: string, policyName: string, options?: WebApplicationFirewallPoliciesDeleteOptionalParams): Promise<SimplePollerLike<OperationState<void>, void>>;
    /**
     * Deletes Policy.
     * @param resourceGroupName The name of the resource group.
     * @param policyName The name of the policy.
     * @param options The options parameters.
     */
    beginDeleteAndWait(resourceGroupName: string, policyName: string, options?: WebApplicationFirewallPoliciesDeleteOptionalParams): Promise<void>;
    /**
     * ListNext
     * @param resourceGroupName The name of the resource group.
     * @param nextLink The nextLink from the previous successful call to the List method.
     * @param options The options parameters.
     */
    private _listNext;
    /**
     * ListAllNext
     * @param nextLink The nextLink from the previous successful call to the ListAll method.
     * @param options The options parameters.
     */
    private _listAllNext;
}
//# sourceMappingURL=webApplicationFirewallPolicies.d.ts.map