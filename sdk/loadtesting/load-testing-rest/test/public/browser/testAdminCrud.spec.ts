// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { createClient, createRecorder } from "../utils/recordedClient.js";
import type {
  AppComponent,
  AzureLoadTestingClient,
  TestAppComponentsOutput,
} from "../../../src/index.js";
import type { Recorder } from "@azure-tools/test-recorder";
import { env } from "@azure-tools/test-recorder";
import { describe, it, assert, beforeEach, afterEach } from "vitest";

// NOTE: Since file upload is not supported, this only tests the API calls without them
describe("Test Administration Operations", () => {
  let recorder: Recorder;
  let client: AzureLoadTestingClient;
  const testId = "sample-sdk-testbr-20250318";

  beforeEach(async (ctx) => {
    recorder = await createRecorder(ctx);
    client = createClient(recorder);
  });

  afterEach(async () => {
    await recorder.stop();
  });

  it("should create the app components", async () => {
    const SUBSCRIPTION_ID = env["SUBSCRIPTION_ID"] || "";

    const appCompResourceId = `/subscriptions/${SUBSCRIPTION_ID}/resourceGroups/contoso-sampleapp-rg/providers/Microsoft.Web/sites/contoso-sampleapp`;
    const appComponent: AppComponent = {
      resourceName: "contoso-sampleapp",
      resourceType: "Microsoft.Web/sites",
    };
    const appComps: Record<string, AppComponent> = {};

    appComps[appCompResourceId] = appComponent;
    const result = await client.path("/tests/{testId}/app-components", testId).patch({
      contentType: "application/merge-patch+json",
      body: {
        components: appComps,
      },
    });

    assert.include(["200", "201"], result.status);
  });

  it("should get the test", async () => {
    const result = await client.path("/tests/{testId}", testId).get();

    assert.include(["200"], result.status);
  });

  it("should get the test app components", async () => {
    const result = await client.path("/tests/{testId}/app-components", testId).get();

    assert.include(["200"], result.status);
    const output = result.body as TestAppComponentsOutput;
    assert.isNotEmpty(output.components);
  });

  it("should delete the test", async () => {
    const result = await client.path("/tests/{testId}", testId).delete();

    assert.include(["204"], result.status);
  });
});
