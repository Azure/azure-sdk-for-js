// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import type { FeedOptions, Response } from "../request/index.js";
import type { PartitionedQueryExecutionInfo } from "../request/ErrorResponse.js";
import { ErrorResponse } from "../request/ErrorResponse.js";
import { QueryRange } from "../routing/QueryRange.js";
import { SmartRoutingMapProvider } from "../routing/smartRoutingMapProvider.js";
import type { CosmosHeaders, PartitionKeyRange } from "../index.js";
import { ExecutionContext, ExecutionContextState } from "./ExecutionContext.js";
import type { SqlQuerySpec } from "./SqlQuerySpec.js";
import { DocumentProducer } from "./documentProducer.js";
import { getInitialHeader, mergeHeaders } from "./headerUtils.js";
import { AsyncMutex } from "./asyncMutex.js";
import type { FilterContext, FilterStrategy } from "./queryFilteringStrategy/FilterStrategy.js";
import { RidSkipCountFilter } from "./queryFilteringStrategy/RidSkipCountFilter.js";
import { TargetPartitionRangeManager } from "./queryFilteringStrategy/TargetPartitionRangeManager.js";
import type { QueryProcessingStrategy } from "./queryProcessingStrategy/QueryProcessingStrategy.js";
import {
  DiagnosticNodeInternal,
  DiagnosticNodeType,
} from "../diagnostics/DiagnosticNodeInternal.js";
import type { ClientContext } from "../ClientContext.js";
import type { QueryRangeMapping } from "./queryRangeMapping.js";
import type { BaseContinuationToken } from "../documents/ContinuationToken/CompositeQueryContinuationToken.js";
import { createParallelQueryResult, toQueryPage } from "./parallelQueryResult.js";
import type { ParallelQueryResult } from "./parallelQueryResult.js";
import type { AsyncQuerySource } from "./AsyncQuerySource.js";
import type {
  PartitionRangeUpdate,
  PartitionRangeUpdates,
} from "../documents/ContinuationToken/PartitionRangeUpdate.js";
import { PartitionSplitHandler } from "./PartitionSplitHandler.js";
import type { ProcessedRange } from "./PartitionSplitHandler.js";
import {
  DocumentProducerScheduler,
  type SchedulerCallbacks,
} from "./DocumentProducerScheduler.js";

/** @hidden */
export enum ParallelQueryExecutionContextBaseStates {
  started = "started",
  inProgress = "inProgress",
  ended = "ended",
}

/** @hidden */
export abstract class ParallelQueryExecutionContextBase implements ExecutionContext {
  private err: Error | undefined;
  private state: ExecutionContextState;
  private routingProvider: SmartRoutingMapProvider;
  private readonly requestContinuation: string | undefined;
  private respHeaders: CosmosHeaders;
  private readonly scheduler: DocumentProducerScheduler;
  private readonly splitHandler: PartitionSplitHandler;
  private buffer: unknown[];
  private partitionDataPatchMap: Map<string, QueryRangeMapping> = new Map();
  private patchCounter: number = 0;
  private readonly updatedContinuationRanges: Map<string, PartitionRangeUpdate> = new Map();
  private readonly mutex: AsyncMutex;
  private readonly diagnosticNodeWrapper: {
    consumed: boolean;
    diagnosticNode: DiagnosticNodeInternal;
  };
  protected _disposed = false;
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
    this.state = ExecutionContextState.Uninitialized;
    this.routingProvider = new SmartRoutingMapProvider(this.clientContext);
    this.buffer = [];
    this.requestContinuation = options
      ? options.continuationToken || options.continuation
      : undefined;


    // response headers of undergoing operation
    this.respHeaders = getInitialHeader();

    // Initialize the scheduler with the document producer comparator
    this.scheduler = new DocumentProducerScheduler(this.documentProducerComparator, {
      maxDegreeOfParallelism: this.options.maxDegreeOfParallelism,
    });

    // Initialize the split handler
    this.splitHandler = new PartitionSplitHandler(
      this.clientContext,
      this.collectionLink,
      this.updatedContinuationRanges,
    );

