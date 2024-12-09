// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Client, createRestError } from "@azure-rest/core-client";
import { CreateThreadParameters, DeleteThreadParameters, GetThreadParameters, UpdateThreadParameters } from "../generated/src/parameters.js";
import { AgentThreadOutput, ThreadDeletionStatusOutput } from "../generated/src/outputModels.js";
import { TracingUtility } from "../tracing.js";
import { traceEndCreateThread, traceStartCreateThread } from "./threadsTrace.js";
import { validateMessages, validateMetadata, validateThreadId, validateToolResources } from "./inputValidations.js";
import { traceStartAgentGeneric } from "./traceUtility.js";

const expectedStatuses = ["200"];

/** Creates a new thread. Threads contain messages and can be run by agents. */
export async function createThread(
  context: Client,
  options: CreateThreadParameters = { body: {} },
): Promise<AgentThreadOutput> {
  validateCreateThreadParameters(options);
  return TracingUtility.withSpan("CreateThread", options, async (updatedOptions) => {
    const result = await context.path("/threads").post(updatedOptions);
    if (!expectedStatuses.includes(result.status)) {
      throw createRestError(result);
    }
    return result.body;
  }, traceStartCreateThread, traceEndCreateThread);
}

/** Gets information about an existing thread. */
export async function getThread(
  context: Client,
  threadId: string,
  options: GetThreadParameters = {},
): Promise<AgentThreadOutput> {
  validateThreadId(threadId);
  return TracingUtility.withSpan("GetThread", options, async (updatedOptions) => {
    const result = await context
      .path("/threads/{threadId}", threadId)
      .get(updatedOptions);
    if (!expectedStatuses.includes(result.status)) {
      throw createRestError(result);
    }
    return result.body;
  }, (span, updatedOptions) => traceStartAgentGeneric(span, { ...updatedOptions, tracingAttributeOptions: { threadId: threadId } }));
}

/** Modifies an existing thread. */
export async function updateThread(
  context: Client,
  threadId: string,
  options: UpdateThreadParameters = { body: {} },
): Promise<AgentThreadOutput> {
  validateUpdateThreadParameters(threadId, options);
  return TracingUtility.withSpan("UpdateThread", options, async (updatedOptions) => {
    const result = await context
      .path("/threads/{threadId}", threadId)
      .post(updatedOptions);
    if (!expectedStatuses.includes(result.status)) {
      throw createRestError(result);
    }
    return result.body;
  }, (span, updatedOptions) => traceStartAgentGeneric(span, { ...updatedOptions, tracingAttributeOptions: { threadId: threadId } }));
}

/** Deletes an existing thread. */
export async function deleteThread(
  context: Client,
  threadId: string,
  options: DeleteThreadParameters = {},
): Promise<ThreadDeletionStatusOutput> {
  validateThreadId(threadId);
  return TracingUtility.withSpan("DeleteThread", options, async (updatedOptions) => {
    const result = await context
      .path("/threads/{threadId}", threadId)
      .delete(updatedOptions);
    if (!expectedStatuses.includes(result.status)) {
      throw createRestError(result);
    }
    return result.body;
  }, (span, updatedOptions) => traceStartAgentGeneric(span, { ...updatedOptions, tracingAttributeOptions: { threadId: threadId } }));
}


function validateCreateThreadParameters(options?: CreateThreadParameters): void {
  if (options?.body.messages) {
    options.body.messages.forEach(message => validateMessages(message.role));
  }
  if (options?.body.tool_resources) {
    validateToolResources(options.body.tool_resources);
  }
  if (options?.body.metadata) {
    validateMetadata(options.body.metadata);
  }
}

function validateUpdateThreadParameters(threadId: string, options?: UpdateThreadParameters): void {
  validateThreadId(threadId);
  if (options?.body.tool_resources) {
    validateToolResources(options.body.tool_resources);
  }
  if (options?.body.metadata) {
    validateMetadata(options.body.metadata);
  }
}
