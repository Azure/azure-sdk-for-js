// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { env, isPlaybackMode } from "@azure-tools/test-recorder";
import { QueueServiceClient } from "@azure/storage-queue";
import { TestProxyHttpClientCoreV1 } from "@azure-tools/test-recorder-new";
import { config } from "dotenv";
import { RecorderStartOptions } from "@azure-tools/test-recorder-new";
config();

const fakeSASUrl =
  "https://account_name.queue.core.windows.net/?sv=2020-08-04&ss=bfqt&srt=sco&sp=rwdlacuptfx&se=2026-07-10T07:00:24Z&st=2021-07-09T23:00:24Z&spr=https&sig=fake_sig";

const recorderOptions: RecorderStartOptions = {
  envSetupForPlayback: {
    STORAGE_SAS_URL: fakeSASUrl
  }
};

const getSanitizerOptions = () => {
  return {
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
  };
};

describe("Core V1 tests", () => {
  let recorder: TestProxyHttpClientCoreV1;

  beforeEach(async function() {
    recorder = new TestProxyHttpClientCoreV1(this.currentTest);

    await recorder.start(recorderOptions);
    await recorder.addSanitizers(getSanitizerOptions());
  });

  afterEach(async () => {
    await recorder.stop();
  });

  it("storage-queue create queue", async function() {
    const client = new QueueServiceClient(env.STORAGE_SAS_URL, undefined, { httpClient: recorder });
    if (!isPlaybackMode()) {
      recorder.variables["queue-name"] = `queue-${Math.ceil(Math.random() * 1000 + 1000)}`;
    }
    await client.createQueue(recorder.variables["queue-name"]);
  });
});
