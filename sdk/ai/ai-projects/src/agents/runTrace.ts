// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { TracingSpan } from "@azure/core-tracing";
import { CreateRunParameters, CreateThreadAndRunParameters } from "../generated/src/parameters.js";
import { ThreadRunOutput } from "../generated/src/outputModels.js";
import { TracingAttributeOptions, TracingAttributes, TracingUtility, TrackingOperationName } from "../tracing.js";
import { addInstructionsEvent, addMessageEvent, formatAgentApiResponse } from "./traceUtility.js";

export function traceStartCreateRun(span: Omit<TracingSpan, "end">, options: CreateRunParameters | CreateThreadAndRunParameters, threadId?: string, operationName: string = TrackingOperationName.CREATE_RUN): void {

    const attributes: TracingAttributeOptions = {
        threadId: threadId,
        agentId: options.body.assistant_id,
        model: options.body.model,
        instructions: options.body.instructions,
        temperature: options.body.temperature,
        topP: options.body.top_p,
        maxCompletionTokens: options.body.max_completion_tokens,
        maxPromptTokens: options.body.max_prompt_tokens,
        responseFormat: formatAgentApiResponse(options.body.response_format),
        genAiSystem: TracingAttributes.AZ_AI_AGENT_SYSTEM
    }
    if((options as CreateRunParameters).body.additional_instructions) {
        attributes.additional_instructions = (options as CreateRunParameters).body.additional_instructions;
    }
    TracingUtility.setSpanAttributes(span, operationName, attributes);
    setSpanEvents(span, options);
}

export function traceStartCreateThreadAndRun(span: Omit<TracingSpan, "end">, options: CreateThreadAndRunParameters): void {
    traceStartCreateRun(span, options, undefined, TrackingOperationName.CREATE_THREAD_RUN);
}

export async function traceEndCreateRun(span: Omit<TracingSpan, "end">, _options: CreateRunParameters, result: Promise<ThreadRunOutput>): Promise<void> {
    const resolvedResult = await result;
    TracingUtility.updateSpanAttributes(span, { runId: resolvedResult.id, runStatus: resolvedResult.status, responseModel: resolvedResult.model, usageCompletionTokens: resolvedResult.usage?.completion_tokens, usagePromptTokens: resolvedResult.usage?.prompt_tokens });
}

function setSpanEvents(span: Omit<TracingSpan, "end">, options: CreateRunParameters): void {
    addInstructionsEvent(span, { ...options.body, agentId: options.body.assistant_id });
    options.body.additional_messages?.forEach((message) => {
        addMessageEvent(span, message);
    });
}
