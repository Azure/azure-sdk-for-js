// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Recorder } from "@azure-tools/test-recorder";
import { ExceptionPolicy, JobRouterAdministrationClient } from "../../../src";
import { assert } from "chai";
import { createRecordedRouterClientWithConnectionString } from "../../internal/utils/mockClient";
import { Context } from "mocha";
import { getExceptionPolicyRequest } from "../utils/testData";
import { timeoutMs } from "../utils/constants";

describe("JobRouterClient", function () {
  let administrationClient: JobRouterAdministrationClient;
  let recorder: Recorder;

  const testRunId = "recorded-e-policies";

  const { exceptionPolicyId, exceptionPolicyRequest } = getExceptionPolicyRequest(testRunId);

  describe("Exception Policy Operations", function () {
    this.beforeEach(async function (this: Context) {
      ({ administrationClient, recorder } =
        await createRecordedRouterClientWithConnectionString(this));
    });

    this.afterEach(async function (this: Context) {
      if (!this.currentTest?.isPending() && recorder) {
        await recorder.stop();
      }
    });

    it("should create an exception policy", async function () {
      const result = await administrationClient.createExceptionPolicy(
        exceptionPolicyId,
        exceptionPolicyRequest,
      );

      assert.isDefined(result);
      assert.isDefined(result?.id);
      assert.equal(result.name, exceptionPolicyRequest.name);
    }).timeout(timeoutMs);

    it("should get an exception policy", async function () {
      const result = await administrationClient.getExceptionPolicy(exceptionPolicyId);

      assert.equal(result.id, exceptionPolicyId);
      assert.equal(result.name, exceptionPolicyRequest.name);
      assert.deepEqual(result.exceptionRules, exceptionPolicyRequest.exceptionRules);
    }).timeout(timeoutMs);

    it("should update an exception policy", async function () {
      const updatePatch = { ...exceptionPolicyRequest, name: "new-name" };
      const updateResult = await administrationClient.updateExceptionPolicy(
        exceptionPolicyId,
        updatePatch,
      );

      const removePatch = { ...exceptionPolicyRequest, name: null! };
      const removeResult = await administrationClient.updateExceptionPolicy(
        exceptionPolicyId,
        removePatch,
      );

      assert.isDefined(updateResult);
      assert.isDefined(updateResult.id);
      assert.isDefined(removeResult);
      assert.isDefined(removeResult.id);
      assert.equal(updateResult.name, updatePatch.name);
      assert.isUndefined(removeResult.name);
    }).timeout(timeoutMs);

    it("should list exception policies", async function () {
      const result: ExceptionPolicy[] = [];
      for await (const policy of administrationClient.listExceptionPolicies({ maxPageSize: 20 })) {
        result.push(policy.exceptionPolicy!);
      }

      assert.isNotEmpty(result);
    }).timeout(timeoutMs);

    it("should delete an exception policy", async function () {
      const result = await administrationClient.deleteExceptionPolicy(exceptionPolicyId);

      assert.isDefined(result);
    }).timeout(timeoutMs);
  });
});
