// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import type { ClientContext } from "../ClientContext.js";
import type { PartitionedQueryExecutionInfo } from "../request/ErrorResponse.js";
import type { FeedOptions } from "../request/FeedOptions.js";
import type { DocumentProducer } from "./documentProducer.js";
import type { ExecutionContext } from "./ExecutionContext.js";
import type { DiagnosticNodeInternal } from "../diagnostics/DiagnosticNodeInternal.js";
import { OrderByDocumentProducerComparator } from "./orderByDocumentProducerComparator.js";
import { ParallelQueryExecutionContextBase } from "./parallelQueryExecutionContextBase.js";
import type { SqlQuerySpec } from "./SqlQuerySpec.js";

/** @hidden */
export class OrderByQueryExecutionContext
  extends ParallelQueryExecutionContextBase
  implements ExecutionContext
{
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
    // Calling on base class constructor
    super(
      clientContext,
      collectionLink,
      query,
      options,
      partitionedQueryExecutionInfo,
      correlatedActivityId,
    );
    this.orderByComparator = new OrderByDocumentProducerComparator(this.sortOrders);
  }
  // Instance members are inherited

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
   * Processes buffered document producers for OrderBy queries.
   * Handles item-by-item processing to maintain order.
   * @returns A promise that resolves when processing is complete.
   * @hidden
   */
  protected async processBufferedDocumentProducers(): Promise<void> {
    let documentProducer; // used to track the last document producer
    // For OrderBy queries, process one item at a time when we have buffered items
    // Only process if we either have no more unfilled producers OR we need to maintain order
    while (
      this.bufferedDocumentProducersQueue.size() > 0 &&
      this.unfilledDocumentProducersQueue.isEmpty()  
    ) {
      documentProducer = this.bufferedDocumentProducersQueue.deq();
      const { result, headers } = await documentProducer.fetchNextItem();
      this._mergeWithActiveResponseHeaders(headers);

      if (result) {
        this.buffer.push(result);
        // Update PartitionDataPatchMap
        const currentPatch = this.partitionDataPatchMap.get(this.patchCounter.toString());
        const isSamePartition =
          currentPatch?.partitionKeyRange?.id === documentProducer.targetPartitionKeyRange.id;

        // Check if document producer buffer has more items to determine which continuation token to use
        const hasMoreBufferedItems = documentProducer.peakNextItem() !== undefined;
        const continuationTokenToUse = hasMoreBufferedItems
          ? documentProducer.previousContinuationToken
          : documentProducer.continuationToken;

        if (!isSamePartition) {
          this.partitionDataPatchMap.set((++this.patchCounter).toString(), {
            itemCount: 1,
            partitionKeyRange: documentProducer.targetPartitionKeyRange,
            continuationToken: continuationTokenToUse,
          });
        } else if (currentPatch) {
          currentPatch.itemCount++;
          currentPatch.continuationToken = continuationTokenToUse;
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
  }

  /**
   * Fetches more results from the query execution context.
   * @param diagnosticNode - Optional diagnostic node for tracing.
   * @returns A promise that resolves to the fetched results.
   * @hidden
   */
  public async fetchMore(diagnosticNode?: DiagnosticNodeInternal): Promise<any> {
    try {
      await this.bufferDocumentProducers(diagnosticNode);
      await this.fillBufferFromBufferQueue();
      const drainedItemsResponse = await this.drainBufferedItems();
      return drainedItemsResponse;
    } catch (error) {
      console.error("Error fetching more results:", error);
      throw error;
    }
  }
}
