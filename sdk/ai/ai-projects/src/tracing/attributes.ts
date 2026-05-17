// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { TracingSpan } from "@azure/core-tracing";
import { isContentRecordingEnabled } from "./configuration.js";
import { formatInputMessages, formatOutputMessages } from "./formatters.js";
import type { Response as OAIResponse } from "openai/resources/responses/responses";

/**
 * Subset of TracingSpan used by attribute helpers.
 * Compatible with both TracingSpan and `Omit<TracingSpan, "end">` from withSpan callbacks.
 */
export type SpanLike = Pick<TracingSpan, "setAttribute" | "setStatus">;
import {
  GEN_AI_AGENT_ID,
  GEN_AI_AGENT_NAME,
  GEN_AI_AGENT_DESCRIPTION,
  GEN_AI_AGENT_VERSION,
  GEN_AI_AGENT_TYPE,
  GEN_AI_AGENT_HOSTED_CPU,
  GEN_AI_AGENT_HOSTED_MEMORY,
  GEN_AI_AGENT_HOSTED_IMAGE,
  GEN_AI_AGENT_HOSTED_PROTOCOL,
  GEN_AI_AGENT_HOSTED_PROTOCOL_VERSION,
  GEN_AI_REQUEST_MODEL,
  GEN_AI_REQUEST_TEMPERATURE,
  GEN_AI_REQUEST_TOP_P,
  GEN_AI_REQUEST_REASONING_EFFORT,
  GEN_AI_SYSTEM_MESSAGE,
  GEN_AI_RESPONSE_MODEL,
  GEN_AI_RESPONSE_ID,
  GEN_AI_USAGE_INPUT_TOKENS,
  GEN_AI_USAGE_OUTPUT_TOKENS,
  GEN_AI_OPERATION_NAME,
  GEN_AI_PROVIDER_NAME,
  GEN_AI_INPUT_MESSAGES,
  GEN_AI_OUTPUT_MESSAGES,
  GEN_AI_CONVERSATION_ID,
  AZ_NAMESPACE,
  SERVER_ADDRESS,
  SERVER_PORT,
  ERROR_TYPE,
  AZ_NAMESPACE_VALUE,
  AGENTS_PROVIDER,
  GEN_AI_EVENT_CONTENT,
  GEN_AI_AGENT_WORKFLOW_EVENT,
} from "./constants.js";
import type {
  Agent,
  AgentVersion,
  AgentDefinitionUnion,
  PromptAgentDefinition,
  HostedAgentDefinition,
  WorkflowAgentDefinition,
} from "../models/models.js";

/**
 * Sets common span attributes for all traced operations.
 */
export function setCommonAttributes(span: SpanLike, operationName: string, endpoint: string): void {
  span.setAttribute(GEN_AI_OPERATION_NAME, operationName);
  span.setAttribute(AZ_NAMESPACE, AZ_NAMESPACE_VALUE);
  span.setAttribute(GEN_AI_PROVIDER_NAME, AGENTS_PROVIDER);
  setServerAttributes(span, endpoint);
}

/**
 * Sets server.address and server.port from a URL endpoint string.
 */
export function setServerAttributes(span: SpanLike, endpoint: string): void {
  try {
    const url = new URL(endpoint);
    span.setAttribute(SERVER_ADDRESS, url.hostname);
    const port = url.port ? parseInt(url.port, 10) : undefined;
    if (port && port !== 443) {
      span.setAttribute(SERVER_PORT, port);
    }
  } catch {
    // If URL parsing fails, skip server attributes
  }
}

/**
 * Sets agent-related attributes on the span from an Agent response.
 * When content recording is disabled, only IDs and types are set.
 */
export function setAgentAttributes(span: SpanLike, agent: Agent): void {
  const version = agent.versions?.latest;
  const agentId = version?.version ? `${agent.name}:${version.version}` : agent.name;
  span.setAttribute(GEN_AI_AGENT_ID, agentId);
  span.setAttribute(GEN_AI_AGENT_NAME, agent.name);

  if (version) {
    setAgentVersionAttributes(span, version);
  }
}

/**
 * Sets agent version attributes on the span.
 */
