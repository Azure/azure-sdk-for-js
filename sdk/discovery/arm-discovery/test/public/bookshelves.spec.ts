// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder } from "@azure-tools/test-recorder";
import { env, isPlaybackMode } from "@azure-tools/test-recorder";
import { createTestCredential } from "@azure-tools/test-credential";
import type { Bookshelf, BookshelfUpdate } from "../../src/index.js";
import { DiscoveryClient } from "../../src/index.js";
import { describe, it, assert, beforeEach, afterEach } from "vitest";
import { createRecorder } from "./utils/recordedClient.js";

const testPollingOptions = {
  updateIntervalInMs: isPlaybackMode() ? 0 : undefined,
};

describe("Discovery ARM Client - Bookshelves", () => {
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

  it("should list bookshelves in subscription", async () => {
    const bookshelves: any[] = [];
    for await (const bookshelf of client.bookshelves.listBySubscription()) {
      bookshelves.push(bookshelf);
    }
    assert.isArray(bookshelves);
  });

  it("should list bookshelves in resource group", async () => {
    const bookshelves: any[] = [];
    for await (const bookshelf of client.bookshelves.listByResourceGroup(resourceGroupName)) {
      bookshelves.push(bookshelf);
    }
    assert.isArray(bookshelves);
  });

  it("should get a bookshelf", async () => {
    const bookshelf = await client.bookshelves.get(resourceGroupName, "jstest-bkshelf-0316a");
    assert.isDefined(bookshelf);
    assert.isDefined(bookshelf.name);
    assert.isDefined(bookshelf.location);
  });

  it("should create a bookshelf", async () => {
    const bookshelfData: Bookshelf = { location: "uksouth" };
    const poller = client.bookshelves.createOrUpdate(
      resourceGroupName,
      "jstest-bkshelf-0316a",
      bookshelfData,
      testPollingOptions,
    );
    const bookshelf = await poller.pollUntilDone();
    assert.isDefined(bookshelf);
  });

  it("should update a bookshelf", async () => {
    const updateData: BookshelfUpdate = { tags: { SkipAutoDeleteTill: "2026-12-31" } };
    const poller = client.bookshelves.update(
      resourceGroupName,
      "jstest-bkshelf-0316a",
      updateData,
      testPollingOptions,
    );
    const bookshelf = await poller.pollUntilDone();
    assert.isDefined(bookshelf);
  });

  it("should delete a bookshelf", async () => {
    const poller = client.bookshelves.delete(
      resourceGroupName,
      "test-bookshelf-324938be",
      testPollingOptions,
    );
    await poller.pollUntilDone();
  });
});
