// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { TracingSpan } from "@azure/core-tracing";
import { isContentRecordingEnabled } from "./configuration.js";

/**
 * Subset of TracingSpan used by attribute helpers.
 * Compatible with both TracingSpan and Omit<TracingSpan, "end"> from withSpan callbacks.
 */
type SpanLike = Pick<TracingSpan, "setAttribute" | "setStatus">;
import {
  GEN_AI_AGENT_ID,
  GEN_AI_AGENT_NAME,
  GEN_AI_AGENT_DESCRIPTION,
  GEN_AI_AGENT_VERSION,
  GEN_AI_AGENT_TYPE,
  GEN_AI_AGENT_HOSTED_CPU,
  GEN_AI_AGENT_HOSTED_MEMORY,
  GEN_AI_AGENT_HOSTED_IMAGE,
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
  AZ_NAMESPACE,
  SERVER_ADDRESS,
  SERVER_PORT,
  ERROR_TYPE,
  AZ_NAMESPACE_VALUE,
  AGENTS_PROVIDER,
} from "./constants.js";
import type { Agent, AgentVersion, AgentDefinitionUnion } from "../models/models.js";

/**
 * Sets common span attributes for all traced operations.
 */
export function setCommonAttributes(
  span: SpanLike,
  operationName: string,
  endpoint: string,
): void {
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
  span.setAttribute(GEN_AI_AGENT_VERSION, version.version);
  span.setAttribute(GEN_AI_AGENT_TYPE, version.definition?.kind ?? "unknown");

  if (isContentRecordingEnabled()) {
    if (version.description) {
      span.setAttribute(GEN_AI_AGENT_DESCRIPTION, version.description);
    }
    setDefinitionAttributes(span, version.definition);
  }
}

/**
 * Sets attributes from the agent definition.
 * Only sets content-sensitive attributes when content recording is enabled.
 */
export function setDefinitionAttributes(
  span: SpanLike,
  definition: AgentDefinitionUnion,
): void {
  if (!definition) return;

  span.setAttribute(GEN_AI_AGENT_TYPE, definition.kind ?? "unknown");

  if (definition.kind === "prompt") {
    // Always set instructions attribute; structured as [{"type":"text","content":"..."}]
    // When content recording is off, omit the content field
    if (isContentRecordingEnabled() && definition.instructions) {
      span.setAttribute(
        GEN_AI_SYSTEM_MESSAGE,
        JSON.stringify([{ type: "text", content: definition.instructions }]),
      );
    } else {
      span.setAttribute(GEN_AI_SYSTEM_MESSAGE, JSON.stringify([{ type: "text" }]));
    }
    // Model is always set regardless of content recording
    span.setAttribute(GEN_AI_REQUEST_MODEL, definition.model);
  }

  if (!isContentRecordingEnabled()) return;

  if (definition.kind === "prompt") {
    if (definition.temperature !== undefined) {
      span.setAttribute(GEN_AI_REQUEST_TEMPERATURE, String(definition.temperature));
    }
    if (definition.top_p !== undefined) {
      span.setAttribute(GEN_AI_REQUEST_TOP_P, String(definition.top_p));
    }
    if (definition.reasoning?.effort) {
      span.setAttribute(GEN_AI_REQUEST_REASONING_EFFORT, definition.reasoning.effort);
    }
  } else if (definition.kind === "hosted") {
    if (definition.cpu) {
      span.setAttribute(GEN_AI_AGENT_HOSTED_CPU, definition.cpu);
    }
    if (definition.memory) {
      span.setAttribute(GEN_AI_AGENT_HOSTED_MEMORY, definition.memory);
    }
    if (definition.image) {
      span.setAttribute(GEN_AI_AGENT_HOSTED_IMAGE, definition.image);
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
