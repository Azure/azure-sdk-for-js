// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Recorder } from "@azure-tools/test-recorder";
import { assert } from "chai";
import { createRecorder, createClient } from "./utils/recordedClient";
import { Context } from "mocha";
import { AzureLoadTestingClient } from "../../src";

describe("File Upload", () => {
  let recorder: Recorder;
  let client: AzureLoadTestingClient;
  const DISPLAY_NAME = "sample_testrun";

  beforeEach(async function (this: Context) {
    recorder = await createRecorder(this);
    client = createClient();
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("should create a test run", async () => {
    const result = await client.path("/testruns/{testRunId}", "abcde").patch({
      contentType: "application/merge-patch+json",
      body: {
        testId: "abc",
        displayName: DISPLAY_NAME,
        vusers: 10,
      },
    });

    assert.include(["200"], result.status);
  });

  it("should create a test run", async () => {
    const result = await client.path("/testruns/{testRunId}", "abcde").get();

    assert.include(["200"], result.status);
  });
});
