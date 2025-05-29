"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDefinedFunctions = void 0;
const index_js_1 = require("../../common/index.js");
const queryIterator_js_1 = require("../../queryIterator.js");
const UserDefinedFunction_js_1 = require("./UserDefinedFunction.js");
const UserDefinedFunctionResponse_js_1 = require("./UserDefinedFunctionResponse.js");
const diagnostics_js_1 = require("../../utils/diagnostics.js");
/**
 * Used to create, upsert, query, or read all User Defined Functions.
 *
 * @see {@link UserDefinedFunction} to read, replace, or delete a given User Defined Function by id.
 */
class UserDefinedFunctions {
    /**
     * @hidden
     * @param container - The parent {@link Container}.
     */
    constructor(container, clientContext) {
        this.container = container;
        this.clientContext = clientContext;
    }
    query(query, options) {
        const path = (0, index_js_1.getPathFromLink)(this.container.url, index_js_1.ResourceType.udf);
        const id = (0, index_js_1.getIdFromLink)(this.container.url);
        return new queryIterator_js_1.QueryIterator(this.clientContext, query, options, (diagnosticNode, innerOptions) => {
            return this.clientContext.queryFeed({
                path,
                resourceType: index_js_1.ResourceType.udf,
                resourceId: id,
                resultFn: (result) => result.UserDefinedFunctions,
                query,
                options: innerOptions,
                diagnosticNode,
            });
        });
    }
    /**
     * Read all User Defined Functions.
     * @example Read all User Defined Functions to array.
     * ```ts snippet:UserDefinedFunctionsReadAll
     * import { CosmosClient } from "@azure/cosmos";
     *
     * const endpoint = "https://your-account.documents.azure.com";
     * const key = "<database account masterkey>";
     * const client = new CosmosClient({ endpoint, key });
     *
     * const { database } = await client.databases.createIfNotExists({ id: "Test Database" });
     *
     * const { container } = await database.containers.createIfNotExists({ id: "Test Container" });
     *
     * const { resources: udfList } = await container.scripts.userDefinedFunctions.readAll().fetchAll();
     * ```
     */
    readAll(options) {
        return this.query(undefined, options);
    }
    /**
     * Create a UserDefinedFunction.
     *
     * Azure Cosmos DB supports JavaScript UDFs which can be used inside queries, stored procedures and triggers.
     *
     * For additional details, refer to the server-side JavaScript API documentation.
     * @example
     * ```ts snippet:UserDefinedFunctionsCreate
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
     *
     * const { resource: udf } = await container.scripts.userDefinedFunctions.create(udfDefinition);
     * ```
     */
    async create(body, options) {
        return (0, diagnostics_js_1.withDiagnostics)(async (diagnosticNode) => {
            if (body.body) {
                body.body = body.body.toString();
            }
            const err = {};
            if (!(0, index_js_1.isResourceValid)(body, err)) {
                throw err;
            }
            const path = (0, index_js_1.getPathFromLink)(this.container.url, index_js_1.ResourceType.udf);
            const id = (0, index_js_1.getIdFromLink)(this.container.url);
            const response = await this.clientContext.create({
                body,
                path,
                resourceType: index_js_1.ResourceType.udf,
                resourceId: id,
                options,
                diagnosticNode,
            });
            const ref = new UserDefinedFunction_js_1.UserDefinedFunction(this.container, response.result.id, this.clientContext);
            return new UserDefinedFunctionResponse_js_1.UserDefinedFunctionResponse(response.result, response.headers, response.code, ref, (0, diagnostics_js_1.getEmptyCosmosDiagnostics)());
        }, this.clientContext);
    }
}
exports.UserDefinedFunctions = UserDefinedFunctions;
//# sourceMappingURL=UserDefinedFunctions.js.map