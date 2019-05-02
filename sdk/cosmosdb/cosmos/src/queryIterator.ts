/// <reference lib="esnext.asynciterable" />
import { ClientContext } from "./ClientContext";
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
    private clientContext: ClientContext,
    private query: SqlQuerySpec | string,
    private options: FeedOptions,
    private fetchFunctions: FetchFunctionCallback | FetchFunctionCallback[],
    private resourceLink?: string | string[]
  ) {
    this.query = query;
    this.fetchFunctions = fetchFunctions;
    this.options = options;
    this.resourceLink = resourceLink;
    this.queryExecutionContext = this._createQueryExecutionContext();
  }

  /**
   * Calls a specified callback for each item returned from the query.
   * Runs serially; each callback blocks the next.
   *
   * @param callback Specified callback.
   * First param is the result,
   * second param (optional) is the current headers object state,
   * third param (optional) is current index.
   * No more callbacks will be called if one of them results false.
   *
   * @returns Promise<void> - you should await or .catch the Promise in case there are any errors
   *
   * @example Iterate over all databases
   * ```typescript
   * await client.databases.readAll().forEach((db, headers, index) => {
   *   console.log(`Got ${db.id} from forEach`);
   * })
   * ```
   */
  public async forEach(callback: (result: T, headers?: IHeaders, index?: number) => boolean | void): Promise<void> {
    this.reset();
    let index = 0;
    while (this.queryExecutionContext.hasMoreResults()) {
      const result = await this.queryExecutionContext.nextItem();
      if (result.result === undefined) {
        return;
      }
      if (callback(result.result, result.headers, index) === false) {
        return;
      } else {
        ++index;
      }
    }
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
   * ```typescript
   * if (!Symbol || !Symbol.asyncIterator) {
   *   (Symbol as any).asyncIterator = Symbol.for("Symbol.asyncIterator");
   * }
   * ```
   *
   * @see QueryIterator.forEach for very similar functionality.
   *
   * @example Iterate over all databases
   * ```typescript
   * for await(const {result: db} in client.databases.readAll().getAsyncIterator()) {
   *   console.log(`Got ${db.id} from AsyncIterator`);
   * }
   * ```
   */
  public async *getAsyncIterator(): AsyncIterable<Response<T>> {
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
  public async executeNext(): Promise<Response<T[]>> {
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
      this.clientContext,
      this.query,
      this.options,
      this.fetchFunctions,
      this.resourceLink
    );
  }
}
