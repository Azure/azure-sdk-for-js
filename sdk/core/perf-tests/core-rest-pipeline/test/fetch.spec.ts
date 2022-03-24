// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.


import { PerfOptionDictionary, PerfTest } from "@azure/test-utils-perf";
import { TEST_SERVER_URL } from "./utils/server";

export class FetchTest extends PerfTest {
  options: PerfOptionDictionary<Record<string, unknown>> = {};
  constructor() {
    super();
  }

  async run(): Promise<void> {
    const response = await fetch(TEST_SERVER_URL, { keepalive: false });
    console.log(response.body);
  }
}
