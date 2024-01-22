// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { AzureLogger, createClientLogger } from "@azure/logger";
import { Constants, RUConsumedManager } from "../common";
import { ClientSideMetrics, QueryMetrics } from "../queryMetrics";
import { FeedOptions, QueryOperationOptions, Response } from "../request";
import { getInitialHeader, getRequestChargeIfAny } from "./headerUtils";
import { ExecutionContext } from "./index";
import { DiagnosticNodeInternal, DiagnosticNodeType } from "../diagnostics/DiagnosticNodeInternal";
import { addDignosticChild } from "../utils/diagnostics";
import { CosmosDbDiagnosticLevel } from "../diagnostics/CosmosDbDiagnosticLevel";
import { RUCapPerOperationExceededError } from "../request/RUCapPerOperationExceededError";

const logger: AzureLogger = createClientLogger("ClientContext");
/** @hidden */
export type FetchFunctionCallback = (
  diagnosticNode: DiagnosticNodeInternal,
  options: FeedOptions,
) => Promise<Response<any>>;

/** @hidden */
enum STATES {
  start = "start",
  inProgress = "inProgress",
  ended = "ended",
}

/** @hidden */
export class DefaultQueryExecutionContext implements ExecutionContext {
  private static readonly STATES = STATES;
  private resources: any[]; // TODO: any resources
  private currentIndex: number;
  private currentPartitionIndex: number;
  private fetchFunctions: FetchFunctionCallback[];
  private options: FeedOptions; // TODO: any options
  public continuationToken: string; // TODO: any continuation
  public get continuation(): string {
    return this.continuationToken;
  }
  private state: STATES;
  private nextFetchFunction: Promise<Response<any>>;
  /**
   * Provides the basic Query Execution Context.
   * This wraps the internal logic query execution using provided fetch functions
   *
   * @param clientContext  - Is used to read the partitionKeyRanges for split proofing
   * @param query          - A SQL query.
   * @param options        - Represents the feed options.
   * @param fetchFunctions - A function to retrieve each page of data.
   *                          An array of functions may be used to query more than one partition.
   * @hidden
   */
  constructor(
    options: FeedOptions,
    fetchFunctions: FetchFunctionCallback | FetchFunctionCallback[],
  ) {
    this.resources = [];
    this.currentIndex = 0;
    this.currentPartitionIndex = 0;
    this.fetchFunctions = Array.isArray(fetchFunctions) ? fetchFunctions : [fetchFunctions];
    this.options = options || {};
    this.continuationToken = this.options.continuationToken || this.options.continuation || null;
    this.state = DefaultQueryExecutionContext.STATES.start;
  }

  /**
   * Execute a provided callback on the next element in the execution context.
   */
  public async nextItem(
    diagnosticNode: DiagnosticNodeInternal,
    operationOptions?: QueryOperationOptions,
    ruConsumedManager?: RUConsumedManager,
  ): Promise<Response<any>> {
    ++this.currentIndex;
    const response = await this.current(diagnosticNode, operationOptions, ruConsumedManager);
    return response;
  }

  /**
   * Retrieve the current element on the execution context.
   */
  public async current(
    diagnosticNode: DiagnosticNodeInternal,
    operationOptions?: QueryOperationOptions,
    ruConsumedManager?: RUConsumedManager,
  ): Promise<Response<any>> {
    if (this.currentIndex < this.resources.length) {
      return {
        result: this.resources[this.currentIndex],
        headers: getInitialHeader(),
      };
    }
    if (this._canFetchMore()) {
      const { result: resources, headers } = await this.fetchMore(
        diagnosticNode,
        operationOptions,
        ruConsumedManager,
      );
      this.resources = resources;
      if (this.resources.length === 0) {
        if (!this.continuationToken && this.currentPartitionIndex >= this.fetchFunctions.length) {
          this.state = DefaultQueryExecutionContext.STATES.ended;
          return { result: undefined, headers };
        } else {
          return this.current(diagnosticNode, operationOptions, ruConsumedManager);
        }
      }
      return { result: this.resources[this.currentIndex], headers };
    } else {
      this.state = DefaultQueryExecutionContext.STATES.ended;
      return {
        result: undefined,
        headers: getInitialHeader(),
      };
    }
  }

  /**
   * Determine if there are still remaining resources to processs based on
   * the value of the continuation token or the elements remaining on the current batch in the execution context.
   *
   * @returns true if there is other elements to process in the DefaultQueryExecutionContext.
   */
  public hasMoreResults(): boolean {
    return (
      this.state === DefaultQueryExecutionContext.STATES.start ||
      this.continuationToken !== undefined ||
      this.currentIndex < this.resources.length - 1 ||
      this.currentPartitionIndex < this.fetchFunctions.length
    );
  }

