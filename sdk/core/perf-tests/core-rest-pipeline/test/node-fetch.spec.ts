// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.


import node_fetch from "node-fetch";
import https from "https";
import { BaseHttpTest } from "./baseHttpTest";

export class NodeFetchTest extends BaseHttpTest {
  agent: https.Agent;
  constructor() {
    super();
    this.agent = new https.Agent({ keepAlive: true });
  }

  async run(): Promise<void> {
    const response = await node_fetch(this.url, { agent: this.agent, });
    console.log(response.body);
  }
}
