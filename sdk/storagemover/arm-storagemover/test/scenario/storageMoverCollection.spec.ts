// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
//
// Mirrors .NET `Azure.ResourceManager.StorageMover.Tests.Scenario.StorageMoverCollectionTests`.

import { afterAll, afterEach, assert, beforeAll, beforeEach, describe, it } from "vitest";
import type { Recorder } from "@azure-tools/test-recorder";
import type { StorageMoverClient } from "../../src/index.js";
import {
  TEST_LOCATION,
  deleteResourceGroup,
  getSubscriptionId,
  nameFor,
  provisionResourceGroup,
  setupRecorder,
} from "./testHelper.js";

const RESOURCE_GROUP_NAME = "testsmrg-js-collection";

describe("StorageMoverCollectionTests", () => {
  let recorder: Recorder;
  let client: StorageMoverClient;
  let subscriptionId: string;

  beforeAll(async () => {
    subscriptionId = getSubscriptionId();
    await provisionResourceGroup(subscriptionId, RESOURCE_GROUP_NAME);
  });

  afterAll(async () => {
    await deleteResourceGroup(subscriptionId, RESOURCE_GROUP_NAME);
  });

  beforeEach(async (ctx) => {
    ({ recorder, client } = await setupRecorder(ctx));
  });

  afterEach(async () => {
    if (recorder) {
      await recorder.stop();
    }
  });

  it("creates, updates, lists, and gets storage movers", async () => {
    const storageMoverName1 = nameFor(recorder, "storageMoverName1", "testsm-");
    const storageMoverName2 = nameFor(recorder, "storageMoverName2", "testsm-");

    const createBody = {
      location: TEST_LOCATION,
      tags: { tag1: "value1" },
      properties: { description: "This is a new storage mover" },
    };

    let mover1 = await client.storageMovers.createOrUpdate(
      RESOURCE_GROUP_NAME,
      storageMoverName1,
      createBody,
    );
    assert.equal(mover1.name, storageMoverName1);
    assert.equal(mover1.tags?.tag1, "value1");
    assert.equal(mover1.properties?.description, "This is a new storage mover");

    const mover2 = await client.storageMovers.createOrUpdate(
      RESOURCE_GROUP_NAME,
      storageMoverName2,
      createBody,
    );
    assert.equal(mover2.name, storageMoverName2);
    assert.equal(mover2.tags?.tag1, "value1");

    mover1 = await client.storageMovers.get(RESOURCE_GROUP_NAME, storageMoverName1);
    assert.equal(mover1.name, storageMoverName1);
    assert.equal(mover1.tags?.tag1, "value1");
    assert.equal(mover1.properties?.description, "This is a new storage mover");

    // List in resource group must surface both movers we just created.
    const names = new Set<string>();
    for await (const m of client.storageMovers.list(RESOURCE_GROUP_NAME)) {
      if (m.name) names.add(m.name);
    }
    assert.ok(
      names.has(storageMoverName1) && names.has(storageMoverName2),
      `expected both ${storageMoverName1} and ${storageMoverName2} in ${[...names].join(",")}`,
    );

    // Update via createOrUpdate (PUT) — description is replaced.
    mover1 = await client.storageMovers.createOrUpdate(RESOURCE_GROUP_NAME, storageMoverName1, {
      ...createBody,
      properties: { description: "This is an updated storage mover" },
    });
    assert.equal(mover1.properties?.description, "This is an updated storage mover");
    assert.equal(mover1.tags?.tag1, "value1");

    // Cleanup
    for (const name of [storageMoverName1, storageMoverName2]) {
      const poller = client.storageMovers.delete(RESOURCE_GROUP_NAME, name);
      await poller.pollUntilDone();
    }
  });
});
