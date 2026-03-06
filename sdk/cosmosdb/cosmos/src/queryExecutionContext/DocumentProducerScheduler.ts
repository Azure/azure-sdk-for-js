// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import PriorityQueue from "priorityqueuejs";
import type { DiagnosticNodeInternal } from "../diagnostics/DiagnosticNodeInternal.js";
import type { CosmosHeaders } from "../index.js";
import type { Response } from "../request/index.js";
import type { DocumentProducer } from "./documentProducer.js";
import type { QueryRangeMapping } from "./queryRangeMapping.js";

/**
 * Callbacks interface for DocumentProducerScheduler to interact with parent context.
 * Uses callback pattern to maintain separation of concerns and avoid circular dependencies.
 * @hidden
 */
export interface SchedulerCallbacks {
  /**
   * Merges response headers from a document producer into the active response headers
   */
  mergeHeaders(headers: CosmosHeaders): void;

  /**
   * Adds items to the result buffer
   */
  addToBuffer(items: unknown): void;

  /**
   * Updates partition mapping with item count and continuation token
   */
  updatePartitionMapping(mapping: QueryRangeMapping): void;

  /**
   * Gets the continuation token to use for a producer (previous or current)
   */
  getContinuationToken(producer: DocumentProducer): string;

  /**
   * Fetches data from a document producer (delegated to subclass-specific implementation)
   */
  fetchFromProducer(producer: DocumentProducer): Promise<Response<unknown>>;

  /**
   * Determines if buffered producers should continue to be processed (query-specific logic)
   */
  shouldProcessBufferedProducers(isUnfilledQueueEmpty: boolean): boolean;

  /**
   * Handles split detection during buffering (creates replacement producers)
   */
  onSplitDetected(
    error: any,
    diagnosticNode: DiagnosticNodeInternal,
    producer: DocumentProducer,
  ): Promise<void>;
}

/**
 * Orchestrates the two-queue system for parallel document producer scheduling.
 * Manages the unfilled queue (producers needing data) and buffered queue (producers with data).
 * Responsible for:
 * - Maintaining producer priority queues with custom comparators
 * - Parallel fetch orchestration (respecting maxDegreeOfParallelism)
 * - Producer lifecycle management (unfilled → buffered → requeue/exhaust)
 * - Buffering coordination without owning business logic
 * @hidden
 */
export class DocumentProducerScheduler {
  private readonly unfilledQueue: PriorityQueue<DocumentProducer>;
  private readonly bufferedQueue: PriorityQueue<DocumentProducer>;
  private readonly maxDegreeOfParallelism: number | undefined;

  /**
   * Creates a new DocumentProducerScheduler
   * @param documentProducerComparator - Comparator for ordering producers in buffered queue
   * @param options - Scheduler options
   */
  constructor(
    documentProducerComparator: (a: DocumentProducer, b: DocumentProducer) => number,
    options: { maxDegreeOfParallelism?: number } = {},
  ) {
    // Unfilled queue uses range-based comparison (left-to-right traversal)
    this.unfilledQueue = new PriorityQueue<DocumentProducer>((a: DocumentProducer, b: DocumentProducer) =>
      this.compareDocumentProducersByRange(a, b),
    );

    // Buffered queue uses query-specific comparator (parallel vs order-by)
    this.bufferedQueue = new PriorityQueue<DocumentProducer>((a: DocumentProducer, b: DocumentProducer) =>
      documentProducerComparator(b, a),
    );

    this.maxDegreeOfParallelism = options.maxDegreeOfParallelism;
  }

  /**
   * Enqueues a single document producer into the unfilled queue
   */
  public enqueueUnfilled(producer: DocumentProducer): void {
    this.unfilledQueue.enq(producer);
  }

  /**
   * Enqueues multiple document producers into the unfilled queue
   */
  public enqueueAllUnfilled(producers: DocumentProducer[]): void {
    producers.forEach((producer) => this.unfilledQueue.enq(producer));
  }

  /**
   * Gets the current size of the unfilled queue
   */
  public get unfilledSize(): number {
    return this.unfilledQueue.size();
  }

  /**
   * Gets the current size of the buffered queue
   */
  public get bufferedSize(): number {
    return this.bufferedQueue.size();
  }

  /**
   * Checks if there are any active producers in either queue
   */
  public hasActiveProducers(): boolean {
    return this.unfilledQueue.size() > 0 || this.bufferedQueue.size() > 0;
  }

