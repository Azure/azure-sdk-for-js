import type { ClientContext } from "../../ClientContext.js";
import type { PartitionKey } from "../../documents/index.js";
import type { RequestOptions } from "../../request/index.js";
import type { PatchRequestBody } from "../../utils/patch.js";
import type { Container } from "../Container/index.js";
import type { ItemDefinition } from "./ItemDefinition.js";
import { ItemResponse } from "./ItemResponse.js";
/**
 * Used to perform operations on a specific item.
 *
 * @see {@link Items} for operations on all items; see `container.items`.
 */
export declare class Item {
    readonly container: Container;
    readonly id: string;
    private readonly clientContext;
    private partitionKey;
    /**
     * Returns a reference URL to the resource. Used for linking in Permissions.
     */
    get url(): string;
    /**
     * @hidden
     * @param container - The parent {@link Container}.
     * @param id - The id of the given {@link Item}.
     * @param partitionKey - The primary key of the given {@link Item} (only for partitioned containers).
     */
    constructor(container: Container, id: string, clientContext: ClientContext, partitionKey?: PartitionKey);
    /**
     * Read the item's definition.
     *
     * Any provided type, T, is not necessarily enforced by the SDK.
     * You may get more or less properties and it's up to your logic to enforce it.
     * If the type, T, is a class, it won't pass `typeof` comparisons, because it won't have a match prototype.
     * It's recommended to only use interfaces.
     *
     * There is no set schema for JSON items. They may contain any number of custom properties.
     *
     * @param options - Additional options for the request
     *
     * @example Using custom type for response
     * ```ts snippet:ItemRead
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
     * interface TodoItem {
     *   title: string;
     *   done: boolean;
     *   id: string;
     * }
     *
     * const { resource: item } = await container.item("id", "<pkValue>").read<TodoItem>();
     * ```
     */
    read<T extends ItemDefinition = any>(options?: RequestOptions): Promise<ItemResponse<T>>;
    /**
     * Replace the item's definition.
     *
     * There is no set schema for JSON items. They may contain any number of custom properties.
     *
     * @param body - The definition to replace the existing {@link Item}'s definition with.
     * @param options - Additional options for the request
     * @example
     * ```ts snippet:ItemReplaceItemDefinition
     * import { CosmosClient, ItemDefinition } from "@azure/cosmos";
     *
     * const endpoint = "https://your-account.documents.azure.com";
     * const key = "<database account masterkey>";
     * const client = new CosmosClient({ endpoint, key });
     * const { database } = await client.databases.createIfNotExists({ id: "Test Database" });
     * const { container } = await database.containers.createIfNotExists({ id: "Test Container" });
     *
     * const item: ItemDefinition = {
     *   id: "id",
     *   title: "new_title",
     * };
     *
     * const { resource: replacedItem } = await container.item("id").replace(item);
     * ```
     */
    replace(body: ItemDefinition, options?: RequestOptions): Promise<ItemResponse<ItemDefinition>>;
    /**
     * Replace the item's definition.
     *
     * Any provided type, T, is not necessarily enforced by the SDK.
     * You may get more or less properties and it's up to your logic to enforce it.
     *
     * There is no set schema for JSON items. They may contain any number of custom properties.
     *
     * @param body - The definition to replace the existing {@link Item}'s definition with.
     * @param options - Additional options for the request
     * @example
     * ```ts snippet:ItemReplace
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
     * interface TodoItem {
     *   title: string;
     *   done: boolean;
     *   id: string;
     * }
     *
     * const { resource: item } = await container.item("id", "<pkValue>").read<TodoItem>();
     *
     * item.done = true;
     * const { resource: replacedItem } = await container.item("id").replace<TodoItem>(item);
     * ```
     */
    replace<T extends ItemDefinition>(body: T, options?: RequestOptions): Promise<ItemResponse<T>>;
    /**
     * Delete the item.
     *
     * Any provided type, T, is not necessarily enforced by the SDK.
     * You may get more or less properties and it's up to your logic to enforce it.
     *
     * @param options - Additional options for the request
     * @example
     * ```ts snippet:ItemDelete
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
     * interface TodoItem {
     *   title: string;
     *   done: boolean;
     *   id: string;
     * }
     *
     * const { resource: item } = await container.item("id", "<pkValue>").read<TodoItem>();
     *
     * await container.item("id").delete<TodoItem>();
     * ```
     */
    delete<T extends ItemDefinition = any>(options?: RequestOptions): Promise<ItemResponse<T>>;
    /**
     * Perform a JSONPatch on the item.
     *
     * Any provided type, T, is not necessarily enforced by the SDK.
     * You may get more or less properties and it's up to your logic to enforce it.
     *
     * @param options - Additional options for the request
     * @example
     * ```ts snippet:ItemPatch
     * import { CosmosClient } from "@azure/cosmos";
     *
     * const endpoint = "https://your-account.documents.azure.com";
     * const key = "<database account masterkey>";
     * const client = new CosmosClient({ endpoint, key });
     *
     * interface TodoItem {
     *   title: string;
     *   done: boolean;
     *   id: string;
     * }
     *
     * const { database } = await client.databases.createIfNotExists({ id: "Test Database" });
     *
     * const { container } = await database.containers.createIfNotExists({ id: "Test Container" });
     *
     * const { resource: item } = await container.item("id", "<pkValue>").read<TodoItem>();
     *
     * const { resource: patchedItem } = await container.item("id").patch<TodoItem>([
     *   {
     *     op: "replace", // Operation type (can be replace, add, remove, set, incr)
     *     path: "/title", // The path to the property to update
     *     value: "new-title", // New value for the property
     *   },
     *   {
     *     op: "remove",
     *     path: "/done",
     *   },
     * ]);
     * ```
     */
    patch<T extends ItemDefinition = any>(body: PatchRequestBody, options?: RequestOptions): Promise<ItemResponse<T>>;
}
//# sourceMappingURL=Item.d.ts.map