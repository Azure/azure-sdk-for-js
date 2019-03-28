import { ClientContext } from "../../ClientContext";
import { createDocumentUri, getIdFromLink, getPathFromLink, isResourceValid, ResourceType } from "../../common";
import { extractPartitionKey } from "../../extractPartitionKey";
import { RequestOptions } from "../../request";
import { Container } from "../Container";
import { ItemDefinition } from "./ItemDefinition";
import { ItemResponse } from "./ItemResponse";

/**
 * Used to perform operations on a specific item.
 *
 * @see {@link Items} for operations on all items; see `container.items`.
 */
export class Item {
  /**
   * Returns a reference URL to the resource. Used for linking in Permissions.
   */
  public get url() {
    return createDocumentUri(this.container.database.id, this.container.id, this.id);
  }

  /**
   * @hidden
   * @param container The parent {@link Container}.
   * @param id The id of the given {@link Item}.
   * @param partitionKey The primary key of the given {@link Item} (only for partitioned containers).
   */
  constructor(
    public readonly container: Container,
    public readonly id: string,
    public readonly partitionKey: string,
    private readonly clientContext: ClientContext
  ) {}

  /**
   * Read the item's definition.
   *
   * There is no set schema for JSON items. They may contain any number of custom properties.
   *
   * @param options Additional options for the request, such as the partition key.
   * Note, if you provide a partition key on the options object, it will override the primary key on `this.partitionKey`.
   */
  public read(options?: RequestOptions): Promise<ItemResponse<ItemDefinition>>;
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
   * @param options Additional options for the request, such as the partition key.
   * Note, if you provide a partition key on the options object, it will override the primary key on `this.partitionKey`.
   *
   * @example Using custom type for response
   * ```typescript
   * interface TodoItem {
   *   title: string;
   *   done: bool;
   *   id: string;
   * }
   *
   * let item: TodoItem;
   * ({body: item} = await item.read<TodoItem>());
   * ```
   */
  public read<T extends ItemDefinition>(options?: RequestOptions): Promise<ItemResponse<T>>;
  public async read<T extends ItemDefinition>(options?: RequestOptions): Promise<ItemResponse<T>> {
    options = options || {};
    if ((!options || !options.partitionKey) && this.partitionKey !== undefined) {
      options.partitionKey = this.partitionKey;
    }
    const path = getPathFromLink(this.url);
    const id = getIdFromLink(this.url);
    const response = await this.clientContext.read<T>(path, ResourceType.item, id, options);

    return new ItemResponse(response.result, response.headers, response.statusCode, this);
  }

  /**
   * Replace the item's definition.
   *
   * There is no set schema for JSON items. They may contain any number of custom properties.
   *
   * @param body The definition to replace the existing {@link Item}'s definition with.
   * @param options Additional options for the request, such as the partition key.
   */
  public replace(body: ItemDefinition, options?: RequestOptions): Promise<ItemResponse<ItemDefinition>>;
  /**
   * Replace the item's definition.
   *
   * Any provided type, T, is not necessarily enforced by the SDK.
   * You may get more or less properties and it's up to your logic to enforce it.
   *
   * There is no set schema for JSON items. They may contain any number of custom properties.
   *
   * @param body The definition to replace the existing {@link Item}'s definition with.
   * @param options Additional options for the request, such as the partition key.
   */
  public replace<T extends ItemDefinition>(body: T, options?: RequestOptions): Promise<ItemResponse<T>>;
  public async replace<T extends ItemDefinition>(body: T, options?: RequestOptions): Promise<ItemResponse<T>> {
    options = options || {};
    if ((!options || !options.partitionKey) && this.partitionKey !== undefined) {
      options.partitionKey = this.partitionKey;
    }
    if (options.partitionKey === undefined && options.skipGetPartitionKeyDefinition !== true) {
      const { resource: partitionKeyDefinition } = await this.container.getPartitionKeyDefinition();
      options.partitionKey = extractPartitionKey(body, partitionKeyDefinition);
    }

    const err = {};
    if (!isResourceValid(body, err)) {
      throw err;
    }

    const path = getPathFromLink(this.url);
    const id = getIdFromLink(this.url);

    const response = await this.clientContext.replace<T>(body, path, ResourceType.item, id, options);
    return new ItemResponse(response.result, response.headers, response.statusCode, this);
  }

  /**
   * Delete the item.
   * @param options Additional options for the request, such as the partition key.
   */
  public delete(options?: RequestOptions): Promise<ItemResponse<ItemDefinition>>;
  /**
   * Delete the item.
   *
   * Any provided type, T, is not necessarily enforced by the SDK.
   * You may get more or less properties and it's up to your logic to enforce it.
   *
   * @param options Additional options for the request, such as the partition key.
   */
  public delete<T extends ItemDefinition>(options?: RequestOptions): Promise<ItemResponse<T>>;
  public async delete<T extends ItemDefinition>(options?: RequestOptions): Promise<ItemResponse<T>> {
    options = options || {};
    if ((!options || !options.partitionKey) && this.partitionKey !== undefined) {
      options.partitionKey = this.partitionKey;
    }
    const path = getPathFromLink(this.url);
    const id = getIdFromLink(this.url);

    const response = await this.clientContext.delete<T>(path, ResourceType.item, id, options);
    return new ItemResponse(response.result, response.headers, response.statusCode, this);
  }
}
