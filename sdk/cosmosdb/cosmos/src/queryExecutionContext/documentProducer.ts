// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import type { PartitionKeyRange, Resource } from "../client/index.js";
import type { ClientContext } from "../ClientContext.js";
import {
  Constants,
  getIdFromLink,
  getPathFromLink,
  ResourceType,
  StatusCodes,
  SubStatusCodes,
} from "../common/index.js";
import type { DiagnosticNodeInternal } from "../diagnostics/DiagnosticNodeInternal.js";
import type { FeedOptions } from "../request/index.js";
import type { Response } from "../request/index.js";
import { DefaultQueryExecutionContext } from "./defaultQueryExecutionContext.js";
import type { FetchFunctionCallback } from "./defaultQueryExecutionContext.js";
import { FetchResult, FetchResultType } from "./FetchResult.js";
import { getInitialHeader } from "./headerUtils.js";
import type { CosmosHeaders } from "./headerUtils.js";
import type { SqlQuerySpec } from "./index.js";
import type { FilterStrategy } from "./queryFilteringStrategy/FilterStrategy.js";

/** @hidden */
export class DocumentProducer {
  private collectionLink: string;
  private query: string | SqlQuerySpec;
  public targetPartitionKeyRange: PartitionKeyRange;
  public fetchResults: FetchResult[];
  public allFetched: boolean;
  private err: Error;
  public previousContinuationToken: string;
  public continuationToken: string;
  public generation: number = 0;
  private internalExecutionContext: DefaultQueryExecutionContext;
  public startEpk: string;
  public endEpk: string;
  public populateEpkRangeHeaders: boolean;
  private filter?: FilterStrategy;
  private queryExecutionInfo?: { reverseRidEnabled: boolean; reverseIndexScan: boolean };

