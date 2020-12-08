// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { StorageBlobDownloadWithSASTest } from "./dowloadWithSAS.spec";
import { ServiceClient, WebResource } from "@azure/core-http";
import { streamToBuffer3 } from "../../../src/utils/utils.node";

export class CoreHTTPDownloadWithSASTest extends StorageBlobDownloadWithSASTest {
  client: ServiceClient;
  constructor() {
    super();
    this.client = new ServiceClient();
  }

  async runAsync(): Promise<void> {
    const response = await this.client.sendRequest(
      new WebResource(
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
      )
    );
    await streamToBuffer3(response.readableStreamBody!);
  }
}
