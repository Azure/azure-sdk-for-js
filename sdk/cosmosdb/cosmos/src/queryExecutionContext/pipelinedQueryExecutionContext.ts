// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import type { ClientContext } from "../ClientContext.js";
import type { Response, FeedOptions } from "../request/index.js";
import type { PartitionedQueryExecutionInfo, QueryInfo } from "../request/ErrorResponse.js";
import { ErrorResponse } from "../request/ErrorResponse.js";
import type { CosmosHeaders } from "./headerUtils.js";
import { OffsetLimitEndpointComponent } from "./EndpointComponent/OffsetLimitEndpointComponent.js";
import { OrderByEndpointComponent } from "./EndpointComponent/OrderByEndpointComponent.js";
import { OrderedDistinctEndpointComponent } from "./EndpointComponent/OrderedDistinctEndpointComponent.js";
import { UnorderedDistinctEndpointComponent } from "./EndpointComponent/UnorderedDistinctEndpointComponent.js";
import { GroupByEndpointComponent } from "./EndpointComponent/GroupByEndpointComponent.js";
import type { ExecutionContext } from "./ExecutionContext.js";
import { getInitialHeader, mergeHeaders } from "./headerUtils.js";
import { OrderByQueryExecutionContext } from "./orderByQueryExecutionContext.js";
import { ParallelQueryExecutionContext } from "./parallelQueryExecutionContext.js";
import { GroupByValueEndpointComponent } from "./EndpointComponent/GroupByValueEndpointComponent.js";
import type { SqlQuerySpec } from "./SqlQuerySpec.js";
import type { DiagnosticNodeInternal } from "../diagnostics/DiagnosticNodeInternal.js";
import { NonStreamingOrderByDistinctEndpointComponent } from "./EndpointComponent/NonStreamingOrderByDistinctEndpointComponent.js";
import { NonStreamingOrderByEndpointComponent } from "./EndpointComponent/NonStreamingOrderByEndpointComponent.js";
import { ContinuationTokenManager } from "./ContinuationTokenManager.js";

