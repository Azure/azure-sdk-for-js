"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryRange = void 0;
const index_js_1 = require("../common/index.js");
/** @hidden */
class QueryRange {
    /**
     * Represents a QueryRange.
     *
     * @param rangeMin                - min
     * @param rangeMin                - max
     * @param isMinInclusive         - isMinInclusive
     * @param isMaxInclusive         - isMaxInclusive
     * @hidden
     */
    constructor(rangeMin, rangeMax, isMinInclusive, isMaxInclusive) {
        this.min = rangeMin;
        this.max = rangeMax;
        this.isMinInclusive = isMinInclusive;
        this.isMaxInclusive = isMaxInclusive;
    }
    overlaps(other) {
        const range1 = this; // eslint-disable-line @typescript-eslint/no-this-alias
        const range2 = other;
        if (range1 === undefined || range2 === undefined) {
            return false;
        }
        if (range1.isEmpty() || range2.isEmpty()) {
            return false;
        }
        if (range1.min <= range2.max || range2.min <= range1.max) {
            if ((range1.min === range2.max && !(range1.isMinInclusive && range2.isMaxInclusive)) ||
                (range2.min === range1.max && !(range2.isMinInclusive && range1.isMaxInclusive))) {
                return false;
            }
            return true;
        }
        return false;
    }
    isFullRange() {
        return (this.min === index_js_1.Constants.EffectivePartitionKeyConstants.MinimumInclusiveEffectivePartitionKey &&
            this.max === index_js_1.Constants.EffectivePartitionKeyConstants.MaximumExclusiveEffectivePartitionKey &&
            this.isMinInclusive === true &&
            this.isMaxInclusive === false);
    }
    isEmpty() {
        return !(this.isMinInclusive && this.isMaxInclusive) && this.min === this.max;
    }
    /**
     * Parse a QueryRange from a partitionKeyRange
     * @returns QueryRange
     * @hidden
     */
    static parsePartitionKeyRange(partitionKeyRange) {
        return new QueryRange(partitionKeyRange[index_js_1.Constants.PartitionKeyRange.MinInclusive], partitionKeyRange[index_js_1.Constants.PartitionKeyRange.MaxExclusive], true, false);
    }
    /**
     * Parse a QueryRange from a dictionary
     * @returns QueryRange
     * @hidden
     */
    static parseFromDict(queryRangeDict) {
        return new QueryRange(queryRangeDict.min, queryRangeDict.max, queryRangeDict.isMinInclusive, queryRangeDict.isMaxInclusive);
    }
}
exports.QueryRange = QueryRange;
//# sourceMappingURL=QueryRange.js.map