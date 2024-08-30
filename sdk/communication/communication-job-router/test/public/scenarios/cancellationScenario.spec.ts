// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  getClassificationPolicyRequest,
  getDistributionPolicyRequest,
  getExceptionPolicyRequest,
  getJobRequest,
  getQueueRequest,
} from "../utils/testData";
import { assert } from "chai";
import { Context } from "mocha";
import { Recorder } from "@azure-tools/test-recorder";
import { JobRouterAdministrationClient, JobRouterClient } from "../../../src";
import { createRecordedRouterClientWithConnectionString } from "../../internal/utils/mockClient";
import { pollForJobCancelled, pollForJobQueued } from "../utils/polling";
import { timeoutMs } from "../utils/constants";

describe("JobRouterClient", function () {
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

  describe("Cancellation Scenario", function () {
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
      await client.deleteJob(jobId);
      await administrationClient.deleteClassificationPolicy(classificationPolicyId);
      await administrationClient.deleteQueue(queueId);
      await administrationClient.deleteExceptionPolicy(exceptionPolicyId);
      await administrationClient.deleteDistributionPolicy(distributionPolicyId);

      if (!this.currentTest?.isPending() && recorder) {
        await recorder.stop();
      }
    });

    it("should complete cancellation scenario", async () => {
      await client.createJob(jobId, jobRequest);
      await pollForJobQueued(jobId, client);

      await client.cancelJob(jobId, { dispositionCode });
      const result = await pollForJobCancelled(jobId, client);

      assert.equal(result.status, "cancelled");
      assert.equal(result.dispositionCode, dispositionCode);
    }).timeout(timeoutMs);
  });
});
