// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Recorder } from "@azure-tools/test-recorder";
import { assert } from "chai";
import { createRecorder, createClient } from "./utils/recordedClient";
import { Context } from "mocha";
import { AzureLoadTestingClient } from "../../src";

describe("Test Run Creation", () => {
  let recorder: Recorder;
  let client: AzureLoadTestingClient;

  beforeEach(async function (this: Context) {
    recorder = await createRecorder(this);
    client = createClient(recorder);
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("should create a test run", async () => {
    const result = await client.path("/testruns/{testRunId}", "abcde").patch({
      contentType: "application/merge-patch+json",
      body: {
        testId: "abc",
        displayName: "sample_testrun",
        vusers: 10,
      },
    });

    assert.include(["200"], result.status);
  });

  it("should get a test run", async () => {
    const result = await client.path("/testruns/{testRunId}", "abcde").get();

    assert.include(["200"], result.status);
  });
});
