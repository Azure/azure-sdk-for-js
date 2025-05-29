"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MaxAggregator = void 0;
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
const orderByDocumentProducerComparator_js_1 = require("../orderByDocumentProducerComparator.js");
/** @hidden */
class MaxAggregator {
    /**
     * Represents an aggregator for MAX operator.
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
            this.value = other.max;
        }
        else if (this.comparer.compareValue(other.max, typeof other.max, this.value, typeof this.value) > 0) {
            this.value = other.max;
        }
    }
    /**
     * Get the aggregation result.
     */
    getResult() {
        return this.value;
    }
}
exports.MaxAggregator = MaxAggregator;
//# sourceMappingURL=MaxAggregator.js.map