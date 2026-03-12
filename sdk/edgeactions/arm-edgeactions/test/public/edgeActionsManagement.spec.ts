// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder } from "@azure-tools/test-recorder";
import { env, isPlaybackMode } from "@azure-tools/test-recorder";
import { createTestCredential } from "@azure-tools/test-credential";
import { assert, beforeEach, afterEach, it, describe } from "vitest";
import { createRecorder } from "./utils/recordedClient.js";
import { EdgeActionsManagementClient } from "../../src/index.js";

const testPollingOptions = {
  updateIntervalInMs: isPlaybackMode() ? 0 : undefined,
};

describe("EdgeActionsManagement test", () => {
  let recorder: Recorder;
  let client: EdgeActionsManagementClient;
  let resourceGroup: string;
  const edgeActionName = "edgeActionTestJs";
  const versionName = "version1";

  beforeEach(async (context) => {
    recorder = await createRecorder(context);
    const subscriptionId = env.SUBSCRIPTION_ID || "";
    const credential = createTestCredential();
    client = new EdgeActionsManagementClient(
      credential,
      subscriptionId,
      recorder.configureClientOptions({}),
    );
    resourceGroup = env.RESOURCE_GROUP || "myjstest";
  });

  afterEach(async () => {
    await recorder.stop();
  });

  // ===== EdgeActions =====

  it("edgeActions create test", async () => {
    const res = await client.edgeActions.create(
      resourceGroup,
      edgeActionName,
      {
        location: "global",
        sku: { name: "Standard", tier: "Standard" },
      },
      testPollingOptions,
    );
    assert.equal(res.name, edgeActionName);
  });

  // ===== EdgeActionVersions =====

  it("edgeActionVersions create test", async () => {
    const res = await client.edgeActionVersions.create(
      resourceGroup,
      edgeActionName,
      versionName,
      {
        location: "global",
        properties: {
          deploymentType: "file",
          isDefaultVersion: "True",
        },
      },
      testPollingOptions,
    );
    assert.equal(res.name, versionName);
  });

  // ===== Cleanup: delete in reverse dependency order =====

  it("edgeActionVersions delete test", async () => {
    await client.edgeActionVersions.delete(
      resourceGroup,
      edgeActionName,
      versionName,
      testPollingOptions,
    );
    const resArray = new Array();
    for await (const item of client.edgeActionVersions.listByEdgeAction(
      resourceGroup,
      edgeActionName,
    )) {
      resArray.push(item);
    }
    assert.equal(resArray.length, 0);
  });

  it("edgeActions delete test", async () => {
    await client.edgeActions.delete(resourceGroup, edgeActionName, testPollingOptions);
    const resArray = new Array();
    for await (const item of client.edgeActions.listByResourceGroup(resourceGroup)) {
      resArray.push(item);
    }
    assert.equal(resArray.length, 0);
  });
});
