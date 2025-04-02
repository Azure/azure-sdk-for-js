// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import AzureLoadTesting, { getLongRunningPoller, isUnexpected } from "../src/index.js";
import { DefaultAzureCredential, InteractiveBrowserCredential } from "@azure/identity";
import { setLogLevel } from "@azure/logger";
import { describe, it } from "vitest";
import { createReadStream } from "node:fs";

describe("snippets", () => {
  it("ReadmeSampleCreateClient_Node", async () => {
    const endpoint = "https://<endpoint>";
    const client = AzureLoadTesting(endpoint, new DefaultAzureCredential());
  });

  it("ReadmeSampleCreateLoadTest", async () => {
    const endpoint = "https://<endpoint>";
    const client = AzureLoadTesting(endpoint, new DefaultAzureCredential());
    // @ts-preserve-whitespace
    const TEST_ID = "some-test-id";
    const DISPLAY_NAME = "my-load-test";
    // @ts-preserve-whitespace
    await client.path("/tests/{testId}", TEST_ID).patch({
      contentType: "application/merge-patch+json",
      body: {
        displayName: DISPLAY_NAME,
        description: "",
        loadTestConfiguration: {
          engineInstances: 1,
          splitAllCSVs: false,
        },
        secrets: {},
        environmentVariables: {},
        passFailCriteria: { passFailMetrics: {} },
      },
    });
  });

  it("ReadmeSampleUploadTestScriptFile", async () => {
    const endpoint = "https://<endpoint>";
    const client = AzureLoadTesting(endpoint, new DefaultAzureCredential());
    // @ts-preserve-whitespace
    const TEST_ID = "some-test-id";
    const readStream = createReadStream("./sample.jmx");
    // @ts-preserve-whitespace
    const fileUploadResult = await client
      .path("/tests/{testId}/files/{fileName}", TEST_ID, "sample.jmx")
      .put({
        contentType: "application/octet-stream",
        body: readStream,
      });
    // @ts-preserve-whitespace
    if (isUnexpected(fileUploadResult)) {
      throw fileUploadResult.body.error;
    }
    // @ts-preserve-whitespace
    const fileValidatePoller = await getLongRunningPoller(client, fileUploadResult);
    const fileValidateResult = await fileValidatePoller.pollUntilDone();
  });

  it("ReadmeSampleRunTest", async () => {
    const endpoint = "https://<endpoint>";
    const client = AzureLoadTesting(endpoint, new DefaultAzureCredential());
    // @ts-preserve-whitespace
    const TEST_ID = "some-test-id";
    const DISPLAY_NAME = "my-load-test";
    const TEST_RUN_ID = "some-test-run-id";
    // @ts-preserve-whitespace
    // Creating/Updating the test run
    const testRunCreationResult = await client.path("/test-runs/{testRunId}", TEST_RUN_ID).patch({
      contentType: "application/merge-patch+json",
      body: {
        testId: TEST_ID,
        displayName: DISPLAY_NAME,
      },
    });
    // @ts-preserve-whitespace
    if (isUnexpected(testRunCreationResult)) {
      throw testRunCreationResult.body.error;
    }
    // @ts-preserve-whitespace
    const testRunPoller = await getLongRunningPoller(client, testRunCreationResult);
    const testRunResult = await testRunPoller.pollUntilDone();
    // @ts-preserve-whitespace
    const testRunStarttime = testRunResult.body.startDateTime;
    const testRunEndTime = testRunResult.body.endDateTime;
    // @ts-preserve-whitespace
    // get list of all metric namespaces and pick the first one
    const metricNamespaces = await client
      .path("/test-runs/{testRunId}/metric-namespaces", TEST_RUN_ID)
      .get();
    // @ts-preserve-whitespace
    if (isUnexpected(metricNamespaces)) {
      throw metricNamespaces.body.error;
    }
    // @ts-preserve-whitespace
    const metricNamespace = metricNamespaces.body.value[0];
    // @ts-preserve-whitespace
    if (metricNamespace.name === undefined) {
      throw "No Metric Namespace name is defined.";
    }
    // @ts-preserve-whitespace
    // get list of all metric definitions and pick the first one
    const metricDefinitions = await client
      .path("/test-runs/{testRunId}/metric-definitions", TEST_RUN_ID)
      .get({
        queryParameters: {
          metricNamespace: metricNamespace.name,
        },
      });
    // @ts-preserve-whitespace
    if (isUnexpected(metricDefinitions)) {
      throw metricDefinitions.body.error;
    }
    // @ts-preserve-whitespace
    const metricDefinition = metricDefinitions.body.value[0];
    // @ts-preserve-whitespace
    if (metricDefinition.name === undefined) {
      throw "No Metric Namespace name is defined.";
    }
    // @ts-preserve-whitespace
    // fetch client metrics using metric namespace and metric name
    const metricsResult = await client.path("/test-runs/{testRunId}/metrics", TEST_RUN_ID).post({
      queryParameters: {
        metricname: metricDefinition.name,
        metricNamespace: metricNamespace.name,
        timespan: testRunStarttime + "/" + testRunEndTime,
      },
    });
    // @ts-preserve-whitespace
    if (isUnexpected(metricsResult)) {
      throw metricsResult.body.error;
    }
    // @ts-preserve-whitespace
    for (const timeSeries of metricsResult.body.value) {
      console.log(timeSeries);
    }
  });

  it("SetLogLevel", async () => {
    setLogLevel("info");
  });
});
