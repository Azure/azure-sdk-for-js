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
import { getInitialHeader } from "./headerUtils.js";
import { OrderByQueryExecutionContext } from "./orderByQueryExecutionContext.js";
import { ParallelQueryExecutionContext } from "./parallelQueryExecutionContext.js";
import { GroupByValueEndpointComponent } from "./EndpointComponent/GroupByValueEndpointComponent.js";
import type { SqlQuerySpec } from "./SqlQuerySpec.js";
import type { DiagnosticNodeInternal } from "../diagnostics/DiagnosticNodeInternal.js";
import { NonStreamingOrderByDistinctEndpointComponent } from "./EndpointComponent/NonStreamingOrderByDistinctEndpointComponent.js";
import { NonStreamingOrderByEndpointComponent } from "./EndpointComponent/NonStreamingOrderByEndpointComponent.js";
import {
  rejectContinuationTokenForUnsupportedQueries,
  QueryTypes,
} from "./QueryValidationHelper.js";
import { parseContinuationTokenFields } from "./ContinuationTokenParser.js";
import { LegacyFetchImplementation } from "./LegacyFetchImplementation.js";
import { QueryControlFetchImplementation } from "./QueryControlFetchImplementation.js";

/** @hidden */
export class PipelinedQueryExecutionContext implements ExecutionContext {
  public fetchBuffer: any[];
  public fetchMoreRespHeaders: CosmosHeaders;
  public endpoint: ExecutionContext;
  public pageSize: number;
  private vectorSearchBufferSize: number = 0;
  private static DEFAULT_PAGE_SIZE = 10;
  private static DEFAULT_MAX_VECTOR_SEARCH_BUFFER_SIZE = 50000;
  private nonStreamingOrderBy = false;
  private readonly querySupportsTokens: boolean;
  private readonly isOrderByQuery: boolean;
  private readonly fetchImplementation: LegacyFetchImplementation | QueryControlFetchImplementation;

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
    if (!this.options.maxItemCount) {
      this.options.maxItemCount = PipelinedQueryExecutionContext.DEFAULT_PAGE_SIZE;
    }
    this.pageSize = this.options.maxItemCount;

    const sortOrders = partitionedQueryExecutionInfo.queryInfo!.orderBy;
    const isOrderByQuery = Array.isArray(sortOrders) && sortOrders.length > 0;
    this.isOrderByQuery = isOrderByQuery;

    // Pick between Nonstreaming and streaming endpoints
    this.nonStreamingOrderBy = partitionedQueryExecutionInfo.queryInfo!.hasNonStreamingOrderBy;

    // Check if this is a GROUP BY query
    const isGroupByQuery =
      Object.keys(partitionedQueryExecutionInfo.queryInfo!.groupByAliasToAggregateType).length >
        0 ||
      partitionedQueryExecutionInfo.queryInfo!.aggregates!.length > 0 ||
      partitionedQueryExecutionInfo.queryInfo!.groupByExpressions!.length > 0;

    // Check if this is an unordered DISTINCT query
    const isUnorderedDistinctQuery =
      partitionedQueryExecutionInfo.queryInfo!.distinctType === "Unordered";

    // Determine if this query type supports continuation tokens
    const querySupportsTokens =
      !isUnorderedDistinctQuery && !isGroupByQuery && !this.nonStreamingOrderBy;
    this.querySupportsTokens = querySupportsTokens;

    // Reject continuation token usage for unsupported query types
    if (!querySupportsTokens) {
      rejectContinuationTokenForUnsupportedQueries(this.options.continuationToken, [
        QueryTypes.nonStreamingOrderBy(this.nonStreamingOrderBy),
        QueryTypes.groupBy(isGroupByQuery),
        QueryTypes.unorderedDistinct(isUnorderedDistinctQuery),
      ]);
    }

    // Note: Continuation token manager will be created lazily when we get the first response

    // Parse continuation token fields once for reuse in pipeline construction
    const queryContinuationFields = this.options.continuationToken
      ? parseContinuationTokenFields(this.options.continuationToken)
      : undefined;

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
      if (Array.isArray(sortOrders) && sortOrders.length > 0) {
        // Need to wrap orderby execution context in endpoint component, since the data is nested as a
        //     "payload" property.

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
        let lastHash;
        if (queryContinuationFields) {
          lastHash = queryContinuationFields.hashedLastResult;
        }
        this.endpoint = new OrderedDistinctEndpointComponent(this.endpoint, lastHash);
      }
      if (distinctType === "Unordered") {
        this.endpoint = new UnorderedDistinctEndpointComponent(this.endpoint);
      }

      // If top then add that to the pipeline. TOP N is effectively OFFSET 0 LIMIT N
      let top = partitionedQueryExecutionInfo.queryInfo.top;
      if (typeof top === "number") {
        if (queryContinuationFields) {
          if (queryContinuationFields.limit !== undefined) {
            top = queryContinuationFields.limit;
          }
        }
        this.endpoint = new OffsetLimitEndpointComponent(this.endpoint, 0, top);
      }

      // If offset+limit then add that to the pipeline
      // Check continuation token manager first, then fall back to query info
      let limit = partitionedQueryExecutionInfo.queryInfo.limit;
      let offset = partitionedQueryExecutionInfo.queryInfo.offset;

      if (queryContinuationFields) {
        if (queryContinuationFields.limit !== undefined) {
          limit = queryContinuationFields.limit;
        }
        if (queryContinuationFields.offset !== undefined) {
          offset = queryContinuationFields.offset;
        }
      }

      if (typeof limit === "number" && typeof offset === "number") {
        this.endpoint = new OffsetLimitEndpointComponent(this.endpoint, offset, limit);
      }
    }
    this.fetchBuffer = [];

    // Initialize the appropriate fetch implementation based on enableQueryControl
    if (this.options.enableQueryControl) {
      this.fetchImplementation = new QueryControlFetchImplementation(
        this,
        this.collectionLink,
        this.options.continuationToken,
        this.isOrderByQuery,
        this.querySupportsTokens,
      );
    } else {
      this.fetchImplementation = new LegacyFetchImplementation(this);
    }
  }

  public hasMoreResults(): boolean {
    const bufferHasItems = this.fetchBuffer.length !== 0;
    const endpointHasMore = this.endpoint.hasMoreResults();
    const result = bufferHasItems || endpointHasMore;

    return result;
  }

  public async fetchMore(diagnosticNode: DiagnosticNodeInternal): Promise<Response<any>> {
    this.fetchMoreRespHeaders = getInitialHeader();
    return this.fetchImplementation.fetchMore(diagnosticNode);
  }

  public createEmptyResult(headers?: CosmosHeaders): Response<any> {
    const hdrs = headers || getInitialHeader();
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
