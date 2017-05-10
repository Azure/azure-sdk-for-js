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
    , assert = require("assert")
    , CollectionRoutingMap = require("./inMemoryCollectionRoutingMap")
    , PartitionKeyRangeCache = require("./partitionKeyRangeCache")
    , util = require("util");

var CollectionRoutingMapFactory = CollectionRoutingMap.CollectionRoutingMapFactory;
var QueryRange = CollectionRoutingMap.QueryRange;
var _PartitionKeyRange = CollectionRoutingMap._PartitionKeyRange;

//SCRIPT START
var SmartRoutingMapProvider = Base.defineClass(
    
   /**
   * Represents a SmartRoutingMapProvider Object,  Efficiently uses PartitionKeyRangeCache and minimizes the unnecessary
   * invocation of PartitionKeyRangeCache.getOverlappingRanges()
   * @constructor SmartRoutingMapProvider
   * @param {object} documentclient                - The documentclient object.
   * @ignore
   */
    function (documentclient) {
        this._partitionKeyRangeCache = new PartitionKeyRangeCache(documentclient);
    },
    {
        _secondRangeIsAfterFirstRange: function (range1, range2) {
            assert.notEqual(range1.max, undefined, "invalid arg");
            assert.notEqual(range2.min, undefined, "invalid arg");

            if (range1.max > range2.min) {
                // r.min < #previous_r.max
                return false;
            } else {
                if (range1.max === range2.min && range1.isMaxInclusive && range2.isMinInclusive) {
                    // the inclusive ending endpoint of previous_r is the same as the inclusive beginning endpoint of r
                    // they share a point
                    return false;
                }
                return true;
            }
        },

        _isSortedAndNonOverlapping: function (ranges) {
            for (var idx = 1; idx < ranges.length; idx++) {
                var previousR = ranges[idx - 1];
                var r = ranges[idx];
                if (!this._secondRangeIsAfterFirstRange(previousR, r)) {
                    return false;
                }
            }
            return true;
        },

        _stringMax: function (a, b) {
            return (a >= b ? a : b);
        },

        _stringCompare: function(a, b) {
            return (a == b ? 0 : (a > b ? 1 : -1));
        },

        _subtractRange: function (r, partitionKeyRange) {
            var left = this._stringMax(partitionKeyRange[_PartitionKeyRange.MaxExclusive], r.min);
            var leftInclusive;
            if (this._stringCompare(left, r.min) === 0) {
                leftInclusive = r.isMinInclusive;
            } else {
                leftInclusive = false;
            }
            return new QueryRange(left, r.max, leftInclusive,
                r.isMaxInclusive);
        },

        /**
         * Given the sorted ranges and a collection, invokes the callback on the list of overlapping partition key ranges
         * @param {callback} callback - Function execute on the overlapping partition key ranges result, takes two parameters error, partition key ranges
         * @param collectionLink
         * @param sortedRanges
         * @ignore
         */
        getOverlappingRanges: function (callback, collectionLink, sortedRanges) {
            // validate if the list is non- overlapping and sorted
            if (!this._isSortedAndNonOverlapping(sortedRanges)) {
                return callback(new Error("the list of ranges is not a non-overlapping sorted ranges"), undefined);
            }

            var partitionKeyRanges = [];

            if (sortedRanges.length === 0) {
                return callback(undefined, partitionKeyRanges);
            }

            var that = this;
            this._partitionKeyRangeCache._onCollectionRoutingMap(function (err, collectionRoutingMap) {
                if (err) {
                    return callback(err, undefined);
                }

                var index = 0;
                var currentProvidedRange = sortedRanges[index];
                while (true) {
                    if (currentProvidedRange.isEmpty()) {
                        // skip and go to the next item
                        if (++index >= sortedRanges.length) {
                            return callback(undefined, partitionKeyRanges);
                        }
                        currentProvidedRange = sortedRanges[index];
                        continue;
                    }

                    var queryRange;
                    if (partitionKeyRanges.length > 0) {
                        queryRange = that._subtractRange(
                            currentProvidedRange, partitionKeyRanges[partitionKeyRanges.length - 1]);
                    } else {
                        queryRange = currentProvidedRange;
                    }

                    var overlappingRanges = collectionRoutingMap.getOverlappingRanges(queryRange);
                    assert(overlappingRanges.length > 0, util.format("error: returned overlapping ranges for queryRange %s is empty", queryRange));
                    partitionKeyRanges = partitionKeyRanges.concat(overlappingRanges);

                    var lastKnownTargetRange = QueryRange.parsePartitionKeyRange(partitionKeyRanges[partitionKeyRanges.length - 1]);
                    assert.notEqual(lastKnownTargetRange, undefined);
                    // the overlapping ranges must contain the requested range
                    assert(that._stringCompare(currentProvidedRange.max, lastKnownTargetRange.max) <= 0,
                        util.format("error: returned overlapping ranges %s does not contain the requested range %s", overlappingRanges, queryRange));

                    // the current range is contained in partitionKeyRanges just move forward
                    if (++index >= sortedRanges.length) {
                        return callback(undefined, partitionKeyRanges);
                    }
                    currentProvidedRange = sortedRanges[index];

                    while (that._stringCompare(currentProvidedRange.max, lastKnownTargetRange.max) <= 0) {
                        // the current range is covered too.just move forward
                        if (++index >= sortedRanges.length) {
                            return callback(undefined, partitionKeyRanges);
                        }
                        currentProvidedRange = sortedRanges[index];
                    }
                }
            }, collectionLink);
        }
    }
);
//SCRIPT END

if (typeof exports !== "undefined") {
    module.exports = SmartRoutingMapProvider;
}