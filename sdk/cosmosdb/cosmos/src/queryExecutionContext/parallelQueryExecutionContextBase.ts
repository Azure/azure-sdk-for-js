// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import PriorityQueue from "priorityqueuejs";
import { ClientContext } from "../ClientContext";
import { AzureLogger, createClientLogger } from "@azure/logger";
import { StatusCodes, SubStatusCodes, RUConsumedManager } from "../common";
import { FeedOptions, QueryOperationOptions, Response } from "../request";
import { PartitionedQueryExecutionInfo } from "../request/ErrorResponse";
import { QueryRange } from "../routing/QueryRange";
import { SmartRoutingMapProvider } from "../routing/smartRoutingMapProvider";
import { CosmosHeaders } from "./CosmosHeaders";
import { DocumentProducer } from "./documentProducer";
import { ExecutionContext } from "./ExecutionContext";
import { getInitialHeader, mergeHeaders } from "./headerUtils";
import { SqlQuerySpec } from "./SqlQuerySpec";
import { DiagnosticNodeInternal, DiagnosticNodeType } from "../diagnostics/DiagnosticNodeInternal";
import { addDignosticChild } from "../utils/diagnostics";
import { MetadataLookUpType } from "../CosmosDiagnostics";
import { CosmosDbDiagnosticLevel } from "../diagnostics/CosmosDbDiagnosticLevel";
import {
  RUCapPerOperationExceededError,
  RUCapPerOperationExceededErrorCode,
} from "../request/RUCapPerOperationExceededError";
import semaphore from "semaphore";

/** @hidden */
const logger: AzureLogger = createClientLogger("parallelQueryExecutionContextBase");

/** @hidden */
export enum ParallelQueryExecutionContextBaseStates {
  started = "started",
  inProgress = "inProgress",
  ended = "ended",
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
  private diagnosticNodeWrapper: {
    consumed: boolean;
    diagnosticNode: DiagnosticNodeInternal;
  };
  private initializedPriorityQueue: boolean = false;
  private ruCapExceededError: RUCapPerOperationExceededError = undefined;
  /**
   * Semaphore for Controlling Concurrent Access to the `nextItem` Method
   *
   * serializes access to the `nextItem` method,
   * preventing concurrent issues during initialization, document producer
   * handling, diagnostic node updates, and error propagation.
   */
  private nextItemfetchSemaphore;
  /**
   * Provides the ParallelQueryExecutionContextBase.
   * This is the base class that ParallelQueryExecutionContext and OrderByQueryExecutionContext will derive from.
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
    private clientContext: ClientContext,
    private collectionLink: string,
    private query: string | SqlQuerySpec,
    private options: FeedOptions,
    private partitionedQueryExecutionInfo: PartitionedQueryExecutionInfo
  ) {
    this.clientContext = clientContext;
    this.collectionLink = collectionLink;
    this.query = query;
    this.options = options;
    this.partitionedQueryExecutionInfo = partitionedQueryExecutionInfo;
    this.diagnosticNodeWrapper = {
      consumed: false,
      diagnosticNode: new DiagnosticNodeInternal(
        clientContext.diagnosticLevel,
        DiagnosticNodeType.PARALLEL_QUERY_NODE,
        null
      ),
    };
    this.diagnosticNodeWrapper.diagnosticNode.addData({ stateful: true });
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
    this.nextItemfetchSemaphore = semaphore(1);
  }

  protected abstract documentProducerComparator(
    dp1: DocumentProducer,
    dp2: DocumentProducer
  ): number;

  private _mergeWithActiveResponseHeaders(headers: CosmosHeaders): void {
    mergeHeaders(this.respHeaders, headers);
  }

  private _getAndResetActiveResponseHeaders(): CosmosHeaders {
    const ret = this.respHeaders;
    this.respHeaders = getInitialHeader();
    return ret;
  }

  private getDiagnosticNode(): DiagnosticNodeInternal {
    return this.diagnosticNodeWrapper.diagnosticNode;
  }

  private async _onTargetPartitionRanges(): Promise<any[]> {
    // invokes the callback when the target partition ranges are ready
    const parsedRanges = this.partitionedQueryExecutionInfo.queryRanges;
    const queryRanges = parsedRanges.map((item) => QueryRange.parseFromDict(item));
    return this.routingProvider.getOverlappingRanges(
      this.collectionLink,
      queryRanges,
      this.getDiagnosticNode()
    );
  }

  /**
   * Gets the replacement ranges for a partitionkeyrange that has been split
   */
  private async _getReplacementPartitionKeyRanges(
    documentProducer: DocumentProducer
  ): Promise<any[]> {
    const partitionKeyRange = documentProducer.targetPartitionKeyRange;
    // Download the new routing map
    this.routingProvider = new SmartRoutingMapProvider(this.clientContext);
    // Get the queryRange that relates to this partitionKeyRange
    const queryRange = QueryRange.parsePartitionKeyRange(partitionKeyRange);
    return this.routingProvider.getOverlappingRanges(
      this.collectionLink,
      [queryRange],
      this.getDiagnosticNode()
    );
  }

