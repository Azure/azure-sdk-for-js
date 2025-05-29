"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.Items = void 0;
const ChangeFeedIterator_js_1 = require("../../ChangeFeedIterator.js");
const index_js_1 = require("../../common/index.js");
const extractPartitionKey_js_1 = require("../../extractPartitionKey.js");
const queryIterator_js_1 = require("../../queryIterator.js");
const Item_js_1 = require("./Item.js");
const ItemResponse_js_1 = require("./ItemResponse.js");
const batch_js_1 = require("../../utils/batch.js");
const typeChecks_js_1 = require("../../utils/typeChecks.js");
const hash_js_1 = require("../../utils/hashing/hash.js");
const index_js_2 = require("../../routing/index.js");
const index_js_3 = require("../../documents/index.js");
const changeFeedUtils_js_1 = require("../../client/ChangeFeed/changeFeedUtils.js");
const DiagnosticNodeInternal_js_1 = require("../../diagnostics/DiagnosticNodeInternal.js");
const diagnostics_js_1 = require("../../utils/diagnostics.js");
const core_util_1 = require("@azure/core-util");
const ClientUtils_js_1 = require("../ClientUtils.js");
const ChangeFeedIteratorBuilder_js_1 = require("../ChangeFeed/ChangeFeedIteratorBuilder.js");
const TypeMarker_js_1 = require("../../encryption/enums/TypeMarker.js");
const EncryptionItemQueryIterator_js_1 = require("../../encryption/EncryptionItemQueryIterator.js");
const index_js_4 = require("../../request/index.js");
const BulkHelper_js_1 = require("../../bulk/BulkHelper.js");
/**
 * @hidden
 */
function isChangeFeedOptions(options) {
    return options && !((0, typeChecks_js_1.isPrimitivePartitionKeyValue)(options) || Array.isArray(options));
}
/**
 * Operations for creating new items, and reading/querying all items
 *
 * @see {@link Item} for reading, replacing, or deleting an existing container; use `.item(id)`.
 */
