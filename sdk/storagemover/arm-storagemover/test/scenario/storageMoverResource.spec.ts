// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
//
// Mirrors .NET `Azure.ResourceManager.StorageMover.Tests.Scenario.StorageMoverResourceTests`.

import { afterAll, afterEach, assert, beforeAll, beforeEach, describe, it } from "vitest";
import type { Recorder } from "@azure-tools/test-recorder";
import type { StorageMoverClient } from "../../src/index.js";
import {
  TEST_LOCATION,
  createBlobEndpoint,
  createProject,
  createStorageMover,
  deleteResourceGroup,
  getSubscriptionId,
  nameFor,
  provisionResourceGroup,
  setupRecorder,
} from "./testHelper.js";

const RESOURCE_GROUP_NAME = "testsmrg-js-resource";

describe("StorageMoverResourceTests", () => {
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

  it("gets a storage mover and second get is equivalent", async () => {
    const storageMoverName = nameFor(recorder, "storageMoverName", "testsm-");
    await createStorageMover(client, RESOURCE_GROUP_NAME, storageMoverName);

    const mover1 = await client.storageMovers.get(RESOURCE_GROUP_NAME, storageMoverName);
    const mover2 = await client.storageMovers.get(RESOURCE_GROUP_NAME, storageMoverName);
    assert.equal(mover1.id, mover2.id);
    assert.equal(mover1.name, mover2.name);
    assert.equal(mover1.location, mover2.location);
    assert.equal(mover1.type, mover2.type);

    const poller = client.storageMovers.delete(RESOURCE_GROUP_NAME, storageMoverName);
    await poller.pollUntilDone();
  });

  // SKIP per cross-language playbook: agents cannot be created by the RP.
  it.skip("gets a storage mover agent (requires registered agent VM)", async () => {
    // See notes\Work\Tasks\storage-mover-scenario-tests-cross-language.md.
  });

  it("gets a storage mover endpoint", async () => {
    const storageMoverName = nameFor(recorder, "storageMoverName", "testsm-");
    const endpointName = nameFor(recorder, "endpointName", "testendpoint-");
    await createStorageMover(client, RESOURCE_GROUP_NAME, storageMoverName);
    await createBlobEndpoint(
      client,
      RESOURCE_GROUP_NAME,
      storageMoverName,
      endpointName,
      subscriptionId,
    );

    const endpoint = await client.endpoints.get(
      RESOURCE_GROUP_NAME,
      storageMoverName,
      endpointName,
    );
    assert.equal(endpoint.name, endpointName);
    assert.equal(endpoint.properties.endpointType, "AzureStorageBlobContainer");

    const poller = client.storageMovers.delete(RESOURCE_GROUP_NAME, storageMoverName);
    await poller.pollUntilDone();
  });

  it("gets a storage mover project", async () => {
    const storageMoverName = nameFor(recorder, "storageMoverName", "testsm-");
    const projectName = nameFor(recorder, "projectName", "testproject-");
    await createStorageMover(client, RESOURCE_GROUP_NAME, storageMoverName);
    await createProject(client, RESOURCE_GROUP_NAME, storageMoverName, projectName);

    const project = await client.projects.get(RESOURCE_GROUP_NAME, storageMoverName, projectName);
    assert.equal(project.name, projectName);

    const poller = client.storageMovers.delete(RESOURCE_GROUP_NAME, storageMoverName);
    await poller.pollUntilDone();
  });

  it("updates description and tags, then deletes", async () => {
    const storageMoverName = nameFor(recorder, "storageMoverName", "testsm-");
    // Create without tags initially — mirrors .NET test exactly.
    let mover = await client.storageMovers.createOrUpdate(RESOURCE_GROUP_NAME, storageMoverName, {
      location: TEST_LOCATION,
      properties: {},
    });
    assert.equal(mover.name, storageMoverName);
    assert.equal(mover.location, TEST_LOCATION);

    // Description update.
    mover = await client.storageMovers.update(RESOURCE_GROUP_NAME, storageMoverName, {
      properties: { description: "This is an updated storage mover" },
    });
    assert.equal(mover.properties?.description, "This is an updated storage mover");

    // Add a tag — JS PATCH on tags is replace-not-merge, so only assert keys we own.
    mover = await client.storageMovers.update(RESOURCE_GROUP_NAME, storageMoverName, {
      tags: { tag1: "val1" },
    });
    assert.equal(mover.tags?.tag1, "val1");

    // Set tags (replace map).
    mover = await client.storageMovers.update(RESOURCE_GROUP_NAME, storageMoverName, {
      tags: { tag2: "val2", tag3: "val3" },
    });
    assert.equal(mover.tags?.tag2, "val2");
    assert.equal(mover.tags?.tag3, "val3");
    // tag1 was replaced; don't assert exact-equality of the tag map because dev
    // subscriptions can attach policy-managed tags.

    // "Remove tag2" via PATCH with only tag3 — replace semantics.
    mover = await client.storageMovers.update(RESOURCE_GROUP_NAME, storageMoverName, {
      tags: { tag3: "val3" },
    });
    assert.equal(mover.tags?.tag3, "val3");

    // Cleanup.
    const poller = client.storageMovers.delete(RESOURCE_GROUP_NAME, storageMoverName);
    await poller.pollUntilDone();
  });
});