  /**
   * Provides the Target Partition Range Query Execution Context.
   * @param clientContext  - The service endpoint to use to create the client.
   * @param collectionLink - Represents collection link
   * @param query          - A SQL query.
   * @param targetPartitionKeyRange - Query Target Partition key Range
   * @hidden
   */
  constructor(
    private clientContext: ClientContext,
    collectionLink: string,
    query: SqlQuerySpec,
    targetPartitionKeyRange: PartitionKeyRange,
    options: FeedOptions,
    correlatedActivityId: string,
    startEpk?: string,
    endEpk?: string,
    populateEpkRangeHeaders: boolean = false,
    filter?: FilterStrategy,
  ) {
    // TODO: any options
    this.collectionLink = collectionLink;
    this.query = query;
    this.targetPartitionKeyRange = targetPartitionKeyRange;
    this.fetchResults = [];

    this.allFetched = false;
    this.err = undefined;

    this.previousContinuationToken = undefined;
    this.continuationToken = undefined;

    this.internalExecutionContext = new DefaultQueryExecutionContext(
      options,
      this.fetchFunction,
      correlatedActivityId,
    );
    this.startEpk = startEpk;
    this.endEpk = endEpk;
    this.populateEpkRangeHeaders = populateEpkRangeHeaders;
    this.filter = filter;
  }
  public peekBufferedItems(): any[] {
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

  public fetchFunction: FetchFunctionCallback = async (
    diagnosticNode: DiagnosticNodeInternal,
    options: FeedOptions,
    correlatedActivityId: string,
  ): Promise<Response<Resource>> => {
    const path = getPathFromLink(this.collectionLink, ResourceType.item);
    diagnosticNode.addData({ partitionKeyRangeId: this.targetPartitionKeyRange.id });
    const id = getIdFromLink(this.collectionLink);
    const startEpk = this.populateEpkRangeHeaders ? this.startEpk : undefined;
    const endEpk = this.populateEpkRangeHeaders ? this.endEpk : undefined;

    return this.clientContext.queryFeed({
      path,
      resourceType: ResourceType.item,
      resourceId: id,
      resultFn: (result: any) => result.Documents,
      query: this.query,
      options,
      diagnosticNode,
      partitionKeyRangeId: this.targetPartitionKeyRange["id"],
      correlatedActivityId: correlatedActivityId,
      startEpk: startEpk,
      endEpk: endEpk,
    });
  };

  public hasMoreResults(): boolean {
    return this.internalExecutionContext.hasMoreResults() || this.fetchResults.length !== 0;
  }

  public gotSplit(): boolean {
    if (this.fetchResults.length !== 0) {
      const fetchResult = this.fetchResults[0];
      if (fetchResult.fetchResultType === FetchResultType.Exception) {
        if (DocumentProducer._needPartitionKeyRangeCacheRefresh(fetchResult.error)) {
          return true;
        }
      }
    }
    return false;
  }

  private _updateStates(err: any, allFetched: boolean): void {
    if (err) {
      this.err = err;
      return;
    }
    if (allFetched) {
      this.allFetched = true;
    }
    if (this.internalExecutionContext.continuationToken === this.continuationToken) {
      // nothing changed
      return;
    }
    this.previousContinuationToken = this.continuationToken;
    this.continuationToken = this.internalExecutionContext.continuationToken;
  }

  private static _needPartitionKeyRangeCacheRefresh(error: any): boolean {
    // TODO: error
    return (
      error.code === StatusCodes.Gone &&
      "substatus" in error &&
      error["substatus"] === SubStatusCodes.PartitionKeyRangeGone
    );
  }

  /**
   * Fetches and bufferes the next page of results in internal buffer
   */
  public async bufferMore(diagnosticNode: DiagnosticNodeInternal): Promise<CosmosHeaders> {
    if (this.err) {
      throw this.err;
    }

    try {
      const { result: resourcesResult, headers: headerResponse } =
        await this.internalExecutionContext.fetchMore(diagnosticNode);
      let resources = resourcesResult;
      ++this.generation;
      this._updateStates(undefined, resources === undefined);
      // TODO: remove afterwards
      const resourceIds = resources ? resources.map((r: any) => r.payload?.id) : [];
      console.log(
        `[DOCPROD-BUFFER] Partition ${this.targetPartitionKeyRange.id} buffered ${resources?.length || 0} items with ids:`,
        resourceIds,
      );

      // Extract query execution info from headers if available
      if (headerResponse && headerResponse["x-ms-cosmos-query-execution-info"]) {
        try {
          this.queryExecutionInfo = JSON.parse(headerResponse["x-ms-cosmos-query-execution-info"]);
        } catch (e) {
          console.warn(`[DocumentProducer] Failed to parse query execution info: ${e}`);
        }
      }

      if (this.filter && resources) {
        resources = this.filter.applyFilter(resources);
      }

      if (resources !== undefined) {
        // add fetched header to the 1st element in the buffer
        let addHeaderToFetchResult = true;
        const finalItemIds: any[] = [];
        resources.forEach((element: any) => {
          finalItemIds.push(element.payload?.id);
          this.fetchResults.push(
            new FetchResult(
              element,
              undefined,
              addHeaderToFetchResult ? headerResponse : getInitialHeader(),
            ),
          );
          addHeaderToFetchResult = false;
        });
        console.log(
          `  [DOCPROD-BUFFER] Partition ${this.targetPartitionKeyRange.id} items:`,
          finalItemIds,
        );
        if (resources.length > 0 && resources[0].orderByItems) {
          console.log(`  [DOCPROD-BUFFER] First item orderByItems:`, resources[0].orderByItems);
        }
      }

      // need to modify the header response so that the query metrics are per partition
      if (headerResponse != null && Constants.HttpHeaders.QueryMetrics in headerResponse) {
        // "0" is the default partition before one is actually assigned.
        const queryMetrics = headerResponse[Constants.HttpHeaders.QueryMetrics]["0"];

        // Wraping query metrics in a object where the keys are the partition key range.
        headerResponse[Constants.HttpHeaders.QueryMetrics] = {};
        headerResponse[Constants.HttpHeaders.QueryMetrics][this.targetPartitionKeyRange.id] =
          queryMetrics;
      }
      return headerResponse;
    } catch (err: any) {
      if (DocumentProducer._needPartitionKeyRangeCacheRefresh(err)) {
        // Split just happend
        // Buffer the error so the execution context can still get the feedResponses in the itemBuffer
        const bufferedError = new FetchResult(undefined, err);
        this.fetchResults.push(bufferedError);
        return err.headers;
      } else {
        this._updateStates(err, err.resources === undefined);
        throw err;
      }
    }
  }

  public getTargetPartitionKeyRange(): PartitionKeyRange {
    return this.targetPartitionKeyRange;
  }
  /**
   * Peak the next item in the buffer
   */
  public peakNextItem(): any {
    if (this.err) {
      throw this.err;
    }
    if (this.allFetched || this.fetchResults.length === 0) {
      return undefined;
    }
    const fetchResult = this.fetchResults[0];

    switch (fetchResult.fetchResultType) {
      case FetchResultType.Done:
        return undefined;

      case FetchResultType.Exception: // do not throw this error
        return undefined;

      case FetchResultType.Result:
        return fetchResult.feedResponse;
    }
  }

  /**
   * Returns the first item in the buffered results if any, or [] otherwise.
   */
  public async fetchNextItem(): Promise<Response<any>> {
    if (this.err) {
      this._updateStates(this.err, undefined);
      throw this.err;
    }
    if (this.allFetched) {
      return { result: undefined, headers: getInitialHeader() };
    }
    try {
      const { result, headers } = this.current();
      this._updateStates(undefined, result === undefined);
      if (result === undefined || result.length === 0) {
        return { result: undefined, headers };
      }
      return { result, headers }; //
    } catch (err: any) {
      this._updateStates(err, err.item === undefined);
      throw err;
    }
  }
  /**
   * Fetches all the buffered results
   */
  public async fetchBufferedItems(): Promise<Response<any[]>> {
    if (this.err) {
      this._updateStates(this.err, undefined);
      throw this.err;
    }
    if (this.allFetched) {
      return { result: undefined, headers: getInitialHeader() };
    }
    const resources: any[] = [];
    try {
      while (this.fetchResults.length > 0) {
        const { result } = this.current();
        this._updateStates(undefined, result === undefined);
        if (result === undefined) {
          return {
            result: resources.length > 0 ? resources : undefined,
            headers: getInitialHeader(),
          };
        } else {
          resources.push(result);
        }
      }
      return { result: resources, headers: getInitialHeader() };
    } catch (err: any) {
      this._updateStates(err, err.item === undefined);
      throw err;
    }
  }

  /**
   * Retrieve the current element on the DocumentProducer.
   */
  private current(): Response<any> {
    // If something is buffered just give that
    if (this.fetchResults.length > 0) {
      const fetchResult = this.fetchResults.shift();
      // Need to unwrap fetch results
      switch (fetchResult.fetchResultType) {
        case FetchResultType.Done:
          return {
            result: undefined,
            headers: getInitialHeader(),
          };
        case FetchResultType.Exception:
          fetchResult.error.headers = getInitialHeader();
          throw fetchResult.error;
        case FetchResultType.Result:
          return {
            result: fetchResult.feedResponse,
            headers: getInitialHeader(),
          };
      }
    }

    // If there isn't anymore items left to fetch then let the user know.
    if (this.allFetched) {
      return {
        result: undefined,
        headers: getInitialHeader(),
      };
    }

    // If the internal buffer is empty, return empty result
    return { result: [], headers: getInitialHeader() };
  }

  public getQueryExecutionInfo():
    | { reverseRidEnabled: boolean; reverseIndexScan: boolean }
    | undefined {
    return this.queryExecutionInfo;
  }
}
