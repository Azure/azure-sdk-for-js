// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import type { ClientContext } from "../ClientContext.js";
import type { Response, FeedOptions } from "../request/index.js";
import type { PartitionedQueryExecutionInfo, QueryInfo } from "../request/ErrorResponse.js";
import { ErrorResponse } from "../request/ErrorResponse.js";
import type { CosmosHeaders } from "./CosmosHeaders.js";
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
import type { QueryRangeMapping } from "./QueryRangeMapping.js";
import { Constants } from "../common/index.js";

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
    // Pick between Nonstreaming and streaming endpoints
    this.nonStreamingOrderBy = partitionedQueryExecutionInfo.queryInfo.hasNonStreamingOrderBy;

    // Pick between parallel vs order by execution context
    const sortOrders = partitionedQueryExecutionInfo.queryInfo.orderBy;
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
      const context: ExecutionContext = new ParallelQueryExecutionContext(
        this.clientContext,
        this.collectionLink,
        this.query,
        this.options,
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
      if (Array.isArray(sortOrders) && sortOrders.length > 0) {
        // Need to wrap orderby execution context in endpoint component, since the data is nested as a \
        //      "payload" property.
        this.endpoint = new OrderByEndpointComponent(
          new OrderByQueryExecutionContext(
            this.clientContext,
            this.collectionLink,
            this.query,
            this.options,
            this.partitionedQueryExecutionInfo,
            correlatedActivityId,
          ),
          this.emitRawOrderByPayload,
        );
      } else {
        this.endpoint = new ParallelQueryExecutionContext(
          this.clientContext,
          this.collectionLink,
          this.query,
          this.options,
          this.partitionedQueryExecutionInfo,
          correlatedActivityId,
        );
      }
      if (
        Object.keys(partitionedQueryExecutionInfo.queryInfo.groupByAliasToAggregateType).length >
          0 ||
        partitionedQueryExecutionInfo.queryInfo.aggregates.length > 0 ||
        partitionedQueryExecutionInfo.queryInfo.groupByExpressions.length > 0
      ) {
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
        this.endpoint = new OrderedDistinctEndpointComponent(this.endpoint);
      }
      if (distinctType === "Unordered") {
        this.endpoint = new UnorderedDistinctEndpointComponent(this.endpoint);
      }

      // If top then add that to the pipeline. TOP N is effectively OFFSET 0 LIMIT N
      const top = partitionedQueryExecutionInfo.queryInfo.top;
      if (typeof top === "number") {
        this.endpoint = new OffsetLimitEndpointComponent(this.endpoint, 0, top);
      }

      // If offset+limit then add that to the pipeline
      const limit = partitionedQueryExecutionInfo.queryInfo.limit;
      const offset = partitionedQueryExecutionInfo.queryInfo.offset;
      if (typeof limit === "number" && typeof offset === "number") {
        this.endpoint = new OffsetLimitEndpointComponent(this.endpoint, offset, limit);
      }
    }
    this.fetchBuffer = [];

    // Detect if this is an ORDER BY query for continuation token management
    const isOrderByQuery = Array.isArray(sortOrders) && sortOrders.length > 0;

    // Initialize continuation token manager with ORDER BY awareness
    this.continuationTokenManager = new ContinuationTokenManager(
      this.collectionLink,
      this.options.continuationToken,
      isOrderByQuery,
    );
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
        } else if (response.result && response.result.buffer) {
          // New format - result has buffer property
          bufferedResults = response.result.buffer;
        } else {
          // Handle undefined/null case
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
      this.clearProcessedRangeMetadata(processedRanges, endIndex);

      // Update headers before returning processed page
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
      if (!this.processEndpointResponse(response)) {
        return this.createEmptyResultWithHeaders(response.headers);
      }

      // Return empty result if no items were buffered
      if (this.fetchBuffer.length === 0) {
        return this.createEmptyResultWithHeaders(this.fetchMoreRespHeaders);
      }

      const { endIndex, processedRanges } = this.fetchBufferEndIndexForCurrentPage();

      const temp = this.fetchBuffer.slice(0, endIndex);
      this.fetchBuffer = this.fetchBuffer.slice(endIndex);
      this.clearProcessedRangeMetadata(processedRanges, endIndex);
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

  // TODO: move it continuation token manager and delete it once end index is returned
  // don't wait for buffer to be sliced as we are updating the coninuation token too
  private clearProcessedRangeMetadata(processedRanges: string[], endIndex: number): void {
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

  private processEndpointResponse(response: Response<any>): boolean {
    if (response.result.buffer) {
      // Update the token manager with the new partition key range map
      this.fetchBuffer = response.result.buffer;
      if (response.result.partitionKeyRangeMap) {
        this.continuationTokenManager.setPartitionKeyRangeMap(response.result.partitionKeyRangeMap);
      }
      // Capture order by items array for ORDER BY queries if available
      if (response.result.orderByItemsArray) {
        this.continuationTokenManager.setOrderByItemsArray(response.result.orderByItemsArray);
      }
      // Capture offset and limit values from the response
      if (response.result.offset !== undefined || response.result.limit !== undefined) {
        this.continuationTokenManager.updateOffsetLimit(response.result.offset, response.result.limit);
      }
      return true;
    } else {
      // Unexpected format; still attempt to attach continuation header (likely none)
      this.continuationTokenManager.setContinuationTokenInHeaders(response.headers);
      return false;
    }
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
