import { ClientContext } from "../../ClientContext";
import { Helper } from "../../common";
import { FetchFunctionCallback, SqlQuerySpec } from "../../queryExecutionContext";
import { QueryIterator } from "../../queryIterator";
import { FeedOptions, RequestOptions } from "../../request";
import { Container } from "../Container";
import { Item } from "./Item";
import { ItemBody } from "./ItemBody";
import { ItemDefinition } from "./ItemDefinition";
import { ItemResponse } from "./ItemResponse";

/**
 * Operations for creating new items, and reading/querying all items
 *
 * @see {@link Item} for reading, replacing, or deleting an existing container; use `.item(id)`.
 */
export class Items {
  /**
   * Create an instance of {@link Items} linked to the parent {@link Container}.
   * @param container The parent container.
   * @hidden
   */
  constructor(public readonly container: Container, private readonly clientContext: ClientContext) {}

  /**
   * Queries all items.
   * @param query Query configuration for the operation. See {@link SqlQuerySpec} for more info on how to configure a query.
   * @param options Used for modifying the request (for instance, specifying the partition key).
   * @example Read all items to array.
   * ```typescript
   * const querySpec: SqlQuerySpec = {
   *   query: "SELECT * FROM Families f WHERE f.lastName = @lastName",
   *   parameters: [
   *     {name: "@lastName", value: "Hendricks"}
   *   ]
   * };
   * const {body: containerList} = await items.query.toArray();
   * ```
   */
  public query(query: string | SqlQuerySpec, options?: FeedOptions): QueryIterator<ItemDefinition>;
  /**
   * Queries all items.
   * @param query Query configuration for the operation. See {@link SqlQuerySpec} for more info on how to configure a query.
   * @param options Used for modifying the request (for instance, specifying the partition key).
   * @example Read all items to array.
   * ```typescript
   * const querySpec: SqlQuerySpec = {
   *   query: "SELECT * FROM Families f WHERE f.lastName = @lastName",
   *   parameters: [
   *     {name: "@lastName", value: "Hendricks"}
   *   ]
   * };
   * const {body: containerList} = await items.query.toArray();
   * ```
   */
  public query<T extends ItemDefinition>(query: string | SqlQuerySpec, options?: FeedOptions): QueryIterator<T>;
  public query<T extends ItemDefinition>(query: string | SqlQuerySpec, options?: FeedOptions): QueryIterator<T> {
    const path = Helper.getPathFromLink(this.container.url, "docs");
    const id = Helper.getIdFromLink(this.container.url);

    const fetchFunction: FetchFunctionCallback = (innerOptions: FeedOptions) => {
      return this.clientContext.queryFeed(
        path,
        "docs",
        id,
        result => (result ? result.Documents : []),
        query,
        innerOptions
      );
    };

    return new QueryIterator(this.clientContext, query, options, fetchFunction, this.container.url);
  }

  /**
   * Read all items.
   *
   * There is no set schema for JSON items. They may contain any number of custom properties.
   *
   * @param options Used for modifying the request (for instance, specifying the partition key).
   * @example Read all items to array.
   * ```typescript
   * const {body: containerList} = await items.readAll().toArray();
   * ```
   */
  public readAll(options?: FeedOptions): QueryIterator<ItemDefinition>;
  /**
   * Read all items.
   *
   * Any provided type, T, is not necessarily enforced by the SDK.
   * You may get more or less properties and it's up to your logic to enforce it.
   *
   * There is no set schema for JSON items. They may contain any number of custom properties.
   *
   * @param options Used for modifying the request (for instance, specifying the partition key).
   * @example Read all items to array.
   * ```typescript
   * const {body: containerList} = await items.readAll().toArray();
   * ```
   */
  public readAll<T extends ItemDefinition>(options?: FeedOptions): QueryIterator<T>;
  public readAll<T extends ItemDefinition>(options?: FeedOptions): QueryIterator<T> {
    return this.query<T>(undefined, options);
  }

