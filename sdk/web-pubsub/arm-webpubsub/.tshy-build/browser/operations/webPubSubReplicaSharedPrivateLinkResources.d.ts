import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { WebPubSubReplicaSharedPrivateLinkResources } from "../operationsInterfaces/index.js";
import { WebPubSubManagementClient } from "../webPubSubManagementClient.js";
import { SimplePollerLike, OperationState } from "@azure/core-lro";
import { SharedPrivateLinkResource, WebPubSubReplicaSharedPrivateLinkResourcesListOptionalParams, WebPubSubReplicaSharedPrivateLinkResourcesGetOptionalParams, WebPubSubReplicaSharedPrivateLinkResourcesGetResponse, WebPubSubReplicaSharedPrivateLinkResourcesCreateOrUpdateOptionalParams, WebPubSubReplicaSharedPrivateLinkResourcesCreateOrUpdateResponse } from "../models/index.js";
/** Class containing WebPubSubReplicaSharedPrivateLinkResources operations. */
export declare class WebPubSubReplicaSharedPrivateLinkResourcesImpl implements WebPubSubReplicaSharedPrivateLinkResources {
    private readonly client;
    /**
     * Initialize a new instance of the class WebPubSubReplicaSharedPrivateLinkResources class.
     * @param client Reference to the service client
     */
    constructor(client: WebPubSubManagementClient);
    /**
     * List shared private link resources
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param resourceName The name of the resource.
     * @param replicaName The name of the replica.
     * @param options The options parameters.
     */
    list(resourceGroupName: string, resourceName: string, replicaName: string, options?: WebPubSubReplicaSharedPrivateLinkResourcesListOptionalParams): PagedAsyncIterableIterator<SharedPrivateLinkResource>;
    private listPagingPage;
    private listPagingAll;
    /**
     * List shared private link resources
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param resourceName The name of the resource.
     * @param replicaName The name of the replica.
     * @param options The options parameters.
     */
    private _list;
    /**
     * Get the specified shared private link resource
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param resourceName The name of the resource.
     * @param replicaName The name of the replica.
     * @param sharedPrivateLinkResourceName The name of the shared private link resource.
     * @param options The options parameters.
     */
    get(resourceGroupName: string, resourceName: string, replicaName: string, sharedPrivateLinkResourceName: string, options?: WebPubSubReplicaSharedPrivateLinkResourcesGetOptionalParams): Promise<WebPubSubReplicaSharedPrivateLinkResourcesGetResponse>;
    /**
     * Create or update a shared private link resource
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param resourceName The name of the resource.
     * @param replicaName The name of the replica.
     * @param sharedPrivateLinkResourceName The name of the shared private link resource.
     * @param parameters The shared private link resource
     * @param options The options parameters.
     */
    beginCreateOrUpdate(resourceGroupName: string, resourceName: string, replicaName: string, sharedPrivateLinkResourceName: string, parameters: SharedPrivateLinkResource, options?: WebPubSubReplicaSharedPrivateLinkResourcesCreateOrUpdateOptionalParams): Promise<SimplePollerLike<OperationState<WebPubSubReplicaSharedPrivateLinkResourcesCreateOrUpdateResponse>, WebPubSubReplicaSharedPrivateLinkResourcesCreateOrUpdateResponse>>;
    /**
     * Create or update a shared private link resource
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param resourceName The name of the resource.
     * @param replicaName The name of the replica.
     * @param sharedPrivateLinkResourceName The name of the shared private link resource.
     * @param parameters The shared private link resource
     * @param options The options parameters.
     */
    beginCreateOrUpdateAndWait(resourceGroupName: string, resourceName: string, replicaName: string, sharedPrivateLinkResourceName: string, parameters: SharedPrivateLinkResource, options?: WebPubSubReplicaSharedPrivateLinkResourcesCreateOrUpdateOptionalParams): Promise<WebPubSubReplicaSharedPrivateLinkResourcesCreateOrUpdateResponse>;
    /**
     * ListNext
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param resourceName The name of the resource.
     * @param replicaName The name of the replica.
     * @param nextLink The nextLink from the previous successful call to the List method.
     * @param options The options parameters.
     */
    private _listNext;
}
//# sourceMappingURL=webPubSubReplicaSharedPrivateLinkResources.d.ts.map