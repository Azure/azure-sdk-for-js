// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  WorkflowsListParameters,
  WorkflowGetParameters,
  WorkflowCreateOrReplaceParameters,
  WorkflowDeleteParameters,
  WorkflowValidateParameters,
  UserRequestsSubmitParameters,
  WorkflowRunsListParameters,
  WorkflowRunGetParameters,
  WorkflowRunCancelParameters,
  WorkflowTasksListParameters,
  WorkflowTaskGetParameters,
  WorkflowTaskReassignParameters,
  ApprovalApproveParameters,
  ApprovalRejectParameters,
  TaskStatusUpdateParameters,
} from "./parameters";
import {
  WorkflowsList200Response,
  WorkflowsListDefaultResponse,
  WorkflowGet200Response,
  WorkflowGetDefaultResponse,
  WorkflowCreateOrReplace200Response,
  WorkflowCreateOrReplaceDefaultResponse,
  WorkflowDelete204Response,
  WorkflowDeleteDefaultResponse,
  WorkflowValidate200Response,
  WorkflowValidateDefaultResponse,
  UserRequestsSubmit200Response,
  UserRequestsSubmitDefaultResponse,
  WorkflowRunsList200Response,
  WorkflowRunsListDefaultResponse,
  WorkflowRunGet200Response,
  WorkflowRunGetDefaultResponse,
  WorkflowRunCancel200Response,
  WorkflowRunCancelDefaultResponse,
  WorkflowTasksList200Response,
  WorkflowTasksListDefaultResponse,
  WorkflowTaskGet200Response,
  WorkflowTaskGetDefaultResponse,
  WorkflowTaskReassign200Response,
  WorkflowTaskReassignDefaultResponse,
  ApprovalApprove200Response,
  ApprovalApproveDefaultResponse,
  ApprovalReject200Response,
  ApprovalRejectDefaultResponse,
  TaskStatusUpdate200Response,
  TaskStatusUpdateDefaultResponse,
} from "./responses";
import { Client, StreamableMethod } from "@azure-rest/core-client";

export interface WorkflowsList {
  /** List all workflows. */
  get(
    options?: WorkflowsListParameters
  ): StreamableMethod<WorkflowsList200Response | WorkflowsListDefaultResponse>;
}

export interface WorkflowGet {
  /** Get a specific workflow. */
  get(
    options?: WorkflowGetParameters
  ): StreamableMethod<WorkflowGet200Response | WorkflowGetDefaultResponse>;
  /** Create or replace a workflow. */
  put(
    options: WorkflowCreateOrReplaceParameters
  ): StreamableMethod<WorkflowCreateOrReplace200Response | WorkflowCreateOrReplaceDefaultResponse>;
  /** Delete a workflow. */
  delete(
    options?: WorkflowDeleteParameters
  ): StreamableMethod<WorkflowDelete204Response | WorkflowDeleteDefaultResponse>;
}

export interface WorkflowValidate {
  /** Validate a workflow. */
  post(
    options: WorkflowValidateParameters
  ): StreamableMethod<WorkflowValidate200Response | WorkflowValidateDefaultResponse>;
}

export interface UserRequestsSubmit {
  /** Submit a user request for requestor, a user  request describes user ask to do operation(s) on Purview. If any workflow's trigger matches with an operation in request, a run of the workflow is created. */
  post(
    options: UserRequestsSubmitParameters
  ): StreamableMethod<UserRequestsSubmit200Response | UserRequestsSubmitDefaultResponse>;
}

export interface WorkflowRunsList {
  /** List workflow runs. */
  get(
    options?: WorkflowRunsListParameters
  ): StreamableMethod<WorkflowRunsList200Response | WorkflowRunsListDefaultResponse>;
}

export interface WorkflowRunGet {
  /** Get a workflow run. */
  get(
    options?: WorkflowRunGetParameters
  ): StreamableMethod<WorkflowRunGet200Response | WorkflowRunGetDefaultResponse>;
}

