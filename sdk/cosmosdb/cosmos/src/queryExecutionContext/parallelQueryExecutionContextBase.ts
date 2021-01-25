// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import PriorityQueue from "priorityqueuejs";
import semaphore from "semaphore";
import { ClientContext } from "../ClientContext";
import { logger } from "../common/logger";
import { StatusCodes, SubStatusCodes } from "../common/statusCodes";
import { FeedOptions, Response } from "../request";
import { PartitionedQueryExecutionInfo } from "../request/ErrorResponse";
import { QueryRange } from "../routing/QueryRange";
import { SmartRoutingMapProvider } from "../routing/smartRoutingMapProvider";
import { CosmosHeaders } from "./CosmosHeaders";
import { DocumentProducer } from "./documentProducer";
import { ExecutionContext } from "./ExecutionContext";
import { getInitialHeader, mergeHeaders } from "./headerUtils";

/** @hidden */
const log = logger("parallelQueryExecutionContextBase");

/** @hidden */
export enum ParallelQueryExecutionContextBaseStates {
  started = "started",
  inProgress = "inProgress",
  ended = "ended"
}

/** @hidden */
export abstract class ParallelQueryExecutionContextBase implements ExecutionContext {
  private err: any;
  private state: any;
  private static STATES = ParallelQueryExecutionContextBaseStates;
  private routingProvider: SmartRoutingMapProvider;
  protected sortOrders: any;
  private requestContinuation: any;
  private respHeaders: CosmosHeaders;
  private orderByPQ: PriorityQueue<DocumentProducer>;
  private sem: any;
  private waitingForInternalExecutionContexts: number;
  /**
   * Provides the ParallelQueryExecutionContextBase.
   * This is the base class that ParallelQueryExecutionContext and OrderByQueryExecutionContext will derive from.
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
    private clientContext: ClientContext,
    private collectionLink: string,
    private query: any, // TODO: any - It's not SQLQuerySpec
    private options: FeedOptions,
    private partitionedQueryExecutionInfo: PartitionedQueryExecutionInfo
  ) {
    this.clientContext = clientContext;
    this.collectionLink = collectionLink;
    this.query = query;
    this.options = options;
    this.partitionedQueryExecutionInfo = partitionedQueryExecutionInfo;

    this.err = undefined;
    this.state = ParallelQueryExecutionContextBase.STATES.started;
    this.routingProvider = new SmartRoutingMapProvider(this.clientContext);
    this.sortOrders = this.partitionedQueryExecutionInfo.queryInfo.orderBy;

    this.requestContinuation = options ? options.continuationToken || options.continuation : null;
    // response headers of undergoing operation
    this.respHeaders = getInitialHeader();

    // Make priority queue for documentProducers
    // The comparator is supplied by the derived class
    this.orderByPQ = new PriorityQueue<DocumentProducer>(
      (a: DocumentProducer, b: DocumentProducer) => this.documentProducerComparator(b, a)
    );
    // Creating the documentProducers
    this.sem = semaphore(1);
    // Creating callback for semaphore
    // TODO: Code smell
    const createDocumentProducersAndFillUpPriorityQueueFunc = async () => {
      // ensure the lock is released after finishing up
      try {
        const targetPartitionRanges = await this._onTargetPartitionRanges();
        this.waitingForInternalExecutionContexts = targetPartitionRanges.length;

        const maxDegreeOfParallelism =
          options.maxDegreeOfParallelism === undefined || options.maxDegreeOfParallelism < 1
            ? targetPartitionRanges.length
            : Math.min(options.maxDegreeOfParallelism, targetPartitionRanges.length);

        log.info(
          "Query starting against " +
            targetPartitionRanges.length +
            " ranges with parallelism of " +
            maxDegreeOfParallelism
        );

        const parallelismSem = semaphore(maxDegreeOfParallelism);
        let filteredPartitionKeyRanges = [];
        // The document producers generated from filteredPartitionKeyRanges
        const targetPartitionQueryExecutionContextList: DocumentProducer[] = [];

        if (this.requestContinuation) {
          throw new Error("Continuation tokens are not yet supported for cross partition queries");
        } else {
          filteredPartitionKeyRanges = targetPartitionRanges;
        }

        // Create one documentProducer for each partitionTargetRange
        filteredPartitionKeyRanges.forEach((partitionTargetRange: any) => {
          // TODO: any partitionTargetRange
          // no async callback
          targetPartitionQueryExecutionContextList.push(
            this._createTargetPartitionQueryExecutionContext(partitionTargetRange)
          );
        });

        // Fill up our priority queue with documentProducers
        targetPartitionQueryExecutionContextList.forEach((documentProducer) => {
          // has async callback
          const throttledFunc = async () => {
            try {
              const { result: document, headers } = await documentProducer.current();
              this._mergeWithActiveResponseHeaders(headers);
              if (document === undefined) {
                // no results on this one
                return;
              }
              // if there are matching results in the target ex range add it to the priority queue
              try {
                this.orderByPQ.enq(documentProducer);
              } catch (e) {
                this.err = e;
              }
            } catch (err) {
              this._mergeWithActiveResponseHeaders(err.headers);
              this.err = err;
            } finally {
              parallelismSem.leave();
              this._decrementInitiationLock();
            }
          };
          parallelismSem.take(throttledFunc);
        });
      } catch (err) {
        this.err = err;
        // release the lock
        this.sem.leave();
        return;
      }
    };
    this.sem.take(createDocumentProducersAndFillUpPriorityQueueFunc);
  }

  protected abstract documentProducerComparator(
    dp1: DocumentProducer,
    dp2: DocumentProducer
  ): number;

  private _decrementInitiationLock() {
    // decrements waitingForInternalExecutionContexts
    // if waitingForInternalExecutionContexts reaches 0 releases the semaphore and changes the state
    this.waitingForInternalExecutionContexts = this.waitingForInternalExecutionContexts - 1;
    if (this.waitingForInternalExecutionContexts === 0) {
      this.sem.leave();
      if (this.orderByPQ.size() === 0) {
        this.state = ParallelQueryExecutionContextBase.STATES.inProgress;
      }
    }
  }

  private _mergeWithActiveResponseHeaders(headers: CosmosHeaders) {
    mergeHeaders(this.respHeaders, headers);
  }

  private _getAndResetActiveResponseHeaders() {
    const ret = this.respHeaders;
    this.respHeaders = getInitialHeader();
    return ret;
  }

  private async _onTargetPartitionRanges() {
    // invokes the callback when the target partition ranges are ready
    const parsedRanges = this.partitionedQueryExecutionInfo.queryRanges;
    const queryRanges = parsedRanges.map((item) => QueryRange.parseFromDict(item));
    return this.routingProvider.getOverlappingRanges(this.collectionLink, queryRanges);
  }

  /**
   * Gets the replacement ranges for a partitionkeyrange that has been split
   * @memberof ParallelQueryExecutionContextBase
   * @instance
   */
  private async _getReplacementPartitionKeyRanges(documentProducer: DocumentProducer) {
    const partitionKeyRange = documentProducer.targetPartitionKeyRange;
    // Download the new routing map
    this.routingProvider = new SmartRoutingMapProvider(this.clientContext);
    // Get the queryRange that relates to this partitionKeyRange
    const queryRange = QueryRange.parsePartitionKeyRange(partitionKeyRange);
    return this.routingProvider.getOverlappingRanges(this.collectionLink, [queryRange]);
  }

