// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { ClientContext } from "../ClientContext";
import { PartitionedQueryExecutionInfo } from "../request/ErrorResponse";
import { FeedOptions } from "../request/FeedOptions";
import { DocumentProducer } from "./documentProducer";
import { ExecutionContext } from "./ExecutionContext";
import { OrderByDocumentProducerComparator } from "./orderByDocumentProducerComparator";
import { ParallelQueryExecutionContextBase } from "./parallelQueryExecutionContextBase";
import { SqlQuerySpec } from "./SqlQuerySpec";

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
    partitionedQueryExecutionInfo: PartitionedQueryExecutionInfo
  ) {
    // Calling on base class constructor
    super(clientContext, collectionLink, query, options, partitionedQueryExecutionInfo);
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
}
