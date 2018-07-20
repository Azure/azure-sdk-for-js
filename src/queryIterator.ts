import { DocumentClient } from "./documentclient";
import {
  FetchFunctionCallback,
  IExecutionContext,
  IHeaders,
  ProxyQueryExecutionContext,
  SqlQuerySpec
} from "./queryExecutionContext";
import { FeedOptions } from "./request/FeedOptions";
import { Response } from "./request/request";

/**
 * Represents a QueryIterator Object, an implmenetation of feed or query response that enables
 * traversal and iterating over the response
 * in the Azure Cosmos DB database service.
 */
export class QueryIterator<T> {
  private toArrayTempResources: T[]; // TODO
  private toArrayLastResHeaders: IHeaders;
  private queryExecutionContext: IExecutionContext;
  /**
   * @hidden
   */
  constructor(
    private documentclient: DocumentClient,
    private query: SqlQuerySpec | string,
    private options: FeedOptions, // TODO: any options
    private fetchFunctions: FetchFunctionCallback | FetchFunctionCallback[],
    private resourceLink?: string | string[]
  ) {
    this.documentclient = documentclient;
    this.query = query;
    this.fetchFunctions = fetchFunctions;
    this.options = options;
    this.resourceLink = resourceLink;
    this.queryExecutionContext = this._createQueryExecutionContext();
  }
  /**
   * Execute a provided function once per feed element.
   */
  public async *forEach(): AsyncIterable<Response<T>> {
    this.reset();
    while (this.queryExecutionContext.hasMoreResults()) {
      const result = await this.queryExecutionContext.nextItem();
      if (result.result === undefined) {
        return;
      }
      yield result;
    }
  }

  /**
   * Execute a provided function on the next element in the QueryIterator.
   */
  public async nextItem(): Promise<Response<T>> {
    return this.queryExecutionContext.nextItem();
  }

  /**
   * Retrieve the current element on the QueryIterator.
   */
  public async current(): Promise<Response<T>> {
    return this.queryExecutionContext.current();
  }

  // TODO: why is has more results deprecated?
  /**
   * @deprecated Instead check if nextItem() or current() returns undefined.
   *
   * Determine if there are still remaining resources to processs based on the value of the continuation token or the\
   * elements remaining on the current batch in the QueryIterator.
   * @returns {Boolean} true if there is other elements to process in the QueryIterator.
   */
  public hasMoreResults(): boolean {
    return this.queryExecutionContext.hasMoreResults();
  }

  /**
   * Retrieve all the elements of the feed and pass them as an array to a function
   */
  public async toArray(): Promise<Response<T[]>> {
    if (arguments.length !== 0) {
      throw new Error("toArray takes no arguments");
    }
    this.reset();
    this.toArrayTempResources = [];
    return this._toArrayImplementation();
  }

  /**
   * Retrieve the next batch of the feed and pass them as an array to a function
   */
  public async executeNext(): Promise<Response<T>> {
    return this.queryExecutionContext.fetchMore();
  }

  /**
   * Reset the QueryIterator to the beginning and clear all the resources inside it
   */
  public reset() {
    this.queryExecutionContext = this._createQueryExecutionContext();
  }

  private async _toArrayImplementation(): Promise<Response<T[]>> {
    while (this.queryExecutionContext.hasMoreResults()) {
      const { result, headers } = await this.queryExecutionContext.nextItem();
      // concatinate the results and fetch more
      this.toArrayLastResHeaders = headers;

      if (result === undefined) {
        // no more results
        break;
      }

      this.toArrayTempResources.push(result);
    }
    return {
      result: this.toArrayTempResources,
      headers: this.toArrayLastResHeaders
    };
  }

  private _createQueryExecutionContext() {
    return new ProxyQueryExecutionContext(
      this.documentclient,
      this.query,
      this.options,
      this.fetchFunctions,
      this.resourceLink
    );
  }
}
