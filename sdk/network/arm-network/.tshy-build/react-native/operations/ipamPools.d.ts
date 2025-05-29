import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { IpamPools } from "../operationsInterfaces/index.js";
import { NetworkManagementClient } from "../networkManagementClient.js";
import { SimplePollerLike, OperationState } from "@azure/core-lro";
import { IpamPool, IpamPoolsListOptionalParams, PoolAssociation, IpamPoolsListAssociatedResourcesOptionalParams, IpamPoolsCreateOptionalParams, IpamPoolsCreateResponse, IpamPoolsUpdateOptionalParams, IpamPoolsUpdateResponse, IpamPoolsGetOptionalParams, IpamPoolsGetResponse, IpamPoolsDeleteOptionalParams, IpamPoolsDeleteResponse, IpamPoolsGetPoolUsageOptionalParams, IpamPoolsGetPoolUsageResponse } from "../models/index.js";
/** Class containing IpamPools operations. */
export declare class IpamPoolsImpl implements IpamPools {
    private readonly client;
    /**
     * Initialize a new instance of the class IpamPools class.
     * @param client Reference to the service client
     */
    constructor(client: NetworkManagementClient);
    /**
     * Gets list of Pool resources at Network Manager level.
     * @param resourceGroupName The name of the resource group.
     * @param networkManagerName The name of the network manager.
     * @param options The options parameters.
     */
    list(resourceGroupName: string, networkManagerName: string, options?: IpamPoolsListOptionalParams): PagedAsyncIterableIterator<IpamPool>;
    private listPagingPage;
    private listPagingAll;
    /**
     * List Associated Resource in the Pool.
     * @param resourceGroupName The name of the resource group.
     * @param networkManagerName The name of the network manager.
     * @param poolName Pool resource name.
     * @param options The options parameters.
     */
    listAssociatedResources(resourceGroupName: string, networkManagerName: string, poolName: string, options?: IpamPoolsListAssociatedResourcesOptionalParams): PagedAsyncIterableIterator<PoolAssociation>;
    private listAssociatedResourcesPagingPage;
    private listAssociatedResourcesPagingAll;
    /**
     * Gets list of Pool resources at Network Manager level.
     * @param resourceGroupName The name of the resource group.
     * @param networkManagerName The name of the network manager.
     * @param options The options parameters.
     */
    private _list;
    /**
     * Creates/Updates the Pool resource.
     * @param resourceGroupName The name of the resource group.
     * @param networkManagerName The name of the network manager.
     * @param poolName IP Address Manager Pool resource name.
     * @param body Pool resource object to create/update.
     * @param options The options parameters.
     */
    beginCreate(resourceGroupName: string, networkManagerName: string, poolName: string, body: IpamPool, options?: IpamPoolsCreateOptionalParams): Promise<SimplePollerLike<OperationState<IpamPoolsCreateResponse>, IpamPoolsCreateResponse>>;
    /**
     * Creates/Updates the Pool resource.
     * @param resourceGroupName The name of the resource group.
     * @param networkManagerName The name of the network manager.
     * @param poolName IP Address Manager Pool resource name.
     * @param body Pool resource object to create/update.
     * @param options The options parameters.
     */
    beginCreateAndWait(resourceGroupName: string, networkManagerName: string, poolName: string, body: IpamPool, options?: IpamPoolsCreateOptionalParams): Promise<IpamPoolsCreateResponse>;
    /**
     * Updates the specific Pool resource.
     * @param resourceGroupName The name of the resource group.
     * @param networkManagerName The name of the network manager.
     * @param poolName IP Address Manager Pool resource name.
     * @param options The options parameters.
     */
    update(resourceGroupName: string, networkManagerName: string, poolName: string, options?: IpamPoolsUpdateOptionalParams): Promise<IpamPoolsUpdateResponse>;
    /**
     * Gets the specific Pool resource.
     * @param resourceGroupName The name of the resource group.
     * @param networkManagerName The name of the network manager.
     * @param poolName Pool resource name.
     * @param options The options parameters.
     */
    get(resourceGroupName: string, networkManagerName: string, poolName: string, options?: IpamPoolsGetOptionalParams): Promise<IpamPoolsGetResponse>;
    /**
     * Delete the Pool resource.
     * @param resourceGroupName The name of the resource group.
     * @param networkManagerName The name of the network manager.
     * @param poolName Pool resource name.
     * @param options The options parameters.
     */
    beginDelete(resourceGroupName: string, networkManagerName: string, poolName: string, options?: IpamPoolsDeleteOptionalParams): Promise<SimplePollerLike<OperationState<IpamPoolsDeleteResponse>, IpamPoolsDeleteResponse>>;
    /**
     * Delete the Pool resource.
     * @param resourceGroupName The name of the resource group.
     * @param networkManagerName The name of the network manager.
     * @param poolName Pool resource name.
     * @param options The options parameters.
     */
    beginDeleteAndWait(resourceGroupName: string, networkManagerName: string, poolName: string, options?: IpamPoolsDeleteOptionalParams): Promise<IpamPoolsDeleteResponse>;
    /**
     * Get the Pool Usage.
     * @param resourceGroupName The name of the resource group.
     * @param networkManagerName The name of the network manager.
     * @param poolName Pool resource name.
     * @param options The options parameters.
     */
    getPoolUsage(resourceGroupName: string, networkManagerName: string, poolName: string, options?: IpamPoolsGetPoolUsageOptionalParams): Promise<IpamPoolsGetPoolUsageResponse>;
    /**
     * List Associated Resource in the Pool.
     * @param resourceGroupName The name of the resource group.
     * @param networkManagerName The name of the network manager.
     * @param poolName Pool resource name.
     * @param options The options parameters.
     */
    private _listAssociatedResources;
    /**
     * ListNext
     * @param resourceGroupName The name of the resource group.
     * @param networkManagerName The name of the network manager.
     * @param nextLink The nextLink from the previous successful call to the List method.
     * @param options The options parameters.
     */
    private _listNext;
    /**
     * ListAssociatedResourcesNext
     * @param resourceGroupName The name of the resource group.
     * @param networkManagerName The name of the network manager.
     * @param poolName Pool resource name.
     * @param nextLink The nextLink from the previous successful call to the ListAssociatedResources
     *                 method.
     * @param options The options parameters.
     */
    private _listAssociatedResourcesNext;
}
//# sourceMappingURL=ipamPools.d.ts.map