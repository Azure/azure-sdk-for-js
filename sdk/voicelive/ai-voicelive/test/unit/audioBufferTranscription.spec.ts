// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Serialization & deserialization tests for output-audio-buffer control
 * and word/phrase transcription types added in GA 1.0.0
 * (api-version 2026-04-10).
 *
 * Focus: camelCase ↔ snake_case wire mapping (the same class of bug
 * fixed in 1.0.0-beta.4 for `voiceSerializer`).
 */

import { describe, it, expect } from "vitest";
import type { ClientEventOutputAudioBufferClear } from "../../src/models/index.js";
import {
  clientEventOutputAudioBufferClearSerializer,
  serverEventOutputAudioBufferClearedDeserializer,
  transcriptionPhraseDeserializer,
  transcriptionWordDeserializer,
  serverEventResponseAudioTranscriptAnnotationAddedDeserializer,
} from "../../src/models/models.js";

describe("Audio buffer control & transcription models (GA 1.0.0)", () => {
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

  describe("TranscriptionWord", () => {
    it("maps offset_milliseconds and duration_milliseconds to camelCase", () => {
      const word = transcriptionWordDeserializer({
        text: "hello",
        offset_milliseconds: 100,
        duration_milliseconds: 250,
      });

      expect(word.text).toBe("hello");
      expect(word.offsetMilliseconds).toBe(100);
      expect(word.durationMilliseconds).toBe(250);
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

      expect(phrase.offsetMilliseconds).toBe(0);
      expect(phrase.durationMilliseconds).toBe(1500);
      expect(phrase.locale).toBe("en-US");
      expect(phrase.confidence).toBe(0.97);
      expect(phrase.words).toHaveLength(2);
      expect(phrase.words?.[0].offsetMilliseconds).toBe(0);
      expect(phrase.words?.[1].offsetMilliseconds).toBe(500);
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
});
