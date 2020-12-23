// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { StorageBlobDownloadWithSASTest } from "./dowloadWithSAS.spec";
import node_fetch from "node-fetch";
import { streamToBuffer3 } from "../../../src/utils/utils.node";
import https from "https";
export class NodeFetchDownloadWithSASTest extends StorageBlobDownloadWithSASTest {
  agent: https.Agent;
  constructor() {
    super();
    this.agent = new https.Agent({ keepAlive: true });
  }

  async runAsync(): Promise<void> {
    const response = await node_fetch(this.sasUrl, { agent: this.agent });
    await streamToBuffer3(response.body);
  }
}
