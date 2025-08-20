// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder } from "@azure-tools/test-recorder";
import { env, isPlaybackMode } from "@azure-tools/test-recorder";
import { createRecorder } from "./utils/recordedClient.js";
import { createTestCredential } from "@azure-tools/test-credential";
import type {
  ContainerServiceClient,
  ManagedClusterOutput,
  ManagedClusterUpgradeProfileOutput,
} from "@azure-rest/arm-containerservice";
import ContainerServiceManagementClient, {
  getLongRunningPoller,
  paginate,
} from "@azure-rest/arm-containerservice";
import { describe, it, assert, beforeEach, afterEach } from "vitest";

export const testPollingOptions = {
  intervalInMs: isPlaybackMode() ? 0 : undefined,
};

describe("My test", () => {
  let recorder: Recorder;
  let subscriptionId: string;
  let clientId: string;
  let secret: string;
  let client: ContainerServiceClient;
  let location: string;
  let resourceGroupName: string;
  let resourceName: string;

  beforeEach(async (ctx) => {
    recorder = await createRecorder(ctx);
    subscriptionId = env.SUBSCRIPTION_ID || "";
    clientId = env.AZURE_CLIENT_ID || "";
    secret = env.AZURE_CLIENT_SECRET || "";
    // This is an example of how the environment variables are used
    const credential = createTestCredential();
    client = ContainerServiceManagementClient(credential, {
      ...recorder.configureClientOptions({}),
      allowInsecureConnection: true,
    });
    location = "eastus";
    resourceGroupName = "myjstest";
    resourceName = "myreourcexyz";
  });

  afterEach(async () => {
    await recorder.stop();
  });

  // skip this test as test recorder
  it.skip("managedClusters create test", async () => {
    const initalResponse = await client
      .path(
        "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}",
        subscriptionId,
        resourceGroupName,
        resourceName,
      )
      .put({
        body: {
          properties: {
            dnsPrefix: "aksjssdk",
            agentPoolProfiles: [
              {
                name: "aksagent",
                count: 1,
                vmSize: "Standard_DS2_v2",
                maxPods: 110,
                minCount: 1,
                maxCount: 100,
                osType: "Linux",
                type: "VirtualMachineScaleSets",
                enableAutoScaling: true,
                mode: "System",
              },
            ],
            servicePrincipalProfile: {
              clientId: clientId,
              secret: secret,
            },
          },
          location: location,
        },
      });
    const poller = await getLongRunningPoller(client, initalResponse, testPollingOptions);
    const result = await poller.pollUntilDone();
    console.log(result);
    assert.equal(result.status, "200");
    assert.equal((result.body as ManagedClusterOutput).name, resourceName);
  });

  it("managedClusters get test", async () => {
    const res = await client
      .path(
        "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}",
        subscriptionId,
        resourceGroupName,
        resourceName,
      )
      .get();
    assert.equal(res.status, "200");
    assert.equal((res.body as ManagedClusterOutput).name, resourceName);
  });

  it("managedClusters getUpgradeProfile test", async () => {
    const res = await client
      .path(
        "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/upgradeProfiles/default",
        subscriptionId,
        resourceGroupName,
        resourceName,
      )
      .get();
    assert.equal(res.status, "200");
    assert.equal((res.body as ManagedClusterUpgradeProfileOutput).name, "default");
  });

  it("managedClusters list test", async () => {
    const initialResponse = await client
      .path(
        "/subscriptions/{subscriptionId}/providers/Microsoft.ContainerService/managedClusters",
        subscriptionId,
      )
      .get();
    const result = paginate(client, initialResponse);
    const resArray = new Array();
    for await (const item of result) {
      resArray.push(item);
    }
    assert.equal(resArray.length, 1);
  });

  it("managedClusters update test", async () => {
    const initialResponse = await client
      .path(
        "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}",
        subscriptionId,
        resourceGroupName,
        resourceName,
      )
      .patch({
        body: {
          tags: { tier: "testing", archv3: "" },
        },
      });
    const poller = await getLongRunningPoller(client, initialResponse, testPollingOptions);
    const res = await poller.pollUntilDone();
    assert.equal(res.status, "200");
    assert.equal(
      (res.body as ManagedClusterOutput).type,
      "Microsoft.ContainerService/ManagedClusters",
    );
  });

  it("managedClusters delete test", async () => {
    const initialResponse = await client
      .path(
        "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}",
        subscriptionId,
        resourceGroupName,
        resourceName,
      )
      .delete();
    const poller = await getLongRunningPoller(client, initialResponse, testPollingOptions);
    const res = await poller.pollUntilDone();
    assert.isOk(res.status);
    const listInitialResponse = await client
      .path(
        "/subscriptions/{subscriptionId}/providers/Microsoft.ContainerService/managedClusters",
        subscriptionId,
      )
      .get();
    const result = paginate(client, listInitialResponse);
    const resArray = new Array();
    for await (const item of result) {
      resArray.push(item);
    }
    assert.equal(resArray.length, 0);
  });
});
