// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Recorder } from "@azure-tools/test-recorder";
import { assert } from "chai";
import { RouterQueue, JobRouterAdministrationClient } from "../../../src";
import { Context } from "mocha";
import {
  getDistributionPolicyRequest,
  getExceptionPolicyRequest,
  getQueueRequest,
} from "../utils/testData";
import { createRecordedRouterClientWithConnectionString } from "../../internal/utils/mockClient";
import { timeoutMs } from "../utils/constants";

describe("JobRouterClient", function () {
  let administrationClient: JobRouterAdministrationClient;
  let recorder: Recorder;

  const testRunId = "recorded-queues";

  const { distributionPolicyId, distributionPolicyRequest } =
    getDistributionPolicyRequest(testRunId);
  const { exceptionPolicyId, exceptionPolicyRequest } = getExceptionPolicyRequest(testRunId);
  const { queueId, queueRequest } = getQueueRequest(testRunId);

  describe("Queue Operations", function () {
    this.beforeEach(async function (this: Context) {
      ({ administrationClient, recorder } =
        await createRecordedRouterClientWithConnectionString(this));

      await administrationClient.createDistributionPolicy(
        distributionPolicyId,
        distributionPolicyRequest,
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
      const updatePatch = { ...queueRequest, name: "new-name" };
      const updateResult = await administrationClient.updateQueue(queueId, updatePatch);

      const removePatch = { ...queueRequest, name: null! };
      const removeResult = await administrationClient.updateQueue(queueId, removePatch);

      assert.isDefined(updateResult);
      assert.isDefined(updateResult.id);
      assert.isDefined(removeResult);
      assert.isDefined(removeResult.id);
      assert.equal(updateResult.name, updatePatch.name);
      assert.isUndefined(removeResult.name);
    }).timeout(timeoutMs);

    it("should list queues", async function () {
      const result: RouterQueue[] = [];
      for await (const queue of administrationClient.listQueues({ maxPageSize: 20 })) {
        result.push(queue.queue!);
      }

      assert.isNotEmpty(result);
    }).timeout(timeoutMs);

    it("should delete a queue", async function () {
      const result = await administrationClient.deleteQueue(queueId);

      assert.isDefined(result);
    }).timeout(timeoutMs);
  });
});
