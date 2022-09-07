// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Recorder } from "@azure-tools/test-recorder";
import { assert } from "chai";
import { Context } from "mocha";
import { DistributionPolicy, RouterAdministrationClient } from "../../../src";
import { distributionPolicyRequest } from "../utils/testData";
import { createRecordedRouterClientWithConnectionString } from "../../internal/utils/mockClient";
import { timeoutMs } from "../utils/constants";

describe("RouterClient", function() {
  let recorder: Recorder;
  let administrationClient: RouterAdministrationClient;
  let request: DistributionPolicy = distributionPolicyRequest;

  describe("Distribution Policy Operations", function() {
    this.beforeAll(async function(this: Context) {
      ({ administrationClient, recorder } = await createRecordedRouterClientWithConnectionString(this));
    });

    afterEach(async function(this: Context) {
      if (!this.currentTest?.isPending() && recorder) {
        // unused
      }

      await administrationClient.deleteDistributionPolicy(distributionPolicyRequest.id!);
    });

    it("should create a distribution policy", async function() {
      const result = await administrationClient.createDistributionPolicy(request.id!, request);

      assert.isDefined(result);
      assert.isDefined(result?.id);
      assert.equal(result.name, request.name);
    }).timeout(timeoutMs);

    it("should get a distribution policy", async function() {
      const response: DistributionPolicy = await administrationClient.createDistributionPolicy(
        request.id!,
        request
      );

      const result = await administrationClient.getDistributionPolicy(request.id!);

      assert.equal(result.id, response.id);
      assert.equal(result.name, response.name);
      assert.equal(result.offerTtlInSeconds, response.offerTtlInSeconds);
      assert.deepEqual(result.mode, response.mode);
    }).timeout(timeoutMs);

    it("should update a distribution policy", async function() {
      var response: DistributionPolicy = await administrationClient.createDistributionPolicy(
        request.id!,
        request
      );

      const patch: DistributionPolicy = { ...response, name: "new name" };
      const result = await administrationClient.updateDistributionPolicy(response.id!, patch);

      assert.isDefined(result);
      assert.isDefined(result.id);
      assert.equal(result.name, patch.name);
    }).timeout(timeoutMs);

    it("should delete a distribution policy", async function() {
      const response: DistributionPolicy = await administrationClient.createDistributionPolicy(
        request.id!,
        request
      );

      const result = await administrationClient.deleteDistributionPolicy(response.id!, {});

      assert.isDefined(result);
    }).timeout(timeoutMs);

    it("should list distribution policies", async function() {
      await administrationClient.createDistributionPolicy(request.id!, request);

      const result = await administrationClient.listDistributionPolicies({
        maxPageSize: 1
      });

      assert.isNotNull(result.next());
      assert.isNotNull(result.next());
    }).timeout(timeoutMs);
  });
});
