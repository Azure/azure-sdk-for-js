"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlobServiceClient = void 0;
const tslib_1 = require("tslib");
const core_auth_1 = require("@azure/core-auth");
const core_rest_pipeline_1 = require("@azure/core-rest-pipeline");
const core_util_1 = require("@azure/core-util");
const Pipeline_js_1 = require("./Pipeline.js");
const ContainerClient_js_1 = require("./ContainerClient.js");
const utils_common_js_1 = require("./utils/utils.common.js");
const StorageSharedKeyCredential_js_1 = require("./credentials/StorageSharedKeyCredential.js");
const AnonymousCredential_js_1 = require("./credentials/AnonymousCredential.js");
const utils_common_js_2 = require("./utils/utils.common.js");
const tracing_js_1 = require("./utils/tracing.js");
const BlobBatchClient_js_1 = require("./BlobBatchClient.js");
const StorageClient_js_1 = require("./StorageClient.js");
const AccountSASPermissions_js_1 = require("./sas/AccountSASPermissions.js");
const AccountSASSignatureValues_js_1 = require("./sas/AccountSASSignatureValues.js");
const AccountSASServices_js_1 = require("./sas/AccountSASServices.js");
/**
 * A BlobServiceClient represents a Client to the Azure Storage Blob service allowing you
 * to manipulate blob containers.
 */
