// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ChangeFeedIterator } from "../../ChangeFeedIterator.js";
import type { ChangeFeedOptions } from "../../ChangeFeedOptions.js";
import type { ClientContext } from "../../ClientContext.js";
import {
  Constants,
  copyObject,
  getIdFromLink,
  getPathFromLink,
  isItemResourceValid,
  ResourceType,
  StatusCodes,
  SubStatusCodes,
} from "../../common/index.js";
import { extractPartitionKeys, setPartitionKeyIfUndefined } from "../../extractPartitionKey.js";
import type { FetchFunctionCallback, SqlQuerySpec } from "../../queryExecutionContext/index.js";
import { QueryIterator } from "../../queryIterator.js";
import type { FeedOptions, RequestOptions, Response } from "../../request/index.js";
import type { Container, PartitionKeyRange } from "../Container/index.js";
import { Item } from "./Item.js";
import type { ItemDefinition } from "./ItemDefinition.js";
import { ItemResponse } from "./ItemResponse.js";
import type {
  Batch,
  OperationResponse,
  OperationInput,
  BulkOptions,
  BulkOperationResponse,
  Operation,
  BulkOperationResult,
} from "../../utils/batch.js";
import {
  isKeyInRange,
  prepareOperations,
  decorateBatchOperation,
  splitBatchBasedOnBodySize,
  encryptOperationInput,
} from "../../utils/batch.js";
import { assertNotUndefined, isPrimitivePartitionKeyValue } from "../../utils/typeChecks.js";
import { hashPartitionKey } from "../../utils/hashing/hash.js";
import { PartitionKeyRangeCache, QueryRange } from "../../routing/index.js";
import type {
  PartitionKey,
  PartitionKeyDefinition,
  PartitionKeyInternal,
} from "../../documents/index.js";
import { convertToInternalPartitionKey } from "../../documents/index.js";
import type {
  ChangeFeedPullModelIterator,
  ChangeFeedIteratorOptions,
} from "../../client/ChangeFeed/index.js";
import { validateChangeFeedIteratorOptions } from "../../client/ChangeFeed/changeFeedUtils.js";
import type { DiagnosticNodeInternal } from "../../diagnostics/DiagnosticNodeInternal.js";
import { DiagnosticNodeType } from "../../diagnostics/DiagnosticNodeInternal.js";
import {
  getEmptyCosmosDiagnostics,
  withDiagnostics,
  addDiagnosticChild,
} from "../../utils/diagnostics.js";
import { randomUUID } from "@azure/core-util";
import { computePartitionKeyRangeId, readPartitionKeyDefinition } from "../ClientUtils.js";
import { ChangeFeedIteratorBuilder } from "../ChangeFeed/ChangeFeedIteratorBuilder.js";
import type { EncryptionQueryBuilder } from "../../encryption/index.js";
import type { EncryptionSqlParameter } from "../../encryption/EncryptionQueryBuilder.js";
import type { Resource } from "../Resource.js";
import { TypeMarker } from "../../encryption/enums/TypeMarker.js";
import { EncryptionItemQueryIterator } from "../../encryption/EncryptionItemQueryIterator.js";
import { ErrorResponse } from "../../request/index.js";
import { BulkHelper } from "../../bulk/BulkHelper.js";

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
    this.partitionKeyRangeCache = this.clientContext.partitionKeyRangeCache;
  }

  /**
   * Queries all items.
   * @param query - Query configuration for the operation. See {@link SqlQuerySpec} for more info on how to configure a query.
   * @param options - Used for modifying the request (for instance, specifying the partition key).
   * @example Read all items to array.
   * ```ts snippet:ItemsQueryItems
   * import { CosmosClient, SqlQuerySpec } from "@azure/cosmos";
   *
   * const endpoint = "https://your-account.documents.azure.com";
   * const key = "<database account masterkey>";
   * const client = new CosmosClient({ endpoint, key });
   *
   * const { database } = await client.databases.createIfNotExists({ id: "Test Database" });
   *
   * const { container } = await database.containers.createIfNotExists({ id: "Test Container" });
   *
   * const querySpec: SqlQuerySpec = {
   *   query: `SELECT * FROM Families f WHERE f.lastName = @lastName`,
   *   parameters: [{ name: "@lastName", value: "Hendricks" }],
   * };
   * const { resources: items } = await container.items.query(querySpec).fetchAll();
   * ```
   */

  //
  public query(query: string | SqlQuerySpec, options?: FeedOptions): QueryIterator<any>;
  /**
   * Queries all items.
   * @param query - Query configuration for the operation. See {@link SqlQuerySpec} for more info on how to configure a query.
   * @param options - Used for modifying the request (for instance, specifying the partition key).
   * @example Read all items to array.
   * ```ts snippet:ItemsQueryItems
   * import { CosmosClient, SqlQuerySpec } from "@azure/cosmos";
   *
   * const endpoint = "https://your-account.documents.azure.com";
   * const key = "<database account masterkey>";
   * const client = new CosmosClient({ endpoint, key });
   *
   * const { database } = await client.databases.createIfNotExists({ id: "Test Database" });
   *
   * const { container } = await database.containers.createIfNotExists({ id: "Test Container" });
   *
   * const querySpec: SqlQuerySpec = {
   *   query: `SELECT * FROM Families f WHERE f.lastName = @lastName`,
   *   parameters: [{ name: "@lastName", value: "Hendricks" }],
   * };
   * const { resources: items } = await container.items.query(querySpec).fetchAll();
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
      let internalPartitionKey: PartitionKeyInternal | undefined;
      if (options.partitionKey) {
        internalPartitionKey = convertToInternalPartitionKey(options.partitionKey);
      }
      const isPartitionLevelFailOverEnabled = this.clientContext.isPartitionLevelFailOverEnabled();
      const partitionKeyRangeId = await computePartitionKeyRangeId(
        diagnosticNode,
        internalPartitionKey,
        this.partitionKeyRangeCache,
        isPartitionLevelFailOverEnabled,
        this.container,
      );

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
        partitionKeyRangeId,
      });
      return response;
    };
    let iterator: QueryIterator<T>;
    if (this.clientContext.enableEncryption) {
      iterator = new EncryptionItemQueryIterator(
        this.clientContext,
        query,
        options,
        fetchFunction,
        this.container,
      );
    } else {
      iterator = new QueryIterator<T>(
        this.clientContext,
        query,
        options,
        fetchFunction,
        this.container.url,
        ResourceType.item,
      );
    }
    return iterator;
  }
  /**
   * Queries all items in an encrypted container.
   * @param queryBuilder - Query configuration for the operation. See {@link SqlQuerySpec} for more info on how to build a query on encrypted properties.
   * @param options - Used for modifying the request (for instance, specifying the partition key).
   * @example Read all items to array.
   * ```ts snippet:ItemsQueryEncryptedItems
   * import { CosmosClient, EncryptionQueryBuilder } from "@azure/cosmos";
   *
   * const endpoint = "https://your-account.documents.azure.com";
   * const key = "<database account masterkey>";
   * const client = new CosmosClient({ endpoint, key });
   *
   * const { database } = await client.databases.createIfNotExists({ id: "Test Database" });
   *
   * const { container } = await database.containers.createIfNotExists({ id: "Test Container" });
   *
   * const queryBuilder = new EncryptionQueryBuilder(
   *   `SELECT firstname FROM Families f WHERE f.lastName = @lastName`,
   * );
   * queryBuilder.addParameter("@lastName", "Hendricks", "/lastname");
   * const queryIterator = await container.items.getEncryptionQueryIterator(queryBuilder);
   * const { resources: items } = await queryIterator.fetchAll();
   * ```
   */
  public async getEncryptionQueryIterator(
    queryBuilder: EncryptionQueryBuilder,
    options: FeedOptions = {},
  ): Promise<QueryIterator<ItemDefinition>> {
    const encryptionSqlQuerySpec = queryBuilder.toEncryptionSqlQuerySpec();
    const sqlQuerySpec = await this.buildSqlQuerySpec(encryptionSqlQuerySpec);
    if (this.clientContext.enableEncryption && options.partitionKey) {
      await this.container.checkAndInitializeEncryption();
      const { partitionKeyList, encryptedCount } =
        await this.container.encryptionProcessor.getEncryptedPartitionKeyValue([
          options.partitionKey,
        ] as PartitionKeyInternal);
      if (encryptedCount > 0) {
        options.partitionKey = partitionKeyList[0];
      }
    }
    const iterator = this.query<ItemDefinition>(sqlQuerySpec, options);
    return iterator;
  }

  private async buildSqlQuerySpec(encryptionSqlQuerySpec: SqlQuerySpec): Promise<SqlQuerySpec> {
    let encryptionParameters = encryptionSqlQuerySpec.parameters as EncryptionSqlParameter[];
    const sqlQuerySpec: SqlQuerySpec = {
      query: encryptionSqlQuerySpec.query,
      parameters: [],
    };
    // returns copy to avoid encryption of original parameters passed
    encryptionParameters = copyObject(encryptionParameters);
    for (const parameter of encryptionParameters) {
      let value: any;
      if (parameter.type !== undefined || parameter.type !== TypeMarker.Null) {
        value = await this.container.encryptionProcessor.encryptQueryParameter(
          parameter.path,
          parameter.value,
          parameter.path === "/id",
          parameter.type,
        );
      }
      sqlQuerySpec.parameters.push({ name: parameter.name, value: value });
    }
    return sqlQuerySpec;
  }

  /**
   * Create a `ChangeFeedIterator` to iterate over pages of changes
   *
   * @deprecated Use `getChangeFeedIterator` instead.
   *
   * @example Read from the beginning of the change feed.
   * ```ts snippet:ignore
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
   * @deprecated Use `getChangeFeedIterator` instead.
   *
   */
  public readChangeFeed(changeFeedOptions?: ChangeFeedOptions): ChangeFeedIterator<any>;
  /**
   * Create a `ChangeFeedIterator` to iterate over pages of changes
   * @deprecated Use `getChangeFeedIterator` instead.
   */
  public readChangeFeed<T>(
    partitionKey: PartitionKey,
    changeFeedOptions?: ChangeFeedOptions,
  ): ChangeFeedIterator<T>;
  /**
   * Create a `ChangeFeedIterator` to iterate over pages of changes
   * @deprecated Use `getChangeFeedIterator` instead.
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
   * @deprecated Use `getChangeFeedIterator` instead.
   * @example Read from the beginning of the change feed.
   * ```ts snippet:ignore
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
   * @deprecated Use `getChangeFeedIterator` instead.
   */
  public changeFeed(changeFeedOptions?: ChangeFeedOptions): ChangeFeedIterator<any>;
  /**
   * Create a `ChangeFeedIterator` to iterate over pages of changes
   * @deprecated Use `getChangeFeedIterator` instead.
   */
  public changeFeed<T>(
    partitionKey: PartitionKey,
    changeFeedOptions?: ChangeFeedOptions,
  ): ChangeFeedIterator<T>;
  /**
   * Create a `ChangeFeedIterator` to iterate over pages of changes
   * @deprecated Use `getChangeFeedIterator` instead.
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
   *
   * @example
   * ```ts snippet:ReadmeSampleChangeFeedPullModelIteratorPartitionKey
   * import {
   *   CosmosClient,
   *   PartitionKeyDefinitionVersion,
   *   PartitionKeyKind,
   *   ChangeFeedStartFrom,
   * } from "@azure/cosmos";
   *
   * const endpoint = "https://your-account.documents.azure.com";
   * const key = "<database account masterkey>";
   * const client = new CosmosClient({ endpoint, key });
   *
   * const { database } = await client.databases.createIfNotExists({ id: "Test Database" });
   *
   * const containerDefinition = {
   *   id: "Test Database",
   *   partitionKey: {
   *     paths: ["/name", "/address/zip"],
   *     version: PartitionKeyDefinitionVersion.V2,
   *     kind: PartitionKeyKind.MultiHash,
   *   },
   * };
   * const { container } = await database.containers.createIfNotExists(containerDefinition);
   *
   * const partitionKey = "some-partition-Key-value";
   * const options = {
   *   changeFeedStartFrom: ChangeFeedStartFrom.Beginning(partitionKey),
   * };
   *
   * const iterator = container.items.getChangeFeedIterator(options);
   *
   * while (iterator.hasMoreResults) {
   *   const response = await iterator.readNext();
   *   // process this response
   * }
   * ```
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
   * ```ts snippet:ItemsReadAll
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
   * const { resources: containerList } = await container.items.readAll().fetchAll();
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
   * ```ts snippet:ItemsReadAll
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
   * const { resources: containerList } = await container.items.readAll().fetchAll();
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
   * @example Create an item.
   * ```ts snippet:ContainerItems
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
   * const { resource: createdItem } = await container.items.create({
   *   id: "<item id>",
   *   properties: {},
   * });
   * ```
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
      let response: Response<T & Resource>;
      try {
        if (this.clientContext.enableEncryption) {
          await this.container.checkAndInitializeEncryption();
          options.containerRid = this.container._rid;
          // returns copy to avoid encryption of original body passed
          body = copyObject(body);
          diagnosticNode.beginEncryptionDiagnostics(
            Constants.Encryption.DiagnosticsEncryptOperation,
          );
          const { body: encryptedBody, propertiesEncryptedCount } =
            await this.container.encryptionProcessor.encrypt(body);
          body = encryptedBody;
          diagnosticNode.endEncryptionDiagnostics(
            Constants.Encryption.DiagnosticsEncryptOperation,
            propertiesEncryptedCount,
          );

          partitionKey = extractPartitionKeys(body, partitionKeyDefinition);
        }
        const err = {};
        if (!isItemResourceValid(body, err)) {
          throw err;
        }
        const path = getPathFromLink(this.container.url, ResourceType.item);
        const id = getIdFromLink(this.container.url);

        const isPartitionLevelFailOverEnabled =
          this.clientContext.isPartitionLevelFailOverEnabled();
        const partitionKeyRangeId = await computePartitionKeyRangeId(
          diagnosticNode,
          partitionKey,
          this.partitionKeyRangeCache,
          isPartitionLevelFailOverEnabled,
          this.container,
          partitionKeyDefinition,
        );

        response = await this.clientContext.create<T>({
          body,
          path,
          resourceType: ResourceType.item,
          resourceId: id,
          diagnosticNode,
          options,
          partitionKey,
          partitionKeyRangeId,
        });
      } catch (error: any) {
        if (this.clientContext.enableEncryption) {
          // Todo: internally retry post policy refresh
          await this.container.throwIfRequestNeedsARetryPostPolicyRefresh(error);
        }
        throw error;
      }

      if (this.clientContext.enableEncryption) {
        // try block for decrypting response. This is done so that we can throw special error message in case of decryption failure
        try {
          diagnosticNode.beginEncryptionDiagnostics(
            Constants.Encryption.DiagnosticsDecryptOperation,
          );
          const { body: decryptedResult, propertiesDecryptedCount } =
            await this.container.encryptionProcessor.decrypt(response.result);
          diagnosticNode.endEncryptionDiagnostics(
            Constants.Encryption.DiagnosticsDecryptOperation,
            propertiesDecryptedCount,
          );
          response.result = decryptedResult;
          partitionKey = extractPartitionKeys(response.result, partitionKeyDefinition);
        } catch (error) {
          const decryptionError = new ErrorResponse(
            `Item creation was successful but response decryption failed: + ${error.message}`,
          );
          decryptionError.code = StatusCodes.ServiceUnavailable;
          throw decryptionError;
        }
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
   * @example Upsert an item.
   * ```ts snippet:ItemsUpsert
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
   * const { resource: createdItem1 } = await container.items.create({
   *   id: "<item id 1>",
   *   properties: {},
   * });
   *
   * const { resource: upsertItem1 } = await container.items.upsert({
   *   id: "<item id 1>",
   *   updated_properties: {},
   * });
   *
   * const { resource: upsertItem2 } = await container.items.upsert({
   *   id: "<item id 2>",
   *   properties: {},
   * });
   * ```
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
      let response: Response<T & Resource>;
      try {
        if (this.clientContext.enableEncryption) {
          // returns copy to avoid encryption of original body passed
          body = copyObject(body);
          options = options || {};
          await this.container.checkAndInitializeEncryption();
          options.containerRid = this.container._rid;
          diagnosticNode.beginEncryptionDiagnostics(
            Constants.Encryption.DiagnosticsEncryptOperation,
          );
          const { body: encryptedBody, propertiesEncryptedCount } =
            await this.container.encryptionProcessor.encrypt(body);
          body = encryptedBody;
          diagnosticNode.endEncryptionDiagnostics(
            Constants.Encryption.DiagnosticsEncryptOperation,
            propertiesEncryptedCount,
          );
          partitionKey = extractPartitionKeys(body, partitionKeyDefinition);
        }

        const err = {};
        if (!isItemResourceValid(body, err)) {
          throw err;
        }

        const path = getPathFromLink(this.container.url, ResourceType.item);
        const id = getIdFromLink(this.container.url);

        const isPartitionLevelFailOverEnabled =
          this.clientContext.isPartitionLevelFailOverEnabled();
        const partitionKeyRangeId = await computePartitionKeyRangeId(
          diagnosticNode,
          partitionKey,
          this.partitionKeyRangeCache,
          isPartitionLevelFailOverEnabled,
          this.container,
          partitionKeyDefinition,
        );

        response = await this.clientContext.upsert<T>({
          body,
          path,
          resourceType: ResourceType.item,
          resourceId: id,
          options,
          partitionKey,
          diagnosticNode,
          partitionKeyRangeId,
        });
      } catch (error: any) {
        if (this.clientContext.enableEncryption) {
          await this.container.throwIfRequestNeedsARetryPostPolicyRefresh(error);
        }
        throw error;
      }
      if (this.clientContext.enableEncryption) {
        try {
          // try block for decrypting response. This is done so that we can throw special error message in case of decryption failure
          diagnosticNode.beginEncryptionDiagnostics(
            Constants.Encryption.DiagnosticsDecryptOperation,
          );
          const { body: decryptedResult, propertiesDecryptedCount } =
            await this.container.encryptionProcessor.decrypt(response.result);
          diagnosticNode.endEncryptionDiagnostics(
            Constants.Encryption.DiagnosticsDecryptOperation,
            propertiesDecryptedCount,
          );
          response.result = decryptedResult;
          partitionKey = extractPartitionKeys(response.result, partitionKeyDefinition);
        } catch (error) {
          const decryptionError = new ErrorResponse(
            `Item upsert was successful but response decryption failed: + ${error.message}`,
          );
          decryptionError.code = StatusCodes.ServiceUnavailable;
          throw decryptionError;
        }
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
   * @param operations - List of operations
   * @param options - used for modifying the request
   * @returns list of operation results corresponding to the operations
   *
   * @example
   * ```ts snippet:ItemsExecuteBulkOperations
   * import { CosmosClient, OperationInput } from "@azure/cosmos";
   *
   * const endpoint = "https://your-account.documents.azure.com";
   * const key = "<database account masterkey>";
   * const client = new CosmosClient({ endpoint, key });
   *
   * const { database } = await client.databases.createIfNotExists({ id: "Test Database" });
   *
   * const { container } = await database.containers.createIfNotExists({ id: "Test Container" });
   *
   * const operations: OperationInput[] = [
   *   {
   *     operationType: "Create",
   *     resourceBody: { id: "doc1", name: "sample", key: "A" },
   *   },
   *   {
   *     operationType: "Upsert",
   *     partitionKey: "A",
   *     resourceBody: { id: "doc2", name: "other", key: "A" },
   *   },
   * ];
   *
   * await container.items.executeBulkOperations(operations);
   * ```
   */
  public async executeBulkOperations(
    operations: OperationInput[],
    options: RequestOptions = {},
  ): Promise<BulkOperationResult[]> {
    const bulkHelper = new BulkHelper(
      this.container,
      this.clientContext,
      this.partitionKeyRangeCache,
      options,
    );
    return bulkHelper.execute(operations);
  }

  /**
   * Execute bulk operations on items.
   * @deprecated Use `executeBulkOperations` instead.
   *
   * Bulk takes an array of Operations which are typed based on what the operation does.
   * The choices are: Create, Upsert, Read, Replace, and Delete
   *
   * Usage example:
   * ```ts snippet:ItemsBulk
   * import { CosmosClient, OperationInput } from "@azure/cosmos";
   *
   * const endpoint = "https://your-account.documents.azure.com";
   * const key = "<database account masterkey>";
   * const client = new CosmosClient({ endpoint, key });
   *
   * const { database } = await client.databases.createIfNotExists({ id: "Test Database" });
   *
   * const { container } = await database.containers.createIfNotExists({ id: "Test Container" });
   *
   * // partitionKey is optional at the top level if present in the resourceBody
   * const operations: OperationInput[] = [
   *   {
   *     operationType: "Create",
   *     resourceBody: { id: "doc1", name: "sample", key: "A" },
   *   },
   *   {
   *     operationType: "Upsert",
   *     partitionKey: "A",
   *     resourceBody: { id: "doc2", name: "other", key: "A" },
   *   },
   * ];
   *
   * await container.items.bulk(operations);
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
      const partitionKeyRanges = (
        await this.partitionKeyRangeCache.onCollectionRoutingMap(this.container.url, diagnosticNode)
      ).getOrderedParitionKeyRanges();

      const partitionKeyDefinition = await readPartitionKeyDefinition(
        diagnosticNode,
        this.container,
      );

      if (this.clientContext.enableEncryption) {
        // returns copy to avoid encryption of original operations body passed
        operations = copyObject(operations);
        options = options || {};
        await this.container.checkAndInitializeEncryption();
        options.containerRid = this.container._rid;
        diagnosticNode.beginEncryptionDiagnostics(Constants.Encryption.DiagnosticsEncryptOperation);
        const { operations: encryptedOperations, totalPropertiesEncryptedCount } =
          await this.bulkBatchEncryptionHelper(operations);
        operations = encryptedOperations;
        diagnosticNode.endEncryptionDiagnostics(
          Constants.Encryption.DiagnosticsEncryptOperation,
          totalPropertiesEncryptedCount,
        );
      }

      const batches: Batch[] = partitionKeyRanges.map((keyRange: PartitionKeyRange) => {
        return {
          min: keyRange.minInclusive,
          max: keyRange.maxExclusive,
          rangeId: keyRange.id,
          indexes: [] as number[],
          operations: [] as Operation[],
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
      let response: Response<OperationResponse[]>;
      try {
        response = await addDiagnosticChild(
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
      if (response) {
        try {
          if (this.clientContext.enableEncryption) {
            diagnosticNode.beginEncryptionDiagnostics(
              Constants.Encryption.DiagnosticsDecryptOperation,
            );
            let count = 0;
            for (const result of response.result) {
              if (result.resourceBody) {
                const { body, propertiesDecryptedCount } =
                  await this.container.encryptionProcessor.decrypt(result.resourceBody);
                result.resourceBody = body;
                count += propertiesDecryptedCount;
              }
            }
            diagnosticNode.endEncryptionDiagnostics(
              Constants.Encryption.DiagnosticsDecryptOperation,
              count,
            );
          }
        } catch (error) {
          const decryptionError = new ErrorResponse(
            `Batch response was received but response decryption failed: + ${error.message}`,
          );
          decryptionError.code = StatusCodes.ServiceUnavailable;
          throw decryptionError;
        }
        response.result.forEach((operationResponse: OperationResponse, index: number) => {
          orderedResponses[batch.indexes[index]] = operationResponse;
        });
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
        indexes: [] as number[],
        operations: [] as Operation[],
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
   * ```ts snippet:ItemsBatch
   * import { CosmosClient, OperationInput } from "@azure/cosmos";
   *
   * const endpoint = "https://your-account.documents.azure.com";
   * const key = "<database account masterkey>";
   * const client = new CosmosClient({ endpoint, key });
   *
   * const { database } = await client.databases.createIfNotExists({ id: "Test Database" });
   *
   * const { container } = await database.containers.createIfNotExists({ id: "Test Container" });
   *
   * // The partitionKey is a required second argument. If it’s undefined, it defaults to the expected partition key format.
   * const operations: OperationInput[] = [
   *   {
   *     operationType: "Create",
   *     resourceBody: { id: "doc1", name: "sample", key: "A" },
   *   },
   *   {
   *     operationType: "Upsert",
   *     resourceBody: { id: "doc2", name: "other", key: "A" },
   *   },
   * ];
   *
   * await container.items.batch(operations, "A");
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
      for (const operationInput of operations) {
        if (operationInput && operationInput.partitionKey !== undefined) {
          operationInput.partitionKey = JSON.stringify(
            convertToInternalPartitionKey(operationInput.partitionKey),
          );
        }
      }
      let response: Response<OperationResponse[]>;
      try {
        if (this.clientContext.enableEncryption) {
          // returns copy to avoid encryption of original operations body passed
          operations = copyObject(operations);
          options = options || {};
          await this.container.checkAndInitializeEncryption();
          options.containerRid = this.container._rid;
          let count = 0;
          diagnosticNode.beginEncryptionDiagnostics(
            Constants.Encryption.DiagnosticsEncryptOperation,
          );
          if (partitionKey) {
            const partitionKeyInternal = convertToInternalPartitionKey(partitionKey);
            const { partitionKeyList, encryptedCount } =
              await this.container.encryptionProcessor.getEncryptedPartitionKeyValue(
                partitionKeyInternal,
              );
            partitionKey = partitionKeyList;
            count += encryptedCount;
          }
          const { operations: encryptedOperations, totalPropertiesEncryptedCount } =
            await this.bulkBatchEncryptionHelper(operations);
          operations = encryptedOperations;
          count += totalPropertiesEncryptedCount;
          diagnosticNode.endEncryptionDiagnostics(
            Constants.Encryption.DiagnosticsEncryptOperation,
            count,
          );
        }

        const isPartitionLevelFailOverEnabled =
          this.clientContext.isPartitionLevelFailOverEnabled();
        const partitionKeyRangeId = await computePartitionKeyRangeId(
          diagnosticNode,
          partitionKey,
          this.partitionKeyRangeCache,
          isPartitionLevelFailOverEnabled,
          this.container,
        );

        response = await this.clientContext.batch({
          body: operations,
          partitionKey,
          path,
          resourceId: this.container.url,
          options,
          diagnosticNode,
          partitionKeyRangeId,
        });
      } catch (err: any) {
        if (this.clientContext.enableEncryption) {
          await this.container.throwIfRequestNeedsARetryPostPolicyRefresh(err);
        }
        throw new Error(`Batch request error: ${err.message}`);
      }
      if (this.clientContext.enableEncryption) {
        try {
          diagnosticNode.beginEncryptionDiagnostics(
            Constants.Encryption.DiagnosticsDecryptOperation,
          );
          let count = 0;
          for (const result of response.result) {
            if (result.resourceBody) {
              const { body, propertiesDecryptedCount } =
                await this.container.encryptionProcessor.decrypt(result.resourceBody);
              result.resourceBody = body;
              count += propertiesDecryptedCount;
            }
          }
          diagnosticNode.endEncryptionDiagnostics(
            Constants.Encryption.DiagnosticsDecryptOperation,
            count,
          );
        } catch (error) {
          const decryptionError = new ErrorResponse(
            `Batch response was received but response decryption failed: + ${error.message}`,
          );
          decryptionError.code = StatusCodes.ServiceUnavailable;
          throw decryptionError;
        }
      }
      return response;
    }, this.clientContext);
  }

  private async bulkBatchEncryptionHelper(
    operations: OperationInput[],
  ): Promise<{ operations: OperationInput[]; totalPropertiesEncryptedCount: number }> {
    let totalPropertiesEncryptedCount = 0;
    const encryptedOperations: OperationInput[] = [];
    for (const operation of operations) {
      const { operation: encryptedOp, totalPropertiesEncryptedCount: updatedCount } =
        await encryptOperationInput(
          this.container.encryptionProcessor,
          operation,
          totalPropertiesEncryptedCount,
        );
      totalPropertiesEncryptedCount = updatedCount;
      encryptedOperations.push(encryptedOp);
    }
    return { operations: encryptedOperations, totalPropertiesEncryptedCount };
  }
}
