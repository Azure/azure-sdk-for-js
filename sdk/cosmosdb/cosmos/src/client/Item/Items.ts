// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ChangeFeedIterator } from "../../ChangeFeedIterator";
import type { ChangeFeedOptions } from "../../ChangeFeedOptions";
import type { ClientContext } from "../../ClientContext";
import { getIdFromLink, getPathFromLink, isItemResourceValid, ResourceType } from "../../common";
import { extractPartitionKeys, setPartitionKeyIfUndefined } from "../../extractPartitionKey";
import type { FetchFunctionCallback, SqlQuerySpec } from "../../queryExecutionContext";
import { QueryIterator } from "../../queryIterator";
import type { FeedOptions, RequestOptions, Response } from "../../request";
import type { Container } from "../Container";
import { Item } from "./Item";
import type { ItemDefinition } from "./ItemDefinition";
import { ItemResponse } from "./ItemResponse";
import type {
  OperationResponse,
  OperationInput,
  BulkOptions,
  BulkOperationResponse,
} from "../../utils/batch";
import { decorateBatchOperation } from "../../utils/batch";
import { isPrimitivePartitionKeyValue } from "../../utils/typeChecks";
import type { PartitionKey } from "../../documents";
import { PartitionKeyRangeCache } from "../../routing";
import type {
  ChangeFeedPullModelIterator,
  ChangeFeedIteratorOptions,
} from "../../client/ChangeFeed";
import { validateChangeFeedIteratorOptions } from "../../client/ChangeFeed/changeFeedUtils";
import type { DiagnosticNodeInternal } from "../../diagnostics/DiagnosticNodeInternal";
import { getEmptyCosmosDiagnostics, withDiagnostics } from "../../utils/diagnostics";
import { randomUUID } from "@azure/core-util";
import { readPartitionKeyDefinition } from "../ClientUtils";
import { ChangeFeedIteratorBuilder } from "../ChangeFeed/ChangeFeedIteratorBuilder";
import { BulkExecutor } from "../../bulk/BulkExecutor";

/**
 * @hidden
 */
function isChangeFeedOptions(options: unknown): options is ChangeFeedOptions {
  return options && !(isPrimitivePartitionKeyValue(options) || Array.isArray(options));
}

/**
 * Operations for creating new items, and reading/querying all items
 *
 * @see {@link Item} for reading, replacing, or deleting an existing container; use `.item(id)`.
 */
export class Items {
  private partitionKeyRangeCache: PartitionKeyRangeCache;
  /**
   * Create an instance of {@link Items} linked to the parent {@link Container}.
   * @param container - The parent container.
   * @hidden
   */
  constructor(
    public readonly container: Container,
    private readonly clientContext: ClientContext,
  ) {
    this.partitionKeyRangeCache = new PartitionKeyRangeCache(this.clientContext);
  }

  /**
   * Queries all items.
   * @param query - Query configuration for the operation. See {@link SqlQuerySpec} for more info on how to configure a query.
   * @param options - Used for modifying the request (for instance, specifying the partition key).
   * @example Read all items to array.
   * ```typescript
   * const querySpec: SqlQuerySpec = {
   *   query: "SELECT * FROM Families f WHERE f.lastName = @lastName",
   *   parameters: [
   *     {name: "@lastName", value: "Hendricks"}
   *   ]
   * };
   * const {result: items} = await items.query(querySpec).fetchAll();
   * ```
   */
  public query(query: string | SqlQuerySpec, options?: FeedOptions): QueryIterator<any>;
  /**
   * Queries all items.
   * @param query - Query configuration for the operation. See {@link SqlQuerySpec} for more info on how to configure a query.
   * @param options - Used for modifying the request (for instance, specifying the partition key).
   * @example Read all items to array.
   * ```typescript
   * const querySpec: SqlQuerySpec = {
   *   query: "SELECT firstname FROM Families f WHERE f.lastName = @lastName",
   *   parameters: [
   *     {name: "@lastName", value: "Hendricks"}
   *   ]
   * };
   * const {result: items} = await items.query<{firstName: string}>(querySpec).fetchAll();
   * ```
   */
  public query<T>(query: string | SqlQuerySpec, options?: FeedOptions): QueryIterator<T>;
  public query<T>(query: string | SqlQuerySpec, options: FeedOptions = {}): QueryIterator<T> {
    const path = getPathFromLink(this.container.url, ResourceType.item);
    const id = getIdFromLink(this.container.url);

    const fetchFunction: FetchFunctionCallback = async (
      diagnosticNode: DiagnosticNodeInternal,
      innerOptions: FeedOptions,
      correlatedActivityId: string,
    ) => {
      const response = await this.clientContext.queryFeed({
        path,
        resourceType: ResourceType.item,
        resourceId: id,
        resultFn: (result) => (result ? result.Documents : []),
        query,
        options: innerOptions,
        partitionKey: options.partitionKey,
        diagnosticNode,
        correlatedActivityId: correlatedActivityId,
      });
      return response;
    };

    return new QueryIterator(
      this.clientContext,
      query,
      options,
      fetchFunction,
      this.container.url,
      ResourceType.item,
    );
  }

