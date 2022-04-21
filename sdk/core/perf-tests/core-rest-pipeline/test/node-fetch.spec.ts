// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.


import fetch from "node-fetch";
import https from "https";
import { PerfOptionDictionary } from "@azure/test-utils-perf";
import { TEST_SERVER_URL } from "./utils/serverUrl";
import { BaseHttpTest } from "./baseHttpTest";

export class NodeFetchTest extends BaseHttpTest {
  options: PerfOptionDictionary<Record<string, unknown>> = {};
  agent: https.Agent;
  constructor() {
    super();
    this.agent = new https.Agent({ keepAlive: true });
  }

  async run(): Promise<void> {
    const response = await fetch(TEST_SERVER_URL, { agent: this.agent, });
    console.log(response.body);
  }
}