    // Creating the documentProducers
    this.mutex = new AsyncMutex();
    void this._runInitialization();
  }

  /**
   * Determine if there are still remaining resources to processs based on the value of the continuation
   * token or the elements remaining on the current batch in the QueryIterator.
   * @returns true if there is other elements to process in the ParallelQueryExecutionContextBase.
   */
  public hasMoreResults(): boolean {
    return (
      !this.err &&
      this.state !== ExecutionContextState.Disposed &&
      (this.buffer.length > 0 || this.state !== ExecutionContextState.Done)
    );
  }

  /**
   * Fetches more results from the query execution context.
   * @param diagnosticNode - Optional diagnostic node for tracing.
   * @returns A promise that resolves to the fetched results.
   * @hidden
   */
  public async fetchMore(diagnosticNode?: DiagnosticNodeInternal): Promise<Response<unknown>> {
    if (this._disposed) {
      throw new Error("Cannot call fetchMore on a disposed execution context");
    }
    await this._bufferDocumentProducers(diagnosticNode);
    await this._fillBufferFromBufferQueue();
    return this.drainBufferedItems();
  }

  /**
   * Fetches data from a document producer - implemented by subclasses.
   */
  protected abstract fetchFromProducer(producer: DocumentProducer): Promise<Response<unknown>>;

  /**
   * Determines if buffered producers should continue to be processed based on query-specific rules.
   * @param isUnfilledQueueEmpty - Whether the unfilled queue is empty
   */
  protected abstract shouldProcessBufferedProducers(isUnfilledQueueEmpty: boolean): boolean;

  /**
   * Gets the continuation token to use - chooses between previous and current based on buffer state.
   */
  private _getContinuationToken(producer: DocumentProducer): string {
    const hasMoreBufferedItems = producer.peekNextItem() !== undefined;
    return hasMoreBufferedItems ? producer.previousContinuationToken : producer.continuationToken;
  }

  /**
   * Updates partition mapping - creates new entry or merges with existing for ORDER BY queries.
   */
  private _updatePartitionMapping(mapping: QueryRangeMapping): void {
    const currentPatch = this.partitionDataPatchMap.get(this.patchCounter.toString());
    const isSamePartition = currentPatch?.partitionKeyRange?.id === mapping.partitionKeyRange.id;

    if (isSamePartition && currentPatch) {
      currentPatch.itemCount += mapping.itemCount;
      currentPatch.continuationToken = mapping.continuationToken;
      return;
    }
    // Create new partition mapping entry
    this.partitionDataPatchMap.set((++this.patchCounter).toString(), mapping);
  }

  /**
   * Adds items to the result buffer. Handles both single items and arrays.
   */
  private _addToBuffer(items: any[] | any): void {
    if (Array.isArray(items)) {
      if (items.length > 0) {
        this.buffer.push(...items);
      }
    } else if (items) {
      this.buffer.push(items);
    }
  }

  /**
   * Acquires the mutex, runs initialization, and releases the mutex.
   * Called from constructor as a fire-and-forget async operation.
   * Subsequent mutex acquisitions in fetchMore/buffer/drain will wait until init completes.
   */
  private async _runInitialization(): Promise<void> {
    await this.mutex.acquire();
    try {
      await this._initializeDocumentProducers();
    } catch (err: any) {
      this.err = err;
    } finally {
      this.mutex.release();
    }
  }

  /**
   * Initializes document producers and fills the priority queue.
   * Handles both continuation token and fresh query scenarios.
   */
  private async _initializeDocumentProducers(): Promise<void> {
    const targetPartitionRanges = await this._onTargetPartitionRanges();
    const documentProducers = this.requestContinuation
      ? await this._createDocumentProducersFromContinuation(targetPartitionRanges)
      : this._createDocumentProducersFromFresh(targetPartitionRanges);

    // Fill up our priority queue with documentProducers
    this.scheduler.enqueueAllUnfilled(documentProducers);
  }

  /**
   * Creates document producers from continuation token scenario.
   */
  private async _createDocumentProducersFromContinuation(
    targetPartitionRanges: PartitionKeyRange[],
  ): Promise<DocumentProducer[]> {
    // Parse continuation token to get range mappings and check for split/merge scenarios
    const parsedToken = this._parseContinuationToken(this.requestContinuation);
    const continuationRanges = await this.splitHandler.handlePartitionRangeChanges(
      parsedToken,
      this.getDiagnosticNode(),
    );

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
      this._createDocumentProducerFromRangeTokenPair(
        rangeTokenPair,
        continuationRanges,
        filterContext,
      ),
    );
  }

  /**
   * Creates document producers from fresh query scenario (no continuation token).
   */
  private _createDocumentProducersFromFresh(
    targetPartitionRanges: PartitionKeyRange[],
  ): DocumentProducer[] {
    return targetPartitionRanges.map((partitionTargetRange: PartitionKeyRange) =>
      this._createTargetPartitionQueryExecutionContext(partitionTargetRange, undefined),
    );
  }

  /**
   * Creates a document producer from a range token pair (continuation token scenario).
   */
  private _createDocumentProducerFromRangeTokenPair(
    rangeTokenPair: any,
    continuationRanges: ProcessedRange[],
    filterContext: FilterContext,
  ): DocumentProducer {
    const partitionTargetRange = rangeTokenPair.range;
    const continuationToken = rangeTokenPair.continuationToken;
    const filterCondition = rangeTokenPair.filteringCondition || undefined;

    // Find EPK ranges for this partition range from processed continuation response
    const matchingContinuationRange = continuationRanges.find(
      (cr) => cr.range.id === partitionTargetRange.id,
    );
    const startEpk = matchingContinuationRange?.epkMin;
    const endEpk = matchingContinuationRange?.epkMax;

    // Use strategy to determine partition-specific filter context
    const targetPartitionId =
      continuationRanges.length > 0 && continuationRanges[continuationRanges.length - 1].range
        ? continuationRanges[continuationRanges.length - 1].range.id
        : undefined;
    const partitionFilterContext = this.queryProcessingStrategy.getPartitionFilterContext(
      filterContext,
      targetPartitionId,
      partitionTargetRange.id,
    );

    return this._createTargetPartitionQueryExecutionContext(
      partitionTargetRange,
      continuationToken,
      startEpk,
      endEpk,
      !!(startEpk && endEpk), // populateEpkRangeHeaders - true if both EPK values are present
      filterCondition,
      partitionFilterContext,
    );
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

  /**
   * Merges response headers with active response headers
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

  private async _onTargetPartitionRanges(): Promise<PartitionKeyRange[]> {
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
   * Handles split detection during buffering - delegates to split handler to create replacements.
   */
  private async _onSplitDetected(
    error: any,
    diagnosticNode: DiagnosticNodeInternal,
    documentProducer: DocumentProducer,
  ): Promise<void> {
    if (!PartitionSplitHandler.needsCacheRefresh(error)) {
      this.err = error;
      (this.err as any).headers = this._getAndResetActiveResponseHeaders();
      throw error;
    }

    // Partition split detected — delegate to split handler to create replacements
    const replacementProducers = await this.splitHandler.handleRuntimeSplit(
      error,
      diagnosticNode,
      documentProducer,
      this.requestContinuation,
      (range, token, startEpk, endEpk, populateHeaders) =>
        this._createTargetPartitionQueryExecutionContext(
          range,
          token,
          startEpk,
          endEpk,
          populateHeaders,
        ),
    );

    // Enqueue replacement producers into the scheduler
    replacementProducers.forEach((producer) => {
      if (producer.hasMoreResults()) {
        this.scheduler.enqueueUnfilled(producer);
      }
    });
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
    );
  }
  private async drainBufferedItems(): Promise<Response<unknown>> {
    await this.mutex.acquire();
    try {
      if (this.err) {
        (this.err as any).headers = this._getAndResetActiveResponseHeaders();
        throw this.err;
      }

      // return undefined if there is no more results
      if (this.buffer.length === 0) {
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

        return {
          result:
            this.state === ExecutionContextState.Done ? undefined : result,
          headers: this._getAndResetActiveResponseHeaders(),
        };
      }
      // drain the entire buffer object and return that in result of return object
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

      const result = createParallelQueryResult(
        bufferedResults,
        partitionDataPatchMap,
        updatedContinuationRanges,
        undefined,
      );

      return {
        result,
        headers: this._getAndResetActiveResponseHeaders(),
      };
    } finally {
      this.mutex.release();
    }
  }

  /**
   * Buffers document producers based on the maximum degree of parallelism.
   * Delegates to scheduler for queue management and parallel fetch orchestration.
   * @param diagnosticNode - The diagnostic node for logging and tracing.
   * @returns A promise that resolves when buffering is complete.
   */
  private async _bufferDocumentProducers(diagnosticNode?: DiagnosticNodeInternal): Promise<void> {
    await this.mutex.acquire();
    try {
      if (this.err) {
        throw this.err;
      }
      this._updateStates(this.err);

      if (this.state === ExecutionContextState.Done) {
        return;
      }

      if (this.scheduler.unfilledSize === 0) {
        return;
      }

      // Create callbacks for scheduler to interact with this context
      const callbacks: SchedulerCallbacks = {
        mergeHeaders: (headers) => this._mergeWithActiveResponseHeaders(headers),
        addToBuffer: (items) => this._addToBuffer(items),
        updatePartitionMapping: (mapping) => this._updatePartitionMapping(mapping),
        getContinuationToken: (producer) => this._getContinuationToken(producer),
        fetchFromProducer: (producer) => this.fetchFromProducer(producer),
        shouldProcessBufferedProducers: (isUnfilledEmpty) =>
          this.shouldProcessBufferedProducers(isUnfilledEmpty),
        onSplitDetected: (error, diagNode, producer) =>
          this._onSplitDetected(error, diagNode, producer),
      };

      await this.scheduler.bufferProducers(diagnosticNode, callbacks);
    } finally {
      this.mutex.release();
    }
  }

  /**
   * Drains the buffer of filled document producers and appends their items to the main buffer.
   * Delegates processing to scheduler.
   * @returns A promise that resolves when the buffer is filled.
   */
  private async _fillBufferFromBufferQueue(): Promise<void> {
    await this.mutex.acquire();
    try {
      if (this.err) {
        (this.err as any).headers = this._getAndResetActiveResponseHeaders();
        throw this.err;
      }

      if (this.state === ExecutionContextState.Done || this.scheduler.bufferedSize === 0) {
        return;
      }

      // Create callbacks for scheduler to interact with this context
      const callbacks: SchedulerCallbacks = {
        mergeHeaders: (headers) => this._mergeWithActiveResponseHeaders(headers),
        addToBuffer: (items) => this._addToBuffer(items),
        updatePartitionMapping: (mapping) => this._updatePartitionMapping(mapping),
        getContinuationToken: (producer) => this._getContinuationToken(producer),
        fetchFromProducer: (producer) => this.fetchFromProducer(producer),
        shouldProcessBufferedProducers: (isUnfilledEmpty) =>
          this.shouldProcessBufferedProducers(isUnfilledEmpty),
        onSplitDetected: (error, diagNode, producer) =>
          this._onSplitDetected(error, diagNode, producer),
      };

      await this.scheduler.processBuffered(callbacks);
      this._updateStates(this.err);
    } finally {
      this.mutex.release();
    }
  }

  private _updateStates(error: any): void {
    if (error) {
      this.err = error;
      this.state = ExecutionContextState.Done;
      return;
    }

    if (this.state === ExecutionContextState.Uninitialized) {
      this.state = ExecutionContextState.Active;
    }

    const hasNoActiveProducers = !this.scheduler.hasActiveProducers();

    if (hasNoActiveProducers) {
      this.state = ExecutionContextState.Done;
    }
  }

  /**
   * Releases resources held by this execution context.
   * Drains and disposes all DocumentProducers in the priority queues via the scheduler.
   */
  public dispose(): void {
    if (this.state === ExecutionContextState.Disposed) return;
    this.state = ExecutionContextState.Disposed;

    // Drain and dispose all document producers from both queues via scheduler
    this.scheduler.disposeAll();

    this.buffer = [];
    this.partitionDataPatchMap.clear();
    this.updatedContinuationRanges.clear();
    // Reject any pending mutex waiters so they don't hang forever
    this.mutex.dispose();
  }

  /**
   * Returns an AsyncGenerator that yields typed QueryPage objects.
   * Wraps fetchMore() for incremental adoption of the generator-based pipeline.
   * @internal
   */
  public async *pages(diagnosticNode?: DiagnosticNodeInternal): AsyncQuerySource {
    while (this.hasMoreResults()) {
      const response = await this.fetchMore(diagnosticNode);
      const result = response.result as ParallelQueryResult | undefined;
      yield toQueryPage(result, response.headers, this.hasMoreResults());
    }
  }
}
