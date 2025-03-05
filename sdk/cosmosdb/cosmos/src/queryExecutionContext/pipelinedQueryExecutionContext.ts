// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import type { ClientContext } from "../ClientContext";
import type { Response, FeedOptions } from "../request";
import type { PartitionedQueryExecutionInfo, QueryInfo } from "../request/ErrorResponse";
import { ErrorResponse } from "../request/ErrorResponse";
import type { CosmosHeaders } from "./CosmosHeaders";
import { OffsetLimitEndpointComponent } from "./EndpointComponent/OffsetLimitEndpointComponent";
import { OrderByEndpointComponent } from "./EndpointComponent/OrderByEndpointComponent";
import { OrderedDistinctEndpointComponent } from "./EndpointComponent/OrderedDistinctEndpointComponent";
import { UnorderedDistinctEndpointComponent } from "./EndpointComponent/UnorderedDistinctEndpointComponent";
import { GroupByEndpointComponent } from "./EndpointComponent/GroupByEndpointComponent";
import type { ExecutionContext } from "./ExecutionContext";
import { getInitialHeader, mergeHeaders } from "./headerUtils";
import { OrderByQueryExecutionContext } from "./orderByQueryExecutionContext";
import { ParallelQueryExecutionContext } from "./parallelQueryExecutionContext";
import { GroupByValueEndpointComponent } from "./EndpointComponent/GroupByValueEndpointComponent";
import type { SqlQuerySpec } from "./SqlQuerySpec";
import type { DiagnosticNodeInternal } from "../diagnostics/DiagnosticNodeInternal";
import { NonStreamingOrderByDistinctEndpointComponent } from "./EndpointComponent/NonStreamingOrderByDistinctEndpointComponent";
import { NonStreamingOrderByEndpointComponent } from "./EndpointComponent/NonStreamingOrderByEndpointComponent";

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
  }

  public hasMoreResults(): boolean {
    return this.fetchBuffer.length !== 0 || this.endpoint.hasMoreResults();
  }

  public async fetchMore(diagnosticNode: DiagnosticNodeInternal): Promise<Response<any>> {
    this.fetchMoreRespHeaders = getInitialHeader();
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
        mergeHeaders(this.fetchMoreRespHeaders, response.headers);
        if (response === undefined || response.result === undefined) {
          if (this.fetchBuffer.length > 0) {
            const temp = this.fetchBuffer;
            this.fetchBuffer = [];
            return { result: temp, headers: this.fetchMoreRespHeaders };
          } else {
            return { result: undefined, headers: this.fetchMoreRespHeaders };
          }
        }
        this.fetchBuffer.push(...response.result);

        if (this.options.enableQueryControl) {
          if (this.fetchBuffer.length >= this.pageSize) {
            const temp = this.fetchBuffer.slice(0, this.pageSize);
            this.fetchBuffer = this.fetchBuffer.slice(this.pageSize);
            return { result: temp, headers: this.fetchMoreRespHeaders };
          } else {
            const temp = this.fetchBuffer;
            this.fetchBuffer = [];
            return { result: temp, headers: this.fetchMoreRespHeaders };
          }
        }
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
