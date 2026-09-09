// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { HttpClient, PipelineRequest } from "@azure/core-rest-pipeline";
import { createHttpHeaders, createPipelineRequest } from "@azure/core-rest-pipeline";
import type {
  OperationOptions,
  PathUncheckedResponse,
  RequestParameters,
} from "@azure-rest/core-client";
import { describe, expect, it, vi } from "vitest";
import { AIProjectClient } from "../../src/index.js";
import { AbortError } from "@azure/abort-controller";
import type { ErrorModel, VoiceAgentDefinition } from "../../src/index.js";
import type { AIProjectContext } from "../../src/api/index.js";
import {
  listAgentConversations,
  listAgentConversationItems,
  listAgentConversationResponses,
  listAgentConversationResponseItems,
} from "../../src/api/agentEndpointConversations/operations.js";
import { listTelephonyBindings, listTelephonyCalls } from "../../src/api/agents/operations.js";
import {
  agentDefinitionUnionSerializer,
  agentDefinitionUnionDeserializer,
  voiceAgentServerEventResponseAnimationBlendshapesDeltaSerializer,
  realtimeServerEventResponseAudioDeltaSerializer,
  realtimeServerEventResponseAudioDeltaDeserializer,
} from "../../src/models/models.js";

interface MockResponse {
  status?: number;
  body?: unknown;
  headers?: Record<string, string>;
}

// All requests terminate at this in-memory transport; no Azure calls or recordings are used.
function createProject(responses: MockResponse[]): {
  project: AIProjectClient;
  requests: PipelineRequest[];
  getToken: ReturnType<typeof vi.fn>;
} {
  const requests: PipelineRequest[] = [];
  const getToken = vi.fn(async (_scopes: string | string[]) => ({
    token: "unit-test-token",
    expiresOnTimestamp: Date.now() + 60_000,
  }));
  const httpClient: HttpClient = {
    async sendRequest(request) {
      requests.push(request);
      const response = responses.shift();
      if (!response) throw new Error("Unexpected request in voice-agent unit test");
      return {
        request,
        status: response.status ?? 200,
        headers: createHttpHeaders({
          "content-type": "application/json",
          ...response.headers,
        }),
        bodyAsText: response.body === undefined ? undefined : JSON.stringify(response.body),
      };
    },
  };
  return {
    project: new AIProjectClient(
      "https://example.com/api/projects/test",
      { getToken },
      {
        httpClient,
        retryOptions: { maxRetries: 0 },
        credentials: { scopes: ["https://custom.example/.default"] },
        userAgentOptions: { userAgentPrefix: "voice-unit-test" },
      },
    ),
    requests,
    getToken,
  };
}

const conversation = {
  id: "conversation-1",
  object: "voice.conversation",
  status: "completed",
  created_at: 1_700_000_000,
};

