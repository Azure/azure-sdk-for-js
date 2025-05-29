import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { DedicatedCloudNodes } from "../operationsInterfaces/index.js";
import { VMwareCloudSimple } from "../vMwareCloudSimple.js";
import { PollerLike, PollOperationState } from "@azure/core-lro";
import { DedicatedCloudNode, DedicatedCloudNodesListBySubscriptionOptionalParams, DedicatedCloudNodesListByResourceGroupOptionalParams, DedicatedCloudNodesGetOptionalParams, DedicatedCloudNodesGetResponse, DedicatedCloudNodesCreateOrUpdateOptionalParams, DedicatedCloudNodesCreateOrUpdateResponse, DedicatedCloudNodesDeleteOptionalParams, PatchPayload, DedicatedCloudNodesUpdateOptionalParams, DedicatedCloudNodesUpdateResponse } from "../models/index.js";
/** Class containing DedicatedCloudNodes operations. */
export declare class DedicatedCloudNodesImpl implements DedicatedCloudNodes {
    private readonly client;
    /**
     * Initialize a new instance of the class DedicatedCloudNodes class.
     * @param client Reference to the service client
     */
    constructor(client: VMwareCloudSimple);
    /**
     * Returns list of dedicate cloud nodes within subscription
     * @param options The options parameters.
     */
    listBySubscription(options?: DedicatedCloudNodesListBySubscriptionOptionalParams): PagedAsyncIterableIterator<DedicatedCloudNode>;
    private listBySubscriptionPagingPage;
    private listBySubscriptionPagingAll;
    /**
     * Returns list of dedicate cloud nodes within resource group
     * @param resourceGroupName The name of the resource group
     * @param options The options parameters.
     */
    listByResourceGroup(resourceGroupName: string, options?: DedicatedCloudNodesListByResourceGroupOptionalParams): PagedAsyncIterableIterator<DedicatedCloudNode>;
    private listByResourceGroupPagingPage;
    private listByResourceGroupPagingAll;
    /**
     * Returns list of dedicate cloud nodes within subscription
     * @param options The options parameters.
     */
    private _listBySubscription;
    /**
     * Returns list of dedicate cloud nodes within resource group
     * @param resourceGroupName The name of the resource group
     * @param options The options parameters.
     */
    private _listByResourceGroup;
    /**
     * Returns dedicated cloud node
     * @param resourceGroupName The name of the resource group
     * @param dedicatedCloudNodeName dedicated cloud node name
     * @param options The options parameters.
     */
    get(resourceGroupName: string, dedicatedCloudNodeName: string, options?: DedicatedCloudNodesGetOptionalParams): Promise<DedicatedCloudNodesGetResponse>;
    /**
     * Returns dedicated cloud node by its name
     * @param resourceGroupName The name of the resource group
     * @param referer referer url
     * @param dedicatedCloudNodeName dedicated cloud node name
     * @param dedicatedCloudNodeRequest Create Dedicated Cloud Node request
     * @param options The options parameters.
     */
    beginCreateOrUpdate(resourceGroupName: string, referer: string, dedicatedCloudNodeName: string, dedicatedCloudNodeRequest: DedicatedCloudNode, options?: DedicatedCloudNodesCreateOrUpdateOptionalParams): Promise<PollerLike<PollOperationState<DedicatedCloudNodesCreateOrUpdateResponse>, DedicatedCloudNodesCreateOrUpdateResponse>>;
    /**
     * Returns dedicated cloud node by its name
     * @param resourceGroupName The name of the resource group
     * @param referer referer url
     * @param dedicatedCloudNodeName dedicated cloud node name
     * @param dedicatedCloudNodeRequest Create Dedicated Cloud Node request
     * @param options The options parameters.
     */
    beginCreateOrUpdateAndWait(resourceGroupName: string, referer: string, dedicatedCloudNodeName: string, dedicatedCloudNodeRequest: DedicatedCloudNode, options?: DedicatedCloudNodesCreateOrUpdateOptionalParams): Promise<DedicatedCloudNodesCreateOrUpdateResponse>;
    /**
     * Delete dedicated cloud node
     * @param resourceGroupName The name of the resource group
     * @param dedicatedCloudNodeName dedicated cloud node name
     * @param options The options parameters.
     */
    delete(resourceGroupName: string, dedicatedCloudNodeName: string, options?: DedicatedCloudNodesDeleteOptionalParams): Promise<void>;
    /**
     * Patches dedicated node properties
     * @param resourceGroupName The name of the resource group
     * @param dedicatedCloudNodeName dedicated cloud node name
     * @param dedicatedCloudNodeRequest Patch Dedicated Cloud Node request
     * @param options The options parameters.
     */
    update(resourceGroupName: string, dedicatedCloudNodeName: string, dedicatedCloudNodeRequest: PatchPayload, options?: DedicatedCloudNodesUpdateOptionalParams): Promise<DedicatedCloudNodesUpdateResponse>;
    /**
     * ListBySubscriptionNext
     * @param nextLink The nextLink from the previous successful call to the ListBySubscription method.
     * @param options The options parameters.
     */
    private _listBySubscriptionNext;
    /**
     * ListByResourceGroupNext
     * @param resourceGroupName The name of the resource group
     * @param nextLink The nextLink from the previous successful call to the ListByResourceGroup method.
     * @param options The options parameters.
     */
    private _listByResourceGroupNext;
}
//# sourceMappingURL=dedicatedCloudNodes.d.ts.map