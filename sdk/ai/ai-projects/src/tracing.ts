// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { createTracingClient, OperationTracingOptions, Resolved, TracingSpan } from "@azure/core-tracing";

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
    CREATE_RUN = "create_run",
    START_THREAD_RUN = "start_thread_run",
    EXECUTE_TOOL = "execute_tool",
    LIST_MESSAGES = "list_messages",
    SUBMIT_TOOL_OUTPUTS = "submit_tool_outputs",
    CREATE_THREAD_RUN = "create_thread_run",
}

export interface TracingAttributeOptions {
    operationName?: string;
    name?: string | null;
    description?: string | null;
    serverAddress?: string | null;
    threadId?: string | null;
    agentId?: string | null;
    instructions?: string | null;
    additional_instructions?: string | null;
    runId?: string | null;
    runStatus?: string | null;
    responseModel?: string | null;
    model?: string | null;
    temperature?: number | null;
    topP?: number | null;
    maxPromptTokens?: number | null;
    maxCompletionTokens?: number | null;
    responseFormat?: string | null;
    genAiSystem?: string | null;
    messageId?: string | null;
    messageStatus?: string | null;
    eventContent?: string | null;
    usagePromptTokens?: number | null;
    usageCompletionTokens?: number | null;
}

export class TracingUtility {
    private static tracingClient = createTracingClient({
        namespace: "Microsoft.CognitiveServices",
        packageName: "@azure/ai-projects",
        packageVersion: "1.0.0-beta.1",

    });

    static async withSpan<Options extends { tracingOptions?: OperationTracingOptions },
        Request extends (updatedOptions: Options) => ReturnType<Request>>(name: string, options: Options, request: Request,
            startTrace?: (span: Omit<TracingSpan, "end">, updatedOptions: Options,) => void,
            endTrace?: (span: Omit<TracingSpan, "end">, updatedOptions: Options, result: ReturnType<Request>) => void,
        ): Promise<Resolved<ReturnType<Request>>> {
        return TracingUtility.tracingClient.withSpan(name, options, async (updatedOptions: Options, span: Omit<TracingSpan, "end">) => {
            if (startTrace) {
                startTrace(span, updatedOptions);
            }
            const result = request(updatedOptions);
            if (endTrace) {
                endTrace(span, updatedOptions, result);
            }
            return result;
        }, { spanKind: "client" });
    }

    static updateSpanAttributes(span: Omit<TracingSpan, "end">, attributeOptions: Omit<TracingAttributeOptions, "operationName">): void {
        TracingUtility.setAttributes(span, attributeOptions);
    }
    
    static setSpanAttributes(
        span: Omit<TracingSpan, "end">,
        operationName: string,
        attributeOptions: TracingAttributeOptions
    ): void {
        attributeOptions.operationName = operationName;
        TracingUtility.setAttributes(span, attributeOptions);
    }
    
    static setAttributes(
        span: Omit<TracingSpan, "end">,
        attributeOptions: TracingAttributeOptions
    ): void {
        if (span.isRecording()) {
            const {
                name,
                operationName,
                description,
                serverAddress,
                threadId,
                agentId,
                messageId,
                runId,
                model,
                temperature,
                topP,
                maxPromptTokens,
                maxCompletionTokens,
                responseFormat,
                runStatus,
                responseModel,
                usageCompletionTokens,
                usagePromptTokens,
                genAiSystem = TracingAttributes.AZ_AI_AGENT_SYSTEM
            } = attributeOptions;
    
            if (genAiSystem) {
                span.setAttribute(TracingAttributes.GEN_AI_SYSTEM, genAiSystem);
            }
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
    
            if (messageId) {
                span.setAttribute(TracingAttributes.GEN_AI_MESSAGE_ID, messageId);
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
    
            if (runStatus) {
                span.setAttribute(TracingAttributes.GEN_AI_THREAD_RUN_STATUS, runStatus);
            }
    
            if (responseModel) {
                span.setAttribute(TracingAttributes.GEN_AI_RESPONSE_MODEL, responseModel);
            }
    
            if (usagePromptTokens) {
                span.setAttribute(TracingAttributes.GEN_AI_USAGE_INPUT_TOKENS, usagePromptTokens);
            }
    
            if (usageCompletionTokens) {
                span.setAttribute(TracingAttributes.GEN_AI_USAGE_OUTPUT_TOKENS, usageCompletionTokens);
            }
            if(operationName) {
                span.setAttribute(TracingAttributes.GEN_AI_OPERATION_NAME, operationName);
            }
        }
        return;
    }
    
    static addSpanEvent(
        span: Omit<TracingSpan, "end">,
        eventName: string,
        attributeOptions: Omit<TracingAttributeOptions, "operationName">
    ): void {
        if (span.isRecording()) {
            const { threadId, agentId, runId, messageId, eventContent, usageCompletionTokens, usagePromptTokens, messageStatus } = attributeOptions;
            const attributes: Record<string, unknown> = {};
    
            if (eventContent) {
                attributes[TracingAttributes.GEN_AI_EVENT_CONTENT] = eventContent;
            }
    
            if (threadId) {
                attributes[TracingAttributes.GEN_AI_THREAD_ID] = threadId;
            }
    
            if (agentId) {
                attributes[TracingAttributes.GEN_AI_AGENT_ID] = agentId;
            }
    
            if (runId) {
                attributes[TracingAttributes.GEN_AI_THREAD_RUN_ID] = runId;
            }
    
            if (messageId) {
                attributes[TracingAttributes.GEN_AI_MESSAGE_ID] = messageId;
            }
            if (messageStatus) {
                attributes[TracingAttributes.GEN_AI_MESSAGE_STATUS] = messageStatus;
            }
    
            if (usagePromptTokens) {
                attributes[TracingAttributes.GEN_AI_USAGE_INPUT_TOKENS] = usagePromptTokens;
            }
    
            if (usageCompletionTokens) {
                attributes[TracingAttributes.GEN_AI_USAGE_OUTPUT_TOKENS] = usageCompletionTokens;
            }
    
            if (span.addEvent) {
                span.addEvent(eventName, { attributes });
            }
        }
        return;
    }
    
}



