// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { KeyCredential } from "@azure/core-auth";
import { describe, it, expect, afterEach } from "vitest";
import { VoiceLiveClient, type RequestSession, type VoiceLiveSession } from "../../src/index.js";
import { isLiveMode } from "@azure-tools/test-recorder";
import { createTestCredential } from "@azure-tools/test-credential";
import { SessionEventRecorder } from "../infrastructure/sessionEventRecorder.js";
import { sendTestAudio, generateSilentAudio } from "../infrastructure/audioTestHelpers.js";
import {
  KnownModality,
  KnownServerEventType,
  type ServerEventResponseAudioDelta,
} from "../../src/models/models.js";

/**
 * Live "matrix" tests that mirror the Python SDK's `test_realtime_service`
 * (sdk/voicelive/azure-ai-voicelive/tests/test_live_realtime_service.py).
 *
 * Each case connects with a specific `model` + `apiVersion`, sends a short
 * audio utterance, and asserts the service produces input-buffer events and a
 * non-empty audio response. Models / API versions that are not deployed on the
 * target resource are expected to be pruned from the matrix below.
 */
describe.runIf(isLiveMode())("Realtime Service Matrix Tests", () => {
  let sessions: VoiceLiveSession[] = [];
  const timeoutMs = 45000; // realtime audio round-trips can be slow

  const endpoint = process.env.VOICELIVE_ENDPOINT || process.env.AI_SERVICES_ENDPOINT;
  const apiKey = process.env.VOICELIVE_API_KEY || process.env.AI_SERVICES_KEY;

  // API versions exercised by the Python smoke matrix (plus the JS SDK default).
  const apiVersions = ["2025-10-01", "2026-04-10"];

  // Models exercised by the Python `test_realtime_service` smoke matrix.
  // These run against the AI Services account provisioned by
  // sdk/voicelive/test-resources.bicep, which is pinned to a region that
  // exposes the full VoiceLive built-in model set.
  const models = [
    "gpt-realtime",
    "gpt-4o",
    "gpt-4.1",
    "gpt-realtime-mini",
    "phi4-mm-realtime",
    "phi4-mini",
  ];

  const matrix = models.flatMap((model) =>
    apiVersions.map((apiVersion) => ({ model, apiVersion })),
  );

  function createClient(apiVersion: string): VoiceLiveClient {
    if (!endpoint) {
      throw new Error("Missing VOICELIVE_ENDPOINT or AI_SERVICES_ENDPOINT environment variable");
    }
    if (!apiKey) {
      return new VoiceLiveClient(endpoint, createTestCredential(), { apiVersion });
    }
    return new VoiceLiveClient(endpoint, { key: apiKey } as KeyCredential, { apiVersion });
  }

  afterEach(async () => {
    for (const session of sessions) {
      try {
        await session.disconnect();
      } catch {
        // Ignore cleanup errors
      }
    }
    sessions = [];
  });

  it.each(matrix)(
    "should complete an audio round-trip with model $model @ api $apiVersion",
    async ({ model, apiVersion }) => {
      const client = createClient(apiVersion);

      const sessionConfig: RequestSession = {
        model,
        modalities: [KnownModality.Text, KnownModality.Audio],
        voice: {
          type: "azure-standard",
          name: "en-US-AvaNeural",
        },
      };

      const session = await client.createSession(model);
      sessions.push(session);

      const recorder = new SessionEventRecorder(session);

      await session.connect();
      await recorder.waitForEvent(KnownServerEventType.SessionCreated);
      await session.updateSession(sessionConfig);
      await recorder.waitForEvent(KnownServerEventType.SessionUpdated);

      // Send a short utterance followed by trailing silence so server VAD
      // commits the buffer and triggers a response.
      await sendTestAudio(session, "What is the largest lake in the world?");
      await session.sendAudio(generateSilentAudio(500));

      // We should observe an input-buffer lifecycle event.
      const inputEvent = await recorder.waitForEvent(
        KnownServerEventType.InputAudioBufferSpeechStarted,
      );
      expect(inputEvent).toBeDefined();

      // And eventually a non-empty audio response.
      const audioDelta = (await recorder.waitForEvent(
        KnownServerEventType.ResponseAudioDelta,
      )) as ServerEventResponseAudioDelta;
      expect(audioDelta.delta).toBeTruthy();
      expect(audioDelta.delta.length).toBeGreaterThan(0);
    },
    timeoutMs,
  );
});