describe("voice-agent integration", () => {
  it("wires conversations through the customized context and keeps existing client groups", async () => {
    const { project, requests, getToken } = createProject([{ body: conversation }]);
    const result = await project.agentEndpointConversations.getAgentConversation(
      "voice agent",
      "conversation/1",
    );
    expect(result.created_at).toEqual(new Date(1_700_000_000_000));
    expect(requests[0].url).toContain(
      "/agents/voice%20agent/endpoint/protocols/voice/conversations/conversation%2F1",
    );
    expect(requests[0].headers.get("foundry-features")).toBe("VoiceAgents=V1Preview");
    expect(getToken.mock.calls[0][0]).toEqual(["https://custom.example/.default"]);
    const userAgent =
      requests[0].headers.get("user-agent") ?? requests[0].headers.get("x-ms-useragent");
    expect(userAgent).toContain("voice-unit-test azsdk-js-client azsdk-js-api");
    expect(project.endpoint).toBe("https://example.com/api/projects/test");
    expect(project.beta.agents).toBeDefined();
    expect(project.datasets).toBeDefined();
    expect(project.telemetry).toBeDefined();
    expect(project.agents.create).toBeTypeOf("function");
    expect(project.beta.evaluators.list).toBeTypeOf("function");
    expect(project.getOpenAIClient).toBeTypeOf("function");
  });

  it("wires telephony operations and deserializes their error model", async () => {
    const error: ErrorModel = { code: "ImportFailed", message: "Invalid source", details: [] };
    const { project, requests } = createProject([
      {
        body: { id: "operation-1", object: "telephony.operation", status: "failed", error },
      },
    ]);
    const result = await project.agentTelephony.getTelephonyOperation("agent", "operation-1", {
      foundryFeatures: "VoiceAgents=V1Preview",
      requestOptions: { headers: { "x-custom-header": "kept" } },
    });
    expect(result.error).toMatchObject(error);
    expect(requests[0].url).toContain("/agents/agent/telephony/operations/operation-1");
    expect(requests[0].headers.get("foundry-features")).toBe("VoiceAgents=V1Preview");
    expect(requests[0].headers.get("x-custom-header")).toBe("kept");
  });

  it("wires the bodyless WebSocket handshake and forwards query and header options", async () => {
    const { project, requests } = createProject([{ status: 101 }]);
    await project.voiceAgentWebSocket.connectVoiceAgent("agent", {
      foundryFeaturesQuery: "VoiceAgents=V1Preview",
      transport: "webrtc",
      store: false,
      structuredInput: '{"topic":"weather"}',
      agentVersionOverride: "3",
      websocketSubprotocol: "realtime",
    });
    const url = new URL(requests[0].url);
    expect(url.pathname).toContain("/agents/agent/endpoint/protocols/voice");
    expect(url.searchParams.get("foundry_features")).toBe("VoiceAgents=V1Preview");
    expect(url.searchParams.get("store")).toBe("false");
    expect(url.searchParams.get("transport")).toBe("webrtc");
    expect(url.searchParams.get("structured_input")).toBe('{"topic":"weather"}');
    expect(url.searchParams.get("x-agent-version-override")).toBe("3");
    expect(url.searchParams.get("api-version")).toBe("v1");
    expect(requests[0].headers.get("sec-websocket-protocol")).toBe("realtime");
  });

  it("surfaces a terminal disabled-agent handshake error", async () => {
    const { project } = createProject([
      {
        status: 409,
        body: { error: { code: "agent_disabled", message: "Enable the agent first" } },
      },
    ]);
    await expect(project.voiceAgentWebSocket.connectVoiceAgent("agent")).rejects.toMatchObject({
      statusCode: 409,
      details: { error: { code: "agent_disabled", message: "Enable the agent first" } },
    });
  });

  it("forwards cancellation during a conversation request", async () => {
    const controller = new AbortController();
    let started!: () => void;
    const requestStarted = new Promise<void>((resolve) => {
      started = resolve;
    });
    const project = new AIProjectClient(
      "https://example.com",
      {
        getToken: async () => ({
          token: "unit-test-token",
          expiresOnTimestamp: Date.now() + 60_000,
        }),
      },
      {
        httpClient: {
          sendRequest: (request) =>
            new Promise((_resolve, reject) => {
              expect(request.abortSignal).toBe(controller.signal);
              request.abortSignal!.addEventListener("abort", () => reject(new AbortError()), {
                once: true,
              });
              started();
            }),
        },
      },
    );
    const pending = project.agentEndpointConversations.getAgentConversation(
      "agent",
      "conversation",
      {
        abortSignal: controller.signal,
      },
    );
    await requestStarted;
    const rejected = expect(pending).rejects.toBeInstanceOf(AbortError);
    controller.abort();
    await rejected;
  });

  it("preserves voice-definition fields through existing agent serializer dispatch", () => {
    const definition: VoiceAgentDefinition = {
      kind: "voice",
      model_type: "managed",
      model: "voice-deployment",
      instructions: "Answer briefly.",
      store: false,
      parallel_tool_calls: false,
      max_output_tokens: 64,
      audio: { output: { voice: "en-US-AvaNeural", voice_type: "azure-standard", speed: 1.1 } },
      tools: [
        {
          type: "function",
          name: "get_weather",
          parameters: {
            type: "object",
            properties: { city: { type: "string" } },
            required: ["city"],
          },
        },
      ],
    };
    const serialized = agentDefinitionUnionSerializer(definition);
    expect(serialized).toMatchObject(definition);
    expect(agentDefinitionUnionDeserializer(serialized)).toMatchObject(definition);
    expect(agentDefinitionUnionSerializer({ kind: "prompt", model: "text-model" })).toMatchObject({
      kind: "prompt",
      model: "text-model",
    });
  });

  it("keeps minimal voice definitions and animation frame values intact", () => {
    expect(agentDefinitionUnionSerializer({ kind: "voice", store: false })).toMatchObject({
      kind: "voice",
      store: false,
    });
    const result = voiceAgentServerEventResponseAnimationBlendshapesDeltaSerializer({
      type: "response.animation_blendshapes.delta",
      event_id: "event-1",
      response_id: "response-1",
      item_id: "item-1",
      output_index: 0,
      content_index: 0,
      frame_index: 0,
      frames: [
        [0, 0.25],
        [0.5, 1],
      ],
    });
    expect(result.frames).toEqual([
      [0, 0.25],
      [0.5, 1],
    ]);
  });

  it("round-trips binary audio deltas through the core base64 helpers", () => {
    const event = {
      type: "response.output_audio.delta" as const,
      event_id: "event-1",
      response_id: "response-1",
      item_id: "item-1",
      output_index: 0,
      content_index: 0,
      delta: new Uint8Array([0, 1, 255]),
    };
    const serialized = realtimeServerEventResponseAudioDeltaSerializer(event);
    expect(serialized.delta).toBe("AAH/");
    const deserialized = realtimeServerEventResponseAudioDeltaDeserializer(serialized);
    expect(deserialized.delta).toBeInstanceOf(Uint8Array);
    expect([...deserialized.delta]).toEqual([...event.delta]);
    expect(deserialized.type).toBe(event.type);
  });

  it("propagates agent generation through the agents factory", async () => {
    const { project, requests } = createProject([
      {
        body: {
          id: "agent-1",
          name: "generated-voice",
          versions: {
            latest: {
              id: "version-1",
              name: "generated-voice",
              version: "1",
              created_at: 1_700_000_000,
              definition: { kind: "voice", model_type: "managed", model: "voice-model" },
            },
          },
        },
      },
    ]);
    await project.agents.generateAgent({
      kind: "voice",
      name: "generated-voice",
      use_case: "Answer questions",
    });
    expect(requests[0].url).toContain("/agents:generate");
    expect(JSON.parse(requests[0].body as string)).toMatchObject({
      kind: "voice",
      name: "generated-voice",
      use_case: "Answer questions",
    });
  });

  it("forwards telephony concurrency and body fields through the agents factory", async () => {
    const { project, requests } = createProject([
      {
        body: { transfer_targets: [] },
      },
    ]);
    await project.agents.replaceTelephonyTransferTargets("agent", '"revision-1"', [], {
      foundryFeatures: "VoiceAgents=V1Preview",
    });
    expect(requests[0].headers.get("if-match")).toBe('"revision-1"');
    expect(JSON.parse(requests[0].body as string)).toEqual({ transfer_targets: [] });
  });

  it("retains the resource id in an outbound campaign LRO result", async () => {
    const resource = { id: "campaign-1", type: "telephony.campaign" };
    const { project, requests } = createProject([
      {
        status: 202,
        headers: {
          "operation-location":
            "https://example.com/api/projects/test/agents/agent/telephony/operations/op-1",
        },
        body: { id: "op-1", status: "running" },
      },
      { body: { id: "op-1", status: "succeeded", resource } },
    ]);
    const poller = project.agentTelephony.validateTelephonyCampaign("agent", "campaign-1", {
      foundryFeatures: "VoiceAgents=V1Preview",
      updateIntervalInMs: 0,
      requestOptions: { headers: { "x-custom-header": "kept" } },
    });
    expect(await poller.pollUntilDone()).toEqual(resource);
    expect(requests[1].headers.get("foundry-features")).toBe("VoiceAgents=V1Preview");
    expect(requests[1].headers.get("x-custom-header")).toBe("kept");
  });
});

