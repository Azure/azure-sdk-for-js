/**
 * Captures the metrics for the requests made for bulk.
 */
export declare class PartitionMetric {
    numberOfItemsOperatedOn: number;
    timeTakenInMs: number;
    numberOfThrottles: number;
    private semaphore;
    constructor();
    add(numberOfDoc: number, timeTakenInMs: number, numOfThrottles: number): void;
}
//# sourceMappingURL=PartitionMetric.d.ts.map