import { ClientContext } from "../../ClientContext";
import { Helper, UriFactory } from "../../common";
import { RequestOptions } from "../../request";
import { Container } from "../Container";
import { Resource } from "../Resource";
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
    return UriFactory.createDocumentUri(this.container.database.id, this.container.id, this.id);
  }

  /**
   * @hidden
   * @param container The parent {@link Container}.
   * @param id The id of the given {@link Item}.
   * @param primaryKey The primary key of the given {@link Item} (only for partitioned containers).
   */
  constructor(
    public readonly container: Container,
    public readonly id: string,
    public readonly primaryKey: string,
    private readonly clientContext: ClientContext
  ) {}

  /**
   * Read the item's definition.
   *
   * There is no set schema for JSON items. They may contain any number of custom properties.
   *
   * @param options Additional options for the request, such as the partition key.
   * Note, if you provide a partition key on the options object, it will override the primary key on `this.primaryKey`.
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
   * Note, if you provide a partition key on the options object, it will override the primary key on `this.primaryKey`.
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
    if ((!options || !options.partitionKey) && this.primaryKey) {
      options.partitionKey = this.primaryKey;
    }
    const path = Helper.getPathFromLink(this.url);
    const id = Helper.getIdFromLink(this.url);
    const response = await this.clientContext.read<T>(path, "docs", id, undefined, options);

    return {
      body: response.result,
      headers: response.headers,
      ref: this,
      item: this
    };
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
    if ((!options || !options.partitionKey) && this.primaryKey) {
      options.partitionKey = this.primaryKey;
    }
    if (options.partitionKey === undefined && options.skipGetPartitionKeyDefinition !== true) {
      const { body: partitionKeyDefinition } = await this.container.getPartitionKeyDefinition();
      options.partitionKey = this.container.extractPartitionKey(body, partitionKeyDefinition);
    }

    const err = {};
    if (!Helper.isResourceValid(body, err)) {
      throw err;
    }

    const path = Helper.getPathFromLink(this.url);
    const id = Helper.getIdFromLink(this.url);

    const response = await this.clientContext.replace<T>(body, path, "docs", id, undefined, options);
    return {
      body: response.result,
      headers: response.headers,
      ref: this,
      item: this
    };
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
    if ((!options || !options.partitionKey) && this.primaryKey) {
      options.partitionKey = this.primaryKey;
    }
    const path = Helper.getPathFromLink(this.url);
    const id = Helper.getIdFromLink(this.url);

    const response = await this.clientContext.delete<T>(path, "docs", id, undefined, options);
    return {
      body: response.result,
      headers: response.headers,
      ref: this,
      item: this
    };
  }
}
