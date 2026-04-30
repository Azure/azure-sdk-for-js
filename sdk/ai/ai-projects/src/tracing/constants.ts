// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// --- GenAI Semantic Convention Attributes ---

// Agent
export const GEN_AI_AGENT_ID = "gen_ai.agent.id";
export const GEN_AI_AGENT_NAME = "gen_ai.agent.name";
export const GEN_AI_AGENT_DESCRIPTION = "gen_ai.agent.description";
export const GEN_AI_AGENT_VERSION = "gen_ai.agent.version";
export const GEN_AI_AGENT_TYPE = "gen_ai.agent.type";

// Hosted agent
export const GEN_AI_AGENT_HOSTED_CPU = "gen_ai.agent.hosted.cpu";
export const GEN_AI_AGENT_HOSTED_MEMORY = "gen_ai.agent.hosted.memory";
export const GEN_AI_AGENT_HOSTED_IMAGE = "gen_ai.agent.hosted.image";
export const GEN_AI_AGENT_HOSTED_PROTOCOL = "gen_ai.agent.hosted.protocol";
export const GEN_AI_AGENT_HOSTED_PROTOCOL_VERSION = "gen_ai.agent.hosted.protocol_version";

// Operation
export const GEN_AI_OPERATION_NAME = "gen_ai.operation.name";
export const GEN_AI_SYSTEM = "gen_ai.system";
export const GEN_AI_PROVIDER_NAME = "gen_ai.provider.name";

// Request (LLM model)
export const GEN_AI_REQUEST_MODEL = "gen_ai.request.model";
export const GEN_AI_REQUEST_TEMPERATURE = "gen_ai.request.temperature";
export const GEN_AI_REQUEST_TOP_P = "gen_ai.request.top_p";
export const GEN_AI_REQUEST_MAX_INPUT_TOKENS = "gen_ai.request.max_input_tokens";
export const GEN_AI_REQUEST_MAX_OUTPUT_TOKENS = "gen_ai.request.max_output_tokens";
export const GEN_AI_REQUEST_RESPONSE_FORMAT = "gen_ai.request.response_format";
export const GEN_AI_REQUEST_REASONING_EFFORT = "gen_ai.request.reasoning.effort";
export const GEN_AI_REQUEST_REASONING_SUMMARY = "gen_ai.request.reasoning.summary";
export const GEN_AI_REQUEST_TOOLS = "gen_ai.request.tools";

// Response
export const GEN_AI_RESPONSE_MODEL = "gen_ai.response.model";
export const GEN_AI_RESPONSE_ID = "gen_ai.response.id";
export const GEN_AI_RESPONSE_FINISH_REASONS = "gen_ai.response.finish_reasons";

// Usage
export const GEN_AI_USAGE_INPUT_TOKENS = "gen_ai.usage.input_tokens";
export const GEN_AI_USAGE_OUTPUT_TOKENS = "gen_ai.usage.output_tokens";

// Tool
export const GEN_AI_TOOL_NAME = "gen_ai.tool.name";
export const GEN_AI_TOOL_CALL_ID = "gen_ai.tool.call.id";

// Conversation
export const GEN_AI_CONVERSATION_ID = "gen_ai.conversation.id";

// Messages (content recording)
export const GEN_AI_SYSTEM_MESSAGE = "gen_ai.system_instructions";
export const GEN_AI_INPUT_MESSAGES = "gen_ai.input.messages";
export const GEN_AI_OUTPUT_MESSAGES = "gen_ai.output.messages";

// Server
export const SERVER_ADDRESS = "server.address";
export const SERVER_PORT = "server.port";

// Azure
export const AZ_NAMESPACE = "az.namespace";

// Error
export const ERROR_TYPE = "error.type";

// --- Constant Values ---

export const AZ_AI_AGENT_SYSTEM = "az.ai.agents";
export const AZ_NAMESPACE_VALUE = "Microsoft.CognitiveServices";
export const AGENTS_PROVIDER = "microsoft.foundry";

// --- Operation Names ---

export const OperationName = {
  CREATE_AGENT: "create_agent",
  INVOKE_AGENT: "invoke_agent",
  CHAT: "chat",
} as const;

// --- Metric Names ---

export const GEN_AI_CLIENT_OPERATION_DURATION = "gen_ai.client.operation.duration";
export const GEN_AI_CLIENT_TOKEN_USAGE = "gen_ai.client.token.usage";

// --- Event Names ---

export const GEN_AI_INPUT_MESSAGE_EVENT = "gen_ai.input.messages";
export const GEN_AI_OUTPUT_MESSAGE_EVENT = "gen_ai.output.messages";
export const GEN_AI_SYSTEM_INSTRUCTION_EVENT = "gen_ai.system.instructions";
