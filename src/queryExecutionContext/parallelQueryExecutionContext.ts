import { ClientContext } from "../ClientContext";
import { PartitionedQueryExecutionInfo } from "../request/ErrorResponse";
import { DocumentProducer } from "./documentProducer";
import { IExecutionContext } from "./IExecutionContext";
import { ParallelQueryExecutionContextBase } from "./parallelQueryExecutionContextBase";

/** @hidden */
export class ParallelQueryExecutionContext extends ParallelQueryExecutionContextBase implements IExecutionContext {
  /**
   * Provides the ParallelQueryExecutionContext.
   * This class is capable of handling parallelized queries and dervives from ParallelQueryExecutionContextBase.
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
   * @returns {object}        - Comparator Function
   * @ignore
   */
  public documentProducerComparator(docProd1: DocumentProducer, docProd2: DocumentProducer) {
    const a = docProd1.getTargetParitionKeyRange()["minInclusive"];
    const b = docProd2.getTargetParitionKeyRange()["minInclusive"];
    return a === b ? 0 : a > b ? 1 : -1;
  }
}
