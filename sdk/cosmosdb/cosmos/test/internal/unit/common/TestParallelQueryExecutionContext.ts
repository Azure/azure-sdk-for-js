// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import {
  DocumentProducer,
  ExecutionContext,
  ParallelQueryExecutionContextBase,
} from "../../../../src/queryExecutionContext";

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
}
