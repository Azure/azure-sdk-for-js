// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AuthorizationManagementContext } from "../../api/authorizationManagementContext.js";
import { deleteById, create } from "../../api/scopeAccessReviewHistoryDefinition/operations.js";
import type {
  ScopeAccessReviewHistoryDefinitionDeleteByIdOptionalParams,
  ScopeAccessReviewHistoryDefinitionCreateOptionalParams,
} from "../../api/scopeAccessReviewHistoryDefinition/options.js";
import type {
  AccessReviewHistoryDefinition,
  AccessReviewHistoryDefinitionProperties,
} from "../../models/microsoft/attributeNamespaces/models.js";

/** Interface representing a ScopeAccessReviewHistoryDefinition operations. */
export interface ScopeAccessReviewHistoryDefinitionOperations {
  /** Delete an access review history definition */
  deleteById: (
    scope: string,
    historyDefinitionId: string,
    options?: ScopeAccessReviewHistoryDefinitionDeleteByIdOptionalParams,
  ) => Promise<void>;
  /** Create a scheduled or one-time Access Review History Definition */
  create: (
    scope: string,
    historyDefinitionId: string,
    properties: AccessReviewHistoryDefinitionProperties,
    options?: ScopeAccessReviewHistoryDefinitionCreateOptionalParams,
  ) => Promise<AccessReviewHistoryDefinition>;
}

function _getScopeAccessReviewHistoryDefinition(context: AuthorizationManagementContext) {
  return {
    deleteById: (
      scope: string,
      historyDefinitionId: string,
      options?: ScopeAccessReviewHistoryDefinitionDeleteByIdOptionalParams,
    ) => deleteById(context, scope, historyDefinitionId, options),
    create: (
      scope: string,
      historyDefinitionId: string,
      properties: AccessReviewHistoryDefinitionProperties,
      options?: ScopeAccessReviewHistoryDefinitionCreateOptionalParams,
    ) => create(context, scope, historyDefinitionId, properties, options),
  };
}

export function _getScopeAccessReviewHistoryDefinitionOperations(
  context: AuthorizationManagementContext,
): ScopeAccessReviewHistoryDefinitionOperations {
  return {
    ..._getScopeAccessReviewHistoryDefinition(context),
  };
}
