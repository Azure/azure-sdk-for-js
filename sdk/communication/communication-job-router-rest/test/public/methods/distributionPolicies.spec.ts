// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Recorder } from "@azure-tools/test-recorder";
import { assert } from "chai";
import { Context } from "mocha";
import {
  AzureCommunicationRoutingServiceClient,
  DistributionPolicyOutput,
  paginate,
} from "../../../src";
import { getDistributionPolicyRequest } from "../utils/testData";
import { createRecordedRouterClientWithConnectionString } from "../../internal/utils/mockClient";
import { timeoutMs } from "../utils/constants";

describe("JobRouterClient", function () {
  let routerClient: AzureCommunicationRoutingServiceClient;
  let recorder: Recorder;

  const testRunId = "recorded-d-policies";

  const { distributionPolicyIdForCreationAndDeletionTest, distributionPolicyRequest } =
    getDistributionPolicyRequest(testRunId);

  describe("Distribution Policy Operations", function () {
    this.beforeEach(async function (this: Context) {
      ({ routerClient, recorder } = await createRecordedRouterClientWithConnectionString(this));
    });

    this.afterEach(async function (this: Context) {
      if (!this.currentTest?.isPending() && recorder) {
        await recorder.stop();
      }
    });

    it("should create a distribution policy", async function () {
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
    }).timeout(timeoutMs);

    it("should get a distribution policy", async function () {
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
    }).timeout(timeoutMs);

    it("should update a distribution policy", async function () {
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
    }).timeout(timeoutMs);

    it("should list distribution policies", async function () {
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
    }).timeout(timeoutMs);

    it("should delete a distribution policy", async function () {
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
    }).timeout(timeoutMs);
  });
});
