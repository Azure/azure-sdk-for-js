// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder } from "@azure-tools/test-recorder";
import { env, isPlaybackMode } from "@azure-tools/test-recorder";
import { createTestCredential } from "@azure-tools/test-credential";
import type { NodePool, NodePoolUpdate } from "../../src/index.js";
import { DiscoveryClient } from "../../src/index.js";
import { describe, it, assert, beforeEach, afterEach } from "vitest";
import { createRecorder } from "./utils/recordedClient.js";

const testPollingOptions = {
  updateIntervalInMs: isPlaybackMode() ? 0 : undefined,
};

const SUPERCOMPUTER_NAME = "itsuperp114";

describe("Discovery ARM Client - Node Pools", () => {
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

  // Skipped: blocked by vCPU quota - no valid recordings
  it.skip("should list node pools by supercomputer", async () => {
    const nodePools: any[] = [];
    for await (const nodePool of client.nodePools.listBySupercomputer(
      resourceGroupName,
      SUPERCOMPUTER_NAME,
    )) {
      nodePools.push(nodePool);
    }
    assert.isArray(nodePools);
  });

  // Skipped: no recording available
  it.skip("should get a node pool", async () => {
    const nodePool = await client.nodePools.get(
      resourceGroupName,
      "test-supercomputer",
      "test-nodepool",
    );
    assert.isDefined(nodePool);
    assert.isDefined(nodePool.name);
  });

  // Skipped: no recording available
  it.skip("should create a node pool", async () => {
    const nodePoolData: NodePool = {
      location: "uksouth",
      properties: {
        subnetId: `/subscriptions/${subscriptionId}/resourceGroups/olawal/providers/Microsoft.Network/virtualNetworks/newapiv/subnets/default`,
        vmSize: "Standard_D4s_v6",
        maxNodeCount: 3,
        minNodeCount: 1,
        scaleSetPriority: "Regular",
      },
    };
    const poller = client.nodePools.createOrUpdate(
      resourceGroupName,
      "test-sc-2bbb25b8",
      "test-np-568f7883",
      nodePoolData,
      testPollingOptions,
    );
    const nodePool = await poller.pollUntilDone();
    assert.isDefined(nodePool);
  });

  // Skipped: no recording available
  it.skip("should update a node pool", async () => {
    const updateData: NodePoolUpdate = { tags: { SkipAutoDeleteTill: "2026-12-31" } };
    const poller = client.nodePools.update(
      resourceGroupName,
      "test-supercomputer",
      "test-nodepool",
      updateData,
      testPollingOptions,
    );
    const nodePool = await poller.pollUntilDone();
    assert.isDefined(nodePool);
  });

  // Skipped: no recording available
  it.skip("should delete a node pool", async () => {
    const poller = client.nodePools.delete(
      resourceGroupName,
      "test-supercomputer",
      "test-nodepool",
      testPollingOptions,
    );
    await poller.pollUntilDone();
  });
});