  /**
   * Fetches the next batch of the feed and pass them as an array to a callback
   */
  public async fetchMore(
    diagnosticNode: DiagnosticNodeInternal,
    operationOptions?: QueryOperationOptions,
    ruConsumedManager?: RUConsumedManager,
  ): Promise<Response<any>> {
    return addDignosticChild(
      async (childDiagnosticNode: DiagnosticNodeInternal) => {
        if (this.currentPartitionIndex >= this.fetchFunctions.length) {
          return {
            headers: getInitialHeader(),
            result: undefined,
          };
        }

        // Keep to the original continuation and to restore the value after fetchFunction call
        const originalContinuation = this.options.continuationToken || this.options.continuation;
        this.options.continuationToken = this.continuationToken;

        // Return undefined if there is no more results
        if (this.currentPartitionIndex >= this.fetchFunctions.length) {
          return {
            headers: getInitialHeader(),
            result: undefined,
          };
        }

        let resources;
        let responseHeaders;
        try {
          let p: Promise<Response<any>>;
          if (this.nextFetchFunction !== undefined) {
            logger.verbose("using prefetch");
            p = this.nextFetchFunction;
            this.nextFetchFunction = undefined;
          } else {
            logger.verbose("using fresh fetch");
            p = this.fetchFunctions[this.currentPartitionIndex](childDiagnosticNode, this.options);
          }
          const response = await p;
          resources = response.result;
          childDiagnosticNode.recordQueryResult(resources, CosmosDbDiagnosticLevel.debugUnsafe);
          responseHeaders = response.headers;
          this.continuationToken = responseHeaders[Constants.HttpHeaders.Continuation];
          if (!this.continuationToken) {
            ++this.currentPartitionIndex;
          }

          if (this.options && this.options.bufferItems === true) {
            const fetchFunction = this.fetchFunctions[this.currentPartitionIndex];
            this.nextFetchFunction = fetchFunction
              ? fetchFunction(childDiagnosticNode, {
                  ...this.options,
                  continuationToken: this.continuationToken,
                })
              : undefined;
          }
        } catch (err: any) {
          this.state = DefaultQueryExecutionContext.STATES.ended;
          // return callback(err, undefined, responseHeaders);
          // TODO: Error and data being returned is an antipattern, this might broken
          throw err;
        }

        this.state = DefaultQueryExecutionContext.STATES.inProgress;
        this.currentIndex = 0;
        this.options.continuationToken = originalContinuation;
        this.options.continuation = originalContinuation;

        // deserializing query metrics so that we aren't working with delimited strings in the rest of the code base
        if (Constants.HttpHeaders.QueryMetrics in responseHeaders) {
          const delimitedString = responseHeaders[Constants.HttpHeaders.QueryMetrics];
          let queryMetrics = QueryMetrics.createFromDelimitedString(delimitedString);

          // Add the request charge to the query metrics so that we can have per partition request charge.
          if (Constants.HttpHeaders.RequestCharge in responseHeaders) {
            const requestCharge = Number(responseHeaders[Constants.HttpHeaders.RequestCharge]) || 0;
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
              new ClientSideMetrics(requestCharge),
            );
          }

          // Wraping query metrics in a object where the key is '0' just so single partition
          // and partition queries have the same response schema
          responseHeaders[Constants.HttpHeaders.QueryMetrics] = {};
          responseHeaders[Constants.HttpHeaders.QueryMetrics]["0"] = queryMetrics;
        }

        if (operationOptions && operationOptions.ruCapPerOperation && ruConsumedManager) {
          ruConsumedManager.addToRUConsumed(getRequestChargeIfAny(responseHeaders));
          const ruConsumedValue = await ruConsumedManager.getRUConsumed();
          if (ruConsumedValue > operationOptions.ruCapPerOperation) {
            // For RUCapPerOperationExceededError error, we won't be updating the state from
            // inProgress as we want to support continue
            throw new RUCapPerOperationExceededError(
              "Request Unit limit per Operation call exceeded",
              resources,
            );
          }
        }
        return { result: resources, headers: responseHeaders };
      },
      diagnosticNode,
      DiagnosticNodeType.DEFAULT_QUERY_NODE,
      {
        queryMethodIdentifier: "fetchMore",
      },
    );
  }

  private _canFetchMore(): boolean {
    const res =
      this.state === DefaultQueryExecutionContext.STATES.start ||
      (this.continuationToken && this.state === DefaultQueryExecutionContext.STATES.inProgress) ||
      (this.currentPartitionIndex < this.fetchFunctions.length &&
        this.state === DefaultQueryExecutionContext.STATES.inProgress);
    return res;
  }
}
