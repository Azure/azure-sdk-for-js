// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * PerfStressParallel helps keep track of the total completed operations
 * and the last milliseconds elapsed on each parallel call.
 *
 * In languages supporting threads, "parallels" mean new threads created in which we run
 * as many functions as possible. Keep in mind that we currently don't support multiple threads in NodeJS.
 * We might be using workers eventually, but for now, "parallel" executions are
 * promises that are executed one after the other without waiting for the previous one to finish.
 * We wait for all of the promises to resolve to consider the "parallel" execution finished.
 */
export interface PerfStressParallel {
  /**
   * Tracks the number of completed operations during a given parallel call.
   */
  completedOperations: number;
  /**
   * Tracks how much time the last executed test took, in comparison to the beginning fo the parallel execution.
   */
  lastMillisecondsElapsed: number;
}
