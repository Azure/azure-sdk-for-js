// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AgentsContext as Client } from "../index.js";
import type { ThreadRun, _AgentsPagedResultThreadRun, ToolOutput } from "../../models/models.js";
import {
  toolDefinitionUnionArraySerializer,
  agentsResponseFormatOptionSerializer,
  threadMessageOptionsArraySerializer,
  truncationObjectSerializer,
  agentsToolChoiceOptionSerializer,
  threadRunDeserializer,
  _agentsPagedResultThreadRunDeserializer,
  toolOutputArraySerializer,
} from "../../models/models.js";
import type {
  RunsCancelRunOptionalParams,
  RunsSubmitToolOutputsToRunOptionalParams,
  RunsUpdateRunOptionalParams,
  RunsGetRunOptionalParams,
  RunsListRunsOptionalParams,
  RunsCreateRunOptionalParams,
} from "./options.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { AgentRunResponse, AgentEventMessageStream } from "../../models/streamingModels.js";
import { createRunStreaming, submitToolOutputsToRunStreaming } from "../operations.js";
import type { OperationState, OperationStatus, PollerLike } from "@azure/core-lro";
import { createPoller } from "../poller.js";

export function _cancelRunSend(
  context: Client,
  threadId: string,
  runId: string,
  options: RunsCancelRunOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/threads/{threadId}/runs/{runId}/cancel{?api%2Dversion}",
    {
      threadId: threadId,
      runId: runId,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _cancelRunDeserialize(result: PathUncheckedResponse): Promise<ThreadRun> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return threadRunDeserializer(result.body);
}

/** Cancels a run of an in‐progress thread. */
export async function cancelRun(
  context: Client,
  threadId: string,
  runId: string,
  options: RunsCancelRunOptionalParams = { requestOptions: {} },
): Promise<ThreadRun> {
  const result = await _cancelRunSend(context, threadId, runId, options);
  return _cancelRunDeserialize(result);
}

export function _submitToolOutputsToRunSend(
  context: Client,
  threadId: string,
  runId: string,
  toolOutputs: ToolOutput[],
  options: RunsSubmitToolOutputsToRunOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/threads/{threadId}/runs/{runId}/submit_tool_outputs{?api%2Dversion}",
    {
      threadId: threadId,
      runId: runId,
      "api%2Dversion": context.apiVersion,
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
      tool_outputs: toolOutputArraySerializer(toolOutputs),
      stream: false,
    },
  });
}

export async function _submitToolOutputsToRunDeserialize(
  result: PathUncheckedResponse,
): Promise<ThreadRun> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return threadRunDeserializer(result.body);
}

/** Submits outputs from tools as requested by tool calls in a run. */
export function submitToolOutputsToRun(
  context: Client,
  threadId: string,
  runId: string,
  toolOutputs: ToolOutput[],
  options: RunsSubmitToolOutputsToRunOptionalParams = { requestOptions: {} },
): AgentRunResponse {
  async function executeSubmitToolOutputsToRun(): Promise<ThreadRun> {
    const result = await _submitToolOutputsToRunSend(
      context,
      threadId,
      runId,
      toolOutputs,
      options,
    );
    return _submitToolOutputsToRunDeserialize(result);
  }

  return {
    then: function (onFulfilled, onRejected) {
      return executeSubmitToolOutputsToRun().then(onFulfilled, onRejected).catch(onRejected);
    },
    async stream(): Promise<AgentEventMessageStream> {
      return submitToolOutputsToRunStreaming(context, threadId, runId, options);
    },
  };
}

export function _updateRunSend(
  context: Client,
  threadId: string,
  runId: string,
  options: RunsUpdateRunOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/threads/{threadId}/runs/{runId}{?api%2Dversion}",
    {
      threadId: threadId,
      runId: runId,
      "api%2Dversion": context.apiVersion,
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
    body: { metadata: options?.metadata },
  });
}

export async function _updateRunDeserialize(result: PathUncheckedResponse): Promise<ThreadRun> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return threadRunDeserializer(result.body);
}

/** Modifies an existing thread run. */
export async function updateRun(
  context: Client,
  threadId: string,
  runId: string,
  options: RunsUpdateRunOptionalParams = { requestOptions: {} },
): Promise<ThreadRun> {
  const result = await _updateRunSend(context, threadId, runId, options);
  return _updateRunDeserialize(result);
}

