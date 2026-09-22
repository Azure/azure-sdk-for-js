// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Semantic attribute constants for VoiceLive telemetry.
 * Based on GenAI Semantic Conventions v1.34.0.
 */

// --- GenAI Semantic Convention attributes ---
export const GEN_AI_OPERATION_NAME = "gen_ai.operation.name";
export const GEN_AI_SYSTEM = "gen_ai.system";
export const GEN_AI_REQUEST_MODEL = "gen_ai.request.model";
export const GEN_AI_USAGE_INPUT_TOKENS = "gen_ai.usage.input_tokens";
export const GEN_AI_USAGE_OUTPUT_TOKENS = "gen_ai.usage.output_tokens";
export const GEN_AI_EVENT_CONTENT = "gen_ai.event.content";
export const GEN_AI_RESPONSE_ID = "gen_ai.response.id";
export const GEN_AI_RESPONSE_FINISH_REASONS = "gen_ai.response.finish_reasons";
export const GEN_AI_REQUEST_TEMPERATURE = "gen_ai.request.temperature";
export const GEN_AI_REQUEST_MAX_OUTPUT_TOKENS = "gen_ai.request.max_output_tokens";
export const GEN_AI_SYSTEM_MESSAGE = "gen_ai.system_instructions";
export const GEN_AI_REQUEST_TOOLS = "gen_ai.request.tools";

// --- Provider attribute ---
export const GEN_AI_PROVIDER_NAME = "gen_ai.provider.name";
export const GEN_AI_PROVIDER_NAME_VALUE = "microsoft.foundry";

// --- Agent attributes ---
export const GEN_AI_AGENT_NAME = "gen_ai.agent.name";
export const GEN_AI_AGENT_ID = "gen_ai.agent.id";
export const GEN_AI_AGENT_THREAD_ID = "gen_ai.agent.thread_id";
export const GEN_AI_AGENT_VERSION = "gen_ai.agent.version";
export const GEN_AI_AGENT_PROJECT_NAME = "gen_ai.agent.project_name";

// --- Conversation attributes ---
export const GEN_AI_CONVERSATION_ID = "gen_ai.conversation.id";

// --- Server attributes ---
export const SERVER_ADDRESS = "server.address";
export const SERVER_PORT = "server.port";

// --- Azure namespace ---
export const AZ_NAMESPACE = "az.namespace";
export const AZ_NAMESPACE_VALUE = "Microsoft.CognitiveServices";
export const AZ_AI_VOICELIVE_SYSTEM = "az.ai.voicelive";

// --- VoiceLive-specific attributes ---
export const GEN_AI_VOICE_SESSION_ID = "gen_ai.voice.session_id";
export const GEN_AI_VOICE_EVENT_TYPE = "gen_ai.voice.event_type";
export const GEN_AI_VOICE_INPUT_AUDIO_FORMAT = "gen_ai.voice.input_audio_format";
export const GEN_AI_VOICE_OUTPUT_AUDIO_FORMAT = "gen_ai.voice.output_audio_format";
export const GEN_AI_VOICE_FIRST_TOKEN_LATENCY_MS = "gen_ai.voice.first_token_latency_ms";
export const GEN_AI_VOICE_TURN_COUNT = "gen_ai.voice.turn_count";
export const GEN_AI_VOICE_INTERRUPTION_COUNT = "gen_ai.voice.interruption_count";
export const GEN_AI_VOICE_AUDIO_BYTES_SENT = "gen_ai.voice.audio_bytes_sent";
export const GEN_AI_VOICE_AUDIO_BYTES_RECEIVED = "gen_ai.voice.audio_bytes_received";
export const GEN_AI_VOICE_INPUT_SAMPLE_RATE = "gen_ai.voice.input_sample_rate";
export const GEN_AI_VOICE_MESSAGE_SIZE = "gen_ai.voice.message_size";
export const GEN_AI_VOICE_CALL_ID = "gen_ai.voice.call_id";
export const GEN_AI_VOICE_ITEM_ID = "gen_ai.voice.item_id";
export const GEN_AI_VOICE_PREVIOUS_ITEM_ID = "gen_ai.voice.previous_item_id";
export const GEN_AI_VOICE_OUTPUT_INDEX = "gen_ai.voice.output_index";

// --- MCP-specific attributes ---
export const GEN_AI_VOICE_MCP_SERVER_LABEL = "gen_ai.voice.mcp.server_label";
export const GEN_AI_VOICE_MCP_TOOL_NAME = "gen_ai.voice.mcp.tool_name";
export const GEN_AI_VOICE_MCP_CALL_COUNT = "gen_ai.voice.mcp.call_count";
export const GEN_AI_VOICE_MCP_LIST_TOOLS_COUNT = "gen_ai.voice.mcp.list_tools_count";
export const GEN_AI_VOICE_MCP_APPROVAL_REQUEST_ID = "gen_ai.voice.mcp.approval_request_id";
export const GEN_AI_VOICE_MCP_APPROVE = "gen_ai.voice.mcp.approve";

// --- Error attributes ---
export const ERROR_TYPE = "error.type";

// --- Span event names ---
export const GEN_AI_INPUT_MESSAGES_EVENT = "gen_ai.input.messages";
export const GEN_AI_OUTPUT_MESSAGES_EVENT = "gen_ai.output.messages";
export const GEN_AI_VOICE_ERROR_EVENT = "gen_ai.voice.error";
export const GEN_AI_VOICE_RATE_LIMITS_EVENT = "gen_ai.voice.rate_limits.updated";

/**
 * VoiceLive operation names for span naming and `gen_ai.operation.name` attributes.
 */
export enum OperationName {
  Connect = "connect",
  Send = "send",
  Recv = "recv",
  Close = "close",
}
