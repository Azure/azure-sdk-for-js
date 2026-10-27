// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { context, trace, ROOT_CONTEXT, SpanKind, SpanStatusCode } from "@opentelemetry/api";
import {
  InMemorySpanExporter,
  NodeTracerProvider,
  SimpleSpanProcessor,
} from "@opentelemetry/sdk-trace-node";
import { AIProjectClient, VoiceAgentRealtimeClient } from "@azure/ai-projects";
import type { GenAITracingOptions } from "@azure/ai-projects";
import type { OperationOptions } from "@azure-rest/core-client";
import { AbortError } from "@azure/abort-controller";
import { createHttpHeaders } from "@azure/core-rest-pipeline";
import type { HttpClient, PipelineRequest } from "@azure/core-rest-pipeline";
import type {
  VoiceAgentWebSocketFactory,
  VoiceAgentWebSocketHandlers,
  VoiceAgentWebSocketTransport,
} from "$internal/realtime/webSocketTransportLike.js";

const endpoint = "https://example.test/api/projects/test";
const restCredential = {
  getToken: async () => ({ token: "PRIVATE_TOKEN", expiresOnTimestamp: Infinity }),
};
const callJob = {
  id: "job-1",
  object: "telephony.call_job",
  agent_name: "PRIVATE_AGENT",
  connection_name: "PRIVATE_CONNECTION",
  status: "accepted",
  source: "+15555550200",
  destination: { type: "phone_number", value: "+15555550100" },
  retry_policy: { type: "none" },
  attempt_count: 0,
  revision: 1,
  created_at: 1,
  updated_at: 1,
};
const binding = {
  id: "binding-1",
  provider: "twilio",
  connection_name: "PRIVATE_CONNECTION",
  phone_number: "+15555550100",
  label: "PRIVATE_LABEL",
  status: "active",
};
const call = {
  id: "call-1",
  provider: "twilio",
  caller_number: "+15555550100",
  provider_number: "+15555550200",
  status: "success",
  phase: "completed",
  started_at: 1,
  timing: { timestamp_source: "provider" },
  events: [],
  events_truncated: false,
};

interface RestTelemetryCase {
  name: string;
  method: string;
  status: number;
  body?: Record<string, unknown>;
  invoke: (client: AIProjectClient, options: OperationOptions) => Promise<unknown>;
}