export function _getRunSend(
  context: Client,
  threadId: string,
  runId: string,
  options: RunsGetRunOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/threads/{threadId}/runs/{runId}{?api%2Dversion}",
    {
      threadId: threadId,
      runId: runId,
      "api%2Dversion": context.apiVersion,
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

export async function _getRunDeserialize(result: PathUncheckedResponse): Promise<ThreadRun> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return threadRunDeserializer(result.body);
}

/** Gets an existing run from an existing thread. */
export async function getRun(
  context: Client,
  threadId: string,
  runId: string,
  options: RunsGetRunOptionalParams = { requestOptions: {} },
): Promise<ThreadRun> {
  const result = await _getRunSend(context, threadId, runId, options);
  return _getRunDeserialize(result);
}

export function _listRunsSend(
  context: Client,
  threadId: string,
  options: RunsListRunsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/threads/{threadId}/runs{?api%2Dversion,limit,order,after,before}",
    {
      threadId: threadId,
      "api%2Dversion": context.apiVersion,
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

export async function _listRunsDeserialize(
  result: PathUncheckedResponse,
): Promise<_AgentsPagedResultThreadRun> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return _agentsPagedResultThreadRunDeserializer(result.body);
}

/** Gets a list of runs for a specified thread. */
export function listRuns(
  context: Client,
  threadId: string,
  options: RunsListRunsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ThreadRun> {
  return buildPagedAsyncIterator(
    context,
    () => _listRunsSend(context, threadId, options),
    _listRunsDeserialize,
    ["200"],
    { itemName: "data" },
  );
}

export function _createRunSend(
  context: Client,
  threadId: string,
  assistantId: string,
  options: RunsCreateRunOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/threads/{threadId}/runs{?api%2Dversion,include%5B%5D}",
    {
      threadId: threadId,
      "api%2Dversion": context.apiVersion,
      "include%5B%5D": !options?.include
        ? options?.include
        : options?.include.map((p: any) => {
            return p;
          }),
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
      assistant_id: assistantId,
      model: options?.model,
      instructions: options?.instructions,
      additional_instructions: options?.additionalInstructions,
      additional_messages: !options?.additionalMessages
        ? options?.additionalMessages
        : threadMessageOptionsArraySerializer(options?.additionalMessages),
      tools: !options?.tools ? options?.tools : toolDefinitionUnionArraySerializer(options?.tools),
      stream: options?.stream,
      temperature: options?.temperature,
      top_p: options?.topP,
      max_prompt_tokens: options?.maxPromptTokens,
      max_completion_tokens: options?.maxCompletionTokens,
      truncation_strategy: !options?.truncationStrategy
        ? options?.truncationStrategy
        : truncationObjectSerializer(options?.truncationStrategy),
      tool_choice: !options?.toolChoice
        ? options?.toolChoice
        : agentsToolChoiceOptionSerializer(options?.toolChoice),
      response_format: !options?.responseFormat
        ? options?.responseFormat
        : agentsResponseFormatOptionSerializer(options?.responseFormat),
      parallel_tool_calls: options?.parallelToolCalls,
      metadata: options?.metadata,
    },
  });
}

export async function _createRunDeserialize(result: PathUncheckedResponse): Promise<ThreadRun> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return threadRunDeserializer(result.body);
}

/** Creates a new run for an agent thread. */
export function createRun(
  context: Client,
  threadId: string,
  assistantId: string,
  options: RunsCreateRunOptionalParams = { requestOptions: {} },
): AgentRunResponse {
  async function executeCreateRun(): Promise<ThreadRun> {
    const result = await _createRunSend(context, threadId, assistantId, options);
    return _createRunDeserialize(result);
  }

  return {
    then: function (onFulfilled, onRejected) {
      return executeCreateRun().then(onFulfilled, onRejected).catch(onRejected);
    },
    async stream(): Promise<AgentEventMessageStream> {
      return createRunStreaming(context, assistantId, threadId, options);
    },
  };
}

export function createRunAndPoll(
  context: Client,
  threadId: string,
  assistantId: string,
  options: RunsCreateRunOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ThreadRun>, ThreadRun> {
  return createPoller<ThreadRun>({
    initOperation: async () => {
      const runResponse = createRun(context, threadId, assistantId, options);
      return runResponse;
    },
    pollOperation: async (currentRun: ThreadRun) => {
      return getRun(context, threadId, currentRun.id, options);
    },
    getOperationStatus: getLroOperationStatus,
    intervalInMs: options.pollingOptions?.intervalInMs,
  });
}

function getLroOperationStatus(result: ThreadRun): OperationStatus {
  switch (result.status) {
    case "queued":
      return "notStarted";
    case "in_progress":
    case "requires_action":
      return "running";
    case "completed":
      return "succeeded";
    case "cancelled":
    case "expired":
    default:
      return "failed";
  }
}
