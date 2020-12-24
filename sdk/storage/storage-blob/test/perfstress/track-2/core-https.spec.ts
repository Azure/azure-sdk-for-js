// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { StorageBlobDownloadWithSASTest } from "./dowloadWithSAS.spec";
import { DefaultHttpsClient, createPipelineRequest, PipelineRequest } from "@azure/core-https";
import { drainStream } from "@azure/test-utils-perfstress";

export class CoreHTTPSDownloadWithSASTest extends StorageBlobDownloadWithSASTest {
  client: DefaultHttpsClient;
  request: PipelineRequest<any>;
  constructor() {
    super();
    this.client = new DefaultHttpsClient();
    this.request = createPipelineRequest({
      url: this.sasUrl,
      streamResponseBody: true,
      keepAlive: true
    });
  }

  async runAsync(): Promise<void> {
    const response = await this.client.sendRequest(this.request);
    await drainStream(response.readableStreamBody!);
  }
}
