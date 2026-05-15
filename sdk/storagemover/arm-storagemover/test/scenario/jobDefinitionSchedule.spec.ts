// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
//
// Mirrors .NET `Azure.ResourceManager.StorageMover.Tests.Scenario.JobDefinitionScheduleTests`.

import { afterAll, afterEach, assert, beforeAll, beforeEach, describe, it } from "vitest";
import type { Recorder } from "@azure-tools/test-recorder";
import type { StorageMoverClient } from "../../src/index.js";
import {
  createBlobEndpoint,
  createNfsEndpoint,
  createProject,
  createStorageMover,
  deleteResourceGroup,
  getSubscriptionId,
  isoDate,
  nameFor,
  provisionResourceGroup,
  setupRecorder,
} from "./testHelper.js";

const RESOURCE_GROUP_NAME = "testsmrg-js-sched";

describe("JobDefinitionScheduleTests", () => {
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

  async function provisionParents(): Promise<{
    storageMoverName: string;
    projectName: string;
    sourceEndpointName: string;
    targetEndpointName: string;
  }> {
    const storageMoverName = nameFor(recorder, "storageMoverName", "testsm-");
    const projectName = nameFor(recorder, "projectName", "testproject-");
    const sourceEndpointName = nameFor(recorder, "sourceEndpointName", "testnfs-");
    const targetEndpointName = nameFor(recorder, "targetEndpointName", "testblob-");

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
    return { storageMoverName, projectName, sourceEndpointName, targetEndpointName };
  }

  it("creates a job definition with a weekly schedule", async () => {
    const { storageMoverName, projectName, sourceEndpointName, targetEndpointName } =
      await provisionParents();
    const jobDefinitionName = nameFor(recorder, "jobDefinitionName", "jobdef-wk-");

    // startDate / endDate use now+1d / now+30d, recorded so playback is deterministic
    // and the RP's ~1-year endDate window is respected. JS ScheduleInfo serializer
    // calls `.toISOString()` which produces the required `Z` suffix automatically.
    const startDate = new Date(isoDate(recorder, "scheduleStart", 1));
    const endDate = new Date(isoDate(recorder, "scheduleEnd", 30));

    const jd = await client.jobDefinitions.createOrUpdate(
      RESOURCE_GROUP_NAME,
      storageMoverName,
      projectName,
      jobDefinitionName,
      {
        properties: {
          copyMode: "Additive",
          sourceName: sourceEndpointName,
          targetName: targetEndpointName,
          description: "Job definition with weekly schedule",
          dataIntegrityValidation: "SaveVerifyFileMD5",
          schedule: {
            frequency: "Weekly",
            isActive: true,
            executionTime: { hour: 2 },
            startDate,
            endDate,
            daysOfWeek: ["Monday", "Wednesday", "Friday"],
          },
        },
      },
    );
    assert.equal(jd.name, jobDefinitionName);
    assert.equal(jd.properties.copyMode, "Additive");
    assert.equal(jd.properties.sourceName, sourceEndpointName);
    assert.equal(jd.properties.targetName, targetEndpointName);
    assert.ok(jd.properties.schedule, "schedule must be present on response");
    assert.equal(jd.properties.schedule?.frequency, "Weekly");
    assert.equal(jd.properties.schedule?.isActive, true);
    assert.equal(jd.properties.schedule?.executionTime?.hour, 2);
    assert.equal(jd.properties.schedule?.daysOfWeek?.length, 3);

    const moverDelete = client.storageMovers.delete(RESOURCE_GROUP_NAME, storageMoverName);
    await moverDelete.pollUntilDone();
  });

  it("creates a job definition with a daily schedule and preserves permissions", async () => {
    const { storageMoverName, projectName, sourceEndpointName, targetEndpointName } =
      await provisionParents();
    const jobDefinitionName = nameFor(recorder, "jobDefinitionName", "jobdef-daily-");

    const startDate = new Date(isoDate(recorder, "scheduleStart", 1));
    const endDate = new Date(isoDate(recorder, "scheduleEnd", 30));

    const jd = await client.jobDefinitions.createOrUpdate(
      RESOURCE_GROUP_NAME,
      storageMoverName,
      projectName,
      jobDefinitionName,
      {
        properties: {
          copyMode: "Mirror",
          sourceName: sourceEndpointName,
          targetName: targetEndpointName,
          description: "Job definition with daily schedule",
          dataIntegrityValidation: "None",
          preservePermissions: true,
          schedule: {
            frequency: "Daily",
            isActive: true,
            executionTime: { hour: 0 },
            startDate,
            endDate,
          },
        },
      },
    );
    assert.equal(jd.name, jobDefinitionName);
    assert.equal(jd.properties.copyMode, "Mirror");
    assert.equal(jd.properties.preservePermissions, true);
    assert.ok(jd.properties.schedule);
    assert.equal(jd.properties.schedule?.frequency, "Daily");

    const moverDelete = client.storageMovers.delete(RESOURCE_GROUP_NAME, storageMoverName);
    await moverDelete.pollUntilDone();
  });

  it("creates a job definition with a one-time schedule", async () => {
    const { storageMoverName, projectName, sourceEndpointName, targetEndpointName } =
      await provisionParents();
    const jobDefinitionName = nameFor(recorder, "jobDefinitionName", "jobdef-once-");

    const startDate = new Date(isoDate(recorder, "scheduleStart", 1));

    const jd = await client.jobDefinitions.createOrUpdate(
      RESOURCE_GROUP_NAME,
      storageMoverName,
      projectName,
      jobDefinitionName,
      {
        properties: {
          copyMode: "Additive",
          sourceName: sourceEndpointName,
          targetName: targetEndpointName,
          description: "Job definition with one-time schedule",
          schedule: {
            frequency: "Onetime",
            isActive: true,
            executionTime: { hour: 10 },
            startDate,
          },
        },
      },
    );
    assert.equal(jd.name, jobDefinitionName);
    assert.ok(jd.properties.schedule);
    assert.equal(jd.properties.schedule?.frequency, "Onetime");

    const moverDelete = client.storageMovers.delete(RESOURCE_GROUP_NAME, storageMoverName);
    await moverDelete.pollUntilDone();
  });
});
