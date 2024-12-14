// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Client } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type * as GeneratedParameters from "../generated/src/parameters.js";
import * as ConverterToWire from "../customization/convertModelsToWrite.js";
import * as ConverterFromWire from "../customization/convertOutputModelsFromWire.js";
import type { AgentThreadOutput, ThreadDeletionStatusOutput } from "../customization/outputModels.js";
import { TracingUtility } from "../tracing.js";
import { traceEndCreateThread, traceStartCreateThread } from "./threadsTrace.js";
import { validateMessages, validateMetadata, validateThreadId, validateToolResources } from "./inputValidations.js";
import { traceStartAgentGeneric } from "./traceUtility.js";
import type { CreateAgentThreadOptionalParams, DeleteAgentThreadOptionalParams, GetAgentThreadOptionalParams, UpdateAgentThreadOptionalParams } from "./customModels.js";

const expectedStatuses = ["200"];

/** Creates a new thread. Threads contain messages and can be run by agents. */
export async function createThread(
  context: Client,
  options: CreateAgentThreadOptionalParams = {},
): Promise<AgentThreadOutput> {

  const createThreadOptions: GeneratedParameters.CreateThreadParameters = {
    ...operationOptionsToRequestParameters(options),
    body: {
      ...ConverterToWire.convertAgentThreadCreationOptions(options),
    }
  };

  validateCreateThreadParameters(createThreadOptions);
  return TracingUtility.withSpan("CreateThread", createThreadOptions, async (updatedOptions) => {
    const result = await context.path("/threads").post(updatedOptions);
    if (!expectedStatuses.includes(result.status)) {
      throw createRestError(result);
    }
    return ConverterFromWire.convertAgentThreadOutput(result.body);
  }, traceStartCreateThread, traceEndCreateThread);
}

/** Gets information about an existing thread. */
export async function getThread(
  context: Client,
  threadId: string,
  options: GetAgentThreadOptionalParams = {},
): Promise<AgentThreadOutput> {

  const getThreadOptions: GeneratedParameters.GetThreadParameters = {
    ...operationOptionsToRequestParameters(options),
  };

  validateThreadId(threadId);
  return TracingUtility.withSpan("GetThread", getThreadOptions, async (updatedOptions) => {
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
  options: UpdateAgentThreadOptionalParams = {},
): Promise<AgentThreadOutput> {

  const updateThreadOptions: GeneratedParameters.UpdateThreadParameters = {
    ...operationOptionsToRequestParameters(options),
    body: {
      ...ConverterToWire.convertAgentThreadUpdateOptions(options),
    }
  };

  validateUpdateThreadParameters(threadId, updateThreadOptions);
  return TracingUtility.withSpan("UpdateThread", updateThreadOptions, async (updatedOptions) => {
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
  options: DeleteAgentThreadOptionalParams = {},
): Promise<ThreadDeletionStatusOutput> {

  const deleteThreadOptions: GeneratedParameters.DeleteAgentParameters = {
    ...operationOptionsToRequestParameters(options),
  };

  validateThreadId(threadId);
  return TracingUtility.withSpan("DeleteThread", deleteThreadOptions, async (updatedOptions) => {
    const result = await context
      .path("/threads/{threadId}", threadId)
      .delete(updatedOptions);
    if (!expectedStatuses.includes(result.status)) {
      throw createRestError(result);
    }
    return result.body;
  }, (span, updatedOptions) => traceStartAgentGeneric(span, { ...updatedOptions, tracingAttributeOptions: { threadId: threadId } }));
}


function validateCreateThreadParameters(options?: GeneratedParameters.CreateThreadParameters): void {
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

function validateUpdateThreadParameters(threadId: string, options?: GeneratedParameters.UpdateThreadParameters): void {
  validateThreadId(threadId);
  if (options?.body.tool_resources) {
    validateToolResources(options.body.tool_resources);
  }
  if (options?.body.metadata) {
    validateMetadata(options.body.metadata);
  }
}
