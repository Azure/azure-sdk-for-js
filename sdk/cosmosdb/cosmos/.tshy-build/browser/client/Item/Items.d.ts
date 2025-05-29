import { ChangeFeedIterator } from "../../ChangeFeedIterator.js";
import type { ChangeFeedOptions } from "../../ChangeFeedOptions.js";
import type { ClientContext } from "../../ClientContext.js";
import type { SqlQuerySpec } from "../../queryExecutionContext/index.js";
import { QueryIterator } from "../../queryIterator.js";
import type { FeedOptions, RequestOptions, Response } from "../../request/index.js";
import type { Container } from "../Container/index.js";
import type { ItemDefinition } from "./ItemDefinition.js";
import { ItemResponse } from "./ItemResponse.js";
import type { OperationResponse, OperationInput, BulkOptions, BulkOperationResponse, BulkOperationResult } from "../../utils/batch.js";
import type { PartitionKey } from "../../documents/index.js";
import type { ChangeFeedPullModelIterator, ChangeFeedIteratorOptions } from "../../client/ChangeFeed/index.js";
import type { EncryptionQueryBuilder } from "../../encryption/index.js";
/**
 * Operations for creating new items, and reading/querying all items
 *
 * @see {@link Item} for reading, replacing, or deleting an existing container; use `.item(id)`.
 */
