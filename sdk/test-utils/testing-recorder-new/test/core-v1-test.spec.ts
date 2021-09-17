// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { env } from "@azure-tools/test-recorder";
import { QueueServiceClient, StoragePipelineOptions } from "@azure/storage-queue";
import { TestProxyHttpClientCoreV1 } from "@azure-tools/test-recorder-new";
import { config } from "dotenv";
import { isNode } from "@azure/core-util";
config();

describe("Tests", () => {
  it("storage test", async function() {
    const file = (isNode ? "node_" : "browser_") + `core_v1_file_path.json`;
    const recorder = new TestProxyHttpClientCoreV1(file);
    const options: StoragePipelineOptions = {};
    options.httpClient = recorder;
    const client = new QueueServiceClient(env.STORAGE_SAS_URL, undefined, options);
    await recorder.start();
    await client.createQueue((isNode ? "node-" : "browser-") + "1320");
    await recorder.stop();
  });
});
