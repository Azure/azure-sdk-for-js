// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert, vi } from "vitest";
import { DEFAULT_RETRY_POLICY_COUNT } from "../src/constants.js";
import { PipelinePolicy } from "../src/pipeline.js";
import { createHttpHeaders } from "../src/httpHeaders.js";
import { createPipelineFromOptions } from "../src/createPipelineFromOptions.js";
import { createPipelineRequest } from "../src/pipelineRequest.js";
import { isNodeLike } from "../src/util/checkEnvironment.js";

describe("defaultLogPolicy", function () {
  it("should be invoked on every retry", async function () {
    const request = createPipelineRequest({
      url: "https://bing.com",
    });

    const testSignPolicy: PipelinePolicy = {
      name: "testSignPolicy",
      sendRequest: async function (req, next) {
        const response = await next(req);
        return response;
      },
    };

    const pipeline = createPipelineFromOptions({
      retryOptions: { maxRetryDelayInMs: 0 },
    });
    pipeline.addPolicy(testSignPolicy, { phase: "Sign" });

    const orderedPolicies = pipeline.getOrderedPolicies();

    const expectedOrderedPolicies = isNodeLike ? ["proxyPolicy", "decompressResponsePolicy"] : [];
    expectedOrderedPolicies.push(
      "formDataPolicy",
      "userAgentPolicy",
      "multipartPolicy",
      "defaultRetryPolicy",
      "tracingPolicy",
    );
    if (isNodeLike) {
      expectedOrderedPolicies.push("redirectPolicy");
    }
    expectedOrderedPolicies.push("testSignPolicy", "logPolicy");
    assert.deepEqual(
      orderedPolicies.map((policy) => policy.name),
      expectedOrderedPolicies,
    );

    const order: string[] = [];
    for (const policy of orderedPolicies) {
      const originalSendRequest = policy.sendRequest;
      vi.spyOn(policy, "sendRequest").mockImplementation(async function (req, next) {
        order.push(policy.name);
        return originalSendRequest(req, next);
      });
    }

    await pipeline.sendRequest(
      {
        sendRequest: async function (req) {
          return { headers: createHttpHeaders(), request: req, status: 500 };
        },
      },
      request,
    );

    const expectedOrder: string[] = orderedPolicies.map((policy) => policy.name);
    const repeatedPolicies = expectedOrder.slice(expectedOrder.indexOf("tracingPolicy"));
    for (let i = 0; i < DEFAULT_RETRY_POLICY_COUNT; i++) {
      expectedOrder.push(...repeatedPolicies);
    }
    assert.deepEqual(order, expectedOrder);
  });
});
