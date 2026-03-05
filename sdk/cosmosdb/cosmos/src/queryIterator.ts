// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/// <reference lib="esnext.asynciterable" />
import type { ClientContext } from "./ClientContext.js";
import {
  DiagnosticNodeInternal,
  DiagnosticNodeType,
} from "./diagnostics/DiagnosticNodeInternal.js";
import { getPathFromLink, ResourceType, StatusCodes } from "./common/index.js";
import type {
  CosmosHeaders,
  ExecutionContext,
  FetchFunctionCallback,
  SqlQuerySpec,
} from "./queryExecutionContext/index.js";
import {
  DefaultQueryExecutionContext,
  getInitialHeader,
  mergeHeaders,
  PipelinedQueryExecutionContext,
} from "./queryExecutionContext/index.js";
import type { Response } from "./request/index.js";
import type {
  PartitionedQueryExecutionInfo,
  QueryRange,
} from "./request/ErrorResponse.js";
import { ErrorResponse } from "./request/ErrorResponse.js";
import type { FeedOptions } from "./request/FeedOptions.js";
import { FeedResponse } from "./request/FeedResponse.js";
import {
  getEmptyCosmosDiagnostics,
  withDiagnostics,
  withMetadataDiagnostics,
} from "./utils/diagnostics.js";
import { MetadataLookUpType } from "./CosmosDiagnostics.js";
import { randomUUID } from "@azure/core-util";
import { HybridQueryExecutionContext } from "./queryExecutionContext/hybridQueryExecutionContext.js";
import { CosmosQueryError, PartitionSplitError } from "./queryExecutionContext/Exceptions/index.js";
import { CosmosErrorCode } from "./queryExecutionContext/Exceptions/CosmosErrorCode.js";
import type { PartitionKeyRangeCache } from "./routing/index.js";

/** Internal lifecycle state for QueryIterator. */
const enum QueryIteratorState {
  Uninitialized = "uninitialized",
  Initializing = "initializing",
  Ready = "ready",
  Disposed = "disposed",
}

/**
 * Represents a QueryIterator Object, an implementation of feed or query response that enables
 * traversal and iterating over the response
 * in the Azure Cosmos DB database service.
 */
export class QueryIterator<T> {
  private fetchAllTempResources: T[]; // TODO
  private fetchAllLastResHeaders: CosmosHeaders;
  private queryExecutionContext: ExecutionContext;
  private queryPlanPromise: Promise<Response<PartitionedQueryExecutionInfo>>;
  private _state: QueryIteratorState = QueryIteratorState.Uninitialized;
  private correlatedActivityId: string;
  private partitionKeyRangeCache: PartitionKeyRangeCache;
  /**
   * @hidden
   */
  constructor(
    private clientContext: ClientContext,
    private query: SqlQuerySpec | string,
    private options: FeedOptions,
    private fetchFunctions: FetchFunctionCallback | FetchFunctionCallback[],
    private resourceLink?: string,
    private resourceType?: ResourceType,
  ) {
    this.query = query;
    this.fetchFunctions = fetchFunctions;
    this.options = options || {};
    this.resourceLink = resourceLink;
    this.fetchAllLastResHeaders = getInitialHeader();
    this.reset();
    this.partitionKeyRangeCache = this.clientContext.partitionKeyRangeCache;
  }

