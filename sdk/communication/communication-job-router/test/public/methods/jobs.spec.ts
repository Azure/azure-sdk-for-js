// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Recorder } from "@azure-tools/test-recorder";
import { assert } from "chai";
import {
  RouterJob,
  RouterClient,
  RouterAdministrationClient,
  CreateJobOptions
} from "../../../src";
import { Context } from "mocha";
import {
  classificationPolicyRequest,
  distributionPolicyRequest,
  exceptionPolicyRequest,
  jobRequest,
  queueRequest
} from "../utils/testData";
import { createRecordedRouterClientWithConnectionString } from "../../internal/utils/mockClient";
import { timeoutMs, sleep } from "../utils/constants";
import { v4 as uuid } from "uuid";

describe("RouterClient", function() {
  let client: RouterClient;
  let administrationClient: RouterAdministrationClient;
  let recorder: Recorder;

  const testRunId = uuid();
  const distributionPolicyId: string = `${distributionPolicyRequest.id!}-${testRunId}`;
  const exceptionPolicyId: string = `${exceptionPolicyRequest.id!}-${testRunId}`;
  const queueId: string = `${queueRequest.id!}-${testRunId}`;
  const classificationPolicyId: string = `${classificationPolicyRequest.id!}-${testRunId}`;
  const jobId: string = `${jobRequest.id}-${testRunId}`;

  describe("Job Operations", function() {
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
      await administrationClient.createClassificationPolicy(
        classificationPolicyId,
        classificationPolicyRequest
      );
    });

    afterEach(async function(this: Context) {
      if (!this.currentTest?.isPending() && recorder) {
        await recorder.stop();
      }
    });

    this.afterAll(async function(this: Context) {
      await administrationClient.deleteClassificationPolicy(classificationPolicyId);
      await administrationClient.deleteQueue(queueId);
      await administrationClient.deleteExceptionPolicy(exceptionPolicyId);
      await administrationClient.deleteDistributionPolicy(distributionPolicyId);
    });

    it("should create a job", async function() {
      let options: CreateJobOptions = { ...jobRequest };
      const result = await client.createJob(jobId, options);

      assert.isDefined(result);
      assert.isDefined(result.id);
      assert.equal(result.id, jobId);
    }).timeout(timeoutMs);

    it("should get a job", async function() {
      const result = await client.getJob(jobId);

      assert.isDefined(result);
      assert.isDefined(result.id);
      assert.equal(result.id, jobId);
    }).timeout(timeoutMs);

    it("should update a job", async function() {
      const patch: RouterJob = { ...jobRequest, priority: 5 };
      const result = await client.updateJob(jobId, patch);

      assert.isDefined(result);
      assert.isDefined(result.id);
      assert.equal(result.id, jobId);
      assert.equal(result.priority, patch.priority);
    }).timeout(timeoutMs);

    it("should get queue position for a job", async function() {
      const result = await client.getQueuePosition(jobId);

      assert.isDefined(result);
      assert.isDefined(result.position);
      assert.equal(jobId, result.jobId);
    }).timeout(timeoutMs);

    it("should reclassify a job", async function() {
      const result = await client.reclassifyJob(jobId);

      assert.isDefined(result);
    }).timeout(timeoutMs);

    it("should list jobs", async function() {
      const result: RouterJob[] = [];
      for await (const job of client.listJobs({ maxPageSize: 20 })) {
        result.push(job.routerJob!);
      }

      assert.isNotEmpty(result);
    }).timeout(timeoutMs);

    it("should cancel a job", async function() {
      const result = await client.cancelJob(jobId);

      assert.isDefined(result);
    }).timeout(timeoutMs);

    it("should delete a job", async function() {
      await sleep(3000);
      const result = await client.deleteJob(jobId);

      assert.isDefined(result);
    }).timeout(timeoutMs);
  });
});
