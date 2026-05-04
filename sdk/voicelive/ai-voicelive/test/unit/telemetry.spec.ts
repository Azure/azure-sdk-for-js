// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, expect, beforeEach } from "vitest";
import { toSupportTracing } from "@azure-tools/test-utils-vitest";
import { MockInstrumenter } from "@azure-tools/test-utils-vitest";
import { useInstrumenter } from "@azure/core-tracing";
import {
  SessionTelemetryTracker,
  OperationName,
  GEN_AI_VOICE_SESSION_ID,
  GEN_AI_VOICE_TURN_COUNT,
  GEN_AI_VOICE_INTERRUPTION_COUNT,
  GEN_AI_VOICE_AUDIO_BYTES_SENT,
  GEN_AI_VOICE_AUDIO_BYTES_RECEIVED,
  GEN_AI_VOICE_FIRST_TOKEN_LATENCY_MS,
  GEN_AI_VOICE_MESSAGE_SIZE,
  GEN_AI_INPUT_MESSAGES_EVENT,
  GEN_AI_OUTPUT_MESSAGES_EVENT,
  GEN_AI_VOICE_ERROR_EVENT,
  AZ_NAMESPACE_VALUE,
  AZ_AI_VOICELIVE_SYSTEM,
} from "../../src/telemetry/index.js";
import { KnownClientEventType, KnownServerEventType } from "../../src/models/index.js";

expect.extend({ toSupportTracing });

describe("Telemetry - Attributes", () => {
  it("should export correct attribute constants", () => {
    expect(AZ_NAMESPACE_VALUE).toBe("Microsoft.CognitiveServices");
    expect(AZ_AI_VOICELIVE_SYSTEM).toBe("az.ai.voicelive");
    expect(GEN_AI_VOICE_SESSION_ID).toBe("gen_ai.voice.session_id");
    expect(GEN_AI_VOICE_TURN_COUNT).toBe("gen_ai.voice.turn_count");
    expect(GEN_AI_VOICE_INTERRUPTION_COUNT).toBe("gen_ai.voice.interruption_count");
    expect(GEN_AI_VOICE_AUDIO_BYTES_SENT).toBe("gen_ai.voice.audio_bytes_sent");
    expect(GEN_AI_VOICE_AUDIO_BYTES_RECEIVED).toBe("gen_ai.voice.audio_bytes_received");
    expect(GEN_AI_VOICE_FIRST_TOKEN_LATENCY_MS).toBe("gen_ai.voice.first_token_latency_ms");
    expect(GEN_AI_VOICE_MESSAGE_SIZE).toBe("gen_ai.voice.message_size");
    expect(GEN_AI_INPUT_MESSAGES_EVENT).toBe("gen_ai.input.messages");
    expect(GEN_AI_OUTPUT_MESSAGES_EVENT).toBe("gen_ai.output.messages");
    expect(GEN_AI_VOICE_ERROR_EVENT).toBe("gen_ai.voice.error");
  });

  it("should export OperationName enum", () => {
    expect(OperationName.Connect).toBe("connect");
    expect(OperationName.Send).toBe("send");
    expect(OperationName.Recv).toBe("recv");
    expect(OperationName.Close).toBe("close");
  });
});

