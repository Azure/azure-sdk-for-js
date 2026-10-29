// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { HttpClient, PipelineRequest } from "@azure/core-rest-pipeline";
import { createHttpHeaders, createPipelineRequest } from "@azure/core-rest-pipeline";
import { describe, expect, expectTypeOf, it, vi } from "vitest";
import type { AIProjectContext } from "../../../src/api/aiProjectContext.js";
import { createAIProject } from "../../../src/api/aiProjectContext.js";
import {
  create,
  createVersion,
  get,
  getVersion,
  list,
  listVersions,
  update,
} from "../../../src/api/agents/operations.js";
import {
  _downloadAudioDeserialize,
  _downloadAudioItemDeserialize,
  _downloadAudioItemSend,
  _downloadAudioSend,
} from "../../../src/api/beta/voiceAgents/liveConversations/operations.js";
import { _getBetaVoiceAgentsLiveConversationsOperations } from "../../../src/classic/beta/voiceAgents/liveConversations/index.js";
import type {
  Agent,
  AgentDefinitionUnion,
  AgentVersion,
  LiveClientEventLiveResponseItemCreateParam,
  LiveClientEventUnion,
  LiveDelegationItem,
  LiveServerEventLiveResponseEvent,
  LiveServerEventUnion,
  VoiceAgentDefinition,
  VoiceAgentLiveDefinition,
  VoiceAgentLiveDelegationItem,
  VoiceAgentLiveDelegationStatus,
  VoiceAgentLiveDelegationTarget,
  VoiceAgentLiveSessionResource,
} from "../../../src/models/index.js";
import {
  agentDefinitionUnionDeserializer,
  agentDefinitionUnionSerializer,
  liveClientEventUnionSerializer,
  liveServerEventUnionDeserializer,
  voiceAgentLiveConversationItemUnionDeserializer,
} from "../../../src/models/models.js";

const endpoint = "https://example.com/api/projects/contract-tests";

interface MockResponse {
  status?: number;
  body?: unknown;
  headers?: Record<string, string>;
}

