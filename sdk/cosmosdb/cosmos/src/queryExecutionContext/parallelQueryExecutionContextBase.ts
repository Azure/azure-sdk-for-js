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
    // response headers of undergoing operation
    this.respHeaders = getInitialHeader();
    // Make priority queue for documentProducers
    this.unfilledDocumentProducersQueue = new PriorityQueue<DocumentProducer>(
      (a: DocumentProducer, b: DocumentProducer) => a.generation - b.generation,
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
          throw new Error("Continuation tokens are not yet supported for cross partition queries");
        } else {
          filteredPartitionKeyRanges = targetPartitionRanges;
        }
        // Create one documentProducer for each partitionTargetRange
        filteredPartitionKeyRanges.forEach((partitionTargetRange: any) => {
          // TODO: any partitionTargetRange
          // no async callback
          targetPartitionQueryExecutionContextList.push(
            this._createTargetPartitionQueryExecutionContext(partitionTargetRange, undefined),
          );
        });

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
    // Get the replacement ranges
    const replacementPartitionKeyRanges = await this._getReplacementPartitionKeyRanges(
      documentProducer,
      diagnosticNode,
    );

    if (replacementPartitionKeyRanges.length === 0) {
      throw error;
    } else if (replacementPartitionKeyRanges.length === 1) {
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
      rewrittenQuery = rewrittenQuery.replace(formatPlaceHolder, "true");
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
                  indexes: [-1, -1], // Special marker for empty result set
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
                    indexes: [this.buffer.length - 1, this.buffer.length - 1],
                    partitionKeyRange: documentProducer.targetPartitionKeyRange,
                    continuationToken: documentProducer.continuationToken,
                  });
                } else {
                  const currentPatch = this.patchToRangeMapping.get(this.patchCounter.toString());
                  if (currentPatch) {
                    currentPatch.indexes[1] = this.buffer.length - 1;
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
                  indexes: [this.buffer.length - result.length, this.buffer.length - 1],
                  partitionKeyRange: documentProducer.targetPartitionKeyRange,
                  continuationToken: documentProducer.continuationToken,
                });
              } else {
                // Document producer returned empty results - still track it in patchToRangeMapping
                this.patchToRangeMapping.set(this.patchCounter.toString(), {
                  indexes: [-1, -1], // Special marker for empty result set
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
