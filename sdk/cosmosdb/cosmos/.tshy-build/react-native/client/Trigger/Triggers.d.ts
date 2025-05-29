import type { ClientContext } from "../../ClientContext.js";
import type { SqlQuerySpec } from "../../queryExecutionContext/index.js";
import { QueryIterator } from "../../queryIterator.js";
import type { FeedOptions, RequestOptions } from "../../request/index.js";
import type { Container } from "../Container/index.js";
import type { Resource } from "../Resource.js";
import type { TriggerDefinition } from "./TriggerDefinition.js";
import { TriggerResponse } from "./TriggerResponse.js";
/**
 * Operations to create, upsert, query, and read all triggers.
 *
 * Use `container.triggers` to read, replace, or delete a {@link Trigger}.
 */
export declare class Triggers {
    readonly container: Container;
    private readonly clientContext;
    /**
     * @hidden
     * @param container - The parent {@link Container}.
     */
    constructor(container: Container, clientContext: ClientContext);
    /**
     * Query all Triggers.
     * @param query - Query configuration for the operation. See {@link SqlQuerySpec} for more info on how to configure a query.
     */
    query(query: SqlQuerySpec, options?: FeedOptions): QueryIterator<any>;
    /**
     * Query all Triggers.
     * @param query - Query configuration for the operation. See {@link SqlQuerySpec} for more info on how to configure a query.
     * * @example
     * ```ts snippet:TriggersQuery
     * import { CosmosClient } from "@azure/cosmos";
     *
     * const endpoint = "https://your-account.documents.azure.com";
     * const key = "<database account masterkey>";
     * const client = new CosmosClient({ endpoint, key });
     * const { database } = await client.databases.createIfNotExists({ id: "Test Database" });
     * const { container } = await database.containers.createIfNotExists({ id: "Test Container" });
     *
     * const querySpec = {
     *   query: "SELECT * FROM root r WHERE r.id=@id",
     *   parameters: [
     *     {
     *       name: "@id",
     *       value: "<trigger-id>",
     *     },
     *   ],
     * };
     * const { resources: results } = await container.scripts.triggers.query(querySpec).fetchAll();
     * ```
     */
    query<T>(query: SqlQuerySpec, options?: FeedOptions): QueryIterator<T>;
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
    readAll(options?: FeedOptions): QueryIterator<TriggerDefinition & Resource>;
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
    create(body: TriggerDefinition, options?: RequestOptions): Promise<TriggerResponse>;
}
//# sourceMappingURL=Triggers.d.ts.map