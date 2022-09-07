// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Recorder } from "@azure-tools/test-recorder";
import { assert } from "chai";
import { RouterJob, RouterClient, RouterAdministrationClient, CreateJobOptions } from "../../../src";
import { Context } from "mocha";
import {
  classificationPolicyRequest,
  distributionPolicyRequest,
  exceptionPolicyRequest,
  jobRequest,
  queueRequest
} from "../utils/testData";
import { createRecordedRouterClientWithConnectionString } from "../../internal/utils/mockClient";
import { timeoutMs } from "../utils/constants";

describe("RouterClient", function() {
  const sleepMs: number = 1500;
  let recorder: Recorder;
  let administrationClient: RouterAdministrationClient;
  let client: RouterClient;
  let request: RouterJob = jobRequest;

  // HACK: Intentionally block to avoid 'duplicate sequence number' error from service
  function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  describe("Job Operations", function() {
    this.beforeAll(async function(this: Context) {
      ({ administrationClient, client, recorder } = await createRecordedRouterClientWithConnectionString(this));

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
    });

    afterEach(async function(this: Context) {
      if (!this.currentTest?.isPending() && recorder) {
        // unused
      }

      await sleep(sleepMs);
    });

    this.afterAll(async function(this: Context) {
      await sleep(sleepMs);
      await administrationClient.deleteClassificationPolicy(classificationPolicyRequest.id!, {});
      await administrationClient.deleteQueue(queueRequest.id!, {});
      await administrationClient.deleteExceptionPolicy(exceptionPolicyRequest.id!, {});
      await administrationClient.deleteDistributionPolicy(distributionPolicyRequest.id!, {});
    });

    it("should create a job", async function() {
      let options: CreateJobOptions = {...request};
      const result = await client.createJob(request.id!, options);

      assert.isDefined(result);
      assert.isDefined(result.id);
      assert.equal(result.id, request.id);
    }).timeout(timeoutMs);

    it("should get a job", async function() {
      const result = await client.getJob(request.id!);

      assert.isDefined(result);
      assert.isDefined(result.id);
      assert.equal(result.id, request.id);
    }).timeout(timeoutMs);

    it("should update a job", async function() {
      const patch: RouterJob = { ...request, priority: 5 };
      const result = await client.updateJob(request.id!, patch);

      assert.isDefined(result);
      assert.isDefined(result.id);
      assert.equal(result.id, request.id);
      assert.equal(result.priority, patch.priority);
    }).timeout(timeoutMs);

    it("should get in-queue position for a job", async function() {
      const result = await client.getQueuePosition(request.id!);

      assert.isDefined(result);
      assert.isDefined(result.position);
      assert.equal(request.id, result.jobId);
    }).timeout(timeoutMs);

    it("should reclassify a job", async function() {
      const result = await client.reclassifyJob(request.id!);

      assert.isDefined(result);
    }).timeout(timeoutMs);

    it("should cancel a job", async function() {
      const result = await client.cancelJob(request.id!);

      assert.isDefined(result);
    }).timeout(timeoutMs);

    it("should delete a job", async () => {
      const result = await client.deleteJob(request.id!);

      assert.isDefined(result);
    }).timeout(timeoutMs);

    it("should list jobs", () => {
      const result = client.listJobs({maxPageSize: 1});

      assert.isNotNull(result.next());
      assert.isNotNull(result.next());
    }).timeout(timeoutMs);
  });
});
