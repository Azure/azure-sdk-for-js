// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { OrderByDocumentProducerComparator } from "../orderByDocumentProducerComparator.js";
/** @hidden */
export class MaxAggregator {
    /**
     * Represents an aggregator for MAX operator.
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
//# sourceMappingURL=MaxAggregator.js.map