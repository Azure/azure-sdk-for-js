// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * THIS IS AN AUTO-GENERATED FILE - DO NOT EDIT!
 *
 * Any changes you make here may be lost.
 *
 * If you need to make changes, please do so in the original source file, \{project-root\}/sources/custom
 */

import { HttpResponse } from "@azure-rest/core-client";
import {
  AssistantDeletionStatusOutput,
  AssistantFileDeletionStatusOutput,
  AssistantFileOutput,
  AssistantOutput,
  AssistantThreadOutput,
  FileDeletionStatusOutput,
  ListResponseOfOutput,
  MessageFileOutput,
  OpenAIFileOutput,
  RunStepOutput,
  ThreadDeletionStatusOutput,
  ThreadMessageOutput,
  ThreadRunOutput,
} from "./outputModels.js";

/** The new assistant instance. */
export interface CreateAssistant200Response extends HttpResponse {
  status: "200";
  body: AssistantOutput;
}

/** The requested list of assistants. */
export interface ListAssistants200Response extends HttpResponse {
  status: "200";
  body: ListResponseOfOutput<AssistantOutput>;
}

/** The requested assistant instance. */
export interface GetAssistant200Response extends HttpResponse {
  status: "200";
  body: AssistantOutput;
}

/** The updated assistant instance. */
export interface UpdateAssistant200Response extends HttpResponse {
  status: "200";
  body: AssistantOutput;
}

/** Status information about the requested deletion operation. */
export interface DeleteAssistant200Response extends HttpResponse {
  status: "200";
  body: AssistantDeletionStatusOutput;
}

/** Information about the attached file. */
export interface CreateAssistantFile200Response extends HttpResponse {
  status: "200";
  body: AssistantFileOutput;
}

/** The requested list of files attached to the specified assistant. */
export interface ListAssistantFiles200Response extends HttpResponse {
  status: "200";
  body: ListResponseOfOutput<AssistantFileOutput>;
}

/** A representation of the attached file. */
export interface GetAssistantFile200Response extends HttpResponse {
  status: "200";
  body: AssistantFileOutput;
}

/** Status information about the requested file association deletion. */
export interface DeleteAssistantFile200Response extends HttpResponse {
  status: "200";
  body: AssistantFileDeletionStatusOutput;
}

/** Information about the newly created thread. */
export interface CreateThread200Response extends HttpResponse {
  status: "200";
  body: AssistantThreadOutput;
}

/** Information about the requested thread. */
export interface GetThread200Response extends HttpResponse {
  status: "200";
  body: AssistantThreadOutput;
}

/** Information about the modified thread. */
export interface UpdateThread200Response extends HttpResponse {
  status: "200";
  body: AssistantThreadOutput;
}

/** Status information about the requested thread deletion operation. */
export interface DeleteThread200Response extends HttpResponse {
  status: "200";
  body: ThreadDeletionStatusOutput;
}

/** A representation of the new message. */
export interface CreateMessage200Response extends HttpResponse {
  status: "200";
  body: ThreadMessageOutput;
}

/** The requested list of messages. */
export interface ListMessages200Response extends HttpResponse {
  status: "200";
  body: ListResponseOfOutput<ThreadMessageOutput>;
}

/** A representation of the requested message. */
export interface GetMessage200Response extends HttpResponse {
  status: "200";
  body: ThreadMessageOutput;
}

/** A representation of the modified message. */
export interface UpdateMessage200Response extends HttpResponse {
  status: "200";
  body: ThreadMessageOutput;
}

/** The requested list of files associated with the specified message. */
export interface ListMessageFiles200Response extends HttpResponse {
  status: "200";
  body: ListResponseOfOutput<MessageFileOutput>;
}

/** The requested file information. */
export interface GetMessageFile200Response extends HttpResponse {
  status: "200";
  body: MessageFileOutput;
}

/** Information about the new thread run. */
export interface CreateRun200Response extends HttpResponse {
  status: "200";
  body: ThreadRunOutput;
}

/** The requested list of thread runs. */
export interface ListRuns200Response extends HttpResponse {
  status: "200";
  body: ListResponseOfOutput<ThreadRunOutput>;
}

/** The requested information about the specified thread run. */
export interface GetRun200Response extends HttpResponse {
  status: "200";
  body: ThreadRunOutput;
}

/** Information about the modified run. */
export interface UpdateRun200Response extends HttpResponse {
  status: "200";
  body: ThreadRunOutput;
}

/** Updated information about the run. */
export interface SubmitToolOutputsToRun200Response extends HttpResponse {
  status: "200";
  body: ThreadRunOutput;
}

/** Updated information about the cancelled run. */
export interface CancelRun200Response extends HttpResponse {
  status: "200";
  body: ThreadRunOutput;
}

/** Information about the newly created thread. */
export interface CreateThreadAndRun200Response extends HttpResponse {
  status: "200";
  body: ThreadRunOutput;
}

/** Information about the requested run step. */
export interface GetRunStep200Response extends HttpResponse {
  status: "200";
  body: RunStepOutput;
}

/** The requested list of run steps. */
export interface ListRunSteps200Response extends HttpResponse {
  status: "200";
  body: ListResponseOfOutput<RunStepOutput>;
}

/** The requested list of files. */
export interface ListFiles200Response extends HttpResponse {
  status: "200";
  body: ListResponseOfOutput<OpenAIFileOutput>;
}

/** A representation of the uploaded file. */
export interface UploadFile200Response extends HttpResponse {
  status: "200";
  body: OpenAIFileOutput;
}

/** The request has succeeded. */
export interface DeleteFile200Response extends HttpResponse {
  status: "200";
  body: FileDeletionStatusOutput;
}

/** The request has succeeded. */
export interface GetFile200Response extends HttpResponse {
  status: "200";
  body: OpenAIFileOutput;
}
