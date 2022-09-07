// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Recorder } from "@azure-tools/test-recorder";
import { assert } from "chai";
import { JobQueue, RouterAdministrationClient, RouterClient } from "../../../src";
import { Context } from "mocha";
import {
  distributionPolicyRequest,
  exceptionPolicyRequest,
  queueRequest
} from "../utils/testData";
import { createRecordedRouterClientWithConnectionString } from "../../internal/utils/mockClient";
import { timeoutMs } from "../utils/constants";

describe("RouterClient", function() {
  let recorder: Recorder;
  let administrationClient: RouterAdministrationClient;
  let request: JobQueue = queueRequest;

  describe("Queue Operations", function() {
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

      await administrationClient.deleteQueue(queueRequest.id!);
    });

    it("should create a queue", async function() {
      const result = await administrationClient.createQueue(request.id!, request);

      assert.isDefined(result);
      assert.isDefined(result?.id);
      assert.equal(result.name, request.name);
    }).timeout(timeoutMs);

    it("should get a queue", async function() {
      const response: JobQueue = await administrationClient.createQueue(request.id!, request);

      const result = await administrationClient.getQueue(request.id!);

      assert.equal(result.id, response.id);
      assert.equal(result.name, response.name);
    }).timeout(timeoutMs);

    it("should update a queue", async function() {
      const response: JobQueue = await administrationClient.createQueue(request.id!, request);

      const patch: JobQueue = { ...response, name: "new name" };
      const result = await administrationClient.updateQueue(response.id!, patch);

      assert.isDefined(result);
      assert.isDefined(result.id);
      assert.equal(result.name, patch.name);
    }).timeout(timeoutMs);

    it("should delete a queue", async function() {
      const response: JobQueue = await administrationClient.createQueue(request.id!, request);

      const result = await administrationClient.deleteQueue(response.id!);

      assert.isDefined(result);
    }).timeout(timeoutMs);

    it("should list queues", async function() {
      await administrationClient.createQueue(request.id!, request);

      const result = await administrationClient.listQueues({
        maxPageSize: 1
      });

      assert.isNotNull(result.next());
      assert.isNotNull(result.next());
    }).timeout(timeoutMs);
  });
});
