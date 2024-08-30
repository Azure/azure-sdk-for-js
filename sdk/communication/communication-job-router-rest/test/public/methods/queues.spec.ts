// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Recorder } from "@azure-tools/test-recorder";
import { assert } from "chai";
import { AzureCommunicationRoutingServiceClient, paginate, RouterQueueOutput } from "../../../src";
import { Context } from "mocha";
import {
  getQueueRequest,
  getExceptionPolicyRequest,
  getDistributionPolicyRequest,
} from "../utils/testData";
import { createRecordedRouterClientWithConnectionString } from "../../internal/utils/mockClient";
import { timeoutMs } from "../utils/constants";

describe("JobRouterClient", function () {
  let routerClient: AzureCommunicationRoutingServiceClient;
  let recorder: Recorder;

  const testRunId = "recorded-queues";

  const { distributionPolicyId, distributionPolicyRequest } =
    getDistributionPolicyRequest(testRunId);
  const { exceptionPolicyId, exceptionPolicyRequest } = getExceptionPolicyRequest(testRunId);
  const { queueId, queueRequest } = getQueueRequest(testRunId);

  describe("Queue Operations", function () {
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
    });

    this.afterEach(async function (this: Context) {
      await routerClient
        .path("/routing/distributionPolicies/{distributionPolicyId}", distributionPolicyId)
        .delete();
      await routerClient
        .path("/routing/exceptionPolicies/{exceptionPolicyId}", exceptionPolicyId)
        .delete();

      if (!this.currentTest?.isPending() && recorder) {
        await recorder.stop();
      }
    });

    it("should create a queue", async function () {
      const response = await routerClient.path("/routing/queues/{queueId}", queueId).patch({
        contentType: "application/merge-patch+json",
        body: queueRequest,
      });

      if (response.status !== "201") {
        throw new Error("request fails");
      }
      const result = response.body as RouterQueueOutput;

      assert.isDefined(result);
      assert.isDefined(result?.id);
      assert.equal(result.name, queueRequest.name);
    }).timeout(timeoutMs);

    it("should get a queue", async function () {
      const response = await routerClient.path("/routing/queues/{queueId}", queueId).get();

      if (response.status !== "200") {
        throw new Error("request fails");
      }
      const result = response.body as RouterQueueOutput;

      assert.equal(result.id, queueId);
      assert.equal(result.name, queueRequest.name);
    }).timeout(timeoutMs);

    it("should update a queue", async function () {
      const updatePatch = { ...queueRequest, name: "new-name" };
      let response = await routerClient.path("/routing/queues/{queueId}", queueId).patch({
        contentType: "application/merge-patch+json",
        body: updatePatch,
      });

      if (response.status !== "200") {
        throw new Error("request fails");
      }
      const updateResult = response.body as RouterQueueOutput;

      const removePatch = { ...queueRequest, name: null! };
      response = await routerClient.path("/routing/queues/{queueId}", queueId).patch({
        contentType: "application/merge-patch+json",
        body: removePatch,
      });

      if (response.status !== "200") {
        throw new Error("request fails");
      }
      const removeResult = response.body as RouterQueueOutput;

      assert.isDefined(updateResult);
      assert.isDefined(updateResult.id);
      assert.isDefined(removeResult);
      assert.isDefined(removeResult.id);
      assert.equal(updateResult.name, updatePatch.name);
      assert.isUndefined(removeResult.name);
    }).timeout(timeoutMs);

    it("should list queues", async function () {
      const result: RouterQueueOutput[] = [];
      const response = await routerClient
        .path("/routing/queues")
        .get({ queryParameters: { maxpagesize: 20 } });

      if (response.status === "200") {
        // The paginate helper creates a paged async iterator using metadata from the first page.
        const items = paginate(routerClient, response);

        // We get an PageableAsyncIterator so we need to do `for await`.
        for await (const item of items) {
          result.push(item as RouterQueueOutput);
        }
      }

      assert.isNotEmpty(result);
    }).timeout(timeoutMs);

    it("should delete a queue", async function () {
      const response = await routerClient.path("/routing/queues/{queueId}", queueId).delete();

      if (response.status !== "204") {
        throw new Error("request fails");
      }

      assert.isDefined(response);
    }).timeout(timeoutMs);
  });
});
