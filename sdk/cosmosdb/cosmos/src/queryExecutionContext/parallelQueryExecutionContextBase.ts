// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import PriorityQueue from "priorityqueuejs";
import semaphore from "semaphore";
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
import type { FilterContext, FilterStrategy } from "./queryFilteringStrategy/FilterStrategy.js";
import { RidSkipCountFilter } from "./queryFilteringStrategy/RidSkipCountFilter.js";
import type {
  PartitionRangeWithContinuationToken,
  TargetPartitionRangeManager,
} from "./queryFilteringStrategy/TargetPartitionRangeManager.js";
import type { QueryProcessingStrategy } from "./queryProcessingStrategy/QueryProcessingStrategy.js";
import {
  DiagnosticNodeInternal,
  DiagnosticNodeType,
} from "../diagnostics/DiagnosticNodeInternal.js";
import type { ClientContext } from "../ClientContext.js";
import type { QueryRangeMapping } from "./queryRangeMapping.js";
import type {
  QueryRangeWithContinuationToken,
  RangeBoundary,
  BaseContinuationToken,
} from "../documents/ContinuationToken/CompositeQueryContinuationToken.js";
import { createParallelQueryResult } from "./parallelQueryResult.js";
import type {
  PartitionRangeUpdate,
  PartitionRangeUpdates,
} from "../documents/ContinuationToken/PartitionRangeUpdate.js";
import { isPartitionRangeActive } from "./PartitionRangeManager.js";
import {
  getLogicalPartitionRange,
  intersectPartitionKeyRange,
  toEffectivePartitionKeyRange,
  type LogicalPartitionRange,
} from "./logicalPartitionRange.js";

/** @hidden */
export enum ParallelQueryExecutionContextBaseStates {
  started = "started",
  inProgress = "inProgress",
  ended = "ended",
}

interface BufferCycle {
  madeProgress: boolean;
  processedTrackedProducer: boolean;
  splitError?: any;
}

