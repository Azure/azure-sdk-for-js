// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import {
  VoiceLiveInstrumentor,
  createTelemetryState,
  traceSend,
  traceRecv,
  traceClose,
} from "../../src/telemetry/index.js";
import type { TelemetryState } from "../../src/telemetry/index.js";
import { KnownClientEventType, KnownServerEventType } from "../../src/models/index.js";
import { TestConstants } from "../infrastructure/index.js";
import { GEN_AI_EVENT_CONTENT } from "../../src/telemetry/utils.js";

// Mock the OpenTelemetry API
const mockSpan = {
  setAttribute: vi.fn(),
  addEvent: vi.fn(),
  setStatus: vi.fn(),
  end: vi.fn(),
  isRecording: vi.fn().mockReturnValue(true),
  updateName: vi.fn(),
};

vi.mock("@opentelemetry/api", () => ({
  trace: {
    getTracer: vi.fn().mockReturnValue({
      startSpan: vi.fn().mockReturnValue(mockSpan),
    }),
    setSpan: vi.fn().mockReturnValue({}),
  },
  context: {
    active: vi.fn().mockReturnValue({}),
  },
  SpanKind: { CLIENT: 2 },
  SpanStatusCode: { ERROR: 2 },
  metrics: {
    getMeter: vi.fn().mockReturnValue({
      createHistogram: vi.fn().mockReturnValue({
        record: vi.fn(),
      }),
    }),
  },
}));

