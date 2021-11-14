// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { StorageBlobDownloadWithSASTest } from "./dowloadWithSAS.spec";
import { ServiceClient, WebResource } from "@azure/core-http";
import { drainStream } from "@azure/test-utils-perf";

export class CoreHTTPDownloadWithSASTest extends StorageBlobDownloadWithSASTest {
  client: ServiceClient;
  webResource: WebResource;
  constructor() {
    super();
    this.client = new ServiceClient();
    this.webResource = new WebResource(
      this.sasUrl,
      undefined,
      undefined,
      undefined,
      undefined,
      true, // streamResponseBody
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      true // keepAlive
    );
  }

  async run(): Promise<void> {
    const response = await this.client.sendRequest(this.webResource);
    await drainStream(response.readableStreamBody!);
  }
}
