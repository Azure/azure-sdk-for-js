// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  getClassificationPolicyRequest,
  getDistributionPolicyRequest,
  getExceptionPolicyRequest,
  getJobRequest,
  getQueueRequest,
  getWorkerRequest,
} from "../utils/testData.js";
import type {
  RouterJobAssignment,
  RouterJobOffer,
  JobRouterAdministrationClient,
  JobRouterClient,
} from "../../../src/index.js";
import { createRecordedRouterClientWithConnectionString } from "../../internal/utils/mockClient.js";
import { timeoutMs } from "../utils/constants.js";
import type { Recorder } from "@azure-tools/test-recorder";
import { pollForJobAssignment, pollForJobOffer } from "../utils/polling.js";
import { describe, it, assert, beforeEach, afterEach } from "vitest";

describe("JobRouterClient", () => {
  let client: JobRouterClient;
  let administrationClient: JobRouterAdministrationClient;
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

  describe("Assignment Scenario", () => {
    beforeEach(async (ctx) => {
      ({ client, administrationClient, recorder } =
        await createRecordedRouterClientWithConnectionString(ctx));

      await administrationClient.createExceptionPolicy(exceptionPolicyId, exceptionPolicyRequest);
      await administrationClient.createDistributionPolicy(
        distributionPolicyId,
        distributionPolicyRequest,
      );
      await administrationClient.createQueue(queueId, queueRequest);
      await administrationClient.createClassificationPolicy(
        classificationPolicyId,
        classificationPolicyRequest,
      );
      await client.createWorker(workerId, { ...workerRequest, availableForOffers: true });
    });

    afterEach(async (ctx) => {
      await client.deleteWorker(workerId);
      await client.deleteJob(jobId);
      await administrationClient.deleteClassificationPolicy(classificationPolicyId);
      await administrationClient.deleteQueue(queueId);
      await administrationClient.deleteDistributionPolicy(distributionPolicyId);
      await administrationClient.deleteExceptionPolicy(exceptionPolicyId);

      if (!ctx.task.pending && recorder) {
        await recorder.stop();
      }
    });

    it("should complete assignment scenario", { timeout: timeoutMs }, async () => {
      await client.createJob(jobId, jobRequest);

      const offer: RouterJobOffer = await pollForJobOffer(workerId, client);
      assert.isTrue(offer.jobId === jobId);
      assert.equal(offer.capacityCost, 1);
      assert.isNotNull(offer.offeredAt);
      assert.isNotNull(offer.expiresAt);

      const acceptOfferResponse = await client.acceptJobOffer(workerId, offer.offerId!);
      assert.equal(acceptOfferResponse.jobId, jobId);
      assert.equal(acceptOfferResponse.workerId, workerId);

      const assignment: RouterJobAssignment = await pollForJobAssignment(jobId, client);
      assert.isNotNull(assignment.assignedAt);
      assert.isNotNull(assignment.completedAt);
      assert.isNotNull(assignment.closedAt);
      assert.equal(assignment.workerId, workerId);

      const completeJobResponse = await client.completeJob(jobId, acceptOfferResponse.assignmentId);
      assert.isNotNull(completeJobResponse);

      const closeJobResponse = await client.closeJob(jobId, acceptOfferResponse.assignmentId);
      assert.isNotNull(closeJobResponse);
    });
  });
});
