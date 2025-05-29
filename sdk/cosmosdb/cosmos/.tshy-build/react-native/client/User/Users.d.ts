import type { ClientContext } from "../../ClientContext.js";
import type { SqlQuerySpec } from "../../queryExecutionContext/index.js";
import { QueryIterator } from "../../queryIterator.js";
import type { FeedOptions, RequestOptions } from "../../request/index.js";
import type { Database } from "../Database/index.js";
import type { Resource } from "../Resource.js";
import type { UserDefinition } from "./UserDefinition.js";
import { UserResponse } from "./UserResponse.js";
/**
 * Used to create, upsert, query, and read all users.
 *
 * @see {@link User} to read, replace, or delete a specific User by id.
 */
export declare class Users {
    readonly database: Database;
    private readonly clientContext;
    /**
     * @hidden
     * @param database - The parent {@link Database}.
     */
    constructor(database: Database, clientContext: ClientContext);
    /**
     * Query all users.
     * @param query - Query configuration for the operation. See {@link SqlQuerySpec} for more info on how to configure a query.
     */
    query(query: SqlQuerySpec, options?: FeedOptions): QueryIterator<any>;
    /**
     * Query all users.
     * @param query - Query configuration for the operation. See {@link SqlQuerySpec} for more info on how to configure a query.
     * @example Query user with id.
     * ```ts snippet:UsersQuery
     * import { CosmosClient, SqlQuerySpec } from "@azure/cosmos";
     *
     * const endpoint = "https://your-account.documents.azure.com";
     * const key = "<database account masterkey>";
     * const client = new CosmosClient({ endpoint, key });
     * const { database } = await client.databases.createIfNotExists({ id: "Test Database" });
     *
     * const querySpec: SqlQuerySpec = {
     *   query: `SELECT * FROM root r WHERE r.id = @user`,
     *   parameters: [{ name: "@user", value: "<user-id>" }],
     * };
     * const { resources: permisssion } = await database.users.query(querySpec).fetchAll();
     * ```
     */
    query<T>(query: SqlQuerySpec, options?: FeedOptions): QueryIterator<T>;
    /**
     * Read all users.-
     * @example Read all users to array.
     * ```ts snippet:UsersReadAll
     * import { CosmosClient } from "@azure/cosmos";
     *
     * const endpoint = "https://your-account.documents.azure.com";
     * const key = "<database account masterkey>";
     * const client = new CosmosClient({ endpoint, key });
     *
     * const { database } = await client.databases.createIfNotExists({ id: "Test Database" });
     *
     * const { resources: usersList } = await database.users.readAll().fetchAll();
     * ```
     */
    readAll(options?: FeedOptions): QueryIterator<UserDefinition & Resource>;
    /**
     * Create a database user with the specified {@link UserDefinition}.
     * @param body - The specified {@link UserDefinition}.
     * @example
     * ```ts snippet:UsersCreate
     * import { CosmosClient } from "@azure/cosmos";
     *
     * const endpoint = "https://your-account.documents.azure.com";
     * const key = "<database account masterkey>";
     * const client = new CosmosClient({ endpoint, key });
     * const { database } = await client.databases.createIfNotExists({ id: "Test Database" });
     *
     * await database.users.create({ id: "<user-id>" });
     * ```
     */
    create(body: UserDefinition, options?: RequestOptions): Promise<UserResponse>;
    /**
     * Upsert a database user with a specified {@link UserDefinition}.
     * @param body - The specified {@link UserDefinition}.
     * @example
     * ```ts snippet:UsersUpsert
     * import { CosmosClient } from "@azure/cosmos";
     *
     * const endpoint = "https://your-account.documents.azure.com";
     * const key = "<database account masterkey>";
     * const client = new CosmosClient({ endpoint, key });
     * const { database } = await client.databases.createIfNotExists({ id: "Test Database" });
     *
     * await database.users.upsert({ id: "<user-id>" });
     * ```
     */
    upsert(body: UserDefinition, options?: RequestOptions): Promise<UserResponse>;
}
//# sourceMappingURL=Users.d.ts.map