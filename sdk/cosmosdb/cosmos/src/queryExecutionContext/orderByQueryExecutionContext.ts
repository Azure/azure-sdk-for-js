import {
  DocumentProducer,
  IExecutionContext,
  OrderByDocumentProducerComparator,
  ParallelQueryExecutionContextBase,
  PartitionedQueryExecutionContextInfo
} from ".";
import { ClientContext } from "../ClientContext";

/** @hidden */
export class OrderByQueryExecutionContext extends ParallelQueryExecutionContextBase implements IExecutionContext {
  private orderByComparator: any;
  /**
   * Provides the OrderByQueryExecutionContext.
   * This class is capable of handling orderby queries and dervives from ParallelQueryExecutionContextBase.
   *
   * When handling a parallelized query, it instantiates one instance of
   * DocumentProcuder per target partition key range and aggregates the result of each.
   *
   * @constructor ParallelQueryExecutionContext
   * @param {ClientContext} clientContext        - The service endpoint to use to create the client.
   * @param {string} collectionLink                - The Collection Link
   * @param {FeedOptions} [options]                - Represents the feed options.
   * @param {object} partitionedQueryExecutionInfo - PartitionedQueryExecutionInfo
   * @ignore
   */
  constructor(
    clientContext: ClientContext,
    collectionLink: string,
    query: any, // TODO: any query
    options: any, // TODO: any options
    partitionedQueryExecutionInfo: PartitionedQueryExecutionContextInfo
  ) {
    // Calling on base class constructor
    super(clientContext, collectionLink, query, options, partitionedQueryExecutionInfo);
    this.orderByComparator = new OrderByDocumentProducerComparator(this.sortOrders);
  }
  // Instance members are inherited

  // Overriding documentProducerComparator for OrderByQueryExecutionContexts
  /**
   * Provides a Comparator for document producers which respects orderby sort order.
   * @returns {object}        - Comparator Function
   * @ignore
   */
  public documentProducerComparator(docProd1: DocumentProducer, docProd2: DocumentProducer) {
    return this.orderByComparator.compare(docProd1, docProd2);
  }
}
