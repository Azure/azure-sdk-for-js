// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import PriorityQueue from "priorityqueuejs";
import semaphore from "semaphore";
import type { AzureLogger } from "@azure/logger";
import { createClientLogger } from "@azure/logger";
import { StatusCodes, SubStatusCodes } from "../common/statusCodes.js";
import type { FeedOptions, Response } from "../request/index.js";
import type { PartitionedQueryExecutionInfo } from "../request/ErrorResponse.js";
import { ErrorResponse } from "../request/ErrorResponse.js";
import { QueryRange } from "../routing/QueryRange.js";
import { SmartRoutingMapProvider } from "../routing/smartRoutingMapProvider.js";
import type { CosmosHeaders, PartitionKeyRange } from "../index.js";
import type { ExecutionContext } from "./ExecutionContext.js";
import type { SqlQuerySpec } from "./SqlQuerySpec.js";
import { DocumentProducer } from "./documentProducer.js";
import { getInitialHeader, mergeHeaders } from "./headerUtils.js";
import type { FilterContext } from "./queryFilteringStrategy/FilterStrategy.js";
import type { FilterStrategy } from "./queryFilteringStrategy/FilterStrategy.js";
import { RidSkipCountFilter } from "./queryFilteringStrategy/RidSkipCountFilter.js";
import {
  DiagnosticNodeInternal,
  DiagnosticNodeType,
} from "../diagnostics/DiagnosticNodeInternal.js";
import type { ClientContext } from "../ClientContext.js";
import type { QueryRangeMapping } from "./QueryRangeMapping.js";
import type { QueryRangeWithContinuationToken } from "../documents/ContinuationToken/CompositeQueryContinuationToken.js";
import { parseOrderByQueryContinuationToken } from "../documents/ContinuationToken/OrderByQueryContinuationToken.js";
import { parseCompositeQueryContinuationToken } from "../documents/ContinuationToken/CompositeQueryContinuationToken.js";
import {
  TargetPartitionRangeManager,
  QueryExecutionContextType,
} from "./queryFilteringStrategy/TargetPartitionRangeManager.js";
import { createParallelQueryResult } from "./ParallelQueryResult.js";
import type {
  PartitionRangeUpdate,
  PartitionRangeUpdates,
} from "../documents/ContinuationToken/PartitionRangeUpdate.js";

/** @hidden */
const logger: AzureLogger = createClientLogger("parallelQueryExecutionContextBase");

/** @hidden */
export enum ParallelQueryExecutionContextBaseStates {
  started = "started",
  inProgress = "inProgress",
  ended = "ended",
}

