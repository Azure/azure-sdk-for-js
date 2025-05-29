import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { Subnets } from "../operationsInterfaces/index.js";
import { NetworkManagementClient } from "../networkManagementClient.js";
import { SimplePollerLike, OperationState } from "@azure/core-lro";
import { Subnet, SubnetsListOptionalParams, SubnetsDeleteOptionalParams, SubnetsGetOptionalParams, SubnetsGetResponse, SubnetsCreateOrUpdateOptionalParams, SubnetsCreateOrUpdateResponse, PrepareNetworkPoliciesRequest, SubnetsPrepareNetworkPoliciesOptionalParams, UnprepareNetworkPoliciesRequest, SubnetsUnprepareNetworkPoliciesOptionalParams } from "../models/index.js";
/** Class containing Subnets operations. */
export declare class SubnetsImpl implements Subnets {
    private readonly client;
    /**
     * Initialize a new instance of the class Subnets class.
     * @param client Reference to the service client
     */
    constructor(client: NetworkManagementClient);
    /**
     * Gets all subnets in a virtual network.
     * @param resourceGroupName The name of the resource group.
     * @param virtualNetworkName The name of the virtual network.
     * @param options The options parameters.
     */
    list(resourceGroupName: string, virtualNetworkName: string, options?: SubnetsListOptionalParams): PagedAsyncIterableIterator<Subnet>;
    private listPagingPage;
    private listPagingAll;
    /**
     * Deletes the specified subnet.
     * @param resourceGroupName The name of the resource group.
     * @param virtualNetworkName The name of the virtual network.
     * @param subnetName The name of the subnet.
     * @param options The options parameters.
     */
    beginDelete(resourceGroupName: string, virtualNetworkName: string, subnetName: string, options?: SubnetsDeleteOptionalParams): Promise<SimplePollerLike<OperationState<void>, void>>;
    /**
     * Deletes the specified subnet.
     * @param resourceGroupName The name of the resource group.
     * @param virtualNetworkName The name of the virtual network.
     * @param subnetName The name of the subnet.
     * @param options The options parameters.
     */
    beginDeleteAndWait(resourceGroupName: string, virtualNetworkName: string, subnetName: string, options?: SubnetsDeleteOptionalParams): Promise<void>;
    /**
     * Gets the specified subnet by virtual network and resource group.
     * @param resourceGroupName The name of the resource group.
     * @param virtualNetworkName The name of the virtual network.
     * @param subnetName The name of the subnet.
     * @param options The options parameters.
     */
    get(resourceGroupName: string, virtualNetworkName: string, subnetName: string, options?: SubnetsGetOptionalParams): Promise<SubnetsGetResponse>;
    /**
     * Creates or updates a subnet in the specified virtual network.
     * @param resourceGroupName The name of the resource group.
     * @param virtualNetworkName The name of the virtual network.
     * @param subnetName The name of the subnet.
     * @param subnetParameters Parameters supplied to the create or update subnet operation.
     * @param options The options parameters.
     */
    beginCreateOrUpdate(resourceGroupName: string, virtualNetworkName: string, subnetName: string, subnetParameters: Subnet, options?: SubnetsCreateOrUpdateOptionalParams): Promise<SimplePollerLike<OperationState<SubnetsCreateOrUpdateResponse>, SubnetsCreateOrUpdateResponse>>;
    /**
     * Creates or updates a subnet in the specified virtual network.
     * @param resourceGroupName The name of the resource group.
     * @param virtualNetworkName The name of the virtual network.
     * @param subnetName The name of the subnet.
     * @param subnetParameters Parameters supplied to the create or update subnet operation.
     * @param options The options parameters.
     */
    beginCreateOrUpdateAndWait(resourceGroupName: string, virtualNetworkName: string, subnetName: string, subnetParameters: Subnet, options?: SubnetsCreateOrUpdateOptionalParams): Promise<SubnetsCreateOrUpdateResponse>;
    /**
     * Prepares a subnet by applying network intent policies.
     * @param resourceGroupName The name of the resource group.
     * @param virtualNetworkName The name of the virtual network.
     * @param subnetName The name of the subnet.
     * @param prepareNetworkPoliciesRequestParameters Parameters supplied to prepare subnet by applying
     *                                                network intent policies.
     * @param options The options parameters.
     */
    beginPrepareNetworkPolicies(resourceGroupName: string, virtualNetworkName: string, subnetName: string, prepareNetworkPoliciesRequestParameters: PrepareNetworkPoliciesRequest, options?: SubnetsPrepareNetworkPoliciesOptionalParams): Promise<SimplePollerLike<OperationState<void>, void>>;
    /**
     * Prepares a subnet by applying network intent policies.
     * @param resourceGroupName The name of the resource group.
     * @param virtualNetworkName The name of the virtual network.
     * @param subnetName The name of the subnet.
     * @param prepareNetworkPoliciesRequestParameters Parameters supplied to prepare subnet by applying
     *                                                network intent policies.
     * @param options The options parameters.
     */
    beginPrepareNetworkPoliciesAndWait(resourceGroupName: string, virtualNetworkName: string, subnetName: string, prepareNetworkPoliciesRequestParameters: PrepareNetworkPoliciesRequest, options?: SubnetsPrepareNetworkPoliciesOptionalParams): Promise<void>;
    /**
     * Unprepares a subnet by removing network intent policies.
     * @param resourceGroupName The name of the resource group.
     * @param virtualNetworkName The name of the virtual network.
     * @param subnetName The name of the subnet.
     * @param unprepareNetworkPoliciesRequestParameters Parameters supplied to unprepare subnet to remove
     *                                                  network intent policies.
     * @param options The options parameters.
     */
    beginUnprepareNetworkPolicies(resourceGroupName: string, virtualNetworkName: string, subnetName: string, unprepareNetworkPoliciesRequestParameters: UnprepareNetworkPoliciesRequest, options?: SubnetsUnprepareNetworkPoliciesOptionalParams): Promise<SimplePollerLike<OperationState<void>, void>>;
    /**
     * Unprepares a subnet by removing network intent policies.
     * @param resourceGroupName The name of the resource group.
     * @param virtualNetworkName The name of the virtual network.
     * @param subnetName The name of the subnet.
     * @param unprepareNetworkPoliciesRequestParameters Parameters supplied to unprepare subnet to remove
     *                                                  network intent policies.
     * @param options The options parameters.
     */
    beginUnprepareNetworkPoliciesAndWait(resourceGroupName: string, virtualNetworkName: string, subnetName: string, unprepareNetworkPoliciesRequestParameters: UnprepareNetworkPoliciesRequest, options?: SubnetsUnprepareNetworkPoliciesOptionalParams): Promise<void>;
    /**
     * Gets all subnets in a virtual network.
     * @param resourceGroupName The name of the resource group.
     * @param virtualNetworkName The name of the virtual network.
     * @param options The options parameters.
     */
    private _list;
    /**
     * ListNext
     * @param resourceGroupName The name of the resource group.
     * @param virtualNetworkName The name of the virtual network.
     * @param nextLink The nextLink from the previous successful call to the List method.
     * @param options The options parameters.
     */
    private _listNext;
}
//# sourceMappingURL=subnets.d.ts.map