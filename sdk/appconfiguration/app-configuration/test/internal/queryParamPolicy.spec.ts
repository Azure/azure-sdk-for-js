// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, expect } from "vitest";
import { urlQueryParamNormalizationPolicy } from "../../src/internal/queryParamPolicy.js";
import { createPipelineRequest, createHttpHeaders } from "@azure/core-rest-pipeline";
import type { PipelineRequest, PipelineResponse } from "@azure/core-rest-pipeline";

function mockNext(returnStatus: number = 200) {
  return async (request: PipelineRequest): Promise<PipelineResponse> => {
    return {
      request,
      headers: createHttpHeaders({ "url-lookup": request.url }),
      status: returnStatus,
    } as PipelineResponse;
  };
}

describe("urlQueryParamsNormalizationPolicy", () => {
  it("normalizes query parameters", async () => {
    const policy = urlQueryParamNormalizationPolicy();
    const request = createPipelineRequest({
      url: "https://example.azconfig.io/kv?api-version=2023-11-01&After=abcdefg&key=*&label=dev&$Select=key",
    });
    const response = await policy.sendRequest(request, mockNext());
    const finalUrl = response.headers.get("url-lookup")!;
    expect(
      finalUrl.endsWith("?%24select=key&after=abcdefg&api-version=2023-11-01&key=*&label=dev"),
    ).toBe(true);
  });
});
