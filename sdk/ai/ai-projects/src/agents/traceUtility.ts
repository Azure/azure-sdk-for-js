// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  AgentsApiResponseFormat,
  AgentsApiResponseFormatOption,
  ThreadMessageOptions,
  ToolOutput,
} from "../generated/src/models.js";
import type {
  MessageContentOutput,
  RunStepCompletionUsageOutput,
  ThreadMessageOutput,
} from "../generated/src/outputModels.js";
import type { OptionsWithTracing, Span, TracingAttributeOptions } from "../tracing.js";
import { TracingAttributes, TracingUtility } from "../tracing.js";
import { getTelemetryOptions } from "../telemetry/telemetry.js";

export function traceStartAgentGeneric<Options extends OptionsWithTracing>(
  span: Span,
  options: Options,
): void {
  const attributeOptions = options.tracingAttributeOptions || {};
  TracingUtility.setSpanAttributes(
    span,
    options.tracingAttributeOptions?.operationName || "Agent_Operation",
    UpdateWithAgentAttributes(attributeOptions),
  );
}
export function traceEndAgentGeneric<Options extends OptionsWithTracing>(
  span: Span,
  _options: Options,
): void {
  const attributeOptions = {};
  TracingUtility.updateSpanAttributes(span, UpdateWithAgentAttributes(attributeOptions));
}

export function UpdateWithAgentAttributes(
  attributeOptions: Omit<TracingAttributeOptions, "operationName">,
): Omit<TracingAttributeOptions, "operationName"> {
  attributeOptions.genAiSystem = TracingAttributes.AZ_AI_AGENT_SYSTEM;
  return attributeOptions;
}

/**
 * Adds a message event to the span.
 * @param span - The span to add the event to.
 * @param messageAttributes - The attributes of the message event.
 */
export function addMessageEvent(
  span: Span,
  messageAttributes: ThreadMessageOptions | ThreadMessageOutput,
  usage?: RunStepCompletionUsageOutput,
): void {
  const eventBody: Record<string, unknown> = {};
  const telemetryOptions = getTelemetryOptions();
  if (telemetryOptions.enableContentRecording) {
    eventBody.content = getMessageContent(messageAttributes.content);
  }
  eventBody.role = messageAttributes.role;
  if (messageAttributes.attachments) {
    eventBody.attachments = messageAttributes.attachments.map((attachment) => {
      return {
        id: attachment.file_id,
        tools: attachment.tools.map((tool) => tool.type),
      };
    });
  }
  const threadId = (messageAttributes as ThreadMessageOutput).thread_id;
  const agentId = (messageAttributes as ThreadMessageOutput).assistant_id ?? undefined;
  const threadRunId = (messageAttributes as ThreadMessageOutput).run_id;
  const messageStatus = (messageAttributes as ThreadMessageOutput).status;
  const messageId = (messageAttributes as ThreadMessageOutput).id;
  const incompleteDetails = (messageAttributes as ThreadMessageOutput).incomplete_details;
  if (incompleteDetails) {
    eventBody.incomplete_details = incompleteDetails;
  }
  const usagePromptTokens = usage?.prompt_tokens;
  const usageCompletionTokens = usage?.completion_tokens;
  const attributes = {
    eventContent: JSON.stringify(eventBody),
    threadId,
    agentId,
    threadRunId,
    messageStatus,
    messageId,
    usagePromptTokens,
    usageCompletionTokens,
    genAiSystem: TracingAttributes.AZ_AI_AGENT_SYSTEM,
  };

  TracingUtility.addSpanEvent(span, `gen_ai.${messageAttributes.role}.message`, attributes);
}

/**
 * Adds an instruction event to the span.
 * @param span - The span to add the event to.
 * @param instructionAttributes - The attributes of the instruction event.
 */
export function addInstructionsEvent(
  span: Span,
  instructionAttributes: {
    instructions?: string | null;
    additional_instructions?: string | null;
    threadId?: string;
    agentId?: string;
  },
): void {
  const eventBody: Record<string, unknown> = {};
  if (instructionAttributes.instructions || instructionAttributes.additional_instructions) {
    eventBody.content =
      instructionAttributes.instructions && instructionAttributes.additional_instructions
        ? `${instructionAttributes.instructions} ${instructionAttributes.additional_instructions}`
        : instructionAttributes.instructions || instructionAttributes.additional_instructions;
  }
  const attributes = {
    eventContent: JSON.stringify(eventBody),
    threadId: instructionAttributes.threadId,
    agentId: instructionAttributes.agentId,
    genAiSystem: TracingAttributes.AZ_AI_AGENT_SYSTEM,
  };
  TracingUtility.addSpanEvent(span, "gen_ai.system.message", attributes);
}

/**
 * Formats the agent API response.
 * @param responseFormat - The response format option.
 * @returns The formatted response as a string, or null/undefined.
 */
export function formatAgentApiResponse(
  responseFormat: AgentsApiResponseFormatOption | null | undefined,
): string | undefined {
  if (
    typeof responseFormat === "string" ||
    responseFormat === undefined ||
    responseFormat === null
  ) {
    return responseFormat ?? undefined;
  }
  if ((responseFormat as AgentsApiResponseFormat).type) {
    return (responseFormat as AgentsApiResponseFormat).type ?? undefined;
  }
  return undefined;
}

/**
 * Adds a tool messages event to the span
 * @param span - The span to add the event to.
 * @param tool_outputs - List of tool oupts
 */
export function addToolMessagesEvent(span: Span, tool_outputs: Array<ToolOutput>): void {
  tool_outputs.forEach((tool_output) => {
    const eventBody = { content: tool_output.output, id: tool_output.tool_call_id };
    TracingUtility.addSpanEvent(span, "gen_ai.tool.message", {
      eventContent: JSON.stringify(eventBody),
      genAiSystem: TracingAttributes.AZ_AI_AGENT_SYSTEM,
    });
  });
}

function getMessageContent(messageContent: string | MessageContentOutput[]): string | {} {
  type MessageContentExtended = MessageContentOutput & { [key: string]: any };
  if (!Array.isArray(messageContent)) {
    return messageContent;
  }
  const contentBody: { [key: string]: any } = {};
  messageContent.forEach((content) => {
    const typedContent = content.type;
    const { value, annotations } = (content as MessageContentExtended)[typedContent];
    contentBody[typedContent] = { value, annotations };
  });
  return contentBody;
}
