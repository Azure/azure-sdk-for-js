import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { NetworkInterfaceLoadBalancers } from "../operationsInterfaces/index.js";
import { NetworkManagementClient } from "../networkManagementClient.js";
import { LoadBalancer, NetworkInterfaceLoadBalancersListOptionalParams } from "../models/index.js";
/** Class containing NetworkInterfaceLoadBalancers operations. */
export declare class NetworkInterfaceLoadBalancersImpl implements NetworkInterfaceLoadBalancers {
    private readonly client;
    /**
     * Initialize a new instance of the class NetworkInterfaceLoadBalancers class.
     * @param client Reference to the service client
     */
    constructor(client: NetworkManagementClient);
    /**
     * List all load balancers in a network interface.
     * @param resourceGroupName The name of the resource group.
     * @param networkInterfaceName The name of the network interface.
     * @param options The options parameters.
     */
    list(resourceGroupName: string, networkInterfaceName: string, options?: NetworkInterfaceLoadBalancersListOptionalParams): PagedAsyncIterableIterator<LoadBalancer>;
    private listPagingPage;
    private listPagingAll;
    /**
     * List all load balancers in a network interface.
     * @param resourceGroupName The name of the resource group.
     * @param networkInterfaceName The name of the network interface.
     * @param options The options parameters.
     */
    private _list;
    /**
     * ListNext
     * @param resourceGroupName The name of the resource group.
     * @param networkInterfaceName The name of the network interface.
     * @param nextLink The nextLink from the previous successful call to the List method.
     * @param options The options parameters.
     */
    private _listNext;
}
//# sourceMappingURL=networkInterfaceLoadBalancers.d.ts.map