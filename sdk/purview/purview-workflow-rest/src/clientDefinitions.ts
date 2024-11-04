// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  ListWorkflowsParameters,
  GetWorkflowParameters,
  CreateOrReplaceWorkflowParameters,
  DeleteWorkflowParameters,
  SubmitUserRequestsParameters,
  ListWorkflowRunsParameters,
  GetWorkflowRunParameters,
  CancelWorkflowRunParameters,
  ListWorkflowTasksParameters,
  GetWorkflowTaskParameters,
  ApproveApprovalTaskParameters,
  RejectApprovalTaskParameters,
  ReassignWorkflowTaskParameters,
  UpdateTaskStatusParameters,
} from "./parameters";
import {
  ListWorkflows200Response,
  ListWorkflowsDefaultResponse,
  GetWorkflow200Response,
  GetWorkflowDefaultResponse,
  CreateOrReplaceWorkflow200Response,
  CreateOrReplaceWorkflowDefaultResponse,
  DeleteWorkflow204Response,
  DeleteWorkflowDefaultResponse,
  SubmitUserRequests200Response,
  SubmitUserRequestsDefaultResponse,
  ListWorkflowRuns200Response,
  ListWorkflowRunsDefaultResponse,
  GetWorkflowRun200Response,
  GetWorkflowRunDefaultResponse,
  CancelWorkflowRun200Response,
  CancelWorkflowRunDefaultResponse,
  ListWorkflowTasks200Response,
  ListWorkflowTasksDefaultResponse,
  GetWorkflowTask200Response,
  GetWorkflowTaskDefaultResponse,
  ApproveApprovalTask200Response,
  ApproveApprovalTaskDefaultResponse,
  RejectApprovalTask200Response,
  RejectApprovalTaskDefaultResponse,
  ReassignWorkflowTask200Response,
  ReassignWorkflowTaskDefaultResponse,
  UpdateTaskStatus200Response,
  UpdateTaskStatusDefaultResponse,
} from "./responses";
import { Client, StreamableMethod } from "@azure-rest/core-client";

export interface ListWorkflows {
  /** List all workflows. */
  get(
    options?: ListWorkflowsParameters,
  ): StreamableMethod<ListWorkflows200Response | ListWorkflowsDefaultResponse>;
}

export interface GetWorkflow {
  /** Get a specific workflow. */
  get(
    options?: GetWorkflowParameters,
  ): StreamableMethod<GetWorkflow200Response | GetWorkflowDefaultResponse>;
  /** Create or replace a workflow. */
  put(
    options: CreateOrReplaceWorkflowParameters,
  ): StreamableMethod<CreateOrReplaceWorkflow200Response | CreateOrReplaceWorkflowDefaultResponse>;
  /** Delete a workflow. */
  delete(
    options?: DeleteWorkflowParameters,
  ): StreamableMethod<DeleteWorkflow204Response | DeleteWorkflowDefaultResponse>;
}

export interface SubmitUserRequests {
  /** Submit a user request for requestor, a user  request describes user ask to do operation(s) on Purview. If any workflow's trigger matches with an operation in request, a run of the workflow is created. */
  post(
    options: SubmitUserRequestsParameters,
  ): StreamableMethod<SubmitUserRequests200Response | SubmitUserRequestsDefaultResponse>;
}

export interface ListWorkflowRuns {
  /** List workflow runs. */
  get(
    options?: ListWorkflowRunsParameters,
  ): StreamableMethod<ListWorkflowRuns200Response | ListWorkflowRunsDefaultResponse>;
}

export interface GetWorkflowRun {
  /** Get a workflow run. */
  get(
    options?: GetWorkflowRunParameters,
  ): StreamableMethod<GetWorkflowRun200Response | GetWorkflowRunDefaultResponse>;
}

