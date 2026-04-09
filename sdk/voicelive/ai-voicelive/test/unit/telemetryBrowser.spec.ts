// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Tests the browser/ESM code path where OpenTelemetry is discovered via the
 * global Symbol registration (`globalThis[Symbol.for('opentelemetry.js.api.1')]`)
 * rather than `require()`.
 *
 * This simulates how @opentelemetry/api makes itself available in browser
 * bundles and ESM environments where `require` does not exist.
 */

import { describe, it, expect, afterAll, beforeEach, afterEach, vi } from "vitest";
import { TestConstants } from "../infrastructure/index.js";

import { KnownClientEventType, KnownServerEventType } from "../../src/models/index.js";

// --- Setup: simulate browser environment BEFORE importing telemetry module ---

// Remove globalThis.require so the CJS path in tryLoadOtel() is skipped.
const _origRequire = (globalThis as Record<string, unknown>)["require"] as
  | ((...args: unknown[]) => unknown)
  | undefined;
delete (globalThis as Record<string, unknown>)["require"];

// Build mock OpenTelemetry provider objects that mirror the global registration
// shape used by @opentelemetry/api (stored on globalThis[Symbol.for(...)]).
const mockSpan = {
  setAttribute: vi.fn(),
  addEvent: vi.fn(),
  setStatus: vi.fn(),
  end: vi.fn(),
  isRecording: vi.fn().mockReturnValue(true),
  updateName: vi.fn(),
};

const mockTracer = { startSpan: vi.fn().mockReturnValue(mockSpan) };

const mockTracerProvider = {
  getTracer: vi.fn().mockReturnValue(mockTracer),
};

const mockHistogram = { record: vi.fn() };
const mockMeter = { createHistogram: vi.fn().mockReturnValue(mockHistogram) };
const mockMeterProvider = { getMeter: vi.fn().mockReturnValue(mockMeter) };

// @opentelemetry/api registers on globalThis[Symbol.for('opentelemetry.js.api.1')]
// with shape: { version, trace?: TracerProvider, context?: ContextManager, metrics?, ... }
const OTEL_GLOBAL_KEY = Symbol.for("opentelemetry.js.api.1");

(globalThis as Record<symbol, unknown>)[OTEL_GLOBAL_KEY] = {
  version: "1.9.0",
  trace: {
    ...mockTracerProvider,
    setSpan: vi.fn().mockReturnValue({}),
  },
  context: {
    active: vi.fn().mockReturnValue({}),
  },
  metrics: mockMeterProvider,
};

// Now import the telemetry module — tryLoadOtel() will find the Symbol-based global
import {
  VoiceLiveInstrumentor,
  createTelemetryState,
  traceSend,
  traceRecv,
  traceClose,
} from "../../src/telemetry/index.js";
import type { TelemetryState } from "../../src/telemetry/index.js";