export function setAgentVersionAttributes(span: SpanLike, version: AgentVersion): void {
  const agentId = version.version ? `${version.name}:${version.version}` : version.name;
  span.setAttribute(GEN_AI_AGENT_ID, agentId);
  span.setAttribute(GEN_AI_AGENT_NAME, version.name);
  span.setAttribute(GEN_AI_AGENT_VERSION, version.version);
  span.setAttribute(GEN_AI_AGENT_TYPE, version.definition?.kind ?? "unknown");

  if (isContentRecordingEnabled() && version.description) {
    span.setAttribute(GEN_AI_AGENT_DESCRIPTION, version.description);
  }
  setDefinitionAttributes(span, version.definition);
}

/**
 * Sets attributes from the agent definition.
 * Only sets content-sensitive attributes when content recording is enabled.
 */
export function setDefinitionAttributes(span: SpanLike, definition: AgentDefinitionUnion): void {
  if (!definition) return;

  span.setAttribute(GEN_AI_AGENT_TYPE, definition.kind ?? "unknown");

  if (definition.kind === "prompt") {
    const promptDef = definition as PromptAgentDefinition;
    // Always set instructions attribute; structured as [{"type":"text","content":"..."}]
    // When content recording is off, omit the content field
    if (isContentRecordingEnabled() && promptDef.instructions) {
      span.setAttribute(
        GEN_AI_SYSTEM_MESSAGE,
        JSON.stringify([{ type: "text", content: promptDef.instructions }]),
      );
    } else {
      span.setAttribute(GEN_AI_SYSTEM_MESSAGE, JSON.stringify([{ type: "text" }]));
    }
    // Model is always set regardless of content recording
    span.setAttribute(GEN_AI_REQUEST_MODEL, promptDef.model);

    if (isContentRecordingEnabled()) {
      if (promptDef.temperature !== undefined) {
        span.setAttribute(GEN_AI_REQUEST_TEMPERATURE, String(promptDef.temperature));
      }
      if (promptDef.top_p !== undefined) {
        span.setAttribute(GEN_AI_REQUEST_TOP_P, String(promptDef.top_p));
      }
      if (promptDef.reasoning?.effort) {
        span.setAttribute(GEN_AI_REQUEST_REASONING_EFFORT, promptDef.reasoning.effort);
      }
    }
  } else if (definition.kind === "hosted") {
    const hostedDef = definition as HostedAgentDefinition;
    if (hostedDef.cpu) {
      span.setAttribute(GEN_AI_AGENT_HOSTED_CPU, hostedDef.cpu);
    }
    if (hostedDef.memory) {
      span.setAttribute(GEN_AI_AGENT_HOSTED_MEMORY, hostedDef.memory);
    }
    if (hostedDef.image) {
      span.setAttribute(GEN_AI_AGENT_HOSTED_IMAGE, hostedDef.image);
    }
    // Use container_protocol_versions or protocol_versions (first entry)
    const protocols = hostedDef.container_protocol_versions ?? hostedDef.protocol_versions;
    if (protocols && protocols.length > 0) {
      span.setAttribute(GEN_AI_AGENT_HOSTED_PROTOCOL, protocols[0]!.protocol);
      span.setAttribute(GEN_AI_AGENT_HOSTED_PROTOCOL_VERSION, protocols[0]!.version);
    }
  } else if (definition.kind === "workflow") {
    const workflowDef = definition as WorkflowAgentDefinition;
    const fullSpan = span as TracingSpan;
    if (fullSpan.addEvent) {
      const contentArray =
        isContentRecordingEnabled() && workflowDef.workflow
          ? [{ type: "workflow", content: workflowDef.workflow }]
          : [];
      fullSpan.addEvent(GEN_AI_AGENT_WORKFLOW_EVENT, {
        attributes: {
          [GEN_AI_PROVIDER_NAME]: AGENTS_PROVIDER,
          [GEN_AI_EVENT_CONTENT]: JSON.stringify(contentArray),
        },
      });
    }
  }
}

/**
 * Sets response attributes on the span from a responses.create() result.
 */
