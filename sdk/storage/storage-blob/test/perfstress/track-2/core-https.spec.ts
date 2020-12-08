// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { StorageBlobDownloadWithSASTest } from "./dowloadWithSAS.spec";
import { DefaultHttpsClient, createPipelineRequest } from "@azure/core-https";
import { streamToBuffer3 } from "../../../src/utils/utils.node";

export class CoreHTTPSDownloadWithSASTest extends StorageBlobDownloadWithSASTest {
  client: DefaultHttpsClient;
  constructor() {
    super();
    this.client = new DefaultHttpsClient();
  }
  async runAsync(): Promise<void> {
    const request = createPipelineRequest({
      url: this.sasUrl,
      streamResponseBody: true,
      keepAlive: true
    });
    const response = await this.client.sendRequest(request);
    await streamToBuffer3(response.readableStreamBody!);
  }
}
