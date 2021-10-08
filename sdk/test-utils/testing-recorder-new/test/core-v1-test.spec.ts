// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { env } from "@azure-tools/test-recorder";
import { QueueServiceClient, StoragePipelineOptions } from "@azure/storage-queue";
import { TestProxyHttpClientCoreV1 } from "@azure-tools/test-recorder-new";
import { config } from "dotenv";
import { isNode } from "@azure/core-util";
config();

describe("Core V1 tests", () => {
  let recorder: TestProxyHttpClientCoreV1;

  beforeEach(function() {
    recorder = new TestProxyHttpClientCoreV1(this.currentTest);
  });

  afterEach(async () => {
    await recorder.stop();
  });

  it("storage-queue create queue", async function() {
    const options: StoragePipelineOptions = {};
    options.httpClient = recorder;
    const client = new QueueServiceClient(env.STORAGE_SAS_URL, undefined, options);
    await recorder.start();
    await client.createQueue((isNode ? "node-" : "browser-") + "1320");
  });
});
