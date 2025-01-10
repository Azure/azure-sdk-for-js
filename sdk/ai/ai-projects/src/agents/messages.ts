// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Client } from "@azure-rest/core-client";
import { operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type {
  OpenAIPageableListOfThreadMessageOutput,
  ThreadMessageOutput,
} from "../customization/outputModels.js";
import type {
  CreateMessageParameters,
  ListMessagesParameters,
} from "../generated/src/parameters.js";
import { validateMetadata, validateVectorStoreDataType } from "./inputValidations.js";
import { TracingUtility } from "../tracing.js";
import {
  traceEndCreateMessage,
  traceEndListMessages,
  traceStartCreateMessage,
  traceStartListMessages,
} from "./messagesTrace.js";
import { traceStartAgentGeneric } from "./traceUtility.js";
import type { ThreadMessageOptions } from "../customization/models.js";
import type {
  CreateMessageOptionalParams,
  ListMessagesOptionalParams,
  UpdateMessageOptionalParams,
} from "./customModels.js";
import type * as GeneratedParameters from "../generated/src/parameters.js";
import * as ConvertFromWire from "../customization/convertOutputModelsFromWire.js";
import { createOpenAIError } from "./openAIError.js";

const expectedStatuses = ["200"];

/** Creates a new message on a specified thread. */
export async function createMessage(
  context: Client,
  threadId: string,
  messageOptions: ThreadMessageOptions,
  options: CreateMessageOptionalParams = {},
): Promise<ThreadMessageOutput> {
  const createOptions: GeneratedParameters.CreateMessageParameters = {
    ...operationOptionsToRequestParameters(options),
    body: {
      ...messageOptions,
    },
  };

  validateThreadId(threadId);
  validateCreateMessageParameters(createOptions);
  const response = await TracingUtility.withSpan(
    "CreateMessage",
    createOptions,
    async (updateOptions) => {
      const result = await context
        .path("/threads/{threadId}/messages", threadId)
        .post(updateOptions);
      if (!expectedStatuses.includes(result.status)) {
        throw createOpenAIError(result);
      }
      return result.body;
    },
    (span, updatedOptions) => traceStartCreateMessage(span, threadId, updatedOptions),
    traceEndCreateMessage,
  );
  return ConvertFromWire.convertThreadMessageOutput(response);
}

/** Gets a list of messages that exist on a thread. */
export async function listMessages(
  context: Client,
  threadId: string,
  options: ListMessagesOptionalParams = {},
): Promise<OpenAIPageableListOfThreadMessageOutput> {
  const listOptions: GeneratedParameters.ListMessagesParameters = {
    ...operationOptionsToRequestParameters(options),
    queryParameters: {
      ...(options.runId && { run_id: options.runId }),
      ...(options.limit && { run_id: options.limit }),
      ...(options.order && { run_id: options.order }),
      ...(options.after && { run_id: options.after }),
      ...(options.before && { run_id: options.before }),
    },
  };

  validateThreadId(threadId);
  validateListMessagesParameters(listOptions);
  const output = await TracingUtility.withSpan(
    "ListMessages",
    listOptions,
    async (updateOptions) => {
      const result = await context
        .path("/threads/{threadId}/messages", threadId)
        .get(updateOptions);
      if (!expectedStatuses.includes(result.status)) {
        throw createOpenAIError(result);
      }
      return result.body;
    },
    (span, updatedOptions) => traceStartListMessages(span, threadId, updatedOptions),
    traceEndListMessages,
  );

  return ConvertFromWire.convertOpenAIPageableListOfThreadMessageOutput(output);
}

/** Modifies an existing message on an existing thread. */
export async function updateMessage(
  context: Client,
  threadId: string,
  messageId: string,
  options: UpdateMessageOptionalParams = {},
): Promise<ThreadMessageOutput> {
  const updateMessageOptions: GeneratedParameters.UpdateMessageParameters = {
    ...operationOptionsToRequestParameters(options),
    body: {
      ...(options.metadata ? { metadata: options.metadata } : {}),
    },
  };
  validateThreadId(threadId);
  validateMessageId(messageId);
  const response = await TracingUtility.withSpan(
    "UpdateMessage",
    updateMessageOptions,
    async (updateOptions) => {
      const result = await context
        .path("/threads/{threadId}/messages/{messageId}", threadId, messageId)
        .post(updateOptions);
      if (!expectedStatuses.includes(result.status)) {
        throw createOpenAIError(result);
      }
      return result.body;
    },
    (span, updatedOptions) =>
      traceStartAgentGeneric(span, {
        ...updatedOptions,
        tracingAttributeOptions: { threadId: threadId, messageId: messageId },
      }),
  );

  return ConvertFromWire.convertThreadMessageOutput(response);
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
    if (
      options.body.attachments.some((value) => {
        value.tools.some((tool) => !["code_interpreter", "file_search"].includes(tool.type));
      })
    ) {
      throw new Error("Tool type must be either 'code_interpreter' or 'file_search'");
    }
    if (options.body.attachments) {
      options.body.attachments.forEach((value) => {
        if (value.data_source) {
          validateVectorStoreDataType([value.data_source]);
        }
      });
    }
  }
}

function validateListMessagesParameters(options?: ListMessagesParameters): void {
  if (
    options?.queryParameters?.limit &&
    (options.queryParameters.limit < 1 || options.queryParameters.limit > 100)
  ) {
    throw new Error("Limit must be between 1 and 100");
  }
  if (options?.queryParameters?.order && !["asc", "desc"].includes(options.queryParameters.order)) {
    throw new Error("Order must be either 'asc' or 'desc'");
  }
}
