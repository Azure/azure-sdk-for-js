/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 */

import type { RecorderStartOptions } from "@azure-tools/test-recorder";
import { env, Recorder, isPlaybackMode } from "@azure-tools/test-recorder";
import { createTestCredential } from "@azure-tools/test-credential";
import { CognitiveServicesManagementClient } from "../src/cognitiveServicesManagementClient.js";
import { describe, it, assert, beforeEach, afterEach } from "vitest";

const replaceableVariables: Record<string, string> = {
  AZURE_CLIENT_ID: "azure_client_id",
  AZURE_CLIENT_SECRET: "azure_client_secret",
  AZURE_TENANT_ID: "88888888-8888-8888-8888-888888888888",
  SUBSCRIPTION_ID: "azure_subscription_id",
};

const recorderOptions: RecorderStartOptions = {
  envSetupForPlayback: replaceableVariables,
  removeCentralSanitizers: [
    "AZSDK3493", // .name in the body is not a secret and is listed below in the beforeEach section
    "AZSDK3430", // .id in the body is not a secret and is listed below in the beforeEach section
  ],
  sanitizerOptions: {
    bodySanitizers: [
      {
        regex: true,
        value: `"key1":"fakeKey"`,
        target: `"key1":"[^"]*"`,
      },
      {
        regex: true,
        value: `"key2":"fakeKey"`,
        target: `"key2":"[^"]*"`,
      },
    ],
  },
};

export const testPollingOptions = {
  updateIntervalInMs: isPlaybackMode() ? 0 : undefined,
};

describe("CognitiveServices test", () => {
  let recorder: Recorder;
  let subscriptionId: string;
  let client: CognitiveServicesManagementClient;
  let location: string;
  let resourceGroup: string;
  let accountName: string;

  beforeEach(async (ctx) => {
    recorder = new Recorder(ctx);
    await recorder.start(recorderOptions);
    subscriptionId = env.SUBSCRIPTION_ID || "";
    // This is an example of how the environment variables are used
    const credential = createTestCredential();
    client = new CognitiveServicesManagementClient(
      credential,
      subscriptionId,
      recorder.configureClientOptions({}),
    );
    location = "eastus";
    resourceGroup = "SSS3PT_czwjstest";
    accountName = "myaccountxxxx1";
  });

  afterEach(async () => {
    await recorder.stop();
  });

  it("accounts create test", async () => {
    const res = await client.accounts.beginCreateAndWait(
      resourceGroup,
      accountName,
      {
        location: location,
        kind: "CognitiveServices",
        sku: {
          name: "S0",
        },
        identity: {
          type: "SystemAssigned",
        },
      },
      testPollingOptions,
    );
    assert.equal(res.name, accountName);
  });

  it("accounts get test", async () => {
    const res = await client.accounts.get(resourceGroup, accountName);
    assert.equal(res.name, accountName);
  });

  it("accounts list test", async () => {
    const resArray = new Array();
    for await (const item of client.accounts.listByResourceGroup(resourceGroup)) {
      resArray.push(item);
    }
    assert.equal(resArray.length, 1);
  });

  it("accounts regenerateKey test", async () => {
    const res = await client.accounts.regenerateKey(resourceGroup, accountName, "Key2");
    assert.notEqual(res.key2, "");
  });

  it("accounts update test", async () => {
    const res = await client.accounts.beginUpdateAndWait(
      resourceGroup,
      accountName,
      { tags: { tag1: "value1" } },
      testPollingOptions,
    );
    assert.equal(res.type, "Microsoft.CognitiveServices/accounts");
  });

  it("accounts delete test", async () => {
    const resArray = new Array();
    await client.accounts.beginDeleteAndWait(resourceGroup, accountName, testPollingOptions);
    for await (const item of client.accounts.listByResourceGroup(resourceGroup)) {
      resArray.push(item);
    }
    assert.equal(resArray.length, 0);
  });

  it("operations list test", async () => {
    const resArray = new Array();
    for await (const item of client.operations.list()) {
      resArray.push(item);
    }
  });
});
