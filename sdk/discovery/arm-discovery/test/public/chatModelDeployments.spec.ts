// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder } from "@azure-tools/test-recorder";
import { env, isPlaybackMode } from "@azure-tools/test-recorder";
import { createTestCredential } from "@azure-tools/test-credential";
import type { ChatModelDeployment } from "../../src/index.js";
import { DiscoveryClient } from "../../src/index.js";
import { describe, it, assert, beforeEach, afterEach } from "vitest";
import { createRecorder } from "./utils/recordedClient.js";

const testPollingOptions = {
  updateIntervalInMs: isPlaybackMode() ? 0 : undefined,
};

const WORKSPACE_NAME = "jstest-wrksp-0316a";

describe("Discovery ARM Client - Chat Model Deployments", () => {
  let recorder: Recorder;
  let client: DiscoveryClient;
  let subscriptionId: string;
  let resourceGroupName: string;

  beforeEach(async (context) => {
    recorder = await createRecorder(context);
    subscriptionId = env.SUBSCRIPTION_ID || "";
    const credential = createTestCredential();
    client = new DiscoveryClient(credential, subscriptionId, recorder.configureClientOptions({}));
    resourceGroupName = env.DISCOVERY_RESOURCE_GROUP || "olawal";
  });

  afterEach(async () => {
    if (recorder?.recordingId) {
      await recorder.stop();
    }
  });

  it("should list chat model deployments by workspace", async () => {
    const deployments: any[] = [];
    for await (const deployment of client.chatModelDeployments.listByWorkspace(
      resourceGroupName,
      WORKSPACE_NAME,
    )) {
      deployments.push(deployment);
    }
    assert.isArray(deployments);
  });

  it("should get a chat model deployment", async () => {
    const deployment = await client.chatModelDeployments.get(
      resourceGroupName,
      WORKSPACE_NAME,
      "test-deploy-chatmodel01",
    );
    assert.isDefined(deployment);
    assert.isDefined(deployment.name);
  });

  it("should create a chat model deployment", async () => {
    const deploymentData: ChatModelDeployment = {
      location: "uksouth",
      properties: {
        modelFormat: "OpenAI",
        modelName: "gpt-4o",
      },
    };
    const poller = client.chatModelDeployments.createOrUpdate(
      resourceGroupName,
      WORKSPACE_NAME,
      "test-deploy-chatmodel01",
      deploymentData,
      testPollingOptions,
    );
    const deployment = await poller.pollUntilDone();
    assert.isDefined(deployment);
  });

  it("should delete a chat model deployment", async () => {
    const poller = client.chatModelDeployments.delete(
      resourceGroupName,
      WORKSPACE_NAME,
      "test-deploy-chatmodel01",
      testPollingOptions,
    );
    await poller.pollUntilDone();
  });
});
