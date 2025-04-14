// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/** The workflow list. */
export interface WorkflowMetadataListOutput {
  /** The value of workflow list. */
  value: Array<WorkflowMetadataOutput>;
  /** The URL to get the next set of results. */
  nextLink?: string;
}

/** The workflow metadata, action DAGs are not included. */
export interface WorkflowMetadataOutput {
  /**
   * The id of workflow.
   *
   * Value may contain a UUID
   */
  id: string;
  /** It describes under what condition a workflow will run.  */
  triggers: Array<TriggerOutput>;
  /** The created time of workflow. */
  createdTime?: string;
  /** The person who created the workflow. */
  createdBy?: string;
  /** The last update time. */
  lastUpdateTime?: string;
  /** The person who updated the workflow. */
  updatedBy?: string;
  /** The name of a workflow. */
  name: string;
  /** Whether the workflow is enabled or not. */
  isEnabled: boolean;
  /** Description of a workflow. */
  description: string;
}

/** Describes under what condition a workflow will run. */
export interface TriggerOutput {
  type:
    | "when_term_creation_is_requested"
    | "when_term_deletion_is_requested"
    | "when_term_update_is_requested"
    | "when_terms_import_is_requested"
    | "when_data_access_grant_is_requested"
    | "when_asset_update_is_requested";
  /** Glossary term hierarchy path. */
  underGlossaryHierarchy?: string;
  /** The collection name. */
  underCollection?: string;
  /** The glossary guid. */
  underGlossary?: string;
}

/** Default error response model */
export interface ErrorResponseOutput {
  /** Default error model */
  error: ErrorModelOutput;
}

/** Default error model */
export interface ErrorModelOutput {
  /** Gets or sets the code. */
  code: string;
  /** Gets or sets the details. */
  details?: Array<ErrorModelOutput>;
  /** Gets or sets the messages. */
  message: string;
  /** Gets or sets the target. */
  target?: string;
}

/** The workflow properties. It includes the triggers, actual flow and other properties of a workflow. */
export interface WorkflowOutput extends WorkflowMetadataOutput {
  /** The action DAG(Directed Acyclic Graph), it defines steps to be executed in a workflow run and their order. */
  actionDag: Record<string, unknown>;
}

/** Describes user ask to do operation(s) on Purview. */
export interface UserRequestResponseOutput {
  /**
   * The user request id.
   *
   * Value may contain a UUID
   */
  requestId: string;
  /**
   * The person who submitted the user request.
   *
   * Value may contain a UUID
   */
  requestor: string;
  /** The list of operations user want to submit, each operation matches one Purview API call and will do the operation directly. */
  operations: Array<UserRequestResponseOperationsItemOutput>;
  /** The comment when submit a user request. */
  comment?: string;
  /** The status. */
  status:
    | "NotStarted"
    | "InProgress"
    | "Failed"
    | "Completed"
    | "Canceling"
    | "CancellationFailed"
    | "Canceled";
}

/** The operation user wants to perform. */
export interface UserRequestResponseOperationsItemOutput {
  /** The operation type. */
  type:
    | "CreateTerm"
    | "UpdateTerm"
    | "DeleteTerm"
    | "ImportTerms"
    | "UpdateAsset"
    | "GrantDataAccess";
  /** The payload of each operation which user want to submit. */
  payload: Record<string, unknown>;
  workflowRunIds?: Array<string>;
}

export interface WorkflowRunListOutput {
  /** The value of workflow run list. */
  value: Array<WorkflowRunMetadataOutput>;
  /** The URL to get the next set of results. */
  nextLink?: string;
}

