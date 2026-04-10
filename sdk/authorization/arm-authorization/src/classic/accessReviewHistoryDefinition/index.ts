// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AuthorizationManagementContext } from "../../api/authorizationManagementContext.js";
import { deleteById, create } from "../../api/accessReviewHistoryDefinition/operations.js";
import type {
  AccessReviewHistoryDefinitionDeleteByIdOptionalParams,
  AccessReviewHistoryDefinitionCreateOptionalParams,
} from "../../api/accessReviewHistoryDefinition/options.js";
import type {
  AccessReviewHistoryDefinition,
  AccessReviewHistoryDefinitionProperties,
} from "../../models/microsoft/attributeNamespaces/models.js";

/** Interface representing a AccessReviewHistoryDefinition operations. */
export interface AccessReviewHistoryDefinitionOperations {
  /** Delete an access review history definition */
  deleteById: (
    historyDefinitionId: string,
    options?: AccessReviewHistoryDefinitionDeleteByIdOptionalParams,
  ) => Promise<void>;
  /** Create a scheduled or one-time Access Review History Definition */
  create: (
    historyDefinitionId: string,
    properties: AccessReviewHistoryDefinitionProperties,
    options?: AccessReviewHistoryDefinitionCreateOptionalParams,
  ) => Promise<AccessReviewHistoryDefinition>;
}

function _getAccessReviewHistoryDefinition(context: AuthorizationManagementContext) {
  return {
    deleteById: (
      historyDefinitionId: string,
      options?: AccessReviewHistoryDefinitionDeleteByIdOptionalParams,
    ) => deleteById(context, historyDefinitionId, options),
    create: (
      historyDefinitionId: string,
      properties: AccessReviewHistoryDefinitionProperties,
      options?: AccessReviewHistoryDefinitionCreateOptionalParams,
    ) => create(context, historyDefinitionId, properties, options),
  };
}

export function _getAccessReviewHistoryDefinitionOperations(
  context: AuthorizationManagementContext,
): AccessReviewHistoryDefinitionOperations {
  return {
    ..._getAccessReviewHistoryDefinition(context),
  };
}
