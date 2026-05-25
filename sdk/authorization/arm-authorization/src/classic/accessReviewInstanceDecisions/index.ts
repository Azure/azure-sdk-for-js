// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AuthorizationManagementContext } from "../../api/authorizationManagementContext.js";
import { list } from "../../api/accessReviewInstanceDecisions/operations.js";
import { AccessReviewInstanceDecisionsListOptionalParams } from "../../api/accessReviewInstanceDecisions/options.js";
import { AccessReviewDecision } from "../../models/microsoft/attributeNamespaces/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a AccessReviewInstanceDecisions operations. */
export interface AccessReviewInstanceDecisionsOperations {
  /** Get access review instance decisions */
  list: (
    scheduleDefinitionId: string,
    id: string,
    options?: AccessReviewInstanceDecisionsListOptionalParams,
  ) => PagedAsyncIterableIterator<AccessReviewDecision>;
}

function _getAccessReviewInstanceDecisions(context: AuthorizationManagementContext) {
  return {
    list: (
      scheduleDefinitionId: string,
      id: string,
      options?: AccessReviewInstanceDecisionsListOptionalParams,
    ) => list(context, scheduleDefinitionId, id, options),
  };
}

export function _getAccessReviewInstanceDecisionsOperations(
  context: AuthorizationManagementContext,
): AccessReviewInstanceDecisionsOperations {
  return {
    ..._getAccessReviewInstanceDecisions(context),
  };
}
