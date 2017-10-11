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
    , ParallelQueryExecutionContextBase = require('./parallelQueryExecutionContextBase')
    , OrderByDocumentProducerComparator = require('./orderByDocumentProducerComparator')
    , assert = require('assert');

//SCRIPT START

var OrderByQueryExecutionContext = Base.derive(
    ParallelQueryExecutionContextBase,
    /**
     * Provides the OrderByQueryExecutionContext.
     * This class is capable of handling orderby queries and dervives from ParallelQueryExecutionContextBase.
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
        // Calling on base class constructor
        ParallelQueryExecutionContextBase.call(this, documentclient, collectionLink, query, options, partitionedQueryExecutionInfo);
        this._orderByComparator = new OrderByDocumentProducerComparator(this.sortOrders);
    },
    {
        // Instance members are inherited
        
        // Overriding documentProducerComparator for OrderByQueryExecutionContexts
        /**
         * Provides a Comparator for document producers which respects orderby sort order.
         * @returns {object}        - Comparator Function
         * @ignore
         */
        documentProducerComparator: function (docProd1, docProd2) {
            return this._orderByComparator.compare(docProd1, docProd2);
        },
    },
    {
        // Static members are inherited
    }
);

//SCRIPT END

if (typeof exports !== "undefined") {
    module.exports = OrderByQueryExecutionContext;
}