// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder } from "@azure-tools/test-recorder";
import type {
  AzureCommunicationRoutingServiceClient,
  ClassificationPolicyOutput,
} from "@azure-rest/communication-job-router";
import { paginate } from "@azure-rest/communication-job-router";
import {
  getClassificationPolicyRequest,
  getDistributionPolicyRequest,
  getExceptionPolicyRequest,
  getQueueRequest,
} from "../utils/testData.js";
import { createRecordedRouterClientWithConnectionString } from "../../internal/utils/mockClient.js";
import { timeoutMs } from "../utils/constants.js";
import { describe, it, assert, beforeEach, afterEach } from "vitest";

describe("JobRouterClient", () => {
  let routerClient: AzureCommunicationRoutingServiceClient;
  let recorder: Recorder;

  const testRunId = "recorded-d-policies";

  const { classificationPolicyId, classificationPolicyRequest } =
    getClassificationPolicyRequest(testRunId);

  const { distributionPolicyId, distributionPolicyRequest } =
    getDistributionPolicyRequest(testRunId);

  const { exceptionPolicyId, exceptionPolicyRequest } = getExceptionPolicyRequest(testRunId);

  const { queueId, queueRequest } = getQueueRequest(testRunId);

  describe("classification Policy Operations", () => {
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
      await routerClient.path("/routing/queues/{queueId}", queueId).patch({
        contentType: "application/merge-patch+json",
        body: queueRequest,
      });
    });

    afterEach(async () => {
      await routerClient
        .path("/routing/distributionPolicies/{distributionPolicyId}", distributionPolicyId)
        .delete();
      await routerClient
        .path("/routing/exceptionPolicies/{exceptionPolicyId}", exceptionPolicyId)
        .delete();
      await routerClient.path("/routing/queues/{queueId}", queueId).delete();

      await recorder.stop();
    });

    it("should create a classification policy", { timeout: timeoutMs }, async () => {
      const response = await routerClient
        .path("/routing/classificationPolicies/{classificationPolicyId}", classificationPolicyId)
        .patch({
          contentType: "application/merge-patch+json",
          body: classificationPolicyRequest,
        });

      if (response.status !== "201") {
        throw new Error("request fails");
      }
      const result = response.body as ClassificationPolicyOutput;

      assert.isDefined(result);
      assert.isDefined(result?.id);
      assert.equal(result.name, classificationPolicyRequest.name);
    });

    it("should get a classification policy", { timeout: timeoutMs }, async () => {
      const response = await routerClient
        .path("/routing/classificationPolicies/{classificationPolicyId}", classificationPolicyId)
        .get();

      if (response.status !== "200") {
        throw new Error("request fails");
      }
      const result = response.body as ClassificationPolicyOutput;

      assert.equal(result.id, classificationPolicyId);
      assert.equal(result.name, classificationPolicyRequest.name);
    });

    it("should update a classification policy", { timeout: timeoutMs }, async () => {
      const updatePatch = { ...classificationPolicyRequest, name: "new-name" };
      let response = await routerClient
        .path("/routing/classificationPolicies/{classificationPolicyId}", classificationPolicyId)
        .patch({
          contentType: "application/merge-patch+json",
          body: updatePatch,
        });

      if (response.status !== "200") {
        throw new Error("request fails");
      }
      const updateResult = response.body as ClassificationPolicyOutput;

      const removePatch = { ...classificationPolicyRequest, name: null! };
      response = await routerClient
        .path("/routing/classificationPolicies/{classificationPolicyId}", classificationPolicyId)
        .patch({
          contentType: "application/merge-patch+json",
          body: removePatch,
        });

      if (response.status !== "200") {
        throw new Error("request fails");
      }
      const removeResult = response.body as ClassificationPolicyOutput;

      assert.isDefined(updateResult);
      assert.isDefined(updateResult.id);
      assert.isDefined(removeResult);
      assert.isDefined(removeResult.id);
      assert.equal(updateResult.name, updatePatch.name);
      assert.isUndefined(removeResult.name);
    });

    it("should list classification policies", { timeout: timeoutMs }, async () => {
      const result: ClassificationPolicyOutput[] = [];
      const response = await routerClient
        .path("/routing/classificationPolicies")
        .get({ queryParameters: { maxpagesize: 20 } });

      if (response.status === "200") {
        // The paginate helper creates a paged async iterator using metadata from the first page.
        const items = paginate(routerClient, response);

        // We get an PageableAsyncIterator so we need to do `for await`.
        for await (const item of items) {
          result.push(item as ClassificationPolicyOutput);
        }
      }

      assert.isNotEmpty(result);
    });

    it("should delete a classification policy", { timeout: timeoutMs }, async () => {
      const response = await routerClient
        .path("/routing/classificationPolicies/{classificationPolicyId}", classificationPolicyId)
        .delete();

      if (response.status !== "204") {
        throw new Error("request fails");
      }

      assert.isDefined(response);
    });
  });
});
