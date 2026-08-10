// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/*
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { serializeRecord } from "../static-helpers/serialization/serialize-record.js";
import { NodeReadableStream } from "@azure/core-rest-pipeline";
import { uint8ArrayToString, stringToUint8Array } from "@azure/core-util";

/** Error response for API failures. */
export interface ApiErrorResponse {
  error: ErrorModel;
}

export function apiErrorResponseDeserializer(item: any): ApiErrorResponse {
  return {
    error: errorDeserializer(item["error"]),
  };
}

/** model interface ErrorModel */
export interface ErrorModel {
  code: string | null;
  message: string;
  param?: string;
  type?: string;
  details?: ErrorModel[];
  additionalInfo?: Record<string, any>;
  debugInfo?: Record<string, any>;
}

export function errorDeserializer(item: any): ErrorModel {
  return {
    code: item["code"],
    message: item["message"],
    param: item["param"],
    type: item["type"],
    details: !item["details"] ? item["details"] : errorArrayDeserializer(item["details"]),
    additionalInfo: !item["additionalInfo"]
      ? item["additionalInfo"]
      : Object.fromEntries(
          Object.entries(item["additionalInfo"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    debugInfo: !item["debugInfo"]
      ? item["debugInfo"]
      : Object.fromEntries(
          Object.entries(item["debugInfo"]).map(([k, p]: [string, any]) => [k, p]),
        ),
  };
}

export function errorArrayDeserializer(result: Array<ErrorModel>): any[] {
  return result.map((item) => {
    return errorDeserializer(item);
  });
}

/**
 * A persisted voice conversation. The Foundry envelope that owns a voice agent's stored
 * transcript, responses, per-turn metrics, and audio. It is the parent, retention, and delete boundary:
 * deleting it cascades to its responses, items, metrics, and audio.
 */
export interface VoiceConversation {
  /** The unique id of the conversation. */
  id: string;
  /** The object type. Always `voice.conversation`. */
  object: "voice.conversation";
  /** The lifecycle status of the conversation. */
  status: VoiceConversationStatus;
  /** The Unix timestamp (in seconds) for when the conversation was created. */
  created_at: Date;
  /** The Unix timestamp (in seconds) for when the conversation's session ended. Absent while in progress. */
  completed_at?: Date;
  /** A set of key-value pairs attached to the conversation. */
  metadata?: Record<string, string>;
  /** Aggregate token usage totals across all responses in this conversation. */
  usage?: RealtimeResponseUsage;
}

export function voiceConversationDeserializer(item: any): VoiceConversation {
  return {
    id: item["id"],
    object: item["object"],
    status: item["status"],
    created_at: new Date(item["created_at"] * 1000),
    completed_at: !item["completed_at"]
      ? item["completed_at"]
      : new Date(item["completed_at"] * 1000),
    metadata: !item["metadata"]
      ? item["metadata"]
      : Object.fromEntries(Object.entries(item["metadata"]).map(([k, p]: [string, any]) => [k, p])),
    usage: !item["usage"] ? item["usage"] : realtimeResponseUsageDeserializer(item["usage"]),
  };
}

/** The lifecycle status of a persisted voice conversation. */
export type VoiceConversationStatus = "in_progress" | "completed";

/** model interface RealtimeResponseUsage */
export interface RealtimeResponseUsage {
  total_tokens?: number;
  input_tokens?: number;
  output_tokens?: number;
  input_token_details?: RealtimeResponseUsageInputTokenDetails;
  output_token_details?: RealtimeResponseUsageOutputTokenDetails;
}

export function realtimeResponseUsageSerializer(item: RealtimeResponseUsage): any {
  return {
    total_tokens: item["total_tokens"],
    input_tokens: item["input_tokens"],
    output_tokens: item["output_tokens"],
    input_token_details: !item["input_token_details"]
      ? item["input_token_details"]
      : realtimeResponseUsageInputTokenDetailsSerializer(item["input_token_details"]),
    output_token_details: !item["output_token_details"]
      ? item["output_token_details"]
      : realtimeResponseUsageOutputTokenDetailsSerializer(item["output_token_details"]),
  };
}

export function realtimeResponseUsageDeserializer(item: any): RealtimeResponseUsage {
  return {
    total_tokens: item["total_tokens"],
    input_tokens: item["input_tokens"],
    output_tokens: item["output_tokens"],
    input_token_details: !item["input_token_details"]
      ? item["input_token_details"]
      : realtimeResponseUsageInputTokenDetailsDeserializer(item["input_token_details"]),
    output_token_details: !item["output_token_details"]
      ? item["output_token_details"]
      : realtimeResponseUsageOutputTokenDetailsDeserializer(item["output_token_details"]),
  };
}

/** model interface RealtimeResponseUsageInputTokenDetails */
export interface RealtimeResponseUsageInputTokenDetails {
  cached_tokens?: number;
  text_tokens?: number;
  image_tokens?: number;
  audio_tokens?: number;
  cached_tokens_details?: RealtimeResponseUsageInputTokenDetailsCachedTokensDetails;
}

export function realtimeResponseUsageInputTokenDetailsSerializer(
  item: RealtimeResponseUsageInputTokenDetails,
): any {
  return {
    cached_tokens: item["cached_tokens"],
    text_tokens: item["text_tokens"],
    image_tokens: item["image_tokens"],
    audio_tokens: item["audio_tokens"],
    cached_tokens_details: !item["cached_tokens_details"]
      ? item["cached_tokens_details"]
      : realtimeResponseUsageInputTokenDetailsCachedTokensDetailsSerializer(
          item["cached_tokens_details"],
        ),
  };
}

export function realtimeResponseUsageInputTokenDetailsDeserializer(
  item: any,
): RealtimeResponseUsageInputTokenDetails {
  return {
    cached_tokens: item["cached_tokens"],
    text_tokens: item["text_tokens"],
    image_tokens: item["image_tokens"],
    audio_tokens: item["audio_tokens"],
    cached_tokens_details: !item["cached_tokens_details"]
      ? item["cached_tokens_details"]
      : realtimeResponseUsageInputTokenDetailsCachedTokensDetailsDeserializer(
          item["cached_tokens_details"],
        ),
  };
}

/** model interface RealtimeResponseUsageInputTokenDetailsCachedTokensDetails */
export interface RealtimeResponseUsageInputTokenDetailsCachedTokensDetails {
  text_tokens?: number;
  image_tokens?: number;
  audio_tokens?: number;
}

export function realtimeResponseUsageInputTokenDetailsCachedTokensDetailsSerializer(
  item: RealtimeResponseUsageInputTokenDetailsCachedTokensDetails,
): any {
  return {
    text_tokens: item["text_tokens"],
    image_tokens: item["image_tokens"],
    audio_tokens: item["audio_tokens"],
  };
}

export function realtimeResponseUsageInputTokenDetailsCachedTokensDetailsDeserializer(
  item: any,
): RealtimeResponseUsageInputTokenDetailsCachedTokensDetails {
  return {
    text_tokens: item["text_tokens"],
    image_tokens: item["image_tokens"],
    audio_tokens: item["audio_tokens"],
  };
}

/** model interface RealtimeResponseUsageOutputTokenDetails */
export interface RealtimeResponseUsageOutputTokenDetails {
  text_tokens?: number;
  audio_tokens?: number;
}

export function realtimeResponseUsageOutputTokenDetailsSerializer(
  item: RealtimeResponseUsageOutputTokenDetails,
): any {
  return { text_tokens: item["text_tokens"], audio_tokens: item["audio_tokens"] };
}

export function realtimeResponseUsageOutputTokenDetailsDeserializer(
  item: any,
): RealtimeResponseUsageOutputTokenDetails {
  return {
    text_tokens: item["text_tokens"],
    audio_tokens: item["audio_tokens"],
  };
}

/** The response data for a requested list of items. */
export interface _AgentsPagedResultVoiceResponse {
  /** The requested list of items. */
  data: VoiceResponse[];
  /** The first ID represented in this list. */
  first_id?: string;
  /** The last ID represented in this list. */
  last_id?: string;
  /** A value indicating whether there are additional values available not captured in this list. */
  has_more: boolean;
}

export function _agentsPagedResultVoiceResponseDeserializer(
  item: any,
): _AgentsPagedResultVoiceResponse {
  return {
    data: voiceResponseArrayDeserializer(item["data"]),
    first_id: item["first_id"],
    last_id: item["last_id"],
    has_more: item["has_more"],
  };
}

export function voiceResponseArrayDeserializer(result: Array<VoiceResponse>): any[] {
  return result.map((item) => {
    return voiceResponseDeserializer(item);
  });
}

/**
 * A persisted voice response representing one model inference turn within a conversation. In list results the
 * `output` projection may be omitted; retrieve the
 * full response (`GET .../responses/{response_id}`) or the paged response-items route
 * (`GET .../responses/{response_id}/items`) for its output items. `created_at`/`completed_at` are Foundry
 * durable ordering extensions.
 */
export interface VoiceResponse {
  /** The unique id of the response. */
  id: string;
  /** The object type. Always `realtime.response`. */
  object: "realtime.response";
  /** The status of the response. */
  status: VoiceResponseStatus;
  /** Additional detail about a terminal status. */
  status_details?: RealtimeResponseStatusDetails;
  /** The output items produced by the response. May be omitted in list results; retrieve the full response (GET .../responses/{response_id}) or use the paged response-items route (GET .../responses/{response_id}/items) for its output items. Each item's `response_id` also links it back to this response in the conversation-level items list. */
  output?: VoiceConversationItemUnion[];
  /** Token usage statistics for the response. */
  usage?: RealtimeResponseUsage;
  /** The id of the conversation this response belongs to. */
  conversation_id: string;
  /** The audio configuration used for the response, including the voice and audio format used for output. */
  audio?: VoiceResponseAudio;
  /** The output modalities used for the response, e.g. `["text", "audio"]`. Audio output always includes a text transcript. */
  output_modalities?: ("text" | "audio")[];
  /** The sampling temperature used for the response. */
  temperature?: number;
  /** The maximum number of output tokens allowed for the response; an integer or the literal `inf`. */
  max_output_tokens?: number | "inf";
  /** The Unix timestamp (in seconds) for when the response was created. */
  created_at?: Date;
  /** The Unix timestamp (in seconds) for when the response completed. */
  completed_at?: Date;
}

export function voiceResponseDeserializer(item: any): VoiceResponse {
  return {
    id: item["id"],
    object: item["object"],
    status: item["status"],
    status_details: !item["status_details"]
      ? item["status_details"]
      : realtimeResponseStatusDetailsDeserializer(item["status_details"]),
    output: !item["output"]
      ? item["output"]
      : voiceConversationItemUnionArrayDeserializer(item["output"]),
    usage: !item["usage"] ? item["usage"] : realtimeResponseUsageDeserializer(item["usage"]),
    conversation_id: item["conversation_id"],
    audio: !item["audio"] ? item["audio"] : voiceResponseAudioDeserializer(item["audio"]),
    output_modalities: !item["output_modalities"]
      ? item["output_modalities"]
      : item["output_modalities"].map((p: any) => {
          return p;
        }),
    temperature: item["temperature"],
    max_output_tokens: !item["max_output_tokens"]
      ? item["max_output_tokens"]
      : _voiceResponseMaxOutputTokensDeserializer(item["max_output_tokens"]),
    created_at: !item["created_at"] ? item["created_at"] : new Date(item["created_at"] * 1000),
    completed_at: !item["completed_at"]
      ? item["completed_at"]
      : new Date(item["completed_at"] * 1000),
  };
}

/** The status of a voice response. */
export type VoiceResponseStatus =
  "in_progress" | "completed" | "cancelled" | "incomplete" | "failed";

/** model interface RealtimeResponseStatusDetails */
export interface RealtimeResponseStatusDetails {
  type?: "completed" | "cancelled" | "failed" | "incomplete";
  reason?: "turn_detected" | "client_cancelled" | "max_output_tokens" | "content_filter";
  error?: RealtimeResponseStatusDetailsError;
}

export function realtimeResponseStatusDetailsSerializer(item: RealtimeResponseStatusDetails): any {
  return {
    type: item["type"],
    reason: item["reason"],
    error: !item["error"]
      ? item["error"]
      : realtimeResponseStatusDetailsErrorSerializer(item["error"]),
  };
}

export function realtimeResponseStatusDetailsDeserializer(
  item: any,
): RealtimeResponseStatusDetails {
  return {
    type: item["type"],
    reason: item["reason"],
    error: !item["error"]
      ? item["error"]
      : realtimeResponseStatusDetailsErrorDeserializer(item["error"]),
  };
}

/** model interface RealtimeResponseStatusDetailsError */
export interface RealtimeResponseStatusDetailsError {
  type?: string;
  code?: string;
}

export function realtimeResponseStatusDetailsErrorSerializer(
  item: RealtimeResponseStatusDetailsError,
): any {
  return { type: item["type"], code: item["code"] };
}

export function realtimeResponseStatusDetailsErrorDeserializer(
  item: any,
): RealtimeResponseStatusDetailsError {
  return {
    type: item["type"],
    code: item["code"],
  };
}

export function voiceConversationItemUnionArraySerializer(
  result: Array<VoiceConversationItemUnion>,
): any[] {
  return result.map((item) => {
    return voiceConversationItemUnionSerializer(item);
  });
}

export function voiceConversationItemUnionArrayDeserializer(
  result: Array<VoiceConversationItemUnion>,
): any[] {
  return result.map((item) => {
    return voiceConversationItemUnionDeserializer(item);
  });
}

/** A persisted item in a voice conversation. */
export interface VoiceConversationItem {
  /** The type of the conversation item. */
  /** The discriminator possible values: message, function_call, function_call_output, mcp_list_tools, mcp_call, mcp_approval_request, mcp_approval_response */
  type: VoiceConversationItemType;
  /** The Unix timestamp (in seconds) for when the item was persisted. */
  created_at?: Date;
  /** The id of the response that produced this item, when applicable. */
  response_id?: string;
}

export function voiceConversationItemSerializer(item: VoiceConversationItem): any {
  return {
    type: item["type"],
    created_at: !item["created_at"]
      ? item["created_at"]
      : (item["created_at"].getTime() / 1000) | 0,
    response_id: item["response_id"],
  };
}

export function voiceConversationItemDeserializer(item: any): VoiceConversationItem {
  return {
    type: item["type"],
    created_at: !item["created_at"] ? item["created_at"] : new Date(item["created_at"] * 1000),
    response_id: item["response_id"],
  };
}

/** Alias for VoiceConversationItemUnion */
export type VoiceConversationItemUnion =
  | VoiceMessageItemUnion
  | VoiceFunctionCallItem
  | VoiceFunctionCallOutputItem
  | VoiceMcpListToolsItem
  | VoiceMcpCallItem
  | VoiceMcpApprovalRequestItem
  | VoiceMcpApprovalResponseItem
  | VoiceConversationItem;

export function voiceConversationItemUnionSerializer(item: VoiceConversationItemUnion): any {
  switch (item.type) {
    case "function_call":
      return voiceFunctionCallItemSerializer(item as VoiceFunctionCallItem);

    case "function_call_output":
      return voiceFunctionCallOutputItemSerializer(item as VoiceFunctionCallOutputItem);

    case "mcp_list_tools":
      return voiceMcpListToolsItemSerializer(item as VoiceMcpListToolsItem);

    case "mcp_call":
      return voiceMcpCallItemSerializer(item as VoiceMcpCallItem);

    case "mcp_approval_request":
      return voiceMcpApprovalRequestItemSerializer(item as VoiceMcpApprovalRequestItem);

    case "mcp_approval_response":
      return voiceMcpApprovalResponseItemSerializer(item as VoiceMcpApprovalResponseItem);

    default:
      return voiceConversationItemSerializer(item);
  }
}

export function voiceConversationItemUnionDeserializer(item: any): VoiceConversationItemUnion {
  switch (item["type"]) {
    case "message":
      return voiceMessageItemUnionDeserializer(item as VoiceMessageItemUnion);

    case "function_call":
      return voiceFunctionCallItemDeserializer(item as VoiceFunctionCallItem);

    case "function_call_output":
      return voiceFunctionCallOutputItemDeserializer(item as VoiceFunctionCallOutputItem);

    case "mcp_list_tools":
      return voiceMcpListToolsItemDeserializer(item as VoiceMcpListToolsItem);

    case "mcp_call":
      return voiceMcpCallItemDeserializer(item as VoiceMcpCallItem);

    case "mcp_approval_request":
      return voiceMcpApprovalRequestItemDeserializer(item as VoiceMcpApprovalRequestItem);

    case "mcp_approval_response":
      return voiceMcpApprovalResponseItemDeserializer(item as VoiceMcpApprovalResponseItem);

    default:
      return voiceConversationItemDeserializer(item);
  }
}

/** The type of a persisted voice conversation item. */
export type VoiceConversationItemType =
  | "message"
  | "function_call"
  | "function_call_output"
  | "mcp_list_tools"
  | "mcp_call"
  | "mcp_approval_request"
  | "mcp_approval_response";

/** A persisted message item in a voice conversation. */
export interface VoiceMessageItem extends VoiceConversationItem {
  type: "message";
  /** The role of the message sender. */
  /** The discriminator possible values: system, user, assistant */
  role: RealtimeConversationItemMessageType;
}

export function voiceMessageItemDeserializer(item: any): VoiceMessageItem {
  return {
    type: item["type"],
    created_at: !item["created_at"] ? item["created_at"] : new Date(item["created_at"] * 1000),
    response_id: item["response_id"],
    role: item["role"],
  };
}

/** Alias for VoiceMessageItemUnion */
export type VoiceMessageItemUnion =
  VoiceSystemMessageItem | VoiceUserMessageItem | VoiceAssistantMessageItem | VoiceMessageItem;

export function voiceMessageItemUnionDeserializer(item: any): VoiceMessageItemUnion {
  switch (item["role"]) {
    case "system":
      return voiceSystemMessageItemDeserializer(item as VoiceSystemMessageItem);

    case "user":
      return voiceUserMessageItemDeserializer(item as VoiceUserMessageItem);

    case "assistant":
      return voiceAssistantMessageItemDeserializer(item as VoiceAssistantMessageItem);

    default:
      return voiceMessageItemDeserializer(item);
  }
}

/** Type of RealtimeConversationItemMessageType */
export type RealtimeConversationItemMessageType = "system" | "user" | "assistant";

/** A system message item. Only `input_text` content is valid for system messages. */
export interface VoiceSystemMessageItem extends VoiceMessageItem {
  /** The unique ID of the item. This may be provided by the client or generated by the server. */
  id?: string;
  /** Identifier for the API object being returned - always `realtime.item`. Optional when creating a new item. */
  object?: "realtime.item";
  /** The status of the item. Has no effect on the conversation. */
  status?: "completed" | "incomplete" | "in_progress";
  /** The content of the message. */
  content: RealtimeConversationItemMessageSystemContent[];
  role: "system";
}

export function voiceSystemMessageItemDeserializer(item: any): VoiceSystemMessageItem {
  return {
    type: item["type"],
    role: item["role"],
    created_at: !item["created_at"] ? item["created_at"] : new Date(item["created_at"] * 1000),
    response_id: item["response_id"],
    id: item["id"],
    object: item["object"],
    status: item["status"],
    content: realtimeConversationItemMessageSystemContentArrayDeserializer(item["content"]),
  };
}

export function realtimeConversationItemMessageSystemContentArraySerializer(
  result: Array<RealtimeConversationItemMessageSystemContent>,
): any[] {
  return result.map((item) => {
    return realtimeConversationItemMessageSystemContentSerializer(item);
  });
}

export function realtimeConversationItemMessageSystemContentArrayDeserializer(
  result: Array<RealtimeConversationItemMessageSystemContent>,
): any[] {
  return result.map((item) => {
    return realtimeConversationItemMessageSystemContentDeserializer(item);
  });
}

/** model interface RealtimeConversationItemMessageSystemContent */
export interface RealtimeConversationItemMessageSystemContent {
  type?: "input_text";
  text?: string;
}

export function realtimeConversationItemMessageSystemContentSerializer(
  item: RealtimeConversationItemMessageSystemContent,
): any {
  return { type: item["type"], text: item["text"] };
}

export function realtimeConversationItemMessageSystemContentDeserializer(
  item: any,
): RealtimeConversationItemMessageSystemContent {
  return {
    type: item["type"],
    text: item["text"],
  };
}

/** A user message item. `input_text`, `input_audio`, and `input_image` content are valid for user messages. */
export interface VoiceUserMessageItem extends VoiceMessageItem {
  /** The unique ID of the item. This may be provided by the client or generated by the server. */
  id?: string;
  /** Identifier for the API object being returned - always `realtime.item`. Optional when creating a new item. */
  object?: "realtime.item";
  /** The status of the item. Has no effect on the conversation. */
  status?: "completed" | "incomplete" | "in_progress";
  /** The content of the message. */
  content: RealtimeConversationItemMessageUserContent[];
  role: "user";
}

export function voiceUserMessageItemDeserializer(item: any): VoiceUserMessageItem {
  return {
    type: item["type"],
    role: item["role"],
    created_at: !item["created_at"] ? item["created_at"] : new Date(item["created_at"] * 1000),
    response_id: item["response_id"],
    id: item["id"],
    object: item["object"],
    status: item["status"],
    content: realtimeConversationItemMessageUserContentArrayDeserializer(item["content"]),
  };
}

export function realtimeConversationItemMessageUserContentArraySerializer(
  result: Array<RealtimeConversationItemMessageUserContent>,
): any[] {
  return result.map((item) => {
    return realtimeConversationItemMessageUserContentSerializer(item);
  });
}

export function realtimeConversationItemMessageUserContentArrayDeserializer(
  result: Array<RealtimeConversationItemMessageUserContent>,
): any[] {
  return result.map((item) => {
    return realtimeConversationItemMessageUserContentDeserializer(item);
  });
}

/** model interface RealtimeConversationItemMessageUserContent */
export interface RealtimeConversationItemMessageUserContent {
  type?: "input_text" | "input_audio" | "input_image";
  text?: string;
  audio?: string;
  image_url?: string;
  detail?: "auto" | "low" | "high";
  transcript?: string;
}

export function realtimeConversationItemMessageUserContentSerializer(
  item: RealtimeConversationItemMessageUserContent,
): any {
  return {
    type: item["type"],
    text: item["text"],
    audio: item["audio"],
    image_url: item["image_url"],
    detail: item["detail"],
    transcript: item["transcript"],
  };
}

export function realtimeConversationItemMessageUserContentDeserializer(
  item: any,
): RealtimeConversationItemMessageUserContent {
  return {
    type: item["type"],
    text: item["text"],
    audio: item["audio"],
    image_url: item["image_url"],
    detail: item["detail"],
    transcript: item["transcript"],
  };
}

/** An assistant message item. Only `output_text` and `output_audio` content are valid for assistant messages. */
export interface VoiceAssistantMessageItem extends VoiceMessageItem {
  /** The unique ID of the item. This may be provided by the client or generated by the server. */
  id?: string;
  /** Identifier for the API object being returned - always `realtime.item`. Optional when creating a new item. */
  object?: "realtime.item";
  /** The status of the item. Has no effect on the conversation. */
  status?: "completed" | "incomplete" | "in_progress";
  /** The content of the message. */
  content: RealtimeConversationItemMessageAssistantContent[];
  role: "assistant";
}

export function voiceAssistantMessageItemDeserializer(item: any): VoiceAssistantMessageItem {
  return {
    type: item["type"],
    role: item["role"],
    created_at: !item["created_at"] ? item["created_at"] : new Date(item["created_at"] * 1000),
    response_id: item["response_id"],
    id: item["id"],
    object: item["object"],
    status: item["status"],
    content: realtimeConversationItemMessageAssistantContentArrayDeserializer(item["content"]),
  };
}

export function realtimeConversationItemMessageAssistantContentArraySerializer(
  result: Array<RealtimeConversationItemMessageAssistantContent>,
): any[] {
  return result.map((item) => {
    return realtimeConversationItemMessageAssistantContentSerializer(item);
  });
}

export function realtimeConversationItemMessageAssistantContentArrayDeserializer(
  result: Array<RealtimeConversationItemMessageAssistantContent>,
): any[] {
  return result.map((item) => {
    return realtimeConversationItemMessageAssistantContentDeserializer(item);
  });
}

/** model interface RealtimeConversationItemMessageAssistantContent */
export interface RealtimeConversationItemMessageAssistantContent {
  type?: "output_text" | "output_audio";
  text?: string;
  audio?: string;
  transcript?: string;
}

export function realtimeConversationItemMessageAssistantContentSerializer(
  item: RealtimeConversationItemMessageAssistantContent,
): any {
  return {
    type: item["type"],
    text: item["text"],
    audio: item["audio"],
    transcript: item["transcript"],
  };
}

export function realtimeConversationItemMessageAssistantContentDeserializer(
  item: any,
): RealtimeConversationItemMessageAssistantContent {
  return {
    type: item["type"],
    text: item["text"],
    audio: item["audio"],
    transcript: item["transcript"],
  };
}

/** A function call request item. */
export interface VoiceFunctionCallItem extends VoiceConversationItem {
  /** The unique ID of the item. This may be provided by the client or generated by the server. */
  id?: string;
  /** Identifier for the API object being returned - always `realtime.item`. Optional when creating a new item. */
  object?: "realtime.item";
  /** The status of the item. Has no effect on the conversation. */
  status?: "completed" | "incomplete" | "in_progress";
  /** The ID of the function call. */
  call_id?: string;
  /** The name of the function being called. */
  name: string;
  /** The arguments of the function call. This is a JSON-encoded string representing the arguments passed to the function, for example `{"arg1": "value1", "arg2": 42}`. */
  arguments: string;
  type: "function_call";
}

export function voiceFunctionCallItemSerializer(item: VoiceFunctionCallItem): any {
  return {
    type: item["type"],
    created_at: !item["created_at"]
      ? item["created_at"]
      : (item["created_at"].getTime() / 1000) | 0,
    response_id: item["response_id"],
    id: item["id"],
    object: item["object"],
    status: item["status"],
    call_id: item["call_id"],
    name: item["name"],
    arguments: item["arguments"],
  };
}

export function voiceFunctionCallItemDeserializer(item: any): VoiceFunctionCallItem {
  return {
    type: item["type"],
    created_at: !item["created_at"] ? item["created_at"] : new Date(item["created_at"] * 1000),
    response_id: item["response_id"],
    id: item["id"],
    object: item["object"],
    status: item["status"],
    call_id: item["call_id"],
    name: item["name"],
    arguments: item["arguments"],
  };
}

/** A function call output item. */
export interface VoiceFunctionCallOutputItem extends VoiceConversationItem {
  /** The unique ID of the item. This may be provided by the client or generated by the server. */
  id?: string;
  /** Identifier for the API object being returned - always `realtime.item`. Optional when creating a new item. */
  object?: "realtime.item";
  /** The status of the item. Has no effect on the conversation. */
  status?: "completed" | "incomplete" | "in_progress";
  /** The ID of the function call this output is for. */
  call_id: string;
  /** The output of the function call, this is free text and can contain any information or simply be empty. */
  output: string;
  type: "function_call_output";
  /** The name of the function that was called. A Foundry extension: OpenAI's function_call_output does not carry the function name, only `call_id`. */
  name?: string;
}

export function voiceFunctionCallOutputItemSerializer(item: VoiceFunctionCallOutputItem): any {
  return {
    type: item["type"],
    created_at: !item["created_at"]
      ? item["created_at"]
      : (item["created_at"].getTime() / 1000) | 0,
    response_id: item["response_id"],
    id: item["id"],
    object: item["object"],
    status: item["status"],
    call_id: item["call_id"],
    output: item["output"],
    name: item["name"],
  };
}

export function voiceFunctionCallOutputItemDeserializer(item: any): VoiceFunctionCallOutputItem {
  return {
    type: item["type"],
    created_at: !item["created_at"] ? item["created_at"] : new Date(item["created_at"] * 1000),
    response_id: item["response_id"],
    id: item["id"],
    object: item["object"],
    status: item["status"],
    call_id: item["call_id"],
    output: item["output"],
    name: item["name"],
  };
}

/** An MCP list-tools item. */
export interface VoiceMcpListToolsItem extends VoiceConversationItem {
  /** The unique ID of the list. */
  id?: string;
  /** The label of the MCP server. */
  server_label: string;
  /** The tools available on the server. */
  tools: MCPListToolsTool[];
  type: "mcp_list_tools";
}

export function voiceMcpListToolsItemSerializer(item: VoiceMcpListToolsItem): any {
  return {
    type: item["type"],
    created_at: !item["created_at"]
      ? item["created_at"]
      : (item["created_at"].getTime() / 1000) | 0,
    response_id: item["response_id"],
    id: item["id"],
    server_label: item["server_label"],
    tools: mcpListToolsToolArraySerializer(item["tools"]),
  };
}

export function voiceMcpListToolsItemDeserializer(item: any): VoiceMcpListToolsItem {
  return {
    type: item["type"],
    created_at: !item["created_at"] ? item["created_at"] : new Date(item["created_at"] * 1000),
    response_id: item["response_id"],
    id: item["id"],
    server_label: item["server_label"],
    tools: mcpListToolsToolArrayDeserializer(item["tools"]),
  };
}

export function mcpListToolsToolArraySerializer(result: Array<MCPListToolsTool>): any[] {
  return result.map((item) => {
    return mcpListToolsToolSerializer(item);
  });
}

export function mcpListToolsToolArrayDeserializer(result: Array<MCPListToolsTool>): any[] {
  return result.map((item) => {
    return mcpListToolsToolDeserializer(item);
  });
}

/** A tool available on an MCP server. */
export interface MCPListToolsTool {
  /** The name of the tool. */
  name: string;
  description?: string;
  /** The JSON schema describing the tool's input. */
  input_schema: MCPListToolsToolInputSchema;
  annotations?: MCPListToolsToolAnnotations;
}

export function mcpListToolsToolSerializer(item: MCPListToolsTool): any {
  return {
    name: item["name"],
    description: item["description"],
    input_schema: mcpListToolsToolInputSchemaSerializer(item["input_schema"]),
    annotations: !item["annotations"]
      ? item["annotations"]
      : mcpListToolsToolAnnotationsSerializer(item["annotations"]),
  };
}

export function mcpListToolsToolDeserializer(item: any): MCPListToolsTool {
  return {
    name: item["name"],
    description: item["description"],
    input_schema: mcpListToolsToolInputSchemaDeserializer(item["input_schema"]),
    annotations: !item["annotations"]
      ? item["annotations"]
      : mcpListToolsToolAnnotationsDeserializer(item["annotations"]),
  };
}

/** model interface MCPListToolsToolInputSchema */
export interface MCPListToolsToolInputSchema {}

export function mcpListToolsToolInputSchemaSerializer(_item: MCPListToolsToolInputSchema): any {
  return {};
}

export function mcpListToolsToolInputSchemaDeserializer(item: any): MCPListToolsToolInputSchema {
  return item;
}

/** model interface MCPListToolsToolAnnotations */
export interface MCPListToolsToolAnnotations {}

export function mcpListToolsToolAnnotationsSerializer(_item: MCPListToolsToolAnnotations): any {
  return {};
}

export function mcpListToolsToolAnnotationsDeserializer(item: any): MCPListToolsToolAnnotations {
  return item;
}

/** An MCP call item. */
export interface VoiceMcpCallItem extends VoiceConversationItem {
  /** The unique ID of the tool call. */
  id: string;
  /** The label of the MCP server running the tool. */
  server_label: string;
  /** The name of the tool that was run. */
  name: string;
  /** A JSON string of the arguments passed to the tool. */
  arguments: string;
  approval_request_id?: string;
  output?: string;
  error?: RealtimeMCPErrorUnion;
  type: "mcp_call";
}

export function voiceMcpCallItemSerializer(item: VoiceMcpCallItem): any {
  return {
    type: item["type"],
    created_at: !item["created_at"]
      ? item["created_at"]
      : (item["created_at"].getTime() / 1000) | 0,
    response_id: item["response_id"],
    id: item["id"],
    server_label: item["server_label"],
    name: item["name"],
    arguments: item["arguments"],
    approval_request_id: item["approval_request_id"],
    output: item["output"],
    error: !item["error"] ? item["error"] : realtimeMCPErrorUnionSerializer(item["error"]),
  };
}

export function voiceMcpCallItemDeserializer(item: any): VoiceMcpCallItem {
  return {
    type: item["type"],
    created_at: !item["created_at"] ? item["created_at"] : new Date(item["created_at"] * 1000),
    response_id: item["response_id"],
    id: item["id"],
    server_label: item["server_label"],
    name: item["name"],
    arguments: item["arguments"],
    approval_request_id: item["approval_request_id"],
    output: item["output"],
    error: !item["error"] ? item["error"] : realtimeMCPErrorUnionDeserializer(item["error"]),
  };
}

/** model interface RealtimeMCPError */
export interface RealtimeMCPError {
  type: RealtimeMcpErrorType;
}

export function realtimeMCPErrorSerializer(item: RealtimeMCPError): any {
  return { type: item["type"] };
}

export function realtimeMCPErrorDeserializer(item: any): RealtimeMCPError {
  return {
    type: item["type"],
  };
}

/** Alias for RealtimeMCPErrorUnion */
export type RealtimeMCPErrorUnion =
  | RealtimeMCPProtocolError
  | RealtimeMCPToolExecutionError
  | RealtimeMcphttpError
  | RealtimeMCPError;

export function realtimeMCPErrorUnionSerializer(item: RealtimeMCPErrorUnion): any {
  switch (item.type) {
    case "protocol_error":
      return realtimeMCPProtocolErrorSerializer(item as RealtimeMCPProtocolError);

    case "tool_execution_error":
      return realtimeMCPToolExecutionErrorSerializer(item as RealtimeMCPToolExecutionError);

    case "http_error":
      return realtimeMcphttpErrorSerializer(item as RealtimeMcphttpError);

    default:
      return realtimeMCPErrorSerializer(item);
  }
}

export function realtimeMCPErrorUnionDeserializer(item: any): RealtimeMCPErrorUnion {
  switch (item["type"]) {
    case "protocol_error":
      return realtimeMCPProtocolErrorDeserializer(item as RealtimeMCPProtocolError);

    case "tool_execution_error":
      return realtimeMCPToolExecutionErrorDeserializer(item as RealtimeMCPToolExecutionError);

    case "http_error":
      return realtimeMcphttpErrorDeserializer(item as RealtimeMcphttpError);

    default:
      return realtimeMCPErrorDeserializer(item);
  }
}

/** Type of RealtimeMcpErrorType */
export type RealtimeMcpErrorType = "protocol_error" | "tool_execution_error" | "http_error";

/** model interface RealtimeMCPProtocolError */
export interface RealtimeMCPProtocolError extends RealtimeMCPError {
  type: "protocol_error";
  code: number;
  message: string;
}

export function realtimeMCPProtocolErrorSerializer(item: RealtimeMCPProtocolError): any {
  return { type: item["type"], code: item["code"], message: item["message"] };
}

export function realtimeMCPProtocolErrorDeserializer(item: any): RealtimeMCPProtocolError {
  return {
    type: item["type"],
    code: item["code"],
    message: item["message"],
  };
}

/** model interface RealtimeMCPToolExecutionError */
export interface RealtimeMCPToolExecutionError extends RealtimeMCPError {
  type: "tool_execution_error";
  message: string;
}

export function realtimeMCPToolExecutionErrorSerializer(item: RealtimeMCPToolExecutionError): any {
  return { type: item["type"], message: item["message"] };
}

export function realtimeMCPToolExecutionErrorDeserializer(
  item: any,
): RealtimeMCPToolExecutionError {
  return {
    type: item["type"],
    message: item["message"],
  };
}

/** model interface RealtimeMcphttpError */
export interface RealtimeMcphttpError extends RealtimeMCPError {
  type: "http_error";
  code: number;
  message: string;
}

export function realtimeMcphttpErrorSerializer(item: RealtimeMcphttpError): any {
  return { type: item["type"], code: item["code"], message: item["message"] };
}

export function realtimeMcphttpErrorDeserializer(item: any): RealtimeMcphttpError {
  return {
    type: item["type"],
    code: item["code"],
    message: item["message"],
  };
}

/** An MCP approval request item. */
export interface VoiceMcpApprovalRequestItem extends VoiceConversationItem {
  /** The unique ID of the approval request. */
  id: string;
  /** The label of the MCP server making the request. */
  server_label: string;
  /** The name of the tool to run. */
  name: string;
  /** A JSON string of arguments for the tool. */
  arguments: string;
  type: "mcp_approval_request";
}

export function voiceMcpApprovalRequestItemSerializer(item: VoiceMcpApprovalRequestItem): any {
  return {
    type: item["type"],
    created_at: !item["created_at"]
      ? item["created_at"]
      : (item["created_at"].getTime() / 1000) | 0,
    response_id: item["response_id"],
    id: item["id"],
    server_label: item["server_label"],
    name: item["name"],
    arguments: item["arguments"],
  };
}

export function voiceMcpApprovalRequestItemDeserializer(item: any): VoiceMcpApprovalRequestItem {
  return {
    type: item["type"],
    created_at: !item["created_at"] ? item["created_at"] : new Date(item["created_at"] * 1000),
    response_id: item["response_id"],
    id: item["id"],
    server_label: item["server_label"],
    name: item["name"],
    arguments: item["arguments"],
  };
}

/** An MCP approval response item (client-created). */
export interface VoiceMcpApprovalResponseItem extends VoiceConversationItem {
  /** The unique ID of the approval response. */
  id: string;
  /** The ID of the approval request being answered. */
  approval_request_id: string;
  /** Whether the request was approved. */
  approve: boolean;
  reason?: string;
  type: "mcp_approval_response";
}

export function voiceMcpApprovalResponseItemSerializer(item: VoiceMcpApprovalResponseItem): any {
  return {
    type: item["type"],
    created_at: !item["created_at"]
      ? item["created_at"]
      : (item["created_at"].getTime() / 1000) | 0,
    response_id: item["response_id"],
    id: item["id"],
    approval_request_id: item["approval_request_id"],
    approve: item["approve"],
    reason: item["reason"],
  };
}

export function voiceMcpApprovalResponseItemDeserializer(item: any): VoiceMcpApprovalResponseItem {
  return {
    type: item["type"],
    created_at: !item["created_at"] ? item["created_at"] : new Date(item["created_at"] * 1000),
    response_id: item["response_id"],
    id: item["id"],
    approval_request_id: item["approval_request_id"],
    approve: item["approve"],
    reason: item["reason"],
  };
}

/** Audio configuration for a response. Follows the OpenAI Realtime GA `audio` object shape. */
export interface VoiceResponseAudio {
  /** The audio output configuration used for the response. */
  output?: VoiceResponseAudioOutput;
}

export function voiceResponseAudioDeserializer(item: any): VoiceResponseAudio {
  return {
    output: !item["output"] ? item["output"] : voiceResponseAudioOutputDeserializer(item["output"]),
  };
}

/** The output audio format used for a response. Follows the OpenAI Realtime GA audio format discriminated union. */
export interface VoiceResponseAudioOutput {
  /** The voice used for the response's audio output. */
  voice?: VoiceResponseVoice;
  /** The audio format used for the response's audio output. */
  format?: RealtimeAudioFormatsUnion;
}

export function voiceResponseAudioOutputDeserializer(item: any): VoiceResponseAudioOutput {
  return {
    voice: !item["voice"] ? item["voice"] : voiceResponseVoiceDeserializer(item["voice"]),
    format: !item["format"]
      ? item["format"]
      : realtimeAudioFormatsUnionDeserializer(item["format"]),
  };
}

/** The complete typed voice configuration used for a response. */
export type VoiceResponseVoice = OpenAIVoice | AzureVoiceUnion | AzureRealtimeNativeVoice;

export function voiceResponseVoiceDeserializer(item: any): VoiceResponseVoice {
  return item;
}

/** An OpenAI built-in voice configuration with an explicit type discriminator. */
export interface OpenAIVoice {
  /** The voice kind. Always `openai`. */
  type: "openai";
  /** The OpenAI built-in voice name. */
  name: VoiceIdsShared;
}

export function openAIVoiceSerializer(item: OpenAIVoice): any {
  return { type: item["type"], name: voiceIdsSharedSerializer(item["name"]) };
}

export function openAIVoiceDeserializer(item: any): OpenAIVoice {
  return {
    type: item["type"],
    name: voiceIdsSharedDeserializer(item["name"]),
  };
}

/** Alias for VoiceIdsShared */
export type VoiceIdsShared =
  | string
  | "alloy"
  | "ash"
  | "ballad"
  | "coral"
  | "echo"
  | "sage"
  | "shimmer"
  | "verse"
  | "marin"
  | "cedar";

export function voiceIdsSharedSerializer(item: VoiceIdsShared): any {
  return item;
}

export function voiceIdsSharedDeserializer(item: any): VoiceIdsShared {
  return item;
}

/** Base configuration shared by Azure synthesized voices. */
export interface AzureVoice {
  /** The Azure voice kind. */
  /** The discriminator possible values: azure-standard, azure-custom, azure-personal, avatar-voice-sync */
  type: AzureVoiceType;
  /** The synthesis temperature, from 0 to 1. */
  temperature?: number;
  /** The URL of a custom pronunciation lexicon. */
  custom_lexicon_url?: string;
  /** The URL of a custom text-normalization service. */
  custom_text_normalization_url?: string;
  /** Preferred BCP-47 locales that influence language accents. */
  prefer_locales?: string[];
  /** The enforced BCP-47 locale. When omitted, the language is detected from the text. */
  locale?: string;
  /** The speaking style, such as `cheerful` or `sad`. */
  style?: string;
  /** The SSML-compatible pitch adjustment, such as `+5%`. */
  pitch?: string;
  /** The SSML-compatible speaking-rate adjustment, such as `+10%`. */
  rate?: string;
  /** The SSML-compatible volume adjustment, such as `+10` or `-6dB`. */
  volume?: string;
}

export function azureVoiceSerializer(item: AzureVoice): any {
  return {
    type: item["type"],
    temperature: item["temperature"],
    custom_lexicon_url: item["custom_lexicon_url"],
    custom_text_normalization_url: item["custom_text_normalization_url"],
    prefer_locales: !item["prefer_locales"]
      ? item["prefer_locales"]
      : item["prefer_locales"].map((p: any) => {
          return p;
        }),
    locale: item["locale"],
    style: item["style"],
    pitch: item["pitch"],
    rate: item["rate"],
    volume: item["volume"],
  };
}

export function azureVoiceDeserializer(item: any): AzureVoice {
  return {
    type: item["type"],
    temperature: item["temperature"],
    custom_lexicon_url: item["custom_lexicon_url"],
    custom_text_normalization_url: item["custom_text_normalization_url"],
    prefer_locales: !item["prefer_locales"]
      ? item["prefer_locales"]
      : item["prefer_locales"].map((p: any) => {
          return p;
        }),
    locale: item["locale"],
    style: item["style"],
    pitch: item["pitch"],
    rate: item["rate"],
    volume: item["volume"],
  };
}

/** Alias for AzureVoiceUnion */
export type AzureVoiceUnion =
  | AzureStandardVoice
  | AzureCustomVoice
  | AzurePersonalVoice
  | AzureAvatarVoiceSyncVoice
  | AzureVoice;

export function azureVoiceUnionSerializer(item: AzureVoiceUnion): any {
  switch (item.type) {
    case "azure-standard":
      return azureStandardVoiceSerializer(item as AzureStandardVoice);

    case "azure-custom":
      return azureCustomVoiceSerializer(item as AzureCustomVoice);

    case "azure-personal":
      return azurePersonalVoiceSerializer(item as AzurePersonalVoice);

    case "avatar-voice-sync":
      return azureAvatarVoiceSyncVoiceSerializer(item as AzureAvatarVoiceSyncVoice);

    default:
      return azureVoiceSerializer(item);
  }
}

export function azureVoiceUnionDeserializer(item: any): AzureVoiceUnion {
  switch (item["type"]) {
    case "azure-standard":
      return azureStandardVoiceDeserializer(item as AzureStandardVoice);

    case "azure-custom":
      return azureCustomVoiceDeserializer(item as AzureCustomVoice);

    case "azure-personal":
      return azurePersonalVoiceDeserializer(item as AzurePersonalVoice);

    case "avatar-voice-sync":
      return azureAvatarVoiceSyncVoiceDeserializer(item as AzureAvatarVoiceSyncVoice);

    default:
      return azureVoiceDeserializer(item);
  }
}

/** The Azure synthesized voice kind. Additional values may be added over time. */
export type AzureVoiceType =
  "azure-standard" | "azure-custom" | "azure-personal" | "avatar-voice-sync";

/** An Azure standard neural voice configuration. */
export interface AzureStandardVoice extends AzureVoice {
  type: "azure-standard";
  /** The Azure neural voice name. */
  name: string;
  /** The speaker name used by a multi-talker voice. */
  multi_talker_speaker_name?: string;
}

export function azureStandardVoiceSerializer(item: AzureStandardVoice): any {
  return {
    type: item["type"],
    temperature: item["temperature"],
    custom_lexicon_url: item["custom_lexicon_url"],
    custom_text_normalization_url: item["custom_text_normalization_url"],
    prefer_locales: !item["prefer_locales"]
      ? item["prefer_locales"]
      : item["prefer_locales"].map((p: any) => {
          return p;
        }),
    locale: item["locale"],
    style: item["style"],
    pitch: item["pitch"],
    rate: item["rate"],
    volume: item["volume"],
    name: item["name"],
    multi_talker_speaker_name: item["multi_talker_speaker_name"],
  };
}

export function azureStandardVoiceDeserializer(item: any): AzureStandardVoice {
  return {
    type: item["type"],
    temperature: item["temperature"],
    custom_lexicon_url: item["custom_lexicon_url"],
    custom_text_normalization_url: item["custom_text_normalization_url"],
    prefer_locales: !item["prefer_locales"]
      ? item["prefer_locales"]
      : item["prefer_locales"].map((p: any) => {
          return p;
        }),
    locale: item["locale"],
    style: item["style"],
    pitch: item["pitch"],
    rate: item["rate"],
    volume: item["volume"],
    name: item["name"],
    multi_talker_speaker_name: item["multi_talker_speaker_name"],
  };
}

/** An Azure custom neural voice configuration. */
export interface AzureCustomVoice extends AzureVoice {
  type: "azure-custom";
  /** The custom voice name. */
  name: string;
  /** The Azure Speech custom voice deployment endpoint ID. */
  endpoint_id: string;
}

export function azureCustomVoiceSerializer(item: AzureCustomVoice): any {
  return {
    type: item["type"],
    temperature: item["temperature"],
    custom_lexicon_url: item["custom_lexicon_url"],
    custom_text_normalization_url: item["custom_text_normalization_url"],
    prefer_locales: !item["prefer_locales"]
      ? item["prefer_locales"]
      : item["prefer_locales"].map((p: any) => {
          return p;
        }),
    locale: item["locale"],
    style: item["style"],
    pitch: item["pitch"],
    rate: item["rate"],
    volume: item["volume"],
    name: item["name"],
    endpoint_id: item["endpoint_id"],
  };
}

export function azureCustomVoiceDeserializer(item: any): AzureCustomVoice {
  return {
    type: item["type"],
    temperature: item["temperature"],
    custom_lexicon_url: item["custom_lexicon_url"],
    custom_text_normalization_url: item["custom_text_normalization_url"],
    prefer_locales: !item["prefer_locales"]
      ? item["prefer_locales"]
      : item["prefer_locales"].map((p: any) => {
          return p;
        }),
    locale: item["locale"],
    style: item["style"],
    pitch: item["pitch"],
    rate: item["rate"],
    volume: item["volume"],
    name: item["name"],
    endpoint_id: item["endpoint_id"],
  };
}

/** An Azure personal voice configuration. */
export interface AzurePersonalVoice extends AzureVoice {
  type: "azure-personal";
  /** The personal voice name. */
  name: string;
  /** The neural model used by the personal voice. */
  model: PersonalVoiceModel;
}

export function azurePersonalVoiceSerializer(item: AzurePersonalVoice): any {
  return {
    type: item["type"],
    temperature: item["temperature"],
    custom_lexicon_url: item["custom_lexicon_url"],
    custom_text_normalization_url: item["custom_text_normalization_url"],
    prefer_locales: !item["prefer_locales"]
      ? item["prefer_locales"]
      : item["prefer_locales"].map((p: any) => {
          return p;
        }),
    locale: item["locale"],
    style: item["style"],
    pitch: item["pitch"],
    rate: item["rate"],
    volume: item["volume"],
    name: item["name"],
    model: item["model"],
  };
}

export function azurePersonalVoiceDeserializer(item: any): AzurePersonalVoice {
  return {
    type: item["type"],
    temperature: item["temperature"],
    custom_lexicon_url: item["custom_lexicon_url"],
    custom_text_normalization_url: item["custom_text_normalization_url"],
    prefer_locales: !item["prefer_locales"]
      ? item["prefer_locales"]
      : item["prefer_locales"].map((p: any) => {
          return p;
        }),
    locale: item["locale"],
    style: item["style"],
    pitch: item["pitch"],
    rate: item["rate"],
    volume: item["volume"],
    name: item["name"],
    model: item["model"],
  };
}

/** A known neural model for an Azure personal or avatar voice. Additional values may be added over time. */
export type PersonalVoiceModel = "DragonLatestNeural" | "DragonHDOmniLatestNeural" | "MAI-Voice";

/** An Azure avatar voice-synchronization configuration. The runtime derives its voice name from the avatar character and style. */
export interface AzureAvatarVoiceSyncVoice extends AzureVoice {
  type: "avatar-voice-sync";
  /** The neural model used to synthesize the avatar voice. */
  model: PersonalVoiceModel;
}

export function azureAvatarVoiceSyncVoiceSerializer(item: AzureAvatarVoiceSyncVoice): any {
  return {
    type: item["type"],
    temperature: item["temperature"],
    custom_lexicon_url: item["custom_lexicon_url"],
    custom_text_normalization_url: item["custom_text_normalization_url"],
    prefer_locales: !item["prefer_locales"]
      ? item["prefer_locales"]
      : item["prefer_locales"].map((p: any) => {
          return p;
        }),
    locale: item["locale"],
    style: item["style"],
    pitch: item["pitch"],
    rate: item["rate"],
    volume: item["volume"],
    model: item["model"],
  };
}

export function azureAvatarVoiceSyncVoiceDeserializer(item: any): AzureAvatarVoiceSyncVoice {
  return {
    type: item["type"],
    temperature: item["temperature"],
    custom_lexicon_url: item["custom_lexicon_url"],
    custom_text_normalization_url: item["custom_text_normalization_url"],
    prefer_locales: !item["prefer_locales"]
      ? item["prefer_locales"]
      : item["prefer_locales"].map((p: any) => {
          return p;
        }),
    locale: item["locale"],
    style: item["style"],
    pitch: item["pitch"],
    rate: item["rate"],
    volume: item["volume"],
    model: item["model"],
  };
}

/** An Azure realtime-native voice configuration. */
export interface AzureRealtimeNativeVoice {
  /** The voice kind. Always `azure-realtime-native`. */
  type: "azure-realtime-native";
  /** The Azure realtime-native voice name. */
  name: AzureRealtimeNativeVoiceName;
}

export function azureRealtimeNativeVoiceSerializer(item: AzureRealtimeNativeVoice): any {
  return { type: item["type"], name: item["name"] };
}

export function azureRealtimeNativeVoiceDeserializer(item: any): AzureRealtimeNativeVoice {
  return {
    type: item["type"],
    name: item["name"],
  };
}

/** A known Azure realtime-native voice name. This union is extensible, so additional service-supported names do not require an SDK update. */
export type AzureRealtimeNativeVoiceName =
  | "aarti"
  | "alvaro"
  | "andrew"
  | "antonio"
  | "ava"
  | "clara"
  | "dalia"
  | "denise"
  | "diego"
  | "diya"
  | "elsa"
  | "emma"
  | "florian"
  | "francisca"
  | "hyunsu"
  | "jorge"
  | "keita"
  | "liam"
  | "meera"
  | "nanami"
  | "natasha"
  | "niwat"
  | "premwadee"
  | "remy"
  | "ryan"
  | "seraphina"
  | "sonia"
  | "sunhi"
  | "sylvie"
  | "thierry"
  | "william"
  | "xiaoxiao"
  | "ximena"
  | "yunxi";

/** model interface RealtimeAudioFormats */
export interface RealtimeAudioFormats {
  type: RealtimeAudioFormatsType;
}

export function realtimeAudioFormatsDeserializer(item: any): RealtimeAudioFormats {
  return {
    type: item["type"],
  };
}

/** Alias for RealtimeAudioFormatsUnion */
export type RealtimeAudioFormatsUnion =
  | RealtimeAudioFormatsAudioPcm
  | RealtimeAudioFormatsAudioPcmu
  | RealtimeAudioFormatsAudioPcma
  | RealtimeAudioFormats;

export function realtimeAudioFormatsUnionDeserializer(item: any): RealtimeAudioFormatsUnion {
  switch (item["type"]) {
    case "audio/pcm":
      return realtimeAudioFormatsAudioPcmDeserializer(item as RealtimeAudioFormatsAudioPcm);

    case "audio/pcmu":
      return realtimeAudioFormatsAudioPcmuDeserializer(item as RealtimeAudioFormatsAudioPcmu);

    case "audio/pcma":
      return realtimeAudioFormatsAudioPcmaDeserializer(item as RealtimeAudioFormatsAudioPcma);

    default:
      return realtimeAudioFormatsDeserializer(item);
  }
}

/** Type of RealtimeAudioFormatsType */
export type RealtimeAudioFormatsType = "audio/pcm" | "audio/pcmu" | "audio/pcma";

/** model interface RealtimeAudioFormatsAudioPcm */
export interface RealtimeAudioFormatsAudioPcm extends RealtimeAudioFormats {
  type: "audio/pcm";
  rate?: 24000;
}

export function realtimeAudioFormatsAudioPcmDeserializer(item: any): RealtimeAudioFormatsAudioPcm {
  return {
    type: item["type"],
    rate: item["rate"],
  };
}

/** model interface RealtimeAudioFormatsAudioPcmu */
export interface RealtimeAudioFormatsAudioPcmu extends RealtimeAudioFormats {
  type: "audio/pcmu";
}

export function realtimeAudioFormatsAudioPcmuDeserializer(
  item: any,
): RealtimeAudioFormatsAudioPcmu {
  return {
    type: item["type"],
  };
}

/** model interface RealtimeAudioFormatsAudioPcma */
export interface RealtimeAudioFormatsAudioPcma extends RealtimeAudioFormats {
  type: "audio/pcma";
}

export function realtimeAudioFormatsAudioPcmaDeserializer(
  item: any,
): RealtimeAudioFormatsAudioPcma {
  return {
    type: item["type"],
  };
}

/** Alias for _VoiceResponseMaxOutputTokens */
export type _VoiceResponseMaxOutputTokens = number | "inf";

export function _voiceResponseMaxOutputTokensDeserializer(
  item: any,
): _VoiceResponseMaxOutputTokens {
  return item;
}

/** The response data for a requested list of items. */
export interface _AgentsPagedResultVoiceConversationItem {
  /** The requested list of items. */
  data: VoiceConversationItemUnion[];
  /** The first ID represented in this list. */
  first_id?: string;
  /** The last ID represented in this list. */
  last_id?: string;
  /** A value indicating whether there are additional values available not captured in this list. */
  has_more: boolean;
}

export function _agentsPagedResultVoiceConversationItemDeserializer(
  item: any,
): _AgentsPagedResultVoiceConversationItem {
  return {
    data: voiceConversationItemUnionArrayDeserializer(item["data"]),
    first_id: item["first_id"],
    last_id: item["last_id"],
    has_more: item["has_more"],
  };
}

/**
 * Metadata for a single conversation item's audio segment. For bring-your-own-storage (BYOS), the response includes
 * `blob_uri`, a direct customer-storage URI without a SAS token, that the customer accesses with their own
 * credentials. For Foundry-managed storage, `blob_uri` is absent and the bytes are streamed through the item's
 * `/audio/content` route.
 */
export interface VoiceItemAudioResponse {
  /** The id of the conversation the item belongs to. */
  conversation_id: string;
  /** The id of the item this audio belongs to. */
  item_id: string;
  /** The role the audio belongs to. */
  role?: VoiceAudioRole;
  /** The container format of the audio. */
  format?: VoiceAudioContainerFormat;
  /** The audio codec. */
  codec?: VoiceAudioCodec;
  /** The sample rate in Hz. */
  sample_rate?: number;
  /** The number of audio channels. */
  channels?: number;
  /** The offset from the session start at which this segment begins. */
  start_offset_ms?: number;
  /** The duration of the audio segment. */
  duration_ms?: number;
  /** For bring-your-own-storage (BYOS) recordings only: the URI of the recording in the customer's own storage, without a SAS token. The customer downloads it using their own storage credentials. Absent for Foundry-managed storage, where the bytes are streamed via the item's `/audio/content` route instead. */
  blob_uri?: string;
}

export function voiceItemAudioResponseDeserializer(item: any): VoiceItemAudioResponse {
  return {
    conversation_id: item["conversation_id"],
    item_id: item["item_id"],
    role: item["role"],
    format: item["format"],
    codec: item["codec"],
    sample_rate: item["sample_rate"],
    channels: item["channels"],
    start_offset_ms: item["start_offset_ms"],
    duration_ms: item["duration_ms"],
    blob_uri: item["blob_uri"],
  };
}

/** A voice-audio participant role. Additional values may be added over time. */
export type VoiceAudioRole = "user" | "agent";
/** An audio container format. Additional values may be added over time. */
export type VoiceAudioContainerFormat = "wav";
/** An audio codec. Additional values may be added over time. */
export type VoiceAudioCodec = "pcm16" | "pcmu" | "pcma";

/**
 * Metadata for the merged, whole-call stereo recording of a voice conversation (user audio on the left channel,
 * agent audio on the right). Built once from the per-turn segments after the session ends and durably cached.
 * The common metadata (format, sample rate, channels, channel layout, duration) is returned for both
 * Foundry-managed and bring-your-own-storage (BYOS) recordings. For BYOS the response also includes `blob_uri`,
 * the URI of the recording in the customer's own storage (no SAS token), which the customer downloads using their
 * own storage credentials. For Foundry-managed storage `blob_uri` is absent and the bytes are streamed via the
 * `/audio/content` route instead.
 */
export interface VoiceRecordingResponse {
  /** The id of the conversation this recording belongs to. */
  conversation_id: string;
  /** The container format of the recording. */
  format: VoiceAudioContainerFormat;
  /** The sample rate of the recording in Hz, e.g. 24000. */
  sample_rate: number;
  /** The number of audio channels. The merged recording is stereo (`2`). */
  channels: number;
  /** The role assigned to each stereo channel. */
  channel_layout: VoiceRecordingChannelLayout;
  /** The total duration of the recording. */
  duration_ms: number;
  /** For bring-your-own-storage (BYOS) recordings only: the URI of the recording in the customer's own storage, without a SAS token. The customer downloads it using their own storage credentials. Absent for Foundry-managed storage, where the bytes are streamed via the `/audio/content` route instead. */
  blob_uri?: string;
}

export function voiceRecordingResponseDeserializer(item: any): VoiceRecordingResponse {
  return {
    conversation_id: item["conversation_id"],
    format: item["format"],
    sample_rate: item["sample_rate"],
    channels: item["channels"],
    channel_layout: voiceRecordingChannelLayoutDeserializer(item["channel_layout"]),
    duration_ms: item["duration_ms"],
    blob_uri: item["blob_uri"],
  };
}

/** The role assigned to each channel of a merged stereo voice recording. */
export interface VoiceRecordingChannelLayout {
  /** The role carried on the left channel. Always `user`. */
  left: "user";
  /** The role carried on the right channel. Always `agent`. */
  right: "agent";
}

export function voiceRecordingChannelLayoutDeserializer(item: any): VoiceRecordingChannelLayout {
  return {
    left: item["left"],
    right: item["right"],
  };
}

/** The operational state of an agent. */
export type AgentState = "enabled" | "disabled";

/** model interface AgentBlueprintReference */
export interface AgentBlueprintReference {
  type: AgentBlueprintReferenceType;
}

export function agentBlueprintReferenceSerializer(item: AgentBlueprintReference): any {
  return { type: item["type"] };
}

export function agentBlueprintReferenceDeserializer(item: any): AgentBlueprintReference {
  return {
    type: item["type"],
  };
}

/** Alias for AgentBlueprintReferenceUnion */
export type AgentBlueprintReferenceUnion =
  ManagedAgentIdentityBlueprintReference | AgentBlueprintReference;

export function agentBlueprintReferenceUnionSerializer(item: AgentBlueprintReferenceUnion): any {
  switch (item.type) {
    case "ManagedAgentIdentityBlueprint":
      return managedAgentIdentityBlueprintReferenceSerializer(
        item as ManagedAgentIdentityBlueprintReference,
      );

    default:
      return agentBlueprintReferenceSerializer(item);
  }
}

export function agentBlueprintReferenceUnionDeserializer(item: any): AgentBlueprintReferenceUnion {
  switch (item["type"]) {
    case "ManagedAgentIdentityBlueprint":
      return managedAgentIdentityBlueprintReferenceDeserializer(
        item as ManagedAgentIdentityBlueprintReference,
      );

    default:
      return agentBlueprintReferenceDeserializer(item);
  }
}

/** Type of AgentBlueprintReferenceType */
export type AgentBlueprintReferenceType = "ManagedAgentIdentityBlueprint";

/** model interface ManagedAgentIdentityBlueprintReference */
export interface ManagedAgentIdentityBlueprintReference extends AgentBlueprintReference {
  type: "ManagedAgentIdentityBlueprint";
  /** The ID of the managed blueprint */
  blueprint_id: string;
}

export function managedAgentIdentityBlueprintReferenceSerializer(
  item: ManagedAgentIdentityBlueprintReference,
): any {
  return { type: item["type"], blueprint_id: item["blueprint_id"] };
}

export function managedAgentIdentityBlueprintReferenceDeserializer(
  item: any,
): ManagedAgentIdentityBlueprintReference {
  return {
    type: item["type"],
    blueprint_id: item["blueprint_id"],
  };
}

/**
 * The voice agent definition. Its configuration (model, instructions, audio, tools, and optional avatar) drives a
 * managed speech-to-speech experience. The realtime voice session is established through a separate connect operation
 * that is not defined in this specification. Every create or update produces a new immutable version.
 */
export interface VoiceAgentDefinition {
  /** The kind discriminator for a voice agent definition. Always `voice`. */
  kind: "voice";
  /** Configuration for Responsible AI (RAI) content filtering and safety features. */
  rai_config?: RaiConfig;
  /** How the model backing this agent is served. Together with `model`, this selects the model up front. `managed` uses a service-managed model; `self_deployed` uses the customer's own Foundry deployment. This is independent of the architecture (realtime or cascaded), which the service derives from the selected model. */
  model_type: VoiceModelType;
  /** The model to use for this agent, paired with `model_type`: the service-managed model name when `model_type` is `managed`, or the customer's Foundry deployment name when `model_type` is `self_deployed`. The model must support realtime or cascaded voice. The service derives the architecture from the selected model. */
  model: string;
  /** A system (or developer) message inserted into the model's context. Supports template substitution via `structured_inputs`, rendered per session before the live session starts. */
  instructions?: string;
  /** Optional session-start greeting. Template mode speaks exact rendered text; LLM-generated mode asks the session model to author the opening response and may use configured tools. */
  greeting?: VoiceGreetingConfigUnion;
  /**
   * The audio configuration, including input and output formats, voice, turn detection, noise reduction, and
   * transcription. These values are session defaults; a client may override supported fields when connecting.
   */
  audio?: VoiceAudioConfig;
  /**
   * The output modalities the agent produces. Defaults to `["audio"]`. `animation` and `avatar` are available
   * when an avatar is configured.
   */
  output_modalities?: VoiceOutputModality[];
  /** Optional avatar configuration. These values are session defaults and may be overridden when connecting. */
  avatar?: VoiceAvatarConfig;
  /**
   * The tools the voice agent may use. Supported tool kinds are `function` (executed by the client), `mcp`,
   * `system` (service-managed session controls), and `toolbox`. Server-side tools such as `web_search`,
   * `azure_ai_search`, and `openapi` are provided through a toolbox rather than declared directly.
   */
  tools?: VoiceAgentTool[];
  /** Set of structured inputs that participate in prompt template substitution, rendered per session before the live session starts. */
  structured_inputs?: Record<string, StructuredInputDefinition>;
  /**
   * Whether conversations with this agent are persisted. A single, all-or-nothing persistence switch that defaults to
   * `false` (privacy-safe: off by default). When `true`, Foundry persists the full conversation — the transcript/event
   * timeline and raw audio. When `false`, nothing is persisted and no conversation is surfaced. There is no separate
   * audio-logging control; audio is persisted only as part of this switch. Latency/performance telemetry (e.g.
   * time-to-first-audio, inter-token latency, interruption) is observability-only (customer trace / App Insights) and
   * is not part of the persisted conversation content.
   */
  store?: boolean;
}

export function voiceAgentDefinitionSerializer(item: VoiceAgentDefinition): any {
  return {
    kind: item["kind"],
    rai_config: !item["rai_config"] ? item["rai_config"] : raiConfigSerializer(item["rai_config"]),
    model_type: item["model_type"],
    model: item["model"],
    instructions: item["instructions"],
    greeting: !item["greeting"]
      ? item["greeting"]
      : voiceGreetingConfigUnionSerializer(item["greeting"]),
    audio: !item["audio"] ? item["audio"] : voiceAudioConfigSerializer(item["audio"]),
    output_modalities: !item["output_modalities"]
      ? item["output_modalities"]
      : item["output_modalities"].map((p: any) => {
          return p;
        }),
    avatar: !item["avatar"] ? item["avatar"] : voiceAvatarConfigSerializer(item["avatar"]),
    tools: !item["tools"] ? item["tools"] : voiceAgentToolArraySerializer(item["tools"]),
    structured_inputs: !item["structured_inputs"]
      ? item["structured_inputs"]
      : structuredInputDefinitionRecordSerializer(item["structured_inputs"]),
    store: item["store"],
  };
}

export function voiceAgentDefinitionDeserializer(item: any): VoiceAgentDefinition {
  return {
    kind: item["kind"],
    rai_config: !item["rai_config"]
      ? item["rai_config"]
      : raiConfigDeserializer(item["rai_config"]),
    model_type: item["model_type"],
    model: item["model"],
    instructions: item["instructions"],
    greeting: !item["greeting"]
      ? item["greeting"]
      : voiceGreetingConfigUnionDeserializer(item["greeting"]),
    audio: !item["audio"] ? item["audio"] : voiceAudioConfigDeserializer(item["audio"]),
    output_modalities: !item["output_modalities"]
      ? item["output_modalities"]
      : item["output_modalities"].map((p: any) => {
          return p;
        }),
    avatar: !item["avatar"] ? item["avatar"] : voiceAvatarConfigDeserializer(item["avatar"]),
    tools: !item["tools"] ? item["tools"] : voiceAgentToolArrayDeserializer(item["tools"]),
    structured_inputs: !item["structured_inputs"]
      ? item["structured_inputs"]
      : structuredInputDefinitionRecordDeserializer(item["structured_inputs"]),
    store: item["store"],
  };
}

/** Configuration for Responsible AI (RAI) content filtering and safety features. */
export interface RaiConfig {
  /** The name of the RAI policy to apply. */
  rai_policy_name: string;
}

export function raiConfigSerializer(item: RaiConfig): any {
  return { rai_policy_name: item["rai_policy_name"] };
}

export function raiConfigDeserializer(item: any): RaiConfig {
  return {
    rai_policy_name: item["rai_policy_name"],
  };
}

/**
 * How the model backing a voice agent is served. This is independent of the architecture (realtime or cascaded),
 * which the service derives from the selected model.
 */
export type VoiceModelType = "managed" | "self_deployed";

/** Session-start greeting configuration for a voice agent. */
export interface VoiceGreetingConfig {
  /** The greeting mode. */
  /** The discriminator possible values: template, llm_generated */
  type: string;
}

export function voiceGreetingConfigSerializer(item: VoiceGreetingConfig): any {
  return { type: item["type"] };
}

export function voiceGreetingConfigDeserializer(item: any): VoiceGreetingConfig {
  return {
    type: item["type"],
  };
}

/** Alias for VoiceGreetingConfigUnion */
export type VoiceGreetingConfigUnion =
  TemplateVoiceGreetingConfig | LlmGeneratedVoiceGreetingConfig | VoiceGreetingConfig;

export function voiceGreetingConfigUnionSerializer(item: VoiceGreetingConfigUnion): any {
  switch (item.type) {
    case "template":
      return templateVoiceGreetingConfigSerializer(item as TemplateVoiceGreetingConfig);

    case "llm_generated":
      return llmGeneratedVoiceGreetingConfigSerializer(item as LlmGeneratedVoiceGreetingConfig);

    default:
      return voiceGreetingConfigSerializer(item);
  }
}

export function voiceGreetingConfigUnionDeserializer(item: any): VoiceGreetingConfigUnion {
  switch (item["type"]) {
    case "template":
      return templateVoiceGreetingConfigDeserializer(item as TemplateVoiceGreetingConfig);

    case "llm_generated":
      return llmGeneratedVoiceGreetingConfigDeserializer(item as LlmGeneratedVoiceGreetingConfig);

    default:
      return voiceGreetingConfigDeserializer(item);
  }
}

/** A deterministic greeting rendered with the voice agent's structured inputs and synthesized without model-authored generation. */
export interface TemplateVoiceGreetingConfig extends VoiceGreetingConfig {
  type: "template";
  /** The Handlebars text template spoken at session start. */
  text: string;
}

export function templateVoiceGreetingConfigSerializer(item: TemplateVoiceGreetingConfig): any {
  return { type: item["type"], text: item["text"] };
}

export function templateVoiceGreetingConfigDeserializer(item: any): TemplateVoiceGreetingConfig {
  return {
    type: item["type"],
    text: item["text"],
  };
}

/** A greeting authored by the session model from a scoped opening-turn prompt. */
export interface LlmGeneratedVoiceGreetingConfig extends VoiceGreetingConfig {
  type: "llm_generated";
  /** The Handlebars prompt that guides the opening turn. */
  prompt: string;
  /** The optional Handlebars text template synthesized when generation fails before any greeting output. */
  fallback_text?: string;
  /** The tool-selection policy for the opening response. Defaults to `none`. */
  tool_choice?: VoiceGreetingToolChoice;
}

export function llmGeneratedVoiceGreetingConfigSerializer(
  item: LlmGeneratedVoiceGreetingConfig,
): any {
  return {
    type: item["type"],
    prompt: item["prompt"],
    fallback_text: item["fallback_text"],
    tool_choice: item["tool_choice"],
  };
}

export function llmGeneratedVoiceGreetingConfigDeserializer(
  item: any,
): LlmGeneratedVoiceGreetingConfig {
  return {
    type: item["type"],
    prompt: item["prompt"],
    fallback_text: item["fallback_text"],
    tool_choice: item["tool_choice"],
  };
}

/** The tool-selection policy for an LLM-generated greeting. */
export type VoiceGreetingToolChoice = "none" | "auto" | "required";

/** The audio configuration for a voice agent. These values are session defaults and may be overridden when connecting. */
export interface VoiceAudioConfig {
  /** Input (microphone) audio configuration. */
  input?: VoiceAudioInputConfig;
  /** Output (agent speech) audio configuration. */
  output?: VoiceAudioOutputConfig;
}

export function voiceAudioConfigSerializer(item: VoiceAudioConfig): any {
  return {
    input: !item["input"] ? item["input"] : voiceAudioInputConfigSerializer(item["input"]),
    output: !item["output"] ? item["output"] : voiceAudioOutputConfigSerializer(item["output"]),
  };
}

export function voiceAudioConfigDeserializer(item: any): VoiceAudioConfig {
  return {
    input: !item["input"] ? item["input"] : voiceAudioInputConfigDeserializer(item["input"]),
    output: !item["output"] ? item["output"] : voiceAudioOutputConfigDeserializer(item["output"]),
  };
}

/** Input audio configuration for a voice agent. */
export interface VoiceAudioInputConfig {
  /** The input audio format. */
  format?: VoiceAudioFormat;
  /** Input noise reduction. Set to null to disable. */
  noise_reduction?: VoiceNoiseReduction;
  /** Turn (end-of-speech) detection. Server-side turn detection is enabled by default; set to null to disable it, in which case the client must trigger responses manually. */
  turn_detection?: VoiceTurnDetectionUnion;
  /** Asynchronous input-audio transcription. Set to null to disable transcription. */
  transcription?: VoiceInputTranscription;
}

export function voiceAudioInputConfigSerializer(item: VoiceAudioInputConfig): any {
  return {
    format: !item["format"] ? item["format"] : voiceAudioFormatSerializer(item["format"]),
    noise_reduction: !item["noise_reduction"]
      ? item["noise_reduction"]
      : voiceNoiseReductionSerializer(item["noise_reduction"]),
    turn_detection: !item["turn_detection"]
      ? item["turn_detection"]
      : voiceTurnDetectionUnionSerializer(item["turn_detection"]),
    transcription: !item["transcription"]
      ? item["transcription"]
      : voiceInputTranscriptionSerializer(item["transcription"]),
  };
}

export function voiceAudioInputConfigDeserializer(item: any): VoiceAudioInputConfig {
  return {
    format: !item["format"] ? item["format"] : voiceAudioFormatDeserializer(item["format"]),
    noise_reduction: !item["noise_reduction"]
      ? item["noise_reduction"]
      : voiceNoiseReductionDeserializer(item["noise_reduction"]),
    turn_detection: !item["turn_detection"]
      ? item["turn_detection"]
      : voiceTurnDetectionUnionDeserializer(item["turn_detection"]),
    transcription: !item["transcription"]
      ? item["transcription"]
      : voiceInputTranscriptionDeserializer(item["transcription"]),
  };
}

/** An audio format. Follows the OpenAI Realtime session schema; `type` carries the media subtype. */
export interface VoiceAudioFormat {
  /** The audio format type, e.g. 'audio/pcm' (16-bit PCM), 'audio/pcmu' (G.711 mu-law), or 'audio/pcma' (G.711 A-law). */
  type: VoiceAudioFormatType;
  /** The sample rate in Hz. Applies to 'audio/pcm' (e.g. 24000); omit for telephony G.711 formats (8 kHz). */
  rate?: number;
}

export function voiceAudioFormatSerializer(item: VoiceAudioFormat): any {
  return { type: item["type"], rate: item["rate"] };
}

export function voiceAudioFormatDeserializer(item: any): VoiceAudioFormat {
  return {
    type: item["type"],
    rate: item["rate"],
  };
}

/** The audio format type. Values follow the OpenAI Realtime wire schema and are exempt from the snake_case enum-value rule. */
export type VoiceAudioFormatType = "audio/pcm" | "audio/pcmu" | "audio/pcma";

/** Input audio noise reduction configuration. */
export interface VoiceNoiseReduction {
  /** The noise reduction mode. */
  type: VoiceNoiseReductionType;
}

export function voiceNoiseReductionSerializer(item: VoiceNoiseReduction): any {
  return { type: item["type"] };
}

export function voiceNoiseReductionDeserializer(item: any): VoiceNoiseReduction {
  return {
    type: item["type"],
  };
}

/** The input audio noise reduction mode. */
export type VoiceNoiseReductionType = "near_field" | "far_field" | "azure_deep_noise_suppression";

/** Turn-detection configuration for a voice agent. */
export interface VoiceTurnDetection {
  /** The turn-detection strategy. */
  /** The discriminator possible values: server_vad, semantic_vad, azure_semantic_vad, azure_semantic_vad_en, azure_semantic_vad_multilingual */
  type: VoiceTurnDetectionType;
}

export function voiceTurnDetectionSerializer(item: VoiceTurnDetection): any {
  return { type: item["type"] };
}

export function voiceTurnDetectionDeserializer(item: any): VoiceTurnDetection {
  return {
    type: item["type"],
  };
}

/** Alias for VoiceTurnDetectionUnion */
export type VoiceTurnDetectionUnion =
  | VoiceServerVadTurnDetection
  | VoiceSemanticVadTurnDetection
  | VoiceAzureSemanticVadTurnDetection
  | VoiceAzureSemanticVadEnTurnDetection
  | VoiceAzureSemanticVadMultilingualTurnDetection
  | VoiceTurnDetection;

export function voiceTurnDetectionUnionSerializer(item: VoiceTurnDetectionUnion): any {
  switch (item.type) {
    case "server_vad":
      return voiceServerVadTurnDetectionSerializer(item as VoiceServerVadTurnDetection);

    case "semantic_vad":
      return voiceSemanticVadTurnDetectionSerializer(item as VoiceSemanticVadTurnDetection);

    case "azure_semantic_vad":
      return voiceAzureSemanticVadTurnDetectionSerializer(
        item as VoiceAzureSemanticVadTurnDetection,
      );

    case "azure_semantic_vad_en":
      return voiceAzureSemanticVadEnTurnDetectionSerializer(
        item as VoiceAzureSemanticVadEnTurnDetection,
      );

    case "azure_semantic_vad_multilingual":
      return voiceAzureSemanticVadMultilingualTurnDetectionSerializer(
        item as VoiceAzureSemanticVadMultilingualTurnDetection,
      );

    default:
      return voiceTurnDetectionSerializer(item);
  }
}

export function voiceTurnDetectionUnionDeserializer(item: any): VoiceTurnDetectionUnion {
  switch (item["type"]) {
    case "server_vad":
      return voiceServerVadTurnDetectionDeserializer(item as VoiceServerVadTurnDetection);

    case "semantic_vad":
      return voiceSemanticVadTurnDetectionDeserializer(item as VoiceSemanticVadTurnDetection);

    case "azure_semantic_vad":
      return voiceAzureSemanticVadTurnDetectionDeserializer(
        item as VoiceAzureSemanticVadTurnDetection,
      );

    case "azure_semantic_vad_en":
      return voiceAzureSemanticVadEnTurnDetectionDeserializer(
        item as VoiceAzureSemanticVadEnTurnDetection,
      );

    case "azure_semantic_vad_multilingual":
      return voiceAzureSemanticVadMultilingualTurnDetectionDeserializer(
        item as VoiceAzureSemanticVadMultilingualTurnDetection,
      );

    default:
      return voiceTurnDetectionDeserializer(item);
  }
}

/** The turn-detection strategy. Additional values may be added over time. */
export type VoiceTurnDetectionType =
  | "server_vad"
  | "semantic_vad"
  | "azure_semantic_vad"
  | "azure_semantic_vad_en"
  | "azure_semantic_vad_multilingual";

/** Server-side voice activity detection. */
export interface VoiceServerVadTurnDetection extends VoiceTurnDetection {
  threshold?: number;
  prefix_padding_ms?: number;
  silence_duration_ms?: number;
  create_response?: boolean;
  interrupt_response?: boolean;
  idle_timeout_ms?: number;
  type: "server_vad";
}

export function voiceServerVadTurnDetectionSerializer(item: VoiceServerVadTurnDetection): any {
  return {
    type: item["type"],
    threshold: item["threshold"],
    prefix_padding_ms: item["prefix_padding_ms"],
    silence_duration_ms: item["silence_duration_ms"],
    create_response: item["create_response"],
    interrupt_response: item["interrupt_response"],
    idle_timeout_ms: item["idle_timeout_ms"],
  };
}

export function voiceServerVadTurnDetectionDeserializer(item: any): VoiceServerVadTurnDetection {
  return {
    type: item["type"],
    threshold: item["threshold"],
    prefix_padding_ms: item["prefix_padding_ms"],
    silence_duration_ms: item["silence_duration_ms"],
    create_response: item["create_response"],
    interrupt_response: item["interrupt_response"],
    idle_timeout_ms: item["idle_timeout_ms"],
  };
}

/** Semantic voice activity detection. */
export interface VoiceSemanticVadTurnDetection extends VoiceTurnDetection {
  eagerness?: "low" | "medium" | "high" | "auto";
  create_response?: boolean;
  interrupt_response?: boolean;
  type: "semantic_vad";
}

export function voiceSemanticVadTurnDetectionSerializer(item: VoiceSemanticVadTurnDetection): any {
  return {
    type: item["type"],
    eagerness: item["eagerness"],
    create_response: item["create_response"],
    interrupt_response: item["interrupt_response"],
  };
}

export function voiceSemanticVadTurnDetectionDeserializer(
  item: any,
): VoiceSemanticVadTurnDetection {
  return {
    type: item["type"],
    eagerness: item["eagerness"],
    create_response: item["create_response"],
    interrupt_response: item["interrupt_response"],
  };
}

/** Azure semantic voice activity detection. */
export interface VoiceAzureSemanticVadTurnDetection extends VoiceTurnDetection {
  type: "azure_semantic_vad";
  /** Activation threshold for voice activity detection, from 0 to 1. */
  threshold?: number;
  /** Audio to include before detected speech, in milliseconds. */
  prefix_padding_ms?: number;
  /** Silence required to end speech detection, in milliseconds. */
  silence_duration_ms?: number;
  /** Semantic end-of-utterance detection configuration. */
  end_of_utterance_detection?: VoiceEndOfUtteranceDetectionUnion;
  /** Minimum speech duration required to trigger detection, in milliseconds. */
  speech_duration_ms?: number;
  /** Whether filler words are removed from transcription. */
  remove_filler_words?: boolean;
  /** Whether the input audio buffer is truncated automatically when speech stops. */
  auto_truncate?: boolean;
  /** Whether a response is created automatically when speech stops. */
  create_response?: boolean;
  /** Whether user speech may interrupt the agent's response. */
  interrupt_response?: boolean;
  /** BCP-47 language codes used for speech detection. */
  languages?: string[];
}

export function voiceAzureSemanticVadTurnDetectionSerializer(
  item: VoiceAzureSemanticVadTurnDetection,
): any {
  return {
    type: item["type"],
    threshold: item["threshold"],
    prefix_padding_ms: item["prefix_padding_ms"],
    silence_duration_ms: item["silence_duration_ms"],
    end_of_utterance_detection: !item["end_of_utterance_detection"]
      ? item["end_of_utterance_detection"]
      : voiceEndOfUtteranceDetectionUnionSerializer(item["end_of_utterance_detection"]),
    speech_duration_ms: item["speech_duration_ms"],
    remove_filler_words: item["remove_filler_words"],
    auto_truncate: item["auto_truncate"],
    create_response: item["create_response"],
    interrupt_response: item["interrupt_response"],
    languages: !item["languages"]
      ? item["languages"]
      : item["languages"].map((p: any) => {
          return p;
        }),
  };
}

export function voiceAzureSemanticVadTurnDetectionDeserializer(
  item: any,
): VoiceAzureSemanticVadTurnDetection {
  return {
    type: item["type"],
    threshold: item["threshold"],
    prefix_padding_ms: item["prefix_padding_ms"],
    silence_duration_ms: item["silence_duration_ms"],
    end_of_utterance_detection: !item["end_of_utterance_detection"]
      ? item["end_of_utterance_detection"]
      : voiceEndOfUtteranceDetectionUnionDeserializer(item["end_of_utterance_detection"]),
    speech_duration_ms: item["speech_duration_ms"],
    remove_filler_words: item["remove_filler_words"],
    auto_truncate: item["auto_truncate"],
    create_response: item["create_response"],
    interrupt_response: item["interrupt_response"],
    languages: !item["languages"]
      ? item["languages"]
      : item["languages"].map((p: any) => {
          return p;
        }),
  };
}

/** Semantic end-of-utterance detection configuration. */
export interface VoiceEndOfUtteranceDetection {
  /** The semantic detection model. */
  /** The discriminator possible values: semantic_detection_v1, semantic_detection_v1_en, semantic_detection_v1_multilingual */
  model: VoiceEndOfUtteranceDetectionModel;
}

export function voiceEndOfUtteranceDetectionSerializer(item: VoiceEndOfUtteranceDetection): any {
  return { model: item["model"] };
}

export function voiceEndOfUtteranceDetectionDeserializer(item: any): VoiceEndOfUtteranceDetection {
  return {
    model: item["model"],
  };
}

/** Alias for VoiceEndOfUtteranceDetectionUnion */
export type VoiceEndOfUtteranceDetectionUnion =
  | VoiceAzureSemanticDetection
  | VoiceAzureSemanticDetectionEn
  | VoiceAzureSemanticDetectionMultilingual
  | VoiceEndOfUtteranceDetection;

export function voiceEndOfUtteranceDetectionUnionSerializer(
  item: VoiceEndOfUtteranceDetectionUnion,
): any {
  switch (item.model) {
    case "semantic_detection_v1":
      return voiceAzureSemanticDetectionSerializer(item as VoiceAzureSemanticDetection);

    case "semantic_detection_v1_en":
      return voiceAzureSemanticDetectionEnSerializer(item as VoiceAzureSemanticDetectionEn);

    case "semantic_detection_v1_multilingual":
      return voiceAzureSemanticDetectionMultilingualSerializer(
        item as VoiceAzureSemanticDetectionMultilingual,
      );

    default:
      return voiceEndOfUtteranceDetectionSerializer(item);
  }
}

export function voiceEndOfUtteranceDetectionUnionDeserializer(
  item: any,
): VoiceEndOfUtteranceDetectionUnion {
  switch (item["model"]) {
    case "semantic_detection_v1":
      return voiceAzureSemanticDetectionDeserializer(item as VoiceAzureSemanticDetection);

    case "semantic_detection_v1_en":
      return voiceAzureSemanticDetectionEnDeserializer(item as VoiceAzureSemanticDetectionEn);

    case "semantic_detection_v1_multilingual":
      return voiceAzureSemanticDetectionMultilingualDeserializer(
        item as VoiceAzureSemanticDetectionMultilingual,
      );

    default:
      return voiceEndOfUtteranceDetectionDeserializer(item);
  }
}

/** The semantic end-of-utterance detection model. */
export type VoiceEndOfUtteranceDetectionModel =
  "semantic_detection_v1" | "semantic_detection_v1_en" | "semantic_detection_v1_multilingual";

/** Default Azure semantic end-of-utterance detection. */
export interface VoiceAzureSemanticDetection extends VoiceEndOfUtteranceDetection {
  model: "semantic_detection_v1";
  /** The sensitivity threshold. */
  threshold_level?: VoiceEndOfUtteranceThresholdLevel;
  /** The detection timeout in milliseconds. */
  timeout_ms?: number;
}

export function voiceAzureSemanticDetectionSerializer(item: VoiceAzureSemanticDetection): any {
  return {
    model: item["model"],
    threshold_level: item["threshold_level"],
    timeout_ms: item["timeout_ms"],
  };
}

export function voiceAzureSemanticDetectionDeserializer(item: any): VoiceAzureSemanticDetection {
  return {
    model: item["model"],
    threshold_level: item["threshold_level"],
    timeout_ms: item["timeout_ms"],
  };
}

/** The sensitivity threshold for semantic end-of-utterance detection. */
export type VoiceEndOfUtteranceThresholdLevel = "low" | "medium" | "high" | "default";

/** English-optimized Azure semantic end-of-utterance detection. */
export interface VoiceAzureSemanticDetectionEn extends VoiceEndOfUtteranceDetection {
  model: "semantic_detection_v1_en";
  /** The sensitivity threshold. */
  threshold_level?: VoiceEndOfUtteranceThresholdLevel;
  /** The detection timeout in milliseconds. */
  timeout_ms?: number;
}

export function voiceAzureSemanticDetectionEnSerializer(item: VoiceAzureSemanticDetectionEn): any {
  return {
    model: item["model"],
    threshold_level: item["threshold_level"],
    timeout_ms: item["timeout_ms"],
  };
}

export function voiceAzureSemanticDetectionEnDeserializer(
  item: any,
): VoiceAzureSemanticDetectionEn {
  return {
    model: item["model"],
    threshold_level: item["threshold_level"],
    timeout_ms: item["timeout_ms"],
  };
}

/** Multilingual Azure semantic end-of-utterance detection. */
export interface VoiceAzureSemanticDetectionMultilingual extends VoiceEndOfUtteranceDetection {
  model: "semantic_detection_v1_multilingual";
  /** The sensitivity threshold. */
  threshold_level?: VoiceEndOfUtteranceThresholdLevel;
  /** The detection timeout in milliseconds. */
  timeout_ms?: number;
}

export function voiceAzureSemanticDetectionMultilingualSerializer(
  item: VoiceAzureSemanticDetectionMultilingual,
): any {
  return {
    model: item["model"],
    threshold_level: item["threshold_level"],
    timeout_ms: item["timeout_ms"],
  };
}

export function voiceAzureSemanticDetectionMultilingualDeserializer(
  item: any,
): VoiceAzureSemanticDetectionMultilingual {
  return {
    model: item["model"],
    threshold_level: item["threshold_level"],
    timeout_ms: item["timeout_ms"],
  };
}

/** English-optimized Azure semantic voice activity detection. */
export interface VoiceAzureSemanticVadEnTurnDetection extends VoiceTurnDetection {
  type: "azure_semantic_vad_en";
  /** Activation threshold for voice activity detection, from 0 to 1. */
  threshold?: number;
  /** Audio to include before detected speech, in milliseconds. */
  prefix_padding_ms?: number;
  /** Silence required to end speech detection, in milliseconds. */
  silence_duration_ms?: number;
  /** Semantic end-of-utterance detection configuration. */
  end_of_utterance_detection?: VoiceEndOfUtteranceDetectionUnion;
  /** Minimum speech duration required to trigger detection, in milliseconds. */
  speech_duration_ms?: number;
  /** Whether filler words are removed from transcription. */
  remove_filler_words?: boolean;
  /** Whether the input audio buffer is truncated automatically when speech stops. */
  auto_truncate?: boolean;
  /** Whether a response is created automatically when speech stops. */
  create_response?: boolean;
  /** Whether user speech may interrupt the agent's response. */
  interrupt_response?: boolean;
}

export function voiceAzureSemanticVadEnTurnDetectionSerializer(
  item: VoiceAzureSemanticVadEnTurnDetection,
): any {
  return {
    type: item["type"],
    threshold: item["threshold"],
    prefix_padding_ms: item["prefix_padding_ms"],
    silence_duration_ms: item["silence_duration_ms"],
    end_of_utterance_detection: !item["end_of_utterance_detection"]
      ? item["end_of_utterance_detection"]
      : voiceEndOfUtteranceDetectionUnionSerializer(item["end_of_utterance_detection"]),
    speech_duration_ms: item["speech_duration_ms"],
    remove_filler_words: item["remove_filler_words"],
    auto_truncate: item["auto_truncate"],
    create_response: item["create_response"],
    interrupt_response: item["interrupt_response"],
  };
}

export function voiceAzureSemanticVadEnTurnDetectionDeserializer(
  item: any,
): VoiceAzureSemanticVadEnTurnDetection {
  return {
    type: item["type"],
    threshold: item["threshold"],
    prefix_padding_ms: item["prefix_padding_ms"],
    silence_duration_ms: item["silence_duration_ms"],
    end_of_utterance_detection: !item["end_of_utterance_detection"]
      ? item["end_of_utterance_detection"]
      : voiceEndOfUtteranceDetectionUnionDeserializer(item["end_of_utterance_detection"]),
    speech_duration_ms: item["speech_duration_ms"],
    remove_filler_words: item["remove_filler_words"],
    auto_truncate: item["auto_truncate"],
    create_response: item["create_response"],
    interrupt_response: item["interrupt_response"],
  };
}

/** Multilingual Azure semantic voice activity detection. */
export interface VoiceAzureSemanticVadMultilingualTurnDetection extends VoiceTurnDetection {
  type: "azure_semantic_vad_multilingual";
  /** Activation threshold for voice activity detection, from 0 to 1. */
  threshold?: number;
  /** Audio to include before detected speech, in milliseconds. */
  prefix_padding_ms?: number;
  /** Silence required to end speech detection, in milliseconds. */
  silence_duration_ms?: number;
  /** Semantic end-of-utterance detection configuration. */
  end_of_utterance_detection?: VoiceEndOfUtteranceDetectionUnion;
  /** Minimum speech duration required to trigger detection, in milliseconds. */
  speech_duration_ms?: number;
  /** Whether filler words are removed from transcription. */
  remove_filler_words?: boolean;
  /** Whether the input audio buffer is truncated automatically when speech stops. */
  auto_truncate?: boolean;
  /** Whether a response is created automatically when speech stops. */
  create_response?: boolean;
  /** Whether user speech may interrupt the agent's response. */
  interrupt_response?: boolean;
  /** BCP-47 language codes used for speech detection. */
  languages?: string[];
}

export function voiceAzureSemanticVadMultilingualTurnDetectionSerializer(
  item: VoiceAzureSemanticVadMultilingualTurnDetection,
): any {
  return {
    type: item["type"],
    threshold: item["threshold"],
    prefix_padding_ms: item["prefix_padding_ms"],
    silence_duration_ms: item["silence_duration_ms"],
    end_of_utterance_detection: !item["end_of_utterance_detection"]
      ? item["end_of_utterance_detection"]
      : voiceEndOfUtteranceDetectionUnionSerializer(item["end_of_utterance_detection"]),
    speech_duration_ms: item["speech_duration_ms"],
    remove_filler_words: item["remove_filler_words"],
    auto_truncate: item["auto_truncate"],
    create_response: item["create_response"],
    interrupt_response: item["interrupt_response"],
    languages: !item["languages"]
      ? item["languages"]
      : item["languages"].map((p: any) => {
          return p;
        }),
  };
}

export function voiceAzureSemanticVadMultilingualTurnDetectionDeserializer(
  item: any,
): VoiceAzureSemanticVadMultilingualTurnDetection {
  return {
    type: item["type"],
    threshold: item["threshold"],
    prefix_padding_ms: item["prefix_padding_ms"],
    silence_duration_ms: item["silence_duration_ms"],
    end_of_utterance_detection: !item["end_of_utterance_detection"]
      ? item["end_of_utterance_detection"]
      : voiceEndOfUtteranceDetectionUnionDeserializer(item["end_of_utterance_detection"]),
    speech_duration_ms: item["speech_duration_ms"],
    remove_filler_words: item["remove_filler_words"],
    auto_truncate: item["auto_truncate"],
    create_response: item["create_response"],
    interrupt_response: item["interrupt_response"],
    languages: !item["languages"]
      ? item["languages"]
      : item["languages"].map((p: any) => {
          return p;
        }),
  };
}

/**
 * Asynchronous input-audio transcription configuration. Extends the OpenAI Realtime transcription
 * options with the Azure and MAI transcription models, custom speech models, and phrase hints.
 */
export interface VoiceInputTranscription {
  /**
   * The language of the input audio. Supplying the input language in
   *   [ISO-639-1](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) (e.g. `en`) format
   *   will improve accuracy and latency.
   */
  language?: string;
  /**
   * An optional text to guide the model's style or continue a previous audio
   *   segment.
   *   For `whisper-1`, the [prompt is a list of keywords](/docs/guides/speech-to-text#prompting).
   *   For `gpt-4o-transcribe` models (excluding `gpt-4o-transcribe-diarize`), the prompt is a free text string, for example "expect words related to technology".
   *   Prompt is not supported with `gpt-realtime-whisper` in GA Realtime sessions.
   */
  prompt?: string;
  /**
   * Controls how long the model waits before emitting transcription text.
   *   Higher values can improve transcription accuracy at the cost of latency.
   *   Only supported with `gpt-realtime-whisper` in GA Realtime sessions.
   */
  delay?: "minimal" | "low" | "medium" | "high" | "xhigh";
  /** The transcription model to use. */
  model: VoiceInputTranscriptionModel;
  /** Optional custom speech model configuration, keyed by locale. */
  custom_speech?: Record<string, string>;
  /** Optional phrase hints that bias recognition toward domain terms. */
  phrase_list?: string[];
}

export function voiceInputTranscriptionSerializer(item: VoiceInputTranscription): any {
  return {
    language: item["language"],
    prompt: item["prompt"],
    delay: item["delay"],
    model: item["model"],
    custom_speech: item["custom_speech"],
    phrase_list: !item["phrase_list"]
      ? item["phrase_list"]
      : item["phrase_list"].map((p: any) => {
          return p;
        }),
  };
}

export function voiceInputTranscriptionDeserializer(item: any): VoiceInputTranscription {
  return {
    language: item["language"],
    prompt: item["prompt"],
    delay: item["delay"],
    model: item["model"],
    custom_speech: !item["custom_speech"]
      ? item["custom_speech"]
      : Object.fromEntries(
          Object.entries(item["custom_speech"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    phrase_list: !item["phrase_list"]
      ? item["phrase_list"]
      : item["phrase_list"].map((p: any) => {
          return p;
        }),
  };
}

/**
 * The input-audio transcription model. Mirrors the transcription models supported by the managed
 * voice backend, covering the OpenAI Realtime transcription models plus the Azure and MAI models.
 * Additional values may be added over time.
 */
export type VoiceInputTranscriptionModel =
  | "whisper-1"
  | "gpt-realtime-whisper"
  | "gpt-4o-transcribe"
  | "gpt-4o-mini-transcribe"
  | "gpt-4o-transcribe-diarize"
  | "gpt-transcribe"
  | "gpt-live-transcribe"
  | "mai-transcribe"
  | "azure-speech";

/** Output audio configuration for a voice agent. */
export interface VoiceAudioOutputConfig {
  /** The output audio format. */
  format?: VoiceAudioFormat;
  /** The typed voice configuration. */
  voice?: VoiceAgentVoice;
  /**
   * The OpenAI-compatible speaking speed multiplier, from 0.25 to 1.5. Defaults to 1.
   * For Azure synthesized voices, use `voice.rate` instead.
   */
  speed?: number;
  /** Timestamp kinds to include with output audio. */
  output_audio_timestamp_types?: VoiceAudioTimestampType[];
}

export function voiceAudioOutputConfigSerializer(item: VoiceAudioOutputConfig): any {
  return {
    format: !item["format"] ? item["format"] : voiceAudioFormatSerializer(item["format"]),
    voice: !item["voice"] ? item["voice"] : voiceAgentVoiceSerializer(item["voice"]),
    speed: item["speed"],
    output_audio_timestamp_types: !item["output_audio_timestamp_types"]
      ? item["output_audio_timestamp_types"]
      : item["output_audio_timestamp_types"].map((p: any) => {
          return p;
        }),
  };
}

export function voiceAudioOutputConfigDeserializer(item: any): VoiceAudioOutputConfig {
  return {
    format: !item["format"] ? item["format"] : voiceAudioFormatDeserializer(item["format"]),
    voice: !item["voice"] ? item["voice"] : voiceAgentVoiceDeserializer(item["voice"]),
    speed: item["speed"],
    output_audio_timestamp_types: !item["output_audio_timestamp_types"]
      ? item["output_audio_timestamp_types"]
      : item["output_audio_timestamp_types"].map((p: any) => {
          return p;
        }),
  };
}

/** A typed voice configuration accepted by a voice agent. */
export type VoiceAgentVoice = OpenAIVoice | AzureVoiceUnion | AzureRealtimeNativeVoice;

export function voiceAgentVoiceSerializer(item: VoiceAgentVoice): any {
  return item;
}

export function voiceAgentVoiceDeserializer(item: any): VoiceAgentVoice {
  return item;
}

/** An output-audio timestamp kind supported by a voice agent. */
export type VoiceAudioTimestampType = "word";
/** An output modality the agent may produce. `animation` and `avatar` are used when an avatar is configured. */
export type VoiceOutputModality = "text" | "audio" | "animation" | "avatar";

/** Avatar configuration for a voice agent. These values are session defaults and may be overridden when connecting. */
export interface VoiceAvatarConfig {
  /** The avatar type. */
  type: VoiceAvatarType;
  /** The avatar character identifier, e.g. 'lisa'. */
  character: string;
  /** The avatar style, e.g. 'casual-sitting'. */
  style?: string;
  /** Whether the avatar is a customer-customized avatar. Defaults to false. */
  customized?: boolean;
  /** The transport used to deliver the avatar video stream. */
  output_protocol?: VoiceAvatarOutputProtocol;
}

export function voiceAvatarConfigSerializer(item: VoiceAvatarConfig): any {
  return {
    type: item["type"],
    character: item["character"],
    style: item["style"],
    customized: item["customized"],
    output_protocol: item["output_protocol"],
  };
}

export function voiceAvatarConfigDeserializer(item: any): VoiceAvatarConfig {
  return {
    type: item["type"],
    character: item["character"],
    style: item["style"],
    customized: item["customized"],
    output_protocol: item["output_protocol"],
  };
}

/** The avatar type. */
export type VoiceAvatarType = "video_avatar" | "photo_avatar";
/** The transport used to deliver the avatar video stream. */
export type VoiceAvatarOutputProtocol = "webrtc" | "websocket";

export function voiceAgentToolArraySerializer(result: Array<VoiceAgentTool>): any[] {
  return result.map((item) => {
    return voiceAgentToolSerializer(item);
  });
}

export function voiceAgentToolArrayDeserializer(result: Array<VoiceAgentTool>): any[] {
  return result.map((item) => {
    return voiceAgentToolDeserializer(item);
  });
}

/**
 * A tool usable by a voice agent. Supported kinds are native `function` tools (executed by the client), `mcp`,
 * service-managed `system` controls, and `toolbox` references. Server-side tools such as `web_search` and
 * `azure_ai_search` are provided through a toolbox.
 */
export type VoiceAgentTool =
  RealtimeFunctionTool | VoiceAgentMcpTool | VoiceSystemTool | VoiceToolboxTool;

export function voiceAgentToolSerializer(item: VoiceAgentTool): any {
  return item;
}

export function voiceAgentToolDeserializer(item: any): VoiceAgentTool {
  return item;
}

/** model interface RealtimeFunctionTool */
export interface RealtimeFunctionTool {
  /** The type of the tool, i.e. `function`. */
  type?: "function";
  /** The name of the function. */
  name?: string;
  /**
   * The description of the function, including guidance on when and how
   *   to call it, and guidance about what to tell the user when calling
   *   (if anything).
   */
  description?: string;
  /** Parameters of the function in JSON Schema. */
  parameters?: RealtimeFunctionToolParameters;
}

export function realtimeFunctionToolSerializer(item: RealtimeFunctionTool): any {
  return {
    type: item["type"],
    name: item["name"],
    description: item["description"],
    parameters: !item["parameters"]
      ? item["parameters"]
      : realtimeFunctionToolParametersSerializer(item["parameters"]),
  };
}

export function realtimeFunctionToolDeserializer(item: any): RealtimeFunctionTool {
  return {
    type: item["type"],
    name: item["name"],
    description: item["description"],
    parameters: !item["parameters"]
      ? item["parameters"]
      : realtimeFunctionToolParametersDeserializer(item["parameters"]),
  };
}

/** model interface RealtimeFunctionToolParameters */
export interface RealtimeFunctionToolParameters {}

export function realtimeFunctionToolParametersSerializer(
  _item: RealtimeFunctionToolParameters,
): any {
  return {};
}

export function realtimeFunctionToolParametersDeserializer(
  item: any,
): RealtimeFunctionToolParameters {
  return item;
}

/** An MCP tool available to a voice agent. */
export interface VoiceAgentMcpTool {
  /** The type of the MCP tool. Always `mcp`. */
  type: "mcp";
  /** A label for this MCP server, used to identify it in tool calls. */
  server_label: string;
  /** Optional description of the MCP server, used to provide more context. */
  server_description?: string;
  headers?: Record<string, string>;
  allowed_tools?: string[] | MCPToolFilter;
  allowed_callers?: CallableToolAllowedCaller[];
  require_approval?: MCPToolRequireApproval | "always" | "never";
  /** Whether this MCP tool is deferred and discovered via tool search. */
  defer_loading?: boolean;
  /** The connection ID in the project for the MCP server. The connection stores authentication and other connection details needed to connect to the MCP server. */
  project_connection_id?: string;
  /** Deprecated. This property is deprecated and will be removed in a future version. */
  tool_configs?: Record<string, ToolConfig>;
  /** The URL for the MCP server. */
  server_url?: string;
  /** When the MCP invocation creates a follow-up response. Defaults to `when_idle` so the agent continues after the tool call completes. */
  response_scheduling?: VoiceAgentMcpResponseScheduling;
}

export function voiceAgentMcpToolSerializer(item: VoiceAgentMcpTool): any {
  return {
    type: item["type"],
    server_label: item["server_label"],
    server_description: item["server_description"],
    headers: item["headers"],
    allowed_tools: !item["allowed_tools"]
      ? item["allowed_tools"]
      : _voiceAgentToolAllowedToolsSerializer(item["allowed_tools"]),
    allowed_callers: !item["allowed_callers"]
      ? item["allowed_callers"]
      : item["allowed_callers"].map((p: any) => {
          return p;
        }),
    require_approval: !item["require_approval"]
      ? item["require_approval"]
      : _voiceAgentToolRequireApprovalSerializer(item["require_approval"]),
    defer_loading: item["defer_loading"],
    project_connection_id: item["project_connection_id"],
    tool_configs: !item["tool_configs"]
      ? item["tool_configs"]
      : toolConfigRecordSerializer(item["tool_configs"]),
    server_url: item["server_url"],
    response_scheduling: item["response_scheduling"],
  };
}

export function voiceAgentMcpToolDeserializer(item: any): VoiceAgentMcpTool {
  return {
    type: item["type"],
    server_label: item["server_label"],
    server_description: item["server_description"],
    headers: !item["headers"]
      ? item["headers"]
      : Object.fromEntries(
          Object.entries(item["headers"]).map(([k1, p1]: [string, any]) => [k1, p1]),
        ),
    allowed_tools: !item["allowed_tools"]
      ? item["allowed_tools"]
      : _voiceAgentToolAllowedToolsDeserializer(item["allowed_tools"]),
    allowed_callers: !item["allowed_callers"]
      ? item["allowed_callers"]
      : item["allowed_callers"].map((p1: any) => {
          return p1;
        }),
    require_approval: !item["require_approval"]
      ? item["require_approval"]
      : _voiceAgentToolRequireApprovalDeserializer(item["require_approval"]),
    defer_loading: item["defer_loading"],
    project_connection_id: item["project_connection_id"],
    tool_configs: !item["tool_configs"]
      ? item["tool_configs"]
      : toolConfigRecordDeserializer(item["tool_configs"]),
    server_url: item["server_url"],
    response_scheduling: item["response_scheduling"],
  };
}

/** Alias for _VoiceAgentToolAllowedTools */
export type _VoiceAgentToolAllowedTools = string[] | MCPToolFilter;

export function _voiceAgentToolAllowedToolsSerializer(item: _VoiceAgentToolAllowedTools): any {
  return item;
}

export function _voiceAgentToolAllowedToolsDeserializer(item: any): _VoiceAgentToolAllowedTools {
  return item;
}

/** A filter object to specify which tools are allowed. */
export interface MCPToolFilter {
  /** List of allowed tool names. */
  tool_names?: string[];
  /**
   * Indicates whether or not a tool modifies data or is read-only. If an
   *   MCP server is [annotated with `readOnlyHint`](https://modelcontextprotocol.io/specification/2025-06-18/schema#toolannotations-readonlyhint),
   *   it will match this filter.
   */
  read_only?: boolean;
}

export function mcpToolFilterSerializer(item: MCPToolFilter): any {
  return {
    tool_names: !item["tool_names"]
      ? item["tool_names"]
      : item["tool_names"].map((p: any) => {
          return p;
        }),
    read_only: item["read_only"],
  };
}

export function mcpToolFilterDeserializer(item: any): MCPToolFilter {
  return {
    tool_names: !item["tool_names"]
      ? item["tool_names"]
      : item["tool_names"].map((p: any) => {
          return p;
        }),
    read_only: item["read_only"],
  };
}

/** Type of CallableToolAllowedCaller */
export type CallableToolAllowedCaller = "direct" | "programmatic";
/** Alias for _VoiceAgentToolRequireApproval */
export type _VoiceAgentToolRequireApproval = MCPToolRequireApproval | "always" | "never";

export function _voiceAgentToolRequireApprovalSerializer(
  item: _VoiceAgentToolRequireApproval,
): any {
  return item;
}

export function _voiceAgentToolRequireApprovalDeserializer(
  item: any,
): _VoiceAgentToolRequireApproval {
  return item;
}

/** model interface MCPToolRequireApproval */
export interface MCPToolRequireApproval {
  always?: MCPToolFilter;
  never?: MCPToolFilter;
}

export function mcpToolRequireApprovalSerializer(item: MCPToolRequireApproval): any {
  return {
    always: !item["always"] ? item["always"] : mcpToolFilterSerializer(item["always"]),
    never: !item["never"] ? item["never"] : mcpToolFilterSerializer(item["never"]),
  };
}

export function mcpToolRequireApprovalDeserializer(item: any): MCPToolRequireApproval {
  return {
    always: !item["always"] ? item["always"] : mcpToolFilterDeserializer(item["always"]),
    never: !item["never"] ? item["never"] : mcpToolFilterDeserializer(item["never"]),
  };
}

export function toolConfigRecordSerializer(item: Record<string, ToolConfig>): Record<string, any> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : toolConfigSerializer(item[key]);
  });
  return result;
}

export function toolConfigRecordDeserializer(
  item: Record<string, any>,
): Record<string, ToolConfig> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : toolConfigDeserializer(item[key]);
  });
  return result;
}

/** Per-tool configuration that controls tool visibility and search behavior. */
export interface ToolConfig {
  /**
   * When true, the tool is always included in agent context and visible in `tools/list`.
   * When false (default), the tool is hidden from `tools/list` and only discoverable via `tool_search`.
   */
  pin?: boolean;
  /**
   * Additional text indexed for tool_search. Supplements the native tool description
   * to improve discoverability. Does not alter `tools/list` output.
   */
  additional_search_text?: string;
}

export function toolConfigSerializer(item: ToolConfig): any {
  return { pin: item["pin"], additional_search_text: item["additional_search_text"] };
}

export function toolConfigDeserializer(item: any): ToolConfig {
  return {
    pin: item["pin"],
    additional_search_text: item["additional_search_text"],
  };
}

/** When an MCP invocation creates a follow-up response. Additional values may be added over time. */
export type VoiceAgentMcpResponseScheduling = "silent" | "when_idle" | "interrupt" | "skip_if_busy";

/** A service-managed control that acts on the active voice session without customer code or external authentication. */
export interface VoiceSystemTool {
  /** The type of the tool. Always `system`. */
  type: "system";
  /** The service-managed control action. Known values are stable; additional values may be added over time. */
  name: VoiceSystemToolName;
  /** An optional description of the system tool. */
  description?: string;
}

export function voiceSystemToolSerializer(item: VoiceSystemTool): any {
  return { type: item["type"], name: item["name"], description: item["description"] };
}

export function voiceSystemToolDeserializer(item: any): VoiceSystemTool {
  return {
    type: item["type"],
    name: item["name"],
    description: item["description"],
  };
}

/** A service-managed voice-session control action. Known values are stable; additional values may be added over time. */
export type VoiceSystemToolName = "end_conversation";

/** A reference to a Foundry toolbox, which is a versioned bundle of tools executed through its MCP endpoint. */
export interface VoiceToolboxTool {
  /** The type of the tool. Always `toolbox`. */
  type: "toolbox";
  /** The name of the toolbox to attach. */
  toolbox_name: string;
  /** The immutable version of the toolbox to attach. */
  toolbox_version: string;
}

export function voiceToolboxToolSerializer(item: VoiceToolboxTool): any {
  return {
    type: item["type"],
    toolbox_name: item["toolbox_name"],
    toolbox_version: item["toolbox_version"],
  };
}

export function voiceToolboxToolDeserializer(item: any): VoiceToolboxTool {
  return {
    type: item["type"],
    toolbox_name: item["toolbox_name"],
    toolbox_version: item["toolbox_version"],
  };
}

export function structuredInputDefinitionRecordSerializer(
  item: Record<string, StructuredInputDefinition>,
): Record<string, any> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : structuredInputDefinitionSerializer(item[key]);
  });
  return result;
}

export function structuredInputDefinitionRecordDeserializer(
  item: Record<string, any>,
): Record<string, StructuredInputDefinition> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : structuredInputDefinitionDeserializer(item[key]);
  });
  return result;
}

/** An structured input that can participate in prompt template substitutions and tool argument binding. */
export interface StructuredInputDefinition {
  /** A human-readable description of the input. */
  description?: string;
  /** The default value for the input if no run-time value is provided. */
  default_value?: any;
  /** The JSON schema for the structured input (optional). */
  schema?: Record<string, any>;
  /** Whether the input property is required when the agent is invoked. The service defaults to `false` if a value is not specified by the caller. */
  required?: boolean;
}

export function structuredInputDefinitionSerializer(item: StructuredInputDefinition): any {
  return {
    description: item["description"],
    default_value: item["default_value"],
    schema: item["schema"],
    required: item["required"],
  };
}

export function structuredInputDefinitionDeserializer(item: any): StructuredInputDefinition {
  return {
    description: item["description"],
    default_value: item["default_value"],
    schema: !item["schema"]
      ? item["schema"]
      : Object.fromEntries(Object.entries(item["schema"]).map(([k, p]: [string, any]) => [k, p])),
    required: item["required"],
  };
}

/** model interface AgentEndpointConfig */
export interface AgentEndpointConfig {
  /** The version selector of the agent endpoint determines how traffic is routed to different versions of the agent. */
  version_selector?: VersionSelector;
  /** Per-protocol configuration for the agent endpoint. */
  protocol_configuration?: ProtocolConfiguration;
  /** The authorization schemes supported by the agent endpoint */
  authorization_schemes?: AgentEndpointAuthorizationSchemeUnion[];
}

export function agentEndpointConfigSerializer(item: AgentEndpointConfig): any {
  return {
    version_selector: !item["version_selector"]
      ? item["version_selector"]
      : versionSelectorSerializer(item["version_selector"]),
    protocol_configuration: !item["protocol_configuration"]
      ? item["protocol_configuration"]
      : protocolConfigurationSerializer(item["protocol_configuration"]),
    authorization_schemes: !item["authorization_schemes"]
      ? item["authorization_schemes"]
      : agentEndpointAuthorizationSchemeUnionArraySerializer(item["authorization_schemes"]),
  };
}

export function agentEndpointConfigDeserializer(item: any): AgentEndpointConfig {
  return {
    version_selector: !item["version_selector"]
      ? item["version_selector"]
      : versionSelectorDeserializer(item["version_selector"]),
    protocol_configuration: !item["protocol_configuration"]
      ? item["protocol_configuration"]
      : protocolConfigurationDeserializer(item["protocol_configuration"]),
    authorization_schemes: !item["authorization_schemes"]
      ? item["authorization_schemes"]
      : agentEndpointAuthorizationSchemeUnionArrayDeserializer(item["authorization_schemes"]),
  };
}

/** model interface VersionSelector */
export interface VersionSelector {
  version_selection_rules: VersionSelectionRuleUnion[];
}

export function versionSelectorSerializer(item: VersionSelector): any {
  return {
    version_selection_rules: versionSelectionRuleUnionArraySerializer(
      item["version_selection_rules"],
    ),
  };
}

export function versionSelectorDeserializer(item: any): VersionSelector {
  return {
    version_selection_rules: versionSelectionRuleUnionArrayDeserializer(
      item["version_selection_rules"],
    ),
  };
}

export function versionSelectionRuleUnionArraySerializer(
  result: Array<VersionSelectionRuleUnion>,
): any[] {
  return result.map((item) => {
    return versionSelectionRuleUnionSerializer(item);
  });
}

export function versionSelectionRuleUnionArrayDeserializer(
  result: Array<VersionSelectionRuleUnion>,
): any[] {
  return result.map((item) => {
    return versionSelectionRuleUnionDeserializer(item);
  });
}

/** model interface VersionSelectionRule */
export interface VersionSelectionRule {
  type: VersionSelectorType;
  /** The agent version to route traffic to */
  agent_version: string;
}

export function versionSelectionRuleSerializer(item: VersionSelectionRule): any {
  return { type: item["type"], agent_version: item["agent_version"] };
}

export function versionSelectionRuleDeserializer(item: any): VersionSelectionRule {
  return {
    type: item["type"],
    agent_version: item["agent_version"],
  };
}

/** Alias for VersionSelectionRuleUnion */
export type VersionSelectionRuleUnion = FixedRatioVersionSelectionRule | VersionSelectionRule;

export function versionSelectionRuleUnionSerializer(item: VersionSelectionRuleUnion): any {
  switch (item.type) {
    case "FixedRatio":
      return fixedRatioVersionSelectionRuleSerializer(item as FixedRatioVersionSelectionRule);

    default:
      return versionSelectionRuleSerializer(item);
  }
}

export function versionSelectionRuleUnionDeserializer(item: any): VersionSelectionRuleUnion {
  switch (item["type"]) {
    case "FixedRatio":
      return fixedRatioVersionSelectionRuleDeserializer(item as FixedRatioVersionSelectionRule);

    default:
      return versionSelectionRuleDeserializer(item);
  }
}

/** Type of VersionSelectorType */
export type VersionSelectorType = "FixedRatio";

/** model interface FixedRatioVersionSelectionRule */
export interface FixedRatioVersionSelectionRule extends VersionSelectionRule {
  type: "FixedRatio";
  /** The percentage of traffic to route to the version. Must be between 0 and 100. */
  traffic_percentage: number;
}

export function fixedRatioVersionSelectionRuleSerializer(
  item: FixedRatioVersionSelectionRule,
): any {
  return {
    type: item["type"],
    agent_version: item["agent_version"],
    traffic_percentage: item["traffic_percentage"],
  };
}

export function fixedRatioVersionSelectionRuleDeserializer(
  item: any,
): FixedRatioVersionSelectionRule {
  return {
    type: item["type"],
    agent_version: item["agent_version"],
    traffic_percentage: item["traffic_percentage"],
  };
}

/** Per-protocol configuration for the agent endpoint. */
export interface ProtocolConfiguration {
  /** Configuration for the activity protocol. */
  activity?: ActivityProtocolConfiguration;
  /** Configuration for the responses protocol. */
  responses?: ResponsesProtocolConfiguration;
  /** Configuration for the A2A protocol. */
  a2a?: A2AProtocolConfiguration;
  /** Configuration for the MCP protocol. */
  mcp?: McpProtocolConfiguration;
  /** Configuration for the invocations protocol. */
  invocations?: InvocationsProtocolConfiguration;
  /** Configuration for the WebSocket-based invocations protocol. */
  invocations_ws?: InvocationsWsProtocolConfiguration;
}

export function protocolConfigurationSerializer(item: ProtocolConfiguration): any {
  return {
    activity: !item["activity"]
      ? item["activity"]
      : activityProtocolConfigurationSerializer(item["activity"]),
    responses: !item["responses"]
      ? item["responses"]
      : responsesProtocolConfigurationSerializer(item["responses"]),
    a2a: !item["a2a"] ? item["a2a"] : a2AProtocolConfigurationSerializer(item["a2a"]),
    mcp: !item["mcp"] ? item["mcp"] : mcpProtocolConfigurationSerializer(item["mcp"]),
    invocations: !item["invocations"]
      ? item["invocations"]
      : invocationsProtocolConfigurationSerializer(item["invocations"]),
    invocations_ws: !item["invocations_ws"]
      ? item["invocations_ws"]
      : invocationsWsProtocolConfigurationSerializer(item["invocations_ws"]),
  };
}

export function protocolConfigurationDeserializer(item: any): ProtocolConfiguration {
  return {
    activity: !item["activity"]
      ? item["activity"]
      : activityProtocolConfigurationDeserializer(item["activity"]),
    responses: !item["responses"]
      ? item["responses"]
      : responsesProtocolConfigurationDeserializer(item["responses"]),
    a2a: !item["a2a"] ? item["a2a"] : a2AProtocolConfigurationDeserializer(item["a2a"]),
    mcp: !item["mcp"] ? item["mcp"] : mcpProtocolConfigurationDeserializer(item["mcp"]),
    invocations: !item["invocations"]
      ? item["invocations"]
      : invocationsProtocolConfigurationDeserializer(item["invocations"]),
    invocations_ws: !item["invocations_ws"]
      ? item["invocations_ws"]
      : invocationsWsProtocolConfigurationDeserializer(item["invocations_ws"]),
  };
}

/** Configuration specific to the activity protocol. */
export interface ActivityProtocolConfiguration {
  /** Whether to enable the M365 public endpoint for the activity protocol. */
  enable_m365_public_endpoint?: boolean;
}

export function activityProtocolConfigurationSerializer(item: ActivityProtocolConfiguration): any {
  return { enable_m365_public_endpoint: item["enable_m365_public_endpoint"] };
}

export function activityProtocolConfigurationDeserializer(
  item: any,
): ActivityProtocolConfiguration {
  return {
    enable_m365_public_endpoint: item["enable_m365_public_endpoint"],
  };
}

/** Configuration specific to the responses protocol. */
export interface ResponsesProtocolConfiguration {}

export function responsesProtocolConfigurationSerializer(
  _item: ResponsesProtocolConfiguration,
): any {
  return {};
}

export function responsesProtocolConfigurationDeserializer(
  item: any,
): ResponsesProtocolConfiguration {
  return item;
}

/** Configuration specific to the A2A protocol. */
export interface A2AProtocolConfiguration {}

export function a2AProtocolConfigurationSerializer(_item: A2AProtocolConfiguration): any {
  return {};
}

export function a2AProtocolConfigurationDeserializer(item: any): A2AProtocolConfiguration {
  return item;
}

/** Configuration specific to the MCP protocol. */
export interface McpProtocolConfiguration {}

export function mcpProtocolConfigurationSerializer(_item: McpProtocolConfiguration): any {
  return {};
}

export function mcpProtocolConfigurationDeserializer(item: any): McpProtocolConfiguration {
  return item;
}

/** Configuration specific to the invocations protocol. */
export interface InvocationsProtocolConfiguration {}

export function invocationsProtocolConfigurationSerializer(
  _item: InvocationsProtocolConfiguration,
): any {
  return {};
}

export function invocationsProtocolConfigurationDeserializer(
  item: any,
): InvocationsProtocolConfiguration {
  return item;
}

/** Configuration specific to the WebSocket-based invocations protocol. */
export interface InvocationsWsProtocolConfiguration {}

export function invocationsWsProtocolConfigurationSerializer(
  _item: InvocationsWsProtocolConfiguration,
): any {
  return {};
}

export function invocationsWsProtocolConfigurationDeserializer(
  item: any,
): InvocationsWsProtocolConfiguration {
  return item;
}

export function agentEndpointAuthorizationSchemeUnionArraySerializer(
  result: Array<AgentEndpointAuthorizationSchemeUnion>,
): any[] {
  return result.map((item) => {
    return agentEndpointAuthorizationSchemeUnionSerializer(item);
  });
}

export function agentEndpointAuthorizationSchemeUnionArrayDeserializer(
  result: Array<AgentEndpointAuthorizationSchemeUnion>,
): any[] {
  return result.map((item) => {
    return agentEndpointAuthorizationSchemeUnionDeserializer(item);
  });
}

/** model interface AgentEndpointAuthorizationScheme */
export interface AgentEndpointAuthorizationScheme {
  type: AgentEndpointAuthorizationSchemeType;
}

export function agentEndpointAuthorizationSchemeSerializer(
  item: AgentEndpointAuthorizationScheme,
): any {
  return { type: item["type"] };
}

export function agentEndpointAuthorizationSchemeDeserializer(
  item: any,
): AgentEndpointAuthorizationScheme {
  return {
    type: item["type"],
  };
}

/** Alias for AgentEndpointAuthorizationSchemeUnion */
export type AgentEndpointAuthorizationSchemeUnion =
  | EntraAuthorizationScheme
  | BotServiceAuthorizationScheme
  | BotServiceRbacAuthorizationScheme
  | BotServiceTenantAuthorizationScheme
  | AgentEndpointAuthorizationScheme;

export function agentEndpointAuthorizationSchemeUnionSerializer(
  item: AgentEndpointAuthorizationSchemeUnion,
): any {
  switch (item.type) {
    case "Entra":
      return entraAuthorizationSchemeSerializer(item as EntraAuthorizationScheme);

    case "BotService":
      return botServiceAuthorizationSchemeSerializer(item as BotServiceAuthorizationScheme);

    case "BotServiceRbac":
      return botServiceRbacAuthorizationSchemeSerializer(item as BotServiceRbacAuthorizationScheme);

    case "BotServiceTenant":
      return botServiceTenantAuthorizationSchemeSerializer(
        item as BotServiceTenantAuthorizationScheme,
      );

    default:
      return agentEndpointAuthorizationSchemeSerializer(item);
  }
}

export function agentEndpointAuthorizationSchemeUnionDeserializer(
  item: any,
): AgentEndpointAuthorizationSchemeUnion {
  switch (item["type"]) {
    case "Entra":
      return entraAuthorizationSchemeDeserializer(item as EntraAuthorizationScheme);

    case "BotService":
      return botServiceAuthorizationSchemeDeserializer(item as BotServiceAuthorizationScheme);

    case "BotServiceRbac":
      return botServiceRbacAuthorizationSchemeDeserializer(
        item as BotServiceRbacAuthorizationScheme,
      );

    case "BotServiceTenant":
      return botServiceTenantAuthorizationSchemeDeserializer(
        item as BotServiceTenantAuthorizationScheme,
      );

    default:
      return agentEndpointAuthorizationSchemeDeserializer(item);
  }
}

/** Type of AgentEndpointAuthorizationSchemeType */
export type AgentEndpointAuthorizationSchemeType =
  "Entra" | "BotService" | "BotServiceRbac" | "BotServiceTenant";

/** model interface EntraAuthorizationScheme */
export interface EntraAuthorizationScheme extends AgentEndpointAuthorizationScheme {
  type: "Entra";
}

export function entraAuthorizationSchemeSerializer(item: EntraAuthorizationScheme): any {
  return { type: item["type"] };
}

export function entraAuthorizationSchemeDeserializer(item: any): EntraAuthorizationScheme {
  return {
    type: item["type"],
  };
}

/** model interface BotServiceAuthorizationScheme */
export interface BotServiceAuthorizationScheme extends AgentEndpointAuthorizationScheme {
  type: "BotService";
}

export function botServiceAuthorizationSchemeSerializer(item: BotServiceAuthorizationScheme): any {
  return { type: item["type"] };
}

export function botServiceAuthorizationSchemeDeserializer(
  item: any,
): BotServiceAuthorizationScheme {
  return {
    type: item["type"],
  };
}

/** model interface BotServiceRbacAuthorizationScheme */
export interface BotServiceRbacAuthorizationScheme extends AgentEndpointAuthorizationScheme {
  type: "BotServiceRbac";
}

export function botServiceRbacAuthorizationSchemeSerializer(
  item: BotServiceRbacAuthorizationScheme,
): any {
  return { type: item["type"] };
}

export function botServiceRbacAuthorizationSchemeDeserializer(
  item: any,
): BotServiceRbacAuthorizationScheme {
  return {
    type: item["type"],
  };
}

/** model interface BotServiceTenantAuthorizationScheme */
export interface BotServiceTenantAuthorizationScheme extends AgentEndpointAuthorizationScheme {
  type: "BotServiceTenant";
}

export function botServiceTenantAuthorizationSchemeSerializer(
  item: BotServiceTenantAuthorizationScheme,
): any {
  return { type: item["type"] };
}

export function botServiceTenantAuthorizationSchemeDeserializer(
  item: any,
): BotServiceTenantAuthorizationScheme {
  return {
    type: item["type"],
  };
}

/** model interface AgentCard */
export interface AgentCard {
  /** The version of the agent card. */
  version: string;
  /** The description of the agent card. */
  description?: string;
  /** The set of skills that an agent can perform. */
  skills: AgentCardSkill[];
}

export function agentCardSerializer(item: AgentCard): any {
  return {
    version: item["version"],
    description: item["description"],
    skills: agentCardSkillArraySerializer(item["skills"]),
  };
}

export function agentCardDeserializer(item: any): AgentCard {
  return {
    version: item["version"],
    description: item["description"],
    skills: agentCardSkillArrayDeserializer(item["skills"]),
  };
}

export function agentCardSkillArraySerializer(result: Array<AgentCardSkill>): any[] {
  return result.map((item) => {
    return agentCardSkillSerializer(item);
  });
}

export function agentCardSkillArrayDeserializer(result: Array<AgentCardSkill>): any[] {
  return result.map((item) => {
    return agentCardSkillDeserializer(item);
  });
}

/** model interface AgentCardSkill */
export interface AgentCardSkill {
  /** a unique identifier for the skill */
  id: string;
  /** The name of the skill */
  name: string;
  /** A description of the skill */
  description?: string;
  /** set of tagwords describing classes of capabilities for the skill */
  tags?: string[];
  /** A list of example scenarios that the skill can perform. */
  examples?: string[];
}

export function agentCardSkillSerializer(item: AgentCardSkill): any {
  return {
    id: item["id"],
    name: item["name"],
    description: item["description"],
    tags: !item["tags"]
      ? item["tags"]
      : item["tags"].map((p: any) => {
          return p;
        }),
    examples: !item["examples"]
      ? item["examples"]
      : item["examples"].map((p: any) => {
          return p;
        }),
  };
}

export function agentCardSkillDeserializer(item: any): AgentCardSkill {
  return {
    id: item["id"],
    name: item["name"],
    description: item["description"],
    tags: !item["tags"]
      ? item["tags"]
      : item["tags"].map((p: any) => {
          return p;
        }),
    examples: !item["examples"]
      ? item["examples"]
      : item["examples"].map((p: any) => {
          return p;
        }),
  };
}

/** A voice agent. Mirrors `AgentObject`, but its latest version is a `VoiceAgentVersionObject`. */
export interface VoiceAgentObject {
  /** The object type, which is always 'agent'. */
  object: "agent";
  /** The unique identifier of the agent. */
  id: string;
  /** The name of the agent. */
  name: string;
  /** The operational state of the agent. Controls whether the agent endpoint accepts or rejects requests. */
  readonly state: AgentState;
  /** The source of the agent's operational state. When the agent is disabled, indicates where the disabled state originates from. Empty when not derived from a specific source. */
  readonly state_source?: AgentStateSource;
  /** The endpoint configuration for the agent */
  agent_endpoint?: AgentEndpointConfig;
  /** The instance identity of the agent */
  readonly instance_identity?: AgentIdentity;
  /** The blueprint for the agent */
  readonly blueprint?: AgentIdentity;
  /** The blueprint for the agent */
  readonly blueprint_reference?: AgentBlueprintReferenceUnion;
  agent_card?: AgentCard;
  /** The latest version of the voice agent. */
  versions: {
    latest: VoiceAgentVersionObject;
  };
}

export function voiceAgentObjectDeserializer(item: any): VoiceAgentObject {
  return {
    object: item["object"],
    id: item["id"],
    name: item["name"],
    state: item["state"],
    state_source: item["state_source"],
    agent_endpoint: !item["agent_endpoint"]
      ? item["agent_endpoint"]
      : agentEndpointConfigDeserializer(item["agent_endpoint"]),
    instance_identity: !item["instance_identity"]
      ? item["instance_identity"]
      : agentIdentityDeserializer(item["instance_identity"]),
    blueprint: !item["blueprint"]
      ? item["blueprint"]
      : agentIdentityDeserializer(item["blueprint"]),
    blueprint_reference: !item["blueprint_reference"]
      ? item["blueprint_reference"]
      : agentBlueprintReferenceUnionDeserializer(item["blueprint_reference"]),
    agent_card: !item["agent_card"]
      ? item["agent_card"]
      : agentCardDeserializer(item["agent_card"]),
    versions: _voiceAgentObjectVersionsDeserializer(item["versions"]),
  };
}

/** Indicates the source of an agent's operational state. Empty when the state is not derived from a specific source. */
export type AgentStateSource = "agent_instance_identity" | "agent_blueprint";

/** model interface AgentIdentity */
export interface AgentIdentity {
  /** The principal ID of the agent instance */
  principal_id: string;
  /** The client ID of the agent instance. Also referred to as the instance ID */
  client_id: string;
  /** The status of the agent identity. Present for both the agent instance identity and the agent blueprint. */
  status?: AgentIdentityStatus;
}

export function agentIdentityDeserializer(item: any): AgentIdentity {
  return {
    principal_id: item["principal_id"],
    client_id: item["client_id"],
    status: item["status"],
  };
}

/** The status of an agent identity, applicable to both the agent instance identity and the agent blueprint. */
export type AgentIdentityStatus = "active" | "disabled";

/** model interface _VoiceAgentObjectVersions */
export interface _VoiceAgentObjectVersions {
  latest: VoiceAgentVersionObject;
}

export function _voiceAgentObjectVersionsDeserializer(item: any): _VoiceAgentObjectVersions {
  return {
    latest: voiceAgentVersionObjectDeserializer(item["latest"]),
  };
}

/** A voice agent version. Mirrors `AgentVersionObject`, but its `definition` is always a `VoiceAgentDefinition`. */
export interface VoiceAgentVersionObject {
  /**
   * Set of 16 key-value pairs that can be attached to an object. This can be
   * useful for storing additional information about the object in a structured
   * format, and querying for objects via API or the dashboard.
   *
   * Keys are strings with a maximum length of 64 characters. Values are strings
   * with a maximum length of 512 characters.
   */
  metadata: Record<string, string> | null;
  /** The object type, which is always 'agent.version'. */
  object: "agent.version";
  /** The unique identifier of the agent version. */
  id: string;
  /** The name of the agent. Name can be used to retrieve/update/delete the agent. */
  name: string;
  /** The version identifier of the agent. Agents are immutable and every update creates a new version while keeping the name same. */
  version: string;
  /** A human-readable description of the agent. */
  description?: string;
  /** The Unix timestamp (seconds) when the agent was created. */
  created_at: Date;
  /** Whether this agent version is a draft (candidate) rather than a release. Draft versions are recorded but excluded from default 'latest' resolution and are not auto-promoted. Defaults to false. */
  draft?: boolean;
  /** The provisioning status of the agent version. Defaults to 'active' for non-hosted agents. For hosted agents, reflects infrastructure readiness. */
  status?: AgentVersionStatus;
  /** The instance identity of the agent */
  readonly instance_identity?: AgentIdentity;
  /** The blueprint for the agent */
  readonly blueprint?: AgentIdentity;
  /** The blueprint for the agent */
  readonly blueprint_reference?: AgentBlueprintReferenceUnion;
  /** The unique GUID identifier of the agent. */
  readonly agent_guid?: string;
  /** The voice agent definition for this version. */
  definition: VoiceAgentDefinition;
}

export function voiceAgentVersionObjectDeserializer(item: any): VoiceAgentVersionObject {
  return {
    metadata: !item["metadata"]
      ? item["metadata"]
      : Object.fromEntries(
          Object.entries(item["metadata"]).map(([k1, p1]: [string, any]) => [k1, p1]),
        ),
    object: item["object"],
    id: item["id"],
    name: item["name"],
    version: item["version"],
    description: item["description"],
    created_at: new Date(item["created_at"] * 1000),
    draft: item["draft"],
    status: item["status"],
    instance_identity: !item["instance_identity"]
      ? item["instance_identity"]
      : agentIdentityDeserializer(item["instance_identity"]),
    blueprint: !item["blueprint"]
      ? item["blueprint"]
      : agentIdentityDeserializer(item["blueprint"]),
    blueprint_reference: !item["blueprint_reference"]
      ? item["blueprint_reference"]
      : agentBlueprintReferenceUnionDeserializer(item["blueprint_reference"]),
    agent_guid: item["agent_guid"],
    definition: voiceAgentDefinitionDeserializer(item["definition"]),
  };
}

/** The provisioning status of an agent version. */
export type AgentVersionStatus = "creating" | "active" | "failed" | "deleting" | "deleted";

/** The response data for a requested list of items. */
export interface _AgentsPagedResultVoiceAgentObject {
  /** The requested list of items. */
  data: VoiceAgentObject[];
  /** The first ID represented in this list. */
  first_id?: string;
  /** The last ID represented in this list. */
  last_id?: string;
  /** A value indicating whether there are additional values available not captured in this list. */
  has_more: boolean;
}

export function _agentsPagedResultVoiceAgentObjectDeserializer(
  item: any,
): _AgentsPagedResultVoiceAgentObject {
  return {
    data: voiceAgentObjectArrayDeserializer(item["data"]),
    first_id: item["first_id"],
    last_id: item["last_id"],
    has_more: item["has_more"],
  };
}

export function voiceAgentObjectArrayDeserializer(result: Array<VoiceAgentObject>): any[] {
  return result.map((item) => {
    return voiceAgentObjectDeserializer(item);
  });
}

/** The persona/tone a guided-authoring request steers the generated voice agent toward. */
export type VoiceAgentType = "personal" | "business";
/**
 * The scenario-template catalog entry a guided-authoring request specializes the generated voice agent for.
 * Extensible: additional use cases may be added over time.
 */
export type VoiceAgentUseCase =
  | "customer_support"
  | "reception"
  | "sales"
  | "travel_assistant"
  | "outreach"
  | "personal_assistant"
  | "learning"
  | "call_center"
  | "in_car";

/** The response data for a requested list of items. */
export interface _AgentsPagedResultVoiceAgentVersionObject {
  /** The requested list of items. */
  data: VoiceAgentVersionObject[];
  /** The first ID represented in this list. */
  first_id?: string;
  /** The last ID represented in this list. */
  last_id?: string;
  /** A value indicating whether there are additional values available not captured in this list. */
  has_more: boolean;
}

export function _agentsPagedResultVoiceAgentVersionObjectDeserializer(
  item: any,
): _AgentsPagedResultVoiceAgentVersionObject {
  return {
    data: voiceAgentVersionObjectArrayDeserializer(item["data"]),
    first_id: item["first_id"],
    last_id: item["last_id"],
    has_more: item["has_more"],
  };
}

export function voiceAgentVersionObjectArrayDeserializer(
  result: Array<VoiceAgentVersionObject>,
): any[] {
  return result.map((item) => {
    return voiceAgentVersionObjectDeserializer(item);
  });
}

/** The `conversation.item.create` client event. */
export interface VoiceAgentClientEventConversationItemCreate {
  /** Optional client-generated ID used to identify this event. */
  event_id?: string;
  /** The event type, must be `conversation.item.create`. */
  type: "conversation.item.create";
  /**
   * The ID of the preceding item after which the new item will be inserted. If not set, the new item will be appended to the end of the conversation.
   *   If set to `root`, the new item will be added to the beginning of the conversation.
   *   If set to an existing ID, it allows an item to be inserted mid-conversation. If the ID cannot be found, an error will be returned and the item will not be added.
   */
  previous_item_id?: string;
  /** The conversation item to create. */
  item: VoiceAgentCreateConversationItem;
}

export function voiceAgentClientEventConversationItemCreateSerializer(
  item: VoiceAgentClientEventConversationItemCreate,
): any {
  return {
    event_id: item["event_id"],
    type: item["type"],
    previous_item_id: item["previous_item_id"],
    item: voiceAgentCreateConversationItemSerializer(item["item"]),
  };
}

export function voiceAgentClientEventConversationItemCreateDeserializer(
  item: any,
): VoiceAgentClientEventConversationItemCreate {
  return {
    event_id: item["event_id"],
    type: item["type"],
    previous_item_id: item["previous_item_id"],
    item: voiceAgentCreateConversationItemDeserializer(item["item"]),
  };
}

/** A conversation item accepted by `conversation.item.create`. */
export type VoiceAgentCreateConversationItem =
  VoiceAgentRequestConversationItem | RealtimeMCPApprovalResponse;

export function voiceAgentCreateConversationItemSerializer(
  item: VoiceAgentCreateConversationItem,
): any {
  return item;
}

export function voiceAgentCreateConversationItemDeserializer(
  item: any,
): VoiceAgentCreateConversationItem {
  return item;
}

/** A conversation item accepted as inline response input. */
export type VoiceAgentRequestConversationItem =
  | RealtimeConversationItemMessageSystem
  | RealtimeConversationItemMessageUser
  | RealtimeConversationItemMessageAssistant
  | RealtimeConversationItemFunctionCall
  | RealtimeConversationItemFunctionCallOutput;

export function voiceAgentRequestConversationItemSerializer(
  item: VoiceAgentRequestConversationItem,
): any {
  return item;
}

export function voiceAgentRequestConversationItemDeserializer(
  item: any,
): VoiceAgentRequestConversationItem {
  return item;
}

/** A system message in a Realtime conversation can be used to provide additional context or instructions to the model. This is similar but distinct from the instruction prompt provided at the start of a conversation, as system messages can be added at any point in the conversation. For major changes to the conversation's behavior, use instructions, but for smaller updates (e.g. "the user is now asking about a different topic"), use system messages. */
export interface RealtimeConversationItemMessageSystem extends RealtimeConversationItemMessage {
  /** The unique ID of the item. This may be provided by the client or generated by the server. */
  id?: string;
  /** Identifier for the API object being returned - always `realtime.item`. Optional when creating a new item. */
  object?: "realtime.item";
  /** The type of the item. Always `message`. */
  type: "message";
  /** The status of the item. Has no effect on the conversation. */
  status?: "completed" | "incomplete" | "in_progress";
  /** The role of the message sender. Always `system`. */
  role: "system";
  /** The content of the message. */
  content: RealtimeConversationItemMessageSystemContent[];
}

export function realtimeConversationItemMessageSystemSerializer(
  item: RealtimeConversationItemMessageSystem,
): any {
  return {
    role: item["role"],
    id: item["id"],
    object: item["object"],
    type: item["type"],
    status: item["status"],
    content: realtimeConversationItemMessageSystemContentArraySerializer(item["content"]),
  };
}

export function realtimeConversationItemMessageSystemDeserializer(
  item: any,
): RealtimeConversationItemMessageSystem {
  return {
    role: item["role"],
    id: item["id"],
    object: item["object"],
    type: item["type"],
    status: item["status"],
    content: realtimeConversationItemMessageSystemContentArrayDeserializer(item["content"]),
  };
}

/** A user message item in a Realtime conversation. */
export interface RealtimeConversationItemMessageUser extends RealtimeConversationItemMessage {
  /** The unique ID of the item. This may be provided by the client or generated by the server. */
  id?: string;
  /** Identifier for the API object being returned - always `realtime.item`. Optional when creating a new item. */
  object?: "realtime.item";
  /** The type of the item. Always `message`. */
  type: "message";
  /** The status of the item. Has no effect on the conversation. */
  status?: "completed" | "incomplete" | "in_progress";
  /** The role of the message sender. Always `user`. */
  role: "user";
  /** The content of the message. */
  content: RealtimeConversationItemMessageUserContent[];
}

export function realtimeConversationItemMessageUserSerializer(
  item: RealtimeConversationItemMessageUser,
): any {
  return {
    role: item["role"],
    id: item["id"],
    object: item["object"],
    type: item["type"],
    status: item["status"],
    content: realtimeConversationItemMessageUserContentArraySerializer(item["content"]),
  };
}

export function realtimeConversationItemMessageUserDeserializer(
  item: any,
): RealtimeConversationItemMessageUser {
  return {
    role: item["role"],
    id: item["id"],
    object: item["object"],
    type: item["type"],
    status: item["status"],
    content: realtimeConversationItemMessageUserContentArrayDeserializer(item["content"]),
  };
}

/** An assistant message item in a Realtime conversation. */
export interface RealtimeConversationItemMessageAssistant extends RealtimeConversationItemMessage {
  /** The unique ID of the item. This may be provided by the client or generated by the server. */
  id?: string;
  /** Identifier for the API object being returned - always `realtime.item`. Optional when creating a new item. */
  object?: "realtime.item";
  /** The type of the item. Always `message`. */
  type: "message";
  /** The status of the item. Has no effect on the conversation. */
  status?: "completed" | "incomplete" | "in_progress";
  /** The role of the message sender. Always `assistant`. */
  role: "assistant";
  /** The content of the message. */
  content: RealtimeConversationItemMessageAssistantContent[];
}

export function realtimeConversationItemMessageAssistantSerializer(
  item: RealtimeConversationItemMessageAssistant,
): any {
  return {
    role: item["role"],
    id: item["id"],
    object: item["object"],
    type: item["type"],
    status: item["status"],
    content: realtimeConversationItemMessageAssistantContentArraySerializer(item["content"]),
  };
}

export function realtimeConversationItemMessageAssistantDeserializer(
  item: any,
): RealtimeConversationItemMessageAssistant {
  return {
    role: item["role"],
    id: item["id"],
    object: item["object"],
    type: item["type"],
    status: item["status"],
    content: realtimeConversationItemMessageAssistantContentArrayDeserializer(item["content"]),
  };
}

/** A function call item in a Realtime conversation. */
export interface RealtimeConversationItemFunctionCall extends RealtimeConversationItem {
  /** The unique ID of the item. This may be provided by the client or generated by the server. */
  id?: string;
  /** Identifier for the API object being returned - always `realtime.item`. Optional when creating a new item. */
  object?: "realtime.item";
  /** The type of the item. Always `function_call`. */
  type: "function_call";
  /** The status of the item. Has no effect on the conversation. */
  status?: "completed" | "incomplete" | "in_progress";
  /** The ID of the function call. */
  call_id?: string;
  /** The name of the function being called. */
  name: string;
  /** The arguments of the function call. This is a JSON-encoded string representing the arguments passed to the function, for example `{"arg1": "value1", "arg2": 42}`. */
  arguments: string;
}

export function realtimeConversationItemFunctionCallSerializer(
  item: RealtimeConversationItemFunctionCall,
): any {
  return {
    type: item["type"],
    id: item["id"],
    object: item["object"],
    status: item["status"],
    call_id: item["call_id"],
    name: item["name"],
    arguments: item["arguments"],
  };
}

export function realtimeConversationItemFunctionCallDeserializer(
  item: any,
): RealtimeConversationItemFunctionCall {
  return {
    type: item["type"],
    id: item["id"],
    object: item["object"],
    status: item["status"],
    call_id: item["call_id"],
    name: item["name"],
    arguments: item["arguments"],
  };
}

/** A function call output item in a Realtime conversation. */
export interface RealtimeConversationItemFunctionCallOutput extends RealtimeConversationItem {
  /** The unique ID of the item. This may be provided by the client or generated by the server. */
  id?: string;
  /** Identifier for the API object being returned - always `realtime.item`. Optional when creating a new item. */
  object?: "realtime.item";
  /** The type of the item. Always `function_call_output`. */
  type: "function_call_output";
  /** The status of the item. Has no effect on the conversation. */
  status?: "completed" | "incomplete" | "in_progress";
  /** The ID of the function call this output is for. */
  call_id: string;
  /** The output of the function call, this is free text and can contain any information or simply be empty. */
  output: string;
}

export function realtimeConversationItemFunctionCallOutputSerializer(
  item: RealtimeConversationItemFunctionCallOutput,
): any {
  return {
    type: item["type"],
    id: item["id"],
    object: item["object"],
    status: item["status"],
    call_id: item["call_id"],
    output: item["output"],
  };
}

export function realtimeConversationItemFunctionCallOutputDeserializer(
  item: any,
): RealtimeConversationItemFunctionCallOutput {
  return {
    type: item["type"],
    id: item["id"],
    object: item["object"],
    status: item["status"],
    call_id: item["call_id"],
    output: item["output"],
  };
}

/** A Realtime item responding to an MCP approval request. */
export interface RealtimeMCPApprovalResponse extends RealtimeConversationItem {
  /** The type of the item. Always `mcp_approval_response`. */
  type: "mcp_approval_response";
  /** The unique ID of the approval response. */
  id: string;
  /** The ID of the approval request being answered. */
  approval_request_id: string;
  /** Whether the request was approved. */
  approve: boolean;
  reason?: string;
}

export function realtimeMCPApprovalResponseSerializer(item: RealtimeMCPApprovalResponse): any {
  return {
    type: item["type"],
    id: item["id"],
    approval_request_id: item["approval_request_id"],
    approve: item["approve"],
    reason: item["reason"],
  };
}

export function realtimeMCPApprovalResponseDeserializer(item: any): RealtimeMCPApprovalResponse {
  return {
    type: item["type"],
    id: item["id"],
    approval_request_id: item["approval_request_id"],
    approve: item["approve"],
    reason: item["reason"],
  };
}

/** model interface RealtimeConversationItemMessage */
export interface RealtimeConversationItemMessage {
  role: RealtimeConversationItemMessageType;
}

export function realtimeConversationItemMessageSerializer(
  item: RealtimeConversationItemMessage,
): any {
  return { role: item["role"] };
}

export function realtimeConversationItemMessageDeserializer(
  item: any,
): RealtimeConversationItemMessage {
  return {
    role: item["role"],
  };
}

/** Alias for RealtimeConversationItemMessageUnion */
export type RealtimeConversationItemMessageUnion =
  | RealtimeConversationItemMessageSystem
  | RealtimeConversationItemMessageUser
  | RealtimeConversationItemMessageAssistant
  | RealtimeConversationItemMessage;

export function realtimeConversationItemMessageUnionSerializer(
  item: RealtimeConversationItemMessageUnion,
): any {
  switch (item.role) {
    case "system":
      return realtimeConversationItemMessageSystemSerializer(
        item as RealtimeConversationItemMessageSystem,
      );

    case "user":
      return realtimeConversationItemMessageUserSerializer(
        item as RealtimeConversationItemMessageUser,
      );

    case "assistant":
      return realtimeConversationItemMessageAssistantSerializer(
        item as RealtimeConversationItemMessageAssistant,
      );

    default:
      return realtimeConversationItemMessageSerializer(item);
  }
}

export function realtimeConversationItemMessageUnionDeserializer(
  item: any,
): RealtimeConversationItemMessageUnion {
  switch (item["role"]) {
    case "system":
      return realtimeConversationItemMessageSystemDeserializer(
        item as RealtimeConversationItemMessageSystem,
      );

    case "user":
      return realtimeConversationItemMessageUserDeserializer(
        item as RealtimeConversationItemMessageUser,
      );

    case "assistant":
      return realtimeConversationItemMessageAssistantDeserializer(
        item as RealtimeConversationItemMessageAssistant,
      );

    default:
      return realtimeConversationItemMessageDeserializer(item);
  }
}

/** A single item within a Realtime conversation. */
export interface RealtimeConversationItem {
  type: RealtimeConversationItemType;
}

export function realtimeConversationItemSerializer(item: RealtimeConversationItem): any {
  return { type: item["type"] };
}

export function realtimeConversationItemDeserializer(item: any): RealtimeConversationItem {
  return {
    type: item["type"],
  };
}

/** Alias for RealtimeConversationItemUnion */
export type RealtimeConversationItemUnion =
  | RealtimeConversationItemFunctionCall
  | RealtimeConversationItemFunctionCallOutput
  | RealtimeMCPListTools
  | RealtimeMCPToolCall
  | RealtimeMCPApprovalRequest
  | RealtimeMCPApprovalResponse
  | RealtimeConversationItem;

export function realtimeConversationItemUnionSerializer(item: RealtimeConversationItemUnion): any {
  switch (item.type) {
    case "function_call":
      return realtimeConversationItemFunctionCallSerializer(
        item as RealtimeConversationItemFunctionCall,
      );

    case "function_call_output":
      return realtimeConversationItemFunctionCallOutputSerializer(
        item as RealtimeConversationItemFunctionCallOutput,
      );

    case "mcp_list_tools":
      return realtimeMCPListToolsSerializer(item as RealtimeMCPListTools);

    case "mcp_call":
      return realtimeMCPToolCallSerializer(item as RealtimeMCPToolCall);

    case "mcp_approval_request":
      return realtimeMCPApprovalRequestSerializer(item as RealtimeMCPApprovalRequest);

    case "mcp_approval_response":
      return realtimeMCPApprovalResponseSerializer(item as RealtimeMCPApprovalResponse);

    default:
      return realtimeConversationItemSerializer(item);
  }
}

export function realtimeConversationItemUnionDeserializer(
  item: any,
): RealtimeConversationItemUnion {
  switch (item["type"]) {
    case "function_call":
      return realtimeConversationItemFunctionCallDeserializer(
        item as RealtimeConversationItemFunctionCall,
      );

    case "function_call_output":
      return realtimeConversationItemFunctionCallOutputDeserializer(
        item as RealtimeConversationItemFunctionCallOutput,
      );

    case "mcp_list_tools":
      return realtimeMCPListToolsDeserializer(item as RealtimeMCPListTools);

    case "mcp_call":
      return realtimeMCPToolCallDeserializer(item as RealtimeMCPToolCall);

    case "mcp_approval_request":
      return realtimeMCPApprovalRequestDeserializer(item as RealtimeMCPApprovalRequest);

    case "mcp_approval_response":
      return realtimeMCPApprovalResponseDeserializer(item as RealtimeMCPApprovalResponse);

    default:
      return realtimeConversationItemDeserializer(item);
  }
}

/** Type of RealtimeConversationItemType */
export type RealtimeConversationItemType =
  | "function_call"
  | "function_call_output"
  | "mcp_approval_response"
  | "mcp_list_tools"
  | "mcp_call"
  | "mcp_approval_request";

/** A Realtime item listing tools available on an MCP server. */
export interface RealtimeMCPListTools extends RealtimeConversationItem {
  /** The type of the item. Always `mcp_list_tools`. */
  type: "mcp_list_tools";
  /** The unique ID of the list. */
  id?: string;
  /** The label of the MCP server. */
  server_label: string;
  /** The tools available on the server. */
  tools: MCPListToolsTool[];
}

export function realtimeMCPListToolsSerializer(item: RealtimeMCPListTools): any {
  return {
    type: item["type"],
    id: item["id"],
    server_label: item["server_label"],
    tools: mcpListToolsToolArraySerializer(item["tools"]),
  };
}

export function realtimeMCPListToolsDeserializer(item: any): RealtimeMCPListTools {
  return {
    type: item["type"],
    id: item["id"],
    server_label: item["server_label"],
    tools: mcpListToolsToolArrayDeserializer(item["tools"]),
  };
}

/** A Realtime item representing an invocation of a tool on an MCP server. */
export interface RealtimeMCPToolCall extends RealtimeConversationItem {
  /** The type of the item. Always `mcp_call`. */
  type: "mcp_call";
  /** The unique ID of the tool call. */
  id: string;
  /** The label of the MCP server running the tool. */
  server_label: string;
  /** The name of the tool that was run. */
  name: string;
  /** A JSON string of the arguments passed to the tool. */
  arguments: string;
  approval_request_id?: string;
  output?: string;
  error?: RealtimeMCPErrorUnion;
}

export function realtimeMCPToolCallSerializer(item: RealtimeMCPToolCall): any {
  return {
    type: item["type"],
    id: item["id"],
    server_label: item["server_label"],
    name: item["name"],
    arguments: item["arguments"],
    approval_request_id: item["approval_request_id"],
    output: item["output"],
    error: !item["error"] ? item["error"] : realtimeMCPErrorUnionSerializer(item["error"]),
  };
}

export function realtimeMCPToolCallDeserializer(item: any): RealtimeMCPToolCall {
  return {
    type: item["type"],
    id: item["id"],
    server_label: item["server_label"],
    name: item["name"],
    arguments: item["arguments"],
    approval_request_id: item["approval_request_id"],
    output: item["output"],
    error: !item["error"] ? item["error"] : realtimeMCPErrorUnionDeserializer(item["error"]),
  };
}

/** A Realtime item requesting human approval of a tool invocation. */
export interface RealtimeMCPApprovalRequest extends RealtimeConversationItem {
  /** The type of the item. Always `mcp_approval_request`. */
  type: "mcp_approval_request";
  /** The unique ID of the approval request. */
  id: string;
  /** The label of the MCP server making the request. */
  server_label: string;
  /** The name of the tool to run. */
  name: string;
  /** A JSON string of arguments for the tool. */
  arguments: string;
}

export function realtimeMCPApprovalRequestSerializer(item: RealtimeMCPApprovalRequest): any {
  return {
    type: item["type"],
    id: item["id"],
    server_label: item["server_label"],
    name: item["name"],
    arguments: item["arguments"],
  };
}

export function realtimeMCPApprovalRequestDeserializer(item: any): RealtimeMCPApprovalRequest {
  return {
    type: item["type"],
    id: item["id"],
    server_label: item["server_label"],
    name: item["name"],
    arguments: item["arguments"],
  };
}

/** The `conversation.item.delete` client event. */
export interface VoiceAgentClientEventConversationItemDelete {
  /** Optional client-generated ID used to identify this event. */
  event_id?: string;
  /** The event type, must be `conversation.item.delete`. */
  type: "conversation.item.delete";
  /** The ID of the item to delete. */
  item_id: string;
}

export function voiceAgentClientEventConversationItemDeleteSerializer(
  item: VoiceAgentClientEventConversationItemDelete,
): any {
  return { event_id: item["event_id"], type: item["type"], item_id: item["item_id"] };
}

export function voiceAgentClientEventConversationItemDeleteDeserializer(
  item: any,
): VoiceAgentClientEventConversationItemDelete {
  return {
    event_id: item["event_id"],
    type: item["type"],
    item_id: item["item_id"],
  };
}

/** The `conversation.item.retrieve` client event. */
export interface VoiceAgentClientEventConversationItemRetrieve {
  /** Optional client-generated ID used to identify this event. */
  event_id?: string;
  /** The event type, must be `conversation.item.retrieve`. */
  type: "conversation.item.retrieve";
  /** The ID of the item to retrieve. */
  item_id: string;
}

export function voiceAgentClientEventConversationItemRetrieveSerializer(
  item: VoiceAgentClientEventConversationItemRetrieve,
): any {
  return { event_id: item["event_id"], type: item["type"], item_id: item["item_id"] };
}

export function voiceAgentClientEventConversationItemRetrieveDeserializer(
  item: any,
): VoiceAgentClientEventConversationItemRetrieve {
  return {
    event_id: item["event_id"],
    type: item["type"],
    item_id: item["item_id"],
  };
}

/** The `conversation.item.truncate` client event. */
export interface VoiceAgentClientEventConversationItemTruncate {
  /** Optional client-generated ID used to identify this event. */
  event_id?: string;
  /** The event type, must be `conversation.item.truncate`. */
  type: "conversation.item.truncate";
  /**
   * The ID of the assistant message item to truncate. Only assistant message
   *   items can be truncated.
   */
  item_id: string;
  /** The index of the content part to truncate. Set this to `0`. */
  content_index: number;
  /**
   * Inclusive duration up to which audio is truncated, in milliseconds. If
   *   the audio_end_ms is greater than the actual audio duration, the server
   *   will respond with an error.
   */
  audio_end_ms: number;
}

export function voiceAgentClientEventConversationItemTruncateSerializer(
  item: VoiceAgentClientEventConversationItemTruncate,
): any {
  return {
    event_id: item["event_id"],
    type: item["type"],
    item_id: item["item_id"],
    content_index: item["content_index"],
    audio_end_ms: item["audio_end_ms"],
  };
}

export function voiceAgentClientEventConversationItemTruncateDeserializer(
  item: any,
): VoiceAgentClientEventConversationItemTruncate {
  return {
    event_id: item["event_id"],
    type: item["type"],
    item_id: item["item_id"],
    content_index: item["content_index"],
    audio_end_ms: item["audio_end_ms"],
  };
}

/** The `input_audio_buffer.append` client event. */
export interface VoiceAgentClientEventInputAudioBufferAppend {
  /** Optional client-generated ID used to identify this event. */
  event_id?: string;
  /** The event type, must be `input_audio_buffer.append`. */
  type: "input_audio_buffer.append";
  /**
   * Base64-encoded audio bytes. This must be in the format specified by the
   *   `input_audio_format` field in the session configuration.
   */
  audio: string;
}

export function voiceAgentClientEventInputAudioBufferAppendSerializer(
  item: VoiceAgentClientEventInputAudioBufferAppend,
): any {
  return { event_id: item["event_id"], type: item["type"], audio: item["audio"] };
}

export function voiceAgentClientEventInputAudioBufferAppendDeserializer(
  item: any,
): VoiceAgentClientEventInputAudioBufferAppend {
  return {
    event_id: item["event_id"],
    type: item["type"],
    audio: item["audio"],
  };
}

/** The `input_audio_buffer.clear` client event. */
export interface VoiceAgentClientEventInputAudioBufferClear {
  /** Optional client-generated ID used to identify this event. */
  event_id?: string;
  /** The event type, must be `input_audio_buffer.clear`. */
  type: "input_audio_buffer.clear";
}

export function voiceAgentClientEventInputAudioBufferClearSerializer(
  item: VoiceAgentClientEventInputAudioBufferClear,
): any {
  return { event_id: item["event_id"], type: item["type"] };
}

export function voiceAgentClientEventInputAudioBufferClearDeserializer(
  item: any,
): VoiceAgentClientEventInputAudioBufferClear {
  return {
    event_id: item["event_id"],
    type: item["type"],
  };
}

/** The `input_audio_buffer.commit` client event. */
export interface VoiceAgentClientEventInputAudioBufferCommit {
  /** Optional client-generated ID used to identify this event. */
  event_id?: string;
  /** The event type, must be `input_audio_buffer.commit`. */
  type: "input_audio_buffer.commit";
}

export function voiceAgentClientEventInputAudioBufferCommitSerializer(
  item: VoiceAgentClientEventInputAudioBufferCommit,
): any {
  return { event_id: item["event_id"], type: item["type"] };
}

export function voiceAgentClientEventInputAudioBufferCommitDeserializer(
  item: any,
): VoiceAgentClientEventInputAudioBufferCommit {
  return {
    event_id: item["event_id"],
    type: item["type"],
  };
}

/** The `output_audio_buffer.clear` client event. */
export interface VoiceAgentClientEventOutputAudioBufferClear {
  /** The unique ID of the client event used for error handling. */
  event_id?: string;
  /** The event type, must be `output_audio_buffer.clear`. */
  type: "output_audio_buffer.clear";
}

export function voiceAgentClientEventOutputAudioBufferClearSerializer(
  item: VoiceAgentClientEventOutputAudioBufferClear,
): any {
  return { event_id: item["event_id"], type: item["type"] };
}

export function voiceAgentClientEventOutputAudioBufferClearDeserializer(
  item: any,
): VoiceAgentClientEventOutputAudioBufferClear {
  return {
    event_id: item["event_id"],
    type: item["type"],
  };
}

/** The `response.cancel` client event. */
export interface VoiceAgentClientEventResponseCancel {
  /** Optional client-generated ID used to identify this event. */
  event_id?: string;
  /** The event type, must be `response.cancel`. */
  type: "response.cancel";
  /**
   * A specific response ID to cancel - if not provided, will cancel an
   *   in-progress response in the default conversation.
   */
  response_id?: string;
}

export function voiceAgentClientEventResponseCancelSerializer(
  item: VoiceAgentClientEventResponseCancel,
): any {
  return { event_id: item["event_id"], type: item["type"], response_id: item["response_id"] };
}

export function voiceAgentClientEventResponseCancelDeserializer(
  item: any,
): VoiceAgentClientEventResponseCancel {
  return {
    event_id: item["event_id"],
    type: item["type"],
    response_id: item["response_id"],
  };
}

/** Output-audio settings accepted in a stable voice-agent session. */
export interface VoiceAgentSessionUpdateAudioOutput {
  /** The output audio format. */
  format?: VoiceAudioFormat;
  /** The typed voice configuration. */
  voice?: VoiceAgentVoice;
  /** Timestamp kinds to include with output audio. */
  output_audio_timestamp_types?: VoiceAudioTimestampType[];
  /** The speaking-speed multiplier. */
  speed?: number;
}

export function voiceAgentSessionUpdateAudioOutputSerializer(
  item: VoiceAgentSessionUpdateAudioOutput,
): any {
  return {
    format: !item["format"] ? item["format"] : voiceAudioFormatSerializer(item["format"]),
    voice: !item["voice"] ? item["voice"] : voiceAgentVoiceSerializer(item["voice"]),
    output_audio_timestamp_types: !item["output_audio_timestamp_types"]
      ? item["output_audio_timestamp_types"]
      : item["output_audio_timestamp_types"].map((p: any) => {
          return p;
        }),
    speed: item["speed"],
  };
}

export function voiceAgentSessionUpdateAudioOutputDeserializer(
  item: any,
): VoiceAgentSessionUpdateAudioOutput {
  return {
    format: !item["format"] ? item["format"] : voiceAudioFormatDeserializer(item["format"]),
    voice: !item["voice"] ? item["voice"] : voiceAgentVoiceDeserializer(item["voice"]),
    output_audio_timestamp_types: !item["output_audio_timestamp_types"]
      ? item["output_audio_timestamp_types"]
      : item["output_audio_timestamp_types"].map((p: any) => {
          return p;
        }),
    speed: item["speed"],
  };
}

/** The `response.create` client event. */
export interface VoiceAgentClientEventResponseCreate {
  /** Optional client-generated ID used to identify this event. */
  event_id?: string;
  /** The event type, must be `response.create`. */
  type: "response.create";
  /** Parameters for the new response. */
  response?: VoiceAgentResponseCreateParams;
}

export function voiceAgentClientEventResponseCreateSerializer(
  item: VoiceAgentClientEventResponseCreate,
): any {
  return {
    event_id: item["event_id"],
    type: item["type"],
    response: !item["response"]
      ? item["response"]
      : voiceAgentResponseCreateParamsSerializer(item["response"]),
  };
}

export function voiceAgentClientEventResponseCreateDeserializer(
  item: any,
): VoiceAgentClientEventResponseCreate {
  return {
    event_id: item["event_id"],
    type: item["type"],
    response: !item["response"]
      ? item["response"]
      : voiceAgentResponseCreateParamsDeserializer(item["response"]),
  };
}

/** Parameters accepted by a voice-agent `response.create` event. */
export interface VoiceAgentResponseCreateParams {
  /**
   * The default system instructions (i.e. system message) prepended to model calls. This field allows the client to guide the model on desired responses. The model can be instructed on response content and format, (e.g. "be extremely succinct", "act friendly", "here are examples of good responses") and on audio behavior (e.g. "talk quickly", "inject emotion into your voice", "laugh frequently"). The instructions are not guaranteed to be followed by the model, but they provide guidance to the model on the desired behavior.
   *   Note that the server sets default instructions which will be used if this field is not set and are visible in the `session.created` event at the start of the session.
   */
  instructions?: string;
  /** Tools available to the model. */
  tools?: (RealtimeFunctionTool | MCPTool)[];
  /**
   * How the model chooses tools. Provide one of the string modes or force a specific
   *   function/MCP tool.
   */
  tool_choice?: ToolChoiceOptions | ToolChoiceFunction | ToolChoiceMCP;
  /**
   * Whether the model may call multiple tools in parallel. Only supported by
   *   reasoning Realtime models such as `gpt-realtime-2`.
   */
  parallel_tool_calls?: boolean;
  reasoning?: RealtimeReasoning;
  /**
   * Maximum number of output tokens for a single assistant response,
   *   inclusive of tool calls. Provide an integer between 1 and 4096 to
   *   limit output tokens, or `inf` for the maximum available tokens for a
   *   given model. Defaults to `inf`.
   */
  max_output_tokens?: number | "inf";
  /**
   * Controls which conversation the response is added to. Currently supports
   *   `auto` and `none`, with `auto` as the default value. The `auto` value
   *   means that the contents of the response will be added to the default
   *   conversation. Set this to `none` to create an out-of-band response which
   *   will not add items to default conversation.
   */
  conversation?: "auto" | "none";
  metadata?: Metadata;
  /**
   * Input items to include in the prompt for the model. Using this field
   *   creates a new context for this Response instead of using the default
   *   conversation. An empty array `[]` will clear the context for this Response.
   *   Note that this can include references to items that previously appeared in the session
   *   using their id.
   */
  input?: RealtimeConversationItemUnion[];
  /** Modalities that the response may return. */
  output_modalities?: VoiceOutputModality[];
  /** Response-specific audio settings. */
  audio?: VoiceAgentResponseCreateAudio;
  /** A pre-generated assistant message used to begin the response. */
  pre_generated_assistant_message?: RealtimeConversationItemMessageAssistant;
  /** Interim-response settings for this response. */
  interim_response?: VoiceAgentInterimResponse;
}

export function voiceAgentResponseCreateParamsSerializer(
  item: VoiceAgentResponseCreateParams,
): any {
  return {
    instructions: item["instructions"],
    tools: !item["tools"]
      ? item["tools"]
      : _voiceAgentResponseCreateParamsToolArraySerializer(item["tools"]),
    tool_choice: !item["tool_choice"]
      ? item["tool_choice"]
      : _voiceAgentResponseCreateParamsToolChoiceSerializer(item["tool_choice"]),
    parallel_tool_calls: item["parallel_tool_calls"],
    reasoning: !item["reasoning"]
      ? item["reasoning"]
      : realtimeReasoningSerializer(item["reasoning"]),
    max_output_tokens: !item["max_output_tokens"]
      ? item["max_output_tokens"]
      : _voiceAgentResponseCreateParamsMaxOutputTokensSerializer(item["max_output_tokens"]),
    conversation: item["conversation"],
    metadata: !item["metadata"] ? item["metadata"] : metadataSerializer(item["metadata"]),
    input: !item["input"]
      ? item["input"]
      : realtimeConversationItemUnionArraySerializer(item["input"]),
    output_modalities: !item["output_modalities"]
      ? item["output_modalities"]
      : item["output_modalities"].map((p: any) => {
          return p;
        }),
    audio: !item["audio"] ? item["audio"] : voiceAgentResponseCreateAudioSerializer(item["audio"]),
    pre_generated_assistant_message: !item["pre_generated_assistant_message"]
      ? item["pre_generated_assistant_message"]
      : realtimeConversationItemMessageAssistantSerializer(item["pre_generated_assistant_message"]),
    interim_response: !item["interim_response"]
      ? item["interim_response"]
      : voiceAgentInterimResponseSerializer(item["interim_response"]),
  };
}

export function voiceAgentResponseCreateParamsDeserializer(
  item: any,
): VoiceAgentResponseCreateParams {
  return {
    instructions: item["instructions"],
    tools: !item["tools"]
      ? item["tools"]
      : _voiceAgentResponseCreateParamsToolArrayDeserializer(item["tools"]),
    tool_choice: !item["tool_choice"]
      ? item["tool_choice"]
      : _voiceAgentResponseCreateParamsToolChoiceDeserializer(item["tool_choice"]),
    parallel_tool_calls: item["parallel_tool_calls"],
    reasoning: !item["reasoning"]
      ? item["reasoning"]
      : realtimeReasoningDeserializer(item["reasoning"]),
    max_output_tokens: !item["max_output_tokens"]
      ? item["max_output_tokens"]
      : _voiceAgentResponseCreateParamsMaxOutputTokensDeserializer(item["max_output_tokens"]),
    conversation: item["conversation"],
    metadata: !item["metadata"] ? item["metadata"] : metadataDeserializer(item["metadata"]),
    input: !item["input"]
      ? item["input"]
      : realtimeConversationItemUnionArrayDeserializer(item["input"]),
    output_modalities: !item["output_modalities"]
      ? item["output_modalities"]
      : item["output_modalities"].map((p: any) => {
          return p;
        }),
    audio: !item["audio"]
      ? item["audio"]
      : voiceAgentResponseCreateAudioDeserializer(item["audio"]),
    pre_generated_assistant_message: !item["pre_generated_assistant_message"]
      ? item["pre_generated_assistant_message"]
      : realtimeConversationItemMessageAssistantDeserializer(
          item["pre_generated_assistant_message"],
        ),
    interim_response: !item["interim_response"]
      ? item["interim_response"]
      : voiceAgentInterimResponseDeserializer(item["interim_response"]),
  };
}

export function _voiceAgentResponseCreateParamsToolArraySerializer(
  result: Array<_VoiceAgentResponseCreateParamsTool>,
): any[] {
  return result.map((item) => {
    return _voiceAgentResponseCreateParamsToolSerializer(item);
  });
}

export function _voiceAgentResponseCreateParamsToolArrayDeserializer(
  result: Array<_VoiceAgentResponseCreateParamsTool>,
): any[] {
  return result.map((item) => {
    return _voiceAgentResponseCreateParamsToolDeserializer(item);
  });
}

/** Alias for _VoiceAgentResponseCreateParamsTool */
export type _VoiceAgentResponseCreateParamsTool = RealtimeFunctionTool | MCPTool;

export function _voiceAgentResponseCreateParamsToolSerializer(
  item: _VoiceAgentResponseCreateParamsTool,
): any {
  return item;
}

export function _voiceAgentResponseCreateParamsToolDeserializer(
  item: any,
): _VoiceAgentResponseCreateParamsTool {
  return item;
}

/**
 * Give the model access to additional tools via remote Model Context Protocol
 * (MCP) servers. [Learn more about MCP](/docs/guides/tools-remote-mcp).
 */
export interface MCPTool extends Tool {
  /** The type of the MCP tool. Always `mcp`. */
  type: "mcp";
  /** A label for this MCP server, used to identify it in tool calls. */
  server_label: string;
  /**
   * The URL for the MCP server. One of `server_url`, `connector_id`, or
   *   `tunnel_id` must be provided.
   */
  server_url?: string;
  /**
   * Identifier for service connectors, like those available in ChatGPT. One of
   *   `server_url`, `connector_id`, or `tunnel_id` must be provided. Learn more
   *   about service connectors [here](/docs/guides/tools-remote-mcp#connectors).
   *   Currently supported `connector_id` values are:
   *   - Dropbox: `connector_dropbox`
   *   - Gmail: `connector_gmail`
   *   - Google Calendar: `connector_googlecalendar`
   *   - Google Drive: `connector_googledrive`
   *   - Microsoft Teams: `connector_microsoftteams`
   *   - Outlook Calendar: `connector_outlookcalendar`
   *   - Outlook Email: `connector_outlookemail`
   *   - SharePoint: `connector_sharepoint`
   */
  connector_id?:
    | "connector_dropbox"
    | "connector_gmail"
    | "connector_googlecalendar"
    | "connector_googledrive"
    | "connector_microsoftteams"
    | "connector_outlookcalendar"
    | "connector_outlookemail"
    | "connector_sharepoint";
  /**
   * The Secure MCP Tunnel ID to use instead of a direct server URL. One of
   *   `server_url`, `connector_id`, or `tunnel_id` must be provided.
   */
  tunnel_id?: string;
  /**
   * An OAuth access token that can be used with a remote MCP server, either
   *   with a custom MCP server URL or a service connector. Your application
   *   must handle the OAuth authorization flow and provide the token here.
   */
  authorization?: string;
  /** Optional description of the MCP server, used to provide more context. */
  server_description?: string;
  headers?: Record<string, string>;
  allowed_tools?: string[] | MCPToolFilter;
  allowed_callers?: CallableToolAllowedCaller[];
  require_approval?: MCPToolRequireApproval | "always" | "never";
  /** Whether this MCP tool is deferred and discovered via tool search. */
  defer_loading?: boolean;
  /** The connection ID in the project for the MCP server. The connection stores authentication and other connection details needed to connect to the MCP server. */
  project_connection_id?: string;
  /** Deprecated. This property is deprecated and will be removed in a future version. */
  tool_configs?: Record<string, ToolConfig>;
}

export function mcpToolSerializer(item: MCPTool): any {
  return {
    type: item["type"],
    server_label: item["server_label"],
    server_url: item["server_url"],
    connector_id: item["connector_id"],
    tunnel_id: item["tunnel_id"],
    authorization: item["authorization"],
    server_description: item["server_description"],
    headers: item["headers"],
    allowed_tools: !item["allowed_tools"]
      ? item["allowed_tools"]
      : _voiceAgentToolAllowedToolsSerializer(item["allowed_tools"]),
    allowed_callers: !item["allowed_callers"]
      ? item["allowed_callers"]
      : item["allowed_callers"].map((p: any) => {
          return p;
        }),
    require_approval: !item["require_approval"]
      ? item["require_approval"]
      : _voiceAgentToolRequireApprovalSerializer(item["require_approval"]),
    defer_loading: item["defer_loading"],
    project_connection_id: item["project_connection_id"],
    tool_configs: !item["tool_configs"]
      ? item["tool_configs"]
      : toolConfigRecordSerializer(item["tool_configs"]),
  };
}

export function mcpToolDeserializer(item: any): MCPTool {
  return {
    type: item["type"],
    server_label: item["server_label"],
    server_url: item["server_url"],
    connector_id: item["connector_id"],
    tunnel_id: item["tunnel_id"],
    authorization: item["authorization"],
    server_description: item["server_description"],
    headers: !item["headers"]
      ? item["headers"]
      : Object.fromEntries(
          Object.entries(item["headers"]).map(([k1, p1]: [string, any]) => [k1, p1]),
        ),
    allowed_tools: !item["allowed_tools"]
      ? item["allowed_tools"]
      : _voiceAgentToolAllowedToolsDeserializer(item["allowed_tools"]),
    allowed_callers: !item["allowed_callers"]
      ? item["allowed_callers"]
      : item["allowed_callers"].map((p1: any) => {
          return p1;
        }),
    require_approval: !item["require_approval"]
      ? item["require_approval"]
      : _voiceAgentToolRequireApprovalDeserializer(item["require_approval"]),
    defer_loading: item["defer_loading"],
    project_connection_id: item["project_connection_id"],
    tool_configs: !item["tool_configs"]
      ? item["tool_configs"]
      : toolConfigRecordDeserializer(item["tool_configs"]),
  };
}

/** Alias for _VoiceAgentResponseCreateParamsToolChoice */
export type _VoiceAgentResponseCreateParamsToolChoice =
  ToolChoiceOptions | ToolChoiceFunction | ToolChoiceMCP;

export function _voiceAgentResponseCreateParamsToolChoiceSerializer(
  item: _VoiceAgentResponseCreateParamsToolChoice,
): any {
  return item;
}

export function _voiceAgentResponseCreateParamsToolChoiceDeserializer(
  item: any,
): _VoiceAgentResponseCreateParamsToolChoice {
  return item;
}

/**
 * Controls which (if any) tool is called by the model.
 * `none` means the model will not call any tool and instead generates a message.
 * `auto` means the model can pick between generating a message or calling one or
 * more tools.
 * `required` means the model must call one or more tools.
 */
export type ToolChoiceOptions = "none" | "auto" | "required";

/** Use this option to force the model to call a specific function. */
export interface ToolChoiceFunction extends ToolChoiceParam {
  /** For function calling, the type is always `function`. */
  type: "function";
  /** The name of the function to call. */
  name: string;
}

export function toolChoiceFunctionSerializer(item: ToolChoiceFunction): any {
  return { type: item["type"], name: item["name"] };
}

export function toolChoiceFunctionDeserializer(item: any): ToolChoiceFunction {
  return {
    type: item["type"],
    name: item["name"],
  };
}

/** Use this option to force the model to call a specific tool on a remote MCP server. */
export interface ToolChoiceMCP extends ToolChoiceParam {
  /** For MCP tools, the type is always `mcp`. */
  type: "mcp";
  /** The label of the MCP server to use. */
  server_label: string;
  name?: string;
}

export function toolChoiceMCPSerializer(item: ToolChoiceMCP): any {
  return { type: item["type"], server_label: item["server_label"], name: item["name"] };
}

export function toolChoiceMCPDeserializer(item: any): ToolChoiceMCP {
  return {
    type: item["type"],
    server_label: item["server_label"],
    name: item["name"],
  };
}

/** Configuration for reasoning-capable Realtime models such as `gpt-realtime-2`. */
export interface RealtimeReasoning {
  effort?: RealtimeReasoningEffort;
}

export function realtimeReasoningSerializer(item: RealtimeReasoning): any {
  return { effort: item["effort"] };
}

export function realtimeReasoningDeserializer(item: any): RealtimeReasoning {
  return {
    effort: item["effort"],
  };
}

/**
 * Constrains effort on reasoning for reasoning-capable Realtime models such as
 * `gpt-realtime-2`.
 */
export type RealtimeReasoningEffort = "minimal" | "low" | "medium" | "high" | "xhigh";
/** Alias for _VoiceAgentResponseCreateParamsMaxOutputTokens */
export type _VoiceAgentResponseCreateParamsMaxOutputTokens = number | "inf";

export function _voiceAgentResponseCreateParamsMaxOutputTokensSerializer(
  item: _VoiceAgentResponseCreateParamsMaxOutputTokens,
): any {
  return item;
}

export function _voiceAgentResponseCreateParamsMaxOutputTokensDeserializer(
  item: any,
): _VoiceAgentResponseCreateParamsMaxOutputTokens {
  return item;
}

/**
 * Set of 16 key-value pairs that can be attached to an object. This can be
 * useful for storing additional information about the object in a structured
 * format, and querying for objects via API or the dashboard.
 * Keys are strings with a maximum length of 64 characters. Values are strings
 * with a maximum length of 512 characters.
 */
export interface Metadata {
  /** Additional properties */
  additionalProperties?: Record<string, string>;
}

export function metadataSerializer(item: Metadata): any {
  return { ...serializeRecord(item.additionalProperties ?? {}) };
}

export function metadataDeserializer(item: any): Metadata {
  return {
    additionalProperties: serializeRecord(item, []),
  };
}

export function realtimeConversationItemUnionArraySerializer(
  result: Array<RealtimeConversationItemUnion>,
): any[] {
  return result.map((item) => {
    return realtimeConversationItemUnionSerializer(item);
  });
}

export function realtimeConversationItemUnionArrayDeserializer(
  result: Array<RealtimeConversationItemUnion>,
): any[] {
  return result.map((item) => {
    return realtimeConversationItemUnionDeserializer(item);
  });
}

/** Output-audio settings applied to one `response.create` request. */
export interface VoiceAgentResponseCreateAudio {
  /** The response-specific output-audio settings. */
  output?: VoiceAgentSessionUpdateAudioOutput;
}

export function voiceAgentResponseCreateAudioSerializer(item: VoiceAgentResponseCreateAudio): any {
  return {
    output: !item["output"]
      ? item["output"]
      : voiceAgentSessionUpdateAudioOutputSerializer(item["output"]),
  };
}

export function voiceAgentResponseCreateAudioDeserializer(
  item: any,
): VoiceAgentResponseCreateAudio {
  return {
    output: !item["output"]
      ? item["output"]
      : voiceAgentSessionUpdateAudioOutputDeserializer(item["output"]),
  };
}

/** Interim-response settings for latency and tool execution. */
export type VoiceAgentInterimResponse =
  VoiceAgentStaticInterimResponseConfig | VoiceAgentLlmInterimResponseConfig;

export function voiceAgentInterimResponseSerializer(item: VoiceAgentInterimResponse): any {
  return item;
}

export function voiceAgentInterimResponseDeserializer(item: any): VoiceAgentInterimResponse {
  return item;
}

/** A static interim response selected from configured text. */
export interface VoiceAgentStaticInterimResponseConfig extends VoiceAgentInterimResponseConfig {
  type: "static_interim_response";
  /** Candidate text values for the interim response. */
  texts?: string[];
}

export function voiceAgentStaticInterimResponseConfigSerializer(
  item: VoiceAgentStaticInterimResponseConfig,
): any {
  return {
    type: item["type"],
    triggers: !item["triggers"]
      ? item["triggers"]
      : item["triggers"].map((p: any) => {
          return p;
        }),
    latency_threshold_ms: item["latencyThresholdInMs"],
    texts: !item["texts"]
      ? item["texts"]
      : item["texts"].map((p: any) => {
          return p;
        }),
  };
}

export function voiceAgentStaticInterimResponseConfigDeserializer(
  item: any,
): VoiceAgentStaticInterimResponseConfig {
  return {
    type: item["type"],
    triggers: !item["triggers"]
      ? item["triggers"]
      : item["triggers"].map((p: any) => {
          return p;
        }),
    latencyThresholdInMs: item["latency_threshold_ms"],
    texts: !item["texts"]
      ? item["texts"]
      : item["texts"].map((p: any) => {
          return p;
        }),
  };
}

/** An interim response generated by a language model. */
export interface VoiceAgentLlmInterimResponseConfig extends VoiceAgentInterimResponseConfig {
  type: "llm_interim_response";
  /** The model used to generate interim responses. */
  model?: string;
  /** Optional instructions for generating interim responses. */
  instructions?: string;
  /** The maximum completion-token count for an interim response. */
  max_completion_tokens?: number;
}

export function voiceAgentLlmInterimResponseConfigSerializer(
  item: VoiceAgentLlmInterimResponseConfig,
): any {
  return {
    type: item["type"],
    triggers: !item["triggers"]
      ? item["triggers"]
      : item["triggers"].map((p: any) => {
          return p;
        }),
    latency_threshold_ms: item["latencyThresholdInMs"],
    model: item["model"],
    instructions: item["instructions"],
    max_completion_tokens: item["max_completion_tokens"],
  };
}

export function voiceAgentLlmInterimResponseConfigDeserializer(
  item: any,
): VoiceAgentLlmInterimResponseConfig {
  return {
    type: item["type"],
    triggers: !item["triggers"]
      ? item["triggers"]
      : item["triggers"].map((p: any) => {
          return p;
        }),
    latencyThresholdInMs: item["latency_threshold_ms"],
    model: item["model"],
    instructions: item["instructions"],
    max_completion_tokens: item["max_completion_tokens"],
  };
}

/** A tool that can be used to generate a response. */
export interface Tool {
  type: ToolType;
}

export function toolSerializer(item: Tool): any {
  return { type: item["type"] };
}

export function toolDeserializer(item: any): Tool {
  return {
    type: item["type"],
  };
}

/** Alias for ToolUnion */
export type ToolUnion = MCPTool | Tool;

export function toolUnionSerializer(item: ToolUnion): any {
  switch (item.type) {
    case "mcp":
      return mcpToolSerializer(item as MCPTool);

    default:
      return toolSerializer(item);
  }
}

export function toolUnionDeserializer(item: any): ToolUnion {
  switch (item["type"]) {
    case "mcp":
      return mcpToolDeserializer(item as MCPTool);

    default:
      return toolDeserializer(item);
  }
}

/** Type of ToolType */
export type ToolType =
  | "function"
  | "file_search"
  | "computer"
  | "computer_use_preview"
  | "web_search"
  | "mcp"
  | "code_interpreter"
  | "programmatic_tool_calling"
  | "image_generation"
  | "local_shell"
  | "shell"
  | "custom"
  | "namespace"
  | "tool_search"
  | "web_search_preview"
  | "apply_patch"
  | "a2a_preview"
  | "bing_custom_search_preview"
  | "browser_automation_preview"
  | "fabric_dataagent_preview"
  | "sharepoint_grounding_preview"
  | "memory_search_preview"
  | "work_iq_preview"
  | "fabric_iq_preview"
  | "toolbox_search_preview"
  | "azure_ai_search"
  | "azure_function"
  | "bing_grounding"
  | "capture_structured_outputs"
  | "openapi";

/**
 * How the model should select which tool (or tools) to use when generating
 * a response. See the `tools` parameter to see how to specify which tools
 * the model can call.
 */
export interface ToolChoiceParam {
  type: ToolChoiceParamType;
}

export function toolChoiceParamSerializer(item: ToolChoiceParam): any {
  return { type: item["type"] };
}

export function toolChoiceParamDeserializer(item: any): ToolChoiceParam {
  return {
    type: item["type"],
  };
}

/** Alias for ToolChoiceParamUnion */
export type ToolChoiceParamUnion = ToolChoiceFunction | ToolChoiceMCP | ToolChoiceParam;

export function toolChoiceParamUnionSerializer(item: ToolChoiceParamUnion): any {
  switch (item.type) {
    case "function":
      return toolChoiceFunctionSerializer(item as ToolChoiceFunction);

    case "mcp":
      return toolChoiceMCPSerializer(item as ToolChoiceMCP);

    default:
      return toolChoiceParamSerializer(item);
  }
}

export function toolChoiceParamUnionDeserializer(item: any): ToolChoiceParamUnion {
  switch (item["type"]) {
    case "function":
      return toolChoiceFunctionDeserializer(item as ToolChoiceFunction);

    case "mcp":
      return toolChoiceMCPDeserializer(item as ToolChoiceMCP);

    default:
      return toolChoiceParamDeserializer(item);
  }
}

/** Type of ToolChoiceParamType */
export type ToolChoiceParamType =
  | "allowed_tools"
  | "function"
  | "mcp"
  | "custom"
  | "programmatic_tool_calling"
  | "apply_patch"
  | "shell"
  | "file_search"
  | "web_search_preview"
  | "computer_use_preview"
  | "web_search_preview_2025_03_11"
  | "image_generation"
  | "code_interpreter"
  | "computer"
  | "computer_use";

/** Fields shared by interim-response configurations. */
export interface VoiceAgentInterimResponseConfig {
  /** The interim-response implementation. */
  /** The discriminator possible values: static_interim_response, llm_interim_response */
  type: string;
  /** Conditions that may trigger one interim response. */
  triggers?: VoiceAgentInterimResponseTrigger[];
  /** The latency threshold in milliseconds. */
  latencyThresholdInMs?: number;
}

export function voiceAgentInterimResponseConfigSerializer(
  item: VoiceAgentInterimResponseConfig,
): any {
  return {
    type: item["type"],
    triggers: !item["triggers"]
      ? item["triggers"]
      : item["triggers"].map((p: any) => {
          return p;
        }),
    latency_threshold_ms: item["latencyThresholdInMs"],
  };
}

export function voiceAgentInterimResponseConfigDeserializer(
  item: any,
): VoiceAgentInterimResponseConfig {
  return {
    type: item["type"],
    triggers: !item["triggers"]
      ? item["triggers"]
      : item["triggers"].map((p: any) => {
          return p;
        }),
    latencyThresholdInMs: item["latency_threshold_ms"],
  };
}

/** Alias for VoiceAgentInterimResponseConfigUnion */
export type VoiceAgentInterimResponseConfigUnion =
  | VoiceAgentStaticInterimResponseConfig
  | VoiceAgentLlmInterimResponseConfig
  | VoiceAgentInterimResponseConfig;

export function voiceAgentInterimResponseConfigUnionSerializer(
  item: VoiceAgentInterimResponseConfigUnion,
): any {
  switch (item.type) {
    case "static_interim_response":
      return voiceAgentStaticInterimResponseConfigSerializer(
        item as VoiceAgentStaticInterimResponseConfig,
      );

    case "llm_interim_response":
      return voiceAgentLlmInterimResponseConfigSerializer(
        item as VoiceAgentLlmInterimResponseConfig,
      );

    default:
      return voiceAgentInterimResponseConfigSerializer(item);
  }
}

export function voiceAgentInterimResponseConfigUnionDeserializer(
  item: any,
): VoiceAgentInterimResponseConfigUnion {
  switch (item["type"]) {
    case "static_interim_response":
      return voiceAgentStaticInterimResponseConfigDeserializer(
        item as VoiceAgentStaticInterimResponseConfig,
      );

    case "llm_interim_response":
      return voiceAgentLlmInterimResponseConfigDeserializer(
        item as VoiceAgentLlmInterimResponseConfig,
      );

    default:
      return voiceAgentInterimResponseConfigDeserializer(item);
  }
}

/** A condition that may trigger an interim response. */
export type VoiceAgentInterimResponseTrigger = "latency" | "tool";

/** Input-audio settings accepted in a stable voice-agent session. */
export interface VoiceAgentSessionUpdateAudioInput {
  /** Input noise reduction. Set to null to disable. */
  noise_reduction?: VoiceNoiseReduction;
  /** Asynchronous input-audio transcription. Set to null to disable transcription. */
  transcription?: VoiceInputTranscription;
  /** The structured input audio format. */
  format?: VoiceAudioFormat;
  /** Turn-detection settings. Set to null to disable server-side turn detection. */
  turn_detection?: VoiceAgentTurnDetection;
  /** Optional server-side echo cancellation settings. */
  echo_cancellation?: VoiceAgentEchoCancellation;
}

export function voiceAgentSessionUpdateAudioInputSerializer(
  item: VoiceAgentSessionUpdateAudioInput,
): any {
  return {
    noise_reduction: !item["noise_reduction"]
      ? item["noise_reduction"]
      : voiceNoiseReductionSerializer(item["noise_reduction"]),
    transcription: !item["transcription"]
      ? item["transcription"]
      : voiceInputTranscriptionSerializer(item["transcription"]),
    format: !item["format"] ? item["format"] : voiceAudioFormatSerializer(item["format"]),
    turn_detection: !item["turn_detection"]
      ? item["turn_detection"]
      : voiceAgentTurnDetectionSerializer(item["turn_detection"]),
    echo_cancellation: !item["echo_cancellation"]
      ? item["echo_cancellation"]
      : voiceAgentEchoCancellationSerializer(item["echo_cancellation"]),
  };
}

export function voiceAgentSessionUpdateAudioInputDeserializer(
  item: any,
): VoiceAgentSessionUpdateAudioInput {
  return {
    noise_reduction: !item["noise_reduction"]
      ? item["noise_reduction"]
      : voiceNoiseReductionDeserializer(item["noise_reduction"]),
    transcription: !item["transcription"]
      ? item["transcription"]
      : voiceInputTranscriptionDeserializer(item["transcription"]),
    format: !item["format"] ? item["format"] : voiceAudioFormatDeserializer(item["format"]),
    turn_detection: !item["turn_detection"]
      ? item["turn_detection"]
      : voiceAgentTurnDetectionDeserializer(item["turn_detection"]),
    echo_cancellation: !item["echo_cancellation"]
      ? item["echo_cancellation"]
      : voiceAgentEchoCancellationDeserializer(item["echo_cancellation"]),
  };
}

/** Turn-detection settings accepted by a stable voice-agent session. */
export type VoiceAgentTurnDetection =
  | VoiceAgentServerVadTurnDetection
  | VoiceAgentSemanticVadTurnDetection
  | VoiceAgentAzureSemanticVadTurnDetection
  | VoiceAgentAzureMultilingualSemanticVadTurnDetection;

export function voiceAgentTurnDetectionSerializer(item: VoiceAgentTurnDetection): any {
  return item;
}

export function voiceAgentTurnDetectionDeserializer(item: any): VoiceAgentTurnDetection {
  return item;
}

/** Server VAD turn-detection settings. */
export interface VoiceAgentServerVadTurnDetection {
  create_response?: boolean;
  interrupt_response?: boolean;
  idle_timeout_ms?: number;
  type: "server_vad";
  threshold?: number;
  prefixPaddingInMs?: number;
  silenceDurationInMs?: number;
  speechDurationInMs?: number;
  end_of_utterance_detection?: VoiceAgentEndOfUtteranceDetection;
  auto_truncate?: boolean;
}

export function voiceAgentServerVadTurnDetectionSerializer(
  item: VoiceAgentServerVadTurnDetection,
): any {
  return {
    create_response: item["create_response"],
    interrupt_response: item["interrupt_response"],
    idle_timeout_ms: item["idle_timeout_ms"],
    type: item["type"],
    threshold: item["threshold"],
    prefix_padding_ms: item["prefixPaddingInMs"],
    silence_duration_ms: item["silenceDurationInMs"],
    speech_duration_ms: item["speechDurationInMs"],
    end_of_utterance_detection: !item["end_of_utterance_detection"]
      ? item["end_of_utterance_detection"]
      : voiceAgentEndOfUtteranceDetectionSerializer(item["end_of_utterance_detection"]),
    auto_truncate: item["auto_truncate"],
  };
}

export function voiceAgentServerVadTurnDetectionDeserializer(
  item: any,
): VoiceAgentServerVadTurnDetection {
  return {
    create_response: item["create_response"],
    interrupt_response: item["interrupt_response"],
    idle_timeout_ms: item["idle_timeout_ms"],
    type: item["type"],
    threshold: item["threshold"],
    prefixPaddingInMs: item["prefix_padding_ms"],
    silenceDurationInMs: item["silence_duration_ms"],
    speechDurationInMs: item["speech_duration_ms"],
    end_of_utterance_detection: !item["end_of_utterance_detection"]
      ? item["end_of_utterance_detection"]
      : voiceAgentEndOfUtteranceDetectionDeserializer(item["end_of_utterance_detection"]),
    auto_truncate: item["auto_truncate"],
  };
}

/** End-of-utterance detection settings. */
export interface VoiceAgentEndOfUtteranceDetection {
  model: VoiceAgentEndOfUtteranceModel;
  threshold?: number;
  threshold_level?: VoiceAgentEndOfUtteranceThresholdLevel;
  timeout?: number;
  timeoutInMs?: number;
}

export function voiceAgentEndOfUtteranceDetectionSerializer(
  item: VoiceAgentEndOfUtteranceDetection,
): any {
  return {
    model: item["model"],
    threshold: item["threshold"],
    threshold_level: item["threshold_level"],
    timeout: item["timeout"],
    timeout_ms: item["timeoutInMs"],
  };
}

export function voiceAgentEndOfUtteranceDetectionDeserializer(
  item: any,
): VoiceAgentEndOfUtteranceDetection {
  return {
    model: item["model"],
    threshold: item["threshold"],
    threshold_level: item["threshold_level"],
    timeout: item["timeout"],
    timeoutInMs: item["timeout_ms"],
  };
}

/** An end-of-utterance detector model. */
export type VoiceAgentEndOfUtteranceModel =
  | "semantic_detection_v1"
  | "semantic_detection_v1_en"
  | "semantic_detection_v1_multilingual"
  | "smart_end_of_turn_detection";
/** A threshold preset for end-of-utterance detection. */
export type VoiceAgentEndOfUtteranceThresholdLevel = "low" | "medium" | "high" | "default";

/** OpenAI semantic VAD turn-detection settings. */
export interface VoiceAgentSemanticVadTurnDetection {
  eagerness?: "low" | "medium" | "high" | "auto";
  create_response?: boolean;
  interrupt_response?: boolean;
  type: "semantic_vad";
  auto_truncate?: boolean;
}

export function voiceAgentSemanticVadTurnDetectionSerializer(
  item: VoiceAgentSemanticVadTurnDetection,
): any {
  return {
    eagerness: item["eagerness"],
    create_response: item["create_response"],
    interrupt_response: item["interrupt_response"],
    type: item["type"],
    auto_truncate: item["auto_truncate"],
  };
}

export function voiceAgentSemanticVadTurnDetectionDeserializer(
  item: any,
): VoiceAgentSemanticVadTurnDetection {
  return {
    eagerness: item["eagerness"],
    create_response: item["create_response"],
    interrupt_response: item["interrupt_response"],
    type: item["type"],
    auto_truncate: item["auto_truncate"],
  };
}

/** Azure semantic VAD turn-detection settings. */
export interface VoiceAgentAzureSemanticVadTurnDetection {
  /** Whether a response is created automatically when speech stops. */
  create_response?: boolean;
  /** Whether user speech may interrupt the agent's response. */
  interrupt_response?: boolean;
  type: VoiceAgentAzureSemanticVadType;
  threshold?: number;
  prefixPaddingInMs?: number;
  silenceDurationInMs?: number;
  idleTimeoutInMs?: number;
  speechDurationInMs?: number;
  end_of_utterance_detection?: VoiceAgentEndOfUtteranceDetection;
  remove_filler_words?: boolean;
  languages?: string[];
  auto_truncate?: boolean;
}

export function voiceAgentAzureSemanticVadTurnDetectionSerializer(
  item: VoiceAgentAzureSemanticVadTurnDetection,
): any {
  return {
    create_response: item["create_response"],
    interrupt_response: item["interrupt_response"],
    type: item["type"],
    threshold: item["threshold"],
    prefix_padding_ms: item["prefixPaddingInMs"],
    silence_duration_ms: item["silenceDurationInMs"],
    idle_timeout_ms: item["idleTimeoutInMs"],
    speech_duration_ms: item["speechDurationInMs"],
    end_of_utterance_detection: !item["end_of_utterance_detection"]
      ? item["end_of_utterance_detection"]
      : voiceAgentEndOfUtteranceDetectionSerializer(item["end_of_utterance_detection"]),
    remove_filler_words: item["remove_filler_words"],
    languages: !item["languages"]
      ? item["languages"]
      : item["languages"].map((p: any) => {
          return p;
        }),
    auto_truncate: item["auto_truncate"],
  };
}

export function voiceAgentAzureSemanticVadTurnDetectionDeserializer(
  item: any,
): VoiceAgentAzureSemanticVadTurnDetection {
  return {
    create_response: item["create_response"],
    interrupt_response: item["interrupt_response"],
    type: item["type"],
    threshold: item["threshold"],
    prefixPaddingInMs: item["prefix_padding_ms"],
    silenceDurationInMs: item["silence_duration_ms"],
    idleTimeoutInMs: item["idle_timeout_ms"],
    speechDurationInMs: item["speech_duration_ms"],
    end_of_utterance_detection: !item["end_of_utterance_detection"]
      ? item["end_of_utterance_detection"]
      : voiceAgentEndOfUtteranceDetectionDeserializer(item["end_of_utterance_detection"]),
    remove_filler_words: item["remove_filler_words"],
    languages: !item["languages"]
      ? item["languages"]
      : item["languages"].map((p1: any) => {
          return p1;
        }),
    auto_truncate: item["auto_truncate"],
  };
}

/** The discriminator for an Azure semantic VAD configuration. */
export type VoiceAgentAzureSemanticVadType = "azure_semantic_vad" | "azure_semantic_vad_en";

/** Azure multilingual semantic VAD turn-detection settings. */
export interface VoiceAgentAzureMultilingualSemanticVadTurnDetection {
  /** Whether filler words are removed from transcription. */
  remove_filler_words?: boolean;
  /** Whether the input audio buffer is truncated automatically when speech stops. */
  auto_truncate?: boolean;
  /** Whether a response is created automatically when speech stops. */
  create_response?: boolean;
  /** Whether user speech may interrupt the agent's response. */
  interrupt_response?: boolean;
  type: "azure_semantic_vad_multilingual";
  threshold?: number;
  prefixPaddingInMs?: number;
  silenceDurationInMs?: number;
  idleTimeoutInMs?: number;
  speechDurationInMs?: number;
  end_of_utterance_detection?: VoiceAgentEndOfUtteranceDetection;
  languages?: string[];
}

export function voiceAgentAzureMultilingualSemanticVadTurnDetectionSerializer(
  item: VoiceAgentAzureMultilingualSemanticVadTurnDetection,
): any {
  return {
    remove_filler_words: item["remove_filler_words"],
    auto_truncate: item["auto_truncate"],
    create_response: item["create_response"],
    interrupt_response: item["interrupt_response"],
    type: item["type"],
    threshold: item["threshold"],
    prefix_padding_ms: item["prefixPaddingInMs"],
    silence_duration_ms: item["silenceDurationInMs"],
    idle_timeout_ms: item["idleTimeoutInMs"],
    speech_duration_ms: item["speechDurationInMs"],
    end_of_utterance_detection: !item["end_of_utterance_detection"]
      ? item["end_of_utterance_detection"]
      : voiceAgentEndOfUtteranceDetectionSerializer(item["end_of_utterance_detection"]),
    languages: !item["languages"]
      ? item["languages"]
      : item["languages"].map((p: any) => {
          return p;
        }),
  };
}

export function voiceAgentAzureMultilingualSemanticVadTurnDetectionDeserializer(
  item: any,
): VoiceAgentAzureMultilingualSemanticVadTurnDetection {
  return {
    remove_filler_words: item["remove_filler_words"],
    auto_truncate: item["auto_truncate"],
    create_response: item["create_response"],
    interrupt_response: item["interrupt_response"],
    type: item["type"],
    threshold: item["threshold"],
    prefixPaddingInMs: item["prefix_padding_ms"],
    silenceDurationInMs: item["silence_duration_ms"],
    idleTimeoutInMs: item["idle_timeout_ms"],
    speechDurationInMs: item["speech_duration_ms"],
    end_of_utterance_detection: !item["end_of_utterance_detection"]
      ? item["end_of_utterance_detection"]
      : voiceAgentEndOfUtteranceDetectionDeserializer(item["end_of_utterance_detection"]),
    languages: !item["languages"]
      ? item["languages"]
      : item["languages"].map((p1: any) => {
          return p1;
        }),
  };
}

/** Server-side echo cancellation settings for input audio. */
export interface VoiceAgentEchoCancellation {
  /** The echo cancellation implementation. Always `server_echo_cancellation`. */
  type: "server_echo_cancellation";
  /** Whether reference audio comes from server playback or a client-provided channel. */
  reference_source?: VoiceAgentEchoCancellationReferenceSource;
  /** The number of input channels. Use two interleaved channels when `reference_source` is `client`. */
  channels?: number;
}

export function voiceAgentEchoCancellationSerializer(item: VoiceAgentEchoCancellation): any {
  return {
    type: item["type"],
    reference_source: item["reference_source"],
    channels: item["channels"],
  };
}

export function voiceAgentEchoCancellationDeserializer(item: any): VoiceAgentEchoCancellation {
  return {
    type: item["type"],
    reference_source: item["reference_source"],
    channels: item["channels"],
  };
}

/** The source of reference audio used for echo cancellation. */
export type VoiceAgentEchoCancellationReferenceSource = "server" | "client";

/** Input- and output-audio settings accepted in a `session.update` client event. */
export interface VoiceAgentSessionUpdateAudio {
  /** The input-audio settings for the session. */
  input?: VoiceAgentSessionUpdateAudioInput;
  /** The output-audio settings for the session. */
  output?: VoiceAgentSessionUpdateAudioOutput;
}

export function voiceAgentSessionUpdateAudioSerializer(item: VoiceAgentSessionUpdateAudio): any {
  return {
    input: !item["input"]
      ? item["input"]
      : voiceAgentSessionUpdateAudioInputSerializer(item["input"]),
    output: !item["output"]
      ? item["output"]
      : voiceAgentSessionUpdateAudioOutputSerializer(item["output"]),
  };
}

export function voiceAgentSessionUpdateAudioDeserializer(item: any): VoiceAgentSessionUpdateAudio {
  return {
    input: !item["input"]
      ? item["input"]
      : voiceAgentSessionUpdateAudioInputDeserializer(item["input"]),
    output: !item["output"]
      ? item["output"]
      : voiceAgentSessionUpdateAudioOutputDeserializer(item["output"]),
  };
}

/** The stable realtime session settings accepted in a `session.update` client event. */
export interface VoiceAgentSessionUpdateConfig {
  /** The session type. Always `realtime`. */
  type: "realtime";
  /** Instructions applied throughout the session. */
  instructions?: string;
  /** The sampling temperature for compatible cascaded pipelines. */
  temperature?: number;
  /** The maximum output-token count for one response. */
  max_output_tokens?: VoiceAgentMaxOutputTokens;
  /** The output modalities enabled for the session. */
  output_modalities?: VoiceOutputModality[];
  /** The input- and output-audio settings for the session. */
  audio?: VoiceAgentSessionUpdateAudio;
  /** The avatar settings for the session. */
  avatar?: VoiceAgentSessionAvatarConfig;
  /** Animation settings for the session. */
  animation?: VoiceAgentAnimationConfig;
  /** Tools available to the session. */
  tools?: VoiceAgentSessionTool[];
  /** Tool-selection behavior for the session. */
  tool_choice?: VoiceAgentToolChoice;
  /** Reasoning settings for compatible realtime models. */
  reasoning?: RealtimeReasoning;
  /** Whether the model may call multiple tools in parallel. */
  parallel_tool_calls?: boolean;
  /** Additional fields to include in service outputs. */
  include?: VoiceAgentSessionIncludeOption[];
  /** Up to 16 string key-value pairs attached to the session. */
  metadata?: Record<string, string>;
  /** Voice-optimized instruction adaptation settings. */
  voice_adaptation?: VoiceAgentVoiceAdaptation;
  /** Interim-response settings for latency and tool execution. */
  interim_response?: VoiceAgentInterimResponse;
  /** A delimiter appended to generated responses. */
  response_delimiter?: string;
  /** A proactive assistant greeting started after session configuration. */
  greeting?: VoiceGreetingConfigUnion;
  /** The customer-supplied handoff graph. */
  handoff?: VoiceAgentHandoffGraphConfig;
}

export function voiceAgentSessionUpdateConfigSerializer(item: VoiceAgentSessionUpdateConfig): any {
  return {
    type: item["type"],
    instructions: item["instructions"],
    temperature: item["temperature"],
    max_output_tokens: !item["max_output_tokens"]
      ? item["max_output_tokens"]
      : voiceAgentMaxOutputTokensSerializer(item["max_output_tokens"]),
    output_modalities: !item["output_modalities"]
      ? item["output_modalities"]
      : item["output_modalities"].map((p: any) => {
          return p;
        }),
    audio: !item["audio"] ? item["audio"] : voiceAgentSessionUpdateAudioSerializer(item["audio"]),
    avatar: !item["avatar"]
      ? item["avatar"]
      : voiceAgentSessionAvatarConfigSerializer(item["avatar"]),
    animation: !item["animation"]
      ? item["animation"]
      : voiceAgentAnimationConfigSerializer(item["animation"]),
    tools: !item["tools"] ? item["tools"] : voiceAgentSessionToolArraySerializer(item["tools"]),
    tool_choice: !item["tool_choice"]
      ? item["tool_choice"]
      : voiceAgentToolChoiceSerializer(item["tool_choice"]),
    reasoning: !item["reasoning"]
      ? item["reasoning"]
      : realtimeReasoningSerializer(item["reasoning"]),
    parallel_tool_calls: item["parallel_tool_calls"],
    include: !item["include"]
      ? item["include"]
      : item["include"].map((p: any) => {
          return p;
        }),
    metadata: item["metadata"],
    voice_adaptation: !item["voice_adaptation"]
      ? item["voice_adaptation"]
      : voiceAgentVoiceAdaptationSerializer(item["voice_adaptation"]),
    interim_response: !item["interim_response"]
      ? item["interim_response"]
      : voiceAgentInterimResponseSerializer(item["interim_response"]),
    response_delimiter: item["response_delimiter"],
    greeting: !item["greeting"]
      ? item["greeting"]
      : voiceGreetingConfigUnionSerializer(item["greeting"]),
    handoff: !item["handoff"]
      ? item["handoff"]
      : voiceAgentHandoffGraphConfigSerializer(item["handoff"]),
  };
}

export function voiceAgentSessionUpdateConfigDeserializer(
  item: any,
): VoiceAgentSessionUpdateConfig {
  return {
    type: item["type"],
    instructions: item["instructions"],
    temperature: item["temperature"],
    max_output_tokens: !item["max_output_tokens"]
      ? item["max_output_tokens"]
      : voiceAgentMaxOutputTokensDeserializer(item["max_output_tokens"]),
    output_modalities: !item["output_modalities"]
      ? item["output_modalities"]
      : item["output_modalities"].map((p1: any) => {
          return p1;
        }),
    audio: !item["audio"] ? item["audio"] : voiceAgentSessionUpdateAudioDeserializer(item["audio"]),
    avatar: !item["avatar"]
      ? item["avatar"]
      : voiceAgentSessionAvatarConfigDeserializer(item["avatar"]),
    animation: !item["animation"]
      ? item["animation"]
      : voiceAgentAnimationConfigDeserializer(item["animation"]),
    tools: !item["tools"] ? item["tools"] : voiceAgentSessionToolArrayDeserializer(item["tools"]),
    tool_choice: !item["tool_choice"]
      ? item["tool_choice"]
      : voiceAgentToolChoiceDeserializer(item["tool_choice"]),
    reasoning: !item["reasoning"]
      ? item["reasoning"]
      : realtimeReasoningDeserializer(item["reasoning"]),
    parallel_tool_calls: item["parallel_tool_calls"],
    include: !item["include"]
      ? item["include"]
      : item["include"].map((p1: any) => {
          return p1;
        }),
    metadata: !item["metadata"]
      ? item["metadata"]
      : Object.fromEntries(
          Object.entries(item["metadata"]).map(([k1, p1]: [string, any]) => [k1, p1]),
        ),
    voice_adaptation: !item["voice_adaptation"]
      ? item["voice_adaptation"]
      : voiceAgentVoiceAdaptationDeserializer(item["voice_adaptation"]),
    interim_response: !item["interim_response"]
      ? item["interim_response"]
      : voiceAgentInterimResponseDeserializer(item["interim_response"]),
    response_delimiter: item["response_delimiter"],
    greeting: !item["greeting"]
      ? item["greeting"]
      : voiceGreetingConfigUnionDeserializer(item["greeting"]),
    handoff: !item["handoff"]
      ? item["handoff"]
      : voiceAgentHandoffGraphConfigDeserializer(item["handoff"]),
  };
}

/** The maximum output-token count or the literal `inf`. */
export type VoiceAgentMaxOutputTokens = number | "inf";

export function voiceAgentMaxOutputTokensSerializer(item: VoiceAgentMaxOutputTokens): any {
  return item;
}

export function voiceAgentMaxOutputTokensDeserializer(item: any): VoiceAgentMaxOutputTokens {
  return item;
}

/** Avatar settings accepted by the stable voice-agent WebSocket contract. */
export interface VoiceAgentSessionAvatarConfig {
  type?: VoiceAgentAvatarType;
  ice_servers?: VoiceAgentAvatarIceServer[];
  character: string;
  style?: string;
  customized?: boolean;
  model?: string;
  video?: VoiceAgentAvatarVideoParams;
  scene?: VoiceAgentAvatarScene;
  output_protocol?: VoiceAgentAvatarOutputProtocol;
  output_audit_audio?: boolean;
}

export function voiceAgentSessionAvatarConfigSerializer(item: VoiceAgentSessionAvatarConfig): any {
  return {
    type: item["type"],
    ice_servers: !item["ice_servers"]
      ? item["ice_servers"]
      : voiceAgentAvatarIceServerArraySerializer(item["ice_servers"]),
    character: item["character"],
    style: item["style"],
    customized: item["customized"],
    model: item["model"],
    video: !item["video"] ? item["video"] : voiceAgentAvatarVideoParamsSerializer(item["video"]),
    scene: !item["scene"] ? item["scene"] : voiceAgentAvatarSceneSerializer(item["scene"]),
    output_protocol: item["output_protocol"],
    output_audit_audio: item["output_audit_audio"],
  };
}

export function voiceAgentSessionAvatarConfigDeserializer(
  item: any,
): VoiceAgentSessionAvatarConfig {
  return {
    type: item["type"],
    ice_servers: !item["ice_servers"]
      ? item["ice_servers"]
      : voiceAgentAvatarIceServerArrayDeserializer(item["ice_servers"]),
    character: item["character"],
    style: item["style"],
    customized: item["customized"],
    model: item["model"],
    video: !item["video"] ? item["video"] : voiceAgentAvatarVideoParamsDeserializer(item["video"]),
    scene: !item["scene"] ? item["scene"] : voiceAgentAvatarSceneDeserializer(item["scene"]),
    output_protocol: item["output_protocol"],
    output_audit_audio: item["output_audit_audio"],
  };
}

/** The avatar implementation. */
export type VoiceAgentAvatarType = "video_avatar" | "photo_avatar";

export function voiceAgentAvatarIceServerArraySerializer(
  result: Array<VoiceAgentAvatarIceServer>,
): any[] {
  return result.map((item) => {
    return voiceAgentAvatarIceServerSerializer(item);
  });
}

export function voiceAgentAvatarIceServerArrayDeserializer(
  result: Array<VoiceAgentAvatarIceServer>,
): any[] {
  return result.map((item) => {
    return voiceAgentAvatarIceServerDeserializer(item);
  });
}

/** An ICE server used for avatar WebRTC negotiation. */
export interface VoiceAgentAvatarIceServer {
  urls: string[];
  username?: string;
  credential?: string;
}

export function voiceAgentAvatarIceServerSerializer(item: VoiceAgentAvatarIceServer): any {
  return {
    urls: item["urls"].map((p: any) => {
      return p;
    }),
    username: item["username"],
    credential: item["credential"],
  };
}

export function voiceAgentAvatarIceServerDeserializer(item: any): VoiceAgentAvatarIceServer {
  return {
    urls: item["urls"].map((p: any) => {
      return p;
    }),
    username: item["username"],
    credential: item["credential"],
  };
}

/** Avatar video encoder and presentation settings. */
export interface VoiceAgentAvatarVideoParams {
  bitrate?: number;
  codec?: "h264";
  crop?: VoiceAgentAvatarVideoCrop;
  resolution?: VoiceAgentAvatarVideoResolution;
  background?: VoiceAgentAvatarVideoBackground;
  gop_size?: number;
}

export function voiceAgentAvatarVideoParamsSerializer(item: VoiceAgentAvatarVideoParams): any {
  return {
    bitrate: item["bitrate"],
    codec: item["codec"],
    crop: !item["crop"] ? item["crop"] : voiceAgentAvatarVideoCropSerializer(item["crop"]),
    resolution: !item["resolution"]
      ? item["resolution"]
      : voiceAgentAvatarVideoResolutionSerializer(item["resolution"]),
    background: !item["background"]
      ? item["background"]
      : voiceAgentAvatarVideoBackgroundSerializer(item["background"]),
    gop_size: item["gop_size"],
  };
}

export function voiceAgentAvatarVideoParamsDeserializer(item: any): VoiceAgentAvatarVideoParams {
  return {
    bitrate: item["bitrate"],
    codec: item["codec"],
    crop: !item["crop"] ? item["crop"] : voiceAgentAvatarVideoCropDeserializer(item["crop"]),
    resolution: !item["resolution"]
      ? item["resolution"]
      : voiceAgentAvatarVideoResolutionDeserializer(item["resolution"]),
    background: !item["background"]
      ? item["background"]
      : voiceAgentAvatarVideoBackgroundDeserializer(item["background"]),
    gop_size: item["gop_size"],
  };
}

/** The rectangular crop applied to avatar video. */
export interface VoiceAgentAvatarVideoCrop {
  bottom_right: [number, number];
  top_left: [number, number];
}

export function voiceAgentAvatarVideoCropSerializer(item: VoiceAgentAvatarVideoCrop): any {
  return { bottom_right: item["bottom_right"], top_left: item["top_left"] };
}

export function voiceAgentAvatarVideoCropDeserializer(item: any): VoiceAgentAvatarVideoCrop {
  return {
    bottom_right: item["bottom_right"],
    top_left: item["top_left"],
  };
}

/** The avatar video resolution. */
export interface VoiceAgentAvatarVideoResolution {
  width: number;
  height: number;
}

export function voiceAgentAvatarVideoResolutionSerializer(
  item: VoiceAgentAvatarVideoResolution,
): any {
  return { width: item["width"], height: item["height"] };
}

export function voiceAgentAvatarVideoResolutionDeserializer(
  item: any,
): VoiceAgentAvatarVideoResolution {
  return {
    width: item["width"],
    height: item["height"],
  };
}

/** The avatar video background. */
export interface VoiceAgentAvatarVideoBackground {
  image_url?: string;
  color?: string;
}

export function voiceAgentAvatarVideoBackgroundSerializer(
  item: VoiceAgentAvatarVideoBackground,
): any {
  return { image_url: item["image_url"], color: item["color"] };
}

export function voiceAgentAvatarVideoBackgroundDeserializer(
  item: any,
): VoiceAgentAvatarVideoBackground {
  return {
    image_url: item["image_url"],
    color: item["color"],
  };
}

/** Avatar placement and motion settings. */
export interface VoiceAgentAvatarScene {
  zoom?: number;
  position_x?: number;
  position_y?: number;
  rotation_x?: number;
  rotation_y?: number;
  rotation_z?: number;
  amplitude?: number;
}

export function voiceAgentAvatarSceneSerializer(item: VoiceAgentAvatarScene): any {
  return {
    zoom: item["zoom"],
    position_x: item["position_x"],
    position_y: item["position_y"],
    rotation_x: item["rotation_x"],
    rotation_y: item["rotation_y"],
    rotation_z: item["rotation_z"],
    amplitude: item["amplitude"],
  };
}

export function voiceAgentAvatarSceneDeserializer(item: any): VoiceAgentAvatarScene {
  return {
    zoom: item["zoom"],
    position_x: item["position_x"],
    position_y: item["position_y"],
    rotation_x: item["rotation_x"],
    rotation_y: item["rotation_y"],
    rotation_z: item["rotation_z"],
    amplitude: item["amplitude"],
  };
}

/** The transport used to deliver avatar media. */
export type VoiceAgentAvatarOutputProtocol = "websocket" | "websocket-binary" | "webrtc";

/** Animation settings for a voice-agent session. */
export interface VoiceAgentAnimationConfig {
  /** The animation model name. */
  model_name?: string;
  /** The requested animation output kinds. */
  outputs?: VoiceAgentAnimationOutputType[];
}

export function voiceAgentAnimationConfigSerializer(item: VoiceAgentAnimationConfig): any {
  return {
    model_name: item["model_name"],
    outputs: !item["outputs"]
      ? item["outputs"]
      : item["outputs"].map((p: any) => {
          return p;
        }),
  };
}

export function voiceAgentAnimationConfigDeserializer(item: any): VoiceAgentAnimationConfig {
  return {
    model_name: item["model_name"],
    outputs: !item["outputs"]
      ? item["outputs"]
      : item["outputs"].map((p: any) => {
          return p;
        }),
  };
}

/** An animation output produced by a voice-agent session. */
export type VoiceAgentAnimationOutputType = "blendshapes" | "viseme_id";

export function voiceAgentSessionToolArraySerializer(result: Array<VoiceAgentSessionTool>): any[] {
  return result.map((item) => {
    return voiceAgentSessionToolSerializer(item);
  });
}

export function voiceAgentSessionToolArrayDeserializer(
  result: Array<VoiceAgentSessionTool>,
): any[] {
  return result.map((item) => {
    return voiceAgentSessionToolDeserializer(item);
  });
}

/** A tool accepted by a stable voice-agent WebSocket session. */
export type VoiceAgentSessionTool =
  RealtimeFunctionTool | VoiceAgentSessionMcpTool | VoiceToolboxTool | VoiceSystemTool;

export function voiceAgentSessionToolSerializer(item: VoiceAgentSessionTool): any {
  return item;
}

export function voiceAgentSessionToolDeserializer(item: any): VoiceAgentSessionTool {
  return item;
}

/** A remote MCP server available to a voice-agent session. */
export interface VoiceAgentSessionMcpTool {
  type: "mcp";
  /** A label for this MCP server, used to identify it in tool calls. */
  server_label: string;
  server_url: string;
  authorization?: VoiceAgentMcpAuthorization;
  headers?: Record<string, string>;
  allowed_tools?: string[];
  require_approval?: VoiceAgentMcpApprovalPolicy;
  response_scheduling?: VoiceAgentMcpResponseScheduling;
}

export function voiceAgentSessionMcpToolSerializer(item: VoiceAgentSessionMcpTool): any {
  return {
    type: item["type"],
    server_label: item["server_label"],
    server_url: item["server_url"],
    authorization: !item["authorization"]
      ? item["authorization"]
      : _voiceAgentMcpAuthorizationSerializer(item["authorization"]),
    headers: item["headers"],
    allowed_tools: !item["allowed_tools"]
      ? item["allowed_tools"]
      : item["allowed_tools"].map((p: any) => {
          return p;
        }),
    require_approval: !item["require_approval"]
      ? item["require_approval"]
      : voiceAgentMcpApprovalPolicySerializer(item["require_approval"]),
    response_scheduling: item["response_scheduling"],
  };
}

export function voiceAgentSessionMcpToolDeserializer(item: any): VoiceAgentSessionMcpTool {
  return {
    type: item["type"],
    server_label: item["server_label"],
    server_url: item["server_url"],
    authorization: !item["authorization"]
      ? item["authorization"]
      : _voiceAgentMcpAuthorizationDeserializer(item["authorization"]),
    headers: !item["headers"]
      ? item["headers"]
      : Object.fromEntries(Object.entries(item["headers"]).map(([k, p]: [string, any]) => [k, p])),
    allowed_tools: !item["allowed_tools"]
      ? item["allowed_tools"]
      : item["allowed_tools"].map((p: any) => {
          return p;
        }),
    require_approval: !item["require_approval"]
      ? item["require_approval"]
      : voiceAgentMcpApprovalPolicyDeserializer(item["require_approval"]),
    response_scheduling: item["response_scheduling"],
  };
}

/** Authorization supplied to an MCP server. */
export type VoiceAgentMcpAuthorization = (string | VoiceAgentMcpAssignedManagedIdentity) | null;
/** Authorization supplied to an MCP server. */
export type _VoiceAgentMcpAuthorization = string | VoiceAgentMcpAssignedManagedIdentity;

export function _voiceAgentMcpAuthorizationSerializer(item: _VoiceAgentMcpAuthorization): any {
  return item;
}

export function _voiceAgentMcpAuthorizationDeserializer(item: any): _VoiceAgentMcpAuthorization {
  return item;
}

/** A managed identity used to authorize a voice-agent MCP connection. */
export interface VoiceAgentMcpAssignedManagedIdentity {
  type: "assigned_managed_identity";
  audience: string;
  client_id?: string;
}

export function voiceAgentMcpAssignedManagedIdentitySerializer(
  item: VoiceAgentMcpAssignedManagedIdentity,
): any {
  return { type: item["type"], audience: item["audience"], client_id: item["client_id"] };
}

export function voiceAgentMcpAssignedManagedIdentityDeserializer(
  item: any,
): VoiceAgentMcpAssignedManagedIdentity {
  return {
    type: item["type"],
    audience: item["audience"],
    client_id: item["client_id"],
  };
}

/** Approval policy for MCP tool calls. */
export type VoiceAgentMcpApprovalPolicy = VoiceAgentMcpApprovalMode | Record<string, string[]>;

export function voiceAgentMcpApprovalPolicySerializer(item: VoiceAgentMcpApprovalPolicy): any {
  return item;
}

export function voiceAgentMcpApprovalPolicyDeserializer(item: any): VoiceAgentMcpApprovalPolicy {
  return item;
}

/** An MCP approval mode. */
export type VoiceAgentMcpApprovalMode = "never" | "always";
/** Tool-selection behavior for a voice-agent session or response. */
export type VoiceAgentToolChoice = ToolChoiceOptions | RealtimeToolChoiceFunction;

export function voiceAgentToolChoiceSerializer(item: VoiceAgentToolChoice): any {
  return item;
}

export function voiceAgentToolChoiceDeserializer(item: any): VoiceAgentToolChoice {
  return item;
}

/** A Realtime tool-choice object that forces the model to call a specific function. */
export interface RealtimeToolChoiceFunction {
  /** For function calling, the type is always `function`. */
  type: "function";
  /** The name of the function to call. */
  name: string;
}

export function realtimeToolChoiceFunctionSerializer(item: RealtimeToolChoiceFunction): any {
  return { type: item["type"], name: item["name"] };
}

export function realtimeToolChoiceFunctionDeserializer(item: any): RealtimeToolChoiceFunction {
  return {
    type: item["type"],
    name: item["name"],
  };
}

/** Additional server-output fields that a voice-agent session may request. */
export type VoiceAgentSessionIncludeOption =
  | "item.input_audio_transcription.logprobs"
  | "item.input_audio_transcription.phrases"
  | "file_search_call.results";

/** Voice-optimized instruction adaptation settings. */
export interface VoiceAgentVoiceAdaptation {
  /** The adaptation strategy. Always `auto`. */
  type: "auto";
}

export function voiceAgentVoiceAdaptationSerializer(item: VoiceAgentVoiceAdaptation): any {
  return { type: item["type"] };
}

export function voiceAgentVoiceAdaptationDeserializer(item: any): VoiceAgentVoiceAdaptation {
  return {
    type: item["type"],
  };
}

/** A customer-supplied handoff graph. */
export interface VoiceAgentHandoffGraphConfig {
  /** The maximum number of successful transfers in the session. */
  max_transfers?: number;
  /** The maximum number of transfer attempts in the session. */
  max_attempts?: number;
  /** The explicitly configured handoff targets. */
  nodes: VoiceAgentHandoffNodeConfig[];
  /** The directed transitions between handoff nodes. */
  edges: VoiceAgentHandoffEdgeConfig[];
}

export function voiceAgentHandoffGraphConfigSerializer(item: VoiceAgentHandoffGraphConfig): any {
  return {
    max_transfers: item["max_transfers"],
    max_attempts: item["max_attempts"],
    nodes: voiceAgentHandoffNodeConfigArraySerializer(item["nodes"]),
    edges: voiceAgentHandoffEdgeConfigArraySerializer(item["edges"]),
  };
}

export function voiceAgentHandoffGraphConfigDeserializer(item: any): VoiceAgentHandoffGraphConfig {
  return {
    max_transfers: item["max_transfers"],
    max_attempts: item["max_attempts"],
    nodes: voiceAgentHandoffNodeConfigArrayDeserializer(item["nodes"]),
    edges: voiceAgentHandoffEdgeConfigArrayDeserializer(item["edges"]),
  };
}

export function voiceAgentHandoffNodeConfigArraySerializer(
  result: Array<VoiceAgentHandoffNodeConfig>,
): any[] {
  return result.map((item) => {
    return voiceAgentHandoffNodeConfigSerializer(item);
  });
}

export function voiceAgentHandoffNodeConfigArrayDeserializer(
  result: Array<VoiceAgentHandoffNodeConfig>,
): any[] {
  return result.map((item) => {
    return voiceAgentHandoffNodeConfigDeserializer(item);
  });
}

/** A configured handoff target and its node-scoped behavior. */
export interface VoiceAgentHandoffNodeConfig {
  /** The node identifier. */
  id: string;
  /** A non-empty description used to select this target. */
  description: string;
  /** Session behavior applied after transferring to this node. */
  config: VoiceAgentHandoffNodeSessionConfig;
}

export function voiceAgentHandoffNodeConfigSerializer(item: VoiceAgentHandoffNodeConfig): any {
  return {
    id: item["id"],
    description: item["description"],
    config: voiceAgentHandoffNodeSessionConfigSerializer(item["config"]),
  };
}

export function voiceAgentHandoffNodeConfigDeserializer(item: any): VoiceAgentHandoffNodeConfig {
  return {
    id: item["id"],
    description: item["description"],
    config: voiceAgentHandoffNodeSessionConfigDeserializer(item["config"]),
  };
}

/** Session behavior applied at a handoff target. */
export interface VoiceAgentHandoffNodeSessionConfig {
  /** The target model, when different from the current node. */
  model?: string;
  /** Instructions applied at the target node. */
  instructions?: string;
  /** Tools available at the target node. */
  tools?: VoiceAgentSessionTool[];
  /** Tool-selection behavior at the target node. */
  tool_choice?: VoiceAgentToolChoice;
  /** The target node's voice. */
  voice?: VoiceAgentVoice;
  /** The target node's sampling temperature. */
  temperature?: number;
  /** The target node's maximum output-token count. */
  max_response_output_tokens?: VoiceAgentMaxOutputTokens;
  /** The reasoning effort used at the target node. */
  reasoning_effort?: VoiceAgentHandoffReasoningEffort;
  /** Voice adaptation applied at the target node. */
  voice_adaptation?: VoiceAgentVoiceAdaptation;
  /** Interim-response settings applied at the target node. */
  interim_response?: VoiceAgentInterimResponse;
  /** Whether the target model may call multiple tools in parallel. */
  parallel_tool_calls?: boolean;
}

export function voiceAgentHandoffNodeSessionConfigSerializer(
  item: VoiceAgentHandoffNodeSessionConfig,
): any {
  return {
    model: item["model"],
    instructions: item["instructions"],
    tools: !item["tools"] ? item["tools"] : voiceAgentSessionToolArraySerializer(item["tools"]),
    tool_choice: !item["tool_choice"]
      ? item["tool_choice"]
      : voiceAgentToolChoiceSerializer(item["tool_choice"]),
    voice: !item["voice"] ? item["voice"] : voiceAgentVoiceSerializer(item["voice"]),
    temperature: item["temperature"],
    max_response_output_tokens: !item["max_response_output_tokens"]
      ? item["max_response_output_tokens"]
      : voiceAgentMaxOutputTokensSerializer(item["max_response_output_tokens"]),
    reasoning_effort: item["reasoning_effort"],
    voice_adaptation: !item["voice_adaptation"]
      ? item["voice_adaptation"]
      : voiceAgentVoiceAdaptationSerializer(item["voice_adaptation"]),
    interim_response: !item["interim_response"]
      ? item["interim_response"]
      : voiceAgentInterimResponseSerializer(item["interim_response"]),
    parallel_tool_calls: item["parallel_tool_calls"],
  };
}

export function voiceAgentHandoffNodeSessionConfigDeserializer(
  item: any,
): VoiceAgentHandoffNodeSessionConfig {
  return {
    model: item["model"],
    instructions: item["instructions"],
    tools: !item["tools"] ? item["tools"] : voiceAgentSessionToolArrayDeserializer(item["tools"]),
    tool_choice: !item["tool_choice"]
      ? item["tool_choice"]
      : voiceAgentToolChoiceDeserializer(item["tool_choice"]),
    voice: !item["voice"] ? item["voice"] : voiceAgentVoiceDeserializer(item["voice"]),
    temperature: item["temperature"],
    max_response_output_tokens: !item["max_response_output_tokens"]
      ? item["max_response_output_tokens"]
      : voiceAgentMaxOutputTokensDeserializer(item["max_response_output_tokens"]),
    reasoning_effort: item["reasoning_effort"],
    voice_adaptation: !item["voice_adaptation"]
      ? item["voice_adaptation"]
      : voiceAgentVoiceAdaptationDeserializer(item["voice_adaptation"]),
    interim_response: !item["interim_response"]
      ? item["interim_response"]
      : voiceAgentInterimResponseDeserializer(item["interim_response"]),
    parallel_tool_calls: item["parallel_tool_calls"],
  };
}

/** Reasoning effort accepted by a handoff target. */
export type VoiceAgentHandoffReasoningEffort =
  "none" | "minimal" | "low" | "medium" | "high" | "xhigh";

export function voiceAgentHandoffEdgeConfigArraySerializer(
  result: Array<VoiceAgentHandoffEdgeConfig>,
): any[] {
  return result.map((item) => {
    return voiceAgentHandoffEdgeConfigSerializer(item);
  });
}

export function voiceAgentHandoffEdgeConfigArrayDeserializer(
  result: Array<VoiceAgentHandoffEdgeConfig>,
): any[] {
  return result.map((item) => {
    return voiceAgentHandoffEdgeConfigDeserializer(item);
  });
}

/** A directed transition between handoff nodes. */
export interface VoiceAgentHandoffEdgeConfig {
  /** The edge identifier. */
  id: string;
  /** The source node identifier. */
  source: string;
  /** The target node identifier. */
  target: string;
  /** A non-empty description used by the model to select this transition. */
  description: string;
  /** Whether user interruption cancels the transition. */
  cancel_on_interruption?: boolean;
  /** The delay before the target behavior is committed, in milliseconds. */
  delayInMs?: number;
  /** Optional text synthesized while transferring. */
  transfer_message?: string;
  /** Whether the target automatically creates a response after transfer. */
  target_response?: VoiceAgentHandoffTargetResponse;
}

export function voiceAgentHandoffEdgeConfigSerializer(item: VoiceAgentHandoffEdgeConfig): any {
  return {
    id: item["id"],
    source: item["source"],
    target: item["target"],
    description: item["description"],
    cancel_on_interruption: item["cancel_on_interruption"],
    delay_ms: item["delayInMs"],
    transfer_message: item["transfer_message"],
    target_response: item["target_response"],
  };
}

export function voiceAgentHandoffEdgeConfigDeserializer(item: any): VoiceAgentHandoffEdgeConfig {
  return {
    id: item["id"],
    source: item["source"],
    target: item["target"],
    description: item["description"],
    cancel_on_interruption: item["cancel_on_interruption"],
    delayInMs: item["delay_ms"],
    transfer_message: item["transfer_message"],
    target_response: item["target_response"],
  };
}

/** Whether a handoff target creates a response after transfer. */
export type VoiceAgentHandoffTargetResponse = "auto" | "none";

/** The `session.update` client event. */
export interface VoiceAgentClientEventSessionUpdate {
  /** Optional client-generated ID used to identify this event. This is an arbitrary string that a client may assign. It will be passed back if there is an error with the event, but the corresponding `session.updated` event will not include it. */
  event_id?: string;
  /** The event type, must be `session.update`. */
  type: "session.update";
  /** The stable realtime session fields to update. */
  session: VoiceAgentSessionUpdateConfig;
}

export function voiceAgentClientEventSessionUpdateSerializer(
  item: VoiceAgentClientEventSessionUpdate,
): any {
  return {
    event_id: item["event_id"],
    type: item["type"],
    session: voiceAgentSessionUpdateConfigSerializer(item["session"]),
  };
}

export function voiceAgentClientEventSessionUpdateDeserializer(
  item: any,
): VoiceAgentClientEventSessionUpdate {
  return {
    event_id: item["event_id"],
    type: item["type"],
    session: voiceAgentSessionUpdateConfigDeserializer(item["session"]),
  };
}

/** The `session.avatar.connect` client event. */
export interface VoiceAgentClientEventSessionAvatarConnect {
  /** The event type. Always `session.avatar.connect`. */
  type: "session.avatar.connect";
  /** An optional client-generated event identifier. */
  event_id?: string;
  /** The client's SDP offer for avatar media negotiation. */
  client_sdp: string;
}

export function voiceAgentClientEventSessionAvatarConnectSerializer(
  item: VoiceAgentClientEventSessionAvatarConnect,
): any {
  return { type: item["type"], event_id: item["event_id"], client_sdp: item["client_sdp"] };
}

export function voiceAgentClientEventSessionAvatarConnectDeserializer(
  item: any,
): VoiceAgentClientEventSessionAvatarConnect {
  return {
    type: item["type"],
    event_id: item["event_id"],
    client_sdp: item["client_sdp"],
  };
}

/** The `conversation.item.added` server event. */
export interface VoiceAgentServerEventConversationItemAdded {
  /** The unique ID of the server event. */
  event_id: string;
  /** The event type, must be `conversation.item.added`. */
  type: "conversation.item.added";
  previous_item_id?: string;
  /** The item added to the conversation. */
  item: VoiceAgentResponseItem;
}

export function voiceAgentServerEventConversationItemAddedSerializer(
  item: VoiceAgentServerEventConversationItemAdded,
): any {
  return {
    event_id: item["event_id"],
    type: item["type"],
    previous_item_id: item["previous_item_id"],
    item: voiceAgentResponseItemSerializer(item["item"]),
  };
}

export function voiceAgentServerEventConversationItemAddedDeserializer(
  item: any,
): VoiceAgentServerEventConversationItemAdded {
  return {
    event_id: item["event_id"],
    type: item["type"],
    previous_item_id: item["previous_item_id"],
    item: voiceAgentResponseItemDeserializer(item["item"]),
  };
}

/** An item returned in a voice-agent response or item event. */
export type VoiceAgentResponseItem =
  | VoiceAgentResponseMessageItem
  | VoiceFunctionCallItem
  | VoiceFunctionCallOutputItem
  | VoiceMcpListToolsItem
  | VoiceMcpCallItem
  | VoiceMcpApprovalRequestItem
  | VoiceMcpApprovalResponseItem
  | VoiceAgentWorkflowActionItem
  | VoiceAgentWebSearchCallItem
  | VoiceAgentFileSearchCallItem;

export function voiceAgentResponseItemSerializer(item: VoiceAgentResponseItem): any {
  return item;
}

export function voiceAgentResponseItemDeserializer(item: any): VoiceAgentResponseItem {
  return item;
}

/** A role-specific message item returned by the voice-agent runtime. */
export type VoiceAgentResponseMessageItem =
  | RealtimeConversationItemMessageSystem
  | RealtimeConversationItemMessageUser
  | RealtimeConversationItemMessageAssistant;

export function voiceAgentResponseMessageItemSerializer(item: VoiceAgentResponseMessageItem): any {
  return item;
}

export function voiceAgentResponseMessageItemDeserializer(
  item: any,
): VoiceAgentResponseMessageItem {
  return item;
}

/** A workflow action output item. */
export interface VoiceAgentWorkflowActionItem {
  id: string | null;
  object?: "realtime.item";
  type: "workflow_action";
  action_id: string;
  status: string;
  kind?: string;
  parent_action_id?: string;
  previous_action_id?: string;
}

export function voiceAgentWorkflowActionItemSerializer(item: VoiceAgentWorkflowActionItem): any {
  return {
    id: item["id"],
    object: item["object"],
    type: item["type"],
    action_id: item["action_id"],
    status: item["status"],
    kind: item["kind"],
    parent_action_id: item["parent_action_id"],
    previous_action_id: item["previous_action_id"],
  };
}

export function voiceAgentWorkflowActionItemDeserializer(item: any): VoiceAgentWorkflowActionItem {
  return {
    id: item["id"],
    object: item["object"],
    type: item["type"],
    action_id: item["action_id"],
    status: item["status"],
    kind: item["kind"],
    parent_action_id: item["parent_action_id"],
    previous_action_id: item["previous_action_id"],
  };
}

/** A web-search output item. */
export interface VoiceAgentWebSearchCallItem {
  id: string;
  type: "web_search_call";
  status: VoiceAgentWebSearchCallStatus;
  action?: VoiceAgentWebSearchAction;
}

export function voiceAgentWebSearchCallItemSerializer(item: VoiceAgentWebSearchCallItem): any {
  return {
    id: item["id"],
    type: item["type"],
    status: item["status"],
    action: !item["action"] ? item["action"] : voiceAgentWebSearchActionSerializer(item["action"]),
  };
}

export function voiceAgentWebSearchCallItemDeserializer(item: any): VoiceAgentWebSearchCallItem {
  return {
    id: item["id"],
    type: item["type"],
    status: item["status"],
    action: !item["action"]
      ? item["action"]
      : voiceAgentWebSearchActionDeserializer(item["action"]),
  };
}

/** The status of a web-search call. */
export type VoiceAgentWebSearchCallStatus = "in_progress" | "searching" | "completed" | "failed";
/** An action performed by a web-search tool call. */
export type VoiceAgentWebSearchAction =
  | VoiceAgentWebSearchActionSearch
  | VoiceAgentWebSearchActionOpenPage
  | VoiceAgentWebSearchActionFind;

export function voiceAgentWebSearchActionSerializer(item: VoiceAgentWebSearchAction): any {
  return item;
}

export function voiceAgentWebSearchActionDeserializer(item: any): VoiceAgentWebSearchAction {
  return item;
}

/** A web search action. */
export interface VoiceAgentWebSearchActionSearch {
  type: "search";
  query: string | null;
  sources?: VoiceAgentWebSearchSource[];
}

export function voiceAgentWebSearchActionSearchSerializer(
  item: VoiceAgentWebSearchActionSearch,
): any {
  return {
    type: item["type"],
    query: item["query"],
    sources: !item["sources"]
      ? item["sources"]
      : voiceAgentWebSearchSourceArraySerializer(item["sources"]),
  };
}

export function voiceAgentWebSearchActionSearchDeserializer(
  item: any,
): VoiceAgentWebSearchActionSearch {
  return {
    type: item["type"],
    query: item["query"],
    sources: !item["sources"]
      ? item["sources"]
      : voiceAgentWebSearchSourceArrayDeserializer(item["sources"]),
  };
}

export function voiceAgentWebSearchSourceArraySerializer(
  result: Array<VoiceAgentWebSearchSource>,
): any[] {
  return result.map((item) => {
    return voiceAgentWebSearchSourceSerializer(item);
  });
}

export function voiceAgentWebSearchSourceArrayDeserializer(
  result: Array<VoiceAgentWebSearchSource>,
): any[] {
  return result.map((item) => {
    return voiceAgentWebSearchSourceDeserializer(item);
  });
}

/** A web-search source URL. */
export interface VoiceAgentWebSearchSource {
  type: "url";
  url: string;
}

export function voiceAgentWebSearchSourceSerializer(item: VoiceAgentWebSearchSource): any {
  return { type: item["type"], url: item["url"] };
}

export function voiceAgentWebSearchSourceDeserializer(item: any): VoiceAgentWebSearchSource {
  return {
    type: item["type"],
    url: item["url"],
  };
}

/** An action that opens a web page. */
export interface VoiceAgentWebSearchActionOpenPage {
  type: "open_page";
  url: string;
}

export function voiceAgentWebSearchActionOpenPageSerializer(
  item: VoiceAgentWebSearchActionOpenPage,
): any {
  return { type: item["type"], url: item["url"] };
}

export function voiceAgentWebSearchActionOpenPageDeserializer(
  item: any,
): VoiceAgentWebSearchActionOpenPage {
  return {
    type: item["type"],
    url: item["url"],
  };
}

/** An action that finds text on a web page. */
export interface VoiceAgentWebSearchActionFind {
  type: "find";
  pattern: string;
  url: string;
}

export function voiceAgentWebSearchActionFindSerializer(item: VoiceAgentWebSearchActionFind): any {
  return { type: item["type"], pattern: item["pattern"], url: item["url"] };
}

export function voiceAgentWebSearchActionFindDeserializer(
  item: any,
): VoiceAgentWebSearchActionFind {
  return {
    type: item["type"],
    pattern: item["pattern"],
    url: item["url"],
  };
}

/** A file-search output item. */
export interface VoiceAgentFileSearchCallItem {
  id: string;
  type: "file_search_call";
  status: VoiceAgentFileSearchCallStatus;
  queries?: string[];
  results?: VoiceAgentFileSearchResult[];
}

export function voiceAgentFileSearchCallItemSerializer(item: VoiceAgentFileSearchCallItem): any {
  return {
    id: item["id"],
    type: item["type"],
    status: item["status"],
    queries: !item["queries"]
      ? item["queries"]
      : item["queries"].map((p: any) => {
          return p;
        }),
    results: !item["results"]
      ? item["results"]
      : voiceAgentFileSearchResultArraySerializer(item["results"]),
  };
}

export function voiceAgentFileSearchCallItemDeserializer(item: any): VoiceAgentFileSearchCallItem {
  return {
    id: item["id"],
    type: item["type"],
    status: item["status"],
    queries: !item["queries"]
      ? item["queries"]
      : item["queries"].map((p1: any) => {
          return p1;
        }),
    results: !item["results"]
      ? item["results"]
      : voiceAgentFileSearchResultArrayDeserializer(item["results"]),
  };
}

/** The status of a file-search call. */
export type VoiceAgentFileSearchCallStatus =
  "in_progress" | "searching" | "completed" | "incomplete" | "failed";

export function voiceAgentFileSearchResultArraySerializer(
  result: Array<VoiceAgentFileSearchResult>,
): any[] {
  return result.map((item) => {
    return voiceAgentFileSearchResultSerializer(item);
  });
}

export function voiceAgentFileSearchResultArrayDeserializer(
  result: Array<VoiceAgentFileSearchResult>,
): any[] {
  return result.map((item) => {
    return voiceAgentFileSearchResultDeserializer(item);
  });
}

/** One result returned by a file-search call. */
export interface VoiceAgentFileSearchResult {
  attributes?: Record<string, VoiceAgentFileSearchAttributeValue>;
  file_id?: string;
  filename?: string;
  score?: number;
  text?: string;
}

export function voiceAgentFileSearchResultSerializer(item: VoiceAgentFileSearchResult): any {
  return {
    attributes: !item["attributes"]
      ? item["attributes"]
      : voiceAgentFileSearchAttributeValueRecordSerializer(item["attributes"]),
    file_id: item["file_id"],
    filename: item["filename"],
    score: item["score"],
    text: item["text"],
  };
}

export function voiceAgentFileSearchResultDeserializer(item: any): VoiceAgentFileSearchResult {
  return {
    attributes: !item["attributes"]
      ? item["attributes"]
      : voiceAgentFileSearchAttributeValueRecordDeserializer(item["attributes"]),
    file_id: item["file_id"],
    filename: item["filename"],
    score: item["score"],
    text: item["text"],
  };
}

export function voiceAgentFileSearchAttributeValueRecordSerializer(
  item: Record<string, VoiceAgentFileSearchAttributeValue>,
): Record<string, any> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : voiceAgentFileSearchAttributeValueSerializer(item[key]);
  });
  return result;
}

export function voiceAgentFileSearchAttributeValueRecordDeserializer(
  item: Record<string, any>,
): Record<string, VoiceAgentFileSearchAttributeValue> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key]
      ? item[key]
      : voiceAgentFileSearchAttributeValueDeserializer(item[key]);
  });
  return result;
}

/** A scalar metadata value returned with a file-search result. */
export type VoiceAgentFileSearchAttributeValue = string | number | boolean;

export function voiceAgentFileSearchAttributeValueSerializer(
  item: VoiceAgentFileSearchAttributeValue,
): any {
  return item;
}

export function voiceAgentFileSearchAttributeValueDeserializer(
  item: any,
): VoiceAgentFileSearchAttributeValue {
  return item;
}

/** The `conversation.item.created` server event. */
export interface VoiceAgentServerEventConversationItemCreated {
  /** The unique ID of the server event. */
  event_id: string;
  /** The event type, must be `conversation.item.created`. */
  type: "conversation.item.created";
  previous_item_id?: string;
  /** The created conversation item. */
  item: VoiceAgentResponseItem;
}

export function voiceAgentServerEventConversationItemCreatedSerializer(
  item: VoiceAgentServerEventConversationItemCreated,
): any {
  return {
    event_id: item["event_id"],
    type: item["type"],
    previous_item_id: item["previous_item_id"],
    item: voiceAgentResponseItemSerializer(item["item"]),
  };
}

export function voiceAgentServerEventConversationItemCreatedDeserializer(
  item: any,
): VoiceAgentServerEventConversationItemCreated {
  return {
    event_id: item["event_id"],
    type: item["type"],
    previous_item_id: item["previous_item_id"],
    item: voiceAgentResponseItemDeserializer(item["item"]),
  };
}

/** The `conversation.item.deleted` server event. */
export interface VoiceAgentServerEventConversationItemDeleted {
  /** The unique ID of the server event. */
  event_id: string;
  /** The event type, must be `conversation.item.deleted`. */
  type: "conversation.item.deleted";
  /** The ID of the item that was deleted. */
  item_id: string;
}

export function voiceAgentServerEventConversationItemDeletedSerializer(
  item: VoiceAgentServerEventConversationItemDeleted,
): any {
  return { event_id: item["event_id"], type: item["type"], item_id: item["item_id"] };
}

export function voiceAgentServerEventConversationItemDeletedDeserializer(
  item: any,
): VoiceAgentServerEventConversationItemDeleted {
  return {
    event_id: item["event_id"],
    type: item["type"],
    item_id: item["item_id"],
  };
}

/** The `conversation.item.done` server event. */
export interface VoiceAgentServerEventConversationItemDone {
  /** The unique ID of the server event. */
  event_id: string;
  /** The event type, must be `conversation.item.done`. */
  type: "conversation.item.done";
  previous_item_id?: string;
  /** The completed conversation item. */
  item: VoiceAgentResponseItem;
}

export function voiceAgentServerEventConversationItemDoneSerializer(
  item: VoiceAgentServerEventConversationItemDone,
): any {
  return {
    event_id: item["event_id"],
    type: item["type"],
    previous_item_id: item["previous_item_id"],
    item: voiceAgentResponseItemSerializer(item["item"]),
  };
}

export function voiceAgentServerEventConversationItemDoneDeserializer(
  item: any,
): VoiceAgentServerEventConversationItemDone {
  return {
    event_id: item["event_id"],
    type: item["type"],
    previous_item_id: item["previous_item_id"],
    item: voiceAgentResponseItemDeserializer(item["item"]),
  };
}

/** The `conversation.item.input_audio_transcription.completed` server event. */
export interface VoiceAgentServerEventConversationItemInputAudioTranscriptionCompleted {
  /** The unique ID of the server event. */
  event_id: string;
  /**
   * The event type, must be
   *   `conversation.item.input_audio_transcription.completed`.
   */
  type: "conversation.item.input_audio_transcription.completed";
  /** The ID of the item containing the audio that is being transcribed. */
  item_id: string;
  /** The index of the content part containing the audio. */
  content_index: number;
  /** The transcribed text. */
  transcript: string;
  logprobs?: LogProbProperties[];
  /** Usage statistics for the transcription, this is billed according to the ASR model's pricing rather than the realtime model's pricing. */
  usage: TranscriptTextUsageTokens | TranscriptTextUsageDuration;
  /** Phrase-level transcription timing and confidence details. */
  phrases?: VoiceAgentTranscriptionPhrase[];
}

export function voiceAgentServerEventConversationItemInputAudioTranscriptionCompletedSerializer(
  item: VoiceAgentServerEventConversationItemInputAudioTranscriptionCompleted,
): any {
  return {
    event_id: item["event_id"],
    type: item["type"],
    item_id: item["item_id"],
    content_index: item["content_index"],
    transcript: item["transcript"],
    logprobs: !item["logprobs"]
      ? item["logprobs"]
      : logProbPropertiesArraySerializer(item["logprobs"]),
    usage: _voiceAgentServerEventConversationItemInputAudioTranscriptionCompletedUsageSerializer(
      item["usage"],
    ),
    phrases: !item["phrases"]
      ? item["phrases"]
      : voiceAgentTranscriptionPhraseArraySerializer(item["phrases"]),
  };
}

export function voiceAgentServerEventConversationItemInputAudioTranscriptionCompletedDeserializer(
  item: any,
): VoiceAgentServerEventConversationItemInputAudioTranscriptionCompleted {
  return {
    event_id: item["event_id"],
    type: item["type"],
    item_id: item["item_id"],
    content_index: item["content_index"],
    transcript: item["transcript"],
    logprobs: !item["logprobs"]
      ? item["logprobs"]
      : logProbPropertiesArrayDeserializer(item["logprobs"]),
    usage: _voiceAgentServerEventConversationItemInputAudioTranscriptionCompletedUsageDeserializer(
      item["usage"],
    ),
    phrases: !item["phrases"]
      ? item["phrases"]
      : voiceAgentTranscriptionPhraseArrayDeserializer(item["phrases"]),
  };
}

export function logProbPropertiesArraySerializer(result: Array<LogProbProperties>): any[] {
  return result.map((item) => {
    return logProbPropertiesSerializer(item);
  });
}

export function logProbPropertiesArrayDeserializer(result: Array<LogProbProperties>): any[] {
  return result.map((item) => {
    return logProbPropertiesDeserializer(item);
  });
}

/** A log probability object. */
export interface LogProbProperties {
  /** The token that was used to generate the log probability. */
  token: string;
  /** The log probability of the token. */
  logprob: number;
  /** The bytes that were used to generate the log probability. */
  bytes: number[];
}

export function logProbPropertiesSerializer(item: LogProbProperties): any {
  return {
    token: item["token"],
    logprob: item["logprob"],
    bytes: item["bytes"].map((p: any) => {
      return p;
    }),
  };
}

export function logProbPropertiesDeserializer(item: any): LogProbProperties {
  return {
    token: item["token"],
    logprob: item["logprob"],
    bytes: item["bytes"].map((p: any) => {
      return p;
    }),
  };
}

/** Alias for _VoiceAgentServerEventConversationItemInputAudioTranscriptionCompletedUsage */
export type _VoiceAgentServerEventConversationItemInputAudioTranscriptionCompletedUsage =
  TranscriptTextUsageTokens | TranscriptTextUsageDuration;

export function _voiceAgentServerEventConversationItemInputAudioTranscriptionCompletedUsageSerializer(
  item: _VoiceAgentServerEventConversationItemInputAudioTranscriptionCompletedUsage,
): any {
  return item;
}

export function _voiceAgentServerEventConversationItemInputAudioTranscriptionCompletedUsageDeserializer(
  item: any,
): _VoiceAgentServerEventConversationItemInputAudioTranscriptionCompletedUsage {
  return item;
}

/** Usage statistics for models billed by token usage. */
export interface TranscriptTextUsageTokens extends CreateTranscriptionResponseJsonUsage {
  /** The type of the usage object. Always `tokens` for this variant. */
  type: "tokens";
  /** Number of input tokens billed for this request. */
  input_tokens: number;
  /** Details about the input tokens billed for this request. */
  input_token_details?: TranscriptTextUsageTokensInputTokenDetails;
  /** Number of output tokens generated. */
  output_tokens: number;
  /** Total number of tokens used (input + output). */
  total_tokens: number;
}

export function transcriptTextUsageTokensSerializer(item: TranscriptTextUsageTokens): any {
  return {
    type: item["type"],
    input_tokens: item["input_tokens"],
    input_token_details: !item["input_token_details"]
      ? item["input_token_details"]
      : transcriptTextUsageTokensInputTokenDetailsSerializer(item["input_token_details"]),
    output_tokens: item["output_tokens"],
    total_tokens: item["total_tokens"],
  };
}

export function transcriptTextUsageTokensDeserializer(item: any): TranscriptTextUsageTokens {
  return {
    type: item["type"],
    input_tokens: item["input_tokens"],
    input_token_details: !item["input_token_details"]
      ? item["input_token_details"]
      : transcriptTextUsageTokensInputTokenDetailsDeserializer(item["input_token_details"]),
    output_tokens: item["output_tokens"],
    total_tokens: item["total_tokens"],
  };
}

/** model interface TranscriptTextUsageTokensInputTokenDetails */
export interface TranscriptTextUsageTokensInputTokenDetails {
  text_tokens?: number;
  audio_tokens?: number;
}

export function transcriptTextUsageTokensInputTokenDetailsSerializer(
  item: TranscriptTextUsageTokensInputTokenDetails,
): any {
  return { text_tokens: item["text_tokens"], audio_tokens: item["audio_tokens"] };
}

export function transcriptTextUsageTokensInputTokenDetailsDeserializer(
  item: any,
): TranscriptTextUsageTokensInputTokenDetails {
  return {
    text_tokens: item["text_tokens"],
    audio_tokens: item["audio_tokens"],
  };
}

/** Usage statistics for models billed by audio input duration. */
export interface TranscriptTextUsageDuration extends CreateTranscriptionResponseJsonUsage {
  /** The type of the usage object. Always `duration` for this variant. */
  type: "duration";
  /** Duration of the input audio in seconds. */
  seconds: number;
}

export function transcriptTextUsageDurationSerializer(item: TranscriptTextUsageDuration): any {
  return { type: item["type"], seconds: item["seconds"] };
}

export function transcriptTextUsageDurationDeserializer(item: any): TranscriptTextUsageDuration {
  return {
    type: item["type"],
    seconds: item["seconds"],
  };
}

export function voiceAgentTranscriptionPhraseArraySerializer(
  result: Array<VoiceAgentTranscriptionPhrase>,
): any[] {
  return result.map((item) => {
    return voiceAgentTranscriptionPhraseSerializer(item);
  });
}

export function voiceAgentTranscriptionPhraseArrayDeserializer(
  result: Array<VoiceAgentTranscriptionPhrase>,
): any[] {
  return result.map((item) => {
    return voiceAgentTranscriptionPhraseDeserializer(item);
  });
}

/** A transcribed phrase with timing information. */
export interface VoiceAgentTranscriptionPhrase {
  /** The phrase offset from the beginning of the audio, in milliseconds. */
  offsetInMs: number;
  /** The phrase duration in milliseconds. */
  durationInMs: number;
  /** The transcribed phrase text. */
  text: string;
  /** Word-level timing details, when available. */
  words?: VoiceAgentTranscriptionWord[];
  /** The detected locale. */
  locale?: string;
  /** The transcription confidence score. */
  confidence?: number;
}

export function voiceAgentTranscriptionPhraseSerializer(item: VoiceAgentTranscriptionPhrase): any {
  return {
    offset_milliseconds: item["offsetInMs"],
    duration_milliseconds: item["durationInMs"],
    text: item["text"],
    words: !item["words"]
      ? item["words"]
      : voiceAgentTranscriptionWordArraySerializer(item["words"]),
    locale: item["locale"],
    confidence: item["confidence"],
  };
}

export function voiceAgentTranscriptionPhraseDeserializer(
  item: any,
): VoiceAgentTranscriptionPhrase {
  return {
    offsetInMs: item["offset_milliseconds"],
    durationInMs: item["duration_milliseconds"],
    text: item["text"],
    words: !item["words"]
      ? item["words"]
      : voiceAgentTranscriptionWordArrayDeserializer(item["words"]),
    locale: item["locale"],
    confidence: item["confidence"],
  };
}

export function voiceAgentTranscriptionWordArraySerializer(
  result: Array<VoiceAgentTranscriptionWord>,
): any[] {
  return result.map((item) => {
    return voiceAgentTranscriptionWordSerializer(item);
  });
}

export function voiceAgentTranscriptionWordArrayDeserializer(
  result: Array<VoiceAgentTranscriptionWord>,
): any[] {
  return result.map((item) => {
    return voiceAgentTranscriptionWordDeserializer(item);
  });
}

/** A time-stamped word in an input-audio transcription. */
export interface VoiceAgentTranscriptionWord {
  /** The transcribed word text. */
  text: string;
  /** The word offset from the beginning of the audio, in milliseconds. */
  offsetInMs: number;
  /** The word duration in milliseconds. */
  durationInMs: number;
}

export function voiceAgentTranscriptionWordSerializer(item: VoiceAgentTranscriptionWord): any {
  return {
    text: item["text"],
    offset_milliseconds: item["offsetInMs"],
    duration_milliseconds: item["durationInMs"],
  };
}

export function voiceAgentTranscriptionWordDeserializer(item: any): VoiceAgentTranscriptionWord {
  return {
    text: item["text"],
    offsetInMs: item["offset_milliseconds"],
    durationInMs: item["duration_milliseconds"],
  };
}

/** Token usage statistics for the request. */
export interface CreateTranscriptionResponseJsonUsage {
  type: CreateTranscriptionResponseJsonUsageType;
}

export function createTranscriptionResponseJsonUsageSerializer(
  item: CreateTranscriptionResponseJsonUsage,
): any {
  return { type: item["type"] };
}

export function createTranscriptionResponseJsonUsageDeserializer(
  item: any,
): CreateTranscriptionResponseJsonUsage {
  return {
    type: item["type"],
  };
}

/** Alias for CreateTranscriptionResponseJsonUsageUnion */
export type CreateTranscriptionResponseJsonUsageUnion =
  TranscriptTextUsageTokens | TranscriptTextUsageDuration | CreateTranscriptionResponseJsonUsage;

export function createTranscriptionResponseJsonUsageUnionSerializer(
  item: CreateTranscriptionResponseJsonUsageUnion,
): any {
  switch (item.type) {
    case "tokens":
      return transcriptTextUsageTokensSerializer(item as TranscriptTextUsageTokens);

    case "duration":
      return transcriptTextUsageDurationSerializer(item as TranscriptTextUsageDuration);

    default:
      return createTranscriptionResponseJsonUsageSerializer(item);
  }
}

export function createTranscriptionResponseJsonUsageUnionDeserializer(
  item: any,
): CreateTranscriptionResponseJsonUsageUnion {
  switch (item["type"]) {
    case "tokens":
      return transcriptTextUsageTokensDeserializer(item as TranscriptTextUsageTokens);

    case "duration":
      return transcriptTextUsageDurationDeserializer(item as TranscriptTextUsageDuration);

    default:
      return createTranscriptionResponseJsonUsageDeserializer(item);
  }
}

/** Type of CreateTranscriptionResponseJsonUsageType */
export type CreateTranscriptionResponseJsonUsageType = "tokens" | "duration";

/** The `conversation.item.input_audio_transcription.delta` server event. */
export interface VoiceAgentServerEventConversationItemInputAudioTranscriptionDelta {
  /** The unique ID of the server event. */
  event_id: string;
  /** The event type, must be `conversation.item.input_audio_transcription.delta`. */
  type: "conversation.item.input_audio_transcription.delta";
  /** The ID of the item containing the audio that is being transcribed. */
  item_id: string;
  /** The index of the content part in the item's content array. */
  content_index?: number;
  /** The text delta. */
  delta?: string;
  logprobs?: LogProbProperties[];
}

export function voiceAgentServerEventConversationItemInputAudioTranscriptionDeltaSerializer(
  item: VoiceAgentServerEventConversationItemInputAudioTranscriptionDelta,
): any {
  return {
    event_id: item["event_id"],
    type: item["type"],
    item_id: item["item_id"],
    content_index: item["content_index"],
    delta: item["delta"],
    logprobs: !item["logprobs"]
      ? item["logprobs"]
      : logProbPropertiesArraySerializer(item["logprobs"]),
  };
}

export function voiceAgentServerEventConversationItemInputAudioTranscriptionDeltaDeserializer(
  item: any,
): VoiceAgentServerEventConversationItemInputAudioTranscriptionDelta {
  return {
    event_id: item["event_id"],
    type: item["type"],
    item_id: item["item_id"],
    content_index: item["content_index"],
    delta: item["delta"],
    logprobs: !item["logprobs"]
      ? item["logprobs"]
      : logProbPropertiesArrayDeserializer(item["logprobs"]),
  };
}

/** The `conversation.item.input_audio_transcription.failed` server event. */
export interface VoiceAgentServerEventConversationItemInputAudioTranscriptionFailed {
  /** The unique ID of the server event. */
  event_id: string;
  /**
   * The event type, must be
   *   `conversation.item.input_audio_transcription.failed`.
   */
  type: "conversation.item.input_audio_transcription.failed";
  /** The ID of the user message item. */
  item_id: string;
  /** The index of the content part containing the audio. */
  content_index: number;
  /** Details of the transcription error. */
  error: RealtimeServerEventConversationItemInputAudioTranscriptionFailedError;
}

export function voiceAgentServerEventConversationItemInputAudioTranscriptionFailedSerializer(
  item: VoiceAgentServerEventConversationItemInputAudioTranscriptionFailed,
): any {
  return {
    event_id: item["event_id"],
    type: item["type"],
    item_id: item["item_id"],
    content_index: item["content_index"],
    error: realtimeServerEventConversationItemInputAudioTranscriptionFailedErrorSerializer(
      item["error"],
    ),
  };
}

export function voiceAgentServerEventConversationItemInputAudioTranscriptionFailedDeserializer(
  item: any,
): VoiceAgentServerEventConversationItemInputAudioTranscriptionFailed {
  return {
    event_id: item["event_id"],
    type: item["type"],
    item_id: item["item_id"],
    content_index: item["content_index"],
    error: realtimeServerEventConversationItemInputAudioTranscriptionFailedErrorDeserializer(
      item["error"],
    ),
  };
}

/** model interface RealtimeServerEventConversationItemInputAudioTranscriptionFailedError */
export interface RealtimeServerEventConversationItemInputAudioTranscriptionFailedError {
  type?: string;
  code?: string;
  message?: string;
  param?: string;
}

export function realtimeServerEventConversationItemInputAudioTranscriptionFailedErrorSerializer(
  item: RealtimeServerEventConversationItemInputAudioTranscriptionFailedError,
): any {
  return { type: item["type"], code: item["code"], message: item["message"], param: item["param"] };
}

export function realtimeServerEventConversationItemInputAudioTranscriptionFailedErrorDeserializer(
  item: any,
): RealtimeServerEventConversationItemInputAudioTranscriptionFailedError {
  return {
    type: item["type"],
    code: item["code"],
    message: item["message"],
    param: item["param"],
  };
}

/** The `conversation.item.input_audio_transcription.segment` server event. */
export interface VoiceAgentServerEventConversationItemInputAudioTranscriptionSegment {
  /** The unique ID of the server event. */
  event_id: string;
  /** The event type, must be `conversation.item.input_audio_transcription.segment`. */
  type: "conversation.item.input_audio_transcription.segment";
  /** The ID of the item containing the input audio content. */
  item_id: string;
  /** The index of the input audio content part within the item. */
  content_index: number;
  /** The text for this segment. */
  text: string;
  /** The segment identifier. */
  id: string;
  /** The detected speaker label for this segment. */
  speaker: string;
  /** Start time of the segment in seconds. */
  start: number;
  /** End time of the segment in seconds. */
  end: number;
}

export function voiceAgentServerEventConversationItemInputAudioTranscriptionSegmentSerializer(
  item: VoiceAgentServerEventConversationItemInputAudioTranscriptionSegment,
): any {
  return {
    event_id: item["event_id"],
    type: item["type"],
    item_id: item["item_id"],
    content_index: item["content_index"],
    text: item["text"],
    id: item["id"],
    speaker: item["speaker"],
    start: item["start"],
    end: item["end"],
  };
}

export function voiceAgentServerEventConversationItemInputAudioTranscriptionSegmentDeserializer(
  item: any,
): VoiceAgentServerEventConversationItemInputAudioTranscriptionSegment {
  return {
    event_id: item["event_id"],
    type: item["type"],
    item_id: item["item_id"],
    content_index: item["content_index"],
    text: item["text"],
    id: item["id"],
    speaker: item["speaker"],
    start: item["start"],
    end: item["end"],
  };
}

/** The `conversation.item.retrieved` server event. */
export interface VoiceAgentServerEventConversationItemRetrieved {
  /** The unique ID of the server event. */
  event_id: string;
  /** The event type, must be `conversation.item.retrieved`. */
  type: "conversation.item.retrieved";
  /** The retrieved conversation item. */
  item: VoiceAgentResponseItem;
}

export function voiceAgentServerEventConversationItemRetrievedSerializer(
  item: VoiceAgentServerEventConversationItemRetrieved,
): any {
  return {
    event_id: item["event_id"],
    type: item["type"],
    item: voiceAgentResponseItemSerializer(item["item"]),
  };
}

export function voiceAgentServerEventConversationItemRetrievedDeserializer(
  item: any,
): VoiceAgentServerEventConversationItemRetrieved {
  return {
    event_id: item["event_id"],
    type: item["type"],
    item: voiceAgentResponseItemDeserializer(item["item"]),
  };
}

/** The `conversation.item.truncated` server event. */
export interface VoiceAgentServerEventConversationItemTruncated {
  /** The unique ID of the server event. */
  event_id: string;
  /** The event type, must be `conversation.item.truncated`. */
  type: "conversation.item.truncated";
  /** The ID of the assistant message item that was truncated. */
  item_id: string;
  /** The index of the content part that was truncated. */
  content_index: number;
  /** The duration up to which the audio was truncated, in milliseconds. */
  audio_end_ms: number;
  /** The assistant message after truncation, when the service returns the updated item. */
  item?: RealtimeConversationItemMessageAssistant;
}

export function voiceAgentServerEventConversationItemTruncatedSerializer(
  item: VoiceAgentServerEventConversationItemTruncated,
): any {
  return {
    event_id: item["event_id"],
    type: item["type"],
    item_id: item["item_id"],
    content_index: item["content_index"],
    audio_end_ms: item["audio_end_ms"],
    item: !item["item"]
      ? item["item"]
      : realtimeConversationItemMessageAssistantSerializer(item["item"]),
  };
}

export function voiceAgentServerEventConversationItemTruncatedDeserializer(
  item: any,
): VoiceAgentServerEventConversationItemTruncated {
  return {
    event_id: item["event_id"],
    type: item["type"],
    item_id: item["item_id"],
    content_index: item["content_index"],
    audio_end_ms: item["audio_end_ms"],
    item: !item["item"]
      ? item["item"]
      : realtimeConversationItemMessageAssistantDeserializer(item["item"]),
  };
}

/** The `input_audio_buffer.cleared` server event. */
export interface VoiceAgentServerEventInputAudioBufferCleared {
  /** The unique ID of the server event. */
  event_id: string;
  /** The event type, must be `input_audio_buffer.cleared`. */
  type: "input_audio_buffer.cleared";
}

export function voiceAgentServerEventInputAudioBufferClearedSerializer(
  item: VoiceAgentServerEventInputAudioBufferCleared,
): any {
  return { event_id: item["event_id"], type: item["type"] };
}

export function voiceAgentServerEventInputAudioBufferClearedDeserializer(
  item: any,
): VoiceAgentServerEventInputAudioBufferCleared {
  return {
    event_id: item["event_id"],
    type: item["type"],
  };
}

/** The `input_audio_buffer.committed` server event. */
export interface VoiceAgentServerEventInputAudioBufferCommitted {
  /** The unique ID of the server event. */
  event_id: string;
  /** The event type, must be `input_audio_buffer.committed`. */
  type: "input_audio_buffer.committed";
  previous_item_id?: string;
  /** The ID of the user message item that will be created. */
  item_id: string;
}

export function voiceAgentServerEventInputAudioBufferCommittedSerializer(
  item: VoiceAgentServerEventInputAudioBufferCommitted,
): any {
  return {
    event_id: item["event_id"],
    type: item["type"],
    previous_item_id: item["previous_item_id"],
    item_id: item["item_id"],
  };
}

export function voiceAgentServerEventInputAudioBufferCommittedDeserializer(
  item: any,
): VoiceAgentServerEventInputAudioBufferCommitted {
  return {
    event_id: item["event_id"],
    type: item["type"],
    previous_item_id: item["previous_item_id"],
    item_id: item["item_id"],
  };
}

/** The `input_audio_buffer.speech_started` server event. */
export interface VoiceAgentServerEventInputAudioBufferSpeechStarted {
  /** The unique ID of the server event. */
  event_id: string;
  /** The event type, must be `input_audio_buffer.speech_started`. */
  type: "input_audio_buffer.speech_started";
  /**
   * Milliseconds from the start of all audio written to the buffer during the
   *   session when speech was first detected. This will correspond to the
   *   beginning of audio sent to the model, and thus includes the
   *   `prefix_padding_ms` configured in the Session.
   */
  audio_start_ms: number;
  /** The ID of the user message item that will be created when speech stops. */
  item_id: string;
}

export function voiceAgentServerEventInputAudioBufferSpeechStartedSerializer(
  item: VoiceAgentServerEventInputAudioBufferSpeechStarted,
): any {
  return {
    event_id: item["event_id"],
    type: item["type"],
    audio_start_ms: item["audio_start_ms"],
    item_id: item["item_id"],
  };
}

export function voiceAgentServerEventInputAudioBufferSpeechStartedDeserializer(
  item: any,
): VoiceAgentServerEventInputAudioBufferSpeechStarted {
  return {
    event_id: item["event_id"],
    type: item["type"],
    audio_start_ms: item["audio_start_ms"],
    item_id: item["item_id"],
  };
}

/** The `input_audio_buffer.speech_stopped` server event. */
export interface VoiceAgentServerEventInputAudioBufferSpeechStopped {
  /** The unique ID of the server event. */
  event_id: string;
  /** The event type, must be `input_audio_buffer.speech_stopped`. */
  type: "input_audio_buffer.speech_stopped";
  /**
   * Milliseconds since the session started when speech stopped. This will
   *   correspond to the end of audio sent to the model, and thus includes the
   *   `min_silence_duration_ms` configured in the Session.
   */
  audio_end_ms: number;
  /** The ID of the user message item that will be created. */
  item_id: string;
}

export function voiceAgentServerEventInputAudioBufferSpeechStoppedSerializer(
  item: VoiceAgentServerEventInputAudioBufferSpeechStopped,
): any {
  return {
    event_id: item["event_id"],
    type: item["type"],
    audio_end_ms: item["audio_end_ms"],
    item_id: item["item_id"],
  };
}

export function voiceAgentServerEventInputAudioBufferSpeechStoppedDeserializer(
  item: any,
): VoiceAgentServerEventInputAudioBufferSpeechStopped {
  return {
    event_id: item["event_id"],
    type: item["type"],
    audio_end_ms: item["audio_end_ms"],
    item_id: item["item_id"],
  };
}

/** The `input_audio_buffer.timeout_triggered` server event. */
export interface VoiceAgentServerEventInputAudioBufferTimeoutTriggered {
  /** The unique ID of the server event. */
  event_id: string;
  /** The event type, must be `input_audio_buffer.timeout_triggered`. */
  type: "input_audio_buffer.timeout_triggered";
  /** Millisecond offset of audio written to the input audio buffer that was after the playback time of the last model response. */
  audio_start_ms: number;
  /** Millisecond offset of audio written to the input audio buffer at the time the timeout was triggered. */
  audio_end_ms: number;
  /** The ID of the item associated with this segment. */
  item_id: string;
}

export function voiceAgentServerEventInputAudioBufferTimeoutTriggeredSerializer(
  item: VoiceAgentServerEventInputAudioBufferTimeoutTriggered,
): any {
  return {
    event_id: item["event_id"],
    type: item["type"],
    audio_start_ms: item["audio_start_ms"],
    audio_end_ms: item["audio_end_ms"],
    item_id: item["item_id"],
  };
}

export function voiceAgentServerEventInputAudioBufferTimeoutTriggeredDeserializer(
  item: any,
): VoiceAgentServerEventInputAudioBufferTimeoutTriggered {
  return {
    event_id: item["event_id"],
    type: item["type"],
    audio_start_ms: item["audio_start_ms"],
    audio_end_ms: item["audio_end_ms"],
    item_id: item["item_id"],
  };
}

/** The `mcp_list_tools.completed` server event. */
export interface VoiceAgentServerEventMcpListToolsCompleted {
  /** The unique ID of the server event. */
  event_id: string;
  /** The event type, must be `mcp_list_tools.completed`. */
  type: "mcp_list_tools.completed";
  /** The ID of the MCP list tools item. */
  item_id: string;
}

export function voiceAgentServerEventMcpListToolsCompletedSerializer(
  item: VoiceAgentServerEventMcpListToolsCompleted,
): any {
  return { event_id: item["event_id"], type: item["type"], item_id: item["item_id"] };
}

export function voiceAgentServerEventMcpListToolsCompletedDeserializer(
  item: any,
): VoiceAgentServerEventMcpListToolsCompleted {
  return {
    event_id: item["event_id"],
    type: item["type"],
    item_id: item["item_id"],
  };
}

/** The `mcp_list_tools.failed` server event. */
export interface VoiceAgentServerEventMcpListToolsFailed {
  /** The unique ID of the server event. */
  event_id: string;
  /** The event type, must be `mcp_list_tools.failed`. */
  type: "mcp_list_tools.failed";
  /** The ID of the MCP list tools item. */
  item_id: string;
}

export function voiceAgentServerEventMcpListToolsFailedSerializer(
  item: VoiceAgentServerEventMcpListToolsFailed,
): any {
  return { event_id: item["event_id"], type: item["type"], item_id: item["item_id"] };
}

export function voiceAgentServerEventMcpListToolsFailedDeserializer(
  item: any,
): VoiceAgentServerEventMcpListToolsFailed {
  return {
    event_id: item["event_id"],
    type: item["type"],
    item_id: item["item_id"],
  };
}

/** The `mcp_list_tools.in_progress` server event. */
export interface VoiceAgentServerEventMcpListToolsInProgress {
  /** The unique ID of the server event. */
  event_id: string;
  /** The event type, must be `mcp_list_tools.in_progress`. */
  type: "mcp_list_tools.in_progress";
  /** The ID of the MCP list tools item. */
  item_id: string;
}

export function voiceAgentServerEventMcpListToolsInProgressSerializer(
  item: VoiceAgentServerEventMcpListToolsInProgress,
): any {
  return { event_id: item["event_id"], type: item["type"], item_id: item["item_id"] };
}

export function voiceAgentServerEventMcpListToolsInProgressDeserializer(
  item: any,
): VoiceAgentServerEventMcpListToolsInProgress {
  return {
    event_id: item["event_id"],
    type: item["type"],
    item_id: item["item_id"],
  };
}

/** The `output_audio_buffer.cleared` server event. */
export interface VoiceAgentServerEventOutputAudioBufferCleared {
  /** The unique ID of the server event. */
  event_id: string;
  /** The event type, must be `output_audio_buffer.cleared`. */
  type: "output_audio_buffer.cleared";
  /** The unique ID of the response that produced the audio. */
  response_id: string;
}

export function voiceAgentServerEventOutputAudioBufferClearedSerializer(
  item: VoiceAgentServerEventOutputAudioBufferCleared,
): any {
  return { event_id: item["event_id"], type: item["type"], response_id: item["response_id"] };
}

export function voiceAgentServerEventOutputAudioBufferClearedDeserializer(
  item: any,
): VoiceAgentServerEventOutputAudioBufferCleared {
  return {
    event_id: item["event_id"],
    type: item["type"],
    response_id: item["response_id"],
  };
}

/** The `rate_limits.updated` server event. */
export interface VoiceAgentServerEventRateLimitsUpdated {
  /** The unique ID of the server event. */
  event_id: string;
  /** The event type, must be `rate_limits.updated`. */
  type: "rate_limits.updated";
  /** List of rate limit information. */
  rate_limits: RealtimeServerEventRateLimitsUpdatedRateLimits[];
}

export function voiceAgentServerEventRateLimitsUpdatedSerializer(
  item: VoiceAgentServerEventRateLimitsUpdated,
): any {
  return {
    event_id: item["event_id"],
    type: item["type"],
    rate_limits: realtimeServerEventRateLimitsUpdatedRateLimitsArraySerializer(item["rate_limits"]),
  };
}

export function voiceAgentServerEventRateLimitsUpdatedDeserializer(
  item: any,
): VoiceAgentServerEventRateLimitsUpdated {
  return {
    event_id: item["event_id"],
    type: item["type"],
    rate_limits: realtimeServerEventRateLimitsUpdatedRateLimitsArrayDeserializer(
      item["rate_limits"],
    ),
  };
}

export function realtimeServerEventRateLimitsUpdatedRateLimitsArraySerializer(
  result: Array<RealtimeServerEventRateLimitsUpdatedRateLimits>,
): any[] {
  return result.map((item) => {
    return realtimeServerEventRateLimitsUpdatedRateLimitsSerializer(item);
  });
}

export function realtimeServerEventRateLimitsUpdatedRateLimitsArrayDeserializer(
  result: Array<RealtimeServerEventRateLimitsUpdatedRateLimits>,
): any[] {
  return result.map((item) => {
    return realtimeServerEventRateLimitsUpdatedRateLimitsDeserializer(item);
  });
}

/** model interface RealtimeServerEventRateLimitsUpdatedRateLimits */
export interface RealtimeServerEventRateLimitsUpdatedRateLimits {
  name?: "requests" | "tokens";
  limit?: number;
  remaining?: number;
  reset_seconds?: number;
}

export function realtimeServerEventRateLimitsUpdatedRateLimitsSerializer(
  item: RealtimeServerEventRateLimitsUpdatedRateLimits,
): any {
  return {
    name: item["name"],
    limit: item["limit"],
    remaining: item["remaining"],
    reset_seconds: item["reset_seconds"],
  };
}

export function realtimeServerEventRateLimitsUpdatedRateLimitsDeserializer(
  item: any,
): RealtimeServerEventRateLimitsUpdatedRateLimits {
  return {
    name: item["name"],
    limit: item["limit"],
    remaining: item["remaining"],
    reset_seconds: item["reset_seconds"],
  };
}

/** The `response.output_audio.delta` server event. */
export interface VoiceAgentServerEventResponseAudioDelta {
  /** The unique ID of the server event. */
  event_id: string;
  /** The event type, must be `response.output_audio.delta`. */
  type: "response.output_audio.delta";
  /** The ID of the response. */
  response_id: string;
  /** The ID of the item. */
  item_id: string;
  /** The index of the output item in the response. */
  output_index: number;
  /** The index of the content part in the item's content array. */
  content_index: number;
  /** Base64-encoded audio data delta. */
  delta: Uint8Array;
}

export function voiceAgentServerEventResponseAudioDeltaSerializer(
  item: VoiceAgentServerEventResponseAudioDelta,
): any {
  return {
    event_id: item["event_id"],
    type: item["type"],
    response_id: item["response_id"],
    item_id: item["item_id"],
    output_index: item["output_index"],
    content_index: item["content_index"],
    delta: uint8ArrayToString(item["delta"], "base64"),
  };
}

export function voiceAgentServerEventResponseAudioDeltaDeserializer(
  item: any,
): VoiceAgentServerEventResponseAudioDelta {
  return {
    event_id: item["event_id"],
    type: item["type"],
    response_id: item["response_id"],
    item_id: item["item_id"],
    output_index: item["output_index"],
    content_index: item["content_index"],
    delta:
      typeof item["delta"] === "string"
        ? stringToUint8Array(item["delta"], "base64")
        : item["delta"],
  };
}

/** The `response.output_audio.done` server event. */
export interface VoiceAgentServerEventResponseAudioDone {
  /** The unique ID of the server event. */
  event_id: string;
  /** The event type, must be `response.output_audio.done`. */
  type: "response.output_audio.done";
  /** The ID of the response. */
  response_id: string;
  /** The ID of the item. */
  item_id: string;
  /** The index of the output item in the response. */
  output_index: number;
  /** The index of the content part in the item's content array. */
  content_index: number;
}

export function voiceAgentServerEventResponseAudioDoneSerializer(
  item: VoiceAgentServerEventResponseAudioDone,
): any {
  return {
    event_id: item["event_id"],
    type: item["type"],
    response_id: item["response_id"],
    item_id: item["item_id"],
    output_index: item["output_index"],
    content_index: item["content_index"],
  };
}

export function voiceAgentServerEventResponseAudioDoneDeserializer(
  item: any,
): VoiceAgentServerEventResponseAudioDone {
  return {
    event_id: item["event_id"],
    type: item["type"],
    response_id: item["response_id"],
    item_id: item["item_id"],
    output_index: item["output_index"],
    content_index: item["content_index"],
  };
}

/** The `response.output_audio_transcript.delta` server event. */
export interface VoiceAgentServerEventResponseAudioTranscriptDelta {
  /** The unique ID of the server event. */
  event_id: string;
  /** The event type, must be `response.output_audio_transcript.delta`. */
  type: "response.output_audio_transcript.delta";
  /** The ID of the response. */
  response_id: string;
  /** The ID of the item. */
  item_id: string;
  /** The index of the output item in the response. */
  output_index: number;
  /** The index of the content part in the item's content array. */
  content_index: number;
  /** The transcript delta. */
  delta: string;
}

export function voiceAgentServerEventResponseAudioTranscriptDeltaSerializer(
  item: VoiceAgentServerEventResponseAudioTranscriptDelta,
): any {
  return {
    event_id: item["event_id"],
    type: item["type"],
    response_id: item["response_id"],
    item_id: item["item_id"],
    output_index: item["output_index"],
    content_index: item["content_index"],
    delta: item["delta"],
  };
}

export function voiceAgentServerEventResponseAudioTranscriptDeltaDeserializer(
  item: any,
): VoiceAgentServerEventResponseAudioTranscriptDelta {
  return {
    event_id: item["event_id"],
    type: item["type"],
    response_id: item["response_id"],
    item_id: item["item_id"],
    output_index: item["output_index"],
    content_index: item["content_index"],
    delta: item["delta"],
  };
}

/** The `response.output_audio_transcript.done` server event. */
export interface VoiceAgentServerEventResponseAudioTranscriptDone {
  /** The unique ID of the server event. */
  event_id: string;
  /** The event type, must be `response.output_audio_transcript.done`. */
  type: "response.output_audio_transcript.done";
  /** The ID of the response. */
  response_id: string;
  /** The ID of the item. */
  item_id: string;
  /** The index of the output item in the response. */
  output_index: number;
  /** The index of the content part in the item's content array. */
  content_index: number;
  /** The final transcript of the audio. */
  transcript: string;
}

export function voiceAgentServerEventResponseAudioTranscriptDoneSerializer(
  item: VoiceAgentServerEventResponseAudioTranscriptDone,
): any {
  return {
    event_id: item["event_id"],
    type: item["type"],
    response_id: item["response_id"],
    item_id: item["item_id"],
    output_index: item["output_index"],
    content_index: item["content_index"],
    transcript: item["transcript"],
  };
}

export function voiceAgentServerEventResponseAudioTranscriptDoneDeserializer(
  item: any,
): VoiceAgentServerEventResponseAudioTranscriptDone {
  return {
    event_id: item["event_id"],
    type: item["type"],
    response_id: item["response_id"],
    item_id: item["item_id"],
    output_index: item["output_index"],
    content_index: item["content_index"],
    transcript: item["transcript"],
  };
}

/** The `response.content_part.done` server event. */
export interface VoiceAgentServerEventResponseContentPartDone {
  /** The unique ID of the server event. */
  event_id: string;
  /** The event type, must be `response.content_part.done`. */
  type: "response.content_part.done";
  /** The ID of the response. */
  response_id: string;
  /** The ID of the item. */
  item_id: string;
  /** The index of the output item in the response. */
  output_index: number;
  /** The index of the content part in the item's content array. */
  content_index: number;
  /** The content part that finished streaming. */
  part: VoiceAgentResponseEventContentPart;
}

export function voiceAgentServerEventResponseContentPartDoneSerializer(
  item: VoiceAgentServerEventResponseContentPartDone,
): any {
  return {
    event_id: item["event_id"],
    type: item["type"],
    response_id: item["response_id"],
    item_id: item["item_id"],
    output_index: item["output_index"],
    content_index: item["content_index"],
    part: voiceAgentResponseEventContentPartSerializer(item["part"]),
  };
}

export function voiceAgentServerEventResponseContentPartDoneDeserializer(
  item: any,
): VoiceAgentServerEventResponseContentPartDone {
  return {
    event_id: item["event_id"],
    type: item["type"],
    response_id: item["response_id"],
    item_id: item["item_id"],
    output_index: item["output_index"],
    content_index: item["content_index"],
    part: voiceAgentResponseEventContentPartDeserializer(item["part"]),
  };
}

/** A content part carried by a `response.content_part.*` server event. */
export type VoiceAgentResponseEventContentPart =
  VoiceAgentResponseEventTextContentPart | VoiceAgentResponseEventAudioContentPart;

export function voiceAgentResponseEventContentPartSerializer(
  item: VoiceAgentResponseEventContentPart,
): any {
  return item;
}

export function voiceAgentResponseEventContentPartDeserializer(
  item: any,
): VoiceAgentResponseEventContentPart {
  return item;
}

/** A text part in a `response.content_part.*` server event. */
export interface VoiceAgentResponseEventTextContentPart {
  type: "text";
  text: string;
}

export function voiceAgentResponseEventTextContentPartSerializer(
  item: VoiceAgentResponseEventTextContentPart,
): any {
  return { type: item["type"], text: item["text"] };
}

export function voiceAgentResponseEventTextContentPartDeserializer(
  item: any,
): VoiceAgentResponseEventTextContentPart {
  return {
    type: item["type"],
    text: item["text"],
  };
}

/** An audio part in a `response.content_part.*` server event. */
export interface VoiceAgentResponseEventAudioContentPart {
  type: "audio";
  transcript: string | null;
  annotations?: any;
  audio?: string;
  format?: VoiceAudioFormat;
}

export function voiceAgentResponseEventAudioContentPartSerializer(
  item: VoiceAgentResponseEventAudioContentPart,
): any {
  return {
    type: item["type"],
    transcript: item["transcript"],
    annotations: item["annotations"],
    audio: item["audio"],
    format: !item["format"] ? item["format"] : voiceAudioFormatSerializer(item["format"]),
  };
}

export function voiceAgentResponseEventAudioContentPartDeserializer(
  item: any,
): VoiceAgentResponseEventAudioContentPart {
  return {
    type: item["type"],
    transcript: item["transcript"],
    annotations: item["annotations"],
    audio: item["audio"],
    format: !item["format"] ? item["format"] : voiceAudioFormatDeserializer(item["format"]),
  };
}

/** The `response.created` server event. */
export interface VoiceAgentServerEventResponseCreated {
  /** The unique ID of the server event. */
  event_id: string;
  /** The event type, must be `response.created`. */
  type: "response.created";
  /** The created voice-agent response. */
  response: VoiceAgentRealtimeResponse;
}

export function voiceAgentServerEventResponseCreatedSerializer(
  item: VoiceAgentServerEventResponseCreated,
): any {
  return {
    event_id: item["event_id"],
    type: item["type"],
    response: voiceAgentRealtimeResponseSerializer(item["response"]),
  };
}

export function voiceAgentServerEventResponseCreatedDeserializer(
  item: any,
): VoiceAgentServerEventResponseCreated {
  return {
    event_id: item["event_id"],
    type: item["type"],
    response: voiceAgentRealtimeResponseDeserializer(item["response"]),
  };
}

/** A realtime response returned by the voice-agent service. */
export interface VoiceAgentRealtimeResponse {
  /** The object type. Always `realtime.response`. */
  object: "realtime.response";
  /** The response identifier. */
  id: string;
  /** The response lifecycle status. */
  status: VoiceAgentResponseStatus;
  /** Additional details for a terminal response status. */
  status_details: RealtimeResponseStatusDetails | null;
  /** The items produced by the response. */
  output: VoiceAgentResponseItem[];
  /** Token usage for the response. */
  usage: RealtimeResponseUsage | null;
  /** The best-effort response cost estimate. Returned only when cost output is enabled. */
  estimated_cost?: VoiceAgentEstimatedCost;
  /** The conversation identifier, or null for an out-of-band response. */
  conversation_id?: string;
  /** The modalities used by the response. */
  modalities?: VoiceOutputModality[];
  /** The voice used by the response. */
  voice?: VoiceAgentVoice;
  /** The output-audio format used by the response. */
  output_audio_format?: VoiceAgentResponseAudioFormat;
  /** The sampling temperature used by the response. */
  temperature?: number;
  /** The maximum output-token count used by the response. */
  max_output_tokens?: VoiceAgentMaxOutputTokens;
  /** String key-value metadata attached to the response. */
  metadata?: Record<string, string>;
}

export function voiceAgentRealtimeResponseSerializer(item: VoiceAgentRealtimeResponse): any {
  return {
    object: item["object"],
    id: item["id"],
    status: item["status"],
    status_details: !item["status_details"]
      ? item["status_details"]
      : realtimeResponseStatusDetailsSerializer(item["status_details"]),
    output: voiceAgentResponseItemArraySerializer(item["output"]),
    usage: !item["usage"] ? item["usage"] : realtimeResponseUsageSerializer(item["usage"]),
    estimated_cost: !item["estimated_cost"]
      ? item["estimated_cost"]
      : voiceAgentEstimatedCostSerializer(item["estimated_cost"]),
    conversation_id: item["conversation_id"],
    modalities: !item["modalities"]
      ? item["modalities"]
      : item["modalities"].map((p: any) => {
          return p;
        }),
    voice: !item["voice"] ? item["voice"] : voiceAgentVoiceSerializer(item["voice"]),
    output_audio_format: item["output_audio_format"],
    temperature: item["temperature"],
    max_output_tokens: !item["max_output_tokens"]
      ? item["max_output_tokens"]
      : voiceAgentMaxOutputTokensSerializer(item["max_output_tokens"]),
    metadata: item["metadata"],
  };
}

export function voiceAgentRealtimeResponseDeserializer(item: any): VoiceAgentRealtimeResponse {
  return {
    object: item["object"],
    id: item["id"],
    status: item["status"],
    status_details: !item["status_details"]
      ? item["status_details"]
      : realtimeResponseStatusDetailsDeserializer(item["status_details"]),
    output: voiceAgentResponseItemArrayDeserializer(item["output"]),
    usage: !item["usage"] ? item["usage"] : realtimeResponseUsageDeserializer(item["usage"]),
    estimated_cost: !item["estimated_cost"]
      ? item["estimated_cost"]
      : voiceAgentEstimatedCostDeserializer(item["estimated_cost"]),
    conversation_id: item["conversation_id"],
    modalities: !item["modalities"]
      ? item["modalities"]
      : item["modalities"].map((p1: any) => {
          return p1;
        }),
    voice: !item["voice"] ? item["voice"] : voiceAgentVoiceDeserializer(item["voice"]),
    output_audio_format: item["output_audio_format"],
    temperature: item["temperature"],
    max_output_tokens: !item["max_output_tokens"]
      ? item["max_output_tokens"]
      : voiceAgentMaxOutputTokensDeserializer(item["max_output_tokens"]),
    metadata: !item["metadata"]
      ? item["metadata"]
      : Object.fromEntries(
          Object.entries(item["metadata"]).map(([k1, p1]: [string, any]) => [k1, p1]),
        ),
  };
}

/** The lifecycle status of a voice-agent response. */
export type VoiceAgentResponseStatus =
  "in_progress" | "completed" | "cancelled" | "incomplete" | "failed";

export function voiceAgentResponseItemArraySerializer(
  result: Array<VoiceAgentResponseItem>,
): any[] {
  return result.map((item) => {
    return voiceAgentResponseItemSerializer(item);
  });
}

export function voiceAgentResponseItemArrayDeserializer(
  result: Array<VoiceAgentResponseItem>,
): any[] {
  return result.map((item) => {
    return voiceAgentResponseItemDeserializer(item);
  });
}

/** A best-effort public-retail cost estimate for a response. */
export interface VoiceAgentEstimatedCost {
  /** The total estimated amount, when available. */
  amount: number | null;
  /** The estimated input cost. */
  input_cost?: number;
  /** The estimated output cost. */
  output_cost?: number;
  /** The estimate currency. Always `USD`. */
  currency?: "USD";
  /** The portion attributed to Voice Live processing. */
  voice_live_amount: number;
  /** The portion attributed to a customer-provided model. */
  byom_model_amount?: number;
  /** Whether the estimate is complete, partial, or unavailable. */
  status: VoiceAgentEstimatedCostStatus;
  /** The Voice Live price version used for the estimate. */
  price_version: string;
  /** The customer-provided model price version used for the estimate. */
  byom_model_price_version?: string;
  /** Components for which no price was available. */
  unpriced_components?: string[];
}

export function voiceAgentEstimatedCostSerializer(item: VoiceAgentEstimatedCost): any {
  return {
    amount: item["amount"],
    input_cost: item["input_cost"],
    output_cost: item["output_cost"],
    currency: item["currency"],
    voice_live_amount: item["voice_live_amount"],
    byom_model_amount: item["byom_model_amount"],
    status: item["status"],
    price_version: item["price_version"],
    byom_model_price_version: item["byom_model_price_version"],
    unpriced_components: !item["unpriced_components"]
      ? item["unpriced_components"]
      : item["unpriced_components"].map((p: any) => {
          return p;
        }),
  };
}

export function voiceAgentEstimatedCostDeserializer(item: any): VoiceAgentEstimatedCost {
  return {
    amount: item["amount"],
    input_cost: item["input_cost"],
    output_cost: item["output_cost"],
    currency: item["currency"],
    voice_live_amount: item["voice_live_amount"],
    byom_model_amount: item["byom_model_amount"],
    status: item["status"],
    price_version: item["price_version"],
    byom_model_price_version: item["byom_model_price_version"],
    unpriced_components: !item["unpriced_components"]
      ? item["unpriced_components"]
      : item["unpriced_components"].map((p: any) => {
          return p;
        }),
  };
}

/** Completeness of a best-effort cost estimate. */
export type VoiceAgentEstimatedCostStatus = "complete" | "partial" | "unavailable";
/** An audio format reported on a voice-agent response resource. */
export type VoiceAgentResponseAudioFormat =
  | "pcm16"
  | "pcm16_8000hz"
  | "pcm16_16000hz"
  | "pcm16_22050hz"
  | "pcm16_24000hz"
  | "pcm16_44100hz"
  | "pcm16_48000hz"
  | "g711_ulaw"
  | "g711_alaw"
  | "mp3"
  | "mp3_24khz_48kbps"
  | "mp3_24khz_96kbps"
  | "mp3_24khz_160kbps";

/** The `response.done` server event. */
export interface VoiceAgentServerEventResponseDone {
  /** The unique ID of the server event. */
  event_id: string;
  /** The event type, must be `response.done`. */
  type: "response.done";
  /** The completed voice-agent response. */
  response: VoiceAgentRealtimeResponse;
}

export function voiceAgentServerEventResponseDoneSerializer(
  item: VoiceAgentServerEventResponseDone,
): any {
  return {
    event_id: item["event_id"],
    type: item["type"],
    response: voiceAgentRealtimeResponseSerializer(item["response"]),
  };
}

export function voiceAgentServerEventResponseDoneDeserializer(
  item: any,
): VoiceAgentServerEventResponseDone {
  return {
    event_id: item["event_id"],
    type: item["type"],
    response: voiceAgentRealtimeResponseDeserializer(item["response"]),
  };
}

/** The `response.function_call_arguments.delta` server event. */
export interface VoiceAgentServerEventResponseFunctionCallArgumentsDelta {
  /** The unique ID of the server event. */
  event_id: string;
  /** The event type, must be `response.function_call_arguments.delta`. */
  type: "response.function_call_arguments.delta";
  /** The ID of the response. */
  response_id: string;
  /** The ID of the function call item. */
  item_id: string;
  /** The index of the output item in the response. */
  output_index: number;
  /** The ID of the function call. */
  call_id: string;
  /** The arguments delta as a JSON string. */
  delta: string;
}

export function voiceAgentServerEventResponseFunctionCallArgumentsDeltaSerializer(
  item: VoiceAgentServerEventResponseFunctionCallArgumentsDelta,
): any {
  return {
    event_id: item["event_id"],
    type: item["type"],
    response_id: item["response_id"],
    item_id: item["item_id"],
    output_index: item["output_index"],
    call_id: item["call_id"],
    delta: item["delta"],
  };
}

export function voiceAgentServerEventResponseFunctionCallArgumentsDeltaDeserializer(
  item: any,
): VoiceAgentServerEventResponseFunctionCallArgumentsDelta {
  return {
    event_id: item["event_id"],
    type: item["type"],
    response_id: item["response_id"],
    item_id: item["item_id"],
    output_index: item["output_index"],
    call_id: item["call_id"],
    delta: item["delta"],
  };
}

/** The `response.function_call_arguments.done` server event. */
export interface VoiceAgentServerEventResponseFunctionCallArgumentsDone {
  /** The unique ID of the server event. */
  event_id: string;
  /** The event type, must be `response.function_call_arguments.done`. */
  type: "response.function_call_arguments.done";
  /** The ID of the response. */
  response_id: string;
  /** The ID of the function call item. */
  item_id: string;
  /** The index of the output item in the response. */
  output_index: number;
  /** The ID of the function call. */
  call_id: string;
  /** The name of the function that was called. */
  name: string;
  /** The final arguments as a JSON string. */
  arguments: string;
}

export function voiceAgentServerEventResponseFunctionCallArgumentsDoneSerializer(
  item: VoiceAgentServerEventResponseFunctionCallArgumentsDone,
): any {
  return {
    event_id: item["event_id"],
    type: item["type"],
    response_id: item["response_id"],
    item_id: item["item_id"],
    output_index: item["output_index"],
    call_id: item["call_id"],
    name: item["name"],
    arguments: item["arguments"],
  };
}

export function voiceAgentServerEventResponseFunctionCallArgumentsDoneDeserializer(
  item: any,
): VoiceAgentServerEventResponseFunctionCallArgumentsDone {
  return {
    event_id: item["event_id"],
    type: item["type"],
    response_id: item["response_id"],
    item_id: item["item_id"],
    output_index: item["output_index"],
    call_id: item["call_id"],
    name: item["name"],
    arguments: item["arguments"],
  };
}

/** The `response.mcp_call_arguments.delta` server event. */
export interface VoiceAgentServerEventResponseMcpCallArgumentsDelta {
  /** The unique ID of the server event. */
  event_id: string;
  /** The event type, must be `response.mcp_call_arguments.delta`. */
  type: "response.mcp_call_arguments.delta";
  /** The ID of the response. */
  response_id: string;
  /** The ID of the MCP tool call item. */
  item_id: string;
  /** The index of the output item in the response. */
  output_index: number;
  /** The JSON-encoded arguments delta. */
  delta: string;
  obfuscation?: string;
}

export function voiceAgentServerEventResponseMcpCallArgumentsDeltaSerializer(
  item: VoiceAgentServerEventResponseMcpCallArgumentsDelta,
): any {
  return {
    event_id: item["event_id"],
    type: item["type"],
    response_id: item["response_id"],
    item_id: item["item_id"],
    output_index: item["output_index"],
    delta: item["delta"],
    obfuscation: item["obfuscation"],
  };
}

export function voiceAgentServerEventResponseMcpCallArgumentsDeltaDeserializer(
  item: any,
): VoiceAgentServerEventResponseMcpCallArgumentsDelta {
  return {
    event_id: item["event_id"],
    type: item["type"],
    response_id: item["response_id"],
    item_id: item["item_id"],
    output_index: item["output_index"],
    delta: item["delta"],
    obfuscation: item["obfuscation"],
  };
}

/** The `response.mcp_call_arguments.done` server event. */
export interface VoiceAgentServerEventResponseMcpCallArgumentsDone {
  /** The unique ID of the server event. */
  event_id: string;
  /** The event type, must be `response.mcp_call_arguments.done`. */
  type: "response.mcp_call_arguments.done";
  /** The ID of the response. */
  response_id: string;
  /** The ID of the MCP tool call item. */
  item_id: string;
  /** The index of the output item in the response. */
  output_index: number;
  /** The final JSON-encoded arguments string. */
  arguments: string;
}

export function voiceAgentServerEventResponseMcpCallArgumentsDoneSerializer(
  item: VoiceAgentServerEventResponseMcpCallArgumentsDone,
): any {
  return {
    event_id: item["event_id"],
    type: item["type"],
    response_id: item["response_id"],
    item_id: item["item_id"],
    output_index: item["output_index"],
    arguments: item["arguments"],
  };
}

export function voiceAgentServerEventResponseMcpCallArgumentsDoneDeserializer(
  item: any,
): VoiceAgentServerEventResponseMcpCallArgumentsDone {
  return {
    event_id: item["event_id"],
    type: item["type"],
    response_id: item["response_id"],
    item_id: item["item_id"],
    output_index: item["output_index"],
    arguments: item["arguments"],
  };
}

/** The `response.mcp_call.completed` server event. */
export interface VoiceAgentServerEventResponseMcpCallCompleted {
  /** The unique ID of the server event. */
  event_id: string;
  /** The event type, must be `response.mcp_call.completed`. */
  type: "response.mcp_call.completed";
  /** The index of the output item in the response. */
  output_index: number;
  /** The ID of the MCP tool call item. */
  item_id: string;
}

export function voiceAgentServerEventResponseMcpCallCompletedSerializer(
  item: VoiceAgentServerEventResponseMcpCallCompleted,
): any {
  return {
    event_id: item["event_id"],
    type: item["type"],
    output_index: item["output_index"],
    item_id: item["item_id"],
  };
}

export function voiceAgentServerEventResponseMcpCallCompletedDeserializer(
  item: any,
): VoiceAgentServerEventResponseMcpCallCompleted {
  return {
    event_id: item["event_id"],
    type: item["type"],
    output_index: item["output_index"],
    item_id: item["item_id"],
  };
}

/** The `response.mcp_call.failed` server event. */
export interface VoiceAgentServerEventResponseMcpCallFailed {
  /** The unique ID of the server event. */
  event_id: string;
  /** The event type, must be `response.mcp_call.failed`. */
  type: "response.mcp_call.failed";
  /** The index of the output item in the response. */
  output_index: number;
  /** The ID of the MCP tool call item. */
  item_id: string;
}

export function voiceAgentServerEventResponseMcpCallFailedSerializer(
  item: VoiceAgentServerEventResponseMcpCallFailed,
): any {
  return {
    event_id: item["event_id"],
    type: item["type"],
    output_index: item["output_index"],
    item_id: item["item_id"],
  };
}

export function voiceAgentServerEventResponseMcpCallFailedDeserializer(
  item: any,
): VoiceAgentServerEventResponseMcpCallFailed {
  return {
    event_id: item["event_id"],
    type: item["type"],
    output_index: item["output_index"],
    item_id: item["item_id"],
  };
}

/** The `response.mcp_call.in_progress` server event. */
export interface VoiceAgentServerEventResponseMcpCallInProgress {
  /** The unique ID of the server event. */
  event_id: string;
  /** The event type, must be `response.mcp_call.in_progress`. */
  type: "response.mcp_call.in_progress";
  /** The index of the output item in the response. */
  output_index: number;
  /** The ID of the MCP tool call item. */
  item_id: string;
}

export function voiceAgentServerEventResponseMcpCallInProgressSerializer(
  item: VoiceAgentServerEventResponseMcpCallInProgress,
): any {
  return {
    event_id: item["event_id"],
    type: item["type"],
    output_index: item["output_index"],
    item_id: item["item_id"],
  };
}

export function voiceAgentServerEventResponseMcpCallInProgressDeserializer(
  item: any,
): VoiceAgentServerEventResponseMcpCallInProgress {
  return {
    event_id: item["event_id"],
    type: item["type"],
    output_index: item["output_index"],
    item_id: item["item_id"],
  };
}

/** The `response.web_search_call.in_progress` server event. */
export interface VoiceAgentServerEventWebSearchCallInProgress {
  type: "response.web_search_call.in_progress";
  event_id?: string;
  response_id?: string;
  item_id: string;
  output_index: number;
  sequence_number: number;
}

export function voiceAgentServerEventWebSearchCallInProgressSerializer(
  item: VoiceAgentServerEventWebSearchCallInProgress,
): any {
  return {
    type: item["type"],
    event_id: item["event_id"],
    response_id: item["response_id"],
    item_id: item["item_id"],
    output_index: item["output_index"],
    sequence_number: item["sequence_number"],
  };
}

export function voiceAgentServerEventWebSearchCallInProgressDeserializer(
  item: any,
): VoiceAgentServerEventWebSearchCallInProgress {
  return {
    type: item["type"],
    event_id: item["event_id"],
    response_id: item["response_id"],
    item_id: item["item_id"],
    output_index: item["output_index"],
    sequence_number: item["sequence_number"],
  };
}

/** The `response.web_search_call.searching` server event. */
export interface VoiceAgentServerEventWebSearchCallSearching {
  type: "response.web_search_call.searching";
  event_id?: string;
  response_id?: string;
  item_id: string;
  output_index: number;
  sequence_number: number;
}

export function voiceAgentServerEventWebSearchCallSearchingSerializer(
  item: VoiceAgentServerEventWebSearchCallSearching,
): any {
  return {
    type: item["type"],
    event_id: item["event_id"],
    response_id: item["response_id"],
    item_id: item["item_id"],
    output_index: item["output_index"],
    sequence_number: item["sequence_number"],
  };
}

export function voiceAgentServerEventWebSearchCallSearchingDeserializer(
  item: any,
): VoiceAgentServerEventWebSearchCallSearching {
  return {
    type: item["type"],
    event_id: item["event_id"],
    response_id: item["response_id"],
    item_id: item["item_id"],
    output_index: item["output_index"],
    sequence_number: item["sequence_number"],
  };
}

/** The `response.web_search_call.completed` server event. */
export interface VoiceAgentServerEventWebSearchCallCompleted {
  type: "response.web_search_call.completed";
  event_id?: string;
  response_id?: string;
  item_id: string;
  output_index: number;
  sequence_number: number;
}

export function voiceAgentServerEventWebSearchCallCompletedSerializer(
  item: VoiceAgentServerEventWebSearchCallCompleted,
): any {
  return {
    type: item["type"],
    event_id: item["event_id"],
    response_id: item["response_id"],
    item_id: item["item_id"],
    output_index: item["output_index"],
    sequence_number: item["sequence_number"],
  };
}

export function voiceAgentServerEventWebSearchCallCompletedDeserializer(
  item: any,
): VoiceAgentServerEventWebSearchCallCompleted {
  return {
    type: item["type"],
    event_id: item["event_id"],
    response_id: item["response_id"],
    item_id: item["item_id"],
    output_index: item["output_index"],
    sequence_number: item["sequence_number"],
  };
}

/** The `response.file_search_call.in_progress` server event. */
export interface VoiceAgentServerEventFileSearchCallInProgress {
  type: "response.file_search_call.in_progress";
  event_id?: string;
  response_id?: string;
  item_id: string;
  output_index: number;
  sequence_number: number;
}

export function voiceAgentServerEventFileSearchCallInProgressSerializer(
  item: VoiceAgentServerEventFileSearchCallInProgress,
): any {
  return {
    type: item["type"],
    event_id: item["event_id"],
    response_id: item["response_id"],
    item_id: item["item_id"],
    output_index: item["output_index"],
    sequence_number: item["sequence_number"],
  };
}

export function voiceAgentServerEventFileSearchCallInProgressDeserializer(
  item: any,
): VoiceAgentServerEventFileSearchCallInProgress {
  return {
    type: item["type"],
    event_id: item["event_id"],
    response_id: item["response_id"],
    item_id: item["item_id"],
    output_index: item["output_index"],
    sequence_number: item["sequence_number"],
  };
}

/** The `response.file_search_call.searching` server event. */
export interface VoiceAgentServerEventFileSearchCallSearching {
  type: "response.file_search_call.searching";
  event_id?: string;
  response_id?: string;
  item_id: string;
  output_index: number;
  sequence_number: number;
}

export function voiceAgentServerEventFileSearchCallSearchingSerializer(
  item: VoiceAgentServerEventFileSearchCallSearching,
): any {
  return {
    type: item["type"],
    event_id: item["event_id"],
    response_id: item["response_id"],
    item_id: item["item_id"],
    output_index: item["output_index"],
    sequence_number: item["sequence_number"],
  };
}

export function voiceAgentServerEventFileSearchCallSearchingDeserializer(
  item: any,
): VoiceAgentServerEventFileSearchCallSearching {
  return {
    type: item["type"],
    event_id: item["event_id"],
    response_id: item["response_id"],
    item_id: item["item_id"],
    output_index: item["output_index"],
    sequence_number: item["sequence_number"],
  };
}

/** The `response.file_search_call.completed` server event. */
export interface VoiceAgentServerEventFileSearchCallCompleted {
  type: "response.file_search_call.completed";
  event_id?: string;
  response_id?: string;
  item_id: string;
  output_index: number;
  sequence_number: number;
}

export function voiceAgentServerEventFileSearchCallCompletedSerializer(
  item: VoiceAgentServerEventFileSearchCallCompleted,
): any {
  return {
    type: item["type"],
    event_id: item["event_id"],
    response_id: item["response_id"],
    item_id: item["item_id"],
    output_index: item["output_index"],
    sequence_number: item["sequence_number"],
  };
}

export function voiceAgentServerEventFileSearchCallCompletedDeserializer(
  item: any,
): VoiceAgentServerEventFileSearchCallCompleted {
  return {
    type: item["type"],
    event_id: item["event_id"],
    response_id: item["response_id"],
    item_id: item["item_id"],
    output_index: item["output_index"],
    sequence_number: item["sequence_number"],
  };
}

/** The `response.output_item.added` server event. */
export interface VoiceAgentServerEventResponseOutputItemAdded {
  /** The unique ID of the server event. */
  event_id: string;
  /** The event type, must be `response.output_item.added`. */
  type: "response.output_item.added";
  /** The ID of the Response to which the item belongs. */
  response_id: string;
  /** The index of the output item in the Response. */
  output_index: number;
  /** The output item that was added. */
  item: VoiceAgentResponseItem;
}

export function voiceAgentServerEventResponseOutputItemAddedSerializer(
  item: VoiceAgentServerEventResponseOutputItemAdded,
): any {
  return {
    event_id: item["event_id"],
    type: item["type"],
    response_id: item["response_id"],
    output_index: item["output_index"],
    item: voiceAgentResponseItemSerializer(item["item"]),
  };
}

export function voiceAgentServerEventResponseOutputItemAddedDeserializer(
  item: any,
): VoiceAgentServerEventResponseOutputItemAdded {
  return {
    event_id: item["event_id"],
    type: item["type"],
    response_id: item["response_id"],
    output_index: item["output_index"],
    item: voiceAgentResponseItemDeserializer(item["item"]),
  };
}

/** The `response.output_item.done` server event. */
export interface VoiceAgentServerEventResponseOutputItemDone {
  /** The unique ID of the server event. */
  event_id: string;
  /** The event type, must be `response.output_item.done`. */
  type: "response.output_item.done";
  /** The ID of the Response to which the item belongs. */
  response_id: string;
  /** The index of the output item in the Response. */
  output_index: number;
  /** The output item that finished streaming. */
  item: VoiceAgentResponseItem;
}

export function voiceAgentServerEventResponseOutputItemDoneSerializer(
  item: VoiceAgentServerEventResponseOutputItemDone,
): any {
  return {
    event_id: item["event_id"],
    type: item["type"],
    response_id: item["response_id"],
    output_index: item["output_index"],
    item: voiceAgentResponseItemSerializer(item["item"]),
  };
}

export function voiceAgentServerEventResponseOutputItemDoneDeserializer(
  item: any,
): VoiceAgentServerEventResponseOutputItemDone {
  return {
    event_id: item["event_id"],
    type: item["type"],
    response_id: item["response_id"],
    output_index: item["output_index"],
    item: voiceAgentResponseItemDeserializer(item["item"]),
  };
}

/** The `response.output_text.delta` server event. */
export interface VoiceAgentServerEventResponseTextDelta {
  /** The unique ID of the server event. */
  event_id: string;
  /** The event type, must be `response.output_text.delta`. */
  type: "response.output_text.delta";
  /** The ID of the response. */
  response_id: string;
  /** The ID of the item. */
  item_id: string;
  /** The index of the output item in the response. */
  output_index: number;
  /** The index of the content part in the item's content array. */
  content_index: number;
  /** The text delta. */
  delta: string;
}

export function voiceAgentServerEventResponseTextDeltaSerializer(
  item: VoiceAgentServerEventResponseTextDelta,
): any {
  return {
    event_id: item["event_id"],
    type: item["type"],
    response_id: item["response_id"],
    item_id: item["item_id"],
    output_index: item["output_index"],
    content_index: item["content_index"],
    delta: item["delta"],
  };
}

export function voiceAgentServerEventResponseTextDeltaDeserializer(
  item: any,
): VoiceAgentServerEventResponseTextDelta {
  return {
    event_id: item["event_id"],
    type: item["type"],
    response_id: item["response_id"],
    item_id: item["item_id"],
    output_index: item["output_index"],
    content_index: item["content_index"],
    delta: item["delta"],
  };
}

/** The `response.output_text.done` server event. */
export interface VoiceAgentServerEventResponseTextDone {
  /** The unique ID of the server event. */
  event_id: string;
  /** The event type, must be `response.output_text.done`. */
  type: "response.output_text.done";
  /** The ID of the response. */
  response_id: string;
  /** The ID of the item. */
  item_id: string;
  /** The index of the output item in the response. */
  output_index: number;
  /** The index of the content part in the item's content array. */
  content_index: number;
  /** The final text content. */
  text: string;
}

export function voiceAgentServerEventResponseTextDoneSerializer(
  item: VoiceAgentServerEventResponseTextDone,
): any {
  return {
    event_id: item["event_id"],
    type: item["type"],
    response_id: item["response_id"],
    item_id: item["item_id"],
    output_index: item["output_index"],
    content_index: item["content_index"],
    text: item["text"],
  };
}

export function voiceAgentServerEventResponseTextDoneDeserializer(
  item: any,
): VoiceAgentServerEventResponseTextDone {
  return {
    event_id: item["event_id"],
    type: item["type"],
    response_id: item["response_id"],
    item_id: item["item_id"],
    output_index: item["output_index"],
    content_index: item["content_index"],
    text: item["text"],
  };
}

/** Input-audio settings returned in a stable voice-agent session event. */
export interface VoiceAgentSessionResponseAudioInput {
  /** Input noise reduction. Set to null to disable. */
  noise_reduction?: VoiceNoiseReduction;
  /** Asynchronous input-audio transcription. Set to null to disable transcription. */
  transcription?: VoiceInputTranscription;
  /** The structured input audio format. */
  format?: VoiceAudioFormat;
  /** Turn-detection settings. Set to null to disable server-side turn detection. */
  turn_detection?: VoiceAgentTurnDetection;
  /** Optional server-side echo cancellation settings. */
  echo_cancellation?: VoiceAgentEchoCancellation;
}

export function voiceAgentSessionResponseAudioInputSerializer(
  item: VoiceAgentSessionResponseAudioInput,
): any {
  return {
    noise_reduction: !item["noise_reduction"]
      ? item["noise_reduction"]
      : voiceNoiseReductionSerializer(item["noise_reduction"]),
    transcription: !item["transcription"]
      ? item["transcription"]
      : voiceInputTranscriptionSerializer(item["transcription"]),
    format: !item["format"] ? item["format"] : voiceAudioFormatSerializer(item["format"]),
    turn_detection: !item["turn_detection"]
      ? item["turn_detection"]
      : voiceAgentTurnDetectionSerializer(item["turn_detection"]),
    echo_cancellation: !item["echo_cancellation"]
      ? item["echo_cancellation"]
      : voiceAgentEchoCancellationSerializer(item["echo_cancellation"]),
  };
}

export function voiceAgentSessionResponseAudioInputDeserializer(
  item: any,
): VoiceAgentSessionResponseAudioInput {
  return {
    noise_reduction: !item["noise_reduction"]
      ? item["noise_reduction"]
      : voiceNoiseReductionDeserializer(item["noise_reduction"]),
    transcription: !item["transcription"]
      ? item["transcription"]
      : voiceInputTranscriptionDeserializer(item["transcription"]),
    format: !item["format"] ? item["format"] : voiceAudioFormatDeserializer(item["format"]),
    turn_detection: !item["turn_detection"]
      ? item["turn_detection"]
      : voiceAgentTurnDetectionDeserializer(item["turn_detection"]),
    echo_cancellation: !item["echo_cancellation"]
      ? item["echo_cancellation"]
      : voiceAgentEchoCancellationDeserializer(item["echo_cancellation"]),
  };
}

/** Output-audio settings returned in a stable voice-agent session event. */
export interface VoiceAgentSessionResponseAudioOutput {
  /** The output audio format. */
  format?: VoiceAudioFormat;
  /** The typed voice configuration. */
  voice?: VoiceAgentVoice;
  /** Timestamp kinds to include with output audio. */
  output_audio_timestamp_types?: VoiceAudioTimestampType[];
  /** The speaking-speed multiplier. */
  speed?: number;
}

export function voiceAgentSessionResponseAudioOutputSerializer(
  item: VoiceAgentSessionResponseAudioOutput,
): any {
  return {
    format: !item["format"] ? item["format"] : voiceAudioFormatSerializer(item["format"]),
    voice: !item["voice"] ? item["voice"] : voiceAgentVoiceSerializer(item["voice"]),
    output_audio_timestamp_types: !item["output_audio_timestamp_types"]
      ? item["output_audio_timestamp_types"]
      : item["output_audio_timestamp_types"].map((p: any) => {
          return p;
        }),
    speed: item["speed"],
  };
}

export function voiceAgentSessionResponseAudioOutputDeserializer(
  item: any,
): VoiceAgentSessionResponseAudioOutput {
  return {
    format: !item["format"] ? item["format"] : voiceAudioFormatDeserializer(item["format"]),
    voice: !item["voice"] ? item["voice"] : voiceAgentVoiceDeserializer(item["voice"]),
    output_audio_timestamp_types: !item["output_audio_timestamp_types"]
      ? item["output_audio_timestamp_types"]
      : item["output_audio_timestamp_types"].map((p: any) => {
          return p;
        }),
    speed: item["speed"],
  };
}

/** Input- and output-audio settings returned in a stable voice-agent session event. */
export interface VoiceAgentSessionResponseAudio {
  /** The effective input-audio settings. */
  input?: VoiceAgentSessionResponseAudioInput;
  /** The output-audio settings for the session. */
  output?: VoiceAgentSessionResponseAudioOutput;
}

export function voiceAgentSessionResponseAudioSerializer(
  item: VoiceAgentSessionResponseAudio,
): any {
  return {
    input: !item["input"]
      ? item["input"]
      : voiceAgentSessionResponseAudioInputSerializer(item["input"]),
    output: !item["output"]
      ? item["output"]
      : voiceAgentSessionResponseAudioOutputSerializer(item["output"]),
  };
}

export function voiceAgentSessionResponseAudioDeserializer(
  item: any,
): VoiceAgentSessionResponseAudio {
  return {
    input: !item["input"]
      ? item["input"]
      : voiceAgentSessionResponseAudioInputDeserializer(item["input"]),
    output: !item["output"]
      ? item["output"]
      : voiceAgentSessionResponseAudioOutputDeserializer(item["output"]),
  };
}

/** The effective stable realtime session settings returned by the voice-agent service. */
export interface VoiceAgentSessionResponseConfig {
  /** The session type. Always `realtime`. */
  type: "realtime";
  /** Instructions applied throughout the session. */
  instructions?: string;
  /** The sampling temperature for compatible cascaded pipelines. */
  temperature?: number;
  /** The maximum output-token count for one response. */
  max_output_tokens?: VoiceAgentMaxOutputTokens;
  /** The avatar settings for the session. */
  avatar?: VoiceAgentSessionAvatarConfig;
  /** Animation settings for the session. */
  animation?: VoiceAgentAnimationConfig;
  /** Tools available to the session. */
  tools?: VoiceAgentSessionTool[];
  /** Tool-selection behavior for the session. */
  tool_choice?: VoiceAgentToolChoice;
  /** Reasoning settings for compatible realtime models. */
  reasoning?: RealtimeReasoning;
  /** Whether the model may call multiple tools in parallel. */
  parallel_tool_calls?: boolean;
  /** Voice-optimized instruction adaptation settings. */
  voice_adaptation?: VoiceAgentVoiceAdaptation;
  /** Interim-response settings for latency and tool execution. */
  interim_response?: VoiceAgentInterimResponse;
  /** A delimiter appended to generated responses. */
  response_delimiter?: string;
  /** A proactive assistant greeting started after session configuration. */
  greeting?: VoiceGreetingConfigUnion;
  /** The object type. Always `realtime.session`. */
  object: "realtime.session";
  /** The session identifier. */
  id: string;
  /** The selected model. */
  model: string;
  /** The session expiration time as a Unix timestamp in seconds. */
  expires_at?: Date;
  /** The output modalities enabled for the session. */
  output_modalities: VoiceOutputModality[];
  /** The effective input- and output-audio settings for the session. */
  audio?: VoiceAgentSessionResponseAudio;
  /** The effective handoff state. */
  handoff?: VoiceAgentHandoffState;
  /** The idle timeout reported by the service, in milliseconds. */
  idle_timeout?: number;
}

export function voiceAgentSessionResponseConfigSerializer(
  item: VoiceAgentSessionResponseConfig,
): any {
  return {
    type: item["type"],
    instructions: item["instructions"],
    temperature: item["temperature"],
    max_output_tokens: !item["max_output_tokens"]
      ? item["max_output_tokens"]
      : voiceAgentMaxOutputTokensSerializer(item["max_output_tokens"]),
    avatar: !item["avatar"]
      ? item["avatar"]
      : voiceAgentSessionAvatarConfigSerializer(item["avatar"]),
    animation: !item["animation"]
      ? item["animation"]
      : voiceAgentAnimationConfigSerializer(item["animation"]),
    tools: !item["tools"] ? item["tools"] : voiceAgentSessionToolArraySerializer(item["tools"]),
    tool_choice: !item["tool_choice"]
      ? item["tool_choice"]
      : voiceAgentToolChoiceSerializer(item["tool_choice"]),
    reasoning: !item["reasoning"]
      ? item["reasoning"]
      : realtimeReasoningSerializer(item["reasoning"]),
    parallel_tool_calls: item["parallel_tool_calls"],
    voice_adaptation: !item["voice_adaptation"]
      ? item["voice_adaptation"]
      : voiceAgentVoiceAdaptationSerializer(item["voice_adaptation"]),
    interim_response: !item["interim_response"]
      ? item["interim_response"]
      : voiceAgentInterimResponseSerializer(item["interim_response"]),
    response_delimiter: item["response_delimiter"],
    greeting: !item["greeting"]
      ? item["greeting"]
      : voiceGreetingConfigUnionSerializer(item["greeting"]),
    object: item["object"],
    id: item["id"],
    model: item["model"],
    expires_at: !item["expires_at"]
      ? item["expires_at"]
      : (item["expires_at"].getTime() / 1000) | 0,
    output_modalities: item["output_modalities"].map((p: any) => {
      return p;
    }),
    audio: !item["audio"] ? item["audio"] : voiceAgentSessionResponseAudioSerializer(item["audio"]),
    handoff: !item["handoff"] ? item["handoff"] : voiceAgentHandoffStateSerializer(item["handoff"]),
    idle_timeout: item["idle_timeout"],
  };
}

export function voiceAgentSessionResponseConfigDeserializer(
  item: any,
): VoiceAgentSessionResponseConfig {
  return {
    type: item["type"],
    instructions: item["instructions"],
    temperature: item["temperature"],
    max_output_tokens: !item["max_output_tokens"]
      ? item["max_output_tokens"]
      : voiceAgentMaxOutputTokensDeserializer(item["max_output_tokens"]),
    avatar: !item["avatar"]
      ? item["avatar"]
      : voiceAgentSessionAvatarConfigDeserializer(item["avatar"]),
    animation: !item["animation"]
      ? item["animation"]
      : voiceAgentAnimationConfigDeserializer(item["animation"]),
    tools: !item["tools"] ? item["tools"] : voiceAgentSessionToolArrayDeserializer(item["tools"]),
    tool_choice: !item["tool_choice"]
      ? item["tool_choice"]
      : voiceAgentToolChoiceDeserializer(item["tool_choice"]),
    reasoning: !item["reasoning"]
      ? item["reasoning"]
      : realtimeReasoningDeserializer(item["reasoning"]),
    parallel_tool_calls: item["parallel_tool_calls"],
    voice_adaptation: !item["voice_adaptation"]
      ? item["voice_adaptation"]
      : voiceAgentVoiceAdaptationDeserializer(item["voice_adaptation"]),
    interim_response: !item["interim_response"]
      ? item["interim_response"]
      : voiceAgentInterimResponseDeserializer(item["interim_response"]),
    response_delimiter: item["response_delimiter"],
    greeting: !item["greeting"]
      ? item["greeting"]
      : voiceGreetingConfigUnionDeserializer(item["greeting"]),
    object: item["object"],
    id: item["id"],
    model: item["model"],
    expires_at: !item["expires_at"] ? item["expires_at"] : new Date(item["expires_at"] * 1000),
    output_modalities: item["output_modalities"].map((p: any) => {
      return p;
    }),
    audio: !item["audio"]
      ? item["audio"]
      : voiceAgentSessionResponseAudioDeserializer(item["audio"]),
    handoff: !item["handoff"]
      ? item["handoff"]
      : voiceAgentHandoffStateDeserializer(item["handoff"]),
    idle_timeout: item["idle_timeout"],
  };
}

/** The effective handoff state returned by the service. */
export interface VoiceAgentHandoffState {
  /** The runtime pipeline family. */
  pipeline_family: VoiceAgentPipelineFamily;
  /** The active node identifier. */
  active_node_id: string;
  /** The active node generation. */
  node_generation: number;
  /** The number of completed transfers. */
  transfer_count: number;
  /** The number of transfer attempts. */
  attempt_count: number;
  /** The edge identifiers currently available to the model. */
  available_edge_ids: string[];
  /** The function tool exposed to initiate transfers. */
  transfer_tool: RealtimeFunctionTool | null;
  /** The compiled handoff nodes. */
  nodes: VoiceAgentHandoffNodeState[];
  /** The compiled handoff edges. */
  edges: VoiceAgentHandoffEdgeState[];
}

export function voiceAgentHandoffStateSerializer(item: VoiceAgentHandoffState): any {
  return {
    pipeline_family: item["pipeline_family"],
    active_node_id: item["active_node_id"],
    node_generation: item["node_generation"],
    transfer_count: item["transfer_count"],
    attempt_count: item["attempt_count"],
    available_edge_ids: item["available_edge_ids"].map((p: any) => {
      return p;
    }),
    transfer_tool: !item["transfer_tool"]
      ? item["transfer_tool"]
      : realtimeFunctionToolSerializer(item["transfer_tool"]),
    nodes: voiceAgentHandoffNodeStateArraySerializer(item["nodes"]),
    edges: voiceAgentHandoffEdgeStateArraySerializer(item["edges"]),
  };
}

export function voiceAgentHandoffStateDeserializer(item: any): VoiceAgentHandoffState {
  return {
    pipeline_family: item["pipeline_family"],
    active_node_id: item["active_node_id"],
    node_generation: item["node_generation"],
    transfer_count: item["transfer_count"],
    attempt_count: item["attempt_count"],
    available_edge_ids: item["available_edge_ids"].map((p: any) => {
      return p;
    }),
    transfer_tool: !item["transfer_tool"]
      ? item["transfer_tool"]
      : realtimeFunctionToolDeserializer(item["transfer_tool"]),
    nodes: voiceAgentHandoffNodeStateArrayDeserializer(item["nodes"]),
    edges: voiceAgentHandoffEdgeStateArrayDeserializer(item["edges"]),
  };
}

/** The runtime pipeline family used by an effective handoff graph. */
export type VoiceAgentPipelineFamily = "cascaded" | "realtime";

export function voiceAgentHandoffNodeStateArraySerializer(
  result: Array<VoiceAgentHandoffNodeState>,
): any[] {
  return result.map((item) => {
    return voiceAgentHandoffNodeStateSerializer(item);
  });
}

export function voiceAgentHandoffNodeStateArrayDeserializer(
  result: Array<VoiceAgentHandoffNodeState>,
): any[] {
  return result.map((item) => {
    return voiceAgentHandoffNodeStateDeserializer(item);
  });
}

/** Non-sensitive metadata for an effective handoff node. */
export interface VoiceAgentHandoffNodeState {
  /** The node identifier. */
  id: string;
  /** The node description. */
  description: string;
  /** Whether the service implicitly created this node. */
  implicit?: boolean;
}

export function voiceAgentHandoffNodeStateSerializer(item: VoiceAgentHandoffNodeState): any {
  return { id: item["id"], description: item["description"], implicit: item["implicit"] };
}

export function voiceAgentHandoffNodeStateDeserializer(item: any): VoiceAgentHandoffNodeState {
  return {
    id: item["id"],
    description: item["description"],
    implicit: item["implicit"],
  };
}

export function voiceAgentHandoffEdgeStateArraySerializer(
  result: Array<VoiceAgentHandoffEdgeState>,
): any[] {
  return result.map((item) => {
    return voiceAgentHandoffEdgeStateSerializer(item);
  });
}

export function voiceAgentHandoffEdgeStateArrayDeserializer(
  result: Array<VoiceAgentHandoffEdgeState>,
): any[] {
  return result.map((item) => {
    return voiceAgentHandoffEdgeStateDeserializer(item);
  });
}

/** Non-sensitive metadata for an effective handoff edge. */
export interface VoiceAgentHandoffEdgeState {
  /** The edge identifier. */
  id: string;
  /** The source node identifier. */
  source: string;
  /** The target node identifier. */
  target: string;
  /** Whether user interruption cancels the transition. */
  cancel_on_interruption?: boolean;
  /** The delay before the target behavior is committed, in milliseconds. */
  delayInMs?: number;
  /** Optional text synthesized while transferring. */
  transfer_message?: string;
  /** Whether the target automatically creates a response after transfer. */
  target_response?: VoiceAgentHandoffTargetResponse;
}

export function voiceAgentHandoffEdgeStateSerializer(item: VoiceAgentHandoffEdgeState): any {
  return {
    id: item["id"],
    source: item["source"],
    target: item["target"],
    cancel_on_interruption: item["cancel_on_interruption"],
    delay_ms: item["delayInMs"],
    transfer_message: item["transfer_message"],
    target_response: item["target_response"],
  };
}

export function voiceAgentHandoffEdgeStateDeserializer(item: any): VoiceAgentHandoffEdgeState {
  return {
    id: item["id"],
    source: item["source"],
    target: item["target"],
    cancel_on_interruption: item["cancel_on_interruption"],
    delayInMs: item["delay_ms"],
    transfer_message: item["transfer_message"],
    target_response: item["target_response"],
  };
}

/** The `session.created` server event. */
export interface VoiceAgentServerEventSessionCreated {
  /** The unique ID of the server event. */
  event_id: string;
  /** The event type, must be `session.created`. */
  type: "session.created";
  /** The initial effective voice-agent session configuration. */
  session: VoiceAgentSessionResponseConfig;
}

export function voiceAgentServerEventSessionCreatedSerializer(
  item: VoiceAgentServerEventSessionCreated,
): any {
  return {
    event_id: item["event_id"],
    type: item["type"],
    session: voiceAgentSessionResponseConfigSerializer(item["session"]),
  };
}

export function voiceAgentServerEventSessionCreatedDeserializer(
  item: any,
): VoiceAgentServerEventSessionCreated {
  return {
    event_id: item["event_id"],
    type: item["type"],
    session: voiceAgentSessionResponseConfigDeserializer(item["session"]),
  };
}

/** The `session.updated` server event. */
export interface VoiceAgentServerEventSessionUpdated {
  /** The unique ID of the server event. */
  event_id: string;
  /** The event type, must be `session.updated`. */
  type: "session.updated";
  /** The effective voice-agent session configuration after the update. */
  session: VoiceAgentSessionResponseConfig;
}

export function voiceAgentServerEventSessionUpdatedSerializer(
  item: VoiceAgentServerEventSessionUpdated,
): any {
  return {
    event_id: item["event_id"],
    type: item["type"],
    session: voiceAgentSessionResponseConfigSerializer(item["session"]),
  };
}

export function voiceAgentServerEventSessionUpdatedDeserializer(
  item: any,
): VoiceAgentServerEventSessionUpdated {
  return {
    event_id: item["event_id"],
    type: item["type"],
    session: voiceAgentSessionResponseConfigDeserializer(item["session"]),
  };
}

/** The `conversation.created` server event emitted when a voice-agent connection starts. */
export interface VoiceAgentServerEventConversationCreated {
  type: "conversation.created";
  /** The identifier of the created conversation. */
  conversation_id: string;
}

export function voiceAgentServerEventConversationCreatedSerializer(
  item: VoiceAgentServerEventConversationCreated,
): any {
  return { type: item["type"], conversation_id: item["conversation_id"] };
}

export function voiceAgentServerEventConversationCreatedDeserializer(
  item: any,
): VoiceAgentServerEventConversationCreated {
  return {
    type: item["type"],
    conversation_id: item["conversation_id"],
  };
}

/** Details of a voice-agent WebSocket error. */
export interface VoiceAgentServerEventErrorDetails {
  type: string;
  code?: string;
  message: string;
  param?: string;
  event_id?: string;
  /** The configured label of a tool that could not be resolved. */
  tool_label?: string;
  /** The configured type of a tool that could not be resolved. */
  tool_type?: string;
}

export function voiceAgentServerEventErrorDetailsSerializer(
  item: VoiceAgentServerEventErrorDetails,
): any {
  return {
    type: item["type"],
    code: item["code"],
    message: item["message"],
    param: item["param"],
    event_id: item["event_id"],
    tool_label: item["tool_label"],
    tool_type: item["tool_type"],
  };
}

export function voiceAgentServerEventErrorDetailsDeserializer(
  item: any,
): VoiceAgentServerEventErrorDetails {
  return {
    type: item["type"],
    code: item["code"],
    message: item["message"],
    param: item["param"],
    event_id: item["event_id"],
    tool_label: item["tool_label"],
    tool_type: item["tool_type"],
  };
}

/** The `error` server event. */
export interface VoiceAgentServerEventError {
  /** The unique identifier of the event. */
  event_id: string;
  type: "error";
  /** Details of the error. */
  error: VoiceAgentServerEventErrorDetails;
}

export function voiceAgentServerEventErrorSerializer(item: VoiceAgentServerEventError): any {
  return {
    event_id: item["event_id"],
    type: item["type"],
    error: voiceAgentServerEventErrorDetailsSerializer(item["error"]),
  };
}

export function voiceAgentServerEventErrorDeserializer(item: any): VoiceAgentServerEventError {
  return {
    event_id: item["event_id"],
    type: item["type"],
    error: voiceAgentServerEventErrorDetailsDeserializer(item["error"]),
  };
}

/** The `session.handoff.started` server event. */
export interface VoiceAgentServerEventSessionHandoffStarted {
  type: "session.handoff.started";
  event_id: string;
  handoff_id: string;
  edge_id: string;
  from_node_id: string;
  to_node_id: string;
  from_model: string;
  to_model: string;
  tool_call_id: string;
  node_generation: number;
}

export function voiceAgentServerEventSessionHandoffStartedSerializer(
  item: VoiceAgentServerEventSessionHandoffStarted,
): any {
  return {
    type: item["type"],
    event_id: item["event_id"],
    handoff_id: item["handoff_id"],
    edge_id: item["edge_id"],
    from_node_id: item["from_node_id"],
    to_node_id: item["to_node_id"],
    from_model: item["from_model"],
    to_model: item["to_model"],
    tool_call_id: item["tool_call_id"],
    node_generation: item["node_generation"],
  };
}

export function voiceAgentServerEventSessionHandoffStartedDeserializer(
  item: any,
): VoiceAgentServerEventSessionHandoffStarted {
  return {
    type: item["type"],
    event_id: item["event_id"],
    handoff_id: item["handoff_id"],
    edge_id: item["edge_id"],
    from_node_id: item["from_node_id"],
    to_node_id: item["to_node_id"],
    from_model: item["from_model"],
    to_model: item["to_model"],
    tool_call_id: item["tool_call_id"],
    node_generation: item["node_generation"],
  };
}

/** The `session.handoff.completed` server event. */
export interface VoiceAgentServerEventSessionHandoffCompleted {
  type: "session.handoff.completed";
  event_id: string;
  handoff_id: string;
  edge_id: string;
  from_node_id: string;
  to_node_id: string;
  from_model: string;
  to_model: string;
  tool_call_id: string;
  node_generation: number;
  /** The time spent preparing the target behavior, in milliseconds. */
  prepareDurationInMs: number;
  /** The total duration of the handoff, in milliseconds. */
  durationInMs: number;
}

export function voiceAgentServerEventSessionHandoffCompletedSerializer(
  item: VoiceAgentServerEventSessionHandoffCompleted,
): any {
  return {
    type: item["type"],
    event_id: item["event_id"],
    handoff_id: item["handoff_id"],
    edge_id: item["edge_id"],
    from_node_id: item["from_node_id"],
    to_node_id: item["to_node_id"],
    from_model: item["from_model"],
    to_model: item["to_model"],
    tool_call_id: item["tool_call_id"],
    node_generation: item["node_generation"],
    prepare_duration_ms: item["prepareDurationInMs"],
    duration_ms: item["durationInMs"],
  };
}

export function voiceAgentServerEventSessionHandoffCompletedDeserializer(
  item: any,
): VoiceAgentServerEventSessionHandoffCompleted {
  return {
    type: item["type"],
    event_id: item["event_id"],
    handoff_id: item["handoff_id"],
    edge_id: item["edge_id"],
    from_node_id: item["from_node_id"],
    to_node_id: item["to_node_id"],
    from_model: item["from_model"],
    to_model: item["to_model"],
    tool_call_id: item["tool_call_id"],
    node_generation: item["node_generation"],
    prepareDurationInMs: item["prepare_duration_ms"],
    durationInMs: item["duration_ms"],
  };
}

/** The `session.handoff.aborted` server event. */
export interface VoiceAgentServerEventSessionHandoffAborted {
  type: "session.handoff.aborted";
  event_id: string;
  handoff_id: string;
  edge_id: string;
  from_node_id: string;
  to_node_id: string;
  from_model: string;
  to_model: string;
  tool_call_id: string;
  node_generation: number;
  /** The reason the handoff was aborted. */
  reason: VoiceAgentHandoffAbortReason;
  /** The error that aborted the handoff, when `reason` is `error`. */
  error?: VoiceAgentServerEventErrorDetails;
}

export function voiceAgentServerEventSessionHandoffAbortedSerializer(
  item: VoiceAgentServerEventSessionHandoffAborted,
): any {
  return {
    type: item["type"],
    event_id: item["event_id"],
    handoff_id: item["handoff_id"],
    edge_id: item["edge_id"],
    from_node_id: item["from_node_id"],
    to_node_id: item["to_node_id"],
    from_model: item["from_model"],
    to_model: item["to_model"],
    tool_call_id: item["tool_call_id"],
    node_generation: item["node_generation"],
    reason: item["reason"],
    error: !item["error"]
      ? item["error"]
      : voiceAgentServerEventErrorDetailsSerializer(item["error"]),
  };
}

export function voiceAgentServerEventSessionHandoffAbortedDeserializer(
  item: any,
): VoiceAgentServerEventSessionHandoffAborted {
  return {
    type: item["type"],
    event_id: item["event_id"],
    handoff_id: item["handoff_id"],
    edge_id: item["edge_id"],
    from_node_id: item["from_node_id"],
    to_node_id: item["to_node_id"],
    from_model: item["from_model"],
    to_model: item["to_model"],
    tool_call_id: item["tool_call_id"],
    node_generation: item["node_generation"],
    reason: item["reason"],
    error: !item["error"]
      ? item["error"]
      : voiceAgentServerEventErrorDetailsDeserializer(item["error"]),
  };
}

/** Why a handoff ended before the target behavior committed. */
export type VoiceAgentHandoffAbortReason = "user_interruption" | "error";

/** Details of a non-fatal warning. */
export interface VoiceAgentServerEventWarningDetails {
  message: string;
  code?: string;
  param?: string;
}

export function voiceAgentServerEventWarningDetailsSerializer(
  item: VoiceAgentServerEventWarningDetails,
): any {
  return { message: item["message"], code: item["code"], param: item["param"] };
}

export function voiceAgentServerEventWarningDetailsDeserializer(
  item: any,
): VoiceAgentServerEventWarningDetails {
  return {
    message: item["message"],
    code: item["code"],
    param: item["param"],
  };
}

/** The `warning` server event. */
export interface VoiceAgentServerEventWarning {
  type: "warning";
  event_id: string;
  warning: VoiceAgentServerEventWarningDetails;
}

export function voiceAgentServerEventWarningSerializer(item: VoiceAgentServerEventWarning): any {
  return {
    type: item["type"],
    event_id: item["event_id"],
    warning: voiceAgentServerEventWarningDetailsSerializer(item["warning"]),
  };
}

export function voiceAgentServerEventWarningDeserializer(item: any): VoiceAgentServerEventWarning {
  return {
    type: item["type"],
    event_id: item["event_id"],
    warning: voiceAgentServerEventWarningDetailsDeserializer(item["warning"]),
  };
}

/** The `session.avatar.connecting` server event. */
export interface VoiceAgentServerEventSessionAvatarConnecting {
  type: "session.avatar.connecting";
  event_id: string;
  /** The server's SDP answer for avatar media negotiation. */
  server_sdp: string;
}

export function voiceAgentServerEventSessionAvatarConnectingSerializer(
  item: VoiceAgentServerEventSessionAvatarConnecting,
): any {
  return { type: item["type"], event_id: item["event_id"], server_sdp: item["server_sdp"] };
}

export function voiceAgentServerEventSessionAvatarConnectingDeserializer(
  item: any,
): VoiceAgentServerEventSessionAvatarConnecting {
  return {
    type: item["type"],
    event_id: item["event_id"],
    server_sdp: item["server_sdp"],
  };
}

/** The `session.avatar.switch_to_speaking` server event. */
export interface VoiceAgentServerEventSessionAvatarSwitchToSpeaking {
  type: "session.avatar.switch_to_speaking";
  event_id: string;
  turn_id?: string;
}

export function voiceAgentServerEventSessionAvatarSwitchToSpeakingSerializer(
  item: VoiceAgentServerEventSessionAvatarSwitchToSpeaking,
): any {
  return { type: item["type"], event_id: item["event_id"], turn_id: item["turn_id"] };
}

export function voiceAgentServerEventSessionAvatarSwitchToSpeakingDeserializer(
  item: any,
): VoiceAgentServerEventSessionAvatarSwitchToSpeaking {
  return {
    type: item["type"],
    event_id: item["event_id"],
    turn_id: item["turn_id"],
  };
}

/** The `session.avatar.switch_to_idle` server event. */
export interface VoiceAgentServerEventSessionAvatarSwitchToIdle {
  type: "session.avatar.switch_to_idle";
  event_id: string;
  turn_id?: string;
}

export function voiceAgentServerEventSessionAvatarSwitchToIdleSerializer(
  item: VoiceAgentServerEventSessionAvatarSwitchToIdle,
): any {
  return { type: item["type"], event_id: item["event_id"], turn_id: item["turn_id"] };
}

export function voiceAgentServerEventSessionAvatarSwitchToIdleDeserializer(
  item: any,
): VoiceAgentServerEventSessionAvatarSwitchToIdle {
  return {
    type: item["type"],
    event_id: item["event_id"],
    turn_id: item["turn_id"],
  };
}

/** The `response.audio_timestamp.delta` server event. */
export interface VoiceAgentServerEventResponseAudioTimestampDelta {
  type: "response.audio_timestamp.delta";
  event_id: string;
  response_id: string;
  item_id: string;
  output_index: number;
  content_index: number;
  audioOffsetInMs: number;
  audioDurationInMs: number;
  text: string;
  timestamp_type: "word";
}

export function voiceAgentServerEventResponseAudioTimestampDeltaSerializer(
  item: VoiceAgentServerEventResponseAudioTimestampDelta,
): any {
  return {
    type: item["type"],
    event_id: item["event_id"],
    response_id: item["response_id"],
    item_id: item["item_id"],
    output_index: item["output_index"],
    content_index: item["content_index"],
    audio_offset_ms: item["audioOffsetInMs"],
    audio_duration_ms: item["audioDurationInMs"],
    text: item["text"],
    timestamp_type: item["timestamp_type"],
  };
}

export function voiceAgentServerEventResponseAudioTimestampDeltaDeserializer(
  item: any,
): VoiceAgentServerEventResponseAudioTimestampDelta {
  return {
    type: item["type"],
    event_id: item["event_id"],
    response_id: item["response_id"],
    item_id: item["item_id"],
    output_index: item["output_index"],
    content_index: item["content_index"],
    audioOffsetInMs: item["audio_offset_ms"],
    audioDurationInMs: item["audio_duration_ms"],
    text: item["text"],
    timestamp_type: item["timestamp_type"],
  };
}

/** The `response.audio_timestamp.done` server event. */
export interface VoiceAgentServerEventResponseAudioTimestampDone {
  type: "response.audio_timestamp.done";
  event_id: string;
  response_id: string;
  item_id: string;
  output_index: number;
  content_index: number;
}

export function voiceAgentServerEventResponseAudioTimestampDoneSerializer(
  item: VoiceAgentServerEventResponseAudioTimestampDone,
): any {
  return {
    type: item["type"],
    event_id: item["event_id"],
    response_id: item["response_id"],
    item_id: item["item_id"],
    output_index: item["output_index"],
    content_index: item["content_index"],
  };
}

export function voiceAgentServerEventResponseAudioTimestampDoneDeserializer(
  item: any,
): VoiceAgentServerEventResponseAudioTimestampDone {
  return {
    type: item["type"],
    event_id: item["event_id"],
    response_id: item["response_id"],
    item_id: item["item_id"],
    output_index: item["output_index"],
    content_index: item["content_index"],
  };
}

/** The `response.animation_blendshapes.delta` server event. */
export interface VoiceAgentServerEventResponseAnimationBlendshapesDelta {
  type: "response.animation_blendshapes.delta";
  event_id: string;
  response_id: string;
  item_id: string;
  output_index: number;
  content_index: number;
  /** Animation frames as numeric blendshape weights or a compact encoded string. */
  frames: number[][] | string;
  /** The index of the first frame in this delta. */
  frame_index: number;
}

export function voiceAgentServerEventResponseAnimationBlendshapesDeltaSerializer(
  item: VoiceAgentServerEventResponseAnimationBlendshapesDelta,
): any {
  return {
    type: item["type"],
    event_id: item["event_id"],
    response_id: item["response_id"],
    item_id: item["item_id"],
    output_index: item["output_index"],
    content_index: item["content_index"],
    frames: _voiceAgentServerEventResponseAnimationBlendshapesDeltaFramesSerializer(item["frames"]),
    frame_index: item["frame_index"],
  };
}

export function voiceAgentServerEventResponseAnimationBlendshapesDeltaDeserializer(
  item: any,
): VoiceAgentServerEventResponseAnimationBlendshapesDelta {
  return {
    type: item["type"],
    event_id: item["event_id"],
    response_id: item["response_id"],
    item_id: item["item_id"],
    output_index: item["output_index"],
    content_index: item["content_index"],
    frames: _voiceAgentServerEventResponseAnimationBlendshapesDeltaFramesDeserializer(
      item["frames"],
    ),
    frame_index: item["frame_index"],
  };
}

/** Alias for _VoiceAgentServerEventResponseAnimationBlendshapesDeltaFrames */
export type _VoiceAgentServerEventResponseAnimationBlendshapesDeltaFrames = number[][] | string;

export function _voiceAgentServerEventResponseAnimationBlendshapesDeltaFramesSerializer(
  item: _VoiceAgentServerEventResponseAnimationBlendshapesDeltaFrames,
): any {
  return item;
}

export function _voiceAgentServerEventResponseAnimationBlendshapesDeltaFramesDeserializer(
  item: any,
): _VoiceAgentServerEventResponseAnimationBlendshapesDeltaFrames {
  return item;
}

/** The `response.animation_blendshapes.done` server event. */
export interface VoiceAgentServerEventResponseAnimationBlendshapesDone {
  type: "response.animation_blendshapes.done";
  event_id: string;
  response_id: string;
  item_id: string;
  output_index: number;
}

export function voiceAgentServerEventResponseAnimationBlendshapesDoneSerializer(
  item: VoiceAgentServerEventResponseAnimationBlendshapesDone,
): any {
  return {
    type: item["type"],
    event_id: item["event_id"],
    response_id: item["response_id"],
    item_id: item["item_id"],
    output_index: item["output_index"],
  };
}

export function voiceAgentServerEventResponseAnimationBlendshapesDoneDeserializer(
  item: any,
): VoiceAgentServerEventResponseAnimationBlendshapesDone {
  return {
    type: item["type"],
    event_id: item["event_id"],
    response_id: item["response_id"],
    item_id: item["item_id"],
    output_index: item["output_index"],
  };
}

/** The `response.animation_viseme.delta` server event. */
export interface VoiceAgentServerEventResponseAnimationVisemeDelta {
  type: "response.animation_viseme.delta";
  event_id: string;
  response_id: string;
  item_id: string;
  output_index: number;
  content_index: number;
  audioOffsetInMs: number;
  viseme_id: number;
}

export function voiceAgentServerEventResponseAnimationVisemeDeltaSerializer(
  item: VoiceAgentServerEventResponseAnimationVisemeDelta,
): any {
  return {
    type: item["type"],
    event_id: item["event_id"],
    response_id: item["response_id"],
    item_id: item["item_id"],
    output_index: item["output_index"],
    content_index: item["content_index"],
    audio_offset_ms: item["audioOffsetInMs"],
    viseme_id: item["viseme_id"],
  };
}

export function voiceAgentServerEventResponseAnimationVisemeDeltaDeserializer(
  item: any,
): VoiceAgentServerEventResponseAnimationVisemeDelta {
  return {
    type: item["type"],
    event_id: item["event_id"],
    response_id: item["response_id"],
    item_id: item["item_id"],
    output_index: item["output_index"],
    content_index: item["content_index"],
    audioOffsetInMs: item["audio_offset_ms"],
    viseme_id: item["viseme_id"],
  };
}

/** The `response.animation_viseme.done` server event. */
export interface VoiceAgentServerEventResponseAnimationVisemeDone {
  type: "response.animation_viseme.done";
  event_id: string;
  response_id: string;
  item_id: string;
  output_index: number;
  content_index: number;
}

export function voiceAgentServerEventResponseAnimationVisemeDoneSerializer(
  item: VoiceAgentServerEventResponseAnimationVisemeDone,
): any {
  return {
    type: item["type"],
    event_id: item["event_id"],
    response_id: item["response_id"],
    item_id: item["item_id"],
    output_index: item["output_index"],
    content_index: item["content_index"],
  };
}

export function voiceAgentServerEventResponseAnimationVisemeDoneDeserializer(
  item: any,
): VoiceAgentServerEventResponseAnimationVisemeDone {
  return {
    type: item["type"],
    event_id: item["event_id"],
    response_id: item["response_id"],
    item_id: item["item_id"],
    output_index: item["output_index"],
    content_index: item["content_index"],
  };
}

/** The `response.video.delta` server event. */
export interface VoiceAgentServerEventResponseVideoDelta {
  type: "response.video.delta";
  event_id: string;
  output_index: number;
  codec: string;
  /** The base64-encoded video frame data. */
  delta: string;
}

export function voiceAgentServerEventResponseVideoDeltaSerializer(
  item: VoiceAgentServerEventResponseVideoDelta,
): any {
  return {
    type: item["type"],
    event_id: item["event_id"],
    output_index: item["output_index"],
    codec: item["codec"],
    delta: item["delta"],
  };
}

export function voiceAgentServerEventResponseVideoDeltaDeserializer(
  item: any,
): VoiceAgentServerEventResponseVideoDelta {
  return {
    type: item["type"],
    event_id: item["event_id"],
    output_index: item["output_index"],
    codec: item["codec"],
    delta: item["delta"],
  };
}

/**
 * Returned when a new content part is added to an assistant message item during
 * response generation.
 */
export interface RealtimeServerEventResponseContentPartAdded extends RealtimeServerEvent {
  /** The unique ID of the server event. */
  event_id: string;
  /** The event type, must be `response.content_part.added`. */
  type: "response.content_part.added";
  /** The ID of the response. */
  response_id: string;
  /** The ID of the item to which the content part was added. */
  item_id: string;
  /** The index of the output item in the response. */
  output_index: number;
  /** The index of the content part in the item's content array. */
  content_index: number;
  /** The content part that was added. */
  part: RealtimeServerEventResponseContentPartAddedPart;
}

export function realtimeServerEventResponseContentPartAddedSerializer(
  item: RealtimeServerEventResponseContentPartAdded,
): any {
  return {
    type: item["type"],
    event_id: item["event_id"],
    response_id: item["response_id"],
    item_id: item["item_id"],
    output_index: item["output_index"],
    content_index: item["content_index"],
    part: realtimeServerEventResponseContentPartAddedPartSerializer(item["part"]),
  };
}

export function realtimeServerEventResponseContentPartAddedDeserializer(
  item: any,
): RealtimeServerEventResponseContentPartAdded {
  return {
    type: item["type"],
    event_id: item["event_id"],
    response_id: item["response_id"],
    item_id: item["item_id"],
    output_index: item["output_index"],
    content_index: item["content_index"],
    part: realtimeServerEventResponseContentPartAddedPartDeserializer(item["part"]),
  };
}

/** model interface RealtimeServerEventResponseContentPartAddedPart */
export interface RealtimeServerEventResponseContentPartAddedPart {
  type?: "audio" | "text";
  text?: string;
  audio?: string;
  transcript?: string;
}

export function realtimeServerEventResponseContentPartAddedPartSerializer(
  item: RealtimeServerEventResponseContentPartAddedPart,
): any {
  return {
    type: item["type"],
    text: item["text"],
    audio: item["audio"],
    transcript: item["transcript"],
  };
}

export function realtimeServerEventResponseContentPartAddedPartDeserializer(
  item: any,
): RealtimeServerEventResponseContentPartAddedPart {
  return {
    type: item["type"],
    text: item["text"],
    audio: item["audio"],
    transcript: item["transcript"],
  };
}

/** A realtime server event. */
export interface RealtimeServerEvent {
  type: RealtimeServerEventType;
}

export function realtimeServerEventSerializer(item: RealtimeServerEvent): any {
  return { type: item["type"] };
}

export function realtimeServerEventDeserializer(item: any): RealtimeServerEvent {
  return {
    type: item["type"],
  };
}

/** Alias for RealtimeServerEventUnion */
export type RealtimeServerEventUnion =
  RealtimeServerEventResponseContentPartAdded | RealtimeServerEvent;

export function realtimeServerEventUnionSerializer(item: RealtimeServerEventUnion): any {
  switch (item.type) {
    case "response.content_part.added":
      return realtimeServerEventResponseContentPartAddedSerializer(
        item as RealtimeServerEventResponseContentPartAdded,
      );

    default:
      return realtimeServerEventSerializer(item);
  }
}

export function realtimeServerEventUnionDeserializer(item: any): RealtimeServerEventUnion {
  switch (item["type"]) {
    case "response.content_part.added":
      return realtimeServerEventResponseContentPartAddedDeserializer(
        item as RealtimeServerEventResponseContentPartAdded,
      );

    default:
      return realtimeServerEventDeserializer(item);
  }
}

/** Type of RealtimeServerEventType */
export type RealtimeServerEventType =
  | "conversation.created"
  | "conversation.item.created"
  | "conversation.item.deleted"
  | "conversation.item.input_audio_transcription.completed"
  | "conversation.item.input_audio_transcription.delta"
  | "conversation.item.input_audio_transcription.failed"
  | "conversation.item.retrieved"
  | "conversation.item.truncated"
  | "error"
  | "input_audio_buffer.cleared"
  | "input_audio_buffer.committed"
  | "input_audio_buffer.dtmf_event_received"
  | "input_audio_buffer.speech_started"
  | "input_audio_buffer.speech_stopped"
  | "rate_limits.updated"
  | "response.output_audio.delta"
  | "response.output_audio.done"
  | "response.output_audio_transcript.delta"
  | "response.output_audio_transcript.done"
  | "response.content_part.added"
  | "response.content_part.done"
  | "response.created"
  | "response.done"
  | "response.function_call_arguments.delta"
  | "response.function_call_arguments.done"
  | "response.output_item.added"
  | "response.output_item.done"
  | "response.output_text.delta"
  | "response.output_text.done"
  | "session.created"
  | "session.updated"
  | "output_audio_buffer.started"
  | "output_audio_buffer.stopped"
  | "output_audio_buffer.cleared"
  | "conversation.item.added"
  | "conversation.item.done"
  | "input_audio_buffer.timeout_triggered"
  | "conversation.item.input_audio_transcription.segment"
  | "mcp_list_tools.in_progress"
  | "mcp_list_tools.completed"
  | "mcp_list_tools.failed"
  | "response.mcp_call_arguments.delta"
  | "response.mcp_call_arguments.done"
  | "response.mcp_call.in_progress"
  | "response.mcp_call.completed"
  | "response.mcp_call.failed";
/** A stable v1 message sent by a client over a voice-agent WebSocket. */
export type VoiceAgentClientEvent =
  | VoiceAgentClientEventConversationItemCreate
  | VoiceAgentClientEventConversationItemDelete
  | VoiceAgentClientEventConversationItemRetrieve
  | VoiceAgentClientEventConversationItemTruncate
  | VoiceAgentClientEventInputAudioBufferAppend
  | VoiceAgentClientEventInputAudioBufferClear
  | VoiceAgentClientEventInputAudioBufferCommit
  | VoiceAgentClientEventOutputAudioBufferClear
  | VoiceAgentClientEventResponseCancel
  | VoiceAgentClientEventResponseCreate
  | VoiceAgentClientEventSessionUpdate
  | VoiceAgentClientEventSessionAvatarConnect;

export function voiceAgentClientEventSerializer(item: VoiceAgentClientEvent): any {
  return item;
}

export function voiceAgentClientEventDeserializer(item: any): VoiceAgentClientEvent {
  return item;
}

/** A stable v1 message sent by the service over a voice-agent WebSocket. */
export type VoiceAgentServerEvent =
  | VoiceAgentServerEventConversationItemAdded
  | VoiceAgentServerEventConversationItemCreated
  | VoiceAgentServerEventConversationItemDeleted
  | VoiceAgentServerEventConversationItemDone
  | VoiceAgentServerEventConversationItemInputAudioTranscriptionCompleted
  | VoiceAgentServerEventConversationItemInputAudioTranscriptionDelta
  | VoiceAgentServerEventConversationItemInputAudioTranscriptionFailed
  | VoiceAgentServerEventConversationItemInputAudioTranscriptionSegment
  | VoiceAgentServerEventConversationItemRetrieved
  | VoiceAgentServerEventConversationItemTruncated
  | VoiceAgentServerEventInputAudioBufferCleared
  | VoiceAgentServerEventInputAudioBufferCommitted
  | VoiceAgentServerEventInputAudioBufferSpeechStarted
  | VoiceAgentServerEventInputAudioBufferSpeechStopped
  | VoiceAgentServerEventInputAudioBufferTimeoutTriggered
  | VoiceAgentServerEventMcpListToolsCompleted
  | VoiceAgentServerEventMcpListToolsFailed
  | VoiceAgentServerEventMcpListToolsInProgress
  | VoiceAgentServerEventOutputAudioBufferCleared
  | VoiceAgentServerEventRateLimitsUpdated
  | VoiceAgentServerEventResponseAudioDelta
  | VoiceAgentServerEventResponseAudioDone
  | VoiceAgentServerEventResponseAudioTranscriptDelta
  | VoiceAgentServerEventResponseAudioTranscriptDone
  | RealtimeServerEventResponseContentPartAdded
  | VoiceAgentServerEventResponseContentPartDone
  | VoiceAgentServerEventResponseCreated
  | VoiceAgentServerEventResponseDone
  | VoiceAgentServerEventResponseFunctionCallArgumentsDelta
  | VoiceAgentServerEventResponseFunctionCallArgumentsDone
  | VoiceAgentServerEventResponseMcpCallArgumentsDelta
  | VoiceAgentServerEventResponseMcpCallArgumentsDone
  | VoiceAgentServerEventResponseMcpCallCompleted
  | VoiceAgentServerEventResponseMcpCallFailed
  | VoiceAgentServerEventResponseMcpCallInProgress
  | VoiceAgentServerEventWebSearchCallInProgress
  | VoiceAgentServerEventWebSearchCallSearching
  | VoiceAgentServerEventWebSearchCallCompleted
  | VoiceAgentServerEventFileSearchCallInProgress
  | VoiceAgentServerEventFileSearchCallSearching
  | VoiceAgentServerEventFileSearchCallCompleted
  | VoiceAgentServerEventResponseOutputItemAdded
  | VoiceAgentServerEventResponseOutputItemDone
  | VoiceAgentServerEventResponseTextDelta
  | VoiceAgentServerEventResponseTextDone
  | VoiceAgentServerEventSessionCreated
  | VoiceAgentServerEventSessionUpdated
  | VoiceAgentServerEventConversationCreated
  | VoiceAgentServerEventError
  | VoiceAgentServerEventSessionHandoffStarted
  | VoiceAgentServerEventSessionHandoffCompleted
  | VoiceAgentServerEventSessionHandoffAborted
  | VoiceAgentServerEventWarning
  | VoiceAgentServerEventSessionAvatarConnecting
  | VoiceAgentServerEventSessionAvatarSwitchToSpeaking
  | VoiceAgentServerEventSessionAvatarSwitchToIdle
  | VoiceAgentServerEventResponseAudioTimestampDelta
  | VoiceAgentServerEventResponseAudioTimestampDone
  | VoiceAgentServerEventResponseAnimationBlendshapesDelta
  | VoiceAgentServerEventResponseAnimationBlendshapesDone
  | VoiceAgentServerEventResponseAnimationVisemeDelta
  | VoiceAgentServerEventResponseAnimationVisemeDone
  | VoiceAgentServerEventResponseVideoDelta;

export function voiceAgentServerEventSerializer(item: VoiceAgentServerEvent): any {
  return item;
}

export function voiceAgentServerEventDeserializer(item: any): VoiceAgentServerEvent {
  return item;
}

/** A JSON text message exchanged over an established voice-agent WebSocket. */
export type VoiceAgentWebSocketMessage = VoiceAgentClientEvent | VoiceAgentServerEvent;

export function voiceAgentWebSocketMessageSerializer(item: VoiceAgentWebSocketMessage): any {
  return item;
}

export function voiceAgentWebSocketMessageDeserializer(item: any): VoiceAgentWebSocketMessage {
  return item;
}

/** Feature opt-in keys for agent definition operations supporting hosted or workflow agents. */
export type AgentDefinitionOptInKeys =
  | "WorkflowAgents=V1Preview"
  | "ExternalAgents=V1Preview"
  | "DraftAgents=V1Preview"
  | "VoiceAgents=V1Preview";
/** The WebSocket subprotocol supported by a voice-agent connection. */
export type VoiceAgentWebSocketSubprotocol = "realtime";
/** Type of PageOrder */
export type PageOrder = "asc" | "desc";
/** Type of AgentObjectType */
export type AgentObjectType =
  "agent" | "agent.version" | "agent.deleted" | "agent.version.deleted" | "agent.container";

/** Microsoft Foundry API versions */
export enum KnownVersions {
  /** Microsoft Foundry API version v1. */
  v1 = "v1",
}

/** Type of RealtimeClientEventType */
export type RealtimeClientEventType =
  | "conversation.item.create"
  | "conversation.item.delete"
  | "conversation.item.retrieve"
  | "conversation.item.truncate"
  | "input_audio_buffer.append"
  | "input_audio_buffer.clear"
  | "output_audio_buffer.clear"
  | "input_audio_buffer.commit"
  | "response.cancel"
  | "response.create"
  | "session.update";

export type AgentEndpointConversationsGetAgentConversationAudioContentResponse = {
  /**
   * BROWSER ONLY
   *
   * The response body as a browser Blob.
   * Always `undefined` in node.js.
   */
  blobBody?: Promise<Blob>;
  /**
   * NODEJS ONLY
   *
   * The response body as a node.js Readable stream.
   * Always `undefined` in the browser.
   */
  readableStreamBody?: NodeReadableStream;
};

export type AgentEndpointConversationsGetAgentConversationItemAudioContentResponse = {
  /**
   * BROWSER ONLY
   *
   * The response body as a browser Blob.
   * Always `undefined` in node.js.
   */
  blobBody?: Promise<Blob>;
  /**
   * NODEJS ONLY
   *
   * The response body as a node.js Readable stream.
   * Always `undefined` in the browser.
   */
  readableStreamBody?: NodeReadableStream;
};
