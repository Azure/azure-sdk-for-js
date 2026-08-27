// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { HttpClient, Pipeline as CorePipeline } from "@azure/core-rest-pipeline";
import { createHttpHeaders, createPipelineRequest } from "@azure/core-rest-pipeline";
import { describe, it, assert } from "vitest";
import { getCoreClientOptions, newPipeline } from "../../src/Pipeline.js";
import { DataLakeServiceClient } from "../../src/DataLakeServiceClient.js";
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

  it("uses the data lake user agent prefix for requests from public clients", async () => {
    let userAgent: string | undefined;
    const httpClient: HttpClient = {
      async sendRequest(request) {
        userAgent = request.headers.get("user-agent");
        return { request, status: 200, headers: createHttpHeaders() };
      },
    };

    const pipeline = newPipeline(undefined, {
      userAgentOptions: { userAgentPrefix: "custom-prefix" },
    });
    // Constructing a public Data Lake client seeds the shared core (V2) pipeline. It must be
    // initialized with the Data Lake package details rather than the inner Blob client's, so
    // that requests carry azsdk-js-storagedatalake instead of azsdk-js-storageblob.
    new DataLakeServiceClient("https://myaccount.dfs.core.windows.net", pipeline);

    const corePipeline = (pipeline as unknown as { _corePipeline: CorePipeline })._corePipeline;
    await corePipeline.sendRequest(
      httpClient,
      createPipelineRequest({ url: "https://example.com" }),
    );

    assert.ok(
      userAgent?.startsWith(`custom-prefix azsdk-js-storagedatalake/${SDK_VERSION}`),
      `Expected the data lake user agent prefix but got: ${userAgent}`,
    );
  });
});