export declare class Items {
    readonly container: Container;
    private readonly clientContext;
    private partitionKeyRangeCache;
    /**
     * Create an instance of {@link Items} linked to the parent {@link Container}.
     * @param container - The parent container.
     * @hidden
     */
    constructor(container: Container, clientContext: ClientContext);
    /**
     * Queries all items.
     * @param query - Query configuration for the operation. See {@link SqlQuerySpec} for more info on how to configure a query.
     * @param options - Used for modifying the request (for instance, specifying the partition key).
     * @example Read all items to array.
     * ```ts snippet:ItemsQueryItems
     * import { CosmosClient, SqlQuerySpec } from "@azure/cosmos";
     *
     * const endpoint = "https://your-account.documents.azure.com";
     * const key = "<database account masterkey>";
     * const client = new CosmosClient({ endpoint, key });
     *
     * const { database } = await client.databases.createIfNotExists({ id: "Test Database" });
     *
     * const { container } = await database.containers.createIfNotExists({ id: "Test Container" });
     *
     * const querySpec: SqlQuerySpec = {
     *   query: `SELECT * FROM Families f WHERE f.lastName = @lastName`,
     *   parameters: [{ name: "@lastName", value: "Hendricks" }],
     * };
     * const { resources: items } = await container.items.query(querySpec).fetchAll();
     * ```
     */
    query(query: string | SqlQuerySpec, options?: FeedOptions): QueryIterator<any>;
    /**
     * Queries all items.
     * @param query - Query configuration for the operation. See {@link SqlQuerySpec} for more info on how to configure a query.
     * @param options - Used for modifying the request (for instance, specifying the partition key).
     * @example Read all items to array.
     * ```ts snippet:ItemsQueryItems
     * import { CosmosClient, SqlQuerySpec } from "@azure/cosmos";
     *
     * const endpoint = "https://your-account.documents.azure.com";
     * const key = "<database account masterkey>";
     * const client = new CosmosClient({ endpoint, key });
     *
     * const { database } = await client.databases.createIfNotExists({ id: "Test Database" });
     *
     * const { container } = await database.containers.createIfNotExists({ id: "Test Container" });
     *
     * const querySpec: SqlQuerySpec = {
     *   query: `SELECT * FROM Families f WHERE f.lastName = @lastName`,
     *   parameters: [{ name: "@lastName", value: "Hendricks" }],
     * };
     * const { resources: items } = await container.items.query(querySpec).fetchAll();
     * ```
     */
    query<T>(query: string | SqlQuerySpec, options?: FeedOptions): QueryIterator<T>;
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
    getEncryptionQueryIterator(queryBuilder: EncryptionQueryBuilder, options?: FeedOptions): Promise<QueryIterator<ItemDefinition>>;
    private buildSqlQuerySpec;
    /**
     * Create a `ChangeFeedIterator` to iterate over pages of changes
     *
     * @deprecated Use `getChangeFeedIterator` instead.
     *
     * @example Read from the beginning of the change feed.
     * ```ts snippet:ignore
     * const iterator = items.readChangeFeed({ startFromBeginning: true });
     * const firstPage = await iterator.fetchNext();
     * const firstPageResults = firstPage.result
     * const secondPage = await iterator.fetchNext();
     * ```
     */
    readChangeFeed(partitionKey: PartitionKey, changeFeedOptions?: ChangeFeedOptions): ChangeFeedIterator<any>;
    /**
     * Create a `ChangeFeedIterator` to iterate over pages of changes
     * @deprecated Use `getChangeFeedIterator` instead.
     *
     */
    readChangeFeed(changeFeedOptions?: ChangeFeedOptions): ChangeFeedIterator<any>;
    /**
     * Create a `ChangeFeedIterator` to iterate over pages of changes
     * @deprecated Use `getChangeFeedIterator` instead.
     */
    readChangeFeed<T>(partitionKey: PartitionKey, changeFeedOptions?: ChangeFeedOptions): ChangeFeedIterator<T>;
    /**
     * Create a `ChangeFeedIterator` to iterate over pages of changes
     * @deprecated Use `getChangeFeedIterator` instead.
     */
    readChangeFeed<T>(changeFeedOptions?: ChangeFeedOptions): ChangeFeedIterator<T>;
    /**
     * Create a `ChangeFeedIterator` to iterate over pages of changes
     * @deprecated Use `getChangeFeedIterator` instead.
     * @example Read from the beginning of the change feed.
     * ```ts snippet:ignore
     * const iterator = items.readChangeFeed({ startFromBeginning: true });
     * const firstPage = await iterator.fetchNext();
     * const firstPageResults = firstPage.result
     * const secondPage = await iterator.fetchNext();
     * ```
     */
    changeFeed(partitionKey: PartitionKey, changeFeedOptions?: ChangeFeedOptions): ChangeFeedIterator<any>;
    /**
     * Create a `ChangeFeedIterator` to iterate over pages of changes
     * @deprecated Use `getChangeFeedIterator` instead.
     */
    changeFeed(changeFeedOptions?: ChangeFeedOptions): ChangeFeedIterator<any>;
    /**
     * Create a `ChangeFeedIterator` to iterate over pages of changes
     * @deprecated Use `getChangeFeedIterator` instead.
     */
    changeFeed<T>(partitionKey: PartitionKey, changeFeedOptions?: ChangeFeedOptions): ChangeFeedIterator<T>;
    /**
     * Create a `ChangeFeedIterator` to iterate over pages of changes
     * @deprecated Use `getChangeFeedIterator` instead.
     */
    changeFeed<T>(changeFeedOptions?: ChangeFeedOptions): ChangeFeedIterator<T>;
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
    getChangeFeedIterator<T>(changeFeedIteratorOptions?: ChangeFeedIteratorOptions): ChangeFeedPullModelIterator<T>;
    /**
     * Read all items.
     *
     * There is no set schema for JSON items. They may contain any number of custom properties.
     *
     * @param options - Used for modifying the request (for instance, specifying the partition key).
     * @example Read all items to array.
     * ```ts snippet:ItemsReadAll
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
     * const { resources: containerList } = await container.items.readAll().fetchAll();
     * ```
     */
    readAll(options?: FeedOptions): QueryIterator<ItemDefinition>;
    /**
     * Read all items.
     *
     * Any provided type, T, is not necessarily enforced by the SDK.
     * You may get more or less properties and it's up to your logic to enforce it.
     *
     * There is no set schema for JSON items. They may contain any number of custom properties.
     *
     * @param options - Used for modifying the request (for instance, specifying the partition key).
     * @example Read all items to array.
     * ```ts snippet:ItemsReadAll
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
     * const { resources: containerList } = await container.items.readAll().fetchAll();
     * ```
     */
    readAll<T extends ItemDefinition>(options?: FeedOptions): QueryIterator<T>;
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
    create<T extends ItemDefinition = any>(body: T, options?: RequestOptions): Promise<ItemResponse<T>>;
    /**
     * Upsert an item.
     *
     * There is no set schema for JSON items. They may contain any number of custom properties.
     *
     * @param body - Represents the body of the item. Can contain any number of user defined properties.
     * @param options - Used for modifying the request (for instance, specifying the partition key).
     */
    upsert(body: unknown, options?: RequestOptions): Promise<ItemResponse<ItemDefinition>>;
    /**
     * Upsert an item.
     *
     * Any provided type, T, is not necessarily enforced by the SDK.
     * You may get more or less properties and it's up to your logic to enforce it.
     *
     * There is no set schema for JSON items. They may contain any number of custom properties.
     *
     * @param body - Represents the body of the item. Can contain any number of user defined properties.
     * @param options - Used for modifying the request (for instance, specifying the partition key).
     * @example Upsert an item.
     * ```ts snippet:ItemsUpsert
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
     * const { resource: createdItem1 } = await container.items.create({
     *   id: "<item id 1>",
     *   properties: {},
     * });
     *
     * const { resource: upsertItem1 } = await container.items.upsert({
     *   id: "<item id 1>",
     *   updated_properties: {},
     * });
     *
     * const { resource: upsertItem2 } = await container.items.upsert({
     *   id: "<item id 2>",
     *   properties: {},
     * });
     * ```
     */
    upsert<T extends ItemDefinition>(body: T, options?: RequestOptions): Promise<ItemResponse<T>>;
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
    executeBulkOperations(operations: OperationInput[], options?: RequestOptions): Promise<BulkOperationResult[]>;
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
    bulk(operations: OperationInput[], bulkOptions?: BulkOptions, options?: RequestOptions): Promise<BulkOperationResponse>;
    private executeBatchOperations;
    /**
     * Function to create new batches based of partition key Ranges.
     *
     * @param overlappingRanges - Overlapping partition key ranges.
     * @param batch - Batch to be split.
     * @param partitionKeyDefinition - PartitionKey definition of container.
     * @returns Array of new batches.
     */
    private createNewBatches;
    /**
     * Function to create batches based of partition key Ranges.
     * @param operations - operations to group
     * @param partitionDefinition - PartitionKey definition of container.
     * @param options - Request options for bulk request.
     * @param batches - Groups to be filled with operations.
     */
    private groupOperationsBasedOnPartitionKey;
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
    batch(operations: OperationInput[], partitionKey?: PartitionKey, options?: RequestOptions): Promise<Response<OperationResponse[]>>;
    private bulkBatchEncryptionHelper;
}
//# sourceMappingURL=Items.d.ts.map