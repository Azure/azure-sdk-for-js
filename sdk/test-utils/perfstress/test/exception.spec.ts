// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PerfStressTest, PerfStressTestError } from "../src";

/**
 * SynchronousException is designed to test the response speed of the PerfStress test framework
 * with errors thrown on every test call, where the test being called is simple function.
 */
export class SynchronousException extends PerfStressTest<string> {
  public options = {};
  run(): void {
    try {
      throw new PerfStressTestError();
    } finally {
      // Nothing to do here
    }
  }
}

/**
 * AsynchronousException is designed to test the response speed of the PerfStress test framework
 * with errors thrown on every test call, where the test being called is a function returning a promise (an asynchronous function).
 */
export class AsynchronousException extends PerfStressTest<string> {
  public options = {};
  async run(): Promise<void> {
    try {
      throw new PerfStressTestError();
    } finally {
      // Nothing to do here
    }
  }
}
