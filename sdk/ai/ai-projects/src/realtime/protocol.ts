// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { VoiceAgentClientEvent, VoiceAgentServerEvent } from "../models/models.js";
import * as models from "../models/models.js";
import { VoiceAgentProtocolError } from "./errors.js";

type ClientEventSerializer = (event: never) => unknown;
type ServerEventDeserializer = (event: unknown) => VoiceAgentServerEvent;

const clientEventSerializers: Record<string, ClientEventSerializer> = {
  "conversation.item.create": models.realtimeClientEventConversationItemCreateSerializer,
  "conversation.item.delete": models.realtimeClientEventConversationItemDeleteSerializer,
  "conversation.item.retrieve": models.realtimeClientEventConversationItemRetrieveSerializer,
  "conversation.item.truncate": models.realtimeClientEventConversationItemTruncateSerializer,
  "input_audio_buffer.append": models.realtimeClientEventInputAudioBufferAppendSerializer,
  "input_audio_buffer.clear": models.realtimeClientEventInputAudioBufferClearSerializer,
  "input_audio_buffer.commit": models.realtimeClientEventInputAudioBufferCommitSerializer,
  "output_audio_buffer.clear": models.realtimeClientEventOutputAudioBufferClearSerializer,
  "response.cancel": models.realtimeClientEventResponseCancelSerializer,
  "response.create": models.realtimeClientEventResponseCreateSerializer,
  "session.update": models.voiceAgentClientEventSessionUpdateSerializer,
  "session.avatar.connect": models.voiceAgentClientEventSessionAvatarConnectSerializer,
};

