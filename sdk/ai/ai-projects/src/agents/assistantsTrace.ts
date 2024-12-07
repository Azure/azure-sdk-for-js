// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AgentOutput } from "../generated/src/outputModels.js";
import { TracingAttributeOptions, TracingAttributes, TracingUtility, TracingOperationName, Span } from "../tracing.js";
import { CreateAgentParameters } from "../generated/src/parameters.js";
import { addInstructionsEvent, formatAgentApiResponse } from "./traceUtility.js";

/**
 * Traces the start of creating an agent.
 * @param span - The span to trace.
 * @param options - The options for creating an agent.
 */
export function traceStartCreateAgent(span: Span, options: CreateAgentParameters): void {
    const attributes: TracingAttributeOptions = {
        operationName: TracingOperationName.CREATE_AGENT,
        name: options.body.name ?? undefined,
        model: options.body.model,
        description: options.body.description ?? undefined,
        instructions: options.body.instructions ?? undefined,
        topP: options.body.top_p ?? undefined,
        temperature: options.body.temperature ?? undefined,
        responseFormat: formatAgentApiResponse(options.body.response_format),
        genAiSystem: TracingAttributes.AZ_AI_AGENT_SYSTEM
    };
    TracingUtility.setSpanAttributes(span,TracingOperationName.CREATE_AGENT, attributes)
    addInstructionsEvent(span, options.body);
}


/**
 * Traces the end of creating an agent.
 * @param span - The span to trace.
 * @param _options - The options for creating an agent.
 * @param result - The result of creating an agent.
 */
export  async function traceEndCreateAgent(span: Span, _options: CreateAgentParameters, result: Promise<AgentOutput>): Promise<void> {
    const resolvedResult = await result;
    const attributes: TracingAttributeOptions = {
        agentId: resolvedResult.id,
    };
    TracingUtility.updateSpanAttributes(span, attributes);
}
