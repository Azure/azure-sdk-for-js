// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CreateRunParameters, CreateThreadAndRunParameters, SubmitToolOutputsToRunParameters, UpdateRunParameters } from "../generated/src/parameters.js";
import { ThreadRunOutput } from "../generated/src/outputModels.js";
import { TracingAttributeOptions, TracingUtility, TracingOperationName, Span } from "../tracing.js";
import { addInstructionsEvent, addMessageEvent, addToolMessagesEvent, formatAgentApiResponse, UpdateWithAgentAttributes } from "./traceUtility.js";

export function traceStartCreateRun(span: Span, options: CreateRunParameters | CreateThreadAndRunParameters, threadId?: string, operationName: string = TracingOperationName.CREATE_RUN): void {

    const attributes: TracingAttributeOptions = {
        threadId: threadId,
        agentId: options.body.assistant_id,
        model: options.body.model ?? undefined,
        instructions: options.body.instructions ?? undefined,
        temperature: options.body.temperature ?? undefined,
        topP: options.body.top_p ?? undefined,
        maxCompletionTokens: options.body.max_completion_tokens ?? undefined,
        maxPromptTokens: options.body.max_prompt_tokens ?? undefined,
        responseFormat: formatAgentApiResponse(options.body.response_format),
    }
    if ((options as CreateRunParameters).body.additional_instructions) {
        attributes.additional_instructions = (options as CreateRunParameters).body.additional_instructions ?? undefined;
    }
    TracingUtility.setSpanAttributes(span, operationName, UpdateWithAgentAttributes(attributes));
    setSpanEvents(span, options);
}

export function traceStartCreateThreadAndRun(span: Span, options: CreateThreadAndRunParameters): void {
    traceStartCreateRun(span, options, undefined, TracingOperationName.CREATE_THREAD_RUN);
}

export async function traceEndCreateOrUpdateRun(span: Span, _options: CreateRunParameters | UpdateRunParameters, result: Promise<ThreadRunOutput>): Promise<void> {
    const resolvedResult = await result;
    TracingUtility.updateSpanAttributes(span, { runId: resolvedResult.id, runStatus: resolvedResult.status, responseModel: resolvedResult.model, usageCompletionTokens: resolvedResult.usage?.completion_tokens, usagePromptTokens: resolvedResult.usage?.prompt_tokens });
}

export function traceStartSubmitToolOutputsToRun(span: Span, options: SubmitToolOutputsToRunParameters, threadId: string,
    runId: string,): void {
    const attributes: TracingAttributeOptions = { threadId: threadId, runId: runId }
    TracingUtility.setSpanAttributes(span, TracingOperationName.SUBMIT_TOOL_OUTPUTS, UpdateWithAgentAttributes(attributes));
    addToolMessagesEvent(span, options.body.tool_outputs);
}

export async function traceEndSubmitToolOutputsToRun(span: Span, _options: SubmitToolOutputsToRunParameters, result: Promise<ThreadRunOutput>): Promise<void> {
    const resolvedResult = await result;
    TracingUtility.updateSpanAttributes(span, { runId: resolvedResult.id, runStatus: resolvedResult.status, responseModel: resolvedResult.model, usageCompletionTokens: resolvedResult.usage?.completion_tokens, usagePromptTokens: resolvedResult.usage?.prompt_tokens });
}

function setSpanEvents(span: Span, options: CreateRunParameters): void {
    addInstructionsEvent(span, { ...options.body, agentId: options.body.assistant_id });
    options.body.additional_messages?.forEach((message) => {
        addMessageEvent(span, message);
    });
}

