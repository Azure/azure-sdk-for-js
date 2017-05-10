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

var Base = require('../base');
var ConsistentHashRing = require('./consistentHashRing.js').ConsistentHashRing;

var HashPartitionResolver = Base.defineClass(
    /**
     * HashPartitionResolver implements partitioning based on the value of a hash function, 
     * allowing you to evenly distribute requests and data across a number of partitions for
     * the Azure DocumentDB database service.
     * @class HashPartitionResolver
     * @param {string | function} partitionKeyExtractor   - If partitionKeyExtractor is a string, it should be the name of the property in the document to execute the hashing on.
     *                                                      If partitionKeyExtractor is a function, it should be a function to extract the partition key from an object.
     **/
    function (partitionKeyExtractor, collectionLinks, options) {
        HashPartitionResolver._throwIfInvalidPartitionKeyExtractor(partitionKeyExtractor);
        HashPartitionResolver._throwIfInvalidCollectionLinks(collectionLinks);
        this.partitionKeyExtractor = partitionKeyExtractor;
        
        options = options || {};
        this.consistentHashRing = new ConsistentHashRing(collectionLinks, options);
        this.collectionLinks = collectionLinks;
    }, {
        /**
         * Extracts the partition key from the specified document using the partitionKeyExtractor
         * @memberof HashPartitionResolver
         * @instance
         * @param {object} document - The document from which to extract the partition key.
         * @returns {object} 
         **/
        getPartitionKey: function (document) {
            return (typeof this.partitionKeyExtractor === "string")
                ? document[this.partitionKeyExtractor]
                : this.partitionKeyExtractor(document);
        },
        /**
         * Given a partition key, returns a list of collection links to read from.
         * @memberof HashPartitionResolver
         * @instance
         * @param {any} partitionKey - The partition key used to determine the target collection for query
         **/
        resolveForRead: function (partitionKey) {
            if (partitionKey === undefined || partitionKey === null) {
                return this.collectionLinks;
            }

            return [this._resolve(partitionKey)];            
        },
        /**
         * Given a partition key, returns the correct collection link for creating a document.
         * @memberof HashPartitionResolver
         * @instance
         * @param {any} partitionKey - The partition key used to determine the target collection for create
         * @returns {string}         - The target collection link that will be used for document creation.
         **/
        resolveForCreate: function (partitionKey) {
            return this._resolve(partitionKey);
        },
        /** @ignore */
        _resolve: function (partitionKey) {
            HashPartitionResolver._throwIfInvalidPartitionKey(partitionKey);
            return this.consistentHashRing.getNode(partitionKey);
        }
    }, {
        /** @ignore */
        _throwIfInvalidPartitionKeyExtractor: function (partitionKeyExtractor) {
            if (partitionKeyExtractor === undefined || partitionKeyExtractor === null) {
                throw new Error("partitionKeyExtractor cannot be null or undefined");
            }
            
            if (typeof partitionKeyExtractor !== "string" && typeof partitionKeyExtractor !== "function") {
                throw new Error("partitionKeyExtractor must be either a 'string' or a 'function'");
            }
        },
        /** @ignore */
        _throwIfInvalidPartitionKey: function (partitionKey) {
            var partitionKeyType = typeof partitionKey;
            if (partitionKeyType !== "string") {
                throw new Error("partitionKey must be a 'string'");
            }
        },
        /** @ignore */
        _throwIfInvalidCollectionLinks: function (collectionLinks) {
            if (!Array.isArray(collectionLinks)) {
                throw new Error("collectionLinks must be an array.");
            }
            
            if (collectionLinks.some(function (collectionLink) { return !Base._isValidCollectionLink(collectionLink); })) {
                throw new Error("All elements of collectionLinks must be collection links.");
            }
        }
    });

//SCRIPT END

if (typeof exports !== "undefined") {
    exports.HashPartitionResolver = HashPartitionResolver;
}