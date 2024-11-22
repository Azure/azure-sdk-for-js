// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { createTracingClient, TracingSpan } from "@azure/core-tracing";

export const tracingClient = createTracingClient({
    namespace: "Microsoft.CognitiveServices",
    packageName: "@azure/ai-projects",
    packageVersion: "1.0.0-beta.1",
});

export enum TracingAttributes {
    GEN_AI_MESSAGE_ID = "gen_ai.message.id",
    GEN_AI_MESSAGE_STATUS = "gen_ai.message.status",
    GEN_AI_THREAD_ID = "gen_ai.thread.id",
    GEN_AI_THREAD_RUN_ID = "gen_ai.thread.run.id",
    GEN_AI_AGENT_ID = "gen_ai.agent.id",
    GEN_AI_AGENT_NAME = "gen_ai.agent.name",
    GEN_AI_AGENT_DESCRIPTION = "gen_ai.agent.description",
    GEN_AI_OPERATION_NAME = "gen_ai.operation.name",
    GEN_AI_THREAD_RUN_STATUS = "gen_ai.thread.run.status",
    GEN_AI_REQUEST_MODEL = "gen_ai.request.model",
    GEN_AI_REQUEST_TEMPERATURE = "gen_ai.request.temperature",
    GEN_AI_REQUEST_TOP_P = "gen_ai.request.top_p",
    GEN_AI_REQUEST_MAX_INPUT_TOKENS = "gen_ai.request.max_input_tokens",
    GEN_AI_REQUEST_MAX_OUTPUT_TOKENS = "gen_ai.request.max_output_tokens",
    GEN_AI_RESPONSE_MODEL = "gen_ai.response.model",
    GEN_AI_SYSTEM = "gen_ai.system",
    SERVER_ADDRESS = "server.address",
    AZ_AI_AGENT_SYSTEM = "az.ai.agents",
    GEN_AI_TOOL_NAME = "gen_ai.tool.name",
    GEN_AI_TOOL_CALL_ID = "gen_ai.tool.call.id",
    GEN_AI_REQUEST_RESPONSE_FORMAT = "gen_ai.request.response_format",
    GEN_AI_USAGE_INPUT_TOKENS = "gen_ai.usage.input_tokens",
    GEN_AI_USAGE_OUTPUT_TOKENS = "gen_ai.usage.output_tokens",
    GEN_AI_SYSTEM_MESSAGE = "gen_ai.system.message",
    GEN_AI_EVENT_CONTENT = "gen_ai.event.content",
    ERROR_TYPE = "error.type"
}
export enum TrackingOperationName {
    CREATE_AGENT = "create_agent",
    CREATE_THREAD = "create_thread",
    CREATE_MESSAGE = "create_message",
    START_THREAD_RUN = "start_thread_run",
    EXECUTE_TOOL = "execute_tool",
    LIST_MESSAGES = "list_messages",
    SUBMIT_TOOL_OUTPUTS = "submit_tool_outputs",
    PROCESS_THREAD_RUN = "process_thread_run",
}

export interface TracingAttributeOptions {
    operationName: string;
    name?: string | null;
    description?: string | null;
    serverAddress?: string | null;
    threadId?: string | null;
    agentId?: string | null;
    instructions?: string | null;
    additional_instructions?: string | null;
    runId?: string | null;
    model?: string | null;
    temperature?: number | null;
    topP?: number | null;
    maxPromptTokens?: number | null;
    maxCompletionTokens?: number | null;
    responseFormat?: string | null;
    genAiSystem?: string | null;
}

export function setSpanAttributes(
    span: Omit<TracingSpan, "end">,
    attributeOptions: TracingAttributeOptions
): void {
    if (span) {
        const {
            operationName,
            name,
            description,
            serverAddress,
            threadId,
            agentId,
            runId,
            model,
            temperature,
            topP,
            maxPromptTokens,
            maxCompletionTokens,
            responseFormat,
            genAiSystem = "AZ_AI_AGENT_SYSTEM"
        } = attributeOptions;

        if (genAiSystem) {
            span.setAttribute(TracingAttributes.GEN_AI_SYSTEM, genAiSystem);
        }

        span.setAttribute(TracingAttributes.GEN_AI_OPERATION_NAME, operationName);

        if (name) {
            span.setAttribute(TracingAttributes.GEN_AI_AGENT_NAME, name);
        }
        if (description) {
            span.setAttribute(TracingAttributes.GEN_AI_AGENT_DESCRIPTION, description);
        }

        if (serverAddress) {
            span.setAttribute(TracingAttributes.SERVER_ADDRESS, serverAddress);
        }

        if (threadId) {
            span.setAttribute(TracingAttributes.GEN_AI_THREAD_ID, threadId);
        }

        if (agentId) {
            span.setAttribute(TracingAttributes.GEN_AI_AGENT_ID, agentId);
        }

        if (runId) {
            span.setAttribute(TracingAttributes.GEN_AI_THREAD_RUN_ID, runId);
        }

        if (model) {
            span.setAttribute(TracingAttributes.GEN_AI_REQUEST_MODEL, model);
        }

        if (temperature !== null) {
            span.setAttribute(TracingAttributes.GEN_AI_REQUEST_TEMPERATURE, temperature);
        }

        if (topP !== null) {
            span.setAttribute(TracingAttributes.GEN_AI_REQUEST_TOP_P, topP);
        }

        if (maxPromptTokens !== null) {
            span.setAttribute(TracingAttributes.GEN_AI_REQUEST_MAX_INPUT_TOKENS, maxPromptTokens);
        }

        if (maxCompletionTokens !== null) {
            span.setAttribute(TracingAttributes.GEN_AI_REQUEST_MAX_OUTPUT_TOKENS, maxCompletionTokens);
        }

        if (responseFormat) {
            span.setAttribute(TracingAttributes.GEN_AI_REQUEST_RESPONSE_FORMAT, responseFormat);
        }
    }
    return;
}