describe("SessionTelemetryTracker", () => {
  describe("Construction", () => {
    it("should create a tracker with default options", () => {
      const tracker = new SessionTelemetryTracker();
      expect(tracker).toBeDefined();
      expect(tracker.isActive).toBe(false);
    });

    it("should create a tracker with custom options", () => {
      const tracker = new SessionTelemetryTracker({
        serverAddress: "example.cognitiveservices.azure.com",
        serverPort: 443,
        model: "gpt-4o-realtime-preview",
        agentName: "test-agent",
        agentProjectName: "test-project",
        enableContentRecording: true,
      });
      expect(tracker).toBeDefined();
    });
  });

  describe("No-op behavior when no tracing provider", () => {
    let tracker: SessionTelemetryTracker;

    beforeEach(() => {
      tracker = new SessionTelemetryTracker({
        serverAddress: "example.cognitiveservices.azure.com",
        serverPort: 443,
        model: "gpt-4o-realtime-preview",
      });
    });

    it("should be no-op for startConnectSpan when no tracing provider is configured", () => {
      // When no OpenTelemetry provider is configured, spans should be no-op
      // This validates the requirement: "Telemetry should be no-op by default"
      tracker.startConnectSpan();
      // Should not throw
    });

    it("should be no-op for traceSend when no connect span", () => {
      // Without starting a connect span, traceSend should be no-op
      tracker.traceSend({
        type: KnownClientEventType.SessionUpdate,
        session: { model: "gpt-4o-realtime-preview" },
      });
      // Should not throw
    });

    it("should be no-op for traceRecv when no connect span", () => {
      tracker.traceRecv({
        type: KnownServerEventType.SessionCreated,
        session: { id: "test-session-123" },
      });
      // Should not throw
    });

    it("should be no-op for traceClose when no connect span", () => {
      tracker.traceClose();
      // Should not throw
    });

    it("should be no-op for traceClose with error when no connect span", () => {
      tracker.traceClose(new Error("test error"));
      // Should not throw
    });

    it("should be no-op for recordConnectError when no connect span", () => {
      tracker.recordConnectError(new Error("test error"));
      // Should not throw
    });
  });

  describe("traceSend event tracking", () => {
    let tracker: SessionTelemetryTracker;

    beforeEach(() => {
      tracker = new SessionTelemetryTracker({
        serverAddress: "example.cognitiveservices.azure.com",
        model: "gpt-4o-realtime-preview",
      });
      tracker.startConnectSpan();
    });

    it("should not throw for session.update send", () => {
      tracker.traceSend({
        type: KnownClientEventType.SessionUpdate,
        session: {
          model: "gpt-4o-realtime-preview",
          instructions: "You are a helpful assistant",
          input_audio_format: "pcm16",
          output_audio_format: "pcm16",
        },
      });
    });

    it("should not throw for response.create send", () => {
      tracker.traceSend({
        type: KnownClientEventType.ResponseCreate,
      });
    });

    it("should not throw for response.cancel send (interruption tracking)", () => {
      tracker.traceSend({
        type: KnownClientEventType.ResponseCancel,
      });
    });

    it("should not throw for input_audio_buffer.append send", () => {
      tracker.traceSend({
        type: KnownClientEventType.InputAudioBufferAppend,
        audio: "dGVzdGF1ZGlv", // base64 encoded "testaudio"
      });
    });

    it("should not throw for conversation.item.create send", () => {
      tracker.traceSend({
        type: KnownClientEventType.ConversationItemCreate,
        item: {
          type: "message",
          role: "user",
          content: [{ type: "input_text", text: "Hello" }],
        },
      });
    });
  });

  describe("traceRecv event tracking", () => {
    let tracker: SessionTelemetryTracker;

    beforeEach(() => {
      tracker = new SessionTelemetryTracker({
        serverAddress: "example.cognitiveservices.azure.com",
        model: "gpt-4o-realtime-preview",
      });
      tracker.startConnectSpan();
    });

    it("should not throw for session.created", () => {
      tracker.traceRecv({
        type: KnownServerEventType.SessionCreated,
        session: {
          id: "test-session-123",
          model: "gpt-4o-realtime-preview",
          input_audio_format: "pcm16",
          output_audio_format: "pcm16",
        },
      });
    });

    it("should not throw for session.updated", () => {
      tracker.traceRecv({
        type: KnownServerEventType.SessionUpdated,
        session: {
          id: "test-session-456",
          model: "gpt-4o-realtime-preview",
        },
      });
    });

    it("should not throw for response.done (turn count tracking)", () => {
      tracker.traceRecv({
        type: KnownServerEventType.ResponseDone,
        response: {
          id: "resp_123",
          status: "completed",
          conversation_id: "conv_456",
          usage: {
            input_tokens: 100,
            output_tokens: 200,
          },
        },
      });
    });

    it("should skip high-frequency delta events (audio delta)", () => {
      // These should be silently skipped (no span created) but still track bytes
      tracker.traceRecv({
        type: KnownServerEventType.ResponseAudioDelta,
        delta: "dGVzdGF1ZGlv",
      });
    });

    it("should skip high-frequency delta events (text delta)", () => {
      tracker.traceRecv({
        type: KnownServerEventType.ResponseTextDelta,
        delta: "Hello",
      });
    });

    it("should not throw for error events", () => {
      tracker.traceRecv({
        type: KnownServerEventType.Error,
        error: {
          type: "invalid_request_error",
          code: "invalid_parameter",
          message: "Invalid model parameter",
        },
      });
    });

    it("should not throw for mcp events", () => {
      tracker.traceRecv({
        type: KnownServerEventType.ResponseMcpCallCompleted,
        output_index: 0,
        call_id: "call_123",
      });

      tracker.traceRecv({
        type: KnownServerEventType.McpListToolsCompleted,
      });
    });

    it("should not throw for conversation item events", () => {
      tracker.traceRecv({
        type: KnownServerEventType.ConversationItemCreated,
        item: {
          id: "item_123",
          type: "message",
          role: "assistant",
        },
      });
    });
  });

  describe("traceClose", () => {
    it("should not throw when closing with no error", () => {
      const tracker = new SessionTelemetryTracker({
        serverAddress: "example.cognitiveservices.azure.com",
        model: "gpt-4o-realtime-preview",
      });
      tracker.startConnectSpan();
      tracker.traceClose();
    });

    it("should not throw when closing with an error", () => {
      const tracker = new SessionTelemetryTracker({
        serverAddress: "example.cognitiveservices.azure.com",
        model: "gpt-4o-realtime-preview",
      });
      tracker.startConnectSpan();
      tracker.traceClose(new Error("Connection lost"));
    });
  });

  describe("Full session lifecycle", () => {
    it("should trace a complete session without errors", () => {
      const tracker = new SessionTelemetryTracker({
        serverAddress: "example.cognitiveservices.azure.com",
        serverPort: 443,
        model: "gpt-4o-realtime-preview",
      });

      // 1. Connect
      tracker.startConnectSpan();
      tracker.recordConnectSuccess();

      // 2. Receive session.created
      tracker.traceRecv({
        type: KnownServerEventType.SessionCreated,
        session: { id: "sess_abc", model: "gpt-4o-realtime-preview" },
      });

      // 3. Send session.update
      tracker.traceSend({
        type: KnownClientEventType.SessionUpdate,
        session: {
          instructions: "Be helpful",
          input_audio_format: "pcm16",
          output_audio_format: "pcm16",
        },
      });

      // 4. Send audio
      tracker.traceSend({
        type: KnownClientEventType.InputAudioBufferAppend,
        audio: "dGVzdGF1ZGlvZGF0YQ==",
      });

      // 5. Send response.create
      tracker.traceSend({
        type: KnownClientEventType.ResponseCreate,
      });

      // 6. Receive audio deltas (should be skipped but track latency)
      tracker.traceRecv({
        type: KnownServerEventType.ResponseAudioDelta,
        delta: "cmVzcG9uc2VhdWRpbw==",
      });

      // 7. Receive response.done
      tracker.traceRecv({
        type: KnownServerEventType.ResponseDone,
        response: {
          id: "resp_123",
          status: "completed",
          usage: { input_tokens: 50, output_tokens: 100 },
        },
      });

      // 8. Close
      tracker.traceClose();
      expect(tracker.isActive).toBe(false);
    });

    it("should trace a session with interruption", () => {
      const tracker = new SessionTelemetryTracker({
        serverAddress: "example.cognitiveservices.azure.com",
        model: "gpt-4o-realtime-preview",
      });

      tracker.startConnectSpan();
      tracker.recordConnectSuccess();

      tracker.traceRecv({
        type: KnownServerEventType.SessionCreated,
        session: { id: "sess_abc" },
      });

      tracker.traceSend({ type: KnownClientEventType.ResponseCreate });

      // User interrupts
      tracker.traceSend({ type: KnownClientEventType.ResponseCancel });

      // Another turn
      tracker.traceSend({ type: KnownClientEventType.ResponseCreate });

      tracker.traceRecv({
        type: KnownServerEventType.ResponseDone,
        response: { id: "resp_456", status: "completed" },
      });

      tracker.traceClose();
      expect(tracker.isActive).toBe(false);
    });

    it("should trace a session with connection error", () => {
      const tracker = new SessionTelemetryTracker({
        serverAddress: "example.cognitiveservices.azure.com",
        model: "gpt-4o-realtime-preview",
      });

      tracker.startConnectSpan();
      tracker.recordConnectError(new Error("Connection refused"));
      expect(tracker.isActive).toBe(false);
    });

    it("should trace a session with server error event", () => {
      const tracker = new SessionTelemetryTracker({
        serverAddress: "example.cognitiveservices.azure.com",
        model: "gpt-4o-realtime-preview",
      });

      tracker.startConnectSpan();
      tracker.recordConnectSuccess();

      tracker.traceRecv({
        type: KnownServerEventType.SessionCreated,
        session: { id: "sess_err" },
      });

      tracker.traceRecv({
        type: KnownServerEventType.Error,
        error: {
          type: "server_error",
          code: "internal_error",
          message: "Something went wrong",
        },
      });

      tracker.traceClose(new Error("Session error"));
      expect(tracker.isActive).toBe(false);
    });
  });

  describe("Content recording", () => {
    it("should create tracker with content recording disabled by default", () => {
      const tracker = new SessionTelemetryTracker({
        serverAddress: "example.cognitiveservices.azure.com",
        model: "gpt-4o-realtime-preview",
      });
      // Content recording disabled should still work without errors
      tracker.startConnectSpan();
      tracker.traceSend({
        type: KnownClientEventType.SessionUpdate,
        session: { instructions: "secret instructions" },
      });
      tracker.traceClose();
    });

    it("should create tracker with content recording enabled", () => {
      const tracker = new SessionTelemetryTracker({
        serverAddress: "example.cognitiveservices.azure.com",
        model: "gpt-4o-realtime-preview",
        enableContentRecording: true,
      });
      tracker.startConnectSpan();
      tracker.traceSend({
        type: KnownClientEventType.SessionUpdate,
        session: { instructions: "You are an assistant" },
      });
      tracker.traceClose();
    });
  });

  describe("Agent session telemetry", () => {
    it("should create tracker with agent configuration", () => {
      const tracker = new SessionTelemetryTracker({
        serverAddress: "example.cognitiveservices.azure.com",
        serverPort: 443,
        agentName: "my-agent",
        agentProjectName: "my-project",
      });

      tracker.startConnectSpan();
      tracker.recordConnectSuccess();

      // Receive session with agent config
      tracker.traceRecv({
        type: KnownServerEventType.SessionCreated,
        session: {
          id: "sess_agent",
          agent: {
            agent_id: "agent_123",
            thread_id: "thread_456",
          },
        },
      });

      tracker.traceClose();
      expect(tracker.isActive).toBe(false);
    });
  });
});

