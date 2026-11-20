// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SecurityCenterContext } from "../../api/securityCenterContext.js";
import { list, $delete, create, get } from "../../api/standardAssignments/operations.js";
import type {
  StandardAssignmentsListOptionalParams,
  StandardAssignmentsDeleteOptionalParams,
  StandardAssignmentsCreateOptionalParams,
  StandardAssignmentsGetOptionalParams,
} from "../../api/standardAssignments/options.js";
import type { StandardAssignment } from "../../models/securityStandardsAPI/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a StandardAssignments operations. */
export interface StandardAssignmentsOperations {
  /** Get a list of all relevant standard assignments over a scope */
  list: (
    scope: string,
    options?: StandardAssignmentsListOptionalParams,
  ) => PagedAsyncIterableIterator<StandardAssignment>;
  /** This operation deletes a standard assignment, given its name and the scope it was created in. The scope of a standard assignment is the part of its ID preceding '/providers/Microsoft.Security/standardAssignments/{standardAssignmentName}'. */
  delete: (
    resourceId: string,
    standardAssignmentName: string,
    options?: StandardAssignmentsDeleteOptionalParams,
  ) => Promise<void>;
  /** This operation creates or updates a standard assignment with the given scope and name. standard assignments apply to all resources contained within their scope. For example, when you assign a policy at resource group scope, that policy applies to all resources in the group. */
  create: (
    resourceId: string,
    standardAssignmentName: string,
    standardAssignment: StandardAssignment,
    options?: StandardAssignmentsCreateOptionalParams,
  ) => Promise<StandardAssignment>;
  /** This operation retrieves a single standard assignment, given its name and the scope it was created at. */
  get: (
    resourceId: string,
    standardAssignmentName: string,
    options?: StandardAssignmentsGetOptionalParams,
  ) => Promise<StandardAssignment>;
}

function _getStandardAssignments(context: SecurityCenterContext) {
  return {
    list: (scope: string, options?: StandardAssignmentsListOptionalParams) =>
      list(context, scope, options),
    delete: (
      resourceId: string,
      standardAssignmentName: string,
      options?: StandardAssignmentsDeleteOptionalParams,
    ) => $delete(context, resourceId, standardAssignmentName, options),
    create: (
      resourceId: string,
      standardAssignmentName: string,
      standardAssignment: StandardAssignment,
      options?: StandardAssignmentsCreateOptionalParams,
    ) => create(context, resourceId, standardAssignmentName, standardAssignment, options),
    get: (
      resourceId: string,
      standardAssignmentName: string,
      options?: StandardAssignmentsGetOptionalParams,
    ) => get(context, resourceId, standardAssignmentName, options),
  };
}

export function _getStandardAssignmentsOperations(
  context: SecurityCenterContext,
): StandardAssignmentsOperations {
  return {
    ..._getStandardAssignments(context),
  };
}
