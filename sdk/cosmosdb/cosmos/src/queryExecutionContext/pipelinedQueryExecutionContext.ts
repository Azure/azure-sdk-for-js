// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import type { ClientContext } from "../ClientContext.js";
import type { Response, FeedOptions } from "../request/index.js";
import type { PartitionedQueryExecutionInfo, QueryInfo } from "../request/ErrorResponse.js";
import { ErrorResponse } from "../request/ErrorResponse.js";
import { OffsetLimitEndpointComponent } from "./EndpointComponent/OffsetLimitEndpointComponent.js";
import { OrderByEndpointComponent } from "./EndpointComponent/OrderByEndpointComponent.js";
import { OrderedDistinctEndpointComponent } from "./EndpointComponent/OrderedDistinctEndpointComponent.js";
import { UnorderedDistinctEndpointComponent } from "./EndpointComponent/UnorderedDistinctEndpointComponent.js";
import { GroupByEndpointComponent } from "./EndpointComponent/GroupByEndpointComponent.js";
import type { ExecutionContext } from "./ExecutionContext.js";
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
import { QueryExecution } from "../common/constants.js";

/** @hidden */
export class PipelinedQueryExecutionContext implements ExecutionContext {
  private fetchBuffer: any[];
  private endpoint: ExecutionContext;
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
    // Validate that queryInfo is present in partitioned query execution info
    if (!partitionedQueryExecutionInfo.queryInfo) {
      throw new ErrorResponse(
        "Query execution requires valid query plan information. " +
          "The partitioned query execution info is missing queryInfo. " +
          "This may indicate an invalid query or a problem with query planning.",
      );
    }

    if (!this.options.maxItemCount) {
      this.options.maxItemCount = QueryExecution.DEFAULT_PAGE_SIZE;
    }
    const pageSize = this.options.maxItemCount;

    // Extract query information and characteristics
    const analyzedQueryInfo = this.analyzeQueryInfo(partitionedQueryExecutionInfo.queryInfo);
    const {
      sortOrders,
      nonStreamingOrderBy,
      isOrderByQuery,
      isGroupByQuery,
      isUnorderedDistinctQuery,
      querySupportsTokens,
    } = analyzedQueryInfo;

    // Reject continuation token usage for unsupported query types
    if (!querySupportsTokens) {
      rejectContinuationTokenForUnsupportedQueries(this.options.continuationToken, [
        QueryTypes.nonStreamingOrderBy(nonStreamingOrderBy),
        QueryTypes.groupBy(isGroupByQuery),
        QueryTypes.unorderedDistinct(isUnorderedDistinctQuery),
      ]);
    }

    // Parse continuation token fields once for reuse in pipeline construction
    const queryContinuationFields = this.options.continuationToken
      ? parseContinuationTokenFields(this.options.continuationToken)
      : undefined;

