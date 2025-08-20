/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 */

import type { RecorderStartOptions } from "@azure-tools/test-recorder";
import { env, Recorder, isPlaybackMode } from "@azure-tools/test-recorder";
import { createTestCredential } from "@azure-tools/test-credential";
import { CognitiveServicesManagementClient } from "@azure/arm-cognitiveservices";
import type { Deployment } from "$internal/models/index.js";
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
};

export const testPollingOptions = {
  updateIntervalInMs: isPlaybackMode() ? 0 : undefined,
};

describe.skip("CognitiveServices OpenAI test", () => {
  let recorder: Recorder;
  let subscriptionId: string;
  let client: CognitiveServicesManagementClient;
  let location: string;
  let resourceGroup: string;
  let accountName: string;
  let deploymentName: string;

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
    location = "West Europe";
    resourceGroup = "openai-shared";
    accountName = "sdk-test-openai-js";
    deploymentName = "text-davince-model";
  });

  afterEach(async () => {
    await recorder.stop();
  });

  it("should create an OpenAI account for testing", async () => {
    const res = await client.accounts.beginCreateAndWait(
      resourceGroup,
      accountName,
      {
        location: location,
        kind: "OpenAI",
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

  it("should deploy a davinci model in that account", async () => {
    const deployment: Deployment = {
      properties: {
        model: { name: "text-davinci-003", version: "1", format: "OpenAI" },
      },
    };

    const result = await client.deployments.beginCreateOrUpdateAndWait(
      resourceGroup,
      accountName,
      deploymentName,
      deployment,
      testPollingOptions,
    );
    assert.equal(result.name, deploymentName);
  });

  it("should get an account detail", async () => {
    const res = await client.accounts.get(resourceGroup, accountName);
    assert.equal(res.name, accountName);
  });

  it("should list all accounts", async () => {
    const resArray = new Array();
    for await (const item of client.accounts.listByResourceGroup(resourceGroup)) {
      resArray.push(item);
    }
    assert.isTrue(resArray.length >= 1);
  });

  it("should list deployments and delete a deployment", async () => {
    const deploymentNames = new Set();
    for await (const item of client.deployments.list(resourceGroup, accountName)) {
      deploymentNames.add(item.name);
    }
    assert.isTrue(deploymentNames.has(deploymentName));
    deploymentNames.clear();
    await client.deployments.beginDeleteAndWait(
      resourceGroup,
      accountName,
      deploymentName,
      testPollingOptions,
    );
    for await (const item of client.deployments.list(resourceGroup, accountName)) {
      deploymentNames.add(item.name);
    }
    assert.isFalse(deploymentNames.has(deploymentName));
  });

  it("should delete an account", async () => {
    await client.accounts.beginDeleteAndWait(resourceGroup, accountName, testPollingOptions);
    const accountNames = new Set();
    for await (const item of client.accounts.listByResourceGroup(resourceGroup)) {
      accountNames.add(item.name);
    }
    assert.isFalse(accountNames.has(accountName));
  });
});
