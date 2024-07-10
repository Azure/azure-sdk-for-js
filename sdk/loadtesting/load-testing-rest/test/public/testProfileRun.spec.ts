// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { assert } from "chai";
import { createClient, createRecorder } from "./utils/recordedClient.js";
import { Context } from "mocha";
import * as fs from "fs";
import { AzureLoadTestingClient, isUnexpected } from "../../src/index.js";
import { AbortController } from "@azure/abort-controller";
import { getLongRunningPoller } from "../../src/pollingHelper.js";
import { env, isPlaybackMode, Recorder } from "@azure-tools/test-recorder";
import { isNode } from "@azure/core-util";

describe("Test Profile Run Creation", () => {
  let recorder: Recorder;
  let client: AzureLoadTestingClient;
  let readStreamTestFile: fs.ReadStream;
  let testProfileId = "sample-test-profile-2";
  let testProfileRunId = "sample-test-profile-run-2";

  beforeEach(async function (this: Context) {
    recorder = await createRecorder(this);
    if (!isNode || isPlaybackMode()) {
      this.skip();
    }
    client = createClient(recorder);
    readStreamTestFile = fs.createReadStream("./test/public/sample.jmx");
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

  it("should upload the test file with LRO", async () => {
    const fileUploadResult = await client
      .path("/tests/{testId}/files/{fileName}", "test-profile-test", "sample.jmx")
      .put({
        contentType: "application/octet-stream",
        body: readStreamTestFile,
      });

    if (isUnexpected(fileUploadResult)) {
      throw fileUploadResult.body.error;
    }

    const fileValidatePoller = await getLongRunningPoller(client, fileUploadResult);
    await fileValidatePoller.pollUntilDone({
      abortSignal: AbortController.timeout(60000), // timeout of 60 seconds
    });
    assert.equal(fileValidatePoller.getOperationState().status, "succeeded");
  });

  it("should create a test profile", async () => {
    const result = await client.path("/test-profiles/{testProfileId}", testProfileId).patch({
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
    const result = await client.path("/test-profiles/{testProfileId}", testProfileId).get();

    assert.equal("200", result.status);
  });

  it("should not be able create a test profile run (404)", async () => {
    const result = await client
      .path("/test-profile-runs/{testProfileRunId}", testProfileRunId)
      .patch({
        contentType: "application/merge-patch+json",
        body: {
          displayName: "Sample Test Profile Run",
          testProfileId: "NON_EXISTENT_TEST_PROFILE",
        },
      });

    assert.equal(result.status, "404");
  });

  it("should create a test profile run", async () => {
    const result = await client
      .path("/test-profile-runs/{testProfileRunId}", testProfileRunId)
      .patch({
        contentType: "application/merge-patch+json",
        body: {
          displayName: "Sample Test Profile Run",
          testProfileId: "sample-test-profile",
        },
      });

    assert.include(["200", "201"], result.status);

    if (isUnexpected(result)) {
      throw result.body.error;
    }

    const testProfileRunPoller = await getLongRunningPoller(client, result);
    await testProfileRunPoller.pollUntilDone({
      abortSignal: AbortController.timeout(600000), // timeout of 10 minutes
    });

    assert.equal(testProfileRunPoller.getOperationState().status, "succeeded");
  });

  it("should get the test profile run", async () => {
    const result = await client
      .path("/test-profile-runs/{testProfileRunId}", testProfileRunId)
      .get();

    assert.equal(result.status, "200");
  });

  it("should delete the created test profile run", async () => {
    const result = await client
      .path("/test-profile-runs/{testProfileRunId}", testProfileRunId)
      .delete();

    assert.equal(result.status, "204");
  });

  it("should delete the created test profile", async () => {
    const result = await client.path("/test-profiles/{testProfileId}", testProfileId).delete();

    assert.equal("204", result.status);
  });
});

describe("Test Profile Run Stop", () => {
  let recorder: Recorder;
  let client: AzureLoadTestingClient;
  let readStreamTestFile: fs.ReadStream;
  let testProfileId = "sample-test-profile-3";
  let testProfileRunId = "sample-test-profile-run-3";

  beforeEach(async function (this: Context) {
    recorder = await createRecorder(this);
    if (!isNode || isPlaybackMode()) {
      this.skip();
    }
    client = createClient(recorder);
    readStreamTestFile = fs.createReadStream("./test/public/sample.jmx");
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

  it("should upload the test file with LRO", async () => {
    const fileUploadResult = await client
      .path("/tests/{testId}/files/{fileName}", "test-profile-test", "sample.jmx")
      .put({
        contentType: "application/octet-stream",
        body: readStreamTestFile,
      });

    if (isUnexpected(fileUploadResult)) {
      throw fileUploadResult.body.error;
    }

    const fileValidatePoller = await getLongRunningPoller(client, fileUploadResult);
    await fileValidatePoller.pollUntilDone({
      abortSignal: AbortController.timeout(60000), // timeout of 60 seconds
    });
    assert.equal(fileValidatePoller.getOperationState().status, "succeeded");
  });

  it("should create a test profile", async () => {
    const result = await client.path("/test-profiles/{testProfileId}", testProfileId).patch({
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
    const result = await client.path("/test-profiles/{testProfileId}", testProfileId).get();

    assert.equal("200", result.status);
  });

  it("should create a test profile run", async () => {
    const result = await client
      .path("/test-profile-runs/{testProfileRunId}", testProfileRunId)
      .patch({
        contentType: "application/merge-patch+json",
        body: {
          displayName: "Sample Test Profile Run",
          testProfileId: "sample-test-profile",
        },
      });

    assert.include(["200", "201"], result.status);

    if (isUnexpected(result)) {
      throw result.body.error;
    }

    const testProfileRunPoller = await getLongRunningPoller(client, result);
    await testProfileRunPoller.pollUntilDone({
      abortSignal: AbortController.timeout(180000), // Wait for some time
    });

    assert.equal(testProfileRunPoller.getOperationState().status, "running");
  });

  it("should stop the test profile run", async () => {
    const result = await client
      .path("/test-profile-runs/{testProfileRunId}:stop", testProfileRunId)
      .post();

    assert.equal(result.status, "200");
  });

  it("should get the test profile run", async () => {
    const result = await client
      .path("/test-profile-runs/{testProfileRunId}", testProfileRunId)
      .get();

    assert.equal(result.status, "200");
  });

  it("should delete the created test profile run", async () => {
    const result = await client
      .path("/test-profile-runs/{testProfileRunId}", testProfileRunId)
      .delete();

    assert.equal(result.status, "204");
  });

  it("should delete the created test profile", async () => {
    const result = await client.path("/test-profiles/{testProfileId}", testProfileId).delete();

    assert.equal("204", result.status);
  });
});
