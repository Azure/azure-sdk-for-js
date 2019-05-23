/// <reference lib="esnext.asynciterable" />
import { ClientContext } from "./ClientContext";
import {
  CosmosHeaders,
  ExecutionContext,
  FetchFunctionCallback,
  getInitialHeader,
  mergeHeaders,
  ProxyQueryExecutionContext,
  SqlQuerySpec
} from "./queryExecutionContext";
import { FeedOptions } from "./request/FeedOptions";
import { FeedResponse } from "./request/FeedResponse";

/**
 * Represents a QueryIterator Object, an implmenetation of feed or query response that enables
 * traversal and iterating over the response
 * in the Azure Cosmos DB database service.
 */
export class QueryIterator<T> {
  private fetchAllTempResources: T[]; // TODO
  private fetchAllLastResHeaders: CosmosHeaders;
  private queryExecutionContext: ExecutionContext;
  /**
   * @hidden
   */
  constructor(
    private clientContext: ClientContext,
    private query: SqlQuerySpec | string,
    private options: FeedOptions,
    private fetchFunctions: FetchFunctionCallback | FetchFunctionCallback[],
    private resourceLink?: string
  ) {
    this.query = query;
    this.fetchFunctions = fetchFunctions;
    this.options = options;
    this.resourceLink = resourceLink;
    this.queryExecutionContext = this.createQueryExecutionContext();
    this.fetchAllLastResHeaders = getInitialHeader();
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
   * @example Iterate over all databases
   * ```typescript
   * for await(const {result: db} in client.databases.readAll().getAsyncIterator()) {
   *   console.log(`Got ${db.id} from AsyncIterator`);
   * }
   * ```
   */
  public async *getAsyncIterator(): AsyncIterable<FeedResponse<T>> {
    this.reset();
    while (this.queryExecutionContext.hasMoreResults()) {
      const result = await this.queryExecutionContext.fetchMore();
      const feedResponse = new FeedResponse<T>(
        result.result,
        result.headers,
        this.queryExecutionContext.hasMoreResults()
      );
      if (result.result !== undefined) {
        yield feedResponse;
      }
    }
  }

  /**
   * Determine if there are still remaining resources to processs based on the value of the continuation token or the\
   * elements remaining on the current batch in the QueryIterator.
   * @returns {Boolean} true if there is other elements to process in the QueryIterator.
   */
  public hasMoreResults(): boolean {
    return this.queryExecutionContext.hasMoreResults();
  }

  /**
   * Fetch all pages for the query and return a single FeedResponse.
   */

  public async fetchAll(): Promise<FeedResponse<T>> {
    this.reset();
    this.fetchAllTempResources = [];
    return this.toArrayImplementation();
  }

  /**
   * Retrieve the next batch from the feed.
   *
   * This may or may not fetch more pages from the backend depending on your settings
   * and the type of query. Aggregate queries will generally fetch all backend pages
   * before returning the first batch of responses.
   */
  public async fetchNext(): Promise<FeedResponse<T>> {
    const response = await this.queryExecutionContext.fetchMore();
    return new FeedResponse<T>(response.result, response.headers, this.queryExecutionContext.hasMoreResults());
  }

  /**
   * Reset the QueryIterator to the beginning and clear all the resources inside it
   */
  public reset() {
    this.queryExecutionContext = this.createQueryExecutionContext();
  }

  private async toArrayImplementation(): Promise<FeedResponse<T>> {
    while (this.queryExecutionContext.hasMoreResults()) {
      const { result, headers } = await this.queryExecutionContext.nextItem();
      // concatenate the results and fetch more
      mergeHeaders(this.fetchAllLastResHeaders, headers);

      if (result !== undefined) {
        this.fetchAllTempResources.push(result);
      }
    }
    return new FeedResponse(
      this.fetchAllTempResources,
      this.fetchAllLastResHeaders,
      this.queryExecutionContext.hasMoreResults()
    );
  }

  private createQueryExecutionContext() {
    return new ProxyQueryExecutionContext(
      this.clientContext,
      this.query,
      this.options,
      this.fetchFunctions,
      this.resourceLink
    );
  }
}
