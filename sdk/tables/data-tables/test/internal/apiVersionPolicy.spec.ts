// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { HttpClient, PipelineRequest } from "@azure/core-rest-pipeline";
import { createEmptyPipeline, createHttpHeaders } from "@azure/core-rest-pipeline";
import { apiVersionPolicy } from "$internal/utils/apiVersionPolicy.js";
import { describe, it, assert } from "vitest";

describe("apiVersionPolicy", () => {
  it("should override the default api-version", async () => {
    const expectedVersion = "2020-12-06";
    const fakeClient: HttpClient = {
      async sendRequest(req) {
        assert.equal(req.headers.get("x-ms-version"), expectedVersion);
        return {
          headers: createHttpHeaders(),
          status: 200,
          request: req,
        };
      },
    };
    const pipeline = createEmptyPipeline();
    const policy = apiVersionPolicy(expectedVersion);
    pipeline.addPolicy(policy);
    const req: PipelineRequest = {
      headers: createHttpHeaders({ "x-ms-version": "2019-12-12" }),
      method: "GET",
      url: "https://localhost",
      requestId: "",
      timeout: 10000,
      withCredentials: false,
    };
    await pipeline.sendRequest(fakeClient, req);
  });
});
