// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { KeyCredential } from "@azure/core-auth";
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { useInstrumenter } from "@azure/core-tracing";
import { MockInstrumenter, type MockTracingSpan } from "@azure-tools/test-utils-vitest";
import { isLiveMode } from "@azure-tools/test-recorder";
import { createTestCredential } from "@azure-tools/test-credential";
import { VoiceLiveClient, type RequestSession, type VoiceLiveSession } from "../../src/index.js";
import { SessionEventRecorder } from "../infrastructure/sessionEventRecorder.js";
import {
  GEN_AI_OPERATION_NAME,
  GEN_AI_REQUEST_MODEL,
  GEN_AI_VOICE_EVENT_TYPE,
  OperationName,
  SERVER_ADDRESS,
  SERVER_PORT,
} from "../../src/telemetry/index.js";
import { KnownModality, KnownServerEventType } from "../../src/models/models.js";

/**
 * Live telemetry tests that mirror the Python SDK's
 * `test_live_realtime_telemetry.py`
 * (sdk/voicelive/azure-ai-voicelive/tests/live/test_live_realtime_telemetry.py).
 *
 * They verify that real tracing spans are emitted over a live session: a parent
 * `connect` span that wraps the session lifetime, plus child `send` / `recv`
 * spans for the `session.update` / `session.updated` round-trip. The JS SDK
 * traces through `@azure/core-tracing`, so we install a `MockInstrumenter`
 * (the analogue of Python's in-memory OpenTelemetry span exporter) and inspect
 * the spans it records.
 */
describe.runIf(isLiveMode())("Realtime Service Telemetry Tests", () => {
  let sessions: VoiceLiveSession[] = [];
  let instrumenter: MockInstrumenter;
  const timeoutMs = 45000;

  const endpoint = process.env.VOICELIVE_ENDPOINT || process.env.AI_SERVICES_ENDPOINT;
  const apiKey = process.env.VOICELIVE_API_KEY || process.env.AI_SERVICES_KEY;

  function createClient(): VoiceLiveClient {
    if (!endpoint) {
      throw new Error("Missing VOICELIVE_ENDPOINT or AI_SERVICES_ENDPOINT environment variable");
    }
    if (!apiKey) {
      return new VoiceLiveClient(endpoint, createTestCredential());
    }
    return new VoiceLiveClient(endpoint, { key: apiKey } as KeyCredential);
  }

  function findSpan(spans: MockTracingSpan[], name: string): MockTracingSpan | undefined {
    return spans.find((s) => s.name === name);
  }

  beforeEach(() => {
    // Install a fresh recording instrumenter for each test so spans from a
    // prior test do not leak into the assertions.
    instrumenter = new MockInstrumenter();
    useInstrumenter(instrumenter);
  });

  afterEach(async () => {
    try {
      for (const session of sessions) {
        try {
          await session.disconnect();
        } catch {
          // Ignore cleanup errors
        }
      }
      sessions = [];
      instrumenter.reset();
    } finally {
      // Restore the default no-op instrumenter so this test does not pollute
      // the global tracing state for later tests in the suite.
      useInstrumenter(undefined as any);
    }
  });

  it(
    "emits connect, send and recv spans for the session.update round-trip",
    async () => {
      const model = "gpt-realtime";
      const client = createClient();

      const session = await client.createSession(model);
      sessions.push(session);

      const recorder = new SessionEventRecorder(session);

      await session.connect();
      await recorder.waitForEvent(KnownServerEventType.SessionCreated);

      const sessionConfig: RequestSession = {
        model,
        modalities: [KnownModality.Text, KnownModality.Audio],
      };
      await session.updateSession(sessionConfig);
      await recorder.waitForEvent(KnownServerEventType.SessionUpdated);

      // The connect span stays open for the session lifetime; close it so the
      // full trace is recorded before we inspect it.
      await session.disconnect();

      const spans = instrumenter.startedSpans;
      const spanNames = spans.map((s) => s.name);

      const connectSpan = findSpan(spans, OperationName.Connect);
      const recvSpan = findSpan(spans, "recv session.updated");
      const sendSpan = findSpan(spans, "send session.update");

      // --- Spans exist ---
      expect(connectSpan, `expected a 'connect' span, got: ${spanNames}`).toBeDefined();
      expect(recvSpan, `expected 'recv session.updated', got: ${spanNames}`).toBeDefined();
      expect(sendSpan, `expected 'send session.update', got: ${spanNames}`).toBeDefined();

      // --- Parent/child nesting: connect wraps the whole trace ---
      expect(recvSpan!.parentSpan()?.spanId, "recv span should be a child of connect").toBe(
        connectSpan!.spanId,
      );
      expect(sendSpan!.parentSpan()?.spanId, "send span should be a child of connect").toBe(
        connectSpan!.spanId,
      );

      // --- Connect span lifetime: it is started first, making it the root that
      // parents every other span, and it is eventually closed (by disconnect()).
      // The mock only records start order (`startedSpans`) and an `endCalled`
      // flag -- it has no end timestamps -- so we can assert that connect is the
      // root span and that all spans were closed, but not the relative end order.
      expect(spans[0]?.spanId, "connect should be the first (root) span").toBe(connectSpan!.spanId);
      expect(connectSpan!.endCalled, "connect span should be closed by disconnect()").toBe(true);
      expect(sendSpan!.endCalled, "send span should be closed").toBe(true);
      expect(recvSpan!.endCalled, "recv span should be closed").toBe(true);

      // --- GenAI attributes on the traced send / recv operations ---
      // The connect span records its attributes at creation time via
      // `spanAttributes`, which the mock instrumenter does not capture, so the
      // GenAI semantics are asserted on the child operation spans (which set
      // their attributes via `setAttribute`).
      const sendAttrs = sendSpan!.attributes;
      expect(sendAttrs[GEN_AI_OPERATION_NAME]).toBe(OperationName.Send);
      expect(sendAttrs[GEN_AI_REQUEST_MODEL]).toBe(model);
      expect(sendAttrs[GEN_AI_VOICE_EVENT_TYPE]).toBe("session.update");
      expect(
        sendAttrs[SERVER_ADDRESS],
        `missing server.address: ${JSON.stringify(sendAttrs)}`,
      ).toBeTruthy();
      expect(
        sendAttrs[SERVER_PORT],
        `missing server.port: ${JSON.stringify(sendAttrs)}`,
      ).toBeTruthy();

      const recvAttrs = recvSpan!.attributes;
      expect(recvAttrs[GEN_AI_OPERATION_NAME]).toBe(OperationName.Recv);
      expect(recvAttrs[GEN_AI_REQUEST_MODEL]).toBe(model);
      expect(recvAttrs[GEN_AI_VOICE_EVENT_TYPE]).toBe("session.updated");
    },
    timeoutMs,
  );
});
