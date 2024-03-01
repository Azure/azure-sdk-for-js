// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { MessageContent, ThreadMessage, ListResponseOf, ThreadRun } from "../models/models.js";
import {
  Assistant,
  AssistantFile,
  CreateThreadOptions,
  InputFile,
  FilePurpose,
  ListRunStepsOptions,
  ListAssistantFilesOptions,
  ListAssistantsOptions,
  MessageFile,
  UploadFileOptions,
  ListMessagesOptions,
  GetMessageOptions,
  ListMessageFilesOptions,
  RunStep,
  RunStepDetails,
  ToolCall,
  ListRunsOptions,
  CreateAndRunThreadOptions,
  CreateThreadAndRunOptions,
} from "../../generated/src/models/index.js";
import {
  _listAssistantsSend,
  _listAssistantFilesSend,
  _listRunStepsSend,
  _listRunsSend,
  _listMessagesSend,
  _listMessageFilesSend,
} from "../../generated/src/api/operations.js";
import {
  AssistantsContext as Client,
  AssistantThreadCreationOptions,
  CreateThread200Response,
  ListAssistantFiles200Response,
  ListAssistants200Response,
  GetFile200Response,
  UploadFile200Response,
  GetRunStep200Response,
  RunStepDetailsOutput,
  RunStepOutput,
  CreateMessage200Response,
  ListMessageFiles200Response,
  ListMessages200Response,
  UpdateMessage200Response,
  GetMessage200Response,
  CancelRun200Response,
  CreateRun200Response,
  CreateThreadAndRun200Response,
  ListRuns200Response,
  GetRun200Response,
  SubmitToolOutputsToRun200Response,
} from "../../generated/src/rest/index.js";
import {
  StreamableMethod,
  operationOptionsToRequestParameters,
  createRestError,
} from "@azure-rest/core-client";
import { createFile } from "@azure/core-rest-pipeline";
import { camelCaseKeys, unixToDate } from "./util.js";
import { ListRunSteps200Response } from "../rest/responses.js";
import { MessageContentOutput } from "../rest/outputModels.js";
import { parseToolCallOutput, parseRequiredToolCallOutput } from "../models/helpers.js";

export async function _createRunDeserialize(result: CreateRun200Response): Promise<ThreadRun> {
  if (result.status !== "200") {
    throw createRestError(result);
  }
  const {
    required_action,
    last_error,
    created_at,
    expires_at,
    started_at,
    completed_at,
    cancelled_at,
    failed_at,
    ...rest
  } = result.body;

  return {
    ...camelCaseKeys(rest),
    requiredAction: !required_action
      ? undefined
      : {
          type: required_action?.["type"],
          submitToolOutputs: !required_action?.submit_tool_outputs?.["tool_calls"]
            ? undefined
            : {
                toolCalls: required_action?.submit_tool_outputs?.tool_calls?.map(
                  parseRequiredToolCallOutput
                ),
              },
        },
    lastError: !last_error
      ? undefined
      : {
          code: last_error?.["code"],
          message: last_error?.["message"],
        },
    createdAt: unixToDate(created_at),
    expiresAt: expires_at === null ? null : unixToDate(Number(expires_at)),
    startedAt: started_at === null ? null : unixToDate(Number(started_at)),
    completedAt: completed_at === null ? null : unixToDate(Number(completed_at)),
    cancelledAt: cancelled_at === null ? null : unixToDate(Number(cancelled_at)),
    failedAt: failed_at === null ? null : unixToDate(Number(failed_at)),
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
          createdAt: unixToDate(p["created_at"]),
          expiresAt: p["expires_at"] === null ? null : unixToDate(Number(p["expires_at"])),
          startedAt: p["started_at"] === null ? null : unixToDate(Number(p["started_at"])),
          completedAt: p["completed_at"] === null ? null : unixToDate(Number(p["completed_at"])),
          cancelledAt: p["cancelled_at"] === null ? null : unixToDate(Number(p["cancelled_at"])),
          failedAt: p["failed_at"] === null ? null : unixToDate(Number(p["failed_at"])),
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
  options: CreateThreadAndRunOptions = { requestOptions: {} }
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
  options: ListRunsOptions = { requestOptions: {} }
): Promise<ListResponseOf<ThreadRun>> {
  const result = await _listRunsSend(context, threadId, options);
  return _listRunsDeserialize(result);
}

export async function _getRunDeserialize(result: GetRun200Response): Promise<ThreadRun> {
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
                toolCalls: result.body.required_action?.submit_tool_outputs?.tool_calls?.map(
                  parseRequiredToolCallOutput
                ),
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
    createdAt: unixToDate(result.body["created_at"]),
    expiresAt:
      result.body["expires_at"] === null ? null : unixToDate(Number(result.body["expires_at"])),
    startedAt:
      result.body["started_at"] === null ? null : unixToDate(Number(result.body["started_at"])),
    completedAt:
      result.body["completed_at"] === null ? null : unixToDate(Number(result.body["completed_at"])),
    cancelledAt:
      result.body["cancelled_at"] === null ? null : unixToDate(Number(result.body["cancelled_at"])),
    failedAt:
      result.body["failed_at"] === null ? null : unixToDate(Number(result.body["failed_at"])),
  };
}

