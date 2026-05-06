// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Attribute name constants and mapping tables for GenAI main agent
 * attribution.
 *
 * @internal
 */

export const GEN_AI_OPERATION_NAME = "gen_ai.operation.name";
export const GEN_AI_OPERATION_INVOKE_AGENT = "invoke_agent";

export const MAIN_AGENT_NAME = "microsoft.gen_ai.main_agent.name";
export const MAIN_AGENT_ID = "microsoft.gen_ai.main_agent.id";
export const MAIN_AGENT_VERSION = "microsoft.gen_ai.main_agent.version";
export const MAIN_AGENT_CONVERSATION_ID = "microsoft.gen_ai.main_agent.conversation_id";

export const MAIN_AGENT_ATTRIBUTE_PREFIX = "microsoft.gen_ai.main_agent.";

/**
 * Mapping used by SpanProcessor.OnStart: copy primary attribute from the
 * parent span if present, otherwise copy the fallback attribute.
 *
 * @internal
 */
export const MAIN_AGENT_ONSTART_MAPPING: ReadonlyArray<{
  target: string;
  primary: string;
  fallback: string;
}> = [
  { target: MAIN_AGENT_NAME, primary: MAIN_AGENT_NAME, fallback: "gen_ai.agent.name" },
  { target: MAIN_AGENT_ID, primary: MAIN_AGENT_ID, fallback: "gen_ai.agent.id" },
  { target: MAIN_AGENT_VERSION, primary: MAIN_AGENT_VERSION, fallback: "gen_ai.agent.version" },
  {
    target: MAIN_AGENT_CONVERSATION_ID,
    primary: MAIN_AGENT_CONVERSATION_ID,
    fallback: "gen_ai.conversation.id",
  },
];

/**
 * Mapping used by SpanProcessor.OnEnd for `invoke_agent` spans that do not
 * already carry any `microsoft.gen_ai.main_agent.*` attribute: copy the
 * source attribute from the span onto the corresponding target.
 *
 * @internal
 */
export const MAIN_AGENT_ONEND_MAPPING: ReadonlyArray<{
  target: string;
  source: string;
}> = [
  { target: MAIN_AGENT_NAME, source: "gen_ai.agent.name" },
  { target: MAIN_AGENT_ID, source: "gen_ai.agent.id" },
  { target: MAIN_AGENT_VERSION, source: "gen_ai.agent.version" },
  { target: MAIN_AGENT_CONVERSATION_ID, source: "gen_ai.conversation.id" },
];
