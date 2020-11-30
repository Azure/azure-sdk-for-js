// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PerfStressTest, DefaultPerfStressOptions } from "../src";

/**
 * Should test the raw performance impact of the PerfStress framework for both synchronous and asynchronous tests.
 */
export class NoOp extends PerfStressTest<DefaultPerfStressOptions> {
  public options = {};

  run(): void {}

  async runAsync(): Promise<void> {}
}
