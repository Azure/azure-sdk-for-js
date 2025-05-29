"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const index_js_1 = require("../../common/index.js");
const index_js_2 = require("../Permission/index.js");
const UserResponse_js_1 = require("./UserResponse.js");
const diagnostics_js_1 = require("../../utils/diagnostics.js");
/**
 * Used to read, replace, and delete Users.
 *
 * Additionally, you can access the permissions for a given user via `user.permission` and `user.permissions`.
 *
 * @see {@link Users} to create, upsert, query, or read all.
 */
class User {
    /**
     * Returns a reference URL to the resource. Used for linking in Permissions.
     */
    get url() {
        return (0, index_js_1.createUserUri)(this.database.id, this.id);
    }
    /**
     * @hidden
     * @param database - The parent {@link Database}.
     */
    constructor(database, id, clientContext) {
        this.database = database;
        this.id = id;
        this.clientContext = clientContext;
        this.permissions = new index_js_2.Permissions(this, this.clientContext);
    }
    /**
     * Operations to read, replace, or delete a specific Permission by id.
     *
     * See `client.permissions` for creating, upserting, querying, or reading all operations.
     */
    permission(id) {
        return new index_js_2.Permission(this, id, this.clientContext);
    }
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
    async read(options) {
        return (0, diagnostics_js_1.withDiagnostics)(async (diagnosticNode) => {
            const path = (0, index_js_1.getPathFromLink)(this.url);
            const id = (0, index_js_1.getIdFromLink)(this.url);
            const response = await this.clientContext.read({
                path,
                resourceType: index_js_1.ResourceType.user,
                resourceId: id,
                options,
                diagnosticNode,
            });
            return new UserResponse_js_1.UserResponse(response.result, response.headers, response.code, this, (0, diagnostics_js_1.getEmptyCosmosDiagnostics)());
        }, this.clientContext);
    }
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
                resourceType: index_js_1.ResourceType.user,
                resourceId: id,
                options,
                diagnosticNode,
            });
            return new UserResponse_js_1.UserResponse(response.result, response.headers, response.code, this, (0, diagnostics_js_1.getEmptyCosmosDiagnostics)());
        }, this.clientContext);
    }
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
    async delete(options) {
        return (0, diagnostics_js_1.withDiagnostics)(async (diagnosticNode) => {
            const path = (0, index_js_1.getPathFromLink)(this.url);
            const id = (0, index_js_1.getIdFromLink)(this.url);
            const response = await this.clientContext.delete({
                path,
                resourceType: index_js_1.ResourceType.user,
                resourceId: id,
                options,
                diagnosticNode,
            });
            return new UserResponse_js_1.UserResponse(response.result, response.headers, response.code, this, (0, diagnostics_js_1.getEmptyCosmosDiagnostics)());
        }, this.clientContext);
    }
}
exports.User = User;
//# sourceMappingURL=User.js.map