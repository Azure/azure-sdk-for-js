// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder } from "@azure-tools/test-recorder";
import { env, isPlaybackMode } from "@azure-tools/test-recorder";
import { createTestCredential } from "@azure-tools/test-credential";
import type { Workspace, WorkspaceUpdate } from "../../src/index.js";
import { DiscoveryClient } from "../../src/index.js";
import { describe, it, assert, beforeEach, afterEach } from "vitest";
import { createRecorder } from "./utils/recordedClient.js";

const testPollingOptions = {
  updateIntervalInMs: isPlaybackMode() ? 0 : undefined,
};

describe("Discovery ARM Client - Workspaces", () => {
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

  it("should list workspaces in subscription", async () => {
    const workspaces: any[] = [];
    for await (const workspace of client.workspaces.listBySubscription()) {
      workspaces.push(workspace);
    }
    assert.isArray(workspaces);
    assert.isAtLeast(workspaces.length, 1);
  });

  it("should list workspaces in resource group", async () => {
    const workspaces: any[] = [];
    for await (const workspace of client.workspaces.listByResourceGroup(resourceGroupName)) {
      workspaces.push(workspace);
    }
    assert.isArray(workspaces);
    assert.isAtLeast(workspaces.length, 1);
  });

  it("should get a workspace", async () => {
    const workspaceName = "jstest-wrksp-0316a";
    const workspace = await client.workspaces.get(resourceGroupName, workspaceName);
    assert.isDefined(workspace);
    assert.isDefined(workspace.name);
    assert.isDefined(workspace.location);
  });

  it("should create a workspace", async () => {
    const workspaceName = "jstest-wrksp-0316a";
    const workspaceData: Workspace = {
      location: "uksouth",
      properties: {
        supercomputerIds: [],
        workspaceIdentity: {
          id: `/subscriptions/${subscriptionId}/resourcegroups/olawal/providers/Microsoft.ManagedIdentity/userAssignedIdentities/myidentity`,
        },
        agentSubnetId: `/subscriptions/${subscriptionId}/resourceGroups/olawal/providers/Microsoft.Network/virtualNetworks/newapiv/subnets/default3`,
        privateEndpointSubnetId: `/subscriptions/${subscriptionId}/resourceGroups/olawal/providers/Microsoft.Network/virtualNetworks/newapiv/subnets/default`,
        workspaceSubnetId: `/subscriptions/${subscriptionId}/resourceGroups/olawal/providers/Microsoft.Network/virtualNetworks/newapiv/subnets/default2`,
        customerManagedKeys: "Enabled",
        keyVaultProperties: {
          keyName: "discoverykey",
          keyVaultUri: "https://newapik.vault.azure.net/",
          keyVersion: "2c9db3cf55d247b4a1c1831fbbdad906",
        },
        logAnalyticsClusterId: `/subscriptions/${subscriptionId}/resourceGroups/olawal/providers/Microsoft.OperationalInsights/clusters/mycluse`,
        publicNetworkAccess: "Disabled",
      },
    };
    const poller = client.workspaces.createOrUpdate(
      resourceGroupName,
      workspaceName,
      workspaceData,
      testPollingOptions,
    );
    const workspace = await poller.pollUntilDone();
    assert.isDefined(workspace);
  });

  it("should update a workspace", async () => {
    const workspaceName = "jstest-wrksp-0316a";
    const updateData: WorkspaceUpdate = {
      properties: {
        keyVaultProperties: {
          keyName: "discoverykey",
          keyVersion: "956de2fc802f49eba81ddcc348ebc27c",
        },
      },
    };
    const poller = client.workspaces.update(
      resourceGroupName,
      workspaceName,
      updateData,
      testPollingOptions,
    );
    const workspace = await poller.pollUntilDone();
    assert.isDefined(workspace);
  });

  it("should delete a workspace", async () => {
    const workspaceName = "jstest-wrksp-0316a";
    const poller = client.workspaces.delete(resourceGroupName, workspaceName, testPollingOptions);
    await poller.pollUntilDone();
  });
});
