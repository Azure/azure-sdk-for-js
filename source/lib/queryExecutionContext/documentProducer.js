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
    , DefaultQueryExecutionContext = require("./defaultQueryExecutionContext")
    , HttpHeaders = require("../constants").HttpHeaders
    , HeaderUtils = require("./headerUtils")
    , StatusCodes = require("../statusCodes").StatusCodes
    , SubStatusCodes = require("../statusCodes").SubStatusCodes
    , assert = require("assert")

//SCRIPT START
var DocumentProducer = Base.defineClass(
    /**
     * Provides the Target Partition Range Query Execution Context.
     * @constructor DocumentProducer
     * @param {DocumentClient} documentclient        - The service endpoint to use to create the client.
     * @param {String} collectionLink                - Represents collection link
     * @param {SqlQuerySpec | string} query          - A SQL query.
     * @param {object} targetPartitionKeyRange       - Query Target Partition key Range
     * @ignore
     */
    function (documentclient, collectionLink, query, targetPartitionKeyRange, options) {
        this.documentclient = documentclient;
        this.collectionLink = collectionLink;
        this.query = query;
        this.targetPartitionKeyRange = targetPartitionKeyRange;
        this.fetchResults = [];
        
        this.state = DocumentProducer.STATES.started;
        this.allFetched = false;
        this.err = undefined;
        
        this.previousContinuationToken = undefined;
        this.continuationToken = undefined;
        this._respHeaders = HeaderUtils.getInitialHeader();
        
        var isNameBased = Base.isLinkNameBased(collectionLink);
        var path = this.documentclient.getPathFromLink(collectionLink, "docs", isNameBased);
        var id = this.documentclient.getIdFromLink(collectionLink, isNameBased);
        
        var that = this;
        var fetchFunction = function (options, callback) {
            that.documentclient.queryFeed.call(documentclient,
                documentclient,
                path,
                "docs",
                id,
                function (result) { return result.Documents; },
                function (parent, body) { return body; },
                query,
                options,
                callback,
                that.targetPartitionKeyRange["id"]);
        };
        this.internalExecutionContext = new DefaultQueryExecutionContext(documentclient, query, options, fetchFunction);
        this.state = DocumentProducer.STATES.inProgress;
    },
 {
        /**
         * Synchronously gives the contiguous buffered results (stops at the first non result) if any
         * @returns {Object}       - buffered current items if any
         * @ignore
         */
        peekBufferedItems: function () {
            var bufferedResults = [];
            for (var i = 0, done = false; i < this.fetchResults.length && !done; i++) {
                var fetchResult = this.fetchResults[i];
                switch (fetchResult.fetchResultType) {
                    case FetchResultType.Done:
                        done = true;
                        break;
                    case FetchResultType.Exception:
                        done = true;
                        break;
                    case FetchResultType.Result:
                        bufferedResults.push(fetchResult.feedResponse);
                        break;
                }
            }
            return bufferedResults;
        },
        
        hasMoreResults: function () {
            return this.internalExecutionContext.hasMoreResults() || this.fetchResults.length != 0;
        },
        
        gotSplit: function () {
            var fetchResult = this.fetchResults[0];
            if (fetchResult.fetchResultType == FetchResultType.Exception) {
                if (this._needPartitionKeyRangeCacheRefresh(fetchResult.error)) {
                    return true;
                }
            }

            return false;
        },
        
        /**
         * Synchronously gives the buffered items if any and moves inner indices.
         * @returns {Object}       - buffered current items if any
         * @ignore
         */
        consumeBufferedItems: function () {
            var res = this._getBufferedResults();
            this.fetchResults = [];
            this._updateStates(undefined, this.continuationToken === null || this.continuationToken === undefined);
            return res;
        },
        
        _getAndResetActiveResponseHeaders: function () {
            var ret = this._respHeaders;
            this._respHeaders = HeaderUtils.getInitialHeader();
            return ret;
        },
        
        _updateStates: function (err, allFetched) {
            if (err) {
                this.state = DocumentProducer.STATES.ended;
                this.err = err
                return;
            }
            if (allFetched) {
                this.allFetched = true;   
            }
            if (this.allFetched && this.peekBufferedItems().length === 0) {
                this.state = DocumentProducer.STATES.ended;
            }
            if (this.internalExecutionContext.continuation === this.continuationToken) {
                // nothing changed
                return;
            }
            this.previousContinuationToken = this.continuationToken;
            this.continuationToken = this.internalExecutionContext.continuation;
        },
        
        _needPartitionKeyRangeCacheRefresh: function (error) {
            return (error.code === StatusCodes.Gone) && ('substatus' in error) && (error['substatus'] === SubStatusCodes.PartitionKeyRangeGone);
        },

        /**
         * Fetches and bufferes the next page of results and executes the given callback
         * @memberof DocumentProducer
         * @instance
         * @param {callback} callback - Function to execute for next page of result.
         *                              the function takes three parameters error, resources, headerResponse.
        */
        bufferMore: function (callback) {
            var that = this;
            if (that.err) {
                return callback(that.err);
            }
            
            this.internalExecutionContext.fetchMore(function (err, resources, headerResponse) {
                if (err) {
                    if (that._needPartitionKeyRangeCacheRefresh(err)) {
                        // Split just happend
                        // Buffer the error so the execution context can still get the feedResponses in the itemBuffer
                        var bufferedError = new FetchResult(undefined, err);
                        that.fetchResults.push(bufferedError);
                        // Putting a dummy result so that the rest of code flows
                        return callback(undefined, [bufferedError], headerResponse);
                    }
                    else {
                        that._updateStates(err, resources === undefined);
                        return callback(err, undefined, headerResponse);
                    }
                }

                that._updateStates(undefined, resources === undefined);
                if (resources != undefined) {
                    // some more results
                    resources.forEach(function (element) {
                        that.fetchResults.push(new FetchResult(element, undefined));
                    });
                }

                return callback(undefined, resources, headerResponse);
            });
        },
        
        /**
         * Synchronously gives the bufferend current item if any
         * @returns {Object}       - buffered current item if any
         * @ignore
         */
        getTargetParitionKeyRange: function () {
            return this.targetPartitionKeyRange;
        },

        /**
        * Execute a provided function on the next element in the DocumentProducer.
        * @memberof DocumentProducer
        * @instance
        * @param {callback} callback - Function to execute for each element. the function takes two parameters error, element.
        */
        nextItem: function (callback) {
            var that = this;
            if (that.err) {
                that._updateStates(err, undefined);
                return callback(that.err);
            }

            this.current(function (err, item, headers) {
                if (err) {
                    that._updateStates(err, item === undefined);
                    return callback(err, undefined, headers);
                }
                 
                var fetchResult = that.fetchResults.shift();
                that._updateStates(undefined, item === undefined);
                assert.equal(fetchResult.feedResponse, item);
                switch (fetchResult.fetchResultType) {
                    case FetchResultType.Done:
                        return callback(undefined, undefined, headers);
                    case FetchResultType.Exception:
                        return callback(fetchResult.error, undefined, headers);
                    case FetchResultType.Result:
                        return callback(undefined, fetchResult.feedResponse, headers);
                }
            });
        },
        
        /**
         * Retrieve the current element on the DocumentProducer.
         * @memberof DocumentProducer
         * @instance
         * @param {callback} callback - Function to execute for the current element. the function takes two parameters error, element.
         */
        current: function (callback) {
            // If something is buffered just give that
            if (this.fetchResults.length > 0) {
                var fetchResult = this.fetchResults[0];
                 //Need to unwrap fetch results
                switch (fetchResult.fetchResultType) {
                    case FetchResultType.Done:
                        return callback(undefined, undefined, this._getAndResetActiveResponseHeaders());
                    case FetchResultType.Exception:
                        return callback(fetchResult.error, undefined, this._getAndResetActiveResponseHeaders());
                    case FetchResultType.Result:
                        return callback(undefined, fetchResult.feedResponse, this._getAndResetActiveResponseHeaders());
                }
            }
            
            // If there isn't anymore items left to fetch then let the user know.
            if (this.allFetched) {
                return callback(undefined, undefined, this._getAndResetActiveResponseHeaders());
            }
            
            // If there are no more bufferd items and there are still items to be fetched then buffer more
            var that = this;
            this.bufferMore(function (err, items, headers) {
                if (err) {
                    return callback(err, undefined, headers);
                }
                
                if (items === undefined) {
                    return callback(undefined, undefined, headers);
                }
                HeaderUtils.mergeHeaders(that._respHeaders, headers);
                
                that.current(callback);
            });
        },
    },

    {
        // Static Members
        STATES: Object.freeze({ started: "started", inProgress: "inProgress", ended: "ended" })
    }
);

var FetchResultType = {
    "Done": 0,
    "Exception": 1,
    "Result": 2
};

var FetchResult = Base.defineClass(
    /**
     * Wraps fetch results for the document producer.
     * This allows the document producer to buffer exceptions so that actual results don't get flushed during splits.
     * @constructor DocumentProducer
     * @param {object} feedReponse                  - The response the document producer got back on a successful fetch
     * @param {object} error                        - The exception meant to be buffered on an unsuccessful fetch
     * @ignore
     */
    function (feedResponse, error) {
        if (feedResponse) {
            this.feedResponse = feedResponse;
            this.fetchResultType = FetchResultType.Result;
        } else {
            this.error = error;
            this.fetchResultType = FetchResultType.Exception;
        }
    },
    {
    },
    {
        DoneResult : {
            fetchResultType: FetchResultType.Done
        }
    }
);
//SCRIPT END

if (typeof exports !== "undefined") {
    module.exports = DocumentProducer;
}