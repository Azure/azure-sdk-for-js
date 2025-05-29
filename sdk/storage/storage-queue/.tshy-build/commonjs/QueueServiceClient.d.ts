import type { TokenCredential } from "@azure/core-auth";
import type { QueueCreateResponse, QueueDeleteResponse, QueueItem, QueueServiceProperties, ServiceGetPropertiesResponse, ServiceGetStatisticsResponse, ServiceListQueuesSegmentResponse, ServiceSetPropertiesResponse } from "./generatedModels.js";
import type { AbortSignalLike } from "@azure/abort-controller";
import type { StoragePipelineOptions, Pipeline } from "./Pipeline.js";
import type { CommonOptions } from "./StorageClient.js";
import { StorageClient } from "./StorageClient.js";
import type { PagedAsyncIterableIterator } from "@azure/core-paging";
import { StorageSharedKeyCredential } from "@azure/storage-blob";
import { AnonymousCredential } from "@azure/storage-blob";
import type { QueueCreateOptions, QueueDeleteOptions } from "./QueueClient.js";
import { QueueClient } from "./QueueClient.js";
import { AccountSASPermissions } from "./AccountSASPermissions.js";
import type { SASProtocol } from "./SASQueryParameters.js";
import type { SasIPRange } from "./SasIPRange.js";
/**
 * Options to configure {@link QueueServiceClient.getProperties} operation
 */
export interface ServiceGetPropertiesOptions extends CommonOptions {
    /**
     * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
     * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
     */
    abortSignal?: AbortSignalLike;
}
/**
 * Options to configure {@link QueueServiceClient.setProperties} operation
 */
export interface ServiceSetPropertiesOptions extends CommonOptions {
    /**
     * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
     * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
     */
    abortSignal?: AbortSignalLike;
}
/**
 * Options to configure {@link QueueServiceClient.getStatistics} operation
 */
export interface ServiceGetStatisticsOptions extends CommonOptions {
    /**
     * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
     * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
     */
    abortSignal?: AbortSignalLike;
}
/**
 * Options to configure {@link QueueServiceClient.listQueues} operation
 */
export interface ServiceListQueuesOptions extends CommonOptions {
    /**
     * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
     * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
     */
    abortSignal?: AbortSignalLike;
    /**
     * Filters the results to return only queues
     * whose name begins with the specified prefix.
     */
    prefix?: string;
    /**
     * Specifies whether the queue's metadata be returned as part of the response
     * body.
     */
    includeMetadata?: boolean;
}
/**
 * Options to configure {@link QueueServiceClient.generateAccountSasUrl} operation.
 */
export interface ServiceGenerateAccountSasUrlOptions {
    /**
     * The version of the service this SAS will target. If not specified, it will default to the version targeted by the
     * library.
     */
    version?: string;
    /**
     * Optional. SAS protocols allowed.
     */
    protocol?: SASProtocol;
    /**
     * Optional. When the SAS will take effect.
     */
    startsOn?: Date;
    /**
     * Optional. IP range allowed.
     */
    ipRange?: SasIPRange;
}
/**
 * A QueueServiceClient represents a URL to the Azure Storage Queue service allowing you
 * to manipulate queues.
 */
