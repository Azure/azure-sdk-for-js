// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, expect, it } from "vitest";
import type { TokenCredential } from "@azure/core-auth";
import type { PipelineRequest, PipelineResponse } from "@azure/core-rest-pipeline";
import { createHttpHeaders } from "@azure/core-rest-pipeline";
import type { AIProjectClientOptionalParams } from "../../../../src/index.js";
import { AIProjectClient } from "../../../../src/index.js";

describe("agents - programmatic tool calling", () => {
  it("serializes programmatic tool calling configuration", async () => {
    let requestBody: unknown;
    const options: AIProjectClientOptionalParams = {
      additionalPolicies: [
        {
          policy: {
            name: "RequestMockPolicy",
            sendRequest: async (request: PipelineRequest) => {
              requestBody =
                typeof request.body === "string" ? JSON.parse(request.body) : request.body;
              return {
                bodyAsText: JSON.stringify({
                  metadata: {},
                  object: "agent.version",
                  id: "version-id",
                  name: "programmatic-tool-calling-agent",
                  version: "1",
                  created_at: 1,
                  definition: {
                    kind: "prompt",
                    model: "model",
                    tools: [],
                  },
                }),
                headers: createHttpHeaders({ "content-type": "application/json" }),
                status: 200,
                request,
              } as PipelineResponse;
            },
          },
          position: "perCall",
        },
      ],
    };
    const credential: TokenCredential = {
      getToken: async () => ({
        token: "fake-token",
        expiresOnTimestamp: Date.now() + 60_000,
      }),
    };
    const client = new AIProjectClient(
      "https://example.azure.com/api/projects/test-project",
      credential,
      options,
    );

    await client.agents.createVersion("programmatic-tool-calling-agent", {
      kind: "prompt",
      model: "model",
      tools: [
        {
          type: "function",
          name: "get_weather",
          parameters: {},
          allowed_callers: ["programmatic"],
        },
        {
          type: "programmatic_tool_calling",
        },
      ],
    });

    expect(requestBody).toMatchObject({
      definition: {
        tools: [
          {
            type: "function",
            name: "get_weather",
            allowed_callers: ["programmatic"],
          },
          {
            type: "programmatic_tool_calling",
          },
        ],
      },
    });
  });
});
