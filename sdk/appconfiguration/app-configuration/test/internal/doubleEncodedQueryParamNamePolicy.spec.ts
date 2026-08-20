// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PipelineRequest, PipelineResponse } from "@azure/core-rest-pipeline";
import { createHttpHeaders, createPipelineRequest } from "@azure/core-rest-pipeline";
import { describe, expect, it } from "vitest";
import { doubleEncodedQueryParamNamePolicy } from "../../src/internal/doubleEncodedQueryParamNamePolicy.js";

function mockNext(request: PipelineRequest): Promise<PipelineResponse> {
  return Promise.resolve({
    request,
    headers: createHttpHeaders({ "url-lookup": request.url }),
    status: 200,
  });
}

describe("doubleEncodedQueryParamNamePolicy", () => {
  it("removes double encoding from query parameter names", async () => {
    const request = createPipelineRequest({
      url: "https://example.azconfig.io/labels?%2524Select=name&api-version=2026-05-01-preview",
    });

    const response = await doubleEncodedQueryParamNamePolicy().sendRequest(request, mockNext);

    expect(response.headers.get("url-lookup")).toBe(
      "https://example.azconfig.io/labels?%24Select=name&api-version=2026-05-01-preview",
    );
  });

  it("does not change encoded query parameter values", async () => {
    const request = createPipelineRequest({
      url: "https://example.azconfig.io/kv?key=%2524value",
    });

    const response = await doubleEncodedQueryParamNamePolicy().sendRequest(request, mockNext);

    expect(response.headers.get("url-lookup")).toBe(
      "https://example.azconfig.io/kv?key=%2524value",
    );
  });
});
