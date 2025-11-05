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

  protected async processBufferedDocumentProducers(): Promise<void> {
    // Simple implementation for testing - just process all buffered document producers
    // This method is called from fillBufferFromBufferQueue in the base class
    while (this.bufferedDocumentProducersQueue.size() > 0) {
      const documentProducer = this.bufferedDocumentProducersQueue.deq();

      // Fetch items from the document producer and add to buffer
      const response = await documentProducer.fetchBufferedItems();
      if (response.result && Array.isArray(response.result)) {
        this.buffer.push(...response.result);
      }

      // Update headers (accumulate request charges)
      if (response.headers) {
        const currentCharge = parseFloat(this.respHeaders["x-ms-request-charge"] || "0");
        const newCharge = parseFloat(response.headers["x-ms-request-charge"] || "0");
        this.respHeaders["x-ms-request-charge"] = (currentCharge + newCharge).toString();
      }

      // If the document producer has more results, add it back to the unfilled queue
      if (documentProducer.hasMoreResults()) {
        this.unfilledDocumentProducersQueue.enq(documentProducer);
      }
    }
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
