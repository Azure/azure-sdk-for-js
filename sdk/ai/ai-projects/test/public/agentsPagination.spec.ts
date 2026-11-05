// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PathUncheckedResponse, RequestParameters } from "@azure-rest/core-client";
import { getClient } from "@azure-rest/core-client";
import type { PagedAsyncIterableIterator } from "@azure/core-paging";
import type { HttpClient, PipelineRequest } from "@azure/core-rest-pipeline";
import { createHttpHeaders, createPipelineRequest } from "@azure/core-rest-pipeline";
import { describe, expect, it, vi } from "vitest";
import type { AIProjectContext } from "../../src/api/index.js";
import { listVersions } from "../../src/api/agents/operations.js";
import { buildPagedAsyncIterator } from "../../src/static-helpers/pagingHelpers.js";

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

describe("cursor pagination direction", () => {
  function iterator(
    requests: PipelineRequest[],
    firstUrl: string,
    pages: { data: { id: string }[]; first_id: string; last_id: string; has_more: boolean }[],
    reverseBefore = true,
  ): PagedAsyncIterableIterator<{ id: string }> {
    const remaining = [...pages];
    const httpClient: HttpClient = {
      async sendRequest(request) {
        requests.push(request);
        const page = remaining.shift();
        if (!page) throw new Error("Unexpected pagination request");
        return {
          request,
          status: 200,
          headers: createHttpHeaders({ "content-type": "application/json" }),
          bodyAsText: JSON.stringify(page),
        };
      },
    };
    const client = getClient("https://example.com", { httpClient });
    return buildPagedAsyncIterator<{ id: string }>(
      client,
      () => client.pathUnchecked(firstUrl).get(),
      async (response) => response.body,
      ["200"],
      {
        itemName: "data",
        cursorFieldName: "last_id",
        firstCursorFieldName: reverseBefore ? "first_id" : undefined,
        hasMoreFieldName: "has_more",
        nextPageRequestOptions: { headers: { "x-unit-header": "kept" } },
      },
    );
  }

  const first = {
    data: [{ id: "item-3" }],
    first_id: "cursor-3",
    last_id: "cursor-4",
    has_more: true,
  };
  const last = {
    data: [{ id: "item-1" }],
    first_id: "cursor-1",
    last_id: "cursor-2",
    has_more: false,
  };

  it("advances before with first_id and never mixes after into a backward request", async () => {
    const requests: PipelineRequest[] = [];
    const pages = iterator(requests, "https://example.com/items?before=cursor-9&status=running", [
      first,
      last,
    ]).byPage();
    await pages.next();
    await pages.next();
    const next = new URL(requests[1].url);
    expect(next.searchParams.get("before")).toBe("cursor-3");
    expect(next.searchParams.has("after")).toBe(false);
    expect(next.searchParams.get("status")).toBe("running");
    expect(requests[1].headers.get("x-unit-header")).toBe("kept");
  });

  it("preserves backward direction when resuming from a continuation token", async () => {
    const initialRequests: PipelineRequest[] = [];
    const page = await iterator(initialRequests, "https://example.com/items?before=cursor-9", [
      first,
    ])
      .byPage()
      .next();
    const token = page.value?.continuationToken;
    expect(token).toBeDefined();
    const resumedRequests: PipelineRequest[] = [];
    const pages = iterator(resumedRequests, "https://example.com/unused", [last]).byPage({
      continuationToken: token,
    });
    await pages.next();
    const resumed = new URL(resumedRequests[0].url);
    expect(resumed.searchParams.get("before")).toBe("cursor-3");
    expect(resumed.searchParams.has("after")).toBe(false);
  });

  it("keeps forward requests advancing with last_id", async () => {
    const requests: PipelineRequest[] = [];
    const pages = iterator(requests, "https://example.com/items?after=cursor-0", [
      first,
      last,
    ]).byPage();
    await pages.next();
    await pages.next();
    expect(new URL(requests[1].url).searchParams.get("after")).toBe("cursor-4");
    expect(new URL(requests[1].url).searchParams.has("before")).toBe(false);
  });

  it("preserves the default bounded-forward behavior used by existing Foundry lists", async () => {
    const requests: PipelineRequest[] = [];
    const pages = iterator(
      requests,
      "https://example.com/items?before=cursor-9",
      [first, last],
      false,
    ).byPage();
    await pages.next();
    await pages.next();
    expect(new URL(requests[1].url).searchParams.get("before")).toBe("cursor-9");
    expect(new URL(requests[1].url).searchParams.get("after")).toBe("cursor-4");
  });
});
