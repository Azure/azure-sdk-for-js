// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import { RouterAdministrationClient, RouterClient } from "../../../src";
import { Context } from "mocha";
import {
  getClassificationPolicyCombined,
  getClassificationPolicyConditional,
  getClassificationPolicyFallback,
  getClassificationPolicyPassthrough,
  getDistributionPolicyRequest,
  getExceptionPolicyRequest,
  getJobConditional,
  getJobEnglish,
  getJobFallback,
  getJobFrench,
  getJobPassthrough,
  getQueueEnglish,
  getQueueFrench,
  getQueueRequest,
} from "../utils/testData";
import { createRecordedRouterClientWithConnectionString } from "../../internal/utils/mockClient";
import { timeoutMs } from "../utils/constants";
import { Recorder } from "@azure-tools/test-recorder";
import { pollForJobQueued, retry } from "../utils/polling";

describe("RouterClient", function () {
  let client: RouterClient;
  let administrationClient: RouterAdministrationClient;
  let recorder: Recorder;

  const testRunId = "recorded-q-scenario";

  const { queueId, queueRequest } = getQueueRequest(testRunId);
  const { exceptionPolicyId, exceptionPolicyRequest } = getExceptionPolicyRequest(testRunId);
  const { distributionPolicyId, distributionPolicyRequest } =
    getDistributionPolicyRequest(testRunId);

  // For when successful run with stale resources from previously failed run
  function queueIdFixup(id: string | undefined): string | undefined {
    if (id === "test-queue-english" || id === "test-queue-french") {
      return `${id}-${testRunId}`;
    }

    return id;
  }

  describe("Queueing Scenario", function () {
    this.beforeEach(async function (this: Context) {
      ({ client, administrationClient, recorder } =
        await createRecordedRouterClientWithConnectionString(this));

      await administrationClient.createDistributionPolicy(
        distributionPolicyId,
        distributionPolicyRequest
      );
      await administrationClient.createExceptionPolicy(exceptionPolicyId, exceptionPolicyRequest);
      await administrationClient.createQueue(queueId, queueRequest);
    });

    this.afterEach(async function (this: Context) {
      await retry(
        async () => {
          await administrationClient.deleteQueue(queueId);
          await administrationClient.deleteExceptionPolicy(exceptionPolicyId);
          await administrationClient.deleteDistributionPolicy(distributionPolicyId);
        },
        { retries: 1, retryIntervalMs: 500 }
      );

      if (!this.currentTest?.isPending() && recorder) {
        await recorder.stop();
      }
    });

    it("should complete queueing scenario with fallback queue", async () => {
      const policy = getClassificationPolicyFallback(testRunId);
      const job = getJobFallback(testRunId);

      await administrationClient.createClassificationPolicy(policy.id!, policy);
      await client.createJob(job.id!, job);
      const queuedJob = await pollForJobQueued(job.id!, client);

      assert.equal(queuedJob.jobStatus, "queued");
      assert.equal(queuedJob.queueId, queueRequest.id);

      await client.cancelJob(job.id!);
      await client.deleteJob(job.id!);
      await administrationClient.deleteClassificationPolicy(policy.id!);
    }).timeout(timeoutMs);

    it("should complete queueing scenario with conditional selector", async () => {
      const policy = getClassificationPolicyConditional(testRunId);
      const job = getJobConditional(testRunId);

      await administrationClient.createClassificationPolicy(policy.id!, policy);
      await client.createJob(job.id!, job);
      const queuedJob = await pollForJobQueued(job.id!, client);

      assert.equal(queuedJob.jobStatus, "queued");
      assert.equal(queuedJob.queueId, queueId);

      await client.cancelJob(job.id!);
      await client.deleteJob(job.id!);
      await administrationClient.deleteClassificationPolicy(policy.id!);
    }).timeout(timeoutMs);

    it("should complete queueing scenario with passthrough selectors", async () => {
      const policy = getClassificationPolicyPassthrough(testRunId);
      const job = getJobPassthrough(testRunId);

      await administrationClient.createClassificationPolicy(policy.id!, policy);
      await client.createJob(job.id!, job);
      const queuedJob = await pollForJobQueued(job.id!, client);

      assert.equal(queuedJob.jobStatus, "queued");
      assert.equal(queuedJob.queueId, queueId);

      await client.cancelJob(job.id!);
      await client.deleteJob(job.id!);
      await administrationClient.deleteClassificationPolicy(policy.id!);
    }).timeout(timeoutMs);

    it("should complete queueing scenario with combined selectors", async () => {
      const policy = getClassificationPolicyCombined(testRunId);
      const jobEnglish = getJobEnglish(testRunId);
      const jobFrench = getJobFrench(testRunId);
      const queueEnglish = getQueueEnglish(testRunId);
      const queueFrench = getQueueFrench(testRunId);

      await administrationClient.createClassificationPolicy(policy.id!, policy);
      await administrationClient.createQueue(queueEnglish.id!, queueEnglish);
      await administrationClient.createQueue(queueFrench.id!, queueFrench);
      await client.createJob(jobEnglish.id!, jobEnglish);
      await client.createJob(jobFrench.id!, jobFrench);
      const queuedJobEnglish = await pollForJobQueued(jobEnglish.id!, client);
      const queuedJobFrench = await pollForJobQueued(jobFrench.id!, client);

      assert.equal(queuedJobEnglish.jobStatus, "queued");
      assert.equal(queuedJobFrench.jobStatus, "queued");
      assert.equal(queueIdFixup(queuedJobEnglish.queueId), queueEnglish.id!);
      assert.equal(queueIdFixup(queuedJobFrench.queueId), queueFrench.id!);

      await client.cancelJob(jobEnglish.id!);
      await client.cancelJob(jobFrench.id!);
      await client.deleteJob(jobEnglish.id!);
      await client.deleteJob(jobFrench.id!);
      await administrationClient.deleteClassificationPolicy(policy.id!);
      await administrationClient.deleteQueue(queueEnglish.id!);
      await administrationClient.deleteQueue(queueFrench.id!);
    }).timeout(timeoutMs);
  });
});
