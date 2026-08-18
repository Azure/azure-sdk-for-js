// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { VoiceAgentClientEvent, VoiceAgentServerEvent } from "../models/models.js";
import * as models from "../models/models.js";
import { VoiceAgentProtocolError } from "./errors.js";

type ClientEventSerializer = (event: never) => unknown;
type ServerEventDeserializer = (event: unknown) => VoiceAgentServerEvent;

const clientEventSerializers: Record<string, ClientEventSerializer> = {
  "conversation.item.create": models.voiceAgentClientEventConversationItemCreateSerializer,
  "conversation.item.delete": models.voiceAgentClientEventConversationItemDeleteSerializer,
  "conversation.item.retrieve": models.voiceAgentClientEventConversationItemRetrieveSerializer,
  "conversation.item.truncate": models.voiceAgentClientEventConversationItemTruncateSerializer,
  "input_audio_buffer.append": models.voiceAgentClientEventInputAudioBufferAppendSerializer,
  "input_audio_buffer.clear": models.voiceAgentClientEventInputAudioBufferClearSerializer,
  "input_audio_buffer.commit": models.voiceAgentClientEventInputAudioBufferCommitSerializer,
  "output_audio_buffer.clear": models.voiceAgentClientEventOutputAudioBufferClearSerializer,
  "response.cancel": models.voiceAgentClientEventResponseCancelSerializer,
  "response.create": models.voiceAgentClientEventResponseCreateSerializer,
  "session.update": models.voiceAgentClientEventSessionUpdateSerializer,
  "session.avatar.connect": models.voiceAgentClientEventSessionAvatarConnectSerializer,
};

const serverEventDeserializers: Record<string, ServerEventDeserializer> = {
  "conversation.item.added": models.voiceAgentServerEventConversationItemAddedDeserializer,
  "conversation.item.created": models.voiceAgentServerEventConversationItemCreatedDeserializer,
  "conversation.item.deleted": models.voiceAgentServerEventConversationItemDeletedDeserializer,
  "conversation.item.done": models.voiceAgentServerEventConversationItemDoneDeserializer,
  "conversation.item.input_audio_transcription.completed":
    models.voiceAgentServerEventConversationItemInputAudioTranscriptionCompletedDeserializer,
  "conversation.item.input_audio_transcription.delta":
    models.voiceAgentServerEventConversationItemInputAudioTranscriptionDeltaDeserializer,
  "conversation.item.input_audio_transcription.failed":
    models.voiceAgentServerEventConversationItemInputAudioTranscriptionFailedDeserializer,
  "conversation.item.input_audio_transcription.segment":
    models.voiceAgentServerEventConversationItemInputAudioTranscriptionSegmentDeserializer,
  "conversation.item.retrieved": models.voiceAgentServerEventConversationItemRetrievedDeserializer,
  "conversation.item.truncated": models.voiceAgentServerEventConversationItemTruncatedDeserializer,
  "input_audio_buffer.cleared": models.voiceAgentServerEventInputAudioBufferClearedDeserializer,
  "input_audio_buffer.committed": models.voiceAgentServerEventInputAudioBufferCommittedDeserializer,
  "input_audio_buffer.speech_started":
    models.voiceAgentServerEventInputAudioBufferSpeechStartedDeserializer,
  "input_audio_buffer.speech_stopped":
    models.voiceAgentServerEventInputAudioBufferSpeechStoppedDeserializer,
  "input_audio_buffer.timeout_triggered":
    models.voiceAgentServerEventInputAudioBufferTimeoutTriggeredDeserializer,
  "mcp_list_tools.completed": models.voiceAgentServerEventMcpListToolsCompletedDeserializer,
  "mcp_list_tools.failed": models.voiceAgentServerEventMcpListToolsFailedDeserializer,
  "mcp_list_tools.in_progress": models.voiceAgentServerEventMcpListToolsInProgressDeserializer,
  "output_audio_buffer.cleared": models.voiceAgentServerEventOutputAudioBufferClearedDeserializer,
  "rate_limits.updated": models.voiceAgentServerEventRateLimitsUpdatedDeserializer,
  "response.output_audio.delta": models.voiceAgentServerEventResponseAudioDeltaDeserializer,
  "response.output_audio.done": models.voiceAgentServerEventResponseAudioDoneDeserializer,
  "response.output_audio_transcript.delta":
    models.voiceAgentServerEventResponseAudioTranscriptDeltaDeserializer,
  "response.output_audio_transcript.done":
    models.voiceAgentServerEventResponseAudioTranscriptDoneDeserializer,
  "response.content_part.added": models.realtimeServerEventResponseContentPartAddedDeserializer,
  "response.content_part.done": models.voiceAgentServerEventResponseContentPartDoneDeserializer,
  "response.created": models.voiceAgentServerEventResponseCreatedDeserializer,
  "response.done": models.voiceAgentServerEventResponseDoneDeserializer,
  "response.function_call_arguments.delta":
    models.voiceAgentServerEventResponseFunctionCallArgumentsDeltaDeserializer,
  "response.function_call_arguments.done":
    models.voiceAgentServerEventResponseFunctionCallArgumentsDoneDeserializer,
  "response.mcp_call_arguments.delta":
    models.voiceAgentServerEventResponseMcpCallArgumentsDeltaDeserializer,
  "response.mcp_call_arguments.done":
    models.voiceAgentServerEventResponseMcpCallArgumentsDoneDeserializer,
  "response.mcp_call.completed": models.voiceAgentServerEventResponseMcpCallCompletedDeserializer,
  "response.mcp_call.failed": models.voiceAgentServerEventResponseMcpCallFailedDeserializer,
  "response.mcp_call.in_progress":
    models.voiceAgentServerEventResponseMcpCallInProgressDeserializer,
  "response.output_item.added": models.voiceAgentServerEventResponseOutputItemAddedDeserializer,
  "response.output_item.done": models.voiceAgentServerEventResponseOutputItemDoneDeserializer,
  "response.output_text.delta": models.voiceAgentServerEventResponseTextDeltaDeserializer,
  "response.output_text.done": models.voiceAgentServerEventResponseTextDoneDeserializer,
  "session.created": models.voiceAgentServerEventSessionCreatedDeserializer,
  "session.updated": models.voiceAgentServerEventSessionUpdatedDeserializer,
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
  }
  return JSON.stringify(serialized);
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

