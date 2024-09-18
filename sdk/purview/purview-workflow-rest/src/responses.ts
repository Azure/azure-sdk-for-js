// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HttpResponse } from "@azure-rest/core-client";
import {
  WorkflowMetadataListOutput,
  ErrorResponseOutput,
  WorkflowOutput,
  UserRequestResponseOutput,
  WorkflowRunListOutput,
  WorkflowRunOutput,
  TasksListOutput,
  WorkflowTaskOutput,
} from "./outputModels";

/** List all workflows. */
export interface ListWorkflows200Response extends HttpResponse {
  status: "200";
  body: WorkflowMetadataListOutput;
}

/** List all workflows. */
export interface ListWorkflowsDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Get a specific workflow. */
export interface GetWorkflow200Response extends HttpResponse {
  status: "200";
  body: WorkflowOutput;
}

/** Get a specific workflow. */
export interface GetWorkflowDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Create or replace a workflow. */
export interface CreateOrReplaceWorkflow200Response extends HttpResponse {
  status: "200";
  body: WorkflowOutput;
}

/** Create or replace a workflow. */
export interface CreateOrReplaceWorkflowDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Delete a workflow. */
export interface DeleteWorkflow204Response extends HttpResponse {
  status: "204";
}

/** Delete a workflow. */
export interface DeleteWorkflowDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Submit a user request for requestor, a user  request describes user ask to do operation(s) on Purview. If any workflow's trigger matches with an operation in request, a run of the workflow is created. */
export interface SubmitUserRequests200Response extends HttpResponse {
  status: "200";
  body: UserRequestResponseOutput;
}

/** Submit a user request for requestor, a user  request describes user ask to do operation(s) on Purview. If any workflow's trigger matches with an operation in request, a run of the workflow is created. */
export interface SubmitUserRequestsDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** List workflow runs. */
export interface ListWorkflowRuns200Response extends HttpResponse {
  status: "200";
  body: WorkflowRunListOutput;
}

/** List workflow runs. */
export interface ListWorkflowRunsDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Get a workflow run. */
export interface GetWorkflowRun200Response extends HttpResponse {
  status: "200";
  body: WorkflowRunOutput;
}

/** Get a workflow run. */
export interface GetWorkflowRunDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Cancel a workflow run. */
export interface CancelWorkflowRun200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Cancel a workflow run. */
export interface CancelWorkflowRunDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Get all workflow tasks. */
export interface ListWorkflowTasks200Response extends HttpResponse {
  status: "200";
  body: TasksListOutput;
}

/** Get all workflow tasks. */
export interface ListWorkflowTasksDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Get a workflow task. */
export interface GetWorkflowTask200Response extends HttpResponse {
  status: "200";
  body: WorkflowTaskOutput;
}

/** Get a workflow task. */
export interface GetWorkflowTaskDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Approve an approval task. */
export interface ApproveApprovalTask200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Approve an approval task. */
export interface ApproveApprovalTaskDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Reject an approval task. */
export interface RejectApprovalTask200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Reject an approval task. */
export interface RejectApprovalTaskDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Reassign a workflow task. */
export interface ReassignWorkflowTask200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Reassign a workflow task. */
export interface ReassignWorkflowTaskDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Update the status of a workflow task request. */
export interface UpdateTaskStatus200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Update the status of a workflow task request. */
export interface UpdateTaskStatusDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}
