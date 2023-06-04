// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { v4 } from "uuid";
const uuid = v4;
import { ChangeFeedIterator } from "../../ChangeFeedIterator";
import { ChangeFeedOptions } from "../../ChangeFeedOptions";
import { ClientContext } from "../../ClientContext";
import { getIdFromLink, getPathFromLink, isItemResourceValid, ResourceType } from "../../common";
import { extractPartitionKeys } from "../../extractPartitionKey";
import { FetchFunctionCallback, SqlQuerySpec } from "../../queryExecutionContext";
import { QueryIterator } from "../../queryIterator";
import { FeedOptions, RequestOptions, Response } from "../../request";
import { Container, PartitionKeyRange } from "../Container";
import { Item } from "./Item";
import { ItemDefinition } from "./ItemDefinition";
import { ItemResponse } from "./ItemResponse";
import {
  Batch,
  isKeyInRange,
  prepareOperations,
  OperationResponse,
  OperationInput,
  BulkOptions,
  decorateBatchOperation,
  splitBatchBasedOnBodySize,
} from "../../utils/batch";
import { assertNotUndefined, isPrimitivePartitionKeyValue } from "../../utils/typeChecks";
import { hashPartitionKey } from "../../utils/hashing/hash";
import { PartitionKey, PartitionKeyDefinition } from "../../documents";

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
  /**
   * Create an instance of {@link Items} linked to the parent {@link Container}.
   * @param container - The parent container.
   * @hidden
   */
  constructor(
    public readonly container: Container,
    private readonly clientContext: ClientContext
  ) {}

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

    const fetchFunction: FetchFunctionCallback = (innerOptions: FeedOptions) => {
      return this.clientContext.queryFeed({
        path,
        resourceType: ResourceType.item,
        resourceId: id,
        resultFn: (result) => (result ? result.Documents : []),
        query,
        options: innerOptions,
        partitionKey: options.partitionKey,
      });
    };

    return new QueryIterator(
      this.clientContext,
      query,
      options,
      fetchFunction,
      this.container.url,
      ResourceType.item
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
    changeFeedOptions?: ChangeFeedOptions
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
    changeFeedOptions?: ChangeFeedOptions
  ): ChangeFeedIterator<T>;
  /**
   * Create a `ChangeFeedIterator` to iterate over pages of changes
   * @deprecated Use `changeFeed` instead.
   */
  public readChangeFeed<T>(changeFeedOptions?: ChangeFeedOptions): ChangeFeedIterator<T>;
  public readChangeFeed<T>(
    partitionKeyOrChangeFeedOptions?: PartitionKey | ChangeFeedOptions,
    changeFeedOptions?: ChangeFeedOptions
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
    changeFeedOptions?: ChangeFeedOptions
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
    changeFeedOptions?: ChangeFeedOptions
  ): ChangeFeedIterator<T>;
  /**
   * Create a `ChangeFeedIterator` to iterate over pages of changes
   */
  public changeFeed<T>(changeFeedOptions?: ChangeFeedOptions): ChangeFeedIterator<T>;
  public changeFeed<T>(
    partitionKeyOrChangeFeedOptions?: PartitionKey | ChangeFeedOptions,
    changeFeedOptions?: ChangeFeedOptions
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
    options: RequestOptions = {}
  ): Promise<ItemResponse<T>> {
    // Generate random document id if the id is missing in the payload and
    // options.disableAutomaticIdGeneration != true
    if ((body.id === undefined || body.id === "") && !options.disableAutomaticIdGeneration) {
      body.id = uuid();
    }

    const { resource: partitionKeyDefinition } = await this.container.readPartitionKeyDefinition();
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
      options,
      partitionKey,
    });

    const ref = new Item(
      this.container,
      (response.result as any).id,
      this.clientContext,
      partitionKey
    );
    return new ItemResponse(
      response.result,
      response.headers,
      response.code,
      response.substatus,
      ref,
      response.diagnostics
    );
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
    options?: RequestOptions
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
    options?: RequestOptions
  ): Promise<ItemResponse<T>>;
  public async upsert<T extends ItemDefinition>(
    body: T,
    options: RequestOptions = {}
  ): Promise<ItemResponse<T>> {
    const { resource: partitionKeyDefinition } = await this.container.readPartitionKeyDefinition();
    const partitionKey = extractPartitionKeys(body, partitionKeyDefinition);

    // Generate random document id if the id is missing in the payload and
    // options.disableAutomaticIdGeneration != true
    if ((body.id === undefined || body.id === "") && !options.disableAutomaticIdGeneration) {
      body.id = uuid();
    }

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
    });

    const ref = new Item(
      this.container,
      (response.result as any).id,
      this.clientContext,
      partitionKey
    );
    return new ItemResponse(
      response.result,
      response.headers,
      response.code,
      response.substatus,
      ref,
      response.diagnostics
    );
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
   * @param bulkOptions - Optional options object to modify bulk behavior. Pass \{ continueOnError: true \} to continue executing operations when one fails. (Defaults to false) ** NOTE: THIS WILL DEFAULT TO TRUE IN THE 4.0 RELEASE
   * @param options - Used for modifying the request.
   */
  public async bulk(
    operations: OperationInput[],
    bulkOptions?: BulkOptions,
    options?: RequestOptions
  ): Promise<OperationResponse[]> {
    const { resources: partitionKeyRanges } = await this.container
      .readPartitionKeyRanges()
      .fetchAll();
    const { resource } = await this.container.readPartitionKeyDefinition();
    const partitionDefinition = assertNotUndefined(resource, "PartitionKeyDefinition.");
    const batches: Batch[] = partitionKeyRanges.map((keyRange: PartitionKeyRange) => {
      return {
        min: keyRange.minInclusive,
        max: keyRange.maxExclusive,
        rangeId: keyRange.id,
        indexes: [],
        operations: [],
      };
    });

    this.groupOperationsBasedOnPartitionKey(operations, partitionDefinition, options, batches);

    const path = getPathFromLink(this.container.url, ResourceType.item);

    const orderedResponses: OperationResponse[] = [];
    await Promise.all(
      batches
        .filter((batch: Batch) => batch.operations.length)
        .flatMap((batch: Batch) => splitBatchBasedOnBodySize(batch))
        .map(async (batch: Batch) => {
          if (batch.operations.length > 100) {
            throw new Error("Cannot run bulk request with more than 100 operations per partition");
          }
          try {
            const response = await this.clientContext.bulk({
              body: batch.operations,
              partitionKeyRangeId: batch.rangeId,
              path,
              resourceId: this.container.url,
              bulkOptions,
              options,
            });
            response.result.forEach((operationResponse: OperationResponse, index: number) => {
              orderedResponses[batch.indexes[index]] = operationResponse;
            });
          } catch (err: any) {
            // In the case of 410 errors, we need to recompute the partition key ranges
            // and redo the batch request, however, 410 errors occur for unsupported
            // partition key types as well since we don't support them, so for now we throw
            if (err.code === 410) {
              throw new Error(
                "Partition key error. Either the partitions have split or an operation has an unsupported partitionKey type" +
                  err.message
              );
            }
            throw new Error(`Bulk request errored with: ${err.message}`);
          }
        })
    );
    return orderedResponses;
  }

  /**
   * Function to create batches based of partition key Ranges.
   * @param operations - operations to group
   * @param partitionDefinition - PartitionKey definition of container.
   * @param options - Request options for bulk request.
   * @param batches - Groups to be filled with operations.
   */
  private groupOperationsBasedOnPartitionKey(
    operations: OperationInput[],
    partitionDefinition: PartitionKeyDefinition,
    options: RequestOptions | undefined,
    batches: Batch[]
  ) {
    operations.forEach((operationInput, index: number) => {
      const { operation, partitionKey } = prepareOperations(
        operationInput,
        partitionDefinition,
        options
      );
      const hashed = hashPartitionKey(
        assertNotUndefined(
          partitionKey,
          "undefined value for PartitionKey not expected during grouping of bulk operations."
        ),
        partitionDefinition
      );
      const batchForKey = assertNotUndefined(
        batches.find((batch: Batch) => {
          return isKeyInRange(batch.min, batch.max, hashed);
        }),
        "No suitable Batch found."
      );
      batchForKey.operations.push(operation);
      batchForKey.indexes.push(index);
    });
  }

  /**
   * Execute transactional batch operations on items.
   *
   * Batch takes an array of Operations which are typed based on what the operation does. Batch is transactional and will rollback all operations if one fails.
   * The choices are: Create, Upsert, Read, Replace, and Delete
   *
   * Usage example:
   * ```typescript
   * // partitionKey is required as a second argument to batch, but defaults to the default partition key
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
   * await database.container.items.batch(operations)
   * ```
   *
   * @param operations - List of operations. Limit 100
   * @param options - Used for modifying the request
   */
  public async batch(
    operations: OperationInput[],
    partitionKey?: PartitionKey,
    options?: RequestOptions
  ): Promise<Response<OperationResponse[]>> {
    operations.map((operation) => decorateBatchOperation(operation, options));

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
      });
      return response;
    } catch (err: any) {
      throw new Error(`Batch request error: ${err.message}`);
    }
  }
}
