import type { AbortSignalLike } from "@azure/abort-controller";
/**
 * Describes the properties that must be provided while acquiring a lock.
 */
export interface AcquireLockProperties {
    /**
     * An implementation of the `AbortSignalLike` interface to signal the request to cancel lock acquisition.
     * This only applies to the acquisition of a lock. Once the lock is acquired, the task is invoked and `acquire`
     * can no longer be cancelled.
     * This does not cancel running the task passed to `acquire()` if the lock has been acquired,
     * but will prevent it from running if cancelled before the task is invoked.
     */
    abortSignal: AbortSignalLike | undefined;
    /**
     * The allowed amount of time in milliseconds to acquire a lock.
     * If a lock isn't acquired within this time, the promise returned
     * by `acquire()` will be rejected with an Error.
     */
    timeoutInMs: number | undefined;
}
/**
 * CancellableAsyncLock provides a mechanism for forcing tasks using the same
 * 'key' to be executed serially.
 *
 * Pending tasks can be manually cancelled via an abortSignal or automatically
 * cancelled by reach a provided timeout value.
 */
export interface CancellableAsyncLock {
    /**
     * Returns a promise that resolves to the value returned by the provided task function.
     * Only 1 task can be invoked at a time for a given `key` value.
     *
     * An acquire call can be cancelled via an `abortSignal`.
     * If cancelled, the promise will be rejected with an `AbortError`.
     *
     * `acquireTimeoutInMs` can also be provided to properties.
     * If the timeout is reached before the provided `task` is invoked,
     * then the promise will be rejected with an Error stating the task
     * timed out waiting to acquire a lock.
     *
     * @param key - All `acquire` calls are grouped by the provided `key`.
     * @param task - The function to invoke once the lock has been acquired.
     * @param properties - Additional properties to control the behavior of `acquire`.
     */
    acquire<T = void>(key: string, task: (...args: any[]) => Promise<T>, properties: AcquireLockProperties): Promise<T>;
}
/**
 * This class is used to coordinate executing tasks that should not be run in parallel.
 * @internal
 */
export declare class CancellableAsyncLockImpl {
    private _keyMap;
    private _executionRunningSet;
    /**
     * Returns a promise that resolves to the value returned by the provided task function.
     * Only 1 task can be invoked at a time for a given `key` value.
     *
     * An acquire call can be cancelled via an `abortSignal`.
     * If cancelled, the promise will be rejected with an `AbortError`.
     *
     * `acquireTimeoutInMs` can also be provided to properties.
     * If the timeout is reached before the provided `task` is invoked,
     * then the promise will be rejected with an Error stating the task
     * timed out waiting to acquire a lock.
     *
     * @param key - All `acquire` calls are grouped by the provided `key`.
     * @param task - The function to invoke once the lock has been acquired.
     * @param properties - Additional properties to control the behavior of `acquire`.
     */
    acquire<T = void>(key: string, task: (...args: any[]) => Promise<T>, properties: AcquireLockProperties): Promise<T>;
    /**
     * Iterates over all the pending tasks for a given `key` serially.
     *
     * Note: If the pending tasks are already being iterated by an early
     * _execute invocation, this returns immediately.
     * @returns
     */
    private _execute;
    private _removeTaskDetails;
}
//# sourceMappingURL=lock.d.ts.map