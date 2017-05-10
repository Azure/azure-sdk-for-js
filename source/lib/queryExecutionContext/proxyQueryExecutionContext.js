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
    , ParallelQueryExecutionContext = require("./parallelQueryExecutionContext")
    , endpointComponent = require('./endpointComponent')
    , assert = require("assert")
    , QueryExecutionInfoParser = require("./partitionedQueryExecutionContextInfoParser")
    , PipelinedQueryExecutionContext = require("./pipelinedQueryExecutionContext");

//SCRIPT START
var ProxyQueryExecutionContext = Base.defineClass(
    /**
     * Represents a ProxyQueryExecutionContext Object. If the query is a partitioned query which can be parallelized it switches the execution context.
     * @constructor ProxyQueryExecutionContext
     * @param {object} documentclient                - The documentclient object.
     * @param {SqlQuerySpec | string} query          - A SQL query.
     * @param {FeedOptions} options                  - Represents the feed options.
     * @param {callback | callback[]} fetchFunctions - A function to retrieve each page of data. An array of functions may be used to query more than one partition.
     * @param {string} [resourceLink]                - collectionLink for parallelized query execution.
     * @ignore
    */
    function (documentclient, query, options, fetchFunctions, resourceLink) {
        this.documentclient = documentclient;
        this.query = query;
        this.fetchFunctions = fetchFunctions;
        // clone options
        this.options = JSON.parse(JSON.stringify(options || {}));
        this.resourceLink = resourceLink;
        this.queryExecutionContext = new DefaultQueryExecutionContext(this.documentclient, this.query, this.options, this.fetchFunctions);
    },
    {

        /**
         * Execute a provided function on the next element in the ProxyQueryExecutionContext.
         * @memberof ProxyQueryExecutionContext
         * @instance
         * @param {callback} callback - Function to execute for each element. the function takes two parameters error, element.
         */
        nextItem: function (callback) {
            var that = this;
            this.queryExecutionContext.nextItem(function (err, resources, headers) {

                if (err) {
                    if (that._hasPartitionedExecutionInfo(err)) {
                        // if that's a partitioned execution info switches the execution context
                        var partitionedExecutionInfo = that._getParitionedExecutionInfo(err);
                        that.queryExecutionContext = that._createPipelinedExecutionContext(partitionedExecutionInfo);
                        return that.nextItem(callback);
                    } else {
                        return callback(err, undefined, headers);
                    }
                } else {
                    callback(undefined, resources, headers);
                }
            });
        },

        _createPipelinedExecutionContext: function (partitionedExecutionInfo) {

            assert.notStrictEqual(this.resourceLink, undefined, "for top/orderby resourceLink is required.");

            assert(!Array.isArray(this.resourceLink) || this.resourceLink.length === 1,
                "for top/orderby exactly one collectionLink is required");

            var collectionLink = undefined;
            if (Array.isArray(this.resourceLink)) {
                collectionLink = this.resourceLink[0];
            } else {
                collectionLink = this.resourceLink;
            }

            var parallelQueryExecutionContext = new ParallelQueryExecutionContext(this.documentclient,
                Array.isArray(this.resourceLink) ? this.resourceLink[0] : this.resourceLink, this.query,
                this.options, partitionedExecutionInfo);
            return new PipelinedQueryExecutionContext(this.client, this.options,
                parallelQueryExecutionContext, partitionedExecutionInfo);
        },

        /**
         * Retrieve the current element on the ProxyQueryExecutionContext.
         * @memberof ProxyQueryExecutionContext
         * @instance
         * @param {callback} callback - Function to execute for the current element. the function takes two parameters error, element.
         */
        current: function (callback) {
            var that = this;
            this.queryExecutionContext.current(function (err, resources, headers) {

                if (err) {
                    if (that._hasPartitionedExecutionInfo(err)) {
                        // if that's a partitioned execution info switches the execution context
                        var partitionedExecutionInfo = that._getParitionedExecutionInfo(err);
                        that.queryExecutionContext = that._createPipelinedExecutionContext(partitionedExecutionInfo);
                        return that.current(callback);
                    } else {
                        return callback(err, undefined, headers);
                    }
                } else {
                    callback(undefined, resources, headers);
                }
            });
        },

        /**
         * Determine if there are still remaining resources to process.
         * @memberof ProxyQueryExecutionContext
         * @instance
         * @returns {Boolean} true if there is other elements to process in the ProxyQueryExecutionContext.
         */
        hasMoreResults: function () {
            return this.queryExecutionContext.hasMoreResults();
        },

        fetchMore: function (callback) {
            var that = this;

            this.queryExecutionContext.fetchMore(function (err, resources, headers) {
                if (err) {
                    if (that._hasPartitionedExecutionInfo(err)) {
                        // if that's a partitioned execution info switches the execution context
                        var partitionedExecutionInfo = that._getParitionedExecutionInfo(err);
                        that.queryExecutionContext = that._createPipelinedExecutionContext(partitionedExecutionInfo);
                        return that.queryExecutionContext.fetchMore(callback);
                    } else {
                        return callback(err, undefined, headers);
                    }
                } else {
                    callback(undefined, resources, headers);
                }
            });
        },

        _hasPartitionedExecutionInfo: function (error) {
            return (error.code === 400) && ('substatus' in error) && (error['substatus'] === 1004);
        },

        _getParitionedExecutionInfo: function (error) {

            return JSON.parse(JSON.parse(error.body).additionalErrorInfo);
        },
    }
);
//SCRIPT END

if (typeof exports !== "undefined") {
    module.exports = ProxyQueryExecutionContext;
}