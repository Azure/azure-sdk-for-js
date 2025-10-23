// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, expect } from "vitest";
import { queryParamPolicy } from "../../src/internal/queryParamPolicy.js";
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
    const policy = queryParamPolicy();
    const request = createPipelineRequest({
      url: "https://example.azconfig.io/kv?api-version=2023-11-01&After=abcdefg&tags=tag3%3Dvalue3&key=*&label=dev&$Select=key&tags=tag2%3Dvalue2&tags=tag1%3Dvalue1",
    });
    const response = await policy.sendRequest(request, mockNext());
    const finalUrl = response.headers.get("url-lookup")!;
    expect(
      finalUrl.endsWith(
        "?$select=key&after=abcdefg&api-version=2023-11-01&key=*&label=dev&tags=tag3%3Dvalue3&tags=tag2%3Dvalue2&tags=tag1%3Dvalue1",
      ),
    ).toBe(true);
  });

  it("keeps original order of query parameters", async () => {
    const policy = queryParamPolicy();
    const request = createPipelineRequest({
      url: "https://example.azconfig.io/kv?tags=tag2&api-version=2023-11-01&tags=tag1",
    });
    const response = await policy.sendRequest(request, mockNext());
    const finalUrl = response.headers.get("url-lookup")!;
    expect(finalUrl.endsWith("?api-version=2023-11-01&tags=tag2&tags=tag1")).toBe(true);
  });
});