type ListFactory = (
  context: AIProjectContext,
  options: OperationOptions,
) => AsyncIterable<unknown> & {
  byPage: (settings?: { continuationToken?: string }) => AsyncIterableIterator<unknown>;
};
const listCases: Array<[string, ListFactory]> = [
  ["conversations", (context, options) => listAgentConversations(context, "agent", options)],
  [
    "conversation items",
    (context, options) => listAgentConversationItems(context, "agent", "conversation", options),
  ],
  [
    "conversation responses",
    (context, options) => listAgentConversationResponses(context, "agent", "conversation", options),
  ],
  [
    "response items",
    (context, options) =>
      listAgentConversationResponseItems(context, "agent", "conversation", "response", options),
  ],
  ["telephony bindings", (context, options) => listTelephonyBindings(context, "agent", options)],
  ["telephony calls", (context, options) => listTelephonyCalls(context, "agent", options)],
];

describe("voice and telephony pagination", () => {
  it.each(listCases)("forwards cursors and request options for %s", async (_name, list) => {
    const nextRequests: Array<{ url: string; options: RequestParameters }> = [];
    const firstUrl = "https://example.com/agents/agent/list?api-version=v1&limit=1";
    const response = (hasMore: boolean): PathUncheckedResponse => ({
      request: createPipelineRequest({ url: firstUrl, method: "GET" }),
      headers: {},
      status: "200",
      body: { data: [], has_more: hasMore, last_id: "cursor /1" },
    });
    const context = {
      apiVersion: "v1",
      path: () => ({ get: () => Promise.resolve(response(true)) }),
      pathUnchecked: (url: string) => ({
        get: (options: RequestParameters) => {
          nextRequests.push({ url, options });
          return Promise.resolve(response(false));
        },
      }),
    } as unknown as AIProjectContext;
    const controller = new AbortController();
    const onResponse = vi.fn();
    const options = {
      abortSignal: controller.signal,
      onResponse,
      foundryFeatures: "VoiceAgents=V1Preview" as const,
      requestOptions: { timeout: 1234, headers: { "x-custom-header": "kept" } },
    };
    const pages = list(context, options).byPage();
    await pages.next();
    await pages.next();
    expect((await pages.next()).done).toBe(true);
    expect(nextRequests).toHaveLength(1);
    expect(new URL(nextRequests[0].url).searchParams.get("after")).toBe("cursor /1");
    expect(nextRequests[0].options).toMatchObject({
      abortSignal: controller.signal,
      onResponse,
      timeout: 1234,
      headers: { "foundry-features": "VoiceAgents=V1Preview", "x-custom-header": "kept" },
    });
    const resumed = list(context, options).byPage({ continuationToken: nextRequests[0].url });
    await resumed.next();
    expect(nextRequests).toHaveLength(2);
  });

  it("iterates items across pages and handles an empty collection", async () => {
    const { project } = createProject([
      { body: { data: [conversation], has_more: true, last_id: "conversation-1" } },
      { body: { data: [{ ...conversation, id: "conversation-2" }], has_more: false } },
      { body: { data: [], has_more: false } },
    ]);
    const ids = [];
    for await (const item of project.agentEndpointConversations.listAgentConversations("agent")) {
      ids.push(item.id);
    }
    expect(ids).toEqual(["conversation-1", "conversation-2"]);
    const empty = project.agentEndpointConversations.listAgentConversations("agent");
    expect((await empty.next()).done).toBe(true);
  });
});
