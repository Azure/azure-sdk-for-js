// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { TracingSpan } from "@azure/core-tracing";
import { CreateMessageParameters, ListMessagesParameters } from "../generated/src/parameters.js";
import { TracingAttributes, TracingUtility, TrackingOperationName } from "../tracing.js";
import { OpenAIPageableListOfThreadMessageOutput, ThreadMessageOutput } from "../generated/src/outputModels.js";
import { addMessageEvent } from "./traceUtility.js";

export function traceStartCreateMessage(span: Omit<TracingSpan, "end">, threadId: string, options: CreateMessageParameters): void {
    TracingUtility.setSpanAttributes(span, TrackingOperationName.CREATE_MESSAGE, { threadId: threadId, genAiSystem: TracingAttributes.AZ_AI_AGENT_SYSTEM });
    addMessageEvent(span, { ...options.body, thread_id: threadId });
}

export async function traceEndCreateMessage(span: Omit<TracingSpan, "end">, _options: CreateMessageParameters, result: Promise<ThreadMessageOutput>): Promise<void> {
    const resolvedResult = await result;
    TracingUtility.updateSpanAttributes(span, { messageId: resolvedResult.id });
}

export function traceStartListMessages(span: Omit<TracingSpan, "end">, threadId: string, _options: ListMessagesParameters) : void {
    TracingUtility.setSpanAttributes(span, TrackingOperationName.LIST_MESSAGES, { threadId: threadId, genAiSystem: TracingAttributes.AZ_AI_AGENT_SYSTEM });
}

export async function traceEndListMessages(span: Omit<TracingSpan, "end">, _options: ListMessagesParameters, result: Promise<OpenAIPageableListOfThreadMessageOutput>) : Promise<void> {
    const resolvedResult = await result;
    resolvedResult.data?.forEach(message => {
        addMessageEvent(span, message)
    });
}
