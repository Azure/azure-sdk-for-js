// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PerfStressTest } from "../src";

/**
 * Should test the raw performance impact of the PerfStress framework for synchronous tests.
 */
export class NoOpSync extends PerfStressTest<string> {
  public options = {};
  run(): void {}
}

/**
 * Should test the raw performance impact of the PerfStress framework for asynchronous tests.
 */
export class NoOpAsync extends PerfStressTest<string> {
  public options = {};
  async runAsync(): Promise<void> {}
}