function createContext(...responses: MockResponse[]): {
  context: AIProjectContext;
  requests: PipelineRequest[];
} {
  const requests: PipelineRequest[] = [];
  const httpClient: HttpClient = {
    async sendRequest(request) {
      requests.push(request);
      const response = responses.shift();
      if (!response) throw new Error(`Unexpected request: ${request.method} ${request.url}`);
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
  const context = createAIProject(
    endpoint,
    { getToken: async () => ({ token: "contract-test-token", expiresOnTimestamp: Infinity }) },
    { httpClient, retryOptions: { maxRetries: 0 } },
  );
  return { context, requests };
}

function toWire(value: unknown): unknown {
  return JSON.parse(JSON.stringify(value));
}

const parameters = {
  type: "object",
  properties: { city: { type: "string", description: "City to look up." } },
  required: ["city"],
  additionalProperties: false,
};

const realtime: VoiceAgentDefinition = {
  kind: "voice",
  model_type: "managed",
  model: "realtime-deployment",
  instructions: "Help {{customer}}.",
  structured_inputs: {
    customer: { default_value: "visitor", schema: { type: "string" }, required: false },
  },
  greeting: { type: "template", text: "Hello {{customer}}." },
  store: false,
  tools: [{ type: "function", name: "lookup", parameters }],
  tool_choice: { type: "function", name: "lookup" },
  parallel_tool_calls: false,
  output_modalities: ["audio"],
  max_output_tokens: 128,
  include: ["file_search_call.results"],
};

const live: VoiceAgentLiveDefinition = {
  kind: "voice",
  sub_protocol: "live",
  model_type: "self_deployed",
  model: "live-deployment",
  instructions: "Help {{customer}}.",
  structured_inputs: realtime.structured_inputs,
  rai_config: { rai_policy_name: "test-policy" },
  store: true,
  greeting: { type: "template", text: "Hello {{customer}}." },
  audio: { format: { type: "audio/pcm", rate: 24000 }, output: { voice: "marin" } },
  delegation: {
    type: "responses",
    responses: {
      model: "backend-deployment",
      instructions: "Use the lookup tool.",
      max_output_tokens: 256,
      service_tier: "priority",
      reasoning: { effort: "low", summary: "auto" },
      text: { verbosity: "low" },
      tools: [{ type: "function", name: "lookup", parameters, strict: true }],
      tool_choice: { type: "function", name: "lookup" },
      parallel_tool_calls: false,
    },
  },
};

const definitions: { name: string; definition: AgentDefinitionUnion }[] = [
  { name: "legacy Realtime", definition: realtime },
  { name: "explicit Realtime", definition: { ...realtime, sub_protocol: "realtime" } },
  {
    name: "Live default client delegation",
    definition: {
      kind: "voice",
      sub_protocol: "live",
      model_type: "self_deployed",
      model: "live-deployment",
    },
  },
  { name: "Live Responses delegation", definition: live },
  { name: "Live client delegation", definition: { ...live, delegation: { type: "client" } } },
  {
    name: "Live managed-agent delegation",
    definition: {
      ...live,
      delegation: { type: "foundry_managed_agent", agent_name: "specialist", agent_version: "2" },
    },
  },
];

type VersionWire = Omit<AgentVersion, "created_at"> & { created_at: number };

function version(definition: AgentDefinitionUnion): VersionWire {
  return {
    object: "agent.version",
    id: "version-id",
    name: "voice agent",
    version: "1",
    created_at: 1,
    definition,
  };
}

function agent(
  definition: AgentDefinitionUnion,
): Omit<Agent, "versions"> & { versions: { latest: VersionWire } } {
  return {
    object: "agent",
    id: "agent-id",
    name: "voice agent",
    state: "enabled",
    versions: { latest: version(definition) },
  };
}

describe("Live generated-contract integration", () => {
  it("supports nullable Live instructions without widening the legacy Realtime field", () => {
    expectTypeOf<VoiceAgentLiveDefinition["instructions"]>().toEqualTypeOf<
      string | null | undefined
    >();
    expectTypeOf<VoiceAgentDefinition["instructions"]>().toEqualTypeOf<string | undefined>();
    const definition: VoiceAgentLiveDefinition = { ...live, instructions: null };
    expect(agentDefinitionUnionSerializer(definition).instructions).toBeNull();
    expect(agentDefinitionUnionDeserializer({ ...definition }).kind).toBe("voice");
    expect(agentDefinitionUnionDeserializer({ ...definition })).toHaveProperty(
      "instructions",
      null,
    );
  });

  describe.each(definitions)("$name", ({ definition }) => {
    it("round-trips the complete flat definition through the shared discriminator", () => {
      const wire = toWire(agentDefinitionUnionSerializer(definition));
      expect(wire).toEqual(definition);
      expect(toWire(agentDefinitionUnionDeserializer(wire))).toEqual(definition);
      if (!("sub_protocol" in definition)) {
        expect(wire).not.toHaveProperty("sub_protocol");
      }
    });

    it("preserves definition fields on create, update, and createVersion requests and responses", async () => {
      const { context, requests } = createContext(
        { body: agent(definition) },
        { body: agent(definition) },
        { body: version(definition) },
      );
      const options = { foundryFeatures: "VoiceAgents=V1Preview" as const };
      const created = await create(context, "voice agent", definition, options);
      const updated = await update(context, "voice agent", definition, options);
      const createdVersion = await createVersion(context, "voice agent", definition, options);
      expect(toWire(created.versions.latest.definition)).toEqual(definition);
      expect(toWire(updated.versions.latest.definition)).toEqual(definition);
      expect(toWire(createdVersion.definition)).toEqual(definition);
      expect(requests.map((request) => new URL(request.url).pathname)).toEqual([
        "/api/projects/contract-tests/agents",
        "/api/projects/contract-tests/agents/voice%20agent",
        "/api/projects/contract-tests/agents/voice%20agent/versions",
      ]);
      for (const request of requests) {
        expect(request.method).toBe("POST");
        expect(JSON.parse(request.body as string).definition).toEqual(definition);
        expect(request.headers.get("foundry-features")).toBe("VoiceAgents=V1Preview");
      }
    });

    it("preserves definition fields on get and list authoring responses", async () => {
      const { context } = createContext(
        { body: agent(definition) },
        { body: version(definition) },
        { body: { data: [agent(definition)], has_more: false } },
        { body: { data: [version(definition)], has_more: false } },
      );
      expect(toWire((await get(context, "voice agent")).versions.latest.definition)).toEqual(
        definition,
      );
      expect(toWire((await getVersion(context, "voice agent", "1")).definition)).toEqual(
        definition,
      );
      expect(toWire((await list(context).next()).value.versions.latest.definition)).toEqual(
        definition,
      );
      expect(toWire((await listVersions(context, "voice agent").next()).value.definition)).toEqual(
        definition,
      );
    });
  });

  it("does not apply the omitted-protocol fallback to invalid discriminator values", () => {
    for (const sub_protocol of [null, "future-protocol"]) {
      const definition = { kind: "voice", sub_protocol, instructions: "Common fields only." };
      expect(toWire(agentDefinitionUnionDeserializer(definition))).toEqual(definition);
    }
  });

  it("preserves legacy hosted-engine Realtime configuration with an omitted sub_protocol", () => {
    const definition: VoiceAgentDefinition = {
      kind: "voice",
      conversation_engine: { type: "hosted_agent", name: "hosted-agent", version: "2" },
      greeting: { type: "template", text: "Welcome." },
      store: true,
    };
    const wire = toWire(agentDefinitionUnionSerializer(definition));
    expect(wire).toEqual(definition);
    expect(agentDefinitionUnionDeserializer(wire)).toMatchObject(definition);
    expect(wire).not.toHaveProperty("sub_protocol");
  });

  it("retains required null delegation IDs and base64 audio on client events", () => {
    for (const type of [
      "session.instructions.append",
      "session.thinking.append",
      "session.commentary.append",
    ] as const) {
      const event: LiveClientEventUnion = { type, delegation_id: null, content: "Hello." };
      expect(toWire(liveClientEventUnionSerializer(event))).toEqual(event);
    }
    const event: LiveClientEventUnion = {
      type: "session.input_audio.append",
      audio: "AAH/",
      event_id: "audio-event",
    };
    expect(toWire(liveClientEventUnionSerializer(event))).toEqual(event);
    expect(toWire(liveServerEventUnionDeserializer({ ...event, event_id: undefined }))).toEqual({
      type: event.type,
      audio: "AAH/",
    });
  });

  it("retains arbitrary Responses input items and nested backend events", () => {
    const item = {
      type: "function_call_output",
      call_id: "call-1",
      output: [{ text: "résultat", data: { city: "東京", values: [0, false, null] } }],
      extra: { nested: { key: "value" } },
    };
    const input: LiveClientEventLiveResponseItemCreateParam = {
      type: "response.item.create",
      event_id: "client-event",
      item,
    };
    expect(toWire(liveClientEventUnionSerializer(input))).toEqual(input);
    const response: LiveServerEventLiveResponseEvent = {
      type: "response.event",
      event_id: "live-event",
      delegation_id: "delegation-1",
      event: {
        type: "response.output_item.done",
        sequence_number: 42,
        response_id: "backend-response",
        output_index: 3,
        item,
        future_field: [{ nested: true }],
      },
    };
    expect(toWire(liveServerEventUnionDeserializer(response))).toEqual(response);
  });

  it.each(["session.started", "session.updated", "session.closed"])(
    "retains the pinned Foundry managed owner in %s",
    (type) => {
      const session: VoiceAgentLiveSessionResource = {
        id: "live-session",
        model: "gpt-live-1",
        status: "active",
        expires_at: 4_102_444_800,
        instructions: "Resolved instructions.",
        audio: { format: { type: "audio/pcm", rate: 24000 } },
        store: false,
        delegation: {
          type: "foundry_managed_agent",
          agent_name: "managed-owner",
          agent_version: "7",
        },
      };
      const event = {
        type,
        event_id: "lifecycle-event",
        client_event_id: "client-command",
        session,
        ...(type === "session.started" ? { conversation_id: "stored-conversation" } : {}),
        ...(type === "session.closed"
          ? { reason: "close_requested", usage: { seconds: 12.5 } }
          : {}),
      };

      expect(toWire(liveServerEventUnionDeserializer(event))).toEqual(event);
    },
  );

  it.each(["client", "responses", "foundry_managed_agent"])(
    "retains the effective %s delegation trigger",
    (target) => {
      const delegation: VoiceAgentLiveDelegationItem = {
        id: "delegation-1",
        type: "delegation",
        target,
        response_id: "backend-response",
      };
      const event = {
        type: "session.delegation.created",
        event_id: "delegation-event",
        client_event_id: "client-command",
        offset_ms: 125,
        delegation,
      };

      expect(toWire(liveServerEventUnionDeserializer(event))).toEqual(event);
    },
  );

  it.each([undefined, null])("retains an unset lifecycle delegation owner (%s)", (delegation) => {
    const event = {
      type: "session.started",
      event_id: "started",
      session: {
        id: "live-session",
        model: "gpt-live-1",
        status: "active",
        expires_at: 4_102_444_800,
        delegation,
      },
    };

    expect(toWire(liveServerEventUnionDeserializer(event))).toEqual(toWire(event));
  });

  it("supports narrowing concrete native event variants without the generated fallback bases", () => {
    type ClientEvent = {
      [T in LiveClientEventUnion["type"]]: Extract<LiveClientEventUnion, { type: T }>;
    }[LiveClientEventUnion["type"]];
    type ServerEvent = {
      [T in LiveServerEventUnion["type"]]: Extract<LiveServerEventUnion, { type: T }>;
    }[LiveServerEventUnion["type"]];
    expectTypeOf<LiveDelegationItem["target"]>().toEqualTypeOf<"client" | "responses">();
    expectTypeOf<
      VoiceAgentLiveDelegationItem["target"]
    >().toEqualTypeOf<VoiceAgentLiveDelegationTarget>();
    expectTypeOf<
      Extract<ServerEvent, { type: "session.started" }>["session"]
    >().toEqualTypeOf<VoiceAgentLiveSessionResource>();
    const checkClient = (event: ClientEvent): void => {
      if (event.type === "response.item.create") {
        expectTypeOf(event).toEqualTypeOf<LiveClientEventLiveResponseItemCreateParam>();
      }
      if (event.type === "session.commentary.append") {
        expectTypeOf(event.delegation_id).toEqualTypeOf<string | null>();
      }
    };
    const checkServer = (event: ServerEvent): void => {
      if (event.type === "response.event") {
        expectTypeOf(event).toEqualTypeOf<LiveServerEventLiveResponseEvent>();
      }
      if (event.type === "session.output_audio.delta") {
        expectTypeOf(event.delta).toEqualTypeOf<string>();
      }
    };
    checkClient({ type: "session.commentary.append", delegation_id: null, content: "Accepted." });
    checkServer({ type: "session.output_audio.delta", delta: "AAH/" });
  });

  const listCases = [
    {
      name: "conversations",
      suffix: "",
      item: {
        id: "conversation-1",
        object: "voice.conversation",
        status: "completed",
        created_at: 1,
      },
    },
    {
      name: "items",
      suffix: "/conversation%2Fid/items",
      item: { id: "speech-1", type: "input", transcription: "Hello." },
    },
  ];

  it.each(listCases)(
    "uses last_id/has_more and forwards options for $name pages and resumed iterators",
    async ({ name, suffix, item }) => {
      const { context, requests } = createContext(
        { body: { data: [item], last_id: "cursor/1", has_more: true } },
        { body: { data: [], last_id: "cursor/2", has_more: false } },
        { body: { data: [item], has_more: false } },
      );
      const operations = _getBetaVoiceAgentsLiveConversationsOperations(context);
      const controller = new AbortController();
      const onResponse = vi.fn();
      const options = {
        limit: 2,
        order: "asc" as const,
        after: "initial-cursor",
        abortSignal: controller.signal,
        onResponse,
        requestOptions: { timeout: 1234, headers: { "x-custom": "retained" } },
      };
      const iterate = ():
        ReturnType<typeof operations.list> | ReturnType<typeof operations.listItems> =>
        name === "conversations"
          ? operations.list("voice agent", options)
          : operations.listItems("voice agent", "conversation/id", options);
      const pages = iterate().byPage();
      const first = await pages.next();
      const token: string | undefined = first.value?.continuationToken;
      expect(first.value?.[0].id).toBe(item.id);
      expect(token).toBeTypeOf("string");
      expect(new URL(token!).searchParams.get("after")).toBe("cursor/1");
      expect((await pages.next()).value).toHaveLength(0);
      expect((await pages.next()).done).toBe(true);
      const resumed = await iterate().byPage({ continuationToken: token }).next();
      expect(resumed.value?.[0].id).toBe(item.id);
      expect(requests).toHaveLength(3);
      for (const [index, request] of requests.entries()) {
        const url = new URL(request.url);
        expect(url.pathname).toBe(
          `/api/projects/contract-tests/agents/voice%20agent/endpoint/protocols/voice/live/conversations${suffix}`,
        );
        expect(url.searchParams.get("after")).toBe(index === 0 ? "initial-cursor" : "cursor/1");
        expect(url.searchParams.get("limit")).toBe("2");
        expect(url.searchParams.get("order")).toBe("asc");
        expect(url.searchParams.get("api-version")).toBe("v1");
        expect(request.headers.get("foundry-features")).toBe("VoiceAgents=V1Preview");
        expect(request.headers.get("x-custom")).toBe("retained");
        expect(request.abortSignal).toBe(controller.signal);
        expect(request.timeout).toBe(1234);
      }
      expect(onResponse).toHaveBeenCalledTimes(3);
    },
  );

  it("iterates items and stops at has_more=false even when last_id is present", async () => {
    const { context, requests } = createContext(
      {
        body: {
          data: [{ type: "input", id: "input-1", transcription: "Hello." }],
          last_id: "input-1",
          has_more: true,
        },
      },
      {
        body: {
          data: [{ type: "output", id: "output-1", transcription: "Hi." }],
          last_id: "output-1",
          has_more: false,
        },
      },
    );
    const items = [];
    for await (const item of _getBetaVoiceAgentsLiveConversationsOperations(context).listItems(
      "agent",
      "conversation",
    )) {
      items.push(item);
    }
    expect(items.map((item) => item.id)).toEqual(["input-1", "output-1"]);
    expect(requests).toHaveLength(2);
  });

  it("retains managed partial results and future persisted delegation targets", () => {
    const target: VoiceAgentLiveDelegationTarget = "future-target";
    const status: VoiceAgentLiveDelegationStatus = "future-status";
    const item = {
      type: "delegation",
      id: "delegation-1",
      target: "foundry_managed_agent",
      created_at: 0,
      agent_name: "specialist",
      agent_version: "2",
      offset_ms: 0,
      status: "failed",
      output: [{ commentary: "Accepted." }, { thinking: "Context." }],
    };
    expect(voiceAgentLiveConversationItemUnionDeserializer(item)).toEqual({
      ...item,
      created_at: new Date(0),
    });
    expect(voiceAgentLiveConversationItemUnionDeserializer({ ...item, status })).toMatchObject({
      status,
    });
    const future = { type: "delegation", id: "future-1", target, created_at: 0 };
    expect(voiceAgentLiveConversationItemUnionDeserializer(future)).toEqual({
      ...future,
      created_at: new Date(0),
    });
  });

  it("deserializes persisted conversation errors, speech audio, and BYOS recording metadata", async () => {
    const conversation = {
      id: "conversation",
      object: "voice.conversation",
      status: "failed",
      created_at: 0,
      completed_at: 0,
      metadata: { purpose: "test" },
      usage: { seconds: 12.5 },
      last_error: {
        code: "finalization_failed",
        message: "Partial content remains readable.",
        details: [{ code: "storage", message: "Storage unavailable." }],
      },
    };
    const audio = {
      conversation_id: "conversation",
      item_id: "input-1",
      role: "user",
      format: "wav",
      codec: "pcm16",
      sample_rate: 24000,
      channels: 1,
      start_offset_ms: 0,
      duration_ms: 125,
      blob_uri: "https://example.com/customer-storage/input.wav",
    };
    const item = { type: "input", id: "input-1", transcription: "Hello.", audio };
    const recording = {
      conversation_id: "conversation",
      format: "wav",
      sample_rate: 24000,
      channels: 2,
      channel_layout: { left: "user", right: "agent" },
      duration_ms: 250,
      blob_uri: "https://example.com/customer-storage/merged.wav",
    };
    const { context, requests } = createContext(
      { body: conversation },
      { body: item },
      { body: audio },
      { body: recording },
      { status: 204 },
    );
    const operations = _getBetaVoiceAgentsLiveConversationsOperations(context);
    expect(await operations.get("agent", "conversation")).toEqual({
      ...conversation,
      created_at: new Date(0),
      completed_at: new Date(0),
    });
    expect(await operations.getItem("agent", "conversation", "input-1")).toEqual(item);
    expect(await operations.getAudioItem("agent", "conversation", "input-1")).toEqual(audio);
    expect(await operations.getAudio("agent", "conversation")).toEqual(recording);
    expect(await operations.delete("agent", "conversation")).toBeUndefined();
    expect(requests).toHaveLength(5);
  });

  it("preserves errors, preview headers, and escaped parameters on read/delete/audio routes", async () => {
    const error = {
      error: {
        code: "recording_not_ready",
        message: "Try again later.",
        details: [{ code: "pending", message: "Finalizing." }],
      },
    };
    const { context, requests } = createContext(
      ...Array.from({ length: 6 }, () => ({
        status: 409,
        body: error,
        headers: { "retry-after": "5" },
      })),
    );
    const operations = _getBetaVoiceAgentsLiveConversationsOperations(context);
    const calls = [
      () => operations.get("voice agent", "conversation/id"),
      () => operations.delete("voice agent", "conversation/id"),
      () => operations.getItem("voice agent", "conversation/id", "item/id"),
      () => operations.getAudioItem("voice agent", "conversation/id", "item/id"),
      () => operations.getAudio("voice agent", "conversation/id"),
    ];
    for (const call of calls) {
      await expect(call()).rejects.toMatchObject({ statusCode: 409, details: error });
    }
    const response = await _downloadAudioSend(context, "voice agent", "conversation/id");
    await expect(_downloadAudioDeserialize(response)).rejects.toMatchObject({
      statusCode: 409,
      details: error,
    });
    const root =
      "/api/projects/contract-tests/agents/voice%20agent/endpoint/protocols/voice/live/conversations/conversation%2Fid";
    expect(requests.map((request) => new URL(request.url).pathname)).toEqual([
      root,
      root,
      `${root}/items/item%2Fid`,
      `${root}/items/item%2Fid/audio`,
      `${root}/audio`,
      `${root}/audio/content`,
    ]);
    expect(requests[1].method).toBe("DELETE");
    for (const request of requests) {
      expect(request.headers.get("foundry-features")).toBe("VoiceAgents=V1Preview");
    }
    expect(requests[5].headers.get("accept")).toBe("audio/wav");
  });

  it("retains the per-item WAV route and passes binary response bytes through unchanged", async () => {
    const { context, requests } = createContext({ body: {} });
    const response = await _downloadAudioItemSend(
      context,
      "voice agent",
      "conversation/id",
      "item/id",
    );
    expect(new URL(requests[0].url).pathname).toBe(
      "/api/projects/contract-tests/agents/voice%20agent/endpoint/protocols/voice/live/conversations/conversation%2Fid/items/item%2Fid/audio/content",
    );
    expect(requests[0].headers.get("accept")).toBe("audio/wav");
    expect(requests[0].headers.get("foundry-features")).toBe("VoiceAgents=V1Preview");
    const bytes = new Uint8Array([0x52, 0x49, 0x46, 0x46, 0, 1, 255]);
    const blobBody = Promise.resolve(new Blob([bytes], { type: "audio/wav" }));
    const binary = {
      status: "200",
      request: createPipelineRequest({ url: endpoint }),
      headers: {},
      body: undefined,
      blobBody,
    };
    for (const deserialize of [_downloadAudioDeserialize, _downloadAudioItemDeserialize]) {
      const result = await deserialize(binary);
      expect(result.blobBody).toBe(blobBody);
      expect(new Uint8Array(await (await result.blobBody!).arrayBuffer())).toEqual(bytes);
    }
    expect(response.status).toBe("200");
  });
});