class Items {
    /**
     * Create an instance of {@link Items} linked to the parent {@link Container}.
     * @param container - The parent container.
     * @hidden
     */
    constructor(container, clientContext) {
        this.container = container;
        this.clientContext = clientContext;
        this.partitionKeyRangeCache = new index_js_2.PartitionKeyRangeCache(this.clientContext);
    }
    query(query, options = {}) {
        const path = (0, index_js_1.getPathFromLink)(this.container.url, index_js_1.ResourceType.item);
        const id = (0, index_js_1.getIdFromLink)(this.container.url);
        const fetchFunction = async (diagnosticNode, innerOptions, correlatedActivityId) => {
            const response = await this.clientContext.queryFeed({
                path,
                resourceType: index_js_1.ResourceType.item,
                resourceId: id,
                resultFn: (result) => (result ? result.Documents : []),
                query,
                options: innerOptions,
                partitionKey: options.partitionKey,
                diagnosticNode,
                correlatedActivityId: correlatedActivityId,
            });
            return response;
        };
        let iterator;
        if (this.clientContext.enableEncryption) {
            iterator = new EncryptionItemQueryIterator_js_1.EncryptionItemQueryIterator(this.clientContext, query, options, fetchFunction, this.container);
        }
        else {
            iterator = new queryIterator_js_1.QueryIterator(this.clientContext, query, options, fetchFunction, this.container.url, index_js_1.ResourceType.item);
        }
        return iterator;
    }
    /**
     * Queries all items in an encrypted container.
     * @param queryBuilder - Query configuration for the operation. See {@link SqlQuerySpec} for more info on how to build a query on encrypted properties.
     * @param options - Used for modifying the request (for instance, specifying the partition key).
     * @example Read all items to array.
     * ```ts snippet:ItemsQueryEncryptedItems
     * import { CosmosClient, EncryptionQueryBuilder } from "@azure/cosmos";
     *
     * const endpoint = "https://your-account.documents.azure.com";
     * const key = "<database account masterkey>";
     * const client = new CosmosClient({ endpoint, key });
     *
     * const { database } = await client.databases.createIfNotExists({ id: "Test Database" });
     *
     * const { container } = await database.containers.createIfNotExists({ id: "Test Container" });
     *
     * const queryBuilder = new EncryptionQueryBuilder(
     *   `SELECT firstname FROM Families f WHERE f.lastName = @lastName`,
     * );
     * queryBuilder.addParameter("@lastName", "Hendricks", "/lastname");
     * const queryIterator = await container.items.getEncryptionQueryIterator(queryBuilder);
     * const { resources: items } = await queryIterator.fetchAll();
     * ```
     */
    async getEncryptionQueryIterator(queryBuilder, options = {}) {
        const encryptionSqlQuerySpec = queryBuilder.toEncryptionSqlQuerySpec();
        const sqlQuerySpec = await this.buildSqlQuerySpec(encryptionSqlQuerySpec);
        const iterator = this.query(sqlQuerySpec, options);
        return iterator;
    }
    async buildSqlQuerySpec(encryptionSqlQuerySpec) {
        let encryptionParameters = encryptionSqlQuerySpec.parameters;
        const sqlQuerySpec = {
            query: encryptionSqlQuerySpec.query,
            parameters: [],
        };
        // returns copy to avoid encryption of original parameters passed
        encryptionParameters = (0, index_js_1.copyObject)(encryptionParameters);
        for (const parameter of encryptionParameters) {
            let value;
            if (parameter.type !== undefined || parameter.type !== TypeMarker_js_1.TypeMarker.Null) {
                value = await this.container.encryptionProcessor.encryptQueryParameter(parameter.path, parameter.value, parameter.path === "/id", parameter.type);
            }
            sqlQuerySpec.parameters.push({ name: parameter.name, value: value });
        }
        return sqlQuerySpec;
    }
    readChangeFeed(partitionKeyOrChangeFeedOptions, changeFeedOptions) {
        if (isChangeFeedOptions(partitionKeyOrChangeFeedOptions)) {
            return this.changeFeed(partitionKeyOrChangeFeedOptions);
        }
        else {
            return this.changeFeed(partitionKeyOrChangeFeedOptions, changeFeedOptions);
        }
    }
    changeFeed(partitionKeyOrChangeFeedOptions, changeFeedOptions) {
        let partitionKey;
        if (!changeFeedOptions && isChangeFeedOptions(partitionKeyOrChangeFeedOptions)) {
            partitionKey = undefined;
            changeFeedOptions = partitionKeyOrChangeFeedOptions;
        }
        else if (partitionKeyOrChangeFeedOptions !== undefined &&
            !isChangeFeedOptions(partitionKeyOrChangeFeedOptions)) {
            partitionKey = partitionKeyOrChangeFeedOptions;
        }
        if (!changeFeedOptions) {
            changeFeedOptions = {};
        }
        const path = (0, index_js_1.getPathFromLink)(this.container.url, index_js_1.ResourceType.item);
        const id = (0, index_js_1.getIdFromLink)(this.container.url);
        return new ChangeFeedIterator_js_1.ChangeFeedIterator(this.clientContext, id, path, partitionKey, changeFeedOptions);
    }
    /**
     * Returns an iterator to iterate over pages of changes. The iterator returned can be used to fetch changes for a single partition key, feed range or an entire container.
     *
     * @example
     * ```ts snippet:ReadmeSampleChangeFeedPullModelIteratorPartitionKey
     * import {
     *   CosmosClient,
     *   PartitionKeyDefinitionVersion,
     *   PartitionKeyKind,
     *   ChangeFeedStartFrom,
     * } from "@azure/cosmos";
     *
     * const endpoint = "https://your-account.documents.azure.com";
     * const key = "<database account masterkey>";
     * const client = new CosmosClient({ endpoint, key });
     *
     * const { database } = await client.databases.createIfNotExists({ id: "Test Database" });
     *
     * const containerDefinition = {
     *   id: "Test Database",
     *   partitionKey: {
     *     paths: ["/name", "/address/zip"],
     *     version: PartitionKeyDefinitionVersion.V2,
     *     kind: PartitionKeyKind.MultiHash,
     *   },
     * };
     * const { container } = await database.containers.createIfNotExists(containerDefinition);
     *
     * const partitionKey = "some-partition-Key-value";
     * const options = {
     *   changeFeedStartFrom: ChangeFeedStartFrom.Beginning(partitionKey),
     * };
     *
     * const iterator = container.items.getChangeFeedIterator(options);
     *
     * while (iterator.hasMoreResults) {
     *   const response = await iterator.readNext();
     *   // process this response
     * }
     * ```
     */
    getChangeFeedIterator(changeFeedIteratorOptions) {
        const cfOptions = changeFeedIteratorOptions !== undefined ? changeFeedIteratorOptions : {};
        (0, changeFeedUtils_js_1.validateChangeFeedIteratorOptions)(cfOptions);
        const iterator = new ChangeFeedIteratorBuilder_js_1.ChangeFeedIteratorBuilder(cfOptions, this.clientContext, this.container, this.partitionKeyRangeCache);
        return iterator;
    }
    readAll(options) {
        return this.query("SELECT * from c", options);
    }
    /**
     * Create an item.
     *
     * Any provided type, T, is not necessarily enforced by the SDK.
     * You may get more or less properties and it's up to your logic to enforce it.
     *
     * There is no set schema for JSON items. They may contain any number of custom properties.
     *
     * @param body - Represents the body of the item. Can contain any number of user defined properties.
     * @param options - Used for modifying the request (for instance, specifying the partition key).
     * @example Create an item.
     * ```ts snippet:ContainerItems
     * import { CosmosClient } from "@azure/cosmos";
     *
     * const endpoint = "https://your-account.documents.azure.com";
     * const key = "<database account masterkey>";
     * const client = new CosmosClient({ endpoint, key });
     *
     * const { database } = await client.databases.createIfNotExists({ id: "Test Database" });
     *
     * const { container } = await database.containers.createIfNotExists({ id: "Test Container" });
     *
     * const { resource: createdItem } = await container.items.create({
     *   id: "<item id>",
     *   properties: {},
     * });
     * ```
     */
    async create(body, options = {}) {
        // Generate random document id if the id is missing in the payload and
        // options.disableAutomaticIdGeneration != true
        return (0, diagnostics_js_1.withDiagnostics)(async (diagnosticNode) => {
            if ((body.id === undefined || body.id === "") && !options.disableAutomaticIdGeneration) {
                body.id = (0, core_util_1.randomUUID)();
            }
            const partitionKeyDefinition = await (0, ClientUtils_js_1.readPartitionKeyDefinition)(diagnosticNode, this.container);
            let partitionKey = (0, extractPartitionKey_js_1.extractPartitionKeys)(body, partitionKeyDefinition);
            let response;
            try {
                if (this.clientContext.enableEncryption) {
                    await this.container.checkAndInitializeEncryption();
                    options.containerRid = this.container._rid;
                    // returns copy to avoid encryption of original body passed
                    body = (0, index_js_1.copyObject)(body);
                    diagnosticNode.beginEncryptionDiagnostics(index_js_1.Constants.Encryption.DiagnosticsEncryptOperation);
                    const { body: encryptedBody, propertiesEncryptedCount } = await this.container.encryptionProcessor.encrypt(body);
                    body = encryptedBody;
                    diagnosticNode.endEncryptionDiagnostics(index_js_1.Constants.Encryption.DiagnosticsEncryptOperation, propertiesEncryptedCount);
                    partitionKey = (0, extractPartitionKey_js_1.extractPartitionKeys)(body, partitionKeyDefinition);
                }
                const err = {};
                if (!(0, index_js_1.isItemResourceValid)(body, err)) {
                    throw err;
                }
                const path = (0, index_js_1.getPathFromLink)(this.container.url, index_js_1.ResourceType.item);
                const id = (0, index_js_1.getIdFromLink)(this.container.url);
                response = await this.clientContext.create({
                    body,
                    path,
                    resourceType: index_js_1.ResourceType.item,
                    resourceId: id,
                    diagnosticNode,
                    options,
                    partitionKey,
                });
            }
            catch (error) {
                if (this.clientContext.enableEncryption) {
                    // Todo: internally retry post policy refresh
                    await this.container.throwIfRequestNeedsARetryPostPolicyRefresh(error);
                }
                throw error;
            }
            if (this.clientContext.enableEncryption) {
                // try block for decrypting response. This is done so that we can throw special error message in case of decryption failure
                try {
                    diagnosticNode.beginEncryptionDiagnostics(index_js_1.Constants.Encryption.DiagnosticsDecryptOperation);
                    const { body: decryptedResult, propertiesDecryptedCount } = await this.container.encryptionProcessor.decrypt(response.result);
                    diagnosticNode.endEncryptionDiagnostics(index_js_1.Constants.Encryption.DiagnosticsDecryptOperation, propertiesDecryptedCount);
                    response.result = decryptedResult;
                    partitionKey = (0, extractPartitionKey_js_1.extractPartitionKeys)(response.result, partitionKeyDefinition);
                }
                catch (error) {
                    const decryptionError = new index_js_4.ErrorResponse(`Item creation was successful but response decryption failed: + ${error.message}`);
                    decryptionError.code = index_js_1.StatusCodes.ServiceUnavailable;
                    throw decryptionError;
                }
            }
            const ref = new Item_js_1.Item(this.container, response.result.id, this.clientContext, partitionKey);
            return new ItemResponse_js_1.ItemResponse(response.result, response.headers, response.code, response.substatus, ref, (0, diagnostics_js_1.getEmptyCosmosDiagnostics)());
        }, this.clientContext);
    }
    async upsert(body, options = {}) {
        return (0, diagnostics_js_1.withDiagnostics)(async (diagnosticNode) => {
            // Generate random document id if the id is missing in the payload and
            // options.disableAutomaticIdGeneration != true
            if ((body.id === undefined || body.id === "") && !options.disableAutomaticIdGeneration) {
                body.id = (0, core_util_1.randomUUID)();
            }
            const partitionKeyDefinition = await (0, ClientUtils_js_1.readPartitionKeyDefinition)(diagnosticNode, this.container);
            let partitionKey = (0, extractPartitionKey_js_1.extractPartitionKeys)(body, partitionKeyDefinition);
            let response;
            try {
                if (this.clientContext.enableEncryption) {
                    // returns copy to avoid encryption of original body passed
                    body = (0, index_js_1.copyObject)(body);
                    options = options || {};
                    await this.container.checkAndInitializeEncryption();
                    options.containerRid = this.container._rid;
                    diagnosticNode.beginEncryptionDiagnostics(index_js_1.Constants.Encryption.DiagnosticsEncryptOperation);
                    const { body: encryptedBody, propertiesEncryptedCount } = await this.container.encryptionProcessor.encrypt(body);
                    body = encryptedBody;
                    diagnosticNode.endEncryptionDiagnostics(index_js_1.Constants.Encryption.DiagnosticsEncryptOperation, propertiesEncryptedCount);
                    partitionKey = (0, extractPartitionKey_js_1.extractPartitionKeys)(body, partitionKeyDefinition);
                }
                const err = {};
                if (!(0, index_js_1.isItemResourceValid)(body, err)) {
                    throw err;
                }
                const path = (0, index_js_1.getPathFromLink)(this.container.url, index_js_1.ResourceType.item);
                const id = (0, index_js_1.getIdFromLink)(this.container.url);
                response = await this.clientContext.upsert({
                    body,
                    path,
                    resourceType: index_js_1.ResourceType.item,
                    resourceId: id,
                    options,
                    partitionKey,
                    diagnosticNode,
                });
            }
            catch (error) {
                if (this.clientContext.enableEncryption) {
                    await this.container.throwIfRequestNeedsARetryPostPolicyRefresh(error);
                }
                throw error;
            }
            if (this.clientContext.enableEncryption) {
                try {
                    // try block for decrypting response. This is done so that we can throw special error message in case of decryption failure
                    diagnosticNode.beginEncryptionDiagnostics(index_js_1.Constants.Encryption.DiagnosticsDecryptOperation);
                    const { body: decryptedResult, propertiesDecryptedCount } = await this.container.encryptionProcessor.decrypt(response.result);
                    diagnosticNode.endEncryptionDiagnostics(index_js_1.Constants.Encryption.DiagnosticsDecryptOperation, propertiesDecryptedCount);
                    response.result = decryptedResult;
                    partitionKey = (0, extractPartitionKey_js_1.extractPartitionKeys)(response.result, partitionKeyDefinition);
                }
                catch (error) {
                    const decryptionError = new index_js_4.ErrorResponse(`Item upsert was successful but response decryption failed: + ${error.message}`);
                    decryptionError.code = index_js_1.StatusCodes.ServiceUnavailable;
                    throw decryptionError;
                }
            }
            const ref = new Item_js_1.Item(this.container, response.result.id, this.clientContext, partitionKey);
            return new ItemResponse_js_1.ItemResponse(response.result, response.headers, response.code, response.substatus, ref, (0, diagnostics_js_1.getEmptyCosmosDiagnostics)());
        }, this.clientContext);
    }
    /**
     * Execute bulk operations on items.
     * @param operations - List of operations
     * @param options - used for modifying the request
     * @returns list of operation results corresponding to the operations
     *
     * @example
     * ```ts snippet:ItemsExecuteBulkOperations
     * import { CosmosClient, OperationInput } from "@azure/cosmos";
     *
     * const endpoint = "https://your-account.documents.azure.com";
     * const key = "<database account masterkey>";
     * const client = new CosmosClient({ endpoint, key });
     *
     * const { database } = await client.databases.createIfNotExists({ id: "Test Database" });
     *
     * const { container } = await database.containers.createIfNotExists({ id: "Test Container" });
     *
     * const operations: OperationInput[] = [
     *   {
     *     operationType: "Create",
     *     resourceBody: { id: "doc1", name: "sample", key: "A" },
     *   },
     *   {
     *     operationType: "Upsert",
     *     partitionKey: "A",
     *     resourceBody: { id: "doc2", name: "other", key: "A" },
     *   },
     * ];
     *
     * await container.items.executeBulkOperations(operations);
     * ```
     */
    async executeBulkOperations(operations, options = {}) {
        const bulkHelper = new BulkHelper_js_1.BulkHelper(this.container, this.clientContext, this.partitionKeyRangeCache, options);
        return bulkHelper.execute(operations);
    }
    /**
     * Execute bulk operations on items.
     *
     * Bulk takes an array of Operations which are typed based on what the operation does.
     * The choices are: Create, Upsert, Read, Replace, and Delete
     *
     * Usage example:
     * ```ts snippet:ItemsBulk
     * import { CosmosClient, OperationInput } from "@azure/cosmos";
     *
     * const endpoint = "https://your-account.documents.azure.com";
     * const key = "<database account masterkey>";
     * const client = new CosmosClient({ endpoint, key });
     *
     * const { database } = await client.databases.createIfNotExists({ id: "Test Database" });
     *
     * const { container } = await database.containers.createIfNotExists({ id: "Test Container" });
     *
     * // partitionKey is optional at the top level if present in the resourceBody
     * const operations: OperationInput[] = [
     *   {
     *     operationType: "Create",
     *     resourceBody: { id: "doc1", name: "sample", key: "A" },
     *   },
     *   {
     *     operationType: "Upsert",
     *     partitionKey: "A",
     *     resourceBody: { id: "doc2", name: "other", key: "A" },
     *   },
     * ];
     *
     * await container.items.bulk(operations);
     * ```
     *
     * @param operations - List of operations. Limit 100
     * @param bulkOptions - Optional options object to modify bulk behavior. Pass \{ continueOnError: false \} to stop executing operations when one fails. (Defaults to true)
     * @param options - Used for modifying the request.
     */
    async bulk(operations, bulkOptions, options) {
        return (0, diagnostics_js_1.withDiagnostics)(async (diagnosticNode) => {
            const partitionKeyRanges = (await this.partitionKeyRangeCache.onCollectionRoutingMap(this.container.url, diagnosticNode)).getOrderedParitionKeyRanges();
            const partitionKeyDefinition = await (0, ClientUtils_js_1.readPartitionKeyDefinition)(diagnosticNode, this.container);
            if (this.clientContext.enableEncryption) {
                // returns copy to avoid encryption of original operations body passed
                operations = (0, index_js_1.copyObject)(operations);
                options = options || {};
                await this.container.checkAndInitializeEncryption();
                options.containerRid = this.container._rid;
                diagnosticNode.beginEncryptionDiagnostics(index_js_1.Constants.Encryption.DiagnosticsEncryptOperation);
                const { operations: encryptedOperations, totalPropertiesEncryptedCount } = await this.bulkBatchEncryptionHelper(operations);
                operations = encryptedOperations;
                diagnosticNode.endEncryptionDiagnostics(index_js_1.Constants.Encryption.DiagnosticsEncryptOperation, totalPropertiesEncryptedCount);
            }
            const batches = partitionKeyRanges.map((keyRange) => {
                return {
                    min: keyRange.minInclusive,
                    max: keyRange.maxExclusive,
                    rangeId: keyRange.id,
                    indexes: [],
                    operations: [],
                };
            });
            this.groupOperationsBasedOnPartitionKey(operations, partitionKeyDefinition, options, batches);
            const path = (0, index_js_1.getPathFromLink)(this.container.url, index_js_1.ResourceType.item);
            const orderedResponses = [];
            // split batches based on cumulative size of operations
            const batchMap = batches
                .filter((batch) => batch.operations.length)
                .flatMap((batch) => (0, batch_js_1.splitBatchBasedOnBodySize)(batch));
            await Promise.all(this.executeBatchOperations(batchMap, path, bulkOptions, options, diagnosticNode, orderedResponses, partitionKeyDefinition));
            const response = orderedResponses;
            response.diagnostics = diagnosticNode.toDiagnostic(this.clientContext.getClientConfig());
            return response;
        }, this.clientContext);
    }
    executeBatchOperations(batchMap, path, bulkOptions, options, diagnosticNode, orderedResponses, partitionKeyDefinition) {
        return batchMap.map(async (batch) => {
            if (batch.operations.length > 100) {
                throw new Error("Cannot run bulk request with more than 100 operations per partition");
            }
            let response;
            try {
                response = await (0, diagnostics_js_1.addDiagnosticChild)(async (childNode) => this.clientContext.bulk({
                    body: batch.operations,
                    partitionKeyRangeId: batch.rangeId,
                    path,
                    resourceId: this.container.url,
                    bulkOptions,
                    options,
                    diagnosticNode: childNode,
                }), diagnosticNode, DiagnosticNodeInternal_js_1.DiagnosticNodeType.BATCH_REQUEST);
                response.result.forEach((operationResponse, index) => {
                    orderedResponses[batch.indexes[index]] = operationResponse;
                });
            }
            catch (err) {
                if (this.clientContext.enableEncryption) {
                    await this.container.throwIfRequestNeedsARetryPostPolicyRefresh(err);
                }
                // In the case of 410 errors, we need to recompute the partition key ranges
                // and redo the batch request, however, 410 errors occur for unsupported
                // partition key types as well since we don't support them, so for now we throw
                if (err.code === index_js_1.StatusCodes.Gone) {
                    const isPartitionSplit = err.substatus === index_js_1.SubStatusCodes.PartitionKeyRangeGone ||
                        err.substatus === index_js_1.SubStatusCodes.CompletingSplit;
                    if (isPartitionSplit) {
                        const queryRange = new index_js_2.QueryRange(batch.min, batch.max, true, false);
                        const overlappingRanges = await this.partitionKeyRangeCache.getOverlappingRanges(this.container.url, queryRange, diagnosticNode, true);
                        if (overlappingRanges.length < 1) {
                            throw new Error("Partition split/merge detected but no overlapping ranges found.");
                        }
                        // Handles both merge (overlappingRanges.length === 1) and split (overlappingRanges.length > 1) cases.
                        if (overlappingRanges.length >= 1) {
                            // const splitBatches: Batch[] = [];
                            const newBatches = this.createNewBatches(overlappingRanges, batch, partitionKeyDefinition);
                            await Promise.all(this.executeBatchOperations(newBatches, path, bulkOptions, options, diagnosticNode, orderedResponses, partitionKeyDefinition));
                        }
                    }
                    else {
                        throw new Error("Partition key error. An operation has an unsupported partitionKey type" +
                            err.message);
                    }
                }
                else {
                    throw new Error(`Bulk request errored with: ${err.message}`);
                }
            }
            if (response) {
                try {
                    if (this.clientContext.enableEncryption) {
                        diagnosticNode.beginEncryptionDiagnostics(index_js_1.Constants.Encryption.DiagnosticsDecryptOperation);
                        let count = 0;
                        for (const result of response.result) {
                            if (result.resourceBody) {
                                const { body, propertiesDecryptedCount } = await this.container.encryptionProcessor.decrypt(result.resourceBody);
                                result.resourceBody = body;
                                count += propertiesDecryptedCount;
                            }
                        }
                        diagnosticNode.endEncryptionDiagnostics(index_js_1.Constants.Encryption.DiagnosticsDecryptOperation, count);
                    }
                }
                catch (error) {
                    const decryptionError = new index_js_4.ErrorResponse(`Batch response was received but response decryption failed: + ${error.message}`);
                    decryptionError.code = index_js_1.StatusCodes.ServiceUnavailable;
                    throw decryptionError;
                }
                response.result.forEach((operationResponse, index) => {
                    orderedResponses[batch.indexes[index]] = operationResponse;
                });
            }
        });
    }
    /**
     * Function to create new batches based of partition key Ranges.
     *
     * @param overlappingRanges - Overlapping partition key ranges.
     * @param batch - Batch to be split.
     * @param partitionKeyDefinition - PartitionKey definition of container.
     * @returns Array of new batches.
     */
    createNewBatches(overlappingRanges, batch, partitionKeyDefinition) {
        const newBatches = overlappingRanges.map((keyRange) => {
            return {
                min: keyRange.minInclusive,
                max: keyRange.maxExclusive,
                rangeId: keyRange.id,
                indexes: [],
                operations: [],
            };
        });
        let indexValue = 0;
        batch.operations.forEach((operation) => {
            const partitionKey = JSON.parse(operation.partitionKey);
            const hashed = (0, hash_js_1.hashPartitionKey)((0, typeChecks_js_1.assertNotUndefined)(partitionKey, "undefined value for PartitionKey is not expected during grouping of bulk operations."), partitionKeyDefinition);
            const batchForKey = (0, typeChecks_js_1.assertNotUndefined)(newBatches.find((newBatch) => {
                return (0, batch_js_1.isKeyInRange)(newBatch.min, newBatch.max, hashed);
            }), "No suitable Batch found.");
            batchForKey.operations.push(operation);
            batchForKey.indexes.push(batch.indexes[indexValue]);
            indexValue++;
        });
        return newBatches;
    }
    /**
     * Function to create batches based of partition key Ranges.
     * @param operations - operations to group
     * @param partitionDefinition - PartitionKey definition of container.
     * @param options - Request options for bulk request.
     * @param batches - Groups to be filled with operations.
     */
    groupOperationsBasedOnPartitionKey(operations, partitionDefinition, options, batches) {
        operations.forEach((operationInput, index) => {
            const { operation, partitionKey } = (0, batch_js_1.prepareOperations)(operationInput, partitionDefinition, options);
            const hashed = (0, hash_js_1.hashPartitionKey)((0, typeChecks_js_1.assertNotUndefined)(partitionKey, "undefined value for PartitionKey is not expected during grouping of bulk operations."), partitionDefinition);
            const batchForKey = (0, typeChecks_js_1.assertNotUndefined)(batches.find((batch) => {
                return (0, batch_js_1.isKeyInRange)(batch.min, batch.max, hashed);
            }), "No suitable Batch found.");
            batchForKey.operations.push(operation);
            batchForKey.indexes.push(index);
        });
    }
    /**
     * Execute transactional batch operations on items.
     *
     * Batch takes an array of Operations which are typed based on what the operation does. Batch is transactional and will rollback all operations if one fails.
     * The choices are: Create, Upsert, Read, Replace, and Delete
     *
     * Usage example:
     * ```ts snippet:ItemsBatch
     * import { CosmosClient, OperationInput } from "@azure/cosmos";
     *
     * const endpoint = "https://your-account.documents.azure.com";
     * const key = "<database account masterkey>";
     * const client = new CosmosClient({ endpoint, key });
     *
     * const { database } = await client.databases.createIfNotExists({ id: "Test Database" });
     *
     * const { container } = await database.containers.createIfNotExists({ id: "Test Container" });
     *
     * // The partitionKey is a required second argument. If it’s undefined, it defaults to the expected partition key format.
     * const operations: OperationInput[] = [
     *   {
     *     operationType: "Create",
     *     resourceBody: { id: "doc1", name: "sample", key: "A" },
     *   },
     *   {
     *     operationType: "Upsert",
     *     resourceBody: { id: "doc2", name: "other", key: "A" },
     *   },
     * ];
     *
     * await container.items.batch(operations, "A");
     * ```
     *
     * @param operations - List of operations. Limit 100
     * @param options - Used for modifying the request
     */
    async batch(operations, partitionKey, options) {
        return (0, diagnostics_js_1.withDiagnostics)(async (diagnosticNode) => {
            operations.map((operation) => (0, batch_js_1.decorateBatchOperation)(operation, options));
            partitionKey = await (0, extractPartitionKey_js_1.setPartitionKeyIfUndefined)(diagnosticNode, this.container, partitionKey);
            const path = (0, index_js_1.getPathFromLink)(this.container.url, index_js_1.ResourceType.item);
            if (operations.length > 100) {
                throw new Error("Cannot run batch request with more than 100 operations per partition");
            }
            let response;
            try {
                if (this.clientContext.enableEncryption) {
                    // returns copy to avoid encryption of original operations body passed
                    operations = (0, index_js_1.copyObject)(operations);
                    options = options || {};
                    await this.container.checkAndInitializeEncryption();
                    options.containerRid = this.container._rid;
                    let count = 0;
                    diagnosticNode.beginEncryptionDiagnostics(index_js_1.Constants.Encryption.DiagnosticsEncryptOperation);
                    if (partitionKey) {
                        const partitionKeyInternal = (0, index_js_3.convertToInternalPartitionKey)(partitionKey);
                        const { partitionKeyList, encryptedCount } = await this.container.encryptionProcessor.getEncryptedPartitionKeyValue(partitionKeyInternal);
                        partitionKey = partitionKeyList;
                        count += encryptedCount;
                    }
                    const { operations: encryptedOperations, totalPropertiesEncryptedCount } = await this.bulkBatchEncryptionHelper(operations);
                    operations = encryptedOperations;
                    count += totalPropertiesEncryptedCount;
                    diagnosticNode.endEncryptionDiagnostics(index_js_1.Constants.Encryption.DiagnosticsEncryptOperation, count);
                }
                response = await this.clientContext.batch({
                    body: operations,
                    partitionKey,
                    path,
                    resourceId: this.container.url,
                    options,
                    diagnosticNode,
                });
            }
            catch (err) {
                if (this.clientContext.enableEncryption) {
                    await this.container.throwIfRequestNeedsARetryPostPolicyRefresh(err);
                }
                throw new Error(`Batch request error: ${err.message}`);
            }
            if (this.clientContext.enableEncryption) {
                try {
                    diagnosticNode.beginEncryptionDiagnostics(index_js_1.Constants.Encryption.DiagnosticsDecryptOperation);
                    let count = 0;
                    for (const result of response.result) {
                        if (result.resourceBody) {
                            const { body, propertiesDecryptedCount } = await this.container.encryptionProcessor.decrypt(result.resourceBody);
                            result.resourceBody = body;
                            count += propertiesDecryptedCount;
                        }
                    }
                    diagnosticNode.endEncryptionDiagnostics(index_js_1.Constants.Encryption.DiagnosticsDecryptOperation, count);
                }
                catch (error) {
                    const decryptionError = new index_js_4.ErrorResponse(`Batch response was received but response decryption failed: + ${error.message}`);
                    decryptionError.code = index_js_1.StatusCodes.ServiceUnavailable;
                    throw decryptionError;
                }
            }
            return response;
        }, this.clientContext);
    }
    async bulkBatchEncryptionHelper(operations) {
        let totalPropertiesEncryptedCount = 0;
        const encryptedOperations = [];
        for (const operation of operations) {
            const { operation: encryptedOp, totalPropertiesEncryptedCount: updatedCount } = await (0, batch_js_1.encryptOperationInput)(this.container.encryptionProcessor, operation, totalPropertiesEncryptedCount);
            totalPropertiesEncryptedCount = updatedCount;
            encryptedOperations.push(encryptedOp);
        }
        return { operations: encryptedOperations, totalPropertiesEncryptedCount };
    }
}
exports.Items = Items;
//# sourceMappingURL=Items.js.map