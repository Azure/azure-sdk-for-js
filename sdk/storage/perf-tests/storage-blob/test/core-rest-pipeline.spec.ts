// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { StorageBlobDownloadWithSASTest } from "./dowloadWithSAS.spec";
import {
  createDefaultHttpClient,
  HttpClient,
  createPipelineRequest,
  PipelineRequest
} from "@azure/core-rest-pipeline";
import { drainStream } from "@azure/test-utils-perfstress";

export class CoreHTTPSDownloadWithSASTest extends StorageBlobDownloadWithSASTest {
  client: HttpClient;
  request: PipelineRequest;
  constructor() {
    super();
    this.client = createDefaultHttpClient();
    this.request = createPipelineRequest({
      url: this.sasUrl,
      streamResponseStatusCodes: new Set([200, 206])
    });
  }

  async runAsync(): Promise<void> {
    const response = await this.client.sendRequest(this.request);
    await drainStream(response.readableStreamBody!);
  }
}
