"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SmartRoutingMapProvider = exports.PARITIONKEYRANGE = void 0;
const constants_js_1 = require("../common/constants.js");
const partitionKeyRangeCache_js_1 = require("./partitionKeyRangeCache.js");
const QueryRange_js_1 = require("./QueryRange.js");
/** @hidden */
exports.PARITIONKEYRANGE = constants_js_1.Constants.PartitionKeyRange;
/** @hidden */
class SmartRoutingMapProvider {
    constructor(clientContext) {
        this.partitionKeyRangeCache = new partitionKeyRangeCache_js_1.PartitionKeyRangeCache(clientContext);
    }
    static _secondRangeIsAfterFirstRange(range1, range2) {
        if (typeof range1.max === "undefined") {
            throw new Error("range1 must have max");
        }
        if (typeof range2.min === "undefined") {
            throw new Error("range2 must have min");
        }
        if (range1.max > range2.min) {
            // r.min < #previous_r.max
            return false;
        }
        else {
            if (range1.max === range2.min && range1.isMaxInclusive && range2.isMinInclusive) {
                // the inclusive ending endpoint of previous_r is the same as the inclusive beginning endpoint of r
                // they share a point
                return false;
            }
            return true;
        }
    }
    static _isSortedAndNonOverlapping(ranges) {
        for (let idx = 1; idx < ranges.length; idx++) {
            const previousR = ranges[idx - 1];
            const r = ranges[idx];
            if (!this._secondRangeIsAfterFirstRange(previousR, r)) {
                return false;
            }
        }
        return true;
    }
    static _stringMax(a, b) {
        return a >= b ? a : b;
    }
    static _stringCompare(a, b) {
        return a === b ? 0 : a > b ? 1 : -1;
    }
    static _subtractRange(r, partitionKeyRange) {
        const left = this._stringMax(partitionKeyRange[exports.PARITIONKEYRANGE.MaxExclusive], r.min);
        const leftInclusive = this._stringCompare(left, r.min) === 0 ? r.isMinInclusive : false;
        return new QueryRange_js_1.QueryRange(left, r.max, leftInclusive, r.isMaxInclusive);
    }
    /**
     * Given the sorted ranges and a collection, invokes the callback on the list of overlapping partition key ranges
     * @param callback - Function execute on the overlapping partition key ranges result,
     *                   takes two parameters error, partition key ranges
     * @hidden
     */
    async getOverlappingRanges(collectionLink, sortedRanges, diagnosticNode) {
        // validate if the list is non- overlapping and sorted                             TODO: any PartitionKeyRanges
        if (!SmartRoutingMapProvider._isSortedAndNonOverlapping(sortedRanges)) {
            throw new Error("the list of ranges is not a non-overlapping sorted ranges");
        }
        let partitionKeyRanges = []; // TODO: any ParitionKeyRanges
        if (sortedRanges.length === 0) {
            return partitionKeyRanges;
        }
        const collectionRoutingMap = await this.partitionKeyRangeCache.onCollectionRoutingMap(collectionLink, diagnosticNode);
        let index = 0;
        let currentProvidedRange = sortedRanges[index];
        for (;;) {
            if (currentProvidedRange.isEmpty()) {
                // skip and go to the next item
                if (++index >= sortedRanges.length) {
                    return partitionKeyRanges;
                }
                currentProvidedRange = sortedRanges[index];
                continue;
            }
            let queryRange;
            if (partitionKeyRanges.length > 0) {
                queryRange = SmartRoutingMapProvider._subtractRange(currentProvidedRange, partitionKeyRanges[partitionKeyRanges.length - 1]);
            }
            else {
                queryRange = currentProvidedRange;
            }
            const overlappingRanges = collectionRoutingMap.getOverlappingRanges(queryRange);
            if (overlappingRanges.length <= 0) {
                throw new Error(`error: returned overlapping ranges for queryRange ${queryRange} is empty`);
            }
            partitionKeyRanges = partitionKeyRanges.concat(overlappingRanges);
            const lastKnownTargetRange = QueryRange_js_1.QueryRange.parsePartitionKeyRange(partitionKeyRanges[partitionKeyRanges.length - 1]);
            if (!lastKnownTargetRange) {
                throw new Error("expected lastKnowTargetRange to be truthy");
            }
            // the overlapping ranges must contain the requested range
            if (SmartRoutingMapProvider._stringCompare(currentProvidedRange.max, lastKnownTargetRange.max) >
                0) {
                throw new Error(`error: returned overlapping ranges ${overlappingRanges} \
        does not contain the requested range ${queryRange}`);
            }
            // the current range is contained in partitionKeyRanges just move forward
            if (++index >= sortedRanges.length) {
                return partitionKeyRanges;
            }
            currentProvidedRange = sortedRanges[index];
            while (SmartRoutingMapProvider._stringCompare(currentProvidedRange.max, lastKnownTargetRange.max) <= 0) {
                // the current range is covered too.just move forward
                if (++index >= sortedRanges.length) {
                    return partitionKeyRanges;
                }
                currentProvidedRange = sortedRanges[index];
            }
        }
    }
}
exports.SmartRoutingMapProvider = SmartRoutingMapProvider;
//# sourceMappingURL=smartRoutingMapProvider.js.map