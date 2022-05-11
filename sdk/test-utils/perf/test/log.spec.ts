// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PerfTest } from "../src";
import { delay } from "@azure/core-http";

/**
 * Used for logging every step and property of the perf test
 */
export class LogTest extends PerfTest {
  private start = process.hrtime();

  private static loggedGlobalCompletedOperations = 0;
  private loggedCompletedOperations = 0;
  private secondsPerOperation: number;

  public options = {};

  constructor() {
    super();
    this.log("Log()");
    this.secondsPerOperation = 1.0 / (this.parallelIndex + 1);
  }

  public globalSetup(): void {
    this.log("globalSetup()");
  }

  public setup(): void {
    this.log("setup()");
  }

  async run(): Promise<void> {
    await delay(this.secondsPerOperation * 1000);
    this.loggedCompletedOperations++;
    LogTest.loggedGlobalCompletedOperations++;
  }

  public cleanup(): void {
    this.log(`cleanup() - Completed Operations: ${this.loggedCompletedOperations}`);
  }

  public globalCleanup(): void {
    this.log(
      `globalCleanup() - GlobalCompleted Operations: ${LogTest.loggedGlobalCompletedOperations}`
    );
  }

  private log(message: string) {
    const elapsed = process.hrtime(this.start);
    const elapsedSeconds = elapsed[0] + elapsed[1] / 1_000_000_000;

    console.log(`[${elapsedSeconds}] [PID: ${process.pid}] [${this.parallelIndex}] ${message}`);
  }
}
