import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { LoadBalancerBackendAddressPools } from "../operationsInterfaces/index.js";
import { NetworkManagementClient } from "../networkManagementClient.js";
import { SimplePollerLike, OperationState } from "@azure/core-lro";
import { BackendAddressPool, LoadBalancerBackendAddressPoolsListOptionalParams, LoadBalancerBackendAddressPoolsGetOptionalParams, LoadBalancerBackendAddressPoolsGetResponse, LoadBalancerBackendAddressPoolsCreateOrUpdateOptionalParams, LoadBalancerBackendAddressPoolsCreateOrUpdateResponse, LoadBalancerBackendAddressPoolsDeleteOptionalParams } from "../models/index.js";
/** Class containing LoadBalancerBackendAddressPools operations. */
export declare class LoadBalancerBackendAddressPoolsImpl implements LoadBalancerBackendAddressPools {
    private readonly client;
    /**
     * Initialize a new instance of the class LoadBalancerBackendAddressPools class.
     * @param client Reference to the service client
     */
    constructor(client: NetworkManagementClient);
    /**
     * Gets all the load balancer backed address pools.
     * @param resourceGroupName The name of the resource group.
     * @param loadBalancerName The name of the load balancer.
     * @param options The options parameters.
     */
    list(resourceGroupName: string, loadBalancerName: string, options?: LoadBalancerBackendAddressPoolsListOptionalParams): PagedAsyncIterableIterator<BackendAddressPool>;
    private listPagingPage;
    private listPagingAll;
    /**
     * Gets all the load balancer backed address pools.
     * @param resourceGroupName The name of the resource group.
     * @param loadBalancerName The name of the load balancer.
     * @param options The options parameters.
     */
    private _list;
    /**
     * Gets load balancer backend address pool.
     * @param resourceGroupName The name of the resource group.
     * @param loadBalancerName The name of the load balancer.
     * @param backendAddressPoolName The name of the backend address pool.
     * @param options The options parameters.
     */
    get(resourceGroupName: string, loadBalancerName: string, backendAddressPoolName: string, options?: LoadBalancerBackendAddressPoolsGetOptionalParams): Promise<LoadBalancerBackendAddressPoolsGetResponse>;
    /**
     * Creates or updates a load balancer backend address pool.
     * @param resourceGroupName The name of the resource group.
     * @param loadBalancerName The name of the load balancer.
     * @param backendAddressPoolName The name of the backend address pool.
     * @param parameters Parameters supplied to the create or update load balancer backend address pool
     *                   operation.
     * @param options The options parameters.
     */
    beginCreateOrUpdate(resourceGroupName: string, loadBalancerName: string, backendAddressPoolName: string, parameters: BackendAddressPool, options?: LoadBalancerBackendAddressPoolsCreateOrUpdateOptionalParams): Promise<SimplePollerLike<OperationState<LoadBalancerBackendAddressPoolsCreateOrUpdateResponse>, LoadBalancerBackendAddressPoolsCreateOrUpdateResponse>>;
    /**
     * Creates or updates a load balancer backend address pool.
     * @param resourceGroupName The name of the resource group.
     * @param loadBalancerName The name of the load balancer.
     * @param backendAddressPoolName The name of the backend address pool.
     * @param parameters Parameters supplied to the create or update load balancer backend address pool
     *                   operation.
     * @param options The options parameters.
     */
    beginCreateOrUpdateAndWait(resourceGroupName: string, loadBalancerName: string, backendAddressPoolName: string, parameters: BackendAddressPool, options?: LoadBalancerBackendAddressPoolsCreateOrUpdateOptionalParams): Promise<LoadBalancerBackendAddressPoolsCreateOrUpdateResponse>;
    /**
     * Deletes the specified load balancer backend address pool.
     * @param resourceGroupName The name of the resource group.
     * @param loadBalancerName The name of the load balancer.
     * @param backendAddressPoolName The name of the backend address pool.
     * @param options The options parameters.
     */
    beginDelete(resourceGroupName: string, loadBalancerName: string, backendAddressPoolName: string, options?: LoadBalancerBackendAddressPoolsDeleteOptionalParams): Promise<SimplePollerLike<OperationState<void>, void>>;
    /**
     * Deletes the specified load balancer backend address pool.
     * @param resourceGroupName The name of the resource group.
     * @param loadBalancerName The name of the load balancer.
     * @param backendAddressPoolName The name of the backend address pool.
     * @param options The options parameters.
     */
    beginDeleteAndWait(resourceGroupName: string, loadBalancerName: string, backendAddressPoolName: string, options?: LoadBalancerBackendAddressPoolsDeleteOptionalParams): Promise<void>;
    /**
     * ListNext
     * @param resourceGroupName The name of the resource group.
     * @param loadBalancerName The name of the load balancer.
     * @param nextLink The nextLink from the previous successful call to the List method.
     * @param options The options parameters.
     */
    private _listNext;
}
//# sourceMappingURL=loadBalancerBackendAddressPools.d.ts.map