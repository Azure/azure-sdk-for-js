// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  deserializeVoiceAgentServerEvent,
  serializeVoiceAgentClientEvent,
} from "../../src/streaming/protocol.js";
import { VoiceAgentProtocolError } from "../../src/streaming/errors.js";
import {
  voiceAgentAzureMultilingualSemanticVadTurnDetectionSerializer,
  voiceAgentAzureSemanticVadTurnDetectionSerializer,
  voiceAgentHandoffEdgeConfigSerializer,
  voiceAgentTranscriptionPhraseSerializer,
} from "../../src/generated/models/models.js";

describe("voice-agent protocol", () => {
  it("serializes generated session settings to their wire names", () => {
    const message = serializeVoiceAgentClientEvent({
      type: "session.update",
      session: {
        type: "realtime",
        output_modalities: ["text", "audio"],
        audio: {
          input: {
            turn_detection: {
              type: "server_vad",
              prefixPaddingInMs: 200,
              silenceDurationInMs: 500,
              speechDurationInMs: 100,
              end_of_utterance_detection: {
                model: "semantic_detection_v1",
                timeoutInMs: 800,
              },
            },
          },
        },
      },
    });

    const parsed = JSON.parse(message);
    assert.equal(parsed.session.audio.input.turn_detection.prefix_padding_ms, 200);
    assert.equal(parsed.session.audio.input.turn_detection.silence_duration_ms, 500);
    assert.equal(parsed.session.audio.input.turn_detection.speech_duration_ms, 100);
    assert.equal(
      parsed.session.audio.input.turn_detection.end_of_utterance_detection.timeout_ms,
      800,
    );
    assert.equal(parsed.session.audio.input.turn_detection.prefixPaddingInMs, undefined);
  });

  it("serializes renamed timing fields across generated model families", () => {
    const azureVad = voiceAgentAzureSemanticVadTurnDetectionSerializer({
      type: "azure_semantic_vad",
      prefixPaddingInMs: 100,
      silenceDurationInMs: 200,
      idleTimeoutInMs: 300,
      speechDurationInMs: 400,
    });
    assert.deepEqual(
      {
        prefix_padding_ms: azureVad.prefix_padding_ms,
        silence_duration_ms: azureVad.silence_duration_ms,
        idle_timeout_ms: azureVad.idle_timeout_ms,
        speech_duration_ms: azureVad.speech_duration_ms,
      },
      {
        prefix_padding_ms: 100,
        silence_duration_ms: 200,
        idle_timeout_ms: 300,
        speech_duration_ms: 400,
      },
    );

    const multilingualVad = voiceAgentAzureMultilingualSemanticVadTurnDetectionSerializer({
      type: "azure_semantic_vad_multilingual",
      prefixPaddingInMs: 500,
      silenceDurationInMs: 600,
      idleTimeoutInMs: 700,
      speechDurationInMs: 800,
    });
    assert.deepEqual(
      {
        prefix_padding_ms: multilingualVad.prefix_padding_ms,
        silence_duration_ms: multilingualVad.silence_duration_ms,
        idle_timeout_ms: multilingualVad.idle_timeout_ms,
        speech_duration_ms: multilingualVad.speech_duration_ms,
      },
      {
        prefix_padding_ms: 500,
        silence_duration_ms: 600,
        idle_timeout_ms: 700,
        speech_duration_ms: 800,
      },
    );

    const edge = voiceAgentHandoffEdgeConfigSerializer({
      id: "edge-1",
      source: "triage",
      target: "support",
      description: "Transfer to support",
      delayInMs: 900,
    });
    assert.equal(edge.delay_ms, 900);

    const phrase = voiceAgentTranscriptionPhraseSerializer({
      text: "hello world",
      offsetInMs: 1000,
      durationInMs: 1100,
      words: [{ text: "hello", offsetInMs: 1200, durationInMs: 1300 }],
    });
    assert.equal(phrase.offset_milliseconds, 1000);
    assert.equal(phrase.duration_milliseconds, 1100);
    assert.equal(phrase.words[0].offset_milliseconds, 1200);
    assert.equal(phrase.words[0].duration_milliseconds, 1300);
  });

  it("deserializes base64 audio deltas to Uint8Array", () => {
    const event = deserializeVoiceAgentServerEvent(
      JSON.stringify({
        event_id: "event-1",
        type: "response.output_audio.delta",
        response_id: "response-1",
        item_id: "item-1",
        output_index: 0,
        content_index: 0,
        delta: "AQID",
      }),
    );

    assert.equal(event.type, "response.output_audio.delta");
    if (event.type === "response.output_audio.delta") {
      assert.deepEqual(event.delta, new Uint8Array([1, 2, 3]));
    }
  });

  it("normalizes nested session event unions to public field names", () => {
    const event = deserializeVoiceAgentServerEvent(
      JSON.stringify({
        event_id: "event-2",
        type: "session.created",
        session: {
          type: "realtime",
          object: "realtime.session",
          id: "session-1",
          model: "gpt-realtime",
          output_modalities: ["audio"],
          audio: {
            input: {
              turn_detection: {
                type: "server_vad",
                prefix_padding_ms: 200,
                silence_duration_ms: 500,
              },
            },
          },
          interim_response: {
            type: "static_interim_response",
            latency_threshold_ms: 1200,
            texts: ["One moment."],
          },
        },
      }),
    );

    assert.equal(event.type, "session.created");
    if (event.type === "session.created") {
      const turnDetection = event.session.audio?.input?.turn_detection;
      assert.equal(turnDetection?.type, "server_vad");
      if (turnDetection?.type === "server_vad") {
        assert.equal(turnDetection.prefixPaddingInMs, 200);
        assert.equal(turnDetection.silenceDurationInMs, 500);
      }
      assert.equal(event.session.interim_response?.latencyThresholdInMs, 1200);
    }
  });

  it("deserializes renamed timing fields on server events", () => {
    const handoff = deserializeVoiceAgentServerEvent(
      JSON.stringify({
        type: "session.handoff.completed",
        event_id: "event-3",
        handoff_id: "handoff-1",
        edge_id: "edge-1",
        from_node_id: "triage",
        to_node_id: "support",
        from_model: "gpt-realtime",
        to_model: "gpt-realtime",
        tool_call_id: "call-1",
        node_generation: 1,
        prepare_duration_ms: 1400,
        duration_ms: 1500,
      }),
    );
    assert.equal(handoff.type, "session.handoff.completed");
    if (handoff.type === "session.handoff.completed") {
      assert.equal(handoff.prepareDurationInMs, 1400);
      assert.equal(handoff.durationInMs, 1500);
    }

    const timestamp = deserializeVoiceAgentServerEvent(
      JSON.stringify({
        type: "response.audio_timestamp.delta",
        event_id: "event-4",
        response_id: "response-1",
        item_id: "item-1",
        output_index: 0,
        content_index: 0,
        audio_offset_ms: 1600,
        audio_duration_ms: 1700,
        text: "hello",
        timestamp_type: "word",
      }),
    );
    assert.equal(timestamp.type, "response.audio_timestamp.delta");
    if (timestamp.type === "response.audio_timestamp.delta") {
      assert.equal(timestamp.audioOffsetInMs, 1600);
      assert.equal(timestamp.audioDurationInMs, 1700);
    }

    const viseme = deserializeVoiceAgentServerEvent(
      JSON.stringify({
        type: "response.animation_viseme.delta",
        event_id: "event-5",
        response_id: "response-1",
        item_id: "item-1",
        output_index: 0,
        content_index: 0,
        audio_offset_ms: 1800,
        viseme_id: 4,
      }),
    );
    assert.equal(viseme.type, "response.animation_viseme.delta");
    if (viseme.type === "response.animation_viseme.delta") {
      assert.equal(viseme.audioOffsetInMs, 1800);
    }
  });

  it("rejects malformed and unknown server events", () => {
    assert.throws(() => deserializeVoiceAgentServerEvent("not-json"), VoiceAgentProtocolError);
    assert.throws(
      () => deserializeVoiceAgentServerEvent('{"type":"future.event"}'),
      /Unsupported server event type/,
    );
  });
});
