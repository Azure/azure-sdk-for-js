// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { HttpResponse } from "@azure-rest/core-client";
import {
  ListResponseOfOutput,
  AssistantOutput,
  AssistantDeletionStatusOutput,
  AssistantFileOutput,
  AssistantFileDeletionStatusOutput,
  AssistantThreadOutput,
  ThreadDeletionStatusOutput,
  AssistantMessageOutput,
  AssistantMessageFileOutput,
  AssistantRunOutput,
  RunStepOutput,
  FileListResponseOutput,
  FileOutput,
  FileDeletionStatusOutput,
} from "./outputModels.js";

/** The request has succeeded. */
export interface CreateAssistant200Response extends HttpResponse {
  status: "200";
  body: AssistantOutput;
}

/** The request has succeeded. */
export interface ListAssistants200Response extends HttpResponse {
  status: "200";
  body: ListResponseOfOutput<AssistantOutput>;
}

/** The request has succeeded. */
export interface RetrieveAssistant200Response extends HttpResponse {
  status: "200";
  body: AssistantOutput;
}

/** The request has succeeded. */
export interface ModifyAssistant200Response extends HttpResponse {
  status: "200";
  body: AssistantOutput;
}

/** The request has succeeded. */
export interface DeleteAssistant200Response extends HttpResponse {
  status: "200";
  body: AssistantDeletionStatusOutput;
}

/** The request has succeeded. */
export interface CreateAssistantFile200Response extends HttpResponse {
  status: "200";
  body: AssistantFileOutput;
}

/** The request has succeeded. */
export interface ListAssistantFiles200Response extends HttpResponse {
  status: "200";
  body: ListResponseOfOutput<AssistantFileOutput>;
}

/** The request has succeeded. */
export interface RetrieveAssistantFile200Response extends HttpResponse {
  status: "200";
  body: AssistantFileOutput;
}

/** The request has succeeded. */
export interface DeleteAssistantFile200Response extends HttpResponse {
  status: "200";
  body: AssistantFileDeletionStatusOutput;
}

/** The request has succeeded. */
export interface CreateThread200Response extends HttpResponse {
  status: "200";
  body: AssistantThreadOutput;
}

/** The request has succeeded. */
export interface RetrieveThread200Response extends HttpResponse {
  status: "200";
  body: AssistantThreadOutput;
}

/** The request has succeeded. */
export interface ModifyThread200Response extends HttpResponse {
  status: "200";
  body: AssistantThreadOutput;
}

/** The request has succeeded. */
export interface DeleteThread200Response extends HttpResponse {
  status: "200";
  body: ThreadDeletionStatusOutput;
}

/** The request has succeeded. */
export interface CreateMessage200Response extends HttpResponse {
  status: "200";
  body: AssistantMessageOutput;
}

/** The request has succeeded. */
export interface ListMessages200Response extends HttpResponse {
  status: "200";
  body: ListResponseOfOutput<AssistantMessageOutput>;
}

/** The request has succeeded. */
export interface RetrieveMessage200Response extends HttpResponse {
  status: "200";
  body: AssistantMessageOutput;
}

/** The request has succeeded. */
export interface ModifyMessage200Response extends HttpResponse {
  status: "200";
  body: AssistantMessageOutput;
}

/** The request has succeeded. */
export interface ListMessageFiles200Response extends HttpResponse {
  status: "200";
  body: ListResponseOfOutput<AssistantMessageFileOutput>;
}

/** The request has succeeded. */
export interface RetrieveMessageFile200Response extends HttpResponse {
  status: "200";
  body: AssistantMessageFileOutput;
}

/** The request has succeeded. */
export interface CreateRun200Response extends HttpResponse {
  status: "200";
  body: AssistantRunOutput;
}

/** The request has succeeded. */
export interface ListRuns200Response extends HttpResponse {
  status: "200";
  body: ListResponseOfOutput<AssistantRunOutput>;
}

/** The request has succeeded. */
export interface RetrieveRun200Response extends HttpResponse {
  status: "200";
  body: AssistantRunOutput;
}

/** The request has succeeded. */
export interface ModifyRun200Response extends HttpResponse {
  status: "200";
  body: AssistantRunOutput;
}

/** The request has succeeded. */
export interface SubmitRunToolOutputs200Response extends HttpResponse {
  status: "200";
  body: AssistantRunOutput;
}

/** The request has succeeded. */
export interface CancelRun200Response extends HttpResponse {
  status: "200";
  body: AssistantRunOutput;
}

/** The request has succeeded. */
export interface CreateThreadAndRun200Response extends HttpResponse {
  status: "200";
  body: AssistantRunOutput;
}

/** The request has succeeded. */
export interface RetrieveRunStep200Response extends HttpResponse {
  status: "200";
  body: RunStepOutput;
}

/** The request has succeeded. */
export interface ListRunSteps200Response extends HttpResponse {
  status: "200";
  body: ListResponseOfOutput<RunStepOutput>;
}

/** The request has succeeded. */
export interface ListFiles200Response extends HttpResponse {
  status: "200";
  body: FileListResponseOutput;
}

/** The request has succeeded. */
export interface UploadFile200Response extends HttpResponse {
  status: "200";
  body: FileOutput;
}

/** The request has succeeded. */
export interface DeleteFile200Response extends HttpResponse {
  status: "200";
  body: FileDeletionStatusOutput;
}

/** The request has succeeded. */
export interface RetrieveFile200Response extends HttpResponse {
  status: "200";
  body: FileOutput;
}

/** The request has succeeded. */
export interface RetrieveFileContent200Response extends HttpResponse {
  status: "200";
  body: string;
}
