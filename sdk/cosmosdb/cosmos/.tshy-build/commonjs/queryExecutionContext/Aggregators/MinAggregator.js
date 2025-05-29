"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MinAggregator = void 0;
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
const orderByDocumentProducerComparator_js_1 = require("../orderByDocumentProducerComparator.js");
/** @hidden */
class MinAggregator {
    /**
     * Represents an aggregator for MIN operator.
     * @hidden
     */
    constructor() {
        this.value = undefined;
        this.comparer = new orderByDocumentProducerComparator_js_1.OrderByDocumentProducerComparator(["Ascending"]);
    }
    /**
     * Add the provided item to aggregation result.
     */
    aggregate(other) {
        if (this.value === undefined) {
            // || typeof this.value === "object"
            this.value = other.min;
        }
        else {
            const otherType = other.min === null ? "NoValue" : typeof other.min; // || typeof other === "object"
            const thisType = this.value === null ? "NoValue" : typeof this.value;
            if (this.comparer.compareValue(other.min, otherType, this.value, thisType) < 0) {
                this.value = other.min;
            }
        }
    }
    /**
     * Get the aggregation result.
     */
    getResult() {
        return this.value;
    }
}
exports.MinAggregator = MinAggregator;
//# sourceMappingURL=MinAggregator.js.map