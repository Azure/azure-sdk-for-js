// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AgentOutput } from "../generated/src/outputModels.js";
import type { TracingAttributeOptions, Span } from "../tracing.js";
import { TracingUtility, TracingOperationName } from "../tracing.js";
import type { CreateAgentParameters, UpdateAgentParameters } from "../generated/src/parameters.js";
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
  options: CreateAgentParameters | UpdateAgentParameters,
  agentId?: string,
): void {
  const attributes: TracingAttributeOptions = {
    operationName: TracingOperationName.CREATE_AGENT,
    name: options.body.name ?? undefined,
    model: options.body.model,
    description: options.body.description ?? undefined,
    instructions: options.body.instructions ?? undefined,
    topP: options.body.top_p ?? undefined,
    temperature: options.body.temperature ?? undefined,
    responseFormat: formatAgentApiResponse(options.body.response_format),
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
  addInstructionsEvent(span, options.body);
}

/**
 * Traces the end of creating an agent.
 * @param span - The span to trace.
 * @param _options - The options for creating an agent.
 * @param result - The result of creating an agent.
 */
export async function traceEndCreateOrUpdateAgent(
  span: Span,
  _options: CreateAgentParameters | UpdateAgentParameters,
  result: Promise<AgentOutput>,
): Promise<void> {
  const resolvedResult = await result;
  const attributes: TracingAttributeOptions = {
    agentId: resolvedResult.id,
  };
  TracingUtility.updateSpanAttributes(span, attributes);
}
