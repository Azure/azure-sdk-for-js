// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DocumentProducer } from "./documentProducer";
import type { ExecutionContext } from "./ExecutionContext";
import { ParallelQueryExecutionContextBase } from "./parallelQueryExecutionContextBase";
import { Response } from "../request";
import { DiagnosticNodeInternal } from "../diagnostics/DiagnosticNodeInternal";

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
    return docProd1.generation - docProd2.generation;
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
