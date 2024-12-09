// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CreateMessageParameters, ListMessagesParameters } from "../generated/src/parameters.js";
import { TracingAttributes, TracingUtility, TracingOperationName, Span } from "../tracing.js";
import { OpenAIPageableListOfThreadMessageOutput, ThreadMessageOutput } from "../generated/src/outputModels.js";
import { addMessageEvent } from "./traceUtility.js";

export function traceStartCreateMessage(span: Span, threadId: string, options: CreateMessageParameters): void {
    TracingUtility.setSpanAttributes(span, TracingOperationName.CREATE_MESSAGE, { threadId: threadId, genAiSystem: TracingAttributes.AZ_AI_AGENT_SYSTEM });
    addMessageEvent(span, { ...options.body, thread_id: threadId });
}

export async function traceEndCreateMessage(span: Span, _options: CreateMessageParameters, result: Promise<ThreadMessageOutput>): Promise<void> {
    const resolvedResult = await result;
    TracingUtility.updateSpanAttributes(span, { messageId: resolvedResult.id });
}

export function traceStartListMessages(span: Span, threadId: string, _options: ListMessagesParameters) : void {
    TracingUtility.setSpanAttributes(span, TracingOperationName.LIST_MESSAGES, { threadId: threadId, genAiSystem: TracingAttributes.AZ_AI_AGENT_SYSTEM });
}

export async function traceEndListMessages(span: Span, _options: ListMessagesParameters, result: Promise<OpenAIPageableListOfThreadMessageOutput>) : Promise<void> {
    const resolvedResult = await result;
    resolvedResult.data?.forEach(message => {
        addMessageEvent(span, message)
    });
}
