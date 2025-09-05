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
  ErrorResponse,
  PartitionedQueryExecutionInfo,
  QueryRange,
} from "./request/ErrorResponse.js";
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
import type { PartitionKeyRangeCache } from "./routing/index.js";

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
  private isInitialized: boolean;
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
    console.log("==========================================");
    console.log("QUERYITERATOR: Constructor called");
    console.log("==========================================");
    this.query = query;
    this.fetchFunctions = fetchFunctions;
    this.options = options || {};
    this.resourceLink = resourceLink;
    this.fetchAllLastResHeaders = getInitialHeader();
    this.reset();
    this.isInitialized = false;
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
    while (this.queryExecutionContext.hasMoreResults()) {
      let response: Response<any>;
      try {
        response = await this.queryExecutionContext.fetchMore(diagnosticNode);
      } catch (error: any) {
        if (this.needsQueryPlan(error)) {
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
        response.result,
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
    console.log("==========================================");
    console.log("QUERYITERATOR: fetchAll() method called");
    console.log("==========================================");
    return withDiagnostics(async (diagnosticNode: DiagnosticNodeInternal) => {
      return this.fetchAllInternal(diagnosticNode);
    }, this.clientContext);
  }

  /**
   * @hidden
   */
  public async fetchAllInternal(diagnosticNode: DiagnosticNodeInternal): Promise<FeedResponse<T>> {
    this.reset();
    console.log("==========================================");
    console.log("QUERYITERATOR: fetchAllInternal() called");
    console.log("==========================================");
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
    if (!this.isInitialized) {
      await this.init(diagnosticNode);
    }
    let response: Response<any>;
    try {
      response = await this.queryExecutionContext.fetchMore(diagnosticNode);
    } catch (error: any) {
      if (this.needsQueryPlan(error)) {
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
    console.log("=== QUERYITERATOR DEBUG ===");
    console.log("response.headers:", response.headers);
    console.log("=== END QUERYITERATOR DEBUG ===");
    return new FeedResponse<T>(
      response.result,
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
    this.correlatedActivityId = randomUUID();
    this.queryPlanPromise = undefined;
    this.fetchAllLastResHeaders = getInitialHeader();
    this.fetchAllTempResources = [];
    this.queryExecutionContext = new DefaultQueryExecutionContext(
      this.options,
      this.fetchFunctions,
      this.correlatedActivityId,
    );
  }

  private async toArrayImplementation(
    diagnosticNode: DiagnosticNodeInternal,
  ): Promise<FeedResponse<T>> {
    console.log("==========================================");
    console.log("QUERYITERATOR: toArrayImplementation() called");
    console.log("==========================================");
    this.queryPlanPromise = withMetadataDiagnostics(
      async (metadataNode: DiagnosticNodeInternal) => {
        return this.fetchQueryPlan(metadataNode);
      },
      diagnosticNode,
      MetadataLookUpType.QueryPlanLookUp,
    );
    // this.queryPlanPromise = this.fetchQueryPlan(diagnosticNode);
    if (!this.isInitialized) {
      await this.init(diagnosticNode);
    }
    while (this.queryExecutionContext.hasMoreResults()) {
      let response: Response<any>;
      try {
        response = await this.queryExecutionContext.fetchMore(diagnosticNode);
      } catch (error: any) {
        if (this.needsQueryPlan(error)) {
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
        this.fetchAllTempResources.push(...result);
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

    // We always coerce queryPlanPromise to resolved. So if it errored, we need to manually inspect the resolved value
    if (queryPlanResponse instanceof Error) {
      throw queryPlanResponse;
    }

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

  private async fetchQueryPlan(diagnosticNode: DiagnosticNodeInternal): Promise<any> {
    if (!this.queryPlanPromise && this.resourceType === ResourceType.item) {
      return this.clientContext
        .getQueryPlan(
          getPathFromLink(this.resourceLink) + "/docs",
          ResourceType.item,
          this.resourceLink,
          this.query,
          this.options,
          diagnosticNode,
          this.correlatedActivityId,
        )
        .catch((error: any) => error); // Without this catch, node reports an unhandled rejection. So we stash the promise as resolved even if it errored.
    }
    return this.queryPlanPromise;
  }

  private needsQueryPlan(error: ErrorResponse): error is ErrorResponse {
    if (
      error.body?.additionalErrorInfo ||
      error.message.includes("Cross partition query only supports")
    ) {
      return error.code === StatusCodes.BadRequest && this.resourceType === ResourceType.item;
    } else {
      throw error;
    }
  }

  private initPromise: Promise<void>;
  /**
   * @internal
   */
  public async init(diagnosticNode: DiagnosticNodeInternal): Promise<void> {
    if (this.isInitialized === true) {
      return;
    }
    if (this.initPromise === undefined) {
      this.initPromise = this._init(diagnosticNode);
    }
    return this.initPromise;
  }
  private async _init(diagnosticNode: DiagnosticNodeInternal): Promise<void> {
    if (this.options.forceQueryPlan === true && this.resourceType === ResourceType.item) {
      await this.createExecutionContext(diagnosticNode);
    }
    this.isInitialized = true;
  }

  private handleSplitError(err: any): void {
    if (err.code === 410) {
      const error = new Error(
        "Encountered partition split and could not recover. This request is retryable",
      ) as any;
      error.code = 503;
      error.originalError = err;
      throw error;
    } else {
      throw err;
    }
  }
}
