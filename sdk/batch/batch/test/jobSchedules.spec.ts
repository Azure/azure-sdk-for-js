// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder } from "@azure-tools/test-recorder";
import { isPlaybackMode } from "@azure-tools/test-recorder";
import { createBatchClient, createRecorder } from "./utils/recordedClient.js";
import type {
  BatchJobSchedule,
  BatchJobScheduleCreateOptions,
  BatchJobScheduleUpdateOptions,
  BatchClient,
  BatchJob,
} from "../src/index.js";
import { fakeAzureBatchEndpoint, fakeTestPasswordPlaceholder2 } from "./utils/fakeTestSecrets.js";
import { getResourceName, POLLING_INTERVAL } from "./utils/helpers.js";
import { describe, it, beforeAll, afterAll, beforeEach, afterEach, expect } from "vitest";
import {
  getBatchAccountKeys,
  getExistingBatchAccount,
} from "./utils/arm-resources/batch-account.js";
import { createBatchLinuxPool, deleteBatchPool } from "./utils/arm-resources/batch-pool.js";
import { getHoboBatchAccountName } from "./utils/arm-resources/env-const.js";

// Helper functions to replace moment.js
function addDays(days: number): Date {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date;
}

function durationToIso(minutes?: number, hours?: number): string {
  const totalMinutes = (hours || 0) * 60 + (minutes || 0);
  const h = Math.floor(totalMinutes / 60);
  const m = totalMinutes % 60;
  return `PT${h > 0 ? h + "H" : ""}${m > 0 ? m + "M" : ""}`;
}

const BASIC_POOL = getResourceName("Pool-Basic");
const BASIC_POOL_NUM_VMS = 4;
const JOB_SCHEDULE = getResourceName("JobSchedule-Basic");
const JOB_SCHEDULE_DISPLAY = "JobSchedule-1";

