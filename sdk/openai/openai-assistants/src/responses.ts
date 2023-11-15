// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { HttpResponse } from "@azure-rest/core-client";
import {
  AssistantOutput,
  OpenAIListResponseOfOutput,
  AssistantDeletionStatusOutput,
  AssistantFileOutput,
  AssistantFileDeletionStatusOutput,
  AssistantThreadOutput,
  AssistantThreadDeletionStatusOutput,
  AssistantThreadMessageOutput,
  AssistantThreadMessageFileOutput,
  AssistantThreadRunOutput,
  AssistantThreadRunStepOutput,
} from "./outputModels";

/** The request has succeeded. */
export interface CreateAssistant200Response extends HttpResponse {
  status: "200";
  body: AssistantOutput;
}

/** The request has succeeded. */
export interface ListAssistants200Response extends HttpResponse {
  status: "200";
  body: OpenAIListResponseOfOutput;
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
  body: OpenAIListResponseOfOutput;
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
  body: AssistantThreadDeletionStatusOutput;
}

/** The request has succeeded. */
export interface CreateThreadMessage200Response extends HttpResponse {
  status: "200";
  body: AssistantThreadMessageOutput;
}

/** The request has succeeded. */
export interface ListThreadMessages200Response extends HttpResponse {
  status: "200";
  body: OpenAIListResponseOfOutput;
}

/** The request has succeeded. */
export interface RetrieveThreadMessage200Response extends HttpResponse {
  status: "200";
  body: AssistantThreadMessageOutput;
}

/** The request has succeeded. */
export interface ModifyThreadMessage200Response extends HttpResponse {
  status: "200";
  body: AssistantThreadMessageOutput;
}

/** The request has succeeded. */
export interface ListThreadMessageFiles200Response extends HttpResponse {
  status: "200";
  body: OpenAIListResponseOfOutput;
}

/** The request has succeeded. */
export interface RetrieveThreadMessageFile200Response extends HttpResponse {
  status: "200";
  body: AssistantThreadMessageFileOutput;
}

/** The request has succeeded. */
export interface CreateRun200Response extends HttpResponse {
  status: "200";
  body: AssistantThreadRunOutput;
}

/** The request has succeeded. */
export interface ListRuns200Response extends HttpResponse {
  status: "200";
  body: OpenAIListResponseOfOutput;
}

/** The request has succeeded. */
export interface RetrieveRun200Response extends HttpResponse {
  status: "200";
  body: AssistantThreadRunOutput;
}

/** The request has succeeded. */
export interface ModifyRun200Response extends HttpResponse {
  status: "200";
  body: AssistantThreadRunOutput;
}

/** The request has succeeded. */
export interface SubmitRunToolOutputs200Response extends HttpResponse {
  status: "200";
  body: AssistantThreadRunOutput;
}

/** The request has succeeded. */
export interface CancelRun200Response extends HttpResponse {
  status: "200";
  body: AssistantThreadRunOutput;
}

/** The request has succeeded. */
export interface CreateThreadAndRun200Response extends HttpResponse {
  status: "200";
  body: AssistantThreadRunOutput;
}

/** The request has succeeded. */
export interface RetrieveRunStep200Response extends HttpResponse {
  status: "200";
  body: AssistantThreadRunStepOutput;
}

/** The request has succeeded. */
export interface ListRunSteps200Response extends HttpResponse {
  status: "200";
  body: OpenAIListResponseOfOutput;
}
