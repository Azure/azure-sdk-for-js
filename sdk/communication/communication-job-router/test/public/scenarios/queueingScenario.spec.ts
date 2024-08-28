// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { assert } from "chai";
import { JobRouterAdministrationClient, JobRouterClient } from "../../../src";
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

describe("JobRouterClient", function () {
  let client: JobRouterClient;
  let administrationClient: JobRouterAdministrationClient;
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
        distributionPolicyRequest,
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
        { retries: 1, retryIntervalMs: 500 },
      );

      if (!this.currentTest?.isPending() && recorder) {
        await recorder.stop();
      }
    });

    it("should complete queueing scenario with fallback queue", async () => {
      const policy = getClassificationPolicyFallback(testRunId);
      const { id, options } = getJobFallback(testRunId);

      await administrationClient.createClassificationPolicy(policy.id!, policy);
      await client.createJob(id, options);
      const queuedJob = await pollForJobQueued(id, client);

      assert.equal(queuedJob.status, "queued");
      assert.equal(queuedJob.queueId, queueRequest.id);

      await client.cancelJob(id);
      await client.deleteJob(id);
      await administrationClient.deleteClassificationPolicy(policy.id!);
    }).timeout(timeoutMs);

    it("should complete queueing scenario with conditional selector", async () => {
      const policy = getClassificationPolicyConditional(testRunId);
      const { id, options } = getJobConditional(testRunId);

      await administrationClient.createClassificationPolicy(policy.id!, policy);
      await client.createJob(id, options);
      const queuedJob = await pollForJobQueued(id, client);

      assert.equal(queuedJob.status, "queued");
      assert.equal(queuedJob.queueId, queueId);

      await client.cancelJob(id);
      await client.deleteJob(id);
      await administrationClient.deleteClassificationPolicy(policy.id!);
    }).timeout(timeoutMs);

    it("should complete queueing scenario with passthrough selectors", async () => {
      const policy = getClassificationPolicyPassthrough(testRunId);
      const { id, options } = getJobPassthrough(testRunId);

      await administrationClient.createClassificationPolicy(policy.id!, policy);
      await client.createJob(id, options);
      const queuedJob = await pollForJobQueued(id, client);

      assert.equal(queuedJob.status, "queued");
      assert.equal(queuedJob.queueId, queueId);

      await client.cancelJob(id);
      await client.deleteJob(id);
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
      await client.createJob(jobEnglish.id!, jobEnglish.options);
      await client.createJob(jobFrench.id!, jobFrench.options);
      const queuedJobEnglish = await pollForJobQueued(jobEnglish.id!, client);
      const queuedJobFrench = await pollForJobQueued(jobFrench.id!, client);

      assert.equal(queuedJobEnglish.status, "queued");
      assert.equal(queuedJobFrench.status, "queued");
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
