// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder } from "@azure-tools/test-recorder";
import { isPlaybackMode } from "@azure-tools/test-recorder";
import { createBatchClientV2, createRecorder } from "./utils/recordedClient.js";
import type { BatchJobSchedule, CreateJobScheduleParameters, BatchClient } from "../src/index.js";
import { isUnexpected } from "../src/index.js";
import { fakeAzureBatchEndpoint, fakeTestPasswordPlaceholder2 } from "./utils/fakeTestSecrets.js";
import { getResourceName } from "./utils/helpers.js";
import moment from "moment";
import { describe, it, beforeAll, afterAll, beforeEach, afterEach, assert } from "vitest";
import {
  getBatchAccountKeys,
  getExistingBatchAccount,
} from "./utils/arm-resources/batch-account.js";
import { createBatchWindowsPool, deleteBatchPool } from "./utils/arm-resources/batch-pool.js";
import { getHoboBatchAccountName } from "./utils/arm-resources/env-const.js";

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

    await createBatchWindowsPool(getHoboBatchAccountName(), BASIC_POOL, BASIC_POOL_NUM_VMS);
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
    batchClient = createBatchClientV2({
      recorder,
      accountEndpoint: batchAccountEndpoint,
      accountName: getHoboBatchAccountName(),
      accountKey: batchAccountKey,
    });

    recorder.addSanitizers({
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
    const options: CreateJobScheduleParameters = {
      body: {
        id: recorder.variable("JOB_SCHEDULE", JOB_SCHEDULE),
        jobSpecification: {
          poolInfo: { poolId: recorder.variable("BASIC_POOL", BASIC_POOL) },
          displayName: JOB_SCHEDULE_DISPLAY,
        },
        schedule: {
          doNotRunAfter: new Date(
            recorder.variable("JOB_SCHEDULE_RUN_DATE", moment().add(1, "days").toISOString()),
          ),
          recurrenceInterval: moment.duration({ minutes: 2 }).toISOString(),
        },
      },
      contentType: "application/json; odata=minimalmetadata",
    };

    const postScheduleResult = await batchClient.path("/jobschedules").post(options);

    if (isUnexpected(postScheduleResult)) {
      assert.fail(`Received unexpected status code from creating job schedule: ${postScheduleResult.status}
            Response Body: ${postScheduleResult.body.message}`);
    }
  });

  it("should list job schedules successfully", async () => {
    const jobScheduleListResult = await batchClient.path("/jobschedules").get();
    if (isUnexpected(jobScheduleListResult)) {
      assert.fail(`Received unexpected status code from listing job schedules: ${jobScheduleListResult.status}
            Response Body: ${jobScheduleListResult.body.message}`);
    }

    assert.isAtLeast(jobScheduleListResult.body.value?.length || 0, 1);
  });

  it("should list jobs from job schedule successfully", async () => {
    const jobListResult = await batchClient
      .path("/jobschedules/{jobScheduleId}/jobs", recorder.variable("JOB_SCHEDULE", JOB_SCHEDULE))
      .get();
    if (isUnexpected(jobListResult)) {
      assert.fail(`Received unexpected status code from listing jobs under job schedule: ${jobListResult.status}
            Response Body: ${jobListResult.body.message}`);
    }

    assert.equal(jobListResult.body.value?.length || 0, 1);
  });

  it("should check if a job schedule exists successfully", async () => {
    const getJobScheduleResult = await batchClient
      .path("/jobschedules/{jobScheduleId}", recorder.variable("JOB_SCHEDULE", JOB_SCHEDULE))
      .get();
    assert.equal(getJobScheduleResult.status, "200");
  });

  it("should get a job schedule reference successfully", async () => {
    const jobScheduleId = recorder.variable("JOB_SCHEDULE", JOB_SCHEDULE);
    const getJobScheduleResult = await batchClient
      .path("/jobschedules/{jobScheduleId}", jobScheduleId)
      .get();

    if (isUnexpected(getJobScheduleResult)) {
      assert.fail(`Received unexpected status code from getting job schedule reference: ${getJobScheduleResult.status}
            Response Body: ${getJobScheduleResult.body.message}`);
    }

    assert.equal(getJobScheduleResult.body.id, jobScheduleId);
    assert.equal(getJobScheduleResult.body.state, "active");
    assert.equal(getJobScheduleResult.body.jobSpecification?.displayName, JOB_SCHEDULE_DISPLAY);
  });

  it("should update a job schedule successfully", async () => {
    const updateScheduleOptions: BatchJobSchedule = {
      schedule: { recurrenceInterval: moment.duration({ hours: 6 }).toISOString() },
      jobSpecification: { poolInfo: { poolId: recorder.variable("BASIC_POOL", BASIC_POOL) } },
    };

    const updateScheduleResult = await batchClient
      .path("/jobschedules/{jobScheduleId}", recorder.variable("JOB_SCHEDULE", JOB_SCHEDULE))
      .put({
        body: updateScheduleOptions,
        contentType: "application/json; odata=minimalmetadata",
      });

    assert.equal(updateScheduleResult.status, "200");
  });

  it("should patch a job schedule successfully", async () => {
    const patchScheduleOptions = {
      schedule: {
        recurrenceInterval: moment.duration({ hours: 3 }).toISOString(),
        startWindow: moment.duration({ hours: 1 }).toISOString(),
      },
    };

    const patchScheduleResult = await batchClient
      .path("/jobschedules/{jobScheduleId}", recorder.variable("JOB_SCHEDULE", JOB_SCHEDULE))
      .patch({
        body: patchScheduleOptions,
        contentType: "application/json; odata=minimalmetadata",
      });

    assert.equal(patchScheduleResult.status, "200");
  });

  it("should disable a job schedule successfully", async () => {
    const disableScheduleResult = await batchClient
      .path(
        "/jobschedules/{jobScheduleId}/disable",
        recorder.variable("JOB_SCHEDULE", JOB_SCHEDULE),
      )
      .post({ contentType: "application/json; odata=minimalmetadata" });
    assert.equal(disableScheduleResult.status, "204");
  });

  it("should enable a job schedule successfully", async () => {
    const enableScheduleResult = await batchClient
      .path("/jobschedules/{jobScheduleId}/enable", recorder.variable("JOB_SCHEDULE", JOB_SCHEDULE))
      .post({ contentType: "application/json; odata=minimalmetadata" });
    assert.equal(enableScheduleResult.status, "204");
  });

  it("should terminate a job schedule successfully", async () => {
    const terminateScheduleResult = await batchClient
      .path(
        "/jobschedules/{jobScheduleId}/terminate",
        recorder.variable("JOB_SCHEDULE", JOB_SCHEDULE),
      )
      .post({ contentType: "application/json; odata=minimalmetadata" });
    assert.equal(terminateScheduleResult.status, "202");
  });

  it("should delete a job schedule successfully", async () => {
    const deleteJobScheduleResult = await batchClient
      .path("/jobschedules/{jobScheduleId}", recorder.variable("JOB_SCHEDULE", JOB_SCHEDULE))
      .delete();
    assert.equal(deleteJobScheduleResult.status, "202");
  });
});
