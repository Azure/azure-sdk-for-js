// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder } from "@azure-tools/test-recorder";
import type {
  AzureCommunicationRoutingServiceClient,
  DistributionPolicyOutput,
} from "../../../src/index.js";
import { paginate } from "@azure-rest/communication-job-router";
import { getDistributionPolicyRequest } from "../utils/testData.js";
import { createRecordedRouterClientWithConnectionString } from "../../internal/utils/mockClient.js";
import { timeoutMs } from "../utils/constants.js";
import { describe, it, assert, beforeEach, afterEach } from "vitest";

describe("JobRouterClient", () => {
  let routerClient: AzureCommunicationRoutingServiceClient;
  let recorder: Recorder;

  const testRunId = "recorded-d-policies";

  const { distributionPolicyIdForCreationAndDeletionTest, distributionPolicyRequest } =
    getDistributionPolicyRequest(testRunId);

  describe("Distribution Policy Operations", () => {
    beforeEach(async (ctx) => {
      ({ routerClient, recorder } = await createRecordedRouterClientWithConnectionString(ctx));
    });

    afterEach(async () => {
      await recorder.stop();
    });

    it("should create a distribution policy", { timeout: timeoutMs }, async () => {
      const response = await routerClient
        .path(
          "/routing/distributionPolicies/{distributionPolicyId}",
          distributionPolicyIdForCreationAndDeletionTest,
        )
        .patch({
          contentType: "application/merge-patch+json",
          body: distributionPolicyRequest,
        });

      if (response.status !== "201") {
        throw new Error("request fails");
      }
      const result = response.body as DistributionPolicyOutput;

      assert.isDefined(result);
      assert.isDefined(result?.id);
      assert.equal(result.name, distributionPolicyRequest.name);
    });

    it("should get a distribution policy", { timeout: timeoutMs }, async () => {
      const response = await routerClient
        .path(
          "/routing/distributionPolicies/{distributionPolicyId}",
          distributionPolicyIdForCreationAndDeletionTest,
        )
        .get();

      if (response.status !== "200") {
        throw new Error("request fails");
      }
      const result = response.body as DistributionPolicyOutput;

      assert.equal(result.id, distributionPolicyIdForCreationAndDeletionTest);
      assert.equal(result.name, distributionPolicyRequest.name);
      assert.equal(
        result.offerExpiresAfterSeconds,
        distributionPolicyRequest.offerExpiresAfterSeconds,
      );
      assert.deepEqual(result.mode, distributionPolicyRequest.mode);
    });

    it("should update a distribution policy", { timeout: timeoutMs }, async () => {
      const updatePatch = { ...distributionPolicyRequest, name: "new-name" };
      let response = await routerClient
        .path(
          "/routing/distributionPolicies/{distributionPolicyId}",
          distributionPolicyIdForCreationAndDeletionTest,
        )
        .patch({
          contentType: "application/merge-patch+json",
          body: updatePatch,
        });

      if (response.status !== "200") {
        throw new Error("request fails");
      }
      const updateResult = response.body as DistributionPolicyOutput;

      const removePatch = { ...distributionPolicyRequest, name: null! };
      response = await routerClient
        .path(
          "/routing/distributionPolicies/{distributionPolicyId}",
          distributionPolicyIdForCreationAndDeletionTest,
        )
        .patch({
          contentType: "application/merge-patch+json",
          body: removePatch,
        });

      if (response.status !== "200") {
        throw new Error("request fails");
      }
      const removeResult = response.body as DistributionPolicyOutput;

      assert.isDefined(updateResult);
      assert.isDefined(updateResult.id);
      assert.isDefined(removeResult);
      assert.isDefined(removeResult.id);
      assert.equal(updateResult.name, updatePatch.name);
      assert.isUndefined(removeResult.name);
    });

    it("should list distribution policies", { timeout: timeoutMs }, async () => {
      const result: DistributionPolicyOutput[] = [];
      const response = await routerClient
        .path("/routing/distributionPolicies")
        .get({ queryParameters: { maxpagesize: 20 } });

      if (response.status === "200") {
        // The paginate helper creates a paged async iterator using metadata from the first page.
        const items = paginate(routerClient, response);

        // We get an PageableAsyncIterator so we need to do `for await`.
        for await (const item of items) {
          result.push(item as DistributionPolicyOutput);
        }
      }

      assert.isNotEmpty(result);
    });

    it("should delete a distribution policy", { timeout: timeoutMs }, async () => {
      const response = await routerClient
        .path(
          "/routing/distributionPolicies/{distributionPolicyId}",
          distributionPolicyIdForCreationAndDeletionTest,
        )
        .delete();

      if (response.status !== "204") {
        throw new Error("request fails");
      }

      assert.isDefined(response);
    });
  });
});
