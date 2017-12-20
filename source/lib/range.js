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

var Base = require("./base");

//SCRIPT START
var Range = Base.defineClass(
    /**
     * Represents a range object used by the RangePartitionResolver in the Azure Cosmos DB database service.
     * @class Range
     * @param {object} options                   - The Range constructor options.
     * @param {any} options.low                  - The low value in the range.
     * @param {any} options.high                 - The high value in the range.
     **/
    function(options) {
        if (options === undefined) {
            options = {};
        }
        if (options === null) {
            throw new Error("Invalid argument: 'options' is null");
        }
        if (typeof options !== "object") {
            throw new Error("Invalid argument: 'options' is not an object");
        }
        if (options.high === undefined) {
            options.high = options.low;
        }
        this.low = options.low;
        this.high = options.high;
        Object.freeze(this);
    },
    {
        /** @ignore */
        _compare: function (x, y, compareFunction) {
            // Same semantics as Array.sort
            // http://www.ecma-international.org/ecma-262/6.0/#sec-sortcompare
            if (x === undefined && y === undefined)
                return 0;
            if (x === undefined)
                return 1;
            if (y === undefined)
                return -1;
            if (compareFunction !== undefined) {
                var v = Number(compareFunction(x, y));
                if (v === NaN)
                    return 0;
                return v;
            }
            var xString = String(x);
            var yString = String(y);
            if (xString < yString)
                return -1;
            if (xString > yString)
                return 1;
            return 0;
        },

        /** @ignore */
        _contains: function (other, compareFunction) {
            if (Range._isRange(other)) {
                return this._containsRange(other, compareFunction);
            }
            else {
                return this._containsPoint(other, compareFunction);
            }
        },

        /** @ignore */
        _containsPoint: function (point, compareFunction) {
            if (this._compare(point, this.low, compareFunction) >= 0 && this._compare(point, this.high, compareFunction) <= 0) {
                return true;
            }
            return false;
        },

        /** @ignore */
        _containsRange: function (other, compareFunction) {
            if (this._compare(other.low, this.low, compareFunction) >= 0 && this._compare(other.high, this.high, compareFunction) <= 0) {
                return true;
            }
            return false;
        },

        /** @ignore */
        _intersect: function (other, compareFunction) {
            if (other === undefined || other === null) {
                throw new Error("Invalid Argument: 'other' is undefined or null");
            }
            var maxLow = this._compare(this.low, other.low, compareFunction) >= 0 ? this.low : other.low;
            var minHigh = this._compare(this.high, other.high, compareFunction) <= 0 ? this.high : other.high;
            if (this._compare(maxLow, minHigh, compareFunction) <= 0) {
                return true;
            }
            return false;
        },

        /** @ignore */
        _toString: function () {
            return String(this.low) + "," + String(this.high);
        }
    },
    {
        /** @ignore */
        _isRange: function (pointOrRange) {
            if (pointOrRange === undefined) {
                return false;
            }
            if (pointOrRange === null) {
                return false;
            }
            if (typeof pointOrRange !== "object") {
                return false;
            }
            return ("low" in pointOrRange && "high" in pointOrRange);
        }
    }
);

