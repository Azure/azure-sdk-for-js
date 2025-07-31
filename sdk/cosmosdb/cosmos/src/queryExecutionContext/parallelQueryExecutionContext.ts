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
    const a = docProd1.targetPartitionKeyRange.minInclusive;
    const b = docProd2.targetPartitionKeyRange.minInclusive;
    // Sort empty string first, then lexicographically
    if (a === b) return 0;
    if (a === "") return -1;
    if (b === "") return 1;
    return a < b ? -1 : 1;
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
      // TODO: remove it, but idea is create some kind of seperations in the buffer such that it will be easier to identify
      // which items belong to which partition, maybe an map of partiion id to data can be returned along with contiuation data
      return this.drainBufferedItems();
    } catch (error) {
      // Handle any errors that occur during fetching
      console.error("Error fetching more documents:", error);
      throw error;
    }
  }
}
