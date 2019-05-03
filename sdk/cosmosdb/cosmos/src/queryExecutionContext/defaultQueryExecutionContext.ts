import { IExecutionContext } from ".";
import { ClientContext } from "../ClientContext";
import { Constants } from "../common";
import { ClientSideMetrics, QueryMetrics } from "../queryMetrics";
import { Response } from "../request";
import { SqlQuerySpec } from "./SqlQuerySpec";

/** @hidden */
export type FetchFunctionCallback = (options: any) => Promise<Response<any>>;

/** @hidden */
enum STATES {
  start = "start",
  inProgress = "inProgress",
  ended = "ended"
}

/** @hidden */
export class DefaultQueryExecutionContext implements IExecutionContext {
  private static readonly STATES = STATES;
  private query: string | SqlQuerySpec;
  private resources: any; // TODO: any resources
  private currentIndex: number;
  private currentPartitionIndex: number;
  private fetchFunctions: FetchFunctionCallback[];
  private options: any; // TODO: any options
  public continuation: any; // TODO: any continuation
  private state: STATES;
  /**
   * Provides the basic Query Execution Context.
   * This wraps the internal logic query execution using provided fetch functions
   * @constructor DefaultQueryExecutionContext
   * @param {ClientContext} clientContext          - Is used to read the partitionKeyRanges for split proofing
   * @param {SqlQuerySpec | string} query          - A SQL query.
   * @param {FeedOptions} [options]                - Represents the feed options.
   * @param {callback | callback[]} fetchFunctions - A function to retrieve each page of data.
   *                          An array of functions may be used to query more than one partition.
   * @ignore
   */
  constructor(
    private clientContext: ClientContext,
    query: string | SqlQuerySpec,
    options: any,
    fetchFunctions: FetchFunctionCallback | FetchFunctionCallback[]
  ) {
    // TODO: any options
    this.query = query;
    this.resources = [];
    this.currentIndex = 0;
    this.currentPartitionIndex = 0;
    this.fetchFunctions = Array.isArray(fetchFunctions) ? fetchFunctions : [fetchFunctions];
    this.options = options || {};
    this.continuation = this.options.continuation || null;
    this.state = DefaultQueryExecutionContext.STATES.start;
  }

  /**
   * Execute a provided callback on the next element in the execution context.
   * @memberof DefaultQueryExecutionContext
   * @instance
   */
  public async nextItem(): Promise<Response<any>> {
    ++this.currentIndex;
    const response = await this.current();
    return response;
  }

  /**
   * Retrieve the current element on the execution context.
   * @memberof DefaultQueryExecutionContext
   * @instance
   */
  public async current(): Promise<Response<any>> {
    if (this.currentIndex < this.resources.length) {
      return {
        result: this.resources[this.currentIndex],
        headers: undefined
      };
    }

    if (this._canFetchMore()) {
      const { result: resources, headers } = await this.fetchMore();
      // if (err) {
      //     return callback(err, undefined, headers);
      // }
      // TODO: returning data and error is an anti-pattern

      this.resources = resources;
      if (this.resources.length === 0) {
        if (!this.continuation && this.currentPartitionIndex >= this.fetchFunctions.length) {
          this.state = DefaultQueryExecutionContext.STATES.ended;
          return { result: undefined, headers };
        } else {
          return this.current();
        }
      }
      return { result: this.resources[this.currentIndex], headers };
    } else {
      this.state = DefaultQueryExecutionContext.STATES.ended;
      return { result: undefined, headers: undefined };
    }
  }

  /**
   * Determine if there are still remaining resources to processs based on
   * the value of the continuation token or the elements remaining on the current batch in the execution context.
   * @memberof DefaultQueryExecutionContext
   * @instance
   * @returns {Boolean} true if there is other elements to process in the DefaultQueryExecutionContext.
   */
  public hasMoreResults() {
    return (
      this.state === DefaultQueryExecutionContext.STATES.start ||
      this.continuation !== undefined ||
      this.currentIndex < this.resources.length - 1 ||
      this.currentPartitionIndex < this.fetchFunctions.length
    );
  }

  /**
   * Fetches the next batch of the feed and pass them as an array to a callback
   * @memberof DefaultQueryExecutionContext
   * @instance
   */
  public async fetchMore(): Promise<Response<any>> {
    if (this.currentPartitionIndex >= this.fetchFunctions.length) {
      return { headers: undefined, result: undefined };
    }

    // Keep to the original continuation and to restore the value after fetchFunction call
    const originalContinuation = this.options.continuation;
    this.options.continuation = this.continuation;

    // Return undefined if there is no more results
    if (this.currentPartitionIndex >= this.fetchFunctions.length) {
      return { headers: undefined, result: undefined };
    }

    const fetchFunction = this.fetchFunctions[this.currentPartitionIndex];
    let resources;
    let responseHeaders;
    try {
      const response = await fetchFunction(this.options);
      resources = response.result;
      responseHeaders = response.headers;
    } catch (err) {
      this.state = DefaultQueryExecutionContext.STATES.ended;
      // return callback(err, undefined, responseHeaders);
      // TODO: Error and data being returned is an antipattern, this might broken
      throw err;
    }

    this.continuation = responseHeaders[Constants.HttpHeaders.Continuation];
    if (!this.continuation) {
      ++this.currentPartitionIndex;
    }

    this.state = DefaultQueryExecutionContext.STATES.inProgress;
    this.currentIndex = 0;
    this.options.continuation = originalContinuation;

    // deserializing query metrics so that we aren't working with delimited strings in the rest of the code base
    if (Constants.HttpHeaders.QueryMetrics in responseHeaders) {
      const delimitedString = responseHeaders[Constants.HttpHeaders.QueryMetrics];
      let queryMetrics = QueryMetrics.createFromDelimitedString(delimitedString);

      // Add the request charge to the query metrics so that we can have per partition request charge.
      if (Constants.HttpHeaders.RequestCharge in responseHeaders) {
        queryMetrics = new QueryMetrics(
          queryMetrics.retrievedDocumentCount,
          queryMetrics.retrievedDocumentSize,
          queryMetrics.outputDocumentCount,
          queryMetrics.outputDocumentSize,
          queryMetrics.indexHitDocumentCount,
          queryMetrics.totalQueryExecutionTime,
          queryMetrics.queryPreparationTimes,
          queryMetrics.indexLookupTime,
          queryMetrics.documentLoadTime,
          queryMetrics.vmExecutionTime,
          queryMetrics.runtimeExecutionTimes,
          queryMetrics.documentWriteTime,
          new ClientSideMetrics(responseHeaders[Constants.HttpHeaders.RequestCharge])
        );
      }

      // Wraping query metrics in a object where the key is '0' just so single partition
      // and partition queries have the same response schema
      responseHeaders[Constants.HttpHeaders.QueryMetrics] = {};
      responseHeaders[Constants.HttpHeaders.QueryMetrics]["0"] = queryMetrics;
    }

    return { result: resources, headers: responseHeaders };
  }

  private _canFetchMore() {
    const res =
      this.state === DefaultQueryExecutionContext.STATES.start ||
      (this.continuation && this.state === DefaultQueryExecutionContext.STATES.inProgress) ||
      (this.currentPartitionIndex < this.fetchFunctions.length &&
        this.state === DefaultQueryExecutionContext.STATES.inProgress);
    return res;
  }
}
