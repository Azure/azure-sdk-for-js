"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoredProcedures = void 0;
const index_js_1 = require("../../common/index.js");
const queryIterator_js_1 = require("../../queryIterator.js");
const StoredProcedure_js_1 = require("./StoredProcedure.js");
const StoredProcedureResponse_js_1 = require("./StoredProcedureResponse.js");
const diagnostics_js_1 = require("../../utils/diagnostics.js");
/**
 * Operations for creating, upserting, or reading/querying all Stored Procedures.
 *
 * For operations to read, replace, delete, or execute a specific, existing stored procedure by id, see `container.storedProcedure()`.
 */
class StoredProcedures {
    /**
     * @param container - The parent {@link Container}.
     * @hidden
     */
    constructor(container, clientContext) {
        this.container = container;
        this.clientContext = clientContext;
    }
    query(query, options) {
        const path = (0, index_js_1.getPathFromLink)(this.container.url, index_js_1.ResourceType.sproc);
        const id = (0, index_js_1.getIdFromLink)(this.container.url);
        return new queryIterator_js_1.QueryIterator(this.clientContext, query, options, (diagNode, innerOptions) => {
            return this.clientContext.queryFeed({
                path,
                resourceType: index_js_1.ResourceType.sproc,
                resourceId: id,
                resultFn: (result) => result.StoredProcedures,
                query,
                options: innerOptions,
                diagnosticNode: diagNode,
            });
        });
    }
    /**
     * Read all stored procedures.
     * @example Read all stored procedures to array.
     * ```ts snippet:StoredProceduresReadAll
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
     * const { resources: storedProceduresList } = await container.scripts.storedProcedures
     *   .readAll()
     *   .fetchAll();
     * ```
     */
    readAll(options) {
        return this.query(undefined, options);
    }
    /**
     * Create a StoredProcedure.
     *
     * Azure Cosmos DB allows stored procedures to be executed in the storage tier,
     * directly against an item container. The script
     * gets executed under ACID transactions on the primary storage partition of the
     * specified container. For additional details,
     * refer to the server-side JavaScript API documentation.
     * @example
     * ```ts snippet:StoredProceduresCreate
     * import { CosmosClient, StoredProcedureDefinition } from "@azure/cosmos";
     *
     * const endpoint = "https://your-account.documents.azure.com";
     * const key = "<database account masterkey>";
     * const client = new CosmosClient({ endpoint, key });
     * const { database } = await client.databases.createIfNotExists({ id: "Test Database" });
     * const { container } = await database.containers.createIfNotExists({ id: "Test Container" });
     *
     * const sprocDefinition: StoredProcedureDefinition = {
     *   id: "sample sproc",
     *   body: "function () { const x = 10; }",
     * };
     *
     * const { resource: sproc } = await container.scripts.storedProcedures.create(sprocDefinition);
     * ```
     */
    async create(body, options) {
        return (0, diagnostics_js_1.withDiagnostics)(async (diagnosticNode) => {
            if (body.body) {
                body.body = body.body.toString();
            }
            const err = {};
            if (!(0, index_js_1.isResourceValid)(body, err)) {
                throw err;
            }
            const path = (0, index_js_1.getPathFromLink)(this.container.url, index_js_1.ResourceType.sproc);
            const id = (0, index_js_1.getIdFromLink)(this.container.url);
            const response = await this.clientContext.create({
                body,
                path,
                resourceType: index_js_1.ResourceType.sproc,
                resourceId: id,
                options,
                diagnosticNode,
            });
            const ref = new StoredProcedure_js_1.StoredProcedure(this.container, response.result.id, this.clientContext);
            return new StoredProcedureResponse_js_1.StoredProcedureResponse(response.result, response.headers, response.code, ref, (0, diagnostics_js_1.getEmptyCosmosDiagnostics)());
        }, this.clientContext);
    }
}
exports.StoredProcedures = StoredProcedures;
//# sourceMappingURL=StoredProcedures.js.map