  // TODO: P0 Code smell - can barely tell what this is doing
  /**
   * Removes the current document producer from the priqueue,
   * replaces that document producer with child document producers,
   * then reexecutes the originFunction with the corrrected executionContext
   * @memberof ParallelQueryExecutionContextBase
   * @instance
   */
  private async _repairExecutionContext(originFunction: any) {
    // TODO: any
    // Get the replacement ranges
    // Removing the invalid documentProducer from the orderByPQ
    const parentDocumentProducer = this.orderByPQ.deq();
    try {
      const replacementPartitionKeyRanges: any[] = await this._getReplacementPartitionKeyRanges(
        parentDocumentProducer
      );
      const replacementDocumentProducers: DocumentProducer[] = [];
      // Create the replacement documentProducers
      replacementPartitionKeyRanges.forEach((partitionKeyRange) => {
        // Create replacment document producers with the parent's continuationToken
        const replacementDocumentProducer = this._createTargetPartitionQueryExecutionContext(
          partitionKeyRange,
          parentDocumentProducer.continuationToken
        );
        replacementDocumentProducers.push(replacementDocumentProducer);
      });
      // We need to check if the documentProducers even has anything left to fetch from before enqueing them
      const checkAndEnqueueDocumentProducer = async (
        documentProducerToCheck: DocumentProducer,
        checkNextDocumentProducerCallback: any
      ) => {
        try {
          const { result: afterItem } = await documentProducerToCheck.current();
          if (afterItem === undefined) {
            // no more results left in this document producer, so we don't enqueue it
          } else {
            // Safe to put document producer back in the queue
            this.orderByPQ.enq(documentProducerToCheck);
          }

          await checkNextDocumentProducerCallback();
        } catch (err) {
          this.err = err;
          return;
        }
      };
      const checkAndEnqueueDocumentProducers = async (rdp: DocumentProducer[]) => {
        if (rdp.length > 0) {
          // We still have a replacementDocumentProducer to check
          const replacementDocumentProducer = rdp.shift();
          await checkAndEnqueueDocumentProducer(replacementDocumentProducer, async () => {
            await checkAndEnqueueDocumentProducers(rdp);
          });
        } else {
          // reexecutes the originFunction with the corrrected executionContext
          return originFunction();
        }
      };
      // Invoke the recursive function to get the ball rolling
      await checkAndEnqueueDocumentProducers(replacementDocumentProducers);
    } catch (err) {
      this.err = err;
      throw err;
    }
  }

