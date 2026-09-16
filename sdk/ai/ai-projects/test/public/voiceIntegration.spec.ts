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
  RealtimeServerEventResponseAudioDelta,
} from "../../src/index.js";
import {
  agentDefinitionUnionSerializer,
  agentDefinitionUnionDeserializer,
  realtimeServerEventResponseAudioDeltaSerializer,
  realtimeServerEventResponseAudioDeltaDeserializer,
} from "../../src/models/models.js";

const endpoint = "https://example.com/api/projects/test-project";

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

describe("voice post-emitter integration", () => {
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
    expect(client.beta.evaluators.list).toBeTypeOf("function");
    expect(client.agents.listSessionFiles).toBeTypeOf("function");
    expect(client.beta.agents.createOptimizationJob).toBeTypeOf("function");
    expect(client.beta.agents.createFromPrompt).toBeTypeOf("function");
    expect(client.beta.voiceAgents.conversations.getAudioItem).toBeTypeOf("function");
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

  it("omits removed campaign operations while retaining call jobs and realtime connections", () => {
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
    expect(client.beta.voiceAgents.realtime.connect).toBeTypeOf("function");
    expect(requests).toHaveLength(0);
  });

  it("preserves arbitrary function JSON Schema through voice union serialization", () => {
    const parameters = {
      type: "object",
      properties: { city: { type: "string", description: "City to look up." } },
      required: ["city"],
      additionalProperties: false,
    };
    const definition: VoiceAgentDefinition = {
      kind: "voice",
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
    expect(agentDefinitionUnionDeserializer(wire)).toMatchObject(definition);
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
