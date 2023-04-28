// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Recorder } from "@azure-tools/test-recorder";
import { assert } from "chai";
import { JobQueue, RouterAdministrationClient } from "../../../src";
import { Context } from "mocha";
import {
  getDistributionPolicyRequest,
  getExceptionPolicyRequest,
  getQueueRequest,
} from "../utils/testData";
import { createRecordedRouterClientWithConnectionString } from "../../internal/utils/mockClient";
import { timeoutMs } from "../utils/constants";

describe("RouterClient", function () {
  let administrationClient: RouterAdministrationClient;
  let recorder: Recorder;

  const testRunId = "recorded-queues";

  const { distributionPolicyId, distributionPolicyRequest } =
    getDistributionPolicyRequest(testRunId);
  const { exceptionPolicyId, exceptionPolicyRequest } = getExceptionPolicyRequest(testRunId);
  const { queueId, queueRequest } = getQueueRequest(testRunId);

  describe("Queue Operations", function () {
    this.beforeEach(async function (this: Context) {
      ({ administrationClient, recorder } = await createRecordedRouterClientWithConnectionString(
        this
      ));

      await administrationClient.createDistributionPolicy(
        distributionPolicyId,
        distributionPolicyRequest
      );
      await administrationClient.createExceptionPolicy(exceptionPolicyId, exceptionPolicyRequest);
      await administrationClient.createQueue(queueId, queueRequest);
    });

    this.afterEach(async function (this: Context) {
      await administrationClient.deleteQueue(queueId);
      await administrationClient.deleteExceptionPolicy(exceptionPolicyId);
      await administrationClient.deleteDistributionPolicy(distributionPolicyId);

      if (!this.currentTest?.isPending() && recorder) {
        await recorder.stop();
      }
    });

    it("should create a queue", async function () {
      const result = await administrationClient.createQueue(queueId, queueRequest);

      assert.isDefined(result);
      assert.isDefined(result?.id);
      assert.equal(result.name, queueRequest.name);
    }).timeout(timeoutMs);

    it("should get a queue", async function () {
      const result = await administrationClient.getQueue(queueId);

      assert.equal(result.id, queueId);
      assert.equal(result.name, queueRequest.name);
    }).timeout(timeoutMs);

    it("should update a queue", async function () {
      const patch: JobQueue = { ...queueRequest, name: "new-name" };
      const result = await administrationClient.updateQueue(queueId, patch);

      assert.isDefined(result);
      assert.isDefined(result.id);
      assert.equal(result.name, patch.name);
    }).timeout(timeoutMs);

    it("should list queues", async function () {
      const result: JobQueue[] = [];
      for await (const queue of administrationClient.listQueues({ maxPageSize: 20 })) {
        result.push(queue.jobQueue!);
      }

      assert.isNotEmpty(result);
    }).timeout(timeoutMs);

    it("should delete a queue", async function () {
      const result = await administrationClient.deleteQueue(queueId);

      assert.isDefined(result);
    }).timeout(timeoutMs);
  });
});