    // Pick between non-streaming vs streaming execution context
    this.endpoint = nonStreamingOrderBy
      ? this.createNonStreamingEndpoint(
          partitionedQueryExecutionInfo,
          sortOrders,
          correlatedActivityId,
          options,
        )
      : this.createStreamingEndpoint(
          partitionedQueryExecutionInfo,
          sortOrders,
          correlatedActivityId,
          isGroupByQuery,
          queryContinuationFields,
        );
    this.fetchBuffer = [];
    // Initialize the appropriate fetch implementation based on enableQueryControl
    if (this.options.enableQueryControl) {
      this.fetchImplementation = new QueryControlFetchImplementation(
        this.endpoint,
        pageSize,
        this.collectionLink,
        this.options.continuationToken,
        isOrderByQuery,
        querySupportsTokens,
      );
    } else {
      this.fetchImplementation = new LegacyFetchImplementation(this.endpoint, pageSize);
    }
  }

  public hasMoreResults(): boolean {
    return (this.fetchBuffer.length !== 0 || this.endpoint.hasMoreResults());
  }

  public async fetchMore(diagnosticNode: DiagnosticNodeInternal): Promise<Response<any>> {
    return this.fetchImplementation.fetchMore(diagnosticNode, this.fetchBuffer);
  }

  /**
   * Creates a non-streaming endpoint for vector search and similar queries that require buffering
   */
  private createNonStreamingEndpoint(
    partitionedQueryExecutionInfo: PartitionedQueryExecutionInfo,
    sortOrders: any[],
    correlatedActivityId: string,
    options: FeedOptions,
  ): ExecutionContext {
    const queryInfo = partitionedQueryExecutionInfo.queryInfo!; // Safe to use ! after validation in constructor

    if (!options.allowUnboundedNonStreamingQueries) {
      this.checkQueryConstraints(queryInfo);
    }

    const vectorSearchBufferSize = this.calculateVectorSearchBufferSize(queryInfo, options);

    this.validateVectorSearchBufferSize(vectorSearchBufferSize, options);

    const baseContext = new ParallelQueryExecutionContext(
      this.clientContext,
      this.collectionLink,
      this.query,
      this.options,
      this.partitionedQueryExecutionInfo,
      correlatedActivityId,
    );

    return this.wrapWithNonStreamingComponent(
      baseContext,
      queryInfo,
      sortOrders,
      vectorSearchBufferSize,
    );
  }

  /**
   * Creates a streaming endpoint with proper pipeline components
   */
  private createStreamingEndpoint(
    partitionedQueryExecutionInfo: PartitionedQueryExecutionInfo,
    sortOrders: any[],
    correlatedActivityId: string,
    isGroupByQuery: boolean,
    queryContinuationFields: any,
  ): ExecutionContext {
    const queryInfo = partitionedQueryExecutionInfo.queryInfo!; // Safe to use ! after validation in constructor

    // Create base execution context
    let endpoint = this.createBaseExecutionContext(
      partitionedQueryExecutionInfo,
      sortOrders,
      correlatedActivityId,
    );

    // Apply pipeline transformations
    endpoint = this.applyGroupByComponents(endpoint, queryInfo, isGroupByQuery);
    endpoint = this.applyDistinctComponents(endpoint, queryInfo, queryContinuationFields);
    endpoint = this.applyLimitComponents(endpoint, queryInfo, queryContinuationFields);

    return endpoint;
  }

  /**
   * Creates the base execution context (OrderBy or Parallel)
   */
  private createBaseExecutionContext(
    partitionedQueryExecutionInfo: PartitionedQueryExecutionInfo,
    sortOrders: any[],
    correlatedActivityId: string,
  ): ExecutionContext {
    if (Array.isArray(sortOrders) && sortOrders.length > 0) {
      // OrderBy queries need special wrapping for payload structure
      return new OrderByEndpointComponent(
        new OrderByQueryExecutionContext(
          this.clientContext,
          this.collectionLink,
          this.query,
          this.options,
          partitionedQueryExecutionInfo,
          correlatedActivityId,
        ),
        this.emitRawOrderByPayload,
      );
    }

    // Parallel queries
    return new ParallelQueryExecutionContext(
      this.clientContext,
      this.collectionLink,
      this.query,
      this.options,
      partitionedQueryExecutionInfo,
      correlatedActivityId,
    );
  }

  /**
   * Wraps base context with appropriate non-streaming component
   */
  private wrapWithNonStreamingComponent(
    baseContext: ExecutionContext,
    queryInfo: QueryInfo,
    sortOrders: any[],
    vectorSearchBufferSize: number,
  ): ExecutionContext {
    const distinctType = queryInfo.distinctType;

    if (distinctType === "None") {
      return new NonStreamingOrderByEndpointComponent(
        baseContext,
        sortOrders,
        vectorSearchBufferSize,
        queryInfo.offset,
        this.emitRawOrderByPayload,
      );
    }

    return new NonStreamingOrderByDistinctEndpointComponent(
      baseContext,
      queryInfo,
      vectorSearchBufferSize,
      this.emitRawOrderByPayload,
    );
  }

  /**
   * Applies GROUP BY components to the pipeline if needed
   */
  private applyGroupByComponents(
    endpoint: ExecutionContext,
    queryInfo: QueryInfo,
    isGroupByQuery: boolean,
  ): ExecutionContext {
    if (!isGroupByQuery) {
      return endpoint;
    }

    return queryInfo.hasSelectValue
      ? new GroupByValueEndpointComponent(endpoint, queryInfo)
      : new GroupByEndpointComponent(endpoint, queryInfo);
  }

  /**
   * Applies DISTINCT components to the pipeline if needed
   */
  private applyDistinctComponents(
    endpoint: ExecutionContext,
    queryInfo: QueryInfo,
    queryContinuationFields: any,
  ): ExecutionContext {
    const distinctType = queryInfo.distinctType;

    if (distinctType === "Ordered") {
      const lastHash = queryContinuationFields?.hashedLastResult;
      return new OrderedDistinctEndpointComponent(endpoint, lastHash);
    }

    if (distinctType === "Unordered") {
      return new UnorderedDistinctEndpointComponent(endpoint);
    }

    return endpoint;
  }

  /**
   * Applies TOP and OFFSET+LIMIT components to the pipeline if needed
   */
  private applyLimitComponents(
    endpoint: ExecutionContext,
    queryInfo: QueryInfo,
    queryContinuationFields: any,
  ): ExecutionContext {
    // Apply TOP component (TOP N is effectively OFFSET 0 LIMIT N)
    let top = queryInfo.top;
    if (typeof top === "number") {
      if (queryContinuationFields?.limit !== undefined) {
        top = queryContinuationFields.limit;
      }
      endpoint = new OffsetLimitEndpointComponent(endpoint, 0, top);
    }

    // Apply OFFSET+LIMIT component
    let limit = queryInfo.limit;
    let offset = queryInfo.offset;

    if (queryContinuationFields) {
      if (queryContinuationFields.limit !== undefined) {
        limit = queryContinuationFields.limit;
      }
      if (queryContinuationFields.offset !== undefined) {
        offset = queryContinuationFields.offset;
      }
    }

    if (typeof limit === "number" && typeof offset === "number") {
      endpoint = new OffsetLimitEndpointComponent(endpoint, offset, limit);
    }

    return endpoint;
  }

  /**
   * Validates vector search buffer size constraints
   */
  private validateVectorSearchBufferSize(
    vectorSearchBufferSize: number,
    options: FeedOptions,
  ): void {
    const maxBufferSize = options["vectorSearchBufferSize"]
      ? options["vectorSearchBufferSize"]
      : QueryExecution.DEFAULT_MAX_VECTOR_SEARCH_BUFFER_SIZE;

    if (vectorSearchBufferSize > maxBufferSize) {
      throw new ErrorResponse(
        `Executing a vector search query with TOP or OFFSET + LIMIT value ${vectorSearchBufferSize} larger than the vectorSearchBufferSize ${maxBufferSize} ` +
          `is not allowed`,
      );
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
          : QueryExecution.DEFAULT_MAX_VECTOR_SEARCH_BUFFER_SIZE;
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

  /**
   * Analyzes query information and extracts key characteristics for query execution planning
   */
  private analyzeQueryInfo(queryInfo: QueryInfo) {
    const sortOrders = queryInfo.orderBy;
    const nonStreamingOrderBy = queryInfo.hasNonStreamingOrderBy;
    const isOrderByQuery = Array.isArray(sortOrders) && sortOrders.length > 0;

    // Check if this is a GROUP BY query
    const isGroupByQuery =
      Object.keys(queryInfo.groupByAliasToAggregateType || {}).length > 0 ||
      (queryInfo.aggregates?.length || 0) > 0 ||
      (queryInfo.groupByExpressions?.length || 0) > 0;

    // Check if this is an unordered DISTINCT query
    const isUnorderedDistinctQuery = queryInfo.distinctType === "Unordered";

    // Determine if this query type supports continuation tokens
    const querySupportsTokens =
      !isUnorderedDistinctQuery && !isGroupByQuery && !nonStreamingOrderBy;

    return {
      sortOrders,
      nonStreamingOrderBy,
      isOrderByQuery,
      isGroupByQuery,
      isUnorderedDistinctQuery,
      querySupportsTokens,
    };
  }
}
