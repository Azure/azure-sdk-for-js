// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Serialization & deserialization tests for output-audio-buffer control,
 * RTC call negotiation, invocation passthrough events, and transcription
 * models added through the 2026-06-01-preview surface.
 *
 * Focus: camelCase ↔ snake_case wire mapping (the same class of bug
 * fixed in 1.0.0-beta.4 for `voiceSerializer`).
 */

import { describe, it, expect } from "vitest";
import type {
  ClientEventOutputAudioBufferClear,
  ClientEventRtcCallSdpCreate,
} from "../../src/models/index.js";
import {
  clientEventOutputAudioBufferClearSerializer,
  clientEventRtcCallSdpCreateSerializer,
  serverEventOutputAudioBufferClearedDeserializer,
  serverEventOutputAudioBufferStartedDeserializer,
  serverEventOutputAudioBufferStoppedDeserializer,
  serverEventResponseInvocationDeltaDeserializer,
  serverEventRtcCallSdpCreatedDeserializer,
  serverEventRtcCallErrorDeserializer,
  transcriptionPhraseDeserializer,
  transcriptionWordDeserializer,
  serverEventResponseAudioTranscriptAnnotationAddedDeserializer,
} from "../../src/models/models.js";

describe("Audio buffer control & transcription models (preview 2026-06-01)", () => {
  describe("ClientEventOutputAudioBufferClear", () => {
    it("serializes eventId to event_id", () => {
      const evt: ClientEventOutputAudioBufferClear = {
        type: "output_audio_buffer.clear",
        eventId: "client-evt-1",
      };

      const wire = clientEventOutputAudioBufferClearSerializer(evt);

      expect(wire.type).toBe("output_audio_buffer.clear");
      expect(wire.event_id).toBe("client-evt-1");
      expect(wire).not.toHaveProperty("eventId");
    });
  });

  describe("ServerEventOutputAudioBufferCleared", () => {
    it("deserializes output_audio_buffer.cleared", () => {
      const evt = serverEventOutputAudioBufferClearedDeserializer({
        type: "output_audio_buffer.cleared",
        event_id: "e4",
      });
      expect(evt.type).toBe("output_audio_buffer.cleared");
      expect(evt.eventId).toBe("e4");
    });
  });

  describe("RTC call preview events", () => {
    it("serializes rtc.call.sdp.create", () => {
      const evt: ClientEventRtcCallSdpCreate = {
        type: "rtc.call.sdp.create",
        eventId: "rtc-client-1",
        sdpOffer: "v=0\r\no=- 1 1 IN IP4 127.0.0.1",
        session: {
          instructions: "Negotiate WebRTC before the session starts.",
        },
      };

      const wire = clientEventRtcCallSdpCreateSerializer(evt);

      expect(wire.type).toBe("rtc.call.sdp.create");
      expect(wire.event_id).toBe("rtc-client-1");
      expect(wire.sdp_offer).toContain("v=0");
      expect(wire.session.instructions).toBe("Negotiate WebRTC before the session starts.");
    });

    it("deserializes rtc.call.sdp.created", () => {
      const evt = serverEventRtcCallSdpCreatedDeserializer({
        type: "rtc.call.sdp.created",
        event_id: "rtc-server-1",
        rtc_call_id: "call-123",
        sdp_answer: "v=0\r\no=- 2 2 IN IP4 127.0.0.1",
      });

      expect(evt.eventId).toBe("rtc-server-1");
      expect(evt.rtcCallId).toBe("call-123");
      expect(evt.sdpAnswer).toContain("v=0");
    });

    it("deserializes rtc.call.error", () => {
      const evt = serverEventRtcCallErrorDeserializer({
        type: "rtc.call.error",
        event_id: "rtc-server-2",
        operation: "rtc.call.sdp.create",
        rtc_call_id: "call-123",
        error: {
          type: "invalid_request_error",
          code: "bad_sdp_offer",
          message: "SDP offer could not be parsed.",
        },
      });

      expect(evt.operation).toBe("rtc.call.sdp.create");
      expect(evt.rtcCallId).toBe("call-123");
      expect(evt.error.code).toBe("bad_sdp_offer");
      expect(evt.error.message).toContain("SDP offer");
    });
  });

  describe("Output audio buffer lifecycle", () => {
    it("deserializes output_audio_buffer.started", () => {
      const evt = serverEventOutputAudioBufferStartedDeserializer({
        type: "output_audio_buffer.started",
        event_id: "e6",
        response_id: "r-42",
      });

      expect(evt.type).toBe("output_audio_buffer.started");
      expect(evt.eventId).toBe("e6");
      expect(evt.responseId).toBe("r-42");
    });

    it("deserializes output_audio_buffer.stopped", () => {
      const evt = serverEventOutputAudioBufferStoppedDeserializer({
        type: "output_audio_buffer.stopped",
        event_id: "e7",
        response_id: "r-42",
      });

      expect(evt.type).toBe("output_audio_buffer.stopped");
      expect(evt.eventId).toBe("e7");
      expect(evt.responseId).toBe("r-42");
    });
  });

  describe("TranscriptionWord", () => {
    it("maps offset_milliseconds and duration_milliseconds to camelCase", () => {
      const word = transcriptionWordDeserializer({
        text: "hello",
        offset_milliseconds: 100,
        duration_milliseconds: 250,
      });

      expect(word.text).toBe("hello");
      expect(word.offsetInMs).toBe(100);
      expect(word.durationInMs).toBe(250);
    });
  });

  describe("TranscriptionPhrase", () => {
    it("deserializes phrase with nested word array", () => {
      const phrase = transcriptionPhraseDeserializer({
        offset_milliseconds: 0,
        duration_milliseconds: 1500,
        text: "hello world",
        locale: "en-US",
        confidence: 0.97,
        words: [
          { text: "hello", offset_milliseconds: 0, duration_milliseconds: 500 },
          { text: "world", offset_milliseconds: 500, duration_milliseconds: 1000 },
        ],
      });

      expect(phrase.offsetInMs).toBe(0);
      expect(phrase.durationInMs).toBe(1500);
      expect(phrase.locale).toBe("en-US");
      expect(phrase.confidence).toBe(0.97);
      expect(phrase.words).toHaveLength(2);
      expect(phrase.words?.[0].offsetInMs).toBe(0);
      expect(phrase.words?.[1].offsetInMs).toBe(500);
    });

    it("preserves undefined words when not present in payload", () => {
      const phrase = transcriptionPhraseDeserializer({
        offset_milliseconds: 0,
        duration_milliseconds: 100,
        text: "hi",
      });
      expect(phrase.words).toBeUndefined();
    });
  });

  describe("ServerEventResponseAudioTranscriptAnnotationAdded", () => {
    it("maps all index fields and preserves opaque annotation payload", () => {
      const evt = serverEventResponseAudioTranscriptAnnotationAddedDeserializer({
        type: "response.audio_transcript.annotation.added",
        event_id: "e5",
        response_id: "r-1",
        item_id: "i-1",
        output_index: 0,
        content_index: 1,
        annotation_index: 2,
        annotation: { kind: "citation", text: "source" },
      });
      expect(evt.responseId).toBe("r-1");
      expect(evt.itemId).toBe("i-1");
      expect(evt.outputIndex).toBe(0);
      expect(evt.contentIndex).toBe(1);
      expect(evt.annotationIndex).toBe(2);
      expect(evt.annotation).toEqual({ kind: "citation", text: "source" });
    });
  });

  describe("ServerEventResponseInvocationDelta", () => {
    it("passes through hosted-agent invocation SSE payloads", () => {
      const evt = serverEventResponseInvocationDeltaDeserializer({
        type: "response.invocation.delta",
        event_id: "e8",
        delta: {
          event: "thread.run.step.delta",
          data: {
            id: "step-1",
            state: "in_progress",
          },
        },
      });

      expect(evt.type).toBe("response.invocation.delta");
      expect(evt.eventId).toBe("e8");
      expect(evt.delta).toEqual({
        event: "thread.run.step.delta",
        data: {
          id: "step-1",
          state: "in_progress",
        },
      });
    });
  });
});
