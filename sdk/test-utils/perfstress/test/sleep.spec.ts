// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PerfStressTest } from "../src";
import { delay } from "@azure/core-http";

// Used for verifying the perf framework correctly computes average throughput across parallel tests of different speed
export class SleepTest extends PerfStressTest<string> {
  private static instanceCount: number = 0;
  private secondsPerOperation: number = 0;

  public options = {};

  constructor() {
    super();

    // Each instance of this test completes operations at a different rate, to allow for testing scenarios where
    // some instances are still waiting when time expires.  The first instance completes in 2 seconds per operation,
    // the second instance in 4 seconds, the third instance in 8 seconds, and so on.
    SleepTest.instanceCount++;
    this.secondsPerOperation = Math.pow(2, SleepTest.instanceCount);
  }

  async runAsync(): Promise<void> {
    await delay(this.secondsPerOperation * 1000);
  }
}
