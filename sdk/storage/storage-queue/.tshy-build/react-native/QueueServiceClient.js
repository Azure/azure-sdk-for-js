// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { __asyncDelegator, __asyncGenerator, __asyncValues, __await } from "tslib";
import { isTokenCredential } from "@azure/core-auth";
import { isNodeLike } from "@azure/core-util";
import { newPipeline, isPipelineLike } from "./Pipeline.js";
import { StorageClient } from "./StorageClient.js";
import { appendToURLPath, appendToURLQuery, extractConnectionStringParts, assertResponse, } from "./utils/utils.common.js";
import { StorageSharedKeyCredential } from "@azure/storage-blob";
import { AnonymousCredential } from "@azure/storage-blob";
import { tracingClient } from "./utils/tracing.js";
import { QueueClient } from "./QueueClient.js";
import { AccountSASPermissions } from "./AccountSASPermissions.js";
import { generateAccountSASQueryParameters, generateAccountSASQueryParametersInternal, } from "./AccountSASSignatureValues.js";
import { AccountSASServices } from "./AccountSASServices.js";
import { getDefaultProxySettings } from "@azure/core-rest-pipeline";
/**
 * A QueueServiceClient represents a URL to the Azure Storage Queue service allowing you
 * to manipulate queues.
 */
