"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SumAggregator = void 0;
/** @hidden */
class SumAggregator {
    /**
     * Add the provided item to aggregation result.
     */
    aggregate(other) {
        if (other === undefined) {
            return;
        }
        if (this.sum === undefined) {
            this.sum = other;
        }
        else {
            this.sum += other;
        }
    }
    /**
     * Get the aggregation result.
     */
    getResult() {
        return this.sum;
    }
}
exports.SumAggregator = SumAggregator;
//# sourceMappingURL=SumAggregator.js.map