export interface CancelWorkflowRun {
  /** Cancel a workflow run. */
  post(
    options: CancelWorkflowRunParameters,
  ): StreamableMethod<CancelWorkflowRun200Response | CancelWorkflowRunDefaultResponse>;
}

export interface ListWorkflowTasks {
  /** Get all workflow tasks. */
  get(
    options?: ListWorkflowTasksParameters,
  ): StreamableMethod<ListWorkflowTasks200Response | ListWorkflowTasksDefaultResponse>;
}

export interface GetWorkflowTask {
  /** Get a workflow task. */
  get(
    options?: GetWorkflowTaskParameters,
  ): StreamableMethod<GetWorkflowTask200Response | GetWorkflowTaskDefaultResponse>;
}

export interface ApproveApprovalTask {
  /** Approve an approval task. */
  post(
    options: ApproveApprovalTaskParameters,
  ): StreamableMethod<ApproveApprovalTask200Response | ApproveApprovalTaskDefaultResponse>;
}

export interface RejectApprovalTask {
  /** Reject an approval task. */
  post(
    options: RejectApprovalTaskParameters,
  ): StreamableMethod<RejectApprovalTask200Response | RejectApprovalTaskDefaultResponse>;
}

export interface ReassignWorkflowTask {
  /** Reassign a workflow task. */
  post(
    options: ReassignWorkflowTaskParameters,
  ): StreamableMethod<ReassignWorkflowTask200Response | ReassignWorkflowTaskDefaultResponse>;
}

export interface UpdateTaskStatus {
  /** Update the status of a workflow task request. */
  post(
    options: UpdateTaskStatusParameters,
  ): StreamableMethod<UpdateTaskStatus200Response | UpdateTaskStatusDefaultResponse>;
}

export interface Routes {
  /** Resource for '/workflows' has methods for the following verbs: get */
  (path: "/workflows"): ListWorkflows;
  /** Resource for '/workflows/\{workflowId\}' has methods for the following verbs: get, put, delete */
  (path: "/workflows/{workflowId}", workflowId: string): GetWorkflow;
  /** Resource for '/userrequests' has methods for the following verbs: post */
  (path: "/userrequests"): SubmitUserRequests;
  /** Resource for '/workflowruns' has methods for the following verbs: get */
  (path: "/workflowruns"): ListWorkflowRuns;
  /** Resource for '/workflowruns/\{workflowRunId\}' has methods for the following verbs: get */
  (path: "/workflowruns/{workflowRunId}", workflowRunId: string): GetWorkflowRun;
  /** Resource for '/workflowruns/\{workflowRunId\}/cancel' has methods for the following verbs: post */
  (path: "/workflowruns/{workflowRunId}/cancel", workflowRunId: string): CancelWorkflowRun;
  /** Resource for '/workflowtasks' has methods for the following verbs: get */
  (path: "/workflowtasks"): ListWorkflowTasks;
  /** Resource for '/workflowtasks/\{taskId\}' has methods for the following verbs: get */
  (path: "/workflowtasks/{taskId}", taskId: string): GetWorkflowTask;
  /** Resource for '/workflowtasks/\{taskId\}/approve-approval' has methods for the following verbs: post */
  (path: "/workflowtasks/{taskId}/approve-approval", taskId: string): ApproveApprovalTask;
  /** Resource for '/workflowtasks/\{taskId\}/reject-approval' has methods for the following verbs: post */
  (path: "/workflowtasks/{taskId}/reject-approval", taskId: string): RejectApprovalTask;
  /** Resource for '/workflowtasks/\{taskId\}/reassign' has methods for the following verbs: post */
  (path: "/workflowtasks/{taskId}/reassign", taskId: string): ReassignWorkflowTask;
  /** Resource for '/workflowtasks/\{taskId\}/change-task-status' has methods for the following verbs: post */
  (path: "/workflowtasks/{taskId}/change-task-status", taskId: string): UpdateTaskStatus;
}

export type PurviewWorkflowClient = Client & {
  path: Routes;
};