var RangePartitionResolver = Base.defineClass(
    /**
     * RangePartitionResolver implements partitioning using a partition map of ranges of values to a collection link in the Azure Cosmos DB database service.
     * @class RangePartitionResolver
     * @param {string | function} partitionKeyExtractor   - If partitionKeyExtractor is a string, it should be the name of the property in the document to execute the hashing on.
     *                                                      If partitionKeyExtractor is a function, it should be a function to extract the partition key from an object.
     * @param {Array} partitionKeyMap                     - The map from Range to collection link that is used for partitioning requests.
     * @param {function} compareFunction                  - Optional function that accepts two arguments x and y and returns a negative value if x < y, zero if x = y, or a positive value if x > y.
     **/
    function(partitionKeyExtractor, partitionKeyMap, compareFunction) {
        if (partitionKeyExtractor === undefined || partitionKeyExtractor === null) {
            throw new Error("partitionKeyExtractor cannot be null or undefined");
        }
        if (typeof partitionKeyExtractor !== "string" && typeof partitionKeyExtractor !== "function") {
            throw new Error("partitionKeyExtractor must be either a 'string' or a 'function'");
        }
        if (partitionKeyMap === undefined || partitionKeyMap === null) {
            throw new Error("partitionKeyMap cannot be null or undefined");
        }
        if (!(Array.isArray(partitionKeyMap))) {
            throw new Error("partitionKeyMap has to be an Array");
        }
        var allMapEntriesAreValid = partitionKeyMap.every(function (mapEntry) {
            if ((mapEntry === undefined) || mapEntry === null) {
                return false;
            }
            if (mapEntry.range === undefined) {
                return false;
            }
            if (!(mapEntry.range instanceof Range)) {
                return false;
            }
            if (mapEntry.link === undefined) {
                return false;
            }
            if (typeof mapEntry.link !== "string") {
                return false;
            }
            return true;
        });
        if (!allMapEntriesAreValid) {
            throw new Error("All partitionKeyMap entries have to be a tuple {range: Range, link: string }");
        }
        if (compareFunction !== undefined && typeof compareFunction !== "function") {
            throw new Error("Invalid argument: 'compareFunction' is not a function");
        }

        this.partitionKeyExtractor = partitionKeyExtractor;
        this.partitionKeyMap = partitionKeyMap;
        this.compareFunction = compareFunction;
    }, {
        /**
         * Extracts the partition key from the specified document using the partitionKeyExtractor
         * @memberof RangePartitionResolver
         * @instance
         * @param {object} document - The document from which to extract the partition key.
         * @returns {}
         **/
        getPartitionKey: function (document) {
            if (typeof this.partitionKeyExtractor === "string") {
                return document[this.partitionKeyExtractor];
            }
            if (typeof this.partitionKeyExtractor === "function") {
                return this.partitionKeyExtractor(document);
            }
            throw new Error("Unable to extract partition key from document. Ensure PartitionKeyExtractor is a valid function or property name.");
        },

        /**
         * Given a partition key, returns the correct collection link for creating a document using the range partition map.
         * @memberof RangePartitionResolver
         * @instance
         * @param {any} partitionKey - The partition key used to determine the target collection for create
         * @returns {string}         - The target collection link that will be used for document creation.
         **/
        resolveForCreate: function (partitionKey) {
            var range = new Range({ low: partitionKey });
            var mapEntry = this._getFirstContainingMapEntryOrNull(range);
            if (mapEntry !== undefined && mapEntry !== null) {
                return mapEntry.link;
            }
            throw new Error("Invalid operation: A containing range for '" + range._toString() + "' doesn't exist in the partition map.");
        },

        /**
         * Given a partition key, returns a list of collection links to read from using the range partition map.
         * @memberof RangePartitionResolver
         * @instance
         * @param {any} partitionKey - The partition key used to determine the target collection for query
         * @returns {string[]}         - The list of target collection links.
         **/
        resolveForRead: function (partitionKey) {
            if (partitionKey === undefined || partitionKey === null) {
                return this.partitionKeyMap.map(function (i) { return i.link; });
            }
            else {
                return this._getIntersectingMapEntries(partitionKey).map(function (i) { return i.link; });
            }
        },

        /** @ignore */
        _getFirstContainingMapEntryOrNull: function (point) {
            var _this = this;
            var containingMapEntries = this.partitionKeyMap.filter(function (p) { return p.range !== undefined && p.range._contains(point, _this.compareFunction); });
            if (containingMapEntries && containingMapEntries.length > 0) {
                return containingMapEntries[0];
            }
            return null;
        },

        /** @ignore */
        _getIntersectingMapEntries: function (partitionKey) {
            var _this = this;
            var partitionKeys = (partitionKey instanceof Array) ? partitionKey : [partitionKey];
            var ranges = partitionKeys.map(function (p) { return Range._isRange(p) ? p : new Range({ low: p }); });
            var result = new Array();
            ranges.forEach(function (range) {
                result = result.concat(_this.partitionKeyMap.filter(function (entry) {
                    return entry.range._intersect(range, _this.compareFunction);
                }));
            });
            return result;
        }
    }
);
//SCRIPT END

if (typeof exports !== "undefined") {
    exports.Range = Range;
    exports.RangePartitionResolver = RangePartitionResolver;
}