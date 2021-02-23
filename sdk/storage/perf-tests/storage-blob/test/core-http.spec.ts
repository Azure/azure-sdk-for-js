// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { StorageBlobDownloadWithSASTest } from "./dowloadWithSAS.spec";
import { createPipelineRequest, PipelineRequest } from "@azure/core-https";
import { ServiceClient } from "@azure/core-client";
import { drainStream } from "@azure/test-utils-perfstress";

export class CoreHTTPDownloadWithSASTest extends StorageBlobDownloadWithSASTest {
  client: ServiceClient;
  webResource: PipelineRequest;
  constructor() {
    super();
    this.client = new ServiceClient();
    this.webResource = createPipelineRequest({
      url: this.sasUrl,
      streamResponseStatusCodes: new Set([200, 202]),
      keepAlive: true
    });
  }

  async runAsync(): Promise<void> {
    const response = await this.client.sendRequest(this.webResource);
    await drainStream(response.readableStreamBody!);
  }
}
