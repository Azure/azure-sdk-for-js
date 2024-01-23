// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ThreadRun, ListResponseOf } from "../../models/models.js";
import { camelCaseKeys } from "../util.js";
import { _listRunsSend } from "../../../generated/src/api/threadRuns/index.js";
import {
  AssistantsContext as Client,
  CancelRun200Response,
  CreateRun200Response,
  CreateThreadAndRun200Response,
  ListRuns200Response,
  RetrieveRun200Response,
  SubmitRunToolOutputs200Response,
} from "../../../generated/src/rest/index.js";
import { ThreadRunsListRunsOptions } from "../../../generated/src/models/options.js";
import { parseToolCallOutput } from "../../models/helpers.js";
import {
  operationOptionsToRequestParameters,
  createRestError,
  StreamableMethod,
} from "@azure-rest/core-client";

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
          requiredAction: !p.required_action ? undefined : { type: p.required_action?.["type"] },
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
