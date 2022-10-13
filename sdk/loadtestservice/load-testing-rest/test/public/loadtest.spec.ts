// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Recorder } from "@azure-tools/test-recorder";
import { assert } from "chai";
import { createRecorder, createClient } from "./utils/recordedClient";
import { Context } from "mocha";
import { AzureLoadTestingClient } from "../../src";

describe("Test Creation", () => {
  let recorder: Recorder;
  let client: AzureLoadTestingClient;

  beforeEach(async function (this: Context) {
    recorder = await createRecorder(this);
    client = createClient();
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("should create a loadtest", async () => {
    const result = await client.path("/loadtests/{testId}", "abc").patch({
      contentType: "application/merge-patch+json",
      body: {
        displayName: "sample_test",
        description: "",
        loadTestConfig: {
          engineInstances: 1,
          splitAllCSVs: false,
        },
      },
    });

    assert.include(["200", "201"], result.status);
  });
});