  private static _needPartitionKeyRangeCacheRefresh(error: any) {
    // TODO: any error
    return (
      error.code === StatusCodes.Gone &&
      "substatus" in error &&
      error["substatus"] === SubStatusCodes.PartitionKeyRangeGone
    );
  }

  /**
   * Checks to see if the executionContext needs to be repaired.
   * if so it repairs the execution context and executes the ifCallback,
   * else it continues with the current execution context and executes the elseCallback
   * @memberof ParallelQueryExecutionContextBase
   * @instance
   */
  private async _repairExecutionContextIfNeeded(ifCallback: any, elseCallback: any) {
    const documentProducer = this.orderByPQ.peek();
    // Check if split happened
    try {
      await documentProducer.current();
      elseCallback();
    } catch (err) {
      if (ParallelQueryExecutionContextBase._needPartitionKeyRangeCacheRefresh(err)) {
        // Split has happened so we need to repair execution context before continueing
        return this._repairExecutionContext(ifCallback);
      } else {
        // Something actually bad happened ...
        this.err = err;
        throw err;
      }
    }
  }

  /**
   * Execute a provided function on the next element in the ParallelQueryExecutionContextBase.
   * @memberof ParallelQueryExecutionContextBase
   * @instance
   * @param {callback} callback - Function to execute for each element. the function takes two \
   * parameters error, element.
   */
  public async nextItem(): Promise<Response<any>> {
    if (this.err) {
      // if there is a prior error return error
      throw this.err;
    }
    return new Promise<Response<any>>((resolve, reject) => {
      this.sem.take(() => {
        // NOTE: lock must be released before invoking quitting
        if (this.err) {
          // release the lock before invoking callback
          this.sem.leave();
          // if there is a prior error return error
          this.err.headers = this._getAndResetActiveResponseHeaders();
          reject(this.err);
          return;
        }

        if (this.orderByPQ.size() === 0) {
          // there is no more results
          this.state = ParallelQueryExecutionContextBase.STATES.ended;
          // release the lock before invoking callback
          this.sem.leave();
          return resolve({
            result: undefined,
            headers: this._getAndResetActiveResponseHeaders()
          });
        }

        const ifCallback = () => {
          // Release the semaphore to avoid deadlock
          this.sem.leave();
          // Reexcute the function
          return resolve(this.nextItem());
        };
        const elseCallback = async () => {
          let documentProducer: DocumentProducer;
          try {
            documentProducer = this.orderByPQ.deq();
          } catch (e) {
            // if comparing elements of the priority queue throws exception
            // set that error and return error
            this.err = e;
            // release the lock before invoking callback
            this.sem.leave();
            this.err.headers = this._getAndResetActiveResponseHeaders();
            reject(this.err);
            return;
          }

          let item: any;
          let headers: CosmosHeaders;
          try {
            const response = await documentProducer.nextItem();
            item = response.result;
            headers = response.headers;
            this._mergeWithActiveResponseHeaders(headers);
            if (item === undefined) {
              // this should never happen
              // because the documentProducer already has buffered an item
              // assert item !== undefined
              this.err = new Error(
                `Extracted DocumentProducer from the priority queue \
                                            doesn't have any buffered item!`
              );
              // release the lock before invoking callback
              this.sem.leave();
              return resolve({
                result: undefined,
                headers: this._getAndResetActiveResponseHeaders()
              });
            }
          } catch (err) {
            this.err = new Error(
              `Extracted DocumentProducer from the priority queue fails to get the \
                                    buffered item. Due to ${JSON.stringify(err)}`
            );
            this.err.headers = this._getAndResetActiveResponseHeaders();
            // release the lock before invoking callback
            this.sem.leave();
            reject(this.err);
            return;
          }

          // we need to put back the document producer to the queue if it has more elements.
          // the lock will be released after we know document producer must be put back in the queue or not
          try {
            const { result: afterItem, headers: otherHeaders } = await documentProducer.current();
            this._mergeWithActiveResponseHeaders(otherHeaders);
            if (afterItem === undefined) {
              // no more results is left in this document producer
            } else {
              try {
                const headItem = documentProducer.fetchResults[0];
                if (typeof headItem === "undefined") {
                  throw new Error(
                    "Extracted DocumentProducer from PQ is invalid state with no result!"
                  );
                }
                this.orderByPQ.enq(documentProducer);
              } catch (e) {
                // if comparing elements in priority queue throws exception
                // set error
                this.err = e;
              }
            }
          } catch (err) {
            if (ParallelQueryExecutionContextBase._needPartitionKeyRangeCacheRefresh(err)) {
              // We want the document producer enqueued
              // So that later parts of the code can repair the execution context
              this.orderByPQ.enq(documentProducer);
            } else {
              // Something actually bad happened
              this.err = err;
              reject(this.err);
            }
          } finally {
            // release the lock before returning
            this.sem.leave();
          }
          // invoke the callback on the item
          return resolve({
            result: item,
            headers: this._getAndResetActiveResponseHeaders()
          });
        };
        this._repairExecutionContextIfNeeded(ifCallback, elseCallback).catch(reject);
      });
    });
  }

