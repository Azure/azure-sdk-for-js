"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Conflict = void 0;
const index_js_1 = require("../../common/index.js");
const ConflictResponse_js_1 = require("./ConflictResponse.js");
const extractPartitionKey_js_1 = require("../../extractPartitionKey.js");
const ClientUtils_js_1 = require("../ClientUtils.js");
const diagnostics_js_1 = require("../../utils/diagnostics.js");
/**
 * Use to read or delete a given {@link Conflict} by id.
 *
 * @see {@link Conflicts} to query or read all conflicts.
 */
class Conflict {
    /**
     * Returns a reference URL to the resource. Used for linking in Permissions.
     */
    get url() {
        return `/${this.container.url}/${index_js_1.Constants.Path.ConflictsPathSegment}/${this.id}`;
    }
    /**
     * @hidden
     * @param container - The parent {@link Container}.
     * @param id - The id of the given {@link Conflict}.
     */
    constructor(container, id, clientContext, partitionKey) {
        this.container = container;
        this.id = id;
        this.clientContext = clientContext;
        this.partitionKey = partitionKey;
        this.partitionKey = partitionKey;
    }
    /**
     * Read the {@link ConflictDefinition} for the given {@link Conflict}.
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
    async read(options) {
        return (0, diagnostics_js_1.withDiagnostics)(async (diagnosticNode) => {
            const path = (0, index_js_1.getPathFromLink)(this.url, index_js_1.ResourceType.conflicts);
            const id = (0, index_js_1.getIdFromLink)(this.url);
            const response = await this.clientContext.read({
                path,
                resourceType: index_js_1.ResourceType.user,
                resourceId: id,
                options,
                diagnosticNode,
            });
            return new ConflictResponse_js_1.ConflictResponse(response.result, response.headers, response.code, this, (0, diagnostics_js_1.getEmptyCosmosDiagnostics)());
        }, this.clientContext);
    }
    /**
     * Delete the given {@link ConflictDefinition}.
     * @example
     * ```ts snippet:ConflictDelete
     * import { CosmosClient } from "@azure/cosmos";
     *
     * const endpoint = "https://your-account.documents.azure.com";
     * const key = "<database account masterkey>";
     * const client = new CosmosClient({ endpoint, key });
     * const { database } = await client.databases.createIfNotExists({ id: "Test Database" });
     * const container = database.container("Test Container");
     *
     * await container.conflict("<conflict-id>").delete();
     * ```
     */
    async delete(options) {
        return (0, diagnostics_js_1.withDiagnostics)(async (diagnosticNode) => {
            if (this.partitionKey === undefined) {
                const partitionKeyDefinition = await (0, ClientUtils_js_1.readPartitionKeyDefinition)(diagnosticNode, this.container);
                this.partitionKey = (0, extractPartitionKey_js_1.undefinedPartitionKey)(partitionKeyDefinition);
            }
            const path = (0, index_js_1.getPathFromLink)(this.url);
            const id = (0, index_js_1.getIdFromLink)(this.url);
            const response = await this.clientContext.delete({
                path,
                resourceType: index_js_1.ResourceType.conflicts,
                resourceId: id,
                options,
                partitionKey: this.partitionKey,
                diagnosticNode,
            });
            return new ConflictResponse_js_1.ConflictResponse(response.result, response.headers, response.code, this, (0, diagnostics_js_1.getEmptyCosmosDiagnostics)());
        }, this.clientContext);
    }
}
exports.Conflict = Conflict;
//# sourceMappingURL=Conflict.js.map