/** @hidden */
export abstract class ParallelQueryExecutionContextBase implements ExecutionContext {
  private err: any;
  private state: any;
  private static STATES = ParallelQueryExecutionContextBaseStates;
  private routingProvider: SmartRoutingMapProvider;
  protected sortOrders: any;
  private requestContinuation: any;
  protected respHeaders: CosmosHeaders;
  protected unfilledDocumentProducersQueue: PriorityQueue<DocumentProducer>;
  protected bufferedDocumentProducersQueue: PriorityQueue<DocumentProducer>;
  // TODO: update type of buffer from any --> generic can be used here
  protected buffer: any[];
  protected partitionDataPatchMap: Map<string, QueryRangeMapping> = new Map();
  protected patchCounter: number = 0;
  private updatedContinuationRanges: Map<string, PartitionRangeUpdate> = new Map();
  private sem: any;
  private diagnosticNodeWrapper: {
    consumed: boolean;
    diagnosticNode: DiagnosticNodeInternal;
  };
  /**
   * Provides the ParallelQueryExecutionContextBase.
   * This is the base class that ParallelQueryExecutionContext and OrderByQueryExecutionContext will derive from.
   *
   * When handling a parallelized query, it instantiates one instance of
   * DocumentProcuder per target partition key range and aggregates the result of each.
   *
   * @param clientContext - The service endpoint to use to create the client.
   * @param collectionLink - The Collection Link
   * @param options - Represents the feed options.
   * @param partitionedQueryExecutionInfo - PartitionedQueryExecutionInfo
   * @hidden
   */
  constructor(
    private clientContext: ClientContext,
    private collectionLink: string,
    private query: string | SqlQuerySpec,
    private options: FeedOptions,
    private partitionedQueryExecutionInfo: PartitionedQueryExecutionInfo,
    private correlatedActivityId: string,
  ) {
    this.clientContext = clientContext;
    this.collectionLink = collectionLink;
    this.query = query;
    this.options = options;
    this.partitionedQueryExecutionInfo = partitionedQueryExecutionInfo;
    this.correlatedActivityId = correlatedActivityId;
    this.diagnosticNodeWrapper = {
      consumed: false,
      diagnosticNode: new DiagnosticNodeInternal(
        clientContext.diagnosticLevel,
        DiagnosticNodeType.PARALLEL_QUERY_NODE,
        null,
      ),
    };
    this.diagnosticNodeWrapper.diagnosticNode.addData({ stateful: true });
    this.err = undefined;
    this.state = ParallelQueryExecutionContextBase.STATES.started;
    this.routingProvider = new SmartRoutingMapProvider(this.clientContext);
    this.sortOrders = this.partitionedQueryExecutionInfo.queryInfo.orderBy;
    this.buffer = [];
    this.requestContinuation = options ? options.continuationToken || options.continuation : null;

    // Validate continuation token usage immediately
    if (this.requestContinuation && !this.options.enableQueryControl) {
      throw new Error(
        "Continuation tokens are supported when enableQueryControl is set true in FeedOptions",
      );
    }

    // response headers of undergoing operation
    this.respHeaders = getInitialHeader();
    // Make priority queue for documentProducers
    this.unfilledDocumentProducersQueue = new PriorityQueue<DocumentProducer>(
      (a: DocumentProducer, b: DocumentProducer) => this.compareDocumentProducersByRange(a, b),
    );
    // The comparator is supplied by the derived class
    this.bufferedDocumentProducersQueue = new PriorityQueue<DocumentProducer>(
      (a: DocumentProducer, b: DocumentProducer) => this.documentProducerComparator(b, a),
    );
    // Creating the documentProducers
    this.sem = semaphore(1);
    const createDocumentProducersAndFillUpPriorityQueueFunc = async (): Promise<void> => {
      // ensure the lock is released after finishing up
      try {
        const targetPartitionRanges = await this._onTargetPartitionRanges();

        const maxDegreeOfParallelism =
          options.maxDegreeOfParallelism === undefined || options.maxDegreeOfParallelism < 1
            ? targetPartitionRanges.length
            : Math.min(options.maxDegreeOfParallelism, targetPartitionRanges.length);

        logger.info(
          "Query starting against " +
            targetPartitionRanges.length +
            " ranges with parallelism of " +
            maxDegreeOfParallelism,
        );

        let filteredPartitionKeyRanges = [];
        // The document producers generated from filteredPartitionKeyRanges
        const targetPartitionQueryExecutionContextList: DocumentProducer[] = [];

        if (this.requestContinuation) {
          // Determine the query type based on the context
          const queryType = this.getQueryType();
          let rangeManager: TargetPartitionRangeManager;

          if (queryType === QueryExecutionContextType.OrderBy) {
            rangeManager = TargetPartitionRangeManager.createForOrderByQuery({
              quereyInfo: this.partitionedQueryExecutionInfo,
            });
          } else {
            rangeManager = TargetPartitionRangeManager.createForParallelQuery({
              quereyInfo: this.partitionedQueryExecutionInfo,
            });
          }
          // Parse continuation token to get range mappings and check for split/merge scenarios
          const processedContinuationResponse = await this._handlePartitionRangeChanges(
            this.requestContinuation,
          );

          const continuationRanges = processedContinuationResponse.ranges;
          const additionalQueryInfo = this._createAdditionalQueryInfo(
            processedContinuationResponse.orderByItems,
            processedContinuationResponse.rid,
          );

          const filterResult = rangeManager.filterPartitionRanges(
            targetPartitionRanges,
            continuationRanges,
            additionalQueryInfo,
          );

          // Extract ranges and tokens from the combined result
          const rangeTokenPairs = filterResult.rangeTokenPairs;

          // Create filter context for ORDER BY queries with continuation
          let filterContext: FilterContext | undefined;
          console.log(`[ParallelQueryExecutionContextBase] Checking filter context creation:`, {
            hasOrderByItems: !!processedContinuationResponse.orderByItems,
            orderByItems: processedContinuationResponse.orderByItems,
            hasRid: !!processedContinuationResponse.rid,
            rid: processedContinuationResponse.rid,
            hasSkipCount: processedContinuationResponse.skipCount !== undefined,
            skipCount: processedContinuationResponse.skipCount
          });
          if (
            processedContinuationResponse.orderByItems &&
            processedContinuationResponse.rid &&
            processedContinuationResponse.skipCount !== undefined
          ) {
            console.log(`[ParallelQueryExecutionContextBase] ✓ Creating filter context`);
            filterContext = {
              orderByItems: processedContinuationResponse.orderByItems,
              rid: processedContinuationResponse.rid,
              skipCount: processedContinuationResponse.skipCount,
              sortOrders: this.sortOrders || [],
            };
          } else {
            console.log(`[ParallelQueryExecutionContextBase] ✗ NOT creating filter context - missing required fields`);
          }

          rangeTokenPairs.forEach((rangeTokenPair, _) => {
            const partitionTargetRange = rangeTokenPair.range;
            const continuationToken = rangeTokenPair.continuationToken;
            const filterCondition = rangeTokenPair.filteringCondition
              ? rangeTokenPair.filteringCondition
              : undefined;

            // Find EPK ranges for this partition range from processed continuation response
            const matchingContinuationRange = continuationRanges.find(
              (cr) => cr.range.id === partitionTargetRange.id,
            );
            const startEpk = matchingContinuationRange?.epkMin;
            const endEpk = matchingContinuationRange?.epkMax;

            // Only apply filter to target partition (the one from which continuation originated)
            // Use the partitionTargetRange.id directly for comparison since that's what we're processing
            const isTargetPartition = filterResult.targetPartitionId === partitionTargetRange.id;
            const partitionFilterContext = isTargetPartition ? filterContext : undefined;

            console.log(`[ParallelQueryExecutionContextBase] Partition ${partitionTargetRange.id}: isTarget=${isTargetPartition} (targetPartitionId=${filterResult.targetPartitionId} [${typeof filterResult.targetPartitionId}] vs partitionId=${partitionTargetRange.id} [${typeof partitionTargetRange.id}]), hasFilter=${!!partitionFilterContext}`);
            if (partitionFilterContext) {
              console.log(`[ParallelQueryExecutionContextBase] Target partition filter context: ${JSON.stringify({rid: partitionFilterContext.rid, skipCount: partitionFilterContext.skipCount, orderByItems: partitionFilterContext.orderByItems})}`);
            }
            console.log(`[ParallelQueryExecutionContextBase] Partition ${partitionTargetRange.id}: filterCondition=${filterCondition}`);

            targetPartitionQueryExecutionContextList.push(
              this._createTargetPartitionQueryExecutionContext(
                partitionTargetRange,
                continuationToken,
                startEpk,
                endEpk,
                !!(startEpk && endEpk), // populateEpkRangeHeaders - true if both EPK values are present
                filterCondition,
                partitionFilterContext,
              ),
            );
          });
        } else {
          filteredPartitionKeyRanges = targetPartitionRanges;
          filteredPartitionKeyRanges.forEach((partitionTargetRange: any) => {
            // TODO: any partitionTargetRange
            targetPartitionQueryExecutionContextList.push(
              this._createTargetPartitionQueryExecutionContext(partitionTargetRange, undefined),
            );
          });
        }

        // Fill up our priority queue with documentProducers
        targetPartitionQueryExecutionContextList.forEach((documentProducer): void => {
          // has async callback
          try {
            this.unfilledDocumentProducersQueue.enq(documentProducer);
          } catch (e: any) {
            this.err = e;
          }
        });

        this.sem.leave();
      } catch (err: any) {
        this.err = err;
        // release the lock
        this.sem.leave();
        return;
      }
    };
    this.sem.take(createDocumentProducersAndFillUpPriorityQueueFunc);
  }

