// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  AgentsCreateMessageOptionalParams,
  AgentsListMessagesOptionalParams,
} from "../options.js";
import type { Span } from "./tracing.js";
import { TracingAttributes, TracingUtility, TracingOperationName } from "./tracing.js";
import type {
  OpenAIPageableListOfThreadMessage,
  ThreadMessage,
  MessageRole,
} from "../../models/agents/index.js";
import { addMessageEvent } from "./traceUtility.js";
// import type { ThreadMessageOutput } from "../customization/outputModels.js";

export function traceStartCreateMessage(
  span: Span,
  threadId: string,
  options: AgentsCreateMessageOptionalParams & { role: MessageRole; content: string },
): void {
  TracingUtility.setSpanAttributes(span, TracingOperationName.CREATE_MESSAGE, {
    threadId: threadId,
    genAiSystem: TracingAttributes.AZ_AI_AGENT_SYSTEM,
  });
  addMessageEvent(span, { ...options, threadId });
}

export async function traceEndCreateMessage(
  span: Span,
  _options: AgentsCreateMessageOptionalParams,
  result: Promise<ThreadMessage>,
): Promise<void> {
  const resolvedResult = await result;
  TracingUtility.updateSpanAttributes(span, { messageId: resolvedResult.id });
}

export function traceStartListMessages(
  span: Span,
  threadId: string,
  _options: AgentsListMessagesOptionalParams,
): void {
  TracingUtility.setSpanAttributes(span, TracingOperationName.LIST_MESSAGES, {
    threadId: threadId,
    genAiSystem: TracingAttributes.AZ_AI_AGENT_SYSTEM,
  });
}

export async function traceEndListMessages(
  span: Span,
  _options: AgentsListMessagesOptionalParams,
  result: Promise<OpenAIPageableListOfThreadMessage>,
): Promise<void> {
  const resolvedResult = await result;
  resolvedResult.data?.forEach((message) => {
    addMessageEvent(span, message);
  });
}