  /**
   * Gets an async iterator that will yield results until completion.
   *
   * NOTE: AsyncIterators are a very new feature and you might need to
   * use polyfils/etc. in order to use them in your code.
   *
   * If you're using TypeScript, you can use the following polyfill as long
   * as you target ES6 or higher and are running on Node 6 or higher.
   *
   * ```ts snippet:ignore
   * if (!Symbol || !Symbol.asyncIterator) {
   *   (Symbol as any).asyncIterator = Symbol.for("Symbol.asyncIterator");
   * }
   * ```
   *
   * @example Iterate over all databases
   * ```ts snippet:QueryIteratorIterateDatabases
   * import { CosmosClient } from "@azure/cosmos";
   *
   * const endpoint = "https://your-account.documents.azure.com";
   * const key = "<database account masterkey>";
   * const client = new CosmosClient({ endpoint, key });
   *
   * for await (const { resources: db } of client.databases.readAll().getAsyncIterator()) {
   *   console.log(`Got ${db} from AsyncIterator`);
   * }
   * ```
   */
  public async *getAsyncIterator(): AsyncIterable<FeedResponse<T>> {
    const diagnosticNode = new DiagnosticNodeInternal(
      this.clientContext.diagnosticLevel,
      DiagnosticNodeType.CLIENT_REQUEST_NODE,
      null,
    );
    yield* this.getAsyncIteratorInternal(diagnosticNode);
  }
  /**
   * @internal
   */
  public async *getAsyncIteratorInternal(
    diagnosticNode: DiagnosticNodeInternal,
  ): AsyncIterable<FeedResponse<T>> {
    this.reset();
    this.queryPlanPromise = this.fetchQueryPlan(diagnosticNode);
    await this.ensureInitialized(diagnosticNode);
    while (this.queryExecutionContext.hasMoreResults()) {
      let response: Response<unknown>;
      try {
        response = await this.queryExecutionContext.fetchMore(diagnosticNode);
      } catch (error: any) {
        if (this.isQueryPlanRequired(error)) {
          await this.createExecutionContext(diagnosticNode);
          try {
            response = await this.queryExecutionContext.fetchMore(diagnosticNode);
          } catch (queryError: any) {
            this.handleSplitError(queryError);
          }
        } else {
          throw error;
        }
      }

      const feedResponse = new FeedResponse<T>(
        response.result as T[], // Public API trust boundary: Response<unknown> → T[]
        response.headers,
        this.queryExecutionContext.hasMoreResults(),
        diagnosticNode.toDiagnostic(this.clientContext.getClientConfig()),
      );
      diagnosticNode = new DiagnosticNodeInternal(
        this.clientContext.diagnosticLevel,
        DiagnosticNodeType.CLIENT_REQUEST_NODE,
        null,
      );
      if (response.result !== undefined) {
        yield feedResponse;
      }
    }
  }

  /**
   * Determine if there are still remaining resources to process based on the value of the continuation token or the
   * elements remaining on the current batch in the QueryIterator.
   * @returns true if there is other elements to process in the QueryIterator.
   */
  public hasMoreResults(): boolean {
    return this.queryExecutionContext.hasMoreResults();
  }

  /**
   * Fetch all pages for the query and return a single FeedResponse.
   * @example
   * ```ts snippet:ReadmeSampleQueryDatabase
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
   * const { resources } = await container.items
   *   .query("SELECT * from c WHERE c.isCapitol = true")
   *   .fetchAll();
   * ```
   */

  public async fetchAll(): Promise<FeedResponse<T>> {
    return withDiagnostics(async (diagnosticNode: DiagnosticNodeInternal) => {
      return this.fetchAllInternal(diagnosticNode);
    }, this.clientContext);
  }

  /**
   * @hidden
   */
  public async fetchAllInternal(diagnosticNode: DiagnosticNodeInternal): Promise<FeedResponse<T>> {
    this.reset();
    let response: FeedResponse<T>;
    try {
      response = await this.toArrayImplementation(diagnosticNode);
    } catch (error: any) {
      this.handleSplitError(error);
    }
    return response;
  }

  /**
   * Retrieve the next batch from the feed.
   *
   * This may or may not fetch more pages from the backend depending on your settings
   * and the type of query. Aggregate queries will generally fetch all backend pages
   * before returning the first batch of responses.
   *
   * @example
   * ```ts snippet:ReadmeSampleNonStreamableCrossPartitionQuery
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
   * const querySpec = {
   *   query: "SELECT c.status, COUNT(c.id) AS count FROM c GROUP BY c.status",
   * };
   * const queryOptions = {
   *   maxItemCount: 10, // maximum number of items to return per page
   *   enableCrossPartitionQuery: true,
   * };
   * const queryIterator = container.items.query(querySpec, queryOptions);
   * while (queryIterator.hasMoreResults()) {
   *   const { resources: result } = await queryIterator.fetchNext();
   *   // process results
   * }
   * ```
   */
  public async fetchNext(): Promise<FeedResponse<T>> {
    return withDiagnostics(async (diagnosticNode: DiagnosticNodeInternal) => {
      return this.fetchNextInternal(diagnosticNode);
    }, this.clientContext);
  }
  /**
   * @internal
   */
  public async fetchNextInternal(diagnosticNode: DiagnosticNodeInternal): Promise<FeedResponse<T>> {
    this.queryPlanPromise = withMetadataDiagnostics(
      async (metadataNode: DiagnosticNodeInternal) => {
        return this.fetchQueryPlan(metadataNode);
      },
      diagnosticNode,
      MetadataLookUpType.QueryPlanLookUp,
    );
    await this.ensureInitialized(diagnosticNode);
    let response: Response<unknown>;
    try {
      response = await this.queryExecutionContext.fetchMore(diagnosticNode);
    } catch (error: any) {
      if (this.isQueryPlanRequired(error)) {
        await this.createExecutionContext(diagnosticNode);
        try {
          response = await this.queryExecutionContext.fetchMore(diagnosticNode);
        } catch (queryError: any) {
          this.handleSplitError(queryError);
        }
      } else {
        throw error;
      }
    }
    return new FeedResponse<T>(
      response.result as T[], // Public API trust boundary: Response<unknown> → T[]
      response.headers,
      this.queryExecutionContext.hasMoreResults(),
      getEmptyCosmosDiagnostics(),
    );
  }

