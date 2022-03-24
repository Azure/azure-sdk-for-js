// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.


import node_fetch from "node-fetch";
import https from "https";
import { PerfOptionDictionary, PerfTest } from "@azure/test-utils-perf";
import { TEST_SERVER_URL } from "./utils/server";

export class NodeFetchTest extends PerfTest {
  options: PerfOptionDictionary<Record<string, unknown>> = {};
  agent: https.Agent;
  constructor() {
    super();
    this.agent = new https.Agent({ keepAlive: true });
  }

  async run(): Promise<void> {
    const response = await node_fetch(TEST_SERVER_URL, { agent: this.agent, });
    console.log(response.body);
  }
}