export function setResponseAttributes(
  span: SpanLike,
  response: {
    id?: string;
    model?: string;
    usage?: { input_tokens?: number; output_tokens?: number };
    status?: string;
  },
): void {
  if (response.id) {
    span.setAttribute(GEN_AI_RESPONSE_ID, response.id);
  }
  if (response.model) {
    span.setAttribute(GEN_AI_RESPONSE_MODEL, response.model);
  }
  if (response.usage) {
    if (response.usage.input_tokens !== undefined) {
      span.setAttribute(GEN_AI_USAGE_INPUT_TOKENS, response.usage.input_tokens);
    }
    if (response.usage.output_tokens !== undefined) {
      span.setAttribute(GEN_AI_USAGE_OUTPUT_TOKENS, response.usage.output_tokens);
    }
  }
}

/**
 * Sets error attributes on the span.
 */
export function setErrorAttributes(span: SpanLike, error: unknown): void {
  if (error instanceof Error) {
    span.setAttribute(ERROR_TYPE, error.name || error.constructor?.name || "Error");
  } else {
    span.setAttribute(ERROR_TYPE, "Error");
  }
}

/**
 * Parses an endpoint URL into server address and port.
 */
export function parseEndpoint(endpoint: string): { serverAddress?: string; serverPort?: number } {
  try {
    const url = new URL(endpoint);
    const port = url.port ? parseInt(url.port, 10) : undefined;
    return { serverAddress: url.hostname, serverPort: port };
  } catch {
    return {};
  }
}

/**
 * Sets common span attributes for OpenAI response tracing.
 */
export function setCommonSpanAttributes(
  span: SpanLike,
  operationName: string,
  serverAddress: string | undefined,
  serverPort: number | undefined,
  body: Record<string, unknown>,
  agentName?: string,
): void {
  span.setAttribute(GEN_AI_OPERATION_NAME, operationName);
  span.setAttribute(AZ_NAMESPACE, AZ_NAMESPACE_VALUE);
  span.setAttribute(GEN_AI_PROVIDER_NAME, AGENTS_PROVIDER);

  // Server attributes
  if (serverAddress) {
    span.setAttribute(SERVER_ADDRESS, serverAddress);
  }
  if (serverPort && serverPort !== 443) {
    span.setAttribute(SERVER_PORT, serverPort);
  }

  // Agent name for invoke_agent operations
  if (agentName) {
    span.setAttribute(GEN_AI_AGENT_NAME, agentName);
  }

  // Conversation ID
  const conversationId = body.conversation;
  if (typeof conversationId === "string" && conversationId) {
    span.setAttribute(GEN_AI_CONVERSATION_ID, conversationId);
  }

  // Input messages are always set (content is stripped when recording is off)
  const inputMessages = formatInputMessages(body);
  if (inputMessages) {
    span.setAttribute(GEN_AI_INPUT_MESSAGES, inputMessages);
  }

  // Request attributes (content-recording gated)
  if (isContentRecordingEnabled()) {
    if (body.model) {
      span.setAttribute(GEN_AI_REQUEST_MODEL, String(body.model));
    }
    if (body.temperature !== undefined) {
      span.setAttribute(GEN_AI_REQUEST_TEMPERATURE, String(body.temperature));
    }
    if (body.top_p !== undefined) {
      span.setAttribute(GEN_AI_REQUEST_TOP_P, String(body.top_p));
    }
    // system_instructions only for non-agent (chat) operations
    if (!agentName) {
      if (body.instructions) {
        span.setAttribute(
          GEN_AI_SYSTEM_MESSAGE,
          JSON.stringify([{ type: "text", content: String(body.instructions) }]),
        );
      } else {
        span.setAttribute(GEN_AI_SYSTEM_MESSAGE, JSON.stringify([{ type: "text" }]));
      }
    }
  }
}

/**
 * Sets response span attributes from an OpenAI Response object.
 */
export function setResponseSpanAttributes(span: SpanLike, response: OAIResponse): void {
  setResponseAttributes(span, {
    id: response.id,
    model: typeof response.model === "string" ? response.model : undefined,
    usage: response.usage
      ? {
          input_tokens: response.usage.input_tokens,
          output_tokens: response.usage.output_tokens,
        }
      : undefined,
    status: response.status ?? undefined,
  });

  // Output messages are always set (content is stripped when recording is off)
  const outputMessages = formatOutputMessages(response as unknown as Record<string, unknown>);
  if (outputMessages) {
    span.setAttribute(GEN_AI_OUTPUT_MESSAGES, outputMessages);
  }
}
