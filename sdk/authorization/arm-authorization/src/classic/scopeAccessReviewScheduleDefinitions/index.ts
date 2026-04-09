// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AuthorizationManagementContext } from "../../api/authorizationManagementContext.js";
import {
  stop,
  list,
  deleteById,
  createOrUpdateById,
  getById,
} from "../../api/scopeAccessReviewScheduleDefinitions/operations.js";
import type {
  ScopeAccessReviewScheduleDefinitionsStopOptionalParams,
  ScopeAccessReviewScheduleDefinitionsListOptionalParams,
  ScopeAccessReviewScheduleDefinitionsDeleteByIdOptionalParams,
  ScopeAccessReviewScheduleDefinitionsCreateOrUpdateByIdOptionalParams,
  ScopeAccessReviewScheduleDefinitionsGetByIdOptionalParams,
} from "../../api/scopeAccessReviewScheduleDefinitions/options.js";
import type {
  AccessReviewScheduleDefinition,
  AccessReviewScheduleDefinitionProperties,
} from "../../models/microsoft/attributeNamespaces/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ScopeAccessReviewScheduleDefinitions operations. */
export interface ScopeAccessReviewScheduleDefinitionsOperations {
  /** Stop access review definition */
  stop: (
    scope: string,
    scheduleDefinitionId: string,
    options?: ScopeAccessReviewScheduleDefinitionsStopOptionalParams,
  ) => Promise<void>;
  /** Get access review schedule definitions */
  list: (
    scope: string,
    options?: ScopeAccessReviewScheduleDefinitionsListOptionalParams,
  ) => PagedAsyncIterableIterator<AccessReviewScheduleDefinition>;
  /** Delete access review schedule definition */
  deleteById: (
    scope: string,
    scheduleDefinitionId: string,
    options?: ScopeAccessReviewScheduleDefinitionsDeleteByIdOptionalParams,
  ) => Promise<void>;
  /** Create or Update access review schedule definition. */
  createOrUpdateById: (
    scope: string,
    scheduleDefinitionId: string,
    properties: AccessReviewScheduleDefinitionProperties,
    options?: ScopeAccessReviewScheduleDefinitionsCreateOrUpdateByIdOptionalParams,
  ) => Promise<AccessReviewScheduleDefinition>;
  /** Get single access review definition */
  getById: (
    scope: string,
    scheduleDefinitionId: string,
    options?: ScopeAccessReviewScheduleDefinitionsGetByIdOptionalParams,
  ) => Promise<AccessReviewScheduleDefinition>;
}

function _getScopeAccessReviewScheduleDefinitions(context: AuthorizationManagementContext) {
  return {
    stop: (
      scope: string,
      scheduleDefinitionId: string,
      options?: ScopeAccessReviewScheduleDefinitionsStopOptionalParams,
    ) => stop(context, scope, scheduleDefinitionId, options),
    list: (scope: string, options?: ScopeAccessReviewScheduleDefinitionsListOptionalParams) =>
      list(context, scope, options),
    deleteById: (
      scope: string,
      scheduleDefinitionId: string,
      options?: ScopeAccessReviewScheduleDefinitionsDeleteByIdOptionalParams,
    ) => deleteById(context, scope, scheduleDefinitionId, options),
    createOrUpdateById: (
      scope: string,
      scheduleDefinitionId: string,
      properties: AccessReviewScheduleDefinitionProperties,
      options?: ScopeAccessReviewScheduleDefinitionsCreateOrUpdateByIdOptionalParams,
    ) => createOrUpdateById(context, scope, scheduleDefinitionId, properties, options),
    getById: (
      scope: string,
      scheduleDefinitionId: string,
      options?: ScopeAccessReviewScheduleDefinitionsGetByIdOptionalParams,
    ) => getById(context, scope, scheduleDefinitionId, options),
  };
}

export function _getScopeAccessReviewScheduleDefinitionsOperations(
  context: AuthorizationManagementContext,
): ScopeAccessReviewScheduleDefinitionsOperations {
  return {
    ..._getScopeAccessReviewScheduleDefinitions(context),
  };
}
