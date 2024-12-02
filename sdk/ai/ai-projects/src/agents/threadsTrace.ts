// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { TracingSpan } from "@azure/core-tracing";
import { AgentThreadOutput } from "../generated/src/outputModels.js";
import { TracingAttributes, TracingUtility, TrackingOperationName } from "../tracing.js";
import { CreateThreadParameters } from "../generated/src/parameters.js";
import { addMessageEvent } from "./traceUtility.js";

export function traceStartCreateThread(span: Omit<TracingSpan, "end">, options: CreateThreadParameters): void {
    TracingUtility.setSpanAttributes(span, TrackingOperationName.CREATE_THREAD, { genAiSystem: TracingAttributes.AZ_AI_AGENT_SYSTEM });
    setSpanEvents(span, options);
}

export async function traceEndCreateThread(span: Omit<TracingSpan, "end">, _options: CreateThreadParameters, result: Promise<AgentThreadOutput>): Promise<void> {
    const resolvedResult = await result;
    TracingUtility.updateSpanAttributes(span, { threadId: resolvedResult.id });
}

function setSpanEvents(span: Omit<TracingSpan, "end">, options: CreateThreadParameters): void {
    options.body.messages?.forEach((message) => {
        addMessageEvent(span, message);
    });
}
