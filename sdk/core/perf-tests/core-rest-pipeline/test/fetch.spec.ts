// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.


import { PerfOptionDictionary } from "@azure/test-utils-perf";
import { BaseHttpTest } from "./baseHttpTest";
import { TEST_SERVER_URL } from "./utils/serverUrl";

export class FetchTest extends BaseHttpTest {
  options: PerfOptionDictionary<Record<string, unknown>> = {};
  constructor() {
    super();
  }

  async run(): Promise<void> {
    const response = await fetch(TEST_SERVER_URL, { keepalive: false });
    await response.text(); // Hello World!
  }
}
