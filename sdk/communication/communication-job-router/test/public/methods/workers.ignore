// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Recorder } from "@azure-tools/test-recorder";
import { assert } from "chai";
import { Context } from "mocha";
import { RouterWorker, RouterClient, RouterAdministrationClient } from "../../../src";
import {
  workerRequest,
  queueRequest,
  distributionPolicyRequest,
  exceptionPolicyRequest
} from "../utils/testData";
import { createRecordedRouterClientWithConnectionString } from "../../internal/utils/mockClient";
import { timeoutMs } from "../utils/constants";

describe("RouterClient", function() {
  let recorder: Recorder;
  let administrationClient: RouterAdministrationClient;
  let client: RouterClient;
  let request: RouterWorker = workerRequest;

  // Order matters (registration idempotency)
  describe("Worker Operations", function() {
    this.beforeAll(async function(this: Context) {
      ({  administrationClient, client, recorder } = await createRecordedRouterClientWithConnectionString(this));

      await administrationClient.createDistributionPolicy(
        distributionPolicyRequest.id!,
        distributionPolicyRequest
      );
      await administrationClient.createExceptionPolicy(exceptionPolicyRequest.id!, exceptionPolicyRequest);
      await administrationClient.createQueue(queueRequest.id!, queueRequest);
    });

    afterEach(async function(this: Context) {
      if (!this.currentTest?.isPending() && recorder) {
        // unused
      }
    });

    this.afterAll(async function(this: Context) {
      await administrationClient.deleteQueue(queueRequest.id!);
      await administrationClient.deleteExceptionPolicy(exceptionPolicyRequest.id!);
      await administrationClient.deleteDistributionPolicy(distributionPolicyRequest.id!);
    });

    it("should create a worker", async function() {
      const result = await client.createWorker(request.id!, request);

      assert.isDefined(result);
      assert.isDefined(result.id);
      assert.equal(result.totalCapacity, request.totalCapacity);
    }).timeout(timeoutMs);

    it("should get a worker", async function() {
      const response: RouterWorker = await client.createWorker(request.id!, request);

      const result = await client.getWorker(request.id!);

      assert.equal(result.id, response.id);
      assert.equal(result.totalCapacity, response.totalCapacity);
      assert.deepEqual(result.channelConfigurations, response.channelConfigurations);
    }).timeout(timeoutMs);

    it("should update a worker", async function() {
      const response: RouterWorker = await client.createWorker(request.id!, request);

      const patch: RouterWorker = { ...response, totalCapacity: 1010 };
      const result = await client.updateWorker(response.id!, patch);

      assert.isDefined(result);
      assert.isDefined(result?.id);
      assert.equal(result.totalCapacity, patch.totalCapacity);
    }).timeout(timeoutMs);

    it("should register and deregister a worker", async function() {
      const response: RouterWorker = await client.createWorker(request.id!, request);

      let result = await client.registerWorker(response.id!);

      assert.isDefined(result);
      assert.isDefined(result?.id);
      assert.equal(result.availableForOffers, true);

      result = await client.deregisterWorker(response.id!);

      assert.isDefined(result);
      assert.isDefined(result?.id);
      assert.equal(result.availableForOffers, false);
    }).timeout(timeoutMs);

    it("should delete a worker", async function() {
      const response: RouterWorker = await client.createWorker(request.id!, request);
      await client.deregisterWorker(response.id!);

      const result = await client.deleteWorker(response.id!);

      assert.isDefined(result);
    }).timeout(timeoutMs);
  });
});
