// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { ClientContext } from "../ClientContext";
import { Response, FeedOptions, QueryOperationOptions } from "../request";
import {
  PartitionedQueryExecutionInfo,
  QueryInfo,
  // nonStreamingEndpointEmptyResult,
} from "../request/ErrorResponse";
import { CosmosHeaders } from "./CosmosHeaders";
import { OffsetLimitEndpointComponent } from "./EndpointComponent/OffsetLimitEndpointComponent";
import { OrderByEndpointComponent } from "./EndpointComponent/OrderByEndpointComponent";
import { OrderedDistinctEndpointComponent } from "./EndpointComponent/OrderedDistinctEndpointComponent";
import { UnorderedDistinctEndpointComponent } from "./EndpointComponent/UnorderedDistinctEndpointComponent";
import { GroupByEndpointComponent } from "./EndpointComponent/GroupByEndpointComponent";
import { ExecutionContext } from "./ExecutionContext";
import { getInitialHeader, mergeHeaders } from "./headerUtils";
import { OrderByQueryExecutionContext } from "./orderByQueryExecutionContext";
import { ParallelQueryExecutionContext } from "./parallelQueryExecutionContext";
import { GroupByValueEndpointComponent } from "./EndpointComponent/GroupByValueEndpointComponent";
import { SqlQuerySpec } from "./SqlQuerySpec";
import { DiagnosticNodeInternal } from "../diagnostics/DiagnosticNodeInternal";
import { RUCapPerOperationExceededErrorCode } from "../request/RUCapPerOperationExceededError";
import { RUConsumedManager } from "../common";
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
  private static DEFAULT_VECTOR_SEARCH_BUFFER_SIZE = 2000;
  private nonStreamingOrderBy = false;

  constructor(
    private clientContext: ClientContext,
    private collectionLink: string,
    private query: string | SqlQuerySpec,
    private options: FeedOptions,
    private partitionedQueryExecutionInfo: PartitionedQueryExecutionInfo,
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

    if (this.nonStreamingOrderBy) {
      this.vectorSearchBufferSize = this.calculateVectorSearchBufferSize(
        partitionedQueryExecutionInfo.queryInfo,
      );

      //TODO: if non order by, throw error.
      const distinctType = partitionedQueryExecutionInfo.queryInfo.distinctType;
      const context: ExecutionContext = new ParallelQueryExecutionContext(
        this.clientContext,
        this.collectionLink,
        this.query,
        this.options,
        this.partitionedQueryExecutionInfo,
      );

      if (distinctType === "None") {
        this.endpoint = new NonStreamingOrderByEndpointComponent(context, sortOrders);
      } else {
        this.endpoint = new NonStreamingOrderByDistinctEndpointComponent(
          context,
          partitionedQueryExecutionInfo.queryInfo,
          this.vectorSearchBufferSize,
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

      // If distinct then add that to the pipeline
      const distinctType = partitionedQueryExecutionInfo.queryInfo.distinctType;
      if (distinctType === "Ordered") {
        this.endpoint = new OrderedDistinctEndpointComponent(this.endpoint);
      }
      if (distinctType === "Unordered") {
        this.endpoint = new UnorderedDistinctEndpointComponent(this.endpoint);
      }
    }
  }

  public async nextItem(
    diagnosticNode: DiagnosticNodeInternal,
    operationOptions?: QueryOperationOptions,
    ruConsumedManager?: RUConsumedManager,
  ): Promise<Response<any>> {
    return this.endpoint.nextItem(diagnosticNode, operationOptions, ruConsumedManager);
  }

  // Removed callback here beacuse it wouldn't have ever worked...
  public hasMoreResults(): boolean {
    return this.endpoint.hasMoreResults();
  }

  public async fetchMore(
    diagnosticNode: DiagnosticNodeInternal,
    operationOptions?: QueryOperationOptions,
    ruConsumedManager?: RUConsumedManager,
  ): Promise<Response<any>> {
    // if the wrapped endpoint has different implementation for fetchMore use that
    // otherwise use the default implementation
    if (typeof this.endpoint.fetchMore === "function") {
      return this.endpoint.fetchMore(diagnosticNode, operationOptions, ruConsumedManager);
    } else {
      this.fetchBuffer = [];
      this.fetchMoreRespHeaders = getInitialHeader();
      return this.nonStreamingOrderBy
        ? this._nonStreamingFetchMoreImplementation(
            diagnosticNode,
            operationOptions,
            ruConsumedManager,
          )
        : this._fetchMoreImplementation(diagnosticNode, operationOptions, ruConsumedManager);
    }
  }

  private async _fetchMoreImplementation(
    diagnosticNode: DiagnosticNodeInternal,
    operationOptions?: QueryOperationOptions,
    ruConsumedManager?: RUConsumedManager,
  ): Promise<Response<any>> {
    try {
      const { result: item, headers } = await this.endpoint.nextItem(
        diagnosticNode,
        operationOptions,
        ruConsumedManager,
      );
      mergeHeaders(this.fetchMoreRespHeaders, headers);
      if (item === undefined) {
        // no more results
        if (this.fetchBuffer.length === 0) {
          return {
            result: undefined,
            headers: this.fetchMoreRespHeaders,
          };
        } else {
          // Just give what we have
          const temp = this.fetchBuffer;
          this.fetchBuffer = [];
          return { result: temp, headers: this.fetchMoreRespHeaders };
        }
      } else {
        if (Object.keys(item).length !== 0) {
          // discard empty JSON and append the result
          this.fetchBuffer.push(item);
        }
        if (this.fetchBuffer.length >= this.pageSize) {
          // fetched enough results
          const temp = this.fetchBuffer.slice(0, this.pageSize);
          this.fetchBuffer = this.fetchBuffer.splice(this.pageSize);
          return { result: temp, headers: this.fetchMoreRespHeaders };
        } else {
          // recursively fetch more
          // TODO: is recursion a good idea?
          return this._fetchMoreImplementation(diagnosticNode, operationOptions, ruConsumedManager);
        }
      }
    } catch (err: any) {
      mergeHeaders(this.fetchMoreRespHeaders, err.headers);
      err.headers = this.fetchMoreRespHeaders;
      if (err.code === RUCapPerOperationExceededErrorCode && err.fetchedResults) {
        err.fetchedResults.push(...this.fetchBuffer);
      }
      if (err) {
        throw err;
      }
    }
  }

  private async _nonStreamingFetchMoreImplementation(
    diagnosticNode: DiagnosticNodeInternal,
    operationOptions?: QueryOperationOptions,
    ruConsumedManager?: RUConsumedManager,
  ): Promise<Response<any>> {
    try {
      const { result: item, headers } = await this.endpoint.nextItem(
        diagnosticNode,
        operationOptions,
        ruConsumedManager,
      );
      mergeHeaders(this.fetchMoreRespHeaders, headers);
      if (item === undefined) {
        // no more results
        if (this.fetchBuffer.length === 0) {
          return {
            result: undefined,
            headers: this.fetchMoreRespHeaders,
          };
        } else {
          // Just give what we have
          const temp = this.fetchBuffer;
          this.fetchBuffer = [];
          return { result: temp, headers: this.fetchMoreRespHeaders };
        }
      } else {
        // append the result
        const ruConsumed = await ruConsumedManager.getRUConsumed();
        if (Object.keys(item).length !== 0) this.fetchBuffer.push(item);
        if (this.fetchBuffer.length >= this.pageSize) {
          // fetched enough results
          const temp = this.fetchBuffer.slice(0, this.pageSize);
          this.fetchBuffer = this.fetchBuffer.splice(this.pageSize);
          return { result: temp, headers: this.fetchMoreRespHeaders };
        } else if (ruConsumed * 2 < operationOptions.ruCapPerOperation) {
          // recursively fetch more only if we have more than 50% RUs left.
          return this._nonStreamingFetchMoreImplementation(
            diagnosticNode,
            operationOptions,
            ruConsumedManager,
          );
        } else {
          console.log("we are in else");
          return { result: [], headers: this.fetchMoreRespHeaders };
        }
      }
    } catch (err: any) {
      mergeHeaders(this.fetchMoreRespHeaders, err.headers);
      err.headers = this.fetchMoreRespHeaders;
      if (err.code === RUCapPerOperationExceededErrorCode && err.fetchedResults) {
        err.fetchedResults.push(...this.fetchBuffer);
      }
      if (err) {
        throw err;
      }
    }
  }

  private calculateVectorSearchBufferSize(queryInfo: QueryInfo): number {
    return queryInfo.top
      ? queryInfo.top
      : queryInfo.offset && queryInfo.limit
        ? queryInfo.offset + queryInfo.limit
        : PipelinedQueryExecutionContext.DEFAULT_VECTOR_SEARCH_BUFFER_SIZE;
  }
}
