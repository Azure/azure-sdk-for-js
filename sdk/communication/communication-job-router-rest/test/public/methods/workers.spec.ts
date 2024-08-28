// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Recorder } from "@azure-tools/test-recorder";
import { assert } from "chai";
import { Context } from "mocha";
import { AzureCommunicationRoutingServiceClient, paginate, RouterWorkerOutput } from "../../../src";
import {
  getDistributionPolicyRequest,
  getExceptionPolicyRequest,
  getQueueRequest,
  getWorkerRequest,
} from "../utils/testData";
import { createRecordedRouterClientWithConnectionString } from "../../internal/utils/mockClient";
import { sleep, timeoutMs } from "../utils/constants";

describe("JobRouterClient", function () {
  let routerClient: AzureCommunicationRoutingServiceClient;
  let recorder: Recorder;

  const testRunId = "recorded-workers";

  const { distributionPolicyId, distributionPolicyRequest } =
    getDistributionPolicyRequest(testRunId);
  const { exceptionPolicyId, exceptionPolicyRequest } = getExceptionPolicyRequest(testRunId);
  const { queueId, queueRequest } = getQueueRequest(testRunId);
  const { workerId, workerRequest } = getWorkerRequest(testRunId);

  describe("Worker Operations", function () {
    this.beforeEach(async function (this: Context) {
      ({ routerClient, recorder } = await createRecordedRouterClientWithConnectionString(this));

      await routerClient
        .path("/routing/distributionPolicies/{distributionPolicyId}", distributionPolicyId)
        .patch({
          contentType: "application/merge-patch+json",
          body: distributionPolicyRequest,
        });
      await routerClient
        .path("/routing/exceptionPolicies/{exceptionPolicyId}", exceptionPolicyId)
        .patch({
          contentType: "application/merge-patch+json",
          body: exceptionPolicyRequest,
        });
      await routerClient.path("/routing/queues/{queueId}", queueId).patch({
        contentType: "application/merge-patch+json",
        body: queueRequest,
      });
    });

    this.afterEach(async function (this: Context) {
      await routerClient
        .path("/routing/distributionPolicies/{distributionPolicyId}", distributionPolicyId)
        .delete();
      await routerClient
        .path("/routing/exceptionPolicies/{exceptionPolicyId}", exceptionPolicyId)
        .delete();
      await routerClient.path("/routing/queues/{queueId}", queueId).delete();

      if (!this.currentTest?.isPending() && recorder) {
        await recorder.stop();
      }
    });

    it("should create a worker", async function () {
      const response = await routerClient.path("/routing/workers/{workerId}", workerId).patch({
        contentType: "application/merge-patch+json",
        body: workerRequest,
      });

      if (response.status !== "201") {
        throw new Error("request fails");
      }
      const result = response.body as RouterWorkerOutput;

      assert.isDefined(result);
      assert.isDefined(result?.id);
      assert.equal(result.capacity, workerRequest.capacity);
    }).timeout(timeoutMs);

    it("should get a worker", async function () {
      const response = await routerClient.path("/routing/workers/{workerId}", workerId).get();

      if (response.status !== "200") {
        throw new Error("request fails");
      }
      const result = response.body as RouterWorkerOutput;

      assert.equal(result.id, workerId);
      assert.equal(result.capacity, workerRequest.capacity);
      assert.deepEqual(result.channels, workerRequest.channels);
    }).timeout(timeoutMs);

    it("should update a worker", async function () {
      const updatePatch = {
        ...workerRequest,
        capacity: 100,
        labels: { label1: "label1value" },
        tags: { tag1: "tag1value" },
      };
      let response = await routerClient.path("/routing/workers/{workerId}", workerId).patch({
        contentType: "application/merge-patch+json",
        body: updatePatch,
      });

      if (response.status !== "200") {
        throw new Error("request fails");
      }
      const updateResult = response.body as RouterWorkerOutput;

      const removePatch = { ...workerRequest, tags: null! };
      response = await routerClient.path("/routing/workers/{workerId}", workerId).patch({
        contentType: "application/merge-patch+json",
        body: removePatch,
      });

      if (response.status !== "200") {
        throw new Error("request fails");
      }
      const removeResult = response.body as RouterWorkerOutput;

      assert.isDefined(updateResult);
      assert.isDefined(updateResult.id);
      assert.isDefined(removeResult);
      assert.isDefined(removeResult.id);
      assert.equal(updateResult.capacity, updatePatch.capacity);
      assert.isEmpty(removeResult.tags);
    }).timeout(timeoutMs);

    it("should register and deregister a worker", async function () {
      const registerPatch = { ...workerRequest, availableForOffers: true };
      let response = await routerClient.path("/routing/workers/{workerId}", workerId).patch({
        contentType: "application/merge-patch+json",
        body: registerPatch,
      });

      if (response.status !== "200") {
        throw new Error("request fails");
      }
      const registerResult = response.body as RouterWorkerOutput;

      await sleep(2000);
      const deregisterPatch = { ...workerRequest, availableForOffers: false };
      response = await routerClient.path("/routing/workers/{workerId}", workerId).patch({
        contentType: "application/merge-patch+json",
        body: deregisterPatch,
      });

      if (response.status !== "200") {
        throw new Error("request fails");
      }
      const deregisterResult = response.body as RouterWorkerOutput;

      assert.isDefined(registerResult);
      assert.isDefined(registerResult?.id);
      assert.equal(registerResult.availableForOffers, true);

      assert.isDefined(deregisterResult);
      assert.isDefined(deregisterResult?.id);
      assert.equal(deregisterResult.availableForOffers, false);
    }).timeout(timeoutMs);

    it("should list workers", async function () {
      const result: RouterWorkerOutput[] = [];
      const response = await routerClient
        .path("/routing/workers")
        .get({ queryParameters: { maxpagesize: 20 } });

      if (response.status === "200") {
        // The paginate helper creates a paged async iterator using metadata from the first page.
        const items = paginate(routerClient, response);

        // We get an PageableAsyncIterator so we need to do `for await`.
        for await (const item of items) {
          result.push(item as RouterWorkerOutput);
        }
      }

      assert.isNotEmpty(result);
    }).timeout(timeoutMs);

    it("should delete a worker", async function () {
      const response = await routerClient.path("/routing/workers/{workerId}", workerId).delete();

      if (response.status !== "204") {
        throw new Error("request fails");
      }

      assert.isDefined(response);
    }).timeout(timeoutMs);
  });
});
