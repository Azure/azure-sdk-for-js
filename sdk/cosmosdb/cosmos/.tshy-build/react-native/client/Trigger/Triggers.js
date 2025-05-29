import { getIdFromLink, getPathFromLink, isResourceValid, ResourceType, } from "../../common/index.js";
import { QueryIterator } from "../../queryIterator.js";
import { Trigger } from "./Trigger.js";
import { TriggerResponse } from "./TriggerResponse.js";
import { getEmptyCosmosDiagnostics, withDiagnostics } from "../../utils/diagnostics.js";
/**
 * Operations to create, upsert, query, and read all triggers.
 *
 * Use `container.triggers` to read, replace, or delete a {@link Trigger}.
 */
export class Triggers {
    /**
     * @hidden
     * @param container - The parent {@link Container}.
     */
    constructor(container, clientContext) {
        this.container = container;
        this.clientContext = clientContext;
    }
    query(query, options) {
        const path = getPathFromLink(this.container.url, ResourceType.trigger);
        const id = getIdFromLink(this.container.url);
        return new QueryIterator(this.clientContext, query, options, (diagnosticNode, innerOptions) => {
            return this.clientContext.queryFeed({
                path,
                resourceType: ResourceType.trigger,
                resourceId: id,
                resultFn: (result) => result.Triggers,
                query,
                options: innerOptions,
                diagnosticNode,
            });
        });
    }
    /**
     * Read all Triggers.
     * @example Read all trigger to array.
     * ```ts snippet:TriggersReadAllTriggers
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
     * const { resources: triggerList } = await container.scripts.triggers.readAll().fetchAll();
     * ```
     */
    readAll(options) {
        return this.query(undefined, options);
    }
    /**
     * Create a trigger.
     *
     * Azure Cosmos DB supports pre and post triggers defined in JavaScript to be executed
     * on creates, updates and deletes.
     *
     * For additional details, refer to the server-side JavaScript API documentation.
     * @example
     * ```ts snippet:TriggersCreate
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
     * ```
     */
    async create(body, options) {
        return withDiagnostics(async (diagnosticNode) => {
            if (body.body) {
                body.body = body.body.toString();
            }
            const err = {};
            if (!isResourceValid(body, err)) {
                throw err;
            }
            const path = getPathFromLink(this.container.url, ResourceType.trigger);
            const id = getIdFromLink(this.container.url);
            const response = await this.clientContext.create({
                body,
                path,
                resourceType: ResourceType.trigger,
                resourceId: id,
                options,
                diagnosticNode,
            });
            const ref = new Trigger(this.container, response.result.id, this.clientContext);
            return new TriggerResponse(response.result, response.headers, response.code, ref, getEmptyCosmosDiagnostics());
        }, this.clientContext);
    }
}
//# sourceMappingURL=Triggers.js.map