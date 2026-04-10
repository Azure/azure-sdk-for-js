// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AuthorizationManagementContext } from "../../api/authorizationManagementContext.js";
import { list, create, getById } from "../../api/scopeAccessReviewInstances/operations.js";
import type {
  ScopeAccessReviewInstancesListOptionalParams,
  ScopeAccessReviewInstancesCreateOptionalParams,
  ScopeAccessReviewInstancesGetByIdOptionalParams,
} from "../../api/scopeAccessReviewInstances/options.js";
import type {
  AccessReviewInstance,
  AccessReviewInstanceProperties,
} from "../../models/microsoft/attributeNamespaces/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ScopeAccessReviewInstances operations. */
export interface ScopeAccessReviewInstancesOperations {
  /** Get access review instances */
  list: (
    scope: string,
    scheduleDefinitionId: string,
    options?: ScopeAccessReviewInstancesListOptionalParams,
  ) => PagedAsyncIterableIterator<AccessReviewInstance>;
  /** Update access review instance. */
  create: (
    scope: string,
    scheduleDefinitionId: string,
    id: string,
    properties: AccessReviewInstanceProperties,
    options?: ScopeAccessReviewInstancesCreateOptionalParams,
  ) => Promise<AccessReviewInstance>;
  /** Get access review instances */
  getById: (
    scope: string,
    scheduleDefinitionId: string,
    id: string,
    options?: ScopeAccessReviewInstancesGetByIdOptionalParams,
  ) => Promise<AccessReviewInstance>;
}

function _getScopeAccessReviewInstances(context: AuthorizationManagementContext) {
  return {
    list: (
      scope: string,
      scheduleDefinitionId: string,
      options?: ScopeAccessReviewInstancesListOptionalParams,
    ) => list(context, scope, scheduleDefinitionId, options),
    create: (
      scope: string,
      scheduleDefinitionId: string,
      id: string,
      properties: AccessReviewInstanceProperties,
      options?: ScopeAccessReviewInstancesCreateOptionalParams,
    ) => create(context, scope, scheduleDefinitionId, id, properties, options),
    getById: (
      scope: string,
      scheduleDefinitionId: string,
      id: string,
      options?: ScopeAccessReviewInstancesGetByIdOptionalParams,
    ) => getById(context, scope, scheduleDefinitionId, id, options),
  };
}

export function _getScopeAccessReviewInstancesOperations(
  context: AuthorizationManagementContext,
): ScopeAccessReviewInstancesOperations {
  return {
    ..._getScopeAccessReviewInstances(context),
  };
}
