import * as bs from "binary-search-bounds";
import PriorityQueue from "priorityqueuejs";
import semaphore from "semaphore";
import {
  DocumentProducer,
  HeaderUtils,
  IExecutionContext,
  IHeaders,
  PartitionedQueryExecutionContextInfo,
  PartitionedQueryExecutionContextInfoParser
} from ".";
import { ClientContext } from "../ClientContext";
import { StatusCodes, SubStatusCodes } from "../common";
import { Response } from "../request/request";
import { PARITIONKEYRANGE, QueryRange, SmartRoutingMapProvider } from "../routing";

/** @hidden */
export enum ParallelQueryExecutionContextBaseStates {
  started = "started",
  inProgress = "inProgress",
  ended = "ended"
}

/** @hidden */
export abstract class ParallelQueryExecutionContextBase implements IExecutionContext {
  private static readonly DEFAULT_PAGE_SIZE = 10;

  private err: any;
  private state: any;
  private static STATES = ParallelQueryExecutionContextBaseStates;
  private routingProvider: SmartRoutingMapProvider;
  protected sortOrders: any;
  private pageSize: any;
  private requestContinuation: any;
  private respHeaders: IHeaders;
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
    private options: any,
    private partitionedQueryExecutionInfo: PartitionedQueryExecutionContextInfo
  ) {
    this.clientContext = clientContext;
    this.collectionLink = collectionLink;
    this.query = query;
    this.options = options;
    this.partitionedQueryExecutionInfo = partitionedQueryExecutionInfo;

    this.err = undefined;
    this.state = ParallelQueryExecutionContextBase.STATES.started;
    this.routingProvider = new SmartRoutingMapProvider(this.clientContext);
    this.sortOrders = PartitionedQueryExecutionContextInfoParser.parseOrderBy(this.partitionedQueryExecutionInfo);

    if (options === undefined || options["maxItemCount"] === undefined) {
      this.pageSize = ParallelQueryExecutionContextBase.DEFAULT_PAGE_SIZE;
      this.options["maxItemCount"] = this.pageSize;
    } else {
      this.pageSize = options["maxItemCount"];
    }

    this.requestContinuation = options ? options.continuation : null;
    // response headers of undergoing operation
    this.respHeaders = HeaderUtils.getInitialHeader();

    // Make priority queue for documentProducers
    // The comparator is supplied by the derived class
    this.orderByPQ = new PriorityQueue<DocumentProducer>((a: DocumentProducer, b: DocumentProducer) =>
      this.documentProducerComparator(b, a)
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
        // default to 1 if none is provided.
        const maxDegreeOfParallelism =
          options.maxDegreeOfParallelism > 0
            ? Math.min(options.maxDegreeOfParallelism, targetPartitionRanges.length)
            : targetPartitionRanges.length;

        const parallelismSem = semaphore(maxDegreeOfParallelism);
        let filteredPartitionKeyRanges = [];
        // The document producers generated from filteredPartitionKeyRanges
        const targetPartitionQueryExecutionContextList: DocumentProducer[] = [];

        if (this.requestContinuation) {
          // Need to create the first documentProducer with the suppliedCompositeContinuationToken
          try {
            const suppliedCompositeContinuationToken = JSON.parse(this.requestContinuation);
            filteredPartitionKeyRanges = this.getPartitionKeyRangesForContinuation(
              suppliedCompositeContinuationToken,
              targetPartitionRanges
            );
            if (filteredPartitionKeyRanges.length > 0) {
              targetPartitionQueryExecutionContextList.push(
                this._createTargetPartitionQueryExecutionContext(
                  filteredPartitionKeyRanges[0],
                  suppliedCompositeContinuationToken.token
                )
              );
              // Slicing the first element off, since we already made a documentProducer for it
              filteredPartitionKeyRanges = filteredPartitionKeyRanges.slice(1);
            }
          } catch (e) {
            this.err = e;
            this.sem.leave();
          }
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
        targetPartitionQueryExecutionContextList.forEach(documentProducer => {
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

  protected abstract documentProducerComparator(dp1: DocumentProducer, dp2: DocumentProducer): number;
  //                                          TODO: any                                TODO: any
  public getPartitionKeyRangesForContinuation(suppliedCompositeContinuationToken: any, partitionKeyRanges: any) {
    const startRange: any = {}; // TODO: any
    startRange[PARITIONKEYRANGE.MinInclusive] = suppliedCompositeContinuationToken.range.min;
    startRange[PARITIONKEYRANGE.MaxExclusive] = suppliedCompositeContinuationToken.range.max;

    const vbCompareFunction = (x: any, y: any) => {
      // TODO: any
      if (x[PARITIONKEYRANGE.MinInclusive] > y[PARITIONKEYRANGE.MinInclusive]) {
        return 1;
      }
      if (x[PARITIONKEYRANGE.MinInclusive] < y[PARITIONKEYRANGE.MinInclusive]) {
        return -1;
      }

      return 0;
    };

    const minIndex = bs.le(partitionKeyRanges, startRange, vbCompareFunction);
    // that's an error

    if (minIndex > 0) {
      throw new Error("BadRequestException: InvalidContinuationToken");
    }

    // return slice of the partition key ranges
    return partitionKeyRanges.slice(minIndex, partitionKeyRanges.length - minIndex);
  }

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

  private _mergeWithActiveResponseHeaders(headers: IHeaders) {
    HeaderUtils.mergeHeaders(this.respHeaders, headers);
  }

  private _getAndResetActiveResponseHeaders() {
    const ret = this.respHeaders;
    this.respHeaders = HeaderUtils.getInitialHeader();
    return ret;
  }

  private async _onTargetPartitionRanges() {
    // invokes the callback when the target partition ranges are ready
    const parsedRanges = PartitionedQueryExecutionContextInfoParser.parseQueryRanges(
      this.partitionedQueryExecutionInfo
    );
    const queryRanges = parsedRanges.map((item: any) => QueryRange.parseFromDict(item)); // TODO: any
    return this.routingProvider.getOverlappingRanges(this.collectionLink, queryRanges);
  }

  /**
   * Gets the replacement ranges for a partitionkeyrange that has been split
   * @memberof ParallelQueryExecutionContextBase
   * @instance
   */
  private async _getReplacementPartitionKeyRanges(documentProducer: DocumentProducer) {
    const routingMapProvider = this.clientContext.partitionKeyDefinitionCache;
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
      const replacementPartitionKeyRanges: any[] = await this._getReplacementPartitionKeyRanges(parentDocumentProducer);
      const replacementDocumentProducers: DocumentProducer[] = [];
      // Create the replacement documentProducers
      replacementPartitionKeyRanges.forEach(partitionKeyRange => {
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
          const { result: afterItem, headers } = await documentProducerToCheck.current();
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
      const { result: element, headers } = await documentProducer.current();
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
          let headers: IHeaders;
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
            const { result: afterItem, headers: currentHeaders } = await documentProducer.current();
            if (afterItem === undefined) {
              // no more results is left in this document producer
            } else {
              try {
                const headItem = documentProducer.fetchResults[0];
                if (typeof headItem === "undefined") {
                  throw new Error("Extracted DocumentProducer from PQ is invalid state with no result!");
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
   * Retrieve the current element on the ParallelQueryExecutionContextBase.
   * @memberof ParallelQueryExecutionContextBase
   * @instance
   * @param {callback} callback - Function to execute for the current element. \
   * the function takes two parameters error, element.
   */
  public async current(): Promise<Response<any>> {
    if (this.err) {
      this.err.headerse = this._getAndResetActiveResponseHeaders();
      throw this.err;
    }
    return new Promise<Response<any>>((resolve, reject) => {
      this.sem.take(() => {
        try {
          if (this.err) {
            this.err = this._getAndResetActiveResponseHeaders();
            throw this.err;
          }

          if (this.orderByPQ.size() === 0) {
            return resolve({
              result: undefined,
              headers: this._getAndResetActiveResponseHeaders()
            });
          }

          const ifCallback = () => {
            // Reexcute the function
            return resolve(this.current());
          };

          const elseCallback = () => {
            const documentProducer = this.orderByPQ.peek();
            return resolve(documentProducer.current());
          };

          this._repairExecutionContextIfNeeded(ifCallback, elseCallback).catch(reject);
        } finally {
          this.sem.leave();
        }
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
    return !(this.state === ParallelQueryExecutionContextBase.STATES.ended || this.err !== undefined);
  }

  /**
   * Creates document producers
   */
  private _createTargetPartitionQueryExecutionContext(partitionKeyTargetRange: any, continuationToken?: any) {
    // TODO: any
    // creates target partition range Query Execution Context
    let rewrittenQuery = PartitionedQueryExecutionContextInfoParser.parseRewrittenQuery(
      this.partitionedQueryExecutionInfo
    );
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

    return new DocumentProducer(this.clientContext, this.collectionLink, query, partitionKeyTargetRange, options);
  }
}