export class QueueServiceClient extends StorageClient {
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
    static fromConnectionString(connectionString, 
    // Legacy, no way to fix the eslint error without breaking. Disable the rule for this line.
    /* eslint-disable-next-line @azure/azure-sdk/ts-naming-options */
    options) {
        options = options || {};
        const extractedCreds = extractConnectionStringParts(connectionString);
        if (extractedCreds.kind === "AccountConnString") {
            if (isNodeLike) {
                const sharedKeyCredential = new StorageSharedKeyCredential(extractedCreds.accountName, extractedCreds.accountKey);
                if (!options.proxyOptions) {
                    options.proxyOptions = getDefaultProxySettings(extractedCreds.proxyUri);
                }
                const pipeline = newPipeline(sharedKeyCredential, options);
                return new QueueServiceClient(extractedCreds.url, pipeline);
            }
            else {
                throw new Error("Account connection string is only supported in Node.js environment");
            }
        }
        else if (extractedCreds.kind === "SASConnString") {
            const pipeline = newPipeline(new AnonymousCredential(), options);
            return new QueueServiceClient(extractedCreds.url + "?" + extractedCreds.accountSas, pipeline);
        }
        else {
            throw new Error("Connection string must be either an Account connection string or a SAS connection string");
        }
    }
    constructor(url, credentialOrPipeline, 
    // Legacy, no way to fix the eslint error without breaking. Disable the rule for this line.
    /* eslint-disable-next-line @azure/azure-sdk/ts-naming-options */
    options) {
        let pipeline;
        if (isPipelineLike(credentialOrPipeline)) {
            pipeline = credentialOrPipeline;
        }
        else if ((isNodeLike && credentialOrPipeline instanceof StorageSharedKeyCredential) ||
            credentialOrPipeline instanceof AnonymousCredential ||
            isTokenCredential(credentialOrPipeline)) {
            pipeline = newPipeline(credentialOrPipeline, options);
        }
        else {
            // The second parameter is undefined. Use anonymous credential.
            pipeline = newPipeline(new AnonymousCredential(), options);
        }
        super(url, pipeline);
        this.serviceContext = this.storageClientContext.service;
    }
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
    getQueueClient(queueName) {
        return new QueueClient(appendToURLPath(this.url, queueName), this.pipeline);
    }
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
    async listQueuesSegment(marker, options = {}) {
        if (options.prefix === "") {
            options.prefix = undefined;
        }
        return tracingClient.withSpan("QueueServiceClient-listQueuesSegment", options, async (updatedOptions) => {
            return assertResponse(await this.serviceContext.listQueuesSegment(Object.assign(Object.assign({}, updatedOptions), { marker, include: options.include === undefined ? undefined : [options.include] })));
        });
    }
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
    listSegments(marker_1) {
        return __asyncGenerator(this, arguments, function* listSegments_1(marker, options = {}) {
            if (options.prefix === "") {
                options.prefix = undefined;
            }
            let listQueuesResponse;
            do {
                listQueuesResponse = yield __await(this.listQueuesSegment(marker, options));
                marker = listQueuesResponse.continuationToken;
                yield yield __await(yield __await(listQueuesResponse));
            } while (marker);
        });
    }
    /**
     * Returns an AsyncIterableIterator for {@link QueueItem} objects
     *
     * @param options - Options to list queues operation.
     */
    listItems() {
        return __asyncGenerator(this, arguments, function* listItems_1(options = {}) {
            var _a, e_1, _b, _c;
            if (options.prefix === "") {
                options.prefix = undefined;
            }
            let marker;
            try {
                for (var _d = true, _e = __asyncValues(this.listSegments(marker, options)), _f; _f = yield __await(_e.next()), _a = _f.done, !_a; _d = true) {
                    _c = _f.value;
                    _d = false;
                    const segment = _c;
                    if (segment.queueItems) {
                        yield __await(yield* __asyncDelegator(__asyncValues(segment.queueItems)));
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (!_d && !_a && (_b = _e.return)) yield __await(_b.call(_e));
                }
                finally { if (e_1) throw e_1.error; }
            }
        });
    }
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
    listQueues(options = {}) {
        if (options.prefix === "") {
            options.prefix = undefined;
        }
        const updatedOptions = Object.assign(Object.assign({}, options), (options.includeMetadata ? { include: "metadata" } : {}));
        // AsyncIterableIterator to iterate over queues
        const iter = this.listItems(updatedOptions);
        return {
            /**
             * The next method, part of the iteration protocol
             */
            next() {
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
                return this.listSegments(settings.continuationToken, Object.assign({ maxPageSize: settings.maxPageSize }, updatedOptions));
            },
        };
    }
    /**
     * Gets the properties of a storage account’s Queue service, including properties
     * for Storage Analytics and CORS (Cross-Origin Resource Sharing) rules.
     * @see https://learn.microsoft.com/en-us/rest/api/storageservices/get-queue-service-properties
     *
     * @param options - Options to get properties operation.
     * @returns Response data including the queue service properties.
     */
    async getProperties(options = {}) {
        return tracingClient.withSpan("QueueServiceClient-getProperties", options, async (updatedOptions) => {
            return assertResponse(await this.serviceContext.getProperties(updatedOptions));
        });
    }
    /**
     * Sets properties for a storage account’s Queue service endpoint, including properties
     * for Storage Analytics, CORS (Cross-Origin Resource Sharing) rules and soft delete settings.
     * @see https://learn.microsoft.com/en-us/rest/api/storageservices/set-queue-service-properties
     *
     * @param properties -
     * @param options - Options to set properties operation.
     * @returns Response data for the Set Properties operation.
     */
    async setProperties(properties, options = {}) {
        return tracingClient.withSpan("QueueServiceClient-setProperties", options, async (updatedOptions) => {
            return assertResponse(await this.serviceContext.setProperties(properties, updatedOptions));
        });
    }
    /**
     * Retrieves statistics related to replication for the Queue service. It is only
     * available on the secondary location endpoint when read-access geo-redundant
     * replication is enabled for the storage account.
     * @see https://learn.microsoft.com/en-us/rest/api/storageservices/get-queue-service-stats
     *
     * @param options - Options to get statistics operation.
     * @returns Response data for get statistics the operation.
     */
    async getStatistics(options = {}) {
        return tracingClient.withSpan("QueueServiceClient-getStatistics", options, async (updatedOptions) => {
            return assertResponse(await this.serviceContext.getStatistics(updatedOptions));
        });
    }
    /**
     * Creates a new queue under the specified account.
     * @see https://learn.microsoft.com/en-us/rest/api/storageservices/create-queue4
     *
     * @param queueName - name of the queue to create
     * @param options - Options to Queue create operation.
     * @returns Response data for the Queue create operation.
     */
    async createQueue(queueName, options = {}) {
        return tracingClient.withSpan("QueueServiceClient-createQueue", options, async (updatedOptions) => {
            return this.getQueueClient(queueName).create(updatedOptions);
        });
    }
    /**
     * Deletes the specified queue permanently.
     * @see https://learn.microsoft.com/en-us/rest/api/storageservices/delete-queue3
     *
     * @param queueName - name of the queue to delete.
     * @param options - Options to Queue delete operation.
     * @returns Response data for the Queue delete operation.
     */
    async deleteQueue(queueName, options = {}) {
        return tracingClient.withSpan("QueueServiceClient-deleteQueue", options, async (updatedOptions) => {
            return this.getQueueClient(queueName).delete(updatedOptions);
        });
    }
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
    generateAccountSasUrl(expiresOn, permissions = AccountSASPermissions.parse("r"), resourceTypes = "sco", options = {}) {
        if (!(this.credential instanceof StorageSharedKeyCredential)) {
            throw RangeError("Can only generate the account SAS when the client is initialized with a shared key credential");
        }
        if (expiresOn === undefined) {
            const now = new Date();
            expiresOn = new Date(now.getTime() + 3600 * 1000);
        }
        const sas = generateAccountSASQueryParameters(Object.assign({ permissions,
            expiresOn,
            resourceTypes, services: AccountSASServices.parse("q").toString() }, options), this.credential).toString();
        return appendToURLQuery(this.url, sas);
    }
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
    generateSasStringToSign(expiresOn, permissions = AccountSASPermissions.parse("r"), resourceTypes = "sco", options = {}) {
        if (!(this.credential instanceof StorageSharedKeyCredential)) {
            throw RangeError("Can only generate the account SAS when the client is initialized with a shared key credential");
        }
        if (expiresOn === undefined) {
            const now = new Date();
            expiresOn = new Date(now.getTime() + 3600 * 1000);
        }
        return generateAccountSASQueryParametersInternal(Object.assign({ permissions,
            expiresOn,
            resourceTypes, services: AccountSASServices.parse("q").toString() }, options), this.credential).stringToSign;
    }
}
//# sourceMappingURL=QueueServiceClient.js.map