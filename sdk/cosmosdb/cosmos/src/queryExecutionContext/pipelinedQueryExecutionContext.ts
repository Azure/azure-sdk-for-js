import {
  HeaderUtils,
  IExecutionContext,
  IHeaders,
  OrderByQueryExecutionContext,
  ParallelQueryExecutionContext,
  PartitionedQueryExecutionContextInfo,
  PartitionedQueryExecutionContextInfoParser
} from ".";
import { ClientContext } from "../ClientContext";
import { Response } from "../request/request";
import {
  AggregateEndpointComponent,
  IEndpointComponent,
  OrderByEndpointComponent,
  TopEndpointComponent
} from "./EndpointComponent";

/** @hidden */
export class PipelinedQueryExecutionContext implements IExecutionContext {
  private fetchBuffer: any[];
  private fetchMoreRespHeaders: IHeaders;
  private endpoint: IEndpointComponent;
  private pageSize: number;
  private static DEFAULT_PAGE_SIZE = 10;
  constructor(
    private clientContext: ClientContext,
    private collectionLink: string,
    private query: any, // TODO: any query
    private options: any, // TODO: any options
    private partitionedQueryExecutionInfo: PartitionedQueryExecutionContextInfo
  ) {
    this.endpoint = null;
    this.pageSize = options["maxItemCount"];
    if (this.pageSize === undefined) {
      this.pageSize = PipelinedQueryExecutionContext.DEFAULT_PAGE_SIZE;
    }

    // Pick between parallel vs order by execution context
    const sortOrders = PartitionedQueryExecutionContextInfoParser.parseOrderBy(partitionedQueryExecutionInfo);
    if (Array.isArray(sortOrders) && sortOrders.length > 0) {
      // Need to wrap orderby execution context in endpoint component, since the data is nested as a \
      //      "payload" property.
      this.endpoint = new OrderByEndpointComponent(
        new OrderByQueryExecutionContext(
          this.clientContext,
          this.collectionLink,
          this.query,
          this.options,
          this.partitionedQueryExecutionInfo
        )
      );
    } else {
      this.endpoint = new ParallelQueryExecutionContext(
        this.clientContext,
        this.collectionLink,
        this.query,
        this.options,
        this.partitionedQueryExecutionInfo
      );
    }

    // If aggregate then add that to the pipeline
    const aggregates = PartitionedQueryExecutionContextInfoParser.parseAggregates(partitionedQueryExecutionInfo);
    if (Array.isArray(aggregates) && aggregates.length > 0) {
      this.endpoint = new AggregateEndpointComponent(this.endpoint, aggregates);
    }

    // If top then add that to the pipeline
    const top = PartitionedQueryExecutionContextInfoParser.parseTop(partitionedQueryExecutionInfo);
    if (typeof top === "number") {
      this.endpoint = new TopEndpointComponent(this.endpoint, top);
    }
  }

  public async nextItem(): Promise<Response<any>> {
    return this.endpoint.nextItem();
  }

  public async current(): Promise<Response<any>> {
    return this.endpoint.current();
  }

  // Removed callback here beacuse it wouldn't have ever worked...
  public hasMoreResults(): boolean {
    return this.endpoint.hasMoreResults();
  }

  public async fetchMore(): Promise<Response<any>> {
    // if the wrapped endpoint has different implementation for fetchMore use that
    // otherwise use the default implementation
    if (typeof this.endpoint.fetchMore === "function") {
      return this.endpoint.fetchMore();
    } else {
      this.fetchBuffer = [];
      this.fetchMoreRespHeaders = HeaderUtils.getInitialHeader();
      return this._fetchMoreImplementation();
    }
  }

  private async _fetchMoreImplementation(): Promise<Response<any>> {
    try {
      const { result: item, headers } = await this.endpoint.nextItem();
      HeaderUtils.mergeHeaders(this.fetchMoreRespHeaders, headers);
      if (item === undefined) {
        // no more results
        if (this.fetchBuffer.length === 0) {
          return {
            result: undefined,
            headers: this.fetchMoreRespHeaders
          };
        } else {
          // Just give what we have
          const temp = this.fetchBuffer;
          this.fetchBuffer = [];
          return { result: temp, headers: this.fetchMoreRespHeaders };
        }
      } else {
        // append the result
        this.fetchBuffer.push(item);
        if (this.fetchBuffer.length >= this.pageSize) {
          // fetched enough results
          const temp = this.fetchBuffer.slice(0, this.pageSize);
          this.fetchBuffer = this.fetchBuffer.splice(this.pageSize);
          return { result: temp, headers: this.fetchMoreRespHeaders };
        } else {
          // recursively fetch more
          // TODO: is recursion a good idea?
          return this._fetchMoreImplementation();
        }
      }
    } catch (err) {
      HeaderUtils.mergeHeaders(this.fetchMoreRespHeaders, err.headers);
      err.headers = this.fetchMoreRespHeaders;
      if (err) {
        throw err;
      }
    }
  }
}
