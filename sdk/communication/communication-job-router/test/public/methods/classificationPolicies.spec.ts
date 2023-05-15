// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Recorder } from "@azure-tools/test-recorder";
import { assert } from "chai";
import { Context } from "mocha";
import { ClassificationPolicy, RouterAdministrationClient } from "../../../src";
import {
  getClassificationPolicyRequest,
  getDistributionPolicyRequest,
  getExceptionPolicyRequest,
  getQueueRequest,
} from "../utils/testData";
import { createRecordedRouterClientWithConnectionString } from "../../internal/utils/mockClient";
import { timeoutMs } from "../utils/constants";

describe("RouterClient", function () {
  let administrationClient: RouterAdministrationClient;
  let recorder: Recorder;

  const testRunId = "recorded-c-policies";

  const { distributionPolicyId, distributionPolicyRequest } =
    getDistributionPolicyRequest(testRunId);
  const { exceptionPolicyId, exceptionPolicyRequest } = getExceptionPolicyRequest(testRunId);
  const { queueId, queueRequest } = getQueueRequest(testRunId);
  const { classificationPolicyId, classificationPolicyRequest } =
    getClassificationPolicyRequest(testRunId);

  describe("Classification Policy Operations", function () {
    this.beforeEach(async function (this: Context) {
      ({ administrationClient, recorder } = await createRecordedRouterClientWithConnectionString(
        this
      ));

      await administrationClient.createDistributionPolicy(
        distributionPolicyId,
        distributionPolicyRequest
      );
      await administrationClient.createExceptionPolicy(exceptionPolicyId, exceptionPolicyRequest);
      await administrationClient.createQueue(queueId, queueRequest);
      await administrationClient.createClassificationPolicy(
        classificationPolicyId,
        classificationPolicyRequest
      );
    });

    this.afterEach(async function (this: Context) {
      await administrationClient.deleteClassificationPolicy(classificationPolicyId);
      await administrationClient.deleteQueue(queueId);
      await administrationClient.deleteExceptionPolicy(exceptionPolicyId);
      await administrationClient.deleteDistributionPolicy(distributionPolicyId);

      if (!this.currentTest?.isPending() && recorder) {
        await recorder.stop();
      }
    });

    it("should create a classification policy", async function () {
      const result = await administrationClient.createClassificationPolicy(
        classificationPolicyId,
        classificationPolicyRequest
      );

      assert.isDefined(result);
      assert.isDefined(result.id);
      assert.equal(result.name, classificationPolicyRequest.name);
    }).timeout(timeoutMs);

    it("should get a classification policy", async function () {
      const result = await administrationClient.getClassificationPolicy(classificationPolicyId);

      assert.equal(result.id, classificationPolicyId);
      assert.equal(result.name, classificationPolicyRequest.name);
    }).timeout(timeoutMs);

    it("should update a classification policy", async function () {
      const patch: ClassificationPolicy = { ...classificationPolicyRequest, name: "new name" };
      const result = await administrationClient.updateClassificationPolicy(
        classificationPolicyId,
        patch
      );

      assert.isDefined(result);
      assert.isDefined(result.id);
      assert.equal(result.name, patch.name);
    }).timeout(timeoutMs);

    it("should list classification policies", async function () {
      const result: ClassificationPolicy[] = [];
      for await (const policy of administrationClient.listClassificationPolicies({
        maxPageSize: 20,
      })) {
        result.push(policy.classificationPolicy!);
      }

      assert.isNotEmpty(result);
    }).timeout(timeoutMs);

    it("should delete a classification policy", async function () {
      const result = await administrationClient.deleteClassificationPolicy(classificationPolicyId);

      assert.isDefined(result);
    }).timeout(timeoutMs);
  });
});