const serverEventDeserializers: Record<string, ServerEventDeserializer> = {
  "conversation.item.added": models.realtimeServerEventConversationItemAddedDeserializer,
  "conversation.item.created": models.realtimeServerEventConversationItemCreatedDeserializer,
  "conversation.item.deleted": models.realtimeServerEventConversationItemDeletedDeserializer,
  "conversation.item.done": models.realtimeServerEventConversationItemDoneDeserializer,
  "conversation.item.input_audio_transcription.completed":
    models.realtimeServerEventConversationItemInputAudioTranscriptionCompletedDeserializer,
  "conversation.item.input_audio_transcription.delta":
    models.realtimeServerEventConversationItemInputAudioTranscriptionDeltaDeserializer,
  "conversation.item.input_audio_transcription.failed":
    models.realtimeServerEventConversationItemInputAudioTranscriptionFailedDeserializer,
  "conversation.item.input_audio_transcription.segment":
    models.realtimeServerEventConversationItemInputAudioTranscriptionSegmentDeserializer,
  "conversation.item.retrieved": models.realtimeServerEventConversationItemRetrievedDeserializer,
  "conversation.item.truncated": models.realtimeServerEventConversationItemTruncatedDeserializer,
  "input_audio_buffer.cleared": models.realtimeServerEventInputAudioBufferClearedDeserializer,
  "input_audio_buffer.committed": models.realtimeServerEventInputAudioBufferCommittedDeserializer,
  "input_audio_buffer.speech_started":
    models.realtimeServerEventInputAudioBufferSpeechStartedDeserializer,
  "input_audio_buffer.speech_stopped":
    models.realtimeServerEventInputAudioBufferSpeechStoppedDeserializer,
  "input_audio_buffer.timeout_triggered":
    models.realtimeServerEventInputAudioBufferTimeoutTriggeredDeserializer,
  "mcp_list_tools.completed": models.realtimeServerEventMCPListToolsCompletedDeserializer,
  "mcp_list_tools.failed": models.realtimeServerEventMCPListToolsFailedDeserializer,
  "mcp_list_tools.in_progress": models.realtimeServerEventMCPListToolsInProgressDeserializer,
  "output_audio_buffer.cleared": models.realtimeServerEventOutputAudioBufferClearedDeserializer,
  "rate_limits.updated": models.realtimeServerEventRateLimitsUpdatedDeserializer,
  "response.output_audio.delta": models.realtimeServerEventResponseAudioDeltaDeserializer,
  "response.output_audio.done": models.realtimeServerEventResponseAudioDoneDeserializer,
  "response.output_audio_transcript.delta":
    models.realtimeServerEventResponseAudioTranscriptDeltaDeserializer,
  "response.output_audio_transcript.done":
    models.realtimeServerEventResponseAudioTranscriptDoneDeserializer,
  "response.content_part.added": models.realtimeServerEventResponseContentPartAddedDeserializer,
  "response.content_part.done": models.realtimeServerEventResponseContentPartDoneDeserializer,
  "response.created": models.realtimeServerEventResponseCreatedDeserializer,
  "response.done": models.realtimeServerEventResponseDoneDeserializer,
  "response.function_call_arguments.delta":
    models.realtimeServerEventResponseFunctionCallArgumentsDeltaDeserializer,
  "response.function_call_arguments.done":
    models.realtimeServerEventResponseFunctionCallArgumentsDoneDeserializer,
  "response.mcp_call_arguments.delta":
    models.realtimeServerEventResponseMCPCallArgumentsDeltaDeserializer,
  "response.mcp_call_arguments.done":
    models.realtimeServerEventResponseMCPCallArgumentsDoneDeserializer,
  "response.mcp_call.completed": models.realtimeServerEventResponseMCPCallCompletedDeserializer,
  "response.mcp_call.failed": models.realtimeServerEventResponseMCPCallFailedDeserializer,
  "response.mcp_call.in_progress":
    models.realtimeServerEventResponseMCPCallInProgressDeserializer,
  "response.output_item.added": models.realtimeServerEventResponseOutputItemAddedDeserializer,
  "response.output_item.done": models.realtimeServerEventResponseOutputItemDoneDeserializer,
  "response.output_text.delta": models.realtimeServerEventResponseTextDeltaDeserializer,
  "response.output_text.done": models.realtimeServerEventResponseTextDoneDeserializer,
  "session.created": models.realtimeServerEventSessionCreatedDeserializer,
  "session.updated": models.realtimeServerEventSessionUpdatedDeserializer,
  error: models.realtimeServerEventErrorDeserializer,
  warning: models.voiceAgentServerEventWarningDeserializer,
  "session.avatar.connecting": models.voiceAgentServerEventSessionAvatarConnectingDeserializer,
  "session.avatar.switch_to_speaking":
    models.voiceAgentServerEventSessionAvatarSwitchToSpeakingDeserializer,
  "session.avatar.switch_to_idle":
    models.voiceAgentServerEventSessionAvatarSwitchToIdleDeserializer,
  "response.audio_timestamp.delta":
    models.voiceAgentServerEventResponseAudioTimestampDeltaDeserializer,
  "response.audio_timestamp.done":
    models.voiceAgentServerEventResponseAudioTimestampDoneDeserializer,
  "response.animation_blendshapes.delta":
    models.voiceAgentServerEventResponseAnimationBlendshapesDeltaDeserializer,
  "response.animation_blendshapes.done":
    models.voiceAgentServerEventResponseAnimationBlendshapesDoneDeserializer,
  "response.animation_viseme.delta":
    models.voiceAgentServerEventResponseAnimationVisemeDeltaDeserializer,
  "response.animation_viseme.done":
    models.voiceAgentServerEventResponseAnimationVisemeDoneDeserializer,
  "response.video.delta": models.voiceAgentServerEventResponseVideoDeltaDeserializer,
};

/** @internal */
export function serializeVoiceAgentClientEvent(event: VoiceAgentClientEvent): string {
  const serializer = clientEventSerializers[event.type];
  if (!serializer) {
    throw new VoiceAgentProtocolError(`Unsupported client event type: ${event.type}`);
  }
  const serialized = serializer(event as never) as Record<string, unknown>;
  if (event.type === "session.update") {
    normalizeSessionUnions(event.session, serialized["session"] as Record<string, unknown>);
  } else if (event.type === "response.create" && event.response?.interim_response) {
    const response = serialized["response"] as Record<string, unknown>;
    response["interim_response"] = serializeInterimResponse(event.response.interim_response);
  } else if (event.type === "conversation.item.create") {
    restoreMessageItemFields(event.item, serialized["item"] as Record<string, unknown>);
  }
  return JSON.stringify(serialized);
}

