// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import PriorityQueue from "priorityqueuejs";
import semaphore from "semaphore";
import type { AzureLogger } from "@azure/logger";
import { createClientLogger } from "@azure/logger";
import { StatusCodes, SubStatusCodes } from "../common/statusCodes.js";
import type { FeedOptions, Response } from "../request/index.js";
import type { PartitionedQueryExecutionInfo } from "../request/ErrorResponse.js";
import { QueryRange } from "../routing/QueryRange.js";
import { SmartRoutingMapProvider } from "../routing/smartRoutingMapProvider.js";
import type { CosmosHeaders, PartitionKey, PartitionKeyRange } from "../index.js";
import type { ExecutionContext } from "./ExecutionContext.js";
import type { SqlQuerySpec } from "./SqlQuerySpec.js";
import { DocumentProducer } from "./documentProducer.js";
import { getInitialHeader, mergeHeaders } from "./headerUtils.js";
import {
  DiagnosticNodeInternal,
  DiagnosticNodeType,
} from "../diagnostics/DiagnosticNodeInternal.js";
import type { ClientContext } from "../ClientContext.js";
import type { QueryRangeMapping } from "./QueryRangeMapping.js";
import type { CompositeQueryContinuationToken, QueryRangeWithContinuationToken } from "../documents/ContinuationToken/CompositeQueryContinuationToken.js";
import { parseCompositeQueryContinuationToken } from "../documents/ContinuationToken/CompositeQueryContinuationToken.js";
import {
  TargetPartitionRangeManager,
  QueryExecutionContextType,
} from "./queryFilteringStrategy/TargetPartitionRangeManager.js";
import { createParallelQueryResult } from "./ParallelQueryResult.js";
import { parseOrderByQueryContinuationToken } from "../documents/ContinuationToken/OrderByQueryContinuationToken.js";
import type { PartitionRangeUpdate, PartitionRangeUpdates } from "../documents/ContinuationToken/PartitionRangeUpdate.js";

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
  private respHeaders: CosmosHeaders;
  private unfilledDocumentProducersQueue: PriorityQueue<DocumentProducer>;
  private bufferedDocumentProducersQueue: PriorityQueue<DocumentProducer>;
  // TODO: update type of buffer from any --> generic can be used here
  private buffer: any[];
  private partitionDataPatchMap: Map<string, QueryRangeMapping> = new Map();
  private patchCounter: number = 0;
  private updatedContinuationRanges: Map<string, PartitionRangeUpdate> = new Map();
  private sem: any;
  // protected continuationTokenManager: ContinuationTokenManager;
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
    // this.continuationTokenManager = this.options.continuationTokenManager;

    this.requestContinuation = options ? options.continuationToken || options.continuation : null;
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
          if(!this.options.enableQueryControl){
             throw new Error("Continuation tokens are supported when enableQueryControl is set true in FeedOptions");
          }
          // Determine the query type based on the context
          const queryType = this.getQueryType();
          let rangeManager: TargetPartitionRangeManager;

          if (queryType === QueryExecutionContextType.OrderBy) {
            console.log("Using ORDER BY query range strategy");
            rangeManager = TargetPartitionRangeManager.createForOrderByQuery({
              quereyInfo: this.partitionedQueryExecutionInfo,
            });
          } else {
            console.log("Using Parallel query range strategy");
            rangeManager = TargetPartitionRangeManager.createForParallelQuery({
              quereyInfo: this.partitionedQueryExecutionInfo,
            });
          }
          // Parse continuation token to get range mappings and check for split/merge scenarios
          const continuationResult = await this._detectAndHandlePartitionChanges(
            this.requestContinuation
          );
          
          const continuationRanges = continuationResult.ranges;
          const orderByItems = continuationResult.orderByItems;
          const rid = continuationResult.rid;

          // Create additional query info containing orderByItems and rid for ORDER BY queries
          const additionalQueryInfo: any = {};
          if (orderByItems) {
            additionalQueryInfo.orderByItems = orderByItems;
          }
          if (rid) {
            additionalQueryInfo.rid = rid;
          }
          
          const filterResult = rangeManager.filterPartitionRanges(
            targetPartitionRanges,
            continuationRanges,
            Object.keys(additionalQueryInfo).length > 0 ? additionalQueryInfo : undefined,
          );

          // Extract ranges and tokens from the combined result
          const rangeTokenPairs = filterResult.rangeTokenPairs;

          rangeTokenPairs.forEach((rangeTokenPair) => {
            const partitionTargetRange = rangeTokenPair.range;
            const continuationToken = rangeTokenPair.continuationToken;
            const filterCondition = rangeTokenPair.filteringCondition ? rangeTokenPair.filteringCondition : undefined;
            // TODO: add un it test for this
            // Extract EPK values from the partition range if available
            const startEpk = (partitionTargetRange as any).epkMin;
            const endEpk = (partitionTargetRange as any).epkMax;

            targetPartitionQueryExecutionContextList.push(
              this._createTargetPartitionQueryExecutionContext(
                partitionTargetRange,
                continuationToken,
                startEpk, // Use EPK min from continuation token
                endEpk, // Use EPK max from continuation token
                !!(startEpk && endEpk), // populateEpkRangeHeaders - true if both EPK values are present
                filterCondition,
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
   * Compares two document producers based on their partition key ranges and EPK values.
   * Primary comparison: minInclusive values for left-to-right range traversal
   * Secondary comparison: EPK ranges when minInclusive values are identical
   * @param a - First document producer
   * @param b - Second document producer
   * @returns Comparison result for priority queue ordering
   * @hidden
   */
  protected compareDocumentProducersByRange(
    a: DocumentProducer,
    b: DocumentProducer,
  ): number {
    // Compare based on minInclusive values to ensure left-to-right range traversal
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

  /**
   * Detects partition splits/merges by parsing continuation token ranges and comparing with current topology
   * @param continuationToken - The continuation token containing range mappings to analyze
   * @returns Object containing processed ranges and optional orderByItems and rid for ORDER BY queries
   */
  private async _detectAndHandlePartitionChanges(
    continuationToken?: string
  ): Promise<{ ranges: { range: any; continuationToken?: string }[]; orderByItems?: any[]; rid?: string }> {
    if (!continuationToken) {
      console.log("No continuation token provided, returning empty processed ranges");
      return { ranges: [] };
    }

    const processedRanges: { range: any; continuationToken?: string }[] = [];
    let orderByItems: any[] | undefined;
    let rid: string | undefined;

    try {
      // Parse the continuation token to get range mappings and orderByItems
      const parsedTokenRanges = this._parseRanges(continuationToken);
      if (!parsedTokenRanges) {
        return { ranges: [] };
      }

      // Extract orderByItems and rid for ORDER BY queries
      const isOrderByQuery = this.sortOrders && this.sortOrders.length > 0;
      if (isOrderByQuery) {
        // For ORDER BY queries, parse the outer structure to get orderByItems and rid
        const outerParsed = parseOrderByQueryContinuationToken(continuationToken);
        if (outerParsed) {
          if (outerParsed.orderByItems) {
            orderByItems = outerParsed.orderByItems;
          }
          if (outerParsed.rid) {
            rid = outerParsed.rid;
          }
        }
      }

      const compositeContinuationToken = parsedTokenRanges;
      if (!compositeContinuationToken || !compositeContinuationToken.rangeMappings) {
        return { ranges: [], orderByItems, rid };
      }

      // Check each range mapping for potential splits/merges
      for (const rangeWithToken of compositeContinuationToken.rangeMappings) {
        const queryRange = rangeWithToken.queryRange;
        const rangeMin = queryRange.min;
        const rangeMax = queryRange.max;


        // Get current overlapping ranges for this continuation token range
        const overlappingRanges = await this.routingProvider.getOverlappingRanges(
          this.collectionLink,
          [queryRange],
          this.getDiagnosticNode()
        );
        // Detect split/merge scenario based on the number of overlapping ranges
        if (overlappingRanges.length === 0) {
          continue;
        } else if (overlappingRanges.length === 1) {
          // Check if it's the same range (no change) or a merge scenario
          const currentRange = overlappingRanges[0];
          if (currentRange.minInclusive !== rangeMin || currentRange.maxExclusive !== rangeMax) {
            await this._handleContinuationTokenMerge(rangeWithToken, currentRange);
            // add epk ranges to current range
            currentRange.epkMin = rangeMin;
            currentRange.epkMax = rangeMax;
          }
          // Add the current overlapping range with its continuation token to processed ranges
          processedRanges.push({
            range: currentRange,
            continuationToken: rangeWithToken.continuationToken
          });
        } else {
          // Split scenario - one range from continuation token now maps to multiple ranges
          await this._handleContinuationTokenSplit(rangeWithToken, overlappingRanges); 
          // Add all overlapping ranges with the same continuation token to processed ranges
          overlappingRanges.forEach(range => {
            processedRanges.push({
              range: range,
              continuationToken: rangeWithToken.continuationToken
            });
          });
        }
      }

      return { ranges: processedRanges, orderByItems, rid };
    } catch (error) {
      console.error("Error detecting partition changes:", error);
      // Fall back to empty array if detection fails
      return { ranges: [] };
    }
  }

  /**
   * Parses the continuation token to extract range mappings
   */
  private _parseRanges(continuationToken: string): CompositeQueryContinuationToken | null {
    try {
      // Handle both ORDER BY and parallel query continuation tokens
      const isOrderByQuery = this.sortOrders && this.sortOrders.length > 0;
      
      if (isOrderByQuery) {
        // For ORDER BY queries, the continuation token has rangeMappings property
        const parsed = JSON.parse(continuationToken);
        if (parsed && parsed.rangeMappings) {
          // Convert rangeMappings directly to composite token structure
          return {
            rid: parsed.rid,
            rangeMappings: parsed.rangeMappings
          };
        }
      } else {
        // For parallel queries, parse directly
        return parseCompositeQueryContinuationToken(continuationToken);
      }
      
      return null;
    } catch (error) {
      console.error("Failed to parse continuation token:", error);
      return null;
    }
  }

  /**
   * Handles partition merge scenario for continuation token ranges
   */
  private async _handleContinuationTokenMerge(
    rangeWithToken: QueryRangeWithContinuationToken,
    _newMergedRange: PartitionKeyRange
  ): Promise<void> {
    const rangeKey = `${rangeWithToken.queryRange.min}-${rangeWithToken.queryRange.max}`;
    this.updatedContinuationRanges.set(rangeKey, {
      oldRange: {
        min: rangeWithToken.queryRange.min,
        max: rangeWithToken.queryRange.max,
        isMinInclusive: rangeWithToken.queryRange.isMinInclusive,
        isMaxInclusive: rangeWithToken.queryRange.isMaxInclusive
      },
      newRanges: [{
        min: rangeWithToken.queryRange.min,
        max: rangeWithToken.queryRange.max,
        isMinInclusive: rangeWithToken.queryRange.isMinInclusive,
        isMaxInclusive: rangeWithToken.queryRange.isMaxInclusive
      }],
      continuationToken: rangeWithToken.continuationToken 
    });
  }

  /**
   * Handles partition split scenario for continuation token ranges
   */
  private async _handleContinuationTokenSplit(
    rangeWithToken: QueryRangeWithContinuationToken,
    overlappingRanges: any[]
  ): Promise<void> {
    const rangeKey = `${rangeWithToken.queryRange.min}-${rangeWithToken.queryRange.max}`;
    this.updatedContinuationRanges.set(rangeKey, {
      oldRange: {
        min: rangeWithToken.queryRange.min,
        max: rangeWithToken.queryRange.max,
        isMinInclusive: rangeWithToken.queryRange.isMinInclusive,
        isMaxInclusive: rangeWithToken.queryRange.isMaxInclusive
      },
      newRanges: overlappingRanges.map(range => ({
        min: range.minInclusive,
        max: range.maxExclusive,
        isMinInclusive: true,
        isMaxInclusive: false
      })),
      continuationToken: rangeWithToken.continuationToken 
    });
  }

  /**
   * Handles partition merge scenario for continuation token ranges
   */  private _mergeWithActiveResponseHeaders(headers: CosmosHeaders): void {
    mergeHeaders(this.respHeaders, headers);
  }

  private _getAndResetActiveResponseHeaders(): CosmosHeaders {
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
    console.log(`=== Handling Partition Split for ${documentProducer.targetPartitionKeyRange.id} ===`);
    
    // Get the replacement ranges
    const replacementPartitionKeyRanges = await this._getReplacementPartitionKeyRanges(
      documentProducer,
      diagnosticNode,
    );

    console.log(
      `Partition ${documentProducer.targetPartitionKeyRange.id} ${replacementPartitionKeyRanges.length === 1 ? 'merged' : 'split'} into ${replacementPartitionKeyRanges.length} range${replacementPartitionKeyRanges.length > 1 ? 's' : ''}: ` +
      `[${replacementPartitionKeyRanges.map(r => r.id).join(', ')}]`
    );

    if (replacementPartitionKeyRanges.length === 0) {
      throw error;
    }

    // Update composite continuation token to handle partition split
    this._updateContinuationTokenOnPartitionChange(
      documentProducer,
      replacementPartitionKeyRanges,
    );

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
      console.log(`Created single replacement document producer for merge scenario`);
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
      console.log(`Created ${replacementDocumentProducers.length} replacement document producers for split scenario`);
    }
  }

  /**
   * Updates the continuation token to handle both partition split and merge scenarios.
   * For splits: Removes the old partition range and adds new ranges with preserved EPK boundaries.
   * For merges: Finds all overlapping ranges, preserves their EPK boundaries, and creates a single merged range.
   * @param originalDocumentProducer - The document producer for the original partition that was split/merged
   * @param replacementPartitionKeyRanges - The new partition ranges after the split/merge
   */
  private _updateContinuationTokenOnPartitionChange(
    originalDocumentProducer: DocumentProducer,
    replacementPartitionKeyRanges: any[],
  ): void {
    
    if (replacementPartitionKeyRanges.length === 1) {
      this._handleContinuationTokenMerge(originalDocumentProducer, replacementPartitionKeyRanges[0]);
    } else {
      this._handleContinuationTokenSplit(originalDocumentProducer, replacementPartitionKeyRanges);
    }
  }

  /**
   * Handles partition merge scenario by updating range with EPK boundaries.
   * Finds matching range, preserves EPK boundaries, and updates to new merged range properties.
   */
  private _handlePartitionMerge(
    documentProducer: DocumentProducer,
    newMergedRange: any,
  ): void {
    const documentProducerRange = documentProducer.getTargetPartitionKeyRange();
    // Track the range update for continuation token management (merge scenario)
    const rangeKey = `${documentProducerRange.minInclusive}-${documentProducerRange.maxExclusive}`;
    this.updatedContinuationRanges.set(rangeKey, {
      oldRange: {
        minInclusive: documentProducerRange.minInclusive,
        maxExclusive: documentProducerRange.maxExclusive,
        id: documentProducerRange.id
      },
      newRanges: [{
        minInclusive: newMergedRange.minInclusive,
        maxExclusive: newMergedRange.maxExclusive,
        id: newMergedRange.id
      }],
      continuationToken: documentProducer.continuationToken
    });
  }

  /**
   * Handles partition split scenario by replacing a single range with multiple ranges,
   * preserving EPK boundaries from the original range.
   */
  private _handlePartitionSplit(
    originalDocumentProducer: DocumentProducer,
    replacementPartitionKeyRanges: PartitionKey[],
  ): void {
    const originalRange = originalDocumentProducer.targetPartitionKeyRange;
    // Track the range update for continuation token management
    const rangeKey = `${originalRange.minInclusive}-${originalRange.maxExclusive}`;
    this.updatedContinuationRanges.set(rangeKey, {
      oldRange: {
        minInclusive: originalRange.minInclusive,
        maxExclusive: originalRange.maxExclusive,
        id: originalRange.id
      },
      newRanges: replacementPartitionKeyRanges.map(range => ({
        minInclusive: range.minInclusive,
        maxExclusive: range.maxExclusive,
        id: range.id
      })),
      continuationToken: originalDocumentProducer.continuationToken
    });
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
    return (
      !this.err &&
      (this.buffer.length > 0 || this.state !== ParallelQueryExecutionContextBase.STATES.ended)
    );
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
      // We hardcode the formattable filter to true for now
      rewrittenQuery = filterCondition
        ? rewrittenQuery.replace(formatPlaceHolder, filterCondition)
        : rewrittenQuery.replace(formatPlaceHolder, "true");
      sqlQuerySpec["query"] = rewrittenQuery;
    }

    const options = { ...this.options };
    options.continuationToken = continuationToken;

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
        const updatedContinuationRanges: PartitionRangeUpdates = Object.fromEntries(this.updatedContinuationRanges);
        this.updatedContinuationRanges.clear();
        
        // release the lock before returning
        this.sem.leave();

        const result = createParallelQueryResult(
          bufferedResults,
          partitionDataPatchMap,
          updatedContinuationRanges,
          undefined
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
                this.partitionDataPatchMap.set(this.patchCounter.toString(), {
                  itemCount: 0, // 0 items for empty result set
                  partitionKeyRange: documentProducer.targetPartitionKeyRange,
                  continuationToken: documentProducer.continuationToken,
                });
                this.patchCounter++;

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
   * @param isOrderBy - Indicates if the query is an order by query.
   * @returns A promise that resolves when the buffer is filled.
   */
  protected async fillBufferFromBufferQueue(isOrderBy: boolean = false): Promise<void> {
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
          if (isOrderBy) {
            let documentProducer; // used to track the last document producer
            while (
              this.unfilledDocumentProducersQueue.isEmpty() &&
              this.bufferedDocumentProducersQueue.size() > 0
            ) {
              documentProducer = this.bufferedDocumentProducersQueue.deq();
              const { result, headers } = await documentProducer.fetchNextItem();
              this._mergeWithActiveResponseHeaders(headers);

              if (result) {
                this.buffer.push(result);
                // Update PartitionDataPatchMap
                const currentPatch = this.partitionDataPatchMap.get(this.patchCounter.toString());
                const isSamePartition = currentPatch?.partitionKeyRange?.id === documentProducer.targetPartitionKeyRange.id;
                
                if (!isSamePartition) {
                  this.partitionDataPatchMap.set((++this.patchCounter).toString(), {
                    itemCount: 1,
                    partitionKeyRange: documentProducer.targetPartitionKeyRange,
                    continuationToken: documentProducer.continuationToken,
                  });
                } else if (currentPatch) {
                  currentPatch.itemCount++;
                  currentPatch.continuationToken = documentProducer.continuationToken;
                }
              }
              if (documentProducer.peakNextItem() !== undefined) {
                this.bufferedDocumentProducersQueue.enq(documentProducer);
              } else if (documentProducer.hasMoreResults()) {
                this.unfilledDocumentProducersQueue.enq(documentProducer);
              } else {
                // no more results in document producer
              }
            }
          } else {
            while (this.bufferedDocumentProducersQueue.size() > 0) {
              const documentProducer = this.bufferedDocumentProducersQueue.deq();
              const { result, headers } = await documentProducer.fetchBufferedItems();
              this._mergeWithActiveResponseHeaders(headers);
              
              // add a marker to buffer stating the partition key range and continuation token
              this.partitionDataPatchMap.set((++this.patchCounter).toString(), {
                itemCount: result?.length || 0, // Use actual result length for item count, 0 if no results
                partitionKeyRange: documentProducer.targetPartitionKeyRange,
                continuationToken: documentProducer.continuationToken,
              });
              
              if (result?.length > 0) {
                this.buffer.push(...result);
              }
              if (documentProducer.hasMoreResults()) {
                this.unfilledDocumentProducersQueue.enq(documentProducer);
              }
            }
          }
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
