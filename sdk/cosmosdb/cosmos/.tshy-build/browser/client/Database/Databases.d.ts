import type { ClientContext } from "../../ClientContext.js";
import type { CosmosClient } from "../../CosmosClient.js";
import type { SqlQuerySpec } from "../../queryExecutionContext/index.js";
import { QueryIterator } from "../../queryIterator.js";
import type { FeedOptions, RequestOptions } from "../../request/index.js";
import type { Resource } from "../Resource.js";
import type { DatabaseDefinition } from "./DatabaseDefinition.js";
import type { DatabaseRequest } from "./DatabaseRequest.js";
import { DatabaseResponse } from "./DatabaseResponse.js";
import type { DiagnosticNodeInternal } from "../../diagnostics/DiagnosticNodeInternal.js";
import type { EncryptionManager } from "../../encryption/EncryptionManager.js";
/**
 * Operations for creating new databases, and reading/querying all databases
 *
 * @see {@link Database} for reading or deleting an existing database; use `client.database(id)`.
 *
 * Note: all these operations make calls against a fixed budget.
 * You should design your system such that these calls scale sublinearly with your application.
 * For instance, do not call `databases.readAll()` before every single `item.read()` call, to ensure the database exists;
 * do this once on application start up.
 */
export declare class Databases {
    readonly client: CosmosClient;
    private readonly clientContext;
    private encryptionManager?;
    /**
     * @hidden
     * @param client - The parent {@link CosmosClient} for the Database.
     */
    constructor(client: CosmosClient, clientContext: ClientContext, encryptionManager?: EncryptionManager);
    /**
     * Queries all databases.
     * @param query - Query configuration for the operation. See {@link SqlQuerySpec} for more info on how to configure a query.
     * @param options - Use to set options like response page size, continuation tokens, etc.
     * @returns {@link QueryIterator} Allows you to return all databases in an array or iterate over them one at a time.
     * @example Read all databases to array.
     * ```ts snippet:DatabasesQueryDatabases
     * import { CosmosClient, SqlQuerySpec } from "@azure/cosmos";
     *
     * const endpoint = "https://your-account.documents.azure.com";
     * const key = "<database account masterkey>";
     * const client = new CosmosClient({ endpoint, key });
     *
     * const querySpec: SqlQuerySpec = {
     *   query: `SELECT * FROM root r WHERE r.id = @database`,
     *   parameters: [{ name: "@database", value: "Todo" }],
     * };
     * const { resources: databaseList } = await client.databases.query(querySpec).fetchAll();
     * ```
     */
    query(query: string | SqlQuerySpec, options?: FeedOptions): QueryIterator<any>;
    /**
     * Queries all databases.
     * @param query - Query configuration for the operation. See {@link SqlQuerySpec} for more info on how to configure a query.
     * @param options - Use to set options like response page size, continuation tokens, etc.
     * @returns {@link QueryIterator} Allows you to return all databases in an array or iterate over them one at a time.
     * @example Read all databases to array.
     * ```ts snippet:DatabasesQueryDatabases
     * import { CosmosClient, SqlQuerySpec } from "@azure/cosmos";
     *
     * const endpoint = "https://your-account.documents.azure.com";
     * const key = "<database account masterkey>";
     * const client = new CosmosClient({ endpoint, key });
     *
     * const querySpec: SqlQuerySpec = {
     *   query: `SELECT * FROM root r WHERE r.id = @database`,
     *   parameters: [{ name: "@database", value: "Todo" }],
     * };
     * const { resources: databaseList } = await client.databases.query(querySpec).fetchAll();
     * ```
     */
    query<T>(query: string | SqlQuerySpec, options?: FeedOptions): QueryIterator<T>;
    /**
     * Send a request for creating a database.
     *
     * A database manages users, permissions and a set of containers.
     * Each Azure Cosmos DB Database Account is able to support multiple independent named databases,
     * with the database being the logical container for data.
     *
     * Each Database consists of one or more containers, each of which in turn contain one or more
     * documents. Since databases are an administrative resource, the Service Master Key will be
     * required in order to access and successfully complete any action using the User APIs.
     *
     * @param body - The {@link DatabaseDefinition} that represents the {@link Database} to be created.
     * @param options - Use to set options like response page size, continuation tokens, etc.
     * @example
     * ```ts snippet:CosmosClientDatabases
     * import { CosmosClient } from "@azure/cosmos";
     *
     * const endpoint = "https://your-account.documents.azure.com";
     * const key = "<database account masterkey>";
     * const client = new CosmosClient({ endpoint, key });
     * const { resource: databaseDefinition, database } = await client.databases.create({
     *   id: "<name here>",
     * });
     * ```
     */
    create(body: DatabaseRequest, options?: RequestOptions): Promise<DatabaseResponse>;
    /**
     * @hidden
     */
    createInternal(diagnosticNode: DiagnosticNodeInternal, body: DatabaseRequest, options?: RequestOptions): Promise<DatabaseResponse>;
    /**
     * Check if a database exists, and if it doesn't, create it.
     * This will make a read operation based on the id in the `body`, then if it is not found, a create operation.
     *
     * A database manages users, permissions and a set of containers.
     * Each Azure Cosmos DB Database Account is able to support multiple independent named databases,
     * with the database being the logical container for data.
     *
     * Each Database consists of one or more containers, each of which in turn contain one or more
     * documents. Since databases are an an administrative resource, the Service Master Key will be
     * required in order to access and successfully complete any action using the User APIs.
     *
     * @param body - The {@link DatabaseDefinition} that represents the {@link Database} to be created.
     * @param options - Additional options for the request
     * @example
     * ```ts snippet:ReadmeSampleCreateDatabase
     * import { CosmosClient } from "@azure/cosmos";
     *
     * const endpoint = "https://your-account.documents.azure.com";
     * const key = "<database account masterkey>";
     * const client = new CosmosClient({ endpoint, key });
     *
     * const { database } = await client.databases.createIfNotExists({ id: "Test Database" });
     * ```
     */
    createIfNotExists(body: DatabaseRequest, options?: RequestOptions): Promise<DatabaseResponse>;
    /**
     * Reads all databases.
     * @param options - Use to set options like response page size, continuation tokens, etc.
     * @returns {@link QueryIterator} Allows you to return all databases in an array or iterate over them one at a time.
     * @example Read all databases to array.
     * ```ts snippet:DatabasesReadAll
     * import { CosmosClient } from "@azure/cosmos";
     *
     * const endpoint = "https://your-account.documents.azure.com";
     * const key = "<database account masterkey>";
     * const client = new CosmosClient({ endpoint, key });
     *
     * const { resources: databaseList } = await client.databases.readAll().fetchAll();
     * ```
     */
    readAll(options?: FeedOptions): QueryIterator<DatabaseDefinition & Resource>;
}
//# sourceMappingURL=Databases.d.ts.map