// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, expect, expectTypeOf, it } from "vitest";
import type {
  Agent,
  AgentState,
  AgentVersionStatus,
  ErrorModel,
  GitHubCopilotBuiltInTool,
  PromptAgentDefinition,
  RealtimeConversationItemMessageUnion,
  RealtimeFunctionToolParameters,
  RealtimeServerEventConversationItemInputAudioTranscriptionCompleted,
  ToolboxesInvokeLatestToolboxMcpResponse,
  VoiceAgentInputTranscription,
} from "../../src/models/index.js";
import {
  agentDefinitionUnionDeserializer,
  agentDefinitionUnionSerializer,
  agentDeserializer,
  agentHarnessUnionDeserializer,
  agentHarnessUnionSerializer,
  apiErrorResponseDeserializer,
  functionToolParamDeserializer,
  functionToolParamSerializer,
  realtimeConversationItemUnionDeserializer,
  realtimeConversationItemUnionSerializer,
  realtimeFunctionToolSerializer,
  realtimeServerEventUnionDeserializer,
  realtimeServerEventUnionSerializer,
  toolboxObjectDeserializer,
  toolboxToolUnionDeserializer,
  toolboxToolUnionSerializer,
  toolUnionDeserializer,
  toolUnionSerializer,
  voiceAgentInputTranscriptionDeserializer,
  voiceAgentInputTranscriptionSerializer,
  voiceResponseBaseDeserializer,
} from "../../src/models/models.js";

