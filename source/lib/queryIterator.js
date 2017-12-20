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

var Base = require("./base"),
    Constants = require("./constants"),
    ProxyQueryExecutionContext = require("./queryExecutionContext/proxyQueryExecutionContext");

//SCRIPT START
var QueryIterator = Base.defineClass(
    /**
    * Represents a QueryIterator Object, an implmenetation of feed or query response that enables traversal and iterating over the response
    * in the Azure Cosmos DB database service.
    * @class QueryIterator
    * @param {object} documentclient                - The documentclient object.
    * @param {SqlQuerySpec | string} query          - A SQL query.
    * @param {FeedOptions} options                  - Represents the feed options.
    * @param {callback | callback[]} fetchFunctions - A function to retrieve each page of data. An array of functions may be used to query more than one partition.
    * @param {string} [resourceLink]                - An optional parameter that represents the resourceLink (will be used in orderby/top/parallel query)
    */
    function (documentclient, query, options, fetchFunctions, resourceLink) {

        this.documentclient = documentclient;
        this.query = query;
        this.fetchFunctions = fetchFunctions;
        this.options = options;
        this.resourceLink = resourceLink;
        this.queryExecutionContext = this._createQueryExecutionContext();
    },
    {
        /**
         * Execute a provided function once per feed element.
         * @memberof QueryIterator
         * @instance
         * @param {callback} callback - Function to execute for each element. the function takes two parameters error, element.
         * Note: the last element the callback will be called on will be undefined.
         * If the callback explicitly returned false, the loop gets stopped.
         */
        forEach: function(callback) {
            this.reset();
            this._forEachImplementation(callback);
        },

        /**
        * Execute a provided function on the next element in the QueryIterator.
        * @memberof QueryIterator
        * @instance
        * @param {callback} callback - Function to execute for each element. the function takes two parameters error, element.
        */
        nextItem: function (callback) {
            this.queryExecutionContext.nextItem(callback);
        },

        /**
         * Retrieve the current element on the QueryIterator.
         * @memberof QueryIterator
         * @instance
         * @param {callback} callback - Function to execute for the current element. the function takes two parameters error, element.
         */
        current: function(callback) {
            this.queryExecutionContext.current(callback);
        },

        /**
         * @deprecated Instead check if callback(undefined, undefined) is invoked by nextItem(callback) or current(callback)
         *
         * Determine if there are still remaining resources to processs based on the value of the continuation token or the elements remaining on the current batch in the QueryIterator.
         * @memberof QueryIterator
         * @instance
         * @returns {Boolean} true if there is other elements to process in the QueryIterator.
         */
        hasMoreResults: function () {
            return this.queryExecutionContext.hasMoreResults();
        },

        /**
         * Retrieve all the elements of the feed and pass them as an array to a function
         * @memberof QueryIterator
         * @instance
         * @param {callback} callback - Function execute on the feed response, takes two parameters error, resourcesList
         */
        toArray: function (callback) {
            this.reset();
            this.toArrayTempResources = [];
            this._toArrayImplementation(callback);
        },

        /**
         * Retrieve the next batch of the feed and pass them as an array to a function
         * @memberof QueryIterator
         * @instance
         * @param {callback} callback - Function execute on the feed response, takes two parameters error, resourcesList
         */
        executeNext: function(callback) {
            this.queryExecutionContext.fetchMore(function(err, resources, responseHeaders) {
                if (err) {
                    return callback(err, undefined, responseHeaders);
                }

                callback(undefined, resources, responseHeaders);
            });
        },

        /**
         * Reset the QueryIterator to the beginning and clear all the resources inside it
         * @memberof QueryIterator
         * @instance
         */
        reset: function() {
            this.queryExecutionContext = this._createQueryExecutionContext();
        },

        /** @ignore */
        _toArrayImplementation: function(callback) {
            var that = this;

            this.queryExecutionContext.nextItem(function (err, resource, headers) {

                if (err) {
                    return callback(err, undefined, headers);
                }
                // concatinate the results and fetch more
                that.toArrayLastResHeaders = headers;

                if (resource === undefined) {

                    // no more results
                    return callback(undefined, that.toArrayTempResources, that.toArrayLastResHeaders);
                }

                that.toArrayTempResources.push(resource);

                setImmediate(function () {
                    that._toArrayImplementation(callback);
                });
            });
        },

        /** @ignore */
        _forEachImplementation: function (callback) {
            var that = this;
            this.queryExecutionContext.nextItem(function (err, resource, headers) {
                if (err) {
                    return callback(err, undefined, headers);
                }

                if (resource === undefined) {
                    // no more results. This is last iteration
                    return callback(undefined, undefined, headers);
                }

                if (callback(undefined, resource, headers) === false) {
                    // callback instructed to stop further iteration
                    return;
                }

                // recursively call itself to iterate to the remaining elements
                setImmediate(function () {
                    that._forEachImplementation(callback);
                });
            });
        },

        /** @ignore */
        _createQueryExecutionContext: function () {
            return new ProxyQueryExecutionContext(this.documentclient, this.query, this.options, this.fetchFunctions, this.resourceLink);
        }
    }
);
//SCRIPT END

if (typeof exports !== "undefined") {
    module.exports = QueryIterator;
}