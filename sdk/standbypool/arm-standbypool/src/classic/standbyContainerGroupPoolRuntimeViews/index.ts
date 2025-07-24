// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StandbyPoolManagementContext } from "../../api/standbyPoolManagementContext.js";
import { StandbyContainerGroupPoolRuntimeViewResource } from "../../models/models.js";
import {
  StandbyContainerGroupPoolRuntimeViewsListByStandbyPoolOptionalParams,
  StandbyContainerGroupPoolRuntimeViewsGetOptionalParams,
} from "../../api/standbyContainerGroupPoolRuntimeViews/options.js";
import {
  listByStandbyPool,
  get,
} from "../../api/standbyContainerGroupPoolRuntimeViews/operations.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a StandbyContainerGroupPoolRuntimeViews operations. */
export interface StandbyContainerGroupPoolRuntimeViewsOperations {
  /** List StandbyContainerGroupPoolRuntimeViewResource resources by StandbyContainerGroupPoolResource */
  listByStandbyPool: (
    resourceGroupName: string,
    standbyContainerGroupPoolName: string,
    options?: StandbyContainerGroupPoolRuntimeViewsListByStandbyPoolOptionalParams,
  ) => PagedAsyncIterableIterator<StandbyContainerGroupPoolRuntimeViewResource>;
  /** Get a StandbyContainerGroupPoolRuntimeViewResource */
  get: (
    resourceGroupName: string,
    standbyContainerGroupPoolName: string,
    runtimeView: string,
    options?: StandbyContainerGroupPoolRuntimeViewsGetOptionalParams,
  ) => Promise<StandbyContainerGroupPoolRuntimeViewResource>;
}

function _getStandbyContainerGroupPoolRuntimeViews(context: StandbyPoolManagementContext) {
  return {
    listByStandbyPool: (
      resourceGroupName: string,
      standbyContainerGroupPoolName: string,
      options?: StandbyContainerGroupPoolRuntimeViewsListByStandbyPoolOptionalParams,
    ) => listByStandbyPool(context, resourceGroupName, standbyContainerGroupPoolName, options),
    get: (
      resourceGroupName: string,
      standbyContainerGroupPoolName: string,
      runtimeView: string,
      options?: StandbyContainerGroupPoolRuntimeViewsGetOptionalParams,
    ) => get(context, resourceGroupName, standbyContainerGroupPoolName, runtimeView, options),
  };
}

export function _getStandbyContainerGroupPoolRuntimeViewsOperations(
  context: StandbyPoolManagementContext,
): StandbyContainerGroupPoolRuntimeViewsOperations {
  return {
    ..._getStandbyContainerGroupPoolRuntimeViews(context),
  };
}