  /**
   * Buffers document producers from the unfilled queue based on maxDegreeOfParallelism.
   * Fetches data in parallel and moves producers to the buffered queue.
   * Handles partition split detection and creates replacement producers.
   * @param diagnosticNode - Diagnostic node for tracing
   * @param callbacks - Callbacks for interacting with parent context
   */
  public async bufferProducers(
    diagnosticNode: DiagnosticNodeInternal | undefined,
    callbacks: SchedulerCallbacks,
  ): Promise<void> {
    if (this.unfilledQueue.size() === 0) {
      return;
    }

    const maxDegree =
      this.maxDegreeOfParallelism === undefined || this.maxDegreeOfParallelism < 1
        ? this.unfilledQueue.size() // number of partitions
        : Math.min(this.maxDegreeOfParallelism, this.unfilledQueue.size());

    const documentProducers: DocumentProducer[] = [];
    while (documentProducers.length < maxDegree && this.unfilledQueue.size() > 0) {
      const documentProducer = this.unfilledQueue.deq();
      documentProducers.push(documentProducer);
    }

    const bufferDocumentProducer = async (documentProducer: DocumentProducer): Promise<void> => {
      try {
        const headers = await documentProducer.bufferMore(diagnosticNode);
        callbacks.mergeHeaders(headers);

        // Always track this document producer in patchToRangeMapping, even if it has no results
        // This ensures we maintain a record of all partition ranges that were scanned
        const nextItem = documentProducer.peekNextItem();
        if (nextItem !== undefined) {
          this.bufferedQueue.enq(documentProducer);
        } else {
          // Track document producer with no results in patchToRangeMapping
          // This represents a scanned partition that yielded no results
          // IMPORTANT: Only include if continuation token is NOT null/exhausted
          // Document producers with no data in buffer and no continuation token are exhausted
          // and should not be added to partitionDataPatchMap to prevent infinite loops in order by queries
          if (
            documentProducer.continuationToken &&
            documentProducer.continuationToken !== "" &&
            documentProducer.continuationToken.toLowerCase() !== "null"
          ) {
            callbacks.updatePartitionMapping({
              itemCount: 0, // 0 items for empty result set
              partitionKeyRange: documentProducer.targetPartitionKeyRange,
              continuationToken: documentProducer.continuationToken,
            });
          }
          if (documentProducer.hasMoreResults()) {
            this.unfilledQueue.enq(documentProducer);
          }
        }
      } catch (err: any) {
        // Split detection is delegated to parent via callback
        // Parent decides whether to throw or handle gracefully
        await callbacks.onSplitDetected(err, diagnosticNode, documentProducer);
      }
    };

    await Promise.all(documentProducers.map((producer) => bufferDocumentProducer(producer)));
  }

  /**
   * Processes buffered document producers and drains their data.
   * Uses template method pattern - delegates actual processing to parent via callbacks.
   * @param callbacks - Callbacks for interacting with parent context
   */
  public async processBuffered(callbacks: SchedulerCallbacks): Promise<void> {
    while (
      this.bufferedQueue.size() > 0 &&
      callbacks.shouldProcessBufferedProducers(this.unfilledQueue.size() === 0)
    ) {
      const producer = this.bufferedQueue.deq();
      if (!producer) break;

      const response = await callbacks.fetchFromProducer(producer);
      callbacks.mergeHeaders(response.headers);

      if (response.result) {
        callbacks.addToBuffer(response.result);
        this.handlePartitionMapping(producer, response.result, callbacks);
      }

      // Handle producer lifecycle
      if (producer.peekNextItem() !== undefined) {
        this.bufferedQueue.enq(producer);
      } else if (producer.hasMoreResults()) {
        this.unfilledQueue.enq(producer);
      }
    }
  }

  /**
   * Disposes all producers in both queues.
   * Drains both queues and calls dispose() on each producer.
   */
  public disposeAll(): void {
    while (this.unfilledQueue.size() > 0) {
      const producer = this.unfilledQueue.deq();
      producer.dispose();
    }
    while (this.bufferedQueue.size() > 0) {
      const producer = this.bufferedQueue.deq();
      producer.dispose();
    }
  }

  /**
   * Handles partition mapping updates after processing a producer.
   * Delegates to parent callback to update partition tracking.
   */
  private handlePartitionMapping(
    producer: DocumentProducer,
    result: any,
    callbacks: SchedulerCallbacks,
  ): void {
    const itemCount = result?.length || 0;
    const continuationToken = callbacks.getContinuationToken(producer);
    const mapping = {
      itemCount,
      partitionKeyRange: producer.targetPartitionKeyRange,
      continuationToken,
    };

    callbacks.updatePartitionMapping(mapping);
  }

  /**
   * Compares two document producers based on their partition key ranges and EPK values.
   * Primary comparison: minInclusive values for left-to-right range traversal
   * Secondary comparison: EPK ranges when minInclusive values are identical
   * Used for the unfilled queue ordering.
   * @param a - First document producer
   * @param b - Second document producer
   * @returns Comparison result for priority queue ordering
   */
  private compareDocumentProducersByRange(a: DocumentProducer, b: DocumentProducer): number {
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
}
