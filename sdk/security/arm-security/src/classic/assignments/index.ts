// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SecurityCenterContext } from "../../api/securityCenterContext.js";
import {
  listBySubscription,
  list,
  $delete,
  createOrUpdate,
  get,
} from "../../api/assignments/operations.js";
import type {
  AssignmentsListBySubscriptionOptionalParams,
  AssignmentsListOptionalParams,
  AssignmentsDeleteOptionalParams,
  AssignmentsCreateOrUpdateOptionalParams,
  AssignmentsGetOptionalParams,
} from "../../api/assignments/options.js";
import type { Assignment } from "../../models/standardsAPI/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Assignments operations. */
export interface AssignmentsOperations {
  /** Get a list of all relevant standardAssignments over a subscription level scope */
  listBySubscription: (
    options?: AssignmentsListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<Assignment>;
  /** Get a list of all relevant standardAssignments available for scope */
  list: (
    resourceGroupName: string,
    options?: AssignmentsListOptionalParams,
  ) => PagedAsyncIterableIterator<Assignment>;
  /** Delete a standard assignment over a given scope */
  delete: (
    resourceGroupName: string,
    assignmentId: string,
    options?: AssignmentsDeleteOptionalParams,
  ) => Promise<void>;
  /** Create a security assignment on the given scope. Will create/update the required standard assignment. */
  createOrUpdate: (
    resourceGroupName: string,
    assignmentId: string,
    assignment: Assignment,
    options?: AssignmentsCreateOrUpdateOptionalParams,
  ) => Promise<Assignment>;
  /** Get a specific standard assignment for the requested scope by resourceId */
  get: (
    resourceGroupName: string,
    assignmentId: string,
    options?: AssignmentsGetOptionalParams,
  ) => Promise<Assignment>;
}

function _getAssignments(context: SecurityCenterContext) {
  return {
    listBySubscription: (options?: AssignmentsListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    list: (resourceGroupName: string, options?: AssignmentsListOptionalParams) =>
      list(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      assignmentId: string,
      options?: AssignmentsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, assignmentId, options),
    createOrUpdate: (
      resourceGroupName: string,
      assignmentId: string,
      assignment: Assignment,
      options?: AssignmentsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, assignmentId, assignment, options),
    get: (
      resourceGroupName: string,
      assignmentId: string,
      options?: AssignmentsGetOptionalParams,
    ) => get(context, resourceGroupName, assignmentId, options),
  };
}

export function _getAssignmentsOperations(context: SecurityCenterContext): AssignmentsOperations {
  return {
    ..._getAssignments(context),
  };
}
