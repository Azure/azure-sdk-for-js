// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ChangeFeedIterator } from "../../ChangeFeedIterator";
import { ChangeFeedOptions } from "../../ChangeFeedOptions";
import { ClientContext } from "../../ClientContext";
import {
  Constants,
  copyObject,
  getIdFromLink,
  getPathFromLink,
  isItemResourceValid,
  ResourceType,
  StatusCodes,
  SubStatusCodes,
} from "../../common";
import { extractPartitionKeys, setPartitionKeyIfUndefined } from "../../extractPartitionKey";
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
  BulkOperationResponse,
  BulkOperationType,
} from "../../utils/batch";
import { assertNotUndefined, isPrimitivePartitionKeyValue } from "../../utils/typeChecks";
import { hashPartitionKey } from "../../utils/hashing/hash";
import { PartitionKeyRangeCache, QueryRange } from "../../routing";
import {
  convertToInternalPartitionKey,
  PartitionKey,
  PartitionKeyDefinition,
} from "../../documents";
import {
  ChangeFeedPullModelIterator,
  ChangeFeedIteratorOptions,
  changeFeedIteratorBuilder,
} from "../../client/ChangeFeed";
import { validateChangeFeedIteratorOptions } from "../../client/ChangeFeed/changeFeedUtils";
import {
  DiagnosticNodeInternal,
  DiagnosticNodeType,
} from "../../diagnostics/DiagnosticNodeInternal";
import {
  getEmptyCosmosDiagnostics,
  withDiagnostics,
  addDignosticChild,
} from "../../utils/diagnostics";
import { randomUUID } from "@azure/core-util";
import { readPartitionKeyDefinition } from "../ClientUtils";
import { EncryptionQueryBuilder } from "../../encryption";
import { EncryptionSqlParameter } from "../../encryption/EncryptionQueryBuilder";
import { Resource } from "../Resource";

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

  //
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

    const iterator = new QueryIterator<T>(
      this.clientContext,
      query,
      options,
      fetchFunction,
      this.container.url,
      ResourceType.item,
      this.container,
    );
    return iterator;
  }
  /**
   * Queries all items in an encrypted container.
   * @param queryBuilder - Query configuration for the operation. See {@link SqlQuerySpec} for more info on how to build a query on encrypted properties.
   * @param options - Used for modifying the request (for instance, specifying the partition key).
   * @example Read all items to array.
   * ```typescript
   * const queryBuilder = new EncryptionQueryBuilder("SELECT firstname FROM Families f WHERE f.lastName = @lastName");
   * queryBuilder.addStringParameter("@lastName", "Hendricks", "/lastname");
   * const queryIterator = await items.getEncryptionQueryIterator(queryBuilder);
   * const {result: items} = await queryIterator.fetchAll();
   * ```
   */
  public async getEncryptionQueryIterator(
    queryBuilder: EncryptionQueryBuilder,
    options?: FeedOptions,
  ): Promise<QueryIterator<any>>;
  /**
   * Queries all items in an encrypted container.
   * @param queryBuilder - Query configuration for the operation. See {@link SqlQuerySpec} for more info on how to build a query on encrypted properties.
   * @param options - Used for modifying the request (for instance, specifying the partition key).
   * @example Read all items to array.
   * ```typescript
   * const queryBuilder = new EncryptionQueryBuilder("SELECT firstname FROM Families f WHERE f.lastName = @lastName");
   * queryBuilder.addStringParameter("@lastName", "Hendricks", "/lastname");
   * const queryIterator = await items.getEncryptionQueryIterator<{firstName: string}>(queryBuilder);
   * const {result: items} = await queryIterator.fetchAll();
   * ```
   */
  public async getEncryptionQueryIterator<T>(
    queryBuilder: EncryptionQueryBuilder,
    options?: FeedOptions,
  ): Promise<QueryIterator<T>>;
  public async getEncryptionQueryIterator<T>(
    queryBuilder: EncryptionQueryBuilder,
    options: FeedOptions = {},
  ): Promise<QueryIterator<T>> {
    const encryptionSqlQuerySpec = queryBuilder.toEncryptionSqlQuerySpec();
    const sqlQuerySpec = await this.buildSqlQuerySpec(encryptionSqlQuerySpec);
    const iterator = this.query<T>(sqlQuerySpec, options);
    return iterator;
  }

  private async buildSqlQuerySpec(encryptionSqlQuerySpec: SqlQuerySpec): Promise<SqlQuerySpec> {
    let encryptionParameters = encryptionSqlQuerySpec.parameters as EncryptionSqlParameter[];
    const sqlQuerySpec: SqlQuerySpec = {
      query: encryptionSqlQuerySpec.query,
      parameters: [],
    };
    encryptionParameters = copyObject(encryptionParameters);
    for (const parameter of encryptionParameters) {
      const value = await this.container.encryptionProcessor.encryptQueryParameter(
        parameter.path,
        parameter.value,
        parameter.path === "/id",
        parameter.type,
      );
      sqlQuerySpec.parameters.push({ name: parameter.name, value: value });
    }
    return sqlQuerySpec;
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
    const iterator = changeFeedIteratorBuilder(
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
      let partitionKey = extractPartitionKeys(body, partitionKeyDefinition);
      if (this.clientContext.enableEncryption) {
        if (!this.container.isEncryptionInitialized) {
          await this.container.initializeEncryption();
        }
        this.container.encryptionProcessor.containerRid = this.container._rid;
        body = copyObject(body);
        body = await this.container.encryptionProcessor.encrypt(body, diagnosticNode);
        options.containerRid = this.container._rid;
        partitionKey = extractPartitionKeys(body, partitionKeyDefinition);
      }
      const err = {};
      if (!isItemResourceValid(body, err)) {
        throw err;
      }
      const path = getPathFromLink(this.container.url, ResourceType.item);
      const id = getIdFromLink(this.container.url);
      let response: Response<T & Resource>;
      try {
        response = await this.clientContext.create<T>({
          body,
          path,
          resourceType: ResourceType.item,
          resourceId: id,
          diagnosticNode,
          options,
          partitionKey,
        });
      } catch (error: any) {
        if (this.clientContext.enableEncryption) {
          // Todo: internally retry post policy refresh
          await this.container.throwIfRequestNeedsARetryPostPolicyRefresh(error);
        }
        throw error;
      }

      if (this.clientContext.enableEncryption) {
        response.result = await this.container.encryptionProcessor.decrypt(
          response.result,
          diagnosticNode,
        );
        partitionKey = extractPartitionKeys(response.result, partitionKeyDefinition);
      }
      const ref = new Item(
        this.container,
        (response.result as any).id,
        this.clientContext,
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
      let partitionKey = extractPartitionKeys(body, partitionKeyDefinition);

      if (this.clientContext.enableEncryption) {
        body = copyObject(body);
        options = options || {};
        if (!this.container.isEncryptionInitialized) {
          await this.container.initializeEncryption();
        }
        this.container.encryptionProcessor.containerRid = this.container._rid;
        options.containerRid = this.container._rid;
        body = await this.container.encryptionProcessor.encrypt(body, diagnosticNode);
        partitionKey = extractPartitionKeys(body, partitionKeyDefinition);
      }

      const err = {};
      if (!isItemResourceValid(body, err)) {
        throw err;
      }

      const path = getPathFromLink(this.container.url, ResourceType.item);
      const id = getIdFromLink(this.container.url);
      let response: Response<T & Resource>;
      try {
        response = await this.clientContext.upsert<T>({
          body,
          path,
          resourceType: ResourceType.item,
          resourceId: id,
          options,
          partitionKey,
          diagnosticNode,
        });
      } catch (error: any) {
        if (this.clientContext.enableEncryption) {
          await this.container.throwIfRequestNeedsARetryPostPolicyRefresh(error);
        }
        throw error;
      }
      if (this.clientContext.enableEncryption) {
        response.result = await this.container.encryptionProcessor.decrypt(
          response.result,
          diagnosticNode,
        );
        partitionKey = extractPartitionKeys(response.result, partitionKeyDefinition);
      }

      const ref = new Item(
        this.container,
        (response.result as any).id,
        this.clientContext,
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
   * @param bulkOptions - Optional options object to modify bulk behavior. Pass \{ continueOnError: true \} to continue executing operations when one fails. (Defaults to false) ** NOTE: THIS WILL DEFAULT TO TRUE IN THE 4.0 RELEASE
   * @param options - Used for modifying the request.
   */
  public async bulk(
    operations: OperationInput[],
    bulkOptions?: BulkOptions,
    options?: RequestOptions,
  ): Promise<BulkOperationResponse> {
    return withDiagnostics(async (diagnosticNode: DiagnosticNodeInternal) => {
      const partitionKeyRanges = (
        await this.partitionKeyRangeCache.onCollectionRoutingMap(this.container.url, diagnosticNode)
      ).getOrderedParitionKeyRanges();

      const partitionKeyDefinition = await readPartitionKeyDefinition(
        diagnosticNode,
        this.container,
      );

      if (this.clientContext.enableEncryption) {
        operations = copyObject(operations);
        options = options || {};
        if (!this.container.isEncryptionInitialized) {
          await this.container.initializeEncryption();
        }
        this.container.encryptionProcessor.containerRid = this.container._rid;
        options.containerRid = this.container._rid;
        operations = await this.bulkBatchEncryptionHelper(operations, diagnosticNode);
      }

      const batches: Batch[] = partitionKeyRanges.map((keyRange: PartitionKeyRange) => {
        return {
          min: keyRange.minInclusive,
          max: keyRange.maxExclusive,
          rangeId: keyRange.id,
          indexes: [],
          operations: [],
        };
      });

      this.groupOperationsBasedOnPartitionKey(operations, partitionKeyDefinition, options, batches);

      const path = getPathFromLink(this.container.url, ResourceType.item);

      const orderedResponses: OperationResponse[] = [];
      // split batches based on cumulative size of operations
      const batchMap = batches
        .filter((batch: Batch) => batch.operations.length)
        .flatMap((batch: Batch) => splitBatchBasedOnBodySize(batch));

      await Promise.all(
        this.executeBatchOperations(
          batchMap,
          path,
          bulkOptions,
          options,
          diagnosticNode,
          orderedResponses,
          partitionKeyDefinition,
        ),
      );
      const response: any = orderedResponses;
      response.diagnostics = diagnosticNode.toDiagnostic(this.clientContext.getClientConfig());
      return response;
    }, this.clientContext);
  }

  private executeBatchOperations(
    batchMap: Batch[],
    path: string,
    bulkOptions: BulkOptions,
    options: RequestOptions,
    diagnosticNode: DiagnosticNodeInternal,
    orderedResponses: OperationResponse[],
    partitionKeyDefinition: PartitionKeyDefinition,
  ): Promise<void>[] {
    return batchMap.map(async (batch: Batch) => {
      if (batch.operations.length > 100) {
        throw new Error("Cannot run bulk request with more than 100 operations per partition");
      }
      try {
        const response = await addDignosticChild(
          async (childNode: DiagnosticNodeInternal) =>
            this.clientContext.bulk({
              body: batch.operations,
              partitionKeyRangeId: batch.rangeId,
              path,
              resourceId: this.container.url,
              bulkOptions,
              options,
              diagnosticNode: childNode,
            }),
          diagnosticNode,
          DiagnosticNodeType.BATCH_REQUEST,
        );
        if (this.clientContext.enableEncryption) {
          diagnosticNode.beginEncryptionDiagnostics(
            Constants.Encryption.DiagnosticsDecryptOperation,
          );
          for (const result of response.result) {
            result.resourceBody = await this.container.encryptionProcessor.decrypt(
              result.resourceBody,
            );
          }
          diagnosticNode.endEncryptionDiagnostics(Constants.Encryption.DiagnosticsDecryptOperation);
        }
        response.result.forEach((operationResponse: OperationResponse, index: number) => {
          orderedResponses[batch.indexes[index]] = operationResponse;
        });
      } catch (err: any) {
        if (this.clientContext.enableEncryption) {
          await this.container.throwIfRequestNeedsARetryPostPolicyRefresh(err);
        }
        // In the case of 410 errors, we need to recompute the partition key ranges
        // and redo the batch request, however, 410 errors occur for unsupported
        // partition key types as well since we don't support them, so for now we throw
        if (err.code === StatusCodes.Gone) {
          const isPartitionSplit =
            err.substatus === SubStatusCodes.PartitionKeyRangeGone ||
            err.substatus === SubStatusCodes.CompletingSplit;

          if (isPartitionSplit) {
            const queryRange = new QueryRange(batch.min, batch.max, true, false);
            const overlappingRanges = await this.partitionKeyRangeCache.getOverlappingRanges(
              this.container.url,
              queryRange,
              diagnosticNode,
              true,
            );
            if (overlappingRanges.length < 1) {
              throw new Error("Partition split/merge detected but no overlapping ranges found.");
            }
            // Handles both merge (overlappingRanges.length === 1) and split (overlappingRanges.length > 1) cases.
            if (overlappingRanges.length >= 1) {
              // const splitBatches: Batch[] = [];
              const newBatches: Batch[] = this.createNewBatches(
                overlappingRanges,
                batch,
                partitionKeyDefinition,
              );

              await Promise.all(
                this.executeBatchOperations(
                  newBatches,
                  path,
                  bulkOptions,
                  options,
                  diagnosticNode,
                  orderedResponses,
                  partitionKeyDefinition,
                ),
              );
            }
          } else {
            throw new Error(
              "Partition key error. An operation has an unsupported partitionKey type" +
                err.message,
            );
          }
        } else {
          throw new Error(`Bulk request errored with: ${err.message}`);
        }
      }
    });
  }

  /**
   * Function to create new batches based of partition key Ranges.
   *
   * @param overlappingRanges - Overlapping partition key ranges.
   * @param batch - Batch to be split.
   * @param partitionKeyDefinition - PartitionKey definition of container.
   * @returns Array of new batches.
   */
  private createNewBatches(
    overlappingRanges: PartitionKeyRange[],
    batch: Batch,
    partitionKeyDefinition: PartitionKeyDefinition,
  ): Batch[] {
    const newBatches: Batch[] = overlappingRanges.map((keyRange: PartitionKeyRange) => {
      return {
        min: keyRange.minInclusive,
        max: keyRange.maxExclusive,
        rangeId: keyRange.id,
        indexes: [],
        operations: [],
      };
    });
    let indexValue = 0;
    batch.operations.forEach((operation) => {
      const partitionKey = JSON.parse(operation.partitionKey);
      const hashed = hashPartitionKey(
        assertNotUndefined(
          partitionKey,
          "undefined value for PartitionKey is not expected during grouping of bulk operations.",
        ),
        partitionKeyDefinition,
      );
      const batchForKey = assertNotUndefined(
        newBatches.find((newBatch: Batch) => {
          return isKeyInRange(newBatch.min, newBatch.max, hashed);
        }),
        "No suitable Batch found.",
      );
      batchForKey.operations.push(operation);
      batchForKey.indexes.push(batch.indexes[indexValue]);
      indexValue++;
    });
    return newBatches;
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
    batches: Batch[],
  ) {
    operations.forEach((operationInput, index: number) => {
      const { operation, partitionKey } = prepareOperations(
        operationInput,
        partitionDefinition,
        options,
      );
      const hashed = hashPartitionKey(
        assertNotUndefined(
          partitionKey,
          "undefined value for PartitionKey is not expected during grouping of bulk operations.",
        ),
        partitionDefinition,
      );
      const batchForKey = assertNotUndefined(
        batches.find((batch: Batch) => {
          return isKeyInRange(batch.min, batch.max, hashed);
        }),
        "No suitable Batch found.",
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

      if (this.clientContext.enableEncryption) {
        operations = copyObject(operations);
        options = options || {};
        if (!this.container.isEncryptionInitialized) {
          await this.container.initializeEncryption();
        }
        this.container.encryptionProcessor.containerRid = this.container._rid;
        options.containerRid = this.container._rid;
        if (partitionKey) {
          const partitionKeyInternal = convertToInternalPartitionKey(partitionKey);
          partitionKey =
            await this.container.encryptionProcessor.getEncryptedPartitionKeyValue(
              partitionKeyInternal,
            );
        }
        operations = await this.bulkBatchEncryptionHelper(operations, diagnosticNode);
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

        if (this.clientContext.enableEncryption) {
          diagnosticNode.beginEncryptionDiagnostics(
            Constants.Encryption.DiagnosticsDecryptOperation,
          );
          for (const result of response.result) {
            if (result.resourceBody) {
              result.resourceBody = await this.container.encryptionProcessor.decrypt(
                result.resourceBody,
              );
            }
          }
          diagnosticNode.endEncryptionDiagnostics(Constants.Encryption.DiagnosticsDecryptOperation);
        }

        return response;
      } catch (err: any) {
        if (this.clientContext.enableEncryption) {
          await this.container.throwIfRequestNeedsARetryPostPolicyRefresh(err);
        }
        throw new Error(`Batch request error: ${err.message}`);
      }
    }, this.clientContext);
  }

  private async bulkBatchEncryptionHelper(
    operations: OperationInput[],
    diagnosticNode: DiagnosticNodeInternal,
  ): Promise<OperationInput[]> {
    diagnosticNode.beginEncryptionDiagnostics(Constants.Encryption.DiagnosticsEncryptOperation);
    for (const operation of operations) {
      if (Object.prototype.hasOwnProperty.call(operation, "partitionKey")) {
        const partitionKeyInternal = convertToInternalPartitionKey(operation.partitionKey);
        operation.partitionKey =
          await this.container.encryptionProcessor.getEncryptedPartitionKeyValue(
            partitionKeyInternal,
          );
      }
      switch (operation.operationType) {
        case BulkOperationType.Create:
        case BulkOperationType.Upsert:
          operation.resourceBody = await this.container.encryptionProcessor.encrypt(
            operation.resourceBody,
          );
          break;
        case BulkOperationType.Read:
        case BulkOperationType.Delete:
          operation.id = await this.container.encryptionProcessor.getEncryptedId(operation.id);
          break;
        case BulkOperationType.Replace:
          operation.id = await this.container.encryptionProcessor.getEncryptedId(operation.id);
          operation.resourceBody = await this.container.encryptionProcessor.encrypt(
            operation.resourceBody,
          );
          break;
        case BulkOperationType.Patch:
          operation.id = await this.container.encryptionProcessor.getEncryptedId(operation.id);
          const body = operation.resourceBody;
          const patchRequestBody = Array.isArray(body) ? body : body.operations;
          for (const patchOperation of patchRequestBody) {
            if ("value" in patchOperation) {
              patchOperation.value = await this.container.encryptionProcessor.encryptProperty(
                patchOperation.path,
                patchOperation.value,
              );
            }
          }
          break;
      }
    }
    diagnosticNode.endEncryptionDiagnostics(Constants.Encryption.DiagnosticsEncryptOperation);
    return operations;
  }
}
