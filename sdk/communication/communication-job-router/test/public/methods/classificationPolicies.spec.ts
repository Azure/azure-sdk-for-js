// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder } from "@azure-tools/test-recorder";
import type { ClassificationPolicy, JobRouterAdministrationClient } from "../../../src/index.js";
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
  let administrationClient: JobRouterAdministrationClient;
  let recorder: Recorder;

  const testRunId = "recorded-c-policies";

  const { distributionPolicyId, distributionPolicyRequest } =
    getDistributionPolicyRequest(testRunId);
  const { exceptionPolicyId, exceptionPolicyRequest } = getExceptionPolicyRequest(testRunId);
  const { queueId, queueRequest } = getQueueRequest(testRunId);
  const { classificationPolicyId, classificationPolicyRequest } =
    getClassificationPolicyRequest(testRunId);

  describe("Classification Policy Operations", () => {
    beforeEach(async (ctx) => {
      ({ administrationClient, recorder } =
        await createRecordedRouterClientWithConnectionString(ctx));

      await administrationClient.createDistributionPolicy(
        distributionPolicyId,
        distributionPolicyRequest,
      );
      await administrationClient.createExceptionPolicy(exceptionPolicyId, exceptionPolicyRequest);
      await administrationClient.createQueue(queueId, queueRequest);
      await administrationClient.createClassificationPolicy(
        classificationPolicyId,
        classificationPolicyRequest,
      );
    });

    afterEach(async (ctx) => {
      await administrationClient.deleteClassificationPolicy(classificationPolicyId);
      await administrationClient.deleteQueue(queueId);
      await administrationClient.deleteExceptionPolicy(exceptionPolicyId);
      await administrationClient.deleteDistributionPolicy(distributionPolicyId);

      if (!ctx.task.pending && recorder) {
        await recorder.stop();
      }
    });

    it("should create a classification policy", { timeout: timeoutMs }, async () => {
      const result = await administrationClient.createClassificationPolicy(
        classificationPolicyId,
        classificationPolicyRequest,
      );

      assert.isDefined(result);
      assert.isDefined(result.id);
      assert.equal(result.name, classificationPolicyRequest.name);
    });

    it("should get a classification policy", { timeout: timeoutMs }, async () => {
      const result = await administrationClient.getClassificationPolicy(classificationPolicyId);

      assert.equal(result.id, classificationPolicyId);
      assert.equal(result.name, classificationPolicyRequest.name);
    });

    it("should update a classification policy", { timeout: timeoutMs }, async () => {
      const updatePatch = { ...classificationPolicyRequest, name: "new name" };
      const updateResult = await administrationClient.updateClassificationPolicy(
        classificationPolicyId,
        updatePatch,
      );

      const removePatch = { ...classificationPolicyRequest, name: null! };
      const removeResult = await administrationClient.updateClassificationPolicy(
        classificationPolicyId,
        removePatch,
      );

      assert.isDefined(updateResult);
      assert.isDefined(updateResult.id);
      assert.isDefined(removeResult);
      assert.isDefined(removeResult.id);
      assert.equal(updatePatch.name, updateResult.name);
      assert.isUndefined(removeResult.name);
    });

    it("should list classification policies", async () => {
      const result: ClassificationPolicy[] = [];
      for await (const policy of administrationClient.listClassificationPolicies({
        maxPageSize: 20,
      })) {
        result.push(policy.classificationPolicy!);
      }

      assert.isNotEmpty(result);
    });

    it("should delete a classification policy", { timeout: timeoutMs }, async () => {
      const result = await administrationClient.deleteClassificationPolicy(classificationPolicyId);

      assert.isDefined(result);
    });
  });
});
