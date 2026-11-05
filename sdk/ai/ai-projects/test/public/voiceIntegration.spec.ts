// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { TokenCredential } from "@azure/core-auth";
import type { HttpClient, PipelineRequest } from "@azure/core-rest-pipeline";
import { createHttpHeaders } from "@azure/core-rest-pipeline";
import { isNodeLike } from "@azure/core-util";
import { describe, expect, it, vi } from "vitest";
import { AIProjectClient } from "../../src/index.js";
import type {
  BetaVoiceAgentsConversationsListOptionalParams,
  VoiceAgentDefinition,
  VoiceAgentLiveDefinition,
  RealtimeServerEventResponseAudioDelta,
  TelephonyCampaignCreate,
} from "../../src/index.js";
import {
  agentDefinitionUnionSerializer,
  agentDefinitionUnionDeserializer,
  realtimeServerEventResponseAudioDeltaSerializer,
  realtimeServerEventResponseAudioDeltaDeserializer,
} from "../../src/models/models.js";

const endpoint = "https://example.com/api/projects/test-project";

const campaignInput: TelephonyCampaignCreate = {
  connection_name: "telephony-connection",
  source: { type: "phone_number", value: "+15555550100" },
  recipients: [{ destination: { type: "phone_number", value: "+15555550101" } }],
};

const campaignResponse = {
  ...campaignInput,
  created_at: 1_700_000_000,
  updated_at: 1_700_000_000,
  status: "cancelled",
  name: "campaign",
  etag: '"campaign-etag"',
  operation_id: "body-is-not-the-initiating-operation",
  progress: { pending: 0, active: 0, completed: 0, failed: 0, cancelled: 0, expired: 0 },
};

interface MockResponse {
  status?: number;
  body?: unknown;
  headers?: Record<string, string>;
}

function createClient(...responses: MockResponse[]): {
  client: AIProjectClient;
  requests: PipelineRequest[];
  getToken: ReturnType<typeof vi.fn<TokenCredential["getToken"]>>;
} {
  const requests: PipelineRequest[] = [];
  const getToken = vi.fn<TokenCredential["getToken"]>(async () => ({
    token: "unit-test-token",
    expiresOnTimestamp: Date.now() + 3_600_000,
  }));
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
  return {
    client: new AIProjectClient(
      endpoint,
      { getToken },
      {
        httpClient,
        retryOptions: { maxRetries: 0 },
        userAgentOptions: { userAgentPrefix: "integration-test" },
      },
    ),
    requests,
    getToken,
  };
}

