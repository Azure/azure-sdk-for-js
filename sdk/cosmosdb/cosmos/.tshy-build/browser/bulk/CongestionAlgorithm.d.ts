import type { PartitionMetric } from "./PartitionMetric.js";
import type { LimiterQueue } from "./Limiter.js";
/**
 * This class implements a congestion control algorithm which dynamically adjusts the degree
 * of concurrency based on the throttling and number of processed items.
 * For example, if it sees any throttling in requests from the last time the algorithm ran, it will decrease the
 * degree of concurrency (either by a factor of 5 or half the current degree of concurrency, whichever is smaller)
 * and increase the wait time to run the algorithm again by 1 second.
 * If it sees no throttling and the number of items processed increased, it will increase the degree of concurrency
 * (by a factor of 1) which cannot exceed the max degree of concurrency (Min(20, concurrency set by user)).
 * It uses the @see {@link PartitionMetric} to capture the metrics.
 * @hidden
 */
export declare class CongestionAlgorithm {
    private limiterQueue;
    private oldPartitionMetric;
    private partitionMetric;
    private congestionWaitTimeInMs;
    private congestionIncreaseFactor;
    private congestionDecreaseFactor;
    private currentDegreeOfConcurrency;
    constructor(limiterQueue: LimiterQueue, partitionMetric: PartitionMetric, oldPartitionMetric: PartitionMetric);
    run(): void;
    private decreaseConcurrency;
    private increaseConcurrency;
}
//# sourceMappingURL=CongestionAlgorithm.d.ts.map