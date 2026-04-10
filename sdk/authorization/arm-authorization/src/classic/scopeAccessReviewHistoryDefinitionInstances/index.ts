// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AuthorizationManagementContext } from "../../api/authorizationManagementContext.js";
import { list } from "../../api/scopeAccessReviewHistoryDefinitionInstances/operations.js";
import type { ScopeAccessReviewHistoryDefinitionInstancesListOptionalParams } from "../../api/scopeAccessReviewHistoryDefinitionInstances/options.js";
import type { AccessReviewHistoryInstance } from "../../models/microsoft/attributeNamespaces/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ScopeAccessReviewHistoryDefinitionInstances operations. */
export interface ScopeAccessReviewHistoryDefinitionInstancesOperations {
  /** Get access review history definition instances by definition Id */
  list: (
    scope: string,
    historyDefinitionId: string,
    options?: ScopeAccessReviewHistoryDefinitionInstancesListOptionalParams,
  ) => PagedAsyncIterableIterator<AccessReviewHistoryInstance>;
}

function _getScopeAccessReviewHistoryDefinitionInstances(context: AuthorizationManagementContext) {
  return {
    list: (
      scope: string,
      historyDefinitionId: string,
      options?: ScopeAccessReviewHistoryDefinitionInstancesListOptionalParams,
    ) => list(context, scope, historyDefinitionId, options),
  };
}

export function _getScopeAccessReviewHistoryDefinitionInstancesOperations(
  context: AuthorizationManagementContext,
): ScopeAccessReviewHistoryDefinitionInstancesOperations {
  return {
    ..._getScopeAccessReviewHistoryDefinitionInstances(context),
  };
}
