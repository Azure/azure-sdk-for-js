// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import { RouterClient, RouterJob, } from "../../../src";
import { Context } from "mocha";
import {
  classificationPolicyRequest,
  distributionPolicyRequest,
  exceptionPolicyRequest,
  jobRequest,
  queueRequest,
  classificationPolicyConditional,
  conditionalScenarioJob,
  classificationPolicyPassthrough,
  passthroughScenarioJob,
  classificationPolicyCombined,
  frenchJob,
  englishJob,
  englishQueue,
  frenchQueue
} from "../../internal/utils/testData";
import { createRecordedRouterClientWithConnectionString } from "../../internal/utils/mockClient";
import { timeoutMs } from "../../internal/utils/constants";

describe("RouterClient", function() {
  const sleepMs: number = 1500;
  let client: RouterClient;

  // HACK: Intentionally block to avoid 'duplicate sequence number' error from service
  function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  describe("Queue Scenario", function() {
    this.beforeAll(async function(this: Context) {
      ({ client } = createRecordedRouterClientWithConnectionString(this));

      await client.createDistributionPolicy(
        distributionPolicyRequest.id!,
        distributionPolicyRequest
      );
      await client.createExceptionPolicy(exceptionPolicyRequest.id!, exceptionPolicyRequest);
      await client.createQueue(queueRequest.id!, queueRequest);
      await client.createClassificationPolicy(
        classificationPolicyRequest.id!,
        classificationPolicyRequest
      );
      await client.createJob(jobRequest.id!, jobRequest);
    });

    this.afterAll(async function(this: Context) {
      await sleep(sleepMs);
      await client.deleteJob(jobRequest.id!);
      await client.deleteClassificationPolicy(classificationPolicyRequest.id!);
      await client.deleteQueue(queueRequest.id!);
      await client.deleteExceptionPolicy(exceptionPolicyRequest.id!);
      await client.deleteDistributionPolicy(distributionPolicyRequest.id!);
    });

    it("should complete with conditional selector", async () => {
      await client.createClassificationPolicy(classificationPolicyConditional.id!, classificationPolicyConditional);
      await client.createJob(conditionalScenarioJob.id!, conditionalScenarioJob);

      let job: RouterJob = conditionalScenarioJob;
      while (job.jobStatus !== "queued") {
        job = await client.getJob(conditionalScenarioJob.id!);
      }

      assert.equal(job.jobStatus, "queued");
      assert.equal(job.queueId, queueRequest.id);
    }).timeout(timeoutMs);

    it("should complete with passthrough selector", async () => {
      await client.createClassificationPolicy(classificationPolicyPassthrough.id!, classificationPolicyPassthrough);
      await client.createJob(passthroughScenarioJob.id!, passthroughScenarioJob);

      let job: RouterJob = passthroughScenarioJob;
      while (job.jobStatus !== "queued") {
        job = await client.getJob(passthroughScenarioJob.id!);
      }

      assert.equal(job.jobStatus, "queued");
      assert.equal(job.queueId, queueRequest.id);
    }).timeout(timeoutMs);

    it("should complete with combined selectors", async () => {
      await client.createClassificationPolicy(classificationPolicyCombined.id!, classificationPolicyCombined);
      await client.createQueue(englishQueue.id!, englishQueue);
      await client.createQueue(frenchQueue.id!, frenchQueue);

      let job1: RouterJob = englishJob;
      await client.createJob(englishJob.id!, englishJob);
      while (job1.jobStatus !== "queued") {
        job1 = await client.getJob(englishJob.id!);
      }

      let job2: RouterJob = frenchJob;
      await client.createJob(frenchJob.id!, frenchJob);
      while (job2.jobStatus !== "queued") {
        job2 = await client.getJob(frenchJob.id!);
      }

      assert.equal(job1.jobStatus, "queued");
      assert.equal(job2.jobStatus, "queued");
      assert.equal(job1.queueId, englishQueue.id!);
      assert.equal(job2.queueId, frenchQueue.id!);
    }).timeout(timeoutMs);
  });
});
