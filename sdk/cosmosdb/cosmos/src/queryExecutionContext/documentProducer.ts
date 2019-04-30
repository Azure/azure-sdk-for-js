import { FetchFunctionCallback, SqlQuerySpec } from ".";
import { ClientContext } from "../ClientContext";
import { Constants, Helper, StatusCodes, SubStatusCodes } from "../common";
import { FeedOptions } from "../request";
import { Response } from "../request/request";
import { DefaultQueryExecutionContext } from "./defaultQueryExecutionContext";
import { FetchResult, FetchResultType } from "./FetchResult";
import { HeaderUtils, IHeaders } from "./headerUtils";

/** @hidden */
const HttpHeaders = Constants;

/** @hidden */
enum DocumentProducerStates {
  started = "started",
  inProgress = "inProgress",
  ended = "ended"
}

/** @hidden */
export class DocumentProducer {
  // // Static Members
  // STATES: Object.freeze({ started: "started", inProgress: "inProgress", ended: "ended" })
  private static readonly STATES = DocumentProducerStates;
  private collectionLink: string;
  private query: string | SqlQuerySpec;
  public targetPartitionKeyRange: any; // TODO: any partitionkeyrange
  public fetchResults: FetchResult[];
  private state: DocumentProducerStates;
  public allFetched: boolean;
  private err: Error;
  public previousContinuationToken: string;
  public continuationToken: string;
  private respHeaders: IHeaders;
  private internalExecutionContext: DefaultQueryExecutionContext;

  /**
   * Provides the Target Partition Range Query Execution Context.
   * @constructor DocumentProducer
   * @param {ClientContext} clientContext        - The service endpoint to use to create the client.
   * @param {String} collectionLink                - Represents collection link
   * @param {SqlQuerySpec | string} query          - A SQL query.
   * @param {object} targetPartitionKeyRange       - Query Target Partition key Range
   * @ignore
   */
  constructor(
    private clientContext: ClientContext,
    collectionLink: string,
    query: SqlQuerySpec,
    targetPartitionKeyRange: any, // TODO: any partition key range
    options: FeedOptions
  ) {
    // TODO: any options
    this.collectionLink = collectionLink;
    this.query = query;
    this.targetPartitionKeyRange = targetPartitionKeyRange;
    this.fetchResults = [];

    this.state = DocumentProducer.STATES.started;
    this.allFetched = false;
    this.err = undefined;

    this.previousContinuationToken = undefined;
    this.continuationToken = undefined;
    this.respHeaders = HeaderUtils.getInitialHeader();

    // tslint:disable-next-line:no-shadowed-variable
    this.internalExecutionContext = new DefaultQueryExecutionContext(clientContext, query, options, this.fetchFunction);
    this.state = DocumentProducer.STATES.inProgress;
  }
  /**
   * Synchronously gives the contiguous buffered results (stops at the first non result) if any
   * @returns {Object}       - buffered current items if any
   * @ignore
   */
  public peekBufferedItems() {
    const bufferedResults = [];
    for (let i = 0, done = false; i < this.fetchResults.length && !done; i++) {
      const fetchResult = this.fetchResults[i];
      switch (fetchResult.fetchResultType) {
        case FetchResultType.Done:
          done = true;
          break;
        case FetchResultType.Exception:
          done = true;
          break;
        case FetchResultType.Result:
          bufferedResults.push(fetchResult.feedResponse);
          break;
      }
    }
    return bufferedResults;
  }

  public fetchFunction: FetchFunctionCallback = async (options: any) => {
    const path = Helper.getPathFromLink(this.collectionLink, "docs");
    const id = Helper.getIdFromLink(this.collectionLink);

    return this.clientContext.queryFeed(
      path,
      "docs",
      id,
      (result: any) => result.Documents, // TODO: any
      this.query,
      options,
      this.targetPartitionKeyRange["id"]
    );
  };

  public hasMoreResults() {
    return this.internalExecutionContext.hasMoreResults() || this.fetchResults.length !== 0;
  }

  public gotSplit() {
    const fetchResult = this.fetchResults[0];
    if (fetchResult.fetchResultType === FetchResultType.Exception) {
      if (DocumentProducer._needPartitionKeyRangeCacheRefresh(fetchResult.error)) {
        return true;
      }
    }

    return false;
  }

  private _getAndResetActiveResponseHeaders() {
    const ret = this.respHeaders;
    this.respHeaders = HeaderUtils.getInitialHeader();
    return ret;
  }

  private _updateStates(err: any, allFetched: boolean) {
    // TODO: any Error
    if (err) {
      this.state = DocumentProducer.STATES.ended;
      this.err = err;
      return;
    }
    if (allFetched) {
      this.allFetched = true;
    }
    if (this.allFetched && this.peekBufferedItems().length === 0) {
      this.state = DocumentProducer.STATES.ended;
    }
    if (this.internalExecutionContext.continuation === this.continuationToken) {
      // nothing changed
      return;
    }
    this.previousContinuationToken = this.continuationToken;
    this.continuationToken = this.internalExecutionContext.continuation;
  }

