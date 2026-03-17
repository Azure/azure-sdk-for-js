// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder } from "@azure-tools/test-recorder";
import { env, isPlaybackMode } from "@azure-tools/test-recorder";
import { createTestCredential } from "@azure-tools/test-credential";
import type { StorageContainer, StorageContainerUpdate } from "../../src/index.js";
import { DiscoveryClient } from "../../src/index.js";
import { describe, it, assert, beforeEach, afterEach } from "vitest";
import { createRecorder } from "./utils/recordedClient.js";

const testPollingOptions = {
  updateIntervalInMs: isPlaybackMode() ? 0 : undefined,
};

describe("Discovery ARM Client - Storage Containers", () => {
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

  it("should list storage containers in resource group", async () => {
    const containers: any[] = [];
    for await (const container of client.storageContainers.listByResourceGroup(resourceGroupName)) {
      containers.push(container);
    }
    assert.isArray(containers);
  });

  it("should list storage containers in subscription", async () => {
    const containers: any[] = [];
    for await (const container of client.storageContainers.listBySubscription()) {
      containers.push(container);
    }
    assert.isArray(containers);
  });

  it("should get a storage container", async () => {
    const container = await client.storageContainers.get(resourceGroupName, "test-sc-8bef0d1a");
    assert.isDefined(container);
    assert.isDefined(container.name);
  });

  it("should create a storage container", async () => {
    const containerData: StorageContainer = {
      location: "uksouth",
      properties: {
        storageStore: {
          kind: "AzureStorageBlob",
          storageAccountId: `/subscriptions/${subscriptionId}/resourceGroups/olawal/providers/Microsoft.Storage/storageAccounts/mytststr`,
        },
      },
    };
    const poller = client.storageContainers.createOrUpdate(
      resourceGroupName,
      "test-sc-8bef0d1a",
      containerData,
      testPollingOptions,
    );
    const container = await poller.pollUntilDone();
    assert.isDefined(container);
  });

  it("should update a storage container", async () => {
    const updateData: StorageContainerUpdate = { tags: { SkipAutoDeleteTill: "2026-12-31" } };
    const poller = client.storageContainers.update(
      resourceGroupName,
      "test-sc-8bef0d1a",
      updateData,
      testPollingOptions,
    );
    const container = await poller.pollUntilDone();
    assert.isDefined(container);
  });

  it("should delete a storage container", async () => {
    const poller = client.storageContainers.delete(
      resourceGroupName,
      "test-sc-8bef0d1a",
      testPollingOptions,
    );
    await poller.pollUntilDone();
  });
});
