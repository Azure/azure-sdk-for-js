// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { __asyncGenerator, __await } from "tslib";
import { BlobServiceClient, Pipeline } from "@azure/storage-blob";
import { ChangeFeedFactory } from "./ChangeFeedFactory.js";
import { CHANGE_FEED_MAX_PAGE_SIZE, SDK_VERSION } from "./utils/constants.js";
/**
 * Contains paged response data for the {@link BlobChangeFeedClient.listChanges} operation.
 */
export class BlobChangeFeedEventPage {
    constructor() {
        this.events = [];
        this.continuationToken = "";
    }
}
/**
 * Creates a new Pipeline object with Credential provided.
 *
 * @param credential -  Such as AnonymousCredential, StorageSharedKeyCredential or any credential from the `@azure/identity` package to authenticate requests to the service. You can also provide an object that implements the TokenCredential interface. If not specified, AnonymousCredential is used.
 * @param pipelineOptions - Optional. Options.
 * @returns A new Pipeline object.
 */
export function newPipeline(credential, pipelineOptions = {}) {
    return newPipeline(credential, appendUserAgentPrefix(pipelineOptions));
}
function appendUserAgentPrefix(options) {
    if (!options) {
        options = {};
    }
    if (options.userAgentOptions === undefined) {
        options.userAgentOptions = {};
    }
    if (options.userAgentOptions.userAgentPrefix === undefined) {
        options.userAgentOptions.userAgentPrefix = "";
    }
    else if (options.userAgentOptions.userAgentPrefix !== "") {
        options.userAgentOptions.userAgentPrefix += " ";
    }
    options.userAgentOptions.userAgentPrefix += `changefeed-js/${SDK_VERSION}`;
    return options;
}
/**
 * BlobChangeFeedClient.
 * @see https://learn.microsoft.com/en-us/azure/storage/blobs/storage-blob-change-feed?tabs=azure-portal
 */
export class BlobChangeFeedClient {
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
    static fromConnectionString(connectionString, 
    // Legacy, no way to fix the eslint error without breaking. Disable the rule for this line.
    /* eslint-disable-next-line @azure/azure-sdk/ts-naming-options */
    options, 
    // Static method to construct an object, the option is for the object not for the method.
    /* eslint-disable-next-line @azure/azure-sdk/ts-naming-options */
    changeFeedClientOptions) {
        const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString, options);
        return new BlobChangeFeedClient(blobServiceClient.url, blobServiceClient.credential, appendUserAgentPrefix(options), changeFeedClientOptions);
    }
    constructor(urlOrClient, credentialOrPipeline, 
    // Legacy, no way to fix the eslint error without breaking. Disable the rule for this line.
    /* eslint-disable-next-line @azure/azure-sdk/ts-naming-options */
    options, changeFeedClientOptions) {
        this.changeFeedClientOptions = changeFeedClientOptions || {};
        this.changeFeedFactory = new ChangeFeedFactory(this.changeFeedClientOptions.maximumTransferSize);
        if (credentialOrPipeline instanceof Pipeline) {
            this.blobServiceClient = new BlobServiceClient(urlOrClient, credentialOrPipeline);
        }
        else {
            this.blobServiceClient = new BlobServiceClient(urlOrClient, credentialOrPipeline, appendUserAgentPrefix(options));
        }
    }
    getChange() {
        return __asyncGenerator(this, arguments, function* getChange_1(options = {}) {
            const changeFeed = yield __await(this.changeFeedFactory.create(this.blobServiceClient, undefined, options));
            while (changeFeed.hasNext()) {
                const event = yield __await(changeFeed.getChange({
                    abortSignal: options.abortSignal,
                    tracingOptions: options.tracingOptions,
                }));
                if (event) {
                    yield yield __await(event);
                }
                else {
                    return yield __await(void 0);
                }
            }
        });
    }
    // start in ChangeFeedListChangesOptions will be ignored when continuationToken is specified.
    getPage(continuationToken_1, maxPageSize_1) {
        return __asyncGenerator(this, arguments, function* getPage_1(continuationToken, maxPageSize, options = {}) {
            const changeFeed = yield __await(this.changeFeedFactory.create(this.blobServiceClient, continuationToken, options));
            if (!maxPageSize || maxPageSize > CHANGE_FEED_MAX_PAGE_SIZE) {
                maxPageSize = CHANGE_FEED_MAX_PAGE_SIZE;
            }
            while (changeFeed.hasNext()) {
                const eventPage = new BlobChangeFeedEventPage();
                while (changeFeed.hasNext() && eventPage.events.length < maxPageSize) {
                    const event = yield __await(changeFeed.getChange({
                        abortSignal: options.abortSignal,
                        tracingOptions: options.tracingOptions,
                    }));
                    if (event) {
                        eventPage.events.push(event);
                    }
                }
                if (changeFeed.hasNext()) {
                    eventPage.continuationToken = JSON.stringify(changeFeed.getCursor());
                }
                if (eventPage.events.length > 0) {
                    yield yield __await(eventPage);
                }
                else {
                    return yield __await(void 0);
                }
            }
        });
    }
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
    listChanges(options = {}) {
        const iter = this.getChange(options);
        return {
            /**
             * The next method, part of the iteration protocol
             */
            async next() {
                return iter.next();
            },
            /**
             * The connection to the async iterator, part of the iteration protocol
             */
            [Symbol.asyncIterator]() {
                return this;
            },
            /**
             * Return an AsyncIterableIterator that works a page at a time
             */
            byPage: (settings = {}) => {
                return this.getPage(settings.continuationToken, settings.maxPageSize, options);
            },
        };
    }
}
//# sourceMappingURL=BlobChangeFeedClient.js.map