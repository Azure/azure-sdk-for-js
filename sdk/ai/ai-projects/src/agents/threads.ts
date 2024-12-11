// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Client, createRestError } from "@azure-rest/core-client";
import { CreateThreadParameters, DeleteThreadParameters, GetThreadParameters, UpdateThreadParameters } from "../generated/src/parameters.js";
import { AgentThreadOutput, ThreadDeletionStatusOutput } from "../generated/src/outputModels.js";
import { validateMessages, validateMetadata, validateThreadId, validateToolResources } from "./inputValidations.js";

const expectedStatuses = ["200"];

/** Creates a new thread. Threads contain messages and can be run by agents. */
export async function createThread(
  context: Client,
  options?: CreateThreadParameters,
): Promise<AgentThreadOutput> {
  validateCreateThreadParameters(options);
  const result = await context.path("/threads").post(options);
  if (!expectedStatuses.includes(result.status)) {
      throw createRestError(result);
  }
  return result.body;
}

/** Gets information about an existing thread. */
export async function getThread(
  context: Client,
  threadId: string,
  options?: GetThreadParameters,
): Promise<AgentThreadOutput> {
  validateThreadId(threadId);
  const result = await context
    .path("/threads/{threadId}", threadId)
    .get(options);
  if (!expectedStatuses.includes(result.status)) {
      throw createRestError(result);
  }
  return result.body;
}

/** Modifies an existing thread. */
export async function updateThread(
  context: Client,
  threadId: string,
  options?: UpdateThreadParameters,
): Promise<AgentThreadOutput> {
  validateUpdateThreadParameters(threadId, options);
  const result = await context
    .path("/threads/{threadId}", threadId)
    .post(options);
  if (!expectedStatuses.includes(result.status)) {
      throw createRestError(result);
  }
  return result.body;
}

/** Deletes an existing thread. */
export async function deleteThread(
  context: Client,
  threadId: string,
  options?: DeleteThreadParameters,
): Promise<ThreadDeletionStatusOutput> {
  validateThreadId(threadId);
  const result = await context
    .path("/threads/{threadId}", threadId)
    .delete(options);
  if (!expectedStatuses.includes(result.status)) {
      throw createRestError(result);
  }
  return result.body;
}


function validateCreateThreadParameters(options?: CreateThreadParameters): void {
  if (options?.body.messages) {
    options.body.messages.forEach(message => validateMessages(message.role));
  }
  if (options?.body.tool_resources) {
    validateToolResources(options.body.tool_resources);  
  }
  if (options?.body.metadata){
    validateMetadata(options.body.metadata);
  }
}

function validateUpdateThreadParameters(threadId: string, options?: UpdateThreadParameters): void {
  validateThreadId(threadId);
  if (options?.body.tool_resources) {
    validateToolResources(options.body.tool_resources);  
  }
  if (options?.body.metadata){
    validateMetadata(options.body.metadata);
  }
}
