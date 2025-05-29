import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { LoadBalancerNetworkInterfaces } from "../operationsInterfaces/index.js";
import { NetworkManagementClient } from "../networkManagementClient.js";
import { NetworkInterface, LoadBalancerNetworkInterfacesListOptionalParams } from "../models/index.js";
/** Class containing LoadBalancerNetworkInterfaces operations. */
export declare class LoadBalancerNetworkInterfacesImpl implements LoadBalancerNetworkInterfaces {
    private readonly client;
    /**
     * Initialize a new instance of the class LoadBalancerNetworkInterfaces class.
     * @param client Reference to the service client
     */
    constructor(client: NetworkManagementClient);
    /**
     * Gets associated load balancer network interfaces.
     * @param resourceGroupName The name of the resource group.
     * @param loadBalancerName The name of the load balancer.
     * @param options The options parameters.
     */
    list(resourceGroupName: string, loadBalancerName: string, options?: LoadBalancerNetworkInterfacesListOptionalParams): PagedAsyncIterableIterator<NetworkInterface>;
    private listPagingPage;
    private listPagingAll;
    /**
     * Gets associated load balancer network interfaces.
     * @param resourceGroupName The name of the resource group.
     * @param loadBalancerName The name of the load balancer.
     * @param options The options parameters.
     */
    private _list;
    /**
     * ListNext
     * @param resourceGroupName The name of the resource group.
     * @param loadBalancerName The name of the load balancer.
     * @param nextLink The nextLink from the previous successful call to the List method.
     * @param options The options parameters.
     */
    private _listNext;
}
//# sourceMappingURL=loadBalancerNetworkInterfaces.d.ts.map