describe("Job Schedule Operations Test", () => {
  let recorder: Recorder;
  let batchClient: BatchClient;
  let batchAccountEndpoint = fakeAzureBatchEndpoint;
  let batchAccountKey = fakeTestPasswordPlaceholder2;

  /**
   * Provision helper resources needed for testing jobs
   */
  beforeAll(async () => {
    if (isPlaybackMode()) {
      return;
    }

    const account = await getExistingBatchAccount(getHoboBatchAccountName());
    batchAccountEndpoint = `https://${account.accountEndpoint!}`;

    const accountKeys = await getBatchAccountKeys(getHoboBatchAccountName());
    console.log("created Batch Account:", getHoboBatchAccountName());

    batchAccountKey = accountKeys.primary!;

    await createBatchLinuxPool(getHoboBatchAccountName(), BASIC_POOL, BASIC_POOL_NUM_VMS);
    console.log("created Batch Pool:", BASIC_POOL);
  });

  /**
   * Unprovision helper resources after all tests ran
   */
  afterAll(async () => {
    if (isPlaybackMode()) {
      return;
    }

    await deleteBatchPool(getHoboBatchAccountName(), BASIC_POOL);
    console.log("deleted Batch Pool:", BASIC_POOL);
  });

  beforeEach(async (ctx) => {
    recorder = await createRecorder(ctx);
    batchClient = createBatchClient({
      recorder,
      accountEndpoint: batchAccountEndpoint,
      accountName: getHoboBatchAccountName(),
      accountKey: batchAccountKey,
    });

    await recorder.addSanitizers({
      generalSanitizers: [
        {
          target: batchAccountEndpoint,
          value: fakeAzureBatchEndpoint,
        },
      ],
    });
  });

  afterEach(async () => {
    await recorder.stop();
  });

  it("should create a job schedule successfully", async () => {
    const jobScheduleId = recorder.variable("JOB_SCHEDULE", JOB_SCHEDULE);
    const poolId = recorder.variable("BASIC_POOL", BASIC_POOL);
    const runDate = recorder.variable("JOB_SCHEDULE_RUN_DATE", addDays(1).toISOString());

    const options: BatchJobScheduleCreateOptions = {
      id: jobScheduleId,
      jobSpecification: {
        poolInfo: { poolId: poolId },
        displayName: JOB_SCHEDULE_DISPLAY,
      },
      schedule: {
        doNotRunAfter: new Date(runDate),
        recurrenceInterval: durationToIso(2), // 2 minutes
      },
    };

    await batchClient.createJobSchedule(options);

    // Verify it was created
    const schedule = await batchClient.getJobSchedule(jobScheduleId);
    expect(schedule.id).toBe(jobScheduleId);
  });

  it("should list job schedules successfully", async () => {
    const schedules: BatchJobSchedule[] = [];
    for await (const schedule of batchClient.listJobSchedules()) {
      schedules.push(schedule);
    }

    expect(schedules.length).toBeGreaterThanOrEqual(1);
  });

  it("should list jobs from job schedule successfully", async () => {
    const jobScheduleId = recorder.variable("JOB_SCHEDULE", JOB_SCHEDULE);

    const jobs: BatchJob[] = [];
    for await (const job of batchClient.listJobsFromSchedule(jobScheduleId)) {
      jobs.push(job);
    }

    expect(jobs.length).toBe(1);
  });

  it("should check if a job schedule exists successfully", async () => {
    const jobScheduleId = recorder.variable("JOB_SCHEDULE", JOB_SCHEDULE);

    // jobScheduleExists returns void but throws if not found
    await batchClient.jobScheduleExists(jobScheduleId);
    expect(true).toBe(true);
  });

  it("should get a job schedule reference successfully", async () => {
    const jobScheduleId = recorder.variable("JOB_SCHEDULE", JOB_SCHEDULE);

    const schedule = await batchClient.getJobSchedule(jobScheduleId);

    expect(schedule.id).toBe(jobScheduleId);
    expect(schedule.state).toBe("active");
    expect(schedule.jobSpecification?.displayName).toBe(JOB_SCHEDULE_DISPLAY);
  });

  it("should replace a job schedule successfully", async () => {
    const jobScheduleId = recorder.variable("JOB_SCHEDULE", JOB_SCHEDULE);
    const poolId = recorder.variable("BASIC_POOL", BASIC_POOL);

    const replaceOptions = {
      schedule: { recurrenceInterval: durationToIso(0, 6) }, // 6 hours
      jobSpecification: { poolInfo: { poolId: poolId } },
    } as BatchJobSchedule;

    await batchClient.replaceJobSchedule(jobScheduleId, replaceOptions);

    const schedule = await batchClient.getJobSchedule(jobScheduleId);
    expect(schedule.schedule?.recurrenceInterval).toBe("PT6H");
  });

  it("should update a job schedule successfully", async () => {
    const jobScheduleId = recorder.variable("JOB_SCHEDULE", JOB_SCHEDULE);

    const updateOptions: BatchJobScheduleUpdateOptions = {
      schedule: {
        recurrenceInterval: durationToIso(0, 3), // 3 hours
        startWindow: durationToIso(0, 1), // 1 hour
      },
    };

    await batchClient.updateJobSchedule(jobScheduleId, updateOptions);

    const schedule = await batchClient.getJobSchedule(jobScheduleId);
    expect(schedule.schedule?.recurrenceInterval).toBe("PT3H");
  });

  it("should disable a job schedule successfully", async () => {
    const jobScheduleId = recorder.variable("JOB_SCHEDULE", JOB_SCHEDULE);

    await batchClient.disableJobSchedule(jobScheduleId);

    const schedule = await batchClient.getJobSchedule(jobScheduleId);
    expect(schedule.state).toBe("disabled");
  });

  it("should enable a job schedule successfully", async () => {
    const jobScheduleId = recorder.variable("JOB_SCHEDULE", JOB_SCHEDULE);

    await batchClient.enableJobSchedule(jobScheduleId);

    const schedule = await batchClient.getJobSchedule(jobScheduleId);
    expect(schedule.state).toBe("active");
  });

  it("should terminate a job schedule successfully", async () => {
    const jobScheduleId = recorder.variable("JOB_SCHEDULE", JOB_SCHEDULE);

    await batchClient.beginTerminateJobScheduleAndWait(jobScheduleId, {
      updateIntervalInMs: POLLING_INTERVAL,
    });

    const schedule = await batchClient.getJobSchedule(jobScheduleId);
    expect(schedule.state).toBe("completed");
  });

  it("should delete a job schedule successfully", async () => {
    const jobScheduleId = recorder.variable("JOB_SCHEDULE", JOB_SCHEDULE);

    await batchClient.beginDeleteJobScheduleAndWait(jobScheduleId, {
      updateIntervalInMs: POLLING_INTERVAL,
    });

    try {
      await batchClient.getJobSchedule(jobScheduleId);
      expect.fail("Expected job schedule to be deleted");
    } catch (error: any) {
      expect(error.statusCode).toBe(404);
    }
  });
});
