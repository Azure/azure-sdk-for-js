// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { ClientContext } from "../ClientContext";
import { PartitionedQueryExecutionInfo } from "../request/ErrorResponse";
import { DocumentProducer } from "./documentProducer";
import { ExecutionContext } from "./ExecutionContext";
import { ParallelQueryExecutionContextBase } from "./parallelQueryExecutionContextBase";

/** @hidden */
export class ParallelQueryExecutionContext extends ParallelQueryExecutionContextBase
  implements ExecutionContext {
  /**
   * Provides the ParallelQueryExecutionContext.
   * This class is capable of handling parallelized queries and dervives from ParallelQueryExecutionContextBase.
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
    query: any,
    options: any,
    partitionedQueryExecutionInfo: PartitionedQueryExecutionInfo
  ) {
    // Calling on base class constructor
    super(clientContext, collectionLink, query, options, partitionedQueryExecutionInfo);
  }
  // Instance members are inherited

  // Overriding documentProducerComparator for ParallelQueryExecutionContexts
  /**
   * Provides a Comparator for document producers using the min value of the corresponding target partition.
   * @returns Comparator Function
   * @hidden
   */
  public documentProducerComparator(docProd1: DocumentProducer, docProd2: DocumentProducer) {
    return docProd1.generation - docProd2.generation;
  }
}