/** The execution of a workflow. It includes status of the entire run and other properties of a run. */
export interface WorkflowRunMetadataOutput {
  /**
   * The workflow run id.
   *
   * Value may contain a UUID
   */
  id: string;
  /**
   * The workflow id.
   *
   * Value may contain a UUID
   */
  workflowId: string;
  /** Workflow run start time. */
  startTime: string;
  /**
   * The person who submitted the user request.
   *
   * Value may contain a UUID
   */
  requestor: string;
  /**
   * The user request id.
   *
   * Value may contain a UUID
   */
  userRequestId?: string;
  /** The input of a workflow run. Align with operation in user request. */
  runPayload: WorkflowRunPayloadOutput;
  /** The status. */
  status:
    | "NotStarted"
    | "InProgress"
    | "Failed"
    | "Completed"
    | "Canceling"
    | "CancellationFailed"
    | "Canceled";
  /** The time of workflow run completed. */
  endTime?: string;
  /** The time of workflow run be canceled. */
  cancelTime?: string;
  /** The comment when cancel a workflow run. */
  cancelComment?: string;
}

/** The input of a workflow run. Align with operation in user request. */
export interface WorkflowRunPayloadOutput {
  /** The workflow run payload type. */
  type:
    | "CreateTerm"
    | "UpdateTerm"
    | "DeleteTerm"
    | "ImportTerms"
    | "UpdateAsset"
    | "GrantDataAccess";
  /** The target value which need involve workflow to update. */
  targetValue: string;
}

/** The execution of a workflow. It includes workflow action DAG at run time (action DAG snapshot), run payload, status of the entire run and other properties of a run. */
export interface WorkflowRunOutput {
  /**
   * The workflow run id.
   *
   * Value may contain a UUID
   */
  id?: string;
  /**
   * The workflow id.
   *
   * Value may contain a UUID
   */
  workflowId?: string;
  /** Workflow run start time. */
  startTime?: string;
  /**
   * The person who submitted the user request.
   *
   * Value may contain a UUID
   */
  requestor?: string;
  /**
   * The user request id.
   *
   * Value may contain a UUID
   */
  userRequestId?: string;
  /** The input of a workflow run. Align with operation in user request. */
  runPayload?: WorkflowRunRunPayloadOutput;
  /** The status. */
  status?:
    | "NotStarted"
    | "InProgress"
    | "Failed"
    | "Completed"
    | "Canceling"
    | "CancellationFailed"
    | "Canceled";
  /** The time of workflow run completed. */
  endTime?: string;
  /** The time of workflow run be canceled. */
  cancelTime?: string;
  /** The comment when cancel a workflow run. */
  cancelComment?: string;
  /** The action DAG(Directed Acyclic Graph), it defines actual flow. */
  actionDag: Record<string, unknown>;
  /** It refers to the "detail" property of a workflow run object, which contains run context and runtime information of actions. */
  detail: WorkflowRunDetailOutput;
}

/** The input of a workflow run. Align with operation in user request. */
export interface WorkflowRunRunPayloadOutput {
  /** The workflow run payload type. */
  type:
    | "CreateTerm"
    | "UpdateTerm"
    | "DeleteTerm"
    | "ImportTerms"
    | "UpdateAsset"
    | "GrantDataAccess";
  /** The target value which need involve workflow to update. */
  targetValue: string;
  /** The payload of each operation which user want to submit. */
  payload: Record<string, unknown>;
}

/** It refers to the "detail" property of a workflow run object, which contains run context and runtime information of actions. */
export interface WorkflowRunDetailOutput {
  /** Built-in variables starts with @runInput. Its properties are determined by trigger type at workflow run time. */
  runInput: Record<string, unknown>;
  /** Any object */
  actions: Record<string, unknown>;
}

export interface TasksListOutput {
  /** The value of workflow tasks list. */
  value: Array<WorkflowTaskOutput>;
  /** The URL to get the next set of results. */
  nextLink?: string;
}

