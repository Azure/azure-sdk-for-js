// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  OpenAIPageableListOf,
  ThreadRun,
  ToolOutputSubmission,
  CreateAndRunThreadOptions,
} from "../../models/models.js";
import {
  AssistantsContext as Client,
  CancelRun200Response,
  CreateRun200Response,
  CreateThreadAndRun200Response,
  ListRuns200Response,
  ModifyRun200Response,
  RetrieveRun200Response,
  SubmitRunToolOutputs200Response,
} from "../../rest/index.js";
import {
  StreamableMethod,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import {
  ThreadRunsCreateRunOptions,
  ThreadRunsListRunsOptions,
  ThreadRunsRetrieveRunOptions,
  ThreadRunsModifyRunOptions,
  ThreadRunsSubmitRunToolOutputsOptions,
  ThreadRunsCancelRunOptions,
  ThreadRunsCreateThreadAndRunOptions,
} from "../../models/options.js";

export function _createRunSend(
  context: Client,
  threadId: string,
  assistantId: string,
  options: ThreadRunsCreateRunOptions = { requestOptions: {} }
): StreamableMethod<CreateRun200Response> {
  return context
    .path("/threads/{threadId}/runs", threadId)
    .post({
      ...operationOptionsToRequestParameters(options),
      body: {
        assistant_id: assistantId,
        model: options?.model,
        instructions: options?.instructions,
        tools: !options?.tools
          ? options?.tools
          : options?.tools.map((p) => ({ type: p["type"] })),
        metadata: options?.metadata,
      },
    });
}

export async function _createRunDeserialize(
  result: CreateRun200Response
): Promise<ThreadRun> {
  if (result.status !== "200") {
    throw result.body;
  }

  return {
    id: result.body["id"],
    threadId: result.body["thread_id"],
    assistantId: result.body["assistant_id"],
    status: result.body["status"],
    requiredAction:
      result.body.required_action === null
        ? null
        : !result.body.required_action
        ? undefined
        : { type: result.body.required_action?.["type"] },
    lastError:
      result.body.last_error === null
        ? null
        : {
            code: result.body.last_error["code"],
            message: result.body.last_error["message"],
          },
    model: result.body["model"],
    instructions: result.body["instructions"],
    tools: result.body["tools"].map((p) => ({ type: p["type"] })),
    fileIds: result.body["file_ids"],
    createdAt: new Date(result.body["created_at"]),
    expiresAt:
      result.body["expires_at"] === null
        ? null
        : new Date(result.body["expires_at"]),
    startedAt:
      result.body["started_at"] === null
        ? null
        : new Date(result.body["started_at"]),
    completedAt:
      result.body["completed_at"] === null
        ? null
        : new Date(result.body["completed_at"]),
    cancelledAt:
      result.body["cancelled_at"] === null
        ? null
        : new Date(result.body["cancelled_at"]),
    failedAt:
      result.body["failed_at"] === null
        ? null
        : new Date(result.body["failed_at"]),
    metadata: result.body["metadata"],
  };
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
  return context
    .path("/threads/{threadId}/runs", threadId)
    .get({
      ...operationOptionsToRequestParameters(options),
      queryParameters: {
        limit: options?.limit,
        order: options?.order,
        after: options?.after,
        before: options?.before,
      },
    });
}

export async function _listRunsDeserialize(
  result: ListRuns200Response
): Promise<OpenAIPageableListOf> {
  if (result.status !== "200") {
    throw result.body;
  }

  return {
    data: result.body["data"].map((p) => ({
      id: p["id"],
      threadId: p["thread_id"],
      assistantId: p["assistant_id"],
      status: p["status"],
      requiredAction:
        p.required_action === null
          ? null
          : !p.required_action
          ? undefined
          : { type: p.required_action?.["type"] },
      lastError:
        p.last_error === null
          ? null
          : { code: p.last_error["code"], message: p.last_error["message"] },
      model: p["model"],
      instructions: p["instructions"],
      tools: p["tools"].map((p) => ({ type: p["type"] })),
      fileIds: p["file_ids"],
      createdAt: new Date(p["created_at"]),
      expiresAt: p["expires_at"] === null ? null : new Date(p["expires_at"]),
      startedAt: p["started_at"] === null ? null : new Date(p["started_at"]),
      completedAt:
        p["completed_at"] === null ? null : new Date(p["completed_at"]),
      cancelledAt:
        p["cancelled_at"] === null ? null : new Date(p["cancelled_at"]),
      failedAt: p["failed_at"] === null ? null : new Date(p["failed_at"]),
      metadata: p["metadata"],
    })),
    firstId: result.body["first_id"],
    lastId: result.body["last_id"],
    hasMore: result.body["has_more"],
  };
}

/** Gets a list of runs for a specified thread. */
export async function listRuns(
  context: Client,
  threadId: string,
  options: ThreadRunsListRunsOptions = { requestOptions: {} }
): Promise<OpenAIPageableListOf> {
  const result = await _listRunsSend(context, threadId, options);
  return _listRunsDeserialize(result);
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

export async function _retrieveRunDeserialize(
  result: RetrieveRun200Response
): Promise<ThreadRun> {
  if (result.status !== "200") {
    throw result.body;
  }

  return {
    id: result.body["id"],
    threadId: result.body["thread_id"],
    assistantId: result.body["assistant_id"],
    status: result.body["status"],
    requiredAction:
      result.body.required_action === null
        ? null
        : !result.body.required_action
        ? undefined
        : { type: result.body.required_action?.["type"] },
    lastError:
      result.body.last_error === null
        ? null
        : {
            code: result.body.last_error["code"],
            message: result.body.last_error["message"],
          },
    model: result.body["model"],
    instructions: result.body["instructions"],
    tools: result.body["tools"].map((p) => ({ type: p["type"] })),
    fileIds: result.body["file_ids"],
    createdAt: new Date(result.body["created_at"]),
    expiresAt:
      result.body["expires_at"] === null
        ? null
        : new Date(result.body["expires_at"]),
    startedAt:
      result.body["started_at"] === null
        ? null
        : new Date(result.body["started_at"]),
    completedAt:
      result.body["completed_at"] === null
        ? null
        : new Date(result.body["completed_at"]),
    cancelledAt:
      result.body["cancelled_at"] === null
        ? null
        : new Date(result.body["cancelled_at"]),
    failedAt:
      result.body["failed_at"] === null
        ? null
        : new Date(result.body["failed_at"]),
    metadata: result.body["metadata"],
  };
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
  return context
    .path("/threads/{threadId}/runs/{runId}", threadId, runId)
    .post({
      ...operationOptionsToRequestParameters(options),
      body: { metadata: options?.metadata },
    });
}

export async function _modifyRunDeserialize(
  result: ModifyRun200Response
): Promise<ThreadRun> {
  if (result.status !== "200") {
    throw result.body;
  }

  return {
    id: result.body["id"],
    threadId: result.body["thread_id"],
    assistantId: result.body["assistant_id"],
    status: result.body["status"],
    requiredAction:
      result.body.required_action === null
        ? null
        : !result.body.required_action
        ? undefined
        : { type: result.body.required_action?.["type"] },
    lastError:
      result.body.last_error === null
        ? null
        : {
            code: result.body.last_error["code"],
            message: result.body.last_error["message"],
          },
    model: result.body["model"],
    instructions: result.body["instructions"],
    tools: result.body["tools"].map((p) => ({ type: p["type"] })),
    fileIds: result.body["file_ids"],
    createdAt: new Date(result.body["created_at"]),
    expiresAt:
      result.body["expires_at"] === null
        ? null
        : new Date(result.body["expires_at"]),
    startedAt:
      result.body["started_at"] === null
        ? null
        : new Date(result.body["started_at"]),
    completedAt:
      result.body["completed_at"] === null
        ? null
        : new Date(result.body["completed_at"]),
    cancelledAt:
      result.body["cancelled_at"] === null
        ? null
        : new Date(result.body["cancelled_at"]),
    failedAt:
      result.body["failed_at"] === null
        ? null
        : new Date(result.body["failed_at"]),
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
  toolOutputs: ToolOutputSubmission[],
  options: ThreadRunsSubmitRunToolOutputsOptions = { requestOptions: {} }
): StreamableMethod<SubmitRunToolOutputs200Response> {
  return context
    .path(
      "/threads/{threadId}/runs/{runId}/submit_tool_outputs",
      threadId,
      runId
    )
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

export async function _submitRunToolOutputsDeserialize(
  result: SubmitRunToolOutputs200Response
): Promise<ThreadRun> {
  if (result.status !== "200") {
    throw result.body;
  }

  return {
    id: result.body["id"],
    threadId: result.body["thread_id"],
    assistantId: result.body["assistant_id"],
    status: result.body["status"],
    requiredAction:
      result.body.required_action === null
        ? null
        : !result.body.required_action
        ? undefined
        : { type: result.body.required_action?.["type"] },
    lastError:
      result.body.last_error === null
        ? null
        : {
            code: result.body.last_error["code"],
            message: result.body.last_error["message"],
          },
    model: result.body["model"],
    instructions: result.body["instructions"],
    tools: result.body["tools"].map((p) => ({ type: p["type"] })),
    fileIds: result.body["file_ids"],
    createdAt: new Date(result.body["created_at"]),
    expiresAt:
      result.body["expires_at"] === null
        ? null
        : new Date(result.body["expires_at"]),
    startedAt:
      result.body["started_at"] === null
        ? null
        : new Date(result.body["started_at"]),
    completedAt:
      result.body["completed_at"] === null
        ? null
        : new Date(result.body["completed_at"]),
    cancelledAt:
      result.body["cancelled_at"] === null
        ? null
        : new Date(result.body["cancelled_at"]),
    failedAt:
      result.body["failed_at"] === null
        ? null
        : new Date(result.body["failed_at"]),
    metadata: result.body["metadata"],
  };
}

/** Submits outputs from tools as requested by tool calls in a run. Runs that need submitted tool outputs will have a status of 'requires_action' with a required_action.type of 'submit_tool_outputs'. */
export async function submitRunToolOutputs(
  context: Client,
  threadId: string,
  runId: string,
  toolOutputs: ToolOutputSubmission[],
  options: ThreadRunsSubmitRunToolOutputsOptions = { requestOptions: {} }
): Promise<ThreadRun> {
  const result = await _submitRunToolOutputsSend(
    context,
    threadId,
    runId,
    toolOutputs,
    options
  );
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

export async function _cancelRunDeserialize(
  result: CancelRun200Response
): Promise<ThreadRun> {
  if (result.status !== "200") {
    throw result.body;
  }

  return {
    id: result.body["id"],
    threadId: result.body["thread_id"],
    assistantId: result.body["assistant_id"],
    status: result.body["status"],
    requiredAction:
      result.body.required_action === null
        ? null
        : !result.body.required_action
        ? undefined
        : { type: result.body.required_action?.["type"] },
    lastError:
      result.body.last_error === null
        ? null
        : {
            code: result.body.last_error["code"],
            message: result.body.last_error["message"],
          },
    model: result.body["model"],
    instructions: result.body["instructions"],
    tools: result.body["tools"].map((p) => ({ type: p["type"] })),
    fileIds: result.body["file_ids"],
    createdAt: new Date(result.body["created_at"]),
    expiresAt:
      result.body["expires_at"] === null
        ? null
        : new Date(result.body["expires_at"]),
    startedAt:
      result.body["started_at"] === null
        ? null
        : new Date(result.body["started_at"]),
    completedAt:
      result.body["completed_at"] === null
        ? null
        : new Date(result.body["completed_at"]),
    cancelledAt:
      result.body["cancelled_at"] === null
        ? null
        : new Date(result.body["cancelled_at"]),
    failedAt:
      result.body["failed_at"] === null
        ? null
        : new Date(result.body["failed_at"]),
    metadata: result.body["metadata"],
  };
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

export function _createThreadAndRunSend(
  context: Client,
  body: CreateAndRunThreadOptions,
  options: ThreadRunsCreateThreadAndRunOptions = { requestOptions: {} }
): StreamableMethod<CreateThreadAndRun200Response> {
  return context
    .path("/threads/runs")
    .post({
      ...operationOptionsToRequestParameters(options),
      body: {
        assistant_id: body["assistantId"],
        thread: !body.thread
          ? undefined
          : {
              messages: !body.thread?.["messages"]
                ? body.thread?.["messages"]
                : body.thread?.["messages"].map((p) => ({
                    id: p["id"],
                    created_at: p["createdAt"].getTime(),
                    thread_id: p["threadId"],
                    role: p["role"],
                    content: p["content"].map((p) => ({ type: p["type"] })),
                    assistant_id: p["assistantId"],
                    run_id: p["runId"],
                    file_ids: p["fileIds"],
                    metadata: p["metadata"],
                  })),
              metadata: body.thread?.["metadata"],
            },
        model: body["model"],
        instructions: body["instructions"],
        tools: !body["tools"]
          ? body["tools"]
          : body["tools"].map((p) => ({ type: p["type"] })),
        metadata: body["metadata"],
      },
    });
}

export async function _createThreadAndRunDeserialize(
  result: CreateThreadAndRun200Response
): Promise<ThreadRun> {
  if (result.status !== "200") {
    throw result.body;
  }

  return {
    id: result.body["id"],
    threadId: result.body["thread_id"],
    assistantId: result.body["assistant_id"],
    status: result.body["status"],
    requiredAction:
      result.body.required_action === null
        ? null
        : !result.body.required_action
        ? undefined
        : { type: result.body.required_action?.["type"] },
    lastError:
      result.body.last_error === null
        ? null
        : {
            code: result.body.last_error["code"],
            message: result.body.last_error["message"],
          },
    model: result.body["model"],
    instructions: result.body["instructions"],
    tools: result.body["tools"].map((p) => ({ type: p["type"] })),
    fileIds: result.body["file_ids"],
    createdAt: new Date(result.body["created_at"]),
    expiresAt:
      result.body["expires_at"] === null
        ? null
        : new Date(result.body["expires_at"]),
    startedAt:
      result.body["started_at"] === null
        ? null
        : new Date(result.body["started_at"]),
    completedAt:
      result.body["completed_at"] === null
        ? null
        : new Date(result.body["completed_at"]),
    cancelledAt:
      result.body["cancelled_at"] === null
        ? null
        : new Date(result.body["cancelled_at"]),
    failedAt:
      result.body["failed_at"] === null
        ? null
        : new Date(result.body["failed_at"]),
    metadata: result.body["metadata"],
  };
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
