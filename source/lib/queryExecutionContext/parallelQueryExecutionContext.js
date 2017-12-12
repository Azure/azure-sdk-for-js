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
    , Constants = require("../constants")
    , InMemoryCollectionRoutingMap = require("../routing/inMemoryCollectionRoutingMap")
    , HeaderUtils = require("./headerUtils")
    , assert = require('assert');

var _PartitionKeyRange = InMemoryCollectionRoutingMap._PartitionKeyRange;

//SCRIPT START

var ParallelQueryExecutionContext = Base.derive(
    ParallelQueryExecutionContextBase,
    /**
     * Provides the ParallelQueryExecutionContext.
     * This class is capable of handling parallelized queries and dervives from ParallelQueryExecutionContextBase.
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
    },
    {
        // Instance members are inherited
        
        // Overriding documentProducerComparator for ParallelQueryExecutionContexts
        /**
         * Provides a Comparator for document producers using the min value of the corresponding target partition.
         * @returns {object}        - Comparator Function
         * @ignore
         */
        documentProducerComparator: function (docProd1, docProd2) {
            var a = docProd1.getTargetParitionKeyRange()['minInclusive'];
            var b = docProd2.getTargetParitionKeyRange()['minInclusive'];
            return (a == b ? 0 : (a > b ? 1 : -1));
        },

        _buildContinuationTokenFrom: function (documentProducer) {
            // given the document producer constructs the continuation token
            if (documentProducer.allFetched && documentProducer.peekBufferedItems().length == 0) {
                return undefined;
            }
            
            
            var min = documentProducer.targetPartitionKeyRange[_PartitionKeyRange.MinInclusive];
            var max = documentProducer.targetPartitionKeyRange[_PartitionKeyRange.MaxExclusive];
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
                // has unused buffered item so use the previous continuation token
                documentProducerContinuationToken = documentProducer.previousContinuationToken;
            } else {
                documentProducerContinuationToken = documentProducer.continuationToken;
            }
            
            return {
                'token': withNullDefault(documentProducerContinuationToken),
                'range': range
            };
        },
    },
    {
        // Static members are inherited
    }
);

//SCRIPT END

if (typeof exports !== "undefined") {
    module.exports = ParallelQueryExecutionContext;
}