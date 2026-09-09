// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { TokenCredential } from "@azure/core-auth";
import type { HttpClient, PipelineRequest } from "@azure/core-rest-pipeline";
import { createHttpHeaders } from "@azure/core-rest-pipeline";
import { describe, expect, it, vi } from "vitest";
import { AIProjectClient } from "../../src/index.js";
import type {
  BetaAgentTelephonyValidateCampaignOptionalParams,
  BetaAgentEndpointConversationsListOptionalParams,
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
  it("wires the beta WebSocket route without changing authentication or user agents", async () => {
    const { client, requests, getToken } = createClient({ status: 101 });
    // This tests HTTP handshake routing, not an actual WebSocket transport.
    await client.beta.voiceAgentWebSocket.connectVoiceAgent("voice agent", {
      foundryFeatures: "VoiceAgents=V1Preview",
      websocketSubprotocol: "realtime",
      store: false,
    });
    expect(requests).toHaveLength(1);
    expect(new URL(requests[0].url).pathname).toBe(
      "/api/projects/test-project/agents/voice%20agent/endpoint/protocols/voice",
    );
    expect(new URL(requests[0].url).searchParams.get("store")).toBe("false");
    expect(requests[0].headers.get("foundry-features")).toBe("VoiceAgents=V1Preview");
    expect(requests[0].headers.get("sec-websocket-protocol")).toBe("realtime");
    expect(requests[0].headers.get("user-agent")).toContain(
      "integration-test azsdk-js-client azsdk-js-api azsdk-js-ai-projects/",
    );
    expect(getToken.mock.calls[0][0]).toEqual(["https://ai.azure.com/.default"]);
    expect(client.endpoint).toBe(endpoint);
    expect(client.beta.evaluators.list).toBeTypeOf("function");
    expect(client.agents.listSessionFiles).toBeTypeOf("function");
    expect(client.beta.agents.createOptimizationJob).toBeTypeOf("function");
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
    await expect(client.beta.voiceAgentWebSocket.connectVoiceAgent("agent")).rejects.toMatchObject({
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

  const listCases = [
    {
      name: "conversations",
      list: (client: AIProjectClient, options: BetaAgentEndpointConversationsListOptionalParams) =>
        client.beta.agentEndpointConversations.list("agent", options),
    },
    {
      name: "responses",
      list: (client: AIProjectClient, options: BetaAgentEndpointConversationsListOptionalParams) =>
        client.beta.agentEndpointConversations.listResponses("agent", "conversation", options),
    },
    {
      name: "items",
      list: (client: AIProjectClient, options: BetaAgentEndpointConversationsListOptionalParams) =>
        client.beta.agentEndpointConversations.listItems("agent", "conversation", options),
    },
    {
      name: "response items",
      list: (client: AIProjectClient, options: BetaAgentEndpointConversationsListOptionalParams) =>
        client.beta.agentEndpointConversations.listResponseItems(
          "agent",
          "conversation",
          "response",
          options,
        ),
    },
    {
      name: "telephony bindings",
      list: (client: AIProjectClient, options: BetaAgentEndpointConversationsListOptionalParams) =>
        client.agents.listTelephonyBindings("agent", options),
    },
    {
      name: "telephony calls",
      list: (client: AIProjectClient, options: BetaAgentEndpointConversationsListOptionalParams) =>
        client.agents.listTelephonyCalls("agent", options),
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

  const campaignCases = [
    {
      name: "validate",
      start: (client: AIProjectClient, options: BetaAgentTelephonyValidateCampaignOptionalParams) =>
        client.beta.agentTelephony.validateCampaign("agent", "campaign", options),
    },
    {
      name: "publish",
      start: (client: AIProjectClient, options: BetaAgentTelephonyValidateCampaignOptionalParams) =>
        client.beta.agentTelephony.publishCampaign(
          "agent",
          "campaign",
          { validation_id: "validation" },
          options,
        ),
    },
    {
      name: "import",
      start: (client: AIProjectClient, options: BetaAgentTelephonyValidateCampaignOptionalParams) =>
        client.beta.agentTelephony.importCampaignRecipients(
          "agent",
          "campaign",
          "idempotency-key",
          {
            source: {
              type: "dataset",
              dataset_name: "recipients",
              dataset_version: "1",
              file_name: "recipients.csv",
              format: "csv",
            },
          },
          options,
        ),
    },
  ];

  it.each(campaignCases)(
    "retains poll headers and terminal resource id for $name",
    async ({ start }) => {
      const { client, requests } = createClient(
        {
          status: 202,
          headers: { "operation-location": `${endpoint}/agents/agent/telephony/operations/op-1` },
          body: { id: "op-1", status: "running" },
        },
        {
          body: {
            id: "op-1",
            status: "succeeded",
            resource: { id: "campaign-1", type: "telephony.campaign" },
          },
        },
      );
      const poller = start(client, {
        updateIntervalInMs: 0,
        foundryFeatures: "VoiceAgents=V1Preview",
        requestOptions: { headers: { "x-custom": "retained" } },
      });
      expect(await poller.pollUntilDone()).toEqual({
        id: "campaign-1",
        type: "telephony.campaign",
      });
      expect(requests).toHaveLength(2);
      expect(requests[1].method).toBe("GET");
      expect(new URL(requests[1].url).searchParams.get("api-version")).toBe("v1");
      for (const request of requests) {
        expect(request.headers.get("foundry-features")).toBe("VoiceAgents=V1Preview");
        expect(request.headers.get("x-custom")).toBe("retained");
      }
    },
  );

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