describe("campaign final resource resolution", () => {
  const operationId = "initiating operation/+";
  const operationLocation =
    `${endpoint}/agents/voice%20agent/telephony_campaigns/campaign/operations/` +
    encodeURIComponent(operationId);

  for (const action of ["create", "cancel"] as const) {
    function start(
      client: AIProjectClient,
    ): ReturnType<AIProjectClient["beta"]["voiceAgents"]["campaigns"]["create"]> {
      const options = {
        updateIntervalInMs: 0,
        operationId: "request-key-not-response-key",
        requestOptions: { headers: { "x-test-header": "preserved" } },
      };
      return action === "create"
        ? client.beta.voiceAgents.campaigns.create(
            "voice agent",
            "campaign",
            campaignInput,
            options,
          )
        : client.beta.voiceAgents.campaigns.cancel(
            "voice agent",
            "campaign",
            '"campaign-etag"',
            options,
          );
    }

    function accepted(): MockResponse {
      return {
        status: action === "create" ? 201 : 202,
        body:
          action === "create"
            ? campaignResponse
            : { id: operationId, kind: "cancel", status: "in_progress", created_at: 1_700_000_000 },
        headers: {
          "operation-location": operationLocation,
          "operation-id": operationId,
          "retry-after": "0",
          ...(action === "create" ? { location: `${endpoint}/unguarded-resource` } : {}),
        },
      };
    }

    const succeeded: MockResponse = {
      body: {
        id: operationId,
        kind: action === "create" ? "validation" : "cancel",
        status: "succeeded",
        created_at: 1_700_000_000,
        finished_at: 1_700_000_001,
      },
    };

    it(`${action} resolves a resource-free monitor through the declared guarded GET`, async () => {
      const { client, requests } = createClient(accepted(), succeeded, {
        body: campaignResponse,
      });
      const poller = start(client);
      const result = await poller.pollUntilDone();
      expect(requests).toHaveLength(3);
      expect(requests[0].method).toBe(action === "create" ? "PUT" : "POST");
      if (action === "create") {
        expect(JSON.parse(String(requests[0].body))).toEqual(campaignInput);
      }
      expect(requests[1].method).toBe("GET");
      expect(new URL(requests[1].url).pathname).toBe(new URL(operationLocation).pathname);
      const finalUrl = new URL(requests[2].url);
      expect(requests[2].method).toBe("GET");
      expect(finalUrl.pathname).toBe(
        "/api/projects/test-project/agents/voice%20agent/telephony_campaigns/campaign",
      );
      expect(finalUrl.searchParams.get("operation_id")).toBe(operationId);
      expect(finalUrl.searchParams.get("api-version")).toBe("v1");
      for (const request of requests) {
        expect(request.headers.get("foundry-features")).toBe("VoiceAgents=V1Preview");
        expect(request.headers.get("x-test-header")).toBe("preserved");
      }
      expect(result).toMatchObject({
        name: "campaign",
        status: "cancelled",
        source: campaignInput.source,
        progress: campaignResponse.progress,
        created_at: new Date(1_700_000_000_000),
      });
      expect(poller.result).toEqual(result);
    });

    it.each([
      { status: 409, code: "campaign_operation_mismatch" },
      { status: 404, code: "campaign_not_found" },
    ])(`${action} surfaces guarded final GET errors ($status)`, async ({ status, code }) => {
      const { client, requests } = createClient(accepted(), succeeded, {
        status,
        body: { error: { code, message: "The original campaign is no longer available." } },
      });
      await expect(start(client).pollUntilDone()).rejects.toMatchObject({
        statusCode: status,
        details: { error: { code } },
      });
      expect(requests).toHaveLength(3);
      expect(new URL(requests[2].url).searchParams.get("operation_id")).toBe(operationId);
    });

    it(`${action} does not fetch a campaign after monitor failure`, async () => {
      const { client, requests } = createClient(accepted(), {
        body: {
          id: operationId,
          status: "failed",
          error: { code: "campaign_failed", message: "Campaign action failed." },
        },
      });
      await expect(start(client).pollUntilDone()).rejects.toThrow("Campaign action failed.");
      expect(requests).toHaveLength(2);
    });

    it(`${action} never falls back to an unguarded GET when Operation-Id is missing`, async () => {
      const response = accepted();
      delete response.headers?.["operation-id"];
      const { client, requests } = createClient(response, succeeded);
      await expect(start(client).pollUntilDone()).rejects.toThrow("Operation-Id");
      expect(requests).toHaveLength(2);
    });
  }
});

