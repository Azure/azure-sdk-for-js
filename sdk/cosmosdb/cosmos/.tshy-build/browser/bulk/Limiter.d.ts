import type { DiagnosticNodeInternal } from "../diagnostics/DiagnosticNodeInternal.js";
import type { RetryCallback } from "../utils/batch.js";
import type { Batcher } from "./Batcher.js";
import type { PartitionMetric } from "./PartitionMetric.js";
export type Task<T = any> = () => Promise<T>;
/**
 * HighPerformanceQueue processes tasks concurrently.
 * If pauseAndClear() is called, it permanently halts processing,
 * clears queued tasks (resolving them with a custom value), and
 * any subsequent push() calls will immediately resolve with that value.
 */
export declare class LimiterQueue {
    concurrency: number;
    private running;
    private tasks;
    private terminated;
    private terminatedValue;
    private scheduled;
    private processing;
    private retrier;
    private partitionMetric;
    private readonly refreshPartitionKeyRangeCache;
    /**
     * Creates a new HighPerformanceQueue.
     */
    constructor(concurrency: number, partitionMetric: PartitionMetric, retrier: RetryCallback, refreshPartitionKeyRangeCache: (diagnosticNode: any) => Promise<void>);
    /**
     * Enqueue a task and return a Promise that resolves or rejects when the task completes.
     * If the queue has been terminated via pauseAndClear, the promise resolves immediately with the terminated value.
     */
    push(batcher: Batcher): Promise<any>;
    /**
     * Permanently pauses processing and clears the queue.
     * All queued tasks and subsequent push() calls will immediately resolve with the provided custom value.
     */
    pauseAndClear<T = any>(customValue: T, diagnosticNode?: DiagnosticNodeInternal): Promise<void>;
    /**
     * Schedules the processing loop using the best available asynchronous scheduler.
     */
    private scheduleProcess;
    /**
     * Processes tasks up to the concurrency limit.
     */
    private process;
    /**
     * Dynamically updates the concurrency limit.
     */
    setConcurrency(newConcurrency: number): void;
}
//# sourceMappingURL=Limiter.d.ts.map