import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { WebPubSubReplicas } from "../operationsInterfaces/index.js";
import { WebPubSubManagementClient } from "../webPubSubManagementClient.js";
import { SimplePollerLike, OperationState } from "@azure/core-lro";
import { Replica, WebPubSubReplicasListOptionalParams, WebPubSubReplicasGetOptionalParams, WebPubSubReplicasGetResponse, WebPubSubReplicasCreateOrUpdateOptionalParams, WebPubSubReplicasCreateOrUpdateResponse, WebPubSubReplicasDeleteOptionalParams, WebPubSubReplicasUpdateOptionalParams, WebPubSubReplicasUpdateResponse, WebPubSubReplicasRestartOptionalParams, WebPubSubReplicasRestartResponse } from "../models/index.js";
/** Class containing WebPubSubReplicas operations. */
export declare class WebPubSubReplicasImpl implements WebPubSubReplicas {
    private readonly client;
    /**
     * Initialize a new instance of the class WebPubSubReplicas class.
     * @param client Reference to the service client
     */
    constructor(client: WebPubSubManagementClient);
    /**
     * List all replicas belong to this resource
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param resourceName The name of the resource.
     * @param options The options parameters.
     */
    list(resourceGroupName: string, resourceName: string, options?: WebPubSubReplicasListOptionalParams): PagedAsyncIterableIterator<Replica>;
    private listPagingPage;
    private listPagingAll;
    /**
     * List all replicas belong to this resource
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param resourceName The name of the resource.
     * @param options The options parameters.
     */
    private _list;
    /**
     * Get the replica and its properties.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param resourceName The name of the resource.
     * @param replicaName The name of the replica.
     * @param options The options parameters.
     */
    get(resourceGroupName: string, resourceName: string, replicaName: string, options?: WebPubSubReplicasGetOptionalParams): Promise<WebPubSubReplicasGetResponse>;
    /**
     * Create or update a replica.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param resourceName The name of the resource.
     * @param replicaName The name of the replica.
     * @param parameters Parameters for the create or update operation
     * @param options The options parameters.
     */
    beginCreateOrUpdate(resourceGroupName: string, resourceName: string, replicaName: string, parameters: Replica, options?: WebPubSubReplicasCreateOrUpdateOptionalParams): Promise<SimplePollerLike<OperationState<WebPubSubReplicasCreateOrUpdateResponse>, WebPubSubReplicasCreateOrUpdateResponse>>;
    /**
     * Create or update a replica.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param resourceName The name of the resource.
     * @param replicaName The name of the replica.
     * @param parameters Parameters for the create or update operation
     * @param options The options parameters.
     */
    beginCreateOrUpdateAndWait(resourceGroupName: string, resourceName: string, replicaName: string, parameters: Replica, options?: WebPubSubReplicasCreateOrUpdateOptionalParams): Promise<WebPubSubReplicasCreateOrUpdateResponse>;
    /**
     * Operation to delete a replica.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param resourceName The name of the resource.
     * @param replicaName The name of the replica.
     * @param options The options parameters.
     */
    delete(resourceGroupName: string, resourceName: string, replicaName: string, options?: WebPubSubReplicasDeleteOptionalParams): Promise<void>;
    /**
     * Operation to update an exiting replica.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param resourceName The name of the resource.
     * @param replicaName The name of the replica.
     * @param parameters Parameters for the update operation
     * @param options The options parameters.
     */
    beginUpdate(resourceGroupName: string, resourceName: string, replicaName: string, parameters: Replica, options?: WebPubSubReplicasUpdateOptionalParams): Promise<SimplePollerLike<OperationState<WebPubSubReplicasUpdateResponse>, WebPubSubReplicasUpdateResponse>>;
    /**
     * Operation to update an exiting replica.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param resourceName The name of the resource.
     * @param replicaName The name of the replica.
     * @param parameters Parameters for the update operation
     * @param options The options parameters.
     */
    beginUpdateAndWait(resourceGroupName: string, resourceName: string, replicaName: string, parameters: Replica, options?: WebPubSubReplicasUpdateOptionalParams): Promise<WebPubSubReplicasUpdateResponse>;
    /**
     * Operation to restart a replica.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param resourceName The name of the resource.
     * @param replicaName The name of the replica.
     * @param options The options parameters.
     */
    beginRestart(resourceGroupName: string, resourceName: string, replicaName: string, options?: WebPubSubReplicasRestartOptionalParams): Promise<SimplePollerLike<OperationState<WebPubSubReplicasRestartResponse>, WebPubSubReplicasRestartResponse>>;
    /**
     * Operation to restart a replica.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param resourceName The name of the resource.
     * @param replicaName The name of the replica.
     * @param options The options parameters.
     */
    beginRestartAndWait(resourceGroupName: string, resourceName: string, replicaName: string, options?: WebPubSubReplicasRestartOptionalParams): Promise<WebPubSubReplicasRestartResponse>;
    /**
     * ListNext
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param resourceName The name of the resource.
     * @param nextLink The nextLink from the previous successful call to the List method.
     * @param options The options parameters.
     */
    private _listNext;
}
//# sourceMappingURL=webPubSubReplicas.d.ts.map