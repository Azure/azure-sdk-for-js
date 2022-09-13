// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import { JobOffer, RouterAdministrationClient, RouterClient, RouterWorker } from "../../../src";
import { Context } from "mocha";
import {
  getClassificationPolicyRequest,
  getDistributionPolicyRequest,
  getJobRequest,
  getQueueRequest,
  getWorkerRequest,
  getExceptionPolicyRequest
} from "../utils/testData";
import { createRecordedRouterClientWithConnectionString } from "../../internal/utils/mockClient";
import { timeoutMs } from "../utils/constants";
import { Recorder } from "@azure-tools/test-recorder";
import { v4 as uuid } from "uuid";

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
  const { jobId, jobRequest } = getJobRequest(testRunId);
  const { workerId, workerRequest } = getWorkerRequest(testRunId);

  describe("Assignment Scenario", function() {
    this.beforeAll(async function(this: Context) {
      ({
        client,
        administrationClient,
        recorder
      } = await createRecordedRouterClientWithConnectionString(this));

      await administrationClient.createDistributionPolicy(
        distributionPolicyId,
        distributionPolicyRequest
      );
      await administrationClient.createExceptionPolicy(exceptionPolicyId, exceptionPolicyRequest);
      await administrationClient.createQueue(queueId, queueRequest);
      // await sleep(0);
      // await sleep(0);
      // await sleep(0);
      await administrationClient.createClassificationPolicy(
        classificationPolicyId,
        classificationPolicyRequest
      );
      // await sleep(0);

      // await sleep(0);
      await client.createWorker(workerId, { ...workerRequest, availableForOffers: true });
    });

    this.afterAll(async function(this: Context) {
      if (!this.currentTest?.isPending() && recorder) {
        await recorder?.stop();
      }

      await client.deleteWorker(workerId);
      await client.deleteJob(jobId);
      await administrationClient.deleteClassificationPolicy(classificationPolicyId);
      await administrationClient.deleteDistributionPolicy(distributionPolicyId);
      await administrationClient.deleteExceptionPolicy(exceptionPolicyId);
      await administrationClient.deleteQueue(queueId);
    });

    it("should complete assignment scenario", async () => {
      let worker: RouterWorker = {};

      await client.createJob(jobId, jobRequest);
      while (worker.offers?.length == undefined || worker.offers.length < 1) {
        console.log(worker);
        worker = await client.getWorker(workerId);
      }

      const offer: JobOffer | undefined = worker.offers?.[0];
      console.log(offer);
      assert.isTrue(offer?.jobId == jobId);
      assert.equal(offer?.capacityCost, 1);
      assert.isNotNull(offer?.offerTimeUtc);
      assert.isNotNull(offer?.expiryTimeUtc);

      const acceptOfferResponse = await client.acceptJobOffer(workerId, offer?.id!);
      assert.equal(acceptOfferResponse.jobId, jobId);
      assert.equal(acceptOfferResponse.workerId, workerId);
      // assert.throws(async () => await client.declineJobOffer(workerId, offer?.id!));

      const completeJobResponse = await client.completeJob(jobId, acceptOfferResponse.assignmentId);
      assert.isNotNull(completeJobResponse);

      const closeJobResponse = await client.closeJob(jobId, acceptOfferResponse.assignmentId);
      assert.isNotNull(closeJobResponse);

      const { assignments } = await client.getJob(jobId);
      const assignment = assignments?.[0];
      assert.isNotNull(assignment?.assignedOn);
      assert.isNotNull(assignment?.completedOn);
      assert.isNotNull(assignment?.closedOn);
      assert.equal(assignment?.workerId, workerId);
    }).timeout(timeoutMs);
  });
});
