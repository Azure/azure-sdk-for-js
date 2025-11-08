// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DocumentProducer } from "./documentProducer.js";
import type { ExecutionContext } from "./ExecutionContext.js";
import { ParallelQueryExecutionContextBase } from "./parallelQueryExecutionContextBase.js";
import type { Response } from "../request/index.js";
import type { DiagnosticNodeInternal } from "../diagnostics/DiagnosticNodeInternal.js";

/**
 * Provides the ParallelQueryExecutionContext.
 * This class is capable of handling parallelized queries and derives from ParallelQueryExecutionContextBase.
 * @hidden
 */
export class ParallelQueryExecutionContext
  extends ParallelQueryExecutionContextBase
  implements ExecutionContext
{
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

  /**
   * Fetches more results from the query execution context.
   * @param diagnosticNode - Optional diagnostic node for tracing.
   * @returns A promise that resolves to the fetched results.
   * @hidden
   */
  public async fetchMore(diagnosticNode?: DiagnosticNodeInternal): Promise<Response<any>> {
    try {
      // Buffer document producers and fill buffer from the queue
      await this.bufferDocumentProducers(diagnosticNode);
      await this.fillBufferFromBufferQueue();
      // Drain buffered items
      return this.drainBufferedItems();
    } catch (error) {
      // Handle any errors that occur during fetching
      console.error("Error fetching more documents:", error);
      throw error;
    }
  }
}