  /**
   * Create a `ChangeFeedIterator` to iterate over pages of changes
   *
   * @deprecated Use `changeFeed` instead.
   *
   * @example Read from the beginning of the change feed.
   * ```javascript
   * const iterator = items.readChangeFeed({ startFromBeginning: true });
   * const firstPage = await iterator.fetchNext();
   * const firstPageResults = firstPage.result
   * const secondPage = await iterator.fetchNext();
   * ```
   */
  public readChangeFeed(
    partitionKey: PartitionKey,
    changeFeedOptions?: ChangeFeedOptions,
  ): ChangeFeedIterator<any>;
  /**
   * Create a `ChangeFeedIterator` to iterate over pages of changes
   * @deprecated Use `changeFeed` instead.
   *
   */
  public readChangeFeed(changeFeedOptions?: ChangeFeedOptions): ChangeFeedIterator<any>;
  /**
   * Create a `ChangeFeedIterator` to iterate over pages of changes
   * @deprecated Use `changeFeed` instead.
   */
  public readChangeFeed<T>(
    partitionKey: PartitionKey,
    changeFeedOptions?: ChangeFeedOptions,
  ): ChangeFeedIterator<T>;
  /**
   * Create a `ChangeFeedIterator` to iterate over pages of changes
   * @deprecated Use `changeFeed` instead.
   */
  public readChangeFeed<T>(changeFeedOptions?: ChangeFeedOptions): ChangeFeedIterator<T>;
  public readChangeFeed<T>(
    partitionKeyOrChangeFeedOptions?: PartitionKey | ChangeFeedOptions,
    changeFeedOptions?: ChangeFeedOptions,
  ): ChangeFeedIterator<T> {
    if (isChangeFeedOptions(partitionKeyOrChangeFeedOptions)) {
      return this.changeFeed(partitionKeyOrChangeFeedOptions);
    } else {
      return this.changeFeed(partitionKeyOrChangeFeedOptions, changeFeedOptions);
    }
  }

  /**
   * Create a `ChangeFeedIterator` to iterate over pages of changes
   *
   * @example Read from the beginning of the change feed.
   * ```javascript
   * const iterator = items.readChangeFeed({ startFromBeginning: true });
   * const firstPage = await iterator.fetchNext();
   * const firstPageResults = firstPage.result
   * const secondPage = await iterator.fetchNext();
   * ```
   */
  public changeFeed(
    partitionKey: PartitionKey,
    changeFeedOptions?: ChangeFeedOptions,
  ): ChangeFeedIterator<any>;
  /**
   * Create a `ChangeFeedIterator` to iterate over pages of changes
   */
  public changeFeed(changeFeedOptions?: ChangeFeedOptions): ChangeFeedIterator<any>;
  /**
   * Create a `ChangeFeedIterator` to iterate over pages of changes
   */
  public changeFeed<T>(
    partitionKey: PartitionKey,
    changeFeedOptions?: ChangeFeedOptions,
  ): ChangeFeedIterator<T>;
  /**
   * Create a `ChangeFeedIterator` to iterate over pages of changes
   */
  public changeFeed<T>(changeFeedOptions?: ChangeFeedOptions): ChangeFeedIterator<T>;
  public changeFeed<T>(
    partitionKeyOrChangeFeedOptions?: PartitionKey | ChangeFeedOptions,
    changeFeedOptions?: ChangeFeedOptions,
  ): ChangeFeedIterator<T> {
    let partitionKey: PartitionKey;
    if (!changeFeedOptions && isChangeFeedOptions(partitionKeyOrChangeFeedOptions)) {
      partitionKey = undefined;
      changeFeedOptions = partitionKeyOrChangeFeedOptions;
    } else if (
      partitionKeyOrChangeFeedOptions !== undefined &&
      !isChangeFeedOptions(partitionKeyOrChangeFeedOptions)
    ) {
      partitionKey = partitionKeyOrChangeFeedOptions;
    }

    if (!changeFeedOptions) {
      changeFeedOptions = {};
    }

    const path = getPathFromLink(this.container.url, ResourceType.item);
    const id = getIdFromLink(this.container.url);
    return new ChangeFeedIterator<T>(this.clientContext, id, path, partitionKey, changeFeedOptions);
  }