/** @hidden */
export class PipelinedQueryExecutionContext implements ExecutionContext {
  private fetchBuffer: any[];
  private fetchMoreRespHeaders: CosmosHeaders;
  private endpoint: ExecutionContext;
  private pageSize: number;
  private vectorSearchBufferSize: number = 0;
  private static DEFAULT_PAGE_SIZE = 10;
  private static DEFAULT_MAX_VECTOR_SEARCH_BUFFER_SIZE = 50000;
  private nonStreamingOrderBy = false;
  private continuationTokenManager: ContinuationTokenManager;
  constructor(
    private clientContext: ClientContext,
    private collectionLink: string,
    private query: string | SqlQuerySpec,
    private options: FeedOptions,
    private partitionedQueryExecutionInfo: PartitionedQueryExecutionInfo,
    correlatedActivityId: string,
    private emitRawOrderByPayload: boolean = false,
  ) {
    this.endpoint = null;
    this.pageSize = options["maxItemCount"];
    if (this.pageSize === undefined) {
      this.pageSize = PipelinedQueryExecutionContext.DEFAULT_PAGE_SIZE;
    }

    // Initialize continuation token manager early so it's available for OffsetLimitEndpointComponent
    const sortOrders = partitionedQueryExecutionInfo.queryInfo.orderBy;
    const isOrderByQuery = Array.isArray(sortOrders) && sortOrders.length > 0;
    this.continuationTokenManager = new ContinuationTokenManager(
      this.collectionLink,
      this.options.continuationToken,
      isOrderByQuery,
    );

    // Pick between Nonstreaming and streaming endpoints
    this.nonStreamingOrderBy = partitionedQueryExecutionInfo.queryInfo.hasNonStreamingOrderBy;

    // Check if this is a GROUP BY query
    const isGroupByQuery = 
      Object.keys(partitionedQueryExecutionInfo.queryInfo.groupByAliasToAggregateType).length > 0 ||
      partitionedQueryExecutionInfo.queryInfo.aggregates.length > 0 ||
      partitionedQueryExecutionInfo.queryInfo.groupByExpressions.length > 0;

    // Check if this is an unordered DISTINCT query
    const isUnorderedDistinctQuery = partitionedQueryExecutionInfo.queryInfo.distinctType === "Unordered";

    // Validate continuation token usage for unsupported query types
    // Note: OrderedDistinctEndpointComponent is supported, but UnorderedDistinctEndpointComponent
    // requires storing too much duplicate tracking data in continuation tokens
    if (this.options.continuationToken) {
      if (this.nonStreamingOrderBy) {
        throw new ErrorResponse(
          "Continuation tokens are not supported for non-streaming ORDER BY queries. " +
          "These queries must process all results to ensure correct ordering and cannot be resumed from an intermediate state. " +
          "Consider removing the continuation token and using fetchAll() instead for complete results."
        );
      }
      
      if (isGroupByQuery) {
        throw new ErrorResponse(
          "Continuation tokens are not supported for GROUP BY queries. " +
          "These queries must process all results to compute aggregations and cannot be resumed from an intermediate state. " +
          "Consider removing the continuation token and using fetchAll() instead for complete results."
        );
      }

      if (isUnorderedDistinctQuery) {
        throw new ErrorResponse(
          "Continuation tokens are not supported for unordered DISTINCT queries. " +
          "These queries require tracking large amounts of duplicate data in continuation tokens which is not practical. " +
          "Consider removing the continuation token and using fetchAll() instead, or use ordered DISTINCT queries which are supported."
        );
      }
    }

    // Pick between parallel vs order by execution context
    // TODO: Currently we don't get any field from backend to determine streaming queries
    if (this.nonStreamingOrderBy) {
      if (!options.allowUnboundedNonStreamingQueries) {
        this.checkQueryConstraints(partitionedQueryExecutionInfo.queryInfo);
      }

      this.vectorSearchBufferSize = this.calculateVectorSearchBufferSize(
        partitionedQueryExecutionInfo.queryInfo,
        options,
      );
      const maxBufferSize = options["vectorSearchBufferSize"]
        ? options["vectorSearchBufferSize"]
        : PipelinedQueryExecutionContext.DEFAULT_MAX_VECTOR_SEARCH_BUFFER_SIZE;

      if (this.vectorSearchBufferSize > maxBufferSize) {
        throw new ErrorResponse(
          `Executing a vector search query with TOP or OFFSET + LIMIT value ${this.vectorSearchBufferSize} larger than the vectorSearchBufferSize ${maxBufferSize} ` +
            `is not allowed`,
        );
      }

      const distinctType = partitionedQueryExecutionInfo.queryInfo.distinctType;
      
      // Note: Non-streaming queries don't support continuation tokens, so we don't create a shared manager
      const context: ExecutionContext = new ParallelQueryExecutionContext(
        this.clientContext,
        this.collectionLink,
        this.query,
        this.options, // Use original options without shared continuation token manager
        this.partitionedQueryExecutionInfo,
        correlatedActivityId,
      );

      if (distinctType === "None") {
        this.endpoint = new NonStreamingOrderByEndpointComponent(
          context,
          sortOrders,
          this.vectorSearchBufferSize,
          partitionedQueryExecutionInfo.queryInfo.offset,
          this.emitRawOrderByPayload,
        );
      } else {
        this.endpoint = new NonStreamingOrderByDistinctEndpointComponent(
          context,
          partitionedQueryExecutionInfo.queryInfo,
          this.vectorSearchBufferSize,
          this.emitRawOrderByPayload,
        );
      }
    } else {
      // Create shared continuation token manager for streaming execution contexts
      const sharedContinuationTokenManager = new ContinuationTokenManager(
        this.collectionLink,
        this.options.continuationToken,
        isOrderByQuery,
      );
      
      // Pass shared continuation token manager via options
      const optionsWithSharedManager = {
        ...this.options,
        continuationTokenManager: sharedContinuationTokenManager
      };

      if (Array.isArray(sortOrders) && sortOrders.length > 0) {
        // Need to wrap orderby execution context in endpoint component, since the data is nested as a \
        //      "payload" property.
        
        this.endpoint = new OrderByEndpointComponent(
          new OrderByQueryExecutionContext(
            this.clientContext,
            this.collectionLink,
            this.query,
            optionsWithSharedManager,
            this.partitionedQueryExecutionInfo,
            correlatedActivityId,
          ),
          this.emitRawOrderByPayload,
          optionsWithSharedManager,
        );
      } else {
        this.endpoint = new ParallelQueryExecutionContext(
          this.clientContext,
          this.collectionLink,
          this.query,
          optionsWithSharedManager,
          this.partitionedQueryExecutionInfo,
          correlatedActivityId,
        );
      }

      if (isGroupByQuery) {
        if (partitionedQueryExecutionInfo.queryInfo.hasSelectValue) {
          this.endpoint = new GroupByValueEndpointComponent(
            this.endpoint,
            partitionedQueryExecutionInfo.queryInfo,
          );
        } else {
          this.endpoint = new GroupByEndpointComponent(
            this.endpoint,
            partitionedQueryExecutionInfo.queryInfo,
          );
        }
      }

      // If distinct then add that to the pipeline
      const distinctType = partitionedQueryExecutionInfo.queryInfo.distinctType;
      if (distinctType === "Ordered") {
        this.endpoint = new OrderedDistinctEndpointComponent(this.endpoint, optionsWithSharedManager);
      }
      if (distinctType === "Unordered") {
        this.endpoint = new UnorderedDistinctEndpointComponent(this.endpoint);
      }

      // If top then add that to the pipeline. TOP N is effectively OFFSET 0 LIMIT N
      const top = partitionedQueryExecutionInfo.queryInfo.top;
      if (typeof top === "number") {
        this.endpoint = new OffsetLimitEndpointComponent(this.endpoint, 0, top, optionsWithSharedManager);
      }
      
      // If offset+limit then add that to the pipeline
      const limit = partitionedQueryExecutionInfo.queryInfo.limit;
      const offset = partitionedQueryExecutionInfo.queryInfo.offset;
      if (typeof limit === "number" && typeof offset === "number") {
        this.endpoint = new OffsetLimitEndpointComponent(this.endpoint, offset, limit, optionsWithSharedManager);
      }
    }
    this.fetchBuffer = [];
  }

