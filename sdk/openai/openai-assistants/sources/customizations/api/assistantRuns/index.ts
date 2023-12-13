import {
  AssistantRun,
  ListResponseOf,
} from "../../models/models.js";
import {
  _listRunsSend,
} from "../../../generated/src/api/assistantRuns/index.js";
import {
  AssistantsContext as Client,
  CreateRun200Response,
  CreateThreadAndRun200Response,
  ListRuns200Response,
  RetrieveRun200Response,
  SubmitRunToolOutputs200Response
} from "../../../generated/src/rest/index.js";
import {
  AssistantRunsListRunsOptions,
} from "../../../generated/src/models/options.js";

export async function _listRunsDeserialize(
  result: ListRuns200Response
): Promise<ListResponseOf<AssistantRun>> {
  if (result.status !== "200") {
    throw result.body;
  }

  return {
    object: result.body["object"],
    data: result.body["data"].map((p) => ({
      id: p["id"],
      threadId: p["thread_id"],
      assistantId: p["assistant_id"],
      status: p["status"],
      requiredAction: !p.required_action
        ? undefined
        : { type: p.required_action?.["type"] },
      lastError: !p.last_error
        ? undefined
        : { code: p.last_error?.["code"], message: p.last_error?.["message"] },
      model: p["model"],
      instructions: p["instructions"],
      tools: p["tools"].map((p) => ({ type: p["type"], function: p["function"] || undefined })),
      fileIds: p["file_ids"],
      metadata: p["metadata"],
      createdAt: new Date(p["created_at"]),
      expiresAt: p["expires_at"] === null ? null : new Date(p["expires_at"]),
      startedAt: p["started_at"] === null ? null : new Date(p["started_at"]),
      completedAt:
        p["completed_at"] === null ? null : new Date(p["completed_at"]),
      cancelledAt:
        p["cancelled_at"] === null ? null : new Date(p["cancelled_at"]),
      failedAt: p["failed_at"] === null ? null : new Date(p["failed_at"]),
    } as AssistantRun )),
    firstId: result.body["first_id"],
    lastId: result.body["last_id"],
    hasMore: result.body["has_more"],
  };
}

/** Returns a list of runs associated with an assistant thread. */
export async function listRuns(
  context: Client,
  threadId: string,
  options: AssistantRunsListRunsOptions = { requestOptions: {} }
): Promise<ListResponseOf<AssistantRun>> {
  const result = await _listRunsSend(context, threadId, options);
  return _listRunsDeserialize(result);
}

export async function _createRunDeserialize(
  result: CreateRun200Response
): Promise<AssistantRun> {
  if (result.status !== "200") {
    throw result.body;
  }

  return {
    id: result.body["id"],
    object: result.body["object"],
    threadId: result.body["thread_id"],
    assistantId: result.body["assistant_id"],
    status: result.body["status"],
    requiredAction: !result.body.required_action
      ? undefined
      : {
          type: result.body.required_action?.["type"],
          submitToolOutputs: result.body.required_action?.["submit_tool_outputs"]
        },
    lastError: !result.body.last_error
      ? undefined
      : {
          code: result.body.last_error?.["code"],
          message: result.body.last_error?.["message"],
        },
    model: result.body["model"],
    instructions: result.body["instructions"],
    tools: result.body["tools"].map((p) => ({ type: p["type"], function: p["function"] || undefined })),
    fileIds: result.body["file_ids"],
    metadata: result.body["metadata"],
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
  };
}

export async function _retrieveRunDeserialize(
  result: RetrieveRun200Response
): Promise<AssistantRun> {
  if (result.status !== "200") {
    throw result.body;
  }

  return {
    id: result.body["id"],
    object: result.body["object"],
    threadId: result.body["thread_id"],
    assistantId: result.body["assistant_id"],
    status: result.body["status"],
    requiredAction: !result.body.required_action
      ? undefined
      : {
          type: result.body.required_action?.["type"],
          submitToolOutputs: result.body.required_action?.["submit_tool_outputs"]
        },
    lastError: !result.body.last_error
      ? undefined
      : {
          code: result.body.last_error?.["code"],
          message: result.body.last_error?.["message"],
        },
    model: result.body["model"],
    instructions: result.body["instructions"],
    tools: result.body["tools"].map((p) => ({ type: p["type"], function: p["function"] || undefined })),
    fileIds: result.body["file_ids"],
    metadata: result.body["metadata"],
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
  };
}

export async function _submitRunToolOutputsDeserialize(
  result: SubmitRunToolOutputs200Response
): Promise<AssistantRun> {
  if (result.status !== "200") {
    throw result.body;
  }

  return {
    id: result.body["id"],
    object: result.body["object"],
    threadId: result.body["thread_id"],
    assistantId: result.body["assistant_id"],
    status: result.body["status"],
    requiredAction: !result.body.required_action
      ? undefined
      : {
          type: result.body.required_action?.["type"],
          submitToolOutputs: result.body.required_action?.["submit_tool_outputs"]
        },
    lastError: !result.body.last_error
      ? undefined
      : {
          code: result.body.last_error?.["code"],
          message: result.body.last_error?.["message"],
        },
    model: result.body["model"],
    instructions: result.body["instructions"],
    tools: result.body["tools"].map((p) => ({ type: p["type"], function: p["function"] || undefined })),
    fileIds: result.body["file_ids"],
    metadata: result.body["metadata"],
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
  };
}

export async function _createThreadAndRunDeserialize(
  result: CreateThreadAndRun200Response
): Promise<AssistantRun> {
  if (result.status !== "200") {
    throw result.body;
  }

  return {
    id: result.body["id"],
    object: result.body["object"],
    threadId: result.body["thread_id"],
    assistantId: result.body["assistant_id"],
    status: result.body["status"],
    requiredAction: !result.body.required_action
      ? undefined
      : {
          type: result.body.required_action?.["type"],
          submitToolOutputs: {
            toolCalls: result.body.required_action?.submit_tool_outputs?.["tool_calls"]
          }
        },
    lastError: !result.body.last_error
      ? undefined
      : {
          code: result.body.last_error?.["code"],
          message: result.body.last_error?.["message"],
        },
    model: result.body["model"],
    instructions: result.body["instructions"],
    tools: result.body["tools"].map((p) => ({ type: p["type"], function: p["function"] || undefined })),
    fileIds: result.body["file_ids"],
    metadata: result.body["metadata"],
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
  };
}