export async function _submitToolOutputsToRunDeserialize(
  result: SubmitToolOutputsToRun200Response
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
                toolCalls: result.body.required_action?.submit_tool_outputs?.tool_calls?.map(
                  parseRequiredToolCallOutput
                ),
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
    createdAt: unixToDate(result.body["created_at"]),
    expiresAt:
      result.body["expires_at"] === null ? null : unixToDate(Number(result.body["expires_at"])),
    startedAt:
      result.body["started_at"] === null ? null : unixToDate(Number(result.body["started_at"])),
    completedAt:
      result.body["completed_at"] === null ? null : unixToDate(Number(result.body["completed_at"])),
    cancelledAt:
      result.body["cancelled_at"] === null ? null : unixToDate(Number(result.body["cancelled_at"])),
    failedAt:
      result.body["failed_at"] === null ? null : unixToDate(Number(result.body["failed_at"])),
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
                toolCalls: result.body.required_action?.submit_tool_outputs?.tool_calls?.map(
                  parseRequiredToolCallOutput
                ),
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
    createdAt: unixToDate(result.body["created_at"]),
    expiresAt:
      result.body["expires_at"] === null ? null : unixToDate(Number(result.body["expires_at"])),
    startedAt:
      result.body["started_at"] === null ? null : unixToDate(Number(result.body["started_at"])),
    completedAt:
      result.body["completed_at"] === null ? null : unixToDate(Number(result.body["completed_at"])),
    cancelledAt:
      result.body["cancelled_at"] === null ? null : unixToDate(Number(result.body["cancelled_at"])),
    failedAt:
      result.body["failed_at"] === null ? null : unixToDate(Number(result.body["failed_at"])),
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
                toolCalls: result.body.required_action?.submit_tool_outputs?.tool_calls?.map(
                  parseRequiredToolCallOutput
                ),
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
    createdAt: unixToDate(result.body["created_at"]),
    expiresAt:
      result.body["expires_at"] === null ? null : unixToDate(Number(result.body["expires_at"])),
    startedAt:
      result.body["started_at"] === null ? null : unixToDate(Number(result.body["started_at"])),
    completedAt:
      result.body["completed_at"] === null ? null : unixToDate(Number(result.body["completed_at"])),
    cancelledAt:
      result.body["cancelled_at"] === null ? null : unixToDate(Number(result.body["cancelled_at"])),
    failedAt:
      result.body["failed_at"] === null ? null : unixToDate(Number(result.body["failed_at"])),
    metadata: result.body["metadata"],
  };
}

function parseMessageContentOutput(messageContentOutput: MessageContentOutput): MessageContent {
  const messageContent = { type: "", text: {}, imageFile: {} };
  switch (messageContentOutput.type) {
    case "image_file":
      messageContent.type = "image_file";
      messageContent.imageFile = messageContentOutput.image_file;
      break;
    case "text":
      messageContent.type = "text";
      messageContent.text = messageContentOutput.text;
      break;
  }
  return messageContent as MessageContent;
}

export async function listMessages(
  context: Client,
  threadId: string,
  options: ListMessagesOptions = { requestOptions: {} }
): Promise<ListResponseOf<ThreadMessage>> {
  const result = await _listMessagesSend(context, threadId, options);
  return _listMessagesDeserialize(result);
}

export function _getMessageSend(
  context: Client,
  threadId: string,
  messageId: string,
  options: GetMessageOptions = { requestOptions: {} }
): StreamableMethod<GetMessage200Response> {
  return context
    .path("/threads/{threadId}/messages/{messageId}", threadId, messageId)
    .get({ ...operationOptionsToRequestParameters(options) });
}

/** Retrieves a message associated with a thread. */
export async function getMessage(
  context: Client,
  threadId: string,
  messageId: string,
  options: GetMessageOptions = { requestOptions: {} }
): Promise<ThreadMessage> {
  const result = await _getMessageSend(context, threadId, messageId, options);
  return _getMessageDeserialize(result);
}

export async function _listMessageFilesDeserialize(
  result: ListMessageFiles200Response
): Promise<ListResponseOf<MessageFile>> {
  if (result.status !== "200") {
    throw createRestError(result);
  }

  return {
    data: result.body["data"].map((p) => ({
      id: p["id"],
      createdAt: unixToDate(p["created_at"]),
      messageId: p["message_id"],
    })),
    firstId: result.body["first_id"],
    lastId: result.body["last_id"],
    hasMore: result.body["has_more"],
  };
}

