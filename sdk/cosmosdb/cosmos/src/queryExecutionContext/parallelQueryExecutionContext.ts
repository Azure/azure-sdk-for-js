import {
  DocumentProducer,
  IExecutionContext,
  ParallelQueryExecutionContextBase,
  PartitionedQueryExecutionContextInfo
} from ".";
import { ClientContext } from "../ClientContext";
import { PARITIONKEYRANGE } from "../routing";

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
    partitionedQueryExecutionInfo: PartitionedQueryExecutionContextInfo
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

  private _buildContinuationTokenFrom(documentProducer: DocumentProducer) {
    // given the document producer constructs the continuation token
    if (documentProducer.allFetched && documentProducer.peekBufferedItems().length === 0) {
      return undefined;
    }

    const min = documentProducer.targetPartitionKeyRange[PARITIONKEYRANGE.MinInclusive];
    const max = documentProducer.targetPartitionKeyRange[PARITIONKEYRANGE.MaxExclusive];
    const range = {
      min,
      max,
      id: documentProducer.targetPartitionKeyRange.id
    };

    // TODO: static method
    const withNullDefault = (token: any) => {
      if (token) {
        return token;
      } else if (token === null || token === undefined) {
        return null;
      }
    };

    const documentProducerContinuationToken =
      documentProducer.peekBufferedItems().length > 0
        ? documentProducer.previousContinuationToken
        : documentProducer.continuationToken;

    return {
      token: withNullDefault(documentProducerContinuationToken),
      range
    };
  }
}
