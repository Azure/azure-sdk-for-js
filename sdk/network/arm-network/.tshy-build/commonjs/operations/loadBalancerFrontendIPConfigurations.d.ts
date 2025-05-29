import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { LoadBalancerFrontendIPConfigurations } from "../operationsInterfaces/index.js";
import { NetworkManagementClient } from "../networkManagementClient.js";
import { FrontendIPConfiguration, LoadBalancerFrontendIPConfigurationsListOptionalParams, LoadBalancerFrontendIPConfigurationsGetOptionalParams, LoadBalancerFrontendIPConfigurationsGetResponse } from "../models/index.js";
/** Class containing LoadBalancerFrontendIPConfigurations operations. */
export declare class LoadBalancerFrontendIPConfigurationsImpl implements LoadBalancerFrontendIPConfigurations {
    private readonly client;
    /**
     * Initialize a new instance of the class LoadBalancerFrontendIPConfigurations class.
     * @param client Reference to the service client
     */
    constructor(client: NetworkManagementClient);
    /**
     * Gets all the load balancer frontend IP configurations.
     * @param resourceGroupName The name of the resource group.
     * @param loadBalancerName The name of the load balancer.
     * @param options The options parameters.
     */
    list(resourceGroupName: string, loadBalancerName: string, options?: LoadBalancerFrontendIPConfigurationsListOptionalParams): PagedAsyncIterableIterator<FrontendIPConfiguration>;
    private listPagingPage;
    private listPagingAll;
    /**
     * Gets all the load balancer frontend IP configurations.
     * @param resourceGroupName The name of the resource group.
     * @param loadBalancerName The name of the load balancer.
     * @param options The options parameters.
     */
    private _list;
    /**
     * Gets load balancer frontend IP configuration.
     * @param resourceGroupName The name of the resource group.
     * @param loadBalancerName The name of the load balancer.
     * @param frontendIPConfigurationName The name of the frontend IP configuration.
     * @param options The options parameters.
     */
    get(resourceGroupName: string, loadBalancerName: string, frontendIPConfigurationName: string, options?: LoadBalancerFrontendIPConfigurationsGetOptionalParams): Promise<LoadBalancerFrontendIPConfigurationsGetResponse>;
    /**
     * ListNext
     * @param resourceGroupName The name of the resource group.
     * @param loadBalancerName The name of the load balancer.
     * @param nextLink The nextLink from the previous successful call to the List method.
     * @param options The options parameters.
     */
    private _listNext;
}
//# sourceMappingURL=loadBalancerFrontendIPConfigurations.d.ts.map