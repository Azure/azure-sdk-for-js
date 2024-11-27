// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  getClassificationPolicyRequest,
  getDistributionPolicyRequest,
  getExceptionPolicyRequest,
  getJobRequest,
  getQueueRequest,
} from "../utils/testData.js";
import type { Recorder } from "@azure-tools/test-recorder";
import type { JobRouterAdministrationClient, JobRouterClient } from "../../../src/index.js";
import { createRecordedRouterClientWithConnectionString } from "../../internal/utils/mockClient.js";
import { pollForJobCancelled, pollForJobQueued } from "../utils/polling.js";
import { timeoutMs } from "../utils/constants.js";
import { describe, it, assert, beforeEach, afterEach } from "vitest";

describe("JobRouterClient", () => {
  let client: JobRouterClient;
  let administrationClient: JobRouterAdministrationClient;
  let recorder: Recorder;

  const testRunId = "recorded-cancellation-scenario";

  const { queueId, queueRequest } = getQueueRequest(testRunId);
  const { exceptionPolicyId, exceptionPolicyRequest } = getExceptionPolicyRequest(testRunId);
  const { distributionPolicyId, distributionPolicyRequest } =
    getDistributionPolicyRequest(testRunId);
  const { classificationPolicyId, classificationPolicyRequest } =
    getClassificationPolicyRequest(testRunId);
  const { jobId, jobRequest } = getJobRequest(testRunId);
  const dispositionCode = `disposition-${testRunId}`;

  describe("Cancellation Scenario", () => {
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
      await client.deleteJob(jobId);
      await administrationClient.deleteClassificationPolicy(classificationPolicyId);
      await administrationClient.deleteQueue(queueId);
      await administrationClient.deleteExceptionPolicy(exceptionPolicyId);
      await administrationClient.deleteDistributionPolicy(distributionPolicyId);

      if (!ctx.task.pending && recorder) {
        await recorder.stop();
      }
    });

    it("should complete cancellation scenario", { timeout: timeoutMs }, async () => {
      await client.createJob(jobId, jobRequest);
      await pollForJobQueued(jobId, client);

      await client.cancelJob(jobId, { dispositionCode });
      const result = await pollForJobCancelled(jobId, client);

      assert.equal(result.status, "cancelled");
      assert.equal(result.dispositionCode, dispositionCode);
    });
  });
});
