// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Agent } from "../../models/agents/index.js";
import type { TracingAttributeOptions, Span } from "./tracing.js";
import { TracingUtility, TracingOperationName } from "./tracing.js";
import type { AgentsCreateAgentOptionalParams, AgentsUpdateAgentOptionalParams } from "../options.js";
import {
  addInstructionsEvent,
  formatAgentApiResponse,
  UpdateWithAgentAttributes,
} from "./traceUtility.js";

/**
 * Traces the start of creating or updating an agent.
 * @param span - The span to trace.
 * @param options - The options for creating an agent.
 */
export function traceStartCreateOrUpdateAgent(
  span: Span,
  options: AgentsCreateAgentOptionalParams | AgentsUpdateAgentOptionalParams,
  agentId?: string,
): void {
  const attributes: TracingAttributeOptions = {
    operationName: TracingOperationName.CREATE_AGENT,
    name: options.name ?? undefined,
    model: "model" in options ? options.model : undefined,
    description: options.description ?? undefined,
    instructions: options.instructions ?? undefined,
    topP: options.topP ?? undefined,
    temperature: options.temperature ?? undefined,
    responseFormat: formatAgentApiResponse(options.responseFormat),
  };
  if (agentId) {
    attributes.operationName = TracingOperationName.CREATE_UPDATE_AGENT;
    attributes.agentId = agentId;
  }
  TracingUtility.setSpanAttributes(
    span,
    TracingOperationName.CREATE_AGENT,
    UpdateWithAgentAttributes(attributes),
  );
  addInstructionsEvent(span, options);
}

/**
 * Traces the end of creating an agent.
 * @param span - The span to trace.
 * @param _options - The options for creating an agent.
 * @param result - The result of creating an agent.
 */
export async function traceEndCreateOrUpdateAgent(
  span: Span,
  _options: AgentsCreateAgentOptionalParams | AgentsUpdateAgentOptionalParams,
  result: Promise<Agent>,
): Promise<void> {
  const resolvedResult = await result;
  const attributes: TracingAttributeOptions = {
    agentId: resolvedResult.id,
  };
  TracingUtility.updateSpanAttributes(span, attributes);
}
