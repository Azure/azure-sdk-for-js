// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Recorder } from "@azure-tools/test-recorder";
import { assert } from "chai";
import { createRecorder, createClient } from "./utils/recordedClient";
import { Context } from "mocha";
import { AzureLoadTestingClient } from "../../src";

describe("File Upload", () => {
  let recorder: Recorder;
  let client: AzureLoadTestingClient;
  const SUBSCRIPTION_ID = process.env["SUBSCRIPTION_ID"] || "";

  beforeEach(async function (this: Context) {
    recorder = await createRecorder(this);
    client = createClient();
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("should upload the test file", async () => {
    const result = await client.path("/appcomponents/{name}", "appcomp123").patch({
      contentType: "application/merge-patch+json",
      body: {
        name: "app_component",
        testId: "abc",
        value: {
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
});
