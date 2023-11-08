// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { RequestParameters } from "@azure-rest/core-client";
import {
  WorkflowCreateOrUpdateCommand,
  UserRequestPayload,
  WorkflowRunCancelRequest,
  ReassignCommand,
  ApprovalResponseComment,
  TaskUpdateCommand,
} from "./models";

export type WorkflowsListParameters = RequestParameters;
export type WorkflowGetParameters = RequestParameters;

export interface WorkflowCreateOrReplaceBodyParam {
  /** Create or update workflow payload. */
  body: WorkflowCreateOrUpdateCommand;
}

export interface WorkflowCreateOrReplaceMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type WorkflowCreateOrReplaceParameters = WorkflowCreateOrReplaceMediaTypesParam &
  WorkflowCreateOrReplaceBodyParam &
  RequestParameters;
export type WorkflowDeleteParameters = RequestParameters;

export interface WorkflowValidateBodyParam {
  /** Check workflow payload. */
  body: WorkflowCreateOrUpdateCommand;
}

export interface WorkflowValidateMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type WorkflowValidateParameters = WorkflowValidateMediaTypesParam &
  WorkflowValidateBodyParam &
  RequestParameters;

export interface UserRequestsSubmitBodyParam {
  /** The payload of submitting a user request. */
  body: UserRequestPayload;
}

export interface UserRequestsSubmitMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type UserRequestsSubmitParameters = UserRequestsSubmitMediaTypesParam &
  UserRequestsSubmitBodyParam &
  RequestParameters;

export interface WorkflowRunsListQueryParamProperties {
  /** To filter user's workflow runs or view as admin. */
  viewMode?: string;
  /** Time window of filtering items. */
  timeWindow?: "1d" | "7d" | "30d" | "90d";
  /** The key word which used to sort the results. */
  orderby?:
    | "status desc"
    | "status asc"
    | "requestor desc"
    | "requestor asc"
    | "startTime desc"
    | "startTime asc"
    | "createdTime desc"
    | "createdTime asc";
  /** Filter workflow runs by workflow run status. */
  runStatuses?: Array<
    | "InProgress"
    | "Failed"
    | "Completed"
    | "NotStarted"
    | "Canceling"
    | "CancellationFailed"
    | "Canceled"
    | "Pending"
    | "Approved"
    | "Rejected"
    | "sent"
    | "received"
    | "history"
    | "mine"
    | "admin"
  >;
  /** Filter items by workflow id list. */
  workflowIds?: Array<string>;
  /** Requestors' ids to filter. */
  requestors?: Array<string>;
  /** The maximum page size to get the items at one time. The default value is 100. */
  maxpagesize?: number;
}

export interface WorkflowRunsListQueryParam {
  queryParameters?: WorkflowRunsListQueryParamProperties;
}

export type WorkflowRunsListParameters = WorkflowRunsListQueryParam & RequestParameters;
export type WorkflowRunGetParameters = RequestParameters;

export interface WorkflowRunCancelBodyParam {
  /** Reply of canceling a workflow run. */
  body: WorkflowRunCancelRequest;
}

export interface WorkflowRunCancelMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type WorkflowRunCancelParameters = WorkflowRunCancelMediaTypesParam &
  WorkflowRunCancelBodyParam &
  RequestParameters;

export interface WorkflowTasksListQueryParamProperties {
  /** To filter user's sent, received or history workflow tasks. */
  viewMode?: string;
  /** Filter items by workflow id list. */
  workflowIds?: Array<string>;
  /** Time window of filtering items. */
  timeWindow?: "1d" | "7d" | "30d" | "90d";
  /** The maximum page size to get the items at one time. The default value is 100. */
  maxpagesize?: number;
  /** The key word which used to sort the results. */
  orderby?:
    | "status desc"
    | "status asc"
    | "requestor desc"
    | "requestor asc"
    | "startTime desc"
    | "startTime asc"
    | "createdTime desc"
    | "createdTime asc";
  /** Filter items by workflow task type. */
  taskTypes?: Array<"Approval" | "SimpleTask" | "approval" | "simpleTask">;
  /** Filter workflow tasks by status. */
  taskStatuses?: Array<
    | "InProgress"
    | "Failed"
    | "Completed"
    | "NotStarted"
    | "Canceling"
    | "CancellationFailed"
    | "Canceled"
    | "Pending"
    | "Approved"
    | "Rejected"
    | "sent"
    | "received"
    | "history"
    | "mine"
    | "admin"
  >;
  /** Requestors' ids to filter. */
  requestors?: Array<string>;
  /** Assignees' ids to filter. */
  assignees?: Array<string>;
  /** The key word which could used to filter workflow item with related workflow. */
  workflowNameKeyword?: string;
}

export interface WorkflowTasksListQueryParam {
  queryParameters?: WorkflowTasksListQueryParamProperties;
}

export type WorkflowTasksListParameters = WorkflowTasksListQueryParam & RequestParameters;
export type WorkflowTaskGetParameters = RequestParameters;

export interface WorkflowTaskReassignBodyParam {
  /** The request body of reassigning a workflow task. */
  body: ReassignCommand;
}

export interface WorkflowTaskReassignMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type WorkflowTaskReassignParameters = WorkflowTaskReassignMediaTypesParam &
  WorkflowTaskReassignBodyParam &
  RequestParameters;

export interface ApprovalApproveBodyParam {
  /** The request body of approving an approval type of workflow task. */
  body: ApprovalResponseComment;
}

export interface ApprovalApproveMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type ApprovalApproveParameters = ApprovalApproveMediaTypesParam &
  ApprovalApproveBodyParam &
  RequestParameters;

export interface ApprovalRejectBodyParam {
  /** The request body of rejecting an approval type of workflow task. */
  body: ApprovalResponseComment;
}

export interface ApprovalRejectMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type ApprovalRejectParameters = ApprovalRejectMediaTypesParam &
  ApprovalRejectBodyParam &
  RequestParameters;

export interface TaskStatusUpdateBodyParam {
  /** Request body of updating workflow task request. */
  body: TaskUpdateCommand;
}

export interface TaskStatusUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type TaskStatusUpdateParameters = TaskStatusUpdateMediaTypesParam &
  TaskStatusUpdateBodyParam &
  RequestParameters;