export declare class QueueServiceClient extends StorageClient {
    /**
     * Creates an instance of QueueServiceClient.
     *
     * @param connectionString - Account connection string or a SAS connection string of an Azure storage account.
     *                                  [ Note - Account connection string can only be used in NODE.JS runtime. ]
     *                                  Account connection string example -
     *                                  `DefaultEndpointsProtocol=https;AccountName=myaccount;AccountKey=accountKey;EndpointSuffix=core.windows.net`
     *                                  SAS connection string example -
     *                                  `BlobEndpoint=https://myaccount.blob.core.windows.net/;QueueEndpoint=https://myaccount.queue.core.windows.net/;FileEndpoint=https://myaccount.file.core.windows.net/;TableEndpoint=https://myaccount.table.core.windows.net/;SharedAccessSignature=sasString`
     * @param options - Options to configure the HTTP pipeline.
     * @returns A new QueueServiceClient object from the given connection string.
     */
    static fromConnectionString(connectionString: string, options?: StoragePipelineOptions): QueueServiceClient;
    /**
     * serviceContext provided by protocol layer.
     */
    private serviceContext;
    /**
     * Creates an instance of QueueServiceClient.
     *
     * @param url - A URL string pointing to Azure Storage queue service, such as
     *                     "https://myaccount.queue.core.windows.net". You can append a SAS
     *                     if using AnonymousCredential, such as "https://myaccount.queue.core.windows.net?sasString".
     * @param credential -  Such as AnonymousCredential, StorageSharedKeyCredential or any credential from the `@azure/identity` package to authenticate requests to the service. You can also provide an object that implements the TokenCredential interface. If not specified, AnonymousCredential is used.
     * @param options - Options to configure the HTTP pipeline.
     *
     * Example using DefaultAzureCredential from `@azure/identity`:
     *
     * ```ts snippet:ReadmeSampleCreateClient_DefaultAzureCredential
     * import { DefaultAzureCredential } from "@azure/identity";
     * import { QueueServiceClient } from "@azure/storage-queue";
     *
     * const account = "<account>";
     * const credential = new DefaultAzureCredential();
     *
     * const queueServiceClient = new QueueServiceClient(
     *   `https://${account}.queue.core.windows.net`,
     *   credential,
     * );
     * ```
     *
     * Example using an account name/key:
     *
     * ```ts snippet:ReadmeSampleCreateClient_StorageSharedKeyCredential
     * import { StorageSharedKeyCredential, QueueServiceClient } from "@azure/storage-queue";
     *
     * // Enter your storage account name and shared key
     * const account = "<account>";
     * const accountKey = "<accountkey>";
     *
     * // Use StorageSharedKeyCredential with storage account and account key
     * // StorageSharedKeyCredential is only available in Node.js runtime, not in browsers
     * const sharedKeyCredential = new StorageSharedKeyCredential(account, accountKey);
     *
     * const queueServiceClient = new QueueServiceClient(
     *   `https://${account}.queue.core.windows.net`,
     *   sharedKeyCredential,
     *   {
     *     retryOptions: { maxTries: 4 }, // Retry options
     *     userAgentOptions: {
     *       userAgentPrefix: "BasicSample V10.0.0",
     *     }, // Customized telemetry string
     *   },
     * );
     * ```
     */
    constructor(url: string, credential?: StorageSharedKeyCredential | AnonymousCredential | TokenCredential, options?: StoragePipelineOptions);
    /**
     * Creates an instance of QueueServiceClient.
     *
     * @param url - A URL string pointing to Azure Storage queue service, such as
     *                     "https://myaccount.queue.core.windows.net". You can append a SAS
     *                     if using AnonymousCredential, such as "https://myaccount.queue.core.windows.net?sasString".
     * @param pipeline - Call newPipeline() to create a default
     *                            pipeline, or provide a customized pipeline.
     */
    constructor(url: string, pipeline: Pipeline);
    /**
     * Creates a {@link QueueClient} object.
     *
     * @param queueName -
     * @returns a new QueueClient
     *
     * Example usage:
     *
     * ```ts snippet:ReadmeSampleCreateQueue
     * import { QueueServiceClient } from "@azure/storage-queue";
     * import { DefaultAzureCredential } from "@azure/identity";
     *
     * const account = "<account>";
     * const queueServiceClient = new QueueServiceClient(
     *   `https://${account}.queue.core.windows.net`,
     *   new DefaultAzureCredential(),
     * );
     *
     * const queueName = "<valid queue name>";
     * const queueClient = queueServiceClient.getQueueClient(queueName);
     * const createQueueResponse = await queueClient.create();
     * console.log(
     *   `Created queue ${queueName} successfully, service assigned request Id: ${createQueueResponse.requestId}`,
     * );
     * ```
     */
    getQueueClient(queueName: string): QueueClient;
    /**
     * Returns a list of the queues under the specified account.
     * @see https://learn.microsoft.com/en-us/rest/api/storageservices/list-queues1
     *
     * @param marker - A string value that identifies the portion of
     *                        the list of queues to be returned with the next listing operation. The
     *                        operation returns the continuationToken value within the response body if the
     *                        listing operation did not return all queues remaining to be listed
     *                        with the current page. The continuationToken value can be used as the value for
     *                        the marker parameter in a subsequent call to request the next page of list
     *                        items. The marker value is opaque to the client.
     * @param options - Options to list queues operation.
     * @returns Response data for the list queues segment operation.
     */
    private listQueuesSegment;
    /**
     * Returns an AsyncIterableIterator for {@link ServiceListQueuesSegmentResponse} objects
     *
     * @param marker - A string value that identifies the portion of
     *                        the list of queues to be returned with the next listing operation. The
     *                        operation returns the continuationToken value within the response body if the
     *                        listing operation did not return all queues remaining to be listed
     *                        with the current page. The continuationToken value can be used as the value for
     *                        the marker parameter in a subsequent call to request the next page of list
     *                        items. The marker value is opaque to the client.
     * @param options - Options to list queues operation.
     */
    private listSegments;
    /**
     * Returns an AsyncIterableIterator for {@link QueueItem} objects
     *
     * @param options - Options to list queues operation.
     */
    private listItems;
    /**
     * Returns an async iterable iterator to list all the queues
     * under the specified account.
     *
     * .byPage() returns an async iterable iterator to list the queues in pages.
     *
     * Example using `for await` syntax:
     *
     * ```ts snippet:ReadmeSampleListQueues
     * import { QueueServiceClient } from "@azure/storage-queue";
     * import { DefaultAzureCredential } from "@azure/identity";
     *
     * const account = "<account>";
     * const queueServiceClient = new QueueServiceClient(
     *   `https://${account}.queue.core.windows.net`,
     *   new DefaultAzureCredential(),
     * );
     *
     * let i = 1;
     * for await (const item of queueServiceClient.listQueues()) {
     *   console.log(`Queue${i++}: ${item.name}`);
     * }
     * ```
     *
     * Example using `iter.next()`:
     *
     * ```ts snippet:ReadmeSampleListQueues_Iterator
     * import { QueueServiceClient } from "@azure/storage-queue";
     * import { DefaultAzureCredential } from "@azure/identity";
     *
     * const account = "<account>";
     * const queueServiceClient = new QueueServiceClient(
     *   `https://${account}.queue.core.windows.net`,
     *   new DefaultAzureCredential(),
     * );
     *
     * let i = 1;
     * const iterator = queueServiceClient.listQueues();
     * let { done, value } = await iterator.next();
     * while (!done) {
     *   console.log(`Queue${i++}: ${value.name}`);
     *   ({ done, value } = await iterator.next());
     * }
     * ```
     *
     * Example using `byPage()`:
     *
     * ```ts snippet:ReadmeSampleListQueues_ByPage
     * import { QueueServiceClient } from "@azure/storage-queue";
     * import { DefaultAzureCredential } from "@azure/identity";
     *
     * const account = "<account>";
     * const queueServiceClient = new QueueServiceClient(
     *   `https://${account}.queue.core.windows.net`,
     *   new DefaultAzureCredential(),
     * );
     *
     * let i = 1;
     * for await (const page of queueServiceClient.listQueues().byPage({ maxPageSize: 20 })) {
     *   for (const item of page.queueItems || []) {
     *     console.log(`Queue${i++}: ${item.name}`);
     *   }
     * }
     * ```
     *
     * Example using paging with a marker:
     *
     * ```ts snippet:ReadmeSampleListQueues_Continuation
     * import { QueueServiceClient } from "@azure/storage-queue";
     * import { DefaultAzureCredential } from "@azure/identity";
     *
     * const account = "<account>";
     * const queueServiceClient = new QueueServiceClient(
     *   `https://${account}.queue.core.windows.net`,
     *   new DefaultAzureCredential(),
     * );
     *
     * let i = 1;
     * let iterator = queueServiceClient.listQueues().byPage({ maxPageSize: 2 });
     * let response = (await iterator.next()).value;
     * // Prints 2 queues
     * if (response.queueItems) {
     *   for (const item of response.queueItems) {
     *     console.log(`Queue${i++}: ${item.name}`);
     *   }
     * }
     * // Gets next marker
     * let marker = response.continuationToken;
     * // Passing next marker as continuationToken
     * iterator = queueServiceClient.listQueues().byPage({ continuationToken: marker, maxPageSize: 10 });
     * response = (await iterator.next()).value;
     * // Prints 10 queues
     * if (response.queueItems) {
     *   for (const item of response.queueItems) {
     *     console.log(`Queue${i++}: ${item.name}`);
     *   }
     * }
     * ```
     *
     * @param options - Options to list queues operation.
     * @returns An asyncIterableIterator that supports paging.
     */
    listQueues(options?: ServiceListQueuesOptions): PagedAsyncIterableIterator<QueueItem, ServiceListQueuesSegmentResponse>;
    /**
     * Gets the properties of a storage account’s Queue service, including properties
     * for Storage Analytics and CORS (Cross-Origin Resource Sharing) rules.
     * @see https://learn.microsoft.com/en-us/rest/api/storageservices/get-queue-service-properties
     *
     * @param options - Options to get properties operation.
     * @returns Response data including the queue service properties.
     */
    getProperties(options?: ServiceGetPropertiesOptions): Promise<ServiceGetPropertiesResponse>;
    /**
     * Sets properties for a storage account’s Queue service endpoint, including properties
     * for Storage Analytics, CORS (Cross-Origin Resource Sharing) rules and soft delete settings.
     * @see https://learn.microsoft.com/en-us/rest/api/storageservices/set-queue-service-properties
     *
     * @param properties -
     * @param options - Options to set properties operation.
     * @returns Response data for the Set Properties operation.
     */
    setProperties(properties: QueueServiceProperties, options?: ServiceGetPropertiesOptions): Promise<ServiceSetPropertiesResponse>;
    /**
     * Retrieves statistics related to replication for the Queue service. It is only
     * available on the secondary location endpoint when read-access geo-redundant
     * replication is enabled for the storage account.
     * @see https://learn.microsoft.com/en-us/rest/api/storageservices/get-queue-service-stats
     *
     * @param options - Options to get statistics operation.
     * @returns Response data for get statistics the operation.
     */
    getStatistics(options?: ServiceGetStatisticsOptions): Promise<ServiceGetStatisticsResponse>;
    /**
     * Creates a new queue under the specified account.
     * @see https://learn.microsoft.com/en-us/rest/api/storageservices/create-queue4
     *
     * @param queueName - name of the queue to create
     * @param options - Options to Queue create operation.
     * @returns Response data for the Queue create operation.
     */
    createQueue(queueName: string, options?: QueueCreateOptions): Promise<QueueCreateResponse>;
    /**
     * Deletes the specified queue permanently.
     * @see https://learn.microsoft.com/en-us/rest/api/storageservices/delete-queue3
     *
     * @param queueName - name of the queue to delete.
     * @param options - Options to Queue delete operation.
     * @returns Response data for the Queue delete operation.
     */
    deleteQueue(queueName: string, options?: QueueDeleteOptions): Promise<QueueDeleteResponse>;
    /**
     * Only available for QueueServiceClient constructed with a shared key credential.
     *
     * Generates an account Shared Access Signature (SAS) URI based on the client properties
     * and parameters passed in. The SAS is signed by the shared key credential of the client.
     *
     * @see https://learn.microsoft.com/en-us/rest/api/storageservices/create-account-sas
     *
     * @param expiresOn - Optional. The time at which the shared access signature becomes invalid. Default to an hour later if not specified.
     * @param permissions - Specifies the list of permissions to be associated with the SAS.
     * @param resourceTypes - Specifies the resource types associated with the shared access signature.
     * @param options - Optional parameters.
     * @returns An account SAS URI consisting of the URI to the resource represented by this client, followed by the generated SAS token.
     */
    generateAccountSasUrl(expiresOn?: Date, permissions?: AccountSASPermissions, resourceTypes?: string, options?: ServiceGenerateAccountSasUrlOptions): string;
    /**
     * Only available for QueueServiceClient constructed with a shared key credential.
     *
     * Generates string to sign for an account Shared Access Signature (SAS) URI based on the client properties
     * and parameters passed in. The SAS is signed by the shared key credential of the client.
     *
     * @see https://learn.microsoft.com/en-us/rest/api/storageservices/create-account-sas
     *
     * @param expiresOn - Optional. The time at which the shared access signature becomes invalid. Default to an hour later if not specified.
     * @param permissions - Specifies the list of permissions to be associated with the SAS.
     * @param resourceTypes - Specifies the resource types associated with the shared access signature.
     * @param options - Optional parameters.
     * @returns An account SAS URI consisting of the URI to the resource represented by this client, followed by the generated SAS token.
     */
    generateSasStringToSign(expiresOn?: Date, permissions?: AccountSASPermissions, resourceTypes?: string, options?: ServiceGenerateAccountSasUrlOptions): string;
}
//# sourceMappingURL=QueueServiceClient.d.ts.map