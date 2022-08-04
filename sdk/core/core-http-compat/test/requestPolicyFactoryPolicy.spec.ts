// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "@azure/test-utils";
import {
  HttpClient,
  createEmptyPipeline,
  createHttpHeaders,
  createPipelineRequest,
} from "@azure/core-rest-pipeline";
import { createRequestPolicyFactoryPolicy } from "../src/policies/requestPolicyFactoryPolicy";
import { mutateRequestPolicy, mutateResponsePolicy } from "./testPolicies";

describe("requestPolicyFactoryPolicy", function () {
  const testHttpClient: HttpClient = {
    sendRequest: async (request) => {
      return {
        request,
        headers: createHttpHeaders({ "server-header": "some-value" }),
        status: 200,
      };
    },
  };
  it("should preserve changes to headers in the request", async function () {
    const policy = createRequestPolicyFactoryPolicy([
      mutateRequestPolicy({ headersToSet: { "x-ms-test": "testValue" } }),
    ]);
    const pipeline = createEmptyPipeline();
    pipeline.addPolicy(policy);
    const result = await pipeline.sendRequest(
      testHttpClient,
      createPipelineRequest({ url: "test" })
    );
    assert.strictEqual(result.headers.get("server-header"), "some-value");
    assert.strictEqual(result.request.headers.get("x-ms-test"), "testValue");
  });

  it("should preserve changes to headers in the response", async function () {
    const policy = createRequestPolicyFactoryPolicy([
      mutateResponsePolicy({ headersToSet: { "x-ms-test": "testValue" } }),
    ]);
    const pipeline = createEmptyPipeline();
    pipeline.addPolicy(policy);
    const result = await pipeline.sendRequest(
      testHttpClient,
      createPipelineRequest({ url: "test" })
    );
    assert.strictEqual(result.headers.get("server-header"), "some-value");
    assert.strictEqual(result.headers.get("x-ms-test"), "testValue");
  });

  it("should preserve changes made to both request and response", async function () {
    const policy = createRequestPolicyFactoryPolicy([
      mutateRequestPolicy({
        headersToSet: { "x-ms-test": "request" },
        url: "test2",
        timeout: 9000,
      }),
      mutateResponsePolicy({ headersToSet: { "x-ms-test": "response" } }),
    ]);
    const pipeline = createEmptyPipeline();
    pipeline.addPolicy(policy);
    const result = await pipeline.sendRequest(
      testHttpClient,
      createPipelineRequest({ url: "test" })
    );
    assert.strictEqual(result.request.url, "test2");
    assert.strictEqual(result.request.timeout, 9000);
    assert.strictEqual(result.request.headers.get("x-ms-test"), "request");
    assert.strictEqual(result.headers.get("server-header"), "some-value");
    assert.strictEqual(result.headers.get("x-ms-test"), "response");
  });
});
