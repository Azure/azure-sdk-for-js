// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AuthorizationManagementContext } from "../../api/authorizationManagementContext.js";
import { list, patch, getById } from "../../api/accessReviewInstanceMyDecisions/operations.js";
import type {
  AccessReviewInstanceMyDecisionsListOptionalParams,
  AccessReviewInstanceMyDecisionsPatchOptionalParams,
  AccessReviewInstanceMyDecisionsGetByIdOptionalParams,
} from "../../api/accessReviewInstanceMyDecisions/options.js";
import type {
  AccessReviewDecision,
  AccessReviewDecisionProperties,
} from "../../models/microsoft/attributeNamespaces/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a AccessReviewInstanceMyDecisions operations. */
export interface AccessReviewInstanceMyDecisionsOperations {
  /** Get my access review instance decisions. */
  list: (
    scheduleDefinitionId: string,
    id: string,
    options?: AccessReviewInstanceMyDecisionsListOptionalParams,
  ) => PagedAsyncIterableIterator<AccessReviewDecision>;
  /** Record a decision. */
  patch: (
    scheduleDefinitionId: string,
    id: string,
    decisionId: string,
    properties: AccessReviewDecisionProperties,
    options?: AccessReviewInstanceMyDecisionsPatchOptionalParams,
  ) => Promise<AccessReviewDecision>;
  /** Get my single access review instance decision. */
  getById: (
    scheduleDefinitionId: string,
    id: string,
    decisionId: string,
    options?: AccessReviewInstanceMyDecisionsGetByIdOptionalParams,
  ) => Promise<AccessReviewDecision>;
}

function _getAccessReviewInstanceMyDecisions(context: AuthorizationManagementContext) {
  return {
    list: (
      scheduleDefinitionId: string,
      id: string,
      options?: AccessReviewInstanceMyDecisionsListOptionalParams,
    ) => list(context, scheduleDefinitionId, id, options),
    patch: (
      scheduleDefinitionId: string,
      id: string,
      decisionId: string,
      properties: AccessReviewDecisionProperties,
      options?: AccessReviewInstanceMyDecisionsPatchOptionalParams,
    ) => patch(context, scheduleDefinitionId, id, decisionId, properties, options),
    getById: (
      scheduleDefinitionId: string,
      id: string,
      decisionId: string,
      options?: AccessReviewInstanceMyDecisionsGetByIdOptionalParams,
    ) => getById(context, scheduleDefinitionId, id, decisionId, options),
  };
}

export function _getAccessReviewInstanceMyDecisionsOperations(
  context: AuthorizationManagementContext,
): AccessReviewInstanceMyDecisionsOperations {
  return {
    ..._getAccessReviewInstanceMyDecisions(context),
  };
}
