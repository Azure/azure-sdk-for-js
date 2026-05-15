// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
//
// Mirrors .NET `Azure.ResourceManager.StorageMover.Tests.Scenario.JobDefinitionJobRunTests`.

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

const RESOURCE_GROUP_NAME = "testsmrg-js-jdjr";

describe("JobDefinitionJobRunTests", () => {
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

  it("creates a job definition; start/stop fail without a registered agent", async () => {
    const storageMoverName = nameFor(recorder, "storageMoverName", "testsm-");
    const projectName = nameFor(recorder, "projectName", "testproject-");
    const sourceEndpointName = nameFor(recorder, "sourceEndpointName", "testnfs-");
    const targetEndpointName = nameFor(recorder, "targetEndpointName", "testblob-");
    const jobDefinitionName = nameFor(recorder, "jobDefinitionName", "testjobdef-");

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

    let jd = await client.jobDefinitions.createOrUpdate(
      RESOURCE_GROUP_NAME,
      storageMoverName,
      projectName,
      jobDefinitionName,
      {
        properties: {
          copyMode: "Additive",
          sourceName: sourceEndpointName,
          targetName: targetEndpointName,
          description: "scenario-test job definition",
        },
      },
    );
    assert.equal(jd.name, jobDefinitionName);
    assert.equal(jd.properties.sourceName, sourceEndpointName);
    assert.equal(jd.properties.targetName, targetEndpointName);
    assert.equal(jd.properties.copyMode, "Additive");

    // get-then-get equivalence (mirrors .NET).
    jd = await client.jobDefinitions.get(
      RESOURCE_GROUP_NAME,
      storageMoverName,
      projectName,
      jobDefinitionName,
    );
    const jd2 = await client.jobDefinitions.get(
      RESOURCE_GROUP_NAME,
      storageMoverName,
      projectName,
      jobDefinitionName,
    );
    assert.equal(jd.name, jd2.name);
    assert.equal(jd.properties.sourceName, jd2.properties.sourceName);
    assert.equal(jd.properties.targetName, jd2.properties.targetName);

    // List must contain ours.
    let found = false;
    for await (const item of client.jobDefinitions.list(
      RESOURCE_GROUP_NAME,
      storageMoverName,
      projectName,
    )) {
      if (item.name === jobDefinitionName) found = true;
    }
    assert.ok(found, `expected ${jobDefinitionName} in the job-definition list`);

    // Start / Stop must fail because no agent is registered for this Storage Mover.
    // Wrap in `rejects.toThrow()` so the assertion can't silently pass.
    await expect(
      client.jobDefinitions.startJob(
        RESOURCE_GROUP_NAME,
        storageMoverName,
        projectName,
        jobDefinitionName,
      ),
    ).rejects.toThrow();
    await expect(
      client.jobDefinitions.stopJob(
        RESOURCE_GROUP_NAME,
        storageMoverName,
        projectName,
        jobDefinitionName,
      ),
    ).rejects.toThrow();

    // Cleanup
    const moverDelete = client.storageMovers.delete(RESOURCE_GROUP_NAME, storageMoverName);
    await moverDelete.pollUntilDone();
  });
});
