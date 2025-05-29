import type { ClientContext } from "../../ClientContext.js";
import type { SqlQuerySpec } from "../../queryExecutionContext/index.js";
import { QueryIterator } from "../../queryIterator.js";
import type { FeedOptions, RequestOptions } from "../../request/index.js";
import type { Resource } from "../Resource.js";
import type { User } from "../User/index.js";
import type { PermissionDefinition } from "./PermissionDefinition.js";
import { PermissionResponse } from "./PermissionResponse.js";
/**
 * Use to create, replace, query, and read all Permissions.
 *
 * @see {@link Permission} to read, replace, or delete a specific permission by id.
 */
export declare class Permissions {
    readonly user: User;
    private readonly clientContext;
    /**
     * @hidden
     * @param user - The parent {@link User}.
     */
    constructor(user: User, clientContext: ClientContext);
    /**
     * Query all permissions.
     * @param query - Query configuration for the operation. See {@link SqlQuerySpec} for more info on how to configure a query.
     * @example Query permission with id.
     * ```ts snippet:PermissionsQuery
     * import { CosmosClient, SqlQuerySpec } from "@azure/cosmos";
     *
     * const endpoint = "https://your-account.documents.azure.com";
     * const key = "<database account masterkey>";
     * const client = new CosmosClient({ endpoint, key });
     * const { database } = await client.databases.createIfNotExists({ id: "Test Database" });
     *
     * const querySpec: SqlQuerySpec = {
     *   query: `SELECT * FROM root r WHERE r.id = @permission`,
     *   parameters: [{ name: "@permission", value: "<permission-id>" }],
     * };
     * const { resources: permisssion } = await database
     *   .user("<user-id>")
     *   .permissions.query(querySpec)
     *   .fetchAll();
     * ```
     */
    query(query: SqlQuerySpec, options?: FeedOptions): QueryIterator<any>;
    /**
     * Query all permissions.
     * @param query - Query configuration for the operation. See {@link SqlQuerySpec} for more info on how to configure a query.
     */
    query<T>(query: SqlQuerySpec, options?: FeedOptions): QueryIterator<T>;
    /**
     * Read all permissions.
     * @example Read all permissions to array.
     * ```ts snippet:PermissionsReadAll
     * import { CosmosClient } from "@azure/cosmos";
     *
     * const endpoint = "https://your-account.documents.azure.com";
     * const key = "<database account masterkey>";
     * const client = new CosmosClient({ endpoint, key });
     *
     * const { database } = await client.databases.createIfNotExists({ id: "Test Database" });
     *
     * const { resources: permissionList } = await database.user("user1").permissions.readAll().fetchAll();
     * ```
     */
    readAll(options?: FeedOptions): QueryIterator<PermissionDefinition & Resource>;
    /**
     * Create a permission.
     *
     * A permission represents a per-User Permission to access a specific resource
     * e.g. Item or Container.
     * @param body - Represents the body of the permission.
     * @example
     * ```ts snippet:PermissionsCreate
     * import { CosmosClient, PermissionDefinition, PermissionMode } from "@azure/cosmos";
     *
     * const endpoint = "https://your-account.documents.azure.com";
     * const key = "<database account masterkey>";
     * const client = new CosmosClient({ endpoint, key });
     * const { database } = await client.databases.createIfNotExists({ id: "Test Database" });
     * const { user } = await database.users.create({ id: "<user-id>" });
     *
     * const permissionDefinition: PermissionDefinition = {
     *   id: "<permission-id>",
     *   permissionMode: PermissionMode.Read,
     *   resource: "<resource-url>",
     * };
     * await user.permissions.create(permissionDefinition);
     * ```
     */
    create(body: PermissionDefinition, options?: RequestOptions): Promise<PermissionResponse>;
    /**
     * Upsert a permission.
     * A permission represents a per-User Permission to access a
     * specific resource e.g. Item or Container.
     * @example
     * ```ts snippet:PermissionsUpsert
     * import { CosmosClient, PermissionDefinition, PermissionMode } from "@azure/cosmos";
     *
     * const endpoint = "https://your-account.documents.azure.com";
     * const key = "<database account masterkey>";
     * const client = new CosmosClient({ endpoint, key });
     * const { database } = await client.databases.createIfNotExists({ id: "Test Database" });
     * const user = database.user("<user-id>");
     * const permissionDefinitionToUpsert: PermissionDefinition = {
     *   id: "<permission-id>",
     *   permissionMode: PermissionMode.Read,
     *   resource: "<resource-url>",
     * };
     *
     * await user.permissions.upsert(permissionDefinitionToUpsert);
     * ```
     */
    upsert(body: PermissionDefinition, options?: RequestOptions): Promise<PermissionResponse>;
}
//# sourceMappingURL=Permissions.d.ts.map