// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PerfTest } from "../src";

/**
 * Should test the raw performance impact of the Perf framework for both synchronous and asynchronous tests.
 */
export class NoOp extends PerfTest {
  public options = {};

  async run(): Promise<void> {
    // do nothing
  }
}
