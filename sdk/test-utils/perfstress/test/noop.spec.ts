// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PerfStressTestSync, PerfStressTestAsync } from "../src";

/**
 * Should test the raw performance impact of the PerfStress framework for synchronous tests.
 */
export class NoOpSync extends PerfStressTestSync<string> {
  public options = {};
  run(): void {}
}

/**
 * Should test the raw performance impact of the PerfStress framework for asynchronous tests.
 */
export class NoOpAsync extends PerfStressTestAsync<string> {
  public options = {};
  async run(): Promise<void> {}
}
