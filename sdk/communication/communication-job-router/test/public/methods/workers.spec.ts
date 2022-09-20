// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Recorder } from "@azure-tools/test-recorder";
import { assert } from "chai";
import { Context } from "mocha";
import { RouterWorker, RouterClient, RouterAdministrationClient } from "../../../src";
import {
  getQueueRequest,
  getDistributionPolicyRequest,
  getExceptionPolicyRequest,
  getWorkerRequest
} from "../utils/testData";
import { createRecordedRouterClientWithConnectionString } from "../../internal/utils/mockClient";
import { sleep, timeoutMs } from "../utils/constants";
import { v4 as uuid } from "uuid";

describe("RouterClient", function() {
  let client: RouterClient;
  let administrationClient: RouterAdministrationClient;
  let recorder: Recorder;

  const testRunId = uuid();
  const { distributionPolicyId, distributionPolicyRequest } = getDistributionPolicyRequest(
    testRunId
  );
  const { exceptionPolicyId, exceptionPolicyRequest } = getExceptionPolicyRequest(testRunId);
  const { queueId, queueRequest } = getQueueRequest(testRunId);
  const { workerId, workerRequest } = getWorkerRequest(testRunId);

  // Order matters (registration idempotency)
  describe("Worker Operations", function() {
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
    });

    afterEach(async function(this: Context) {
      if (!this.currentTest?.isPending() && recorder) {
        await recorder.stop();
      }
    });

    this.afterAll(async function(this: Context) {
      await administrationClient.deleteQueue(queueId);
      await administrationClient.deleteExceptionPolicy(exceptionPolicyId);
      await administrationClient.deleteDistributionPolicy(distributionPolicyId);
    });

    it("should create a worker", async function() {
      const result = await client.createWorker(workerId, workerRequest);

      assert.isDefined(result);
      assert.isDefined(result.id);
      assert.equal(result.totalCapacity, workerRequest.totalCapacity);
    }).timeout(timeoutMs);

    it("should get a worker", async function() {
      const result = await client.getWorker(workerId);

      assert.equal(result.id, workerId);
      assert.equal(result.totalCapacity, workerRequest.totalCapacity);
      assert.deepEqual(result.channelConfigurations, workerRequest.channelConfigurations);
    }).timeout(timeoutMs);

    it("should update a worker", async function() {
      const patch: RouterWorker = { ...workerRequest, totalCapacity: 1010 };
      const result = await client.updateWorker(workerId, patch);

      assert.isDefined(result);
      assert.isDefined(result?.id);
      assert.equal(result.totalCapacity, patch.totalCapacity);
    }).timeout(timeoutMs);

    it("should register and deregister a worker", async function() {
      const registerResult = await client.registerWorker(workerId);
      await sleep(2000);
      const deregisterResult = await client.deregisterWorker(workerId);

      assert.isDefined(registerResult);
      assert.isDefined(registerResult?.id);
      assert.equal(registerResult.availableForOffers, true);

      assert.isDefined(deregisterResult);
      assert.isDefined(deregisterResult?.id);
      assert.equal(deregisterResult.availableForOffers, false);
    }).timeout(timeoutMs);

    it("should list workers", async function() {
      const result: RouterWorker[] = [];
      for await (const worker of client.listWorkers({ maxPageSize: 20 })) {
        result.push(worker.routerWorker!);
      }

      assert.isNotEmpty(result);
    }).timeout(timeoutMs);

    it("should delete a worker", async function() {
      const result = await client.deleteWorker(workerId);

      assert.isDefined(result);
    }).timeout(timeoutMs);
  });
});
