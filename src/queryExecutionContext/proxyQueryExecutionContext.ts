import {
  DefaultQueryExecutionContext,
  FetchFunctionCallback,
  IExecutionContext,
  PartitionedQueryExecutionContextInfo,
  PipelinedQueryExecutionContext,
  SqlQuerySpec
} from ".";
import { ClientContext } from "../ClientContext";
import { StatusCodes, SubStatusCodes } from "../common";
import { Response } from "../request/request";

/** @hidden */
export class ProxyQueryExecutionContext implements IExecutionContext {
  private queryExecutionContext: IExecutionContext;

  constructor(
    private clientContext: ClientContext,
    private query: SqlQuerySpec | string,
    private options: any, // TODO: any options
    private fetchFunctions: FetchFunctionCallback | FetchFunctionCallback[],
    private resourceLink: string | string[]
  ) {
    this.query = query;
    this.fetchFunctions = fetchFunctions;
    // clone options
    this.options = JSON.parse(JSON.stringify(options || {}));
    this.resourceLink = resourceLink;
    this.queryExecutionContext = new DefaultQueryExecutionContext(
      this.clientContext,
      this.query,
      this.options,
      this.fetchFunctions
    );
  }
  /**
   * Execute a provided function on the next element in the ProxyQueryExecutionContext.
   * @memberof ProxyQueryExecutionContext
   * @instance
   * @param {callback} callback - Function to execute for each element. \
   * the function takes two parameters error, element.
   */
  public async nextItem(): Promise<Response<any>> {
    try {
      const r = await this.queryExecutionContext.nextItem();
      return r;
    } catch (err) {
      if (this._hasPartitionedExecutionInfo(err)) {
        // if this's a partitioned execution info switches the execution context
        const partitionedExecutionInfo = this._getParitionedExecutionInfo(err);
        this.queryExecutionContext = this._createPipelinedExecutionContext(partitionedExecutionInfo);
        try {
          // TODO: recusion might be bad...
          return this.nextItem();
        } catch (e) {
          throw e;
        }
      } else {
        throw err;
      }
    }
  }

  private _createPipelinedExecutionContext(partitionedExecutionInfo: PartitionedQueryExecutionContextInfo) {
    if (!this.resourceLink) {
      throw new Error("for top/orderby resourceLink is required");
    }
    if (Array.isArray(this.resourceLink) && this.resourceLink.length !== 1) {
      throw new Error("for top/orderby exactly one collectionLink is required");
    }

    const collectionLink = Array.isArray(this.resourceLink) ? this.resourceLink[0] : this.resourceLink;

    return new PipelinedQueryExecutionContext(
      this.clientContext,
      collectionLink,
      this.query,
      this.options,
      partitionedExecutionInfo
    );
  }

  /**
   * Retrieve the current element on the ProxyQueryExecutionContext.
   * @memberof ProxyQueryExecutionContext
   * @instance
   * @param {callback} callback - Function to execute for the current element. \
   * the function takes two parameters error, element.
   */
  public async current(): Promise<Response<any>> {
    try {
      return await this.queryExecutionContext.current();
    } catch (err) {
      if (this._hasPartitionedExecutionInfo(err)) {
        // if this's a partitioned execution info switches the execution context
        const partitionedExecutionInfo = this._getParitionedExecutionInfo(err);
        this.queryExecutionContext = this._createPipelinedExecutionContext(partitionedExecutionInfo);

        // TODO: recursion
        try {
          return this.current();
        } catch (e) {
          throw e;
        }
      } else {
        throw err;
      }
    }
  }

  /**
   * Determine if there are still remaining resources to process.
   * @memberof ProxyQueryExecutionContext
   * @instance
   * @returns {Boolean} true if there is other elements to process in the ProxyQueryExecutionContext.
   */
  public hasMoreResults() {
    return this.queryExecutionContext.hasMoreResults();
  }

  public async fetchMore(): Promise<Response<any>> {
    try {
      return await this.queryExecutionContext.fetchMore();
    } catch (err) {
      if (this._hasPartitionedExecutionInfo(err)) {
        // if this's a partitioned execution info switches the execution context
        const partitionedExecutionInfo = this._getParitionedExecutionInfo(err);
        this.queryExecutionContext = this._createPipelinedExecutionContext(partitionedExecutionInfo);
        try {
          // TODO: maybe should move the others to use this pattern as it avoid the recursion issue.
          return this.queryExecutionContext.fetchMore();
        } catch (e) {
          throw e;
        }
      } else {
        throw err;
      }
    }
  }

  private _hasPartitionedExecutionInfo(error: any) {
    // TODO: any error
    return (
      error.code === StatusCodes.BadRequest &&
      "substatus" in error &&
      error["substatus"] === SubStatusCodes.CrossPartitionQueryNotServable
    );
  }

  private _getParitionedExecutionInfo(error: any) {
    // TODO: any error
    return JSON.parse(JSON.parse(error.body).additionalErrorInfo);
  }
}