  /**
   * Determine if there are still remaining resources to processs based on the value of the continuation \
   * token or the elements remaining on the current batch in the QueryIterator.
   * @memberof ParallelQueryExecutionContextBase
   * @instance
   * @returns {Boolean} true if there is other elements to process in the ParallelQueryExecutionContextBase.
   */
  public hasMoreResults() {
    return !(
      this.state === ParallelQueryExecutionContextBase.STATES.ended || this.err !== undefined
    );
  }

  /**
   * Creates document producers
   */
  private _createTargetPartitionQueryExecutionContext(
    partitionKeyTargetRange: any,
    continuationToken?: any
  ) {
    // TODO: any
    // creates target partition range Query Execution Context
    let rewrittenQuery = this.partitionedQueryExecutionInfo.queryInfo.rewrittenQuery;
    let query = this.query;
    if (typeof query === "string") {
      query = { query };
    }

    const formatPlaceHolder = "{documentdb-formattableorderbyquery-filter}";
    if (rewrittenQuery) {
      query = JSON.parse(JSON.stringify(query));
      // We hardcode the formattable filter to true for now
      rewrittenQuery = rewrittenQuery.replace(formatPlaceHolder, "true");
      query["query"] = rewrittenQuery;
    }

    const options = JSON.parse(JSON.stringify(this.options));
    options.continuationToken = continuationToken;

    return new DocumentProducer(
      this.clientContext,
      this.collectionLink,
      query,
      partitionKeyTargetRange,
      options
    );
  }
}