  private static _needPartitionKeyRangeCacheRefresh(error: any) {
    // TODO: error
    return (
      error.code === StatusCodes.Gone &&
      "substatus" in error &&
      error["substatus"] === SubStatusCodes.PartitionKeyRangeGone
    );
  }

  /**
   * Fetches and bufferes the next page of results and executes the given callback
   * @memberof DocumentProducer
   * @instance
   */
  public async bufferMore(): Promise<Response<any>> {
    if (this.err) {
      throw this.err;
    }

    try {
      const { result: resources, headers: headerResponse } = await this.internalExecutionContext.fetchMore();
      this._updateStates(undefined, resources === undefined);
      if (resources !== undefined) {
        // some more results
        resources.forEach((element: any) => {
          // TODO: resources any
          this.fetchResults.push(new FetchResult(element, undefined));
        });
      }

      // need to modify the header response so that the query metrics are per partition
      if (headerResponse != null && Constants.HttpHeaders.QueryMetrics in headerResponse) {
        // "0" is the default partition before one is actually assigned.
        const queryMetrics = headerResponse[Constants.HttpHeaders.QueryMetrics]["0"];

        // Wraping query metrics in a object where the keys are the partition key range.
        headerResponse[Constants.HttpHeaders.QueryMetrics] = {};
        headerResponse[Constants.HttpHeaders.QueryMetrics][this.targetPartitionKeyRange.id] = queryMetrics;
      }

      return { result: resources, headers: headerResponse };
    } catch (err) {
      // TODO: any error
      if (DocumentProducer._needPartitionKeyRangeCacheRefresh(err)) {
        // Split just happend
        // Buffer the error so the execution context can still get the feedResponses in the itemBuffer
        const bufferedError = new FetchResult(undefined, err);
        this.fetchResults.push(bufferedError);
        // Putting a dummy result so that the rest of code flows
        return { result: [bufferedError], headers: err.headers };
      } else {
        this._updateStates(err, err.resources === undefined);
        throw err;
      }
    }
  }

  /**
   * Synchronously gives the bufferend current item if any
   * @returns {Object}       - buffered current item if any
   * @ignore
   */
  public getTargetParitionKeyRange() {
    return this.targetPartitionKeyRange;
  }

  /**
   * Execute a provided function on the next element in the DocumentProducer.
   * @memberof DocumentProducer
   * @instance
   * @param {callback} callback - Function to execute for each element. the function \
   * takes two parameters error, element.
   */
  public async nextItem(): Promise<Response<any>> {
    if (this.err) {
      this._updateStates(this.err, undefined);
      throw this.err;
    }

    try {
      const { result, headers } = await this.current();

      const fetchResult = this.fetchResults.shift();
      this._updateStates(undefined, result === undefined);
      if (fetchResult.feedResponse !== result) {
        throw new Error(`Expected ${fetchResult.feedResponse} to equal ${result}`);
      }
      switch (fetchResult.fetchResultType) {
        case FetchResultType.Done:
          return { result: undefined, headers };
        case FetchResultType.Exception:
          fetchResult.error.headers = headers;
          throw fetchResult.error;
        case FetchResultType.Result:
          return { result: fetchResult.feedResponse, headers };
      }
    } catch (err) {
      this._updateStates(err, err.item === undefined);
      throw err;
    }
  }

  /**
   * Retrieve the current element on the DocumentProducer.
   * @memberof DocumentProducer
   * @instance
   * @param {callback} callback - Function to execute for the current element. \
   * the function takes two parameters error, element.
   */
  public async current(): Promise<Response<any>> {
    // If something is buffered just give that
    if (this.fetchResults.length > 0) {
      const fetchResult = this.fetchResults[0];
      // Need to unwrap fetch results
      switch (fetchResult.fetchResultType) {
        case FetchResultType.Done:
          return {
            result: undefined,
            headers: this._getAndResetActiveResponseHeaders()
          };
        case FetchResultType.Exception:
          fetchResult.error.headers = this._getAndResetActiveResponseHeaders();
          throw fetchResult.error;
        case FetchResultType.Result:
          return {
            result: fetchResult.feedResponse,
            headers: this._getAndResetActiveResponseHeaders()
          };
      }
    }

    // If there isn't anymore items left to fetch then let the user know.
    if (this.allFetched) {
      return {
        result: undefined,
        headers: this._getAndResetActiveResponseHeaders()
      };
    }

    // If there are no more bufferd items and there are still items to be fetched then buffer more
    try {
      const { result, headers } = await this.bufferMore();
      if (result === undefined) {
        return { result: undefined, headers };
      }
      HeaderUtils.mergeHeaders(this.respHeaders, headers);

      return this.current();
    } catch (err) {
      throw err;
    }
  }
}
