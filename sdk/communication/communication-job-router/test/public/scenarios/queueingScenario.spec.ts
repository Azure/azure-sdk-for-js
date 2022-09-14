// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import { RouterAdministrationClient, RouterClient } from "../../../src";
import { Context } from "mocha";
import {
  getQueueRequest,
  getExceptionPolicyRequest,
  getDistributionPolicyRequest,
  getClassificationPolicyRequest,
  getClassificationPolicyConditional,
  getClassificationPolicyPassthrough,
  getClassificationPolicyCombined,
  getJobConditional,
  getJobPassthrough,
  getJobEnglish,
  getJobFrench,
  englishQueue,
  frenchQueue
} from "../utils/testData";
import { createRecordedRouterClientWithConnectionString } from "../../internal/utils/mockClient";
import { JOB_STATUS, timeoutMs } from "../utils/constants";
import { v4 as uuid } from "uuid";
import { Recorder } from "@azure-tools/test-recorder";
import { pollForJobQueued } from "../utils/polling";

describe("RouterClient", function() {
  let client: RouterClient;
  let administrationClient: RouterAdministrationClient;
  let recorder: Recorder;

  const testRunId = uuid();
  const { queueId, queueRequest } = getQueueRequest(testRunId);
  const { exceptionPolicyId, exceptionPolicyRequest } = getExceptionPolicyRequest(testRunId);
  const { distributionPolicyId, distributionPolicyRequest } = getDistributionPolicyRequest(
    testRunId
  );
  const { classificationPolicyId, classificationPolicyRequest } = getClassificationPolicyRequest(
    testRunId
  );

  describe("Queueing Scenario", function() {
    this.beforeAll(async function(this: Context) {
      ({ client, administrationClient } = await createRecordedRouterClientWithConnectionString(
        this
      ));

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

    this.afterAll(async function(this: Context) {
      if (!this.currentTest?.isPending() && recorder) {
        await recorder?.stop();
      }

      await administrationClient.deleteClassificationPolicy(classificationPolicyId);
      await administrationClient.deleteQueue(queueId);
      await administrationClient.deleteExceptionPolicy(exceptionPolicyId);
      await administrationClient.deleteDistributionPolicy(distributionPolicyId);
    });

    it("should complete queueing scenario with conditional selector", async () => {
      const policy = getClassificationPolicyConditional(testRunId);
      const job = getJobConditional(testRunId);

      await administrationClient.createClassificationPolicy(policy.id!, policy);
      await client.createJob(job.id!, job);
      const queuedJob = await pollForJobQueued(job.id!, client);

      assert.equal(queuedJob.jobStatus, JOB_STATUS.QUEUED);
      assert.equal(queuedJob.queueId, queueRequest.id);

      await client.cancelJob(job.id!);
      await client.deleteJob(job.id!);
      await administrationClient.deleteClassificationPolicy(policy.id!);
    }).timeout(timeoutMs);

    it("should complete queueing scenario with passthrough selector", async () => {
      const policy = getClassificationPolicyPassthrough(testRunId);
      const job = getJobPassthrough(testRunId);

      await administrationClient.createClassificationPolicy(policy.id!, policy);
      await client.createJob(job.id!, job);
      const queuedJob = await pollForJobQueued(job.id!, client);

      assert.equal(queuedJob.jobStatus, JOB_STATUS.QUEUED);
      assert.equal(queuedJob.queueId, queueRequest.id);

      await client.cancelJob(job.id!);
      await client.deleteJob(job.id!);
      await administrationClient.deleteClassificationPolicy(policy.id!);
    }).timeout(timeoutMs);

    it("should complete queueing scenario with combined selectors", async () => {
      const policy = getClassificationPolicyCombined(testRunId);
      const jobEnglish = getJobEnglish(testRunId);
      const jobFrench = getJobFrench(testRunId);

      await administrationClient.createClassificationPolicy(policy.id!, policy);
      await administrationClient.createQueue(englishQueue.id!, englishQueue);
      await administrationClient.createQueue(frenchQueue.id!, frenchQueue);
      await client.createJob(jobEnglish.id!, jobEnglish);
      await client.createJob(jobFrench.id!, jobFrench);

      const queuedJobEnglish = await pollForJobQueued(jobEnglish.id!, client);
      const queuedJobFrench = await pollForJobQueued(jobFrench.id!, client);

      assert.equal(queuedJobEnglish.jobStatus, JOB_STATUS.QUEUED);
      assert.equal(queuedJobFrench.jobStatus, JOB_STATUS.QUEUED);
      assert.equal(queuedJobEnglish.queueId, englishQueue.id!);
      assert.equal(queuedJobFrench.queueId, frenchQueue.id!);

      await client.cancelJob(jobEnglish.id!);
      await client.cancelJob(jobFrench.id!);
      await client.deleteJob(jobEnglish.id!);
      await client.deleteJob(jobFrench.id!);
      await administrationClient.deleteQueue(englishQueue.id!);
      await administrationClient.deleteQueue(frenchQueue.id!);
      await administrationClient.deleteClassificationPolicy(policy.id!);
    }).timeout(timeoutMs);
  });
});
