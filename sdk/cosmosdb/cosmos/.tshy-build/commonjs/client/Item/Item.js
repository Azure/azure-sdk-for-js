"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Item = void 0;
const index_js_1 = require("../../common/index.js");
const index_js_2 = require("../../documents/index.js");
const index_js_3 = require("../../request/index.js");
const patch_js_1 = require("../../utils/patch.js");
const ItemResponse_js_1 = require("./ItemResponse.js");
const diagnostics_js_1 = require("../../utils/diagnostics.js");
const extractPartitionKey_js_1 = require("../../extractPartitionKey.js");
/**
 * Used to perform operations on a specific item.
 *
 * @see {@link Items} for operations on all items; see `container.items`.
 */
class Item {
    /**
     * Returns a reference URL to the resource. Used for linking in Permissions.
     */
    get url() {
        return (0, index_js_1.createDocumentUri)(this.container.database.id, this.container.id, this.id);
    }
    /**
     * @hidden
     * @param container - The parent {@link Container}.
     * @param id - The id of the given {@link Item}.
     * @param partitionKey - The primary key of the given {@link Item} (only for partitioned containers).
     */
    constructor(container, id, clientContext, partitionKey) {
        this.container = container;
        this.id = id;
        this.clientContext = clientContext;
        this.partitionKey =
            partitionKey === undefined ? undefined : (0, index_js_2.convertToInternalPartitionKey)(partitionKey);
    }
    /**
     * Read the item's definition.
     *
     * Any provided type, T, is not necessarily enforced by the SDK.
     * You may get more or less properties and it's up to your logic to enforce it.
     * If the type, T, is a class, it won't pass `typeof` comparisons, because it won't have a match prototype.
     * It's recommended to only use interfaces.
     *
     * There is no set schema for JSON items. They may contain any number of custom properties.
     *
     * @param options - Additional options for the request
     *
     * @example Using custom type for response
     * ```ts snippet:ItemRead
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
     * interface TodoItem {
     *   title: string;
     *   done: boolean;
     *   id: string;
     * }
     *
     * const { resource: item } = await container.item("id", "<pkValue>").read<TodoItem>();
     * ```
     */
    async read(options = {}) {
        return (0, diagnostics_js_1.withDiagnostics)(async (diagnosticNode) => {
            this.partitionKey = await (0, extractPartitionKey_js_1.setPartitionKeyIfUndefined)(diagnosticNode, this.container, this.partitionKey);
            let url = this.url;
            let partitionKey = this.partitionKey;
            let response;
            try {
                if (this.clientContext.enableEncryption) {
                    await this.container.checkAndInitializeEncryption();
                    options.containerRid = this.container._rid;
                    let count = 0;
                    diagnosticNode.beginEncryptionDiagnostics(index_js_1.Constants.Encryption.DiagnosticsEncryptOperation);
                    const { partitionKeyList: encryptedPartitionKey, encryptedCount } = await this.container.encryptionProcessor.getEncryptedPartitionKeyValue(this.partitionKey);
                    partitionKey = encryptedPartitionKey;
                    count += encryptedCount;
                    if (await this.container.encryptionProcessor.isPathEncrypted("/id")) {
                        url = await this.container.encryptionProcessor.getEncryptedUrl(this.url);
                        count++;
                    }
                    diagnosticNode.endEncryptionDiagnostics(index_js_1.Constants.Encryption.DiagnosticsEncryptOperation, count);
                }
                const path = (0, index_js_1.getPathFromLink)(url);
                const id = (0, index_js_1.getIdFromLink)(url);
                response = await this.clientContext.read({
                    path,
                    resourceType: index_js_1.ResourceType.item,
                    resourceId: id,
                    options,
                    partitionKey: partitionKey,
                    diagnosticNode,
                });
            }
            catch (error) {
                if (this.clientContext.enableEncryption) {
                    await this.container.throwIfRequestNeedsARetryPostPolicyRefresh(error);
                }
                if (error.code !== index_js_1.StatusCodes.NotFound) {
                    throw error;
                }
                response = error;
            }
            if (this.clientContext.enableEncryption) {
                diagnosticNode.beginEncryptionDiagnostics(index_js_1.Constants.Encryption.DiagnosticsDecryptOperation);
                const { body, propertiesDecryptedCount } = await this.container.encryptionProcessor.decrypt(response.result);
                diagnosticNode.endEncryptionDiagnostics(index_js_1.Constants.Encryption.DiagnosticsDecryptOperation, propertiesDecryptedCount);
                response.result = body;
            }
            return new ItemResponse_js_1.ItemResponse(response.result, response.headers, response.code, response.substatus, this, (0, diagnostics_js_1.getEmptyCosmosDiagnostics)());
        }, this.clientContext);
    }
    async replace(body, options = {}) {
        return (0, diagnostics_js_1.withDiagnostics)(async (diagnosticNode) => {
            this.partitionKey = await (0, extractPartitionKey_js_1.setPartitionKeyIfUndefined)(diagnosticNode, this.container, this.partitionKey);
            let partitionKey = this.partitionKey;
            const err = {};
            if (!(0, index_js_1.isItemResourceValid)(body, err)) {
                throw err;
            }
            let url = this.url;
            let response;
            try {
                if (this.clientContext.enableEncryption) {
                    // returns copy to avoid encryption of original body passed
                    body = (0, index_js_1.copyObject)(body);
                    options = options || {};
                    await this.container.checkAndInitializeEncryption();
                    options.containerRid = this.container._rid;
                    let count = 0;
                    diagnosticNode.beginEncryptionDiagnostics(index_js_1.Constants.Encryption.DiagnosticsEncryptOperation);
                    const { body: encryptedBody, propertiesEncryptedCount } = await this.container.encryptionProcessor.encrypt(body);
                    body = encryptedBody;
                    count += propertiesEncryptedCount;
                    const { partitionKeyList: encryptedPartitionKeyList, encryptedCount } = await this.container.encryptionProcessor.getEncryptedPartitionKeyValue(this.partitionKey);
                    partitionKey = encryptedPartitionKeyList;
                    count += encryptedCount;
                    if (await this.container.encryptionProcessor.isPathEncrypted("/id")) {
                        url = await this.container.encryptionProcessor.getEncryptedUrl(this.url);
                        count++;
                    }
                    diagnosticNode.endEncryptionDiagnostics(index_js_1.Constants.Encryption.DiagnosticsEncryptOperation, count);
                }
                const path = (0, index_js_1.getPathFromLink)(url);
                const id = (0, index_js_1.getIdFromLink)(url);
                response = await this.clientContext.replace({
                    body,
                    path,
                    resourceType: index_js_1.ResourceType.item,
                    resourceId: id,
                    options,
                    partitionKey: partitionKey,
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
                    const { body: result, propertiesDecryptedCount } = await this.container.encryptionProcessor.decrypt(response.result);
                    response.result = result;
                    diagnosticNode.endEncryptionDiagnostics(index_js_1.Constants.Encryption.DiagnosticsDecryptOperation, propertiesDecryptedCount);
                }
                catch (error) {
                    const decryptionError = new index_js_3.ErrorResponse(`Item replace operation was successful but response decryption failed: + ${error.message}`);
                    decryptionError.code = index_js_1.StatusCodes.ServiceUnavailable;
                    throw decryptionError;
                }
            }
            return new ItemResponse_js_1.ItemResponse(response.result, response.headers, response.code, response.substatus, this, (0, diagnostics_js_1.getEmptyCosmosDiagnostics)());
        }, this.clientContext);
    }
    /**
     * Delete the item.
     *
     * Any provided type, T, is not necessarily enforced by the SDK.
     * You may get more or less properties and it's up to your logic to enforce it.
     *
     * @param options - Additional options for the request
     * @example
     * ```ts snippet:ItemDelete
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
     * interface TodoItem {
     *   title: string;
     *   done: boolean;
     *   id: string;
     * }
     *
     * const { resource: item } = await container.item("id", "<pkValue>").read<TodoItem>();
     *
     * await container.item("id").delete<TodoItem>();
     * ```
     */
    async delete(options = {}) {
        return (0, diagnostics_js_1.withDiagnostics)(async (diagnosticNode) => {
            this.partitionKey = await (0, extractPartitionKey_js_1.setPartitionKeyIfUndefined)(diagnosticNode, this.container, this.partitionKey);
            let partitionKey = this.partitionKey;
            let url = this.url;
            let response;
            try {
                if (this.clientContext.enableEncryption) {
                    await this.container.checkAndInitializeEncryption();
                    options.containerRid = this.container._rid;
                    let count = 0;
                    diagnosticNode.beginEncryptionDiagnostics(index_js_1.Constants.Encryption.DiagnosticsEncryptOperation);
                    const { partitionKeyList, encryptedCount } = await this.container.encryptionProcessor.getEncryptedPartitionKeyValue(this.partitionKey);
                    partitionKey = partitionKeyList;
                    count += encryptedCount;
                    if (await this.container.encryptionProcessor.isPathEncrypted("/id")) {
                        url = await this.container.encryptionProcessor.getEncryptedUrl(this.url);
                        count++;
                    }
                    diagnosticNode.endEncryptionDiagnostics(index_js_1.Constants.Encryption.DiagnosticsEncryptOperation, count);
                }
                const path = (0, index_js_1.getPathFromLink)(url);
                const id = (0, index_js_1.getIdFromLink)(url);
                response = await this.clientContext.delete({
                    path,
                    resourceType: index_js_1.ResourceType.item,
                    resourceId: id,
                    options,
                    partitionKey: partitionKey,
                    diagnosticNode,
                });
            }
            catch (error) {
                if (this.clientContext.enableEncryption) {
                    await this.container.throwIfRequestNeedsARetryPostPolicyRefresh(error);
                }
                throw error;
            }
            return new ItemResponse_js_1.ItemResponse(response.result, response.headers, response.code, response.substatus, this, (0, diagnostics_js_1.getEmptyCosmosDiagnostics)());
        }, this.clientContext);
    }
    /**
     * Perform a JSONPatch on the item.
     *
     * Any provided type, T, is not necessarily enforced by the SDK.
     * You may get more or less properties and it's up to your logic to enforce it.
     *
     * @param options - Additional options for the request
     * @example
     * ```ts snippet:ItemPatch
     * import { CosmosClient } from "@azure/cosmos";
     *
     * const endpoint = "https://your-account.documents.azure.com";
     * const key = "<database account masterkey>";
     * const client = new CosmosClient({ endpoint, key });
     *
     * interface TodoItem {
     *   title: string;
     *   done: boolean;
     *   id: string;
     * }
     *
     * const { database } = await client.databases.createIfNotExists({ id: "Test Database" });
     *
     * const { container } = await database.containers.createIfNotExists({ id: "Test Container" });
     *
     * const { resource: item } = await container.item("id", "<pkValue>").read<TodoItem>();
     *
     * const { resource: patchedItem } = await container.item("id").patch<TodoItem>([
     *   {
     *     op: "replace", // Operation type (can be replace, add, remove, set, incr)
     *     path: "/title", // The path to the property to update
     *     value: "new-title", // New value for the property
     *   },
     *   {
     *     op: "remove",
     *     path: "/done",
     *   },
     * ]);
     * ```
     */
    async patch(body, options = {}) {
        return (0, diagnostics_js_1.withDiagnostics)(async (diagnosticNode) => {
            this.partitionKey = await (0, extractPartitionKey_js_1.setPartitionKeyIfUndefined)(diagnosticNode, this.container, this.partitionKey);
            let url = this.url;
            let partitionKey = this.partitionKey;
            let response;
            try {
                if (this.clientContext.enableEncryption) {
                    await this.container.checkAndInitializeEncryption();
                    options.containerRid = this.container._rid;
                    // returns copy to avoid encryption of original body passed
                    body = (0, index_js_1.copyObject)(body);
                    const operations = Array.isArray(body) ? body : body.operations;
                    diagnosticNode.beginEncryptionDiagnostics(index_js_1.Constants.Encryption.DiagnosticsEncryptOperation);
                    let propertiesEncryptedCount = 0;
                    for (const operation of operations) {
                        if (operation.op === patch_js_1.PatchOperationType.remove) {
                            continue;
                        }
                        const isPathEncrypted = await this.container.encryptionProcessor.isPathEncrypted(operation.path);
                        if (!isPathEncrypted) {
                            continue;
                        }
                        if (operation.op === patch_js_1.PatchOperationType.incr) {
                            throw new index_js_3.ErrorResponse(`Increment patch operation is not allowed for encrypted path '${operation.path}'`);
                        }
                        if ("value" in operation) {
                            operation.value = await this.container.encryptionProcessor.encryptProperty(operation.path, operation.value);
                        }
                        propertiesEncryptedCount++;
                    }
                    const { partitionKeyList, encryptedCount } = await this.container.encryptionProcessor.getEncryptedPartitionKeyValue(partitionKey);
                    partitionKey = partitionKeyList;
                    propertiesEncryptedCount += encryptedCount;
                    if (await this.container.encryptionProcessor.isPathEncrypted("/id")) {
                        url = await this.container.encryptionProcessor.getEncryptedUrl(this.url);
                        propertiesEncryptedCount++;
                    }
                    diagnosticNode.endEncryptionDiagnostics(index_js_1.Constants.Encryption.DiagnosticsEncryptOperation, propertiesEncryptedCount);
                }
                const path = (0, index_js_1.getPathFromLink)(url);
                const id = (0, index_js_1.getIdFromLink)(url);
                response = await this.clientContext.patch({
                    body,
                    path,
                    resourceType: index_js_1.ResourceType.item,
                    resourceId: id,
                    options,
                    partitionKey: partitionKey,
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
                    diagnosticNode.beginEncryptionDiagnostics(index_js_1.Constants.Encryption.DiagnosticsDecryptOperation);
                    const { body: result, propertiesDecryptedCount } = await this.container.encryptionProcessor.decrypt(response.result);
                    response.result = result;
                    diagnosticNode.endEncryptionDiagnostics(index_js_1.Constants.Encryption.DiagnosticsDecryptOperation, propertiesDecryptedCount);
                }
                catch (error) {
                    const decryptionError = new index_js_3.ErrorResponse(`Item patch operation was successful but response decryption failed: + ${error.message}`);
                    decryptionError.code = index_js_1.StatusCodes.ServiceUnavailable;
                    throw decryptionError;
                }
            }
            return new ItemResponse_js_1.ItemResponse(response.result, response.headers, response.code, response.substatus, this, (0, diagnostics_js_1.getEmptyCosmosDiagnostics)());
        }, this.clientContext);
    }
}
exports.Item = Item;
//# sourceMappingURL=Item.js.map