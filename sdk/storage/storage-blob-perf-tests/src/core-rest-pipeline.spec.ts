// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StorageBlobDownloadWithSASTest } from "./dowloadWithSAS.spec.js";
import {
  createDefaultHttpClient,
  HttpClient,
  createPipelineRequest,
  PipelineRequest,
} from "@azure/core-rest-pipeline";
import { drainStream } from "@azure-tools/test-perf";

export class CoreHTTPSDownloadWithSASTest extends StorageBlobDownloadWithSASTest {
  client: HttpClient;
  request: PipelineRequest;
  constructor() {
    super();
    this.client = createDefaultHttpClient();
    this.request = createPipelineRequest({
      url: this.sasUrl,
      streamResponseStatusCodes: new Set([200, 206]),
    });
  }

  async run(): Promise<void> {
    const response = await this.client.sendRequest(this.request);
    await drainStream(response.readableStreamBody!);
  }
}