  /**
   * Create a item.
   *
   * There is no set schema for JSON items. They may contain any number of custom properties..
   *
   * @param body Represents the body of the item. Can contain any number of user defined properties.
   * @param options Used for modifying the request (for instance, specifying the partition key).
   */
  public async create(body: any, options?: RequestOptions): Promise<ItemResponse<ItemDefinition>>;
  /**
   * Create a item.
   *
   * Any provided type, T, is not necessarily enforced by the SDK.
   * You may get more or less properties and it's up to your logic to enforce it.
   *
   * There is no set schema for JSON items. They may contain any number of custom properties.
   *
   * @param body Represents the body of the item. Can contain any number of user defined properties.
   * @param options Used for modifying the request (for instance, specifying the partition key).
   */
  public async create<T extends ItemDefinition>(body: T, options?: RequestOptions): Promise<ItemResponse<T>>;
  public async create<T extends ItemDefinition>(body: T, options: RequestOptions = {}): Promise<ItemResponse<T>> {
    if (options.partitionKey === undefined && options.skipGetPartitionKeyDefinition !== true) {
      const { body: partitionKeyDefinition } = await this.container.getPartitionKeyDefinition();
      options.partitionKey = this.container.extractPartitionKey(body, partitionKeyDefinition);
    }

    // Generate random document id if the id is missing in the payload and
    // options.disableAutomaticIdGeneration != true
    if ((body.id === undefined || body.id === "") && !options.disableAutomaticIdGeneration) {
      body.id = Helper.generateGuidId();
    }

    const err = {};
    if (!Helper.isResourceValid(body, err)) {
      throw err;
    }

    const path = Helper.getPathFromLink(this.container.url, "docs");
    const id = Helper.getIdFromLink(this.container.url);

    const response = await this.clientContext.create(body, path, "docs", id, undefined, options);

    const ref = new Item(
      this.container,
      (response.result as any).id,
      (options && options.partitionKey) as string,
      this.clientContext
    );
    return {
      body: response.result as T & ItemBody,
      headers: response.headers,
      ref,
      item: ref
    };
  }

  /**
   * Upsert an item.
   *
   * There is no set schema for JSON items. They may contain any number of custom properties.
   *
   * @param body Represents the body of the item. Can contain any number of user defined properties.
   * @param options Used for modifying the request (for instance, specifying the partition key).
   */
  public async upsert(body: any, options?: RequestOptions): Promise<ItemResponse<ItemDefinition>>;
  /**
   * Upsert an item.
   *
   * Any provided type, T, is not necessarily enforced by the SDK.
   * You may get more or less properties and it's up to your logic to enforce it.
   *
   * There is no set schema for JSON items. They may contain any number of custom properties.
   *
   * @param body Represents the body of the item. Can contain any number of user defined properties.
   * @param options Used for modifying the request (for instance, specifying the partition key).
   */
  public async upsert<T extends ItemDefinition>(body: T, options?: RequestOptions): Promise<ItemResponse<T>>;
  public async upsert<T extends ItemDefinition>(body: T, options: RequestOptions = {}): Promise<ItemResponse<T>> {
    if (options.partitionKey === undefined && options.skipGetPartitionKeyDefinition !== true) {
      const { body: partitionKeyDefinition } = await this.container.getPartitionKeyDefinition();
      options.partitionKey = this.container.extractPartitionKey(body, partitionKeyDefinition);
    }

    // Generate random document id if the id is missing in the payload and
    // options.disableAutomaticIdGeneration != true
    if ((body.id === undefined || body.id === "") && !options.disableAutomaticIdGeneration) {
      body.id = Helper.generateGuidId();
    }

    const err = {};
    if (!Helper.isResourceValid(body, err)) {
      throw err;
    }

    const path = Helper.getPathFromLink(this.container.url, "docs");
    const id = Helper.getIdFromLink(this.container.url);

    const response = (await this.clientContext.upsert<T>(body, path, "docs", id, undefined, options)) as T & ItemBody;

    const ref = new Item(
      this.container,
      (response.result as any).id,
      (options && options.partitionKey) as string,
      this.clientContext
    );
    return {
      body: response.result,
      headers: response.headers,
      ref,
      item: ref
    };
  }
}
