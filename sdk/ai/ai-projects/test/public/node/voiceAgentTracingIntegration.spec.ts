// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { context, trace, ROOT_CONTEXT } from "@opentelemetry/api";
import {
  InMemorySpanExporter,
  NodeTracerProvider,
  SimpleSpanProcessor,
} from "@opentelemetry/sdk-trace-node";
import { AIProjectClient, VoiceAgentRealtimeClient } from "@azure/ai-projects";
import type { GenAITracingOptions } from "@azure/ai-projects";
import type {
  VoiceAgentWebSocketFactory,
  VoiceAgentWebSocketHandlers,
  VoiceAgentWebSocketTransport,
} from "$internal/realtime/webSocketTransportLike.js";

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
