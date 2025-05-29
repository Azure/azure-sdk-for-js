// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { Constants, createDocumentCollectionUri, getIdFromLink, getPathFromLink, HTTPMethod, isResourceValid, ResourceType, StatusCodes, SubStatusCodes, } from "../../common/index.js";
import { convertToInternalPartitionKey } from "../../documents/index.js";
import { ResourceResponse } from "../../request/index.js";
import { ErrorResponse } from "../../request/ErrorResponse.js";
import { Conflict, Conflicts } from "../Conflict/index.js";
import { Item, Items } from "../Item/index.js";
import { Scripts } from "../Script/Scripts.js";
import { ContainerResponse } from "./ContainerResponse.js";
import { Offer } from "../Offer/index.js";
import { OfferResponse } from "../Offer/OfferResponse.js";
import { FeedRangeInternal } from "../ChangeFeed/index.js";
import { getEmptyCosmosDiagnostics, withDiagnostics, withMetadataDiagnostics, } from "../../utils/diagnostics.js";
import { MetadataLookUpType } from "../../CosmosDiagnostics.js";
import { EncryptionProcessor } from "../../encryption/index.js";
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
export class Container {
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
    get items() {
        if (!this.$items) {
            this.$items = new Items(this, this.clientContext);
        }
        return this.$items;
    }
    /**
     * All operations for Stored Procedures, Triggers, and User Defined Functions
     */
    get scripts() {
        if (!this.$scripts) {
            this.$scripts = new Scripts(this, this.clientContext);
        }
        return this.$scripts;
    }
    /**
     * Operations for reading and querying conflicts for the given container.
     *
     * For reading or deleting a specific conflict, use `.conflict(id)`.
     */
    get conflicts() {
        if (!this.$conflicts) {
            this.$conflicts = new Conflicts(this, this.clientContext);
        }
        return this.$conflicts;
    }
    /**
     * Returns a reference URL to the resource. Used for linking in Permissions.
     */
    get url() {
        return createDocumentCollectionUri(this.database.id, this.id);
    }
    /**
     * Returns a container instance. Note: You should get this from `database.container(id)`, rather than creating your own object.
     * @param database - The parent {@link Database}.
     * @param id - The id of the given container.
     * @hidden
     */
    constructor(database, id, clientContext, encryptionManager, _rid) {
        this.database = database;
        this.id = id;
        this.clientContext = clientContext;
        this.encryptionManager = encryptionManager;
        this.isEncryptionInitialized = false;
        this._rid = _rid;
        if (this.clientContext.enableEncryption) {
            this.encryptionProcessor = new EncryptionProcessor(this.id, this._rid, this.database, this.clientContext, this.encryptionManager);
        }
    }
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
    item(id, partitionKeyValue) {
        return new Item(this, id, this.clientContext, partitionKeyValue);
    }
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
    conflict(id, partitionKey) {
        return new Conflict(this, id, this.clientContext, partitionKey);
    }
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
    async read(options) {
        return withDiagnostics(async (diagnosticNode) => {
            return this.readInternal(diagnosticNode, options);
        }, this.clientContext);
    }
    /**
     * @hidden
     */
    async readInternal(diagnosticNode, options) {
        const path = getPathFromLink(this.url);
        const id = getIdFromLink(this.url);
        const response = await this.clientContext.read({
            path,
            resourceType: ResourceType.container,
            resourceId: id,
            options,
            diagnosticNode,
        });
        this.clientContext.partitionKeyDefinitionCache[this.url] = response.result.partitionKey;
        return new ContainerResponse(response.result, response.headers, response.code, this, getEmptyCosmosDiagnostics());
    }
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
    async replace(body, options) {
        return withDiagnostics(async (diagnosticNode) => {
            const err = {};
            if (!isResourceValid(body, err)) {
                throw err;
            }
            const path = getPathFromLink(this.url);
            const id = getIdFromLink(this.url);
            const response = await this.clientContext.replace({
                body,
                path,
                resourceType: ResourceType.container,
                resourceId: id,
                options,
                diagnosticNode,
            });
            return new ContainerResponse(response.result, response.headers, response.code, this, getEmptyCosmosDiagnostics());
        }, this.clientContext);
    }
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
    async delete(options) {
        return withDiagnostics(async (diagnosticNode) => {
            const path = getPathFromLink(this.url);
            const id = getIdFromLink(this.url);
            const response = await this.clientContext.delete({
                path,
                resourceType: ResourceType.container,
                resourceId: id,
                options,
                diagnosticNode,
            });
            return new ContainerResponse(response.result, response.headers, response.code, this, getEmptyCosmosDiagnostics());
        }, this.clientContext);
    }
    /**
     * Gets the partition key definition first by looking into the cache otherwise by reading the collection.
     * @deprecated This method has been renamed to readPartitionKeyDefinition.
     */
    async getPartitionKeyDefinition() {
        return withDiagnostics(async (diagnosticNode) => {
            return this.readPartitionKeyDefinition(diagnosticNode);
        }, this.clientContext);
    }
    /**
     * Gets the partition key definition first by looking into the cache otherwise by reading the collection.
     * @hidden
     */
    async readPartitionKeyDefinition(diagnosticNode) {
        // $ISSUE-felixfan-2016-03-17: Make name based path and link based path use the same key
        // $ISSUE-felixfan-2016-03-17: Refresh partitionKeyDefinitionCache when necessary
        if (this.url in this.clientContext.partitionKeyDefinitionCache) {
            diagnosticNode.addData({ readFromCache: true });
            return new ResourceResponse(this.clientContext.partitionKeyDefinitionCache[this.url], {}, 0, getEmptyCosmosDiagnostics());
        }
        const { headers, statusCode, diagnostics } = await withMetadataDiagnostics(async (node) => {
            return this.readInternal(node);
        }, diagnosticNode, MetadataLookUpType.ContainerLookUp);
        return new ResourceResponse(this.clientContext.partitionKeyDefinitionCache[this.url], headers, statusCode, diagnostics);
    }
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
    async readOffer(options = {}) {
        return withDiagnostics(async (diagnosticNode) => {
            const { resource: container } = await this.read();
            const path = "/offers";
            const url = container._self;
            const response = await this.clientContext.queryFeed({
                path,
                resourceId: "",
                resourceType: ResourceType.offer,
                query: `SELECT * from root where root.resource = "${url}"`,
                resultFn: (result) => result.Offers,
                options,
                diagnosticNode,
            });
            const offer = response.result[0]
                ? new Offer(this.database.client, response.result[0].id, this.clientContext)
                : undefined;
            return new OfferResponse(response.result[0], response.headers, response.code, getEmptyCosmosDiagnostics(), offer);
        }, this.clientContext);
    }
    async getQueryPlan(query) {
        return withDiagnostics(async (diagnosticNode) => {
            const path = getPathFromLink(this.url);
            return this.clientContext.getQueryPlan(path + "/docs", ResourceType.item, getIdFromLink(this.url), query, {}, diagnosticNode);
        }, this.clientContext);
    }
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
    readPartitionKeyRanges(feedOptions) {
        feedOptions = feedOptions || {};
        return this.clientContext.queryPartitionKeyRanges(this.url, undefined, feedOptions);
    }
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
    async getFeedRanges() {
        return withDiagnostics(async (diagnosticNode) => {
            const { resources } = await this.readPartitionKeyRanges().fetchAllInternal(diagnosticNode);
            const feedRanges = [];
            for (const resource of resources) {
                const feedRange = new FeedRangeInternal(resource.minInclusive, resource.maxExclusive);
                Object.freeze(feedRange);
                feedRanges.push(feedRange);
            }
            return feedRanges;
        }, this.clientContext);
    }
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
    async deleteAllItemsForPartitionKey(partitionKey, options) {
        return withDiagnostics(async (diagnosticNode) => {
            let path = getPathFromLink(this.url);
            const id = getIdFromLink(this.url);
            path = path + "/operations/partitionkeydelete";
            if (this.clientContext.enableEncryption) {
                await this.checkAndInitializeEncryption();
                options = options || {};
                options.containerRid = this._rid;
                diagnosticNode.beginEncryptionDiagnostics(Constants.Encryption.DiagnosticsEncryptOperation);
                const partitionKeyInternal = convertToInternalPartitionKey(partitionKey);
                const { partitionKeyList, encryptedCount } = await this.encryptionProcessor.getEncryptedPartitionKeyValue(partitionKeyInternal);
                partitionKey = partitionKeyList;
                diagnosticNode.endEncryptionDiagnostics(Constants.Encryption.DiagnosticsEncryptOperation, encryptedCount);
            }
            let response;
            try {
                response = await this.clientContext.delete({
                    path,
                    resourceType: ResourceType.container,
                    resourceId: id,
                    options,
                    partitionKey: partitionKey,
                    method: HTTPMethod.post,
                    diagnosticNode,
                });
            }
            catch (error) {
                if (this.clientContext.enableEncryption) {
                    await this.throwIfRequestNeedsARetryPostPolicyRefresh(error);
                }
                throw error;
            }
            return new ContainerResponse(response.result, response.headers, response.code, this, getEmptyCosmosDiagnostics());
        }, this.clientContext);
    }
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
    async initializeEncryption() {
        if (!this.clientContext.enableEncryption) {
            throw new ErrorResponse("Encryption is not enabled for the client.");
        }
        else {
            await withDiagnostics(async (diagnosticNode) => {
                const readResponse = await this.readInternal(diagnosticNode);
                if (!readResponse || !readResponse.resource) {
                    throw new ErrorResponse("Failed to initialize encryption: The container's resource definition could not be retrieved.");
                }
                this._rid = readResponse.resource._rid;
                this.encryptionProcessor.containerRid = this._rid;
                const clientEncryptionPolicy = readResponse.resource.clientEncryptionPolicy;
                if (!clientEncryptionPolicy)
                    return;
                const partitionKeyPaths = readResponse.resource.partitionKey.paths;
                const databaseResponse = await this.database.readInternal(diagnosticNode);
                if (!databaseResponse || !databaseResponse.resource) {
                    throw new ErrorResponse("Failed to initialize encryption: The database's resource definition could not be retrieved.");
                }
                this.database._rid = databaseResponse.resource._rid;
                const encryptionSettingKey = this.database._rid + "/" + this._rid;
                await this.encryptionManager.encryptionSettingsCache.create(encryptionSettingKey, this._rid, partitionKeyPaths, clientEncryptionPolicy);
                const clientEncryptionKeyIds = [
                    ...new Set(clientEncryptionPolicy.includedPaths.map((item) => item.clientEncryptionKeyId)),
                ];
                // fetch and set clientEncryptionKeys in the cache
                for (const clientEncryptionKeyId of clientEncryptionKeyIds) {
                    const res = await this.database.readClientEncryptionKey(clientEncryptionKeyId);
                    if (!res || !res.clientEncryptionKeyProperties) {
                        throw new ErrorResponse(`Failed to initialize encryption: The client encryption key ${clientEncryptionKeyId} could not be retrieved.`);
                    }
                    const encryptionKeyProperties = res.clientEncryptionKeyProperties;
                    const key = this.database._rid + "/" + clientEncryptionKeyId;
                    this.encryptionManager.clientEncryptionKeyPropertiesCache.set(key, encryptionKeyProperties);
                }
                this.isEncryptionInitialized = true;
            }, this.clientContext);
        }
    }
    /**
     * @internal
     */
    async checkAndInitializeEncryption() {
        if (!this.isEncryptionInitialized) {
            if (!this.encryptionInitializationPromise) {
                this.encryptionInitializationPromise = this.initializeEncryption();
            }
            await this.encryptionInitializationPromise;
        }
    }
    /**
     * @internal
     * This function handles the scenario where a container is deleted(say from different Client) and recreated with same Id but with different client encryption policy.
     * The idea is to have the container Rid cached and sent out as part of RequestOptions with Container Rid set in "x-ms-cosmos-intended-collection-rid" header.
     * So, when the container being referenced here gets recreated we would end up with a stale encryption settings and container Rid and this would result in BadRequest (and a substatus 1024).
     * This would allow us to refresh the encryption settings and Container Rid, on the premise that the container recreated could possibly be configured with a new encryption policy.
     */
    async throwIfRequestNeedsARetryPostPolicyRefresh(errorResponse) {
        var _a;
        const key = this.database._rid + "/" + this._rid;
        const encryptionSetting = this.encryptionManager.encryptionSettingsCache.get(key);
        if (!(errorResponse === null || errorResponse === void 0 ? void 0 : errorResponse.code) || !((_a = errorResponse === null || errorResponse === void 0 ? void 0 : errorResponse.headers) === null || _a === void 0 ? void 0 : _a[Constants.HttpHeaders.SubStatus])) {
            return;
        }
        const subStatusCode = errorResponse.headers[Constants.HttpHeaders.SubStatus];
        const isPartitionKeyMismatch = Number(subStatusCode) === SubStatusCodes.PartitionKeyMismatch;
        const isIncorrectContainerRidSubstatus = Number(subStatusCode) === SubStatusCodes.IncorrectContainerRidSubstatus;
        if (errorResponse.code === StatusCodes.BadRequest &&
            (isPartitionKeyMismatch || isIncorrectContainerRidSubstatus)) {
            // This code verifies if the partitionKeyPaths are encrypted.
            // If the paths are not encrypted, it indicates that the application passed an incorrect partition key in the request.
            // This ensures the issue is not caused by a mismatched encrypted value due to a policy error,
            // avoiding unnecessary force-refreshing of encryption settings.
            if (isPartitionKeyMismatch && encryptionSetting.partitionKeyPaths.length) {
                let encryptionSettingsForProperty = null;
                for (const path of encryptionSetting.partitionKeyPaths) {
                    const partitionKeyPath = path.split("/")[1];
                    encryptionSettingsForProperty =
                        encryptionSetting.getEncryptionSettingForProperty(partitionKeyPath);
                    if (encryptionSettingsForProperty) {
                        break;
                    }
                }
                // wrong partition key passed as partition key is not encrypted.
                if (encryptionSettingsForProperty == null) {
                    return;
                }
            }
            const currentContainerRid = encryptionSetting.containerRid;
            const forceRefresh = true;
            // fetch rid of newly created container
            const updatedContainerRid = (await this.encryptionProcessor.getEncryptionSetting(forceRefresh)).containerRid;
            // if the container was not recreated, so policy has not changed, just return the original response
            if (currentContainerRid === updatedContainerRid) {
                return;
            }
            await this.initializeEncryption();
            throw new ErrorResponse("Operation has failed due to a possible mismatch in Client Encryption Policy configured on the container. Retrying may fix the issue. Please refer to https://aka.ms/CosmosClientEncryption for more details." +
                errorResponse.message);
        }
    }
}
//# sourceMappingURL=Container.js.map