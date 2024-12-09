// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Client, createRestError } from "@azure-rest/core-client";
import { OpenAIPageableListOfThreadMessageOutput, ThreadMessageOutput } from "../generated/src/outputModels.js";
import { CreateMessageParameters, ListMessagesParameters, UpdateMessageParameters } from "../generated/src/parameters.js";
import { validateMetadata, validateVectorStoreDataType } from "./inputValidations.js";
import { TracingUtility } from "../tracing.js";
import { traceEndCreateMessage, traceEndListMessages, traceStartCreateMessage, traceStartListMessages } from "./messagesTrace.js";
import { traceStartAgentGeneric } from "./traceUtility.js";

const expectedStatuses = ["200"];

/** Creates a new message on a specified thread. */
export async function createMessage(
  context: Client,
  threadId: string,
  options: CreateMessageParameters,
): Promise<ThreadMessageOutput> {
  validateThreadId(threadId);
  validateCreateMessageParameters(options);
  return TracingUtility.withSpan("CreateMessage", options, async (updateOptions) => {
    const result = await context
      .path("/threads/{threadId}/messages", threadId)
      .post(updateOptions);
    if (!expectedStatuses.includes(result.status)) {
      throw createRestError(result);
    }
    return result.body;
  }, (span, updatedOptions) => traceStartCreateMessage(span, threadId, updatedOptions), traceEndCreateMessage);
}

/** Gets a list of messages that exist on a thread. */
export async function listMessages(
  context: Client,
  threadId: string,
  options: ListMessagesParameters = {},
): Promise<OpenAIPageableListOfThreadMessageOutput> {
  validateThreadId(threadId);
  validateListMessagesParameters(options);
  return TracingUtility.withSpan("ListMessages", options, async (updateOptions) => {
    const result = await context
      .path("/threads/{threadId}/messages", threadId)
      .get(updateOptions);
    if (!expectedStatuses.includes(result.status)) {
      throw createRestError(result);
    }
    return result.body;
  }, (span, updatedOptions) => traceStartListMessages(span, threadId, updatedOptions), traceEndListMessages);
}

/** Modifies an existing message on an existing thread. */
export async function updateMessage(
  context: Client,
  threadId: string,
  messageId: string,
  options: UpdateMessageParameters = { body: {} },
): Promise<ThreadMessageOutput> {
  validateThreadId(threadId);
  validateMessageId(messageId);
  return TracingUtility.withSpan("UpdateMessage", options, async (updateOptions) => {
    const result = await context
      .path("/threads/{threadId}/messages/{messageId}", threadId, messageId)
      .post(updateOptions);
    if (!expectedStatuses.includes(result.status)) {
      throw createRestError(result);
    }
    return result.body;
  }, (span, updatedOptions) => traceStartAgentGeneric(span, { ...updatedOptions, tracingAttributeOptions: { threadId: threadId, messageId: messageId } }));
}

function validateThreadId(threadId: string): void {
  if (!threadId) {
    throw new Error("Thread ID is required");
  }
}

function validateMessageId(messageId: string): void {
  if (!messageId) {
    throw new Error("Message ID is required");
  }
}

function validateCreateMessageParameters(options: CreateMessageParameters): void {
  if (options.body.role && !["user", "assistant"].includes(options.body.role)) {
    throw new Error("Role must be either 'user' or 'assistant'");
  }
  if (options.body.metadata) {
    validateMetadata(options.body.metadata);
  }
  if (options.body.attachments) {
    if (options.body.attachments.some(value => {
      value.tools.some(tool => !["code_interpreter", "file_search"].includes(tool.type));
    })) {
      throw new Error("Tool type must be either 'code_interpreter' or 'file_search'");
    }
    if (options.body.attachments) {
      options.body.attachments.forEach(value => {
        if (value.data_sources) {
          validateVectorStoreDataType(value.data_sources);
        }
      })
    }
  }
}

function validateListMessagesParameters(options?: ListMessagesParameters): void {
  if (options?.queryParameters?.limit && (options.queryParameters.limit < 1 || options.queryParameters.limit > 100)) {
    throw new Error("Limit must be between 1 and 100");
  }
  if (options?.queryParameters?.order && !["asc", "desc"].includes(options.queryParameters.order)) {
    throw new Error("Order must be either 'asc' or 'desc'");
  }
}
