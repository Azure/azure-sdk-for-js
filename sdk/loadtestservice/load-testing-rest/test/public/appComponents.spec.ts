// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Recorder, env } from "@azure-tools/test-recorder";
import { assert } from "chai";
import { createRecorder, createClient } from "./utils/recordedClient";
import { Context } from "mocha";
import { AzureLoadTestingClient } from "../../src";

describe("Create app component", () => {
  let recorder: Recorder;
  let client: AzureLoadTestingClient;

  beforeEach(async function (this: Context) {
    recorder = await createRecorder(this);
    client = createClient(recorder);
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("should create the app components", async () => {
    const SUBSCRIPTION_ID = env["SUBSCRIPTION_ID"] || "";
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
