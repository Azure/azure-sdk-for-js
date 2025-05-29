import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { LoadBalancer, NetworkInterfaceLoadBalancersListOptionalParams } from "../models/index.js";
/** Interface representing a NetworkInterfaceLoadBalancers. */
export interface NetworkInterfaceLoadBalancers {
    /**
     * List all load balancers in a network interface.
     * @param resourceGroupName The name of the resource group.
     * @param networkInterfaceName The name of the network interface.
     * @param options The options parameters.
     */
    list(resourceGroupName: string, networkInterfaceName: string, options?: NetworkInterfaceLoadBalancersListOptionalParams): PagedAsyncIterableIterator<LoadBalancer>;
}
//# sourceMappingURL=networkInterfaceLoadBalancers.d.ts.map