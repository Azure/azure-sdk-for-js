// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/// <reference lib="esnext.asynciterable" />

import { ClientContext } from "./ClientContext";
import { CosmosDiagnostics, DiagnosticNodeInternal, DiagnosticNodeType, prepareClientOperationData } from "./CosmosDiagnostics";
import { getPathFromLink, OperationType, ResourceType, StatusCodes } from "./common";
import {
  CosmosHeaders,
  DefaultQueryExecutionContext,
  ExecutionContext,
  FetchFunctionCallback,
  getInitialHeader,
  mergeHeaders,
  PipelinedQueryExecutionContext,
  SqlQuerySpec,
} from "./queryExecutionContext";
import { Response } from "./request";
import { ErrorResponse, PartitionedQueryExecutionInfo } from "./request/ErrorResponse";
import { FeedOptions } from "./request/FeedOptions";
import { FeedResponse } from "./request/FeedResponse";

/**
 * Represents a QueryIterator Object, an implementation of feed or query response that enables
 * traversal and iterating over the response
 * in the Azure Cosmos DB database service.
 */
export class QueryIterator<T> {
  private fetchAllTempResources: T[]; // TODO
  private fetchAllLastResHeaders: CosmosHeaders;
  private queryExecutionContext: ExecutionContext;
  private queryPlanPromise: Promise<Response<PartitionedQueryExecutionInfo>>;
  private isInitialized: boolean;
  private currentDiagnosticNode: DiagnosticNodeInternal;
  /**
   * @hidden
   */
  constructor(
    diagnosticNode: DiagnosticNodeInternal,
    private clientContext: ClientContext,
    private query: SqlQuerySpec | string,
    private options: FeedOptions,
    private fetchFunctions: FetchFunctionCallback | FetchFunctionCallback[],
    private resourceLink?: string,
    private resourceType?: ResourceType
  ) {
    this.query = query;
    this.fetchFunctions = fetchFunctions;
    this.options = options || {};
    this.resourceLink = resourceLink;
    this.fetchAllLastResHeaders = getInitialHeader();
    this.reset();
    this.isInitialized = false;
    this.currentDiagnosticNode = diagnosticNode;
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
   * for await(const { resources: db } of client.databases.readAll().getAsyncIterator()) {
   *   console.log(`Got ${db} from AsyncIterator`);
   * }
   * ```
   */
  public async *getAsyncIterator(): AsyncIterable<FeedResponse<T>> {
    this.reset();
    this.queryPlanPromise = this.fetchQueryPlan();
    while (this.queryExecutionContext.hasMoreResults()) {
      let response: Response<any>;
      try {
        response = await this.queryExecutionContext.fetchMore();
      } catch (error: any) {
        if (this.needsQueryPlan(error)) {
          await this.createPipelinedExecutionContext();
          try {
            response = await this.queryExecutionContext.fetchMore();
          } catch (queryError: any) {
            this.handleSplitError(queryError);
          }
        } else {
          throw error;
        }
      }
      
      const feedResponse = new FeedResponse<T>(
        response.result,
        response.headers,
        this.queryExecutionContext.hasMoreResults(),
        this.readAndResetDiagnosticContext()
      );
      if (response.result !== undefined) {
        yield feedResponse;
      }
    }
  }

  /**
   * Determine if there are still remaining resources to processs based on the value of the continuation token or the
   * elements remaining on the current batch in the QueryIterator.
   * @returns true if there is other elements to process in the QueryIterator.
   */
  public hasMoreResults(): boolean {
    return this.queryExecutionContext.hasMoreResults();
  }

  /**
   * Fetch all pages for the query and return a single FeedResponse.
   */

  public async fetchAll(): Promise<FeedResponse<T>> {
    this.reset();
    let response: FeedResponse<T>;
    try {
      response = await this.toArrayImplementation();
    } catch (error: any) {
      this.handleSplitError(error);
    }
    return response;
  }

  /**
   * Retrieve the next batch from the feed.
   *
   * This may or may not fetch more pages from the backend depending on your settings
   * and the type of query. Aggregate queries will generally fetch all backend pages
   * before returning the first batch of responses.
   */
  public async fetchNext(): Promise<FeedResponse<T>> {
    this.queryPlanPromise = this.fetchQueryPlan();
    if (!this.isInitialized) {
      await this.init();
    }

    let response: Response<any>;
    try {
      response = await this.queryExecutionContext.fetchMore();
    } catch (error: any) {
      if (this.needsQueryPlan(error)) {
        await this.createPipelinedExecutionContext();
        try {
          response = await this.queryExecutionContext.fetchMore();
        } catch (queryError: any) {
          this.handleSplitError(queryError);
        }
      } else {
        throw error;
      }
    }
    const diagnostic = this.readAndResetDiagnosticContext();
    this.clientContext.recoredDiagnostics(diagnostic);
    return new FeedResponse<T>(
      response.result,
      response.headers,
      this.queryExecutionContext.hasMoreResults(),
      diagnostic  
    );
  }

  /**
   * Reset the QueryIterator to the beginning and clear all the resources inside it
   */
  public reset(): void {
    this.queryPlanPromise = undefined;
    this.fetchAllLastResHeaders = getInitialHeader();
    this.fetchAllTempResources = [];
    this.queryExecutionContext = new DefaultQueryExecutionContext(
      this.options,
      this.fetchFunctions,
      this.currentDiagnosticNode
    );
  }

  private readAndResetDiagnosticContext(): CosmosDiagnostics {
    const diagnosticNodeToSwap = this.currentDiagnosticNode;
    this.currentDiagnosticNode = new DiagnosticNodeInternal(DiagnosticNodeType.CLIENT_REQUEST, null, prepareClientOperationData(this.resourceType, OperationType.Query));
    return diagnosticNodeToSwap.toDiagnostic();
  }

  private async toArrayImplementation(): Promise<FeedResponse<T>> {
    this.queryPlanPromise = this.fetchQueryPlan();
    if (!this.isInitialized) {
      await this.init();
    }
    while (this.queryExecutionContext.hasMoreResults()) {
      let response: Response<any>;
      try {
        response = await this.queryExecutionContext.nextItem();
      } catch (error: any) {
        if (this.needsQueryPlan(error)) {
          await this.createPipelinedExecutionContext();
          response = await this.queryExecutionContext.nextItem();
        } else {
          throw error;
        }
      }
      const { result, headers } = response;
      // concatenate the results and fetch more
      mergeHeaders(this.fetchAllLastResHeaders, headers);

      if (result !== undefined) {
        this.fetchAllTempResources.push(result);
      }
    }
    return new FeedResponse(
      this.fetchAllTempResources,
      this.fetchAllLastResHeaders,
      this.queryExecutionContext.hasMoreResults(),
      this.readAndResetDiagnosticContext()
    );
  }

  private async createPipelinedExecutionContext(): Promise<void> {
    const queryPlanResponse = await this.queryPlanPromise;

    // We always coerce queryPlanPromise to resolved. So if it errored, we need to manually inspect the resolved value
    if (queryPlanResponse instanceof Error) {
      throw queryPlanResponse;
    }

    const queryPlan = queryPlanResponse.result;
    const queryInfo = queryPlan.queryInfo;
    if (queryInfo.aggregates.length > 0 && queryInfo.hasSelectValue === false) {
      throw new Error("Aggregate queries must use the VALUE keyword");
    }
    this.queryExecutionContext = new PipelinedQueryExecutionContext(
      this.clientContext,
      this.resourceLink,
      this.query,
      this.options,
      queryPlan,
      this.currentDiagnosticNode
    );
  }

  private async fetchQueryPlan(): Promise<any> {
    if (!this.queryPlanPromise && this.resourceType === ResourceType.item) {
      return this.clientContext
        .getQueryPlan(
          getPathFromLink(this.resourceLink) + "/docs",
          ResourceType.item,
          this.resourceLink,
          this.query,
          this.options,
          this.currentDiagnosticNode
        )
        .catch((error: any) => error); // Without this catch, node reports an unhandled rejection. So we stash the promise as resolved even if it errored.
    }
    return this.queryPlanPromise;
  }

  private needsQueryPlan(error: ErrorResponse): error is ErrorResponse {
    if (
      error.body?.additionalErrorInfo ||
      error.message.includes("Cross partition query only supports")
    ) {
      return error.code === StatusCodes.BadRequest && this.resourceType === ResourceType.item;
    } else {
      throw error;
    }
  }

  private initPromise: Promise<void>;
  private async init(): Promise<void> {
    if (this.isInitialized === true) {
      return;
    }
    if (this.initPromise === undefined) {
      this.initPromise = this._init();
    }
    return this.initPromise;
  }
  private async _init(): Promise<void> {
    if (this.options.forceQueryPlan === true && this.resourceType === ResourceType.item) {
      await this.createPipelinedExecutionContext();
    }
    this.isInitialized = true;
  }

  private handleSplitError(err: any): void {
    if (err.code === 410) {
      const error = new Error(
        "Encountered partition split and could not recover. This request is retryable"
      ) as any;
      error.code = 503;
      error.originalError = err;
      throw error;
    } else {
      throw err;
    }
  }
}