  public hasMoreResults(): boolean {
    // For enableQueryControl mode, we have more results if:
    // 1. There are items in the fetch buffer, OR
    // 2. There are unprocessed ranges in the partition key range map, OR
    // 3. The endpoint has more results
    if (this.options.enableQueryControl) {
      const hasBufferedItems = this.fetchBuffer.length > 0;
      const hasUnprocessedRanges = this.continuationTokenManager.hasUnprocessedRanges();
      const endpointHasMore = this.endpoint.hasMoreResults();

      console.log("hasBufferedItems:", hasBufferedItems);
      console.log("hasUnprocessedRanges:", hasUnprocessedRanges);
      console.log("endpointHasMore:", endpointHasMore);

      const result = hasBufferedItems || hasUnprocessedRanges || endpointHasMore;
      console.log("hasMoreResults result:", result);
      console.log("=== END hasMoreResults DEBUG ===");

      return result;
    }

    // Default behavior for non-enableQueryControl mode
    const result = this.fetchBuffer.length !== 0 || this.endpoint.hasMoreResults();
    console.log("hasMoreResults (default mode) result:", result);
    console.log("=== END hasMoreResults DEBUG ===");
    return result;
  }
  // TODO: make contract of fetchMore to be consistent as other internal ones
  public async fetchMore(diagnosticNode: DiagnosticNodeInternal): Promise<Response<any>> {
    this.fetchMoreRespHeaders = getInitialHeader();
    console.log("fetchMore Options", this.options.enableQueryControl);
    if (this.options.enableQueryControl) {
      return this._enableQueryControlFetchMoreImplementation(diagnosticNode);
    }
    return this._fetchMoreImplementation(diagnosticNode);
  }

  private async _fetchMoreImplementation(
    diagnosticNode: DiagnosticNodeInternal,
  ): Promise<Response<any>> {
    try {
      if (this.fetchBuffer.length >= this.pageSize) {
        const temp = this.fetchBuffer.slice(0, this.pageSize);
        this.fetchBuffer = this.fetchBuffer.slice(this.pageSize);
        return { result: temp, headers: this.fetchMoreRespHeaders };
      } else {
        const response = await this.endpoint.fetchMore(diagnosticNode);
        let bufferedResults;

        // Handle both old format (just array) and new format (with buffer property)
        if (Array.isArray(response.result)) {
          // Old format - result is directly the array
          bufferedResults = response.result;
        } else {
          // New format - result has buffer property or handle undefined/null case
          bufferedResults = response.result;
        }

        mergeHeaders(this.fetchMoreRespHeaders, response.headers);
        if (
          response === undefined ||
          response.result === undefined ||
          bufferedResults === undefined
        ) {
          if (this.fetchBuffer.length > 0) {
            const temp = this.fetchBuffer;
            this.fetchBuffer = [];
            return { result: temp, headers: this.fetchMoreRespHeaders };
          } else {
            return { result: undefined, headers: this.fetchMoreRespHeaders };
          }
        }
        this.fetchBuffer.push(...bufferedResults);
        // TODO: This section can be removed
        // if (this.options.enableQueryControl) {
        //   if (this.fetchBuffer.length >= this.pageSize) {
        //     const temp = this.fetchBuffer.slice(0, this.pageSize);
        //     this.fetchBuffer = this.fetchBuffer.slice(this.pageSize);
        //     return { result: temp, headers: this.fetchMoreRespHeaders };
        //   } else {
        //     const temp = this.fetchBuffer;
        //     this.fetchBuffer = [];
        //     return { result: temp, headers: this.fetchMoreRespHeaders };
        //   }
        // }
        // Recursively fetch more results to ensure the pageSize number of results are returned
        // to maintain compatibility with the previous implementation
        return this._fetchMoreImplementation(diagnosticNode);
      }
    } catch (err: any) {
      mergeHeaders(this.fetchMoreRespHeaders, err.headers);
      err.headers = this.fetchMoreRespHeaders;
      if (err) {
        throw err;
      }
    }
  }

