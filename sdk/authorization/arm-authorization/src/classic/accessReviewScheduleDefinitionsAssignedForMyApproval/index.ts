// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AuthorizationManagementContext } from "../../api/authorizationManagementContext.js";
import { list } from "../../api/accessReviewScheduleDefinitionsAssignedForMyApproval/operations.js";
import type { AccessReviewScheduleDefinitionsAssignedForMyApprovalListOptionalParams } from "../../api/accessReviewScheduleDefinitionsAssignedForMyApproval/options.js";
import type { AccessReviewScheduleDefinition } from "../../models/microsoft/attributeNamespaces/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a AccessReviewScheduleDefinitionsAssignedForMyApproval operations. */
export interface AccessReviewScheduleDefinitionsAssignedForMyApprovalOperations {
  /** Get access review instances assigned for my approval. */
  list: (
    options?: AccessReviewScheduleDefinitionsAssignedForMyApprovalListOptionalParams,
  ) => PagedAsyncIterableIterator<AccessReviewScheduleDefinition>;
}

function _getAccessReviewScheduleDefinitionsAssignedForMyApproval(
  context: AuthorizationManagementContext,
) {
  return {
    list: (options?: AccessReviewScheduleDefinitionsAssignedForMyApprovalListOptionalParams) =>
      list(context, options),
  };
}

export function _getAccessReviewScheduleDefinitionsAssignedForMyApprovalOperations(
  context: AuthorizationManagementContext,
): AccessReviewScheduleDefinitionsAssignedForMyApprovalOperations {
  return {
    ..._getAccessReviewScheduleDefinitionsAssignedForMyApproval(context),
  };
}
