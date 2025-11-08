// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  DocumentProducer,
  ExecutionContext,
} from "../../../../src/queryExecutionContext/index.js";
import { ParallelQueryExecutionContextBase } from "../../../../src/queryExecutionContext/index.js";
import type { Response } from "../../../../src/request/index.js";
import type { DiagnosticNodeInternal } from "../../../../src/diagnostics/DiagnosticNodeInternal.js";

export class TestParallelQueryExecutionContext
  extends ParallelQueryExecutionContextBase
  implements ExecutionContext
{
  public documentProducerComparator(
    docProd1: DocumentProducer,
    docProd2: DocumentProducer,
  ): number {
    return docProd1.generation - docProd2.generation;
  }

  /**
   * Processes a single document producer for testing.
   * Implements the abstract method from the base class.
   */
  protected async processDocumentProducer(producer: DocumentProducer): Promise<void> {
    // Fetch items from the document producer
    const response = await producer.fetchBufferedItems();
    
    // Add results to buffer using the helper method
    this.addToBuffer(response.result);

    // Update partition mapping for continuation token generation
    this.updatePartitionMapping({
      itemCount: response.result?.length || 0,
      partitionKeyRange: producer.targetPartitionKeyRange,
      continuationToken: producer.continuationToken,
    });

    // Merge headers using the base class method
    this._mergeWithActiveResponseHeaders(response.headers);

    // Handle producer lifecycle
    if (producer.hasMoreResults()) {
      this.moveToUnfilledQueue(producer);
    }
  }

  /**
   * Determines if processing should continue for testing.
   * For tests, we process all buffered items like parallel queries.
   */
  protected shouldContinueProcessing(): boolean {
    return true; // Process all buffered items for testing
  }

  private async bufferMore(diagnosticNode?: DiagnosticNodeInternal): Promise<void> {
    // TODO: need to update headers from here, so make sure it returns it
    await this.bufferDocumentProducers(diagnosticNode);
    await this.fillBufferFromBufferQueue();
  }

  public async fetchMore(diagnosticNode?: DiagnosticNodeInternal): Promise<Response<any>> {
    await this.bufferMore(diagnosticNode);
    return this.drainBufferedItems();
  }
}
