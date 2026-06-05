// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder } from "@azure-tools/test-recorder";
import { env, isPlaybackMode } from "@azure-tools/test-recorder";
import { createTestCredential } from "@azure-tools/test-credential";
import type { Supercomputer, SupercomputerUpdate } from "../../src/index.js";
import { DiscoveryClient } from "../../src/index.js";
import { describe, it, assert, beforeEach, afterEach } from "vitest";
import { createRecorder } from "./utils/recordedClient.js";

const testPollingOptions = {
  updateIntervalInMs: isPlaybackMode() ? 0 : undefined,
};

describe("Discovery ARM Client - Supercomputers", () => {
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
  it.skip("should list supercomputers in resource group", async () => {
    const supercomputers: any[] = [];
    for await (const sc of client.supercomputers.listByResourceGroup(resourceGroupName)) {
      supercomputers.push(sc);
    }
    assert.isArray(supercomputers);
  });

  // Skipped: blocked by vCPU quota - no valid recordings
  it.skip("should list supercomputers in subscription", async () => {
    const supercomputers: any[] = [];
    for await (const sc of client.supercomputers.listBySubscription()) {
      supercomputers.push(sc);
    }
    assert.isArray(supercomputers);
  });

  // Skipped: blocked by vCPU quota - no valid recordings
  it.skip("should get a supercomputer", async () => {
    const supercomputer = await client.supercomputers.get(resourceGroupName, "test-sc-2bbb25b8");
    assert.isDefined(supercomputer);
    assert.isDefined(supercomputer.name);
    assert.isDefined(supercomputer.location);
  });

  // Skipped: blocked by vCPU quota - no valid recordings
  it.skip("should create a supercomputer", async () => {
    const miId = `/subscriptions/${subscriptionId}/resourcegroups/olawal/providers/Microsoft.ManagedIdentity/userAssignedIdentities/myidentity`;
    const supercomputerData: Supercomputer = {
      location: "uksouth",
      properties: {
        subnetId: `/subscriptions/${subscriptionId}/resourceGroups/olawal/providers/Microsoft.Network/virtualNetworks/newapiv/subnets/default`,
        identities: {
          clusterIdentity: { id: miId },
          kubeletIdentity: { id: miId },
          workloadIdentities: { [miId]: {} },
        },
      },
    };
    const poller = client.supercomputers.createOrUpdate(
      resourceGroupName,
      "jstest-sc-0316a",
      supercomputerData,
      testPollingOptions,
    );
    const supercomputer = await poller.pollUntilDone();
    assert.isDefined(supercomputer);
  });

  // Skipped: server returns 400 on supercomputer PATCH - service-side bug
  it.skip("should update a supercomputer", async () => {
    const updateData: SupercomputerUpdate = { tags: { SkipAutoDeleteTill: "2026-12-31" } };
    const poller = client.supercomputers.update(
      resourceGroupName,
      "test-sc-2bbb25b8",
      updateData,
      testPollingOptions,
    );
    const supercomputer = await poller.pollUntilDone();
    assert.isDefined(supercomputer);
  });

  // Skipped: blocked by vCPU quota - no valid recordings
  it.skip("should delete a supercomputer", async () => {
    const poller = client.supercomputers.delete(
      resourceGroupName,
      "test-sc-2bbb25b8",
      testPollingOptions,
    );
    await poller.pollUntilDone();
  });
});
