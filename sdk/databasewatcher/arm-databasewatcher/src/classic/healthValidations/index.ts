// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DatabaseWatcherContext } from "../../api/databaseWatcherContext.js";
import {
  startValidation,
  listByParent,
  get,
  HealthValidationsStartValidationOptionalParams,
  HealthValidationsListByParentOptionalParams,
  HealthValidationsGetOptionalParams,
} from "../../api/healthValidations/index.js";
import { HealthValidation } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a HealthValidations operations. */
export interface HealthValidationsOperations {
  /** Starts health validation for a watcher. */
  startValidation: (
    resourceGroupName: string,
    watcherName: string,
    healthValidationName: string,
    options?: HealthValidationsStartValidationOptionalParams,
  ) => PollerLike<OperationState<HealthValidation>, HealthValidation>;
  /** List HealthValidation resources by Watcher */
  listByParent: (
    resourceGroupName: string,
    watcherName: string,
    options?: HealthValidationsListByParentOptionalParams,
  ) => PagedAsyncIterableIterator<HealthValidation>;
  /** Get a HealthValidation */
  get: (
    resourceGroupName: string,
    watcherName: string,
    healthValidationName: string,
    options?: HealthValidationsGetOptionalParams,
  ) => Promise<HealthValidation>;
}

function _getHealthValidations(context: DatabaseWatcherContext) {
  return {
    startValidation: (
      resourceGroupName: string,
      watcherName: string,
      healthValidationName: string,
      options?: HealthValidationsStartValidationOptionalParams,
    ) =>
      startValidation(
        context,
        resourceGroupName,
        watcherName,
        healthValidationName,
        options,
      ),
    listByParent: (
      resourceGroupName: string,
      watcherName: string,
      options?: HealthValidationsListByParentOptionalParams,
    ) => listByParent(context, resourceGroupName, watcherName, options),
    get: (
      resourceGroupName: string,
      watcherName: string,
      healthValidationName: string,
      options?: HealthValidationsGetOptionalParams,
    ) =>
      get(
        context,
        resourceGroupName,
        watcherName,
        healthValidationName,
        options,
      ),
  };
}

export function _getHealthValidationsOperations(
  context: DatabaseWatcherContext,
): HealthValidationsOperations {
  return {
    ..._getHealthValidations(context),
  };
}
