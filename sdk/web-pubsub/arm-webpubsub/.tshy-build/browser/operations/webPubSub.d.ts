import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { WebPubSub } from "../operationsInterfaces/index.js";
import { WebPubSubManagementClient } from "../webPubSubManagementClient.js";
import { SimplePollerLike, OperationState } from "@azure/core-lro";
import { WebPubSubResource, WebPubSubListBySubscriptionOptionalParams, WebPubSubListByResourceGroupOptionalParams, NameAvailabilityParameters, WebPubSubCheckNameAvailabilityOptionalParams, WebPubSubCheckNameAvailabilityResponse, WebPubSubGetOptionalParams, WebPubSubGetResponse, WebPubSubCreateOrUpdateOptionalParams, WebPubSubCreateOrUpdateResponse, WebPubSubDeleteOptionalParams, WebPubSubUpdateOptionalParams, WebPubSubUpdateResponse, WebPubSubListKeysOptionalParams, WebPubSubListKeysResponse, RegenerateKeyParameters, WebPubSubRegenerateKeyOptionalParams, WebPubSubRegenerateKeyResponse, WebPubSubListReplicaSkusOptionalParams, WebPubSubListReplicaSkusResponse, WebPubSubRestartOptionalParams, WebPubSubRestartResponse, WebPubSubListSkusOptionalParams, WebPubSubListSkusResponse } from "../models/index.js";
/** Class containing WebPubSub operations. */
export declare class WebPubSubImpl implements WebPubSub {
    private readonly client;
    /**
     * Initialize a new instance of the class WebPubSub class.
     * @param client Reference to the service client
     */
    constructor(client: WebPubSubManagementClient);
    /**
     * Handles requests to list all resources in a subscription.
     * @param options The options parameters.
     */
    listBySubscription(options?: WebPubSubListBySubscriptionOptionalParams): PagedAsyncIterableIterator<WebPubSubResource>;
    private listBySubscriptionPagingPage;
    private listBySubscriptionPagingAll;
    /**
     * Handles requests to list all resources in a resource group.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param options The options parameters.
     */
    listByResourceGroup(resourceGroupName: string, options?: WebPubSubListByResourceGroupOptionalParams): PagedAsyncIterableIterator<WebPubSubResource>;
    private listByResourceGroupPagingPage;
    private listByResourceGroupPagingAll;
    /**
     * Checks that the resource name is valid and is not already in use.
     * @param location the region
     * @param parameters Parameters supplied to the operation.
     * @param options The options parameters.
     */
    checkNameAvailability(location: string, parameters: NameAvailabilityParameters, options?: WebPubSubCheckNameAvailabilityOptionalParams): Promise<WebPubSubCheckNameAvailabilityResponse>;
    /**
     * Handles requests to list all resources in a subscription.
     * @param options The options parameters.
     */
    private _listBySubscription;
    /**
     * Handles requests to list all resources in a resource group.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param options The options parameters.
     */
    private _listByResourceGroup;
    /**
     * Get the resource and its properties.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param resourceName The name of the resource.
     * @param options The options parameters.
     */
    get(resourceGroupName: string, resourceName: string, options?: WebPubSubGetOptionalParams): Promise<WebPubSubGetResponse>;
    /**
     * Create or update a resource.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param resourceName The name of the resource.
     * @param parameters Parameters for the create or update operation
     * @param options The options parameters.
     */
    beginCreateOrUpdate(resourceGroupName: string, resourceName: string, parameters: WebPubSubResource, options?: WebPubSubCreateOrUpdateOptionalParams): Promise<SimplePollerLike<OperationState<WebPubSubCreateOrUpdateResponse>, WebPubSubCreateOrUpdateResponse>>;
    /**
     * Create or update a resource.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param resourceName The name of the resource.
     * @param parameters Parameters for the create or update operation
     * @param options The options parameters.
     */
    beginCreateOrUpdateAndWait(resourceGroupName: string, resourceName: string, parameters: WebPubSubResource, options?: WebPubSubCreateOrUpdateOptionalParams): Promise<WebPubSubCreateOrUpdateResponse>;
    /**
     * Operation to delete a resource.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param resourceName The name of the resource.
     * @param options The options parameters.
     */
    beginDelete(resourceGroupName: string, resourceName: string, options?: WebPubSubDeleteOptionalParams): Promise<SimplePollerLike<OperationState<void>, void>>;
    /**
     * Operation to delete a resource.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param resourceName The name of the resource.
     * @param options The options parameters.
     */
    beginDeleteAndWait(resourceGroupName: string, resourceName: string, options?: WebPubSubDeleteOptionalParams): Promise<void>;
    /**
     * Operation to update an exiting resource.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param resourceName The name of the resource.
     * @param parameters Parameters for the update operation
     * @param options The options parameters.
     */
    beginUpdate(resourceGroupName: string, resourceName: string, parameters: WebPubSubResource, options?: WebPubSubUpdateOptionalParams): Promise<SimplePollerLike<OperationState<WebPubSubUpdateResponse>, WebPubSubUpdateResponse>>;
    /**
     * Operation to update an exiting resource.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param resourceName The name of the resource.
     * @param parameters Parameters for the update operation
     * @param options The options parameters.
     */
    beginUpdateAndWait(resourceGroupName: string, resourceName: string, parameters: WebPubSubResource, options?: WebPubSubUpdateOptionalParams): Promise<WebPubSubUpdateResponse>;
    /**
     * Get the access keys of the resource.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param resourceName The name of the resource.
     * @param options The options parameters.
     */
    listKeys(resourceGroupName: string, resourceName: string, options?: WebPubSubListKeysOptionalParams): Promise<WebPubSubListKeysResponse>;
    /**
     * Regenerate the access key for the resource. PrimaryKey and SecondaryKey cannot be regenerated at the
     * same time.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param resourceName The name of the resource.
     * @param parameters Parameter that describes the Regenerate Key Operation.
     * @param options The options parameters.
     */
    beginRegenerateKey(resourceGroupName: string, resourceName: string, parameters: RegenerateKeyParameters, options?: WebPubSubRegenerateKeyOptionalParams): Promise<SimplePollerLike<OperationState<WebPubSubRegenerateKeyResponse>, WebPubSubRegenerateKeyResponse>>;
    /**
     * Regenerate the access key for the resource. PrimaryKey and SecondaryKey cannot be regenerated at the
     * same time.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param resourceName The name of the resource.
     * @param parameters Parameter that describes the Regenerate Key Operation.
     * @param options The options parameters.
     */
    beginRegenerateKeyAndWait(resourceGroupName: string, resourceName: string, parameters: RegenerateKeyParameters, options?: WebPubSubRegenerateKeyOptionalParams): Promise<WebPubSubRegenerateKeyResponse>;
    /**
     * List all available skus of the replica resource.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param resourceName The name of the resource.
     * @param replicaName The name of the replica.
     * @param options The options parameters.
     */
    listReplicaSkus(resourceGroupName: string, resourceName: string, replicaName: string, options?: WebPubSubListReplicaSkusOptionalParams): Promise<WebPubSubListReplicaSkusResponse>;
    /**
     * Operation to restart a resource.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param resourceName The name of the resource.
     * @param options The options parameters.
     */
    beginRestart(resourceGroupName: string, resourceName: string, options?: WebPubSubRestartOptionalParams): Promise<SimplePollerLike<OperationState<WebPubSubRestartResponse>, WebPubSubRestartResponse>>;
    /**
     * Operation to restart a resource.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param resourceName The name of the resource.
     * @param options The options parameters.
     */
    beginRestartAndWait(resourceGroupName: string, resourceName: string, options?: WebPubSubRestartOptionalParams): Promise<WebPubSubRestartResponse>;
    /**
     * List all available skus of the resource.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param resourceName The name of the resource.
     * @param options The options parameters.
     */
    listSkus(resourceGroupName: string, resourceName: string, options?: WebPubSubListSkusOptionalParams): Promise<WebPubSubListSkusResponse>;
    /**
     * ListBySubscriptionNext
     * @param nextLink The nextLink from the previous successful call to the ListBySubscription method.
     * @param options The options parameters.
     */
    private _listBySubscriptionNext;
    /**
     * ListByResourceGroupNext
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param nextLink The nextLink from the previous successful call to the ListByResourceGroup method.
     * @param options The options parameters.
     */
    private _listByResourceGroupNext;
}
//# sourceMappingURL=webPubSub.d.ts.map