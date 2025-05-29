import type { ClientContext } from "../../ClientContext.js";
import type { SqlQuerySpec } from "../../queryExecutionContext/index.js";
import { QueryIterator } from "../../queryIterator.js";
import type { FeedOptions, RequestOptions } from "../../request/index.js";
import type { Container } from "../Container/index.js";
import type { Resource } from "../Resource.js";
import type { StoredProcedureDefinition } from "./StoredProcedureDefinition.js";
import { StoredProcedureResponse } from "./StoredProcedureResponse.js";
/**
 * Operations for creating, upserting, or reading/querying all Stored Procedures.
 *
 * For operations to read, replace, delete, or execute a specific, existing stored procedure by id, see `container.storedProcedure()`.
 */
export declare class StoredProcedures {
    readonly container: Container;
    private readonly clientContext;
    /**
     * @param container - The parent {@link Container}.
     * @hidden
     */
    constructor(container: Container, clientContext: ClientContext);
    /**
     * Query all Stored Procedures.
     * @param query - Query configuration for the operation. See {@link SqlQuerySpec} for more info on how to configure a query.
     * @example Read all stored procedures to array.
     * ```ts snippet:StoredProceduresQueryStoredProcedures
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
     *   query: `SELECT * FROM root r WHERE r.id = @sproc`,
     *   parameters: [{ name: "@sproc", value: "Todo" }],
     * };
     * const { resources: storedProceduresList } = await container.scripts.storedProcedures
     *   .query(querySpec)
     *   .fetchAll();
     * ```
     */
    query(query: SqlQuerySpec, options?: FeedOptions): QueryIterator<any>;
    /**
     * Query all Stored Procedures.
     * @param query - Query configuration for the operation. See {@link SqlQuerySpec} for more info on how to configure a query.
     * @example Read all stored procedures to array.
     * ```ts snippet:StoredProceduresQueryStoredProcedures
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
     *   query: `SELECT * FROM root r WHERE r.id = @sproc`,
     *   parameters: [{ name: "@sproc", value: "Todo" }],
     * };
     * const { resources: storedProceduresList } = await container.scripts.storedProcedures
     *   .query(querySpec)
     *   .fetchAll();
     * ```
     */
    query<T>(query: SqlQuerySpec, options?: FeedOptions): QueryIterator<T>;
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
    readAll(options?: FeedOptions): QueryIterator<StoredProcedureDefinition & Resource>;
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
    create(body: StoredProcedureDefinition, options?: RequestOptions): Promise<StoredProcedureResponse>;
}
//# sourceMappingURL=StoredProcedures.d.ts.map