/** Returns a list of files associated with a message from a thread. */
export async function listMessageFiles(
  context: Client,
  threadId: string,
  messageId: string,
  options: ListMessageFilesOptions = { requestOptions: {} }
): Promise<ListResponseOf<MessageFile>> {
  const result = await _listMessageFilesSend(context, threadId, messageId, options);
  return _listMessageFilesDeserialize(result);
}

export async function _createMessageDeserialize(
  result: CreateMessage200Response
): Promise<ThreadMessage> {
  if (result.status !== "200") {
    throw createRestError(result);
  }

  return {
    id: result.body["id"],
    createdAt: unixToDate(result.body["created_at"]),
    threadId: result.body["thread_id"],
    role: result.body["role"],
    content: (result.body["content"] ?? []).map(parseMessageContentOutput),
    assistantId: result.body["assistant_id"],
    runId: result.body["run_id"],
    fileIds: result.body["file_ids"],
    metadata: result.body["metadata"],
  };
}

export async function _listMessagesDeserialize(
  result: ListMessages200Response
): Promise<ListResponseOf<ThreadMessage>> {
  if (result.status !== "200") {
    throw createRestError(result);
  }

  return {
    data: (result.body["data"] ?? []).map((p) => ({
      id: p["id"],
      createdAt: unixToDate(p["created_at"]),
      threadId: p["thread_id"],
      role: p["role"],
      content: (p["content"] ?? []).map(parseMessageContentOutput),
      assistantId: p["assistant_id"],
      runId: p["run_id"],
      metadata: p["metadata"],
    })),
    firstId: result.body["first_id"],
    lastId: result.body["last_id"],
    hasMore: result.body["has_more"],
  };
}

export async function _getMessageDeserialize(
  result: GetMessage200Response
): Promise<ThreadMessage> {
  if (result.status !== "200") {
    throw createRestError(result);
  }

  return {
    id: result.body["id"],
    createdAt: unixToDate(result.body["created_at"]),
    threadId: result.body["thread_id"],
    role: result.body["role"],
    content: (result.body["content"] ?? []).map(parseMessageContentOutput),
    assistantId: result.body["assistant_id"],
    runId: result.body["run_id"],
    metadata: result.body["metadata"],
  };
}

export async function _updateMessageDeserialize(
  result: UpdateMessage200Response
): Promise<ThreadMessage> {
  if (result.status !== "200") {
    throw createRestError(result);
  }

  return {
    id: result.body["id"],
    createdAt: unixToDate(result.body["created_at"]),
    threadId: result.body["thread_id"],
    role: result.body["role"],
    content: (result.body["content"] ?? []).map(parseMessageContentOutput),
    assistantId: result.body["assistant_id"],
    runId: result.body["run_id"],
    metadata: result.body["metadata"],
  };
}

function parseRunStepDetails(runStepDetailsOutput: RunStepDetailsOutput): RunStepDetails {
  const { type } = runStepDetailsOutput;
  const details = { type, messageCreation: {}, toolCalls: [] as ToolCall[] };
  switch (type) {
    case "message_creation":
      details.messageCreation = runStepDetailsOutput["message_creation"];
      break;
    case "tool_calls":
      details.toolCalls = runStepDetailsOutput["tool_calls"].map(parseToolCallOutput);
      break;
  }

  return details as RunStepDetails;
}

function parseRunStepOutput(runStepOutput: RunStepOutput): RunStep {
  const {
    step_details,
    last_error,
    created_at,
    expired_at,
    completed_at,
    cancelled_at,
    failed_at,
    ...rest
  } = runStepOutput;

  return {
    ...camelCaseKeys(rest),
    stepDetails: parseRunStepDetails(step_details),
    lastError:
      last_error === null ? null : { code: last_error["code"], message: last_error["message"] },
    createdAt: unixToDate(created_at),
    expiredAt: expired_at === null ? null : unixToDate(expired_at),
    completedAt: completed_at === null ? null : unixToDate(completed_at),
    cancelledAt: cancelled_at === null ? null : unixToDate(cancelled_at),
    failedAt: failed_at === null ? null : unixToDate(failed_at),
  } as RunStep;
}

export async function _listRunStepsDeserialize(
  result: ListRunSteps200Response
): Promise<ListResponseOf<RunStep>> {
  if (result.status !== "200") {
    throw createRestError(result);
  }

  return {
    data: result.body["data"].map(parseRunStepOutput),
    firstId: result.body["first_id"],
    lastId: result.body["last_id"],
    hasMore: result.body["has_more"],
  };
}

