// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/** Describes under what condition a workflow will run. */
export interface Trigger {
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

/** Create or update workflow payload. */
export interface WorkflowCreateOrUpdateCommand {
  /** It describes under what condition a workflow will run.  */
  triggers: Array<Trigger>;
  /** The workflow name. */
  name: string;
  /** Whether the workflow enabled or not. */
  isEnabled: boolean;
  /** Description of a workflow. */
  description: string;
  /** The action DAG(Directed Acyclic Graph), it defines actual flow. */
  actionDag?: Record<string, unknown>;
}

export interface UserRequestPayload {
  /** The list of operations user want to submit, each operation matches one Purview API call and will do the operation directly. */
  operations: Array<Operation>;
  /** The comment when submit a user request. */
  comment?: string;
}

/** The operation user wants to perform. */
export interface Operation {
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
}

export interface WorkflowRunCancelRequest {
  /** The comment of canceling a workflow run. */
  comment?: string;
}

export interface ApprovalResponseComment {
  /** The comment of approving or rejecting an approval request. */
  comment?: string;
}

/** The request payload of reassigning a workflow task. */
export interface ReassignCommand {
  /** The request body of reassigning a workflow task. */
  reassignments?: Array<ReassignCommandReassignmentsItem>;
}

export interface ReassignCommandReassignmentsItem {
  /**
   * Reassign a workflow task from a user or a group.
   *
   * Value may contain a UUID
   */
  reassignFrom: string;
  /**
   * Reassign a workflow task to a user or a group.
   *
   * Value may contain a UUID
   */
  reassignTo: string;
}

export interface TaskUpdateCommand {
  /** The new status will be used to update the task. */
  newStatus: "NotStarted" | "InProgress" | "Completed" | "Canceled";
  /** The comment when update a task. */
  comment?: string;
}
