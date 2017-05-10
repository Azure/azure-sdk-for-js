/*
The MIT License (MIT)
Copyright (c) 2017 Microsoft Corporation

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

"use strict";

var Base = require("../base")
    , Constants = require("../constants")
    , DefaultQueryExecutionContext = require("./defaultQueryExecutionContext")
    , PriorityQueue = require("priorityqueuejs")
    , SmartRoutingMapProvider = require("../routing/smartRoutingMapProvider")
    , CollectionRoutingMap = require("../routing/inMemoryCollectionRoutingMap")
    , DocumentProducer = require("./documentProducer")
    , QueryExecutionInfoParser = require("./partitionedQueryExecutionContextInfoParser")
    , bs = require("binary-search-bounds")
    , HeaderUtils = require("./headerUtils")
    , assert = require('assert');

var QueryRange = CollectionRoutingMap.QueryRange;
var FormatPlaceHolder = "{documentdb-formattableorderbyquery-filter}"; 

var PartitionKeyRangeConstants = CollectionRoutingMap._PartitionKeyRange;

//SCRIPT START
var ParallelQueryExecutionContext = Base.defineClass(
    /**
     * Provides the ParallelQueryExecutionContext.
     * This class is capable of handling parallelized queries.
     *
     * When handling a parallelized (e.g., orderby) query, it instantiates one instance of
     * DocumentProcuder per target partition key range and aggregates the result of each.
     *
     * @constructor ParallelQueryExecutionContext
     * @param {DocumentClient} documentclient        - The service endpoint to use to create the client.
     * @param {string} collectionLink                - The Collection Link
     * @param {FeedOptions} [options]                - Represents the feed options.
     * @param {object} partitionedQueryExecutionInfo - PartitionedQueryExecutionInfo
     * @ignore
     */
    function (documentclient, collectionLink, query, options, partitionedQueryExecutionInfo) {
        this.documentclient = documentclient;
        this.collectionLink = collectionLink;
        this.query = query;
        this.options = options;
        this.paritionedQueryExecutionInfo = partitionedQueryExecutionInfo;
        this.err = undefined;
        this.state = ParallelQueryExecutionContext.STATES.start;
        this.routingProvider = new SmartRoutingMapProvider(this.documentclient);
        this.sortOrders = QueryExecutionInfoParser.parseOrderBy(this.paritionedQueryExecutionInfo);

        if (Array.isArray(this.sortOrders) && this.sortOrders.length > 0) {
            this.documentProducerComparator = DocumentProducer.createOrderByComparator(this.sortOrders);
        } else {
            this.documentProducerComparator = DocumentProducer.createTargetPartitionKeyRangeComparator();
        }

        this.pageSize = options["maxItemCount"];
        if (this.pageSize === undefined) {
            this.pageSize = ParallelQueryExecutionContext.DEFAULT_PAGE_SIZE;
            this.options["maxItemCount"] = this.pageSize;
        }

        // this is a max priority queue
        this.orderByPQ = new PriorityQueue(function (a, b) { return that.documentProducerComparator(b, a); });

        this.state = ParallelQueryExecutionContext.STATES.started;
        this.sem = require('semaphore')(1);

        this.requestContinuation = options ? options.continuation : null;

        // response headers of undergoing operation
        this._respHeaders = HeaderUtils.getInitialHeader();
        var that = this;
        var createDocumentProducersAndFillUpPriorityQueueFunc = function () {
            // ensure the lock is released after finishing up
            that._onTargetPartitionRanges(function (err, targetPartitionRanges) {
                that.waitingForInternalExcecutionContexts = targetPartitionRanges.length;
                if (err) {
                    that.err = err;
                    // relase the lock
                    that.sem.leave();
                    return;
                }
                var maxDegreeOfParallelism = options.maxDegreeOfParallelism || 1;

                if (maxDegreeOfParallelism > 0) {
                    maxDegreeOfParallelism = Math.min(maxDegreeOfParallelism, targetPartitionRanges.length);
                } else {
                    maxDegreeOfParallelism = targetPartitionRanges.length;
                }
                var parallelismSem = require('semaphore')(Math.max(maxDegreeOfParallelism, 1));

                var targetPartitionQueryExecutionContextList = [];

                var filteredPartitionKeyRanges = [];

                if (that.requestContinuation) {
                    try {
                        var suppliedCompositeContinuationToken = JSON.parse(that.requestContinuation);
                        filteredPartitionKeyRanges = that.getPartitionKeyRangesForContinuation(
                            suppliedCompositeContinuationToken, targetPartitionRanges);

                        if (filteredPartitionKeyRanges.length > 0) {
                            targetPartitionQueryExecutionContextList.push(
                                that._createTargetPartitionQueryExecutionContext(
                                    filteredPartitionKeyRanges[0], suppliedCompositeContinuationToken.token));
                        }

                        filteredPartitionKeyRanges = filteredPartitionKeyRanges.slice(1);

                    } catch (e) {
                        that.err = e;
                        that.sem.leave();
                        return;
                    }

                } else {
                    filteredPartitionKeyRanges = targetPartitionRanges;
                }

            
                filteredPartitionKeyRanges.forEach(
                    function (partitionTargetRange) {
                        // no async callback
                        targetPartitionQueryExecutionContextList.push(
                            that._createTargetPartitionQueryExecutionContext(partitionTargetRange));
                    }
                );

                targetPartitionQueryExecutionContextList.forEach(
                    function (targetQueryExContext) {

                        // has async callback
                        var throttledFunc = function () {
                            targetQueryExContext.current(function (err, document, headers) {
                                try {
                                    that._mergeWithActiveResponseHeaders(headers);
                                    if (err) {
                                        that.err = err;
                                        return;
                                    }

                                    if (document == undefined) {
                                        // no results on this one
                                        return;
                                    }
                                    // if there are matching results in the target ex range add it to the priority queue
                                    try {
                                        that.orderByPQ.enq(targetQueryExContext);
                                    } catch (e) {
                                        that.err = e;
                                    }
                                } finally {
                                    parallelismSem.leave();
                                    that._decrementInitiationLock();
                                }
                            });
                        }
                        parallelismSem.take(throttledFunc);
                    });
            });
        };
        this.sem.take(createDocumentProducersAndFillUpPriorityQueueFunc);
    },
    {
        getPartitionKeyRangesForContinuation: function (suppliedCompositeContinuationToken,
            partitionKeyRanges) {

            var startRange = {};
            startRange[PartitionKeyRangeConstants.MinInclusive] = suppliedCompositeContinuationToken.range.min;
            startRange[PartitionKeyRangeConstants.MaxExclusive] = suppliedCompositeContinuationToken.range.max;

            var vbCompareFunction = function (x, y) {
                if (x[PartitionKeyRangeConstants.MinInclusive] > y[PartitionKeyRangeConstants.MinInclusive]) return 1;
                if (x[PartitionKeyRangeConstants.MinInclusive] < y[PartitionKeyRangeConstants.MinInclusive]) return -1;

                return 0;
            }

            var minIndex = bs.le(partitionKeyRanges, startRange, vbCompareFunction);
            // that's an error

            if (minIndex > 0) {
                throw new Error("BadRequestException: InvalidContinuationToken");
            }

            // return slice of the partition key ranges
            return partitionKeyRanges.slice(minIndex, partitionKeyRanges.length - minIndex);
        },

        _decrementInitiationLock: function () {
            // decrements waitingForInternalExcecutionContexts
            // if waitingForInternalExcecutionContexts reaches 0 releases the semaphore and changes the state
            this.waitingForInternalExcecutionContexts = this.waitingForInternalExcecutionContexts - 1;
            if (this.waitingForInternalExcecutionContexts === 0) {
                this.sem.leave();
                if (this.orderByPQ.size() === 0) {
                    this.state = ParallelQueryExecutionContext.STATES.inProgress;
                }
            }
        },

        _mergeWithActiveResponseHeaders: function (headers) {
            HeaderUtils.mergeHeaders(this._respHeaders, headers);
        },

        _getAndResetActiveResponseHeaders: function () {
            var ret = this._respHeaders;
            this._respHeaders = HeaderUtils.getInitialHeader();
            return ret;
        },

        /**
        * Execute a provided function on the next element in the ParallelQueryExecutionContext.
        * @memberof ParallelQueryExecutionContext
        * @instance
        * @param {callback} callback - Function to execute for each element. the function takes two parameters error, element.
        */
        nextItem: function (callback) {
            if (this.err) {
                // if there is a prior error return error
                return callback(this.err, undefined);
            }
            var that = this;
            this.sem.take(function () {
                // NOTE: lock must be released before invoking quitting
                if (that.err) {
                    // release the lock before invoking callback
                    that.sem.leave();
                    // if there is a prior error return error
                    return callback(that.err, undefined, that._getAndResetActiveResponseHeaders());
                }

                if (that.orderByPQ.size() === 0) {
                    // there is no more results
                    that.state = ParallelQueryExecutionContext.STATES.ended;
                    // release the lock before invoking callback
                    that.sem.leave();
                    return callback(undefined, undefined, that._getAndResetActiveResponseHeaders());
                }
                try {
                    var targetPartitionRangeDocumentProducer = that.orderByPQ.deq();
                } catch (e) {
                    // if comparing elements of the priority queue throws exception
                    // set that error and return error
                    that.err = e;
                    // release the lock before invoking callback
                    that.sem.leave();
                    return callback(that.err, undefined, that._getAndResetActiveResponseHeaders());
                }

                targetPartitionRangeDocumentProducer.nextItem(function (err, item, headers) {
                    that._mergeWithActiveResponseHeaders(headers);
                    if (err) {
                        // this should never happen
                        // because the documentProducer already has buffered an item
                        // assert err === undefined
                        that.err =
                            new Error(
                                util.format(
                                    "Extracted DocumentProducer from the priority queue fails to get the buffered item. Due to %s",
                                    JSON.stringify(err)));
                        // release the lock before invoking callback
                        that.sem.leave();
                        return callback(that.err, undefined, that._getAndResetActiveResponseHeaders());
                    }
                    if (item === undefined) {
                        // this should never happen
                        // because the documentProducer already has buffered an item
                        // assert item !== undefined
                        that.err =
                            new Error(
                                util.format(
                                    "Extracted DocumentProducer from the priority queue doesn't have any buffered item!"));
                        // release the lock before invoking callback
                        that.sem.leave();
                        return callback(that.err, undefined, that._getAndResetActiveResponseHeaders());
                    }

                    // we need to put back the document producer to the queue if it has more elements.
                    // the lock will be released after we know document producer must be put back in the queue or not
                    targetPartitionRangeDocumentProducer.current(function (err, afterItem, headers) {
                        try {
                            that._mergeWithActiveResponseHeaders(headers);
                            if (err) {
                                that.err = err;
                                return;
                            }
                            if (afterItem === undefined) {
                                // no more results is left in this document producer
                                return;
                            }
                            try {
                                var headItem = targetPartitionRangeDocumentProducer.peekBufferedItems()[0];
                                assert.notStrictEqual(headItem, undefined,
                                    'Extracted DocumentProducer from PQ is invalid state with no result!');
                                that.orderByPQ.enq(targetPartitionRangeDocumentProducer);
                            } catch (e) {
                                // if comparing elements in priority queue throws exception
                                // set error
                                that.err = e;
                            }
                            return;
                        } finally {
                            // release the lock before returning
                            that.sem.leave();
                        }
                    });

                    // invoke the callback on the item
                    callback(undefined, item, that._getAndResetActiveResponseHeaders());
                });
            });
        },

        /**
         * Retrieve the current element on the ParallelQueryExecutionContext.
         * @memberof ParallelQueryExecutionContext
         * @instance
         * @param {callback} callback - Function to execute for the current element. the function takes two parameters error, element.
         */
        current: function (callback) {
            if (this.err) {
                return callback(this.err, undefined, that._getAndResetActiveResponseHeaders());
            }
            var that = this;
            this.sem.take(function () {
                try {
                    if (that.err) {
                        return callback(that.err, undefined, that._getAndResetActiveResponseHeaders());
                    }

                    if (that.orderByPQ.size() === 0) {
                        return callback(undefined, undefined, that._getAndResetActiveResponseHeaders());
                    }
                    var targetPartitionRangeDocumentProducer = that.orderByPQ.peek();
                    targetPartitionRangeDocumentProducer.current(callback);
                } finally {
                    that.sem.leave();
                }
            });
        },

        /**
         * Determine if there are still remaining resources to processs based on the value of the continuation token or the elements remaining on the current batch in the QueryIterator.
         * @memberof ParallelQueryExecutionContext
         * @instance
         * @returns {Boolean} true if there is other elements to process in the ParallelQueryExecutionContext.
         */
        hasMoreResults: function () {
            return !(this.state === ParallelQueryExecutionContext.STATES.ended || this.err !== undefined);
        },

        fetchMore: function (callback) {

            if (this.err) {
                return callback(this.err, undefined, that._getAndResetActiveResponseHeaders());
            }

            var that = this;
            this.sem.take(function () {
                try {
                    if (that.err) {
                        return callback(that.err, undefined, that._getAndResetActiveResponseHeaders());
                    }

                    if (Array.isArray(that.sortOrders) && that.sortOrders.length > 0) {

                        that._fetchMoreTempBufferedResults = [];
                        that._fetchMoreImplementation(callback);

                    } else {

                        that._fetchMoreTempBufferedResults = [];
                        that._fetchMoreBasicParallel(callback);
                    }
                } finally {
                   that.sem.leave();
                }
            });
        },

        _fetchMoreBasicParallel: function (callback) {

            if (this.orderByPQ.size() === 0) {
                if (this._fetchMoreTempBufferedResults.length > 0) {

                    return callback(undefined, this._fetchMoreTempBufferedResults, this._getAndResetActiveResponseHeaders());
                } else {
                    this.state = ParallelQueryExecutionContext.STATES.ended;
                    return callback(undefined, undefined, undefined);
                }
            }

            var targetPartitionRangeDocumentProducer = this.orderByPQ.deq();
            var continuation = targetPartitionRangeDocumentProducer.internalExecutionContext.continuation;

            var that = this;

            this._recursiveDrain(this.options["maxItemCount"] - this._fetchMoreTempBufferedResults.length,
                                targetPartitionRangeDocumentProducer, function (err, res) {
                if (err) {
                    return callback(err, undefined, that._getAndResetActiveResponseHeaders());
                }

                that._fetchMoreTempBufferedResults = that._fetchMoreTempBufferedResults.concat(res);

                if (!targetPartitionRangeDocumentProducer.allFetched) {
                    // assert res.length + targetPartitionRangeDocumentProducer.peekBufferedItems().length > that.options["maxItemCount"]

                    // put doc producer back in the queue
                    that.orderByPQ.enq(targetPartitionRangeDocumentProducer);

                    that._respHeaders[Constants.HttpHeaders.Continuation] =
                        JSON.stringify(that._buildContinuationTokenFrom(targetPartitionRangeDocumentProducer));

                    // assert that._fetchMoreTempBufferedResults.lenght <= that.options["maxItemCount"]

                    return callback(undefined, that._fetchMoreTempBufferedResults, that._getAndResetActiveResponseHeaders());
                } else {

                    // assert targetPartitionRangeDocumentProducer.peekBufferedItems().length === 0
                    that._fetchMoreBasicParallel(callback);
                }
            });
        },

        _buildContinuationTokenFrom: function (documentProducer) {
            // given the document producer constructs the continu
            if (documentProducer.allFetched && documentProducer.peekBufferedItems().length == 0) {
                return undefined;
            }


            var min = documentProducer.targetPartitionKeyRange[PartitionKeyRangeConstants.MinInclusive];
            var max = documentProducer.targetPartitionKeyRange[PartitionKeyRangeConstants.MaxExclusive];
            var range = {
                'min': min,
                'max': max,
                'id': documentProducer.targetPartitionKeyRange.id
            };

            var withNullDefault = function (token) {
                if (token) {
                    return token;
                } else if (token === null || token === undefined) {
                    return null;
                }
            }

            var documentProducerContinuationToken = undefined;

            if (documentProducer.peekBufferedItems().length > 0) {
                documentProducerContinuationToken = documentProducer.previousContinuationToken;
            } else {
                documentProducerContinuationToken = documentProducer.continuationToken;
            }
                // has unused buffered item so use the previous continuation token
            return {
                'token': withNullDefault(documentProducerContinuationToken),
                'range': range
            };
        },

        _recursiveDrain: function (maxElements, documentProducer, callback) {
            var buffer = [];
            var that = this;
            var implFunc = function () {

                // enough data is buffered
                if (maxElements <= buffer.length) {
                    return callback(undefined, buffer);
                }

                if (maxElements < buffer.length + documentProducer.peekBufferedItems().length) {
                    return callback(undefined, buffer);
                }

                if (documentProducer.peekBufferedItems().length > 0) {
                    buffer = buffer.concat(documentProducer.consumeBufferedItems());
                    return implFunc();
                }

                if (documentProducer.allFetched) {
                    return callback(undefined, buffer);
                }
                
                documentProducer.bufferMore(function (err, resources, respHeaders) {
                    that._mergeWithActiveResponseHeaders(respHeaders);
                    if (err) {
                        that.err = documentProducer.err;
                        return callback(that.err, undefined);
                    }
                    return implFunc()
                });
            };

            implFunc();
        },

        _fetchMoreImplementation: function (callback) {
            var that = this;
            this.endpoint.nextItem(function (err, resources, headers) {

                that._mergeWithActiveResponseHeaders(headers);

                if (err) {
                    return callback(err, undefined, that._getAndResetActiveResponseHeaders());
                }
                // concatinate the results and fetch more

                if (resources === undefined) {
                    // no more results
                    if (that._fetchMoreTempBufferedResults.length === 0) {
                        return callback(undefined, undefined, that._getAndResetActiveResponseHeaders());
                    }

                    var temp = that._fetchMoreTempBufferedResults;
                    that._fetchMoreTempBufferedResults = [];
                    return callback(undefined, temp, that._getAndResetActiveResponseHeaders());
                }

                that._fetchMoreTempBufferedResults = that._fetchMoreTempBufferedResults.concat(resources);

                if (that.pageSize <= that._fetchMoreTempBufferedResults.length) {
                    // fetched enough results
                    var temp = that._fetchMoreTempBufferedResults;
                    that._fetchMoreTempBufferedResults = [];

                    return callback(undefined, temp, that._getAndResetActiveResponseHeaders());
                }

                that._fetchMoreImplementation(callback);
            });
        },

        _createTargetPartitionQueryExecutionContext: function (partitionKeyTargetRange, continuationToken) {
            // creates target partition range Query Execution Context
            var rewrittenQuery = QueryExecutionInfoParser.parseRewrittenQuery(this.paritionedQueryExecutionInfo);
            var query = this.query;
            if (typeof (query) === 'string') {
                query = { 'query': query };
            }
            if (rewrittenQuery) {
                query = JSON.parse(JSON.stringify(query));
                // We hardcode the formattable filter to true for now
                rewrittenQuery = rewrittenQuery.replace(FormatPlaceHolder, "true");
                query['query'] = rewrittenQuery;
            }

            var options = JSON.parse(JSON.stringify(this.options));
            if (continuationToken) {
                options.continuation = continuationToken;
            } else {
                options.continuation = undefined;
            }

            return new DocumentProducer(this.documentclient, this.collectionLink, query, partitionKeyTargetRange, options);
        },

        _onTargetPartitionRanges: function (callback) {
            // invokes the callback when the target partition ranges are ready
            var parsedRanges = QueryExecutionInfoParser.parseQueryRanges(this.paritionedQueryExecutionInfo);
            var queryRanges = parsedRanges.map(function (item) { return QueryRange.parseFromDict(item); });
            return this.routingProvider.getOverlappingRanges(callback, this.collectionLink, queryRanges);
        },
    },
    {
        STATES: Object.freeze({ started: "started", inProgress: "inProgress", ended: "ended" }),
        DEFAULT_PAGE_SIZE: 10

    }
);
//SCRIPT END

if (typeof exports !== "undefined") {
    module.exports = ParallelQueryExecutionContext;
}