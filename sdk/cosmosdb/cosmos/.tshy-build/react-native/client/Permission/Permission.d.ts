import type { ClientContext } from "../../ClientContext.js";
import type { RequestOptions } from "../../request/RequestOptions.js";
import type { User } from "../User/index.js";
import type { PermissionDefinition } from "./PermissionDefinition.js";
import { PermissionResponse } from "./PermissionResponse.js";
/**
 * Use to read, replace, or delete a given {@link Permission} by id.
 *
 * @see {@link Permissions} to create, upsert, query, or read all Permissions.
 */
export declare class Permission {
    readonly user: User;
    readonly id: string;
    private readonly clientContext;
    /**
     * Returns a reference URL to the resource. Used for linking in Permissions.
     */
    get url(): string;
    /**
     * @hidden
     * @param user - The parent {@link User}.
     * @param id - The id of the given {@link Permission}.
     */
    constructor(user: User, id: string, clientContext: ClientContext);
    /**
     * Read the {@link PermissionDefinition} of the given {@link Permission}.
     * @example
     * ```ts snippet:PermissionRead
     * import { CosmosClient } from "@azure/cosmos";
     *
     * const endpoint = "https://your-account.documents.azure.com";
     * const key = "<database account masterkey>";
     * const client = new CosmosClient({ endpoint, key });
     * const { database } = await client.databases.createIfNotExists({ id: "Test Database" });
     * const user = database.user("<user-id>");
     *
     * const { resource: permission } = await user.permission("<permission-id>").read();
     * ```
     */
    read(options?: RequestOptions): Promise<PermissionResponse>;
    /**
     * Replace the given {@link Permission} with the specified {@link PermissionDefinition}.
     * @param body - The specified {@link PermissionDefinition}.
     * @example
     * ```ts snippet:PermissionReplace
     * import { CosmosClient } from "@azure/cosmos";
     *
     * const endpoint = "https://your-account.documents.azure.com";
     * const key = "<database account masterkey>";
     * const client = new CosmosClient({ endpoint, key });
     * const { database } = await client.databases.createIfNotExists({ id: "Test Database" });
     * const user = database.user("<user-id>");
     * const { resource: permission } = await user.permission("<permission-id>").read();
     * permission.resource = "<new-resource-url>";
     *
     * await user.permission("<permission-id>").replace(permission);
     * ```
     */
    replace(body: PermissionDefinition, options?: RequestOptions): Promise<PermissionResponse>;
    /**
     * Delete the given {@link Permission}.
     * @example
     * ```ts snippet:PermissionDelete
     * import { CosmosClient } from "@azure/cosmos";
     *
     * const endpoint = "https://your-account.documents.azure.com";
     * const key = "<database account masterkey>";
     * const client = new CosmosClient({ endpoint, key });
     * const { database } = await client.databases.createIfNotExists({ id: "Test Database" });
     * const user = database.user("<user-id>");
     *
     * await user.permission("<permission-id>").delete();
     * ```
     */
    delete(options?: RequestOptions): Promise<PermissionResponse>;
}
//# sourceMappingURL=Permission.d.ts.map