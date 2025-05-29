import type { ClientContext } from "../../ClientContext.js";
import type { PartitionKey, PartitionKeyDefinition } from "../../documents/index.js";
import type { SqlQuerySpec } from "../../queryExecutionContext/index.js";
import type { QueryIterator } from "../../queryIterator.js";
import type { FeedOptions, RequestOptions, Response } from "../../request/index.js";
import { ResourceResponse } from "../../request/index.js";
import type { PartitionedQueryExecutionInfo } from "../../request/ErrorResponse.js";
import { Conflict, Conflicts } from "../Conflict/index.js";
import type { Database } from "../Database/index.js";
import { Item, Items } from "../Item/index.js";
import { Scripts } from "../Script/Scripts.js";
import type { ContainerDefinition } from "./ContainerDefinition.js";
import { ContainerResponse } from "./ContainerResponse.js";
import type { PartitionKeyRange } from "./PartitionKeyRange.js";
import { OfferResponse } from "../Offer/OfferResponse.js";
import type { FeedRange } from "../ChangeFeed/index.js";
import type { DiagnosticNodeInternal } from "../../diagnostics/DiagnosticNodeInternal.js";
import type { EncryptionManager } from "../../encryption/EncryptionManager.js";
/**
 * Operations for reading, replacing, or deleting a specific, existing container by id.
 *
 * @see {@link Containers} for creating new containers, and reading/querying all containers; use `.containers`.
 *
 * Note: all these operations make calls against a fixed budget.
 * You should design your system such that these calls scale sublinearly with your application.
 * For instance, do not call `container(id).read()` before every single `item.read()` call, to ensure the container exists;
 * do this once on application start up.
 */
