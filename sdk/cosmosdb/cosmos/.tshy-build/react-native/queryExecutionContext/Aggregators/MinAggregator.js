// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { OrderByDocumentProducerComparator } from "../orderByDocumentProducerComparator.js";
/** @hidden */
export class MinAggregator {
    /**
     * Represents an aggregator for MIN operator.
     * @hidden
     */
    constructor() {
        this.value = undefined;
        this.comparer = new OrderByDocumentProducerComparator(["Ascending"]);
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
//# sourceMappingURL=MinAggregator.js.map