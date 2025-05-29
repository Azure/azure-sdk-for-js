"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StaticValueAggregator = void 0;
/** @hidden */
class StaticValueAggregator {
    aggregate(other) {
        if (this.value === undefined) {
            this.value = other;
        }
    }
    getResult() {
        return this.value;
    }
}
exports.StaticValueAggregator = StaticValueAggregator;
//# sourceMappingURL=StaticValueAggregator.js.map