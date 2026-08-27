// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { HttpClient } from "@azure/core-rest-pipeline";
import { createHttpHeaders, createPipelineRequest } from "@azure/core-rest-pipeline";
import { describe, it, assert } from "vitest";
import { getCoreClientOptions, newPipeline } from "../../src/Pipeline.js";
import { SDK_VERSION } from "../../src/utils/constants.js";

describe("Pipeline", () => {
  it("uses the core v1 user agent prefix", async () => {
    let userAgent: string | undefined;
    const httpClient: HttpClient = {
      async sendRequest(request) {
        userAgent = request.headers.get("user-agent");
        return { request, status: 200, headers: createHttpHeaders() };
      },
    };
    const options = getCoreClientOptions(
      newPipeline(undefined, {
        userAgentOptions: { userAgentPrefix: "custom-prefix" },
      }),
    );

    await options.pipeline!.sendRequest(
      httpClient,
      createPipelineRequest({ url: "https://example.com" }),
    );

    assert.ok(userAgent?.startsWith(`custom-prefix azsdk-js-storagedatalake/${SDK_VERSION}`));
  });
});