export interface WorkflowRunCancel {
  /** Cancel a workflow run. */
  post(
    options: WorkflowRunCancelParameters
  ): StreamableMethod<WorkflowRunCancel200Response | WorkflowRunCancelDefaultResponse>;
}

export interface WorkflowTasksList {
  /** Get all workflow tasks. */
  get(
    options?: WorkflowTasksListParameters
  ): StreamableMethod<WorkflowTasksList200Response | WorkflowTasksListDefaultResponse>;
}

export interface WorkflowTaskGet {
  /** Get a workflow task. */
  get(
    options?: WorkflowTaskGetParameters
  ): StreamableMethod<WorkflowTaskGet200Response | WorkflowTaskGetDefaultResponse>;
}

export interface WorkflowTaskReassign {
  /** Reassign a workflow task. */
  post(
    options: WorkflowTaskReassignParameters
  ): StreamableMethod<WorkflowTaskReassign200Response | WorkflowTaskReassignDefaultResponse>;
}

export interface ApprovalApprove {
  /** Approve an approval. */
  post(
    options: ApprovalApproveParameters
  ): StreamableMethod<ApprovalApprove200Response | ApprovalApproveDefaultResponse>;
}

export interface ApprovalReject {
  /** Reject an approval. */
  post(
    options: ApprovalRejectParameters
  ): StreamableMethod<ApprovalReject200Response | ApprovalRejectDefaultResponse>;
}

export interface TaskStatusUpdate {
  /** Update the status of a workflow task request. */
  post(
    options: TaskStatusUpdateParameters
  ): StreamableMethod<TaskStatusUpdate200Response | TaskStatusUpdateDefaultResponse>;
}

export interface Routes {
  /** Resource for '/workflows' has methods for the following verbs: get */
  (path: "/workflows"): WorkflowsList;
  /** Resource for '/workflows/\{workflowId\}' has methods for the following verbs: get, put, delete */
  (path: "/workflows/{workflowId}", workflowId: string): WorkflowGet;
  /** Resource for '/workflows/\{workflowId\}/validate' has methods for the following verbs: post */
  (path: "/workflows/{workflowId}/validate", workflowId: string): WorkflowValidate;
  /** Resource for '/userrequests' has methods for the following verbs: post */
  (path: "/userrequests"): UserRequestsSubmit;
  /** Resource for '/workflowruns' has methods for the following verbs: get */
  (path: "/workflowruns"): WorkflowRunsList;
  /** Resource for '/workflowruns/\{workflowRunId\}' has methods for the following verbs: get */
  (path: "/workflowruns/{workflowRunId}", workflowRunId: string): WorkflowRunGet;
  /** Resource for '/workflowruns/\{workflowRunId\}/cancel' has methods for the following verbs: post */
  (path: "/workflowruns/{workflowRunId}/cancel", workflowRunId: string): WorkflowRunCancel;
  /** Resource for '/workflowtasks' has methods for the following verbs: get */
  (path: "/workflowtasks"): WorkflowTasksList;
  /** Resource for '/workflowtasks/\{taskId\}' has methods for the following verbs: get */
  (path: "/workflowtasks/{taskId}", taskId: string): WorkflowTaskGet;
  /** Resource for '/workflowtasks/\{taskId\}/reassign' has methods for the following verbs: post */
  (path: "/workflowtasks/{taskId}/reassign", taskId: string): WorkflowTaskReassign;
  /** Resource for '/workflowtasks/\{taskId\}/approve-approval' has methods for the following verbs: post */
  (path: "/workflowtasks/{taskId}/approve-approval", taskId: string): ApprovalApprove;
  /** Resource for '/workflowtasks/\{taskId\}/reject-approval' has methods for the following verbs: post */
  (path: "/workflowtasks/{taskId}/reject-approval", taskId: string): ApprovalReject;
  /** Resource for '/workflowtasks/\{taskId\}/change-task-status' has methods for the following verbs: post */
  (path: "/workflowtasks/{taskId}/change-task-status", taskId: string): TaskStatusUpdate;
}

export type PurviewWorkflowClient = Client & {
  path: Routes;
};
