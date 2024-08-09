// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Recorder, VitestTestContext, isPlaybackMode } from "@azure-tools/test-recorder";
import { createBatchClient, createRecorder } from "./utils/recordedClient.js";
import {
  isUnexpected,
  BatchJobSchedule,
  CreateJobScheduleParameters,
  BatchClient,
  CreatePoolParameters,
} from "../src/index.js";
import { fakeTestPasswordPlaceholder1 } from "./utils/fakeTestSecrets.js";
import { getResourceName } from "./utils/helpers.js";
// eslint-disable-next-line import/no-extraneous-dependencies
import moment from "moment";
import { describe, it, beforeAll, afterAll, beforeEach, afterEach, assert } from "vitest";

const BASIC_POOL = getResourceName("Pool-Basic");
const JOB_SCHEDULE = getResourceName("JobSchedule-Basic");
const JOB_SCHEDULE_DISPLAY = "JobSchedule-1";

describe("Job Schedule Operations Test", () => {
  let recorder: Recorder;
  let batchClient: BatchClient;

  /**
   * Provision helper resources needed for testing jobs
   */
  beforeAll(async function () {
    if (!isPlaybackMode()) {
      batchClient = createBatchClient();

      const poolParams: CreatePoolParameters = {
        body: {
          id: BASIC_POOL,
          vmSize: "Standard_D1_v2",
          virtualMachineConfiguration: {
            nodeAgentSKUId: "batch.node.windows amd64",
            imageReference: {
              publisher: "microsoftwindowsserver",
              offer: "windowsserver",
              sku: "2022-datacenter",
            },
          },
          targetDedicatedNodes: 4,
          // Ensures there's a compute node file we can reference later
          startTask: { commandLine: "cmd /c echo hello > hello.txt" },
          // Sets up pool user we can reference later
          userAccounts: [
            {
              name: "nonAdminUser",
              password: isPlaybackMode() ? fakeTestPasswordPlaceholder1 : "user_1account_password2", // Recorder sanitizer options will replace password with fakeTestPasswordPlaceholder1
              elevationLevel: "nonadmin",
            },
          ],
        },
        contentType: "application/json; odata=minimalmetadata",
      };

      const poolPostResult = await batchClient.path("/pools").post(poolParams);
      if (isUnexpected(poolPostResult)) {
        assert.fail(`Received unexpected status code from creating pool: ${poolPostResult.status}
              Unable to provision resource needed for job schedule Testing.
              Response Body: ${poolPostResult.body.message}`);
      }
    }
  });

  /**
   * Unprovision helper resources after all tests ran
   */
  afterAll(async function () {
    if (!isPlaybackMode()) {
      batchClient = createBatchClient();

      const poolId = recorder.variable("BASIC_POOL", BASIC_POOL);
      const poolDeleteResponse = await batchClient.path("/pools/{poolId}", poolId).delete();
      if (isUnexpected(poolDeleteResponse)) {
        assert.fail(`Received unexpected status code from deleting pool: ${poolDeleteResponse.status}.Pool Resource Leaked.
            Respose Body: ${poolDeleteResponse.body.message}`);
      }
    }
  });

  beforeEach(async function (ctx: VitestTestContext) {
    recorder = await createRecorder(ctx);
    batchClient = createBatchClient(recorder);
  });

  afterEach(async function () {
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