/** @hidden */
export abstract class ParallelQueryExecutionContextBase implements ExecutionContext {
  private err: any;
  private state: any;
  private static readonly STATES = ParallelQueryExecutionContextBaseStates;
  private routingProvider: SmartRoutingMapProvider;
  private readonly requestContinuation: any;
  private respHeaders: CosmosHeaders;
  private readonly unfilledDocumentProducersQueue: PriorityQueue<DocumentProducer>;
  private readonly bufferedDocumentProducersQueue: PriorityQueue<DocumentProducer>;
  // TODO: update type of buffer from any --> generic can be used here
  private buffer: any[];
  private partitionDataPatchMap: Map<string, QueryRangeMapping> = new Map();
  private patchCounter: number = 0;
  private readonly updatedContinuationRanges: Map<string, PartitionRangeUpdate> = new Map();
  private readonly splitRepairProducers: Map<DocumentProducer, Error> = new Map();
  private completeDrainError: Error | undefined;
  private readonly topologyTransitions: Set<string> = new Set();
  private readonly requiresCompleteDrainAfterSplit: boolean;
  private readonly sem: any;
  private readonly diagnosticNodeWrapper: {
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
    private readonly clientContext: ClientContext,
    private readonly collectionLink: string,
    private readonly query: string | SqlQuerySpec,
    private readonly options: FeedOptions,
    private readonly partitionedQueryExecutionInfo: PartitionedQueryExecutionInfo,
    private readonly correlatedActivityId: string,
    private readonly rangeManager: TargetPartitionRangeManager,
    private readonly queryProcessingStrategy: QueryProcessingStrategy,
    private readonly documentProducerComparator: (
      dp1: DocumentProducer,
      dp2: DocumentProducer,
    ) => number,
    private readonly parsedContinuationToken?: BaseContinuationToken,
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
    this.buffer = [];
    const queryInfo = partitionedQueryExecutionInfo.queryInfo;
    this.requiresCompleteDrainAfterSplit =
      queryInfo?.hasNonStreamingOrderBy === true ||
      (queryInfo?.aggregates?.length ?? 0) > 0 ||
      Object.keys(queryInfo?.groupByAliasToAggregateType ?? {}).length > 0 ||
      (queryInfo?.groupByExpressions?.length ?? 0) > 0;
    this.requestContinuation = options
      ? options.continuationToken || options.continuation
      : undefined;

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
    this.bufferedDocumentProducersQueue = new PriorityQueue<DocumentProducer>(
      (a: DocumentProducer, b: DocumentProducer) => this.documentProducerComparator(b, a),
    );
    // Creating the documentProducers
    this.sem = semaphore(1);
    this.sem.take(() => this._initializeDocumentProducers());
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
   * Fetches more results from the query execution context.
   * @param diagnosticNode - Optional diagnostic node for tracing.
   * @returns A promise that resolves to the fetched results.
   * @hidden
   */
  public async fetchMore(diagnosticNode?: DiagnosticNodeInternal): Promise<Response<any>> {
    let splitError = this.splitRepairProducers.values().next().value ?? this.completeDrainError;
    let isRepairingSplit =
      this.splitRepairProducers.size > 0 || this.completeDrainError !== undefined;

    while (true) {
      const bufferCycle = await this.bufferDocumentProducers(diagnosticNode);
      splitError ??= bufferCycle.splitError;
      isRepairingSplit ||= bufferCycle.splitError !== undefined;

      await this.fillBufferFromBufferQueue();
      this.updateStates(this.err);

      if (this.buffer.length > 0 || this.state === ParallelQueryExecutionContextBase.STATES.ended) {
        return this.drainBufferedItems();
      }

      const shouldContinueScheduling = this.shouldContinueScheduling();
      if (!isRepairingSplit && !shouldContinueScheduling) {
        return this.drainBufferedItems();
      }
      if (
        !shouldContinueScheduling &&
        bufferCycle.splitError === undefined &&
        !bufferCycle.processedTrackedProducer
      ) {
        return this.drainBufferedItems();
      }
      if (!bufferCycle.madeProgress) {
        const error =
          splitError ??
          new ErrorResponse(
            "Query execution made no progress while establishing an ORDER BY checkpoint.",
          );
        this.updateStates(error);
        error.headers = this._getAndResetActiveResponseHeaders();
        throw error;
      }
      if (shouldContinueScheduling) {
        this.partitionDataPatchMap.clear();
        this.patchCounter = 0;
      }
    }
  }

  private shouldContinueScheduling(): boolean {
    const hasActiveProducers =
      this.unfilledDocumentProducersQueue.size() > 0 ||
      this.bufferedDocumentProducersQueue.size() > 0;
    const hasMeaningfulCheckpoint = Array.from(this.partitionDataPatchMap.values()).some(
      (mapping) => isPartitionRangeActive(mapping.continuationToken, mapping.isActive),
    );
    const canReturnMeaningfulCheckpoint =
      this.rangeManager.getStrategyType() !== "OrderByQuery" ||
      this.requestContinuation !== undefined;
    return (
      this.options.enableQueryControl === true &&
      this.buffer.length === 0 &&
      !(hasMeaningfulCheckpoint && canReturnMeaningfulCheckpoint) &&
      this.state !== ParallelQueryExecutionContextBase.STATES.ended &&
      hasActiveProducers
    );
  }

  /**
   * Processes buffered document producers
   * @returns A promise that resolves when processing is complete.
   */
  private async processBufferedDocumentProducers(): Promise<void> {
    while (
      this.hasBufferedProducers() &&
      this.shouldProcessBufferedProducers(this.isUnfilledQueueEmpty())
    ) {
      const producer = this.getNextBufferedProducer();
      if (!producer) break;

      await this.processDocumentProducer(producer);
    }
  }

  /**
   * Processes a single document producer using template method pattern.
   * Common structure with query-specific processing delegated to subclasses.
   */
  private async processDocumentProducer(producer: DocumentProducer): Promise<void> {
    const response = await this.fetchFromProducer(producer);
    this._mergeWithActiveResponseHeaders(response.headers);

    if (response.result) {
      this.addToBuffer(response.result);
      this.handlePartitionMapping(producer, response.result);
    }

    // Handle producer lifecycle
    if (producer.peakNextItem() !== undefined) {
      this.requeueProducer(producer);
    } else if (producer.hasMoreResults()) {
      this.moveToUnfilledQueue(producer);
    } else {
      this.splitRepairProducers.delete(producer);
    }
  }

  /**
   * Fetches data from a document producer - implemented by subclasses.
   */
  protected abstract fetchFromProducer(producer: DocumentProducer): Promise<Response<any>>;

  /**
   * Handles partition mapping updates - implemented in base class using template method pattern.
   * Child classes provide query-specific parameters through abstract methods.
   */
  private handlePartitionMapping(producer: DocumentProducer, result: any): void {
    this.updatePartitionMapping(this.createPartitionMapping(producer, result?.length || 0));
  }

  private createPartitionMapping(producer: DocumentProducer, itemCount: number): QueryRangeMapping {
    const logicalRange = getLogicalPartitionRange(
      producer.targetPartitionKeyRange,
      producer.startEpk,
      producer.endEpk,
    );
    return {
      itemCount,
      partitionKeyRange: toEffectivePartitionKeyRange(logicalRange),
      continuationToken: this.getContinuationToken(producer),
      previousContinuationToken: producer.previousContinuationToken,
      isActive: producer.hasMoreResults(),
      isOrderByCheckpoint: producer.isOrderByCheckpoint,
    };
  }

  /**
   * Gets the continuation token to use - implemented by subclasses.
   */
  private getContinuationToken(producer: DocumentProducer): string {
    const hasMoreBufferedItems = producer.peakNextItem() !== undefined;
    return hasMoreBufferedItems ? producer.previousContinuationToken : producer.continuationToken;
  }
  /**
   * Determines if buffered producers should continue to be processed based on query-specific rules.
   * @param isUnfilledQueueEmpty - Whether the unfilled queue is empty
   */
  protected abstract shouldProcessBufferedProducers(isUnfilledQueueEmpty: boolean): boolean;

  /**
   * Updates partition mapping - creates new entry or merges with existing for ORDER BY queries.
   */
  private updatePartitionMapping(mapping: QueryRangeMapping): void {
    const currentPatch = this.partitionDataPatchMap.get(this.patchCounter.toString());
    const isSamePartition =
      currentPatch?.partitionKeyRange?.id === mapping.partitionKeyRange.id &&
      currentPatch.partitionKeyRange.minInclusive === mapping.partitionKeyRange.minInclusive &&
      currentPatch.partitionKeyRange.maxExclusive === mapping.partitionKeyRange.maxExclusive;

    if (isSamePartition && currentPatch) {
      currentPatch.itemCount += mapping.itemCount;
      currentPatch.continuationToken = mapping.continuationToken;
      currentPatch.isActive = mapping.isActive;
      return;
    }
    // Create new partition mapping entry
    this.partitionDataPatchMap.set((++this.patchCounter).toString(), mapping);
  }

  /**
   * Checks if the unfilled queue is empty (used by ORDER BY for processing control).
   */
  protected isUnfilledQueueEmpty(): boolean {
    return this.unfilledDocumentProducersQueue.size() === 0;
  }

  /**
   * Initializes document producers and fills the priority queue.
   * Handles both continuation token and fresh query scenarios.
   */
  private async _initializeDocumentProducers(): Promise<void> {
    try {
      const targetPartitionRanges = await this._onTargetPartitionRanges();
      const documentProducers = this.requestContinuation
        ? await this._createDocumentProducersFromContinuation(targetPartitionRanges)
        : this._createDocumentProducersFromFresh(targetPartitionRanges);

      // Fill up our priority queue with documentProducers
      this._enqueueDocumentProducers(documentProducers);
      this.sem.leave();
    } catch (err: any) {
      this.err = err;
      this.sem.leave();
    }
  }

  /**
   * Creates document producers from continuation token scenario.
   */
  private async _createDocumentProducersFromContinuation(
    targetPartitionRanges: any[],
  ): Promise<DocumentProducer[]> {
    // Parse continuation token to get range mappings and check for split/merge scenarios
    const parsedToken =
      this.parsedContinuationToken ?? this._parseContinuationToken(this.requestContinuation);
    const continuationRanges = await this._handlePartitionRangeChanges(parsedToken);

    // Use strategy to create additional query info from parsed token
    const additionalQueryInfo = this.queryProcessingStrategy.createAdditionalQueryInfo(parsedToken);

    const filterResult = this.rangeManager.filterPartitionRanges(
      targetPartitionRanges,
      continuationRanges,
      additionalQueryInfo,
    );

    // Extract ranges and tokens from the combined result
    const rangeTokenPairs = filterResult.rangeTokenPairs;

    // Use strategy to create filter context for continuation token processing
    const filterContext = this.queryProcessingStrategy.createFilterContext(parsedToken);

    return rangeTokenPairs.map((rangeTokenPair) =>
      this._createDocumentProducerFromRangeTokenPair(rangeTokenPair, filterContext),
    );
  }

  /**
   * Creates document producers from fresh query scenario (no continuation token).
   */
  private _createDocumentProducersFromFresh(targetPartitionRanges: any[]): DocumentProducer[] {
    return targetPartitionRanges.map((partitionTargetRange: any) =>
      this._createTargetPartitionQueryExecutionContext(partitionTargetRange, undefined),
    );
  }

  /**
   * Creates a document producer from a range token pair (continuation token scenario).
   */
  private _createDocumentProducerFromRangeTokenPair(
    rangeTokenPair: PartitionRangeWithContinuationToken,
    filterContext: FilterContext | undefined,
  ): DocumentProducer {
    const partitionTargetRange = rangeTokenPair.range;
    const continuationToken = rangeTokenPair.continuationToken;
    const filterCondition = rangeTokenPair.filteringCondition || undefined;
    const logicalRange = getLogicalPartitionRange(
      partitionTargetRange,
      rangeTokenPair.epkMin,
      rangeTokenPair.epkMax,
    );
    const partitionFilterContext = rangeTokenPair.isOrderByCheckpoint ? filterContext : undefined;

    return this._createTargetPartitionQueryExecutionContext(
      partitionTargetRange,
      continuationToken,
      logicalRange.minInclusive,
      logicalRange.maxExclusive,
      rangeTokenPair.epkMin !== undefined && rangeTokenPair.epkMax !== undefined,
      filterCondition,
      partitionFilterContext,
      rangeTokenPair.isOrderByCheckpoint,
    );
  }

  /**
   * Enqueues document producers into the unfilled queue.
   */
  private _enqueueDocumentProducers(documentProducers: DocumentProducer[]): void {
    documentProducers.forEach((documentProducer) => {
      try {
        this.unfilledDocumentProducersQueue.enq(documentProducer);
      } catch (e: any) {
        this.err = e;
      }
    });
  }

  /**
   * Checks if there are buffered document producers ready for processing.
   * Encapsulates queue size checking.
   */
  private hasBufferedProducers(): boolean {
    return this.bufferedDocumentProducersQueue.size() > 0;
  }

  /**
   * Gets the next buffered document producer for processing.
   * Encapsulates queue dequeuing logic.
   */
  private getNextBufferedProducer(): DocumentProducer | undefined {
    if (this.bufferedDocumentProducersQueue.size() > 0) {
      return this.bufferedDocumentProducersQueue.deq();
    }
    return undefined;
  }

  /**
   * Adds items to the result buffer. Handles both single items and arrays.
   */
  private addToBuffer(items: any[] | any): void {
    if (Array.isArray(items)) {
      if (items.length > 0) {
        this.buffer.push(...items);
      }
    } else if (items) {
      this.buffer.push(items);
    }
  }

  /**
   * Moves a producer to the unfilled queue for later processing.
   */
  private moveToUnfilledQueue(producer: DocumentProducer): void {
    this.unfilledDocumentProducersQueue.enq(producer);
  }

  /**
   * Re-queues a producer to the buffered queue for further processing.
   */
  private requeueProducer(producer: DocumentProducer): void {
    this.bufferedDocumentProducersQueue.enq(producer);
  }

  /**
   * Compares two document producers based on their partition key ranges and EPK values.
   * Primary comparison: minInclusive values for left-to-right range traversal
   * Secondary comparison: EPK ranges when minInclusive values are identical
   * @param a - First document producer
   * @param b - Second document producer
   * @returns Comparison result for priority queue ordering
   * @hidden
   */
  private compareDocumentProducersByRange(a: DocumentProducer, b: DocumentProducer): number {
    const aMinInclusive = a.targetPartitionKeyRange.minInclusive;
    const bMinInclusive = b.targetPartitionKeyRange.minInclusive;
    const minInclusiveComparison = bMinInclusive.localeCompare(aMinInclusive);

    // If minInclusive values are the same, check minEPK ranges if they exist
    if (minInclusiveComparison === 0) {
      const aMinEpk = a.startEpk;
      const bMinEpk = b.startEpk;
      if (aMinEpk !== undefined && bMinEpk !== undefined) {
        return bMinEpk.localeCompare(aMinEpk);
      }
    }

    return minInclusiveComparison;
  }

  /**
   * Detects partition splits/merges by analyzing parsed continuation token ranges and comparing with current topology
   * @param parsed - The continuation token containing range mappings to analyze
   * @returns Array of processed ranges with EPK info
   */
  private async _handlePartitionRangeChanges(
    parsed: BaseContinuationToken,
  ): Promise<PartitionRangeWithContinuationToken[]> {
    const processedRanges: PartitionRangeWithContinuationToken[] = [];
    const rangeMappings = parsed.rangeMappings;

    if (!rangeMappings || rangeMappings.length === 0) {
      return [];
    }

    const isOrderBy = this.rangeManager.getStrategyType() === "OrderByQuery";
    const hasCheckpointMetadata = rangeMappings.some(
      (mapping) => mapping.isOrderByCheckpoint !== undefined,
    );
    for (let index = 0; index < rangeMappings.length; index++) {
      const rangeWithToken = rangeMappings[index];
      const isOrderByCheckpoint =
        rangeWithToken.isOrderByCheckpoint ??
        (isOrderBy ? !hasCheckpointMetadata && index === 0 : undefined);
      const range = rangeWithToken.queryRange;
      const queryRange = new QueryRange(range.min, range.max, true, false);
      const overlappingRanges = await this.routingProvider.getOverlappingRanges(
        this.collectionLink,
        [queryRange],
        this.getDiagnosticNode(),
      );
      const logicalRanges = overlappingRanges
        .map((partitionKeyRange) =>
          intersectPartitionKeyRange(partitionKeyRange, range.min, range.max),
        )
        .filter((logicalRange): logicalRange is LogicalPartitionRange => !!logicalRange);

      if (logicalRanges.length === 0) {
        throw new ErrorResponse(
          "Unable to map the continuation token range to the current partition topology.",
        );
      }

      const topologyUnchanged =
        logicalRanges.length === 1 &&
        logicalRanges[0].partitionKeyRange.minInclusive === range.min &&
        logicalRanges[0].partitionKeyRange.maxExclusive === range.max;
      if (!topologyUnchanged) {
        this._recordPartitionRangeUpdate({ ...rangeWithToken, isOrderByCheckpoint }, logicalRanges);
      }

      processedRanges.push(
        ...logicalRanges.map((logicalRange) => ({
          range: logicalRange.partitionKeyRange,
          continuationToken: rangeWithToken.continuationToken,
          epkMin: logicalRange.minInclusive,
          epkMax: logicalRange.maxExclusive,
          isOrderByCheckpoint,
          isActive:
            rangeWithToken.isActive ??
            (isOrderBy ? true : isPartitionRangeActive(rangeWithToken.continuationToken)),
        })),
      );
    }

    return processedRanges;
  }

  /**
   * Parses the continuation token based on query type
   * @param continuationToken - The continuation token string to parse
   * @returns Parsed continuation token object (ORDER BY or Parallel query token)
   * @throws ErrorResponse when continuation token is malformed or cannot be parsed
   */
  private _parseContinuationToken(continuationToken: string): BaseContinuationToken {
    try {
      return this.queryProcessingStrategy.parseContinuationToken(continuationToken);
    } catch (e) {
      throw new ErrorResponse(
        `Invalid continuation token format. Expected token with rangeMappings property. ` +
          `Ensure the continuation token was generated by a compatible query and has not been modified.`,
      );
    }
  }

  private _recordPartitionRangeUpdate(
    rangeWithToken: QueryRangeWithContinuationToken,
    replacementRanges: LogicalPartitionRange[],
  ): void {
    const rangeKey = `${rangeWithToken.queryRange.min}-${rangeWithToken.queryRange.max}`;
    this.updatedContinuationRanges.set(rangeKey, {
      oldRange: {
        min: rangeWithToken.queryRange.min,
        max: rangeWithToken.queryRange.max,
        isMinInclusive: true, // Assumption: min is always inclusive
        isMaxInclusive: false, // Assumption: max is always exclusive
      },
      newRanges: replacementRanges.map((range) => ({
        min: range.minInclusive,
        max: range.maxExclusive,
        isMinInclusive: true,
        isMaxInclusive: false,
      })),
      continuationToken: rangeWithToken.continuationToken,
      isActive: rangeWithToken.isActive ?? true,
      isOrderByCheckpoint: rangeWithToken.isOrderByCheckpoint,
    });
  }

  /**
   * Handles partition merge scenario for continuation token ranges
   */
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

  private async _getReplacementPartitionKeyRanges(
    effectiveRange: QueryRange,
    diagnosticNode: DiagnosticNodeInternal,
  ): Promise<any[]> {
    return this.routingProvider.getOverlappingRanges(
      this.collectionLink,
      [effectiveRange],
      diagnosticNode,
      true,
    );
  }

  private async _enqueueReplacementDocumentProducers(
    error: any,
    diagnosticNode: DiagnosticNodeInternal,
    documentProducer: DocumentProducer,
    isCycleActive: () => boolean,
  ): Promise<any | undefined> {
    if (!isCycleActive()) {
      return undefined;
    }

    const effectiveRange =
      ParallelQueryExecutionContextBase._getEffectiveQueryRange(documentProducer);
    const replacementPartitionKeyRanges = await this._getReplacementPartitionKeyRanges(
      effectiveRange,
      diagnosticNode,
    );
    if (!isCycleActive()) {
      return undefined;
    }

    if (replacementPartitionKeyRanges.length === 0) {
      throw error;
    }
    const filterCondition = documentProducer.getFilterCondition();
    const filterContext = documentProducer.getFilterContext();

    const replacementRanges: {
      max: string;
      min: string;
      partitionKeyRange: PartitionKeyRange;
      populateEpkRangeHeaders: boolean;
    }[] = [];
    replacementPartitionKeyRanges.forEach((partitionKeyRange) => {
      const intersection = ParallelQueryExecutionContextBase._intersectPartitionRange(
        partitionKeyRange,
        effectiveRange,
      );
      if (!intersection) {
        return;
      }

      const populateEpkRangeHeaders = true;
      replacementRanges.push({
        max: intersection.max,
        min: intersection.min,
        partitionKeyRange,
        populateEpkRangeHeaders,
      });
    });

    if (replacementRanges.length === 0) {
      throw error;
    }

    const originalIdentity =
      `${documentProducer.targetPartitionKeyRange.id}:` +
      `${effectiveRange.min}:${effectiveRange.max}`;
    const replacementIdentities = replacementRanges
      .map(({ max, min, partitionKeyRange }) => `${partitionKeyRange.id}:${min}:${max}`)
      .sort();
    const transition = `${originalIdentity}->${replacementIdentities.join(",")}`;
    if (
      (replacementIdentities.length === 1 && replacementIdentities[0] === originalIdentity) ||
      this.topologyTransitions.has(transition)
    ) {
      throw error;
    }

    if (!isCycleActive()) {
      return undefined;
    }
    const replacementDocumentProducers = replacementRanges.map(
      ({ max, min, partitionKeyRange, populateEpkRangeHeaders }) =>
        this._createTargetPartitionQueryExecutionContext(
          partitionKeyRange,
          documentProducer.continuationToken,
          min,
          max,
          populateEpkRangeHeaders,
          filterCondition,
          filterContext,
          documentProducer.isOrderByCheckpoint,
        ),
    );
    if (!isCycleActive()) {
      return undefined;
    }

    this.topologyTransitions.add(transition);
    this.splitRepairProducers.delete(documentProducer);
    if (this.requiresCompleteDrainAfterSplit) {
      this.completeDrainError ??= error;
    }
    if (this.options.enableQueryControl) {
      this._recordPartitionRangeUpdate(
        this._createQueryRangeWithContinuationToken(documentProducer),
        replacementRanges.map(({ max, min, partitionKeyRange }) =>
          getLogicalPartitionRange(partitionKeyRange, min, max),
        ),
      );
    }
    replacementDocumentProducers.forEach((producer) => {
      if (producer.hasMoreResults()) {
        this.splitRepairProducers.set(producer, error);
        this.unfilledDocumentProducersQueue.enq(producer);
      }
    });

    return error;
  }

  private _createQueryRangeWithContinuationToken(
    documentProducer: DocumentProducer,
  ): QueryRangeWithContinuationToken {
    const partitionRange = documentProducer.targetPartitionKeyRange;
    const queryRange: RangeBoundary = {
      min: documentProducer.startEpk ?? partitionRange.minInclusive,
      max: documentProducer.endEpk ?? partitionRange.maxExclusive,
    };
    return {
      queryRange,
      continuationToken: documentProducer.continuationToken,
      isActive: documentProducer.hasMoreResults(),
      isOrderByCheckpoint: documentProducer.isOrderByCheckpoint,
    };
  }

  private static _getEffectiveQueryRange(documentProducer: DocumentProducer): QueryRange {
    const partitionKeyRange = documentProducer.targetPartitionKeyRange;
    return new QueryRange(
      documentProducer.startEpk ?? partitionKeyRange.minInclusive,
      documentProducer.endEpk ?? partitionKeyRange.maxExclusive,
      true,
      false,
    );
  }

  private static _intersectPartitionRange(
    partitionKeyRange: PartitionKeyRange,
    effectiveRange: QueryRange,
  ): { min: string; max: string } | undefined {
    const min =
      partitionKeyRange.minInclusive.localeCompare(effectiveRange.min) > 0
        ? partitionKeyRange.minInclusive
        : effectiveRange.min;
    const max =
      partitionKeyRange.maxExclusive.localeCompare(effectiveRange.max) < 0
        ? partitionKeyRange.maxExclusive
        : effectiveRange.max;
    return min.localeCompare(max) < 0 ? { min, max } : undefined;
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
   * Replaces the format placeholder in the rewritten query with the provided filter condition.
   * Handles both string queries and SqlQuerySpec objects.
   */
  private _replaceFormatPlaceholder(
    rewrittenQuery: string | SqlQuerySpec,
    formatPlaceHolder: string,
    filterCondition?: string,
  ): string {
    const replacement = filterCondition ?? "true";

    // If rewrittenQuery has a query property, it's a SqlQuerySpec object
    if (typeof rewrittenQuery === "object" && rewrittenQuery !== null && rewrittenQuery.query) {
      return rewrittenQuery.query.replace(formatPlaceHolder, replacement);
    }

    // Otherwise, it's a string
    return (rewrittenQuery as string).replace(formatPlaceHolder, replacement);
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
    isOrderByCheckpoint?: boolean,
  ): DocumentProducer {
    const rewrittenQuery = this.partitionedQueryExecutionInfo.queryInfo?.rewrittenQuery;
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
      const replacedQuery = this._replaceFormatPlaceholder(
        rewrittenQuery,
        formatPlaceHolder,
        filterCondition,
      );
      sqlQuerySpec["query"] = replacedQuery;
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
      filterCondition,
      isOrderByCheckpoint,
    );
  }
  private async drainBufferedItems(): Promise<Response<any>> {
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
          const partitionDataPatchMap = this.partitionDataPatchMap;
          this.partitionDataPatchMap = new Map<string, QueryRangeMapping>();
          this.patchCounter = 0;
          // Get and reset updated continuation ranges
          const updatedContinuationRanges: PartitionRangeUpdates = Object.fromEntries(
            this.updatedContinuationRanges,
          );
          this.updatedContinuationRanges.clear();
          const result = createParallelQueryResult(
            [],
            partitionDataPatchMap,
            updatedContinuationRanges,
            undefined,
          );

          return resolve({
            result:
              this.state === ParallelQueryExecutionContextBase.STATES.ended ? undefined : result,
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
  private async bufferDocumentProducers(
    diagnosticNode?: DiagnosticNodeInternal,
  ): Promise<BufferCycle> {
    return new Promise<BufferCycle>((resolve, reject) => {
      this.sem.take(async () => {
        if (this.err) {
          this.sem.leave();
          reject(this.err);
          return;
        }
        this.updateStates(this.err);
        if (this.state === ParallelQueryExecutionContextBase.STATES.ended) {
          this.sem.leave();
          resolve({ madeProgress: false, processedTrackedProducer: false });
          return;
        }
        if (this.unfilledDocumentProducersQueue.size() === 0) {
          this.sem.leave();
          resolve({ madeProgress: false, processedTrackedProducer: false });
          return;
        }

        let closed = false;
        let firstError: any;
        let splitError: any;
        const isCycleActive = (): boolean => !closed;
        const closeCycle = (error: any): boolean => {
          if (!isCycleActive()) {
            return false;
          }
          closed = true;
          firstError = error;
          return true;
        };

        try {
          const maxDegreeOfParallelism =
            this.options.maxDegreeOfParallelism === undefined ||
            this.options.maxDegreeOfParallelism < 1
              ? this.unfilledDocumentProducersQueue.size() // number of partitions
              : Math.min(
                  this.options.maxDegreeOfParallelism,
                  this.unfilledDocumentProducersQueue.size(),
                );

          const documentProducers: DocumentProducer[] = [];
          while (
            documentProducers.length < maxDegreeOfParallelism &&
            this.unfilledDocumentProducersQueue.size() > 0
          ) {
            documentProducers.push(this.unfilledDocumentProducersQueue.deq());
          }

          const bufferDocumentProducer = async (
            documentProducer: DocumentProducer,
          ): Promise<BufferCycle> => {
            const isSplitRepairProducer = this.splitRepairProducers.has(documentProducer);
            const shouldTrackProducerProgress =
              isSplitRepairProducer ||
              this.completeDrainError !== undefined ||
              (this.options.enableQueryControl === true &&
                this.rangeManager.getStrategyType() === "OrderByQuery");
            try {
              const previousContinuationToken = documentProducer.continuationToken;
              const headers = await documentProducer.bufferMore(diagnosticNode);
              if (!isCycleActive()) {
                return { madeProgress: false, processedTrackedProducer: false };
              }
              this._mergeWithActiveResponseHeaders(headers);

              // Always track this document producer in patchToRangeMapping, even if it has no results
              // This ensures we maintain a record of all partition ranges that were scanned
              const nextItem = documentProducer.peakNextItem();
              if (nextItem !== undefined) {
                this.bufferedDocumentProducersQueue.enq(documentProducer);
                return {
                  madeProgress: shouldTrackProducerProgress,
                  processedTrackedProducer: shouldTrackProducerProgress,
                };
              } else {
                const hasActiveContinuation = isPartitionRangeActive(
                  documentProducer.continuationToken,
                );
                if (this.options.enableQueryControl || hasActiveContinuation) {
                  const mapping = this.createPartitionMapping(documentProducer, 0);
                  const range = mapping.partitionKeyRange;
                  const patchKey = `empty-${range.id}-${range.minInclusive}-${range.maxExclusive}`;
                  this.partitionDataPatchMap.set(patchKey, mapping);
                }
                const hasMoreResults = documentProducer.hasMoreResults();
                if (hasMoreResults) {
                  this.unfilledDocumentProducersQueue.enq(documentProducer);
                }
                if (shouldTrackProducerProgress && !hasMoreResults) {
                  if (isSplitRepairProducer) {
                    this.splitRepairProducers.delete(documentProducer);
                  }
                  return {
                    madeProgress: true,
                    processedTrackedProducer: true,
                  };
                }
                if (
                  shouldTrackProducerProgress &&
                  documentProducer.continuationToken !== previousContinuationToken
                ) {
                  return {
                    madeProgress: true,
                    processedTrackedProducer: true,
                  };
                }
              }
              return {
                madeProgress: false,
                processedTrackedProducer: shouldTrackProducerProgress,
              };
            } catch (err) {
              if (ParallelQueryExecutionContextBase._needPartitionKeyRangeCacheRefresh(err)) {
                if (!isCycleActive()) {
                  return { madeProgress: false, processedTrackedProducer: false };
                }
                this._mergeWithActiveResponseHeaders(err.headers);
                splitError ??= err;
                try {
                  const replacementError = await this._enqueueReplacementDocumentProducers(
                    err,
                    diagnosticNode,
                    documentProducer,
                    isCycleActive,
                  );
                  return {
                    madeProgress: replacementError !== undefined,
                    processedTrackedProducer: shouldTrackProducerProgress,
                  };
                } catch (repairError) {
                  if (closeCycle(repairError) && repairError !== err) {
                    this._mergeWithActiveResponseHeaders(repairError.headers);
                  }
                  throw firstError ?? repairError;
                }
              } else {
                if (closeCycle(err)) {
                  this._mergeWithActiveResponseHeaders(err.headers);
                }
                throw firstError ?? err;
              }
            }
          };

          const bufferResults = await Promise.all(
            documentProducers.map((producer) => bufferDocumentProducer(producer)),
          );
          closed = true;
          resolve({
            madeProgress: bufferResults.some(({ madeProgress }) => madeProgress),
            processedTrackedProducer: bufferResults.some(
              ({ processedTrackedProducer }) => processedTrackedProducer,
            ),
            splitError,
          });
        } catch (err) {
          if (closeCycle(err)) {
            this._mergeWithActiveResponseHeaders(err.headers);
          }
          const terminalError = firstError ?? err;
          this.updateStates(terminalError);
          this.err.headers = this._getAndResetActiveResponseHeaders();
          reject(terminalError);
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
  private async fillBufferFromBufferQueue(): Promise<void> {
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
          await this.processBufferedDocumentProducers();
          this.updateStates(this.err);
        } catch (err) {
          this.updateStates(err);
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
      this.splitRepairProducers.clear();
      this.completeDrainError = undefined;
      this.topologyTransitions.clear();
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
      this.splitRepairProducers.clear();
      this.completeDrainError = undefined;
      this.topologyTransitions.clear();
      this.state = ParallelQueryExecutionContextBase.STATES.ended;
    }
  }
}
