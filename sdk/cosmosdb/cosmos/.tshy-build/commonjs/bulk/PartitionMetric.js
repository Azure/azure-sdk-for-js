"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.PartitionMetric = void 0;
const tslib_1 = require("tslib");
const semaphore_1 = tslib_1.__importDefault(require("semaphore"));
/**
 * Captures the metrics for the requests made for bulk.
 */
class PartitionMetric {
    constructor() {
        this.numberOfItemsOperatedOn = 0;
        this.timeTakenInMs = 0;
        this.numberOfThrottles = 0;
        this.semaphore = (0, semaphore_1.default)(1);
    }
    add(numberOfDoc, timeTakenInMs, numOfThrottles) {
        // these operations should be atomic as multiple dispatch could be updating these values
        this.semaphore.take(() => {
            try {
                this.numberOfItemsOperatedOn += numberOfDoc;
                this.timeTakenInMs += timeTakenInMs;
                this.numberOfThrottles += numOfThrottles;
            }
            finally {
                this.semaphore.leave();
            }
        });
    }
}
exports.PartitionMetric = PartitionMetric;
//# sourceMappingURL=PartitionMetric.js.map