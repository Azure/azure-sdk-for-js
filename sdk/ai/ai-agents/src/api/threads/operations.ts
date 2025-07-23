// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AgentsContext as Client } from "../index.js";
import {
  toolResourcesSerializer,
  agentV1ErrorDeserializer,
  threadMessageOptionsArraySerializer,
  AgentThread,
  agentThreadDeserializer,
  _AgentsPagedResultAgentThread,
  _agentsPagedResultAgentThreadDeserializer,
  ThreadDeletionStatus,
  threadDeletionStatusDeserializer,
} from "../../models/models.js";
import {
  ThreadsDeleteThreadOptionalParams,
  ThreadsUpdateThreadOptionalParams,
  ThreadsGetThreadOptionalParams,
  ThreadsListThreadsOptionalParams,
  ThreadsCreateThreadOptionalParams,
} from "./options.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _deleteThreadSend(
  context: Client,
  threadId: string,
  options: ThreadsDeleteThreadOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/threads/{threadId}{?api-version}",
    {
      threadId: threadId,
      "api-version": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _deleteThreadDeserialize(
  result: PathUncheckedResponse,
): Promise<ThreadDeletionStatus> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = agentV1ErrorDeserializer(result.body);
    throw error;
  }

  return threadDeletionStatusDeserializer(result.body);
}

/** Deletes an existing thread. */
export async function deleteThread(
  context: Client,
  threadId: string,
  options: ThreadsDeleteThreadOptionalParams = { requestOptions: {} },
): Promise<ThreadDeletionStatus> {
  const result = await _deleteThreadSend(context, threadId, options);
  return _deleteThreadDeserialize(result);
}

export function _updateThreadSend(
  context: Client,
  threadId: string,
  options: ThreadsUpdateThreadOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/threads/{threadId}{?api-version}",
    {
      threadId: threadId,
      "api-version": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: {
      tool_resources: !options?.toolResources
        ? options?.toolResources
        : toolResourcesSerializer(options?.toolResources),
      metadata: options?.metadata,
    },
  });
}

export async function _updateThreadDeserialize(
  result: PathUncheckedResponse,
): Promise<AgentThread> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = agentV1ErrorDeserializer(result.body);
    throw error;
  }

  return agentThreadDeserializer(result.body);
}

/** Modifies an existing thread. */
export async function updateThread(
  context: Client,
  threadId: string,
  options: ThreadsUpdateThreadOptionalParams = { requestOptions: {} },
): Promise<AgentThread> {
  const result = await _updateThreadSend(context, threadId, options);
  return _updateThreadDeserialize(result);
}

export function _getThreadSend(
  context: Client,
  threadId: string,
  options: ThreadsGetThreadOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/threads/{threadId}{?api-version}",
    {
      threadId: threadId,
      "api-version": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getThreadDeserialize(result: PathUncheckedResponse): Promise<AgentThread> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = agentV1ErrorDeserializer(result.body);
    throw error;
  }

  return agentThreadDeserializer(result.body);
}

/** Gets information about an existing thread. */
export async function getThread(
  context: Client,
  threadId: string,
  options: ThreadsGetThreadOptionalParams = { requestOptions: {} },
): Promise<AgentThread> {
  const result = await _getThreadSend(context, threadId, options);
  return _getThreadDeserialize(result);
}

export function _listThreadsSend(
  context: Client,
  options: ThreadsListThreadsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/threads{?api-version,limit,order,after,before}",
    {
      "api-version": context.apiVersion,
      limit: options?.limit,
      order: options?.order,
      after: options?.after,
      before: options?.before,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _listThreadsDeserialize(
  result: PathUncheckedResponse,
): Promise<_AgentsPagedResultAgentThread> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = agentV1ErrorDeserializer(result.body);
    throw error;
  }

  return _agentsPagedResultAgentThreadDeserializer(result.body);
}

/** Gets a list of threads that were previously created. */
export function listThreads(
  context: Client,
  options: ThreadsListThreadsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<AgentThread> {
  return buildPagedAsyncIterator(
    context,
    () => _listThreadsSend(context, options),
    _listThreadsDeserialize,
    ["200"],
    { itemName: "data" },
  );
}

export function _createThreadSend(
  context: Client,
  options: ThreadsCreateThreadOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/threads{?api-version}",
    {
      "api-version": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: {
      messages: !options?.messages
        ? options?.messages
        : threadMessageOptionsArraySerializer(options?.messages),
      tool_resources: !options?.toolResources
        ? options?.toolResources
        : toolResourcesSerializer(options?.toolResources),
      metadata: options?.metadata,
    },
  });
}

export async function _createThreadDeserialize(
  result: PathUncheckedResponse,
): Promise<AgentThread> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = agentV1ErrorDeserializer(result.body);
    throw error;
  }

  return agentThreadDeserializer(result.body);
}

/** Creates a new thread. Threads contain messages and can be run by agents. */
export async function createThread(
  context: Client,
  options: ThreadsCreateThreadOptionalParams = { requestOptions: {} },
): Promise<AgentThread> {
  const result = await _createThreadSend(context, options);
  return _createThreadDeserialize(result);
}
