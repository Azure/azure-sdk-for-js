/**
 * Operation is an async function to be executed and managed by Batch.
 */
export declare type Operation = () => Promise<any>;
/**
 * Batch provides basic parallel execution with concurrency limits.
 * Will stop execute left operations when one of the executed operation throws an error.
 * But Batch cannot cancel ongoing operations, you need to cancel them by yourself.
 */
export declare class Batch {
    /**
     * Concurrency. Must be lager than 0.
     */
    private concurrency;
    /**
     * Number of active operations under execution.
     */
    private actives;
    /**
     * Number of completed operations under execution.
     */
    private completed;
    /**
     * Offset of next operation to be executed.
     */
    private offset;
    /**
     * Operation array to be executed.
     */
    private operations;
    /**
     * States of Batch. When an error happens, state will turn into error.
     * Batch will stop execute left operations.
     */
    private state;
    /**
     * A private emitter used to pass events inside this class.
     */
    private emitter;
    /**
     * Creates an instance of Batch.
     * @param concurrency -
     */
    constructor(concurrency?: number);
    /**
     * Add a operation into queue.
     *
     * @param operation -
     */
    addOperation(operation: Operation): void;
    /**
     * Start execute operations in the queue.
     *
     */
    do(): Promise<void>;
    /**
     * Get next operation to be executed. Return null when reaching ends.
     *
     */
    private nextOperation;
    /**
     * Start execute operations. One one the most important difference between
     * this method with do() is that do() wraps as an sync method.
     *
     */
    private parallelExecute;
}
//# sourceMappingURL=Batch.d.ts.map