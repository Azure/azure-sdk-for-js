// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import semaphore from "semaphore";
/**
 * Captures the metrics for the requests made for bulk.
 */
export class PartitionMetric {
    constructor() {
        this.numberOfItemsOperatedOn = 0;
        this.timeTakenInMs = 0;
        this.numberOfThrottles = 0;
        this.semaphore = semaphore(1);
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
//# sourceMappingURL=PartitionMetric.js.map