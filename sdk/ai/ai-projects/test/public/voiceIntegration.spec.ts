// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { TokenCredential } from "@azure/core-auth";
import { AbortError } from "@azure/abort-controller";
import type { HttpClient, PipelineRequest, PipelineResponse } from "@azure/core-rest-pipeline";
import type { OperationOptions } from "@azure-rest/core-client";
import { createHttpHeaders } from "@azure/core-rest-pipeline";
import { isNodeLike } from "@azure/core-util";
import { describe, expect, it, vi } from "vitest";
import { AIProjectClient } from "../../src/index.js";
import type {
  VoiceAgentsConversationsListOptionalParams,
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
  bytes?: Uint8Array;
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
      const bodyAsText = response.body === undefined ? undefined : JSON.stringify(response.body);
      const streaming =
        request.streamResponseStatusCodes?.has(Infinity) ||
        request.streamResponseStatusCodes?.has(response.status ?? 200);
      let readableStreamBody: PipelineResponse["readableStreamBody"];
      let browserStreamBody: PipelineResponse["browserStreamBody"];
      if (streaming) {
        const bytes = response.bytes ?? new TextEncoder().encode(bodyAsText);
        if (isNodeLike) {
          const { Readable } = await import("node:stream");
          readableStreamBody = Readable.from([bytes]);
        } else {
          browserStreamBody = new Blob([Uint8Array.from(bytes)]).stream();
        }
      }
      return {
        request,
        status: response.status ?? 200,
        headers: createHttpHeaders({
          "content-type": "application/json",
          ...response.headers,
        }),
        bodyAsText: streaming ? undefined : bodyAsText,
        readableStreamBody,
        browserStreamBody,
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

describe("client operation group integration", () => {
  it("keeps root Agent Insight monitors alongside the shared Realtime client", async () => {
    const { client, requests, getToken } = createClient({
      body: { data: [], has_more: false },
    });

    expect(client.beta).not.toHaveProperty("agentInsightMonitors");
    expect(client.beta.voiceAgents.realtime).toBe(client.voiceAgents.realtime);
    await expect(client.agentInsightMonitors.list().byPage().next()).resolves.toMatchObject({
      done: false,
      value: [],
    });

    expect(requests).toHaveLength(1);
    const url = new URL(requests[0].url);
    expect(url.pathname).toBe("/api/projects/test-project/agent_insight_monitors");
    expect(url.searchParams.get("api-version")).toBe("v1");
    expect(requests[0].headers.get("foundry-features")).toBeUndefined();
    expect(getToken.mock.calls[0]?.[0]).toEqual(["https://ai.azure.com/.default"]);
  });
});

describe("gateway HTTP error preservation", () => {
  it.each([
    { status: 401, body: { statusCode: 401, message: "Unauthorized." } },
    { status: 503, body: { code: "GatewayUnavailable", message: "Gateway unavailable." } },
    { status: 401, body: {} },
  ])("preserves status $status and nonstandard error details", async ({ status, body }) => {
    const { client, requests } = createClient({ status, body });
    await expect(client.agents.get("voice-agent")).rejects.toMatchObject({
      name: "RestError",
      statusCode: status,
      details: body,
    });
    expect(requests).toHaveLength(1);
  });
});

describe("campaign final resource resolution", () => {
  const operationId = "initiating operation/+";
  const operationLocation =
    `${endpoint}/agents/voice%20agent/telephony_campaigns/campaign/operations/` +
    encodeURIComponent(operationId);

  for (const action of ["create", "cancel"] as const) {
    function start(
      client: AIProjectClient,
    ): ReturnType<AIProjectClient["beta"]["voiceAgents"]["telephony"]["create"]> {
      const options = {
        updateIntervalInMs: 0,
        operationId: "request-key-not-response-key",
        ifMatch: '"campaign-etag"',
        requestOptions: { headers: { "x-test-header": "preserved" } },
      };
      return action === "create"
        ? client.beta.voiceAgents.telephony.create(
            "voice agent",
            "campaign",
            campaignInput,
            options,
          )
        : client.beta.voiceAgents.telephony.cancel(
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
      expect(new URL(requests[0].url).pathname).toBe(
        `/api/projects/test-project/agents/voice%20agent/telephony_campaigns/campaign${action === "cancel" ? ":cancel" : ""}`,
      );
      expect(requests[0].headers.get("operation-id")).toBe("request-key-not-response-key");
      expect(requests[0].headers.get("if-match")).toBe('"campaign-etag"');
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

    it(`${action} preserves initiating precondition errors without polling`, async () => {
      const { client, requests } = createClient({
        status: 412,
        body: {
          error: { code: "etag_mismatch", message: "Refresh the Campaign before retrying." },
        },
      });
      await expect(start(client).pollUntilDone()).rejects.toMatchObject({
        statusCode: 412,
        details: { error: { code: "etag_mismatch" } },
      });
      expect(requests).toHaveLength(1);
      expect(requests[0].headers.get("if-match")).toBe('"campaign-etag"');
    });
  }

  it("deletes a campaign without fetching a deleted resource", async () => {
    const { client, requests } = createClient(
      {
        status: 202,
        headers: {
          "operation-location": operationLocation,
          "operation-id": operationId,
          "retry-after": "0",
        },
      },
      { body: { id: operationId, kind: "delete", status: "succeeded" } },
    );
    const poller = client.beta.voiceAgents.telephony.deleteCampaign(
      "voice agent",
      "campaign",
      '"campaign-etag"',
      {
        updateIntervalInMs: 0,
        operationId: "delete-retry-key",
        requestOptions: { headers: { "x-test-header": "preserved" } },
      },
    );
    expect(await poller.pollUntilDone()).toBeUndefined();
    expect(requests).toHaveLength(2);
    expect(requests[0].method).toBe("DELETE");
    expect(new URL(requests[0].url).pathname).toBe(
      "/api/projects/test-project/agents/voice%20agent/telephony_campaigns/campaign",
    );
    expect(requests[1].method).toBe("GET");
    expect(new URL(requests[1].url).pathname).toBe(new URL(operationLocation).pathname);
    for (const request of requests) {
      expect(request.headers.get("foundry-features")).toBe("VoiceAgents=V1Preview");
      expect(request.headers.get("if-match")).toBe('"campaign-etag"');
      expect(request.headers.get("operation-id")).toBe("delete-retry-key");
      expect(request.headers.get("x-test-header")).toBe("preserved");
    }
  });
});

describe("campaign management REST contracts", () => {
  const path = "/api/projects/test-project/agents/voice%20agent/telephony_campaigns";
  const operation = {
    id: "operation/+",
    kind: "delete",
    status: "succeeded",
    created_at: 0,
    finished_at: 1_700_000_001,
  };
  const monitor = `${endpoint}/agents/voice%20agent/telephony_campaigns/campaign%2Fname/operations/operation%2F%2B`;

  it("gets a campaign with an initiating-operation guard rather than its latest operation", async () => {
    const { client, requests } = createClient({ body: campaignResponse });
    const result = await client.beta.voiceAgents.telephony.get("voice agent", "campaign/name", {
      operationId: operation.id,
    });
    expect(result).toMatchObject({
      name: campaignResponse.name,
      operation_id: campaignResponse.operation_id,
      status: "cancelled",
      etag: '"campaign-etag"',
      created_at: new Date(1_700_000_000_000),
      progress: campaignResponse.progress,
    });
    expect(requests).toHaveLength(1);
    expect(requests[0].method).toBe("GET");
    const url = new URL(requests[0].url);
    expect(url.pathname).toBe(`${path}/campaign%2Fname`);
    expect(url.searchParams.get("operation_id")).toBe(operation.id);
    expect(url.searchParams.get("api-version")).toBe("v1");
    expect(requests[0].headers.get("foundry-features")).toBe("VoiceAgents=V1Preview");
  });

  it("gets an encoded operation monitor with its dates and terminal error", async () => {
    const error = { code: "cleanup_failed", message: "Cleanup could not complete." };
    const { client, requests } = createClient({
      body: { ...operation, status: "failed", error },
    });
    const result = await client.beta.voiceAgents.telephony.getOperation(
      "voice agent",
      "campaign/name",
      operation.id,
    );
    expect(result).toEqual({
      ...operation,
      status: "failed",
      error: expect.objectContaining(error),
      created_at: new Date(0),
      finished_at: new Date(1_700_000_001_000),
    });
    expect(requests).toHaveLength(1);
    expect(requests[0].method).toBe("GET");
    expect(new URL(requests[0].url).pathname).toBe(
      `${path}/campaign%2Fname/operations/operation%2F%2B`,
    );
    expect(requests[0].headers.get("foundry-features")).toBe("VoiceAgents=V1Preview");
  });

  it("polls bodyless campaign deletion to void without fetching a removed resource", async () => {
    const { client, requests } = createClient(
      { status: 202, headers: { "operation-location": monitor, "retry-after": "0" } },
      { body: operation },
    );
    const poller = client.beta.voiceAgents.telephony.deleteCampaign(
      "voice agent",
      "campaign/name",
      '"campaign-etag"',
      {
        operationId: "delete-retry/+",
        updateIntervalInMs: 0,
        requestOptions: { headers: { "x-test-header": "retained" } },
      },
    );
    await expect(poller.pollUntilDone()).resolves.toBeUndefined();
    expect(poller.isDone).toBe(true);
    expect(poller.result).toBeUndefined();
    expect(requests).toHaveLength(2);
    expect(requests[0].method).toBe("DELETE");
    expect(new URL(requests[0].url).pathname).toBe(`${path}/campaign%2Fname`);
    expect(requests[0].body).toBeUndefined();
    expect(requests[1].method).toBe("GET");
    expect(new URL(requests[1].url).pathname).toBe(new URL(monitor).pathname);
    for (const request of requests) {
      expect(request.headers.get("if-match")).toBe('"campaign-etag"');
      expect(request.headers.get("operation-id")).toBe("delete-retry/+");
      expect(request.headers.get("foundry-features")).toBe("VoiceAgents=V1Preview");
      expect(request.headers.get("x-test-header")).toBe("retained");
      expect(new URL(request.url).searchParams.get("api-version")).toBe("v1");
    }
  });

  it("accepts an already-deleted campaign's empty 204 without polling", async () => {
    const { client, requests } = createClient({ status: 204 });
    await expect(
      client.beta.voiceAgents.telephony
        .deleteCampaign("voice agent", "campaign/name", '"campaign-etag"', {
          updateIntervalInMs: 0,
        })
        .pollUntilDone(),
    ).resolves.toBeUndefined();
    expect(requests).toHaveLength(1);
    expect(requests[0].method).toBe("DELETE");
  });

  it("surfaces deletion monitor failure without an inferred final GET", async () => {
    const { client, requests } = createClient(
      { status: 202, headers: { "operation-location": monitor, "retry-after": "0" } },
      {
        body: {
          ...operation,
          status: "failed",
          error: { code: "cleanup_failed", message: "Cleanup failed." },
        },
      },
    );
    await expect(
      client.beta.voiceAgents.telephony
        .deleteCampaign("voice agent", "campaign/name", '"campaign-etag"', {
          updateIntervalInMs: 0,
        })
        .pollUntilDone(),
    ).rejects.toThrow("Cleanup failed.");
    expect(requests).toHaveLength(2);
  });

  it("aborts an in-flight deletion monitor without sending another request", async () => {
    const controller = new AbortController();
    const requests: PipelineRequest[] = [];
    let notifyStarted!: () => void;
    const started = new Promise<void>((resolve) => {
      notifyStarted = resolve;
    });
    const client = new AIProjectClient(
      endpoint,
      { getToken: async () => ({ token: "unit-test-token", expiresOnTimestamp: Infinity }) },
      {
        retryOptions: { maxRetries: 0 },
        httpClient: {
          async sendRequest(request) {
            requests.push(request);
            if (requests.length === 1) {
              return {
                request,
                status: 202,
                headers: createHttpHeaders({ "operation-location": monitor, "retry-after": "0" }),
              };
            }
            return new Promise((_resolve, reject) => {
              request.abortSignal?.addEventListener(
                "abort",
                () => reject(new AbortError("Campaign polling was aborted.")),
                { once: true },
              );
              notifyStarted();
            });
          },
        },
      },
    );
    const completion = client.beta.voiceAgents.telephony
      .deleteCampaign("voice agent", "campaign/name", '"campaign-etag"', {
        abortSignal: controller.signal,
        updateIntervalInMs: 0,
      })
      .pollUntilDone();
    const rejection = expect(completion).rejects.toThrow(AbortError);
    await started;
    controller.abort();
    await rejection;
    expect(requests).toHaveLength(2);
    expect(requests[1].abortSignal?.aborted).toBe(true);
    expect(new URL(requests[1].url).pathname).toBe(new URL(monitor).pathname);
  }, 10_000);

  const listCases = [
    {
      name: "campaigns",
      suffix: "",
      first: campaignResponse,
      second: { ...campaignResponse, name: "second-campaign" },
      expected: { name: "second-campaign", created_at: new Date(1_700_000_000_000) },
      list: (client: AIProjectClient) =>
        client.beta.voiceAgents.telephony.list("voice agent", {
          limit: 1,
          order: "asc",
          status: "cancelled",
        }),
    },
    {
      name: "row validation errors",
      suffix: "/campaign%2Fname/validation_errors",
      first: {
        row_number: 1,
        error: {
          code: "invalid_destination",
          message: "Unsupported destination.",
          param: "destination",
        },
      },
      second: {
        row_number: 9,
        error: {
          code: "invalid_input",
          message: "Missing input.",
          param: "structured_inputs.name",
        },
      },
      expected: {
        row_number: 9,
        error: { code: "invalid_input", param: "structured_inputs.name" },
      },
      list: (client: AIProjectClient) =>
        client.beta.voiceAgents.telephony.listValidationErrors("voice agent", "campaign/name", {
          limit: 1,
          order: "asc",
        }),
    },
  ];

  it.each(listCases)(
    "iterates and resumes $name using opaque cursors, not item IDs",
    async ({ first, second, expected, suffix, list }) => {
      const firstPage = { body: { data: [first], last_id: "opaque/+cursor", has_more: true } };
      const secondPage = { body: { data: [second], has_more: false } };
      const { client, requests } = createClient(firstPage, secondPage, firstPage, secondPage);
      const items = [];
      for await (const item of list(client)) items.push(item);
      expect(items).toHaveLength(2);
      expect(items[1]).toMatchObject(expected);
      const page = await list(client).byPage().next();
      expect(page.value).toHaveLength(1);
      expect(page.value?.continuationToken).toBeTruthy();
      const resumed = list(client).byPage({ continuationToken: page.value?.continuationToken });
      expect((await resumed.next()).value?.[0]).toMatchObject(expected);
      expect((await resumed.next()).done).toBe(true);
      expect(requests).toHaveLength(4);
      for (const [index, request] of requests.entries()) {
        const url = new URL(request.url);
        expect(request.method).toBe("GET");
        expect(url.pathname).toBe(`${path}${suffix}`);
        expect(url.searchParams.get("after")).toBe(index % 2 ? "opaque/+cursor" : null);
        expect(url.searchParams.get("limit")).toBe("1");
        expect(url.searchParams.get("order")).toBe("asc");
        expect(url.searchParams.get("status")).toBe(suffix ? null : "cancelled");
        expect(request.headers.get("foundry-features")).toBe("VoiceAgents=V1Preview");
      }
    },
  );

  it.each(listCases)(
    "preserves invalid-cursor errors for $name",
    async ({ first, suffix, list }) => {
      const { client, requests } = createClient(
        { body: { data: [first], last_id: "stale/+", has_more: true } },
        {
          status: 400,
          body: { error: { code: "invalid_cursor", message: "The Campaign round changed." } },
        },
      );
      const pages = list(client).byPage();
      expect((await pages.next()).value).toHaveLength(1);
      await expect(pages.next()).rejects.toMatchObject({
        statusCode: 400,
        details: { error: { code: "invalid_cursor" } },
      });
      expect(requests).toHaveLength(2);
      expect(new URL(requests[1].url).pathname).toBe(`${path}${suffix}`);
      expect(new URL(requests[1].url).searchParams.get("after")).toBe("stale/+");
    },
  );
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
        foundryFeatures: "VoiceAgents=V1Preview",
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
    await client.voiceAgents.telephony.getBinding("voice agent", "binding");
    expect(requests).toHaveLength(1);
    expect(new URL(requests[0].url).pathname).toBe(
      "/api/projects/test-project/agents/voice%20agent/telephony/bindings/binding",
    );
    expect(requests[0].headers.get("foundry-features")).toBeUndefined();
    expect(requests[0].headers.get(isNodeLike ? "user-agent" : "x-ms-useragent")).toContain(
      "integration-test azsdk-js-client azsdk-js-api azsdk-js-ai-projects/",
    );
    expect(getToken.mock.calls[0][0]).toEqual(["https://ai.azure.com/.default"]);
    expect(client.endpoint).toBe(endpoint);
    expect(client.evaluators.list).toBeTypeOf("function");
    expect(client.agents.listSessionFiles).toBeTypeOf("function");
    expect(client.agents.createOptimizationJob).toBeTypeOf("function");
    expect(client.beta).not.toHaveProperty("agents");
    expect(client.agents.createFromPrompt).toBeTypeOf("function");
    expect(client.beta.voiceAgents).not.toHaveProperty("conversations");
    expect(client.voiceAgents.conversations.getAudioItem).toBeTypeOf("function");
    expect(client.beta.voiceAgents.liveConversations.getAudioItem).toBeTypeOf("function");
    expect(client.voiceAgents.conversations.getGeneratedAudioItem).toBeTypeOf("function");
    expect(client.beta).not.toHaveProperty("voiceAgentWebSocket");
    // The native GA connection client shares the root Voice Agents operation group.
    expect(client.voiceAgents.realtime.connect).toBeTypeOf("function");
  });

  it("preserves the ErrorModel shape for failed GA calls", async () => {
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
    await expect(client.voiceAgents.telephony.getBinding("agent", "binding")).rejects.toMatchObject(
      {
        statusCode: 409,
        details: {
          error: {
            code: "agent_disabled",
            message: "Enable the agent first.",
            param: "agent",
            details: [{ code: "disabled", message: "Not enabled." }],
          },
        },
      },
    );
  });

  describe("voice persisted conversation REST contracts", () => {
    const path =
      "/api/projects/test-project/agents/voice%20agent/endpoint/protocols/voice/conversations";
    const conversationPath = `${path}/conversation%2Fid`;
    const livePath =
      "/api/projects/test-project/agents/voice%20agent/endpoint/protocols/voice/live/conversations/conversation%2Fid";
    const conversation = {
      id: "conversation/id",
      object: "voice.conversation",
      status: "completed",
      created_at: 0,
      completed_at: 1_700_000_001,
      metadata: { purpose: "test" },
      usage: { total_tokens: 0, input_tokens: 0, output_tokens: 0 },
    };
    const item = {
      id: "item/id",
      object: "realtime.item",
      type: "message",
      role: "assistant",
      status: "completed",
      content: [{ type: "output_audio", transcript: "Hello." }],
      response_id: "response/id",
      created_at: 1_700_000_000,
    };
    const response = {
      id: "response/id",
      object: "realtime.response",
      status: "cancelled",
      conversation_id: conversation.id,
      metadata: { purpose: "test" },
      output: [item],
      usage: conversation.usage,
      created_at: 0,
      completed_at: 1_700_000_001,
    };
    const expectedItem = { ...item, created_at: new Date(1_700_000_000_000) };
    const expectedResponse = {
      ...response,
      metadata: { additionalProperties: { purpose: "test" } },
      output: [expectedItem],
      created_at: new Date(0),
      completed_at: new Date(1_700_000_001_000),
    };
    const expectedConversation = {
      ...conversation,
      created_at: new Date(0),
      completed_at: new Date(1_700_000_001_000),
    };

    it.each([
      {
        name: "conversation",
        suffix: "",
        body: conversation,
        expected: expectedConversation,
        get: (client: AIProjectClient) =>
          client.voiceAgents.conversations.get("voice agent", conversation.id),
      },
      {
        name: "response",
        suffix: "/responses/response%2Fid",
        body: response,
        expected: expectedResponse,
        get: (client: AIProjectClient) =>
          client.voiceAgents.conversations.getResponse("voice agent", conversation.id, response.id),
      },
      {
        name: "item",
        suffix: "/items/item%2Fid",
        body: item,
        expected: expectedItem,
        get: (client: AIProjectClient) =>
          client.voiceAgents.conversations.getItem("voice agent", conversation.id, item.id),
      },
    ])(
      "gets a persisted $name without losing projection or metadata fields",
      async ({ body, expected, suffix, get }) => {
        const { client, requests } = createClient({ body });
        expect(await get(client)).toMatchObject(expected);
        expect(requests).toHaveLength(1);
        expect(requests[0].method).toBe("GET");
        const url = new URL(requests[0].url);
        expect(url.pathname).toBe(`${conversationPath}${suffix}`);
        expect(url.searchParams.get("api-version")).toBe("v1");
        expect(requests[0].headers.get("foundry-features")).toBeUndefined();
      },
    );

    const lists = [
      {
        name: "conversations",
        listPath: path,
        wire: conversation,
        expected: expectedConversation,
        list: (client: AIProjectClient) =>
          client.voiceAgents.conversations.list("voice agent", { limit: 1, order: "asc" }),
      },
      {
        name: "responses",
        listPath: `${conversationPath}/responses`,
        wire: { ...response, output: undefined },
        expected: { ...expectedResponse, output: undefined },
        list: (client: AIProjectClient) =>
          client.voiceAgents.conversations.listResponses("voice agent", conversation.id, {
            limit: 1,
            order: "asc",
          }),
      },
      {
        name: "items",
        listPath: `${conversationPath}/items`,
        wire: item,
        expected: expectedItem,
        list: (client: AIProjectClient) =>
          client.voiceAgents.conversations.listItems("voice agent", conversation.id, {
            limit: 1,
            order: "asc",
          }),
      },
      {
        name: "response items",
        listPath: `${conversationPath}/responses/response%2Fid/items`,
        wire: item,
        expected: expectedItem,
        list: (client: AIProjectClient) =>
          client.voiceAgents.conversations.listResponseItems(
            "voice agent",
            conversation.id,
            response.id,
            { limit: 1, order: "asc" },
          ),
      },
    ];

    it.each(lists)(
      "iterates and resumes nonempty persisted $name",
      async ({ wire, expected, listPath, list }) => {
        const first = { body: { data: [wire], last_id: "cursor/+", has_more: true } };
        const second = { body: { data: [{ ...wire, id: "second" }], has_more: false } };
        const { client, requests } = createClient(first, second, first, second);
        const items = [];
        for await (const value of list(client)) items.push(value);
        expect(items).toHaveLength(2);
        expect(items[0]).toMatchObject(expected);
        expect(items[1]).toMatchObject({ ...expected, id: "second" });
        const firstPage = await list(client).byPage().next();
        expect(firstPage.value?.continuationToken).toBeTruthy();
        const resumed = list(client).byPage({
          continuationToken: firstPage.value?.continuationToken,
        });
        expect((await resumed.next()).value?.[0]).toMatchObject({ ...expected, id: "second" });
        expect((await resumed.next()).done).toBe(true);
        expect(requests).toHaveLength(4);
        for (const [index, request] of requests.entries()) {
          const url = new URL(request.url);
          expect(request.method).toBe("GET");
          expect(url.pathname).toBe(listPath);
          expect(url.searchParams.get("after")).toBe(index % 2 ? "cursor/+" : null);
          expect(url.searchParams.get("limit")).toBe("1");
          expect(url.searchParams.get("order")).toBe("asc");
          expect(url.searchParams.get("api-version")).toBe("v1");
          expect(request.headers.get("foundry-features")).toBeUndefined();
        }
      },
    );

    it("deletes persisted Realtime data with an empty 204 response", async () => {
      const { client, requests } = createClient({ status: 204 });
      await expect(
        client.voiceAgents.conversations.delete("voice agent", conversation.id),
      ).resolves.toBeUndefined();
      expect(requests).toHaveLength(1);
      expect(requests[0].method).toBe("DELETE");
      expect(new URL(requests[0].url).pathname).toBe(conversationPath);
      expect(requests[0].headers.get("foundry-features")).toBeUndefined();
      expect(requests[0].body).toBeUndefined();
    });

    const audioItem = {
      conversation_id: conversation.id,
      item_id: item.id,
      role: "agent",
      format: "wav",
      codec: "pcm16",
      sample_rate: 24000,
      channels: 1,
      start_offset_ms: 0,
      duration_ms: 120,
      blob_uri: "https://example.blob.core.windows.net/audio/item.wav",
    };
    const recording = {
      conversation_id: conversation.id,
      format: "wav",
      sample_rate: 24000,
      channels: 2,
      channel_layout: { left: "user", right: "agent" },
      duration_ms: 120,
      blob_uri: "https://example.blob.core.windows.net/audio/conversation.wav",
    };

    it.each([
      {
        name: "merged Realtime recording",
        resource: `${conversationPath}/audio`,
        body: recording,
        get: (client: AIProjectClient) =>
          client.voiceAgents.conversations.getAudio("voice agent", conversation.id),
      },
      {
        name: "heard Realtime item",
        resource: `${conversationPath}/items/item%2Fid/audio`,
        body: audioItem,
        get: (client: AIProjectClient) =>
          client.voiceAgents.conversations.getAudioItem("voice agent", conversation.id, item.id),
      },
      {
        name: "generated Realtime item",
        resource: `${conversationPath}/items/item%2Fid/audio/generated`,
        body: audioItem,
        get: (client: AIProjectClient) =>
          client.voiceAgents.conversations.getGeneratedAudioItem(
            "voice agent",
            conversation.id,
            item.id,
          ),
      },
      {
        name: "merged Live recording",
        resource: `${livePath}/audio`,
        body: recording,
        get: (client: AIProjectClient) =>
          client.beta.voiceAgents.liveConversations.getAudio("voice agent", conversation.id),
      },
      {
        name: "captured Live item",
        resource: `${livePath}/items/item%2Fid/audio`,
        body: audioItem,
        get: (client: AIProjectClient) =>
          client.beta.voiceAgents.liveConversations.getAudioItem(
            "voice agent",
            conversation.id,
            item.id,
          ),
      },
    ])(
      "preserves BYOS metadata for $name without fetching customer storage",
      async ({ resource, body, get }) => {
        const { client, requests } = createClient({ body });
        expect(await get(client)).toMatchObject(body);
        expect(requests).toHaveLength(1);
        expect(requests[0].method).toBe("GET");
        expect(new URL(requests[0].url).pathname).toBe(resource);
        expect(requests[0].headers.get("accept")).toBe("application/json");
        expect(requests[0].headers.get("foundry-features")).toBe(
          resource.startsWith(livePath) ? "VoiceAgents=V1Preview" : undefined,
        );
      },
    );

    const downloads = [
      {
        name: "merged Realtime audio",
        resource: `${conversationPath}/audio/content`,
        get: (client: AIProjectClient, options: OperationOptions) =>
          client.voiceAgents.conversations.downloadAudio("voice agent", conversation.id, options),
      },
      {
        name: "heard Realtime item audio",
        resource: `${conversationPath}/items/item%2Fid/audio/content`,
        get: (client: AIProjectClient, options: OperationOptions) =>
          client.voiceAgents.conversations.downloadAudioItem(
            "voice agent",
            conversation.id,
            item.id,
            options,
          ),
      },
      {
        name: "generated Realtime item audio",
        resource: `${conversationPath}/items/item%2Fid/audio/generated/content`,
        get: (client: AIProjectClient, options: OperationOptions) =>
          client.voiceAgents.conversations.downloadGeneratedAudioItem(
            "voice agent",
            conversation.id,
            item.id,
            options,
          ),
      },
      {
        name: "merged Live audio",
        resource: `${livePath}/audio/content`,
        get: (client: AIProjectClient, options: OperationOptions) =>
          client.beta.voiceAgents.liveConversations.downloadAudio(
            "voice agent",
            conversation.id,
            options,
          ),
      },
      {
        name: "captured Live item audio",
        resource: `${livePath}/items/item%2Fid/audio/content`,
        get: (client: AIProjectClient, options: OperationOptions) =>
          client.beta.voiceAgents.liveConversations.downloadAudioItem(
            "voice agent",
            conversation.id,
            item.id,
            options,
          ),
      },
    ];

    it.each(downloads)(
      "downloads $name without JSON-decoding its bytes",
      async ({ resource, get }) => {
        const bytes = new Uint8Array([82, 73, 70, 70, 0, 1, 128, 255]);
        const { client, requests } = createClient({
          bytes,
          headers: { "content-type": "audio/wav" },
        });
        const controller = new AbortController();
        const audio = await get(client, {
          abortSignal: controller.signal,
          requestOptions: { headers: { "x-test-header": "retained" } },
        });
        let actual: Uint8Array;
        if (audio.blobBody) {
          actual = new Uint8Array(await (await audio.blobBody).arrayBuffer());
        } else {
          if (!audio.readableStreamBody) throw new Error("Missing audio stream.");
          const { buffer } = await import("node:stream/consumers");
          actual = await buffer(audio.readableStreamBody);
        }
        expect(Array.from(actual)).toEqual(Array.from(bytes));
        expect(requests).toHaveLength(1);
        expect(requests[0].method).toBe("GET");
        expect(new URL(requests[0].url).pathname).toBe(resource);
        expect(new URL(requests[0].url).searchParams.get("api-version")).toBe("v1");
        expect(requests[0].headers.get("accept")).toBe("audio/wav");
        expect(requests[0].headers.get("foundry-features")).toBe(
          resource.startsWith(livePath) ? "VoiceAgents=V1Preview" : undefined,
        );
        expect(requests[0].headers.get("x-test-header")).toBe("retained");
        expect(requests[0].abortSignal).toBe(controller.signal);
      },
    );

    it.each([
      { ...downloads[0], status: 409, code: "recording_not_ready" },
      { ...downloads[1], status: 404, code: "not_persisted" },
      { ...downloads[2], status: 404, code: "generated_audio_not_found" },
      {
        name: "failed Live merged audio",
        resource: `${livePath}/audio/content`,
        status: 409,
        code: "recording_unavailable",
        get: (client: AIProjectClient, options: OperationOptions) =>
          client.beta.voiceAgents.liveConversations.downloadAudio(
            "voice agent",
            conversation.id,
            options,
          ),
      },
      {
        name: "Live delegation audio",
        resource: `${livePath}/items/item%2Fid/audio/content`,
        status: 404,
        code: "audio_not_found",
        get: (client: AIProjectClient, options: OperationOptions) =>
          client.beta.voiceAgents.liveConversations.downloadAudioItem(
            "voice agent",
            conversation.id,
            item.id,
            options,
          ),
      },
    ])("parses streamed service errors for $name", async ({ get, resource, status, code }) => {
      const { client, requests } = createClient({
        status,
        body: {
          error: { code, message: "Stored audio is not available.", param: "conversation_id" },
        },
        headers: { "retry-after": "2" },
      });
      await expect(get(client, {})).rejects.toMatchObject({
        statusCode: status,
        details: { error: { code, param: "conversation_id" } },
      });
      expect(requests).toHaveLength(1);
      expect(requests[0].method).toBe("GET");
      expect(new URL(requests[0].url).pathname).toBe(resource);
      expect(requests[0].headers.get("foundry-features")).toBe(
        resource.startsWith(livePath) ? "VoiceAgents=V1Preview" : undefined,
      );
    });

    const liveItems = [
      {
        id: "input/id",
        type: "input",
        transcription: "An account question.",
        audio: {
          conversation_id: conversation.id,
          item_id: "input/id",
          role: "user",
          format: "wav",
          codec: "pcm16",
          sample_rate: 24000,
          channels: 1,
          start_offset_ms: 0,
          duration_ms: 500,
        },
      },
      {
        id: "output/id",
        type: "output",
        transcription: "An account answer.",
        audio: {
          conversation_id: conversation.id,
          item_id: "output/id",
          role: "agent",
          format: "wav",
          codec: "pcm16",
          sample_rate: 24000,
          channels: 1,
          start_offset_ms: 500,
          duration_ms: 1000,
        },
      },
      {
        id: "client/id",
        type: "delegation",
        target: "client",
        created_at: 0,
        commentary: "Accepted client guidance.",
        thinking: "Accepted client context.",
      },
      {
        id: "responses/id",
        type: "delegation",
        target: "responses",
        response_id: "backend-response",
        created_at: 1_700_000_000,
        output: "A backend response, not spoken audio.",
      },
      {
        id: "agent/id",
        type: "delegation",
        target: "foundry_managed_agent",
        agent_name: "helper",
        agent_version: "3",
        backend_conversation_id: "backend-conversation",
        created_at: 1_700_000_001,
        offset_ms: 0,
        status: "cancelled",
        delegation_context: "An account question.",
        output: [{ commentary: "Accepted partial guidance.", thinking: "Accepted context." }],
      },
    ] as const;
    const liveItemCases = liveItems.map((wire) => ({
      wire,
      expected:
        "created_at" in wire ? { ...wire, created_at: new Date(wire.created_at * 1000) } : wire,
    }));

    it.each(liveItemCases)(
      "gets a stored Live $wire.type item $wire.id without losing subtype fields",
      async ({ wire, expected }) => {
        const { client, requests } = createClient({ body: wire });
        const result = await client.beta.voiceAgents.liveConversations.getItem(
          "voice agent",
          conversation.id,
          wire.id,
        );
        expect(result).toMatchObject(expected);
        if (wire.type === "delegation") {
          expect(result).not.toHaveProperty("transcription");
          expect(result).not.toHaveProperty("audio");
        }
        expect(requests).toHaveLength(1);
        expect(requests[0].method).toBe("GET");
        expect(new URL(requests[0].url).pathname).toBe(
          `${livePath}/items/${encodeURIComponent(wire.id)}`,
        );
        expect(requests[0].headers.get("foundry-features")).toBe("VoiceAgents=V1Preview");
      },
    );

    it("deserializes speech and all delegation targets across non-empty Live item pages", async () => {
      const { client, requests } = createClient(
        { body: { data: liveItems.slice(0, 2), last_id: "output/id", has_more: true } },
        { body: { data: liveItems.slice(2), last_id: "agent/id", has_more: false } },
      );
      const results = [];
      for await (const stored of client.beta.voiceAgents.liveConversations.listItems(
        "voice agent",
        conversation.id,
        { limit: 2, order: "asc" },
      )) {
        results.push(stored);
      }
      expect(results).toMatchObject(liveItemCases.map(({ expected }) => expected));
      expect(results).toHaveLength(liveItems.length);
      expect(requests).toHaveLength(2);
      expect(new URL(requests[1].url).searchParams.get("after")).toBe("output/id");
      for (const request of requests) {
        expect(new URL(request.url).pathname).toBe(`${livePath}/items`);
        expect(request.headers.get("foundry-features")).toBe("VoiceAgents=V1Preview");
      }
    });

    it("deletes stored Live data with the required preview flag and an empty response", async () => {
      const { client, requests } = createClient({ status: 204 });
      await expect(
        client.beta.voiceAgents.liveConversations.delete("voice agent", conversation.id),
      ).resolves.toBeUndefined();
      expect(requests).toHaveLength(1);
      expect(requests[0].method).toBe("DELETE");
      expect(new URL(requests[0].url).pathname).toBe(livePath);
      expect(requests[0].headers.get("foundry-features")).toBe("VoiceAgents=V1Preview");
      expect(requests[0].body).toBeUndefined();
    });
  });

  it.each([
    {
      name: "recorded audio",
      suffix: "",
      get: (client: AIProjectClient) =>
        client.voiceAgents.conversations.getAudioItem("voice agent", "conversation/id", "item/id"),
    },
    {
      name: "generated audio",
      suffix: "/generated",
      get: (client: AIProjectClient) =>
        client.voiceAgents.conversations.getGeneratedAudioItem(
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
      expect(requests[0].headers.get("foundry-features")).toBeUndefined();
    },
  );

  const listCases = [
    {
      name: "conversations",
      previewRequired: false,
      list: (client: AIProjectClient, options: VoiceAgentsConversationsListOptionalParams) =>
        client.voiceAgents.conversations.list("agent", options),
    },
    {
      name: "responses",
      previewRequired: false,
      list: (client: AIProjectClient, options: VoiceAgentsConversationsListOptionalParams) =>
        client.voiceAgents.conversations.listResponses("agent", "conversation", options),
    },
    {
      name: "items",
      previewRequired: false,
      list: (client: AIProjectClient, options: VoiceAgentsConversationsListOptionalParams) =>
        client.voiceAgents.conversations.listItems("agent", "conversation", options),
    },
    {
      name: "response items",
      previewRequired: false,
      list: (client: AIProjectClient, options: VoiceAgentsConversationsListOptionalParams) =>
        client.voiceAgents.conversations.listResponseItems(
          "agent",
          "conversation",
          "response",
          options,
        ),
    },
    {
      name: "telephony bindings",
      previewRequired: false,
      list: (client: AIProjectClient, options: VoiceAgentsConversationsListOptionalParams) =>
        client.voiceAgents.telephony.listBindings("agent", options),
    },
    {
      name: "telephony calls",
      previewRequired: false,
      list: (client: AIProjectClient, options: VoiceAgentsConversationsListOptionalParams) =>
        client.voiceAgents.telephony.listCalls("agent", options),
    },
    {
      name: "telephony call jobs",
      previewRequired: false,
      list: (client: AIProjectClient, options: VoiceAgentsConversationsListOptionalParams) =>
        client.voiceAgents.telephony.listCallJobs("agent", options),
    },
    {
      name: "campaigns",
      previewRequired: true,
      list: (client: AIProjectClient, options: VoiceAgentsConversationsListOptionalParams) =>
        client.beta.voiceAgents.telephony.list("agent", options),
    },
    {
      name: "campaign validation errors",
      previewRequired: true,
      list: (client: AIProjectClient, options: VoiceAgentsConversationsListOptionalParams) =>
        client.beta.voiceAgents.telephony.listValidationErrors("agent", "campaign", options),
    },
    {
      name: "Live conversations",
      previewRequired: true,
      list: (client: AIProjectClient, options: VoiceAgentsConversationsListOptionalParams) =>
        client.beta.voiceAgents.liveConversations.list("agent", options),
    },
    {
      name: "Live conversation items",
      previewRequired: true,
      list: (client: AIProjectClient, options: VoiceAgentsConversationsListOptionalParams) =>
        client.beta.voiceAgents.liveConversations.listItems("agent", "conversation", options),
    },
  ];

  for (const explicitPreview of [false, true]) {
    it.each(listCases)(
      `retains scoped ${explicitPreview ? "explicit" : "default"} flags and cursor request options for $name`,
      async ({ list, previewRequired }) => {
        const { client, requests } = createClient(
          { body: { data: [], last_id: "cursor-1", has_more: true } },
          { body: { data: [], last_id: "cursor-2", has_more: false } },
          { body: { data: [], last_id: "cursor-1", has_more: true } },
          { body: { data: [], last_id: "cursor-2", has_more: false } },
        );
        const abortController = new AbortController();
        const onResponse = vi.fn();
        const listOptions: VoiceAgentsConversationsListOptionalParams = {
          limit: 2,
          order: "asc",
          abortSignal: abortController.signal,
          onResponse,
          requestOptions: {
            timeout: 1234,
            headers: {
              ...(explicitPreview ? { "foundry-features": "VoiceAgents=V1Preview" } : {}),
              "x-custom": "retained",
            },
          },
        };
        const pages = list(client, listOptions).byPage();
        const first = await pages.next();
        expect(first.value?.continuationToken).toContain("after=cursor-1");
        await pages.next();
        expect((await pages.next()).done).toBe(true);
        const firstPage = await list(client, listOptions).byPage().next();
        expect(firstPage.value?.continuationToken).toContain("after=cursor-1");
        const resumed = list(client, listOptions).byPage({
          continuationToken: firstPage.value?.continuationToken,
        });
        expect((await resumed.next()).done).toBe(false);
        expect((await resumed.next()).done).toBe(true);
        expect(requests).toHaveLength(4);
        const nextUrl = new URL(requests[1].url);
        expect(nextUrl.searchParams.get("after")).toBe("cursor-1");
        expect(nextUrl.searchParams.get("limit")).toBe("2");
        expect(nextUrl.searchParams.get("order")).toBe("asc");
        expect(nextUrl.searchParams.get("api-version")).toBe("v1");
        for (const [index, request] of requests.entries()) {
          expect(new URL(request.url).searchParams.get("after")).toBe(
            index % 2 ? "cursor-1" : null,
          );
          expect(request.abortSignal).toBe(abortController.signal);
          expect(request.timeout).toBe(1234);
          expect(request.headers.get("foundry-features")).toBe(
            explicitPreview || previewRequired ? "VoiceAgents=V1Preview" : undefined,
          );
          expect(request.headers.get("x-custom")).toBe("retained");
        }
        expect(onResponse).toHaveBeenCalledTimes(4);
      },
    );
  }

  it("wires campaigns separately from GA telephony without restoring legacy APIs", () => {
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
    ]) {
      expect(client.beta.voiceAgents.telephony).not.toHaveProperty(name);
    }
    for (const name of [
      "createCallJob",
      "getCallJob",
      "cancelCallJob",
      "listCallJobs",
      "deleteCallJob",
      "createBinding",
      "getBinding",
      "updateBinding",
      "deleteBinding",
      "listBindings",
      "getCall",
      "listCalls",
      "transferCall",
      "endCall",
      "getTransferTargets",
      "replaceTransferTargets",
    ]) {
      expect(client.voiceAgents.telephony).toHaveProperty(name, expect.any(Function));
      expect(client.beta.voiceAgents.telephony).not.toHaveProperty(name);
    }
    expect(client.voiceAgents.telephony.createCallJob).toBeTypeOf("function");
    expect(client.voiceAgents.telephony.getCallJob).toBeTypeOf("function");
    expect(client.voiceAgents.telephony.cancelCallJob).toBeTypeOf("function");
    expect(client.voiceAgents.telephony.listCallJobs).toBeTypeOf("function");
    expect(client.voiceAgents.telephony.deleteCallJob).toBeTypeOf("function");
    expect(client.beta.voiceAgents).not.toHaveProperty("campaigns");
    expect(client.beta.voiceAgents.telephony.create).toBeTypeOf("function");
    expect(client.beta.voiceAgents.telephony.get).toBeTypeOf("function");
    expect(client.beta.voiceAgents.telephony.list).toBeTypeOf("function");
    expect(client.beta.voiceAgents.telephony.cancel).toBeTypeOf("function");
    expect(client.beta.voiceAgents.telephony.listValidationErrors).toBeTypeOf("function");
    expect(client.beta.voiceAgents.telephony.getOperation).toBeTypeOf("function");
    expect(client.beta.voiceAgents.telephony.deleteCampaign).toBeTypeOf("function");
    expect(client.beta.voiceAgents.liveConversations.get).toBeTypeOf("function");
    expect(client.beta.voiceAgents.liveConversations).not.toHaveProperty("connect");
    expect(client.voiceAgents.realtime.connect).toBeTypeOf("function");
    expect(requests).toHaveLength(0);
  });

  it("retains the deprecated campaign deletion alias", () => {
    const { client } = createClient();
    expect(client.beta.voiceAgents.telephony.deleteTelephony).toBe(
      client.beta.voiceAgents.telephony.deleteCampaign,
    );
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
