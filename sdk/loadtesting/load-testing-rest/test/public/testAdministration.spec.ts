// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { createClient, createRecorder } from "./utils/recordedClient.js";
import type {
  AppComponent,
  AzureLoadTestingClient,
  TestAppComponentsOutput,
} from "../../src/index.js";
import { isUnexpected } from "../../src/index.js";
import type { Recorder } from "@azure-tools/test-recorder";
import { env, isPlaybackMode } from "@azure-tools/test-recorder";
import * as fs from "node:fs";
import { isNodeLike } from "@azure/core-util";
import { getLongRunningPoller } from "../../src/pollingHelper.js";
import { describe, it, assert, beforeEach, afterEach } from "vitest";

describe("Test Administration Operations", () => {
  let recorder: Recorder;
  let client: AzureLoadTestingClient;
  const testId = "sample-sdk-test-20250318";

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

  // patch
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

  it("should upload the additional file without LRO", async () => {
    const readStreamAdditionalFile: fs.ReadStream = fs.createReadStream(
      "./test/public/additional-data.csv",
    );
    const result = await client
      .path("/tests/{testId}/files/{fileName}", testId, "additional-data.csv")
      .put({
        contentType: "application/octet-stream",
        body: readStreamAdditionalFile,
        queryParameters: {
          fileType: "ADDITIONAL_ARTIFACTS",
        },
      });

    assert.include(["201"], result.status);
  });

  it("should fail file upload due to LRO timeout", async () => {
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
    try {
      await fileValidatePoller.pollUntilDone({
        abortSignal: AbortSignal.timeout(10), // timeout of 10 milliseconds
      });
    } catch (ex: any) {
      assert.equal(ex.message, "The polling was aborted.");
      return;
    }

    assert.fail();
  });

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

  // get
  it("should get the test file", async () => {
    const result = await client
      .path("/tests/{testId}/files/{fileName}", testId, "sample.jmx")
      .get();

    assert.include(["200"], result.status);
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

  // delete
  it("should delete the test file", async () => {
    const result = await client
      .path("/tests/{testId}/files/{fileName}", testId, "sample.jmx")
      .delete();

    assert.include(["204"], result.status);
  });

  it("should delete the test", async () => {
    const result = await client.path("/tests/{testId}", testId).delete();

    assert.include(["204"], result.status);
  });
});