/** An actionable item assigned to assignees. It is created when approval or task action starts to execute. Approval is one kind of task. */
export interface WorkflowTaskOutputParent {
  /**
   * The workflow task id.
   *
   * Value may contain a UUID
   */
  id: string;
  /** The workflow task title. */
  title?: string;
  /**
   * The workflow run id.
   *
   * Value may contain a UUID
   */
  workflowRunId: string;
  /**
   * The workflow id.
   *
   * Value may contain a UUID
   */
  workflowId: string;
  /**
   * The person who submitted the user request.
   *
   * Value may contain a UUID
   */
  requestor: string;
  /** The created time. */
  createdTime: string;
  /** The last update time. */
  lastUpdateTime: string;
  /** Info and material that helps assignees to take action. */
  payload: TaskPayloadOutput;
  /** Info of task reminder. */
  reminderInfo?: WorkflowTaskReminderInfoOutput;
  /** Info of task expiry. */
  expiryInfo?: WorkflowTaskExpiryInfoOutput;
  type: "WorkflowTask" | "Approval" | "SimpleTask";
}

/** Info and material that helps assignees to take action. */
export interface TaskPayloadOutput {
  /** The task payload type. */
  type:
    | "CreateTerm"
    | "UpdateTerm"
    | "DeleteTerm"
    | "ImportTerms"
    | "UpdateAsset"
    | "GrantDataAccess";
  /** The target value of entity which user want to involve workflow to update. */
  targetValue: string;
  /** The payload of the task. */
  payload?: Record<string, unknown>;
}

/** Info of task reminder. */
export interface WorkflowTaskReminderInfoOutput {
  /** The last update time. */
  lastRemindTime?: string;
  /** The next remind time. */
  nextRemindTime: string;
  /** The reminder settings. */
  reminderSettings: Record<string, unknown>;
}

/** Info of task expiry. */
export interface WorkflowTaskExpiryInfoOutput {
  /** The last expiry notification time. */
  lastExpiryNotificationTime?: string;
  /** The next expiry notification time. */
  nextExpiryNotificationTime: string;
  /** The expiry time. */
  expiryTime: string;
  expirySettings: WorkflowTaskExpiryInfoExpirySettingsOutput;
}

export interface WorkflowTaskExpiryInfoExpirySettingsOutput {
  /** The time of expiry. */
  expireAfter: Record<string, unknown>;
  notifyOnExpiration?: Array<string>;
}

/** The workflow approval task properties. */
export interface ApprovalOutput extends WorkflowTaskOutputParent {
  /** The approval task details */
  approvalDetail?: ApprovalDetailOutput;
  type: "Approval";
}

/** The approval task details */
export interface ApprovalDetailOutput {
  /** The approval type of an approval task. */
  approvalType: "PendingOnAny" | "PendingOnAll";
  /** The status of an approval task. */
  status: "Pending" | "Approved" | "Rejected" | "Canceled";
  /** The list of approvers with reply. */
  approvers: Record<string, ApproverResponseOutput>;
}

/** The response of approvers for a workflow task. */
export interface ApproverResponseOutput {
  /** The response for an approval task. */
  reply: "Approved" | "Rejected" | "Pending";
  /** The comment of approving or rejecting an approval request. */
  comment?: string;
  /** The reply time of approver to a workflow task. */
  responseTime?: string;
}

/** The workflow simple task properties. */
export interface SimpleTaskOutput extends WorkflowTaskOutputParent {
  /** Workflow simple task details. */
  taskDetail?: SimpleTaskDetailOutput;
  type: "SimpleTask";
}

/** Workflow simple task details. */
export interface SimpleTaskDetailOutput {
  /** The simple task body. */
  taskBody: string;
  /** The users or groups were assigned the simple task. */
  assignedTo: Array<string>;
  /** Simple task status. */
  status: "NotStarted" | "InProgress" | "Completed" | "Canceled";
  changeHistory: Array<Record<string, unknown>>;
}

/** An actionable item assigned to assignees. It is created when approval or task action starts to execute. Approval is one kind of task. */
export type WorkflowTaskOutput = ApprovalOutput | SimpleTaskOutput;
