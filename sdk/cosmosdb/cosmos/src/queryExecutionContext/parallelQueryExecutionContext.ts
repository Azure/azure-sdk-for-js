// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ClientContext } from "../ClientContext.js";
import type { PartitionedQueryExecutionInfo } from "../request/ErrorResponse.js";
import type { FeedOptions } from "../request/FeedOptions.js";
import type { DocumentProducer } from "./documentProducer.js";
import type { ExecutionContext } from "./ExecutionContext.js";
import { ParallelQueryExecutionContextBase } from "./parallelQueryExecutionContextBase.js";
import type { Response } from "../request/index.js";
import type { SqlQuerySpec } from "./SqlQuerySpec.js";

import { TargetPartitionRangeManager } from "./queryFilteringStrategy/TargetPartitionRangeManager.js";
import { ParallelQueryProcessingStrategy } from "./queryProcessingStrategy/ParallelQueryProcessingStrategy.js";

/**
 * Provides the ParallelQueryExecutionContext.
 * This class is capable of handling parallelized queries and derives from ParallelQueryExecutionContextBase.
 * @hidden
 */
export class ParallelQueryExecutionContext
  extends ParallelQueryExecutionContextBase
  implements ExecutionContext {
  constructor(
    clientContext: ClientContext,
    collectionLink: string,
    query: string | SqlQuerySpec,
    options: FeedOptions,
    partitionedQueryExecutionInfo: PartitionedQueryExecutionInfo,
    correlatedActivityId: string,
  ) {
    const rangeManager = TargetPartitionRangeManager.createForParallelQuery({
      queryInfo: partitionedQueryExecutionInfo,
    });

    // Create parallel query processing strategy
    const processingStrategy = new ParallelQueryProcessingStrategy();

    // Create comparator for document producers
    const comparator = ParallelQueryExecutionContext.createDocumentProducerComparator();

    // Calling on base class constructor
    super(
      clientContext,
      collectionLink,
      query,
      options,
      partitionedQueryExecutionInfo,
      correlatedActivityId,
      rangeManager,
      processingStrategy,
      comparator,
    );
  }

  /**
   * Fetches all buffered items from producer for parallel processing.
   */
  protected async fetchFromProducer(producer: DocumentProducer): Promise<Response<any>> {
    return producer.fetchBufferedItems();
  }

  /**
   * Determines if buffered producers should continue to be processed for parallel queries.
   * For parallel queries, we process all buffered producers.
   * @param _isUnfilledQueueEmpty - Whether the unfilled queue is empty (ignored for parallel queries)
   * @hidden
   */
  protected shouldProcessBufferedProducers(_isUnfilledQueueEmpty: boolean): boolean {
    return true; // Process all buffered items in parallel queries
  }

  /**
   * Creates a comparator function for sorting document producers in parallel queries.
   * Sorts by partition key range minInclusive values, with empty string first,
   * then lexicographically. Uses EPK ranges as secondary sort when minInclusive values are identical.
   */
  private static createDocumentProducerComparator(): (
    docProd1: DocumentProducer,
    docProd2: DocumentProducer,
  ) => number {
    return (docProd1: DocumentProducer, docProd2: DocumentProducer): number => {
      const aMinInclusive = docProd1.targetPartitionKeyRange.minInclusive;
      const bMinInclusive = docProd2.targetPartitionKeyRange.minInclusive;

      // Sort empty string first, then lexicographically (original logic)
      if (aMinInclusive === bMinInclusive) {
        // If minInclusive values are the same, check minEPK ranges if they exist
        const aMinEpk = docProd1.startEpk;
        const bMinEpk = docProd2.startEpk;
        if (aMinEpk && bMinEpk) {
          return aMinEpk < bMinEpk ? -1 : 1;
        }
        return 0;
      }
      if (aMinInclusive === "") return -1;
      if (bMinInclusive === "") return 1;
      return aMinInclusive < bMinInclusive ? -1 : 1;
    };
  }
}
