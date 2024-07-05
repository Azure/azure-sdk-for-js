// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { assert } from "chai";
import { createClient, createRecorder } from "./utils/recordedClient.js";
import { Context } from "mocha";
import { AzureLoadTestingClient } from "../../src/index.js";
import { env, isPlaybackMode, Recorder } from "@azure-tools/test-recorder";
import { isNode } from "@azure/core-util";

describe("Test Profile Creation", () => {
  let recorder: Recorder;
  let client: AzureLoadTestingClient;

  beforeEach(async function (this: Context) {
    recorder = await createRecorder(this);
    if (!isNode || isPlaybackMode()) {
      this.skip();
    }
    client = createClient(recorder);
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("should create a loadtest", async () => {
    const result = await client.path("/tests/{testId}", "test-profile-test").patch({
      contentType: "application/merge-patch+json",
      body: {
        displayName: "sample_test",
        description: "A sample test for a test profile",
        loadTestConfiguration: {
          engineInstances: 1,
          splitAllCSVs: false,
        },
      },
    });

    assert.include(["200", "201"], result.status);
  });

  it("should create a test profile", async () => {
    const result = await client
      .path("/test-profiles/{testProfileId}", "sample-test-profile")
      .patch({
        contentType: "application/merge-patch+json",
        body: {
          testId: "test-profile-test",
          targetResourceId: env["LOADTESTSERVICE_TARGETRESOURCEID"],
          displayName: "Sample Test Profile",
          targetResourceConfigurations: {
            kind: "FunctionsFlexConsumption",
            configurations: {
              configuration1: {
                instanceMemoryMB: 2048,
                httpConcurrency: 10,
              },
              configuration2: {
                instanceMemoryMB: 2048,
                httpConcurrency: 20,
              },
            },
          },
        },
      });

    assert.include(["200", "201"], result.status);
  });

  it("should get the created test profile", async () => {
    const result = await client.path("/test-profiles/{testProfileId}", "sample-test-profile").get();

    assert.equal("200", result.status);
  });

  it("should delete the created test profile", async () => {
    const result = await client
      .path("/test-profiles/{testProfileId}", "sample-test-profile")
      .delete();

    assert.equal("204", result.status);
  });
});