  protected abstract documentProducerComparator(
    dp1: DocumentProducer,
    dp2: DocumentProducer,
  ): number;

  /**
   * Processes buffered document producers according to the specific query execution strategy.
   * This method is implemented by subclasses to handle OrderBy vs Parallel query processing.
   * @returns A promise that resolves when processing is complete.
   */
  protected abstract processBufferedDocumentProducers(): Promise<void>;

  /**
   * Compares two document producers based on their partition key ranges and EPK values.
   * Primary comparison: minInclusive values for left-to-right range traversal
   * Secondary comparison: EPK ranges when minInclusive values are identical
   * @param a - First document producer
   * @param b - Second document producer
   * @returns Comparison result for priority queue ordering
   * @hidden
   */
  protected compareDocumentProducersByRange(a: DocumentProducer, b: DocumentProducer): number {
    const aMinInclusive = a.targetPartitionKeyRange.minInclusive;
    const bMinInclusive = b.targetPartitionKeyRange.minInclusive;
    const minInclusiveComparison = bMinInclusive.localeCompare(aMinInclusive);

    // If minInclusive values are the same, check minEPK ranges if they exist
    if (minInclusiveComparison === 0) {
      const aMinEpk = a.startEpk;
      const bMinEpk = b.startEpk;
      if (aMinEpk && bMinEpk) {
        return bMinEpk.localeCompare(aMinEpk);
      }
    }

    return minInclusiveComparison;
  }