  /**
   * Reset the QueryIterator to the beginning and clear all the resources inside it
   * @example
   * ```ts snippet:QueryIteratorReset
   * import { CosmosClient } from "@azure/cosmos";
   *
   * const endpoint = "https://your-account.documents.azure.com";
   * const key = "<database account masterkey>";
   * const client = new CosmosClient({ endpoint, key });
   * const { database } = await client.databases.createIfNotExists({ id: "Test Database" });
   * const { container } = await database.containers.createIfNotExists({ id: "Test Container" });
   *
   * const querySpec = {
   *   query: "SELECT c.status, COUNT(c.id) AS count FROM c GROUP BY c.status",
   * };
   * const queryIterator = container.items.query(querySpec);
   * while (queryIterator.hasMoreResults()) {
   *   const { resources: result } = await queryIterator.fetchNext();
   *   // process results
   * }
   * queryIterator.reset();
   * ```
   *
   */
  public reset(): void {
    if (this._state === QueryIteratorState.Disposed) {
      throw new Error("QueryIterator has been disposed and cannot be reset.");
    }
    this.correlatedActivityId = randomUUID();
    this.queryPlanPromise = undefined;
    this._initPromise = undefined;
    this._state = QueryIteratorState.Uninitialized;
    this.fetchAllLastResHeaders = getInitialHeader();
    this.fetchAllTempResources = [];
    if (this.queryExecutionContext) {
      this.queryExecutionContext.dispose();
    }
    this.queryExecutionContext = new DefaultQueryExecutionContext(
      this.options,
      this.fetchFunctions,
      this.correlatedActivityId,
    );
  }

  private async toArrayImplementation(
    diagnosticNode: DiagnosticNodeInternal,
  ): Promise<FeedResponse<T>> {
    this.queryPlanPromise = withMetadataDiagnostics(
      async (metadataNode: DiagnosticNodeInternal) => {
        return this.fetchQueryPlan(metadataNode);
      },
      diagnosticNode,
      MetadataLookUpType.QueryPlanLookUp,
    );
    // this.queryPlanPromise = this.fetchQueryPlan(diagnosticNode);
    await this.ensureInitialized(diagnosticNode);
    while (this.queryExecutionContext.hasMoreResults()) {
      let response: Response<unknown>;
      try {
        response = await this.queryExecutionContext.fetchMore(diagnosticNode);
      } catch (error: any) {
        if (this.isQueryPlanRequired(error)) {
          await this.createExecutionContext(diagnosticNode);
          response = await this.queryExecutionContext.fetchMore(diagnosticNode);
        } else {
          throw error;
        }
      }
      const { result, headers } = response;
      // concatenate the results and fetch more
      mergeHeaders(this.fetchAllLastResHeaders, headers);
      if (result) {
        // Public API trust boundary: Response<unknown> → T[]
        this.fetchAllTempResources.push(...(result as T[]));
      }
      if (
        this.options.maxFetchAllItemCount !== undefined &&
        this.fetchAllTempResources.length > this.options.maxFetchAllItemCount
      ) {
        throw new CosmosQueryError(
          `fetchAll() exceeded the maximum item count of ${this.options.maxFetchAllItemCount}. Use fetchNext() or getAsyncIterator() for large result sets.`,
          CosmosErrorCode.FetchAllSizeLimitExceeded,
        );
      }
    }
    return new FeedResponse(
      this.fetchAllTempResources,
      this.fetchAllLastResHeaders,
      this.queryExecutionContext.hasMoreResults(),
      getEmptyCosmosDiagnostics(),
    );
  }

  private async createExecutionContext(diagnosticNode?: DiagnosticNodeInternal): Promise<void> {
    const queryPlanResponse = await this.queryPlanPromise;

    const queryPlan: PartitionedQueryExecutionInfo = queryPlanResponse.result;
    if (queryPlan.hybridSearchQueryInfo && queryPlan.hybridSearchQueryInfo !== null) {
      await this.createHybridQueryExecutionContext(queryPlan, diagnosticNode);
    } else {
      await this.createPipelinedExecutionContext(queryPlan);
    }
  }

