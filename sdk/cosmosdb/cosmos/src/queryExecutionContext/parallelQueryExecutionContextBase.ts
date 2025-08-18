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
import type { CosmosHeaders } from "../index.js";
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
import {
  TargetPartitionRangeManager,
  QueryExecutionContextType,
} from "./TargetPartitionRangeManager.js";
import { ContinuationTokenManager } from "./ContinuationTokenManager.js";

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
  // a data structure  to hold indexes of buffer wrt to partition key ranges, like index 0-21 belong to partition key range 1, index 22-45 belong to partition key range 2, etc.
  // along partition key range it will also hold continuation token for that partition key range
  // patch id + doc range + continuation token
  // e.g. { 0: { indexes: [0, 21], continuationToken: "token" } }
  private patchToRangeMapping: Map<string, QueryRangeMapping> = new Map();
  private patchCounter: number = 0;
  private sem: any;
  protected continuationTokenManager: ContinuationTokenManager | undefined;
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
    this.continuationTokenManager = this.options.continuationTokenManager;

    this.requestContinuation = options ? options.continuationToken || options.continuation : null;
    // response headers of undergoing operation
    this.respHeaders = getInitialHeader();
    // Make priority queue for documentProducers
    this.unfilledDocumentProducersQueue = new PriorityQueue<DocumentProducer>(
      (a: DocumentProducer, b: DocumentProducer) => {
        // Compare based on minInclusive values to ensure left-to-right range traversal
        const aMinInclusive = a.targetPartitionKeyRange.minInclusive;
        const bMinInclusive = b.targetPartitionKeyRange.minInclusive;
        return aMinInclusive.localeCompare(bMinInclusive);
      },
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
        let continuationTokens: string[] = [];
        // The document producers generated from filteredPartitionKeyRanges
        const targetPartitionQueryExecutionContextList: DocumentProducer[] = [];

        if (this.requestContinuation) {
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

          console.log("Filtering partition ranges using continuation token");
          const filterResult = await rangeManager.filterPartitionRanges(
            targetPartitionRanges,
            this.requestContinuation,
          );

          filteredPartitionKeyRanges = filterResult.filteredRanges;
          continuationTokens = filterResult.continuationToken;
          const filteringConditions = filterResult.filteringConditions;

          filteredPartitionKeyRanges.forEach((partitionTargetRange: any, index: number) => {
            const continuationToken = continuationTokens ? continuationTokens[index] : undefined;
            const filterCondition = filteringConditions ? filteringConditions[index] : undefined;

            // Extract EPK values from the partition range if available
            const startEpk = partitionTargetRange.epkMin || undefined;
            const endEpk = partitionTargetRange.epkMax || undefined;

            console.log(
              `Creating document producer for range ${partitionTargetRange.id}: ` +
              `logical=[${partitionTargetRange.minInclusive}, ${partitionTargetRange.maxExclusive})` +
              (startEpk && endEpk ? `, EPK=[${startEpk}, ${endEpk})` : ', EPK=none')
            );

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
   * Determines the query execution context type based on available information
   * @returns The detected query execution context type
   */
  protected getQueryType(): QueryExecutionContextType {
    const isOrderByQuery = this.sortOrders && this.sortOrders.length > 0;
    const queryType = isOrderByQuery
      ? QueryExecutionContextType.OrderBy
      : QueryExecutionContextType.Parallel;
    return queryType;
  }

  private _mergeWithActiveResponseHeaders(headers: CosmosHeaders): void {
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

    // Update continuation token to handle partition split
    this._updateContinuationTokenForPartitionSplit(
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
    
    console.log(`=== Completed Partition Split Handling ===`);
  }

  /**
   * Updates the continuation token to handle both partition split and merge scenarios.
   * For splits: Removes the old partition range and adds new ranges with preserved EPK boundaries.
   * For merges: Finds all overlapping ranges, preserves their EPK boundaries, and creates a single merged range.
   * @param originalDocumentProducer - The document producer for the original partition that was split/merged
   * @param replacementPartitionKeyRanges - The new partition ranges after the split/merge
   */
  private _updateContinuationTokenForPartitionSplit(
    originalDocumentProducer: DocumentProducer,
    replacementPartitionKeyRanges: any[],
  ): void {
    // Skip continuation token update if manager is not available (e.g: non-streaming queries)
    if (!this.continuationTokenManager) {
      return;
    }

    // Get the composite continuation token from the continuation token manager
    const compositeContinuationToken = this.continuationTokenManager.getCompositeContinuationToken();
    if (!compositeContinuationToken || !compositeContinuationToken.rangeMappings) {
      return;
    }

    const originalPartitionKeyRange = originalDocumentProducer.targetPartitionKeyRange;
    console.log(
      `Processing ${replacementPartitionKeyRanges.length === 1 ? 'merge' : 'split'} scenario for partition ${originalPartitionKeyRange.id}`
    );

    if (replacementPartitionKeyRanges.length === 1) {
      this._handlePartitionMerge(compositeContinuationToken, originalDocumentProducer, replacementPartitionKeyRanges[0]);
    } else {
      this._handlePartitionSplit(compositeContinuationToken, originalDocumentProducer, replacementPartitionKeyRanges);
    }
  }

  /**
   * Handles partition merge scenario by updating range with EPK boundaries.
   * Iterates over composite continuation token range mappings to find overlapping range with the document producer's range.
   * Sets epkMin/epkMax to current minInclusive/maxExclusive, then updates logical boundaries to new merged range.
   */
  private _handlePartitionMerge(
    compositeContinuationToken: any,
    documentProducer: DocumentProducer,
    newMergedRange: any,
  ): void {
    const documentProducerRange = documentProducer.targetPartitionKeyRange;
    console.log(`Processing merge scenario for document producer range ${documentProducerRange.id} -> merged range ${newMergedRange.id}`);
    // Iterate over all range mappings in the composite continuation token
    for (let i = 0; i < compositeContinuationToken.rangeMappings.length; i++) {
      const mapping = compositeContinuationToken.rangeMappings[i];
      
      if (!mapping || !mapping.partitionKeyRange) {
        continue;
      }

      const existingRange = mapping.partitionKeyRange;
      
      // Check if this range overlaps with the document producer's target range
      // Use simple range overlap logic: ranges overlap if one starts before the other ends
      const rangesOverlap = 
        documentProducerRange.minInclusive === existingRange.minInclusive &&
        existingRange.maxExclusive === documentProducerRange.maxExclusive;
      // TODO: add more unit tests for this part
      if (rangesOverlap) {
        console.log(`Found overlapping range ${existingRange.id} [${existingRange.minInclusive}, ${existingRange.maxExclusive})`);

        // Step 1: Add EPK boundaries using current logical boundaries
        existingRange.epkMin = existingRange.minInclusive;
        existingRange.epkMax = existingRange.maxExclusive;

        console.log(`Set EPK boundaries for range ${existingRange.id}: epkMin=${existingRange.epkMin}, epkMax=${existingRange.epkMax}`);

        // Step 2: Update logical boundaries to match the new merged range
        existingRange.minInclusive = newMergedRange.minInclusive;
        existingRange.maxExclusive = newMergedRange.maxExclusive;
        
        // Also update the range ID to reflect the merge
        existingRange.id = newMergedRange.id;
        
        console.log(
          `Updated range ${newMergedRange.id} logical boundaries to [${newMergedRange.minInclusive}, ${newMergedRange.maxExclusive}) ` +
          `while preserving EPK boundaries [${existingRange.epkMin}, ${existingRange.epkMax})`
        );
        break;
      }
    }
  }

  /**
   * Handles partition split scenario by replacing a single range with multiple ranges,
   * preserving EPK boundaries from the original range.
   */
  private _handlePartitionSplit(
    compositeContinuationToken: any,
    originalDocumentProducer: DocumentProducer,
    replacementPartitionKeyRanges: any[],
  ): void {
    const originalPartitionKeyRange = originalDocumentProducer.targetPartitionKeyRange;
    
    // Find and remove the original partition range from the continuation token
    const originalRangeIndex = compositeContinuationToken.rangeMappings.findIndex(
      (mapping: any) =>
        mapping &&
        mapping.partitionKeyRange &&
        mapping.partitionKeyRange.minInclusive === originalPartitionKeyRange.minInclusive &&
        mapping.partitionKeyRange.maxExclusive === originalPartitionKeyRange.maxExclusive
    );

    if (originalRangeIndex !== -1) {
      // Remove the original range mapping
      compositeContinuationToken.rangeMappings.splice(originalRangeIndex, 1);
      console.log(`Removed original partition range ${originalPartitionKeyRange.id} from continuation token for split`);

      // Add new range mappings for each replacement partition with preserved EPK boundaries
      replacementPartitionKeyRanges.forEach((newPartitionKeyRange) => {
        const newRangeMapping: QueryRangeMapping = {
          partitionKeyRange: newPartitionKeyRange,
          // Use the original continuation token for all replacement ranges
          continuationToken: originalDocumentProducer.continuationToken,
          itemCount: 0, // Start with 0 items for new partition
        };

        compositeContinuationToken.addRangeMapping(newRangeMapping);
        console.log(`Added new partition range ${newPartitionKeyRange.id} to continuation token`);
      });

      console.log(
        `Successfully updated continuation token for partition split: ` +
        `${originalPartitionKeyRange.id} -> [${replacementPartitionKeyRanges.map(r => r.id).join(', ')}]`
      );
    }
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
   * Gets the continuation token manager for this execution context
   * @returns The continuation token manager instance
   */
  public getContinuationTokenManager(): ContinuationTokenManager | undefined {
    return this.continuationTokenManager;
  }

  /**
   * Gets the current continuation token string from the token manager
   * @returns Current continuation token string or undefined
   */
  public getCurrentContinuationToken(): string | undefined {
    return this.continuationTokenManager?.getTokenString();
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
            result: {
              buffer:
                this.state === ParallelQueryExecutionContextBase.STATES.ended ? undefined : [],
              partitionKeyRangeMap: this.patchToRangeMapping,
            },
            headers: this._getAndResetActiveResponseHeaders(),
          });
        }
        // draing the entire buffer object and return that in result of return object
        const bufferedResults = this.buffer;
        this.buffer = [];
        // reset the patchToRangeMapping
        const patchToRangeMapping = this.patchToRangeMapping;
        this.patchToRangeMapping = new Map<string, QueryRangeMapping>();
        this.patchCounter = 0;
        
        // Update continuation token manager with the current partition mappings
        this.continuationTokenManager?.setPartitionKeyRangeMap(patchToRangeMapping);

        // release the lock before returning
        this.sem.leave();

        return resolve({
          result: { buffer: bufferedResults, partitionKeyRangeMap: patchToRangeMapping },
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
                this.patchToRangeMapping.set(this.patchCounter.toString(), {
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
                if (
                  documentProducer.targetPartitionKeyRange.id !==
                  this.patchToRangeMapping.get(this.patchCounter.toString())?.partitionKeyRange?.id
                ) {
                  this.patchCounter++;
                  this.patchToRangeMapping.set(this.patchCounter.toString(), {
                    itemCount: 1, // Start with 1 item for new patch
                    partitionKeyRange: documentProducer.targetPartitionKeyRange,
                    continuationToken: documentProducer.continuationToken,
                  });
                } else {
                  const currentPatch = this.patchToRangeMapping.get(this.patchCounter.toString());
                  if (currentPatch) {
                    currentPatch.itemCount++; // Increment item count for same partition
                    currentPatch.continuationToken = documentProducer.continuationToken;
                  }
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
              if (result && result.length > 0) {
                this.buffer.push(...result);
                // add a marker to buffer stating the partition key range and continuation token
                this.patchToRangeMapping.set(this.patchCounter.toString(), {
                  itemCount: result.length, // Use actual result length for item count
                  partitionKeyRange: documentProducer.targetPartitionKeyRange,
                  continuationToken: documentProducer.continuationToken,
                });
              } else {
                // Document producer returned empty results - still track it in patchToRangeMapping
                this.patchToRangeMapping.set(this.patchCounter.toString(), {
                  itemCount: 0, // 0 items for empty result set
                  partitionKeyRange: documentProducer.targetPartitionKeyRange,
                  continuationToken: documentProducer.continuationToken,
                });
              }
              this.patchCounter++;
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
