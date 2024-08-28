// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Recorder } from "@azure-tools/test-recorder";
import { assert } from "chai";
import {
  CreateJobOptions,
  JobRouterAdministrationClient,
  JobRouterClient,
  RouterJob,
  UpdateJobOptions,
} from "../../../src";
import { Context } from "mocha";
import {
  getClassificationPolicyRequest,
  getDistributionPolicyRequest,
  getExceptionPolicyRequest,
  getJobRequest,
  getQueueRequest,
} from "../utils/testData";
import { createRecordedRouterClientWithConnectionString } from "../../internal/utils/mockClient";
import { sleep, timeoutMs } from "../utils/constants";
import { pollForJobQueued, retry } from "../utils/polling";

describe("JobRouterClient", function () {
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

  describe("Job Operations", function () {
    this.beforeEach(async function (this: Context) {
      ({ client, administrationClient, recorder } =
        await createRecordedRouterClientWithConnectionString(this));

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

    this.afterEach(async function (this: Context) {
      await retry(
        async () => {
          if (
            this.currentTest?.fullTitle() !== "JobRouterClient Job Operations should delete a job"
          ) {
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

      if (!this.currentTest?.isPending() && recorder) {
        await recorder.stop();
      }
    });

    it("should create a job", async function () {
      const result = await client.createJob(jobId, jobRequest);

      assert.isDefined(result);
      assert.isDefined(result.id);
      assert.equal(result.id, jobId);
    }).timeout(timeoutMs);

    it("should create a scheduled job", async function () {
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
    }).timeout(timeoutMs);

    it("should get a job", async function () {
      await client.createJob(jobId, jobRequest);
      const result = await client.getJob(jobId);

      assert.isDefined(result);
      assert.isDefined(result.id);
      assert.equal(result.id, jobId);
    }).timeout(timeoutMs);

    it("should update a job", async function () {
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
    }).timeout(timeoutMs);

    it("should get queue position for a job", async function () {
      await client.createJob(jobId, jobRequest);
      await pollForJobQueued(jobId, client);
      const result = await client.getJobQueuePosition(jobId);

      assert.isDefined(result);
      assert.isDefined(result.position);
      assert.equal(jobId, result.jobId);
    }).timeout(timeoutMs);

    it("should reclassify a job", async function () {
      await client.createJob(jobId, jobRequest);
      let result;
      await retry(
        async () => {
          result = await client.reclassifyJob(jobId);
        },
        { retries: 3, retryIntervalMs: 1500 },
      );

      assert.isDefined(result);
    }).timeout(timeoutMs);

    it("should list jobs", async function () {
      await client.createJob(jobId, jobRequest);

      const result: RouterJob[] = [];
      for await (const job of client.listJobs({ maxPageSize: 20 })) {
        result.push(job.job!);
      }

      assert.isNotEmpty(result);
    }).timeout(timeoutMs);

    it("should list scheduled jobs", async function () {
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
    }).timeout(timeoutMs);

    it("should cancel a job", async function () {
      await client.createJob(jobId, jobRequest);
      let result;
      await retry(
        async () => {
          result = await client.cancelJob(jobId);
        },
        { retries: 3, retryIntervalMs: 1500 },
      );

      assert.isDefined(result);
    }).timeout(timeoutMs);

    it("should delete a job", async function () {
      await client.createJob(jobId, jobRequest);
      await sleep(500); // This test is flaky
      await client.cancelJob(jobId, jobRequest);
      const result = await client.deleteJob(jobId);

      assert.isDefined(result);
    }).timeout(timeoutMs);
  });
});
