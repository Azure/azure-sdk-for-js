// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * THIS IS AN AUTO-GENERATED FILE - DO NOT EDIT!
 *
 * Any changes you make here may be lost.
 *
 * If you need to make changes, please do so in the original source file, \{project-root\}/sources/custom
 */

import {
  StreamableMethod,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import {
  CreateAndRunThreadOptions,
  ListResponseOf,
  ThreadRun,
  ToolOutput,
} from "../../models/models.js";
import { parseToolCallOutput } from "../../models/helpers.js";
import {
  ThreadRunsCancelRunOptions,
  ThreadRunsCreateRunOptions,
  ThreadRunsCreateThreadAndRunOptions,
  ThreadRunsListRunsOptions,
  ThreadRunsModifyRunOptions,
  ThreadRunsRetrieveRunOptions,
  ThreadRunsSubmitRunToolOutputsOptions,
} from "../../models/options.js";
import {
  CancelRun200Response,
  AssistantsContext as Client,
  CreateRun200Response,
  CreateThreadAndRun200Response,
  ListRuns200Response,
  ModifyRun200Response,
  RetrieveRun200Response,
  SubmitRunToolOutputs200Response,
} from "../../rest/index.js";
import { camelCaseKeys } from "../util.js";

export function _createRunSend(
  context: Client,
  threadId: string,
  assistantId: string,
  options: ThreadRunsCreateRunOptions = { requestOptions: {} }
): StreamableMethod<CreateRun200Response> {
  return context.path("/threads/{threadId}/runs", threadId).post({
    ...operationOptionsToRequestParameters(options),
    body: {
      assistant_id: assistantId,
      model: options?.model,
      instructions: options?.instructions,
      tools: options?.tools,
      metadata: options?.metadata,
    },
  });
}

/** Creates a new run for an assistant thread. */
export async function createRun(
  context: Client,
  threadId: string,
  assistantId: string,
  options: ThreadRunsCreateRunOptions = { requestOptions: {} }
): Promise<ThreadRun> {
  const result = await _createRunSend(context, threadId, assistantId, options);
  return _createRunDeserialize(result);
}

export function _listRunsSend(
  context: Client,
  threadId: string,
  options: ThreadRunsListRunsOptions = { requestOptions: {} }
): StreamableMethod<ListRuns200Response> {
  return context.path("/threads/{threadId}/runs", threadId).get({
    ...operationOptionsToRequestParameters(options),
    queryParameters: {
      limit: options?.limit,
      order: options?.order,
      after: options?.after,
      before: options?.before,
    },
  });
}

export function _retrieveRunSend(
  context: Client,
  threadId: string,
  runId: string,
  options: ThreadRunsRetrieveRunOptions = { requestOptions: {} }
): StreamableMethod<RetrieveRun200Response> {
  return context
    .path("/threads/{threadId}/runs/{runId}", threadId, runId)
    .get({ ...operationOptionsToRequestParameters(options) });
}

/** Gets an existing run from an existing thread. */
export async function retrieveRun(
  context: Client,
  threadId: string,
  runId: string,
  options: ThreadRunsRetrieveRunOptions = { requestOptions: {} }
): Promise<ThreadRun> {
  const result = await _retrieveRunSend(context, threadId, runId, options);
  return _retrieveRunDeserialize(result);
}

export function _modifyRunSend(
  context: Client,
  threadId: string,
  runId: string,
  options: ThreadRunsModifyRunOptions = { requestOptions: {} }
): StreamableMethod<ModifyRun200Response> {
  return context.path("/threads/{threadId}/runs/{runId}", threadId, runId).post({
    ...operationOptionsToRequestParameters(options),
    body: { metadata: options?.metadata },
  });
}

export async function _modifyRunDeserialize(result: ModifyRun200Response): Promise<ThreadRun> {
  if (result.status !== "200") {
    throw createRestError(result);
  }

  return {
    id: result.body["id"],
    threadId: result.body["thread_id"],
    assistantId: result.body["assistant_id"],
    status: result.body["status"],
    requiredAction: !result.body["required_action"]
        ? undefined
        : {
          type: result.body.required_action?.["type"],
          submitToolOutputs: !result.body.required_action?.submit_tool_outputs?.["tool_calls"]
            ? undefined
            : {
                toolCalls: result.body.required_action?.submit_tool_outputs?.tool_calls?.map(parseToolCallOutput),
              },
        },
    lastError: !result.body.last_error
        ? undefined
        : {
            code: result.body.last_error["code"],
            message: result.body.last_error["message"],
          },
    model: result.body["model"],
    instructions: result.body["instructions"],
    tools: result.body["tools"],
    fileIds: result.body["file_ids"],
    createdAt: new Date(result.body["created_at"]),
    expiresAt: result.body["expires_at"] === null ? null : new Date(result.body["expires_at"]),
    startedAt: result.body["started_at"] === null ? null : new Date(result.body["started_at"]),
    completedAt:
      result.body["completed_at"] === null ? null : new Date(result.body["completed_at"]),
    cancelledAt:
      result.body["cancelled_at"] === null ? null : new Date(result.body["cancelled_at"]),
    failedAt: result.body["failed_at"] === null ? null : new Date(result.body["failed_at"]),
    metadata: result.body["metadata"],
  };
}

/** Modifies an existing thread run. */
export async function modifyRun(
  context: Client,
  threadId: string,
  runId: string,
  options: ThreadRunsModifyRunOptions = { requestOptions: {} }
): Promise<ThreadRun> {
  const result = await _modifyRunSend(context, threadId, runId, options);
  return _modifyRunDeserialize(result);
}

export function _submitRunToolOutputsSend(
  context: Client,
  threadId: string,
  runId: string,
  toolOutputs: ToolOutput[],
  options: ThreadRunsSubmitRunToolOutputsOptions = { requestOptions: {} }
): StreamableMethod<SubmitRunToolOutputs200Response> {
  return context
    .path("/threads/{threadId}/runs/{runId}/submit_tool_outputs", threadId, runId)
    .post({
      ...operationOptionsToRequestParameters(options),
      body: {
        tool_outputs: toolOutputs.map((p) => ({
          tool_call_id: p["toolCallId"],
          output: p["output"],
        })),
      },
    });
}

/** Submits outputs from tools as requested by tool calls in a run. Runs that need submitted tool outputs will have a status of 'requires_action' with a required_action.type of 'submit_tool_outputs'. */
export async function submitRunToolOutputs(
  context: Client,
  threadId: string,
  runId: string,
  toolOutputs: ToolOutput[],
  options: ThreadRunsSubmitRunToolOutputsOptions = { requestOptions: {} }
): Promise<ThreadRun> {
  const result = await _submitRunToolOutputsSend(context, threadId, runId, toolOutputs, options);
  return _submitRunToolOutputsDeserialize(result);
}

export function _cancelRunSend(
  context: Client,
  threadId: string,
  runId: string,
  options: ThreadRunsCancelRunOptions = { requestOptions: {} }
): StreamableMethod<CancelRun200Response> {
  return context
    .path("/threads/{threadId}/runs/{runId}/cancel", threadId, runId)
    .post({ ...operationOptionsToRequestParameters(options) });
}

/** Cancels a thread run. */
export async function cancelRun(
  context: Client,
  threadId: string,
  runId: string,
  options: ThreadRunsCancelRunOptions = { requestOptions: {} }
): Promise<ThreadRun> {
  const result = await _cancelRunSend(context, threadId, runId, options);
  return _cancelRunDeserialize(result);
}

/** Creates a new assistant thread and immediately starts a run using that new thread. */
export async function createThreadAndRun(
  context: Client,
  body: CreateAndRunThreadOptions,
  options: ThreadRunsCreateThreadAndRunOptions = { requestOptions: {} }
): Promise<ThreadRun> {
  const result = await _createThreadAndRunSend(context, body, options);
  return _createThreadAndRunDeserialize(result);
}

export async function _listRunsDeserialize(
  result: ListRuns200Response
): Promise<ListResponseOf<ThreadRun>> {
  if (result.status !== "200") {
    throw createRestError(result);
  }

  return {
    data: result.body["data"].map(
      (p) =>
        ({
          id: p["id"],
          threadId: p["thread_id"],
          assistantId: p["assistant_id"],
          status: p["status"],
          requiredAction: !p.required_action
            ? undefined
            : {
                type: p.required_action?.["type"],
                submitToolOutputs: !p.required_action?.submit_tool_outputs?.["tool_calls"]
                  ? undefined
                  : {
                      toolCalls: p.required_action?.submit_tool_outputs?.tool_calls?.map(parseToolCallOutput),
                    },
              },
          lastError: !p.last_error
            ? undefined
            : { code: p.last_error?.["code"], message: p.last_error?.["message"] },
          model: p["model"],
          instructions: p["instructions"],
          tools: p["tools"],
          fileIds: p["file_ids"],
          metadata: p["metadata"],
          createdAt: new Date(p["created_at"]),
          expiresAt: p["expires_at"] === null ? null : new Date(p["expires_at"]),
          startedAt: p["started_at"] === null ? null : new Date(p["started_at"]),
          completedAt: p["completed_at"] === null ? null : new Date(p["completed_at"]),
          cancelledAt: p["cancelled_at"] === null ? null : new Date(p["cancelled_at"]),
          failedAt: p["failed_at"] === null ? null : new Date(p["failed_at"]),
        } as ThreadRun)
    ),
    firstId: result.body["first_id"],
    lastId: result.body["last_id"],
    hasMore: result.body["has_more"],
  };
}

export function _createThreadAndRunSend(
  context: Client,
  body: CreateAndRunThreadOptions,
  options: ThreadRunsCreateThreadAndRunOptions = { requestOptions: {} }
): StreamableMethod<CreateThreadAndRun200Response> {
  return context.path("/threads/runs").post({
    ...operationOptionsToRequestParameters(options),
    body: {
      assistant_id: body["assistantId"],
      thread: !body.thread
        ? undefined
        : {
            messages: !body.thread?.["messages"]
              ? body.thread?.["messages"]
              : body.thread?.["messages"].map((p) => ({
                  role: p["role"],
                  content: p["content"],
                })),
            metadata: body.thread?.["metadata"],
          },
      model: body["model"],
      instructions: body["instructions"],
      tools: body["tools"],
      metadata: body["metadata"],
    },
  });
}

/** Returns a list of runs associated with an assistant thread. */
export async function listRuns(
  context: Client,
  threadId: string,
  options: ThreadRunsListRunsOptions = { requestOptions: {} }
): Promise<ListResponseOf<ThreadRun>> {
  const result = await _listRunsSend(context, threadId, options);
  return _listRunsDeserialize(result);
}

export async function _createRunDeserialize(result: CreateRun200Response): Promise<ThreadRun> {
  if (result.status !== "200") {
    throw createRestError(result);
  }
  const { required_action, last_error, created_at, expires_at, started_at, completed_at, cancelled_at, failed_at, ...rest } = result.body;

  return {
    ...camelCaseKeys(rest),
    requiredAction: !required_action
      ? undefined
      : {
          type: required_action?.["type"],
          submitToolOutputs: !required_action?.submit_tool_outputs?.["tool_calls"]
            ? undefined
            : {
                toolCalls: required_action?.submit_tool_outputs?.tool_calls?.map(parseToolCallOutput),
              },
        },
    lastError: !last_error
      ? undefined
      : {
          code: last_error?.["code"],
          message: last_error?.["message"],
        },
    createdAt: new Date(created_at),
    expiresAt: expires_at === null ? null : new Date(expires_at),
    startedAt: started_at === null ? null : new Date(started_at),
    completedAt: completed_at === null ? null : new Date(completed_at),
    cancelledAt: cancelled_at === null ? null : new Date(cancelled_at),
    failedAt: failed_at === null ? null : new Date(failed_at),
  };
}

export async function _retrieveRunDeserialize(result: RetrieveRun200Response): Promise<ThreadRun> {
  if (result.status !== "200") {
    throw createRestError(result);
  }

  return {
    id: result.body["id"],
    threadId: result.body["thread_id"],
    assistantId: result.body["assistant_id"],
    status: result.body["status"],
    requiredAction: !result.body.required_action
      ? undefined
      : {
          type: result.body.required_action?.["type"],
          submitToolOutputs: !result.body.required_action?.submit_tool_outputs?.["tool_calls"]
            ? undefined
            : {
                toolCalls: result.body.required_action?.submit_tool_outputs?.tool_calls?.map(parseToolCallOutput),
              },
        },
    lastError: !result.body.last_error
      ? undefined
      : {
          code: result.body.last_error?.["code"],
          message: result.body.last_error?.["message"],
        },
    model: result.body["model"],
    instructions: result.body["instructions"],
    tools: result.body["tools"],
    fileIds: result.body["file_ids"],
    metadata: result.body["metadata"],
    createdAt: new Date(result.body["created_at"]),
    expiresAt: result.body["expires_at"] === null ? null : new Date(result.body["expires_at"]),
    startedAt: result.body["started_at"] === null ? null : new Date(result.body["started_at"]),
    completedAt:
      result.body["completed_at"] === null ? null : new Date(result.body["completed_at"]),
    cancelledAt:
      result.body["cancelled_at"] === null ? null : new Date(result.body["cancelled_at"]),
    failedAt: result.body["failed_at"] === null ? null : new Date(result.body["failed_at"]),
  };
}

export async function _submitRunToolOutputsDeserialize(
  result: SubmitRunToolOutputs200Response
): Promise<ThreadRun> {
  if (result.status !== "200") {
    throw createRestError(result);
  }

  return {
    id: result.body["id"],
    threadId: result.body["thread_id"],
    assistantId: result.body["assistant_id"],
    status: result.body["status"],
    requiredAction: !result.body.required_action
      ? undefined
      : {
          type: result.body.required_action?.["type"],
          submitToolOutputs: !result.body.required_action?.submit_tool_outputs?.["tool_calls"]
            ? undefined
            : {
                toolCalls: result.body.required_action?.submit_tool_outputs?.tool_calls?.map(parseToolCallOutput),
              },
        },
    lastError: !result.body.last_error
      ? undefined
      : {
          code: result.body.last_error?.["code"],
          message: result.body.last_error?.["message"],
        },
    model: result.body["model"],
    instructions: result.body["instructions"],
    tools: result.body["tools"],
    fileIds: result.body["file_ids"],
    metadata: result.body["metadata"],
    createdAt: new Date(result.body["created_at"]),
    expiresAt: result.body["expires_at"] === null ? null : new Date(result.body["expires_at"]),
    startedAt: result.body["started_at"] === null ? null : new Date(result.body["started_at"]),
    completedAt:
      result.body["completed_at"] === null ? null : new Date(result.body["completed_at"]),
    cancelledAt:
      result.body["cancelled_at"] === null ? null : new Date(result.body["cancelled_at"]),
    failedAt: result.body["failed_at"] === null ? null : new Date(result.body["failed_at"]),
  };
}

export async function _createThreadAndRunDeserialize(
  result: CreateThreadAndRun200Response
): Promise<ThreadRun> {
  if (result.status !== "200") {
    throw createRestError(result);
  }

  return {
    id: result.body["id"],
    threadId: result.body["thread_id"],
    assistantId: result.body["assistant_id"],
    status: result.body["status"],
    requiredAction: !result.body.required_action
      ? undefined
      : {
          type: result.body.required_action?.["type"],
          submitToolOutputs: !result.body.required_action?.submit_tool_outputs?.["tool_calls"]
            ? undefined
            : {
                toolCalls: result.body.required_action?.submit_tool_outputs?.tool_calls?.map(parseToolCallOutput),
              },
        },
    lastError: !result.body.last_error
      ? undefined
      : {
          code: result.body.last_error?.["code"],
          message: result.body.last_error?.["message"],
        },
    model: result.body["model"],
    instructions: result.body["instructions"],
    tools: result.body["tools"],
    fileIds: result.body["file_ids"],
    metadata: result.body["metadata"],
    createdAt: new Date(result.body["created_at"]),
    expiresAt: result.body["expires_at"] === null ? null : new Date(result.body["expires_at"]),
    startedAt: result.body["started_at"] === null ? null : new Date(result.body["started_at"]),
    completedAt:
      result.body["completed_at"] === null ? null : new Date(result.body["completed_at"]),
    cancelledAt:
      result.body["cancelled_at"] === null ? null : new Date(result.body["cancelled_at"]),
    failedAt: result.body["failed_at"] === null ? null : new Date(result.body["failed_at"]),
  };
}

export async function _cancelRunDeserialize(result: CancelRun200Response): Promise<ThreadRun> {
  if (result.status !== "200") {
    throw createRestError(result);
  }

  return {
    id: result.body["id"],
    threadId: result.body["thread_id"],
    assistantId: result.body["assistant_id"],
    status: result.body["status"],
    requiredAction: !result.body.required_action
      ? undefined
      : {
          type: result.body.required_action?.["type"],
          submitToolOutputs: !result.body.required_action?.submit_tool_outputs?.["tool_calls"]
            ? undefined
            : {
                toolCalls: result.body.required_action?.submit_tool_outputs?.tool_calls?.map(parseToolCallOutput),
              },
        },
    lastError: !result.body.last_error
      ? undefined
      : {
          code: result.body.last_error["code"],
          message: result.body.last_error["message"],
        },
    model: result.body["model"],
    instructions: result.body["instructions"],
    tools: result.body["tools"],
    fileIds: result.body["file_ids"],
    createdAt: new Date(result.body["created_at"]),
    expiresAt: result.body["expires_at"] === null ? null : new Date(result.body["expires_at"]),
    startedAt: result.body["started_at"] === null ? null : new Date(result.body["started_at"]),
    completedAt:
      result.body["completed_at"] === null ? null : new Date(result.body["completed_at"]),
    cancelledAt:
      result.body["cancelled_at"] === null ? null : new Date(result.body["cancelled_at"]),
    failedAt: result.body["failed_at"] === null ? null : new Date(result.body["failed_at"]),
    metadata: result.body["metadata"],
  };
}
