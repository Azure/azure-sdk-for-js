// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  DocumentProducer,
  ExecutionContext,
} from "../../../../src/queryExecutionContext/index.js";
import { ParallelQueryExecutionContextBase } from "../../../../src/queryExecutionContext/index.js";
import type { Response } from "../../../../src/request/index.js";
import type { ClientContext } from "../../../../src/ClientContext.js";
import type { FeedOptions, PartitionedQueryExecutionInfo } from "../../../../src/request/index.js";
import type { SqlQuerySpec } from "../../../../src/queryExecutionContext/SqlQuerySpec.js";
import { TargetPartitionRangeManager } from "../../../../src/queryExecutionContext/queryFilteringStrategy/TargetPartitionRangeManager.js";
import { ParallelQueryProcessingStrategy } from "../../../../src/queryExecutionContext/queryProcessingStrategy/ParallelQueryProcessingStrategy.js";

export class TestParallelQueryExecutionContext
  extends ParallelQueryExecutionContextBase
  implements ExecutionContext
{
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

    const processingStrategy = new ParallelQueryProcessingStrategy();

    const comparator = (docProd1: DocumentProducer, docProd2: DocumentProducer): number => {
      return docProd1.generation - docProd2.generation;
    };

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
   * Fetches all buffered items from producer for testing.
   */
  protected async fetchFromProducer(producer: DocumentProducer): Promise<Response<any>> {
    return producer.fetchBufferedItems();
  }

  /**
   * Determines if buffered producers should continue to be processed for testing.
   * For tests, we process all buffered items like parallel queries.
   * @param _isUnfilledQueueEmpty - Whether the unfilled queue is empty (ignored for testing)
   */
  protected shouldProcessBufferedProducers(_isUnfilledQueueEmpty: boolean): boolean {
    return true; // Process all buffered items for testing
  }

  // Note: Using the public fetchMore from base class since private methods are not accessible
  // The base class fetchMore already handles bufferDocumentProducers, fillBufferFromBufferQueue, and drainBufferedItems
}
