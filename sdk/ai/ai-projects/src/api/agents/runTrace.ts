// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  AgentsCreateRunOptionalParams,
  AgentsCreateThreadAndRunOptionalParams,
  AgentsSubmitToolOutputsToRunOptionalParams,
  AgentsUpdateRunOptionalParams,
} from "../options.js";
import type { ThreadRun, ToolOutput } from "../../models/agents/index.js";
import type { TracingAttributeOptions, Span } from "./tracing.js";
import { TracingUtility, TracingOperationName } from "./tracing.js";
import {
  addInstructionsEvent,
  addMessageEvent,
  addToolMessagesEvent,
  formatAgentApiResponse,
  UpdateWithAgentAttributes,
} from "./traceUtility.js";

export function traceStartCreateRun(
  span: Span,
  options: AgentsCreateRunOptionalParams | AgentsCreateThreadAndRunOptionalParams,
  threadId?: string,
  assistantId?: string,
  operationName: string = TracingOperationName.CREATE_RUN,
): void {
  const attributes: TracingAttributeOptions = {
    threadId: threadId,
    agentId: assistantId,
    model: options.model ?? undefined,
    instructions: options.instructions ?? undefined,
    temperature: options.temperature ?? undefined,
    topP: options.topP ?? undefined,
    maxCompletionTokens: options.maxCompletionTokens ?? undefined,
    maxPromptTokens: options.maxPromptTokens ?? undefined,
    responseFormat: formatAgentApiResponse(options.responseFormat),
  };
  if ((options as AgentsCreateRunOptionalParams).additionalInstructions) {
    attributes.additional_instructions =
      (options as AgentsCreateRunOptionalParams).additionalInstructions ?? undefined;
  }
  TracingUtility.setSpanAttributes(span, operationName, UpdateWithAgentAttributes(attributes));
  setSpanEvents(span, { ...options, agentId: assistantId ?? "" });
}

export function traceStartCreateThreadAndRun(
  span: Span,
  options: AgentsCreateThreadAndRunOptionalParams,
): void {
  traceStartCreateRun(span, options, undefined, TracingOperationName.CREATE_THREAD_RUN);
}

export async function traceEndCreateOrUpdateRun(
  span: Span,
  _options: AgentsCreateRunOptionalParams | AgentsUpdateRunOptionalParams,
  result: Promise<ThreadRun>,
): Promise<void> {
  const resolvedResult = await result;
  updateSpanAttributesForRun(span, resolvedResult);
}

export function traceStartSubmitToolOutputsToRun(
  span: Span,
  options: AgentsSubmitToolOutputsToRunOptionalParams & { toolOutputs: ToolOutput[] },
  threadId: string,
  runId: string,
): void {
  const attributes: TracingAttributeOptions = { threadId: threadId, runId: runId };
  TracingUtility.setSpanAttributes(
    span,
    TracingOperationName.SUBMIT_TOOL_OUTPUTS,
    UpdateWithAgentAttributes(attributes),
  );
  addToolMessagesEvent(span, options.toolOutputs);
}

export async function traceEndSubmitToolOutputsToRun(
  span: Span,
  _options: AgentsSubmitToolOutputsToRunOptionalParams,
  result: Promise<ThreadRun>,
): Promise<void> {
  const resolvedResult = await result;
  updateSpanAttributesForRun(span, resolvedResult);
}

function updateSpanAttributesForRun(span: Span, output: ThreadRun): void {
  TracingUtility.updateSpanAttributes(span, {
    runId: output.id,
    runStatus: output.status,
    responseModel: output.model,
  });
  const usage = output.usage;
  if (usage?.completionTokens) {
    TracingUtility.updateSpanAttributes(span, {
      usageCompletionTokens: usage.completionTokens,
      usagePromptTokens: usage.promptTokens,
    });
  }
}

function setSpanEvents(span: Span, options: AgentsCreateRunOptionalParams & { agentId: string }): void {
  addInstructionsEvent(span, { ...options, agentId: options.agentId });
  options.additionalMessages?.forEach((message) => {
    addMessageEvent(span, message);
  });
}
