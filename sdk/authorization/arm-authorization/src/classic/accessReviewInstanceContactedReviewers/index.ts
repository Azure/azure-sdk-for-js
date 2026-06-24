// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AuthorizationManagementContext } from "../../api/authorizationManagementContext.js";
import { list } from "../../api/accessReviewInstanceContactedReviewers/operations.js";
import { AccessReviewInstanceContactedReviewersListOptionalParams } from "../../api/accessReviewInstanceContactedReviewers/options.js";
import { AccessReviewContactedReviewer } from "../../models/microsoft/accessReview/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a AccessReviewInstanceContactedReviewers operations. */
export interface AccessReviewInstanceContactedReviewersOperations {
  /** Get access review instance contacted reviewers */
  list: (
    scheduleDefinitionId: string,
    id: string,
    options?: AccessReviewInstanceContactedReviewersListOptionalParams,
  ) => PagedAsyncIterableIterator<AccessReviewContactedReviewer>;
}

function _getAccessReviewInstanceContactedReviewers(context: AuthorizationManagementContext) {
  return {
    list: (
      scheduleDefinitionId: string,
      id: string,
      options?: AccessReviewInstanceContactedReviewersListOptionalParams,
    ) => list(context, scheduleDefinitionId, id, options),
  };
}

export function _getAccessReviewInstanceContactedReviewersOperations(
  context: AuthorizationManagementContext,
): AccessReviewInstanceContactedReviewersOperations {
  return {
    ..._getAccessReviewInstanceContactedReviewers(context),
  };
}
