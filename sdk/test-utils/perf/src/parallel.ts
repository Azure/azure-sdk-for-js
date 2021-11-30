// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * PerfParallel helps keep track of the total completed operations
 * and the last milliseconds elapsed on each parallel call.
 *
 * In languages supporting threads, "parallels" mean new threads created in which we run
 * as many functions as possible. Keep in mind that we currently don't support multiple threads in NodeJS.
 * We might be using workers eventually, but for now, "parallel" executions are
 * promises that are executed one after the other without waiting for the previous one to finish.
 * We wait for all of the promises to resolve to consider the "parallel" execution finished.
 */
export interface PerfParallel {
  /**
   * Tracks the number of completed operations during a given parallel call.
   */
  completedOperations: number;
  /**
   * Tracks how much time the last executed test took, in comparison to the beginning fo the parallel execution.
   */
  lastMillisecondsElapsed: number;
}

/**
 * Repeats the "async function" task for a "count" number of times by awaiting on
 * "parallel" number of while loops in which each iteration executes the provided function once.
 *
 * @export
 * @param {(count: number, parallelIndex: number) => Promise<void>} func "async function" task to be executed repeatedly
 * @param {number} count Number of the times the func to be executed
 * @param {number} parallel Number of parallel while loops to iterate over the function task
 */
export async function executeParallel(
  func: (count: number, parallelIndex: number) => Promise<void>,
  count: number,
  parallel: number
): Promise<void> {
  async function executeParallelHelper(
    func: (count: number, parallelIndex: number) => Promise<void>,
    count: number,
    parallelIndex: number,
    completed: { count: number }
  ) {
    while (completed.count < count) {
      const currentCount = completed.count++;
      await func(currentCount, parallelIndex);
    }
  }

  const completed = { count: 0 };
  const tasks = [];
  for (let i = 0; i < parallel; i++) {
    tasks.push(executeParallelHelper(func, count, i, completed));
  }
  await Promise.all(tasks);
}
