// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { HttpClient, PipelineRequest } from "@azure/core-rest-pipeline";
import { createHttpHeaders } from "@azure/core-rest-pipeline";
import { describe, expect, expectTypeOf, it } from "vitest";
import { AIProjectClient } from "../../src/index.js";
import type {
  AgentDefinitionOptInKeys,
  AgentHarnessUnion,
  MicrosoftCopilotBuiltInTool,
  MicrosoftCopilotHarness,
  MicrosoftCopilotToolsetConfig,
  MicrosoftCopilotToolsetDefaultConfig,
  MicrosoftCopilotToolsetPreview,
  PromptAgentDefinition,
  ToolType,
  ToolUnion,
} from "../../src/index.js";
import {
  agentHarnessUnionDeserializer,
  agentHarnessUnionSerializer,
  toolUnionDeserializer,
  toolUnionSerializer,
} from "../../src/models/models.js";

function toWire(value: unknown): unknown {
  return JSON.parse(JSON.stringify(value));
}

describe("Microsoft Copilot contracts", () => {
  it("exports the preview opt-in, harness, toolset, and configuration types", () => {
    expectTypeOf<"MicrosoftCopilot=V1Preview">().toExtend<AgentDefinitionOptInKeys>();
    expectTypeOf<MicrosoftCopilotHarness>().toExtend<AgentHarnessUnion>();
    expectTypeOf<MicrosoftCopilotToolsetPreview>().toExtend<ToolUnion>();
    expectTypeOf<"microsoft_copilot_toolset_preview">().toExtend<ToolType>();
    expectTypeOf<
      MicrosoftCopilotToolsetConfig["name"]
    >().toEqualTypeOf<MicrosoftCopilotBuiltInTool>();
    expectTypeOf<MicrosoftCopilotToolsetDefaultConfig["enabled"]>().toEqualTypeOf<
      boolean | undefined
    >();
    expectTypeOf<MicrosoftCopilotBuiltInTool>().toEqualTypeOf<
      "filesystem_read" | "filesystem_write" | "shell" | "web" | "subagents"
    >();
  });

  it.each(["microsoft_copilot_preview", "github_copilot_preview"] as const)(
    "round-trips the %s harness without changing its discriminator",
    (type) => {
      const harness: AgentHarnessUnion = { type };
      expect(agentHarnessUnionSerializer(harness)).toEqual(harness);
      expect(agentHarnessUnionDeserializer(harness)).toEqual(harness);
    },
  );

  it.each(["microsoft_copilot_toolset_preview", "github_copilot_toolset_preview"] as const)(
    "preserves nested configuration and false values for %s",
    (type) => {
      const tool: ToolUnion = {
        type,
        default_config: { enabled: false },
        configs: [
          { name: "web", enabled: true },
          { name: "shell", enabled: false },
          { name: "subagents" },
        ],
      };
      expect(toWire(toolUnionSerializer(tool))).toEqual(tool);
      expect(toWire(toolUnionDeserializer(tool))).toEqual(tool);
    },
  );

  it.each([
    { type: "microsoft_copilot_toolset_preview" },
    { type: "microsoft_copilot_toolset_preview", default_config: {}, configs: [] },
  ] satisfies MicrosoftCopilotToolsetPreview[])(
    "preserves omitted defaults and empty configuration arrays: %j",
    (tool) => {
      expect(toWire(toolUnionSerializer(tool))).toEqual(tool);
      expect(toWire(toolUnionDeserializer(tool))).toEqual(tool);
    },
  );

  it("sends the Microsoft Copilot opt-in and round-trips the agent definition", async () => {
    const requests: PipelineRequest[] = [];
    const definition: PromptAgentDefinition = {
      kind: "prompt",
      model: "test-model",
      harness: { type: "microsoft_copilot_preview" },
      tools: [
        {
          type: "microsoft_copilot_toolset_preview",
          default_config: { enabled: false },
          configs: [{ name: "web", enabled: true }],
        },
      ],
    };
    const httpClient: HttpClient = {
      async sendRequest(request) {
        requests.push(request);
        return {
          request,
          status: 200,
          headers: createHttpHeaders({ "content-type": "application/json" }),
          bodyAsText: JSON.stringify({
            object: "agent.version",
            id: "agent-version-id",
            name: "copilot-agent",
            version: "1",
            created_at: 1_789_200_000,
            definition,
          }),
        };
      },
    };
    const client = new AIProjectClient(
      "https://example.com/api/projects/test-project",
      {
        getToken: async () => ({
          token: "unit-test-token",
          expiresOnTimestamp: Date.now() + 3_600_000,
        }),
      },
      { httpClient, retryOptions: { maxRetries: 0 } },
    );
    const result = await client.agents.createVersion("copilot-agent", definition, {
      foundryFeatures: "MicrosoftCopilot=V1Preview",
    });

    expect(requests).toHaveLength(1);
    expect(requests[0].headers.get("foundry-features")).toBe("MicrosoftCopilot=V1Preview");
    expect(JSON.parse(String(requests[0].body))).toMatchObject({ definition });
    expect(toWire(result.definition)).toEqual(definition);
  });
});
