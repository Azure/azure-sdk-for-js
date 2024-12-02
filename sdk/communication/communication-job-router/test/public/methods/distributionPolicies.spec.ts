// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder } from "@azure-tools/test-recorder";
import type { DistributionPolicy, JobRouterAdministrationClient } from "../../../src/index.js";
import { getDistributionPolicyRequest } from "../utils/testData.js";
import { createRecordedRouterClientWithConnectionString } from "../../internal/utils/mockClient.js";
import { timeoutMs } from "../utils/constants.js";
import { describe, it, assert, beforeEach, afterEach } from "vitest";

describe("JobRouterClient", () => {
  let administrationClient: JobRouterAdministrationClient;
  let recorder: Recorder;

  const testRunId = "recorded-d-policies";

  const { distributionPolicyId, distributionPolicyRequest } =
    getDistributionPolicyRequest(testRunId);

  describe("Distribution Policy Operations", () => {
    beforeEach(async (ctx) => {
      ({ administrationClient, recorder } =
        await createRecordedRouterClientWithConnectionString(ctx));
    });

    afterEach(async (ctx) => {
      if (!ctx.task.pending && recorder) {
        await recorder.stop();
      }
    });

    it("should create a distribution policy", { timeout: timeoutMs }, async () => {
      const result = await administrationClient.createDistributionPolicy(
        distributionPolicyId,
        distributionPolicyRequest,
      );

      assert.isDefined(result);
      assert.isDefined(result?.id);
      assert.equal(result.name, distributionPolicyRequest.name);
    });

    it("should get a distribution policy", { timeout: timeoutMs }, async () => {
      const result = await administrationClient.getDistributionPolicy(distributionPolicyId);

      assert.equal(result.id, distributionPolicyId);
      assert.equal(result.name, distributionPolicyRequest.name);
      assert.equal(
        result.offerExpiresAfterSeconds,
        distributionPolicyRequest.offerExpiresAfterSeconds,
      );
      assert.deepEqual(result.mode, distributionPolicyRequest.mode);
    });

    it("should update a distribution policy", { timeout: timeoutMs }, async () => {
      const updatePatch = { ...distributionPolicyRequest, name: "new-name" };
      const updateResult = await administrationClient.updateDistributionPolicy(
        distributionPolicyId,
        updatePatch,
      );

      const removePatch = { ...distributionPolicyRequest, name: null! };
      const removeResult = await administrationClient.updateDistributionPolicy(
        distributionPolicyId,
        removePatch,
      );

      assert.isDefined(updateResult);
      assert.isDefined(updateResult.id);
      assert.isDefined(removeResult);
      assert.isDefined(removeResult.id);
      assert.equal(updateResult.name, updatePatch.name);
      assert.isUndefined(removeResult.name);
    });

    it("should list distribution policies", { timeout: timeoutMs }, async () => {
      const result: DistributionPolicy[] = [];
      for await (const policy of administrationClient.listDistributionPolicies({
        maxPageSize: 20,
      })) {
        result.push(policy.distributionPolicy!);
      }

      assert.isNotEmpty(result);
    });

    it("should delete a distribution policy", { timeout: timeoutMs }, async () => {
      const result = await administrationClient.deleteDistributionPolicy(distributionPolicyId);

      assert.isDefined(result);
    });
  });
});
