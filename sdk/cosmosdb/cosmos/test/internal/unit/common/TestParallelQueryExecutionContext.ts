// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DocumentProducer, ExecutionContext } from "$internal/queryExecutionContext/index.js";
import { ParallelQueryExecutionContextBase } from "$internal/queryExecutionContext/index.js";
import type { Response, DiagnosticNodeInternal } from "@azure/cosmos";

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