  protected getQueryType(): QueryExecutionContextType {
    const isOrderByQuery = this.sortOrders && this.sortOrders.length > 0;
    const queryType = isOrderByQuery
      ? QueryExecutionContextType.OrderBy
      : QueryExecutionContextType.Parallel;
    return queryType;
  }

  private _createAdditionalQueryInfo(orderByItems?: any[], rid?: string): any {
    const info: any = {};
    if (orderByItems) info.orderByItems = orderByItems;
    if (rid) info.rid = rid;
    return Object.keys(info).length > 0 ? info : undefined;
  }

  /**
   * Detects partition splits/merges by parsing continuation token ranges and comparing with current topology
   * @param continuationToken - The continuation token containing range mappings to analyze
   * @returns Object containing processed ranges with EPK info and optional orderByItems and rid for ORDER BY queries
   */
  private async _handlePartitionRangeChanges(continuationToken?: string): Promise<{
    ranges: { range: any; continuationToken?: string; epkMin?: string; epkMax?: string }[];
    orderByItems?: any[];
    rid?: string;
    skipCount?: number;
  }> {
    if (!continuationToken) {
      return { ranges: [] };
    }

    const processedRanges: {
      range: any;
      continuationToken?: string;
      epkMin?: string;
      epkMax?: string;
    }[] = [];

    // Parse continuation token and extract range mappings along with metadata
    const {
      rangeMappings,
      orderByItems: parsedOrderByItems,
      rid: parsedRid,
      skipCount: parsedSkipCount,
    } = this._parseContinuationToken(continuationToken);

    if (!rangeMappings || rangeMappings.length === 0) {
      return { 
        ranges: [], 
        orderByItems: parsedOrderByItems, 
        rid: parsedRid,
        skipCount: parsedSkipCount,
      };
    }

    // Check each range mapping for potential splits/merges
    for (const rangeWithToken of rangeMappings) {
      // Create a new QueryRange instance from the parsed JSON data
      const range = rangeWithToken.queryRange;
      const queryRange: QueryRange = new QueryRange(
        range.min,
        range.max,
        range.isMinInclusive,
        range.isMaxInclusive,
      );

      const rangeMin = queryRange.min;
      const rangeMax = queryRange.max;

      // Get current overlapping ranges for this continuation token range
      const overlappingRanges = await this.routingProvider.getOverlappingRanges(
        this.collectionLink,
        [queryRange],
        this.getDiagnosticNode(),
      );

      // Detect split/merge scenario based on the number of overlapping ranges
      if (overlappingRanges.length === 0) {
        continue;
      } else if (overlappingRanges.length === 1) {
        // Check if it's the same range (no change) or a merge scenario
        const currentRange = overlappingRanges[0];
        if (currentRange.minInclusive !== rangeMin || currentRange.maxExclusive !== rangeMax) {
          // Merge scenario - include EPK ranges from original continuation token range
          await this._handleContinuationTokenMerge(rangeWithToken, currentRange);
          processedRanges.push({
            range: currentRange,
            continuationToken: rangeWithToken.continuationToken,
            epkMin: rangeMin, // Original range min becomes EPK min
            epkMax: rangeMax, // Original range max becomes EPK max
          });
        } else {
          // Same range - no merge, no EPK ranges needed
          processedRanges.push({
            range: currentRange,
            continuationToken: rangeWithToken.continuationToken,
          });
        }
      } else {
        // Split scenario - one range from continuation token now maps to multiple ranges
        await this._handleContinuationTokenSplit(rangeWithToken, overlappingRanges);
        // Add all overlapping ranges with the same continuation token to processed ranges
        overlappingRanges.forEach((rangeValue) => {
          processedRanges.push({
            range: rangeValue,
            continuationToken: rangeWithToken.continuationToken,
          });
        });
      }
    }

    return { 
      ranges: processedRanges, 
      orderByItems: parsedOrderByItems, 
      rid: parsedRid,
      skipCount: parsedSkipCount,
    };
  }

