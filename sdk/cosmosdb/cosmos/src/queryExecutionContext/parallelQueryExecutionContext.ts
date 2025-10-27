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
  implements ExecutionContext {
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
   * Processes buffered document producers for Parallel queries.
   * Handles batch processing of all buffered items.
   * @returns A promise that resolves when processing is complete.
   * @hidden
   */
  protected async processBufferedDocumentProducers(): Promise<void> {
    while (this.bufferedDocumentProducersQueue.size() > 0) {
      const documentProducer = this.bufferedDocumentProducersQueue.deq();
      const { result, headers } = await documentProducer.fetchBufferedItems();
      this._mergeWithActiveResponseHeaders(headers);

      // add a marker to buffer stating the partition key range and continuation token
      this.partitionDataPatchMap.set((++this.patchCounter).toString(), {
        itemCount: result?.length || 0, // Use actual result length for item count, 0 if no results
        partitionKeyRange: documentProducer.targetPartitionKeyRange,
        continuationToken: documentProducer.continuationToken,
      });

      if (result?.length > 0) {
        this.buffer.push(...result);
      }
      if (documentProducer.hasMoreResults()) {
        this.unfilledDocumentProducersQueue.enq(documentProducer);
      }
    }
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
