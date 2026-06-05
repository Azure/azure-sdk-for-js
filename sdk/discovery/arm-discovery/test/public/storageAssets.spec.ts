// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder } from "@azure-tools/test-recorder";
import { env, isPlaybackMode } from "@azure-tools/test-recorder";
import { createTestCredential } from "@azure-tools/test-credential";
import type { StorageAsset, StorageAssetUpdate } from "../../src/index.js";
import { DiscoveryClient } from "../../src/index.js";
import { describe, it, assert, beforeEach, afterEach } from "vitest";
import { createRecorder } from "./utils/recordedClient.js";

const testPollingOptions = {
  updateIntervalInMs: isPlaybackMode() ? 0 : undefined,
};

const STORAGE_CONTAINER_NAME = "test-sc-8bef0d1a";

describe("Discovery ARM Client - Storage Assets", () => {
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

  it("should list storage assets by storage container", async () => {
    const assets: any[] = [];
    for await (const asset of client.storageAssets.listByStorageContainer(
      resourceGroupName,
      STORAGE_CONTAINER_NAME,
    )) {
      assets.push(asset);
    }
    assert.isArray(assets);
  });

  it("should get a storage asset", async () => {
    const asset = await client.storageAssets.get(
      resourceGroupName,
      STORAGE_CONTAINER_NAME,
      "test-sa-482ad005",
    );
    assert.isDefined(asset);
    assert.isDefined(asset.name);
  });

  it("should create a storage asset", async () => {
    const assetData: StorageAsset = {
      location: "uksouth",
      properties: {
        description: "Test storage asset for SDK validation",
        path: "data/test-assets",
      },
    };
    const poller = client.storageAssets.createOrUpdate(
      resourceGroupName,
      STORAGE_CONTAINER_NAME,
      "test-sa-482ad005",
      assetData,
      testPollingOptions,
    );
    const asset = await poller.pollUntilDone();
    assert.isDefined(asset);
  });

  it("should update a storage asset", async () => {
    const updateData: StorageAssetUpdate = { tags: { SkipAutoDeleteTill: "2026-12-31" } };
    const poller = client.storageAssets.update(
      resourceGroupName,
      STORAGE_CONTAINER_NAME,
      "test-sa-482ad005",
      updateData,
      testPollingOptions,
    );
    const asset = await poller.pollUntilDone();
    assert.isDefined(asset);
  });

  it("should delete a storage asset", async () => {
    const poller = client.storageAssets.delete(
      resourceGroupName,
      STORAGE_CONTAINER_NAME,
      "test-sa-482ad005",
      testPollingOptions,
    );
    await poller.pollUntilDone();
  });
});
