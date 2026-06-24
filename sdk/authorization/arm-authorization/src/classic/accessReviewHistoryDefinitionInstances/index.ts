// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AuthorizationManagementContext } from "../../api/authorizationManagementContext.js";
import { list } from "../../api/accessReviewHistoryDefinitionInstances/operations.js";
import { AccessReviewHistoryDefinitionInstancesListOptionalParams } from "../../api/accessReviewHistoryDefinitionInstances/options.js";
import { AccessReviewHistoryInstance } from "../../models/microsoft/accessReview/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a AccessReviewHistoryDefinitionInstances operations. */
export interface AccessReviewHistoryDefinitionInstancesOperations {
  /** Get access review history definition instances by definition Id */
  list: (
    historyDefinitionId: string,
    options?: AccessReviewHistoryDefinitionInstancesListOptionalParams,
  ) => PagedAsyncIterableIterator<AccessReviewHistoryInstance>;
}

function _getAccessReviewHistoryDefinitionInstances(context: AuthorizationManagementContext) {
  return {
    list: (
      historyDefinitionId: string,
      options?: AccessReviewHistoryDefinitionInstancesListOptionalParams,
    ) => list(context, historyDefinitionId, options),
  };
}

export function _getAccessReviewHistoryDefinitionInstancesOperations(
  context: AuthorizationManagementContext,
): AccessReviewHistoryDefinitionInstancesOperations {
  return {
    ..._getAccessReviewHistoryDefinitionInstances(context),
  };
}
