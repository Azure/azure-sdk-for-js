// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder } from "@azure-tools/test-recorder";
import type {
  AzureCommunicationRoutingServiceClient,
  ExceptionPolicyOutput,
} from "@azure-rest/communication-job-router";
import { paginate } from "@azure-rest/communication-job-router";
import { getExceptionPolicyRequest } from "../utils/testData.js";
import { createRecordedRouterClientWithConnectionString } from "../../internal/utils/mockClient.js";
import { timeoutMs } from "../utils/constants.js";
import { describe, it, assert, beforeEach, afterEach } from "vitest";

describe("JobRouterClient", () => {
  let routerClient: AzureCommunicationRoutingServiceClient;
  let recorder: Recorder;

  const testRunId = "recorded-d-policies";

  const { exceptionPolicyIdForCreationAndDeletionTest, exceptionPolicyRequest } =
    getExceptionPolicyRequest(testRunId);

  describe("exception Policy Operations", () => {
    beforeEach(async (ctx) => {
      ({ routerClient, recorder } = await createRecordedRouterClientWithConnectionString(ctx));
    });

    afterEach(async () => {
      await recorder.stop();
    });

    it("should create a exception policy", { timeout: timeoutMs }, async () => {
      // TODO. we have a transient bug for creating existed exception policy return 400, try rotate the id for Record testing if this fails
      const response = await routerClient
        .path(
          "/routing/exceptionPolicies/{exceptionPolicyId}",
          exceptionPolicyIdForCreationAndDeletionTest,
        )
        .patch({
          contentType: "application/merge-patch+json",
          body: exceptionPolicyRequest,
        });

      if (response.status !== "201") {
        throw new Error("request fails");
      }
      const result = response.body as ExceptionPolicyOutput;

      assert.isDefined(result);
      assert.isDefined(result?.id);
      assert.equal(result.name, exceptionPolicyRequest.name);
    });

    it("should get a exception policy", { timeout: timeoutMs }, async () => {
      const response = await routerClient
        .path(
          "/routing/exceptionPolicies/{exceptionPolicyId}",
          exceptionPolicyIdForCreationAndDeletionTest,
        )
        .get();

      if (response.status !== "200") {
        throw new Error("request fails");
      }
      const result = response.body as ExceptionPolicyOutput;

      assert.equal(result.id, exceptionPolicyIdForCreationAndDeletionTest);
      assert.equal(result.name, exceptionPolicyRequest.name);
      // TODO. Minor. need to fix "id" in actions in exceptionRules on service repo
      // assert.deepEqual(result.exceptionRules, exceptionPolicyRequest.exceptionRules);
    });

    it("should update a exception policy", { timeout: timeoutMs }, async () => {
      const updatePatch = { ...exceptionPolicyRequest, name: "new-name" };
      let response = await routerClient
        .path(
          "/routing/exceptionPolicies/{exceptionPolicyId}",
          exceptionPolicyIdForCreationAndDeletionTest,
        )
        .patch({
          contentType: "application/merge-patch+json",
          body: updatePatch,
        });

      if (response.status !== "200") {
        throw new Error("request fails");
      }
      const updateResult = response.body as ExceptionPolicyOutput;

      const removePatch = { ...exceptionPolicyRequest, name: null! };
      response = await routerClient
        .path(
          "/routing/exceptionPolicies/{exceptionPolicyId}",
          exceptionPolicyIdForCreationAndDeletionTest,
        )
        .patch({
          contentType: "application/merge-patch+json",
          body: removePatch,
        });

      if (response.status !== "200") {
        throw new Error("request fails");
      }
      const removeResult = response.body as ExceptionPolicyOutput;

      assert.isDefined(updateResult);
      assert.isDefined(updateResult.id);
      assert.isDefined(removeResult);
      assert.isDefined(removeResult.id);
      assert.equal(updateResult.name, updatePatch.name);
      assert.isUndefined(removeResult.name);
    });

    it("should list exception policies", { timeout: timeoutMs }, async () => {
      const result: ExceptionPolicyOutput[] = [];
      const response = await routerClient
        .path("/routing/exceptionPolicies")
        .get({ queryParameters: { maxpagesize: 20 } });

      if (response.status === "200") {
        // The paginate helper creates a paged async iterator using metadata from the first page.
        const items = paginate(routerClient, response);

        // We get an PageableAsyncIterator so we need to do `for await`.
        for await (const item of items) {
          result.push(item as ExceptionPolicyOutput);
        }
      }

      assert.isNotEmpty(result);
    });

    it("should delete a exception policy", { timeout: timeoutMs }, async () => {
      const response = await routerClient
        .path(
          "/routing/exceptionPolicies/{exceptionPolicyId}",
          exceptionPolicyIdForCreationAndDeletionTest,
        )
        .delete();

      if (response.status !== "204") {
        throw new Error("request fails");
      }

      assert.isDefined(response);
    });
  });
});