describe("VoiceLive Telemetry", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockSpan.setAttribute.mockClear();
    mockSpan.addEvent.mockClear();
    mockSpan.setStatus.mockClear();
    mockSpan.end.mockClear();
    mockSpan.isRecording.mockReturnValue(true);
    mockSpan.updateName.mockClear();
  });

  describe("VoiceLiveInstrumentor", () => {
    let instrumentor: VoiceLiveInstrumentor;

    beforeEach(() => {
      instrumentor = new VoiceLiveInstrumentor();
      instrumentor.uninstrument(); // Reset state
    });

    afterEach(() => {
      instrumentor.uninstrument();
      delete process.env.AZURE_EXPERIMENTAL_ENABLE_GENAI_TRACING;
      delete process.env.OTEL_INSTRUMENTATION_GENAI_CAPTURE_MESSAGE_CONTENT;
      delete process.env.AZURE_TRACING_GEN_AI_CONTENT_RECORDING_ENABLED;
    });

    it("should not enable tracing without env gate", () => {
      instrumentor.instrument();
      expect(instrumentor.isInstrumented()).toBe(false);
    });

    it("should enable tracing with env gate set", () => {
      process.env.AZURE_EXPERIMENTAL_ENABLE_GENAI_TRACING = "true";
      instrumentor.instrument();
      expect(instrumentor.isInstrumented()).toBe(true);
    });

    it("should disable tracing on uninstrument", () => {
      process.env.AZURE_EXPERIMENTAL_ENABLE_GENAI_TRACING = "true";
      instrumentor.instrument();
      expect(instrumentor.isInstrumented()).toBe(true);
      instrumentor.uninstrument();
      expect(instrumentor.isInstrumented()).toBe(false);
    });

    it("should default content recording to false", () => {
      process.env.AZURE_EXPERIMENTAL_ENABLE_GENAI_TRACING = "true";
      instrumentor.instrument();
      expect(instrumentor.isContentRecordingEnabled()).toBe(false);
    });

    it("should enable content recording via env var", () => {
      process.env.AZURE_EXPERIMENTAL_ENABLE_GENAI_TRACING = "true";
      process.env.OTEL_INSTRUMENTATION_GENAI_CAPTURE_MESSAGE_CONTENT = "true";
      instrumentor.instrument();
      expect(instrumentor.isContentRecordingEnabled()).toBe(true);
    });

    it("should enable content recording via legacy env var", () => {
      process.env.AZURE_EXPERIMENTAL_ENABLE_GENAI_TRACING = "true";
      process.env.AZURE_TRACING_GEN_AI_CONTENT_RECORDING_ENABLED = "true";
      instrumentor.instrument();
      expect(instrumentor.isContentRecordingEnabled()).toBe(true);
    });

    it("should disable content recording when both env vars differ", () => {
      process.env.AZURE_EXPERIMENTAL_ENABLE_GENAI_TRACING = "true";
      process.env.OTEL_INSTRUMENTATION_GENAI_CAPTURE_MESSAGE_CONTENT = "true";
      process.env.AZURE_TRACING_GEN_AI_CONTENT_RECORDING_ENABLED = "false";
      instrumentor.instrument();
      expect(instrumentor.isContentRecordingEnabled()).toBe(false);
    });

    it("should allow programmatic content recording override", () => {
      process.env.AZURE_EXPERIMENTAL_ENABLE_GENAI_TRACING = "true";
      instrumentor.instrument({ enableContentRecording: true });
      expect(instrumentor.isContentRecordingEnabled()).toBe(true);
    });
  });

  describe("Telemetry State", () => {
    let instrumentor: VoiceLiveInstrumentor;

    beforeEach(() => {
      process.env.AZURE_EXPERIMENTAL_ENABLE_GENAI_TRACING = "true";
      instrumentor = new VoiceLiveInstrumentor();
      instrumentor.instrument();
    });

    afterEach(() => {
      instrumentor.uninstrument();
      delete process.env.AZURE_EXPERIMENTAL_ENABLE_GENAI_TRACING;
    });

    it("should create telemetry state with model session", () => {
      const { state, active } = createTelemetryState(
        TestConstants.ENDPOINT,
        TestConstants.MODEL_NAME,
      );
      expect(active).toBe(true);
      expect(state).toBeDefined();
      expect(state.model).toBe(TestConstants.MODEL_NAME);
      expect(state.connectSpan).toBeDefined();
      // Clean up
      state.connectSpan?.end();
    });

    it("should create telemetry state with agent session", () => {
      const agentConfig = {
        agentName: "test-agent",
        projectName: "test-project",
        agentVersion: "1.0",
        conversationId: "conv-123",
      };

      const { state, active } = createTelemetryState(
        TestConstants.ENDPOINT,
        undefined,
        agentConfig,
      );
      expect(active).toBe(true);
      expect(state).toBeDefined();
      expect(state.agentName).toBe("test-agent");
      expect(state.conversationId).toBe("conv-123");

      // Verify agent attributes were set on connect span
      expect(mockSpan.setAttribute).toHaveBeenCalledWith("gen_ai.agent.name", "test-agent");
      expect(mockSpan.setAttribute).toHaveBeenCalledWith("gen_ai.conversation.id", "conv-123");
      expect(mockSpan.setAttribute).toHaveBeenCalledWith("gen_ai.agent.version", "1.0");
      expect(mockSpan.setAttribute).toHaveBeenCalledWith("gen_ai.agent.project_name", "test-project");

      state.connectSpan?.end();
    });

    it("should return inactive state when tracing is disabled", () => {
      instrumentor.uninstrument();
      const { active } = createTelemetryState(TestConstants.ENDPOINT, TestConstants.MODEL_NAME);
      expect(active).toBe(false);
    });

    it("should parse server address and port from endpoint", () => {
      const { state } = createTelemetryState(
        "https://myservice.cognitiveservices.azure.com:8443",
        TestConstants.MODEL_NAME,
      );
      expect(state.serverAddress).toBe("myservice.cognitiveservices.azure.com");
      expect(state.port).toBe(8443);
      state.connectSpan?.end();
    });

    it("should default to port 443 for https", () => {
      const { state } = createTelemetryState(
        "https://myservice.cognitiveservices.azure.com",
        TestConstants.MODEL_NAME,
      );
      expect(state.port).toBe(443);
      state.connectSpan?.end();
    });
  });

  describe("Send Tracing", () => {
    let instrumentor: VoiceLiveInstrumentor;
    let state: TelemetryState;

    beforeEach(() => {
      process.env.AZURE_EXPERIMENTAL_ENABLE_GENAI_TRACING = "true";
      instrumentor = new VoiceLiveInstrumentor();
      instrumentor.instrument();
      const result = createTelemetryState(TestConstants.ENDPOINT, TestConstants.MODEL_NAME);
      state = result.state;
    });

    afterEach(() => {
      state?.connectSpan?.end();
      instrumentor.uninstrument();
      delete process.env.AZURE_EXPERIMENTAL_ENABLE_GENAI_TRACING;
    });

    it("should trace session.update send event", () => {
      const event = {
        type: KnownClientEventType.SessionUpdate,
        session: {
          instructions: "You are a helpful assistant.",
          temperature: 0.7,
          tools: [{ type: "function", name: "get_weather" }],
        },
      };

      traceSend(state, event as any);

      // Verify a span was created with send operation attributes
      expect(mockSpan.setAttribute).toHaveBeenCalledWith(
        "gen_ai.voice.event_type",
        KnownClientEventType.SessionUpdate,
      );
      expect(mockSpan.addEvent).toHaveBeenCalledWith(
        "gen_ai.input.messages",
        expect.objectContaining({
          "gen_ai.system": "az.ai.voicelive",
        }),
      );
    });

    it("should track audio bytes on input_audio_buffer.append", () => {
      const audioBase64 = TestConstants.SAMPLE_AUDIO_BASE64; // "AQIDBA==" = 4 bytes
      const event = {
        type: KnownClientEventType.InputAudioBufferAppend,
        audio: audioBase64,
      };

      traceSend(state, event as any);
      expect(state.audioBytesSent).toBe(4);
    });

    it("should track interruptions on response.cancel", () => {
      traceSend(state, { type: KnownClientEventType.ResponseCancel } as any);
      expect(state.interruptionCount).toBe(1);

      traceSend(state, { type: KnownClientEventType.ResponseCancel } as any);
      expect(state.interruptionCount).toBe(2);
    });

    it("should record response.create timestamp for latency tracking", () => {
      traceSend(state, { type: KnownClientEventType.ResponseCreate } as any);
      expect(state.responseCreateTime).toBeDefined();
      expect(state.firstTokenLatencyRecorded).toBe(false);
    });

    it("should extract call_id from conversation.item.create send", () => {
      const event = {
        type: KnownClientEventType.ConversationItemCreate,
        item: {
          type: "function_call_output",
          callId: "test-call-send-001",
          call_id: "test-call-send-001",
          output: '{"result": "sunny"}',
        },
      };

      traceSend(state, event as any);

      expect(mockSpan.setAttribute).toHaveBeenCalledWith(
        "gen_ai.voice.call_id",
        "test-call-send-001",
      );
    });
  });

  describe("Recv Tracing", () => {
    let instrumentor: VoiceLiveInstrumentor;
    let state: TelemetryState;

    beforeEach(() => {
      process.env.AZURE_EXPERIMENTAL_ENABLE_GENAI_TRACING = "true";
      instrumentor = new VoiceLiveInstrumentor();
      instrumentor.instrument();
      const result = createTelemetryState(TestConstants.ENDPOINT, TestConstants.MODEL_NAME);
      state = result.state;
    });

    afterEach(() => {
      state?.connectSpan?.end();
      instrumentor.uninstrument();
      delete process.env.AZURE_EXPERIMENTAL_ENABLE_GENAI_TRACING;
    });

    it("should trace session.created events", () => {
      const event = {
        type: KnownServerEventType.SessionCreated,
        session: {
          id: "test-session-001",
          inputAudioFormat: "pcm16",
          outputAudioFormat: "pcm16",
        },
      };

      traceRecv(state, event as any);

      expect(state.sessionId).toBe("test-session-001");
      expect(mockSpan.setAttribute).toHaveBeenCalledWith(
        "gen_ai.voice.session_id",
        "test-session-001",
      );
    });

    it("should track turn count on response.done", () => {
      const event = {
        type: KnownServerEventType.ResponseDone,
        response: {
          id: "test-response-001",
          conversationId: "test-conversation-a",
          conversation_id: "test-conversation-a",
          status: "completed",
        },
      };

      traceRecv(state, event as any);
      expect(state.turnCount).toBe(1);

      traceRecv(state, event as any);
      expect(state.turnCount).toBe(2);
    });

    it("should extract response_id and conversation_id from response.created", () => {
      const event = {
        type: KnownServerEventType.ResponseCreated,
        response: {
          id: "test-response-002",
          conversationId: "test-conversation-b",
          conversation_id: "test-conversation-b",
        },
      };

      traceRecv(state, event as any);

      expect(state.conversationId).toBe("test-conversation-b");
      expect(mockSpan.setAttribute).toHaveBeenCalledWith("gen_ai.response.id", "test-response-002");
      expect(mockSpan.setAttribute).toHaveBeenCalledWith("gen_ai.conversation.id", "test-conversation-b");
    });

    it("should extract IDs from function_call_arguments events", () => {
      const event = {
        type: KnownServerEventType.ResponseFunctionCallArgumentsDelta,
        response_id: "test-response-fn",
        responseId: "test-response-fn",
        item_id: "test-item-fn-001",
        itemId: "test-item-fn-001",
        call_id: "test-call-fn-001",
        callId: "test-call-fn-001",
      };

      traceRecv(state, event as any);

      expect(mockSpan.setAttribute).toHaveBeenCalledWith("gen_ai.response.id", "test-response-fn");
      expect(mockSpan.setAttribute).toHaveBeenCalledWith("gen_ai.voice.item_id", "test-item-fn-001");
      expect(mockSpan.setAttribute).toHaveBeenCalledWith("gen_ai.voice.call_id", "test-call-fn-001");
    });

    it("should extract nested item fields from item-bearing events", () => {
      const event = {
        type: KnownServerEventType.ResponseOutputItemAdded,
        response_id: "test-response-fn",
        responseId: "test-response-fn",
        item: {
          id: "test-item-mcp-002",
          type: "mcp_call",
          name: "get_weather",
          serverLabel: "weather-server",
          server_label: "weather-server",
        },
      };

      traceRecv(state, event as any);

      expect(mockSpan.setAttribute).toHaveBeenCalledWith("gen_ai.voice.item_id", "test-item-mcp-002");
      expect(mockSpan.setAttribute).toHaveBeenCalledWith("gen_ai.voice.mcp.tool_name", "get_weather");
      expect(mockSpan.setAttribute).toHaveBeenCalledWith("gen_ai.voice.mcp.server_label", "weather-server");
    });

    it("should not extract tool_name for message-type items", () => {
      const event = {
        type: KnownServerEventType.ResponseOutputItemAdded,
        response_id: "test-response-fn",
        responseId: "test-response-fn",
        item: {
          id: "test-item-message",
          type: "message",
          name: "some_name",
        },
      };

      traceRecv(state, event as any);

      expect(mockSpan.setAttribute).not.toHaveBeenCalledWith(
        "gen_ai.voice.mcp.tool_name",
        expect.anything(),
      );
    });

    it("should track MCP call count", () => {
      traceRecv(state, { type: KnownServerEventType.ResponseMcpCallCompleted } as any);
      expect(state.mcpCallCount).toBe(1);

      traceRecv(state, { type: KnownServerEventType.ResponseMcpCallFailed } as any);
      expect(state.mcpCallCount).toBe(2);
    });

    it("should track MCP list tools count", () => {
      traceRecv(state, { type: KnownServerEventType.McpListToolsCompleted } as any);
      expect(state.mcpListToolsCount).toBe(1);

      traceRecv(state, { type: KnownServerEventType.McpListToolsFailed } as any);
      expect(state.mcpListToolsCount).toBe(2);
    });

    it("should extract token usage from response.done", () => {
      const event = {
        type: KnownServerEventType.ResponseDone,
        response: {
          id: "test-response-tokens",
          status: "completed",
        },
        usage: {
          inputTokens: 150,
          input_tokens: 150,
          outputTokens: 80,
          output_tokens: 80,
        },
      };

      traceRecv(state, event as any);

      expect(mockSpan.setAttribute).toHaveBeenCalledWith("gen_ai.usage.input_tokens", 150);
      expect(mockSpan.setAttribute).toHaveBeenCalledWith("gen_ai.usage.output_tokens", 80);
    });

    it("should skip text delta events to reduce volume", () => {
      vi.clearAllMocks();

      const event = {
        type: KnownServerEventType.ResponseTextDelta,
        text: "Hello",
      };

      traceRecv(state, event as any);

      // Text delta should be skipped (no updateName or addEvent calls for recv span)
      // The only setAttribute calls should not include voice.event_type = response.text.delta
      // (unless it's the first one triggering latency)
      const updateNameCalls = mockSpan.updateName.mock.calls.filter(
        (args: any[]) => args[0] === "recv response.text.delta",
      );
      expect(updateNameCalls.length).toBe(0);
    });

    it("should skip audio_transcript delta events", () => {
      vi.clearAllMocks();

      const event = {
        type: KnownServerEventType.ResponseAudioTranscriptDelta,
        delta: "Hello",
      };

      traceRecv(state, event as any);

      const updateNameCalls = mockSpan.updateName.mock.calls.filter(
        (args: any[]) => args[0] === "recv response.audio_transcript.delta",
      );
      expect(updateNameCalls.length).toBe(0);
    });

    it("should record first-token latency on first audio delta", () => {
      // Simulate response.create was sent
      state.responseCreateTime = performance.now() - 100; // 100ms ago
      state.firstTokenLatencyRecorded = false;

      const event = {
        type: KnownServerEventType.ResponseAudioDelta,
        delta: "AAAA",
      };

      traceRecv(state, event as any);

      expect(state.firstTokenLatencyRecorded).toBe(true);
      expect(mockSpan.setAttribute).toHaveBeenCalledWith(
        "gen_ai.voice.first_token_latency_ms",
        expect.any(Number),
      );
    });

    it("should extract agent config from session events", () => {
      const event = {
        type: KnownServerEventType.SessionCreated,
        session: {
          id: "test-session-agent",
          agent: {
            agentId: "agent_001",
            agent_id: "agent_001",
            threadId: "thread_001",
            thread_id: "thread_001",
          },
        },
      };

      traceRecv(state, event as any);

      expect(mockSpan.setAttribute).toHaveBeenCalledWith("gen_ai.agent.id", "agent_001");
      expect(mockSpan.setAttribute).toHaveBeenCalledWith("gen_ai.agent.thread_id", "thread_001");
    });

    it("should add error event for server error events", () => {
      const event = {
        type: KnownServerEventType.Error,
        error: {
          code: "invalid_request",
          message: "Invalid session configuration",
        },
      };

      traceRecv(state, event as any);

      expect(mockSpan.addEvent).toHaveBeenCalledWith(
        "gen_ai.voice.error",
        expect.objectContaining({
          "error.code": "invalid_request",
          "error.message": "Invalid session configuration",
        }),
      );
    });

    it("should extract finish reasons from response.done", () => {
      const event = {
        type: KnownServerEventType.ResponseDone,
        response: {
          id: "test-response-final",
          status: "completed",
          conversationId: "test-conversation-c",
          conversation_id: "test-conversation-c",
        },
      };

      traceRecv(state, event as any);

      expect(mockSpan.setAttribute).toHaveBeenCalledWith(
        "gen_ai.response.finish_reasons",
        JSON.stringify(["completed"]),
      );
    });

    it("should track audio bytes received", () => {
      const audioBase64 = TestConstants.SAMPLE_AUDIO_BASE64; // 4 bytes
      const event = {
        type: KnownServerEventType.ResponseAudioDelta,
        response_id: "test-response-fn",
        responseId: "test-response-fn",
        item_id: "test-item-fn-001",
        itemId: "test-item-fn-001",
        delta: audioBase64,
      };

      traceRecv(state, event as any);
      expect(state.audioBytesReceived).toBe(4);

      traceRecv(state, event as any);
      expect(state.audioBytesReceived).toBe(8);
    });
  });

  describe("Close Tracing", () => {
    let instrumentor: VoiceLiveInstrumentor;
    let state: TelemetryState;

    beforeEach(() => {
      process.env.AZURE_EXPERIMENTAL_ENABLE_GENAI_TRACING = "true";
      instrumentor = new VoiceLiveInstrumentor();
      instrumentor.instrument();
      const result = createTelemetryState(TestConstants.ENDPOINT, TestConstants.MODEL_NAME);
      state = result.state;
    });

    afterEach(() => {
      instrumentor.uninstrument();
      delete process.env.AZURE_EXPERIMENTAL_ENABLE_GENAI_TRACING;
    });

    it("should flush session counters on close", () => {
      // Simulate session activity
      state.turnCount = 5;
      state.interruptionCount = 2;
      state.audioBytesSent = 10000;
      state.audioBytesReceived = 20000;
      state.mcpCallCount = 3;
      state.mcpListToolsCount = 1;

      traceClose(state);

      expect(mockSpan.setAttribute).toHaveBeenCalledWith("gen_ai.voice.turn_count", 5);
      expect(mockSpan.setAttribute).toHaveBeenCalledWith("gen_ai.voice.interruption_count", 2);
      expect(mockSpan.setAttribute).toHaveBeenCalledWith("gen_ai.voice.audio_bytes_sent", 10000);
      expect(mockSpan.setAttribute).toHaveBeenCalledWith("gen_ai.voice.audio_bytes_received", 20000);
      expect(mockSpan.setAttribute).toHaveBeenCalledWith("gen_ai.voice.mcp.call_count", 3);
      expect(mockSpan.setAttribute).toHaveBeenCalledWith("gen_ai.voice.mcp.list_tools_count", 1);
      expect(mockSpan.end).toHaveBeenCalled();
    });

    it("should not set zero counters on close", () => {
      traceClose(state);

      expect(mockSpan.setAttribute).not.toHaveBeenCalledWith("gen_ai.voice.turn_count", 0);
      expect(mockSpan.setAttribute).not.toHaveBeenCalledWith("gen_ai.voice.interruption_count", 0);
    });

    it("should record error on close with error", () => {
      const error = new Error("Connection lost");
      traceClose(state, error);

      expect(mockSpan.setStatus).toHaveBeenCalledWith(
        expect.objectContaining({ code: 2 }), // SpanStatusCode.ERROR
      );
      expect(mockSpan.setAttribute).toHaveBeenCalledWith("error.type", "Error");
      expect(mockSpan.setAttribute).toHaveBeenCalledWith("error.message", "Connection lost");
    });
  });

  describe("Full Session Flow", () => {
    let instrumentor: VoiceLiveInstrumentor;
    let state: TelemetryState;

    beforeEach(() => {
      process.env.AZURE_EXPERIMENTAL_ENABLE_GENAI_TRACING = "true";
      instrumentor = new VoiceLiveInstrumentor();
      instrumentor.instrument();
      const result = createTelemetryState(TestConstants.ENDPOINT, TestConstants.MODEL_NAME);
      state = result.state;
    });

    afterEach(() => {
      instrumentor.uninstrument();
      delete process.env.AZURE_EXPERIMENTAL_ENABLE_GENAI_TRACING;
    });

    it("should trace a complete conversation session", () => {
      // 1. Send session.update
      traceSend(state, {
        type: KnownClientEventType.SessionUpdate,
        session: { instructions: "Be helpful" },
      } as any);

      // 2. Recv session.created
      traceRecv(state, {
        type: KnownServerEventType.SessionCreated,
        session: { id: "test-session-flow" },
      } as any);
      expect(state.sessionId).toBe("test-session-flow");

      // 3. Send audio
      traceSend(state, {
        type: KnownClientEventType.InputAudioBufferAppend,
        audio: "AQIDBA==",
      } as any);
      expect(state.audioBytesSent).toBe(4);

      // 4. Recv response.created
      traceRecv(state, {
        type: KnownServerEventType.ResponseCreated,
        response: { id: "test-response-flow-1", conversationId: "test-conversation-flow", conversation_id: "test-conversation-flow" },
      } as any);
      expect(state.conversationId).toBe("test-conversation-flow");

      // 5. Recv response.done
      traceRecv(state, {
        type: KnownServerEventType.ResponseDone,
        response: { id: "test-response-flow-1", status: "completed", conversationId: "test-conversation-flow", conversation_id: "test-conversation-flow" },
      } as any);
      expect(state.turnCount).toBe(1);

      // 6. Close
      traceClose(state);
      expect(mockSpan.end).toHaveBeenCalled();
    });

    it("should trace a function calling flow", () => {
      // Session setup
      traceRecv(state, {
        type: KnownServerEventType.SessionCreated,
        session: { id: "test-session-function-call" },
      } as any);

      // Send response.create
      traceSend(state, { type: KnownClientEventType.ResponseCreate } as any);

      // Response with function call
      traceRecv(state, {
        type: KnownServerEventType.ResponseFunctionCallArgumentsDone,
        response_id: "test-response-fn",
        responseId: "test-response-fn",
        item_id: "test-item-fn-001",
        itemId: "test-item-fn-001",
        call_id: "test-call-fn-001",
        callId: "test-call-fn-001",
        name: "get_weather",
        arguments: '{"location": "SF"}',
      } as any);

      // Response.done
      traceRecv(state, {
        type: KnownServerEventType.ResponseDone,
        response: { id: "test-response-fn", status: "completed" },
      } as any);
      expect(state.turnCount).toBe(1);

      // Send function result
      traceSend(state, {
        type: KnownClientEventType.ConversationItemCreate,
        item: {
          type: "function_call_output",
          callId: "test-call-fn-001",
          call_id: "test-call-fn-001",
          output: '{"temp": "22C"}',
        },
      } as any);

      // Trigger next response
      traceSend(state, { type: KnownClientEventType.ResponseCreate } as any);

      // Final response
      traceRecv(state, {
        type: KnownServerEventType.ResponseDone,
        response: { id: "test-response-fn-2", status: "completed" },
      } as any);
      expect(state.turnCount).toBe(2);

      traceClose(state);
    });

    it("should trace MCP tool call flow", () => {
      traceRecv(state, {
        type: KnownServerEventType.SessionCreated,
        session: { id: "test-session-mcp" },
      } as any);

      // MCP call
      traceRecv(state, {
        type: KnownServerEventType.ResponseMcpCallCompleted,
        response_id: "test-response-mcp",
        responseId: "test-response-mcp",
        item_id: "test-item-mcp",
        itemId: "test-item-mcp",
        call_id: "test-call-mcp",
        callId: "test-call-mcp",
      } as any);
      expect(state.mcpCallCount).toBe(1);

      // MCP list tools
      traceRecv(state, {
        type: KnownServerEventType.McpListToolsCompleted,
      } as any);
      expect(state.mcpListToolsCount).toBe(1);

      // Close verifies counters
      state.turnCount = 1;
      traceClose(state);
      expect(mockSpan.setAttribute).toHaveBeenCalledWith("gen_ai.voice.mcp.call_count", 1);
      expect(mockSpan.setAttribute).toHaveBeenCalledWith("gen_ai.voice.mcp.list_tools_count", 1);
    });
  });

  describe("Done Event Content Extraction", () => {
    let instrumentor: VoiceLiveInstrumentor;
    let state: TelemetryState;

    beforeEach(() => {
      process.env.AZURE_EXPERIMENTAL_ENABLE_GENAI_TRACING = "true";
      instrumentor = new VoiceLiveInstrumentor();
      instrumentor.instrument({ enableContentRecording: true });
      const result = createTelemetryState(TestConstants.ENDPOINT, TestConstants.MODEL_NAME);
      state = result.state;
    });

    afterEach(() => {
      state?.connectSpan?.end();
      instrumentor.uninstrument();
      delete process.env.AZURE_EXPERIMENTAL_ENABLE_GENAI_TRACING;
    });

    it("should extract text from response.text.done", () => {
      const event = {
        type: KnownServerEventType.ResponseTextDone,
        text: "Hello world",
      };

      traceRecv(state, event as any);

      expect(mockSpan.addEvent).toHaveBeenCalledWith(
        "gen_ai.output.messages",
        expect.objectContaining({
          [GEN_AI_EVENT_CONTENT]: expect.stringContaining("Hello world"),
        }),
      );
    });

    it("should extract transcript from response.audio_transcript.done", () => {
      const event = {
        type: KnownServerEventType.ResponseAudioTranscriptDone,
        transcript: "This is what I said",
      };

      traceRecv(state, event as any);

      expect(mockSpan.addEvent).toHaveBeenCalledWith(
        "gen_ai.output.messages",
        expect.objectContaining({
          [GEN_AI_EVENT_CONTENT]: expect.stringContaining("This is what I said"),
        }),
      );
    });

    it("should extract function call from response.function_call_arguments.done", () => {
      const event = {
        type: KnownServerEventType.ResponseFunctionCallArgumentsDone,
        response_id: "test-response-fn",
        responseId: "test-response-fn",
        item_id: "test-item-fn-001",
        itemId: "test-item-fn-001",
        call_id: "test-call-fn-001",
        callId: "test-call-fn-001",
        name: "get_weather",
        arguments: '{"location": "SF"}',
      };

      traceRecv(state, event as any);

      expect(mockSpan.addEvent).toHaveBeenCalledWith(
        "gen_ai.output.messages",
        expect.objectContaining({
          [GEN_AI_EVENT_CONTENT]: expect.stringContaining("get_weather"),
        }),
      );
    });
  });
});
