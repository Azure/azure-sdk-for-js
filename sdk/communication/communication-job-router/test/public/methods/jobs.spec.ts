// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Recorder } from "@azure-tools/test-recorder";
import { assert } from "chai";
import { RouterAdministrationClient, RouterClient, RouterJob } from "../../../src";
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

describe("RouterClient", function () {
  let client: RouterClient;
  let administrationClient: RouterAdministrationClient;
  let recorder: Recorder;

  const testRunId = "recorded-jobs";

  const { distributionPolicyId, distributionPolicyRequest } =
    getDistributionPolicyRequest(testRunId);
  const { exceptionPolicyId, exceptionPolicyRequest } = getExceptionPolicyRequest(testRunId);
  const { queueId, queueRequest } = getQueueRequest(testRunId);
  const { classificationPolicyId, classificationPolicyRequest } =
    getClassificationPolicyRequest(testRunId);
  const { jobId, jobRequest } = getJobRequest(testRunId);

  describe("Job Operations", function () {
    this.beforeEach(async function (this: Context) {
      ({ client, administrationClient, recorder } =
        await createRecordedRouterClientWithConnectionString(this));

      await administrationClient.createDistributionPolicy(
        distributionPolicyId,
        distributionPolicyRequest
      );
      await administrationClient.createExceptionPolicy(exceptionPolicyId, exceptionPolicyRequest);
      await administrationClient.createQueue(queueId, queueRequest);
      await administrationClient.createClassificationPolicy(
        classificationPolicyId,
        classificationPolicyRequest
      );
    });

    this.afterEach(async function (this: Context) {
      await retry(
        async () => {
          if (this.currentTest?.fullTitle() !== "RouterClient Job Operations should delete a job") {
            const job = await client.getJob(jobId);
            if (job.jobStatus !== "cancelled") {
              await client.cancelJob(jobId);
            }

            await client.deleteJob(jobId);
          }
          await administrationClient.deleteClassificationPolicy(classificationPolicyId);
          await administrationClient.deleteQueue(queueId);
          await administrationClient.deleteExceptionPolicy(exceptionPolicyId);
          await administrationClient.deleteDistributionPolicy(distributionPolicyId);
        },
        { retries: 5, retryIntervalMs: 1500 }
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
      const scheduledJob: RouterJob = {
        ...jobRequest,
        scheduledTimeUtc: new Date(scheduledTime),
        unavailableForMatching: true,
      };
      const result = await client.createJob(jobId, scheduledJob);

      assert.isDefined(result);
      assert.isDefined(result.id);
      assert.equal(result.id, jobId);
      assert.isDefined(result.scheduledTimeUtc);
      assert.equal(result.scheduledTimeUtc?.toISOString(), scheduledTime);
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
      const patch: RouterJob = { ...jobRequest, priority: 5 };
      const result = await client.updateJob(jobId, patch);

      assert.isDefined(result);
      assert.isDefined(result.id);
      assert.equal(result.id, jobId);
      assert.equal(result.priority, patch.priority);
    }).timeout(timeoutMs);

    it("should get queue position for a job", async function () {
      await client.createJob(jobId, jobRequest);
      await pollForJobQueued(jobId, client);
      const result = await client.getQueuePosition(jobId);

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
        { retries: 3, retryIntervalMs: 1500 }
      );

      assert.isDefined(result);
    }).timeout(timeoutMs);

    it("should list jobs", async function () {
      await client.createJob(jobId, jobRequest);

      const result: RouterJob[] = [];
      for await (const job of client.listJobs({ maxPageSize: 20 })) {
        result.push(job.routerJob!);
      }

      assert.isNotEmpty(result);
    }).timeout(timeoutMs);

    it("should list scheduled jobs", async function () {
      const currentTime: Date = new Date();
      currentTime.setSeconds(currentTime.getSeconds() + 30);
      const scheduledTime: string = recorder.variable("scheduledTime", currentTime.toISOString());
      const scheduledJob: RouterJob = {
        ...jobRequest,
        scheduledTimeUtc: new Date(scheduledTime),
        unavailableForMatching: true,
      };
      await client.createJob(jobId, scheduledJob);

      const result: RouterJob[] = [];
      for await (const job of client.listJobs({
        maxPageSize: 20,
        scheduledBefore: new Date(scheduledTime),
      })) {
        result.push(job.routerJob!);
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
        { retries: 3, retryIntervalMs: 1500 }
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
