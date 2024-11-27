// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder } from "@azure-tools/test-recorder";
import type {
  CreateJobOptions,
  JobRouterAdministrationClient,
  JobRouterClient,
  RouterJob,
  UpdateJobOptions,
} from "../../../src/index.js";
import {
  getClassificationPolicyRequest,
  getDistributionPolicyRequest,
  getExceptionPolicyRequest,
  getJobRequest,
  getQueueRequest,
} from "../utils/testData.js";
import { createRecordedRouterClientWithConnectionString } from "../../internal/utils/mockClient.js";
import { sleep, timeoutMs } from "../utils/constants.js";
import { pollForJobQueued, retry } from "../utils/polling.js";
import { describe, it, assert, beforeEach, afterEach } from "vitest";
import type { RunnerTestSuite, TaskContext } from "vitest";

function getFullTitle(ctx: TaskContext): string {
  function getTitlePath(suite: RunnerTestSuite | undefined): string[] {
    if (suite) {
      return [...getTitlePath(suite.suite), suite.name];
    }
    return [];
  }

  return [...getTitlePath(ctx.task.suite), ctx.task.name].join(" ");
}

describe("JobRouterClient", () => {
  let client: JobRouterClient;
  let administrationClient: JobRouterAdministrationClient;
  let recorder: Recorder;

  const testRunId = "recorded-jobs";

  const { distributionPolicyId, distributionPolicyRequest } =
    getDistributionPolicyRequest(testRunId);
  const { exceptionPolicyId, exceptionPolicyRequest } = getExceptionPolicyRequest(testRunId);
  const { queueId, queueRequest } = getQueueRequest(testRunId);
  const { classificationPolicyId, classificationPolicyRequest } =
    getClassificationPolicyRequest(testRunId);
  const { jobId, jobRequest } = getJobRequest(testRunId);

  function getScheduledJob(scheduledTime: string): CreateJobOptions | UpdateJobOptions {
    return {
      ...jobRequest,
      notes: [],
      matchingMode: {
        scheduleAndSuspendMode: { scheduleAt: new Date(scheduledTime) },
      },
    };
  }

  describe("Job Operations", () => {
    beforeEach(async (ctx) => {
      ({ client, administrationClient, recorder } =
        await createRecordedRouterClientWithConnectionString(ctx));

      await administrationClient.createDistributionPolicy(
        distributionPolicyId,
        distributionPolicyRequest,
      );
      await administrationClient.createExceptionPolicy(exceptionPolicyId, exceptionPolicyRequest);
      await administrationClient.createQueue(queueId, queueRequest);
      await administrationClient.createClassificationPolicy(
        classificationPolicyId,
        classificationPolicyRequest,
      );
    });

    afterEach(async (ctx) => {
      await retry(
        async () => {
          if (getFullTitle(ctx) !== "JobRouterClient Job Operations should delete a job") {
            const job = await client.getJob(jobId);
            if (job.status !== "cancelled") {
              await client.cancelJob(jobId);
            }

            await client.deleteJob(jobId);
          }
          await administrationClient.deleteClassificationPolicy(classificationPolicyId);
          await administrationClient.deleteQueue(queueId);
          await administrationClient.deleteExceptionPolicy(exceptionPolicyId);
          await administrationClient.deleteDistributionPolicy(distributionPolicyId);
        },
        { retries: 5, retryIntervalMs: 1500 },
      );

      if (!ctx.task.pending && recorder) {
        await recorder.stop();
      }
    });

    it("should create a job", { timeout: timeoutMs }, async () => {
      const result = await client.createJob(jobId, jobRequest);

      assert.isDefined(result);
      assert.isDefined(result.id);
      assert.equal(result.id, jobId);
    });

    it("should create a scheduled job", { timeout: timeoutMs }, async () => {
      const currentTime: Date = new Date();
      currentTime.setSeconds(currentTime.getSeconds() + 30);
      const scheduledTime: string = recorder.variable("scheduledTime", currentTime.toISOString());

      const scheduledJob = getScheduledJob(scheduledTime);
      const result = await client.createJob(jobId, scheduledJob);

      assert.isDefined(result);
      assert.isDefined(result.id);
      assert.isDefined(result.matchingMode);
      assert.equal(result.id, jobId);
      assert.equal(
        result.matchingMode?.scheduleAndSuspendMode?.scheduleAt?.toISOString(),
        scheduledTime,
      );
    });

    it("should get a job", { timeout: timeoutMs }, async () => {
      await client.createJob(jobId, jobRequest);
      const result = await client.getJob(jobId);

      assert.isDefined(result);
      assert.isDefined(result.id);
      assert.equal(result.id, jobId);
    });

    it("should update a job", { timeout: timeoutMs }, async () => {
      await client.createJob(jobId, jobRequest);
      await sleep(1500); // This test is flaky

      const updatePatch = { ...jobRequest, priority: 25, dispositionCode: "testCode" };
      const updateResult = await client.updateJob(jobId, updatePatch);

      const removePatch = { ...jobRequest, priority: null!, dispositionCode: null! };
      const removeResult = await client.updateJob(jobId, removePatch);

      assert.isDefined(updateResult);
      assert.isDefined(updateResult.id);
      assert.isDefined(removeResult);
      assert.isDefined(removeResult.id);
      assert.equal(updateResult.id, jobId);
      assert.equal(removeResult.id, jobId);
      assert.equal(updateResult.priority, updatePatch.priority);
      assert.equal(removeResult.priority, 1);
      assert.isUndefined(removeResult.dispositionCode);
    });

    it("should get queue position for a job", { timeout: timeoutMs }, async () => {
      await client.createJob(jobId, jobRequest);
      await pollForJobQueued(jobId, client);
      const result = await client.getJobQueuePosition(jobId);

      assert.isDefined(result);
      assert.isDefined(result.position);
      assert.equal(jobId, result.jobId);
    });

    it("should reclassify a job", { timeout: timeoutMs }, async () => {
      await client.createJob(jobId, jobRequest);
      let result;
      await retry(
        async () => {
          result = await client.reclassifyJob(jobId);
        },
        { retries: 3, retryIntervalMs: 1500 },
      );

      assert.isDefined(result);
    });

    it("should list jobs", { timeout: timeoutMs }, async () => {
      await client.createJob(jobId, jobRequest);

      const result: RouterJob[] = [];
      for await (const job of client.listJobs({ maxPageSize: 20 })) {
        result.push(job.job!);
      }

      assert.isNotEmpty(result);
    });

    it("should list scheduled jobs", { timeout: timeoutMs }, async () => {
      const currentTime: Date = new Date();
      currentTime.setSeconds(currentTime.getSeconds() + 30);
      const scheduledTime: string = recorder.variable("scheduledTime", currentTime.toISOString());

      const scheduledJob = getScheduledJob(scheduledTime);
      await client.createJob(jobId, scheduledJob);

      const result: RouterJob[] = [];
      for await (const job of client.listJobs({
        maxPageSize: 20,
        scheduledBefore: new Date(scheduledTime),
      })) {
        result.push(job.job!);
      }

      assert.isNotEmpty(result);
    });

    it("should cancel a job", { timeout: timeoutMs }, async () => {
      await client.createJob(jobId, jobRequest);
      let result;
      await retry(
        async () => {
          result = await client.cancelJob(jobId);
        },
        { retries: 3, retryIntervalMs: 1500 },
      );

      assert.isDefined(result);
    });

    it("should delete a job", { timeout: timeoutMs }, async () => {
      await client.createJob(jobId, jobRequest);
      await sleep(500); // This test is flaky
      await client.cancelJob(jobId, jobRequest);
      const result = await client.deleteJob(jobId);

      assert.isDefined(result);
    });
  });
});