/**
 * Explicit span-graph assertions.
 *
 * The `toSupportTracing(["connect"])` matcher only checks that the root span has a
 * direct child named "connect" and that all spans were closed. It does NOT verify
 * that send/recv/close children were actually created under the connect span — so
 * regressions where traceSend/traceRecv silently stop emitting spans would still
 * pass the matcher. These tests inspect the MockInstrumenter span graph directly
 * to lock in the parent/child structure.
 */
describe("Telemetry - span graph structure", () => {
  /** Names of all spans started during the callback, in start order. */
  function captureSpans(driver: () => void): { name: string; parentId: string | undefined }[] {
    const instrumenter = new MockInstrumenter();
    useInstrumenter(instrumenter);
    try {
      driver();
      return instrumenter.startedSpans.map((s) => ({
        name: s.name,
        parentId: s.parentSpan()?.spanId,
      }));
    } finally {
      // Reset to the no-op instrumenter to avoid polluting other tests.
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      useInstrumenter(undefined as any);
    }
  }

  it("creates connect, send, recv, and close spans with connect as their parent", () => {
    const spans = captureSpans(() => {
      const tracker = new SessionTelemetryTracker({
        serverAddress: "test.cognitiveservices.azure.com",
        model: "gpt-4o-realtime-preview",
      });
      tracker.startConnectSpan();
      tracker.traceSend({ type: KnownClientEventType.SessionUpdate });
      tracker.traceRecv({
        type: KnownServerEventType.SessionCreated,
        session: { id: "sess_test" },
      });
      tracker.traceSend({ type: KnownClientEventType.ResponseCreate });
      tracker.traceRecv({ type: KnownServerEventType.ResponseDone });
      tracker.traceClose();
    });

    // The connect span must exist and be the root of this graph.
    const connect = spans.find((s) => s.name === "connect");
    expect(connect, "connect span should exist").toBeDefined();
    expect(connect?.parentId, "connect should have no parent").toBeUndefined();

    // Children must include both sends, both recvs, and the close — and each must
    // be parented to the connect span.
    const expectedChildNames = [
      `send ${KnownClientEventType.SessionUpdate}`,
      `recv ${KnownServerEventType.SessionCreated}`,
      `send ${KnownClientEventType.ResponseCreate}`,
      `recv ${KnownServerEventType.ResponseDone}`,
      "close",
    ];
    const actualChildren = spans.filter((s) => s.name !== "connect");
    expect(actualChildren.map((s) => s.name).sort()).toEqual([...expectedChildNames].sort());
    for (const child of actualChildren) {
      expect(child.parentId, `${child.name} should be a child of connect`).toBeDefined();
    }
  });

  it("does not create spans for high-frequency delta recv events", () => {
    const spans = captureSpans(() => {
      const tracker = new SessionTelemetryTracker({ model: "gpt-4o-realtime-preview" });
      tracker.startConnectSpan();
      // These deltas are filtered out and must not produce spans.
      tracker.traceRecv({ type: KnownServerEventType.ResponseAudioDelta, delta: "AAA=" });
      tracker.traceRecv({ type: KnownServerEventType.ResponseTextDelta, delta: "hi" });
      tracker.traceClose();
    });

    expect(spans.map((s) => s.name).sort()).toEqual(["close", "connect"].sort());
  });

  it("creates a close span even when traceClose is called with an error", () => {
    const spans = captureSpans(() => {
      const tracker = new SessionTelemetryTracker({ model: "gpt-4o-realtime-preview" });
      tracker.startConnectSpan();
      tracker.traceSend({ type: KnownClientEventType.SessionUpdate });
      tracker.traceClose(new Error("connection lost"));
    });

    expect(spans.map((s) => s.name).sort()).toEqual(
      [`send ${KnownClientEventType.SessionUpdate}`, "close", "connect"].sort(),
    );
  });
});
