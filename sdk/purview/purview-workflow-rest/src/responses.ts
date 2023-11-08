// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { HttpResponse } from "@azure-rest/core-client";
import {
  WorkflowMetadataListOutput,
  ErrorResponseOutput,
  WorkflowOutput,
  WorkflowValidationRuleViolationsListOutput,
  UserRequestResponseOutput,
  WorkflowRunListOutput,
  WorkflowRunOutput,
  TasksListOutput,
  WorkflowTaskOutput,
} from "./outputModels";

/** List all workflows. */
export interface WorkflowsList200Response extends HttpResponse {
  status: "200";
  body: WorkflowMetadataListOutput;
}

/** List all workflows. */
export interface WorkflowsListDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Get a specific workflow. */
export interface WorkflowGet200Response extends HttpResponse {
  status: "200";
  body: WorkflowOutput;
}

/** Get a specific workflow. */
export interface WorkflowGetDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Create or replace a workflow. */
export interface WorkflowCreateOrReplace200Response extends HttpResponse {
  status: "200";
  body: WorkflowOutput;
}

/** Create or replace a workflow. */
export interface WorkflowCreateOrReplaceDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Delete a workflow. */
export interface WorkflowDelete204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** Delete a workflow. */
export interface WorkflowDeleteDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Validate a workflow. */
export interface WorkflowValidate200Response extends HttpResponse {
  status: "200";
  body: WorkflowValidationRuleViolationsListOutput;
}

/** Validate a workflow. */
export interface WorkflowValidateDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Submit a user request for requestor, a user  request describes user ask to do operation(s) on Purview. If any workflow's trigger matches with an operation in request, a run of the workflow is created. */
export interface UserRequestsSubmit200Response extends HttpResponse {
  status: "200";
  body: UserRequestResponseOutput;
}

/** Submit a user request for requestor, a user  request describes user ask to do operation(s) on Purview. If any workflow's trigger matches with an operation in request, a run of the workflow is created. */
export interface UserRequestsSubmitDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** List workflow runs. */
export interface WorkflowRunsList200Response extends HttpResponse {
  status: "200";
  body: WorkflowRunListOutput;
}

/** List workflow runs. */
export interface WorkflowRunsListDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Get a workflow run. */
export interface WorkflowRunGet200Response extends HttpResponse {
  status: "200";
  body: WorkflowRunOutput;
}

/** Get a workflow run. */
export interface WorkflowRunGetDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Cancel a workflow run. */
export interface WorkflowRunCancel200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Cancel a workflow run. */
export interface WorkflowRunCancelDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Get all workflow tasks. */
export interface WorkflowTasksList200Response extends HttpResponse {
  status: "200";
  body: TasksListOutput;
}

/** Get all workflow tasks. */
export interface WorkflowTasksListDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Get a workflow task. */
export interface WorkflowTaskGet200Response extends HttpResponse {
  status: "200";
  body: WorkflowTaskOutput;
}

/** Get a workflow task. */
export interface WorkflowTaskGetDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Reassign a workflow task. */
export interface WorkflowTaskReassign200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Reassign a workflow task. */
export interface WorkflowTaskReassignDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Approve an approval. */
export interface ApprovalApprove200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Approve an approval. */
export interface ApprovalApproveDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Reject an approval. */
export interface ApprovalReject200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Reject an approval. */
export interface ApprovalRejectDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Update the status of a workflow task request. */
export interface TaskStatusUpdate200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Update the status of a workflow task request. */
export interface TaskStatusUpdateDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}
