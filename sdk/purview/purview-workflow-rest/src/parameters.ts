// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RequestParameters } from "@azure-rest/core-client";
import {
  WorkflowCreateOrUpdateCommand,
  UserRequestPayload,
  WorkflowRunCancelRequest,
  ApprovalResponseComment,
  ReassignCommand,
  TaskUpdateCommand,
} from "./models";

export type ListWorkflowsParameters = RequestParameters;
export type GetWorkflowParameters = RequestParameters;

export interface CreateOrReplaceWorkflowBodyParam {
  /** Create or update workflow payload. */
  body: WorkflowCreateOrUpdateCommand;
}

export interface CreateOrReplaceWorkflowMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type CreateOrReplaceWorkflowParameters = CreateOrReplaceWorkflowMediaTypesParam &
  CreateOrReplaceWorkflowBodyParam &
  RequestParameters;
export type DeleteWorkflowParameters = RequestParameters;

export interface SubmitUserRequestsBodyParam {
  /** The payload of submitting a user request. */
  body: UserRequestPayload;
}

export interface SubmitUserRequestsMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type SubmitUserRequestsParameters = SubmitUserRequestsMediaTypesParam &
  SubmitUserRequestsBodyParam &
  RequestParameters;

export interface ListWorkflowRunsQueryParamProperties {
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
  >;
  /** Filter items by workflow id list. */
  workflowIds?: Array<string>;
  /** The maximum page size to get the items at one time. */
  maxpagesize?: number;
}

export interface ListWorkflowRunsQueryParam {
  queryParameters?: ListWorkflowRunsQueryParamProperties;
}

export type ListWorkflowRunsParameters = ListWorkflowRunsQueryParam & RequestParameters;
export type GetWorkflowRunParameters = RequestParameters;

export interface CancelWorkflowRunBodyParam {
  /** Reply of canceling a workflow run. */
  body: WorkflowRunCancelRequest;
}

export interface CancelWorkflowRunMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type CancelWorkflowRunParameters = CancelWorkflowRunMediaTypesParam &
  CancelWorkflowRunBodyParam &
  RequestParameters;

export interface ListWorkflowTasksQueryParamProperties {
  /** To filter user's sent, received or history workflow tasks. */
  viewMode?: string;
  /** Filter items by workflow id list. */
  workflowIds?: Array<string>;
  /** Time window of filtering items. */
  timeWindow?: "1d" | "7d" | "30d" | "90d";
  /** The maximum page size to get the items at one time. */
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
  >;
  /** The key word which could used to filter workflow item with related workflow. */
  workflowNameKeyword?: string;
}

export interface ListWorkflowTasksQueryParam {
  queryParameters?: ListWorkflowTasksQueryParamProperties;
}

export type ListWorkflowTasksParameters = ListWorkflowTasksQueryParam & RequestParameters;
export type GetWorkflowTaskParameters = RequestParameters;

export interface ApproveApprovalTaskBodyParam {
  /** The request body of approving an approval request. */
  body: ApprovalResponseComment;
}

export interface ApproveApprovalTaskMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type ApproveApprovalTaskParameters = ApproveApprovalTaskMediaTypesParam &
  ApproveApprovalTaskBodyParam &
  RequestParameters;

export interface RejectApprovalTaskBodyParam {
  /** The request body of rejecting an approval request. */
  body: ApprovalResponseComment;
}

export interface RejectApprovalTaskMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type RejectApprovalTaskParameters = RejectApprovalTaskMediaTypesParam &
  RejectApprovalTaskBodyParam &
  RequestParameters;

export interface ReassignWorkflowTaskBodyParam {
  /** The request body of reassigning a workflow task. */
  body: ReassignCommand;
}

export interface ReassignWorkflowTaskMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type ReassignWorkflowTaskParameters = ReassignWorkflowTaskMediaTypesParam &
  ReassignWorkflowTaskBodyParam &
  RequestParameters;

export interface UpdateTaskStatusBodyParam {
  /** Request body of updating workflow task request. */
  body: TaskUpdateCommand;
}

export interface UpdateTaskStatusMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type UpdateTaskStatusParameters = UpdateTaskStatusMediaTypesParam &
  UpdateTaskStatusBodyParam &
  RequestParameters;
