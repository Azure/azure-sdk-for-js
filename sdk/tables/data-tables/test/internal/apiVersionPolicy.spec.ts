// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  HttpClient,
  PipelineRequest,
  createEmptyPipeline,
  createHttpHeaders,
} from "@azure/core-rest-pipeline";
import { apiVersionPolicy } from "../../src/utils/apiVersionPolicy";
import { assert } from "chai";

describe("apiVersionPolicy", function () {
  it("should override the default api-version", async function () {
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
