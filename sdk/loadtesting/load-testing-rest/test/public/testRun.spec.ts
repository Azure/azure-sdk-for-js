// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder } from "@azure-tools/test-recorder";
import { env, isPlaybackMode } from "@azure-tools/test-recorder";
import { createRecorder, createClient } from "./utils/recordedClient.js";
import type {
  AppComponent,
  AzureLoadTestingClient,
  TestRunAppComponentsOutput,
} from "../../src/index.js";
import { isUnexpected } from "../../src/index.js";
import { isNodeLike } from "@azure/core-util";
import * as fs from "node:fs";
import { getLongRunningPoller } from "../../src/pollingHelper.js";
import { describe, it, assert, beforeEach, afterEach } from "vitest";

describe("Test Run Operations", () => {
  let recorder: Recorder;
  let client: AzureLoadTestingClient;
  const SUBSCRIPTION_ID = env["SUBSCRIPTION_ID"] || "";
  const testId = "sample-sdk-test-20250318"; // TestId of an existing test
  const testRunId = "sample-sdk-testrun-20250318-2"; // The test run that will get created

  beforeEach(async (ctx) => {
    recorder = await createRecorder(ctx);
    if (!isNodeLike || isPlaybackMode()) {
      ctx.skip();
    }
    client = createClient(recorder);
  });

  afterEach(async () => {
    await recorder.stop();
  });

  // Pre-req for creating a test-run
  it("should create a load test", async () => {
    const result = await client.path("/tests/{testId}", testId).patch({
      contentType: "application/merge-patch+json",
      body: {
        displayName: "Sample Load Test",
        description: "Sample Load Test Description",
        loadTestConfiguration: {
          engineInstances: 1,
          splitAllCSVs: false,
        },
      },
    });

    assert.include(["200", "201"], result.status);
  });

  // Pre-req for creating a test-run
  it("should upload the test file with LRO", async () => {
    const readStreamTestFile: fs.ReadStream = fs.createReadStream("./test/public/sample.jmx");
    const fileUploadResult = await client
      .path("/tests/{testId}/files/{fileName}", testId, "sample.jmx")
      .put({
        contentType: "application/octet-stream",
        body: readStreamTestFile,
      });

    if (isUnexpected(fileUploadResult)) {
      throw fileUploadResult.body.error;
    }

    const fileValidatePoller = await getLongRunningPoller(client, fileUploadResult);
    await fileValidatePoller.pollUntilDone({
      abortSignal: AbortSignal.timeout(60000), // timeout of 60 seconds
    });
    assert.equal(fileValidatePoller.getOperationState().status, "succeeded");
  });

  it("should timeout while polling the test run", async () => {
    const timeoutTestRunId = "sample-sdk-testrun-20250318-1";
    const testRunCreationResult = await client
      .path("/test-runs/{testRunId}", timeoutTestRunId)
      .patch({
        contentType: "application/merge-patch+json",
        body: {
          testId: testId,
          displayName: "Time out Test Run",
        },
      });

    if (isUnexpected(testRunCreationResult)) {
      throw testRunCreationResult.body.error;
    }

    const testRunPoller = await getLongRunningPoller(client, testRunCreationResult);
    try {
      await testRunPoller.pollUntilDone({
        abortSignal: AbortSignal.timeout(10), // timeout of 10 milliseconds
      });
    } catch (ex: any) {
      assert.equal(ex.name, "AbortError");
      return;
    }

    assert.fail();
  });

  it("should be able to create a test run", async () => {
    const testRunCreationResult = await client.path("/test-runs/{testRunId}", testRunId).patch({
      contentType: "application/merge-patch+json",
      body: {
        testId: testId,
        displayName: "Sample Test Run",
      },
    });

    if (isUnexpected(testRunCreationResult)) {
      throw testRunCreationResult.body.error;
    }

    const testRunPoller = await getLongRunningPoller(client, testRunCreationResult);
    await testRunPoller.pollUntilDone({
      abortSignal: AbortSignal.timeout(600000),
    });

    assert.equal(testRunPoller.getOperationState().status, "succeeded");
  });

  it("should get a test run", async () => {
    const result = await client.path("/test-runs/{testRunId}", testRunId).get();

    assert.include(["200"], result.status);
  });

  it("should create a app component for test run", async () => {
    const appCompResourceId = `/subscriptions/${SUBSCRIPTION_ID}/resourceGroups/contoso-sampleapp-rg/providers/Microsoft.Web/sites/contoso-sampleapp`;
    const appComponent: AppComponent = {
      resourceName: "contoso-sampleapp",
      resourceType: "Microsoft.Web/sites",
    };
    const appComps: Record<string, AppComponent> = {};

    appComps[appCompResourceId] = appComponent;

    const result = await client.path("/test-runs/{testRunId}/app-components", testRunId).patch({
      contentType: "application/merge-patch+json",
      body: {
        components: appComps,
      },
    });

    assert.include(["200", "201"], result.status);
  });

  it("should get a test run app components", async () => {
    const result = await client.path("/test-runs/{testRunId}/app-components", testRunId).get();

    assert.include(["200"], result.status);

    const output = result.body as TestRunAppComponentsOutput;
    assert.isNotEmpty(output.components);
  });

  it("should get a test run server metrics config", async () => {
    const result = await client
      .path("/test-runs/{testRunId}/server-metrics-config", testRunId)
      .get();

    assert.include(["200"], result.status);
  });

  it("should delete a test run", async () => {
    const result = await client.path("/test-runs/{testRunId}", testRunId).delete();

    assert.include(["204"], result.status);
  });

  it("should delete the test", async () => {
    const result = await client.path("/tests/{testId}", testId).delete();

    assert.include(["204"], result.status);
  });
});
