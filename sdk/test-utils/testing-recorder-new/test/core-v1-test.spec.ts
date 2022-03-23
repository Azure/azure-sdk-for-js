// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { QueueServiceClient } from "@azure/storage-queue";
import { Recorder, RecorderStartOptions } from "@azure-tools/test-recorder";
import { assertEnvironmentVariable } from "./utils/utils";

const fakeSASUrl =
  "https://account_name.queue.core.windows.net/?sv=2020-08-04&ss=bfqt&srt=sco&sp=rwdlacuptfx&se=2026-07-10T07:00:24Z&st=2021-07-09T23:00:24Z&spr=https&sig=fake_sig";

const recorderOptions: RecorderStartOptions = {
  envSetupForPlayback: {
    STORAGE_SAS_URL: fakeSASUrl,
  },
};

const getSanitizerOptions = () => {
  return {
    generalSanitizers: [
      {
        target: assertEnvironmentVariable("STORAGE_SAS_URL").split("/")[2],
        value: fakeSASUrl.split("/")[2],
      },
      {
        target: assertEnvironmentVariable("STORAGE_SAS_URL").split("/")[3].split("?")[1],
        value: fakeSASUrl.split("/")[3].split("?")[1],
      },
    ],
  };
};

describe("Core V1 tests", () => {
  let recorder: Recorder;

  beforeEach(async function () {
    recorder = new Recorder(this.currentTest);

    await recorder.start(recorderOptions);
    await recorder.addSanitizers(getSanitizerOptions());
  });

  afterEach(async () => {
    await recorder.stop();
  });

  it("storage-queue create queue", async function () {
    const client = new QueueServiceClient(
      assertEnvironmentVariable("STORAGE_SAS_URL"),
      undefined,
      recorder.configureClientOptionsCoreV1({})
    );
    await client.createQueue(
      recorder.variable("queue-name", `queue-${Math.ceil(Math.random() * 1000 + 1000)}`)
    );
  });
});
