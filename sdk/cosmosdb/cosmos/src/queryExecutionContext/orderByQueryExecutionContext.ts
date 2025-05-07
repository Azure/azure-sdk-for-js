// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import type { ClientContext } from "../ClientContext.js";
import type { PartitionedQueryExecutionInfo } from "../request/ErrorResponse.js";
import type { FeedOptions } from "../request/FeedOptions.js";
import type { DocumentProducer } from "./documentProducer.js";
import type { ExecutionContext } from "./ExecutionContext.js";
import { DiagnosticNodeInternal } from "../diagnostics/DiagnosticNodeInternal.js";
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
   * Fetches more results from the query execution context.
   * @param diagnosticNode - Optional diagnostic node for tracing.
   * @returns A promise that resolves to the fetched results.
   * @hidden
   */
  public async fetchMore(diagnosticNode?: DiagnosticNodeInternal): Promise<any> {
    try {
      await this.bufferDocumentProducers(diagnosticNode);
      await this.fillBufferFromBufferQueue(true);
      return this.drainBufferedItems();
    } catch (error) {
      console.error("Error fetching more results:", error);
      throw error;
    }
  }
}
