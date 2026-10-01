// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
//
// Mirrors .NET `Azure.ResourceManager.StorageMover.Tests.Scenario.JobRunTests`.
//
// Per the cross-language playbook, no JobRun exists without a registered agent —
// so this test asserts the empty-list + not-found pair (combines the original
// list/get/exists into one scenario, as in the Python port).

import { afterAll, afterEach, assert, beforeAll, beforeEach, describe, expect, it } from "vitest";
import type { Recorder } from "@azure-tools/test-recorder";
import type { StorageMoverClient } from "../../src/index.js";
import {
  createBlobEndpoint,
  createNfsEndpoint,
  createProject,
  createStorageMover,
  deleteResourceGroup,
  getSubscriptionId,
  nameFor,
  provisionResourceGroup,
  setupRecorder,
} from "./testHelper.js";

const RESOURCE_GROUP_NAME = "testsmrg-js-jobrun";

describe("JobRunTests", () => {
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

  it("job run list is empty and unknown id returns not found", async () => {
    const storageMoverName = nameFor(recorder, "storageMoverName", "testsm-");
    const projectName = nameFor(recorder, "projectName", "testproject-");
    const sourceEndpointName = nameFor(recorder, "sourceEndpointName", "testnfs-");
    const targetEndpointName = nameFor(recorder, "targetEndpointName", "testblob-");
    const jobDefinitionName = nameFor(recorder, "jobDefinitionName", "testjobdef-");
    const unknownJobName = "6e8c0dfe-821a-427d-8d11-a9ed7f1c9c13";

    await createStorageMover(client, RESOURCE_GROUP_NAME, storageMoverName);
    await createProject(client, RESOURCE_GROUP_NAME, storageMoverName, projectName);
    await createNfsEndpoint(client, RESOURCE_GROUP_NAME, storageMoverName, sourceEndpointName);
    await createBlobEndpoint(
      client,
      RESOURCE_GROUP_NAME,
      storageMoverName,
      targetEndpointName,
      subscriptionId,
    );
    await client.jobDefinitions.createOrUpdate(
      RESOURCE_GROUP_NAME,
      storageMoverName,
      projectName,
      jobDefinitionName,
      {
        properties: {
          copyMode: "Additive",
          sourceName: sourceEndpointName,
          targetName: targetEndpointName,
        },
      },
    );

    let count = 0;
    for await (const _ of client.jobRuns.list(
      RESOURCE_GROUP_NAME,
      storageMoverName,
      projectName,
      jobDefinitionName,
    )) {
      count++;
    }
    assert.equal(count, 0, `expected no job runs without a registered agent, found ${count}`);

    await expect(
      client.jobRuns.get(
        RESOURCE_GROUP_NAME,
        storageMoverName,
        projectName,
        jobDefinitionName,
        unknownJobName,
      ),
    ).rejects.toThrow();

    const moverDelete = client.storageMovers.delete(RESOURCE_GROUP_NAME, storageMoverName);
    await moverDelete.pollUntilDone();
  });
});
