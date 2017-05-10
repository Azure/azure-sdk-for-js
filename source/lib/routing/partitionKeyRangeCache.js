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
    , CollectionRoutingMap = require("./inMemoryCollectionRoutingMap");

var CollectionRoutingMapFactory = CollectionRoutingMap.CollectionRoutingMapFactory;

//SCRIPT START
var PartitionKeyRangeCache = Base.defineClass(
    
    /**
     * Represents a PartitionKeyRangeCache. PartitionKeyRangeCache provides list of effective partition key ranges for a collection.
     * This implementation loads and caches the collection routing map per collection on demand.
     * @constructor PartitionKeyRangeCache
     * @param {object} documentclient                - The documentclient object.
     * @ignore
     */
    function (documentclient) {
        this.documentclient = documentclient;
        this.collectionRoutingMapByCollectionId = {};
        this.sem = require("semaphore")(1);
    },
    {
        /**
         * Finds or Instantiates the requested Collection Routing Map and invokes callback
         * @param {callback} callback                - Function to execute for the collection routing map. the function takes two parameters error, collectionRoutingMap.
         * @param {string} collectionLink            - Requested collectionLink
         * @ignore
         */
        _onCollectionRoutingMap: function (callback, collectionLink) {
            var isNameBased = Base.isLinkNameBased(collectionLink);
            var collectionId = this.documentclient.getIdFromLink(collectionLink, isNameBased);

            var collectionRoutingMap = this.collectionRoutingMapByCollectionId[collectionId];
            if (collectionRoutingMap === undefined) {
                // attempt to consturct collection routing map
                var that = this;
                var semaphorizedFuncCollectionMapInstantiator = function () {
                    var collectionRoutingMap = that.collectionRoutingMapByCollectionId[collectionId];
                    if (collectionRoutingMap === undefined) {
                        var partitionKeyRangesIterator = that.documentclient.readPartitionKeyRanges(collectionLink);
                        partitionKeyRangesIterator.toArray(function (err, resources) {
                            if (err) {
                                return callback(err, undefined);
                            }

                            collectionRoutingMap = CollectionRoutingMapFactory.createCompleteRoutingMap(
                                resources.map(function (r) { return [r, true]; }),
                                collectionId);

                            that.collectionRoutingMapByCollectionId[collectionId] = collectionRoutingMap;
                            that.sem.leave();
                            return callback(undefined, collectionRoutingMap);
                        });

                    } else {
                        // sanity gaurd 
                        that.sem.leave();
                        return callback(undefined, collectionRoutingMap.getOverlappingRanges(partitionKeyRanges));
                    }
                };

                // We want only one attempt to construct collectionRoutingMap so we pass the consturction in the semaphore take
                this.sem.take(semaphorizedFuncCollectionMapInstantiator);

            } else {
                callback(undefined, collectionRoutingMap);
            }
        }, 

        /**
         * Given the query ranges and a collection, invokes the callback on the list of overlapping partition key ranges
         * @param {callback} callback - Function execute on the overlapping partition key ranges result, takes two parameters error, partition key ranges
         * @param collectionLink
         * @param queryRanges
         * @ignore
         */
        getOverlappingRanges: function (callback, collectionLink, queryRanges) {
            this._onCollectionRoutingMap(function (err, collectionRoutingMap) {
                if (err) {
                    return callback(err, undefined);
                }
                return callback(undefined, collectionRoutingMap.getOverlappingRanges(queryRanges));
            }, collectionLink);
        }
    }
);
//SCRIPT END

if (typeof exports !== "undefined") {
    module.exports = PartitionKeyRangeCache;
}