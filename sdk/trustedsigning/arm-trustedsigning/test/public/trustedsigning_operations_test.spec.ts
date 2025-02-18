/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import type { Recorder } from "@azure-tools/test-recorder";
import { env, isPlaybackMode } from "@azure-tools/test-recorder";
import { createTestCredential } from "@azure-tools/test-credential";
import { assert, beforeEach, afterEach, it, describe } from "vitest";
import { createRecorder } from "./utils/recordedClient.js";
import { CodeSigningClient } from "../../src/codeSigningClient.js";

export const testPollingOptions = {
  updateIntervalInMs: isPlaybackMode() ? 0 : undefined,
};

describe("CodeSigning test", () => {
  let recorder: Recorder;
  let subscriptionId: string;
  let client: CodeSigningClient;
  let location: string;
  let resourceGroup: string;
  let resourcename: string;

  beforeEach(async (context) => {
    process.env.SystemRoot = process.env.SystemRoot || "C:\\Windows";
    recorder = await createRecorder(context);
    subscriptionId = env.SUBSCRIPTION_ID || "";
    // This is an example of how the environment variables are used
    const credential = createTestCredential();
    client = new CodeSigningClient(credential, subscriptionId, recorder.configureClientOptions({}));
    location = "eastus";
    resourceGroup = "myjstest";
    resourcename = "resourcetest";
  });

  afterEach(async () => {
    await recorder.stop();
  });
  it("operations list test", async () => {
    const resArray = new Array();
    for await (const item of client.operations.list()) {
      resArray.push(item);
    }
    assert.notEqual(resArray.length, 0);
  });

  it("codeSigningAccounts create test", async () => {
    const res = await client.codeSigningAccounts.create(
      resourceGroup,
      resourcename,
      {
        location,
        properties: {
          sku: { name: "Basic" },
        },
      },
      testPollingOptions,
    );
    assert.equal(res.name, resourcename);
  });

  it("codeSigningAccounts get test", async () => {
    const res = await client.codeSigningAccounts.get(resourceGroup, resourcename);
    assert.equal(res.name, resourcename);
  });

  it("codeSigningAccounts list test", async () => {
    const resArray = new Array();
    for await (const item of client.codeSigningAccounts.listByResourceGroup(resourceGroup)) {
      resArray.push(item);
    }
    assert.equal(resArray.length, 1);
  });

  it("codeSigningAccounts delete test", async () => {
    const resArray = new Array();
    await client.codeSigningAccounts.delete(resourceGroup, resourcename, testPollingOptions);
    for await (const item of client.codeSigningAccounts.listByResourceGroup(resourceGroup)) {
      resArray.push(item);
    }
    assert.equal(resArray.length, 0);
  });
});
