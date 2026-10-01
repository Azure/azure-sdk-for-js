// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
//
// Mirrors .NET `Azure.ResourceManager.StorageMover.Tests.Scenario.ProjectResourceTests`.

import { afterAll, afterEach, assert, beforeAll, beforeEach, describe, expect, it } from "vitest";
import type { Recorder } from "@azure-tools/test-recorder";
import type { StorageMoverClient } from "../../src/index.js";
import {
  createStorageMover,
  deleteResourceGroup,
  getSubscriptionId,
  nameFor,
  provisionResourceGroup,
  setupRecorder,
} from "./testHelper.js";

const RESOURCE_GROUP_NAME = "testsmrg-js-projres";

describe("ProjectResourceTests", () => {
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

  it("gets, updates, and deletes a project", async () => {
    const storageMoverName = nameFor(recorder, "storageMoverName", "testsm-");
    const projectName = nameFor(recorder, "projectName", "testproject-");
    await createStorageMover(client, RESOURCE_GROUP_NAME, storageMoverName);

    let project = await client.projects.createOrUpdate(
      RESOURCE_GROUP_NAME,
      storageMoverName,
      projectName,
      { properties: {} },
    );
    const project2 = await client.projects.get(RESOURCE_GROUP_NAME, storageMoverName, projectName);
    assert.equal(project.name, project2.name);
    assert.equal(project.id, project2.id);

    project = await client.projects.update(RESOURCE_GROUP_NAME, storageMoverName, projectName, {
      properties: { description: "This is an updated project" },
    });
    assert.equal(project.properties?.description, "This is an updated project");

    const poller = client.projects.delete(RESOURCE_GROUP_NAME, storageMoverName, projectName);
    await poller.pollUntilDone();

    await expect(
      client.projects.get(RESOURCE_GROUP_NAME, storageMoverName, projectName),
    ).rejects.toThrow();

    const moverDelete = client.storageMovers.delete(RESOURCE_GROUP_NAME, storageMoverName);
    await moverDelete.pollUntilDone();
  });
});
