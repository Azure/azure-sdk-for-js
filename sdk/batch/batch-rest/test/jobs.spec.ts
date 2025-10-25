// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder } from "@azure-tools/test-recorder";
import { isPlaybackMode } from "@azure-tools/test-recorder";
import { createBatchClientV2, createRecorder } from "./utils/recordedClient.js";
import type {
  BatchClient,
  BatchJobCreateOptions,
  CreateJobParameters,
  UpdateJobParameters,
} from "../src/index.js";
import { isUnexpected } from "../src/index.js";
import { fakeAzureBatchEndpoint, fakeTestPasswordPlaceholder2 } from "./utils/fakeTestSecrets.js";
import { getResourceName } from "./utils/helpers.js";
import { describe, it, beforeAll, afterAll, beforeEach, afterEach, assert } from "vitest";
import {
  createHoboBatchAccount,
  getBatchAccountKeys,
} from "./utils/arm-resources/batch-account.js";
import { createBatchWindowsPool, deleteBatchPool } from "./utils/arm-resources/batch-pool.js";
import { getHoboBatchAccountName } from "./utils/arm-resources/env-const.js";

const BASIC_POOL = getResourceName("Pool-Basic");
const BASIC_POOL_NUM_VMS = 4;
const JOB_NAME = getResourceName("Job-Basic");
const JOB_PRIORITY = 600;

describe("Job Operations Test", () => {
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

    const account = await createHoboBatchAccount(getHoboBatchAccountName());
    batchAccountEndpoint = `https://${account.accountEndpoint!}`;

    const accountKeys = await getBatchAccountKeys(getHoboBatchAccountName());
    console.log("Successfully created Batch Account:", getHoboBatchAccountName());

    batchAccountKey = accountKeys.primary!;

    await createBatchWindowsPool(getHoboBatchAccountName(), BASIC_POOL, BASIC_POOL_NUM_VMS);
    console.log("Successfully created Batch Pool:", BASIC_POOL);
  });

  /**
   * Unprovision helper resources after all tests ran
   */
  afterAll(async () => {
    if (isPlaybackMode()) {
      return;
    }

    await deleteBatchPool(getHoboBatchAccountName(), BASIC_POOL);
    console.log("Successfully deleted Batch Pool:", BASIC_POOL);
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
    const options: BatchJobCreateOptions = {
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
        queryParameters: {
          force: true,
        },
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

  it("should delete a job successfully", async () => {
    const jobId = recorder.variable("JOB_NAME", JOB_NAME);
    const deleteJobResult = await batchClient.path("/jobs/{jobId}", jobId).delete({
      queryParameters: { force: true },
    });
    assert.equal(deleteJobResult.status, "202");
  });
});
