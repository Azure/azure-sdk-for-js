// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type OpenAI from "openai";
import { isGenAITracingApplied } from "./tracing/configuration.js";
import { OperationName } from "./tracing/constants.js";
import { traceNonStreamingResponse, traceStreamingResponse, traceConversationCreate } from "./tracing/responseTracing.js";

export function overwriteOpenAIClient(openaiClient: OpenAI, endpoint: string): OpenAI {
  const responsesCreate = openaiClient.responses.create.bind(openaiClient.responses);
  openaiClient.responses.create = ((...args: Parameters<typeof responsesCreate>) => {
    const [body, options = {}] = args;
    const nextBody = { ...(body as Record<string, unknown>), ...(((options as Record<string, unknown>).body as Record<string, unknown>) || {}) } as Record<string, unknown>;
    const { body: _, ...nextOptions } = options as Record<string, unknown>;

    if (!isGenAITracingApplied()) {
      return responsesCreate(nextBody, nextOptions);
    }

    // Determine operation and span name (matching C# pattern)
    const rawAgent = (nextBody as Record<string, unknown>).agent_name ??
      (nextBody as Record<string, unknown>).agent ??
      (nextBody as Record<string, unknown>).agent_reference;
    // agent can be a string name or an object like { name: "...", type: "agent_reference" }
    const agentName: string | undefined =
      typeof rawAgent === "string"
        ? rawAgent
        : rawAgent && typeof rawAgent === "object" && typeof (rawAgent as Record<string, unknown>).name === "string"
          ? (rawAgent as Record<string, unknown>).name as string
          : undefined;
    let operationName: string;
    let spanName: string;
    if (agentName) {
      operationName = OperationName.INVOKE_AGENT;
      spanName = `${OperationName.INVOKE_AGENT} ${agentName}`;
    } else {
      operationName = OperationName.CHAT;
      const model = nextBody.model;
      spanName = model ? `${OperationName.CHAT} ${model}` : OperationName.CHAT;
    }

    const isStreaming = nextBody.stream === true;

    if (isStreaming) {
      return traceStreamingResponse(
        responsesCreate as (...args: unknown[]) => unknown,
        nextBody,
        nextOptions,
        spanName,
        operationName,
        endpoint,
        agentName,
      );
    }
    return traceNonStreamingResponse(
      responsesCreate as (...args: unknown[]) => unknown,
      nextBody,
      nextOptions,
      spanName,
      operationName,
      endpoint,
      agentName,
    );
  }) as typeof responsesCreate;

  // Wrap conversations.create for tracing
  if (openaiClient.conversations?.create) {
    const conversationsCreate = openaiClient.conversations.create.bind(openaiClient.conversations);
    openaiClient.conversations.create = ((...args: unknown[]) => {
      if (!isGenAITracingApplied()) {
        return (conversationsCreate as (...a: unknown[]) => unknown)(...args);
      }
      return traceConversationCreate(
        conversationsCreate as (...a: unknown[]) => unknown,
        args,
        endpoint,
      );
    }) as typeof conversationsCreate;
  }

  return openaiClient;
}
