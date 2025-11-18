// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import type { ClientContext } from "../ClientContext.js";
import type { PartitionedQueryExecutionInfo } from "../request/ErrorResponse.js";
import type { FeedOptions } from "../request/FeedOptions.js";
import type { DocumentProducer } from "./documentProducer.js";
import type { ExecutionContext } from "./ExecutionContext.js";
import type { Response } from "../request/index.js";

import { OrderByDocumentProducerComparator } from "./orderByDocumentProducerComparator.js";
import { ParallelQueryExecutionContextBase } from "./parallelQueryExecutionContextBase.js";
import type { SqlQuerySpec } from "./SqlQuerySpec.js";
import { TargetPartitionRangeManager } from "./queryFilteringStrategy/TargetPartitionRangeManager.js";
import { OrderByQueryProcessingStrategy } from "./queryProcessingStrategy/OrderByQueryProcessingStrategy.js";

/** @hidden */
export class OrderByQueryExecutionContext
  extends ParallelQueryExecutionContextBase
  implements ExecutionContext {
  private orderByComparator: any;
  /**
   * Provides the OrderByQueryExecutionContext.
   * This class is capable of handling orderby queries and dervives from ParallelQueryExecutionContextBase.
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
    clientContext: ClientContext,
    collectionLink: string,
    query: string | SqlQuerySpec,
    options: FeedOptions,
    partitionedQueryExecutionInfo: PartitionedQueryExecutionInfo,
    correlatedActivityId: string,
  ) {
    const rangeManager = TargetPartitionRangeManager.createForOrderByQuery({
      queryInfo: partitionedQueryExecutionInfo,
    });

    // Create ORDER BY query processing strategy
    const processingStrategy = new OrderByQueryProcessingStrategy();

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
    this.orderByComparator = new OrderByDocumentProducerComparator(this.sortOrders);
  }

  // Overriding documentProducerComparator for OrderByQueryExecutionContexts
  /**
   * Provides a Comparator for document producers which respects orderby sort order.
   * @returns Comparator Function
   * @hidden
   */
  public documentProducerComparator(docProd1: DocumentProducer, docProd2: DocumentProducer): any {
    return this.orderByComparator.compare(docProd1, docProd2);
  }

  /**
   * Fetches next single item from producer for ORDER BY processing.
   */
  protected async fetchFromProducer(producer: DocumentProducer): Promise<Response<any>> {
    return await producer.fetchNextItem();
  }

  /**
   * Updates partition mapping for ORDER BY query with special continuation token logic.
   */
  protected handlePartitionMapping(producer: DocumentProducer, _result: any): void {
    // Determine which continuation token to use based on buffer state
    const hasMoreBufferedItems = producer.peakNextItem() !== undefined;
    const continuationTokenToUse = hasMoreBufferedItems
      ? producer.previousContinuationToken
      : producer.continuationToken;

    // Use ORDER BY partition mapping with merge logic
    this.updatePartitionMapping(
      {
        itemCount: 1,
        partitionKeyRange: producer.targetPartitionKeyRange,
        continuationToken: continuationTokenToUse,
      },
      true, // true = mergeWithExisting for ORDER BY
    );
  }

  /**
   * Determines if buffered producers should continue to be processed for ORDER BY queries.
   * For ORDER BY, only process when no unfilled producers remain to maintain order.
   * @hidden
   */
  protected shouldProcessBufferedProducers(): boolean {
    // For ORDER BY, only process when no unfilled producers remain to maintain order
    return this.isUnfilledQueueEmpty();
  }


}