  /**
   * Parses the continuation token to extract range mappings and metadata
   * Handles both ORDER BY and parallel query continuation tokens uniformly
   * @param continuationToken - The continuation token string to parse
   * @returns Object containing rangeMappings, orderByItems (for ORDER BY queries), and rid
   * @throws ErrorResponse when continuation token is malformed or cannot be parsed
   */
  private _parseContinuationToken(continuationToken: string): {
    rangeMappings: QueryRangeWithContinuationToken[] | null;
    orderByItems?: any[];
    rid?: string;
    skipCount?: number;
  } {
    try {
      const isOrderByQuery = this.sortOrders && this.sortOrders.length > 0;
      console.log(`[_parseContinuationToken] isOrderByQuery: ${isOrderByQuery}, sortOrders: ${JSON.stringify(this.sortOrders)}`);
      console.log(`[_parseContinuationToken] Token (first 200 chars): ${continuationToken.substring(0, 200)}`);
      
      let parsed: any;
      if (isOrderByQuery) {
        // For ORDER BY queries, parse the token and extract all needed information
        parsed = parseOrderByQueryContinuationToken(continuationToken);
        console.log(`[_parseContinuationToken] Parsed ORDER BY token:`, {
          hasRangeMappings: !!parsed?.rangeMappings,
          orderByItems: parsed?.orderByItems,
          documentRid: parsed?.documentRid,
          skipCount: parsed?.skipCount
        });

        if (parsed && parsed.rangeMappings) {
          return {
            rangeMappings: parsed.rangeMappings,
            orderByItems: parsed.orderByItems,
            rid: parsed.documentRid,
            skipCount: parsed.skipCount,
          };
        }
      } else {
        // For parallel queries, parse directly and extract range mappings
        parsed = parseCompositeQueryContinuationToken(continuationToken);
        console.log(`[_parseContinuationToken] Parsed PARALLEL token:`, {
          hasRangeMappings: !!parsed?.rangeMappings,
          rid: parsed?.rid
        });
        
        if (parsed && parsed.rangeMappings) {
          return {
            rangeMappings: parsed.rangeMappings,
          };
        }
      }
    } catch (e) {
      throw new ErrorResponse(
        `Invalid continuation token format. Expected token with rangeMappings property. ` +
          `Ensure the continuation token was generated by a compatible query and has not been modified.`,
      );
    }
  }

  /**
   * Handles partition merge scenario for continuation token ranges
   */
  private async _handleContinuationTokenMerge(
    rangeWithToken: QueryRangeWithContinuationToken,
    _newMergedRange: PartitionKeyRange,
  ): Promise<void> {
    const rangeKey = `${rangeWithToken.queryRange.min}-${rangeWithToken.queryRange.max}`;
    this.updatedContinuationRanges.set(rangeKey, {
      oldRange: {
        min: rangeWithToken.queryRange.min,
        max: rangeWithToken.queryRange.max,
        isMinInclusive: rangeWithToken.queryRange.isMinInclusive,
        isMaxInclusive: rangeWithToken.queryRange.isMaxInclusive,
      },
      newRanges: [
        {
          min: rangeWithToken.queryRange.min,
          max: rangeWithToken.queryRange.max,
          isMinInclusive: rangeWithToken.queryRange.isMinInclusive,
          isMaxInclusive: rangeWithToken.queryRange.isMaxInclusive,
        },
      ],
      continuationToken: rangeWithToken.continuationToken,
    });
  }

  /**
   * Handles partition split scenario for continuation token ranges
   */
  private async _handleContinuationTokenSplit(
    rangeWithToken: QueryRangeWithContinuationToken,
    overlappingRanges: any[],
  ): Promise<void> {
    const rangeKey = `${rangeWithToken.queryRange.min}-${rangeWithToken.queryRange.max}`;
    this.updatedContinuationRanges.set(rangeKey, {
      oldRange: {
        min: rangeWithToken.queryRange.min,
        max: rangeWithToken.queryRange.max,
        isMinInclusive: rangeWithToken.queryRange.isMinInclusive,
        isMaxInclusive: rangeWithToken.queryRange.isMaxInclusive,
      },
      newRanges: overlappingRanges.map((range) => ({
        min: range.minInclusive,
        max: range.maxExclusive,
        isMinInclusive: true,
        isMaxInclusive: false,
      })),
      continuationToken: rangeWithToken.continuationToken,
    });
  }

  /**
   * Handles partition merge scenario for continuation token ranges
   */ protected _mergeWithActiveResponseHeaders(headers: CosmosHeaders): void {
    mergeHeaders(this.respHeaders, headers);
  }

  protected _getAndResetActiveResponseHeaders(): CosmosHeaders {
    const ret = this.respHeaders;
    this.respHeaders = getInitialHeader();
    return ret;
  }

  private getDiagnosticNode(): DiagnosticNodeInternal {
    return this.diagnosticNodeWrapper.diagnosticNode;
  }

  private async _onTargetPartitionRanges(): Promise<any[]> {
    // invokes the callback when the target partition ranges are ready
    const parsedRanges = this.partitionedQueryExecutionInfo.queryRanges;
    const queryRanges = parsedRanges.map((item) => QueryRange.parseFromDict(item));
    return this.routingProvider.getOverlappingRanges(
      this.collectionLink,
      queryRanges,
      this.getDiagnosticNode(),
    );
  }

