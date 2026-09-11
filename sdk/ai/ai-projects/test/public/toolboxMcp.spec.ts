// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { HttpClient, PipelineRequest } from "@azure/core-rest-pipeline";
import { createHttpHeaders } from "@azure/core-rest-pipeline";
import { describe, expect, it, vi } from "vitest";
import { AIProjectClient } from "../../src/index.js";

function createClient(
  body: unknown,
  status = 200,
): {
  client: AIProjectClient;
  requests: PipelineRequest[];
} {
  const requests: PipelineRequest[] = [];
  const httpClient: HttpClient = {
    async sendRequest(request) {
      requests.push(request);
      return {
        request,
        status,
        headers: createHttpHeaders({ "content-type": "application/json" }),
        bodyAsText: JSON.stringify(body),
      };
    },
  };
  return {
    client: new AIProjectClient(
      "https://example.com/api/projects/test-project",
      { getToken: async () => ({ token: "unit-test-token", expiresOnTimestamp: Infinity }) },
      { httpClient, retryOptions: { maxRetries: 0 } },
    ),
    requests,
  };
}

describe("latest toolbox MCP endpoint", () => {
  it("preserves arbitrary JSON-RPC fields, raw results, and request options", async () => {
    const result = { jsonrpc: "2.0", id: 0, result: { tools: [], enabled: false } };
    const { client, requests } = createClient(result);
    const request = {
      jsonrpc: "2.0",
      id: 0,
      method: "tools/list",
      params: { cursor: null, _meta: { includeExperimental: false } },
    };
    const controller = new AbortController();
    const onResponse = vi.fn();
    const response = await client.toolboxes.invokeLatestToolboxMcp(
      "toolbox / one",
      "application/json",
      request,
      {
        abortSignal: controller.signal,
        onResponse,
        requestOptions: {
          timeout: 1234,
          headers: { accept: "application/json", "x-custom": "retained" },
        },
      },
    );
    expect(response.body).toEqual(result);
    expect(requests).toHaveLength(1);
    const sent = requests[0];
    expect(sent.method).toBe("POST");
    expect(new URL(sent.url).pathname).toBe(
      "/api/projects/test-project/toolboxes/toolbox%20%2F%20one:invoke_mcp",
    );
    expect(new URL(sent.url).searchParams.get("api-version")).toBe("v1");
    expect(JSON.parse(sent.body as string)).toEqual(request);
    expect(sent.headers.get("content-type")).toBe("application/json");
    expect(sent.headers.get("accept")).toBe("application/json");
    expect(sent.headers.get("x-custom")).toBe("retained");
    expect(sent.abortSignal).toBe(controller.signal);
    expect(sent.timeout).toBe(1234);
    expect(onResponse).toHaveBeenCalledTimes(1);
  });

  it.each([{}, [], "raw MCP response"])("retains an unmodeled response body: %j", async (body) => {
    const { client } = createClient(body);
    const response = await client.toolboxes.invokeLatestToolboxMcp("tools", "application/json", {});
    expect(response.body).toEqual(body);
  });

  it.each([400, 404])("surfaces service errors with status %i", async (status) => {
    const error = { code: "invalid_toolbox", message: "Toolbox is unavailable.", param: "name" };
    const { client } = createClient({ error }, status);
    await expect(
      client.toolboxes.invokeLatestToolboxMcp("missing", "application/json", {}),
    ).rejects.toMatchObject({ statusCode: status, details: { error } });
  });

  it("honors cancellation before sending a request", async () => {
    const { client, requests } = createClient({});
    const controller = new AbortController();
    controller.abort();
    await expect(
      client.toolboxes.invokeLatestToolboxMcp(
        "tools",
        "application/json",
        {},
        {
          abortSignal: controller.signal,
        },
      ),
    ).rejects.toMatchObject({ name: "AbortError" });
    expect(requests).toHaveLength(0);
  });
});
