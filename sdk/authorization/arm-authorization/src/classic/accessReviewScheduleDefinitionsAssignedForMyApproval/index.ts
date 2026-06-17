// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AuthorizationManagementContext } from "../../api/authorizationManagementContext.js";
import { list } from "../../api/accessReviewScheduleDefinitionsAssignedForMyApproval/operations.js";
import { AccessReviewScheduleDefinitionsAssignedForMyApprovalListOptionalParams } from "../../api/accessReviewScheduleDefinitionsAssignedForMyApproval/options.js";
import { AccessReviewScheduleDefinition } from "../../models/microsoft/accessReview/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

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
