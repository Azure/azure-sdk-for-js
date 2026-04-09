// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AuthorizationManagementContext } from "../../api/authorizationManagementContext.js";
import { list, getById } from "../../api/accessReviewInstancesAssignedForMyApproval/operations.js";
import type {
  AccessReviewInstancesAssignedForMyApprovalListOptionalParams,
  AccessReviewInstancesAssignedForMyApprovalGetByIdOptionalParams,
} from "../../api/accessReviewInstancesAssignedForMyApproval/options.js";
import type { AccessReviewInstance } from "../../models/microsoft/attributeNamespaces/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a AccessReviewInstancesAssignedForMyApproval operations. */
export interface AccessReviewInstancesAssignedForMyApprovalOperations {
  /** Get access review instances assigned for my approval. */
  list: (
    scheduleDefinitionId: string,
    options?: AccessReviewInstancesAssignedForMyApprovalListOptionalParams,
  ) => PagedAsyncIterableIterator<AccessReviewInstance>;
  /** Get single access review instance assigned for my approval. */
  getById: (
    scheduleDefinitionId: string,
    id: string,
    options?: AccessReviewInstancesAssignedForMyApprovalGetByIdOptionalParams,
  ) => Promise<AccessReviewInstance>;
}

function _getAccessReviewInstancesAssignedForMyApproval(context: AuthorizationManagementContext) {
  return {
    list: (
      scheduleDefinitionId: string,
      options?: AccessReviewInstancesAssignedForMyApprovalListOptionalParams,
    ) => list(context, scheduleDefinitionId, options),
    getById: (
      scheduleDefinitionId: string,
      id: string,
      options?: AccessReviewInstancesAssignedForMyApprovalGetByIdOptionalParams,
    ) => getById(context, scheduleDefinitionId, id, options),
  };
}

export function _getAccessReviewInstancesAssignedForMyApprovalOperations(
  context: AuthorizationManagementContext,
): AccessReviewInstancesAssignedForMyApprovalOperations {
  return {
    ..._getAccessReviewInstancesAssignedForMyApproval(context),
  };
}