const restTelemetryCases: RestTelemetryCase[] = [
  {
    name: "create_agent",
    method: "POST",
    status: 200,
    body: {
      id: "agent-1",
      name: "voice",
      object: "agent",
      versions: {
        latest: {
          id: "version-1",
          name: "voice",
          version: "1",
          created_at: 1,
          definition: { kind: "voice", model_type: "managed", instructions: "PRIVATE_PROMPT" },
        },
      },
    },
    invoke: (client, options) =>
      client.beta.agents.createFromPrompt(
        { kind: "voice", name: "voice", goal: "PRIVATE_GOAL" },
        options,
      ),
  },
  {
    name: "voice_agents.telephony.create_call_job",
    method: "POST",
    status: 202,
    body: callJob,
    invoke: (client, options) =>
      client.beta.voiceAgents.telephony.createCallJob(
        "PRIVATE_AGENT",
        "PRIVATE_IDEMPOTENCY",
        {
          connection_name: "PRIVATE_CONNECTION",
          source: "+15555550200",
          destination: { type: "phone_number", value: "+15555550100" },
        },
        options,
      ),
  },
  {
    name: "voice_agents.telephony.cancel_call_job",
    method: "POST",
    status: 202,
    body: callJob,
    invoke: (client, options) =>
      client.beta.voiceAgents.telephony.cancelCallJob(
        "PRIVATE_AGENT",
        "job-1",
        "PRIVATE_ETAG",
        options,
      ),
  },
  {
    name: "voice_agents.telephony.transfer_call",
    method: "POST",
    status: 200,
    body: call,
    invoke: (client, options) =>
      client.beta.voiceAgents.telephony.transferCall(
        "PRIVATE_AGENT",
        "call-1",
        "PRIVATE_TARGET",
        options,
      ),
  },
  {
    name: "voice_agents.telephony.end_call",
    method: "POST",
    status: 200,
    body: call,
    invoke: (client, options) =>
      client.beta.voiceAgents.telephony.endCall("PRIVATE_AGENT", "call-1", options),
  },
  {
    name: "voice_agents.telephony.create_binding",
    method: "POST",
    status: 201,
    body: binding,
    invoke: (client, options) =>
      client.beta.voiceAgents.telephony.createBinding(
        "PRIVATE_AGENT",
        {
          provider: "twilio",
          connection_name: "PRIVATE_CONNECTION",
          phone_number: "+15555550100",
        },
        options,
      ),
  },
  {
    name: "voice_agents.telephony.update_binding",
    method: "PATCH",
    status: 200,
    body: binding,
    invoke: (client, options) =>
      client.beta.voiceAgents.telephony.updateBinding(
        "PRIVATE_AGENT",
        "binding-1",
        "PRIVATE_ETAG",
        { label: "PRIVATE_LABEL" },
        options,
      ),
  },
  {
    name: "voice_agents.telephony.delete_binding",
    method: "DELETE",
    status: 204,
    invoke: (client, options) =>
      client.beta.voiceAgents.telephony.deleteBinding(
        "PRIVATE_AGENT",
        "binding-1",
        "PRIVATE_ETAG",
        options,
      ),
  },
  {
    name: "voice_agents.telephony.replace_transfer_targets",
    method: "PUT",
    status: 200,
    body: { transfer_targets: [] },
    invoke: (client, options) =>
      client.beta.voiceAgents.telephony.replaceTransferTargets(
        "PRIVATE_AGENT",
        "PRIVATE_ETAG",
        [],
        options,
      ),
  },
  {
    name: "voice_agents.conversations.delete",
    method: "DELETE",
    status: 204,
    invoke: (client, options) =>
      client.beta.voiceAgents.conversations.delete("PRIVATE_AGENT", "conversation-1", options),
  },
];

