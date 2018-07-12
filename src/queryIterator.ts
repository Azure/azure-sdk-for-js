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

export class QueryIterator<T> {
  private toArrayTempResources: T[]; // TODO
  private toArrayLastResHeaders: IHeaders;
  private queryExecutionContext: IExecutionContext;
  /**
   * Represents a QueryIterator Object, an implmenetation of feed or query response that enables \
   * traversal and iterating over the response
   * in the Azure Cosmos DB database service.
   * @class QueryIterator
   * @param {object} documentclient                - The documentclient object.
   * @param {SqlQuerySpec | string} query          - A SQL query.
   * @param {FeedOptions} options                  - Represents the feed options.
   * @param {callback | callback[]} fetchFunctions - A function to retrieve each page of data. \
   * An array of functions may be used to query more than one partition.
   * @param {string} [resourceLink]                - An optional parameter that represents the resourceLink \
   * (will be used in orderby/top/parallel query)
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
   * @memberof QueryIterator
   * @instance
   * @param {callback} callback - Function to execute for each element. \
   * the function takes two parameters error, element.
   * Note: the last element the callback will be called on will be undefined.
   * If the callback explicitly returned false, the loop gets stopped.
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
   * @memberof QueryIterator
   * @instance
   * @param {callback} callback - Function to execute for each element. \
   * the function takes two parameters error, element.
   */
  public async nextItem(): Promise<Response<T>> {
    return this.queryExecutionContext.nextItem();
  }

  /**
   * Retrieve the current element on the QueryIterator.
   * @memberof QueryIterator
   * @instance
   * @param {callback} callback - Function to execute for the current element. \
   * the function takes two parameters error, element.
   */
  public async current(): Promise<Response<T>> {
    return this.queryExecutionContext.current();
  }

  /**
   * @deprecated Instead check if callback(undefined, undefined) is invoked by nextItem(callback) or current(callback)
   *
   * Determine if there are still remaining resources to processs based on the value of the continuation token or the\
   * elements remaining on the current batch in the QueryIterator.
   * @memberof QueryIterator
   * @instance
   * @returns {Boolean} true if there is other elements to process in the QueryIterator.
   */
  public hasMoreResults(): boolean {
    return this.queryExecutionContext.hasMoreResults();
  }

  /**
   * Retrieve all the elements of the feed and pass them as an array to a function
   * @memberof QueryIterator
   * @instance
   * @param {callback} callback - Function execute on the feed response, takes two parameters error, resourcesList
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
   * @memberof QueryIterator
   * @instance
   * @param {callback} callback - Function execute on the feed response, takes two parameters error, resourcesList
   */
  public async executeNext(): Promise<Response<T>> {
    return this.queryExecutionContext.fetchMore();
  }

  /**
   * Reset the QueryIterator to the beginning and clear all the resources inside it
   * @memberof QueryIterator
   * @instance
   */
  public reset() {
    this.queryExecutionContext = this._createQueryExecutionContext();
  }

  /** @ignore */
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

  /** @ignore */
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
