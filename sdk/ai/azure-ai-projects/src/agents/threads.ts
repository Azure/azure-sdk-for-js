// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Client, createRestError } from "@azure-rest/core-client";
import { AgentsCreateThreadParameters, AgentsDeleteThreadParameters, AgentsGetThreadParameters, AgentsUpdateThreadParameters } from "../generated/src/parameters.js";
import { AgentThreadOutput, ThreadDeletionStatusOutput } from "../generated/src/outputModels.js";

const expectedStatuses = ["200"];

/** Creates a new thread. Threads contain messages and can be run by agents. */
export async function createThread(
  context: Client,
  options: AgentsCreateThreadParameters,
): Promise<AgentThreadOutput> {
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
  options?: AgentsGetThreadParameters,
): Promise<AgentThreadOutput> {
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
  options: AgentsUpdateThreadParameters,
): Promise<AgentThreadOutput> {
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
  options?: AgentsDeleteThreadParameters,
): Promise<ThreadDeletionStatusOutput> {
  const result = await context
    .path("/threads/{threadId}", threadId)
    .delete(options);
  if (!expectedStatuses.includes(result.status)) {
      throw createRestError(result);
  }
  return result.body;
}
