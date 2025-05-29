import { createPermissionUri, getIdFromLink, getPathFromLink, isResourceValid, ResourceType, } from "../../common/index.js";
import { PermissionResponse } from "./PermissionResponse.js";
import { getEmptyCosmosDiagnostics, withDiagnostics } from "../../utils/diagnostics.js";
/**
 * Use to read, replace, or delete a given {@link Permission} by id.
 *
 * @see {@link Permissions} to create, upsert, query, or read all Permissions.
 */
export class Permission {
    /**
     * Returns a reference URL to the resource. Used for linking in Permissions.
     */
    get url() {
        return createPermissionUri(this.user.database.id, this.user.id, this.id);
    }
    /**
     * @hidden
     * @param user - The parent {@link User}.
     * @param id - The id of the given {@link Permission}.
     */
    constructor(user, id, clientContext) {
        this.user = user;
        this.id = id;
        this.clientContext = clientContext;
    }
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
    async read(options) {
        return withDiagnostics(async (diagnosticNode) => {
            const path = getPathFromLink(this.url);
            const id = getIdFromLink(this.url);
            const response = await this.clientContext.read({
                path,
                resourceType: ResourceType.permission,
                resourceId: id,
                options,
                diagnosticNode,
            });
            return new PermissionResponse(response.result, response.headers, response.code, this, getEmptyCosmosDiagnostics());
        }, this.clientContext);
    }
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
    async replace(body, options) {
        return withDiagnostics(async (diagnosticNode) => {
            const err = {};
            if (!isResourceValid(body, err)) {
                throw err;
            }
            const path = getPathFromLink(this.url);
            const id = getIdFromLink(this.url);
            const response = await this.clientContext.replace({
                body,
                path,
                resourceType: ResourceType.permission,
                resourceId: id,
                options,
                diagnosticNode,
            });
            return new PermissionResponse(response.result, response.headers, response.code, this, getEmptyCosmosDiagnostics());
        }, this.clientContext);
    }
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
    async delete(options) {
        return withDiagnostics(async (diagnosticNode) => {
            const path = getPathFromLink(this.url);
            const id = getIdFromLink(this.url);
            const response = await this.clientContext.delete({
                path,
                resourceType: ResourceType.permission,
                resourceId: id,
                options,
                diagnosticNode,
            });
            return new PermissionResponse(response.result, response.headers, response.code, this, getEmptyCosmosDiagnostics());
        }, this.clientContext);
    }
}
//# sourceMappingURL=Permission.js.map