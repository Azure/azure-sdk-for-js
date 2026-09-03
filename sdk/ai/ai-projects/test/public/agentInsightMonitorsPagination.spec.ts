// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  OperationOptions,
  PathUncheckedResponse,
  RequestParameters,
} from "@azure-rest/core-client";
import { createPipelineRequest } from "@azure/core-rest-pipeline";
import { describe, expect, it, vi } from "vitest";
import type { AIProjectContext } from "../../src/api/index.js";
import {
  list,
  listInsights,
  listRuns,
} from "../../src/api/beta/agentInsightMonitors/operations.js";

type ListFactory = (
  context: AIProjectContext,
  options: OperationOptions,
) => {
  byPage(): AsyncIterableIterator<unknown>;
};

const listFactories: Record<string, ListFactory> = {
  monitors: (context, options) => list(context, options),
  runs: (context, options) => listRuns(context, "monitor-1", options),
  insights: (context, options) => listInsights(context, "monitor-1", options),
};

function createContext(capturedNextPageOptions: RequestParameters[]): AIProjectContext {
  let pageNumber = 0;
  const createResponse = (): PathUncheckedResponse => {
    const isFirstPage = pageNumber++ === 0;
    return {
      request: createPipelineRequest({
        url: "https://example.com/agent-insight-monitors?api-version=v1",
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

describe("Agent Insights pagination", () => {
  for (const [name, createIterator] of Object.entries(listFactories)) {
    it(`forwards request options to ${name} continuation requests`, async () => {
      const capturedNextPageOptions: RequestParameters[] = [];
      const context = createContext(capturedNextPageOptions);
      const abortController = new AbortController();
      const onUploadProgress = vi.fn();
      const onDownloadProgress = vi.fn();
      const onResponse = vi.fn();
      const pages = createIterator(context, {
        abortSignal: abortController.signal,
        onResponse,
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
          "foundry-features": "AgentInsights=V1Preview",
          "x-custom-header": "custom-value",
        },
      });
    });
  }
});
