"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDefinedFunction = void 0;
const index_js_1 = require("../../common/index.js");
const UserDefinedFunctionResponse_js_1 = require("./UserDefinedFunctionResponse.js");
const diagnostics_js_1 = require("../../utils/diagnostics.js");
/**
 * Used to read, replace, or delete a specified User Definied Function by id.
 *
 * @see {@link UserDefinedFunction} to create, upsert, query, read all User Defined Functions.
 */
class UserDefinedFunction {
    /**
     * Returns a reference URL to the resource. Used for linking in Permissions.
     */
    get url() {
        return (0, index_js_1.createUserDefinedFunctionUri)(this.container.database.id, this.container.id, this.id);
    }
    /**
     * @hidden
     * @param container - The parent {@link Container}.
     * @param id - The id of the given {@link UserDefinedFunction}.
     */
    constructor(container, id, clientContext) {
        this.container = container;
        this.id = id;
        this.clientContext = clientContext;
    }
    /**
     * Read the {@link UserDefinedFunctionDefinition} for the given {@link UserDefinedFunction}.
     * @example
     * ```ts snippet:UserDefinedFunctionRead
     * import { CosmosClient } from "@azure/cosmos";
     *
     * const endpoint = "https://your-account.documents.azure.com";
     * const key = "<database account masterkey>";
     * const client = new CosmosClient({ endpoint, key });
     * const { database } = await client.databases.createIfNotExists({ id: "Test Database" });
     * const { container } = await database.containers.createIfNotExists({ id: "Test Container" });
     *
     * const { resource: udf } = await container.scripts.userDefinedFunction("<udf-id>").read();
     * ```
     */
    async read(options) {
        return (0, diagnostics_js_1.withDiagnostics)(async (diagnosticNode) => {
            const path = (0, index_js_1.getPathFromLink)(this.url);
            const id = (0, index_js_1.getIdFromLink)(this.url);
            const response = await this.clientContext.read({
                path,
                resourceType: index_js_1.ResourceType.udf,
                resourceId: id,
                options,
                diagnosticNode,
            });
            return new UserDefinedFunctionResponse_js_1.UserDefinedFunctionResponse(response.result, response.headers, response.code, this, (0, diagnostics_js_1.getEmptyCosmosDiagnostics)());
        }, this.clientContext);
    }
    /**
     * Replace the given {@link UserDefinedFunction} with the specified {@link UserDefinedFunctionDefinition}.
     * @param options -
     * @example
     * ```ts snippet:UserDefinedFunctionReplace
     * import { CosmosClient, UserDefinedFunctionDefinition } from "@azure/cosmos";
     *
     * const endpoint = "https://your-account.documents.azure.com";
     * const key = "<database account masterkey>";
     * const client = new CosmosClient({ endpoint, key });
     * const { database } = await client.databases.createIfNotExists({ id: "Test Database" });
     * const { container } = await database.containers.createIfNotExists({ id: "Test Container" });
     *
     * const udfDefinition: UserDefinedFunctionDefinition = {
     *   id: "sample udf",
     *   body: "function () { const x = 10; }",
     * };
     * await container.scripts.userDefinedFunctions.create(udfDefinition);
     *
     * udfDefinition.body = "function () { const x = 20; }";
     * const { resource: replacedUdf } = await container.scripts
     *   .userDefinedFunction(udfDefinition.id)
     *   .replace(udfDefinition);
     * ```
     */
    async replace(body, options) {
        return (0, diagnostics_js_1.withDiagnostics)(async (diagnosticNode) => {
            if (body.body) {
                body.body = body.body.toString();
            }
            const err = {};
            if (!(0, index_js_1.isResourceValid)(body, err)) {
                throw err;
            }
            const path = (0, index_js_1.getPathFromLink)(this.url);
            const id = (0, index_js_1.getIdFromLink)(this.url);
            const response = await this.clientContext.replace({
                body,
                path,
                resourceType: index_js_1.ResourceType.udf,
                resourceId: id,
                options,
                diagnosticNode,
            });
            return new UserDefinedFunctionResponse_js_1.UserDefinedFunctionResponse(response.result, response.headers, response.code, this, (0, diagnostics_js_1.getEmptyCosmosDiagnostics)());
        }, this.clientContext);
    }
    /**
     * Delete the given {@link UserDefined}.
     * @example
     * ```ts snippet:UserDefinedFunctionDelete
     * import { CosmosClient } from "@azure/cosmos";
     *
     * const endpoint = "https://your-account.documents.azure.com";
     * const key = "<database account masterkey>";
     * const client = new CosmosClient({ endpoint, key });
     * const { database } = await client.databases.createIfNotExists({ id: "Test Database" });
     * const { container } = await database.containers.createIfNotExists({ id: "Test Container" });
     *
     * await container.scripts.userDefinedFunction("<udf-id>").delete();
     * ```
     */
    async delete(options) {
        return (0, diagnostics_js_1.withDiagnostics)(async (diagnosticNode) => {
            const path = (0, index_js_1.getPathFromLink)(this.url);
            const id = (0, index_js_1.getIdFromLink)(this.url);
            const response = await this.clientContext.delete({
                path,
                resourceType: index_js_1.ResourceType.udf,
                resourceId: id,
                options,
                diagnosticNode,
            });
            return new UserDefinedFunctionResponse_js_1.UserDefinedFunctionResponse(response.result, response.headers, response.code, this, (0, diagnostics_js_1.getEmptyCosmosDiagnostics)());
        }, this.clientContext);
    }
}
exports.UserDefinedFunction = UserDefinedFunction;
//# sourceMappingURL=UserDefinedFunction.js.map