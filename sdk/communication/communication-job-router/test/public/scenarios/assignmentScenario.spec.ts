// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  getClassificationPolicyRequest,
  getDistributionPolicyRequest,
  getExceptionPolicyRequest,
  getJobRequest,
  getQueueRequest,
  getWorkerRequest,
} from "../utils/testData";
import { assert } from "chai";
import { JobAssignment, JobOffer, RouterAdministrationClient, RouterClient } from "../../../src";
import { Context } from "mocha";
import { createRecordedRouterClientWithConnectionString } from "../../internal/utils/mockClient";
import { timeoutMs } from "../utils/constants";
import { Recorder } from "@azure-tools/test-recorder";
import { pollForJobAssignment, pollForJobOffer } from "../utils/polling";

describe("RouterClient", function () {
  let client: RouterClient;
  let administrationClient: RouterAdministrationClient;
  let recorder: Recorder;

  const testRunId = "recorded-assignment-scenario";

  const { queueId, queueRequest } = getQueueRequest(testRunId);
  const { exceptionPolicyId, exceptionPolicyRequest } = getExceptionPolicyRequest(testRunId);
  const { distributionPolicyId, distributionPolicyRequest } =
    getDistributionPolicyRequest(testRunId);
  const { classificationPolicyId, classificationPolicyRequest } =
    getClassificationPolicyRequest(testRunId);
  const { jobId, jobRequest } = getJobRequest(testRunId);
  const { workerId, workerRequest } = getWorkerRequest(testRunId);

  describe("Assignment Scenario", function () {
    this.beforeEach(async function (this: Context) {
      ({ client, administrationClient, recorder } =
        await createRecordedRouterClientWithConnectionString(this));

      await administrationClient.createExceptionPolicy(exceptionPolicyId, exceptionPolicyRequest);
      await administrationClient.createDistributionPolicy(
        distributionPolicyId,
        distributionPolicyRequest
      );
      await administrationClient.createQueue(queueId, queueRequest);
      await administrationClient.createClassificationPolicy(
        classificationPolicyId,
        classificationPolicyRequest
      );
      await client.createWorker(workerId, { ...workerRequest, availableForOffers: true });
    });

    this.afterEach(async function (this: Context) {
      await client.deleteWorker(workerId);
      await client.deleteJob(jobId);
      await administrationClient.deleteClassificationPolicy(classificationPolicyId);
      await administrationClient.deleteQueue(queueId);
      await administrationClient.deleteDistributionPolicy(distributionPolicyId);
      await administrationClient.deleteExceptionPolicy(exceptionPolicyId);

      if (!this.currentTest?.isPending() && recorder) {
        await recorder.stop();
      }
    });

    it("should complete assignment scenario", async () => {
      await client.createJob(jobId, jobRequest);

      const offer: JobOffer = await pollForJobOffer(workerId, client);
      assert.isTrue(offer.jobId === jobId);
      assert.equal(offer.capacityCost, 1);
      assert.isNotNull(offer.offerTimeUtc);
      assert.isNotNull(offer.expiryTimeUtc);

      const acceptOfferResponse = await client.acceptJobOffer(workerId, offer.id!);
      assert.equal(acceptOfferResponse.jobId, jobId);
      assert.equal(acceptOfferResponse.workerId, workerId);

      const assignment: JobAssignment = await pollForJobAssignment(jobId, client);
      assert.isNotNull(assignment.assignTime);
      assert.isNotNull(assignment.completeTime);
      assert.isNotNull(assignment.closeTime);
      assert.equal(assignment.workerId, workerId);

      const completeJobResponse = await client.completeJob(jobId, acceptOfferResponse.assignmentId);
      assert.isNotNull(completeJobResponse);

      const closeJobResponse = await client.closeJob(jobId, acceptOfferResponse.assignmentId);
      assert.isNotNull(closeJobResponse);
    }).timeout(timeoutMs);
  });
});
