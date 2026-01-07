// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder } from "@azure-tools/test-recorder";
import { isPlaybackMode } from "@azure-tools/test-recorder";
import { createBatchClient, createRecorder } from "./utils/recordedClient.js";
import type { BatchClient, BatchJobCreateOptions, BatchJobUpdateOptions, BatchJob } from "../src/index.js";
import { fakeAzureBatchEndpoint, fakeTestPasswordPlaceholder2 } from "./utils/fakeTestSecrets.js";
import { getResourceName, POLLING_INTERVAL } from "./utils/helpers.js";
import { describe, it, beforeAll, afterAll, beforeEach, afterEach, assert, expect } from "vitest";
import {
  getBatchAccountKeys,
  getExistingBatchAccount,
} from "./utils/arm-resources/batch-account.js";
import { createBatchLinuxPool, deleteBatchPool } from "./utils/arm-resources/batch-pool.js";
import { getHoboBatchAccountName } from "./utils/arm-resources/env-const.js";
import { RestError } from "@azure/core-rest-pipeline";

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

    const account = await getExistingBatchAccount(getHoboBatchAccountName());
    batchAccountEndpoint = `https://${account.accountEndpoint!}`;

    const accountKeys = await getBatchAccountKeys(getHoboBatchAccountName());
    console.log("retrieved Batch Account:", getHoboBatchAccountName());

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

  it("should create a job successfully", async () => {
    const jobId = recorder.variable("JOB_NAME", JOB_NAME);
    const poolId = recorder.variable("BASIC_POOL", BASIC_POOL);
    const jobAddParam: BatchJobCreateOptions = {
      id: jobId,
      poolInfo: { poolId: poolId },
    };

    await batchClient.createJob(jobAddParam);

    const job = await batchClient.getJob(jobId);

    assert.equal(job.state, "active");
    assert.equal(job.poolInfo?.poolId, poolId);
    assert.equal(job.allowTaskPreemption, false);
  });

  it("should replace a job successfully", async () => {
    const jobId = recorder.variable("JOB_NAME", JOB_NAME);
    const poolId = recorder.variable("BASIC_POOL", BASIC_POOL);
    const job = {
      priority: 500,
      constraints: { maxTaskRetryCount: 3 },
      poolInfo: { poolId: poolId },
    } as BatchJob;

    await batchClient.replaceJob(jobId, job);

    const updatedJob = await batchClient.getJob(jobId);
    assert.equal(updatedJob.priority, 500);
    assert.equal(updatedJob.constraints?.maxTaskRetryCount, 3);
  });

  it("should update a job successfully", async () => {
    const jobId = recorder.variable("JOB_NAME", JOB_NAME);
    const poolId = recorder.variable("BASIC_POOL", BASIC_POOL);
    const options: BatchJobUpdateOptions = {
      priority: JOB_PRIORITY,
      constraints: { maxTaskRetryCount: 3 },
      poolInfo: { poolId: poolId },
    };

    await batchClient.updateJob(jobId, options);

    const updatedJob = await batchClient.getJob(jobId);
    assert.equal(updatedJob.priority, JOB_PRIORITY);
  });

  it("should get a job reference successfully", async () => {
    const jobId = recorder.variable("JOB_NAME", JOB_NAME);
    const poolId = recorder.variable("BASIC_POOL", BASIC_POOL);
    const job = await batchClient.getJob(jobId);

    assert.equal(job.id, jobId);
    assert.equal(job.state, "active");
    assert.equal(job.priority, JOB_PRIORITY);
    assert.equal(job.poolInfo!.poolId, poolId);
  });

  it("should list jobs successfully", async () => {
    const jobs: BatchJob[] = [];
    for await (const job of batchClient.listJobs()) {
      jobs.push(job);
    }

    assert.isAtLeast(jobs.length, 1);
  });

  it("should fail to get job prep+release status", async () => {
    const jobId = recorder.variable("JOB_NAME", JOB_NAME);

    try {
      const statuses: any[] = [];
      for await (const status of batchClient.listJobPreparationAndReleaseTaskStatus(jobId)) {
        statuses.push(status);
      }
      assert.fail("Expected error response to return");
    } catch (error: any) {
      if (!(error instanceof RestError)) {
        throw error;
      }
      // Expected error - job prep/release tasks not configured
      expect(error.statusCode).toBe(409);
    }
  });

  it("should disable a job successfully", async () => {
    const jobId = recorder.variable("JOB_NAME", JOB_NAME);

    await batchClient.beginDisableJobAndWait(
      jobId,
      { disableTasks: "requeue" },
      { updateIntervalInMs: POLLING_INTERVAL },
    );

    const job = await batchClient.getJob(jobId);
    assert.equal(job.state, "disabled");
  });

  it("should enable a job successfully", async () => {
    const jobId = recorder.variable("JOB_NAME", JOB_NAME);

    await batchClient.beginEnableJobAndWait(jobId, { updateIntervalInMs: POLLING_INTERVAL });

    const job = await batchClient.getJob(jobId);
    assert.equal(job.state, "active");
  });

  it("should terminate a job successfully", async () => {
    const jobId = recorder.variable("JOB_NAME", JOB_NAME);

    await batchClient.beginTerminateJobAndWait(jobId, {
      updateIntervalInMs: POLLING_INTERVAL,
      force: true,
    });

    const job = await batchClient.getJob(jobId);
    assert.equal(job.state, "completed");
  });

  it("should delete a job successfully", async () => {
    const jobId = recorder.variable("JOB_NAME", JOB_NAME);

    await batchClient.beginDeleteJobAndWait(jobId, {
      updateIntervalInMs: POLLING_INTERVAL,
      force: true,
    });

    try {
      await batchClient.getJob(jobId);
      assert.fail("Expected job to be deleted");
    } catch (error: any) {
      if (!(error instanceof RestError)) {
        throw error;
      }
      expect(error.statusCode).toBe(404);
    }
  });
});