describe("voice post-emitter integration", () => {
  it("sends post-call configuration and preserves preview audio rejection errors", async () => {
    const { client, requests } = createClient({
      status: 400,
      body: {
        error: {
          code: "invalid_request",
          message: "Post-call audio is not supported in this preview.",
          param: "post_call.include",
        },
      },
    });
    const definition: VoiceAgentDefinition = {
      kind: "voice",
      model: "voice-model",
      store: false,
      post_call: {
        destinations: [
          { type: "event_grid", connection_name: "post-call-events" },
          { type: "routine", name: "archive" },
        ],
        include: ["audio"],
      },
    };
    await expect(
      client.agents.createVersion("voice-agent", definition, {
        requestOptions: { headers: { "foundry-features": "VoiceAgents=V1Preview" } },
      }),
    ).rejects.toMatchObject({
      statusCode: 400,
      details: { error: { code: "invalid_request", param: "post_call.include" } },
    });
    expect(requests).toHaveLength(1);
    expect(JSON.parse(String(requests[0].body)).definition).toMatchObject(definition);
    expect(requests[0].headers.get("foundry-features")).toBe("VoiceAgents=V1Preview");
  });

  it("wires voice operations without exposing the internal WebSocket handshake", async () => {
    const { client, requests, getToken } = createClient({
      body: {
        id: "binding",
        provider: "twilio",
        connection_name: "telephony-connection",
        phone_number: "+15555550100",
        status: "active",
        incoming_call_url: "https://example.com/incoming",
        etag: '"binding-etag"',
      },
    });
    await client.beta.voiceAgents.telephony.getBinding("voice agent", "binding", {
      foundryFeatures: "VoiceAgents=V1Preview",
    });
    expect(requests).toHaveLength(1);
    expect(new URL(requests[0].url).pathname).toBe(
      "/api/projects/test-project/agents/voice%20agent/telephony/bindings/binding",
    );
    expect(requests[0].headers.get("foundry-features")).toBe("VoiceAgents=V1Preview");
    expect(requests[0].headers.get(isNodeLike ? "user-agent" : "x-ms-useragent")).toContain(
      "integration-test azsdk-js-client azsdk-js-api azsdk-js-ai-projects/",
    );
    expect(getToken.mock.calls[0][0]).toEqual(["https://ai.azure.com/.default"]);
    expect(client.endpoint).toBe(endpoint);
    expect(client.evaluators.list).toBeTypeOf("function");
    expect(client.agents.listSessionFiles).toBeTypeOf("function");
    expect(client.agents.createOptimizationJob).toBeTypeOf("function");
    expect(client.beta.agents).not.toHaveProperty("createOptimizationJob");
    expect(client.beta.agents.createFromPrompt).toBeTypeOf("function");
    expect(client.beta.voiceAgents.conversations.getAudioItem).toBeTypeOf("function");
    expect(client.beta.voiceAgents.liveConversations.getAudioItem).toBeTypeOf("function");
    expect(client.beta.voiceAgents.conversations.getGeneratedAudioItem).toBeTypeOf("function");
    expect(client.beta).not.toHaveProperty("voiceAgentWebSocket");
    // Hand-written Voice Agents realtime WebSocket client (not part of this regen); it
    // intentionally lives alongside the generated voiceAgents operations.
    expect(client.beta.voiceAgents.realtime.connect).toBeTypeOf("function");
  });

  it("preserves the ErrorModel shape for failed beta calls", async () => {
    const { client } = createClient({
      status: 409,
      body: {
        error: {
          code: "agent_disabled",
          message: "Enable the agent first.",
          param: "agent",
          details: [{ code: "disabled", message: "Not enabled." }],
        },
      },
    });
    await expect(
      client.beta.voiceAgents.telephony.getBinding("agent", "binding"),
    ).rejects.toMatchObject({
      statusCode: 409,
      details: {
        error: {
          code: "agent_disabled",
          message: "Enable the agent first.",
          param: "agent",
          details: [{ code: "disabled", message: "Not enabled." }],
        },
      },
    });
  });

  it.each([
    {
      name: "recorded audio",
      suffix: "",
      get: (client: AIProjectClient) =>
        client.beta.voiceAgents.conversations.getAudioItem(
          "voice agent",
          "conversation/id",
          "item/id",
        ),
    },
    {
      name: "generated audio",
      suffix: "/generated",
      get: (client: AIProjectClient) =>
        client.beta.voiceAgents.conversations.getGeneratedAudioItem(
          "voice agent",
          "conversation/id",
          "item/id",
        ),
    },
  ])(
    "routes the renamed $name item operation and preserves service errors",
    async ({ get, suffix }) => {
      const { client, requests } = createClient({
        status: 404,
        body: { error: { code: "not_persisted", message: "Audio was not stored." } },
      });
      await expect(get(client)).rejects.toMatchObject({
        statusCode: 404,
        details: { error: { code: "not_persisted" } },
      });
      expect(requests).toHaveLength(1);
      expect(new URL(requests[0].url).pathname).toBe(
        `/api/projects/test-project/agents/voice%20agent/endpoint/protocols/voice/conversations/conversation%2Fid/items/item%2Fid/audio${suffix}`,
      );
      expect(requests[0].headers.get("foundry-features")).toBe("VoiceAgents=V1Preview");
    },
  );

  const listCases = [
    {
      name: "conversations",
      list: (client: AIProjectClient, options: BetaVoiceAgentsConversationsListOptionalParams) =>
        client.beta.voiceAgents.conversations.list("agent", options),
    },
    {
      name: "responses",
      list: (client: AIProjectClient, options: BetaVoiceAgentsConversationsListOptionalParams) =>
        client.beta.voiceAgents.conversations.listResponses("agent", "conversation", options),
    },
    {
      name: "items",
      list: (client: AIProjectClient, options: BetaVoiceAgentsConversationsListOptionalParams) =>
        client.beta.voiceAgents.conversations.listItems("agent", "conversation", options),
    },
    {
      name: "response items",
      list: (client: AIProjectClient, options: BetaVoiceAgentsConversationsListOptionalParams) =>
        client.beta.voiceAgents.conversations.listResponseItems(
          "agent",
          "conversation",
          "response",
          options,
        ),
    },
    {
      name: "telephony bindings",
      list: (client: AIProjectClient, options: BetaVoiceAgentsConversationsListOptionalParams) =>
        client.beta.voiceAgents.telephony.listBindings("agent", options),
    },
    {
      name: "telephony calls",
      list: (client: AIProjectClient, options: BetaVoiceAgentsConversationsListOptionalParams) =>
        client.beta.voiceAgents.telephony.listCalls("agent", options),
    },
    {
      name: "telephony call jobs",
      list: (client: AIProjectClient, options: BetaVoiceAgentsConversationsListOptionalParams) =>
        client.beta.voiceAgents.telephony.listCallJobs("agent", options),
    },
    {
      name: "campaigns",
      list: (client: AIProjectClient, options: BetaVoiceAgentsConversationsListOptionalParams) =>
        client.beta.voiceAgents.campaigns.list("agent", options),
    },
    {
      name: "campaign validation errors",
      list: (client: AIProjectClient, options: BetaVoiceAgentsConversationsListOptionalParams) =>
        client.beta.voiceAgents.campaigns.listValidationErrors("agent", "campaign", options),
    },
    {
      name: "Live conversations",
      list: (client: AIProjectClient, options: BetaVoiceAgentsConversationsListOptionalParams) =>
        client.beta.voiceAgents.liveConversations.list("agent", options),
    },
    {
      name: "Live conversation items",
      list: (client: AIProjectClient, options: BetaVoiceAgentsConversationsListOptionalParams) =>
        client.beta.voiceAgents.liveConversations.listItems("agent", "conversation", options),
    },
  ];

  it.each(listCases)("retains cursor paging and request options for $name", async ({ list }) => {
    const { client, requests } = createClient(
      { body: { data: [], last_id: "cursor-1", has_more: true } },
      { body: { data: [], last_id: "cursor-2", has_more: false } },
    );
    const abortController = new AbortController();
    const onResponse = vi.fn();
    const pages = list(client, {
      limit: 2,
      order: "asc",
      abortSignal: abortController.signal,
      onResponse,
      requestOptions: {
        timeout: 1234,
        headers: { "foundry-features": "VoiceAgents=V1Preview", "x-custom": "retained" },
      },
    }).byPage();
    const first = await pages.next();
    expect(first.value?.continuationToken).toContain("after=cursor-1");
    await pages.next();
    expect((await pages.next()).done).toBe(true);
    expect(requests).toHaveLength(2);
    const nextUrl = new URL(requests[1].url);
    expect(nextUrl.searchParams.get("after")).toBe("cursor-1");
    expect(nextUrl.searchParams.get("limit")).toBe("2");
    expect(nextUrl.searchParams.get("order")).toBe("asc");
    expect(nextUrl.searchParams.get("api-version")).toBe("v1");
    for (const request of requests) {
      expect(request.abortSignal).toBe(abortController.signal);
      expect(request.timeout).toBe(1234);
      expect(request.headers.get("foundry-features")).toBe("VoiceAgents=V1Preview");
      expect(request.headers.get("x-custom")).toBe("retained");
    }
    expect(onResponse).toHaveBeenCalledTimes(2);
  });

  it("wires redesigned campaign and Live groups without restoring legacy flat campaign APIs", () => {
    const { client, requests } = createClient();
    for (const name of [
      "createCampaign",
      "getCampaign",
      "importCampaignRecipients",
      "getCampaignRecipientImport",
      "validateCampaign",
      "publishCampaign",
      "pauseCampaign",
      "resumeCampaign",
      "cancelCampaign",
      "getOperation",
    ]) {
      expect(client.beta.voiceAgents.telephony).not.toHaveProperty(name);
    }
    expect(client.beta.voiceAgents.telephony.createCallJob).toBeTypeOf("function");
    expect(client.beta.voiceAgents.telephony.getCallJob).toBeTypeOf("function");
    expect(client.beta.voiceAgents.telephony.cancelCallJob).toBeTypeOf("function");
    expect(client.beta.voiceAgents.telephony.listCallJobs).toBeTypeOf("function");
    expect(client.beta.voiceAgents.telephony.deleteCallJob).toBeTypeOf("function");
    expect(client.beta.voiceAgents.campaigns.create).toBeTypeOf("function");
    expect(client.beta.voiceAgents.campaigns.getOperation).toBeTypeOf("function");
    expect(client.beta.voiceAgents.liveConversations.get).toBeTypeOf("function");
    expect(client.beta.voiceAgents.liveConversations).not.toHaveProperty("connect");
    expect(client.beta.voiceAgents.realtime.connect).toBeTypeOf("function");
    expect(requests).toHaveLength(0);
  });

  it.each([undefined, "realtime"] as const)(
    "preserves Realtime fields and JSON Schema with sub_protocol=%s",
    (subProtocol) => {
      const parameters = {
        type: "object",
        properties: { city: { type: "string", description: "City to look up." } },
        required: ["city"],
        additionalProperties: false,
      };
      const definition: VoiceAgentDefinition = {
        kind: "voice",
        ...(subProtocol === undefined ? {} : { sub_protocol: subProtocol }),
        model: "voice-model",
        model_type: "managed",
        tools: [
          {
            type: "function",
            name: "lookup",
            parameters,
          },
        ],
      };
      const wire = agentDefinitionUnionSerializer(definition);
      expect(wire.tools[0].parameters).toEqual(parameters);
      expect(JSON.parse(JSON.stringify(wire))).toEqual(definition);
      expect(agentDefinitionUnionDeserializer(wire)).toMatchObject(definition);
      expect(agentDefinitionUnionDeserializer(wire)).toHaveProperty("sub_protocol", subProtocol);
    },
  );

  it.each([
    { type: "client", acknowledgement_delay_ms: 400 },
    {
      type: "responses",
      responses: { model: "backend-deployment", instructions: "Help the caller." },
    },
    { type: "foundry_managed_agent", agent_name: "helper", agent_version: "3" },
  ] as const)("round-trips the Live $type delegation through the agent union", (delegation) => {
    const definition: VoiceAgentLiveDefinition = {
      kind: "voice",
      sub_protocol: "live",
      model_type: "self_deployed",
      model: "gpt-live-deployment",
      instructions: "Talk to {{name}}.",
      structured_inputs: { name: { required: true, description: "Caller name." } },
      store: true,
      greeting: { type: "template", text: "Hello {{name}}." },
      delegation,
    };
    const wire = agentDefinitionUnionSerializer(definition);
    expect(JSON.parse(JSON.stringify(wire))).toEqual(definition);
    expect(agentDefinitionUnionDeserializer(wire)).toMatchObject(definition);
  });

  it("routes Live persistence separately and preserves dates and error details", async () => {
    const { client, requests } = createClient({
      body: {
        id: "conversation",
        object: "voice.conversation",
        status: "failed",
        created_at: 1700000000,
        completed_at: 1700000001,
        last_error: { code: "recording_unavailable", message: "Recording failed." },
      },
    });
    const conversation = await client.beta.voiceAgents.liveConversations.get(
      "voice agent",
      "conversation/id",
    );
    expect(conversation.created_at).toEqual(new Date(1700000000000));
    expect(conversation.completed_at).toEqual(new Date(1700000001000));
    expect(conversation.last_error).toMatchObject({ code: "recording_unavailable" });
    expect(new URL(requests[0].url).pathname).toBe(
      "/api/projects/test-project/agents/voice%20agent/endpoint/protocols/voice/live/conversations/conversation%2Fid",
    );
    expect(requests[0].headers.get("foundry-features")).toBe("VoiceAgents=V1Preview");
  });

  it("round-trips base64 audio delta bytes", () => {
    const event: RealtimeServerEventResponseAudioDelta = {
      type: "response.output_audio.delta",
      event_id: "event",
      response_id: "response",
      item_id: "item",
      output_index: 0,
      content_index: 0,
      delta: new Uint8Array([0, 1, 255]),
    };
    const wire = realtimeServerEventResponseAudioDeltaSerializer(event);
    expect(wire.delta).toBe("AAH/");
    const decoded = realtimeServerEventResponseAudioDeltaDeserializer(wire);
    expect(decoded.delta).toBeInstanceOf(Uint8Array);
    expect({ ...decoded, delta: Array.from(decoded.delta) }).toEqual({
      ...event,
      delta: Array.from(event.delta),
    });
  });
});
