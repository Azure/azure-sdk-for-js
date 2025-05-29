"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Trigger = void 0;
const index_js_1 = require("../../common/index.js");
const TriggerResponse_js_1 = require("./TriggerResponse.js");
const diagnostics_js_1 = require("../../utils/diagnostics.js");
/**
 * Operations to read, replace, or delete a {@link Trigger}.
 *
 * Use `container.triggers` to create, upsert, query, or read all.
 */
class Trigger {
    /**
     * Returns a reference URL to the resource. Used for linking in Permissions.
     */
    get url() {
        return (0, index_js_1.createTriggerUri)(this.container.database.id, this.container.id, this.id);
    }
    /**
     * @hidden
     * @param container - The parent {@link Container}.
     * @param id - The id of the given {@link Trigger}.
     */
    constructor(container, id, clientContext) {
        this.container = container;
        this.id = id;
        this.clientContext = clientContext;
    }
    /**
     * Read the {@link TriggerDefinition} for the given {@link Trigger}.
     * @example
     * ```ts snippet:TriggerRead
     * import { CosmosClient } from "@azure/cosmos";
     *
     * const endpoint = "https://your-account.documents.azure.com";
     * const key = "<database account masterkey>";
     * const client = new CosmosClient({ endpoint, key });
     * const { database } = await client.databases.createIfNotExists({ id: "Test Database" });
     * const { container } = await database.containers.createIfNotExists({ id: "Test Container" });
     *
     * const { resource: trigger } = await container.scripts.trigger("<trigger-id>").read();
     * ```
     */
    async read(options) {
        return (0, diagnostics_js_1.withDiagnostics)(async (diagnosticNode) => {
            const path = (0, index_js_1.getPathFromLink)(this.url);
            const id = (0, index_js_1.getIdFromLink)(this.url);
            const response = await this.clientContext.read({
                path,
                resourceType: index_js_1.ResourceType.trigger,
                resourceId: id,
                options,
                diagnosticNode,
            });
            return new TriggerResponse_js_1.TriggerResponse(response.result, response.headers, response.code, this, (0, diagnostics_js_1.getEmptyCosmosDiagnostics)());
        }, this.clientContext);
    }
    /**
     * Replace the given {@link Trigger} with the specified {@link TriggerDefinition}.
     * @param body - The specified {@link TriggerDefinition} to replace the existing definition with.
     * @example
     * ```ts snippet:TriggerReplace
     * import { CosmosClient, TriggerDefinition, TriggerType, TriggerOperation } from "@azure/cosmos";
     *
     * const endpoint = "https://your-account.documents.azure.com";
     * const key = "<database account masterkey>";
     * const client = new CosmosClient({ endpoint, key });
     * const { database } = await client.databases.createIfNotExists({ id: "Test Database" });
     * const { container } = await database.containers.createIfNotExists({ id: "Test Container" });
     *
     * const triggerDefinition: TriggerDefinition = {
     *   id: "sample trigger",
     *   body: "serverScript() { var x = 10; }",
     *   triggerType: TriggerType.Pre,
     *   triggerOperation: TriggerOperation.All,
     * };
     *
     * const { resource: trigger } = await container.scripts.triggers.create(triggerDefinition);
     *
     * trigger.body = "function () { const x = 20; console.log(x); }";
     * const { resource: replacedTrigger } = await container.scripts.trigger(trigger.id).replace(trigger);
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
                resourceType: index_js_1.ResourceType.trigger,
                resourceId: id,
                options,
                diagnosticNode,
            });
            return new TriggerResponse_js_1.TriggerResponse(response.result, response.headers, response.code, this, (0, diagnostics_js_1.getEmptyCosmosDiagnostics)());
        }, this.clientContext);
    }
    /**
     * Delete the given {@link Trigger}.
     * @example
     * ```ts snippet:TriggerDelete
     * import { CosmosClient } from "@azure/cosmos";
     *
     * const endpoint = "https://your-account.documents.azure.com";
     * const key = "<database account masterkey>";
     * const client = new CosmosClient({ endpoint, key });
     * const { database } = await client.databases.createIfNotExists({ id: "Test Database" });
     * const { container } = await database.containers.createIfNotExists({ id: "Test Container" });
     *
     * await container.scripts.trigger("<trigger-id>").delete();
     * ```
     */
    async delete(options) {
        return (0, diagnostics_js_1.withDiagnostics)(async (diagnosticNode) => {
            const path = (0, index_js_1.getPathFromLink)(this.url);
            const id = (0, index_js_1.getIdFromLink)(this.url);
            const response = await this.clientContext.delete({
                path,
                resourceType: index_js_1.ResourceType.trigger,
                resourceId: id,
                options,
                diagnosticNode,
            });
            return new TriggerResponse_js_1.TriggerResponse(response.result, response.headers, response.code, this, (0, diagnostics_js_1.getEmptyCosmosDiagnostics)());
        }, this.clientContext);
    }
}
exports.Trigger = Trigger;
//# sourceMappingURL=Trigger.js.map