  /**
   * Returns an iterator to iterate over pages of changes. The iterator returned can be used to fetch changes for a single partition key, feed range or an entire container.
   */
  public getChangeFeedIterator<T>(
    changeFeedIteratorOptions?: ChangeFeedIteratorOptions,
  ): ChangeFeedPullModelIterator<T> {
    const cfOptions = changeFeedIteratorOptions !== undefined ? changeFeedIteratorOptions : {};
    validateChangeFeedIteratorOptions(cfOptions);
    const iterator = new ChangeFeedIteratorBuilder<T>(
      cfOptions,
      this.clientContext,
      this.container,
      this.partitionKeyRangeCache,
    );
    return iterator;
  }

  /**
   * Read all items.
   *
   * There is no set schema for JSON items. They may contain any number of custom properties.
   *
   * @param options - Used for modifying the request (for instance, specifying the partition key).
   * @example Read all items to array.
   * ```typescript
   * const {body: containerList} = await items.readAll().fetchAll();
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
   * @param options - Used for modifying the request (for instance, specifying the partition key).
   * @example Read all items to array.
   * ```typescript
   * const {body: containerList} = await items.readAll().fetchAll();
   * ```
   */
  public readAll<T extends ItemDefinition>(options?: FeedOptions): QueryIterator<T>;
  public readAll<T extends ItemDefinition>(options?: FeedOptions): QueryIterator<T> {
    return this.query<T>("SELECT * from c", options);
  }

  /**
   * Create an item.
   *
   * Any provided type, T, is not necessarily enforced by the SDK.
   * You may get more or less properties and it's up to your logic to enforce it.
   *
   * There is no set schema for JSON items. They may contain any number of custom properties.
   *
   * @param body - Represents the body of the item. Can contain any number of user defined properties.
   * @param options - Used for modifying the request (for instance, specifying the partition key).
   */
  public async create<T extends ItemDefinition = any>(
    body: T,
    options: RequestOptions = {},
  ): Promise<ItemResponse<T>> {
    // Generate random document id if the id is missing in the payload and
    // options.disableAutomaticIdGeneration != true

    return withDiagnostics(async (diagnosticNode: DiagnosticNodeInternal) => {
      if ((body.id === undefined || body.id === "") && !options.disableAutomaticIdGeneration) {
        body.id = randomUUID();
      }
      const partitionKeyDefinition = await readPartitionKeyDefinition(
        diagnosticNode,
        this.container,
      );
      const partitionKey = extractPartitionKeys(body, partitionKeyDefinition);

      const err = {};
      if (!isItemResourceValid(body, err)) {
        throw err;
      }

      const path = getPathFromLink(this.container.url, ResourceType.item);
      const id = getIdFromLink(this.container.url);

      const response = await this.clientContext.create<T>({
        body,
        path,
        resourceType: ResourceType.item,
        resourceId: id,
        diagnosticNode,
        options,
        partitionKey,
      });

      const ref = new Item(
        this.container,
        this.clientContext,
        response.result ? (response.result as any).id : undefined,
        partitionKey,
      );
      return new ItemResponse(
        response.result,
        response.headers,
        response.code,
        response.substatus,
        ref,
        getEmptyCosmosDiagnostics(),
      );
    }, this.clientContext);
  }

  /**
   * Upsert an item.
   *
   * There is no set schema for JSON items. They may contain any number of custom properties.
   *
   * @param body - Represents the body of the item. Can contain any number of user defined properties.
   * @param options - Used for modifying the request (for instance, specifying the partition key).
   */
  public async upsert(
    body: unknown,
    options?: RequestOptions,
  ): Promise<ItemResponse<ItemDefinition>>;
  /**
   * Upsert an item.
   *
   * Any provided type, T, is not necessarily enforced by the SDK.
   * You may get more or less properties and it's up to your logic to enforce it.
   *
   * There is no set schema for JSON items. They may contain any number of custom properties.
   *
   * @param body - Represents the body of the item. Can contain any number of user defined properties.
   * @param options - Used for modifying the request (for instance, specifying the partition key).
   */
  public async upsert<T extends ItemDefinition>(
    body: T,
    options?: RequestOptions,
  ): Promise<ItemResponse<T>>;
  public async upsert<T extends ItemDefinition>(
    body: T,
    options: RequestOptions = {},
  ): Promise<ItemResponse<T>> {
    return withDiagnostics(async (diagnosticNode: DiagnosticNodeInternal) => {
      // Generate random document id if the id is missing in the payload and
      // options.disableAutomaticIdGeneration != true
      if ((body.id === undefined || body.id === "") && !options.disableAutomaticIdGeneration) {
        body.id = randomUUID();
      }

      const partitionKeyDefinition = await readPartitionKeyDefinition(
        diagnosticNode,
        this.container,
      );
      const partitionKey = extractPartitionKeys(body, partitionKeyDefinition);

      const err = {};
      if (!isItemResourceValid(body, err)) {
        throw err;
      }

      const path = getPathFromLink(this.container.url, ResourceType.item);
      const id = getIdFromLink(this.container.url);

      const response = await this.clientContext.upsert<T>({
        body,
        path,
        resourceType: ResourceType.item,
        resourceId: id,
        options,
        partitionKey,
        diagnosticNode,
      });

      const ref = new Item(
        this.container,
        this.clientContext,
        response.result ? (response.result as any).id : undefined,
        partitionKey,
      );
      return new ItemResponse(
        response.result,
        response.headers,
        response.code,
        response.substatus,
        ref,
        getEmptyCosmosDiagnostics(),
      );
    }, this.clientContext);
  }

