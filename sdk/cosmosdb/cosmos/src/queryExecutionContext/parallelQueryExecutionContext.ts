// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DocumentProducer } from "./documentProducer.js";
import type { ExecutionContext } from "./ExecutionContext.js";
import { ParallelQueryExecutionContextBase } from "./parallelQueryExecutionContextBase.js";

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
    clientContext: any,
    collectionLink: string,
    query: any,
    options: any,
    partitionedQueryExecutionInfo: any,
    correlatedActivityId: string,
  ) {
    const rangeManager = TargetPartitionRangeManager.createForParallelQuery({
      queryInfo: partitionedQueryExecutionInfo,
    });

    // Create parallel query processing strategy
    const processingStrategy = new ParallelQueryProcessingStrategy();

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
    );
  }

  // Instance members are inherited

  // Overriding documentProducerComparator for ParallelQueryExecutionContexts
  /**
   * Provides a Comparator for document producers using the min value of the corresponding target partition.
   * @returns Comparator Function
   * @hidden
   */
  public documentProducerComparator(
    docProd1: DocumentProducer,
    docProd2: DocumentProducer,
  ): number {
    return this.compareDocumentProducersByRange(docProd2, docProd1);
  }

  /**
   * Processes a document producer for parallel queries.
   * Handles batch processing of all buffered items.
   * @hidden
   */
  protected async processDocumentProducer(producer: DocumentProducer): Promise<void> {
    const { result, headers } = await producer.fetchBufferedItems();
    this._mergeWithActiveResponseHeaders(headers);

    // Update partition mapping for continuation token generation
    this.updatePartitionMapping({
      itemCount: result?.length || 0,
      partitionKeyRange: producer.targetPartitionKeyRange,
      continuationToken: producer.continuationToken,
    });

    // Add results to buffer
    this.addToBuffer(result);

    // Handle producer lifecycle
    if (producer.hasMoreResults()) {
      this.moveToUnfilledQueue(producer);
    }
  }

  /**
   * Determines if processing should continue for parallel queries.
   * For parallel queries, we process all buffered producers.
   * @hidden
   */
  protected shouldContinueProcessing(): boolean {
    return true; // Process all buffered items in parallel queries
  }


}
