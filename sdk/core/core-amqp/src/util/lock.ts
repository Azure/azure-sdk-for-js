// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AbortError, AbortSignalLike } from "@azure/abort-controller";
import { OperationTimeoutError } from "rhea-promise";
import { StandardAbortMessage } from "./constants";
import { logger } from "../log";

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
 * Describes the components related to a specific task.
 * @internal
 */
interface TaskDetails {
  abortListener?: () => void;
  abortSignal?: AbortSignalLike;
  resolve: (value: unknown) => void;
  reject: (reason: Error) => void;
  task: (...args: any[]) => Promise<unknown>;
  tid?: ReturnType<typeof setTimeout>;
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
  acquire<T = void>(
    key: string,
    task: (...args: any[]) => Promise<T>,
    properties: AcquireLockProperties
  ): Promise<T>;
}

/**
 * This class is used to coordinate executing tasks that should not be run in parallel.
 * @internal
 */
export class CancellableAsyncLockImpl {
  private _keyMap = new Map<string, TaskDetails[]>();
  private _executionRunningSet = new Set<string>();
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
  acquire<T = void>(
    key: string,
    task: (...args: any[]) => Promise<T>,
    properties: AcquireLockProperties
  ): Promise<T> {
    const { abortSignal, timeoutInMs } = properties;
    // Fast exit if the operation is already cancelled.
    if (abortSignal?.aborted) {
      return Promise.reject(new AbortError(StandardAbortMessage));
    }

    // Ensure we've got a task queue for the given key.
    const taskQueue = this._keyMap.get(key) ?? [];
    this._keyMap.set(key, taskQueue);

    // This method will return a promise that will be fulfilled outside this function.
    const { promise, rejecter, resolver } = getPromiseParts();

    const taskDetails: TaskDetails = {
      reject: rejecter,
      resolve: resolver,
      task,
    };

    // Handle timeouts by removing the task from the queue when hit.
    if (typeof timeoutInMs === "number") {
      const tid = setTimeout(() => {
        this._removeTaskDetails(key, taskDetails);
        rejecter(
          new OperationTimeoutError(`The task timed out waiting to acquire a lock for ${key}`)
        );
      }, timeoutInMs);
      taskDetails.tid = tid;
    }

    // Handle cancellation by removing the task from the queue when cancelled.
    if (abortSignal) {
      const abortListener = (): void => {
        this._removeTaskDetails(key, taskDetails);
        rejecter(new AbortError(StandardAbortMessage));
      };
      abortSignal.addEventListener("abort", abortListener);
      taskDetails.abortSignal = abortSignal;
      taskDetails.abortListener = abortListener;
    }

    // Enqueue the task!
    taskQueue.push(taskDetails);
    logger.verbose(
      `Called acquire() for lock "${key}". Lock "${key}" has ${taskQueue.length} pending tasks.`
    );

    // Start a loop to iterate over the task queue.
    // This will run asynchronously and won't allow
    // more than 1 concurrent execution per key at a time.
    this._execute(key);

    return promise as Promise<T>;
  }

  /**
   * Iterates over all the pending tasks for a given `key` serially.
   *
   * Note: If the pending tasks are already being iterated by an early
   * _execute invocation, this returns immediately.
   * @returns
   */
  private async _execute(key: string): Promise<void> {
    // If the key already exists in the set, then exit because
    // tasks are already being processed.
    if (this._executionRunningSet.has(key)) {
      return;
    }

    const taskQueue = this._keyMap.get(key);
    // If the queue is empty, exit early!
    if (!taskQueue || !taskQueue.length) {
      return;
    }

    // Add the key to the set so we can tell the
    // task queue is already being processed.
    this._executionRunningSet.add(key);
    while (taskQueue.length) {
      // Remove tasks from the front of the queue.
      // Order matters!
      const taskDetails = taskQueue.shift();
      if (!taskDetails) {
        continue;
      }

      try {
        logger.verbose(`Acquired lock for "${key}", invoking task.`);
        cleanupTaskDetails(taskDetails);
        const value = await taskDetails.task();
        taskDetails.resolve(value);
      } catch (err) {
        taskDetails.reject(err);
      }
      logger.verbose(
        `Task completed for lock "${key}". Lock "${key}" has ${taskQueue.length} pending tasks.`
      );
    }

    // Indicate that the task queue for the key is empty
    // and we're done processing it.
    this._executionRunningSet.delete(key);
  }

  private _removeTaskDetails(key: string, taskDetails: TaskDetails): void {
    const taskQueue = this._keyMap.get(key);
    if (!taskQueue || !taskQueue.length) {
      // The task is already gone from the queue, so our work here is done!
      return;
    }

    const index = taskQueue.indexOf(taskDetails);
    if (index !== -1) {
      const [details] = taskQueue.splice(index, 1);
      // Cleanup the task rejection code paths.
      cleanupTaskDetails(details);
    }
  }
}

/**
 * @internal
 * Returns a promise and the promise's resolve and reject methods.
 */
function getPromiseParts(): {
  promise: Promise<unknown>;
  resolver: (value: unknown) => void;
  rejecter: (reason: Error) => void;
} {
  let resolver: (value: unknown) => void;
  let rejecter: (reason: Error) => void;

  const promise = new Promise<unknown>((resolve, reject) => {
    resolver = resolve;
    rejecter = reject;
  });

  return {
    promise,
    resolver: resolver!,
    rejecter: rejecter!,
  };
}

/**
 * @internal
 * Removes any abort listener or pending timeout from a task.
 */
function cleanupTaskDetails(taskDetails: TaskDetails): void {
  // Cleanup the task rejection code paths.
  if (taskDetails.tid) clearTimeout(taskDetails.tid);
  if (taskDetails.abortSignal && taskDetails.abortListener) {
    taskDetails.abortSignal.removeEventListener("abort", taskDetails.abortListener);
  }
}
