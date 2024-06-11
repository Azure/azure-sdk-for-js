// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Recorder, VitestTestContext, isPlaybackMode } from "@azure-tools/test-recorder";
import { createBatchClient, createRecorder } from "./utils/recordedClient.js";
import {
  BatchClient,
  BatchJobCreateContent,
  CreateJobParameters,
  CreatePoolParameters,
  UpdateJobParameters,
  isUnexpected,
} from "../../src/index.js";
import { fakeTestPasswordPlaceholder1 } from "./utils/fakeTestSecrets.js";
import { getResourceName } from "./utils/helpers.js";
import { describe, it, beforeAll, afterAll, beforeEach, afterEach, assert } from "vitest";

const BASIC_POOL = getResourceName("Pool-Basic");
const JOB_NAME = getResourceName("Job-Basic");
const JOB_PRIORITY = 600;

describe("Job Operations Test", () => {
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
        console.dir(poolPostResult, { depth: null });
        assert.fail(`Received unexpected status code from creating pool: ${poolPostResult.status}
              Unable to provision resource needed for Job Testing.
              Response Body: ${poolPostResult.body}`);
      }
    }
  });

  /**
   * Unprovision helper resources after all tests ran
   */
  afterAll(async function () {
    if (!isPlaybackMode()) {
      batchClient = createBatchClient();

      const poolDeleteResponse = await batchClient.path("/pools/{poolId}", BASIC_POOL).delete();
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

  it("should create a job successfully", async () => {
    const jobId = recorder.variable("JOB_NAME", JOB_NAME);
    const poolId = recorder.variable("BASIC_POOL", BASIC_POOL);
    const jobAddParam: CreateJobParameters = {
      body: {
        id: jobId,
        poolInfo: { poolId: poolId },
      },
      contentType: "application/json; odata=minimalmetadata",
    };

    const jobAddResult = await batchClient.path("/jobs").post(jobAddParam);
    if (isUnexpected(jobAddResult)) {
      assert.fail(`Received unexpected status code from creating job: ${jobAddResult.status}
            Response Body: ${jobAddResult.body.message}`);
    }

    const getJobResult = await batchClient.path("/jobs/{jobId}", jobId).get();

    if (isUnexpected(getJobResult)) {
      assert.fail(`Received unexpected status code from getting job reference: ${getJobResult.status}
              Response Body: ${getJobResult.body.message}`);
    }

    assert.equal(getJobResult.body.state, "active");
    assert.equal(getJobResult.body.poolInfo?.poolId, poolId);
    assert.equal(getJobResult.body.allowTaskPreemption, false);
  });

  it("should update a job successfully", async () => {
    const options: BatchJobCreateContent = {
      id: recorder.variable("JOB_NAME", JOB_NAME),
      priority: 500,
      constraints: { maxTaskRetryCount: 3 },
      poolInfo: { poolId: recorder.variable("BASIC_POOL", BASIC_POOL) },
    };

    const jobPutParams: CreateJobParameters = {
      body: options,
      contentType: "application/json; odata=minimalmetadata",
    };

    const updateJobResult = await batchClient
      .path("/jobs/{jobId}", recorder.variable("JOB_NAME", JOB_NAME))
      .put(jobPutParams);
    assert.equal(updateJobResult.status, "200");
  });

  it("should patch a job successfully", async () => {
    const options = {
      priority: JOB_PRIORITY,
      constraints: { maxTaskRetryCount: 3 },
      poolInfo: { poolId: recorder.variable("BASIC_POOL", BASIC_POOL) },
    };

    const jobPatchParams: UpdateJobParameters = {
      body: options,
      contentType: "application/json; odata=minimalmetadata",
    };
    const patchJobResult = await batchClient
      .path("/jobs/{jobId}", recorder.variable("JOB_NAME", JOB_NAME))
      .patch(jobPatchParams);
    assert.equal(patchJobResult.status, "200");
  });

  it("should get a job reference successfully", async () => {
    const jobId = recorder.variable("JOB_NAME", JOB_NAME);
    const jobGetResult = await batchClient.path("/jobs/{jobId}", jobId).get();

    if (isUnexpected(jobGetResult)) {
      assert.fail(`Received unexpected status code from getting job reference: ${jobGetResult.status}
              Response Body: ${jobGetResult.body.message}`);
    }

    assert.equal(jobGetResult.body.id, jobId);
    assert.equal(jobGetResult.body.state, "active");
    assert.equal(jobGetResult.body.priority, JOB_PRIORITY);
    assert.equal(jobGetResult.body.poolInfo!.poolId, recorder.variable("BASIC_POOL", BASIC_POOL));
  });

  it("should list jobs successfully", async () => {
    const listJobsResult = await batchClient.path("/jobs").get();

    if (isUnexpected(listJobsResult)) {
      assert.fail(`Received unexpected status code from listing jobs: ${listJobsResult.status}
              Response Body: ${listJobsResult.body.message}`);
    }

    assert.isAtLeast(listJobsResult.body.value?.length ?? 0, 1);
  });

  it("should fail to job prep+release status", async () => {
    // TODO Wrap code around try/catch and try throwing exception from error response body
    const getJobPrepResult = await batchClient
      .path(
        "/jobs/{jobId}/jobpreparationandreleasetaskstatus",
        recorder.variable("JOB_NAME", JOB_NAME),
      )
      .get();
    if (!isUnexpected(getJobPrepResult)) {
      assert.fail("Expected error response to return");
    }
  });

  it("should disable a job successfully", async () => {
    const disableJobResult = await batchClient
      .path("/jobs/{jobId}/disable", recorder.variable("JOB_NAME", JOB_NAME))
      .post({
        body: { disableTasks: "requeue" },
        contentType: "application/json; odata=minimalmetadata",
      });

    assert.equal(disableJobResult.status, "202");
  });

  it("should enable a job successfully", async () => {
    const enableJobResult = await batchClient
      .path("/jobs/{jobId}/enable", recorder.variable("JOB_NAME", JOB_NAME))
      .post({ contentType: "application/json; odata=minimalmetadata" });

    assert.equal(enableJobResult.status, "202");
  });

  it("should terminate a job successfully", async () => {
    const terminateJobResult = await batchClient
      .path("/jobs/{jobId}/terminate", recorder.variable("JOB_NAME", JOB_NAME))
      .post({
        contentType: "application/json; odata=minimalmetadata",
      });

    assert.equal(terminateJobResult.status, "202");
  });

  // it("should get all job statistics successfully", async () => {
  //   const getJobStatsResult = await batchClient.path("/joblife").get();
  //   if (isUnexpected(getJobStatsResult)) {
  //     assert.fail(`Received unexpected status code from getting job lifetime stats: ${getJobStatsResult.status}
  //           Response Body: ${getJobStatsResult.body.message}`);
  //   }

  //   assert.isDefined(getJobStatsResult.body.userCPUTime);
  //   assert.isDefined(getJobStatsResult.body.kernelCPUTime);
  // });

  it("should delete a job successfully", async function () {
    const jobId = recorder.variable("JOB_NAME", JOB_NAME);
    const deleteJobResult = await batchClient.path("/jobs/{jobId}", jobId).delete();
    assert.equal(deleteJobResult.status, "202");
  });
});