// The generated `RealtimeConversationItemUnion` does not enumerate a "message" item variant, so
// `realtimeConversationItemUnionSerializer` falls back to `realtimeConversationItemSerializer`,
// which only emits `{ type }` and silently drops `role`/`content`. Restore those fields from the
// original (pre-serialization) item so the wire payload built by `sendText` is complete; see the
// TypeSpec regeneration report for details on this generated-model gap.
function restoreMessageItemFields(item: unknown, serializedItem: Record<string, unknown>): void {
  const source = item as { type?: string; role?: unknown; content?: unknown };
  if (source?.type === "message") {
    serializedItem["role"] = source.role;
    serializedItem["content"] = source.content;
  }
}

/** @internal */
export function deserializeVoiceAgentServerEvent(
  data: string | ArrayBuffer,
): VoiceAgentServerEvent {
  const text = typeof data === "string" ? data : new TextDecoder().decode(data);
  let parsed: unknown;
  try {
    parsed = JSON.parse(text);
  } catch (error) {
    throw new VoiceAgentProtocolError("The service returned invalid JSON.", { cause: error });
  }

  if (!parsed || typeof parsed !== "object" || !("type" in parsed)) {
    throw new VoiceAgentProtocolError(
      "The service returned an event without a type discriminator.",
    );
  }

  const eventType = (parsed as { type?: unknown }).type;
  if (typeof eventType !== "string") {
    throw new VoiceAgentProtocolError("The service returned an invalid event type discriminator.");
  }

  const deserializer = serverEventDeserializers[eventType];
  if (!deserializer) {
    throw new VoiceAgentProtocolError(`Unsupported server event type: ${eventType}`);
  }
  const event = deserializer(parsed);
  validateRequiredServerEventFields(eventType, event);
  if (event.type === "response.output_audio.delta") {
    return { ...event, delta: new Uint8Array(event.delta) };
  }
  if (event.type === "session.created" || event.type === "session.updated") {
    normalizeSessionResponseUnions(event.session);
  }
  return event;
}

/**
 * Per-type-required fields for the events the SDK and its samples actually dereference (deltas,
 * ids, error details). Not an exhaustive schema for every event type — that belongs in the
 * generator — but combined with the universal `event_id` check below it catches the reported class
 * of bug: a minimal payload like `{"type":"response.output_text.delta"}` deserializing "successfully"
 * with every other required property left `undefined`.
 */
const requiredServerEventFields: Record<string, string[]> = {
  "response.output_text.delta": ["delta", "item_id", "response_id"],
  "response.output_audio.delta": ["delta", "item_id", "response_id"],
  "response.output_audio_transcript.delta": ["delta", "item_id", "response_id"],
  "response.function_call_arguments.delta": ["delta", "call_id"],
  "response.function_call_arguments.done": ["arguments", "call_id"],
  "response.created": ["response"],
  "response.done": ["response"],
  error: ["error"],
  "session.created": ["session"],
  "session.updated": ["session"],
};

function validateRequiredServerEventFields(eventType: string, event: unknown): void {
  const record = event as Record<string, unknown>;
  const eventId = record["event_id"];
  if (typeof eventId !== "string" || eventId.length === 0) {
    throw new VoiceAgentProtocolError(
      `The service returned a "${eventType}" event without a required "event_id" field.`,
    );
  }
  for (const field of requiredServerEventFields[eventType] ?? []) {
    if (record[field] === undefined) {
      throw new VoiceAgentProtocolError(
        `The service returned a "${eventType}" event without the required "${field}" field.`,
      );
    }
  }
}

function normalizeSessionUnions(
  session: models.VoiceAgentSessionUpdateConfig,
  serialized: Record<string, unknown>,
): void {
  const turnDetection = session.audio?.input?.turn_detection;
  if (turnDetection) {
    const audio = serialized["audio"] as Record<string, unknown>;
    const input = audio["input"] as Record<string, unknown>;
    input["turn_detection"] = serializeTurnDetection(turnDetection);
  }
  if (session.interim_response) {
    serialized["interim_response"] = serializeInterimResponse(session.interim_response);
  }
}

