// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import { createClient, createRecorder } from "./utils/recordedClient";
import { Context } from "mocha";
import { AzureLoadTestingClient } from "../../src";
import { env, isPlaybackMode, Recorder } from "@azure-tools/test-recorder";
import * as fs from "fs";
import { isNode } from "@azure/core-util";

describe("Test Creation", () => {
  let recorder: Recorder;
  let client: AzureLoadTestingClient;
  let readStream: fs.ReadStream;

  beforeEach(async function (this: Context) {
    recorder = await createRecorder(this);
    if (!isNode || isPlaybackMode()) {
      this.skip();
    }
    client = createClient(recorder);
    readStream = fs.createReadStream("./test/public/sample.jmx");
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

  it("should upload the test file", async () => {
    const result = await client.path("/tests/{testId}/files/{fileName}", "abc", "fileName").put({
      contentType: "application/octet-stream",
      body: readStream,
    });

    assert.include(["201"], result.status);
  });

  it("should create the app components", async () => {
    const SUBSCRIPTION_ID = env["SUBSCRIPTION_ID"] || "";
    const result = await client.path("/tests/{testId}/app-components", "appcomp123").patch({
      contentType: "application/merge-patch+json",
      body: {
        testId: "abc",
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

    assert.include(["200", "201"], result.status);
  });

  //get 
  it("should get the test file", async () => {
    const result = await client.path("/tests/{testId}/files/{fileName}", "abc", "fileName").get();

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

  //delete
  it("should delete the test file", async () => {
    const result = await client.path("/tests/{testId}/files/{fileName}", "abc", "fileName").delete();

    assert.include(["204"], result.status);
  });

  it("should delete the test", async () => {
    const result = await client.path("/tests/{testId}", "abc").delete();

    assert.include(["204"], result.status);
  });
  

});
