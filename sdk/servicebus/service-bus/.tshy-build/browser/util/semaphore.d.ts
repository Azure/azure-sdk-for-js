/**
 * @internal
 * A simple Semaphore
 */
export declare class Semaphore {
    /**
     * The number of concurrent calls that can be made.
     */
    limit: number;
    private _queue;
    private _used;
    constructor(limit: number);
    /**
     * Acquires a lock from the semaphore, returns a Promise that resolves when the caller holds
     * a lock.
     */
    acquire(): Promise<void>;
    /**
     * Releases a lock back to the semaphore.
     */
    release(): void;
    /**
     * Aquires a lock from the semaphore and then execute the fn. If the fn returns a Promise,
     * wait for that promise to settle and then release the lock back to the semaphore.
     * @param fn - The function that needs to be executed in the ciritical region.
     * @returns A Promise that will settle with the return value of fn.
     */
    use<T>(fn: () => T | PromiseLike<T>): Promise<T>;
    /**
     * Provides the number of locks currently held.
     */
    currentLockCount(): number;
    /**
     * Provides the number of tasks waiting to acquire a lock.
     */
    awaitedTaskCount(): number;
}
//# sourceMappingURL=semaphore.d.ts.map