// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PerfTest } from "../src";
import { delay } from "@azure/core-http";

/**
 * Delay500ms waits for 500 milliseconds on every test call,
 * which helps track how the Perf framework works internally.
 *
 * Let's say this test is executed with the following parameters:
 * `--duration 4 --iterations 2`, then this test should be executed twice every 500ms, until 4 seconds are reached.
 * In each parallel, 8 operations should be executed. The logs should look similar to:
 *
 * ```
 * === test mode, iteration 0. Logs every 1s ===
 * Since Last Log          Total
 * 1                       1
 * 2                       3
 * 2                       5
 * 2                       7
 * === test mode, results of iteration 1 ===
 * Completed 8 operations in a weighted-average of 4.01s (2.00 ops/s 0.501 s/op)
 *
 * === test mode, iteration 1. Logs every 1s ===
 * Since Last Log          Total
 * 1                       1
 * 2                       3
 * 2                       5
 * 2                       7
 * === test mode, results of iteration 2 ===
 * Completed 8 operations in a weighted-average of 4.00s (2.00 ops/s 0.501 s/op)
 * ```
 */
export class Delay500ms extends PerfTest {
  /**
   * This test doesn't receive command line parameters.
   */
  public options = {};

  /**
   * Waits 500 milliseconds.
   */
  async run(): Promise<void> {
    await delay(500);
  }
}
