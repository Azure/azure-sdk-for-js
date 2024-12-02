// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { TracingSpan } from "@azure/core-tracing";
import { AgentsApiResponseFormat, AgentsApiResponseFormatOption, MessageContent, ThreadMessage, ThreadMessageOptions } from "./inputOutputs.js";
import { TracingAttributes, TracingUtility } from "../tracing.js";
import { getTelemetryOptions } from "../telemetry/telemetry.js";

/**
 * Adds a message event to the span.
 * @param span - The span to add the event to.
 * @param messageAttributes - The attributes of the message event.
 */
export function addMessageEvent(span: Omit<TracingSpan, "end">, messageAttributes: ThreadMessageOptions | ThreadMessage,): void {

    const eventBody: Record<string, unknown> = {};
    const telemetryOptions = getTelemetryOptions()
    if (telemetryOptions.enableContentRecording) {
        eventBody.content = getMessageContent(messageAttributes.content);
    }
    eventBody.role = messageAttributes.role;
    if (messageAttributes.attachments) {
        eventBody.attachments = messageAttributes.attachments.map((attachment) => {
            return {
                id: attachment.file_id,
                tools: attachment.tools.map((tool) => tool.type)
            };
        });
    }
    const threadId = (messageAttributes as ThreadMessage).thread_id;
    const agentId = (messageAttributes as ThreadMessage).assistant_id;
    const threadRunId = (messageAttributes as ThreadMessage).run_id;
    const messageStatus = (messageAttributes as ThreadMessage).status;
    const attributes = { eventContent: JSON.stringify(eventBody), threadId, agentId, threadRunId, messageStatus, genAiSystem: TracingAttributes.AZ_AI_AGENT_SYSTEM };
    TracingUtility.addSpanEvent(span, `gen_ai.${messageAttributes.role}.message`, attributes);
}

/**
 * Adds an instruction event to the span.
 * @param span - The span to add the event to.
 * @param instructionAttributes - The attributes of the instruction event.
 */
export function addInstructionsEvent(span: Omit<TracingSpan, "end">, instructionAttributes: { instructions?: string | null, additional_instructions?: string | null, threadId?: string, agentId?: string }): void {
    const eventBody: Record<string, unknown> = {};
    eventBody.content = instructionAttributes.instructions && instructionAttributes.additional_instructions ? `${instructionAttributes.instructions} ${instructionAttributes.additional_instructions}` : instructionAttributes.instructions || instructionAttributes.additional_instructions;
    const attributes = { eventContent: JSON.stringify(eventBody), threadId: instructionAttributes.threadId, agentId: instructionAttributes.agentId, genAiSystem: TracingAttributes.AZ_AI_AGENT_SYSTEM };
    TracingUtility.addSpanEvent(span, "gen_ai.system.message", attributes);
}

/**
 * Formats the agent API response.
 * @param responseFormat - The response format option.
 * @returns The formatted response as a string, or null/undefined.
 */
export function formatAgentApiResponse(responseFormat: AgentsApiResponseFormatOption | null | undefined): string | null | undefined {
    if (typeof responseFormat === "string" || responseFormat === undefined || responseFormat === null) {
        return responseFormat;
    }
    if ((responseFormat as AgentsApiResponseFormat).type) {
        return (responseFormat as AgentsApiResponseFormat).type;
    }
    return undefined;
}


function getMessageContent(messageContent: string | MessageContent[]): string | {} {
    type MessageContentExtended = MessageContent & { [key: string]: any; };
    if (!Array.isArray(messageContent)) {
        return messageContent;
    }
    const contentBody: { [key: string]: any } = {};
    messageContent.forEach(content => {
        const typedContent = content.type;
        const contentDetails: { value: any, annotations?: string[] } = { value: (content as MessageContentExtended)[typedContent] };
        const annotations = contentDetails.value.annotations;
        if (annotations) {
            contentDetails.annotations = annotations;
        }
        contentBody[typedContent] = contentDetails;
    });
    return contentBody;
}
