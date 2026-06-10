// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { KeyCredential } from "@azure/core-auth";
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { VoiceLiveClient, type RequestSession, type VoiceLiveSession } from "../../src/index.js";
import { isLiveMode } from "@azure-tools/test-recorder";
import { createTestCredential } from "@azure-tools/test-credential";
import { SessionEventRecorder } from "../infrastructure/sessionEventRecorder.js";
import { generateTestAudio } from "../infrastructure/audioTestHelpers.js";
import {
  type ClientEventConversationItemDelete,
  type ClientEventConversationItemRetrieve,
  type ClientEventConversationItemTruncate,
  type ClientEventOutputAudioBufferClear,
  type ClientEventResponseCancel,
  KnownClientEventType,
  KnownInputAudioFormat,
  KnownItemType,
  KnownMessageRole,
  KnownModality,
  KnownResponseStatus,
  KnownServerEventType,
  KnownTurnDetectionType,
  type AzureStandardVoice,
  type ServerEventConversationItemCreated,
  type ServerEventConversationItemDeleted,
  type ServerEventConversationItemRetrieved,
  type ServerEventConversationItemTruncated,
  type ServerEventError,
  type ServerEventResponseAudioTranscriptDone,
  type ServerEventResponseCreated,
  type ServerEventResponseDone,
  type ServerEventResponseOutputItemDone,
  type ServerEventSessionUpdated,
} from "../../src/models/models.js";

// API versions to exercise the full suite against (mirrors the Python SDK matrix).
const apiVersions = ["2025-10-01", "2026-04-10"];

