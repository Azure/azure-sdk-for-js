import type { StoragePipelineOptions, StorageSharedKeyCredential, AnonymousCredential } from "@azure/storage-blob";
import { Pipeline } from "@azure/storage-blob";
import type { PagedAsyncIterableIterator } from "@azure/core-paging";
import type { BlobChangeFeedEvent } from "./models/BlobChangeFeedEvent.js";
import type { BlobChangeFeedListChangesOptions } from "./models/models.js";
import type { TokenCredential } from "@azure/core-auth";
/**
 * Contains paged response data for the {@link BlobChangeFeedClient.listChanges} operation.
 */
export declare class BlobChangeFeedEventPage {
    /**
     * Array of {@link BlobChangeFeedEvent}.
     */
    events: BlobChangeFeedEvent[];
    /**
     * The token that keeps track of where to continue the iterator.
     */
    continuationToken: string;
    constructor();
}
/**
 * Creates a new Pipeline object with Credential provided.
 *
 * @param credential -  Such as AnonymousCredential, StorageSharedKeyCredential or any credential from the `@azure/identity` package to authenticate requests to the service. You can also provide an object that implements the TokenCredential interface. If not specified, AnonymousCredential is used.
 * @param pipelineOptions - Optional. Options.
 * @returns A new Pipeline object.
 */
export declare function newPipeline(credential?: StorageSharedKeyCredential | AnonymousCredential | TokenCredential, pipelineOptions?: StoragePipelineOptions): Pipeline;
/**
 * Blob Change Feed client options.
 */
export interface BlobChangeFeedClientOptions {
    /**
     * The maximum length of an transfer in bytes.
     */
    maximumTransferSize?: number;
}
/**
 * BlobChangeFeedClient.
 * @see https://learn.microsoft.com/en-us/azure/storage/blobs/storage-blob-change-feed?tabs=azure-portal
 */
