// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import { createPipelineFromOptions } from "../src/createPipelineFromOptions";
import { PipelinePolicy } from "../src/pipeline";
import { createPipelineRequest } from "../src/pipelineRequest";
import { createHttpHeaders } from "../src/httpHeaders";
import sinon from "sinon";
import { DEFAULT_RETRY_POLICY_COUNT } from "../src/constants";

describe("defaultLogPolicy", function () {
  it("should be invoked on every retry", async function () {
    const request = createPipelineRequest({
      url: "https://bing.com",
    });

    let testSignPolicy: PipelinePolicy = {
      name: "testSignPolicy",
      sendRequest: async function (request, next) {
        let response = await next(request);
        return response;
      },
    };

    let pipeline = createPipelineFromOptions({
      retryOptions: { maxRetryDelayInMs: 0 },
    });
    pipeline.addPolicy(testSignPolicy, { phase: "Sign" });

    let orderedPolicies = pipeline.getOrderedPolicies();
    assert.deepEqual(
      orderedPolicies.map((policy) => policy.name),
      [
        "proxyPolicy",
        "decompressResponsePolicy",
        "formDataPolicy",
        "userAgentPolicy",
        "setClientRequestIdPolicy",
        "defaultRetryPolicy",
        "tracingPolicy",
        "redirectPolicy",
        "testSignPolicy",
        "logPolicy",
      ]
    );

    let order: string[] = [];
    orderedPolicies.map((policy) => {
      let wrappedMethod = policy.sendRequest;
      sinon.stub(policy, "sendRequest").callsFake(async function (request, next) {
        order.push(policy.name);
        return wrappedMethod(request, next);
      });
    });

    await pipeline.sendRequest(
      {
        sendRequest: async function (request) {
          return { headers: createHttpHeaders(), request, status: 500 };
        },
      },
      request
    );

    let expectedOrder = [
      "proxyPolicy",
      "decompressResponsePolicy",
      "formDataPolicy",
      "userAgentPolicy",
      "setClientRequestIdPolicy",
      "defaultRetryPolicy",
    ];
    for (let i = 0; i < DEFAULT_RETRY_POLICY_COUNT + 1; i++) {
      for (let policy of ["tracingPolicy", "redirectPolicy", "testSignPolicy", "logPolicy"]) {
        expectedOrder.push(policy);
      }
    }

    assert.deepEqual(order, expectedOrder);
  });
});
