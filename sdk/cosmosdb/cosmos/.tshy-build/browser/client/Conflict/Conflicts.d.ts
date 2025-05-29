import type { ClientContext } from "../../ClientContext.js";
import type { SqlQuerySpec } from "../../queryExecutionContext/index.js";
import { QueryIterator } from "../../queryIterator.js";
import type { FeedOptions } from "../../request/index.js";
import type { Container } from "../Container/index.js";
import type { Resource } from "../Resource.js";
import type { ConflictDefinition } from "./ConflictDefinition.js";
/**
 * Use to query or read all conflicts.
 *
 * @see {@link Conflict} to read or delete a given {@link Conflict} by id.
 */
export declare class Conflicts {
    readonly container: Container;
    private readonly clientContext;
    constructor(container: Container, clientContext: ClientContext);
    /**
     * Queries all conflicts.
     * @param query - Query configuration for the operation. See {@link SqlQuerySpec} for more info on how to configure a query.
     * @param options - Use to set options like response page size, continuation tokens, etc.
     * @returns {@link QueryIterator} Allows you to return results in an array or iterate over them one at a time.
     */
    query(query: string | SqlQuerySpec, options?: FeedOptions): QueryIterator<any>;
    /**
     * Queries all conflicts.
     * @param query - Query configuration for the operation. See {@link SqlQuerySpec} for more info on how to configure a query.
     * @param options - Use to set options like response page size, continuation tokens, etc.
     * @returns {@link QueryIterator} Allows you to return results in an array or iterate over them one at a time.
     * @example Query conflict with id
     * ```ts snippet:ConflictsQuery
     * import { CosmosClient, SqlQuerySpec } from "@azure/cosmos";
     *
     * const endpoint = "https://your-account.documents.azure.com";
     * const key = "<database account masterkey>";
     * const client = new CosmosClient({ endpoint, key });
     * const { database } = await client.databases.createIfNotExists({ id: "Test Database" });
     * const container = database.container("Test Container");
     *
     * const querySpec: SqlQuerySpec = {
     *   query: `SELECT * FROM root r WHERE r.id = @conflict`,
     *   parameters: [{ name: "@conflict", value: "<conflict-id>" }],
     * };
     * const { resources: conflict } = await container.conflicts.query(querySpec).fetchAll();
     * ```
     */
    query<T>(query: string | SqlQuerySpec, options?: FeedOptions): QueryIterator<T>;
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
    readAll(options?: FeedOptions): QueryIterator<ConflictDefinition & Resource>;
}
//# sourceMappingURL=Conflicts.d.ts.map