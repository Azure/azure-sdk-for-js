import type { ClientContext } from "../../ClientContext.js";
import type { RequestOptions } from "../../request/index.js";
import type { Database } from "../Database/index.js";
import { Permission, Permissions } from "../Permission/index.js";
import type { UserDefinition } from "./UserDefinition.js";
import { UserResponse } from "./UserResponse.js";
/**
 * Used to read, replace, and delete Users.
 *
 * Additionally, you can access the permissions for a given user via `user.permission` and `user.permissions`.
 *
 * @see {@link Users} to create, upsert, query, or read all.
 */
export declare class User {
    readonly database: Database;
    readonly id: string;
    private readonly clientContext;
    /**
     * Operations for creating, upserting, querying, or reading all operations.
     *
     * See `client.permission(id)` to read, replace, or delete a specific Permission by id.
     */
    readonly permissions: Permissions;
    /**
     * Returns a reference URL to the resource. Used for linking in Permissions.
     */
    get url(): string;
    /**
     * @hidden
     * @param database - The parent {@link Database}.
     */
    constructor(database: Database, id: string, clientContext: ClientContext);
    /**
     * Operations to read, replace, or delete a specific Permission by id.
     *
     * See `client.permissions` for creating, upserting, querying, or reading all operations.
     */
    permission(id: string): Permission;
    /**
     * Read the {@link UserDefinition} for the given {@link User}.
     * @example
     * ```ts snippet:UserRead
     * import { CosmosClient } from "@azure/cosmos";
     *
     * const endpoint = "https://your-account.documents.azure.com";
     * const key = "<database account masterkey>";
     * const client = new CosmosClient({ endpoint, key });
     * const { database } = await client.databases.createIfNotExists({ id: "Test Database" });
     *
     * const { resource: user } = await database.user("<user-id>").read();
     * ```
     */
    read(options?: RequestOptions): Promise<UserResponse>;
    /**
     * Replace the given {@link User}'s definition with the specified {@link UserDefinition}.
     * @param body - The specified {@link UserDefinition} to replace the definition.
     * @example
     * ```ts snippet:UserReplace
     * import { CosmosClient } from "@azure/cosmos";
     *
     * const endpoint = "https://your-account.documents.azure.com";
     * const key = "<database account masterkey>";
     * const client = new CosmosClient({ endpoint, key });
     * const { database } = await client.databases.createIfNotExists({ id: "Test Database" });
     * const { resource: user } = await database.user("<user-id>").read();
     * user.id = "<new user id>";
     *
     * await database.user("<user-id>").replace(user);
     * ```
     */
    replace(body: UserDefinition, options?: RequestOptions): Promise<UserResponse>;
    /**
     * Delete the given {@link User}.
     * @example
     * ```ts snippet:UserDelete
     * import { CosmosClient } from "@azure/cosmos";
     *
     * const endpoint = "https://your-account.documents.azure.com";
     * const key = "<database account masterkey>";
     * const client = new CosmosClient({ endpoint, key });
     * const { database } = await client.databases.createIfNotExists({ id: "Test Database" });
     *
     * await database.user("<user-id>").delete();
     * ```
     */
    delete(options?: RequestOptions): Promise<UserResponse>;
}
//# sourceMappingURL=User.d.ts.map