// The generated `VoiceAgentTurnDetectionConfig` fallback member's `type` field is typed as the
// full `VoiceAgentTurnDetectionType` literal union (not narrowed to a single value), so TypeScript
// cannot exclude it from any individual `case` branch below. The runtime `switch` on `.type` already
// guarantees the narrower shape in each branch, so an explicit cast is used to reflect that.
function serializeTurnDetection(turnDetection: models.VoiceAgentTurnDetectionConfigUnion): unknown {
  switch (turnDetection.type) {
    case "server_vad":
      return models.voiceAgentServerVadTurnDetectionSerializer(
        turnDetection as models.VoiceAgentServerVadTurnDetection,
      );
    case "semantic_vad":
      return models.voiceAgentSemanticVadTurnDetectionSerializer(
        turnDetection as models.VoiceAgentSemanticVadTurnDetection,
      );
    case "azure_semantic_vad":
      return models.voiceAgentAzureSemanticVadTurnDetectionSerializer(
        turnDetection as models.VoiceAgentAzureSemanticVadTurnDetection,
      );
    case "azure_semantic_vad_en":
      return models.voiceAgentAzureSemanticVadEnTurnDetectionSerializer(
        turnDetection as models.VoiceAgentAzureSemanticVadEnTurnDetection,
      );
    case "azure_semantic_vad_multilingual":
      return models.voiceAgentAzureSemanticVadMultilingualTurnDetectionSerializer(
        turnDetection as models.VoiceAgentAzureSemanticVadMultilingualTurnDetection,
      );
    default:
      return models.voiceAgentTurnDetectionConfigSerializer(turnDetection);
  }
}

// Same fallback-narrowing limitation as above: `VoiceAgentInterimResponseConfig.type` is `string`,
// so the ternary's branches cannot be excluded from each other without an explicit cast.
function serializeInterimResponse(interimResponse: models.VoiceAgentInterimResponseConfigUnion): unknown {
  return interimResponse.type === "static_interim_response"
    ? models.voiceAgentStaticInterimResponseConfigSerializer(
        interimResponse as models.VoiceAgentStaticInterimResponseConfig,
      )
    : models.voiceAgentLlmInterimResponseConfigSerializer(
        interimResponse as models.VoiceAgentLlmInterimResponseConfig,
      );
}

function normalizeSessionResponseUnions(session: models.VoiceAgentSessionResponseConfig): void {
  const turnDetection = session.audio?.input?.turn_detection;
  if (turnDetection) {
    session.audio!.input!.turn_detection = deserializeTurnDetection(turnDetection);
  }
  if (session.interim_response) {
    session.interim_response = deserializeInterimResponse(session.interim_response);
  }
}

function deserializeTurnDetection(
  turnDetection: models.VoiceAgentTurnDetectionConfigUnion,
): models.VoiceAgentTurnDetectionConfigUnion {
  switch (turnDetection.type) {
    case "server_vad":
      return models.voiceAgentServerVadTurnDetectionDeserializer(
        turnDetection as models.VoiceAgentServerVadTurnDetection,
      );
    case "semantic_vad":
      return models.voiceAgentSemanticVadTurnDetectionDeserializer(
        turnDetection as models.VoiceAgentSemanticVadTurnDetection,
      );
    case "azure_semantic_vad":
      return models.voiceAgentAzureSemanticVadTurnDetectionDeserializer(
        turnDetection as models.VoiceAgentAzureSemanticVadTurnDetection,
      );
    case "azure_semantic_vad_en":
      return models.voiceAgentAzureSemanticVadEnTurnDetectionDeserializer(
        turnDetection as models.VoiceAgentAzureSemanticVadEnTurnDetection,
      );
    case "azure_semantic_vad_multilingual":
      return models.voiceAgentAzureSemanticVadMultilingualTurnDetectionDeserializer(
        turnDetection as models.VoiceAgentAzureSemanticVadMultilingualTurnDetection,
      );
    default:
      return models.voiceAgentTurnDetectionConfigDeserializer(turnDetection);
  }
}

function deserializeInterimResponse(
  interimResponse: models.VoiceAgentInterimResponseConfigUnion,
): models.VoiceAgentInterimResponseConfigUnion {
  return interimResponse.type === "static_interim_response"
    ? models.voiceAgentStaticInterimResponseConfigDeserializer(
        interimResponse as models.VoiceAgentStaticInterimResponseConfig,
      )
    : models.voiceAgentLlmInterimResponseConfigDeserializer(
        interimResponse as models.VoiceAgentLlmInterimResponseConfig,
      );
}