describe("regenerated models", () => {
  it("requires narrowing the raw MCP response body", () => {
    expectTypeOf<ToolboxesInvokeLatestToolboxMcpResponse["body"]>().toBeUnknown();
  });

  it("round-trips Copilot harness, skills, built-in overrides, and existing prompt tools", () => {
    const names: GitHubCopilotBuiltInTool[] = [
      "filesystem_read",
      "filesystem_write",
      "shell",
      "web",
      "subagents",
    ];
    const definition: PromptAgentDefinition = {
      kind: "prompt",
      model: "deployment",
      instructions: "Answer using the configured tools.",
      harness: { type: "github_copilot_preview" },
      skills: [{ name: "pinned", version: "2" }, { name: "default-version" }],
      tools: [
        {
          type: "github_copilot_toolset_preview",
          default_config: { enabled: false },
          configs: names.map((name) => ({ name, enabled: name === "filesystem_read" })),
        },
        { type: "function", name: "lookup", strict: true, parameters: { type: "object" } },
      ],
    };

    const serialized = agentDefinitionUnionSerializer(definition);
    expect(serialized).toMatchObject(definition);
    expect(agentDefinitionUnionDeserializer(serialized)).toMatchObject(definition);
  });

  it("does not invent optional harness, skill, or built-in configuration defaults", () => {
    const minimal: PromptAgentDefinition = { kind: "prompt", model: "deployment" };
    const serialized = agentDefinitionUnionSerializer(minimal);
    expect(serialized.harness).toBeUndefined();
    expect(serialized.skills).toBeUndefined();
    expect(agentDefinitionUnionDeserializer(serialized)).toMatchObject(minimal);

    const empty: PromptAgentDefinition = {
      ...minimal,
      skills: [],
      tools: [{ type: "github_copilot_toolset_preview", configs: [], default_config: {} }],
    };
    expect(agentDefinitionUnionDeserializer(agentDefinitionUnionSerializer(empty))).toMatchObject(
      empty,
    );
    const tool = toolUnionSerializer({ type: "github_copilot_toolset_preview" });
    expect(tool.default_config).toBeUndefined();
    expect(tool.configs).toBeUndefined();
    expect(toolUnionDeserializer(tool)).toMatchObject({ type: "github_copilot_toolset_preview" });
  });

  it("retains unknown harness discriminators through the fallback", () => {
    const harness = { type: "future_harness" };
    expect(agentHarnessUnionSerializer(harness)).toEqual(harness);
    expect(agentHarnessUnionDeserializer(harness)).toEqual(harness);
  });

  it("preserves null optional prompt fields received from the service", () => {
    const definition = { kind: "prompt", model: "deployment", harness: null, skills: null };
    const result = agentDefinitionUnionDeserializer(definition);
    expect(result).toMatchObject(definition);
    expect(agentDefinitionUnionSerializer(result)).toMatchObject(definition);
  });

  it.each([
    { state: "disabled", configuration_state: "enabled" },
    { state: "enabled", configuration_state: "disabled" },
  ] as const)(
    "keeps administrative $configuration_state separate from operational $state",
    (states) => {
      const result = agentDeserializer({
        object: "agent",
        id: "agent-id",
        name: "agent",
        ...states,
        state_source: "agent_instance_identity",
        versions: {
          latest: {
            object: "agent.version",
            id: "version-id",
            name: "agent",
            version: "1",
            created_at: 1,
            definition: { kind: "prompt", model: "deployment" },
            status: "active",
          },
        },
      });
      expect(result).toMatchObject({ ...states, state_source: "agent_instance_identity" });
      expect(result.versions.latest.created_at).toEqual(new Date(1000));
      expect(result.versions.latest.status).toBe("active");
      expectTypeOf<Agent["configuration_state"]>().toEqualTypeOf<AgentState>();
      expectTypeOf<
        {} extends Pick<Agent, "configuration_state"> ? true : false
      >().toEqualTypeOf<false>();
      expectTypeOf(result.versions.latest.status).toEqualTypeOf<AgentVersionStatus | undefined>();
    },
  );

  it.each([0, 1_700_000_000])(
    "deserializes toolbox update time %i and latest-version details",
    (time) => {
      const result = toolboxObjectDeserializer({
        id: "toolbox-id",
        name: "toolbox",
        default_version: "1",
        updated_at: time,
        versions: {
          latest: {
            id: "toolbox-version-id",
            name: "toolbox",
            version: "2",
            metadata: null,
            created_at: time,
            tools: [],
          },
        },
      });
      expect(result.updated_at).toEqual(new Date(time * 1000));
      expect(result.default_version).toBe("1");
      expect(result.versions.latest).toMatchObject({
        version: "2",
        created_at: new Date(time * 1000),
        metadata: null,
        tools: [],
      });
    },
  );

  it.each([true, false, undefined])("preserves async tool setting %s", (async) => {
    for (const tool of [
      { type: "function", name: "lookup", async },
      { type: "custom", name: "custom-lookup", async },
    ] as const) {
      const serialized = toolUnionSerializer(tool);
      expect(serialized.async).toBe(async);
      expect(toolUnionDeserializer(serialized)).toMatchObject(tool);
    }
    const parameter = { type: "function", name: "lookup", async } as const;
    expect(functionToolParamDeserializer(functionToolParamSerializer(parameter))).toMatchObject(
      parameter,
    );
  });

  it.each([true, false, undefined])(
    "preserves external web access setting %s",
    (external_web_access) => {
      const tool = { type: "web_search", external_web_access } as const;
      const serialized = toolUnionSerializer(tool);
      expect(serialized.external_web_access).toBe(external_web_access);
      expect(toolUnionDeserializer(serialized)).toMatchObject(tool);

      const toolboxTool = { ...tool, name: "search" };
      const toolboxSerialized = toolboxToolUnionSerializer(toolboxTool);
      expect(toolboxSerialized.external_web_access).toBe(external_web_access);
      expect(toolboxToolUnionDeserializer(toolboxSerialized)).toMatchObject(toolboxTool);
    },
  );

  it.each(["gpt-image-2", "gpt-image-2-2026-04-21"] as const)(
    "round-trips the image generation model %s",
    (model) => {
      const tool = { type: "image_generation", model } as const;
      expect(toolUnionDeserializer(toolUnionSerializer(tool))).toMatchObject(tool);
    },
  );

  it("preserves the customized ErrorModel while deserializing misalignment details", () => {
    const error: ErrorModel = {
      code: "action_blocked",
      message: "Review the action.",
      param: "tool",
      type: "invalid_request_error",
      details: [{ code: "nested", message: "More details." }],
      additionalInfo: { request: "request-id" },
      debugInfo: { category: "tool" },
      misalignment: {
        error_type: "future_classification",
        detailed_explanation: "This action may not match the request.",
        steer: { message: "Ask for a narrower action." },
      },
    };
    const result = apiErrorResponseDeserializer({ error });
    expect(result.error).toEqual(error);
    expectTypeOf(result.error).toEqualTypeOf<ErrorModel>();
    expect(
      apiErrorResponseDeserializer({ error: { code: "simple", message: "Error." } }).error,
    ).not.toHaveProperty("misalignment", expect.anything());
  });

  const messages: RealtimeConversationItemMessageUnion[] = [
    { type: "message", role: "system", content: [{ type: "input_text", text: "Be concise." }] },
    {
      type: "message",
      role: "user",
      content: [
        { type: "input_text", text: "Describe this." },
        { type: "input_audio", audio: "YXVkaW8=", transcript: "Hello" },
        { type: "input_image", image_url: "https://example.com/image.png", detail: "low" },
      ],
    },
    {
      type: "message",
      role: "assistant",
      content: [
        { type: "output_text", text: "Hello." },
        { type: "output_audio", audio: "YXVkaW8=", transcript: "Hello." },
      ],
    },
  ];

  it.each(messages)("dispatches Realtime $role message content and timestamps", (message) => {
    const serialized = realtimeConversationItemUnionSerializer(message);
    expect(serialized).toMatchObject(message);
    expect(realtimeConversationItemUnionDeserializer(serialized)).toMatchObject(message);
    for (const created_at of [0, 1_700_000_000]) {
      const result = realtimeConversationItemUnionDeserializer({
        ...serialized,
        created_at,
        response_id: "response-id",
      });
      expect(result).toMatchObject({
        ...message,
        created_at: new Date(created_at * 1000),
        response_id: "response-id",
      });
      const request = realtimeConversationItemUnionSerializer(result);
      expect(request).not.toHaveProperty("created_at");
      expect(request).not.toHaveProperty("response_id");
    }
  });

  it.each(["system", "user", "assistant"] as const)(
    "preserves empty %s message content and absent timestamps",
    (role) => {
      const message = { type: "message", role, content: [] } as const;
      const result = realtimeConversationItemUnionDeserializer(message);
      expect(result).toMatchObject(message);
      expect(result).toHaveProperty("created_at", undefined);
    },
  );

  it.each([{ languages: ["en", "fr"] }, { languages: [] }])(
    "round-trips transcription language hints $languages",
    ({ languages }) => {
      const transcription: VoiceAgentInputTranscription = {
        model: "gpt-4o-transcribe",
        language: "en",
        phrase_list: ["Foundry"],
        languages,
        keywords: ["Foundry", "SDK"],
      };
      expect(
        voiceAgentInputTranscriptionDeserializer(
          voiceAgentInputTranscriptionSerializer(transcription),
        ),
      ).toMatchObject(transcription);
    },
  );

  it.each([{ languages: [{ code: "en" }, { code: "fr" }] }, { languages: [] }])(
    "round-trips detected transcription languages $languages",
    ({ languages }) => {
      const event: RealtimeServerEventConversationItemInputAudioTranscriptionCompleted = {
        type: "conversation.item.input_audio_transcription.completed",
        event_id: "event-id",
        item_id: "item-id",
        content_index: 0,
        transcript: "Hello",
        usage: { type: "duration", seconds: 1 },
        languages,
        phrases: [],
      };
      expect(
        realtimeServerEventUnionDeserializer(realtimeServerEventUnionSerializer(event)),
      ).toMatchObject(event);
    },
  );

  it("retains customized JSON Schema parameters and snake-case voice response fields", () => {
    const parameters: RealtimeFunctionToolParameters = {
      type: "object",
      properties: { city: { type: "string" } },
      required: ["city"],
      additionalProperties: false,
    };
    expect(
      realtimeFunctionToolSerializer({ type: "function", name: "weather", parameters }).parameters,
    ).toEqual(parameters);
    const response = {
      object: "realtime.response",
      status: "completed",
      output_modalities: ["audio"],
      max_output_tokens: "inf",
      status_details: { type: "completed" },
    };
    const result = voiceResponseBaseDeserializer(response);
    expect(result).toMatchObject(response);
    expect(result).not.toHaveProperty("outputModalities");
    expect(result).not.toHaveProperty("maxOutputTokens");
    expect(result).not.toHaveProperty("statusDetails");
  });
});
