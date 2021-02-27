// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PerfStressTest } from "@azure/test-utils-perfstress";

/**
 * Should test the raw performance impact of the PerfStress framework for both synchronous and asynchronous tests.
 */
export class NoOp extends PerfStressTest {
  public options = {};

  run(): void {}

  async runAsync(): Promise<void> {}
}
