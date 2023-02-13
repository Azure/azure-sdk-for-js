// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { env, isPlaybackMode, Recorder } from "@azure-tools/test-recorder";
import { assert } from "chai";
import { createRecorder, createClient } from "./utils/recordedClient";
import { AbortController } from "@azure/abort-controller";
import { Context } from "mocha";
import * as fs from "fs";
import { AzureLoadTestingClient, isUnexpected } from "../../src";
import { isNode } from "@azure/core-util";
import { getLongRunningPoller } from "../../src/pollingHelper";

describe("Test Run Creation", () => {
  let recorder: Recorder;
  let client: AzureLoadTestingClient;
  const SUBSCRIPTION_ID = env["SUBSCRIPTION_ID"] || "";
  let readStreamTestFile: fs.ReadStream;

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
    const result = await client.path("/tests/{testId}", "abc").patch({
      contentType: "application/merge-patch+json",
      body: {
        displayName: "sample_test",
        description: "",
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
      .path("/tests/{testId}/files/{fileName}", "abc", "sample.jmx")
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

  it("should not be able to create a test run(404)", async () => {
    const testRunCreationResult = await client.path("/test-runs/{testRunId}", "abcjad").patch({
      contentType: "application/merge-patch+json",
      body: {
        testId: "abc",
        displayName: "sample123",
        virtualUsers: 10,
      },
    });

    if (isUnexpected(testRunCreationResult)) {
      throw testRunCreationResult.body.error;
    }

    testRunCreationResult.body.testRunId = "adjwfjsdmf";
    const testRunPoller = await getLongRunningPoller(client, testRunCreationResult);
    await testRunPoller.pollUntilDone({
      abortSignal: AbortController.timeout(60000), // timeout of 60 seconds
    });

    assert.equal(testRunPoller.getOperationState().status, "failed");
  });

  it("should timeout the test run", async () => {
    const testRunCreationResult = await client
      .path("/test-runs/{testRunId}", "randomtestrun4")
      .patch({
        contentType: "application/merge-patch+json",
        body: {
          testId: "abc",
          displayName: "sample123",
          virtualUsers: 10,
        },
      });

    if (isUnexpected(testRunCreationResult)) {
      throw testRunCreationResult.body.error;
    }

    const testRunPoller = await getLongRunningPoller(client, testRunCreationResult);
    try {
      await testRunPoller.pollUntilDone({
        abortSignal: AbortController.timeout(10), // timeout of 10 millieconds
      });
    } catch (ex: any) {
      assert.equal(ex.name, "AbortError");
      return;
    }

    assert.fail();
  });

  it("should be able to create a test run", async () => {
    const testRunCreationResult = await client.path("/test-runs/{testRunId}", "abcde").patch({
      contentType: "application/merge-patch+json",
      body: {
        testId: "abc",
        displayName: "sample123",
        virtualUsers: 10,
      },
    });

    if (isUnexpected(testRunCreationResult)) {
      throw testRunCreationResult.body.error;
    }

    const testRunPoller = await getLongRunningPoller(client, testRunCreationResult);
    await testRunPoller.pollUntilDone({
      abortSignal: AbortController.timeout(60000), // timeout of 60 seconds
    });

    assert.equal(testRunPoller.getOperationState().status, "succeeded");
  });

  it("should get a test run", async () => {
    const result = await client.path("/test-runs/{testRunId}", "abcde").get();

    assert.include(["200"], result.status);
  });

  it("should create a app component for test run", async () => {
    const result = await client.path("/test-runs/{testRunId}/app-components", "abcde").patch({
      contentType: "application/merge-patch+json",
      body: {
        components: {
          "/subscriptions/{SUBSCRIPTION_ID}/resourceGroups/App-Service-Sample-Demo-rg/providers/Microsoft.Web/sites/App-Service-Sample-Demo":
            {
              resourceId:
                "/subscriptions/{SUBSCRIPTION_ID}/resourceGroups/App-Service-Sample-Demo-rg/providers/Microsoft.Web/sites/App-Service-Sample-Demo",
              resourceName: "App-Service-Sample-Demo",
              resourceType: "Microsoft.Web/sites",
              subscriptionId: SUBSCRIPTION_ID,
            },
        },
      },
    });

    assert.include(["200", "201"], result.status);
  });

  it("should get a test run app components", async () => {
    const result = await client.path("/test-runs/{testRunId}/app-components", "abcde").get();

    assert.include(["200"], result.status);
  });

  it("should get a test run server metrics config", async () => {
    const result = await client.path("/test-runs/{testRunId}/server-metrics-config", "abcde").get();

    assert.include(["200"], result.status);
  });

  it("should delete a test run", async () => {
    const result = await client.path("/test-runs/{testRunId}", "abcde").delete();

    assert.include(["204"], result.status);
  });

  it("should delete the test", async () => {
    const result = await client.path("/tests/{testId}", "abc").delete();

    assert.include(["204"], result.status);
  });
});
