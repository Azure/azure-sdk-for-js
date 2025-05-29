import { getIdFromLink, getPathFromLink, isResourceValid, ResourceType, } from "../../common/index.js";
import { QueryIterator } from "../../queryIterator.js";
import { StoredProcedure } from "./StoredProcedure.js";
import { StoredProcedureResponse } from "./StoredProcedureResponse.js";
import { getEmptyCosmosDiagnostics, withDiagnostics } from "../../utils/diagnostics.js";
/**
 * Operations for creating, upserting, or reading/querying all Stored Procedures.
 *
 * For operations to read, replace, delete, or execute a specific, existing stored procedure by id, see `container.storedProcedure()`.
 */
export class StoredProcedures {
    /**
     * @param container - The parent {@link Container}.
     * @hidden
     */
    constructor(container, clientContext) {
        this.container = container;
        this.clientContext = clientContext;
    }
    query(query, options) {
        const path = getPathFromLink(this.container.url, ResourceType.sproc);
        const id = getIdFromLink(this.container.url);
        return new QueryIterator(this.clientContext, query, options, (diagNode, innerOptions) => {
            return this.clientContext.queryFeed({
                path,
                resourceType: ResourceType.sproc,
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
        return withDiagnostics(async (diagnosticNode) => {
            if (body.body) {
                body.body = body.body.toString();
            }
            const err = {};
            if (!isResourceValid(body, err)) {
                throw err;
            }
            const path = getPathFromLink(this.container.url, ResourceType.sproc);
            const id = getIdFromLink(this.container.url);
            const response = await this.clientContext.create({
                body,
                path,
                resourceType: ResourceType.sproc,
                resourceId: id,
                options,
                diagnosticNode,
            });
            const ref = new StoredProcedure(this.container, response.result.id, this.clientContext);
            return new StoredProcedureResponse(response.result, response.headers, response.code, ref, getEmptyCosmosDiagnostics());
        }, this.clientContext);
    }
}
//# sourceMappingURL=StoredProcedures.js.map