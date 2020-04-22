// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PerfStressTest } from "../src";

/**
 * Should test the raw performance impact of the PerfStress framework for both synchronous and asynchronous tests.
 */
export class NoOp extends PerfStressTest<string> {
  public options = {};

  run(): void {}

  async runAsync(): Promise<void> {}
}
