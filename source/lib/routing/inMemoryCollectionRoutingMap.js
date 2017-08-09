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
    , _ = require("underscore")
    , bs = require("binary-search-bounds")
    , assert = require("assert");

//SCRIPT START
var _PartitionKeyRange = {
    //Partition Key Range Constants
    MinInclusive : "minInclusive",
    MaxExclusive : "maxExclusive",
    Id : "id"
};

var _QueryRangeConstants = {
    //Partition Key Range Constants
    MinInclusive: "minInclusive",
    MaxExclusive: "maxExclusive",
    min: "min"
};

var _Constants = {
    MinimumInclusiveEffectivePartitionKey: "",
    MaximumExclusiveEffectivePartitionKey: "FF",
};

var QueryRange = Base.defineClass(
    /**
     * Represents a QueryRange. 
     * @constructor QueryRange
     * @param {string} rangeMin                - min
     * @param {string} rangeMin                - max
     * @param {boolean} isMinInclusive         - isMinInclusive
     * @param {boolean} isMaxInclusive         - isMaxInclusive
     * @ignore
     */
    function (rangeMin, rangeMax, isMinInclusive, isMaxInclusive) {
        this.min = rangeMin;
        this.max = rangeMax;
        this.isMinInclusive = isMinInclusive;
        this.isMaxInclusive = isMaxInclusive;
    }, 
    {
        overlaps: function (other) {
            var range1 = this;
            var range2 = other;
            if (range1 === undefined || range2 === undefined) return false;
            if (range1.isEmpty() || range2.isEmpty()) return false;

            if (range1.min <= range2.max || range2.min <= range1.max) {
                if ((range1.min === range2.max && !(range1.isMinInclusive && range2.isMaxInclusive))
                    || (range2.min === range1.max && !(range2.isMinInclusive && range1.isMaxInclusive))) {
                    return false;
                }
                return true;
            }
            return false;
        },

        isEmpty: function () {
            return (!(this.isMinInclusive && this.isMaxInclusive)) && this.min === this.max;
        }
    }, 
    {
        /**
         * Parse a QueryRange from a partitionKeyRange
         * @returns QueryRange
         * @ignore
         */
        parsePartitionKeyRange: function (partitionKeyRange) {
            return new QueryRange(partitionKeyRange[_PartitionKeyRange.MinInclusive], partitionKeyRange[_PartitionKeyRange.MaxExclusive],
                true, false);
        },
        /**
         * Parse a QueryRange from a dictionary
         * @returns QueryRange
         * @ignore
         */
        parseFromDict: function (queryRangeDict) {
            return new QueryRange(queryRangeDict.min, queryRangeDict.max, queryRangeDict.isMinInclusive, queryRangeDict.isMaxInclusive);
        }
    }
);

var InMemoryCollectionRoutingMap = Base.defineClass(
    /**
     * Represents a InMemoryCollectionRoutingMap Object, Stores partition key ranges in an efficient way with some additional information and provides
     * convenience methods for working with set of ranges.
     */
    function (rangeById, rangeByInfo, orderedPartitionKeyRanges, orderedPartitionInfo, collectionUniqueId) {
        this._rangeById = rangeById;
        this._rangeByInfo = rangeByInfo;
        this._orderedPartitionKeyRanges = orderedPartitionKeyRanges;
        this._orderedRanges = orderedPartitionKeyRanges.map(
            function (pkr) {
                return new QueryRange(
                    pkr[_PartitionKeyRange.MinInclusive], pkr[_PartitionKeyRange.MaxExclusive], true, false);
            });
        this._orderedPartitionInfo = orderedPartitionInfo;
        this._collectionUniqueId = collectionUniqueId;
    },
    {

        getOrderedParitionKeyRanges: function () {
            return this._orderedPartitionKeyRanges;
        },

        getRangeByEffectivePartitionKey: function (effectivePartitionKeyValue) {

            if (_Constants.MinimumInclusiveEffectivePartitionKey === effectivePartitionKeyValue) {
                return this._orderedPartitionKeyRanges[0];
            }

            if (_Constants.MaximumExclusiveEffectivePartitionKey === effectivePartitionKeyValue) {
                return undefined;
            }

            var sortedLow = this._orderedRanges.map(
                function (r) {
                    return { v: r.min, b: !r.isMinInclusive };
                });

            var index = bs.le(sortedLow, { v: effectivePartitionKeyValue, b: true }, this._vbCompareFunction);
            // that's an error
            assert.ok(index >= 0, "error in collection routing map, queried partition key is less than the start range.");
           
            return this._orderedPartitionKeyRanges[index];
        },

        _vbCompareFunction: function (x, y) {
            if (x.v > y.v) return 1;
            if (x.v < y.v) return -1;
            if (x.b > y.b) return 1;
            if (x.b < y.b) return -1;
            return 0;
        },

        getRangeByPartitionKeyRangeId: function (partitionKeyRangeId) {

            var t = this._rangeById[partitionKeyRangeId];

            if (t === undefined) {
                return undefined;
            }
            return t[0];
        },

        getOverlappingRanges: function (providedQueryRanges) {

            if (!_.isArray(providedQueryRanges)) {
                return this.getOverlappingRanges([providedQueryRanges]);
            }
            
            var minToPartitionRange = {};
            var sortedLow = this._orderedRanges.map(
                function (r) {
                    return { v: r.min, b: !r.isMinInclusive };
                });
            var sortedHigh = this._orderedRanges.map(
                function (r) {
                    return { v: r.max, b: r.isMaxInclusive };
                });

            // this for loop doesn't invoke any async callback
            for (var i = 0; i < providedQueryRanges.length; i++) {
                var queryRange = providedQueryRanges[i];
                if (queryRange.isEmpty()) {
                    continue;
                }
                var minIndex = bs.le(sortedLow, { v: queryRange.min, b: !queryRange.isMinInclusive }, this._vbCompareFunction);
                assert.ok(minIndex >= 0, "error in collection routing map, queried value is less than the start range.");

                var maxIndex = bs.ge(sortedHigh, { v: queryRange.max, b: queryRange.isMaxInclusive }, this._vbCompareFunction);
                assert.ok(maxIndex < sortedHigh.length, "error in collection routing map, queried value is greater than the end range.");

                // the for loop doesn't invoke any async callback
                for (var j = minIndex; j < maxIndex + 1; j++) {
                    if (queryRange.overlaps(this._orderedRanges[j])) {
                        minToPartitionRange[this._orderedPartitionKeyRanges[j][_PartitionKeyRange.MinInclusive]] = this._orderedPartitionKeyRanges[j];
                    }
                } 
            }

            var overlappingPartitionKeyRanges = _.values(minToPartitionRange);

            var getKey = function (r) {
                return r[_PartitionKeyRange.MinInclusive];
            };
            return _.sortBy(overlappingPartitionKeyRanges, getKey);
        }
    }
);

