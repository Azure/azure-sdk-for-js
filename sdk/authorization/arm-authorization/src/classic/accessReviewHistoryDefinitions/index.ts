// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AuthorizationManagementContext } from "../../api/authorizationManagementContext.js";
import { list, getById } from "../../api/accessReviewHistoryDefinitions/operations.js";
import type {
  AccessReviewHistoryDefinitionsListOptionalParams,
  AccessReviewHistoryDefinitionsGetByIdOptionalParams,
} from "../../api/accessReviewHistoryDefinitions/options.js";
import type { AccessReviewHistoryDefinition } from "../../models/microsoft/attributeNamespaces/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a AccessReviewHistoryDefinitions operations. */
export interface AccessReviewHistoryDefinitionsOperations {
  /** Lists the accessReviewHistoryDefinitions available from this provider, definition instances are only available for 30 days after creation. */
  list: (
    options?: AccessReviewHistoryDefinitionsListOptionalParams,
  ) => PagedAsyncIterableIterator<AccessReviewHistoryDefinition>;
  /** Get access review history definition by definition Id */
  getById: (
    historyDefinitionId: string,
    options?: AccessReviewHistoryDefinitionsGetByIdOptionalParams,
  ) => Promise<AccessReviewHistoryDefinition>;
}

function _getAccessReviewHistoryDefinitions(context: AuthorizationManagementContext) {
  return {
    list: (options?: AccessReviewHistoryDefinitionsListOptionalParams) => list(context, options),
    getById: (
      historyDefinitionId: string,
      options?: AccessReviewHistoryDefinitionsGetByIdOptionalParams,
    ) => getById(context, historyDefinitionId, options),
  };
}

export function _getAccessReviewHistoryDefinitionsOperations(
  context: AuthorizationManagementContext,
): AccessReviewHistoryDefinitionsOperations {
  return {
    ..._getAccessReviewHistoryDefinitions(context),
  };
}
