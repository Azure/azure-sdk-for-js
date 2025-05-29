import type { ClientContext } from "../../ClientContext.js";
import type { RequestOptions } from "../../request/index.js";
import type { Container } from "../Container/index.js";
import type { TriggerDefinition } from "./TriggerDefinition.js";
import { TriggerResponse } from "./TriggerResponse.js";
/**
 * Operations to read, replace, or delete a {@link Trigger}.
 *
 * Use `container.triggers` to create, upsert, query, or read all.
 */
export declare class Trigger {
    readonly container: Container;
    readonly id: string;
    private readonly clientContext;
    /**
     * Returns a reference URL to the resource. Used for linking in Permissions.
     */
    get url(): string;
    /**
     * @hidden
     * @param container - The parent {@link Container}.
     * @param id - The id of the given {@link Trigger}.
     */
    constructor(container: Container, id: string, clientContext: ClientContext);
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
    read(options?: RequestOptions): Promise<TriggerResponse>;
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
    replace(body: TriggerDefinition, options?: RequestOptions): Promise<TriggerResponse>;
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
    delete(options?: RequestOptions): Promise<TriggerResponse>;
}
//# sourceMappingURL=Trigger.d.ts.map