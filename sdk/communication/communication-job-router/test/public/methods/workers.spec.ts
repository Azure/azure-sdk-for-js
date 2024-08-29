// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Recorder } from "@azure-tools/test-recorder";
import { assert } from "chai";
import { Context } from "mocha";
import { JobRouterAdministrationClient, JobRouterClient, RouterWorker } from "../../../src";
import {
  getDistributionPolicyRequest,
  getExceptionPolicyRequest,
  getQueueRequest,
  getWorkerRequest,
} from "../utils/testData";
import { createRecordedRouterClientWithConnectionString } from "../../internal/utils/mockClient";
import { sleep, timeoutMs } from "../utils/constants";

describe("JobRouterClient", function () {
  let client: JobRouterClient;
  let administrationClient: JobRouterAdministrationClient;
  let recorder: Recorder;

  const testRunId = "recorded-workers";

  const { distributionPolicyId, distributionPolicyRequest } =
    getDistributionPolicyRequest(testRunId);
  const { exceptionPolicyId, exceptionPolicyRequest } = getExceptionPolicyRequest(testRunId);
  const { queueId, queueRequest } = getQueueRequest(testRunId);
  const { workerId, workerRequest } = getWorkerRequest(testRunId);

  // Order matters (registration idempotency)
  describe("Worker Operations", function () {
    this.beforeEach(async function (this: Context) {
      ({ client, administrationClient, recorder } =
        await createRecordedRouterClientWithConnectionString(this));

      await administrationClient.createDistributionPolicy(
        distributionPolicyId,
        distributionPolicyRequest,
      );
      await administrationClient.createExceptionPolicy(exceptionPolicyId, exceptionPolicyRequest);
      await administrationClient.createQueue(queueId, queueRequest);
      await client.createWorker(workerId, workerRequest);
    });

    this.afterEach(async function (this: Context) {
      await client.deleteWorker(workerId);
      await administrationClient.deleteQueue(queueId);
      await administrationClient.deleteExceptionPolicy(exceptionPolicyId);
      await administrationClient.deleteDistributionPolicy(distributionPolicyId);

      if (!this.currentTest?.isPending() && recorder) {
        await recorder.stop();
      }
    });

    it("should create a worker", async function () {
      const result = await client.createWorker(workerId, workerRequest);

      assert.isDefined(result);
      assert.isDefined(result.id);
      assert.equal(result.totalCapacity, workerRequest.totalCapacity);
    }).timeout(timeoutMs);

    it("should get a worker", async function () {
      const result = await client.getWorker(workerId);

      assert.equal(result.id, workerId);
      assert.equal(result.totalCapacity, workerRequest.totalCapacity);
      assert.deepEqual(result.channelConfigurations, workerRequest.channelConfigurations);
    }).timeout(timeoutMs);

    it("should update a worker", async function () {
      const updatePatch = {
        ...workerRequest,
        totalCapacity: 100,
        labels: { label1: "label1value" },
        tags: { tag1: "tag1value" },
      };
      const updateResult = await client.updateWorker(workerId, updatePatch);

      const removePatch = { ...workerRequest, tags: null! };
      const removeResult = await client.updateWorker(workerId, removePatch);

      assert.isDefined(updateResult);
      assert.isDefined(updateResult?.id);
      assert.isDefined(removeResult);
      assert.isDefined(removeResult?.id);
      assert.equal(updateResult.totalCapacity, updatePatch.totalCapacity);
      assert.isEmpty(removeResult.tags);
    }).timeout(timeoutMs);

    it("should register and deregister a worker", async function () {
      const registerResult = await client.updateWorker(workerId, {
        ...workerRequest,
        availableForOffers: true,
      });
      await sleep(2000);
      const deregisterResult = await client.updateWorker(workerId, {
        ...workerRequest,
        availableForOffers: false,
      });

      assert.isDefined(registerResult);
      assert.isDefined(registerResult?.id);
      assert.equal(registerResult.availableForOffers, true);

      assert.isDefined(deregisterResult);
      assert.isDefined(deregisterResult?.id);
      assert.equal(deregisterResult.availableForOffers, false);
    }).timeout(timeoutMs);

    it("should list workers", async function () {
      const result: RouterWorker[] = [];
      for await (const worker of client.listWorkers({ maxPageSize: 20 })) {
        result.push(worker.worker!);
      }

      assert.isNotEmpty(result);
    }).timeout(timeoutMs);

    it("should delete a worker", async function () {
      const result = await client.deleteWorker(workerId);

      assert.isDefined(result);
    }).timeout(timeoutMs);
  });
});
