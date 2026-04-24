// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SecurityCenterContext } from "../../api/securityCenterContext.js";
import { list, $delete, createOrUpdate, get } from "../../api/governanceAssignments/operations.js";
import type {
  GovernanceAssignmentsListOptionalParams,
  GovernanceAssignmentsDeleteOptionalParams,
  GovernanceAssignmentsCreateOrUpdateOptionalParams,
  GovernanceAssignmentsGetOptionalParams,
} from "../../api/governanceAssignments/options.js";
import type { GovernanceAPIGovernanceAssignment } from "../../models/governanceAPI/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a GovernanceAssignments operations. */
export interface GovernanceAssignmentsOperations {
  /** Get governance assignments on all of your resources inside a scope */
  list: (
    scope: string,
    assessmentName: string,
    options?: GovernanceAssignmentsListOptionalParams,
  ) => PagedAsyncIterableIterator<GovernanceAPIGovernanceAssignment>;
  /** Delete a GovernanceAssignment over a given scope */
  delete: (
    scope: string,
    assessmentName: string,
    assignmentKey: string,
    options?: GovernanceAssignmentsDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates or updates a governance assignment on the given subscription. */
  createOrUpdate: (
    scope: string,
    assessmentName: string,
    assignmentKey: string,
    governanceAssignment: GovernanceAPIGovernanceAssignment,
    options?: GovernanceAssignmentsCreateOrUpdateOptionalParams,
  ) => Promise<GovernanceAPIGovernanceAssignment>;
  /** Get a specific governanceAssignment for the requested scope by AssignmentKey */
  get: (
    scope: string,
    assessmentName: string,
    assignmentKey: string,
    options?: GovernanceAssignmentsGetOptionalParams,
  ) => Promise<GovernanceAPIGovernanceAssignment>;
}

function _getGovernanceAssignments(context: SecurityCenterContext) {
  return {
    list: (
      scope: string,
      assessmentName: string,
      options?: GovernanceAssignmentsListOptionalParams,
    ) => list(context, scope, assessmentName, options),
    delete: (
      scope: string,
      assessmentName: string,
      assignmentKey: string,
      options?: GovernanceAssignmentsDeleteOptionalParams,
    ) => $delete(context, scope, assessmentName, assignmentKey, options),
    createOrUpdate: (
      scope: string,
      assessmentName: string,
      assignmentKey: string,
      governanceAssignment: GovernanceAPIGovernanceAssignment,
      options?: GovernanceAssignmentsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(context, scope, assessmentName, assignmentKey, governanceAssignment, options),
    get: (
      scope: string,
      assessmentName: string,
      assignmentKey: string,
      options?: GovernanceAssignmentsGetOptionalParams,
    ) => get(context, scope, assessmentName, assignmentKey, options),
  };
}

export function _getGovernanceAssignmentsOperations(
  context: SecurityCenterContext,
): GovernanceAssignmentsOperations {
  return {
    ..._getGovernanceAssignments(context),
  };
}
