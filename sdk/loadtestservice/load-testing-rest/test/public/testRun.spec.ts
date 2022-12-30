// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { env, Recorder } from "@azure-tools/test-recorder";
import { assert } from "chai";
import { createRecorder, createClient } from "./utils/recordedClient";
import { Context } from "mocha";
import { AzureLoadTestingClient } from "../../src";

describe("Test Run Creation", () => {
  let recorder: Recorder;
  let client: AzureLoadTestingClient;
  const SUBSCRIPTION_ID = env["SUBSCRIPTION_ID"] || "";

  beforeEach(async function (this: Context) {
    recorder = await createRecorder(this);
    client = createClient(recorder);
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("should create a test run", async () => {
    const result = await client.path("/test-runs/{testRunId}", "abcde").patch({
      contentType: "application/merge-patch+json",
      body: {
        testId: "abc",
        displayName: "sample_testrun",
        virtualUsers: 10,
      },
    });

    assert.include(["200"], result.status);
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
          "/subscriptions/{SUBSCRIPTION_ID}/resourceGroups/App-Service-Sample-Demo-rg/providers/Microsoft.Web/sites/App-Service-Sample-Demo": {
            resourceId:
              "/subscriptions/{SUBSCRIPTION_ID}/resourceGroups/App-Service-Sample-Demo-rg/providers/Microsoft.Web/sites/App-Service-Sample-Demo",
            resourceName: "App-Service-Sample-Demo",
            resourceType: "Microsoft.Web/sites",
            subscriptionId: SUBSCRIPTION_ID,
          },
        },
      },
    });

    assert.include(["200"], result.status);
  });

  it("should get a test run file", async () => {
    const result = await client.path("/test-runs/{testRunId}/files/{fileName}", "abcde", "filename").get();

    assert.include(["200"], result.status);
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

});