var CollectionRoutingMapFactory = Base.defineClass(undefined, undefined,
    {
        createCompleteRoutingMap: function (partitionKeyRangeInfoTuppleList, collectionUniqueId) {
            var rangeById = {};
            var rangeByInfo = {};

            var sortedRanges = [];

            // the for loop doesn't invoke any async callback
            for (var index = 0; index < partitionKeyRangeInfoTuppleList.length; index++) {
                var r = partitionKeyRangeInfoTuppleList[index];
                rangeById[r[0][_PartitionKeyRange.Id]] = r;
                rangeByInfo[r[1]] = r[0];
                sortedRanges.push(r);
            }

            sortedRanges = _.sortBy(sortedRanges,
                function (r) {
                    return r[0][_PartitionKeyRange.MinInclusive];
                });
            var partitionKeyOrderedRange = sortedRanges.map(function (r) { return r[0]; });
            var orderedPartitionInfo = sortedRanges.map(function (r) { return r[1]; });

            if (!this._isCompleteSetOfRange(partitionKeyOrderedRange)) return undefined;
            return new InMemoryCollectionRoutingMap(rangeById, rangeByInfo, partitionKeyOrderedRange, orderedPartitionInfo, collectionUniqueId);
        },

        _isCompleteSetOfRange: function (partitionKeyOrderedRange) {
            var isComplete = false;
            if (partitionKeyOrderedRange.length > 0) {
                var firstRange = partitionKeyOrderedRange[0];
                var lastRange = partitionKeyOrderedRange[partitionKeyOrderedRange.length - 1];
                isComplete = (firstRange[_PartitionKeyRange.MinInclusive] === _Constants.MinimumInclusiveEffectivePartitionKey);
                isComplete &= (lastRange[_PartitionKeyRange.MaxExclusive] === _Constants.MaximumExclusiveEffectivePartitionKey);

                for (var i = 1; i < partitionKeyOrderedRange.length; i++) {
                    var previousRange = partitionKeyOrderedRange[i - 1];
                    var currentRange = partitionKeyOrderedRange[i];
                    isComplete &= (previousRange[_PartitionKeyRange.MaxExclusive] == currentRange[_PartitionKeyRange.MinInclusive]);

                    if (!isComplete) {
                        if (previousRange[_PartitionKeyRange.MaxExclusive] > currentRange[_PartitionKeyRange.MinInclusive] ) {
                            throw Error("Ranges overlap");
                        }
                        break;
                    }
                }
            }
            return isComplete;
        }
    }
);
//SCRIPT END

if (typeof exports !== "undefined") {
    exports.InMemoryCollectionRoutingMap = InMemoryCollectionRoutingMap;
    exports.CollectionRoutingMapFactory = CollectionRoutingMapFactory;
    exports.QueryRange = QueryRange;
    exports._PartitionKeyRange = _PartitionKeyRange;
}