  /**
   * Gets the replacement ranges for a partitionkeyrange that has been split
   */
  private async _getReplacementPartitionKeyRanges(
    documentProducer: DocumentProducer,
    diagnosticNode: DiagnosticNodeInternal,
  ): Promise<any[]> {
    const partitionKeyRange = documentProducer.targetPartitionKeyRange;
    // Download the new routing map
    this.routingProvider = new SmartRoutingMapProvider(this.clientContext);
    // Get the queryRange that relates to this partitionKeyRange
    const queryRange = QueryRange.parsePartitionKeyRange(partitionKeyRange);
    return this.routingProvider.getOverlappingRanges(
      this.collectionLink,
      [queryRange],
      diagnosticNode,
    );
  }

  private async _enqueueReplacementDocumentProducers(
    error: any,
    diagnosticNode: DiagnosticNodeInternal,
    documentProducer: DocumentProducer,
  ): Promise<void> {
    // Get the replacement ranges
    const replacementPartitionKeyRanges = await this._getReplacementPartitionKeyRanges(
      documentProducer,
      diagnosticNode,
    );

    if (replacementPartitionKeyRanges.length === 0) {
      throw error;
    }

    if (this.requestContinuation) {
      // Update composite continuation token to handle partition split
      this._updateContinuationTokenOnPartitionChange(
        documentProducer,
        replacementPartitionKeyRanges,
      );
    }

    if (replacementPartitionKeyRanges.length === 1) {
      // Partition is gone due to Merge
      // Create the replacement documentProducer with populateEpkRangeHeaders Flag set to true to set startEpk and endEpk headers
      const replacementDocumentProducer = this._createTargetPartitionQueryExecutionContext(
        replacementPartitionKeyRanges[0],
        documentProducer.continuationToken,
        documentProducer.startEpk,
        documentProducer.endEpk,
        true,
      );

      this.unfilledDocumentProducersQueue.enq(replacementDocumentProducer);
    } else {
      // Create the replacement documentProducers
      const replacementDocumentProducers: DocumentProducer[] = [];
      replacementPartitionKeyRanges.forEach((partitionKeyRange) => {
        const queryRange = QueryRange.parsePartitionKeyRange(partitionKeyRange);
        // Create replacment document producers with the parent's continuationToken
        const replacementDocumentProducer = this._createTargetPartitionQueryExecutionContext(
          partitionKeyRange,
          documentProducer.continuationToken,
          queryRange.min,
          queryRange.max,
          false,
        );
        replacementDocumentProducers.push(replacementDocumentProducer);
      });

      // add document producers to the queue
      replacementDocumentProducers.forEach((replacementDocumentProducer) => {
        if (replacementDocumentProducer.hasMoreResults()) {
          this.unfilledDocumentProducersQueue.enq(replacementDocumentProducer);
        }
      });
    }
  }

  private _updateContinuationTokenOnPartitionChange(
    originalDocumentProducer: DocumentProducer,
    replacementPartitionKeyRanges: any[],
  ): void {
    const rangeWithToken = this._createQueryRangeWithContinuationToken(originalDocumentProducer);
    if (replacementPartitionKeyRanges.length === 1) {
      this._handleContinuationTokenMerge(rangeWithToken, replacementPartitionKeyRanges[0]);
    } else {
      this._handleContinuationTokenSplit(rangeWithToken, replacementPartitionKeyRanges);
    }
  }

  /**
   * Creates a QueryRangeWithContinuationToken object from a DocumentProducer.
   * Uses the DocumentProducer's target partition key range and continuation token.
   * @param documentProducer - The DocumentProducer to convert
   * @returns QueryRangeWithContinuationToken object for token operations
   */
  private _createQueryRangeWithContinuationToken(
    documentProducer: DocumentProducer,
  ): QueryRangeWithContinuationToken {
    const partitionRange = documentProducer.targetPartitionKeyRange;

    // Create a QueryRange using the partition key range boundaries
    const queryRange = new QueryRange(
      documentProducer.startEpk || partitionRange.minInclusive,
      documentProducer.endEpk || partitionRange.maxExclusive,
      true,
      false,
    );

    return {
      queryRange: queryRange,
      continuationToken: documentProducer.continuationToken,
    };
  }

  private static _needPartitionKeyRangeCacheRefresh(error: any): boolean {
    // TODO: any error
    return (
      error.code === StatusCodes.Gone &&
      "substatus" in error &&
      error["substatus"] === SubStatusCodes.PartitionKeyRangeGone
    );
  }

