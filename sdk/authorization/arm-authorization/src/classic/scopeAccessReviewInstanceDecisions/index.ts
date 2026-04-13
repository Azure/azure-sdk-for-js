// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AuthorizationManagementContext } from "../../api/authorizationManagementContext.js";
import { list } from "../../api/scopeAccessReviewInstanceDecisions/operations.js";
import type { ScopeAccessReviewInstanceDecisionsListOptionalParams } from "../../api/scopeAccessReviewInstanceDecisions/options.js";
import type { AccessReviewDecision } from "../../models/microsoft/attributeNamespaces/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ScopeAccessReviewInstanceDecisions operations. */
export interface ScopeAccessReviewInstanceDecisionsOperations {
  /** Get access review instance decisions */
  list: (
    scope: string,
    scheduleDefinitionId: string,
    id: string,
    options?: ScopeAccessReviewInstanceDecisionsListOptionalParams,
  ) => PagedAsyncIterableIterator<AccessReviewDecision>;
}

function _getScopeAccessReviewInstanceDecisions(context: AuthorizationManagementContext) {
  return {
    list: (
      scope: string,
      scheduleDefinitionId: string,
      id: string,
      options?: ScopeAccessReviewInstanceDecisionsListOptionalParams,
    ) => list(context, scope, scheduleDefinitionId, id, options),
  };
}

export function _getScopeAccessReviewInstanceDecisionsOperations(
  context: AuthorizationManagementContext,
): ScopeAccessReviewInstanceDecisionsOperations {
  return {
    ..._getScopeAccessReviewInstanceDecisions(context),
  };
}