export async function _getRunStepDeserialize(result: GetRunStep200Response): Promise<RunStep> {
  if (result.status !== "200") {
    throw createRestError(result);
  }
  const {
    step_details,
    last_error,
    created_at,
    expired_at,
    completed_at,
    cancelled_at,
    failed_at,
    ...rest
  } = result.body;

  return {
    ...camelCaseKeys(rest),
    stepDetails: parseRunStepDetails(step_details),
    lastError:
      last_error === null
        ? null
        : {
            code: last_error["code"],
            message: last_error["message"],
          },
    createdAt: unixToDate(created_at),
    expiredAt: expired_at === null ? null : unixToDate(expired_at),
    completedAt: completed_at === null ? null : unixToDate(completed_at),
    cancelledAt: cancelled_at === null ? null : unixToDate(cancelled_at),
    failedAt: failed_at === null ? null : unixToDate(failed_at),
  };
}

/** Returns a list of run steps associated an assistant thread run. */
export async function listRunSteps(
  context: Client,
  threadId: string,
  runId: string,
  options: ListRunStepsOptions = { requestOptions: {} }
): Promise<ListResponseOf<RunStep>> {
  const result = await _listRunStepsSend(context, threadId, runId, options);
  return _listRunStepsDeserialize(result);
}

export async function _listAssistantsDeserialize(
  result: ListAssistants200Response
): Promise<ListResponseOf<Assistant>> {
  if (result.status !== "200") {
    throw createRestError(result);
  }

  return {
    data: result.body["data"].map((p) => ({
      id: p["id"],
      createdAt: unixToDate(p["created_at"]),
      name: p["name"],
      description: p["description"],
      model: p["model"],
      instructions: p["instructions"],
      tools: p["tools"],
      fileIds: p["file_ids"],
      metadata: p["metadata"],
    })),
    firstId: result.body["first_id"],
    lastId: result.body["last_id"],
    hasMore: result.body["has_more"],
  };
}

/** Returns a list of assistants. */
export async function listAssistants(
  context: Client,
  options: ListAssistantsOptions = { requestOptions: {} }
): Promise<ListResponseOf<Assistant>> {
  const result = await _listAssistantsSend(context, options);
  return _listAssistantsDeserialize(result);
}

export async function _listAssistantFilesDeserialize(
  result: ListAssistantFiles200Response
): Promise<ListResponseOf<AssistantFile>> {
  if (result.status !== "200") {
    throw createRestError(result);
  }

  return {
    data: result.body["data"].map((p) => ({
      id: p["id"],
      createdAt: unixToDate(p["created_at"]),
      assistantId: p["assistant_id"],
    })),
    firstId: result.body["first_id"],
    lastId: result.body["last_id"],
    hasMore: result.body["has_more"],
  };
}

/** Returns a list of assistant files. */
export async function listAssistantFiles(
  context: Client,
  assistantId: string,
  options: ListAssistantFilesOptions = { requestOptions: {} }
): Promise<ListResponseOf<AssistantFile>> {
  const result = await _listAssistantFilesSend(context, assistantId, options);
  return _listAssistantFilesDeserialize(result);
}

export function _createThreadSend(
  context: Client,
  body: AssistantThreadCreationOptions,
  options: CreateThreadOptions = { requestOptions: {} }
): StreamableMethod<CreateThread200Response> {
  return context.path("/threads").post({
    ...operationOptionsToRequestParameters(options),
    body: {
      messages: (body["messages"] ?? []).map((p) => ({
        role: p["role"],
        content: p["content"],
      })),
      metadata: body["metadata"],
    },
  });
}

export function _uploadFileSend(
  context: Client,
  file: Uint8Array,
  purpose: FilePurpose,
  options: UploadFileOptions = { requestOptions: {} }
): StreamableMethod<UploadFile200Response> {
  return context.path("/files").post({
    ...operationOptionsToRequestParameters(options),
    contentType: (options.contentType as any) ?? "multipart/form-data",
    body: {
      file: createFile(file, options?.filename || "unknown.txt"),
      purpose: purpose,
    },
  });
}

export async function _uploadFileDeserialize(result: UploadFile200Response): Promise<InputFile> {
  if (result.status !== "200") {
    throw createRestError(result);
  }

  return {
    id: result.body["id"],
    bytes: result.body["bytes"],
    filename: result.body["filename"],
    createdAt: unixToDate(result.body["created_at"]),
    purpose: result.body["purpose"],
  };
}

export async function _getFileDeserialize(result: GetFile200Response): Promise<InputFile> {
  if (result.status !== "200") {
    throw createRestError(result);
  }

  return {
    id: result.body["id"],
    bytes: result.body["bytes"],
    filename: result.body["filename"],
    createdAt: unixToDate(result.body["created_at"]),
    purpose: result.body["purpose"],
  };
}