describe.runIf(isLiveMode()).each(apiVersions)(
  "Conversation Control Tests (api %s)",
  (apiVersion) => {
    let client: VoiceLiveClient;
    let sessions: VoiceLiveSession[] = [];
    const timeoutMs = 30000; // 30 second timeout for live tests

    const endpoint = process.env.VOICELIVE_ENDPOINT || process.env.AI_SERVICES_ENDPOINT;
    const apiKey = process.env.VOICELIVE_API_KEY || process.env.AI_SERVICES_KEY;

    beforeEach(() => {
      if (!endpoint) {
        throw new Error("Missing VOICELIVE_ENDPOINT or AI_SERVICES_ENDPOINT environment variable");
      }

      if (!apiKey) {
        const credential = createTestCredential();
        client = new VoiceLiveClient(endpoint, credential, { apiVersion });
      } else {
        client = new VoiceLiveClient(endpoint, { key: apiKey } as KeyCredential, { apiVersion });
      }
    });

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

    it(
      "should configure azure semantic VAD turn detection",
      async () => {
        const sessionConfig: RequestSession = {
          model: "gpt-4.1",
          turnDetection: {
            type: KnownTurnDetectionType.AzureSemanticVad,
            threshold: 0.5,
            prefixPaddingInMs: 300,
            silenceDurationInMs: 500,
          },
        };

        const session = await client.createSession(sessionConfig);
        sessions.push(session);

        const recorder = new SessionEventRecorder(session); // Attach recorder first

        await session.connect();
        await recorder.waitForEvent(KnownServerEventType.SessionCreated);

        await session.updateSession(sessionConfig);
        const sessionUpdated = (await recorder.waitForEvent(
          KnownServerEventType.SessionUpdated,
        )) as ServerEventSessionUpdated;

        // The updated configuration should reflect Azure semantic VAD
        expect(sessionUpdated.session.turnDetection?.type).toBe(
          KnownTurnDetectionType.AzureSemanticVad,
        );
      },
      timeoutMs,
    );

    it(
      "should delete a conversation item",
      async () => {
        const sessionConfig: RequestSession = {
          model: "gpt-4.1",
          modalities: [KnownModality.Text],
        };

        const session = await client.createSession(sessionConfig);
        sessions.push(session);

        const recorder = new SessionEventRecorder(session); // Attach recorder first

        await session.connect();
        await recorder.waitForEvent(KnownServerEventType.SessionCreated);
        await session.updateSession(sessionConfig);
        await recorder.waitForEvent(KnownServerEventType.SessionUpdated);

        // Add a text message to the conversation
        await session.addConversationItem({
          type: KnownItemType.Message,
          role: KnownMessageRole.User,
          content: [
            {
              type: "input_text",
              text: "This message will be deleted.",
            },
          ],
        });

        const created = (await recorder.waitForEvent(
          KnownServerEventType.ConversationItemCreated,
        )) as ServerEventConversationItemCreated;

        const itemId = created.item?.id as string;
        expect(itemId).toBeTruthy();

        // Delete the conversation item we just created
        const deleteEvent: ClientEventConversationItemDelete = {
          type: KnownClientEventType.ConversationItemDelete,
          itemId,
        };
        await session.sendEvent(deleteEvent);

        const deleted = (await recorder.waitForEvent(
          KnownServerEventType.ConversationItemDeleted,
        )) as ServerEventConversationItemDeleted;

        expect(deleted.itemId).toBe(itemId);
      },
      timeoutMs,
    );

    it(
      "should cancel an in-progress response",
      async () => {
        const sessionConfig: RequestSession = {
          model: "gpt-4.1",
          modalities: [KnownModality.Text],
        };

        const session = await client.createSession(sessionConfig);
        sessions.push(session);

        const recorder = new SessionEventRecorder(session); // Attach recorder first

        await session.connect();
        await recorder.waitForEvent(KnownServerEventType.SessionCreated);
        await session.updateSession(sessionConfig);
        await recorder.waitForEvent(KnownServerEventType.SessionUpdated);

        // Ask for a long answer to increase the chance the response is still
        // in progress when we cancel it.
        await session.addConversationItem({
          type: KnownItemType.Message,
          role: KnownMessageRole.User,
          content: [
            {
              type: "input_text",
              text: "Write a long, detailed essay about the history of computing.",
            },
          ],
        });
        await recorder.waitForEvent(KnownServerEventType.ConversationItemCreated);

        // Trigger response generation
        await session.sendEvent({ type: KnownClientEventType.ResponseCreate });

        const responseCreated = (await recorder.waitForEvent(
          KnownServerEventType.ResponseCreated,
        )) as ServerEventResponseCreated;
        const responseId = responseCreated.response.id as string;
        expect(responseId).toBeTruthy();

        // Cancel the in-progress response
        const cancelEvent: ClientEventResponseCancel = {
          type: KnownClientEventType.ResponseCancel,
          responseId,
        };
        await session.sendEvent(cancelEvent);

        // The server always emits response.done, regardless of final state.
        const responseDone = (await recorder.waitForEvent(
          KnownServerEventType.ResponseDone,
        )) as ServerEventResponseDone;

        expect(responseDone.response).toBeDefined();
        expect(responseDone.response.id).toBe(responseId);
        // Depending on timing the response may have completed before the cancel
        // was processed, so accept either cancelled or completed.
        expect([KnownResponseStatus.Cancelled, KnownResponseStatus.Completed]).toContain(
          responseDone.response.status,
        );
        expect(session.isConnected).toBe(true);
      },
      timeoutMs,
    );

    it(
      "should retrieve a conversation item by id",
      async () => {
        const sessionConfig: RequestSession = {
          model: "gpt-4.1",
          modalities: [KnownModality.Text],
        };

        const session = await client.createSession(sessionConfig);
        sessions.push(session);

        const recorder = new SessionEventRecorder(session); // Attach recorder first

        await session.connect();
        await recorder.waitForEvent(KnownServerEventType.SessionCreated);
        await session.updateSession(sessionConfig);
        await recorder.waitForEvent(KnownServerEventType.SessionUpdated);

        // Add a text message that we will retrieve again by id.
        await session.addConversationItem({
          type: KnownItemType.Message,
          role: KnownMessageRole.User,
          content: [
            {
              type: "input_text",
              text: "Please remember this message so it can be retrieved.",
            },
          ],
        });

        const created = (await recorder.waitForEvent(
          KnownServerEventType.ConversationItemCreated,
        )) as ServerEventConversationItemCreated;

        const itemId = created.item?.id as string;
        expect(itemId).toBeTruthy();

        // Retrieve the conversation item we just created.
        const retrieveEvent: ClientEventConversationItemRetrieve = {
          type: KnownClientEventType.ConversationItemRetrieve,
          itemId,
        };
        await session.sendEvent(retrieveEvent);

        const retrieved = (await recorder.waitForEvent(
          KnownServerEventType.ConversationItemRetrieved,
        )) as ServerEventConversationItemRetrieved;

        expect(retrieved.item).toBeDefined();
        expect(retrieved.item?.id).toBe(itemId);
      },
      timeoutMs,
    );

    it(
      "should truncate an assistant audio item",
      async () => {
        const sessionConfig: RequestSession = {
          model: "gpt-4.1",
          modalities: [KnownModality.Audio, KnownModality.Text],
          voice: {
            type: "azure-standard",
            name: "en-US-AvaNeural",
          },
        };

        const session = await client.createSession(sessionConfig);
        sessions.push(session);

        const recorder = new SessionEventRecorder(session); // Attach recorder first

        await session.connect();
        await recorder.waitForEvent(KnownServerEventType.SessionCreated);
        await session.updateSession(sessionConfig);
        await recorder.waitForEvent(KnownServerEventType.SessionUpdated);

        // Ask for a spoken answer so the assistant produces an audio message item.
        await session.addConversationItem({
          type: KnownItemType.Message,
          role: KnownMessageRole.User,
          content: [
            {
              type: "input_text",
              text: "Please say a friendly greeting out loud.",
            },
          ],
        });
        await recorder.waitForEvent(KnownServerEventType.ConversationItemCreated);

        await session.sendEvent({ type: KnownClientEventType.ResponseCreate });

        // Wait for the assistant message item to be completed so its audio exists.
        const outputItemDone = (await recorder.waitForEvent(
          KnownServerEventType.ResponseOutputItemDone,
        )) as ServerEventResponseOutputItemDone;

        const assistantItemId = outputItemDone.item?.id as string;
        expect(assistantItemId).toBeTruthy();

        // Ensure the response (and its audio) is fully generated before truncating.
        await recorder.waitForEvent(KnownServerEventType.ResponseDone);

        // Truncate the assistant audio at 100ms (any spoken greeting is longer).
        const audioEndInMs = 100;
        const truncateEvent: ClientEventConversationItemTruncate = {
          type: KnownClientEventType.ConversationItemTruncate,
          itemId: assistantItemId,
          contentIndex: 0,
          audioEndInMs,
        };
        await session.sendEvent(truncateEvent);

        const truncated = (await recorder.waitForEvent(
          KnownServerEventType.ConversationItemTruncated,
        )) as ServerEventConversationItemTruncated;

        expect(truncated.itemId).toBe(assistantItemId);
        expect(truncated.contentIndex).toBe(0);
        expect(truncated.audioEndInMs).toBe(audioEndInMs);
      },
      timeoutMs,
    );

    it(
      "should echo input audio noise reduction and echo cancellation config",
      async () => {
        const sessionConfig: RequestSession = {
          model: "gpt-4.1",
          inputAudioNoiseReduction: {
            type: "azure_deep_noise_suppression",
          },
          inputAudioEchoCancellation: {
            type: "server_echo_cancellation",
          },
        };

        const session = await client.createSession(sessionConfig);
        sessions.push(session);

        const recorder = new SessionEventRecorder(session); // Attach recorder first

        await session.connect();
        await recorder.waitForEvent(KnownServerEventType.SessionCreated);

        await session.updateSession(sessionConfig);
        const sessionUpdated = (await recorder.waitForEvent(
          KnownServerEventType.SessionUpdated,
        )) as ServerEventSessionUpdated;

        // The service should echo back the audio processing configuration.
        expect(sessionUpdated.session.inputAudioNoiseReduction?.type).toBe(
          "azure_deep_noise_suppression",
        );
        expect(sessionUpdated.session.inputAudioEchoCancellation?.type).toBe(
          "server_echo_cancellation",
        );
      },
      timeoutMs,
    );

    it(
      "should echo the configured voice",
      async () => {
        const sessionConfig: RequestSession = {
          model: "gpt-4.1",
          voice: {
            type: "azure-standard",
            name: "en-US-AvaNeural",
          },
        };

        const session = await client.createSession(sessionConfig);
        sessions.push(session);

        const recorder = new SessionEventRecorder(session); // Attach recorder first

        await session.connect();
        await recorder.waitForEvent(KnownServerEventType.SessionCreated);

        await session.updateSession(sessionConfig);
        const sessionUpdated = (await recorder.waitForEvent(
          KnownServerEventType.SessionUpdated,
        )) as ServerEventSessionUpdated;

        // The service should echo back the configured voice.
        const voice = sessionUpdated.session.voice as AzureStandardVoice;
        expect(voice).toBeDefined();
        expect(voice.name).toBe("en-US-AvaNeural");
      },
      timeoutMs,
    );

    it(
      "should send audio using the turn-based API (startAudioTurn/endAudioTurn)",
      async () => {
        const sessionConfig: RequestSession = {
          model: "gpt-4.1",
          inputAudioFormat: KnownInputAudioFormat.Pcm16,
        };

        const session = await client.createSession(sessionConfig);
        sessions.push(session);

        const recorder = new SessionEventRecorder(session);

        await session.connect();
        await recorder.waitForEvent(KnownServerEventType.SessionCreated);
        await session.updateSession(sessionConfig);
        await recorder.waitForEvent(KnownServerEventType.SessionUpdated);

        // Begin an explicit audio turn, stream audio into it, then end the turn.
        const turnId = await session.startAudioTurn();
        expect(turnId).toBeTruthy();

        const audio = await generateTestAudio("What is the weather like today?");
        await session.sendAudio(audio, { turnId });

        await session.endAudioTurn(turnId);

        // The full turn lifecycle should be accepted by the service without error.
        expect(session.isConnected).toBe(true);
      },
      timeoutMs,
    );

    it(
      "should clear the output audio buffer (barge-in)",
      async () => {
        const sessionConfig: RequestSession = {
          model: "gpt-4.1",
          modalities: [KnownModality.Audio, KnownModality.Text],
          voice: {
            type: "azure-standard",
            name: "en-US-AvaNeural",
          },
        };

        const session = await client.createSession(sessionConfig);
        sessions.push(session);

        // Drive this test through the subscribe() handlers rather than the event
        // recorder, because the recorder rejects all pending waiters when a server
        // error arrives and a barge-in clear is rejected outside of avatar mode.
        let resolveCreated: () => void;
        const created = new Promise<void>((resolve) => {
          resolveCreated = resolve;
        });
        let resolveUpdated: () => void;
        const updated = new Promise<void>((resolve) => {
          resolveUpdated = resolve;
        });
        let resolveAudio: () => void;
        const audioStarted = new Promise<void>((resolve) => {
          resolveAudio = resolve;
        });
        let resolveError: (event: ServerEventError) => void;
        const errorReceived = new Promise<ServerEventError>((resolve) => {
          resolveError = resolve;
        });

        session.subscribe({
          onSessionCreated: async () => {
            resolveCreated();
          },
          onSessionUpdated: async () => {
            resolveUpdated();
          },
          onResponseAudioDelta: async () => {
            resolveAudio();
          },
          onServerError: async (event) => {
            resolveError(event);
          },
        });

        await session.connect();
        await created;
        await session.updateSession(sessionConfig);
        await updated;

        // Ask for a long spoken reply so audio is actively streaming back.
        await session.addConversationItem({
          type: KnownItemType.Message,
          role: KnownMessageRole.User,
          content: [
            {
              type: "input_text",
              text: "Please say a long, friendly greeting and introduce yourself.",
            },
          ],
        });

        await session.sendEvent({ type: KnownClientEventType.ResponseCreate });

        // Wait until the server is actively streaming output audio back.
        await audioStarted;

        // Barge-in: clear the output audio buffer. This deployment is not in
        // avatar mode, so the service responds with an error that references the
        // clear event, confirming the barge-in event was transmitted and parsed.
        const clearEvent: ClientEventOutputAudioBufferClear = {
          type: KnownClientEventType.OutputAudioBufferClear,
        };
        await session.sendEvent(clearEvent);

        const error = await errorReceived;
        expect(error.error).toBeDefined();
        expect(error.error.param).toBe(KnownClientEventType.OutputAudioBufferClear);
      },
      timeoutMs,
    );

    it(
      "should deliver events through the subscribe() handler API",
      async () => {
        const session = await client.createSession({
          model: "gpt-4.1",
          modalities: [KnownModality.Text],
        });
        sessions.push(session);

        let sessionCreatedFired = false;
        let resolveItem: () => void;
        const itemCreated = new Promise<void>((resolve) => {
          resolveItem = resolve;
        });

        const subscription = session.subscribe({
          onSessionCreated: async () => {
            sessionCreatedFired = true;
          },
          onConversationItemCreated: async () => {
            resolveItem();
          },
        });
        expect(subscription.isActive).toBe(true);
        expect(subscription.subscriptionId).toBeTruthy();

        // Use the recorder to bring the session to a ready state, while the
        // subscribe() handlers above independently observe the same events.
        const recorder = new SessionEventRecorder(session);

        await session.connect();
        await recorder.waitForEvent(KnownServerEventType.SessionCreated);
        await session.updateSession({ model: "gpt-4.1", modalities: [KnownModality.Text] });
        await recorder.waitForEvent(KnownServerEventType.SessionUpdated);

        await session.addConversationItem({
          type: KnownItemType.Message,
          role: KnownMessageRole.User,
          content: [
            {
              type: "input_text",
              text: "Hello from the subscribe handler test.",
            },
          ],
        });

        await itemCreated;

        expect(sessionCreatedFired).toBe(true);

        await subscription.close();
        expect(subscription.isActive).toBe(false);
      },
      timeoutMs,
    );

    it(
      "should emit a final assistant audio transcript (response.audio_transcript.done)",
      async () => {
        const sessionConfig: RequestSession = {
          model: "gpt-4.1",
          modalities: [KnownModality.Audio, KnownModality.Text],
          voice: {
            type: "azure-standard",
            name: "en-US-AvaNeural",
          },
        };

        const session = await client.createSession(sessionConfig);
        sessions.push(session);

        const recorder = new SessionEventRecorder(session);

        await session.connect();
        await recorder.waitForEvent(KnownServerEventType.SessionCreated);
        await session.updateSession(sessionConfig);
        await recorder.waitForEvent(KnownServerEventType.SessionUpdated);

        await session.addConversationItem({
          type: KnownItemType.Message,
          role: KnownMessageRole.User,
          content: [
            {
              type: "input_text",
              text: "Say hello.",
            },
          ],
        });
        await recorder.waitForEvent(KnownServerEventType.ConversationItemCreated);

        await session.sendEvent({ type: KnownClientEventType.ResponseCreate });

        const transcriptDone = (await recorder.waitForEvent(
          KnownServerEventType.ResponseAudioTranscriptDone,
        )) as ServerEventResponseAudioTranscriptDone;
        expect(transcriptDone.transcript).toBeTruthy();
      },
      timeoutMs,
    );

    it(
      "should echo temperature and maxResponseOutputTokens config",
      async () => {
        const sessionConfig: RequestSession = {
          model: "gpt-4.1",
          modalities: [KnownModality.Text],
          temperature: 0.8,
          maxResponseOutputTokens: 50,
        };

        const session = await client.createSession(sessionConfig);
        sessions.push(session);

        const recorder = new SessionEventRecorder(session);

        await session.connect();
        await recorder.waitForEvent(KnownServerEventType.SessionCreated);
        await session.updateSession(sessionConfig);
        const sessionUpdated = (await recorder.waitForEvent(
          KnownServerEventType.SessionUpdated,
        )) as ServerEventSessionUpdated;

        expect(sessionUpdated.session.temperature).toBe(0.8);
        expect(sessionUpdated.session.maxResponseOutputTokens).toBe(50);
      },
      timeoutMs,
    );

    it(
      "should surface a server error for an invalid client event",
      async () => {
        const session = await client.createSession({
          model: "gpt-4.1",
          modalities: [KnownModality.Text],
        });
        sessions.push(session);

        let resolveCreated: () => void;
        const created = new Promise<void>((resolve) => {
          resolveCreated = resolve;
        });
        let resolveError: (event: ServerEventError) => void;
        const errorReceived = new Promise<ServerEventError>((resolve) => {
          resolveError = resolve;
        });

        session.subscribe({
          onSessionCreated: async () => {
            resolveCreated();
          },
          onServerError: async (event) => {
            resolveError(event);
          },
        });

        await session.connect();
        await created;

        // Truncating a non-existent item should produce a server error event.
        const badEvent: ClientEventConversationItemTruncate = {
          type: KnownClientEventType.ConversationItemTruncate,
          itemId: "nonexistent-item-id",
          contentIndex: 0,
          audioEndInMs: 0,
        };
        await session.sendEvent(badEvent);

        const error = await errorReceived;
        expect(error.error).toBeDefined();
        expect(error.error.message).toBeTruthy();
      },
      timeoutMs,
    );
  },
);