  private async _enableQueryControlFetchMoreImplementation(
    diagnosticNode: DiagnosticNodeInternal,
  ): Promise<Response<any>> {
    if (this.fetchBuffer.length > 0 && this.continuationTokenManager.hasUnprocessedRanges()) {
      const { endIndex, processedRanges } = this.fetchBufferEndIndexForCurrentPage();
      const temp = this.fetchBuffer.slice(0, endIndex);
      this.fetchBuffer = this.fetchBuffer.slice(endIndex);

      // Remove the processed ranges 
      this._clearProcessedRangeMetadata(processedRanges, endIndex);

      // TODO: instead of passing header add a method here to update the header
      this.continuationTokenManager.setContinuationTokenInHeaders(this.fetchMoreRespHeaders);

      return { result: temp, headers: this.fetchMoreRespHeaders };
    } else {
      this.fetchBuffer = [];
      const response = await this.endpoint.fetchMore(diagnosticNode);
      console.log("Fetched more results from endpoint", JSON.stringify(response));

      // Handle case where there are no more results from endpoint
      if (!response || !response.result) {
        return this.createEmptyResultWithHeaders(response?.headers);
      }

      // Process response and update continuation token manager
      this.fetchBuffer = response.result;
      if (this.fetchBuffer.length === 0) {
        return this.createEmptyResultWithHeaders(this.fetchMoreRespHeaders);
      }

      const { endIndex, processedRanges } = this.fetchBufferEndIndexForCurrentPage();

      const temp = this.fetchBuffer.slice(0, endIndex);
      this.fetchBuffer = this.fetchBuffer.slice(endIndex);
      this._clearProcessedRangeMetadata(processedRanges, endIndex);
      this.continuationTokenManager.setContinuationTokenInHeaders(this.fetchMoreRespHeaders);

      return { result: temp, headers: this.fetchMoreRespHeaders };
    }
  }

  private fetchBufferEndIndexForCurrentPage(): { endIndex: number; processedRanges: string[] } {
    if (this.fetchBuffer.length === 0) {
      return { endIndex: 0, processedRanges: [] };
    }
    const result = this.continuationTokenManager.processRangesForCurrentPage(
      this.pageSize,
      this.fetchBuffer.length,
      this.fetchBuffer.slice(0, this.fetchBuffer.length),
    );
    return result;
  }

  private _clearProcessedRangeMetadata(processedRanges: string[], endIndex: number): void {
    processedRanges.forEach((rangeId) => {
      this.continuationTokenManager.removePartitionRangeMapping(rangeId);
    });
    this.continuationTokenManager.sliceOrderByItemsArray(endIndex);
  }

  private createEmptyResultWithHeaders(headers?: CosmosHeaders): Response<any> {
    const hdrs = headers || getInitialHeader();
    this.continuationTokenManager.setContinuationTokenInHeaders(hdrs);
    return { result: [], headers: hdrs };
  }

  private calculateVectorSearchBufferSize(queryInfo: QueryInfo, options: FeedOptions): number {
    if (queryInfo.top === 0 || queryInfo.limit === 0) return 0;
    return queryInfo.top
      ? queryInfo.top
      : queryInfo.limit
        ? queryInfo.offset + queryInfo.limit
        : options["vectorSearchBufferSize"] && options["vectorSearchBufferSize"] > 0
          ? options["vectorSearchBufferSize"]
          : PipelinedQueryExecutionContext.DEFAULT_MAX_VECTOR_SEARCH_BUFFER_SIZE;
  }

  private checkQueryConstraints(queryInfo: QueryInfo): void {
    const hasTop = queryInfo.top || queryInfo.top === 0;
    const hasLimit = queryInfo.limit || queryInfo.limit === 0;
    if (!hasTop && !hasLimit) {
      throw new ErrorResponse(
        "Executing a non-streaming search query without TOP or LIMIT can consume a large number of RUs " +
          "very fast and have long runtimes. Please ensure you are using one of the above two filters " +
          "with your vector search query.",
      );
    }
    return;
  }
}
