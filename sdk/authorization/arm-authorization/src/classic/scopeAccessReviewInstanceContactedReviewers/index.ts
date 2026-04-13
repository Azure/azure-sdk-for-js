// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AuthorizationManagementContext } from "../../api/authorizationManagementContext.js";
import { list } from "../../api/scopeAccessReviewInstanceContactedReviewers/operations.js";
import type { ScopeAccessReviewInstanceContactedReviewersListOptionalParams } from "../../api/scopeAccessReviewInstanceContactedReviewers/options.js";
import type { AccessReviewContactedReviewer } from "../../models/microsoft/attributeNamespaces/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ScopeAccessReviewInstanceContactedReviewers operations. */
export interface ScopeAccessReviewInstanceContactedReviewersOperations {
  /** Get access review instance contacted reviewers */
  list: (
    scope: string,
    scheduleDefinitionId: string,
    id: string,
    options?: ScopeAccessReviewInstanceContactedReviewersListOptionalParams,
  ) => PagedAsyncIterableIterator<AccessReviewContactedReviewer>;
}

function _getScopeAccessReviewInstanceContactedReviewers(context: AuthorizationManagementContext) {
  return {
    list: (
      scope: string,
      scheduleDefinitionId: string,
      id: string,
      options?: ScopeAccessReviewInstanceContactedReviewersListOptionalParams,
    ) => list(context, scope, scheduleDefinitionId, id, options),
  };
}

export function _getScopeAccessReviewInstanceContactedReviewersOperations(
  context: AuthorizationManagementContext,
): ScopeAccessReviewInstanceContactedReviewersOperations {
  return {
    ..._getScopeAccessReviewInstanceContactedReviewers(context),
  };
}