class BlobServiceClient extends StorageClient_js_1.StorageClient {
    /**
     *
     * Creates an instance of BlobServiceClient from connection string.
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
    // Legacy, no fix for eslint error without breaking. Disable it for this interface.
    /* eslint-disable-next-line @azure/azure-sdk/ts-naming-options*/
    options) {
        options = options || {};
        const extractedCreds = (0, utils_common_js_1.extractConnectionStringParts)(connectionString);
        if (extractedCreds.kind === "AccountConnString") {
            if (core_util_1.isNodeLike) {
                const sharedKeyCredential = new StorageSharedKeyCredential_js_1.StorageSharedKeyCredential(extractedCreds.accountName, extractedCreds.accountKey);
                if (!options.proxyOptions) {
                    options.proxyOptions = (0, core_rest_pipeline_1.getDefaultProxySettings)(extractedCreds.proxyUri);
                }
                const pipeline = (0, Pipeline_js_1.newPipeline)(sharedKeyCredential, options);
                return new BlobServiceClient(extractedCreds.url, pipeline);
            }
            else {
                throw new Error("Account connection string is only supported in Node.js environment");
            }
        }
        else if (extractedCreds.kind === "SASConnString") {
            const pipeline = (0, Pipeline_js_1.newPipeline)(new AnonymousCredential_js_1.AnonymousCredential(), options);
            return new BlobServiceClient(extractedCreds.url + "?" + extractedCreds.accountSas, pipeline);
        }
        else {
            throw new Error("Connection string must be either an Account connection string or a SAS connection string");
        }
    }
    constructor(url, credentialOrPipeline, 
    // Legacy, no fix for eslint error without breaking. Disable it for this interface.
    /* eslint-disable-next-line @azure/azure-sdk/ts-naming-options*/
    options) {
        let pipeline;
        if ((0, Pipeline_js_1.isPipelineLike)(credentialOrPipeline)) {
            pipeline = credentialOrPipeline;
        }
        else if ((core_util_1.isNodeLike && credentialOrPipeline instanceof StorageSharedKeyCredential_js_1.StorageSharedKeyCredential) ||
            credentialOrPipeline instanceof AnonymousCredential_js_1.AnonymousCredential ||
            (0, core_auth_1.isTokenCredential)(credentialOrPipeline)) {
            pipeline = (0, Pipeline_js_1.newPipeline)(credentialOrPipeline, options);
        }
        else {
            // The second parameter is undefined. Use anonymous credential
            pipeline = (0, Pipeline_js_1.newPipeline)(new AnonymousCredential_js_1.AnonymousCredential(), options);
        }
        super(url, pipeline);
        this.serviceContext = this.storageClientContext.service;
    }
    /**
     * Creates a {@link ContainerClient} object
     *
     * @param containerName - A container name
     * @returns A new ContainerClient object for the given container name.
     *
     * Example usage:
     *
     * ```ts snippet:BlobServiceClientGetContainerClient
     * import { BlobServiceClient } from "@azure/storage-blob";
     * import { DefaultAzureCredential } from "@azure/identity";
     *
     * const account = "<account>";
     * const blobServiceClient = new BlobServiceClient(
     *   `https://${account}.blob.core.windows.net`,
     *   new DefaultAzureCredential(),
     * );
     *
     * const containerClient = blobServiceClient.getContainerClient("<container name>");
     * ```
     */
    getContainerClient(containerName) {
        return new ContainerClient_js_1.ContainerClient((0, utils_common_js_1.appendToURLPath)(this.url, encodeURIComponent(containerName)), this.pipeline);
    }
    /**
     * Create a Blob container. @see https://learn.microsoft.com/en-us/rest/api/storageservices/create-container
     *
     * @param containerName - Name of the container to create.
     * @param options - Options to configure Container Create operation.
     * @returns Container creation response and the corresponding container client.
     */
    async createContainer(containerName, options = {}) {
        return tracing_js_1.tracingClient.withSpan("BlobServiceClient-createContainer", options, async (updatedOptions) => {
            const containerClient = this.getContainerClient(containerName);
            const containerCreateResponse = await containerClient.create(updatedOptions);
            return {
                containerClient,
                containerCreateResponse,
            };
        });
    }
    /**
     * Deletes a Blob container.
     *
     * @param containerName - Name of the container to delete.
     * @param options - Options to configure Container Delete operation.
     * @returns Container deletion response.
     */
    async deleteContainer(containerName, options = {}) {
        return tracing_js_1.tracingClient.withSpan("BlobServiceClient-deleteContainer", options, async (updatedOptions) => {
            const containerClient = this.getContainerClient(containerName);
            return containerClient.delete(updatedOptions);
        });
    }
    /**
     * Restore a previously deleted Blob container.
     * This API is only functional if Container Soft Delete is enabled for the storage account associated with the container.
     *
     * @param deletedContainerName - Name of the previously deleted container.
     * @param deletedContainerVersion - Version of the previously deleted container, used to uniquely identify the deleted container.
     * @param options - Options to configure Container Restore operation.
     * @returns Container deletion response.
     */
    async undeleteContainer(deletedContainerName, deletedContainerVersion, options = {}) {
        return tracing_js_1.tracingClient.withSpan("BlobServiceClient-undeleteContainer", options, async (updatedOptions) => {
            const containerClient = this.getContainerClient(options.destinationContainerName || deletedContainerName);
            // Hack to access a protected member.
            const containerContext = containerClient["storageClientContext"].container;
            const containerUndeleteResponse = (0, utils_common_js_2.assertResponse)(await containerContext.restore({
                deletedContainerName,
                deletedContainerVersion,
                tracingOptions: updatedOptions.tracingOptions,
            }));
            return { containerClient, containerUndeleteResponse };
        });
    }
    /**
     * Gets the properties of a storage account’s Blob service, including properties
     * for Storage Analytics and CORS (Cross-Origin Resource Sharing) rules.
     * @see https://learn.microsoft.com/en-us/rest/api/storageservices/get-blob-service-properties
     *
     * @param options - Options to the Service Get Properties operation.
     * @returns Response data for the Service Get Properties operation.
     */
    async getProperties(options = {}) {
        return tracing_js_1.tracingClient.withSpan("BlobServiceClient-getProperties", options, async (updatedOptions) => {
            return (0, utils_common_js_2.assertResponse)(await this.serviceContext.getProperties({
                abortSignal: options.abortSignal,
                tracingOptions: updatedOptions.tracingOptions,
            }));
        });
    }
    /**
     * Sets properties for a storage account’s Blob service endpoint, including properties
     * for Storage Analytics, CORS (Cross-Origin Resource Sharing) rules and soft delete settings.
     * @see https://learn.microsoft.com/en-us/rest/api/storageservices/set-blob-service-properties
     *
     * @param properties -
     * @param options - Options to the Service Set Properties operation.
     * @returns Response data for the Service Set Properties operation.
     */
    async setProperties(properties, options = {}) {
        return tracing_js_1.tracingClient.withSpan("BlobServiceClient-setProperties", options, async (updatedOptions) => {
            return (0, utils_common_js_2.assertResponse)(await this.serviceContext.setProperties(properties, {
                abortSignal: options.abortSignal,
                tracingOptions: updatedOptions.tracingOptions,
            }));
        });
    }
    /**
     * Retrieves statistics related to replication for the Blob service. It is only
     * available on the secondary location endpoint when read-access geo-redundant
     * replication is enabled for the storage account.
     * @see https://learn.microsoft.com/en-us/rest/api/storageservices/get-blob-service-stats
     *
     * @param options - Options to the Service Get Statistics operation.
     * @returns Response data for the Service Get Statistics operation.
     */
    async getStatistics(options = {}) {
        return tracing_js_1.tracingClient.withSpan("BlobServiceClient-getStatistics", options, async (updatedOptions) => {
            return (0, utils_common_js_2.assertResponse)(await this.serviceContext.getStatistics({
                abortSignal: options.abortSignal,
                tracingOptions: updatedOptions.tracingOptions,
            }));
        });
    }
    /**
     * The Get Account Information operation returns the sku name and account kind
     * for the specified account.
     * The Get Account Information operation is available on service versions beginning
     * with version 2018-03-28.
     * @see https://learn.microsoft.com/en-us/rest/api/storageservices/get-account-information
     *
     * @param options - Options to the Service Get Account Info operation.
     * @returns Response data for the Service Get Account Info operation.
     */
    async getAccountInfo(options = {}) {
        return tracing_js_1.tracingClient.withSpan("BlobServiceClient-getAccountInfo", options, async (updatedOptions) => {
            return (0, utils_common_js_2.assertResponse)(await this.serviceContext.getAccountInfo({
                abortSignal: options.abortSignal,
                tracingOptions: updatedOptions.tracingOptions,
            }));
        });
    }
    /**
     * Returns a list of the containers under the specified account.
     * @see https://learn.microsoft.com/en-us/rest/api/storageservices/list-containers2
     *
     * @param marker - A string value that identifies the portion of
     *                        the list of containers to be returned with the next listing operation. The
     *                        operation returns the continuationToken value within the response body if the
     *                        listing operation did not return all containers remaining to be listed
     *                        with the current page. The continuationToken value can be used as the value for
     *                        the marker parameter in a subsequent call to request the next page of list
     *                        items. The marker value is opaque to the client.
     * @param options - Options to the Service List Container Segment operation.
     * @returns Response data for the Service List Container Segment operation.
     */
    async listContainersSegment(marker, options = {}) {
        return tracing_js_1.tracingClient.withSpan("BlobServiceClient-listContainersSegment", options, async (updatedOptions) => {
            return (0, utils_common_js_2.assertResponse)(await this.serviceContext.listContainersSegment(Object.assign(Object.assign({ abortSignal: options.abortSignal, marker }, options), { include: typeof options.include === "string" ? [options.include] : options.include, tracingOptions: updatedOptions.tracingOptions })));
        });
    }
    /**
     * The Filter Blobs operation enables callers to list blobs across all containers whose tags
     * match a given search expression. Filter blobs searches across all containers within a
     * storage account but can be scoped within the expression to a single container.
     *
     * @param tagFilterSqlExpression - The where parameter enables the caller to query blobs whose tags match a given expression.
     *                                        The given expression must evaluate to true for a blob to be returned in the results.
     *                                        The[OData - ABNF] filter syntax rule defines the formal grammar for the value of the where query parameter;
     *                                        however, only a subset of the OData filter syntax is supported in the Blob service.
     * @param marker - A string value that identifies the portion of
     *                          the list of blobs to be returned with the next listing operation. The
     *                          operation returns the continuationToken value within the response body if the
     *                          listing operation did not return all blobs remaining to be listed
     *                          with the current page. The continuationToken value can be used as the value for
     *                          the marker parameter in a subsequent call to request the next page of list
     *                          items. The marker value is opaque to the client.
     * @param options - Options to find blobs by tags.
     */
    async findBlobsByTagsSegment(tagFilterSqlExpression, marker, options = {}) {
        return tracing_js_1.tracingClient.withSpan("BlobServiceClient-findBlobsByTagsSegment", options, async (updatedOptions) => {
            const response = (0, utils_common_js_2.assertResponse)(await this.serviceContext.filterBlobs({
                abortSignal: options.abortSignal,
                where: tagFilterSqlExpression,
                marker,
                maxPageSize: options.maxPageSize,
                tracingOptions: updatedOptions.tracingOptions,
            }));
            const wrappedResponse = Object.assign(Object.assign({}, response), { _response: response._response, blobs: response.blobs.map((blob) => {
                    var _a;
                    let tagValue = "";
                    if (((_a = blob.tags) === null || _a === void 0 ? void 0 : _a.blobTagSet.length) === 1) {
                        tagValue = blob.tags.blobTagSet[0].value;
                    }
                    return Object.assign(Object.assign({}, blob), { tags: (0, utils_common_js_1.toTags)(blob.tags), tagValue });
                }) });
            return wrappedResponse;
        });
    }
    /**
     * Returns an AsyncIterableIterator for ServiceFindBlobsByTagsSegmentResponse.
     *
     * @param tagFilterSqlExpression -  The where parameter enables the caller to query blobs whose tags match a given expression.
     *                                         The given expression must evaluate to true for a blob to be returned in the results.
     *                                         The[OData - ABNF] filter syntax rule defines the formal grammar for the value of the where query parameter;
     *                                         however, only a subset of the OData filter syntax is supported in the Blob service.
     * @param marker - A string value that identifies the portion of
     *                          the list of blobs to be returned with the next listing operation. The
     *                          operation returns the continuationToken value within the response body if the
     *                          listing operation did not return all blobs remaining to be listed
     *                          with the current page. The continuationToken value can be used as the value for
     *                          the marker parameter in a subsequent call to request the next page of list
     *                          items. The marker value is opaque to the client.
     * @param options - Options to find blobs by tags.
     */
    findBlobsByTagsSegments(tagFilterSqlExpression_1, marker_1) {
        return tslib_1.__asyncGenerator(this, arguments, function* findBlobsByTagsSegments_1(tagFilterSqlExpression, marker, options = {}) {
            let response;
            if (!!marker || marker === undefined) {
                do {
                    response = yield tslib_1.__await(this.findBlobsByTagsSegment(tagFilterSqlExpression, marker, options));
                    response.blobs = response.blobs || [];
                    marker = response.continuationToken;
                    yield yield tslib_1.__await(response);
                } while (marker);
            }
        });
    }
    /**
     * Returns an AsyncIterableIterator for blobs.
     *
     * @param tagFilterSqlExpression -  The where parameter enables the caller to query blobs whose tags match a given expression.
     *                                         The given expression must evaluate to true for a blob to be returned in the results.
     *                                         The[OData - ABNF] filter syntax rule defines the formal grammar for the value of the where query parameter;
     *                                         however, only a subset of the OData filter syntax is supported in the Blob service.
     * @param options - Options to findBlobsByTagsItems.
     */
    findBlobsByTagsItems(tagFilterSqlExpression_1) {
        return tslib_1.__asyncGenerator(this, arguments, function* findBlobsByTagsItems_1(tagFilterSqlExpression, options = {}) {
            var _a, e_1, _b, _c;
            let marker;
            try {
                for (var _d = true, _e = tslib_1.__asyncValues(this.findBlobsByTagsSegments(tagFilterSqlExpression, marker, options)), _f; _f = yield tslib_1.__await(_e.next()), _a = _f.done, !_a; _d = true) {
                    _c = _f.value;
                    _d = false;
                    const segment = _c;
                    yield tslib_1.__await(yield* tslib_1.__asyncDelegator(tslib_1.__asyncValues(segment.blobs)));
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (!_d && !_a && (_b = _e.return)) yield tslib_1.__await(_b.call(_e));
                }
                finally { if (e_1) throw e_1.error; }
            }
        });
    }
    /**
     * Returns an async iterable iterator to find all blobs with specified tag
     * under the specified account.
     *
     * .byPage() returns an async iterable iterator to list the blobs in pages.
     *
     * @see https://learn.microsoft.com/en-us/rest/api/storageservices/get-blob-service-properties
     *
     * ```ts snippet:BlobServiceClientFindBlobsByTags
     * import { BlobServiceClient } from "@azure/storage-blob";
     * import { DefaultAzureCredential } from "@azure/identity";
     *
     * const account = "<account>";
     * const blobServiceClient = new BlobServiceClient(
     *   `https://${account}.blob.core.windows.net`,
     *   new DefaultAzureCredential(),
     * );
     *
     * // Use for await to iterate the blobs
     * let i = 1;
     * for await (const blob of blobServiceClient.findBlobsByTags("tagkey='tagvalue'")) {
     *   console.log(`Blob ${i++}: ${blob.name}`);
     * }
     *
     * // Use iter.next() to iterate the blobs
     * i = 1;
     * const iter = blobServiceClient.findBlobsByTags("tagkey='tagvalue'");
     * let { value, done } = await iter.next();
     * while (!done) {
     *   console.log(`Blob ${i++}: ${value.name}`);
     *   ({ value, done } = await iter.next());
     * }
     *
     * // Use byPage() to iterate the blobs
     * i = 1;
     * for await (const page of blobServiceClient
     *   .findBlobsByTags("tagkey='tagvalue'")
     *   .byPage({ maxPageSize: 20 })) {
     *   for (const blob of page.blobs) {
     *     console.log(`Blob ${i++}: ${blob.name}`);
     *   }
     * }
     *
     * // Use paging with a marker
     * i = 1;
     * let iterator = blobServiceClient.findBlobsByTags("tagkey='tagvalue'").byPage({ maxPageSize: 2 });
     * let response = (await iterator.next()).value;
     * // Prints 2 blob names
     * if (response.blobs) {
     *   for (const blob of response.blobs) {
     *     console.log(`Blob ${i++}: ${blob.name}`);
     *   }
     * }
     * // Gets next marker
     * let marker = response.continuationToken;
     * // Passing next marker as continuationToken
     * iterator = blobServiceClient
     *   .findBlobsByTags("tagkey='tagvalue'")
     *   .byPage({ continuationToken: marker, maxPageSize: 10 });
     * response = (await iterator.next()).value;
     *
     * // Prints blob names
     * if (response.blobs) {
     *   for (const blob of response.blobs) {
     *     console.log(`Blob ${i++}: ${blob.name}`);
     *   }
     * }
     * ```
     *
     * @param tagFilterSqlExpression -  The where parameter enables the caller to query blobs whose tags match a given expression.
     *                                         The given expression must evaluate to true for a blob to be returned in the results.
     *                                         The[OData - ABNF] filter syntax rule defines the formal grammar for the value of the where query parameter;
     *                                         however, only a subset of the OData filter syntax is supported in the Blob service.
     * @param options - Options to find blobs by tags.
     */
    findBlobsByTags(tagFilterSqlExpression, options = {}) {
        // AsyncIterableIterator to iterate over blobs
        const listSegmentOptions = Object.assign({}, options);
        const iter = this.findBlobsByTagsItems(tagFilterSqlExpression, listSegmentOptions);
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
                return this.findBlobsByTagsSegments(tagFilterSqlExpression, settings.continuationToken, Object.assign({ maxPageSize: settings.maxPageSize }, listSegmentOptions));
            },
        };
    }
    /**
     * Returns an AsyncIterableIterator for ServiceListContainersSegmentResponses
     *
     * @param marker - A string value that identifies the portion of
     *                        the list of containers to be returned with the next listing operation. The
     *                        operation returns the continuationToken value within the response body if the
     *                        listing operation did not return all containers remaining to be listed
     *                        with the current page. The continuationToken value can be used as the value for
     *                        the marker parameter in a subsequent call to request the next page of list
     *                        items. The marker value is opaque to the client.
     * @param options - Options to list containers operation.
     */
    listSegments(marker_1) {
        return tslib_1.__asyncGenerator(this, arguments, function* listSegments_1(marker, options = {}) {
            let listContainersSegmentResponse;
            if (!!marker || marker === undefined) {
                do {
                    listContainersSegmentResponse = yield tslib_1.__await(this.listContainersSegment(marker, options));
                    listContainersSegmentResponse.containerItems =
                        listContainersSegmentResponse.containerItems || [];
                    marker = listContainersSegmentResponse.continuationToken;
                    yield yield tslib_1.__await(yield tslib_1.__await(listContainersSegmentResponse));
                } while (marker);
            }
        });
    }
    /**
     * Returns an AsyncIterableIterator for Container Items
     *
     * @param options - Options to list containers operation.
     */
    listItems() {
        return tslib_1.__asyncGenerator(this, arguments, function* listItems_1(options = {}) {
            var _a, e_2, _b, _c;
            let marker;
            try {
                for (var _d = true, _e = tslib_1.__asyncValues(this.listSegments(marker, options)), _f; _f = yield tslib_1.__await(_e.next()), _a = _f.done, !_a; _d = true) {
                    _c = _f.value;
                    _d = false;
                    const segment = _c;
                    yield tslib_1.__await(yield* tslib_1.__asyncDelegator(tslib_1.__asyncValues(segment.containerItems)));
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (!_d && !_a && (_b = _e.return)) yield tslib_1.__await(_b.call(_e));
                }
                finally { if (e_2) throw e_2.error; }
            }
        });
    }
    /**
     * Returns an async iterable iterator to list all the containers
     * under the specified account.
     *
     * .byPage() returns an async iterable iterator to list the containers in pages.
     *
     * ```ts snippet:BlobServiceClientListContainers
     * import { BlobServiceClient } from "@azure/storage-blob";
     * import { DefaultAzureCredential } from "@azure/identity";
     *
     * const account = "<account>";
     * const blobServiceClient = new BlobServiceClient(
     *   `https://${account}.blob.core.windows.net`,
     *   new DefaultAzureCredential(),
     * );
     *
     * // Use for await to iterate the containers
     * let i = 1;
     * for await (const container of blobServiceClient.listContainers()) {
     *   console.log(`Container ${i++}: ${container.name}`);
     * }
     *
     * // Use iter.next() to iterate the containers
     * i = 1;
     * const iter = blobServiceClient.listContainers();
     * let { value, done } = await iter.next();
     * while (!done) {
     *   console.log(`Container ${i++}: ${value.name}`);
     *   ({ value, done } = await iter.next());
     * }
     *
     * // Use byPage() to iterate the containers
     * i = 1;
     * for await (const page of blobServiceClient.listContainers().byPage({ maxPageSize: 20 })) {
     *   for (const container of page.containerItems) {
     *     console.log(`Container ${i++}: ${container.name}`);
     *   }
     * }
     *
     * // Use paging with a marker
     * i = 1;
     * let iterator = blobServiceClient.listContainers().byPage({ maxPageSize: 2 });
     * let response = (await iterator.next()).value;
     *
     * // Prints 2 container names
     * if (response.containerItems) {
     *   for (const container of response.containerItems) {
     *     console.log(`Container ${i++}: ${container.name}`);
     *   }
     * }
     *
     * // Gets next marker
     * let marker = response.continuationToken;
     * // Passing next marker as continuationToken
     * iterator = blobServiceClient
     *   .listContainers()
     *   .byPage({ continuationToken: marker, maxPageSize: 10 });
     * response = (await iterator.next()).value;
     *
     * // Prints 10 container names
     * if (response.containerItems) {
     *   for (const container of response.containerItems) {
     *     console.log(`Container ${i++}: ${container.name}`);
     *   }
     * }
     * ```
     *
     * @param options - Options to list containers.
     * @returns An asyncIterableIterator that supports paging.
     */
    listContainers(options = {}) {
        if (options.prefix === "") {
            options.prefix = undefined;
        }
        const include = [];
        if (options.includeDeleted) {
            include.push("deleted");
        }
        if (options.includeMetadata) {
            include.push("metadata");
        }
        if (options.includeSystem) {
            include.push("system");
        }
        // AsyncIterableIterator to iterate over containers
        const listSegmentOptions = Object.assign(Object.assign({}, options), (include.length > 0 ? { include } : {}));
        const iter = this.listItems(listSegmentOptions);
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
                return this.listSegments(settings.continuationToken, Object.assign({ maxPageSize: settings.maxPageSize }, listSegmentOptions));
            },
        };
    }
    /**
     * ONLY AVAILABLE WHEN USING BEARER TOKEN AUTHENTICATION (TokenCredential).
     *
     * Retrieves a user delegation key for the Blob service. This is only a valid operation when using
     * bearer token authentication.
     *
     * @see https://learn.microsoft.com/en-us/rest/api/storageservices/get-user-delegation-key
     *
     * @param startsOn -      The start time for the user delegation SAS. Must be within 7 days of the current time
     * @param expiresOn -     The end time for the user delegation SAS. Must be within 7 days of the current time
     */
    async getUserDelegationKey(startsOn, expiresOn, options = {}) {
        return tracing_js_1.tracingClient.withSpan("BlobServiceClient-getUserDelegationKey", options, async (updatedOptions) => {
            const response = (0, utils_common_js_2.assertResponse)(await this.serviceContext.getUserDelegationKey({
                startsOn: (0, utils_common_js_2.truncatedISO8061Date)(startsOn, false),
                expiresOn: (0, utils_common_js_2.truncatedISO8061Date)(expiresOn, false),
            }, {
                abortSignal: options.abortSignal,
                tracingOptions: updatedOptions.tracingOptions,
            }));
            const userDelegationKey = {
                signedObjectId: response.signedObjectId,
                signedTenantId: response.signedTenantId,
                signedStartsOn: new Date(response.signedStartsOn),
                signedExpiresOn: new Date(response.signedExpiresOn),
                signedService: response.signedService,
                signedVersion: response.signedVersion,
                value: response.value,
            };
            const res = Object.assign({ _response: response._response, requestId: response.requestId, clientRequestId: response.clientRequestId, version: response.version, date: response.date, errorCode: response.errorCode }, userDelegationKey);
            return res;
        });
    }
    /**
     * Creates a BlobBatchClient object to conduct batch operations.
     *
     * @see https://learn.microsoft.com/en-us/rest/api/storageservices/blob-batch
     *
     * @returns A new BlobBatchClient object for this service.
     */
    getBlobBatchClient() {
        return new BlobBatchClient_js_1.BlobBatchClient(this.url, this.pipeline);
    }
    /**
     * Only available for BlobServiceClient constructed with a shared key credential.
     *
     * Generates a Blob account Shared Access Signature (SAS) URI based on the client properties
     * and parameters passed in. The SAS is signed by the shared key credential of the client.
     *
     * @see https://learn.microsoft.com/en-us/rest/api/storageservices/create-account-sas
     *
     * @param expiresOn - Optional. The time at which the shared access signature becomes invalid. Default to an hour later if not provided.
     * @param permissions - Specifies the list of permissions to be associated with the SAS.
     * @param resourceTypes - Specifies the resource types associated with the shared access signature.
     * @param options - Optional parameters.
     * @returns An account SAS URI consisting of the URI to the resource represented by this client, followed by the generated SAS token.
     */
    generateAccountSasUrl(expiresOn, permissions = AccountSASPermissions_js_1.AccountSASPermissions.parse("r"), resourceTypes = "sco", options = {}) {
        if (!(this.credential instanceof StorageSharedKeyCredential_js_1.StorageSharedKeyCredential)) {
            throw RangeError("Can only generate the account SAS when the client is initialized with a shared key credential");
        }
        if (expiresOn === undefined) {
            const now = new Date();
            expiresOn = new Date(now.getTime() + 3600 * 1000);
        }
        const sas = (0, AccountSASSignatureValues_js_1.generateAccountSASQueryParameters)(Object.assign({ permissions,
            expiresOn,
            resourceTypes, services: AccountSASServices_js_1.AccountSASServices.parse("b").toString() }, options), this.credential).toString();
        return (0, utils_common_js_1.appendToURLQuery)(this.url, sas);
    }
    /**
     * Only available for BlobServiceClient constructed with a shared key credential.
     *
     * Generates string to sign for a Blob account Shared Access Signature (SAS) URI based on
     * the client properties and parameters passed in. The SAS is signed by the shared key credential of the client.
     *
     * @see https://learn.microsoft.com/en-us/rest/api/storageservices/create-account-sas
     *
     * @param expiresOn - Optional. The time at which the shared access signature becomes invalid. Default to an hour later if not provided.
     * @param permissions - Specifies the list of permissions to be associated with the SAS.
     * @param resourceTypes - Specifies the resource types associated with the shared access signature.
     * @param options - Optional parameters.
     * @returns An account SAS URI consisting of the URI to the resource represented by this client, followed by the generated SAS token.
     */
    generateSasStringToSign(expiresOn, permissions = AccountSASPermissions_js_1.AccountSASPermissions.parse("r"), resourceTypes = "sco", options = {}) {
        if (!(this.credential instanceof StorageSharedKeyCredential_js_1.StorageSharedKeyCredential)) {
            throw RangeError("Can only generate the account SAS when the client is initialized with a shared key credential");
        }
        if (expiresOn === undefined) {
            const now = new Date();
            expiresOn = new Date(now.getTime() + 3600 * 1000);
        }
        return (0, AccountSASSignatureValues_js_1.generateAccountSASQueryParametersInternal)(Object.assign({ permissions,
            expiresOn,
            resourceTypes, services: AccountSASServices_js_1.AccountSASServices.parse("b").toString() }, options), this.credential).stringToSign;
    }
}
exports.BlobServiceClient = BlobServiceClient;
//# sourceMappingURL=BlobServiceClient.js.map