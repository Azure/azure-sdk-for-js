"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Users = void 0;
const index_js_1 = require("../../common/index.js");
const queryIterator_js_1 = require("../../queryIterator.js");
const User_js_1 = require("./User.js");
const UserResponse_js_1 = require("./UserResponse.js");
const diagnostics_js_1 = require("../../utils/diagnostics.js");
/**
 * Used to create, upsert, query, and read all users.
 *
 * @see {@link User} to read, replace, or delete a specific User by id.
 */
class Users {
    /**
     * @hidden
     * @param database - The parent {@link Database}.
     */
    constructor(database, clientContext) {
        this.database = database;
        this.clientContext = clientContext;
    }
    query(query, options) {
        const path = (0, index_js_1.getPathFromLink)(this.database.url, index_js_1.ResourceType.user);
        const id = (0, index_js_1.getIdFromLink)(this.database.url);
        return new queryIterator_js_1.QueryIterator(this.clientContext, query, options, (diagnosticNode, innerOptions) => {
            return this.clientContext.queryFeed({
                path,
                resourceType: index_js_1.ResourceType.user,
                resourceId: id,
                resultFn: (result) => result.Users,
                query,
                options: innerOptions,
                diagnosticNode,
            });
        });
    }
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
    readAll(options) {
        return this.query(undefined, options);
    }
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
    async create(body, options) {
        return (0, diagnostics_js_1.withDiagnostics)(async (diagnosticNode) => {
            const err = {};
            if (!(0, index_js_1.isResourceValid)(body, err)) {
                throw err;
            }
            const path = (0, index_js_1.getPathFromLink)(this.database.url, index_js_1.ResourceType.user);
            const id = (0, index_js_1.getIdFromLink)(this.database.url);
            const response = await this.clientContext.create({
                body,
                path,
                resourceType: index_js_1.ResourceType.user,
                resourceId: id,
                options,
                diagnosticNode,
            });
            const ref = new User_js_1.User(this.database, response.result.id, this.clientContext);
            return new UserResponse_js_1.UserResponse(response.result, response.headers, response.code, ref, (0, diagnostics_js_1.getEmptyCosmosDiagnostics)());
        }, this.clientContext);
    }
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
    async upsert(body, options) {
        return (0, diagnostics_js_1.withDiagnostics)(async (diagnosticNode) => {
            const err = {};
            if (!(0, index_js_1.isResourceValid)(body, err)) {
                throw err;
            }
            const path = (0, index_js_1.getPathFromLink)(this.database.url, index_js_1.ResourceType.user);
            const id = (0, index_js_1.getIdFromLink)(this.database.url);
            const response = await this.clientContext.upsert({
                body,
                path,
                resourceType: index_js_1.ResourceType.user,
                resourceId: id,
                options,
                diagnosticNode,
            });
            const ref = new User_js_1.User(this.database, response.result.id, this.clientContext);
            return new UserResponse_js_1.UserResponse(response.result, response.headers, response.code, ref, (0, diagnostics_js_1.getEmptyCosmosDiagnostics)());
        }, this.clientContext);
    }
}
exports.Users = Users;
//# sourceMappingURL=Users.js.map