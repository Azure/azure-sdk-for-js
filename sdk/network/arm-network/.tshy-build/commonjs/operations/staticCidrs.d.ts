import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { StaticCidrs } from "../operationsInterfaces/index.js";
import { NetworkManagementClient } from "../networkManagementClient.js";
import { SimplePollerLike, OperationState } from "@azure/core-lro";
import { StaticCidr, StaticCidrsListOptionalParams, StaticCidrsCreateOptionalParams, StaticCidrsCreateResponse, StaticCidrsGetOptionalParams, StaticCidrsGetResponse, StaticCidrsDeleteOptionalParams, StaticCidrsDeleteResponse } from "../models/index.js";
/** Class containing StaticCidrs operations. */
export declare class StaticCidrsImpl implements StaticCidrs {
    private readonly client;
    /**
     * Initialize a new instance of the class StaticCidrs class.
     * @param client Reference to the service client
     */
    constructor(client: NetworkManagementClient);
    /**
     * Gets list of Static CIDR resources at Network Manager level.
     * @param resourceGroupName The name of the resource group.
     * @param networkManagerName The name of the network manager.
     * @param poolName Pool resource name.
     * @param options The options parameters.
     */
    list(resourceGroupName: string, networkManagerName: string, poolName: string, options?: StaticCidrsListOptionalParams): PagedAsyncIterableIterator<StaticCidr>;
    private listPagingPage;
    private listPagingAll;
    /**
     * Gets list of Static CIDR resources at Network Manager level.
     * @param resourceGroupName The name of the resource group.
     * @param networkManagerName The name of the network manager.
     * @param poolName Pool resource name.
     * @param options The options parameters.
     */
    private _list;
    /**
     * Creates/Updates the Static CIDR resource.
     * @param resourceGroupName The name of the resource group.
     * @param networkManagerName The name of the network manager.
     * @param poolName IP Address Manager Pool resource name.
     * @param staticCidrName Static Cidr allocation name.
     * @param options The options parameters.
     */
    create(resourceGroupName: string, networkManagerName: string, poolName: string, staticCidrName: string, options?: StaticCidrsCreateOptionalParams): Promise<StaticCidrsCreateResponse>;
    /**
     * Gets the specific Static CIDR resource.
     * @param resourceGroupName The name of the resource group.
     * @param networkManagerName The name of the network manager.
     * @param poolName Pool resource name.
     * @param staticCidrName StaticCidr resource name to retrieve.
     * @param options The options parameters.
     */
    get(resourceGroupName: string, networkManagerName: string, poolName: string, staticCidrName: string, options?: StaticCidrsGetOptionalParams): Promise<StaticCidrsGetResponse>;
    /**
     * Delete the Static CIDR resource.
     * @param resourceGroupName The name of the resource group.
     * @param networkManagerName The name of the network manager.
     * @param poolName Pool resource name.
     * @param staticCidrName StaticCidr resource name to delete.
     * @param options The options parameters.
     */
    beginDelete(resourceGroupName: string, networkManagerName: string, poolName: string, staticCidrName: string, options?: StaticCidrsDeleteOptionalParams): Promise<SimplePollerLike<OperationState<StaticCidrsDeleteResponse>, StaticCidrsDeleteResponse>>;
    /**
     * Delete the Static CIDR resource.
     * @param resourceGroupName The name of the resource group.
     * @param networkManagerName The name of the network manager.
     * @param poolName Pool resource name.
     * @param staticCidrName StaticCidr resource name to delete.
     * @param options The options parameters.
     */
    beginDeleteAndWait(resourceGroupName: string, networkManagerName: string, poolName: string, staticCidrName: string, options?: StaticCidrsDeleteOptionalParams): Promise<StaticCidrsDeleteResponse>;
    /**
     * ListNext
     * @param resourceGroupName The name of the resource group.
     * @param networkManagerName The name of the network manager.
     * @param poolName Pool resource name.
     * @param nextLink The nextLink from the previous successful call to the List method.
     * @param options The options parameters.
     */
    private _listNext;
}
//# sourceMappingURL=staticCidrs.d.ts.map