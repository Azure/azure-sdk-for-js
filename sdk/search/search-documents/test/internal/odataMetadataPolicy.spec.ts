// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { assert, describe, it } from "vitest";
import { createHttpHeaders, createPipelineRequest } from "@azure/core-rest-pipeline";
import type { PipelineRequest, PipelineResponse } from "@azure/core-rest-pipeline";
import { createOdataMetadataPolicy } from "../../src/odataMetadataPolicy.js";

async function captureRequest(request: PipelineRequest): Promise<PipelineResponse> {
  return {
    request,
    status: 200,
    headers: createHttpHeaders(),
  };
}

describe("OData metadata policy", () => {
  it("preserves the SSE Accept header", async () => {
    const request = createPipelineRequest({
      url: "https://example.search.windows.net",
      headers: createHttpHeaders({ Accept: "Text/Event-Stream; charset=utf-8" }),
    });

    const response = await createOdataMetadataPolicy("none").sendRequest(request, captureRequest);

    assert.equal(response.request.headers.get("Accept"), "Text/Event-Stream; charset=utf-8");
  });

  it("sets the configured OData metadata level for JSON requests", async () => {
    const request = createPipelineRequest({
      url: "https://example.search.windows.net",
      headers: createHttpHeaders({ Accept: "application/json" }),
    });

    const response = await createOdataMetadataPolicy("minimal").sendRequest(
      request,
      captureRequest,
    );

    assert.equal(response.request.headers.get("Accept"), "application/json;odata.metadata=minimal");
  });
});
