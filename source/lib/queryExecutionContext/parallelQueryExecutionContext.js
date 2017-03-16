/*
The MIT License (MIT)
Copyright (c) 2014 Microsoft Corporation

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
    , DefaultQueryExecutionContext = require("./defaultQueryExecutionContext")
    , PriorityQueue = require("priorityqueuejs")
    , SmartRoutingMapProvider = require("../routing/smartRoutingMapProvider")
    , CollectionRoutingMap = require("../routing/inMemoryCollectionRoutingMap")
    , DocumentProducer = require("./documentProducer")
    , QueryExecutionInfoParser = require("./partitionedQueryExecutionContextInfoParser")
    , assert = require('assert');

var QueryRange = CollectionRoutingMap.QueryRange;

var FormatPlaceHolder = "{documentdb-formattableorderbyquery-filter}"; 

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

        // this is a max priority queue
        this.orderByPQ = new PriorityQueue(function (a, b) { return that.documentProducerComparator(b, a); });

        this.state = ParallelQueryExecutionContext.STATES.started;
        this.sem = require('semaphore')(1);
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

                targetPartitionRanges.forEach(
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
                            targetQueryExContext.current(function (err, document) {
                                try {
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
                    return callback(that.err, undefined);
                }

                if (that.orderByPQ.size() === 0) {
                    // there is no more results
                    that.state = ParallelQueryExecutionContext.STATES.ended;
                    // release the lock before invoking callback
                    that.sem.leave();
                    return callback(undefined, undefined);
                }
                try {
                    var targetPartitionRangeDocumentProducer = that.orderByPQ.deq();
                } catch (e) {
                    // if comparing elements of the priority queue throws exception
                    // set that error and return error
                    that.err = e;
                    // release the lock before invoking callback
                    that.sem.leave();
                    return callback(that.err, undefined);
                }

                targetPartitionRangeDocumentProducer.nextItem(function (err, item) {
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
                        return callback(that.err, undefined);
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
                        return callback(that.err, undefined);
                    }

                    // we need to put back the document producer to the queue if it has more elements.
                    // the lock will be released after we know document producer must be put back in the queue or not
                    targetPartitionRangeDocumentProducer.current(function (err, afterItem) {
                        try {
                            if (err) {
                                that.err = err;
                                return;
                            }
                            if (afterItem === undefined) {
                                // no more results is left in this document producer
                                return;
                            }
                            try {
                                var headItem = targetPartitionRangeDocumentProducer.peek();
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
                    callback(undefined, item);
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
                return callback(this.err, undefined);
            }
            var that = this;
            this.sem.take(function () {
                try {
                    if (that.err) {
                        return callback(that.err, undefined);
                    }

                    if (that.orderByPQ.size() === 0) {
                        return callback(undefined, undefined);
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
        
        _createTargetPartitionQueryExecutionContext: function (partitionKeyTargetRange) {
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
            return new DocumentProducer(this.documentclient, this.collectionLink, query, partitionKeyTargetRange);
        },

        _onTargetPartitionRanges: function (callback) {
            // invokes the callback when the target partition ranges are ready
            var parsedRanges = QueryExecutionInfoParser.parseQueryRanges(this.paritionedQueryExecutionInfo);
            var queryRanges = parsedRanges.map(function (item) { return QueryRange.parseFromDict(item); });
            return this.routingProvider.getOverlappingRanges(callback, this.collectionLink, queryRanges);
        },
    }, 
    {
        STATES: Object.freeze({ started: "started", inProgress: "inProgress", ended: "ended" })
    }
);
//SCRIPT END

if (typeof exports !== "undefined") {
    module.exports = ParallelQueryExecutionContext;
}