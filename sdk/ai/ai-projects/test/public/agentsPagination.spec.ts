// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PathUncheckedResponse, RequestParameters } from "@azure-rest/core-client";
import { createPipelineRequest } from "@azure/core-rest-pipeline";
import { describe, expect, it, vi } from "vitest";
import type { AIProjectContext } from "../../src/api/index.js";
import { listVersions } from "../../src/api/agents/operations.js";

function createContext(capturedNextPageOptions: RequestParameters[]): AIProjectContext {
  let pageNumber = 0;
  const createResponse = (): PathUncheckedResponse => {
    const isFirstPage = pageNumber++ === 0;
    return {
      request: createPipelineRequest({
        url: "https://example.com/agents/agent-1/versions?api-version=v1",
        method: "GET",
      }),
      headers: {},
      status: "200",
      body: {
        data: [],
        last_id: isFirstPage ? "cursor-1" : "cursor-2",
        has_more: isFirstPage,
      },
    };
  };

  return {
    apiVersion: "v1",
    endpoint: "https://example.com",
    path: () => ({
      get: () => Promise.resolve(createResponse()),
    }),
    pathUnchecked: () => ({
      get: (options?: RequestParameters) => {
        capturedNextPageOptions.push(options ?? {});
        return Promise.resolve(createResponse());
      },
    }),
  } as unknown as AIProjectContext;
}

describe("agent version pagination", () => {
  it("forwards request options to continuation requests", async () => {
    const capturedNextPageOptions: RequestParameters[] = [];
    const context = createContext(capturedNextPageOptions);
    const abortController = new AbortController();
    const onUploadProgress = vi.fn();
    const onDownloadProgress = vi.fn();
    const onResponse = vi.fn();
    const pages = listVersions(context, "agent-1", {
      abortSignal: abortController.signal,
      onResponse,
      foundryFeatures: "DraftAgents=V1Preview",
      requestOptions: {
        timeout: 1234,
        onUploadProgress,
        onDownloadProgress,
        headers: {
          "x-custom-header": "custom-value",
        },
      },
    }).byPage();

    await pages.next();
    await pages.next();

    expect(capturedNextPageOptions).toHaveLength(1);
    expect(capturedNextPageOptions[0]).toMatchObject({
      abortSignal: abortController.signal,
      timeout: 1234,
      onUploadProgress,
      onDownloadProgress,
      onResponse,
      headers: {
        "foundry-features": "DraftAgents=V1Preview",
        "x-custom-header": "custom-value",
      },
    });
  });
});
