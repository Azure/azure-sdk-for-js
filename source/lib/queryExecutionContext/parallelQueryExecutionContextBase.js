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
    , PriorityQueue = require("priorityqueuejs")
    , SmartRoutingMapProvider = require("../routing/smartRoutingMapProvider")
    , InMemoryCollectionRoutingMap = require("../routing/inMemoryCollectionRoutingMap")
    , DocumentProducer = require("./documentProducer")
    , PartitionedQueryExecutionContextInfoParser = require("./partitionedQueryExecutionContextInfoParser")
    , bs = require("binary-search-bounds")
    , HeaderUtils = require("./headerUtils")
    , semaphore = require("semaphore")
    , StatusCodes = require("../statusCodes").StatusCodes
    , SubStatusCodes = require("../statusCodes").SubStatusCodes
    , assert = require('assert');

var QueryRange = InMemoryCollectionRoutingMap.QueryRange;
var _PartitionKeyRange = InMemoryCollectionRoutingMap._PartitionKeyRange;

//SCRIPT START

var ParallelQueryExecutionContextBase = Base.defineClass(
    /**
     * Provides the ParallelQueryExecutionContextBase.
     * This is the base class that ParallelQueryExecutionContext and OrderByQueryExecutionContext will derive from.
     *
     * When handling a parallelized query, it instantiates one instance of
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
        this.partitionedQueryExecutionInfo = partitionedQueryExecutionInfo;
        
        this.err = undefined;
        this.state = ParallelQueryExecutionContextBase.STATES.start;
        this.routingProvider = new SmartRoutingMapProvider(this.documentclient);
        this.sortOrders = PartitionedQueryExecutionContextInfoParser.parseOrderBy(this.partitionedQueryExecutionInfo);
        this.state = ParallelQueryExecutionContextBase.STATES.started;
        
        if (options === undefined || options["maxItemCount"] === undefined) {
            this.pageSize = ParallelQueryExecutionContextBase.DEFAULT_PAGE_SIZE;
            this.options["maxItemCount"] = this.pageSize;
        } else {
            this.pageSize = options["maxItemCount"];
        }
        
        this.requestContinuation = options ? options.continuation : null
        // response headers of undergoing operation
        this._respHeaders = HeaderUtils.getInitialHeader();
        var that = this;
        
        // Make priority queue for documentProducers
        // The comparator is supplied by the derived class
        this.orderByPQ = new PriorityQueue(function (a, b) { return that.documentProducerComparator(b, a); });
        // Creating the documentProducers
        this.sem = new semaphore(1);
        // Creating callback for semaphore
        var createDocumentProducersAndFillUpPriorityQueueFunc = function () {
            // ensure the lock is released after finishing up
            that._onTargetPartitionRanges(function (err, targetPartitionRanges) {
                if (err) {
                    that.err = err;
                    // release the lock
                    that.sem.leave();
                    return;
                }

                that.waitingForInternalExecutionContexts = targetPartitionRanges.length;
                // default to 1 if none is provided.
                var maxDegreeOfParallelism = options.maxDegreeOfParallelism || 1;
                if (maxDegreeOfParallelism > 0) {
                    // at most you will need 1 documentProducer for each partition
                    maxDegreeOfParallelism = Math.min(maxDegreeOfParallelism, targetPartitionRanges.length)
                } else {
                    // if user provided a negative number then we automatically pick 1 documentProducer per partition
                    maxDegreeOfParallelism = targetPartitionRanges.length;
                }
                
                var parallelismSem = semaphore(maxDegreeOfParallelism);
                var filteredPartitionKeyRanges = [];
                // The document producers generated from filteredPartitionKeyRanges
                var targetPartitionQueryExecutionContextList = [];
                
                if (that.requestContinuation) {
                    // Need to create the first documentProducer with the suppliedCompositeContinuationToken
                    try {
                        var suppliedCompositeContinuationToken = JSON.parse(that.requestContinuation);
                        filteredPartitionKeyRanges = that.getPartitionKeyRangesForContinuation(
                            suppliedCompositeContinuationToken, targetPartitionRanges
                        );
                        if (filteredPartitionKeyRanges.length > 0) {
                            targetPartitionQueryExecutionContextList.push(
                                that._createTargetPartitionQueryExecutionContext(
                                    filteredPartitionKeyRanges[0], suppliedCompositeContinuationToken.token
                                )
                            );
                            // Slicing the first element off, since we already made a documentProducer for it
                            filteredPartitionKeyRanges = filteredPartitionKeyRanges.slice(1);
                        }
                    } catch (e) {
                        that.err = e;
                        that.sem.leave();
                    }
                } else {
                    filteredPartitionKeyRanges = targetPartitionRanges;
                }
                
                // Create one documentProducer for each partitionTargetRange
                filteredPartitionKeyRanges.forEach(
                    function (partitionTargetRange) {
                        // no async callback
                        targetPartitionQueryExecutionContextList.push(
                            that._createTargetPartitionQueryExecutionContext(partitionTargetRange)
                        );
                    }
                );
                
                // Fill up our priority queue with documentProducers
                targetPartitionQueryExecutionContextList.forEach(
                    function (documentProducer) {
                        // has async callback
                        var throttledFunc = function () {
                            documentProducer.current(function (err, document, headers) {
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
                                        that.orderByPQ.enq(documentProducer);
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
                    }
                );
            });
        };
        this.sem.take(createDocumentProducersAndFillUpPriorityQueueFunc);
    },

    {
        getPartitionKeyRangesForContinuation: function (suppliedCompositeContinuationToken, partitionKeyRanges) {
            
            var startRange = {};
            startRange[_PartitionKeyRange.MinInclusive] = suppliedCompositeContinuationToken.range.min;
            startRange[_PartitionKeyRange.MaxExclusive] = suppliedCompositeContinuationToken.range.max;
            
            var vbCompareFunction = function (x, y) {
                if (x[_PartitionKeyRange.MinInclusive] > y[_PartitionKeyRange.MinInclusive]) return 1;
                if (x[_PartitionKeyRange.MinInclusive] < y[_PartitionKeyRange.MinInclusive]) return -1;
                
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
            // decrements waitingForInternalExecutionContexts
            // if waitingForInternalExecutionContexts reaches 0 releases the semaphore and changes the state
            this.waitingForInternalExecutionContexts = this.waitingForInternalExecutionContexts - 1;
            if (this.waitingForInternalExecutionContexts === 0) {
                this.sem.leave();
                if (this.orderByPQ.size() === 0) {
                    this.state = ParallelQueryExecutionContextBase.STATES.inProgress;
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
        
        _onTargetPartitionRanges: function (callback) {
            // invokes the callback when the target partition ranges are ready
            var parsedRanges = PartitionedQueryExecutionContextInfoParser.parseQueryRanges(this.partitionedQueryExecutionInfo);
            var queryRanges = parsedRanges.map(function (item) { return QueryRange.parseFromDict(item); });
            return this.routingProvider.getOverlappingRanges(callback, this.collectionLink, queryRanges);
        },

        /**
        * Gets the replacement ranges for a partitionkeyrange that has been split
        * @memberof ParallelQueryExecutionContextBase
        * @instance
        */
        _getReplacementPartitionKeyRanges: function (callback, documentProducer) {
            var routingMapProvider = this.documentclient.partitionKeyDefinitionCache;
            var partitionKeyRange = documentProducer.targetPartitionKeyRange;
            // Download the new routing map
            this.routingProvider = new SmartRoutingMapProvider(this.documentclient);
            // Get the queryRange that relates to this partitionKeyRange
            var queryRange = QueryRange.parsePartitionKeyRange(partitionKeyRange);
            this.routingProvider.getOverlappingRanges(callback, this.collectionLink, [queryRange]);
        },
        
        /**
        * Removes the current document producer from the priqueue,
        * replaces that document producer with child document producers,
        * then reexecutes the originFunction with the corrrected executionContext
        * @memberof ParallelQueryExecutionContextBase
        * @instance
        */
        _repairExecutionContext: function (originFunction) {
            // Get the replacement ranges
            var that = this;
            // Removing the invalid documentProducer from the orderByPQ
            var parentDocumentProducer = that.orderByPQ.deq();
            var afterReplacementRanges = function (err, replacementPartitionKeyRanges) {
                if (err) {
                    that.err = err;
                    return;
                }
                var replacementDocumentProducers = [];
                // Create the replacement documentProducers
                replacementPartitionKeyRanges.forEach(function (partitionKeyRange) {
                    // Create replacment document producers with the parent's continuationToken
                    var replacementDocumentProducer = that._createTargetPartitionQueryExecutionContext(
                        partitionKeyRange,
                        parentDocumentProducer.continuationToken);
                    replacementDocumentProducers.push(replacementDocumentProducer);
                });
                // We need to check if the documentProducers even has anything left to fetch from before enqueing them
                var checkAndEnqueueDocumentProducer = function (documentProducerToCheck, checkNextDocumentProducerCallback) {
                    documentProducerToCheck.current(function (err, afterItem, headers) {
                        if (err) {
                            // Something actually bad happened
                            that.err = err;
                            return;
                        } else if (afterItem === undefined) {
                            // no more results left in this document producer, so we don't enqueue it
                        } else {
                            // Safe to put document producer back in the queue
                            that.orderByPQ.enq(documentProducerToCheck);
                        }

                        checkNextDocumentProducerCallback();
                    });
                };
                var checkAndEnqueueDocumentProducers = function(replacementDocumentProducers) {
                    if (replacementDocumentProducers.length > 0) {
                        // We still have a replacementDocumentProducer to check
                        var replacementDocumentProducer = replacementDocumentProducers.shift();
                        checkAndEnqueueDocumentProducer(
                            replacementDocumentProducer,
                            function() { checkAndEnqueueDocumentProducers(replacementDocumentProducers); }
                        );
                    } else {
                        // reexecutes the originFunction with the corrrected executionContext
                        return originFunction();
                    }
                }
                // Invoke the recursive function to get the ball rolling
                checkAndEnqueueDocumentProducers(replacementDocumentProducers);
            };
            this._getReplacementPartitionKeyRanges(afterReplacementRanges, parentDocumentProducer);
        },
        
        _needPartitionKeyRangeCacheRefresh: function (error) {
            return (error.code === StatusCodes.Gone) && ('substatus' in error) && (error['substatus'] === SubStatusCodes.PartitionKeyRangeGone);
        },

        /**
        * Checks to see if the executionContext needs to be repaired.
        * if so it repairs the execution context and executes the ifCallback,
        * else it continues with the current execution context and executes the elseCallback
        * @memberof ParallelQueryExecutionContextBase
        * @instance
        */
        _repairExecutionContextIfNeeded: function (ifCallback, elseCallback) {
            var that = this;
            var documentProducer = that.orderByPQ.peek();
            // Check if split happened
            documentProducer.current(function (err, element) {
                if (err) {
                    if (that._needPartitionKeyRangeCacheRefresh(err)) {
                        // Split has happened so we need to repair execution context before continueing
                        return that._repairExecutionContext(ifCallback);
                    } else {
                        // Something actually bad happened ...
                        that.err = err;
                        return;
                    }
                } else {
                    // Just continue with the original execution context
                    return elseCallback();
                }
            });
        },

        /**
        * Execute a provided function on the next element in the ParallelQueryExecutionContextBase.
        * @memberof ParallelQueryExecutionContextBase
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
                    that.state = ParallelQueryExecutionContextBase.STATES.ended;
                    // release the lock before invoking callback
                    that.sem.leave();
                    return callback(undefined, undefined, that._getAndResetActiveResponseHeaders());
                }
                
                var ifCallback = function () {
                    // Release the semaphore to avoid deadlock
                    that.sem.leave();
                    // Reexcute the function
                    return that.nextItem(callback);
                };
                var elseCallback = function () {
                    try {
                        var documentProducer = that.orderByPQ.deq();
                    } catch (e) {
                        // if comparing elements of the priority queue throws exception
                        // set that error and return error
                        that.err = e;
                        // release the lock before invoking callback
                        that.sem.leave();
                        return callback(that.err, undefined, that._getAndResetActiveResponseHeaders());
                    }

                    documentProducer.nextItem(function (err, item, headers) {
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
                        documentProducer.current(function (err, afterItem, headers) {
                            try {
                                that._mergeWithActiveResponseHeaders(headers);
                                if (err) {
                                    if (that._needPartitionKeyRangeCacheRefresh(err)) {
                                        // We want the document producer enqueued
                                        // So that later parts of the code can repair the execution context
                                        that.orderByPQ.enq(documentProducer);
                                        return;
                                    } else {
                                        // Something actually bad happened
                                        that.err = err;
                                        return;
                                    }
                                } else if (afterItem === undefined) {
                                    // no more results is left in this document producer
                                    return;
                                } else {
                                    try {
                                        var headItem = documentProducer.fetchResults[0];
                                        assert.notStrictEqual(headItem, undefined,
                                    'Extracted DocumentProducer from PQ is invalid state with no result!');
                                        that.orderByPQ.enq(documentProducer);
                                    } catch (e) {
                                        // if comparing elements in priority queue throws exception
                                        // set error
                                        that.err = e;
                                    }
                                    return;
                                }
                            } finally {
                                // release the lock before returning
                                that.sem.leave();
                            }
                        });
                        
                        // invoke the callback on the item
                        return callback(undefined, item, that._getAndResetActiveResponseHeaders());
                    });
                }
                that._repairExecutionContextIfNeeded(ifCallback, elseCallback);
            });
        },
        
        /**
         * Retrieve the current element on the ParallelQueryExecutionContextBase.
         * @memberof ParallelQueryExecutionContextBase
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
                    
                    var ifCallback = function () {
                        // Reexcute the function
                        return that.current(callback);
                    };

                    var elseCallback = function () {
                        var documentProducer = that.orderByPQ.peek();
                        documentProducer.current(callback);
                    };

                    that._repairExecutionContextIfNeeded(ifCallback, elseCallback);
                } finally {
                    that.sem.leave();
                }
            });
        },
        
        /**
         * Determine if there are still remaining resources to processs based on the value of the continuation token or the elements remaining on the current batch in the QueryIterator.
         * @memberof ParallelQueryExecutionContextBase
         * @instance
         * @returns {Boolean} true if there is other elements to process in the ParallelQueryExecutionContextBase.
         */
        hasMoreResults: function () {
            return !(this.state === ParallelQueryExecutionContextBase.STATES.ended || this.err !== undefined);
        },
        
        /**
         * Creates document producers
         */
        _createTargetPartitionQueryExecutionContext: function (partitionKeyTargetRange, continuationToken) {
            // creates target partition range Query Execution Context
            var rewrittenQuery = PartitionedQueryExecutionContextInfoParser.parseRewrittenQuery(this.partitionedQueryExecutionInfo);
            var query = this.query;
            if (typeof (query) === 'string') {
                query = { 'query': query };
            }
            
            var formatPlaceHolder = "{documentdb-formattableorderbyquery-filter}";
            if (rewrittenQuery) {
                query = JSON.parse(JSON.stringify(query));
                // We hardcode the formattable filter to true for now
                rewrittenQuery = rewrittenQuery.replace(formatPlaceHolder, "true");
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
    },

    {
        STATES: Object.freeze({ started: "started", inProgress: "inProgress", ended: "ended" }),
        DEFAULT_PAGE_SIZE: 10
    }
);

//SCRIPT END

if (typeof exports !== "undefined") {
    module.exports = ParallelQueryExecutionContextBase;
}
