// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AuthorizationManagementContext } from "../../api/authorizationManagementContext.js";
import { list } from "../../api/tenantLevelAccessReviewInstanceContactedReviewers/operations.js";
import { TenantLevelAccessReviewInstanceContactedReviewersListOptionalParams } from "../../api/tenantLevelAccessReviewInstanceContactedReviewers/options.js";
import { AccessReviewContactedReviewer } from "../../models/microsoft/accessReview/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a TenantLevelAccessReviewInstanceContactedReviewers operations. */
export interface TenantLevelAccessReviewInstanceContactedReviewersOperations {
  /** Get access review instance contacted reviewers */
  list: (
    scheduleDefinitionId: string,
    id: string,
    options?: TenantLevelAccessReviewInstanceContactedReviewersListOptionalParams,
  ) => PagedAsyncIterableIterator<AccessReviewContactedReviewer>;
}

function _getTenantLevelAccessReviewInstanceContactedReviewers(
  context: AuthorizationManagementContext,
) {
  return {
    list: (
      scheduleDefinitionId: string,
      id: string,
      options?: TenantLevelAccessReviewInstanceContactedReviewersListOptionalParams,
    ) => list(context, scheduleDefinitionId, id, options),
  };
}

export function _getTenantLevelAccessReviewInstanceContactedReviewersOperations(
  context: AuthorizationManagementContext,
): TenantLevelAccessReviewInstanceContactedReviewersOperations {
  return {
    ..._getTenantLevelAccessReviewInstanceContactedReviewers(context),
  };
}