  /**
   * Determine if there are still remaining resources to processs based on the value of the continuation
   * token or the elements remaining on the current batch in the QueryIterator.
   * @returns true if there is other elements to process in the ParallelQueryExecutionContextBase.
   */
  public hasMoreResults(): boolean {
    const hasError = !!this.err;
    const bufferLength = this.buffer.length;
    const isEnded = this.state === ParallelQueryExecutionContextBase.STATES.ended;
    const result = !hasError && (bufferLength > 0 || !isEnded);
    return result;
  }

  /**
   * Creates target partition range Query Execution Context
   */
  private _createTargetPartitionQueryExecutionContext(
    partitionKeyTargetRange: any,
    continuationToken?: any,
    startEpk?: string,
    endEpk?: string,
    populateEpkRangeHeaders?: boolean,
    filterCondition?: string,
    filterContext?: FilterContext,
  ): DocumentProducer {
    let rewrittenQuery = this.partitionedQueryExecutionInfo.queryInfo.rewrittenQuery;
    let sqlQuerySpec: SqlQuerySpec;
    const query = this.query;
    if (typeof query === "string") {
      sqlQuerySpec = { query };
    } else {
      sqlQuerySpec = query;
    }

    const formatPlaceHolder = "{documentdb-formattableorderbyquery-filter}";
    if (rewrittenQuery) {
      sqlQuerySpec = JSON.parse(JSON.stringify(sqlQuerySpec));
      rewrittenQuery = filterCondition
        ? rewrittenQuery.replace(formatPlaceHolder, filterCondition)
        : rewrittenQuery.replace(formatPlaceHolder, "true");
      sqlQuerySpec["query"] = rewrittenQuery;
    }

    const options = { ...this.options };
    options.continuationToken = continuationToken;

    let filter: FilterStrategy | undefined;
    if (filterContext) {
      filter = new RidSkipCountFilter(filterContext);
    }

    return new DocumentProducer(
      this.clientContext,
      this.collectionLink,
      sqlQuerySpec,
      partitionKeyTargetRange,
      options,
      this.correlatedActivityId,
      startEpk,
      endEpk,
      populateEpkRangeHeaders,
      filter,
    );
  }
  protected async drainBufferedItems(): Promise<Response<any>> {
    return new Promise<Response<any>>((resolve, reject) => {
      this.sem.take(() => {
        if (this.err) {
          // if there is a prior error return error
          this.sem.leave();
          this.err.headers = this._getAndResetActiveResponseHeaders();
          reject(this.err);
          return;
        }

        // return undefined if there is no more results
        if (this.buffer.length === 0) {
          this.sem.leave();
          return resolve({
            result: this.state === ParallelQueryExecutionContextBase.STATES.ended ? undefined : [],
            headers: this._getAndResetActiveResponseHeaders(),
          });
        }
        // draing the entire buffer object and return that in result of return object
        const bufferedResults = this.buffer;
        this.buffer = [];
        // reset the patchToRangeMapping
        const partitionDataPatchMap = this.partitionDataPatchMap;
        this.partitionDataPatchMap = new Map<string, QueryRangeMapping>();
        this.patchCounter = 0;

        // Get and reset updated continuation ranges
        const updatedContinuationRanges: PartitionRangeUpdates = Object.fromEntries(
          this.updatedContinuationRanges,
        );
        this.updatedContinuationRanges.clear();

        // release the lock before returning
        this.sem.leave();

        const result = createParallelQueryResult(
          bufferedResults,
          partitionDataPatchMap,
          updatedContinuationRanges,
          undefined,
        );

        return resolve({
          result,
          headers: this._getAndResetActiveResponseHeaders(),
        });
      });
    });
  }