  // TODO: P0 Code smell - can barely tell what this is doing
  /**
   * Removes the current document producer from the priqueue,
   * replaces that document producer with child document producers,
   * then reexecutes the originFunction with the corrrected executionContext
   */
  private async _repairExecutionContext(
    diagnosticNode: DiagnosticNodeInternal,
    originFunction: any
  ): Promise<void> {
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
      ): Promise<void> => {
        try {
          const { result: afterItem } = await documentProducerToCheck.current(diagnosticNode);
          if (afterItem === undefined) {
            // no more results left in this document producer, so we don't enqueue it
          } else {
            // Safe to put document producer back in the queue
            this.orderByPQ.enq(documentProducerToCheck);
          }

          await checkNextDocumentProducerCallback();
        } catch (err: any) {
          this.err = err;
          return;
        }
      };
      const checkAndEnqueueDocumentProducers = async (rdp: DocumentProducer[]): Promise<any> => {
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
    } catch (err: any) {
      this.err = err;
      throw err;
    }
  }

  private static _needPartitionKeyRangeCacheRefresh(error: any): boolean {
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
   */
  private async _repairExecutionContextIfNeeded(
    diagnosticNode: DiagnosticNodeInternal,
    ifCallback: any,
    elseCallback: any,
    operationOptions?: QueryOperationOptions,
    ruConsumedManager?: RUConsumedManager
  ): Promise<void> {
    const documentProducer = this.orderByPQ.peek();
    // Check if split happened
    try {
      await documentProducer.current(diagnosticNode, operationOptions, ruConsumedManager);
      elseCallback();
    } catch (err: any) {
      if (ParallelQueryExecutionContextBase._needPartitionKeyRangeCacheRefresh(err)) {
        // Split has happened so we need to repair execution context before continueing
        return addDignosticChild(
          (childNode) => this._repairExecutionContext(childNode, ifCallback),
          diagnosticNode,
          DiagnosticNodeType.QUERY_REPAIR_NODE
        );
      } else {
        // Something actually bad happened ...
        this.err = err;
        throw err;
      }
    }
  }

  /**
   * Fetches the next element in the ParallelQueryExecutionContextBase.
   */
  public async nextItem(
    diagnosticNode: DiagnosticNodeInternal,
    operationOptions?: QueryOperationOptions,
    ruConsumedManager?: RUConsumedManager
  ): Promise<Response<any>> {
    if (this.err) {
      // if there is a prior error return error
      throw this.err;
    }
    return new Promise<Response<any>>((resolve, reject) => {
      this.nextItemfetchSemaphore.take(async () => {
        // document producer queue initilization
        if (!this.initializedPriorityQueue) {
          try {
            await this._createDocumentProducersAndFillUpPriorityQueue(
              operationOptions,
              ruConsumedManager
            );
            this.initializedPriorityQueue = true;
          } catch (err: any) {
            this.err = err;
            // release the lock before invoking callback
            this.nextItemfetchSemaphore.leave();
            reject(this.err);
            return;
          }
        }

        if (!this.diagnosticNodeWrapper.consumed) {
          diagnosticNode.addChildNode(
            this.diagnosticNodeWrapper.diagnosticNode,
            CosmosDbDiagnosticLevel.debug,
            MetadataLookUpType.QueryPlanLookUp
          );
          this.diagnosticNodeWrapper.diagnosticNode = undefined;
          this.diagnosticNodeWrapper.consumed = true;
        } else {
          this.diagnosticNodeWrapper.diagnosticNode = diagnosticNode;
        }
        // NOTE: lock must be released before invoking quitting
        if (this.err) {
          // release the lock before invoking callback
          this.nextItemfetchSemaphore.leave();
          this.err.headers = this._getAndResetActiveResponseHeaders();
          reject(this.err);
          return;
        }

        if (this.orderByPQ.size() === 0) {
          // there is no more results
          this.state = ParallelQueryExecutionContextBase.STATES.ended;
          // release the lock before invoking callback
          this.nextItemfetchSemaphore.leave();
          return resolve({
            result: undefined,
            headers: this._getAndResetActiveResponseHeaders(),
          });
        }

        const ifCallback = (): void => {
          // Release the semaphore to avoid deadlock
          this.nextItemfetchSemaphore.leave();
          // Reexcute the function
          return resolve(this.nextItem(diagnosticNode, operationOptions, ruConsumedManager));
        };
        const elseCallback = async (): Promise<void> => {
          let documentProducer: DocumentProducer;
          try {
            documentProducer = this.orderByPQ.deq();
          } catch (e: any) {
            // if comparing elements of the priority queue throws exception
            // set that error and return error
            this.err = e;
            // release the lock before invoking callback
            this.nextItemfetchSemaphore.leave();
            this.err.headers = this._getAndResetActiveResponseHeaders();
            reject(this.err);
            return;
          }

          let item: any;
          let headers: CosmosHeaders;
          try {
            const response = await documentProducer.nextItem(
              diagnosticNode,
              operationOptions,
              ruConsumedManager
            );
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
              this.nextItemfetchSemaphore.leave();
              return resolve({
                result: undefined,
                headers: this._getAndResetActiveResponseHeaders(),
              });
            }
          } catch (err: any) {
            if (err.code === RUCapPerOperationExceededErrorCode) {
              this._updateErrorObjectWithBufferedData(err);
              this.err = err;
            } else {
              this.err = new Error(
                `Extracted DocumentProducer from the priority queue fails to get the \
                                    buffered item. Due to ${JSON.stringify(err)}`
              );
              this.err.headers = this._getAndResetActiveResponseHeaders();
            }
            // release the lock before invoking callback
            this.nextItemfetchSemaphore.leave();
            reject(this.err);
            return;
          }

          // we need to put back the document producer to the queue if it has more elements.
          // the lock will be released after we know document producer must be put back in the queue or not
          try {
            const { result: afterItem, headers: otherHeaders } = await documentProducer.current(
              diagnosticNode,
              operationOptions,
              ruConsumedManager
            );
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
              } catch (e: any) {
                // if comparing elements in priority queue throws exception
                // set error
                this.err = e;
              }
            }
          } catch (err: any) {
            if (ParallelQueryExecutionContextBase._needPartitionKeyRangeCacheRefresh(err)) {
              // We want the document producer enqueued
              // So that later parts of the code can repair the execution context
              this.orderByPQ.enq(documentProducer);
            } else if (err.code === RUCapPerOperationExceededErrorCode) {
              this._updateErrorObjectWithBufferedData(err);
              this.err = err;
              reject(this.err);
            } else {
              // Something actually bad happened
              this.err = err;
              reject(this.err);
            }
          } finally {
            // release the lock before returning
            this.nextItemfetchSemaphore.leave();
          }
          // invoke the callback on the item
          return resolve({
            result: item,
            headers: this._getAndResetActiveResponseHeaders(),
          });
        };
        this._repairExecutionContextIfNeeded(diagnosticNode, ifCallback, elseCallback).catch(
          reject
        );
      });
    });
  }

  private _updateErrorObjectWithBufferedData(err: any) {
    this.orderByPQ.forEach((dp) => {
      const bufferedItems = dp.peekBufferedItems();
      err.body.fetchedSoFarResults.push(...bufferedItems);
    });
  }

  /**
   * Determine if there are still remaining resources to processs based on the value of the continuation
   * token or the elements remaining on the current batch in the QueryIterator.
   * @returns true if there is other elements to process in the ParallelQueryExecutionContextBase.
   */
  public hasMoreResults(): boolean {
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
  ): DocumentProducer {
    // TODO: any
    // creates target partition range Query Execution Context
    let rewrittenQuery = this.partitionedQueryExecutionInfo.queryInfo.rewrittenQuery;
    let sqlQuerySpec: SqlQuerySpec;
    const query = this.query;
    if (typeof query === "string") {
      sqlQuerySpec = { query };
    } else {
      sqlQuerySpec = query;
    }

    const formatPlaceHolder = "{documentdb-formattableorderbyquery-filter}";
    if (rewrittenQuery) {
      sqlQuerySpec = JSON.parse(JSON.stringify(sqlQuerySpec));
      // We hardcode the formattable filter to true for now
      rewrittenQuery = rewrittenQuery.replace(formatPlaceHolder, "true");
      sqlQuerySpec["query"] = rewrittenQuery;
    }

    const options = { ...this.options };
    options.continuationToken = continuationToken;

    return new DocumentProducer(
      this.clientContext,
      this.collectionLink,
      sqlQuerySpec,
      partitionKeyTargetRange,
      options
    );
  }

  private async _createDocumentProducersAndFillUpPriorityQueue(
    operationOptions?: QueryOperationOptions,
    ruConsumedManager?: RUConsumedManager
  ): Promise<void> {
    try {
      const targetPartitionRanges = await this._onTargetPartitionRanges();
      const maxDegreeOfParallelism =
        this.options.maxDegreeOfParallelism === undefined || this.options.maxDegreeOfParallelism < 1
          ? targetPartitionRanges.length
          : Math.min(this.options.maxDegreeOfParallelism, targetPartitionRanges.length);

      logger.info(
        "Query starting against " +
          targetPartitionRanges.length +
          " ranges with parallelism of " +
          maxDegreeOfParallelism
      );

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
      let inProgressPromises: Promise<void>[] = [];
      for (const documentProducer of targetPartitionQueryExecutionContextList) {
        // Don't enqueue any new promise if RU cap exceeded
        if (this.ruCapExceededError) {
          break;
        }
        const promise: Promise<void> = this._processAndEnqueueDocumentProducer(
          documentProducer,
          operationOptions,
          ruConsumedManager
        );
        inProgressPromises.push(promise);

        // Limit concurrent executions
        if (inProgressPromises.length === maxDegreeOfParallelism) {
          await Promise.all(inProgressPromises);
          inProgressPromises = [];
        }
      }
      // Wait for all promises to complete
      await Promise.all(inProgressPromises);
      if (this.err) {
        if (this.ruCapExceededError) {
          // merge the buffered items
          this.orderByPQ.forEach((dp) => {
            const bufferedItems = dp.peekBufferedItems();
            this.ruCapExceededError.body.fetchedSoFarResults.push(...bufferedItems);
          });
          throw this.ruCapExceededError;
        }
        throw this.err;
      }
    } catch (err: any) {
      this.err = err;
      throw err;
    }
  }

  private async _processAndEnqueueDocumentProducer(
    documentProducer: DocumentProducer,
    operationOptions?: QueryOperationOptions,
    ruConsumedManager?: RUConsumedManager
  ): Promise<void> {
    try {
      const { result: document, headers } = await documentProducer.current(
        this.getDiagnosticNode(),
        operationOptions,
        ruConsumedManager
      );
      this._mergeWithActiveResponseHeaders(headers);

      if (document !== undefined) {
        this.orderByPQ.enq(documentProducer);
      }
    } catch (err) {
      this._mergeWithActiveResponseHeaders(err.headers);
      this.err = err;
      if (err.code === RUCapPerOperationExceededErrorCode) {
        // would be halting further execution of other promises
        if (!this.ruCapExceededError) {
          this.ruCapExceededError = err;
        } else {
          // merge the buffered items
          if (err.body && err.body.fetchedSoFarResults) {
            this.ruCapExceededError.body.fetchedSoFarResults.push(...err.body.fetchedSoFarResults);
          }
        }
      } else {
        throw err;
      }
    }
    return;
  }
}
