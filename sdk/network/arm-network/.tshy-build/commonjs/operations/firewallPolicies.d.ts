import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { FirewallPolicies } from "../operationsInterfaces/index.js";
import { NetworkManagementClient } from "../networkManagementClient.js";
import { SimplePollerLike, OperationState } from "@azure/core-lro";
import { FirewallPolicy, FirewallPoliciesListOptionalParams, FirewallPoliciesListAllOptionalParams, FirewallPoliciesDeleteOptionalParams, FirewallPoliciesGetOptionalParams, FirewallPoliciesGetResponse, FirewallPoliciesCreateOrUpdateOptionalParams, FirewallPoliciesCreateOrUpdateResponse, TagsObject, FirewallPoliciesUpdateTagsOptionalParams, FirewallPoliciesUpdateTagsResponse } from "../models/index.js";
/** Class containing FirewallPolicies operations. */
export declare class FirewallPoliciesImpl implements FirewallPolicies {
    private readonly client;
    /**
     * Initialize a new instance of the class FirewallPolicies class.
     * @param client Reference to the service client
     */
    constructor(client: NetworkManagementClient);
    /**
     * Lists all Firewall Policies in a resource group.
     * @param resourceGroupName The name of the resource group.
     * @param options The options parameters.
     */
    list(resourceGroupName: string, options?: FirewallPoliciesListOptionalParams): PagedAsyncIterableIterator<FirewallPolicy>;
    private listPagingPage;
    private listPagingAll;
    /**
     * Gets all the Firewall Policies in a subscription.
     * @param options The options parameters.
     */
    listAll(options?: FirewallPoliciesListAllOptionalParams): PagedAsyncIterableIterator<FirewallPolicy>;
    private listAllPagingPage;
    private listAllPagingAll;
    /**
     * Deletes the specified Firewall Policy.
     * @param resourceGroupName The name of the resource group.
     * @param firewallPolicyName The name of the Firewall Policy.
     * @param options The options parameters.
     */
    beginDelete(resourceGroupName: string, firewallPolicyName: string, options?: FirewallPoliciesDeleteOptionalParams): Promise<SimplePollerLike<OperationState<void>, void>>;
    /**
     * Deletes the specified Firewall Policy.
     * @param resourceGroupName The name of the resource group.
     * @param firewallPolicyName The name of the Firewall Policy.
     * @param options The options parameters.
     */
    beginDeleteAndWait(resourceGroupName: string, firewallPolicyName: string, options?: FirewallPoliciesDeleteOptionalParams): Promise<void>;
    /**
     * Gets the specified Firewall Policy.
     * @param resourceGroupName The name of the resource group.
     * @param firewallPolicyName The name of the Firewall Policy.
     * @param options The options parameters.
     */
    get(resourceGroupName: string, firewallPolicyName: string, options?: FirewallPoliciesGetOptionalParams): Promise<FirewallPoliciesGetResponse>;
    /**
     * Creates or updates the specified Firewall Policy.
     * @param resourceGroupName The name of the resource group.
     * @param firewallPolicyName The name of the Firewall Policy.
     * @param parameters Parameters supplied to the create or update Firewall Policy operation.
     * @param options The options parameters.
     */
    beginCreateOrUpdate(resourceGroupName: string, firewallPolicyName: string, parameters: FirewallPolicy, options?: FirewallPoliciesCreateOrUpdateOptionalParams): Promise<SimplePollerLike<OperationState<FirewallPoliciesCreateOrUpdateResponse>, FirewallPoliciesCreateOrUpdateResponse>>;
    /**
     * Creates or updates the specified Firewall Policy.
     * @param resourceGroupName The name of the resource group.
     * @param firewallPolicyName The name of the Firewall Policy.
     * @param parameters Parameters supplied to the create or update Firewall Policy operation.
     * @param options The options parameters.
     */
    beginCreateOrUpdateAndWait(resourceGroupName: string, firewallPolicyName: string, parameters: FirewallPolicy, options?: FirewallPoliciesCreateOrUpdateOptionalParams): Promise<FirewallPoliciesCreateOrUpdateResponse>;
    /**
     * Updates tags of a Azure Firewall Policy resource.
     * @param resourceGroupName The name of the resource group.
     * @param firewallPolicyName The name of the Firewall Policy.
     * @param parameters Parameters supplied to update Azure Firewall Policy tags.
     * @param options The options parameters.
     */
    updateTags(resourceGroupName: string, firewallPolicyName: string, parameters: TagsObject, options?: FirewallPoliciesUpdateTagsOptionalParams): Promise<FirewallPoliciesUpdateTagsResponse>;
    /**
     * Lists all Firewall Policies in a resource group.
     * @param resourceGroupName The name of the resource group.
     * @param options The options parameters.
     */
    private _list;
    /**
     * Gets all the Firewall Policies in a subscription.
     * @param options The options parameters.
     */
    private _listAll;
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
//# sourceMappingURL=firewallPolicies.d.ts.map