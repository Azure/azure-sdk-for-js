// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AuthorizationManagementContext } from "../../api/authorizationManagementContext.js";
import { list, getById } from "../../api/scopeAccessReviewHistoryDefinitions/operations.js";
import type {
  ScopeAccessReviewHistoryDefinitionsListOptionalParams,
  ScopeAccessReviewHistoryDefinitionsGetByIdOptionalParams,
} from "../../api/scopeAccessReviewHistoryDefinitions/options.js";
import type { AccessReviewHistoryDefinition } from "../../models/microsoft/attributeNamespaces/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ScopeAccessReviewHistoryDefinitions operations. */
export interface ScopeAccessReviewHistoryDefinitionsOperations {
  /** Lists the accessReviewHistoryDefinitions available from this provider, definition instances are only available for 30 days after creation. */
  list: (
    scope: string,
    options?: ScopeAccessReviewHistoryDefinitionsListOptionalParams,
  ) => PagedAsyncIterableIterator<AccessReviewHistoryDefinition>;
  /** Get access review history definition by definition Id */
  getById: (
    scope: string,
    historyDefinitionId: string,
    options?: ScopeAccessReviewHistoryDefinitionsGetByIdOptionalParams,
  ) => Promise<AccessReviewHistoryDefinition>;
}

function _getScopeAccessReviewHistoryDefinitions(context: AuthorizationManagementContext) {
  return {
    list: (scope: string, options?: ScopeAccessReviewHistoryDefinitionsListOptionalParams) =>
      list(context, scope, options),
    getById: (
      scope: string,
      historyDefinitionId: string,
      options?: ScopeAccessReviewHistoryDefinitionsGetByIdOptionalParams,
    ) => getById(context, scope, historyDefinitionId, options),
  };
}

export function _getScopeAccessReviewHistoryDefinitionsOperations(
  context: AuthorizationManagementContext,
): ScopeAccessReviewHistoryDefinitionsOperations {
  return {
    ..._getScopeAccessReviewHistoryDefinitions(context),
  };
}
