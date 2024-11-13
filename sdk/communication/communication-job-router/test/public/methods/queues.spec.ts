// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder } from "@azure-tools/test-recorder";
import type { RouterQueue, JobRouterAdministrationClient } from "../../../src/index.js";
import {
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

  const testRunId = "recorded-queues";

  const { distributionPolicyId, distributionPolicyRequest } =
    getDistributionPolicyRequest(testRunId);
  const { exceptionPolicyId, exceptionPolicyRequest } = getExceptionPolicyRequest(testRunId);
  const { queueId, queueRequest } = getQueueRequest(testRunId);

  describe("Queue Operations", () => {
    beforeEach(async (ctx) => {
      ({ administrationClient, recorder } =
        await createRecordedRouterClientWithConnectionString(ctx));

      await administrationClient.createDistributionPolicy(
        distributionPolicyId,
        distributionPolicyRequest,
      );
      await administrationClient.createExceptionPolicy(exceptionPolicyId, exceptionPolicyRequest);
      await administrationClient.createQueue(queueId, queueRequest);
    });

    afterEach(async (ctx) => {
      await administrationClient.deleteQueue(queueId);
      await administrationClient.deleteExceptionPolicy(exceptionPolicyId);
      await administrationClient.deleteDistributionPolicy(distributionPolicyId);

      if (!ctx.task.pending && recorder) {
        await recorder.stop();
      }
    });

    it("should create a queue", { timeout: timeoutMs }, async () => {
      const result = await administrationClient.createQueue(queueId, queueRequest);

      assert.isDefined(result);
      assert.isDefined(result?.id);
      assert.equal(result.name, queueRequest.name);
    });

    it("should get a queue", { timeout: timeoutMs }, async () => {
      const result = await administrationClient.getQueue(queueId);

      assert.equal(result.id, queueId);
      assert.equal(result.name, queueRequest.name);
    });

    it("should update a queue", { timeout: timeoutMs }, async () => {
      const updatePatch = { ...queueRequest, name: "new-name" };
      const updateResult = await administrationClient.updateQueue(queueId, updatePatch);

      const removePatch = { ...queueRequest, name: null! };
      const removeResult = await administrationClient.updateQueue(queueId, removePatch);

      assert.isDefined(updateResult);
      assert.isDefined(updateResult.id);
      assert.isDefined(removeResult);
      assert.isDefined(removeResult.id);
      assert.equal(updateResult.name, updatePatch.name);
      assert.isUndefined(removeResult.name);
    });

    it("should list queues", { timeout: timeoutMs }, async () => {
      const result: RouterQueue[] = [];
      for await (const queue of administrationClient.listQueues({ maxPageSize: 20 })) {
        result.push(queue.queue!);
      }

      assert.isNotEmpty(result);
    });

    it("should delete a queue", { timeout: timeoutMs }, async () => {
      const result = await administrationClient.deleteQueue(queueId);

      assert.isDefined(result);
    });
  });
});
