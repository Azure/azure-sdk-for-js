// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DocumentProducer } from "./documentProducer.js";
import type { ExecutionContext } from "./ExecutionContext.js";
import { ParallelQueryExecutionContextBase } from "./parallelQueryExecutionContextBase.js";
import type { Response } from "../request/index.js";

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
   * Fetches all buffered items from producer for parallel processing.
   */
  protected async fetchFromProducer(producer: DocumentProducer): Promise<Response<any>> {
    return await producer.fetchBufferedItems();
  }

  /**
   * Updates partition mapping for parallel query continuation tokens.
   */
  protected handlePartitionMapping(producer: DocumentProducer, result: any): void {
    this.updatePartitionMapping({
      itemCount: result?.length || 0,
      partitionKeyRange: producer.targetPartitionKeyRange,
      continuationToken: producer.continuationToken,
    });
  }

  /**
   * Determines if buffered producers should continue to be processed for parallel queries.
   * For parallel queries, we process all buffered producers.
   * @hidden
   */
  protected shouldProcessBufferedProducers(): boolean {
    return true; // Process all buffered items in parallel queries
  }


}
