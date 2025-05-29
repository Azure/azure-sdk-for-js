"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Permission = void 0;
const index_js_1 = require("../../common/index.js");
const PermissionResponse_js_1 = require("./PermissionResponse.js");
const diagnostics_js_1 = require("../../utils/diagnostics.js");
/**
 * Use to read, replace, or delete a given {@link Permission} by id.
 *
 * @see {@link Permissions} to create, upsert, query, or read all Permissions.
 */
class Permission {
    /**
     * Returns a reference URL to the resource. Used for linking in Permissions.
     */
    get url() {
        return (0, index_js_1.createPermissionUri)(this.user.database.id, this.user.id, this.id);
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
        return (0, diagnostics_js_1.withDiagnostics)(async (diagnosticNode) => {
            const path = (0, index_js_1.getPathFromLink)(this.url);
            const id = (0, index_js_1.getIdFromLink)(this.url);
            const response = await this.clientContext.read({
                path,
                resourceType: index_js_1.ResourceType.permission,
                resourceId: id,
                options,
                diagnosticNode,
            });
            return new PermissionResponse_js_1.PermissionResponse(response.result, response.headers, response.code, this, (0, diagnostics_js_1.getEmptyCosmosDiagnostics)());
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
        return (0, diagnostics_js_1.withDiagnostics)(async (diagnosticNode) => {
            const err = {};
            if (!(0, index_js_1.isResourceValid)(body, err)) {
                throw err;
            }
            const path = (0, index_js_1.getPathFromLink)(this.url);
            const id = (0, index_js_1.getIdFromLink)(this.url);
            const response = await this.clientContext.replace({
                body,
                path,
                resourceType: index_js_1.ResourceType.permission,
                resourceId: id,
                options,
                diagnosticNode,
            });
            return new PermissionResponse_js_1.PermissionResponse(response.result, response.headers, response.code, this, (0, diagnostics_js_1.getEmptyCosmosDiagnostics)());
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
        return (0, diagnostics_js_1.withDiagnostics)(async (diagnosticNode) => {
            const path = (0, index_js_1.getPathFromLink)(this.url);
            const id = (0, index_js_1.getIdFromLink)(this.url);
            const response = await this.clientContext.delete({
                path,
                resourceType: index_js_1.ResourceType.permission,
                resourceId: id,
                options,
                diagnosticNode,
            });
            return new PermissionResponse_js_1.PermissionResponse(response.result, response.headers, response.code, this, (0, diagnostics_js_1.getEmptyCosmosDiagnostics)());
        }, this.clientContext);
    }
}
exports.Permission = Permission;
//# sourceMappingURL=Permission.js.map