  /**
   * Execute bulk operations on items.
   *
   * Bulk takes an array of Operations which are typed based on what the operation does.
   * The choices are: Create, Upsert, Read, Replace, and Delete
   *
   * Usage example:
   * ```typescript
   * // partitionKey is optional at the top level if present in the resourceBody
   * const operations: OperationInput[] = [
   *    {
   *       operationType: "Create",
   *       resourceBody: { id: "doc1", name: "sample", key: "A" }
   *    },
   *    {
   *       operationType: "Upsert",
   *       partitionKey: 'A',
   *       resourceBody: { id: "doc2", name: "other", key: "A" }
   *    }
   * ]
   *
   * await database.container.items.bulk(operations)
   * ```
   *
   * @param operations - List of operations. Limit 100
   * @param bulkOptions - Optional options object to modify bulk behavior. Pass \{ continueOnError: false \} to stop executing operations when one fails. (Defaults to true)
   * @param options - Used for modifying the request.
   */
  public async bulk(
    operations: OperationInput[],
    bulkOptions?: BulkOptions,
    options?: RequestOptions,
  ): Promise<BulkOperationResponse> {
    return withDiagnostics(async (diagnosticNode: DiagnosticNodeInternal) => {
      // const bulkExecutorCache = this.clientContext.getBulkExecutorCache();
      // const bulkExecutor = bulkExecutorCache.getOrCreateExecutor(
      //   this.container,
      //   this.clientContext,
      //   this.partitionKeyRangeCache,
      // );
      const bulkExecutor = new BulkExecutor(
        this.container,
        this.clientContext,
        this.partitionKeyRangeCache,
      );
      const orderedResponse = await bulkExecutor.executeBulk(
        operations,
        diagnosticNode,
        options,
        bulkOptions,
      );
      const response: any = orderedResponse;
      response.diagnostics = diagnosticNode.toDiagnostic(this.clientContext.getClientConfig());
      return response;
    }, this.clientContext);
  }

  /**
   * Execute transactional batch operations on items.
   *
   * Batch takes an array of Operations which are typed based on what the operation does. Batch is transactional and will rollback all operations if one fails.
   * The choices are: Create, Upsert, Read, Replace, and Delete
   *
   * Usage example:
   * ```typescript
   * // The partitionKey is a required second argument. If it’s undefined, it defaults to the expected partition key format.
   * const operations: OperationInput[] = [
   *    {
   *       operationType: "Create",
   *       resourceBody: { id: "doc1", name: "sample", key: "A" }
   *    },
   *    {
   *       operationType: "Upsert",
   *       resourceBody: { id: "doc2", name: "other", key: "A" }
   *    }
   * ]
   *
   * await database.container.items.batch(operations, "A")
   * ```
   *
   * @param operations - List of operations. Limit 100
   * @param options - Used for modifying the request
   */
  public async batch(
    operations: OperationInput[],
    partitionKey?: PartitionKey,
    options?: RequestOptions,
  ): Promise<Response<OperationResponse[]>> {
    return withDiagnostics(async (diagnosticNode: DiagnosticNodeInternal) => {
      operations.map((operation) => decorateBatchOperation(operation, options));
      partitionKey = await setPartitionKeyIfUndefined(diagnosticNode, this.container, partitionKey);
      const path = getPathFromLink(this.container.url, ResourceType.item);

      if (operations.length > 100) {
        throw new Error("Cannot run batch request with more than 100 operations per partition");
      }
      try {
        const response: Response<OperationResponse[]> = await this.clientContext.batch({
          body: operations,
          partitionKey,
          path,
          resourceId: this.container.url,
          options,
          diagnosticNode,
        });
        return response;
      } catch (err: any) {
        throw new Error(`Batch request error: ${err.message}`);
      }
    }, this.clientContext);
  }
}