  /**
   * Buffers document producers based on the maximum degree of parallelism.
   * Moves document producers from the unfilled queue to the buffered queue.
   * @param diagnosticNode - The diagnostic node for logging and tracing.
   * @returns A promise that resolves when buffering is complete.
   */
  protected async bufferDocumentProducers(diagnosticNode?: DiagnosticNodeInternal): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.sem.take(async () => {
        if (this.err) {
          this.sem.leave();
          reject(this.err);
          return;
        }
        this.updateStates(this.err);

        if (this.state === ParallelQueryExecutionContextBase.STATES.ended) {
          this.sem.leave();
          resolve();
          return;
        }

        if (this.unfilledDocumentProducersQueue.size() === 0) {
          this.sem.leave();
          resolve();
          return;
        }

        try {
          const maxDegreeOfParallelism =
            this.options.maxDegreeOfParallelism === undefined ||
            this.options.maxDegreeOfParallelism < 1
              ? this.unfilledDocumentProducersQueue.size()
              : Math.min(
                  this.options.maxDegreeOfParallelism,
                  this.unfilledDocumentProducersQueue.size(),
                );

          const documentProducers: DocumentProducer[] = [];
          while (
            documentProducers.length < maxDegreeOfParallelism &&
            this.unfilledDocumentProducersQueue.size() > 0
          ) {
            let documentProducer: DocumentProducer;
            try {
              documentProducer = this.unfilledDocumentProducersQueue.deq();
            } catch (e: any) {
              this.err = e;
              this.err.headers = this._getAndResetActiveResponseHeaders();
              reject(this.err);
              return;
            }
            documentProducers.push(documentProducer);
          }

          const bufferDocumentProducer = async (
            documentProducer: DocumentProducer,
          ): Promise<void> => {
            try {
              const headers = await documentProducer.bufferMore(diagnosticNode);
              this._mergeWithActiveResponseHeaders(headers);

              // Always track this document producer in patchToRangeMapping, even if it has no results
              // This ensures we maintain a record of all partition ranges that were scanned
              const nextItem = documentProducer.peakNextItem();
              if (nextItem !== undefined) {
                this.bufferedDocumentProducersQueue.enq(documentProducer);
              } else {
                // Track document producer with no results in patchToRangeMapping
                // This represents a scanned partition that yielded no results
                this.partitionDataPatchMap.set((++this.patchCounter).toString(), {
                  itemCount: 0, // 0 items for empty result set
                  partitionKeyRange: documentProducer.targetPartitionKeyRange,
                  continuationToken: documentProducer.continuationToken,
                });

                if (documentProducer.hasMoreResults()) {
                  this.unfilledDocumentProducersQueue.enq(documentProducer);
                }
              }
            } catch (err) {
              if (ParallelQueryExecutionContextBase._needPartitionKeyRangeCacheRefresh(err)) {
                // We want the document producer enqueued
                // So that later parts of the code can repair the execution context
                // refresh the partition key ranges and ctreate new document producers and add it to the queue
                await this._enqueueReplacementDocumentProducers(
                  err,
                  diagnosticNode,
                  documentProducer,
                );
                resolve();
              } else {
                this.err = err;
                this.err.headers = this._getAndResetActiveResponseHeaders();
                reject(err);
              }
            }
          };

          try {
            await Promise.all(
              documentProducers.map((producer) => bufferDocumentProducer(producer)),
            );
          } catch (err) {
            this.err = err;
            this.err.headers = this._getAndResetActiveResponseHeaders();
            reject(err);
            return;
          }
          resolve();
        } catch (err) {
          this.err = err;
          this.err.headers = this._getAndResetActiveResponseHeaders();
          reject(err);
        } finally {
          this.sem.leave();
        }
      });
    });
  }
  /**
   * Drains the buffer of filled document producers and appends their items to the main buffer.
   * Uses template method pattern - delegates actual processing to subclasses.
   * @returns A promise that resolves when the buffer is filled.
   */
  protected async fillBufferFromBufferQueue(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.sem.take(async () => {
        if (this.err) {
          // if there is a prior error return error
          this.sem.leave();
          this.err.headers = this._getAndResetActiveResponseHeaders();
          reject(this.err);
          return;
        }

        if (
          this.state === ParallelQueryExecutionContextBase.STATES.ended ||
          this.bufferedDocumentProducersQueue.size() === 0
        ) {
          this.sem.leave();
          resolve();
          return;
        }

        try {
          // Delegate the actual processing logic to subclasses
          await this.processBufferedDocumentProducers();
          this.updateStates(this.err);
        } catch (err) {
          this.err = err;
          this.err.headers = this._getAndResetActiveResponseHeaders();
          reject(this.err);
          return;
        } finally {
          // release the lock before returning
          this.sem.leave();
        }
        resolve();
        return;
      });
    });
  }

  private updateStates(error: any): void {
    if (error) {
      this.err = error;
      this.state = ParallelQueryExecutionContextBase.STATES.ended;
      return;
    }

    if (this.state === ParallelQueryExecutionContextBase.STATES.started) {
      this.state = ParallelQueryExecutionContextBase.STATES.inProgress;
    }

    const hasNoActiveProducers =
      this.unfilledDocumentProducersQueue.size() === 0 &&
      this.bufferedDocumentProducersQueue.size() === 0;

    if (hasNoActiveProducers) {
      this.state = ParallelQueryExecutionContextBase.STATES.ended;
    }
  }
}
