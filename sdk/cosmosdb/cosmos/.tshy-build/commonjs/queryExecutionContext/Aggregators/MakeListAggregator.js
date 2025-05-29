"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MakeListAggregator = void 0;
/** @hidden */
class MakeListAggregator {
    constructor() {
        this.value = [];
    }
    aggregate(other) {
        if (Array.isArray(other)) {
            this.value.push(...other);
        }
    }
    getResult() {
        const result = [...this.value];
        return result;
    }
}
exports.MakeListAggregator = MakeListAggregator;
//# sourceMappingURL=MakeListAggregator.js.map