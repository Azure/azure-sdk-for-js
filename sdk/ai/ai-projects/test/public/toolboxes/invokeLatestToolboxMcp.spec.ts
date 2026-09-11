// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { HttpClient, PipelineRequest } from "@azure/core-rest-pipeline";
import { createHttpHeaders } from "@azure/core-rest-pipeline";
import { describe, expect, it } from "vitest";
import { AIProjectClient } from "../../../src/index.js";
import { agentDeserializer, toolboxObjectDeserializer } from "../../../src/models/models.js";

function createClient(
  status: number,
  body: unknown,
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
  const client = new AIProjectClient(
    "https://example.com/api/projects/test-project",
    { getToken: async () => ({ token: "unit-test-token", expiresOnTimestamp: Infinity }) },
    { httpClient, retryOptions: { maxRetries: 0 } },
  );
  return { client, requests };
}

describe("latest toolbox MCP endpoint", () => {
  it("preserves arbitrary JSON-RPC requests, response bodies, and request options", async () => {
    const body = { jsonrpc: "2.0", id: 1, result: { tools: [] } };
    const { client, requests } = createClient(200, body);
    const request = { jsonrpc: "2.0", id: 1, method: "tools/list", params: {} };
    const controller = new AbortController();
    const response = await client.toolboxes.invokeLatestToolboxMcp(
      "toolbox/name",
      "application/json",
      request,
      {
        abortSignal: controller.signal,
        requestOptions: {
          headers: { accept: "application/json", "x-custom-header": "custom-value" },
        },
      },
    );
    expect(response).toEqual({ body });
    expect(requests).toHaveLength(1);
    const sent = requests[0];
    expect(sent.method).toBe("POST");
    expect(new URL(sent.url).pathname).toBe(
      "/api/projects/test-project/toolboxes/toolbox%2Fname:invoke_mcp",
    );
    expect(new URL(sent.url).searchParams.get("api-version")).toBe("v1");
    expect(JSON.parse(sent.body as string)).toEqual(request);
    expect(sent.headers.get("content-type")).toBe("application/json");
    expect(sent.headers.get("accept")).toBe("application/json");
    expect(sent.headers.get("x-custom-header")).toBe("custom-value");
    expect(sent.abortSignal).toBe(controller.signal);
  });

  it("preserves the customized error model for failed requests", async () => {
    const error = {
      code: "not_found",
      message: "Toolbox not found.",
      param: "name",
      details: [{ code: "missing", message: "No toolbox has that name." }],
    };
    const { client } = createClient(404, { error });
    await expect(
      client.toolboxes.invokeLatestToolboxMcp("missing", "application/json", {}),
    ).rejects.toMatchObject({ statusCode: 404, details: { error } });
  });

  it("accepts an empty response object when no optional parameters are supplied", async () => {
    const { client } = createClient(200, {});
    await expect(
      client.toolboxes.invokeLatestToolboxMcp("toolbox", "application/json", {}),
    ).resolves.toEqual({ body: {} });
  });
});

describe("agent and toolbox response additions", () => {
  it("keeps administrative configuration separate from operational state", () => {
    const agent = agentDeserializer({
      object: "agent",
      id: "agent-1",
      name: "test-agent",
      state: "disabled",
      configuration_state: "enabled",
      state_source: "agent_instance_identity",
      versions: {
        latest: {
          object: "agent.version",
          id: "version-1",
          name: "test-agent",
          version: "1",
          created_at: 1,
          definition: { kind: "prompt", model: "test-model" },
        },
      },
    });
    expect(agent.configuration_state).toBe("enabled");
    expect(agent.state).toBe("disabled");
    expect(agent.state_source).toBe("agent_instance_identity");
  });

  it("deserializes toolbox timestamps and latest-version metadata", () => {
    const toolbox = toolboxObjectDeserializer({
      id: "toolbox-1",
      name: "test-toolbox",
      default_version: "1",
      updated_at: 1_700_000_000,
      versions: {
        latest: {
          id: "toolbox-version-2",
          name: "test-toolbox",
          version: "2",
          tools: [],
          created_at: 1_700_000_000,
        },
      },
    });
    expect(toolbox.updated_at).toEqual(new Date(1_700_000_000_000));
    expect(toolbox.versions.latest.version).toBe("2");
    expect(toolbox.versions.latest.tools).toEqual([]);
    expect(toolbox.default_version).toBe("1");
  });
});