describe("Voice Agents exported traces", () => {
  let exporter: InMemorySpanExporter;
  let provider: NodeTracerProvider;
  beforeEach(() => {
    trace.disable();
    context.disable();
    exporter = new InMemorySpanExporter();
    provider = new NodeTracerProvider({ spanProcessors: [new SimpleSpanProcessor(exporter)] });
    provider.register();
  });
  afterEach(async () => {
    await provider.shutdown();
    trace.disable();
    context.disable();
    vi.unstubAllEnvs();
  });

  function createRestClient(
    testCase: RestTelemetryCase,
    tracingOptions: GenAITracingOptions,
    error?: Error,
    status = testCase.status,
  ): { client: AIProjectClient; requests: PipelineRequest[] } {
    const requests: PipelineRequest[] = [];
    const httpClient: HttpClient = {
      async sendRequest(request) {
        requests.push(request);
        if (error) throw error;
        return {
          request,
          status,
          headers: createHttpHeaders({ "content-type": "application/json" }),
          bodyAsText: JSON.stringify(
            status === 400
              ? { error: { code: "invalid_request", message: "PRIVATE_REST_ERROR" } }
              : testCase.body,
          ),
        };
      },
    };
    return {
      client: new AIProjectClient(endpoint, restCredential, {
        tracingOptions,
        httpClient,
        retryOptions: { maxRetries: 0 },
      }),
      requests,
    };
  }

  it.each(
    restTelemetryCases.flatMap((testCase) =>
      [false, true].map((contentRecording) => ({ ...testCase, contentRecording })),
    ),
  )(
    "exports $name with parentage and metadata-only REST attributes (contentRecording=$contentRecording)",
    async (testCase) => {
      const { client, requests } = createRestClient(testCase, {
        experimental: true,
        contentRecording: testCase.contentRecording,
      });
      const controller = new AbortController();
      const options = {
        abortSignal: controller.signal,
        foundryFeatures: "VoiceAgents=V1Preview" as const,
        requestOptions: { headers: { "x-test-correlation": "PRIVATE_HEADER" } },
      };
      const parent = trace.getTracer("application").startSpan("workflow");
      const result = await context.with(trace.setSpan(context.active(), parent), () =>
        testCase.invoke(client, options),
      );
      parent.end();
      await provider.forceFlush();
      expect(requests).toHaveLength(1);
      expect(requests[0].method).toBe(testCase.method);
      expect(requests[0].abortSignal).toBe(controller.signal);
      expect(requests[0].headers.get("x-test-correlation")).toBe("PRIVATE_HEADER");
      expect(requests[0].headers.get("foundry-features")).toBe("VoiceAgents=V1Preview");
      if (testCase.body?.id) expect(result).toHaveProperty("id", testCase.body.id);
      else if (testCase.body) expect(result).toEqual(testCase.body);
      else expect(result).toBeUndefined();

      const spans = exporter
        .getFinishedSpans()
        .filter((value) => value.instrumentationScope.name === "@azure/ai-projects");
      expect(spans).toHaveLength(1);
      const exported = spans[0];
      expect(exported.name).toBe(testCase.name);
      expect(exported.kind).toBe(SpanKind.CLIENT);
      expect(exported.parentSpanContext?.spanId).toBe(parent.spanContext().spanId);
      expect(exported.spanContext().traceId).toBe(parent.spanContext().traceId);
      expect(exported.status.code).toBe(SpanStatusCode.UNSET);
      expect(exported.events).toEqual([]);
      expect(exported.attributes).toMatchObject({
        "gen_ai.provider.name": "microsoft.foundry",
        "az.namespace": "Microsoft.CognitiveServices",
        "server.address": "example.test",
        [testCase.name === "create_agent"
          ? "gen_ai.operation.name"
          : "az.ai.voice_agents.operation"]: testCase.name.slice(
          testCase.name.lastIndexOf(".") + 1,
        ),
      });
      if (testCase.name === "create_agent") {
        expect(exported.attributes).toMatchObject({
          "gen_ai.agent.id": "agent-1",
          "gen_ai.agent.name": "voice",
        });
      } else if (testCase.name === "voice_agents.telephony.create_call_job") {
        expect(exported.attributes).toMatchObject({
          "az.ai.voice_agents.telephony.call_job.id": "job-1",
          "az.ai.voice_agents.call_job.status": "accepted",
        });
      }
      const telemetry = JSON.stringify({
        attributes: exported.attributes,
        events: exported.events,
        status: exported.status,
      });
      expect(telemetry).not.toContain("PRIVATE");
      expect(telemetry).not.toContain("+1555");
      expect(exported.attributes).not.toHaveProperty("gen_ai.input.messages");
      expect(exported.attributes).not.toHaveProperty("gen_ai.output.messages");
    },
  );

  it.each(restTelemetryCases)(
    "does not export $name when tracing is disabled",
    async (testCase) => {
      const { client, requests } = createRestClient(testCase, { experimental: false });
      await testCase.invoke(client, {});
      await provider.forceFlush();
      expect(requests).toHaveLength(1);
      expect(exporter.getFinishedSpans()).toEqual([]);
    },
  );

  it.each(restTelemetryCases)("exports a safe failed $name span", async (testCase) => {
    const { client } = createRestClient(
      testCase,
      { experimental: true, contentRecording: true },
      undefined,
      400,
    );
    await expect(testCase.invoke(client, {})).rejects.toMatchObject({ statusCode: 400 });
    await provider.forceFlush();
    const spans = exporter.getFinishedSpans();
    expect(spans).toHaveLength(1);
    expect(spans[0].name).toBe(testCase.name);
    expect(spans[0].status.code).toBe(SpanStatusCode.ERROR);
    expect(spans[0].attributes).toMatchObject({
      "error.type": "RestError",
      "http.response.status_code": 400,
    });
    expect(JSON.stringify(spans[0].attributes)).not.toContain("PRIVATE");
    expect(JSON.stringify(spans[0].events)).not.toContain("PRIVATE");
    expect(spans[0].status.message).toBeUndefined();
  });

  it.each(restTelemetryCases)(
    "exports cancellation without failing the $name span",
    async (testCase) => {
      const error = new AbortError("PRIVATE_ABORT_REASON");
      const { client } = createRestClient(testCase, { experimental: true }, error);
      await expect(testCase.invoke(client, {})).rejects.toBe(error);
      await provider.forceFlush();
      const spans = exporter.getFinishedSpans();
      expect(spans).toHaveLength(1);
      expect(spans[0].name).toBe(testCase.name);
      expect(spans[0].attributes["az.ai.voice_agents.cancelled"]).toBe(true);
      expect(spans[0].status.code).toBe(SpanStatusCode.UNSET);
      expect(spans[0].attributes).not.toHaveProperty("error.type");
      expect(JSON.stringify(spans[0].attributes)).not.toContain("PRIVATE");
      expect(spans[0].events).toEqual([]);
    },
  );

  it.each([
    {
      name: "getCallJob",
      body: callJob,
      invoke: (client: AIProjectClient) =>
        client.beta.voiceAgents.telephony.getCallJob("PRIVATE_AGENT", "job-1"),
    },
    {
      name: "getBinding",
      body: binding,
      invoke: (client: AIProjectClient) =>
        client.beta.voiceAgents.telephony.getBinding("PRIVATE_AGENT", "binding-1"),
    },
    {
      name: "getCall",
      body: call,
      invoke: (client: AIProjectClient) =>
        client.beta.voiceAgents.telephony.getCall("PRIVATE_AGENT", "call-1"),
    },
    {
      name: "getTransferTargets",
      body: { transfer_targets: [] },
      invoke: (client: AIProjectClient) =>
        client.beta.voiceAgents.telephony.getTransferTargets("PRIVATE_AGENT"),
    },
    {
      name: "listBindings",
      body: { data: [], has_more: false },
      invoke: (client: AIProjectClient) =>
        client.beta.voiceAgents.telephony.listBindings("PRIVATE_AGENT").next(),
    },
    {
      name: "listCalls",
      body: { data: [], has_more: false },
      invoke: (client: AIProjectClient) =>
        client.beta.voiceAgents.telephony.listCalls("PRIVATE_AGENT").next(),
    },
    {
      name: "getConversation",
      body: {
        id: "conversation-1",
        object: "voice.conversation",
        status: "completed",
        created_at: 1,
      },
      invoke: (client: AIProjectClient) =>
        client.beta.voiceAgents.conversations.get("PRIVATE_AGENT", "conversation-1"),
    },
    {
      name: "listConversations",
      body: { data: [], has_more: false },
      invoke: (client: AIProjectClient) =>
        client.beta.voiceAgents.conversations.list("PRIVATE_AGENT").next(),
    },
  ])("does not add mutation telemetry for $name", async (testCase) => {
    const { client, requests } = createRestClient(
      { ...testCase, status: 200, method: "GET" },
      { experimental: true },
    );
    await testCase.invoke(client);
    await provider.forceFlush();
    expect(requests).toHaveLength(1);
    expect(requests[0].method).toBe("GET");
    expect(exporter.getFinishedSpans()).toEqual([]);
  });

  it("inherits the project's resolved environment settings without resolving them again", async () => {
    vi.stubEnv("AZURE_EXPERIMENTAL_ENABLE_GENAI_TRACING", "true");
    const factory: VoiceAgentWebSocketFactory = {
      create: () => ({
        setHandlers() {},
        async connect() {},
        async send() {},
        async close() {},
      }),
    };
    const credential = {
      getToken: async () => ({ token: "offline-token", expiresOnTimestamp: Infinity }),
    };
    const createRealtime = (tracingOptions: GenAITracingOptions): VoiceAgentRealtimeClient =>
      new AIProjectClient("https://example.test", credential, {
        tracingOptions,
        realtimeOptions: { webSocketFactory: factory },
      }).beta.voiceAgents.realtime;
    const realtime = createRealtime({ contentRecording: false });
    vi.stubEnv("AZURE_EXPERIMENTAL_ENABLE_GENAI_TRACING", "false");
    await (await realtime.connect("voice")).close();
    expect(exporter.getFinishedSpans()).toHaveLength(2);
    await (await createRealtime({ experimental: false }).connect("voice")).close();
    expect(exporter.getFinishedSpans()).toHaveLength(2);
  });

  it("does not add tracing enablement to an independent realtime constructor", async () => {
    vi.stubEnv("AZURE_EXPERIMENTAL_ENABLE_GENAI_TRACING", "true");
    const realtime = new VoiceAgentRealtimeClient(
      "https://example.test",
      {
        getToken: async () => ({ token: "offline-token", expiresOnTimestamp: Infinity }),
      },
      {
        webSocketFactory: {
          create: () => ({
            setHandlers() {},
            async connect() {},
            async send() {},
            async close() {},
          }),
        },
      },
    );
    await (await realtime.connect("voice")).close();
    expect(exporter.getFinishedSpans()).toHaveLength(0);
  });

  it("exports session and response children under the caller without leaking session context", async () => {
    let handlers: VoiceAgentWebSocketHandlers | undefined;
    const transport: VoiceAgentWebSocketTransport = {
      setHandlers(value) {
        handlers = value;
      },
      async connect() {},
      async send() {},
      async close(code, reason) {
        handlers?.onClose(code, reason, true);
      },
    };
    const factory: VoiceAgentWebSocketFactory = { create: () => transport };
    const client = new AIProjectClient(
      "https://example.test/api/projects/test",
      {
        getToken: async () => ({ token: "PRIVATE_TOKEN", expiresOnTimestamp: Infinity }),
      },
      {
        tracingOptions: { experimental: true },
        realtimeOptions: { webSocketFactory: factory },
      },
    );
    const parent = trace.getTracer("application").startSpan("workflow");
    await context.with(trace.setSpan(context.active(), parent), async () => {
      const connection = await client.beta.voiceAgents.realtime.connect("voice");
      expect(trace.getSpan(context.active())).toBe(parent);
      // Simulate a callback outside the caller's context; children still belong to the session.
      context.with(ROOT_CONTEXT, () => {
        handlers?.onMessage(
          JSON.stringify({
            type: "response.created",
            event_id: "start",
            response: { id: "resp-1" },
          }),
        );
        handlers?.onMessage(
          JSON.stringify({
            type: "response.done",
            event_id: "end",
            response: { id: "resp-1", status: "completed" },
          }),
        );
      });
      await connection.close();
    });
    parent.end();
    await provider.forceFlush();
    const spans = exporter.getFinishedSpans();
    const session = spans.find((span) => span.name === "voice_agents.realtime.session");
    const response = spans.find((span) => span.name === "invoke_agent");
    expect(session?.parentSpanContext?.spanId).toBe(parent.spanContext().spanId);
    expect(response?.parentSpanContext?.spanId).toBe(session?.spanContext().spanId);
    expect(response?.spanContext().traceId).toBe(parent.spanContext().traceId);
    expect(spans).toHaveLength(4);
    expect(trace.getSpan(context.active())).toBeUndefined();
    expect(
      JSON.stringify(
        spans.map((span) => ({
          attributes: span.attributes,
          events: span.events,
          status: span.status,
        })),
      ),
    ).not.toContain("PRIVATE");
  });
});
