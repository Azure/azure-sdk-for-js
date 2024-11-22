// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import type { JobRouterAdministrationClient, JobRouterClient } from "../../../src/index.js";
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
} from "../utils/testData.js";
import { createRecordedRouterClientWithConnectionString } from "../../internal/utils/mockClient.js";
import { timeoutMs } from "../utils/constants.js";
import type { Recorder } from "@azure-tools/test-recorder";
import { pollForJobQueued, retry } from "../utils/polling.js";
import { describe, it, assert, beforeEach, afterEach } from "vitest";

describe("JobRouterClient", () => {
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

  describe("Queueing Scenario", () => {
    beforeEach(async (ctx) => {
      ({ client, administrationClient, recorder } =
        await createRecordedRouterClientWithConnectionString(ctx));

      await administrationClient.createDistributionPolicy(
        distributionPolicyId,
        distributionPolicyRequest,
      );
      await administrationClient.createExceptionPolicy(exceptionPolicyId, exceptionPolicyRequest);
      await administrationClient.createQueue(queueId, queueRequest);
    });

    afterEach(async (ctx) => {
      await retry(
        async () => {
          await administrationClient.deleteQueue(queueId);
          await administrationClient.deleteExceptionPolicy(exceptionPolicyId);
          await administrationClient.deleteDistributionPolicy(distributionPolicyId);
        },
        { retries: 1, retryIntervalMs: 500 },
      );

      if (!ctx.task.pending && recorder) {
        await recorder.stop();
      }
    });

    it(
      "should complete queueing scenario with fallback queue",
      { timeout: timeoutMs },
      async () => {
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
      },
    );

    it(
      "should complete queueing scenario with conditional selector",
      { timeout: timeoutMs },
      async () => {
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
      },
    );

    it(
      "should complete queueing scenario with passthrough selectors",
      { timeout: timeoutMs },
      async () => {
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
      },
    );

    it(
      "should complete queueing scenario with combined selectors",
      { timeout: timeoutMs },
      async () => {
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
      },
    );
  });
});
