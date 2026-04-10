// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AuthorizationManagementContext } from "../../api/authorizationManagementContext.js";
import { list, create, getById } from "../../api/accessReviewInstances/operations.js";
import type {
  AccessReviewInstancesListOptionalParams,
  AccessReviewInstancesCreateOptionalParams,
  AccessReviewInstancesGetByIdOptionalParams,
} from "../../api/accessReviewInstances/options.js";
import type {
  AccessReviewInstance,
  AccessReviewInstanceProperties,
} from "../../models/microsoft/attributeNamespaces/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a AccessReviewInstances operations. */
export interface AccessReviewInstancesOperations {
  /** Get access review instances */
  list: (
    scheduleDefinitionId: string,
    options?: AccessReviewInstancesListOptionalParams,
  ) => PagedAsyncIterableIterator<AccessReviewInstance>;
  /** Update access review instance. */
  create: (
    scheduleDefinitionId: string,
    id: string,
    properties: AccessReviewInstanceProperties,
    options?: AccessReviewInstancesCreateOptionalParams,
  ) => Promise<AccessReviewInstance>;
  /** Get access review instances */
  getById: (
    scheduleDefinitionId: string,
    id: string,
    options?: AccessReviewInstancesGetByIdOptionalParams,
  ) => Promise<AccessReviewInstance>;
}

function _getAccessReviewInstances(context: AuthorizationManagementContext) {
  return {
    list: (scheduleDefinitionId: string, options?: AccessReviewInstancesListOptionalParams) =>
      list(context, scheduleDefinitionId, options),
    create: (
      scheduleDefinitionId: string,
      id: string,
      properties: AccessReviewInstanceProperties,
      options?: AccessReviewInstancesCreateOptionalParams,
    ) => create(context, scheduleDefinitionId, id, properties, options),
    getById: (
      scheduleDefinitionId: string,
      id: string,
      options?: AccessReviewInstancesGetByIdOptionalParams,
    ) => getById(context, scheduleDefinitionId, id, options),
  };
}

export function _getAccessReviewInstancesOperations(
  context: AuthorizationManagementContext,
): AccessReviewInstancesOperations {
  return {
    ..._getAccessReviewInstances(context),
  };
}
