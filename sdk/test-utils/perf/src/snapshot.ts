// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * A snapshot of a parallel perf test run at a given period of time.
 */
export interface Snapshot {
  /**
   * Tracks the number of completed operations during a given parallel call.
   */
  completedOperations: number;
  /**
   * Tracks how much time the last executed test took, in comparison to the beginning fo the parallel execution.
   */
  lastMillisecondsElapsed: number;
}
