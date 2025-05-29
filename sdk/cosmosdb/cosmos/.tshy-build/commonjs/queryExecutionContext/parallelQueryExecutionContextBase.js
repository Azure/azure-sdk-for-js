"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParallelQueryExecutionContextBase = exports.ParallelQueryExecutionContextBaseStates = void 0;
const tslib_1 = require("tslib");
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
const priorityqueuejs_1 = tslib_1.__importDefault(require("priorityqueuejs"));
const semaphore_1 = tslib_1.__importDefault(require("semaphore"));
const logger_1 = require("@azure/logger");
const statusCodes_js_1 = require("../common/statusCodes.js");
const QueryRange_js_1 = require("../routing/QueryRange.js");
const smartRoutingMapProvider_js_1 = require("../routing/smartRoutingMapProvider.js");
const documentProducer_js_1 = require("./documentProducer.js");
const headerUtils_js_1 = require("./headerUtils.js");
const DiagnosticNodeInternal_js_1 = require("../diagnostics/DiagnosticNodeInternal.js");
/** @hidden */
const logger = (0, logger_1.createClientLogger)("parallelQueryExecutionContextBase");
/** @hidden */
var ParallelQueryExecutionContextBaseStates;
(function (ParallelQueryExecutionContextBaseStates) {
    ParallelQueryExecutionContextBaseStates["started"] = "started";
    ParallelQueryExecutionContextBaseStates["inProgress"] = "inProgress";
    ParallelQueryExecutionContextBaseStates["ended"] = "ended";
})(ParallelQueryExecutionContextBaseStates || (exports.ParallelQueryExecutionContextBaseStates = ParallelQueryExecutionContextBaseStates = {}));
/** @hidden */
class ParallelQueryExecutionContextBase {
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
    constructor(clientContext, collectionLink, query, options, partitionedQueryExecutionInfo, correlatedActivityId) {
        this.clientContext = clientContext;
        this.collectionLink = collectionLink;
        this.query = query;
        this.options = options;
        this.partitionedQueryExecutionInfo = partitionedQueryExecutionInfo;
        this.correlatedActivityId = correlatedActivityId;
        this.clientContext = clientContext;
        this.collectionLink = collectionLink;
        this.query = query;
        this.options = options;
        this.partitionedQueryExecutionInfo = partitionedQueryExecutionInfo;
        this.correlatedActivityId = correlatedActivityId;
        this.diagnosticNodeWrapper = {
            consumed: false,
            diagnosticNode: new DiagnosticNodeInternal_js_1.DiagnosticNodeInternal(clientContext.diagnosticLevel, DiagnosticNodeInternal_js_1.DiagnosticNodeType.PARALLEL_QUERY_NODE, null),
        };
        this.diagnosticNodeWrapper.diagnosticNode.addData({ stateful: true });
        this.err = undefined;
        this.state = ParallelQueryExecutionContextBase.STATES.started;
        this.routingProvider = new smartRoutingMapProvider_js_1.SmartRoutingMapProvider(this.clientContext);
        this.sortOrders = this.partitionedQueryExecutionInfo.queryInfo.orderBy;
        this.buffer = [];
        this.requestContinuation = options ? options.continuationToken || options.continuation : null;
        // response headers of undergoing operation
        this.respHeaders = (0, headerUtils_js_1.getInitialHeader)();
        // Make priority queue for documentProducers
        this.unfilledDocumentProducersQueue = new priorityqueuejs_1.default((a, b) => a.generation - b.generation);
        // The comparator is supplied by the derived class
        this.bufferedDocumentProducersQueue = new priorityqueuejs_1.default((a, b) => this.documentProducerComparator(b, a));
        // Creating the documentProducers
        this.sem = (0, semaphore_1.default)(1);
        const createDocumentProducersAndFillUpPriorityQueueFunc = async () => {
            // ensure the lock is released after finishing up
            try {
                const targetPartitionRanges = await this._onTargetPartitionRanges();
                const maxDegreeOfParallelism = options.maxDegreeOfParallelism === undefined || options.maxDegreeOfParallelism < 1
                    ? targetPartitionRanges.length
                    : Math.min(options.maxDegreeOfParallelism, targetPartitionRanges.length);
                logger.info("Query starting against " +
                    targetPartitionRanges.length +
                    " ranges with parallelism of " +
                    maxDegreeOfParallelism);
                let filteredPartitionKeyRanges = [];
                // The document producers generated from filteredPartitionKeyRanges
                const targetPartitionQueryExecutionContextList = [];
                if (this.requestContinuation) {
                    throw new Error("Continuation tokens are not yet supported for cross partition queries");
                }
                else {
                    filteredPartitionKeyRanges = targetPartitionRanges;
                }
                // Create one documentProducer for each partitionTargetRange
                filteredPartitionKeyRanges.forEach((partitionTargetRange) => {
                    // TODO: any partitionTargetRange
                    // no async callback
                    targetPartitionQueryExecutionContextList.push(this._createTargetPartitionQueryExecutionContext(partitionTargetRange, undefined));
                });
                // Fill up our priority queue with documentProducers
                targetPartitionQueryExecutionContextList.forEach((documentProducer) => {
                    // has async callback
                    try {
                        this.unfilledDocumentProducersQueue.enq(documentProducer);
                    }
                    catch (e) {
                        this.err = e;
                    }
                });
                this.sem.leave();
            }
            catch (err) {
                this.err = err;
                // release the lock
                this.sem.leave();
                return;
            }
        };
        this.sem.take(createDocumentProducersAndFillUpPriorityQueueFunc);
    }
    _mergeWithActiveResponseHeaders(headers) {
        (0, headerUtils_js_1.mergeHeaders)(this.respHeaders, headers);
    }
    _getAndResetActiveResponseHeaders() {
        const ret = this.respHeaders;
        this.respHeaders = (0, headerUtils_js_1.getInitialHeader)();
        return ret;
    }
    getDiagnosticNode() {
        return this.diagnosticNodeWrapper.diagnosticNode;
    }
    async _onTargetPartitionRanges() {
        // invokes the callback when the target partition ranges are ready
        const parsedRanges = this.partitionedQueryExecutionInfo.queryRanges;
        const queryRanges = parsedRanges.map((item) => QueryRange_js_1.QueryRange.parseFromDict(item));
        return this.routingProvider.getOverlappingRanges(this.collectionLink, queryRanges, this.getDiagnosticNode());
    }
    /**
     * Gets the replacement ranges for a partitionkeyrange that has been split
     */
    async _getReplacementPartitionKeyRanges(documentProducer, diagnosticNode) {
        const partitionKeyRange = documentProducer.targetPartitionKeyRange;
        // Download the new routing map
        this.routingProvider = new smartRoutingMapProvider_js_1.SmartRoutingMapProvider(this.clientContext);
        // Get the queryRange that relates to this partitionKeyRange
        const queryRange = QueryRange_js_1.QueryRange.parsePartitionKeyRange(partitionKeyRange);
        return this.routingProvider.getOverlappingRanges(this.collectionLink, [queryRange], diagnosticNode);
    }
    async _enqueueReplacementDocumentProducers(error, diagnosticNode, documentProducer) {
        // Get the replacement ranges
        const replacementPartitionKeyRanges = await this._getReplacementPartitionKeyRanges(documentProducer, diagnosticNode);
        if (replacementPartitionKeyRanges.length === 0) {
            throw error;
        }
        else if (replacementPartitionKeyRanges.length === 1) {
            // Partition is gone due to Merge
            // Create the replacement documentProducer with populateEpkRangeHeaders Flag set to true to set startEpk and endEpk headers
            const replacementDocumentProducer = this._createTargetPartitionQueryExecutionContext(replacementPartitionKeyRanges[0], documentProducer.continuationToken, documentProducer.startEpk, documentProducer.endEpk, true);
            this.unfilledDocumentProducersQueue.enq(replacementDocumentProducer);
        }
        else {
            // Create the replacement documentProducers
            const replacementDocumentProducers = [];
            replacementPartitionKeyRanges.forEach((partitionKeyRange) => {
                const queryRange = QueryRange_js_1.QueryRange.parsePartitionKeyRange(partitionKeyRange);
                // Create replacment document producers with the parent's continuationToken
                const replacementDocumentProducer = this._createTargetPartitionQueryExecutionContext(partitionKeyRange, documentProducer.continuationToken, queryRange.min, queryRange.max, false);
                replacementDocumentProducers.push(replacementDocumentProducer);
            });
            // add document producers to the queue
            replacementDocumentProducers.forEach((replacementDocumentProducer) => {
                if (replacementDocumentProducer.hasMoreResults()) {
                    this.unfilledDocumentProducersQueue.enq(replacementDocumentProducer);
                }
            });
        }
    }
    static _needPartitionKeyRangeCacheRefresh(error) {
        // TODO: any error
        return (error.code === statusCodes_js_1.StatusCodes.Gone &&
            "substatus" in error &&
            error["substatus"] === statusCodes_js_1.SubStatusCodes.PartitionKeyRangeGone);
    }
    /**
     * Determine if there are still remaining resources to processs based on the value of the continuation
     * token or the elements remaining on the current batch in the QueryIterator.
     * @returns true if there is other elements to process in the ParallelQueryExecutionContextBase.
     */
    hasMoreResults() {
        return (!this.err &&
            (this.buffer.length > 0 || this.state !== ParallelQueryExecutionContextBase.STATES.ended));
    }
    /**
     * Creates target partition range Query Execution Context
     */
    _createTargetPartitionQueryExecutionContext(partitionKeyTargetRange, continuationToken, startEpk, endEpk, populateEpkRangeHeaders) {
        let rewrittenQuery = this.partitionedQueryExecutionInfo.queryInfo.rewrittenQuery;
        let sqlQuerySpec;
        const query = this.query;
        if (typeof query === "string") {
            sqlQuerySpec = { query };
        }
        else {
            sqlQuerySpec = query;
        }
        const formatPlaceHolder = "{documentdb-formattableorderbyquery-filter}";
        if (rewrittenQuery) {
            sqlQuerySpec = JSON.parse(JSON.stringify(sqlQuerySpec));
            // We hardcode the formattable filter to true for now
            rewrittenQuery = rewrittenQuery.replace(formatPlaceHolder, "true");
            sqlQuerySpec["query"] = rewrittenQuery;
        }
        const options = Object.assign({}, this.options);
        options.continuationToken = continuationToken;
        return new documentProducer_js_1.DocumentProducer(this.clientContext, this.collectionLink, sqlQuerySpec, partitionKeyTargetRange, options, this.correlatedActivityId, startEpk, endEpk, populateEpkRangeHeaders);
    }
    async drainBufferedItems() {
        return new Promise((resolve, reject) => {
            this.sem.take(() => {
                if (this.err) {
                    // if there is a prior error return error
                    this.sem.leave();
                    this.err.headers = this._getAndResetActiveResponseHeaders();
                    reject(this.err);
                    return;
                }
                // return undefined if there is no more results
                if (this.buffer.length === 0) {
                    this.sem.leave();
                    return resolve({
                        result: this.state === ParallelQueryExecutionContextBase.STATES.ended ? undefined : [],
                        headers: this._getAndResetActiveResponseHeaders(),
                    });
                }
                // draing the entire buffer object and return that in result of return object
                const bufferedResults = this.buffer;
                this.buffer = [];
                // release the lock before returning
                this.sem.leave();
                // invoke the callback on the item
                return resolve({
                    result: bufferedResults,
                    headers: this._getAndResetActiveResponseHeaders(),
                });
            });
        });
    }
    /**
     * Buffers document producers based on the maximum degree of parallelism.
     * Moves document producers from the unfilled queue to the buffered queue.
     * @param diagnosticNode - The diagnostic node for logging and tracing.
     * @returns A promise that resolves when buffering is complete.
     */
    async bufferDocumentProducers(diagnosticNode) {
        return new Promise((resolve, reject) => {
            this.sem.take(async () => {
                if (this.err) {
                    this.sem.leave();
                    reject(this.err);
                    return;
                }
                this.updateStates(this.err);
                if (this.state === ParallelQueryExecutionContextBase.STATES.ended) {
                    this.sem.leave();
                    resolve();
                    return;
                }
                if (this.unfilledDocumentProducersQueue.size() === 0) {
                    this.sem.leave();
                    resolve();
                    return;
                }
                try {
                    const maxDegreeOfParallelism = this.options.maxDegreeOfParallelism === undefined ||
                        this.options.maxDegreeOfParallelism < 1
                        ? this.unfilledDocumentProducersQueue.size()
                        : Math.min(this.options.maxDegreeOfParallelism, this.unfilledDocumentProducersQueue.size());
                    const documentProducers = [];
                    while (documentProducers.length < maxDegreeOfParallelism &&
                        this.unfilledDocumentProducersQueue.size() > 0) {
                        let documentProducer;
                        try {
                            documentProducer = this.unfilledDocumentProducersQueue.deq();
                        }
                        catch (e) {
                            this.err = e;
                            this.err.headers = this._getAndResetActiveResponseHeaders();
                            reject(this.err);
                            return;
                        }
                        documentProducers.push(documentProducer);
                    }
                    const bufferDocumentProducer = async (documentProducer) => {
                        try {
                            await documentProducer.bufferMore(diagnosticNode);
                            // if buffer of document producer is filled, add it to the buffered document producers queue
                            const nextItem = documentProducer.peakNextItem();
                            if (nextItem !== undefined) {
                                this.bufferedDocumentProducersQueue.enq(documentProducer);
                            }
                            else if (documentProducer.hasMoreResults()) {
                                this.unfilledDocumentProducersQueue.enq(documentProducer);
                            }
                        }
                        catch (err) {
                            if (ParallelQueryExecutionContextBase._needPartitionKeyRangeCacheRefresh(err)) {
                                // We want the document producer enqueued
                                // So that later parts of the code can repair the execution context
                                // refresh the partition key ranges and ctreate new document producers and add it to the queue
                                await this._enqueueReplacementDocumentProducers(err, diagnosticNode, documentProducer);
                                resolve();
                            }
                            else {
                                this.err = err;
                                this.err.headers = this._getAndResetActiveResponseHeaders();
                                reject(err);
                            }
                        }
                    };
                    try {
                        await Promise.all(documentProducers.map((producer) => bufferDocumentProducer(producer)));
                    }
                    catch (err) {
                        this.err = err;
                        this.err.headers = this._getAndResetActiveResponseHeaders();
                        reject(err);
                        return;
                    }
                    resolve();
                }
                catch (err) {
                    this.err = err;
                    this.err.headers = this._getAndResetActiveResponseHeaders();
                    reject(err);
                }
                finally {
                    this.sem.leave();
                }
            });
        });
    }
    /**
     * Drains the buffer of filled document producers and appends their items to the main buffer.
     * @param isOrderBy - Indicates if the query is an order by query.
     * @returns A promise that resolves when the buffer is filled.
     */
    async fillBufferFromBufferQueue(isOrderBy = false) {
        return new Promise((resolve, reject) => {
            this.sem.take(async () => {
                if (this.err) {
                    // if there is a prior error return error
                    this.sem.leave();
                    this.err.headers = this._getAndResetActiveResponseHeaders();
                    reject(this.err);
                    return;
                }
                if (this.state === ParallelQueryExecutionContextBase.STATES.ended ||
                    this.bufferedDocumentProducersQueue.size() === 0) {
                    this.sem.leave();
                    resolve();
                    return;
                }
                try {
                    if (isOrderBy) {
                        while (this.unfilledDocumentProducersQueue.isEmpty() &&
                            this.bufferedDocumentProducersQueue.size() > 0) {
                            const documentProducer = this.bufferedDocumentProducersQueue.deq();
                            const { result, headers } = await documentProducer.fetchNextItem();
                            this._mergeWithActiveResponseHeaders(headers);
                            if (result) {
                                this.buffer.push(result);
                            }
                            if (documentProducer.peakNextItem() !== undefined) {
                                this.bufferedDocumentProducersQueue.enq(documentProducer);
                            }
                            else if (documentProducer.hasMoreResults()) {
                                this.unfilledDocumentProducersQueue.enq(documentProducer);
                            }
                            else {
                                // no more results in document producer
                            }
                        }
                    }
                    else {
                        while (this.bufferedDocumentProducersQueue.size() > 0) {
                            const documentProducer = this.bufferedDocumentProducersQueue.deq();
                            const { result, headers } = await documentProducer.fetchBufferedItems();
                            this._mergeWithActiveResponseHeaders(headers);
                            if (result) {
                                this.buffer.push(...result);
                            }
                            if (documentProducer.hasMoreResults()) {
                                this.unfilledDocumentProducersQueue.enq(documentProducer);
                            }
                        }
                    }
                    this.updateStates(this.err);
                }
                catch (err) {
                    this.err = err;
                    this.err.headers = this._getAndResetActiveResponseHeaders();
                    reject(this.err);
                    return;
                }
                finally {
                    // release the lock before returning
                    this.sem.leave();
                }
                resolve();
                return;
            });
        });
    }
    updateStates(error) {
        if (error) {
            this.err = error;
            this.state = ParallelQueryExecutionContextBase.STATES.ended;
            return;
        }
        if (this.state === ParallelQueryExecutionContextBase.STATES.started) {
            this.state = ParallelQueryExecutionContextBase.STATES.inProgress;
        }
        const hasNoActiveProducers = this.unfilledDocumentProducersQueue.size() === 0 &&
            this.bufferedDocumentProducersQueue.size() === 0;
        if (hasNoActiveProducers) {
            this.state = ParallelQueryExecutionContextBase.STATES.ended;
        }
    }
}
exports.ParallelQueryExecutionContextBase = ParallelQueryExecutionContextBase;
ParallelQueryExecutionContextBase.STATES = ParallelQueryExecutionContextBaseStates;
//# sourceMappingURL=parallelQueryExecutionContextBase.js.map