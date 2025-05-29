import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { LoadBalancers } from "../operationsInterfaces/index.js";
import { NetworkManagementClient } from "../networkManagementClient.js";
import { SimplePollerLike, OperationState } from "@azure/core-lro";
import { LoadBalancer, LoadBalancersListAllOptionalParams, LoadBalancersListOptionalParams, LoadBalancersDeleteOptionalParams, LoadBalancersGetOptionalParams, LoadBalancersGetResponse, LoadBalancersCreateOrUpdateOptionalParams, LoadBalancersCreateOrUpdateResponse, TagsObject, LoadBalancersUpdateTagsOptionalParams, LoadBalancersUpdateTagsResponse, LoadBalancerVipSwapRequest, LoadBalancersSwapPublicIpAddressesOptionalParams, QueryInboundNatRulePortMappingRequest, LoadBalancersListInboundNatRulePortMappingsOptionalParams, LoadBalancersListInboundNatRulePortMappingsResponse, LoadBalancersMigrateToIpBasedOptionalParams, LoadBalancersMigrateToIpBasedResponse } from "../models/index.js";
/** Class containing LoadBalancers operations. */
export declare class LoadBalancersImpl implements LoadBalancers {
    private readonly client;
    /**
     * Initialize a new instance of the class LoadBalancers class.
     * @param client Reference to the service client
     */
    constructor(client: NetworkManagementClient);
    /**
     * Gets all the load balancers in a subscription.
     * @param options The options parameters.
     */
    listAll(options?: LoadBalancersListAllOptionalParams): PagedAsyncIterableIterator<LoadBalancer>;
    private listAllPagingPage;
    private listAllPagingAll;
    /**
     * Gets all the load balancers in a resource group.
     * @param resourceGroupName The name of the resource group.
     * @param options The options parameters.
     */
    list(resourceGroupName: string, options?: LoadBalancersListOptionalParams): PagedAsyncIterableIterator<LoadBalancer>;
    private listPagingPage;
    private listPagingAll;
    /**
     * Deletes the specified load balancer.
     * @param resourceGroupName The name of the resource group.
     * @param loadBalancerName The name of the load balancer.
     * @param options The options parameters.
     */
    beginDelete(resourceGroupName: string, loadBalancerName: string, options?: LoadBalancersDeleteOptionalParams): Promise<SimplePollerLike<OperationState<void>, void>>;
    /**
     * Deletes the specified load balancer.
     * @param resourceGroupName The name of the resource group.
     * @param loadBalancerName The name of the load balancer.
     * @param options The options parameters.
     */
    beginDeleteAndWait(resourceGroupName: string, loadBalancerName: string, options?: LoadBalancersDeleteOptionalParams): Promise<void>;
    /**
     * Gets the specified load balancer.
     * @param resourceGroupName The name of the resource group.
     * @param loadBalancerName The name of the load balancer.
     * @param options The options parameters.
     */
    get(resourceGroupName: string, loadBalancerName: string, options?: LoadBalancersGetOptionalParams): Promise<LoadBalancersGetResponse>;
    /**
     * Creates or updates a load balancer.
     * @param resourceGroupName The name of the resource group.
     * @param loadBalancerName The name of the load balancer.
     * @param parameters Parameters supplied to the create or update load balancer operation.
     * @param options The options parameters.
     */
    beginCreateOrUpdate(resourceGroupName: string, loadBalancerName: string, parameters: LoadBalancer, options?: LoadBalancersCreateOrUpdateOptionalParams): Promise<SimplePollerLike<OperationState<LoadBalancersCreateOrUpdateResponse>, LoadBalancersCreateOrUpdateResponse>>;
    /**
     * Creates or updates a load balancer.
     * @param resourceGroupName The name of the resource group.
     * @param loadBalancerName The name of the load balancer.
     * @param parameters Parameters supplied to the create or update load balancer operation.
     * @param options The options parameters.
     */
    beginCreateOrUpdateAndWait(resourceGroupName: string, loadBalancerName: string, parameters: LoadBalancer, options?: LoadBalancersCreateOrUpdateOptionalParams): Promise<LoadBalancersCreateOrUpdateResponse>;
    /**
     * Updates a load balancer tags.
     * @param resourceGroupName The name of the resource group.
     * @param loadBalancerName The name of the load balancer.
     * @param parameters Parameters supplied to update load balancer tags.
     * @param options The options parameters.
     */
    updateTags(resourceGroupName: string, loadBalancerName: string, parameters: TagsObject, options?: LoadBalancersUpdateTagsOptionalParams): Promise<LoadBalancersUpdateTagsResponse>;
    /**
     * Gets all the load balancers in a subscription.
     * @param options The options parameters.
     */
    private _listAll;
    /**
     * Gets all the load balancers in a resource group.
     * @param resourceGroupName The name of the resource group.
     * @param options The options parameters.
     */
    private _list;
    /**
     * Swaps VIPs between two load balancers.
     * @param location The region where load balancers are located at.
     * @param parameters Parameters that define which VIPs should be swapped.
     * @param options The options parameters.
     */
    beginSwapPublicIpAddresses(location: string, parameters: LoadBalancerVipSwapRequest, options?: LoadBalancersSwapPublicIpAddressesOptionalParams): Promise<SimplePollerLike<OperationState<void>, void>>;
    /**
     * Swaps VIPs between two load balancers.
     * @param location The region where load balancers are located at.
     * @param parameters Parameters that define which VIPs should be swapped.
     * @param options The options parameters.
     */
    beginSwapPublicIpAddressesAndWait(location: string, parameters: LoadBalancerVipSwapRequest, options?: LoadBalancersSwapPublicIpAddressesOptionalParams): Promise<void>;
    /**
     * List of inbound NAT rule port mappings.
     * @param groupName The name of the resource group.
     * @param loadBalancerName The name of the load balancer.
     * @param backendPoolName The name of the load balancer backend address pool.
     * @param parameters Query inbound NAT rule port mapping request.
     * @param options The options parameters.
     */
    beginListInboundNatRulePortMappings(groupName: string, loadBalancerName: string, backendPoolName: string, parameters: QueryInboundNatRulePortMappingRequest, options?: LoadBalancersListInboundNatRulePortMappingsOptionalParams): Promise<SimplePollerLike<OperationState<LoadBalancersListInboundNatRulePortMappingsResponse>, LoadBalancersListInboundNatRulePortMappingsResponse>>;
    /**
     * List of inbound NAT rule port mappings.
     * @param groupName The name of the resource group.
     * @param loadBalancerName The name of the load balancer.
     * @param backendPoolName The name of the load balancer backend address pool.
     * @param parameters Query inbound NAT rule port mapping request.
     * @param options The options parameters.
     */
    beginListInboundNatRulePortMappingsAndWait(groupName: string, loadBalancerName: string, backendPoolName: string, parameters: QueryInboundNatRulePortMappingRequest, options?: LoadBalancersListInboundNatRulePortMappingsOptionalParams): Promise<LoadBalancersListInboundNatRulePortMappingsResponse>;
    /**
     * Migrate load balancer to IP Based
     * @param groupName The name of the resource group.
     * @param loadBalancerName The name of the load balancer.
     * @param options The options parameters.
     */
    migrateToIpBased(groupName: string, loadBalancerName: string, options?: LoadBalancersMigrateToIpBasedOptionalParams): Promise<LoadBalancersMigrateToIpBasedResponse>;
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
//# sourceMappingURL=loadBalancers.d.ts.map