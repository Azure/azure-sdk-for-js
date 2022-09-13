// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Recorder } from "@azure-tools/test-recorder";
import { assert } from "chai";
import { Context } from "mocha";
import { DistributionPolicy, RouterAdministrationClient } from "../../../src";
import { distributionPolicyRequest } from "../utils/testData";
import { createRecordedRouterClientWithConnectionString } from "../../internal/utils/mockClient";
import { timeoutMs } from "../utils/constants";
import { v4 as uuid } from "uuid";

describe("RouterClient", function() {
  let administrationClient: RouterAdministrationClient;
  let recorder: Recorder;

  const testRunId = uuid();
  const distributionPolicyId: string = `${distributionPolicyRequest.id!}-${testRunId}`;

  describe("Distribution Policy Operations", function() {
    this.beforeAll(async function(this: Context) {
      ({ administrationClient, recorder } = await createRecordedRouterClientWithConnectionString(
        this
      ));
    });

    afterEach(async function(this: Context) {
      if (!this.currentTest?.isPending() && recorder) {
      }
    });

    it("should create a distribution policy", async function() {
      const result = await administrationClient.createDistributionPolicy(
        distributionPolicyId,
        distributionPolicyRequest
      );

      assert.isDefined(result);
      assert.isDefined(result?.id);
      assert.equal(result.name, distributionPolicyRequest.name);
    }).timeout(timeoutMs);

    it("should get a distribution policy", async function() {
      const result = await administrationClient.getDistributionPolicy(distributionPolicyId);

      assert.equal(result.id, distributionPolicyId);
      assert.equal(result.name, distributionPolicyRequest.name);
      assert.equal(result.offerTtlInSeconds, distributionPolicyRequest.offerTtlInSeconds);
      assert.deepEqual(result.mode, distributionPolicyRequest.mode);
    }).timeout(timeoutMs);

    it("should update a distribution policy", async function() {
      const patch: DistributionPolicy = { ...distributionPolicyRequest, name: "new-name" };
      const result = await administrationClient.updateDistributionPolicy(
        distributionPolicyId,
        patch
      );

      assert.isDefined(result);
      assert.isDefined(result.id);
      assert.equal(result.name, patch.name);
    }).timeout(timeoutMs);

    it("should list distribution policies", async function() {
      const result: DistributionPolicy[] = [];
      for await (const policy of administrationClient.listDistributionPolicies({
        maxPageSize: 20
      })) {
        result.push(policy.distributionPolicy!);
      }

      assert.isNotEmpty(result);
    }).timeout(timeoutMs);

    it("should delete a distribution policy", async function() {
      const result = await administrationClient.deleteDistributionPolicy(distributionPolicyId);

      assert.isDefined(result);
    }).timeout(timeoutMs);
  });
});
