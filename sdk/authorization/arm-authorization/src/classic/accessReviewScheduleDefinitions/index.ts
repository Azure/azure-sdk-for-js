// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AuthorizationManagementContext } from "../../api/authorizationManagementContext.js";
import {
  stop,
  list,
  deleteById,
  createOrUpdateById,
  getById,
} from "../../api/accessReviewScheduleDefinitions/operations.js";
import type {
  AccessReviewScheduleDefinitionsStopOptionalParams,
  AccessReviewScheduleDefinitionsListOptionalParams,
  AccessReviewScheduleDefinitionsDeleteByIdOptionalParams,
  AccessReviewScheduleDefinitionsCreateOrUpdateByIdOptionalParams,
  AccessReviewScheduleDefinitionsGetByIdOptionalParams,
} from "../../api/accessReviewScheduleDefinitions/options.js";
import type {
  AccessReviewScheduleDefinition,
  AccessReviewScheduleDefinitionProperties,
} from "../../models/microsoft/attributeNamespaces/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a AccessReviewScheduleDefinitions operations. */
export interface AccessReviewScheduleDefinitionsOperations {
  /** Stop access review definition */
  stop: (
    scheduleDefinitionId: string,
    options?: AccessReviewScheduleDefinitionsStopOptionalParams,
  ) => Promise<void>;
  /** Get access review schedule definitions */
  list: (
    options?: AccessReviewScheduleDefinitionsListOptionalParams,
  ) => PagedAsyncIterableIterator<AccessReviewScheduleDefinition>;
  /** Delete access review schedule definition */
  deleteById: (
    scheduleDefinitionId: string,
    options?: AccessReviewScheduleDefinitionsDeleteByIdOptionalParams,
  ) => Promise<void>;
  /** Create or Update access review schedule definition. */
  createOrUpdateById: (
    scheduleDefinitionId: string,
    properties: AccessReviewScheduleDefinitionProperties,
    options?: AccessReviewScheduleDefinitionsCreateOrUpdateByIdOptionalParams,
  ) => Promise<AccessReviewScheduleDefinition>;
  /** Get single access review definition */
  getById: (
    scheduleDefinitionId: string,
    options?: AccessReviewScheduleDefinitionsGetByIdOptionalParams,
  ) => Promise<AccessReviewScheduleDefinition>;
}

function _getAccessReviewScheduleDefinitions(context: AuthorizationManagementContext) {
  return {
    stop: (
      scheduleDefinitionId: string,
      options?: AccessReviewScheduleDefinitionsStopOptionalParams,
    ) => stop(context, scheduleDefinitionId, options),
    list: (options?: AccessReviewScheduleDefinitionsListOptionalParams) => list(context, options),
    deleteById: (
      scheduleDefinitionId: string,
      options?: AccessReviewScheduleDefinitionsDeleteByIdOptionalParams,
    ) => deleteById(context, scheduleDefinitionId, options),
    createOrUpdateById: (
      scheduleDefinitionId: string,
      properties: AccessReviewScheduleDefinitionProperties,
      options?: AccessReviewScheduleDefinitionsCreateOrUpdateByIdOptionalParams,
    ) => createOrUpdateById(context, scheduleDefinitionId, properties, options),
    getById: (
      scheduleDefinitionId: string,
      options?: AccessReviewScheduleDefinitionsGetByIdOptionalParams,
    ) => getById(context, scheduleDefinitionId, options),
  };
}

export function _getAccessReviewScheduleDefinitionsOperations(
  context: AuthorizationManagementContext,
): AccessReviewScheduleDefinitionsOperations {
  return {
    ..._getAccessReviewScheduleDefinitions(context),
  };
}
