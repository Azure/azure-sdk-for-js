"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Conflicts = void 0;
const index_js_1 = require("../../common/index.js");
const queryIterator_js_1 = require("../../queryIterator.js");
/**
 * Use to query or read all conflicts.
 *
 * @see {@link Conflict} to read or delete a given {@link Conflict} by id.
 */
class Conflicts {
    constructor(container, clientContext) {
        this.container = container;
        this.clientContext = clientContext;
    }
    query(query, options) {
        const path = (0, index_js_1.getPathFromLink)(this.container.url, index_js_1.ResourceType.conflicts);
        const id = (0, index_js_1.getIdFromLink)(this.container.url);
        return new queryIterator_js_1.QueryIterator(this.clientContext, query, options, (diagNode, innerOptions) => {
            return this.clientContext.queryFeed({
                path,
                resourceType: index_js_1.ResourceType.conflicts,
                resourceId: id,
                resultFn: (result) => result.Conflicts,
                query,
                options: innerOptions,
                diagnosticNode: diagNode,
            });
        });
    }
    /**
     * Reads all conflicts
     * @param options - Use to set options like response page size, continuation tokens, etc.
     * @example
     * ```ts snippet:ConflictsReadAll
     * import { CosmosClient } from "@azure/cosmos";
     *
     * const endpoint = "https://your-account.documents.azure.com";
     * const key = "<database account masterkey>";
     * const client = new CosmosClient({ endpoint, key });
     * const { database } = await client.databases.createIfNotExists({ id: "Test Database" });
     * const container = database.container("Test Container");
     *
     * const { resources: conflicts } = await container.conflicts.readAll().fetchAll();
     * ```
     */
    readAll(options) {
        return this.query(undefined, options);
    }
}
exports.Conflicts = Conflicts;
//# sourceMappingURL=Conflicts.js.map