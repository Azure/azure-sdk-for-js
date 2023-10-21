// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { DEFAULT_RETRY_POLICY_COUNT } from "../src/constants";
import { PipelinePolicy } from "../src/pipeline";
import { assert } from "chai";
import { createHttpHeaders } from "../src/httpHeaders";
import { createPipelineFromOptions } from "../src/createPipelineFromOptions";
import { createPipelineRequest } from "../src/pipelineRequest";
import { isNode } from "../src/util/checkEnvironment";
import sinon from "sinon";

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

    const expectedOrderedPolicies = isNode ? ["proxyPolicy", "decompressResponsePolicy"] : [];
    expectedOrderedPolicies.push(
      "formDataPolicy",
      "userAgentPolicy",
      "defaultRetryPolicy",
      "tracingPolicy"
    );
    if (isNode) {
      expectedOrderedPolicies.push("redirectPolicy");
    }
    expectedOrderedPolicies.push("testSignPolicy", "logPolicy");
    assert.deepEqual(
      orderedPolicies.map((policy) => policy.name),
      expectedOrderedPolicies
    );

    const order: string[] = [];
    for (const policy of orderedPolicies) {
      const stub = sinon.stub(policy, "sendRequest").callsFake(async function (req, next) {
        order.push(policy.name);
        return stub.wrappedMethod(req, next);
      });
    }

    await pipeline.sendRequest(
      {
        sendRequest: async function (req) {
          return { headers: createHttpHeaders(), request: req, status: 500 };
        },
      },
      request
    );

    const expectedOrder: string[] = orderedPolicies.map((policy) => policy.name);
    const repeatedPolicies = expectedOrder.slice(expectedOrder.indexOf("tracingPolicy"));
    for (let i = 0; i < DEFAULT_RETRY_POLICY_COUNT; i++) {
      expectedOrder.push(...repeatedPolicies);
    }
    assert.deepEqual(order, expectedOrder);
  });
});
