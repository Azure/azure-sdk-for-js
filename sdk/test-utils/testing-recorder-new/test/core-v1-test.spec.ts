// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { env } from "@azure-tools/test-recorder";
import { QueueServiceClient, StoragePipelineOptions } from "@azure/storage-queue";
import { TestProxyHttpClientCoreV1 } from "@azure-tools/test-recorder-new";
import { config } from "dotenv";
import { isNode } from "@azure/core-util";
config();

const fakeSASUrl =
  "https://account_name.queue.core.windows.net/?sv=2020-08-04&ss=bfqt&srt=sco&sp=rwdlacuptfx&se=2026-07-10T07:00:24Z&st=2021-07-09T23:00:24Z&spr=https&sig=fake_sig";

describe("Core V1 tests", () => {
  let recorder: TestProxyHttpClientCoreV1;

  beforeEach(async function() {
    recorder = new TestProxyHttpClientCoreV1(this.currentTest);

    await recorder.start({
      envSetupForPlayback: {
        STORAGE_SAS_URL: fakeSASUrl
      }
    });
    await recorder.addSanitizers({
      generalRegexSanitizers: [
        {
          regex: env.STORAGE_SAS_URL.split("/")[2],
          value: fakeSASUrl.split("/")[2]
        },
        {
          regex: env.STORAGE_SAS_URL.split("/")[3].split("?")[1],
          value: fakeSASUrl.split("/")[3].split("?")[1]
        }
      ]
    });
  });

  afterEach(async () => {
    await recorder.stop();
  });

  it("storage-queue create queue", async function() {
    const options: StoragePipelineOptions = {};
    options.httpClient = recorder;
    const client = new QueueServiceClient(env.STORAGE_SAS_URL, undefined, options);
    await client.createQueue((isNode ? "node-" : "browser-") + "1320");
  });
});
