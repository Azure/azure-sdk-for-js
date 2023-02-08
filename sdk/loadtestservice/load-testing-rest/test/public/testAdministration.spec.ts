// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import { createClient, createRecorder } from "./utils/recordedClient";
import { Context } from "mocha";
import { AbortController } from "@azure/abort-controller";
import { AzureLoadTestingClient, isUnexpected } from "../../src";
import { env, isPlaybackMode, Recorder } from "@azure-tools/test-recorder";
import * as fs from "fs";
import { isNode } from "@azure/core-util";
import { getLongRunningPoller } from "../../src/pollingHelper";

describe("Test Creation", () => {
  let recorder: Recorder;
  let client: AzureLoadTestingClient;
  let readStreamTestFile: fs.ReadStream;
  let readStreamAdditionalFile: fs.ReadStream;

  beforeEach(async function (this: Context) {
    recorder = await createRecorder(this);
    if (!isNode || isPlaybackMode()) {
      this.skip();
    }
    client = createClient(recorder);
    readStreamTestFile = fs.createReadStream("./test/public/sample.jmx");
    readStreamAdditionalFile = fs.createReadStream("./test/public/additional-data.csv");
  });

  afterEach(async function () {
    await recorder.stop();
  });

  // patch/put
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

  it("should upload the additional file without LRO", async () => {
    const result = await client
      .path("/tests/{testId}/files/{fileName}", "abc", "additional-data.csv")
      .put({
        contentType: "application/octet-stream",
        body: readStreamAdditionalFile,
        queryParameters: {
          fileType: "ADDITIONAL_ARTIFACTS",
        },
      });

    assert.include(["201"], result.status);
  });

  it("should not upload the test file with LRO(timeout)", async () => {
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
    try {
      await fileValidatePoller.pollUntilDone({
        abortSignal: AbortController.timeout(10), // timeout of 10 milliseconds
      });
    } catch (ex: any) {
      assert.equal(ex.message, "The polling was aborted.");
      return;
    }

    assert.fail();
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

  it("should create the app components", async () => {
    const SUBSCRIPTION_ID = env["SUBSCRIPTION_ID"] || "";
    const result = await client.path("/tests/{testId}/app-components", "abc").patch({
      contentType: "application/merge-patch+json",
      body: {
        testId: "abc",
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

  // get
  it("should get the test file", async () => {
    const result = await client.path("/tests/{testId}/files/{fileName}", "abc", "sample.jmx").get();

    assert.include(["200"], result.status);
  });

  it("should get the test", async () => {
    const result = await client.path("/tests/{testId}", "abc").get();

    assert.include(["200"], result.status);
  });

  it("should get the test app components", async () => {
    const result = await client.path("/tests/{testId}/app-components", "abc").get();

    assert.include(["200"], result.status);
  });

  // delete
  it("should delete the test file", async () => {
    const result = await client
      .path("/tests/{testId}/files/{fileName}", "abc", "sample.jmx")
      .delete();

    assert.include(["204"], result.status);
  });

  it("should delete the test", async () => {
    const result = await client.path("/tests/{testId}", "abc").delete();

    assert.include(["204"], result.status);
  });
});
