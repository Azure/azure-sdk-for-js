// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { StorageBlobDownloadWithSASTest } from "./dowloadWithSAS.spec";
import node_fetch from "node-fetch";
import { streamToBuffer3 } from "../../../src/utils/utils.node";

export class NodeFetchDownloadWithSASTest extends StorageBlobDownloadWithSASTest {
  async runAsync(): Promise<void> {
    const response = await node_fetch(this.sasUrl);
    await streamToBuffer3(response.body);
  }
}