function serializeTurnDetection(turnDetection: models.VoiceAgentTurnDetection): unknown {
  switch (turnDetection.type) {
    case "server_vad":
      return models.voiceAgentServerVadTurnDetectionSerializer(turnDetection);
    case "semantic_vad":
      return models.voiceAgentSemanticVadTurnDetectionSerializer(turnDetection);
    case "azure_semantic_vad":
      return models.voiceAzureSemanticVadTurnDetectionSerializer(turnDetection);
    case "azure_semantic_vad_en":
      return models.voiceAzureSemanticVadEnTurnDetectionSerializer(turnDetection);
    case "azure_semantic_vad_multilingual":
      return models.voiceAzureSemanticVadMultilingualTurnDetectionSerializer(turnDetection);
  }
}

function serializeInterimResponse(interimResponse: models.VoiceAgentInterimResponse): unknown {
  return interimResponse.type === "static_interim_response"
    ? models.voiceAgentStaticInterimResponseConfigSerializer(interimResponse)
    : models.voiceAgentLlmInterimResponseConfigSerializer(interimResponse);
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
  turnDetection: models.VoiceAgentTurnDetection,
): models.VoiceAgentTurnDetection {
  switch (turnDetection.type) {
    case "server_vad":
      return models.voiceAgentServerVadTurnDetectionDeserializer(turnDetection);
    case "semantic_vad":
      return models.voiceAgentSemanticVadTurnDetectionDeserializer(turnDetection);
    case "azure_semantic_vad":
      return models.voiceAzureSemanticVadTurnDetectionDeserializer(turnDetection);
    case "azure_semantic_vad_en":
      return models.voiceAzureSemanticVadEnTurnDetectionDeserializer(turnDetection);
    case "azure_semantic_vad_multilingual":
      return models.voiceAzureSemanticVadMultilingualTurnDetectionDeserializer(turnDetection);
  }
}

function deserializeInterimResponse(
  interimResponse: models.VoiceAgentInterimResponse,
): models.VoiceAgentInterimResponse {
  return interimResponse.type === "static_interim_response"
    ? models.voiceAgentStaticInterimResponseConfigDeserializer(interimResponse)
    : models.voiceAgentLlmInterimResponseConfigDeserializer(interimResponse);
}
