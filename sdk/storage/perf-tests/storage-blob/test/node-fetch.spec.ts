// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { StorageBlobDownloadWithSASTest } from "./dowloadWithSAS.spec";
import node_fetch from "node-fetch";
import https from "https";
import { drainStream } from "@azure/test-utils-perf";
export class NodeFetchDownloadWithSASTest extends StorageBlobDownloadWithSASTest {
  agent: https.Agent;
  constructor() {
    super();
    this.agent = new https.Agent({ keepAlive: true });
  }

  async run(): Promise<void> {
    const response = await node_fetch(this.sasUrl, { agent: this.agent });
    await drainStream(response.body);
  }
}
