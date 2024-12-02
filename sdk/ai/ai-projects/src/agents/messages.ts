// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Client, createRestError } from "@azure-rest/core-client";
import { OpenAIPageableListOfThreadMessageOutput, ThreadMessageOutput } from "../generated/src/outputModels.js";
import { CreateMessageParameters, ListMessagesParameters, UpdateMessageParameters } from "../generated/src/parameters.js";
import { TracingUtility } from "../tracing.js";
import { traceEndCreateMessage, traceStartCreateMessage } from "./messagesTrace.js";

const expectedStatuses = ["200"];

/** Creates a new message on a specified thread. */
export async function createMessage(
  context: Client,
  threadId: string,
  options: CreateMessageParameters,
): Promise<ThreadMessageOutput> {
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
  options?: ListMessagesParameters,
): Promise<OpenAIPageableListOfThreadMessageOutput> {
  const result = await context
    .path("/threads/{threadId}/messages", threadId)
    .get(options);
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }
  return result.body;
}

/** Modifies an existing message on an existing thread. */
export async function updateMessage(
  context: Client,
  threadId: string,
  messageId: string,
  options?: UpdateMessageParameters,
): Promise<ThreadMessageOutput> {
  const result = await context
    .path("/threads/{threadId}/messages/{messageId}", threadId, messageId)
    .post(options);
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }
  return result.body;
}
