// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import { JobOffer, RouterAdministrationClient, RouterClient, RouterWorker } from "../../../src";
import { Context } from "mocha";
import {
  classificationPolicyRequest,
  distributionPolicyRequest,
  exceptionPolicyRequest,
  jobRequest,
  queueRequest,
  workerRequest
} from "../utils/testData";
import { createRecordedRouterClientWithConnectionString } from "../../internal/utils/mockClient";
import { timeoutMs } from "../utils/constants";

describe("RouterClient", function() {
  const sleepMs: number = 1500;
  let administrationClient: RouterAdministrationClient;
  let client: RouterClient;

  // HACK: Intentionally block to avoid 'duplicate sequence number' error from service
  function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  describe("Assignment Scenario", function() {
    this.beforeAll(async function(this: Context) {
      ({ administrationClient, client } = await createRecordedRouterClientWithConnectionString(this));

      await administrationClient.createDistributionPolicy(
        distributionPolicyRequest.id!,
        distributionPolicyRequest
      );
      await administrationClient.createExceptionPolicy(exceptionPolicyRequest.id!, exceptionPolicyRequest);
      await administrationClient.createQueue(queueRequest.id!, queueRequest);
      await administrationClient.createClassificationPolicy(
        classificationPolicyRequest.id!,
        classificationPolicyRequest
      );
      await client.createWorker(workerRequest.id!, workerRequest);
      await client.createJob(jobRequest.id!, jobRequest);
    });

    this.afterAll(async function(this: Context) {
      await sleep(sleepMs);
      await client.deleteJob(jobRequest.id!);
      await client.deleteWorker(workerRequest.id!);
      await administrationClient.deleteClassificationPolicy(classificationPolicyRequest.id!);
      await administrationClient.deleteQueue(queueRequest.id!);
      await administrationClient.deleteExceptionPolicy(exceptionPolicyRequest.id!);
      await administrationClient.deleteDistributionPolicy(distributionPolicyRequest.id!);
    });

    it("should complete assignment scenario", async () => {
      let worker: RouterWorker = workerRequest;
      while (!worker.offers) {
        worker = await client.getWorker(workerRequest.id!);
      }

      const offer: JobOffer = worker.offers[0];
      console.log(offer);
      assert.isTrue(offer.jobId == jobRequest.id);
      assert.equal(offer.capacityCost, 1);
      assert.isNotNull(offer.offerTimeUtc);
      assert.isNotNull(offer.expiryTimeUtc);

      const acceptOfferResponse = await client.acceptJobOffer(worker.id!, offer.id);
      assert.equal(acceptOfferResponse.jobId, jobRequest.id);
      assert.equal(acceptOfferResponse.workerId, workerRequest.id);
      assert.throws(async () => await client.declineJobOffer(worker.id!, offer.id));

      const completeJobResponse = await client.completeJob(
        jobRequest.id!,
        acceptOfferResponse.assignmentId
      );
      assert.isNotNull(completeJobResponse);

      const closeJobResponse = await client.closeJob(
        jobRequest.id!,
        acceptOfferResponse.assignmentId
      );
      assert.isNotNull(closeJobResponse);

      const { assignments } = await client.getJob(jobRequest.id!);
      const assignment = assignments?.[0];
      assert.isNotNull(assignment?.assignedOn);
      assert.isNotNull(assignment?.completedOn);
      assert.isNotNull(assignment?.closedOn);
      assert.equal(assignment?.workerId, workerRequest.id);
    }).timeout(timeoutMs);
  });
});
