// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PerfStressTest } from "../src";
import { delay } from "@azure/core-http";

export class Delay500ms extends PerfStressTest<string> {
  public options = {};
  async run(): Promise<void> {
    await delay(500);
  }
}