export declare class BlobChangeFeedClient {
    /**
     * blobServiceClient provided by `@azure/storage-blob` package.
     */
    private blobServiceClient;
    private changeFeedFactory;
    private changeFeedClientOptions;
    /**
     *
     * Creates an instance of BlobChangeFeedClient from connection string.
     *
     * @param connectionString - Account connection string or a SAS connection string of an Azure storage account.
     *                                  [ Note - Account connection string can only be used in NODE.JS runtime. ]
     *                                  Account connection string example -
     *                                  `DefaultEndpointsProtocol=https;AccountName=myaccount;AccountKey=accountKey;EndpointSuffix=core.windows.net`
     *                                  SAS connection string example -
     *                                  `BlobEndpoint=https://myaccount.blob.core.windows.net/;QueueEndpoint=https://myaccount.queue.core.windows.net/;FileEndpoint=https://myaccount.file.core.windows.net/;TableEndpoint=https://myaccount.table.core.windows.net/;SharedAccessSignature=sasString`
     * @param options - Optional. Options to configure the HTTP pipeline.
     */
    static fromConnectionString(connectionString: string, options?: StoragePipelineOptions, changeFeedClientOptions?: BlobChangeFeedClientOptions): BlobChangeFeedClient;
    /**
     * Creates an instance of BlobChangeFeedClient.
     *
     * @param url - A Client string pointing to Azure Storage blob service, such as
     *                     "https://myaccount.blob.core.windows.net". You can append a SAS
     *                     if using AnonymousCredential, such as "https://myaccount.blob.core.windows.net?sasString".
     * @param credential -  Such as AnonymousCredential, StorageSharedKeyCredential or any credential from the `@azure/identity` package to authenticate requests to the service. You can also provide an object that implements the TokenCredential interface. If not specified, AnonymousCredential is used.
     * @param options - Optional. Options to configure the HTTP pipeline.
     *
     * Example using DefaultAzureCredential from `@azure/identity`:
     *
     * ```ts snippet:ReadmeSampleCreateClient_TokenCredential
     * import { DefaultAzureCredential } from "@azure/identity";
     * import { BlobChangeFeedClient } from "@azure/storage-blob-changefeed";
     *
     * // Enter your storage account name and shared key
     * const account = "<account>";
     * const credential = new DefaultAzureCredential();
     * const changeFeedClient = new BlobChangeFeedClient(
     *   // When using AnonymousCredential, following url should include a valid SAS or support public access
     *   `https://${account}.blob.core.windows.net`,
     *   credential,
     * );
     * ```
     *
     * Example using an account name/key:
     *
     * ```ts snippet:ReadmeSampleCreateClient
     * import { StorageSharedKeyCredential } from "@azure/storage-blob";
     * import { BlobChangeFeedClient } from "@azure/storage-blob-changefeed";
     *
     * // Enter your storage account name and shared key
     * const account = "<account>";
     * const accountKey = "<accountkey>";
     * // Use StorageSharedKeyCredential with storage account and account key
     * // StorageSharedKeyCredential is only available in Node.js runtime, not in browsers
     * const sharedKeyCredential = new StorageSharedKeyCredential(account, accountKey);
     * const changeFeedClient = new BlobChangeFeedClient(
     *   // When using AnonymousCredential, following url should include a valid SAS or support public access
     *   `https://${account}.blob.core.windows.net`,
     *   sharedKeyCredential,
     * );
     * ```
     */
    constructor(url: string, credential?: StorageSharedKeyCredential | AnonymousCredential | TokenCredential, options?: StoragePipelineOptions, changeFeedClientOptions?: BlobChangeFeedClientOptions);
    /**
     * Creates an instance of BlobChangeFeedClient.
     *
     * @param url - A Client string pointing to Azure Storage blob service, such as
     *                     "https://myaccount.blob.core.windows.net". You can append a SAS
     *                     if using AnonymousCredential, such as "https://myaccount.blob.core.windows.net?sasString".
     * @param pipeline - Call newPipeline() to create a default
     *                            pipeline, or provide a customized pipeline.
     */
    constructor(url: string, pipeline: Pipeline);
    private getChange;
    private getPage;
    /**
     * Returns an async iterable iterator to list all the change feed events
     * in the specified account.
     *
     * .byPage() returns an async iterable iterator to list the change feed events in pages.
     *
     * Example using `for await` syntax:
     *
     * ```ts snippet:ReadmeSampleListChanges
     * import { StorageSharedKeyCredential } from "@azure/storage-blob";
     * import { BlobChangeFeedClient } from "@azure/storage-blob-changefeed";
     *
     * const account = "<account>";
     * const accountKey = "<accountkey>";
     * const sharedKeyCredential = new StorageSharedKeyCredential(account, accountKey);
     * const changeFeedClient = new BlobChangeFeedClient(
     *   `https://${account}.blob.core.windows.net`,
     *   sharedKeyCredential,
     * );
     *
     * // Use for await to iterate through the change feed
     * for await (const event of changeFeedClient.listChanges()) {
     *   console.log(`Event: ${event.eventType}`);
     *   console.log(`Event time: ${event.eventTime}`);
     *   console.log(`Event data: ${JSON.stringify(event.data)}`);
     * }
     *
     * // Use `byPage` to iterate through the change feed
     * for await (const page of changeFeedClient.listChanges().byPage()) {
     *   console.log(`Page: ${JSON.stringify(page)}`);
     *   for (const event of page.events) {
     *     console.log(`Event: ${event.eventType}`);
     *     console.log(`Event time: ${event.eventTime}`);
     *     console.log(`Event data: ${JSON.stringify(event.data)}`);
     *   }
     * }
     * ```
     *
     * Example using paging with a marker:
     *
     * ```ts snippet:ReadmeSampleListChanges_Continuation
     * import { StorageSharedKeyCredential } from "@azure/storage-blob";
     * import { BlobChangeFeedClient } from "@azure/storage-blob-changefeed";
     *
     * const account = "<account>";
     * const accountKey = "<accountkey>";
     * const sharedKeyCredential = new StorageSharedKeyCredential(account, accountKey);
     * const changeFeedClient = new BlobChangeFeedClient(
     *   `https://${account}.blob.core.windows.net`,
     *   sharedKeyCredential,
     * );
     *
     * let iterator = changeFeedClient.listChanges().byPage({ maxPageSize: 2 });
     * let response = (await iterator.next()).value;
     * // Prints 2 page ranges
     * if (response.pageRange) {
     *   for (const pageRange of response.pageRange) {
     *     console.log(`Event: ${pageRange.eventType}`);
     *     console.log(`Event time: ${pageRange.eventTime}`);
     *     console.log(`Event data: ${JSON.stringify(pageRange.data)}`);
     *   }
     * }
     * // Gets next marker
     * let marker = response.continuationToken;
     * // Passing next marker as continuationToken
     * iterator = changeFeedClient.listChanges().byPage({ continuationToken: marker, maxPageSize: 10 });
     * response = (await iterator.next()).value;
     * // Prints 10 page ranges
     * if (response.pageRange) {
     *   for (const pageRange of response.pageRange) {
     *     console.log(`Event: ${pageRange.eventType}`);
     *     console.log(`Event time: ${pageRange.eventTime}`);
     *     console.log(`Event data: ${JSON.stringify(pageRange.data)}`);
     *   }
     * }
     * ```
     *
     * @param options - Options to list change feed events.
     * @returns An asyncIterableIterator that supports paging.
     */
    listChanges(options?: BlobChangeFeedListChangesOptions): PagedAsyncIterableIterator<BlobChangeFeedEvent, BlobChangeFeedEventPage>;
}
//# sourceMappingURL=BlobChangeFeedClient.d.ts.map