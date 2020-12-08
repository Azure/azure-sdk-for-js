// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { StorageBlobDownloadWithSASTest } from "./dowloadWithSAS.spec";
import { ServiceClient, WebResource } from "@azure/core-http";
import { streamToBuffer3 } from "../../../src/utils/utils.node";

export class CoreHTTPDownloadWithSASTest extends StorageBlobDownloadWithSASTest {
  async runAsync(): Promise<void> {
    const client = new ServiceClient();
    const response = await client.sendRequest(
      new WebResource(this.sasUrl, undefined, undefined, undefined, undefined, true)
    );
    await streamToBuffer3(response.readableStreamBody!);
  }
}