  private async createHybridQueryExecutionContext(
    queryPlan: PartitionedQueryExecutionInfo,
    diagnosticNode?: DiagnosticNodeInternal,
  ): Promise<void> {
    const allPartitionKeyRanges = (
      await this.partitionKeyRangeCache.onCollectionRoutingMap(this.resourceLink, diagnosticNode)
    ).getOrderedParitionKeyRanges();

    // convert allPartitionKeyRanges to QueryRanges
    const queryRanges: QueryRange[] = allPartitionKeyRanges.map((partitionKeyRange) => {
      return {
        min: partitionKeyRange.minInclusive,
        max: partitionKeyRange.maxExclusive,
        isMinInclusive: true,
        isMaxInclusive: false,
      };
    });

    this.queryExecutionContext = new HybridQueryExecutionContext(
      this.clientContext,
      this.resourceLink,
      this.query,
      this.options,
      queryPlan,
      this.correlatedActivityId,
      queryRanges,
    );
  }

  private async createPipelinedExecutionContext(
    queryPlan: PartitionedQueryExecutionInfo,
  ): Promise<void> {
    const queryInfo = queryPlan.queryInfo;
    if (queryInfo.aggregates.length > 0 && queryInfo.hasSelectValue === false) {
      throw new Error("Aggregate queries must use the VALUE keyword");
    }
    this.queryExecutionContext = new PipelinedQueryExecutionContext(
      this.clientContext,
      this.resourceLink,
      this.query,
      this.options,
      queryPlan,
      this.correlatedActivityId,
    );
  }

  private async fetchQueryPlan(
    diagnosticNode: DiagnosticNodeInternal,
  ): Promise<Response<PartitionedQueryExecutionInfo> | null> {
    if (this.queryPlanPromise || this.resourceType !== ResourceType.item) {
      return this.queryPlanPromise;
    }
    // Don't catch — let errors propagate naturally
    return this.clientContext.getQueryPlan(
      getPathFromLink(this.resourceLink) + "/docs",
      ResourceType.item,
      this.resourceLink,
      this.query,
      this.options,
      diagnosticNode,
      this.correlatedActivityId,
    );
  }

  /**
   * Determines whether the error indicates a query plan is needed.
   * Pure predicate — never throws, never has side effects.
   */
  private isQueryPlanRequired(error: unknown): boolean {
    if (!(error instanceof ErrorResponse)) return false;
    if (error.code !== StatusCodes.BadRequest) return false;
    if (this.resourceType !== ResourceType.item) return false;
    return !!(
      error.body?.additionalErrorInfo ||
      (typeof error.message === "string" &&
        error.message.includes("Cross partition query only supports"))
    );
  }

  private _initPromise: Promise<void> | undefined;

  /**
   * Idempotent initialization guard. Safe to call from any entry point.
   * Throws if the iterator has been disposed.
   */
  private async ensureInitialized(diagnosticNode: DiagnosticNodeInternal): Promise<void> {
    if (this._state === QueryIteratorState.Disposed) {
      throw new Error("QueryIterator has been disposed and cannot be used.");
    }
    if (this._state === QueryIteratorState.Ready) {
      return;
    }
    return this.init(diagnosticNode);
  }

  /**
   * Promise-based mutex for initialization. Prevents concurrent init calls.
   */
  private async init(diagnosticNode: DiagnosticNodeInternal): Promise<void> {
    if (this._state === QueryIteratorState.Ready) {
      return;
    }
    if (!this._initPromise) {
      this._state = QueryIteratorState.Initializing;
      this._initPromise = this._init(diagnosticNode).then(
        () => {
          this._state = QueryIteratorState.Ready;
        },
        (err) => {
          // Roll back so the next caller can retry initialization.
          this._state = QueryIteratorState.Uninitialized;
          this._initPromise = undefined;
          throw err;
        },
      );
    }
    return this._initPromise;
  }

  private async _init(diagnosticNode: DiagnosticNodeInternal): Promise<void> {
    if (this.options.forceQueryPlan === true && this.resourceType === ResourceType.item) {
      await this.createExecutionContext(diagnosticNode);
    }
  }

  private handleSplitError(err: unknown): never {
    if (err instanceof ErrorResponse && err.code === StatusCodes.Gone) {
      throw new PartitionSplitError(err);
    }
    throw err;
  }

  /**
   * Releases resources held by this QueryIterator.
   * After disposal, the iterator cannot be used or reset.
   */
  public dispose(): void {
    if (this._state === QueryIteratorState.Disposed) {
      return;
    }
    this._state = QueryIteratorState.Disposed;
    this._initPromise = undefined;
    this.queryPlanPromise = undefined;
    if (this.queryExecutionContext) {
      this.queryExecutionContext.dispose();
    }
    this.fetchAllTempResources = [];
  }
}
