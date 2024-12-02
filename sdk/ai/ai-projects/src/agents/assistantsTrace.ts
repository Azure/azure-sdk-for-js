// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { TracingSpan } from "@azure/core-tracing";
import { AgentOutput } from "../generated/src/outputModels.js";
import { TracingAttributeOptions, TracingAttributes, TracingUtility, TrackingOperationName } from "../tracing.js";
import { CreateAgentParameters } from "../generated/src/parameters.js";
import { addInstructionsEvent, formatAgentApiResponse } from "./traceUtility.js";

/**
 * Traces the start of creating an agent.
 * @param span - The span to trace.
 * @param options - The options for creating an agent.
 */
export function traceStartCreateAgent(span: Omit<TracingSpan, "end">, options: CreateAgentParameters): void {
    const attributes: TracingAttributeOptions = {
        operationName: TrackingOperationName.CREATE_AGENT,
        name: options.body.name,
        model: options.body.model,
        description: options.body.description,
        instructions: options.body.instructions,
        topP: options.body.top_p,
        temperature: options.body.temperature,
        responseFormat: formatAgentApiResponse(options.body.response_format),
        genAiSystem: TracingAttributes.AZ_AI_AGENT_SYSTEM
    };
    TracingUtility.setSpanAttributes(span,TrackingOperationName.CREATE_AGENT, attributes)
    addInstructionsEvent(span, options.body);
}


/**
 * Traces the end of creating an agent.
 * @param span - The span to trace.
 * @param _options - The options for creating an agent.
 * @param result - The result of creating an agent.
 */
export  async function traceEndCreateAgent(span: Omit<TracingSpan, "end">, _options: CreateAgentParameters, result: Promise<AgentOutput>): Promise<void> {
    const resolvedResult = await result;
    const attributes: TracingAttributeOptions = {
        agentId: resolvedResult.id,
    };
    TracingUtility.updateSpanAttributes(span, attributes);
}
