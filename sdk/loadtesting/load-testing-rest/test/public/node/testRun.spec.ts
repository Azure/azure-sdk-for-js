// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder } from "@azure-tools/test-recorder";
import { env, isPlaybackMode } from "@azure-tools/test-recorder";
import { createRecorder, createClient } from "../utils/recordedClient.js";
import type {
  AppComponent,
  AzureLoadTestingClient,
  TestProfileRunOutput,
  TestRunAppComponentsOutput,
} from "../../../src/index.js";
import { isUnexpected } from "../../../src/index.js";
import fs from "node:fs";
import { getLongRunningPoller } from "../../../src/pollingHelper.js";
import { describe, it, assert, beforeEach, afterEach } from "vitest";

const testPollingOptions = {
  updateIntervalInMs: isPlaybackMode() ? 0 : undefined,
};

describe("Test Run Operations", () => {
  let recorder: Recorder;
  let client: AzureLoadTestingClient;
  const testId = "sample-sdk-testtr-20250318"; // The test that will get created
  const testRunId = "sample-sdk-testrun-20250318-2"; // The test run that will get created

  beforeEach(async (ctx) => {
    recorder = await createRecorder(ctx);
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

    const fileValidatePoller = await getLongRunningPoller(
      client,
      fileUploadResult,
      testPollingOptions,
    );
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

  it("should stop the test run", async () => {
    const timeoutTestRunId = "sample-sdk-testrun-20250318-1";
    const stopResult = await client.path("/test-runs/{testRunId}:stop", timeoutTestRunId).post();

    if (isUnexpected(stopResult)) {
      throw stopResult.body.error;
    }

    assert.equal("200", stopResult.status);
  });

  it("should be able to create a test run and poll", async () => {
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

    const testRunPoller = await getLongRunningPoller(
      client,
      testRunCreationResult,
      testPollingOptions,
    );
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
    const SUBSCRIPTION_ID = env["SUBSCRIPTION_ID"] || "";

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

describe("Test Profile Run Operations", () => {
  let recorder: Recorder;
  let client: AzureLoadTestingClient;
  const testId = "sample-sdk-testtpr-20250319";
  const testProfileId = "sample-sdk-testprofile-202503198";
  const testProfileRunId = "sample-sdk-testprofilerun-202503198";

  beforeEach(async (ctx) => {
    recorder = await createRecorder(ctx);
    client = createClient(recorder);
  });

  afterEach(async () => {
    await recorder.stop();
  });

  // Pre-req for creating a test profile run
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

  // Pre-req for creating a test profile run
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

    const fileValidatePoller = await getLongRunningPoller(
      client,
      fileUploadResult,
      testPollingOptions,
    );
    await fileValidatePoller.pollUntilDone({
      abortSignal: AbortSignal.timeout(60000), // timeout of 60 seconds
    });
    assert.equal(fileValidatePoller.getOperationState().status, "succeeded");
  });

  it("should create a test profile with the given test", async () => {
    const flexFunctionsResourceId = env["LOADTESTSERVICE_FLEXFUNCTIONSRESOURCEID"] || "";
    const testProfileDisplayName = "Sample Test Profile";
    const testProfileDescription = "Sample Test Profile Description";

    const testProfileCreationResult = await client
      .path("/test-profiles/{testProfileId}", testProfileId)
      .patch({
        contentType: "application/merge-patch+json",
        body: {
          testId: testId,
          displayName: testProfileDisplayName,
          description: testProfileDescription,
          targetResourceId: flexFunctionsResourceId,
          targetResourceConfigurations: {
            kind: "FunctionsFlexConsumption",
            configurations: {
              config1: {
                instanceMemoryMB: 2048,
                httpConcurrency: 20,
              },
              config2: {
                instanceMemoryMB: 4096,
                httpConcurrency: 40,
              },
            },
          },
        },
      });

    if (isUnexpected(testProfileCreationResult)) {
      throw testProfileCreationResult.body.error;
    }

    assert.include(["200", "201"], testProfileCreationResult.status);
  });

  it("should create a test profile run and poll", async () => {
    const testProfileRunCreationResult = await client
      .path("/test-profile-runs/{testProfileRunId}", testProfileRunId)
      .patch({
        contentType: "application/merge-patch+json",
        body: {
          testProfileId: testProfileId,
          displayName: "Sample Test Profile Run",
        },
      });

    if (isUnexpected(testProfileRunCreationResult)) {
      throw testProfileRunCreationResult.body.error;
    }

    const testProfileRunPoller = await getLongRunningPoller(
      client,
      testProfileRunCreationResult,
      testPollingOptions,
    );
    const polledResult = await testProfileRunPoller.pollUntilDone({
      abortSignal: AbortSignal.timeout(1200000),
    });

    assert.equal(testProfileRunPoller.getOperationState().status, "succeeded");

    assert.isNotNull(polledResult.body);
  });

  it("should get a test profile run", async () => {
    const result = await client
      .path("/test-profile-runs/{testProfileRunId}", testProfileRunId)
      .get();

    const testProfileRun = result.body as TestProfileRunOutput;
    assert.include(["200"], result.status);
    assert.isNotNull(result.body);
    assert.isNotEmpty(testProfileRun.recommendations);
  });

  it("should delete a test profile run", async () => {
    const result = await client
      .path("/test-profile-runs/{testProfileRunId}", testProfileRunId)
      .delete();

    assert.include(["204"], result.status);
  });

  it("should delete a test profile", async () => {
    const testProfileResult = await client
      .path("/test-profiles/{testProfileId}", testProfileId)
      .delete();

    if (isUnexpected(testProfileResult)) {
      throw testProfileResult.body.error;
    }

    assert.equal("204", testProfileResult.status);
  });

  it("should delete the test", async () => {
    const result = await client.path("/tests/{testId}", testId).delete();

    assert.include(["204"], result.status);
  });
});
