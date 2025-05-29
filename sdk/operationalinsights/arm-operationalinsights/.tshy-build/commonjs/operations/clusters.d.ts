import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { Clusters } from "../operationsInterfaces/index.js";
import { OperationalInsightsManagementClient } from "../operationalInsightsManagementClient.js";
import { PollerLike, PollOperationState } from "@azure/core-lro";
import { Cluster, ClustersListByResourceGroupOptionalParams, ClustersListOptionalParams, ClustersCreateOrUpdateOptionalParams, ClustersCreateOrUpdateResponse, ClustersDeleteOptionalParams, ClustersGetOptionalParams, ClustersGetResponse, ClusterPatch, ClustersUpdateOptionalParams, ClustersUpdateResponse } from "../models/index.js";
/** Class containing Clusters operations. */
export declare class ClustersImpl implements Clusters {
    private readonly client;
    /**
     * Initialize a new instance of the class Clusters class.
     * @param client Reference to the service client
     */
    constructor(client: OperationalInsightsManagementClient);
    /**
     * Gets Log Analytics clusters in a resource group.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param options The options parameters.
     */
    listByResourceGroup(resourceGroupName: string, options?: ClustersListByResourceGroupOptionalParams): PagedAsyncIterableIterator<Cluster>;
    private listByResourceGroupPagingPage;
    private listByResourceGroupPagingAll;
    /**
     * Gets the Log Analytics clusters in a subscription.
     * @param options The options parameters.
     */
    list(options?: ClustersListOptionalParams): PagedAsyncIterableIterator<Cluster>;
    private listPagingPage;
    private listPagingAll;
    /**
     * Gets Log Analytics clusters in a resource group.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param options The options parameters.
     */
    private _listByResourceGroup;
    /**
     * Gets the Log Analytics clusters in a subscription.
     * @param options The options parameters.
     */
    private _list;
    /**
     * Create or update a Log Analytics cluster.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param clusterName The name of the Log Analytics cluster.
     * @param parameters The parameters required to create or update a Log Analytics cluster.
     * @param options The options parameters.
     */
    beginCreateOrUpdate(resourceGroupName: string, clusterName: string, parameters: Cluster, options?: ClustersCreateOrUpdateOptionalParams): Promise<PollerLike<PollOperationState<ClustersCreateOrUpdateResponse>, ClustersCreateOrUpdateResponse>>;
    /**
     * Create or update a Log Analytics cluster.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param clusterName The name of the Log Analytics cluster.
     * @param parameters The parameters required to create or update a Log Analytics cluster.
     * @param options The options parameters.
     */
    beginCreateOrUpdateAndWait(resourceGroupName: string, clusterName: string, parameters: Cluster, options?: ClustersCreateOrUpdateOptionalParams): Promise<ClustersCreateOrUpdateResponse>;
    /**
     * Deletes a cluster instance.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param clusterName Name of the Log Analytics Cluster.
     * @param options The options parameters.
     */
    beginDelete(resourceGroupName: string, clusterName: string, options?: ClustersDeleteOptionalParams): Promise<PollerLike<PollOperationState<void>, void>>;
    /**
     * Deletes a cluster instance.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param clusterName Name of the Log Analytics Cluster.
     * @param options The options parameters.
     */
    beginDeleteAndWait(resourceGroupName: string, clusterName: string, options?: ClustersDeleteOptionalParams): Promise<void>;
    /**
     * Gets a Log Analytics cluster instance.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param clusterName Name of the Log Analytics Cluster.
     * @param options The options parameters.
     */
    get(resourceGroupName: string, clusterName: string, options?: ClustersGetOptionalParams): Promise<ClustersGetResponse>;
    /**
     * Updates a Log Analytics cluster.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param clusterName Name of the Log Analytics Cluster.
     * @param parameters The parameters required to patch a Log Analytics cluster.
     * @param options The options parameters.
     */
    beginUpdate(resourceGroupName: string, clusterName: string, parameters: ClusterPatch, options?: ClustersUpdateOptionalParams): Promise<PollerLike<PollOperationState<ClustersUpdateResponse>, ClustersUpdateResponse>>;
    /**
     * Updates a Log Analytics cluster.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param clusterName Name of the Log Analytics Cluster.
     * @param parameters The parameters required to patch a Log Analytics cluster.
     * @param options The options parameters.
     */
    beginUpdateAndWait(resourceGroupName: string, clusterName: string, parameters: ClusterPatch, options?: ClustersUpdateOptionalParams): Promise<ClustersUpdateResponse>;
    /**
     * ListByResourceGroupNext
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param nextLink The nextLink from the previous successful call to the ListByResourceGroup method.
     * @param options The options parameters.
     */
    private _listByResourceGroupNext;
    /**
     * ListNext
     * @param nextLink The nextLink from the previous successful call to the List method.
     * @param options The options parameters.
     */
    private _listNext;
}
//# sourceMappingURL=clusters.d.ts.map