export declare class Container {
    readonly database: Database;
    readonly id: string;
    private readonly clientContext;
    private encryptionManager?;
    private $items;
    /**
     * Operations for creating new items, and reading/querying all items
     *
     * For reading, replacing, or deleting an existing item, use `.item(id)`.
     *
     * @example Create a new item
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
    get items(): Items;
    private $scripts;
    /**
     * All operations for Stored Procedures, Triggers, and User Defined Functions
     */
    get scripts(): Scripts;
    private $conflicts;
    /**
     * Operations for reading and querying conflicts for the given container.
     *
     * For reading or deleting a specific conflict, use `.conflict(id)`.
     */
    get conflicts(): Conflicts;
    /**
     * Returns a reference URL to the resource. Used for linking in Permissions.
     */
    get url(): string;
    private isEncryptionInitialized;
    private encryptionInitializationPromise;
    /**
     * Returns a container instance. Note: You should get this from `database.container(id)`, rather than creating your own object.
     * @param database - The parent {@link Database}.
     * @param id - The id of the given container.
     * @hidden
     */
    constructor(database: Database, id: string, clientContext: ClientContext, encryptionManager?: EncryptionManager, _rid?: string);
    /**
     * Used to read, replace, or delete a specific, existing {@link Item} by id.
     *
     * Use `.items` for creating new items, or querying/reading all items.
     *
     * @param id - The id of the {@link Item}.
     * @param partitionKeyValue - The value of the {@link Item} partition key
     * @example Replace an item
     * ```ts snippet:ContainerItem
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
     * const { body: replacedItem } = await container
     *   .item("<item id>", "<partition key value>")
     *   .replace({ id: "<item id>", title: "Updated post", authorID: 5 });
     * ```
     */
    item(id: string, partitionKeyValue?: PartitionKey): Item;
    /**
     * Used to read, replace, or delete a specific, existing {@link Conflict} by id.
     *
     * Use `.conflicts` for creating new conflicts, or querying/reading all conflicts.
     * @param id - The id of the {@link Conflict}.
     * @example
     * ```ts snippet:ConflictRead
     * import { CosmosClient } from "@azure/cosmos";
     *
     * const endpoint = "https://your-account.documents.azure.com";
     * const key = "<database account masterkey>";
     * const client = new CosmosClient({ endpoint, key });
     * const { database } = await client.databases.createIfNotExists({ id: "Test Database" });
     * const container = database.container("Test Container");
     *
     * const { resource: conflict } = await container.conflict("<conflict-id>").read();
     * ```
     */
    conflict(id: string, partitionKey?: PartitionKey): Conflict;
    /**
     * Read the container's definition
     * @example
     * ```ts snippet:ContainerRead
     * import { CosmosClient } from "@azure/cosmos";
     *
     * const endpoint = "https://your-account.documents.azure.com";
     * const key = "<database account masterkey>";
     * const client = new CosmosClient({ endpoint, key });
     *
     * const { resource: database } = await client.database("<db id>").container("<container id>").read();
     * ```
     */
    read(options?: RequestOptions): Promise<ContainerResponse>;
    /**
     * @hidden
     */
    readInternal(diagnosticNode: DiagnosticNodeInternal, options?: RequestOptions): Promise<ContainerResponse>;
    /**
     * Replace the container's definition
     * @example
     * ```ts snippet:ContainerReplace
     * import { CosmosClient } from "@azure/cosmos";
     *
     * const endpoint = "https://your-account.documents.azure.com";
     * const key = "<database account masterkey>";
     * const client = new CosmosClient({ endpoint, key });
     *
     * const { database } = await client.databases.createIfNotExists({ id: "Test Database" });
     *
     * const containerDefinition = {
     *   id: "Test Container",
     *   partitionKey: {
     *     paths: ["/key1"],
     *   },
     *   throughput: 1000,
     * };
     * const { container } = await database.containers.createIfNotExists(containerDefinition);
     *
     * containerDefinition.throughput = 400;
     * const { container: replacedContainer } = await container.replace(containerDefinition);
     * ```
     */
    replace(body: ContainerDefinition, options?: RequestOptions): Promise<ContainerResponse>;
    /**
     * Delete the container
     * @example
     * ```ts snippet:DatabaseDeleteContainer
     * import { CosmosClient } from "@azure/cosmos";
     *
     * const endpoint = "https://your-account.documents.azure.com";
     * const key = "<database account masterkey>";
     * const client = new CosmosClient({ endpoint, key });
     *
     * await client.database("<db id>").container("<container id>").delete();
     * ```
     */
    delete(options?: RequestOptions): Promise<ContainerResponse>;
    /**
     * Gets the partition key definition first by looking into the cache otherwise by reading the collection.
     * @deprecated This method has been renamed to readPartitionKeyDefinition.
     */
    getPartitionKeyDefinition(): Promise<ResourceResponse<PartitionKeyDefinition>>;
    /**
     * Gets the partition key definition first by looking into the cache otherwise by reading the collection.
     * @hidden
     */
    readPartitionKeyDefinition(diagnosticNode: DiagnosticNodeInternal): Promise<ResourceResponse<PartitionKeyDefinition>>;
    /**
     * Gets offer on container. If none exists, returns an OfferResponse with undefined.
     * @example
     * ```ts snippet:ContainerReadOffer
     * import { CosmosClient } from "@azure/cosmos";
     *
     * const endpoint = "https://your-account.documents.azure.com";
     * const key = "<database account masterkey>";
     * const client = new CosmosClient({ endpoint, key });
     *
     * const { resource: offer } = await client
     *   .database("<db id>")
     *   .container("<container id>")
     *   .readOffer();
     * ```
     */
    readOffer(options?: RequestOptions): Promise<OfferResponse>;
    getQueryPlan(query: string | SqlQuerySpec): Promise<Response<PartitionedQueryExecutionInfo>>;
    /**
     * Gets the partition key ranges for the container.
     * @param feedOptions - Options for the request.
     * @returns An iterator of partition key ranges.
     * @example
     * ```ts snippet:ContainerReadPartitionKeyRanges
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
     * const { resources: ranges } = await container.readPartitionKeyRanges().fetchAll();
     * ```
     */
    readPartitionKeyRanges(feedOptions?: FeedOptions): QueryIterator<PartitionKeyRange>;
    /**
     *
     * @returns all the feed ranges for which changefeed could be fetched.
     * @example
     * ```ts snippet:ContainerGetFeedRanges
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
     * const { resources: ranges } = await container.getFeedRanges();
     * ```
     */
    getFeedRanges(): Promise<ReadonlyArray<FeedRange>>;
    /**
     * Delete all documents belong to the container for the provided partition key value
     * @param partitionKey - The partition key value of the items to be deleted
     * @example
     * ```ts snippet:ContainerDeleteAllItemsForPartitionKey
     * import { CosmosClient } from "@azure/cosmos";
     *
     * const endpoint = "https://your-account.documents.azure.com";
     * const key = "<database account masterkey>";
     * const client = new CosmosClient({ endpoint, key });
     *
     * const { database } = await client.databases.createIfNotExists({ id: "Test Database" });
     *
     * const { container } = await database.containers.createIfNotExists({
     *   id: "Test Container",
     *   partitionKey: {
     *     paths: ["/state"],
     *   },
     * });
     *
     * const cities = [
     *   { id: "1", name: "Olympia", state: "WA", isCapitol: true },
     *   { id: "2", name: "Redmond", state: "WA", isCapitol: false },
     *   { id: "3", name: "Olympia", state: "IL", isCapitol: false },
     * ];
     * for (const city of cities) {
     *   await container.items.create(city);
     * }
     *
     * await container.deleteAllItemsForPartitionKey("WA");
     * ```
     */
    deleteAllItemsForPartitionKey(partitionKey: PartitionKey, options?: RequestOptions): Promise<ContainerResponse>;
    /**
     * Warms up encryption related caches for the container.
     * @example
     * ```ts snippet:ContainerIntializeEncryption
     * import { ClientSecretCredential } from "@azure/identity";
     * import {
     *   AzureKeyVaultEncryptionKeyResolver,
     *   CosmosClient,
     *   EncryptionType,
     *   EncryptionAlgorithm,
     *   ClientEncryptionIncludedPath,
     *   ClientEncryptionPolicy,
     * } from "@azure/cosmos";
     *
     * const endpoint = "https://your-account.documents.azure.com";
     * const key = "<database account masterkey>";
     * const credentials = new ClientSecretCredential("<tenant-id>", "<client-id>", "<app-secret>");
     * const keyResolver = new AzureKeyVaultEncryptionKeyResolver(credentials);
     * const client = new CosmosClient({
     *   endpoint,
     *   key,
     *   clientEncryptionOptions: {
     *     keyEncryptionKeyResolver: keyResolver,
     *   },
     * });
     * const { database } = await client.databases.createIfNotExists({ id: "<db id>" });
     *
     * const paths = ["/path1", "/path2", "/path3"].map(
     *   (path) =>
     *     ({
     *       path: path,
     *       clientEncryptionKeyId: "< cek - id >",
     *       encryptionType: EncryptionType.DETERMINISTIC,
     *       encryptionAlgorithm: EncryptionAlgorithm.AEAD_AES_256_CBC_HMAC_SHA256,
     *     }) as ClientEncryptionIncludedPath,
     * );
     * const clientEncryptionPolicy: ClientEncryptionPolicy = {
     *   includedPaths: paths,
     *   policyFormatVersion: 2,
     * };
     * const containerDefinition = {
     *   id: "Test Container",
     *   partitionKey: {
     *     paths: ["/id"],
     *   },
     *   clientEncryptionPolicy: clientEncryptionPolicy,
     * };
     * const { container } = await database.containers.createIfNotExists(containerDefinition);
     *
     * await container.initializeEncryption();
     * ```
     */
    initializeEncryption(): Promise<void>;
}
//# sourceMappingURL=Container.d.ts.map