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
    , endpointComponent = require('./endpointComponent')
    , assert = require("assert")
    , PartitionedQueryExecutionContextInfoParser = require("./partitionedQueryExecutionContextInfoParser")
    , HeaderUtils = require("./headerUtils");

var ParallelQueryExecutionContext = require("./parallelQueryExecutionContext")
    , OrderByQueryExecutionContext = require("./orderByQueryExecutionContext");

var AggregateEndpointComponent = endpointComponent.AggregateEndpointComponent
    , OrderByEndpointComponent = endpointComponent.OrderByEndpointComponent
    , TopEndpointComponent = endpointComponent.TopEndpointComponent;


//SCRIPT START
var PipelinedQueryExecutionContext = Base.defineClass(
    /**
     * Provides the PipelinedQueryExecutionContext. It piplelines top and orderby execution context if necessary
     * @constructor PipelinedQueryExecutionContext
     * @param {object} documentclient                - The documentclient object.
     * @param {SqlQuerySpec | string} query          - A SQL query.
     * @param {FeedOptions} options                  - Represents the feed options.
     * @param {callback | callback[]} fetchFunctions - A function to retrieve each page of data. An array of functions may be used to query more than one partition.
     * @param {string} [resourceLink]                - collectionLink for parallelized query execution.
     * @ignore
     */
    function (documentclient, collectionLink, query, options, partitionedQueryExecutionInfo) {
        this.documentclient = documentclient;
        this.collectionLink = collectionLink;
        this.query = query;
        this.options = options;
        this.partitionedQueryExecutionInfo = partitionedQueryExecutionInfo;
        this.endpoint = null;
        this.pageSize = options["maxItemCount"];
        if (this.pageSize === undefined) {
            this.pageSize = PipelinedQueryExecutionContext.DEFAULT_PAGE_SIZE;
        }
        
        // Pick between parallel vs order by execution context
        var sortOrders = PartitionedQueryExecutionContextInfoParser.parseOrderBy(partitionedQueryExecutionInfo);
        if (Array.isArray(sortOrders) && sortOrders.length > 0) {
            // Need to wrap orderby execution context in endpoint component, since the data is nested as a "payload" property.
            this.endpoint = new OrderByEndpointComponent(
                new OrderByQueryExecutionContext(
                    this.documentclient,
                    this.collectionLink,
                    this.query,
                    this.options,
                    this.partitionedQueryExecutionInfo));
        } else {
            this.endpoint = new ParallelQueryExecutionContext(
                this.documentclient,
                this.collectionLink,
                this.query,
                this.options,
                this.partitionedQueryExecutionInfo);
        }
        
        // If aggregate then add that to the pipeline
        var aggregates = PartitionedQueryExecutionContextInfoParser.parseAggregates(partitionedQueryExecutionInfo);
        if (Array.isArray(aggregates) && aggregates.length > 0) {
            this.endpoint = new AggregateEndpointComponent(this.endpoint, aggregates);
        }
        
        // If top then add that to the pipeline
        var top = PartitionedQueryExecutionContextInfoParser.parseTop(partitionedQueryExecutionInfo);
        if (typeof (top) === 'number') {
            this.endpoint = new TopEndpointComponent(this.endpoint, top);
        }
    },
    {
        nextItem: function (callback) {
            return this.endpoint.nextItem(callback);
        },

        current: function (callback) {
            return this.endpoint.current(callback);
        },

        hasMoreResults: function (callback) {
            return this.endpoint.hasMoreResults(callback);
        },

        fetchMore: function (callback) {
            // if the wrapped endpoint has different implementation for fetchMore use that
            // otherwise use the default implementation
            if (typeof this.endpoint.fetchMore === 'function') {
                return this.endpoint.fetchMore(callback);
            } else {
                this._fetchBuffer = [];
                this._fetchMoreRespHeaders = HeaderUtils.getInitialHeader();
                return this._fetchMoreImplementation(callback);
            }
        },

        _fetchMoreImplementation: function (callback) {
            var that = this;
            this.endpoint.nextItem(function (err, item, headers) {
                HeaderUtils.mergeHeaders(that._fetchMoreRespHeaders, headers);
                if (err) {
                    return callback(err, undefined, that._fetchMoreRespHeaders);
                }

                if (item === undefined) {
                    // no more results
                    if (that._fetchBuffer.length === 0) {
                        return callback(undefined, undefined, that._fetchMoreRespHeaders);
                    } else {
                        // Just give what we have
                        var temp = that._fetchBuffer;
                        that._fetchBuffer = [];
                        return callback(undefined, temp, that._fetchMoreRespHeaders);
                    }
                } else {
                    // append the result
                    that._fetchBuffer.push(item);
                    if (that._fetchBuffer.length >= that.pageSize) {
                        // fetched enough results
                        var temp = that._fetchBuffer.slice(0, that.pageSize);
                        that._fetchBuffer = that._fetchBuffer.splice(that.pageSize);
                        return callback(undefined, temp, that._fetchMoreRespHeaders);
                    } else {
                        // recursively fetch more
                        that._fetchMoreImplementation(callback);
                    }
                }
            });
        },
    },
    {
        DEFAULT_PAGE_SIZE: 10
    }
);
//SCRIPT END

if (typeof exports !== "undefined") {
    module.exports = PipelinedQueryExecutionContext;
}
