// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
//
// Mirrors .NET `Azure.ResourceManager.StorageMover.Tests.Scenario.ProjectCollectionTests`.

import { afterAll, afterEach, assert, beforeAll, beforeEach, describe, it } from "vitest";
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

const RESOURCE_GROUP_NAME = "testsmrg-js-projcoll";

describe("ProjectCollectionTests", () => {
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

  it("creates, gets, lists, and confirms existence of a project", async () => {
    const storageMoverName = nameFor(recorder, "storageMoverName", "testsm-");
    const projectName = nameFor(recorder, "projectName", "testproject-");
    await createStorageMover(client, RESOURCE_GROUP_NAME, storageMoverName);

    let project = await client.projects.createOrUpdate(
      RESOURCE_GROUP_NAME,
      storageMoverName,
      projectName,
      { properties: {} },
    );
    assert.equal(project.name, projectName);
    assert.equal(project.properties?.description, undefined);
    // Per playbook, type string is lowercased by the RP.
    assert.equal(project.type?.toLowerCase(), "microsoft.storagemover/storagemovers/projects");

    project = await client.projects.get(RESOURCE_GROUP_NAME, storageMoverName, projectName);
    assert.equal(project.name, projectName);
    assert.equal(project.type?.toLowerCase(), "microsoft.storagemover/storagemovers/projects");

    let count = 0;
    let foundOurs = false;
    for await (const p of client.projects.list(RESOURCE_GROUP_NAME, storageMoverName)) {
      count++;
      if (p.name === projectName) foundOurs = true;
    }
    assert.ok(count >= 1, `expected at least 1 project, got ${count}`);
    assert.ok(foundOurs, `expected ${projectName} in the project list`);

    const poller = client.storageMovers.delete(RESOURCE_GROUP_NAME, storageMoverName);
    await poller.pollUntilDone();
  });
});
