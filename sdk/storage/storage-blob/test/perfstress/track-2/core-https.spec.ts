// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { StorageBlobDownloadWithSASTest } from "./dowloadWithSAS.spec";
import { DefaultHttpsClient, createPipelineRequest } from "@azure/core-https";
import { streamToBuffer3 } from "../../../src/utils/utils.node";

export class CoreHTTPSDownloadWithSASTest extends StorageBlobDownloadWithSASTest {
  async runAsync(): Promise<void> {
    const client = new DefaultHttpsClient();
    const request = createPipelineRequest({ url: this.sasUrl, streamResponseBody: true });
    const response = await client.sendRequest(request);
    await streamToBuffer3(response.readableStreamBody!);
  }
}