describe("Browser/ESM Telemetry (Symbol-based OTel global)", () => {
  afterAll(() => {
    // Restore original global state
    delete (globalThis as Record<symbol, unknown>)[OTEL_GLOBAL_KEY];
    if (_origRequire) {
      (globalThis as Record<string, unknown>)["require"] = _origRequire;
    }
  });

  beforeEach(() => {
    vi.clearAllMocks();
    mockSpan.isRecording.mockReturnValue(true);
  });

  describe("VoiceLiveInstrumentor via global Symbol", () => {
    let instrumentor: VoiceLiveInstrumentor;

    beforeEach(() => {
      instrumentor = new VoiceLiveInstrumentor();
      instrumentor.uninstrument();
    });

    afterEach(() => {
      instrumentor?.uninstrument();
      delete process.env.AZURE_EXPERIMENTAL_ENABLE_GENAI_TRACING;
      delete process.env.OTEL_INSTRUMENTATION_GENAI_CAPTURE_MESSAGE_CONTENT;
    });

    it("should construct without error when OTel is on the global Symbol", () => {
      expect(instrumentor).toBeDefined();
    });

    it("should enable tracing via env gate", () => {
      process.env.AZURE_EXPERIMENTAL_ENABLE_GENAI_TRACING = "true";
      instrumentor.instrument();
      expect(instrumentor.isInstrumented()).toBe(true);
    });

    it("should support content recording", () => {
      process.env.AZURE_EXPERIMENTAL_ENABLE_GENAI_TRACING = "true";
      instrumentor.instrument({ enableContentRecording: true });
      expect(instrumentor.isContentRecordingEnabled()).toBe(true);
    });
  });

  describe("Telemetry State via global Symbol", () => {
    let instrumentor: VoiceLiveInstrumentor;

    beforeEach(() => {
      process.env.AZURE_EXPERIMENTAL_ENABLE_GENAI_TRACING = "true";
      instrumentor = new VoiceLiveInstrumentor();
      instrumentor.instrument();
    });

    afterEach(() => {
      instrumentor?.uninstrument();
      delete process.env.AZURE_EXPERIMENTAL_ENABLE_GENAI_TRACING;
    });

    it("should create active telemetry state", () => {
      const { state, active } = createTelemetryState(
        TestConstants.ENDPOINT,
        TestConstants.MODEL_NAME,
      );
      expect(active).toBe(true);
      expect(state).toBeDefined();
      expect(state.model).toBe(TestConstants.MODEL_NAME);
      expect(state.connectSpan).toBeDefined();
      state.connectSpan?.end();
    });

    it("should create telemetry state with agent config", () => {
      const agentConfig = {
        agentName: "browser-agent",
        projectName: "browser-project",
      };

      const { state, active } = createTelemetryState(
        TestConstants.ENDPOINT,
        undefined,
        agentConfig,
      );
      expect(active).toBe(true);
      expect(state.agentName).toBe("browser-agent");
      expect(mockSpan.setAttribute).toHaveBeenCalledWith("gen_ai.agent.name", "browser-agent");
      state.connectSpan?.end();
    });
  });

  describe("Send/Recv/Close tracing via global Symbol", () => {
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
      instrumentor?.uninstrument();
      delete process.env.AZURE_EXPERIMENTAL_ENABLE_GENAI_TRACING;
    });

    it("should trace a send event", () => {
      const event = {
        type: KnownClientEventType.SessionUpdate,
        session: { instructions: "Test" },
      };

      traceSend(state, event as any);

      expect(mockSpan.setAttribute).toHaveBeenCalledWith(
        "gen_ai.voice.event_type",
        KnownClientEventType.SessionUpdate,
      );
    });

    it("should trace audio bytes sent", () => {
      const event = {
        type: KnownClientEventType.InputAudioBufferAppend,
        audio: TestConstants.SAMPLE_AUDIO_BASE64,
      };

      traceSend(state, event as any);
      expect(state.audioBytesSent).toBe(4);
    });

    it("should trace a recv event", () => {
      const event = {
        type: KnownServerEventType.SessionCreated,
        session: { id: "browser-session-001", inputAudioFormat: "pcm16" },
      };

      traceRecv(state, event as any);

      expect(state.sessionId).toBe("browser-session-001");
      expect(mockSpan.setAttribute).toHaveBeenCalledWith(
        "gen_ai.voice.session_id",
        "browser-session-001",
      );
    });

    it("should trace response.done and record metrics", () => {
      // First set up a response flow
      traceSend(state, { type: KnownClientEventType.ResponseCreate } as any);

      const responseDone = {
        type: KnownServerEventType.ResponseDone,
        response: {
          id: "resp-browser-001",
          status: "completed",
          usage: { totalTokens: 100, inputTokens: 40, outputTokens: 60 },
        },
      };

      traceRecv(state, responseDone as any);

      expect(mockSpan.setAttribute).toHaveBeenCalledWith(
        "gen_ai.response.id",
        "resp-browser-001",
      );
    });

    it("should trace close with SpanKind.CLIENT = 2 (hardcoded for browser)", () => {
      traceClose(state);

      // Verify connect span was ended (close calls end on connectSpan)
      expect(mockSpan.end).toHaveBeenCalled();
    });

    it("should handle error close", () => {
      traceClose(state, new Error("WebSocket disconnected"));

      expect(mockSpan.setStatus).toHaveBeenCalledWith(
        expect.objectContaining({ code: 2 }), // SpanStatusCode.ERROR = 2
      );
    });
  });

  describe("Hardcoded SpanKind/SpanStatusCode values", () => {
    let instrumentor: VoiceLiveInstrumentor;

    beforeEach(() => {
      process.env.AZURE_EXPERIMENTAL_ENABLE_GENAI_TRACING = "true";
      instrumentor = new VoiceLiveInstrumentor();
      instrumentor.instrument();
    });

    afterEach(() => {
      instrumentor?.uninstrument();
      delete process.env.AZURE_EXPERIMENTAL_ENABLE_GENAI_TRACING;
    });

    it("should use SpanKind.CLIENT=2 when creating connect span", () => {
      createTelemetryState(TestConstants.ENDPOINT, TestConstants.MODEL_NAME);

      // The startSpan call should include kind: 2 (SpanKind.CLIENT)
      expect(mockTracer.startSpan).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({ kind: 2 }),
        expect.anything(),
      );
    });
  });
});
