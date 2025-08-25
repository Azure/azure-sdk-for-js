// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder } from "@azure-tools/test-recorder";
import type {
  AzureCommunicationRoutingServiceClient,
  RouterQueueOutput,
} from "@azure-rest/communication-job-router";
import { paginate } from "@azure-rest/communication-job-router";
import {
  getQueueRequest,
  getExceptionPolicyRequest,
  getDistributionPolicyRequest,
} from "../utils/testData.js";
import { createRecordedRouterClientWithConnectionString } from "../../internal/utils/mockClient.js";
import { timeoutMs } from "../utils/constants.js";
import { describe, it, assert, beforeEach, afterEach } from "vitest";

describe("JobRouterClient", () => {
  let routerClient: AzureCommunicationRoutingServiceClient;
  let recorder: Recorder;

  const testRunId = "recorded-queues";

  const { distributionPolicyId, distributionPolicyRequest } =
    getDistributionPolicyRequest(testRunId);
  const { exceptionPolicyId, exceptionPolicyRequest } = getExceptionPolicyRequest(testRunId);
  const { queueId, queueRequest } = getQueueRequest(testRunId);

  describe("Queue Operations", () => {
    beforeEach(async (ctx) => {
      ({ routerClient, recorder } = await createRecordedRouterClientWithConnectionString(ctx));

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

    afterEach(async () => {
      await routerClient
        .path("/routing/distributionPolicies/{distributionPolicyId}", distributionPolicyId)
        .delete();
      await routerClient
        .path("/routing/exceptionPolicies/{exceptionPolicyId}", exceptionPolicyId)
        .delete();

      await recorder.stop();
    });

    it("should create a queue", { timeout: timeoutMs }, async () => {
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
    });

    it("should get a queue", { timeout: timeoutMs }, async () => {
      const response = await routerClient.path("/routing/queues/{queueId}", queueId).get();

      if (response.status !== "200") {
        throw new Error("request fails");
      }
      const result = response.body as RouterQueueOutput;

      assert.equal(result.id, queueId);
      assert.equal(result.name, queueRequest.name);
    });

    it("should update a queue", { timeout: timeoutMs }, async () => {
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
    });

    it("should list queues", { timeout: timeoutMs }, async () => {
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
    });

    it("should delete a queue", { timeout: timeoutMs }, async () => {
      const response = await routerClient.path("/routing/queues/{queueId}", queueId).delete();

      if (response.status !== "204") {
        throw new Error("request fails");
      }

      assert.isDefined(response);
    });
  });
});
