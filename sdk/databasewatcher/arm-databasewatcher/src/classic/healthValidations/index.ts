// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DatabaseWatcherContext } from "../../api/databaseWatcherContext.js";
import {
  healthValidationsStartValidation,
  healthValidationsListByParent,
  healthValidationsGet,
} from "../../api/healthValidations/index.js";
import {
  HealthValidationsStartValidationOptionalParams,
  HealthValidationsListByParentOptionalParams,
  HealthValidationsGetOptionalParams,
} from "../../api/options.js";
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
      healthValidationsStartValidation(
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
    ) => healthValidationsListByParent(context, resourceGroupName, watcherName, options),
    get: (
      resourceGroupName: string,
      watcherName: string,
      healthValidationName: string,
      options?: HealthValidationsGetOptionalParams,
    ) =>
      healthValidationsGet(context, resourceGroupName, watcherName, healthValidationName, options),
  };
}

export function _getHealthValidationsOperations(
  context: DatabaseWatcherContext,
): HealthValidationsOperations {
  return {
    ..._getHealthValidations(context),
  };
}
