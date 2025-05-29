import { getIdFromLink, getPathFromLink, isResourceValid, ResourceType, } from "../../common/index.js";
import { QueryIterator } from "../../queryIterator.js";
import { User } from "./User.js";
import { UserResponse } from "./UserResponse.js";
import { getEmptyCosmosDiagnostics, withDiagnostics } from "../../utils/diagnostics.js";
/**
 * Used to create, upsert, query, and read all users.
 *
 * @see {@link User} to read, replace, or delete a specific User by id.
 */
export class Users {
    /**
     * @hidden
     * @param database - The parent {@link Database}.
     */
    constructor(database, clientContext) {
        this.database = database;
        this.clientContext = clientContext;
    }
    query(query, options) {
        const path = getPathFromLink(this.database.url, ResourceType.user);
        const id = getIdFromLink(this.database.url);
        return new QueryIterator(this.clientContext, query, options, (diagnosticNode, innerOptions) => {
            return this.clientContext.queryFeed({
                path,
                resourceType: ResourceType.user,
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
        return withDiagnostics(async (diagnosticNode) => {
            const err = {};
            if (!isResourceValid(body, err)) {
                throw err;
            }
            const path = getPathFromLink(this.database.url, ResourceType.user);
            const id = getIdFromLink(this.database.url);
            const response = await this.clientContext.create({
                body,
                path,
                resourceType: ResourceType.user,
                resourceId: id,
                options,
                diagnosticNode,
            });
            const ref = new User(this.database, response.result.id, this.clientContext);
            return new UserResponse(response.result, response.headers, response.code, ref, getEmptyCosmosDiagnostics());
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
        return withDiagnostics(async (diagnosticNode) => {
            const err = {};
            if (!isResourceValid(body, err)) {
                throw err;
            }
            const path = getPathFromLink(this.database.url, ResourceType.user);
            const id = getIdFromLink(this.database.url);
            const response = await this.clientContext.upsert({
                body,
                path,
                resourceType: ResourceType.user,
                resourceId: id,
                options,
                diagnosticNode,
            });
            const ref = new User(this.database, response.result.id, this.clientContext);
            return new UserResponse(response.result, response.headers, response.code, ref, getEmptyCosmosDiagnostics());
        }, this.clientContext);
    }
}
//# sourceMappingURL=Users.js.map